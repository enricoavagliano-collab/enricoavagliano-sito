import Link from "next/link";
import { getArticles } from "@/lib/articles-store";
import { formatItDate } from "@/lib/articles";

export const metadata = { title: "Articoli — Enrico Avagliano" };
export const dynamic = "force-dynamic";

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const { items: articles } = await getArticles();
  const cat = searchParams.cat;
  const list = cat ? articles.filter((a) => a.category === cat) : articles;
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <main className="wrap" style={{ paddingBottom: 80 }}>
      <section style={{ padding: "56px 0 24px" }}>
        <div className="eyebrow" style={{ color: "var(--water)" }}>
          Registro
        </div>
        <h1 style={{ fontSize: "2.4rem" }}>Articoli</h1>
      </section>

      <div style={{ display: "flex", gap: 14, marginBottom: 30, flexWrap: "wrap" }}>
        <Link
          href="/blog"
          className="btn btn-secondary"
          style={{ padding: "8px 16px", fontSize: "0.85rem" }}
        >
          Tutti
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/blog?cat=${encodeURIComponent(c)}`}
            className="btn btn-secondary"
            style={{ padding: "8px 16px", fontSize: "0.85rem" }}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="logbook">
        {list.map((a) => (
          <Link href={`/blog/${a.slug}`} key={a.slug} className="log-entry">
            {a.imageUrl ? (
              <img src={a.imageUrl} alt="" className="thumb" />
            ) : (
              <span className="thumb" aria-hidden="true" />
            )}
            <span className="date">{formatItDate(a.date)}</span>
            <span className="title">{a.title}</span>
            <span className="cat">{a.category}</span>
          </Link>
        ))}
        {list.length === 0 && (
          <p style={{ padding: "24px 0" }}>Nessun articolo in questa categoria.</p>
        )}
      </div>
    </main>
  );
}

