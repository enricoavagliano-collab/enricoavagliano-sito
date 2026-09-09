import { getArticleBySlug } from "@/lib/articles-store";
import { formatItDate } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

function renderContent(content: string, extraImages: string[] = []) {
  const parts = content.split(/(\[\[img\d+\]\])/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[\[img(\d+)\]\]$/);
    if (m) {
      const idx = parseInt(m[1], 10) - 1;
      const src = extraImages[idx];
      if (!src) return null;
      return (
        <img
          key={i}
          src={src}
          alt=""
          style={{
            width: "100%",
            maxHeight: 420,
            objectFit: "cover",
            borderRadius: 6,
            margin: "20px 0",
          }}
        />
      );
    }
    if (!part) return null;
    return (
      <span key={i} style={{ whiteSpace: "pre-wrap" }}>
        {part}
      </span>
    );
  });
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return notFound();

  return (
    <main className="wrap prose-width" style={{ padding: "56px 0 100px" }}>
      <Link href="/blog" className="see-all" style={{ fontSize: "0.85rem" }}>
        ← Tutti gli articoli
      </Link>
      <div style={{ marginTop: 20 }}>
        <span className="date">{formatItDate(article.date)}</span>
        <span style={{ marginLeft: 12 }} className="cat">
          {article.category}
        </span>
      </div>
      <h1 style={{ fontSize: "2.2rem", marginTop: 16 }}>{article.title}</h1>
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          style={{ width: "100%", maxHeight: 420, objectFit: "cover", borderRadius: 6, marginTop: 24 }}
        />
      )}
      <p style={{ fontSize: "1.1rem", lineHeight: 1.7, marginTop: 28 }}>
        {article.excerpt}
      </p>
      {article.content && (
        <div style={{ marginTop: 24, lineHeight: 1.75 }}>
          {renderContent(article.content, article.extraImages || [])}
        </div>
      )}
    </main>
  );
}

