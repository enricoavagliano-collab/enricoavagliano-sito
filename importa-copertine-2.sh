#!/bin/bash
set -e
echo "Import copertine: abbinamento migliorato per i nomi diversi..."
mkdir -p app/api/admin/import-covers
cat > "app/api/admin/import-covers/route.ts" << 'EAWEBEOF'
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthenticated } from "@/lib/auth";
import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Importa le copertine mancanti dal vecchio sito (Flazio): per ogni articolo
// senza copertina trova la pagina originale (stesso slug), legge l'immagine
// di anteprima (og:image), la carica su Vercel Blob e salva solo il link.
// Si apre da browser da loggati in /admin. Ripetibile senza danni.

const OLD = "https://www.enricoavagliano.com";

async function getText(url: string): Promise<string> {
  const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" }, cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  return r.text();
}

function locs(xml: string): string[] {
  return Array.from(xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)).map((m) => m[1]);
}

async function pool<T, R>(items: T[], n: number, fn: (x: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const k = i++;
        out[k] = await fn(items[k]);
      }
    })
  );
  return out;
}

function norm(x: string): string {
  let d = x;
  try { d = decodeURIComponent(x); } catch {}
  return d.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function lev(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

// Abbina gli slug rimasti senza pagina a quelli del vecchio sito non ancora usati
function fuzzyMatch(slug: string, candidates: string[]): string | null {
  const a = norm(slug);
  const scored: { c: string; score: number }[] = [];
  for (const c of candidates) {
    const b = norm(c);
    const A = a.replace(/-/g, ""), B = b.replace(/-/g, "");
    const ratio = 1 - lev(A, B) / Math.max(A.length, B.length);
    let score = ratio;
    if (a === b) score = 1;
    else if (b.split("-").length >= 2 && b.length >= 6 && a.endsWith(b)) score = Math.max(score, 0.9);
    if (score >= 0.85) scored.push({ c, score });
  }
  scored.sort((x, y) => y.score - x.score);
  if (scored.length === 0) return null;
  if (scored.length > 1 && scored[0].score - scored[1].score < 0.05) return null; // ambiguo
  return scored[0].c;
}

function mediaUrls(html: string): string[] {
  const found = new Map<string, string>();
  for (const m of html.matchAll(/https?:\/\/globaluserfiles\.com\/media\/([A-Za-z0-9_.-]+?)\/v1\/[^"'\s)<>\\]+/g)) {
    if (!found.has(m[1])) found.set(m[1], m[0]);
  }
  return Array.from(found.values());
}

export async function GET(req: Request) {
  const diagnosi = new URL(req.url).searchParams.get("diagnosi") === "1";
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "non autorizzato" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN mancante" }, { status: 500 });
  }
  const db = getPool();
  if (!db) return NextResponse.json({ error: "database non collegato" }, { status: 500 });

  if (diagnosi) {
    // Solo lettura: per ogni articolo conta le immagini presenti nella pagina originale
    const all = await db.query(
      `SELECT slug, COALESCE(array_length(extra_images,1),0) AS extra_db,
              (SELECT count(DISTINCT m[1]) FROM regexp_matches(content, '\\[\\[img([0-9]+)\\]\\]', 'g') AS m) AS segnaposto
       FROM site_articles ORDER BY id`
    );
    const map2 = new Map<string, string>();
    const idx = locs(await getText(`${OLD}/sitemap_blog.xml`));
    const subs2 = await pool(idx, 6, async (u) => {
      try { return locs(await getText(u.replace("http://", "https://"))); } catch { return [] as string[]; }
    });
    for (const list of subs2) for (const u of list) map2.set(u.split("/").filter(Boolean).pop() || "", u);
    const rep = await pool(all.rows, 6, async (row: any) => {
      const page = map2.get(row.slug);
      if (!page) return { slug: row.slug, pagina: false };
      try {
        const urls = mediaUrls(await getText(page));
        return { slug: row.slug, pagina: true, immagini_nella_pagina: urls.length, segnaposto_nel_testo: Number(row.segnaposto), extra_nel_db: Number(row.extra_db) };
      } catch (e: any) {
        return { slug: row.slug, pagina: true, errore: e.message };
      }
    });
    return NextResponse.json({ articoli: rep });
  }

  const missing = await db.query(
    `SELECT slug FROM site_articles WHERE image_url IS NULL OR image_url = '' ORDER BY id`
  );
  const slugs: string[] = missing.rows.map((r) => r.slug);
  const allSlugs = await db.query(`SELECT slug FROM site_articles`);
  const existing = new Set<string>(allSlugs.rows.map((r) => r.slug));

  // Mappa slug -> indirizzo pagina sul vecchio sito, dalle sitemap
  const map = new Map<string, string>();
  try {
    const index = locs(await getText(`${OLD}/sitemap_blog.xml`));
    const subs = await pool(index, 6, async (u) => {
      try {
        return locs(await getText(u.replace("http://", "https://")));
      } catch {
        return [] as string[];
      }
    });
    for (const list of subs) {
      for (const u of list) {
        const last = u.split("/").filter(Boolean).pop() || "";
        map.set(last, u);
      }
    }
  } catch (e: any) {
    return NextResponse.json({ error: "sitemap vecchio sito non leggibile: " + e.message }, { status: 502 });
  }

  const usati = new Set<string>(slugs.filter((x) => map.has(x)));
  const liberi = Array.from(map.keys()).filter((k) => !usati.has(k) && !existing.has(k));
  const abbinati = new Map<string, string>();
  for (const slug of slugs) {
    if (map.has(slug)) continue;
    const m = fuzzyMatch(slug, liberi);
    if (m) { abbinati.set(slug, m); liberi.splice(liberi.indexOf(m), 1); }
  }

  const risultati = await pool(slugs, 5, async (slug) => {
    const page = map.get(slug) || (abbinati.has(slug) ? map.get(abbinati.get(slug) as string) : undefined);
    if (!page) return { slug, esito: "pagina non trovata sul vecchio sito" };
    try {
      const html = await getText(page);
      const m =
        /<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/i.exec(html) ||
        /<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image["']/i.exec(html);
      if (!m) return { slug, esito: "nessuna immagine nella pagina" };
      const imgUrl = m[1].replace(/&amp;/g, "&");
      if (imgUrl.includes("/ogfile/")) return { slug, esito: "solo immagine generica del sito" };
      const r = await fetch(imgUrl, { headers: { "user-agent": "Mozilla/5.0" } });
      if (!r.ok) return { slug, esito: `download immagine HTTP ${r.status}` };
      const type = r.headers.get("content-type") || "image/jpeg";
      if (!type.startsWith("image/")) return { slug, esito: "il file non e' un'immagine" };
      const buf = Buffer.from(await r.arrayBuffer());
      const ext = type.split("/")[1]?.replace("jpeg", "jpg").split(";")[0] || "jpg";
      const blob = await put(`blog/${slug}.${ext}`, buf, {
        access: "public",
        addRandomSuffix: true,
        contentType: type,
      });
      await db.query(`UPDATE site_articles SET image_url = $2 WHERE slug = $1`, [slug, blob.url]);
      return { slug, esito: "ok", abbinato_a: abbinati.get(slug) };
    } catch (e: any) {
      return { slug, esito: "errore: " + e.message };
    }
  });

  return NextResponse.json({
    cercati: slugs.length,
    importati: risultati.filter((r) => r.esito === "ok").length,
    abbinamenti_approssimati: Array.from(abbinati.entries()),
    non_riusciti: risultati.filter((r) => r.esito !== "ok"),
  });
}
EAWEBEOF
echo "Fatto."
