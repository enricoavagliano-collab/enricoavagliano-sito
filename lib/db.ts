import { Pool } from "pg";

// Usa la stessa istanza Postgres (Neon) già collegata all'app Diari di Pesca:
// imposta DATABASE_URL nelle variabili d'ambiente di Vercel per questo progetto.
// Senza questa variabile, il sito funziona comunque con i dati segnaposto
// (utile in locale o prima di avere il database pronto).

let pool: Pool | null | undefined;

export function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

let schemaReady = false;

export async function ensureSchema() {
  const p = getPool();
  if (!p || schemaReady) return;
  await p.query(`
    CREATE TABLE IF NOT EXISTS site_articles (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      image_url TEXT,
      published_at DATE NOT NULL DEFAULT CURRENT_DATE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  await p.query(`ALTER TABLE site_articles ADD COLUMN IF NOT EXISTS image_url TEXT;`);
  await p.query(`ALTER TABLE site_articles ADD COLUMN IF NOT EXISTS extra_images TEXT[] DEFAULT '{}';`);
  schemaReady = true;
}

