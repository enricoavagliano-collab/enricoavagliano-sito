#!/bin/bash
set -e
echo "Controllo foto nel vecchio sito (sola lettura)..."
mkdir -p app/api/admin/ispeziona
cat > "app/api/admin/ispeziona/route.ts" << 'EAWEBEOF'
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Solo lettura: mostra dove sono le foto nel codice di una pagina del vecchio sito.
// Uso: /api/admin/ispeziona  oppure  /api/admin/ispeziona?url=<pagina del vecchio sito>
export async function GET(req: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "non autorizzato" }, { status: 401 });
  }
  const u =
    new URL(req.url).searchParams.get("url") ||
    "https://www.enricoavagliano.com/blog-detail/post/579219/correnti-lunari";
  if (!u.startsWith("https://www.enricoavagliano.com/") && !u.startsWith("https://enricoavagliano.com/")) {
    return NextResponse.json({ error: "solo pagine del vecchio sito" }, { status: 400 });
  }
  const r = await fetch(u, { headers: { "user-agent": "Mozilla/5.0" }, cache: "no-store" });
  const html = await r.text();
  const uniq = (a: string[]) => Array.from(new Set(a));
  const imgTags = uniq(Array.from(html.matchAll(/<img\b[^>]*>/gi)).map((m) => m[0].slice(0, 300))).slice(0, 25);
  const imgUrls = uniq(
    Array.from(html.matchAll(/https?:\/\/[^"'\s)<>\\]+\.(?:jpe?g|png|webp)[^"'\s)<>\\]*/gi)).map((m) => m[0])
  ).slice(0, 40);
  const media = uniq(
    Array.from(html.matchAll(/https?:\/\/globaluserfiles\.com\/media\/[^"'\s)<>\\]+/g)).map((m) => m[0].slice(0, 200))
  ).slice(0, 40);
  const scriptSrc = uniq(Array.from(html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)).map((m) => m[1])).slice(0, 25);
  const inline = Array.from(html.matchAll(/<script(?![^>]+src)[^>]*>([\s\S]*?)<\/script>/gi))
    .map((m) => m[1])
    .filter((t) => /jpe?g|media|image|photo|gallery|post/i.test(t))
    .slice(0, 6)
    .map((t) => t.slice(0, 1200));
  const apiHints = uniq(
    Array.from(html.matchAll(/["'](\/[^"'\s]*(?:api|ajax|json|ogfile)[^"'\s]*)["']/gi)).map((m) => m[1])
  ).slice(0, 25);
  return NextResponse.json({
    status: r.status,
    lunghezza_html: html.length,
    paragrafi: (html.match(/<p\b/gi) || []).length,
    img_tag: imgTags,
    url_immagini: imgUrls,
    url_media_globaluserfiles: media,
    script_esterni: scriptSrc,
    script_inline_rilevanti: inline,
    percorsi_api_o_json: apiHints,
  });
}
EAWEBEOF
echo "Fatto."
