#!/bin/bash
set -e
echo "Nuovo titolo libro: Pesca a bolognese e all'inglese..."
rm -rf "app/(site)/il-senso-dellacqua"
mkdir -p "app/(site)/pesca-a-bolognese-e-allinglese"
cat > "app/(site)/pesca-a-bolognese-e-allinglese/page.tsx" << 'EAWEBEOF'
export const metadata = {
  title: "Pesca a bolognese e all'inglese — Enrico Avagliano",
  description:
    "In arrivo il nuovo libro di Enrico Avagliano: guida pratica alla pesca a bolognese e all'inglese da riva e dalla barca, in foce, porto, canale e spiaggia.",
};

export default function PescaBologneseInglese() {
  return (
    <main className="wrap prose-width" style={{ paddingTop: 70, paddingBottom: 100 }}>
      <div className="eyebrow" style={{ color: "var(--water)" }}>
        In arrivo
      </div>
      <h1 style={{ fontSize: "2.4rem", marginTop: 10 }}>Pesca a bolognese e all'inglese</h1>
      <p style={{ fontSize: "1.2rem", lineHeight: 1.5, marginTop: 12, color: "var(--muted)" }}>
        Guida pratica da riva e dalla barca in foce, porto, canale e spiaggia
      </p>
      <p style={{ fontSize: "1.1rem", lineHeight: 1.7, marginTop: 24 }}>
        Il nuovo libro dedicato alla pesca a bolognese e all'inglese in mare e
        in foce: dalla barca, dalla spiaggia, dalla scogliera, dalle foci e dai
        canali. Montature, tecniche e occasioni giuste per leggere l'acqua e
        pescare meglio.
      </p>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginTop: 16, color: "var(--muted)" }}>
        In uscita a breve — resta aggiornato tramite la newsletter o i canali
        social per essere tra i primi a saperlo.
      </p>
      <a
        href="/blog"
        className="btn btn-secondary"
        style={{ display: "inline-block", marginTop: 30 }}
      >
        Nel frattempo, leggi gli articoli sulla pesca in foce
      </a>
    </main>
  );
}
EAWEBEOF

cat > "app/page.tsx" << 'EAWEBEOF'
import Link from "next/link";
import WowEffects from "@/components/WowEffects";
import { getArticles } from "@/lib/articles-store";
import { formatItDate } from "@/lib/articles";
import { InstagramIcon, FacebookIcon, TikTokIcon, YouTubeIcon, MailIcon } from "@/components/Icons";
import { subscribeAction } from "@/app/newsletter-actions";

export const dynamic = "force-dynamic";

const TAG_PALETTE = ["#7fb2e0", "#a9b975", "#d9a544", "#b7bcc2", "#7fc79a", "#c98fd1", "#d19f7f"];

