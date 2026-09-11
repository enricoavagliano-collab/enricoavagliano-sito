import { getArticleBySlug } from "@/lib/articles-store";
import { formatItDate } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";

export const dynamic = "force-dynamic";

function toEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

function renderTextWithLinks(text: string, keyPrefix: string) {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const out: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let idx = 0;
  while ((m = linkRegex.exec(text))) {
    if (m.index > lastIndex) out.push(text.slice(lastIndex, m.index));
    out.push(
      <a
        key={`${keyPrefix}-${idx++}`}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--water)", textDecoration: "underline" }}
      >
        {m[1]}
      </a>
    );
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) out.push(text.slice(lastIndex));
  return out;
}

function renderContent(content: string, extraImages: string[] = [], videos: string[] = []) {
  const parts = content.split(/(\[\[img\d+\]\]|\[\[video\d+\]\])/g);
  return parts.map((part, i) => {
    const mImg = part.match(/^\[\[img(\d+)\]\]$/);
    if (mImg) {
      const idx = parseInt(mImg[1], 10) - 1;
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
    const mVideo = part.match(/^\[\[video(\d+)\]\]$/);
    if (mVideo) {
      const idx = parseInt(mVideo[1], 10) - 1;
      const raw = videos[idx];
      const embed = raw ? toEmbedUrl(raw) : null;
      if (!embed) return null;
      return (
        <div
          key={i}
          style={{ position: "relative", paddingTop: "56.25%", margin: "20px 0", borderRadius: 6, overflow: "hidden" }}
        >
          <iframe
            src={embed}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        </div>
      );
    }
    if (!part) return null;
    return (
      <span key={i} style={{ whiteSpace: "pre-wrap" }}>
        {renderTextWithLinks(part, `t${i}`)}
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
          {renderContent(article.content, article.extraImages || [], article.videos || [])}
        </div>
      )}
      <ShareButtons title={article.title} />
    </main>
  );
}

