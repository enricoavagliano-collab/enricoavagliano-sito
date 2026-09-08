import { getPool, ensureSchema } from "./db";
import { articles as placeholderArticles } from "./articles";

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  content?: string;
};

export async function getArticles(): Promise<{ items: Article[]; dbConnected: boolean }> {
  const pool = getPool();
  if (!pool) return { items: placeholderArticles, dbConnected: false };

  try {
    await ensureSchema();
    const res = await pool.query(
      `SELECT slug, title, category, excerpt, content, published_at
       FROM site_articles ORDER BY published_at DESC, id DESC`
    );
    const items: Article[] = res.rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category,
      excerpt: r.excerpt,
      content: r.content,
      date: new Date(r.published_at).toISOString().slice(0, 10),
    }));
    return { items, dbConnected: true };
  } catch (err) {
    console.error("Errore database, uso i dati segnaposto:", err);
    return { items: placeholderArticles, dbConnected: false };
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { items } = await getArticles();
  return items.find((a) => a.slug === slug) ?? null;
}

export async function createArticle(data: {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
}) {
  const pool = getPool();
  if (!pool) throw new Error("DATABASE_URL non configurato");
  await ensureSchema();
  await pool.query(
    `INSERT INTO site_articles (slug, title, category, excerpt, content, published_at)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (slug) DO UPDATE SET
       title = $2, category = $3, excerpt = $4, content = $5, published_at = $6`,
    [data.slug, data.title, data.category, data.excerpt, data.content, data.date]
  );
}

export async function deleteArticle(slug: string) {
  const pool = getPool();
  if (!pool) throw new Error("DATABASE_URL non configurato");
  await ensureSchema();
  await pool.query(`DELETE FROM site_articles WHERE slug = $1`, [slug]);
}