function categoryColor(category: string) {
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = category.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_PALETTE[Math.abs(hash) % TAG_PALETTE.length];
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { newsletter?: string };
}) {
  const { items } = await getArticles();
  const logEntries = items.slice(0, 6);
  return (
    <main className="hp">
      <WowEffects />
      {/* HEADER */}
      <header className="hp-header">
        <div className="wrap hp-header-inner">
          <div className="hp-logo">
            <span className="ea">EA</span>
            <span className="name">
              ENRICO
              <br />
              AVAGLIANO
            </span>
          </div>
          <nav className="hp-nav">
            <Link href="/diari-di-pesca">LIBRI</Link>
            <Link href="/blog" className="active">BLOG</Link>
            <Link href="/app-diari-di-pesca">APP</Link>
          </nav>
          <span className="hp-social">
            <a href="https://www.instagram.com/enricoseabass/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://www.facebook.com/profile.php?id=61556746483320" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon /></a>
            <a href="https://www.tiktok.com/@enricopesca82" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon /></a>
            <a href="https://www.youtube.com/channel/UCVX4Ydxgn4goHXylNDvt07A" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YouTubeIcon /></a>
            <a href="mailto:info@enricoavagliano.com" aria-label="Email"><MailIcon /></a>
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="hp-hero">
        <div className="hp-stars" aria-hidden="true" />
        <div className="hp-hero-glow" aria-hidden="true" />
        <div className="wrap hp-hero-grid">
          <div data-reveal>
            <div className="hp-hero-badge">
              📖 In arrivo: "Pesca a bolognese e all'inglese" — il nuovo libro sulla pesca in mare e in foce
            </div>
            <h1 className="hp-display">
              <span className="line-gold">Registra</span>
              <span className="line-gold">ogni uscita.</span>
              <span className="line-white">Pesca meglio</span>
              <span className="line-white">la prossima.</span>
            </h1>
            <p>
              Diari tecnici, strumenti e conoscenze per pescatori che
              vogliono lasciare il segno — e presto anche una guida pratica
              alla pesca a bolognese e all'inglese in mare e in foce.
            </p>
            <div className="hp-hero-ctas">
              <Link href="/diari-di-pesca" className="hp-btn-gold">
                SCOPRI I DIARI
              </Link>
              <Link href="/pesca-a-bolognese-e-allinglese" className="hp-link-gold">
                IL NUOVO LIBRO →
              </Link>
            </div>
          </div>
          <div className="hp-hero-photo-parallax">
            <div className="photo-slot" style={{ border: "none", background: "none", padding: 0 }}>
              <img
                src="/images/hero-enrico.jpg"
                alt="Enrico Avagliano con una cattura al tramonto"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* DIARI TECNICI */}
      <section className="hp-diari">
        <div className="wrap hp-diari-grid">
          <div data-reveal>
            <div className="hp-eyebrow">I DIARI TECNICI</div>
            <h2 className="hp-display">
              Scrivi. Analizza.
              <br />
              <span className="gold">Migliora.</span>
            </h2>
            <p>
              I diari di pesca professionale progettati per aiutarti a
              tenere traccia di ogni dettaglio e trasformare l'esperienza
              in risultati concreti.
            </p>
            <Link href="/diari-di-pesca" className="hp-link-gold">
              SCOPRI DI PIÙ →
            </Link>
          </div>
          <div className="hp-books">
            <a
              href="https://www.amazon.it/dp/B0GRG9KWD1"
              target="_blank"
              rel="noopener noreferrer"
              className="photo-slot"
              data-reveal
              style={{ border: "none", background: "none", padding: 0, display: "block" }}
            >
              <img
                src="/images/cover-mare-foce.jpg"
                alt="Diario di Pesca Professionale — Mare & Foce"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </a>
            <a
              href="https://www.amazon.it/dp/B0HH8LWVY7"
              target="_blank"
              rel="noopener noreferrer"
              className="photo-slot"
              data-reveal
              data-reveal-delay="1"
              style={{ border: "none", background: "none", padding: 0, display: "block" }}
            >
              <img
                src="/images/cover-feeder.jpg"
                alt="Diario di Pesca Professionale — Feeder"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* APP */}
      <section className="hp-app">
        <div className="wrap hp-app-grid">
          <div className="photo-slot" data-reveal style={{ border: "none", background: "none", padding: 0 }}>
            <img
              src="/images/app-screenshot.jpg"
              alt="Schermata dell'app Libri di Pesca"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <h2 className="hp-display">
              La tua app gratuita
              <span className="gold">inclusa nei libri</span>
            </h2>
            <p>Strumenti pratici sempre con te, sul campo e a casa.</p>

            <div className="hp-features">
              <div className="hp-feature" data-reveal>
                <div className="icon-slot">📓</div>
                <div className="ft">DIARIO DIGITALE</div>
                <p>Registra le uscite, catture e condizioni.</p>
              </div>
              <div className="hp-feature" data-reveal data-reveal-delay="1">
                <div className="icon-slot">🎣</div>
                <div className="ft">LE MIE LENZE</div>
                <p>Salva le tue configurazioni vincenti.</p>
              </div>
              <div className="hp-feature" data-reveal data-reveal-delay="2">
                <div className="icon-slot">☁️</div>
                <div className="ft">METEO</div>
                <p>Previsioni dettagliate ogni 2 ore.</p>
              </div>
              <div className="hp-feature" data-reveal data-reveal-delay="3">
                <div className="icon-slot">📄</div>
                <div className="ft">PDF OMAGGIO</div>
                <p>Contenuti esclusivi solo per te.</p>
              </div>
            </div>

            <div className="hp-store-badges">
              <details className="hp-pwa-install">
                <summary>📱 Come installarla su Android</summary>
                <ol>
                  <li>Apri il link dell'app in Chrome</li>
                  <li>Tocca i tre puntini in alto a destra</li>
                  <li>Scegli "Aggiungi a schermata Home"</li>
                </ol>
              </details>
              <details className="hp-pwa-install">
                <summary>📱 Come installarla su iPhone</summary>
                <ol>
                  <li>Apri il link dell'app in Safari</li>
                  <li>Tocca l'icona di condivisione (il quadrato con la freccia)</li>
                  <li>Scegli "Aggiungi a Home"</li>
                </ol>
              </details>
              <div className="hp-badge-circle">100%
                <br />
                GRATUITA
                <br />
                PER SEMPRE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAL BLOG */}
      <section className="hp-blog">
        <div className="wrap">
          <div className="hp-blog-head" data-reveal>
            <div>
              <div className="hp-eyebrow">DAL BLOG</div>
              <h2 className="hp-display" style={{ fontSize: "1.7rem" }}>
                Esperienze, tecniche e consigli dal campo
              </h2>
            </div>
            <Link href="/blog" className="hp-link-gold">
              VEDI TUTTI GLI ARTICOLI →
            </Link>
          </div>

          <div className="hp-log" data-reveal data-reveal-delay="1">
            {logEntries.map((a) => (
              <Link href={`/blog/${a.slug}`} key={a.slug} className="hp-log-row">
                <span className="hp-tag" style={{ color: categoryColor(a.category), borderColor: categoryColor(a.category) }}>
                  {a.category.toUpperCase()}
                </span>
                <span className="hp-log-date">{formatItDate(a.date).toUpperCase()}</span>
                <span className="hp-log-title">{a.title}</span>
                <span className="hp-log-go">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="hp-news">
        <div className="hp-news-grid">
          <div className="photo-slot" data-reveal style={{ border: "none", borderRadius: 0, padding: 0 }}>
            <img
              src="/images/newsletter-photo.jpg"
              alt="Pescatore in controluce al tramonto"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="hp-news-copy" data-reveal data-reveal-delay="1">
            <h2 className="hp-display">Resta aggiornato</h2>
            <p>
              Iscriviti alla newsletter per ricevere novità, articoli e
              consigli esclusivi.
            </p>
            {searchParams.newsletter === "ok" ? (
              <p style={{ color: "var(--gold-soft)", marginTop: 26 }}>
                Iscrizione avvenuta! Controlla la tua casella email.
              </p>
            ) : (
              <form className="hp-news-form-wrap" action={subscribeAction}>
                <div className="hp-news-form">
                  <input type="email" name="email" placeholder="La tua email" required />
                  <button type="submit" className="hp-btn-solid">
                    ISCRIVITI
                  </button>
                </div>
                <label className="hp-news-consent">
                  <input type="checkbox" name="consent" required />
                  <span>
                    Accetto la <Link href="/privacy">Privacy Policy</Link> e acconsento a
                    ricevere la newsletter via email.
                  </span>
                </label>
              </form>
            )}
            {searchParams.newsletter === "errore" && (
              <p style={{ color: "#e08a7a", marginTop: 10, fontSize: "0.85rem" }}>
                Email non valida o consenso mancante, riprova.
              </p>
            )}
            <div className="hp-news-fine">
              Puoi annullare l'iscrizione in qualsiasi momento.
            </div>
          </div>
        </div>
      </section>

      {/* COLLAB */}
      <section className="hp-collab">
        <div className="wrap" data-reveal>
          <div className="hp-eyebrow">IN COLLABORAZIONE CON</div>
          <div className="hp-collab-logos">
            <div className="photo-slot" style={{ border: "none", background: "none" }}>
              <img
                src="/images/maver-logo.png"
                alt="Logo Maver"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="hp-footer">
        <div className="wrap">
          <div className="hp-footer-grid">
            <div>
              <div className="hp-logo" style={{ marginBottom: 14 }}>
                <span className="ea">EA</span>
                <span className="name">
                  ENRICO
                  <br />
                  AVAGLIANO
                </span>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.84rem", lineHeight: 1.5, maxWidth: "26ch" }}>
                Diari di pesca professionale, strumenti e conoscenze per
                pescatori che vogliono migliorare e lasciare il segno.
              </p>
            </div>
            <div>
              <h4>LIBRI</h4>
              <a href="https://www.amazon.it/dp/B0GRG9KWD1" target="_blank" rel="noopener noreferrer">Diario Mare &amp; Foce</a>
              <a href="https://www.amazon.it/dp/B0HH8LWVY7" target="_blank" rel="noopener noreferrer">Diario Feeder</a>
              <Link href="/diari-di-pesca">Tutti i diari</Link>
              <Link href="/pesca-a-bolognese-e-allinglese">Pesca a bolognese e all'inglese</Link>
            </div>
            <div>
              <h4>APP</h4>
              <Link href="/app-diari-di-pesca">Come funziona</Link>
              <Link href="/app-diari-di-pesca">Inclusa nel libro</Link>
            </div>
            <div>
              <h4>BLOG</h4>
              <Link href="/blog">Tutti gli articoli</Link>
              <Link href="/blog?cat=Feeder">Feeder</Link>
              <Link href="/blog?cat=Foce">Foce</Link>
              <Link href="/blog?cat=Mare">Mare</Link>
            </div>
            <div>
              <h4>INFO</h4>
              <Link href="/chi-sono">Chi sono</Link>
              <Link href="/contatti">Contatti</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>
          <div className="hp-footer-bottom">
            <span>© {new Date().getFullYear()} Enrico Avagliano — Tutti i diritti riservati</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
EAWEBEOF

cat > "app/newsletter-actions.ts" << 'EAWEBEOF'
"use server";

import { redirect } from "next/navigation";
import { getPool, ensureSchema } from "@/lib/db";

const WELCOME_EMAIL_HTML = `
<div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #16211f;">
  <h1 style="font-size: 22px; margin-bottom: 4px;">Benvenuto/a!</h1>
  <p style="font-size: 15px; line-height: 1.6;">
    Grazie per esserti iscritto/a alla newsletter di Enrico Avagliano. Da qui in poi
    riceverai aggiornamenti su nuovi articoli, tecniche di pesca e le novità sui
    prossimi libri.
  </p>
  <p style="font-size: 15px; line-height: 1.6;">
    Nel frattempo, se non li conosci ancora, ti presento i <strong>Diari di Pesca
    Professionale</strong>: due diari pratici — <em>Mare &amp; Foce</em> e
    <em>Feeder</em> — pensati per registrare ogni uscita, tenere traccia di lenze,
    esche e catture, e migliorare uscita dopo uscita.
  </p>
  <p style="font-size: 15px; line-height: 1.6;">
    Ogni diario include gratuitamente l'accesso all'<strong>app companion</strong>:
    diario digitale, maree e fasi lunari in tempo reale, e tutte le lenze usate da
    Enrico, pronte da consultare sul campo.
  </p>
  <p style="margin: 28px 0;">
    <a href="https://www.amazon.it/dp/B0GRG9KWD1" style="background:#d9a544;color:#0a1520;padding:12px 20px;text-decoration:none;border-radius:4px;font-weight:bold;display:inline-block;margin-right:10px;">Diario Mare &amp; Foce</a>
    <a href="https://www.amazon.it/dp/B0HH8LWVY7" style="background:#d9a544;color:#0a1520;padding:12px 20px;text-decoration:none;border-radius:4px;font-weight:bold;display:inline-block;">Diario Feeder</a>
  </p>
  <p style="font-size: 15px; line-height: 1.6;">
    In arrivo anche <strong>"Pesca a bolognese e all'inglese"</strong>, il nuovo libro dedicato
    alla pesca in mare e in foce — resterai aggiornato/a anche su questo.
  </p>
  <p style="font-size: 13px; color: #6b7570; margin-top: 40px;">
    Enrico Avagliano — enricoavagliano.com
  </p>
</div>
`;

async function addToBrevo(email: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  if (!apiKey) return;

  // Aggiunge il contatto alla lista
  await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: listId ? [parseInt(listId, 10)] : undefined,
      updateEnabled: true,
    }),
  }).catch((err) => console.error("Errore Brevo contatto:", err));

  // Invia l'email di benvenuto
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Enrico Avagliano", email: "info@enricoavagliano.com" },
      to: [{ email }],
      subject: "Benvenuto nella community di Enrico Avagliano",
      htmlContent: WELCOME_EMAIL_HTML,
    }),
  }).catch((err) => console.error("Errore Brevo email:", err));
}

