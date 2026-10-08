import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getPool } from "@/lib/db";
import { uploadDataUri } from "@/lib/blob";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Migrazione una tantum: sposta le immagini base64 dal database a Vercel Blob.
// Si apre da browser (da loggato in /admin): ogni passaggio ne sposta alcune,
// va ripetuto finche' "rimasti" non arriva a 0. Le immagini nel database
// vengono sostituite solo DOPO il caricamento riuscito.
export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "non autorizzato" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN mancante" }, { status: 500 });
  }
  const pool = getPool();
  if (!pool) return NextResponse.json({ error: "database non collegato" }, { status: 500 });

  const todo = await pool.query(
    `SELECT slug FROM site_articles
     WHERE image_url LIKE 'data:%'
        OR EXISTS (SELECT 1 FROM unnest(extra_images) e WHERE e LIKE 'data:%')
     ORDER BY id LIMIT 4`
  );

  const done: string[] = [];
  for (const row of todo.rows) {
    const r = await pool.query(
      `SELECT image_url, extra_images FROM site_articles WHERE slug = $1`,
      [row.slug]
    );
    const art = r.rows[0];
    let cover: string | null = art.image_url;
    if (cover && cover.startsWith("data:")) cover = await uploadDataUri(cover, "blog");
    const extras: string[] = [];
    for (const e of art.extra_images || []) {
      extras.push(e.startsWith("data:") ? await uploadDataUri(e, "blog") : e);
    }
    await pool.query(
      `UPDATE site_articles SET image_url = $2, extra_images = $3 WHERE slug = $1`,
      [row.slug, cover, extras]
    );
    done.push(row.slug);
  }

  const left = await pool.query(
    `SELECT count(*)::int AS n FROM site_articles
     WHERE image_url LIKE 'data:%'
        OR EXISTS (SELECT 1 FROM unnest(extra_images) e WHERE e LIKE 'data:%')`
  );
  return NextResponse.json({
    spostati_ora: done,
    rimasti: left.rows[0].n,
    nota: left.rows[0].n === 0 ? "FINITO" : "ricarica la pagina",
  });
}