export async function subscribeAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const consent = formData.get("consent");

  if (!email || !email.includes("@") || !consent) {
    redirect("/?newsletter=errore");
  }

  const pool = getPool();
  if (pool) {
    try {
      await ensureSchema();
      await pool.query(
        `INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING`,
        [email]
      );
    } catch (err) {
      console.error("Errore salvataggio iscritto:", err);
    }
  }

  await addToBrevo(email);

  redirect("/?newsletter=ok");
}
EAWEBEOF

cat > "app/sitemap.ts" << 'EAWEBEOF'
import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles-store";

const BASE_URL = "https://enricoavagliano.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { items } = await getArticles();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/diari-di-pesca`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/app-diari-di-pesca`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/pesca-a-bolognese-e-allinglese`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/chi-sono`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contatti`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const articlePages: MetadataRoute.Sitemap = items.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages];
}
EAWEBEOF

cat > "next.config.js" << 'EAWEBEOF'
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      // Articoli e pagine: network first, fallback su cache se offline
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "enricoavagliano-pages",
        expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
        networkTimeoutSeconds: 8,
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      { source: "/il-senso-dellacqua", destination: "/pesca-a-bolognese-e-allinglese", permanent: true },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

module.exports = withPWA(nextConfig);
EAWEBEOF

echo "Fatto."
