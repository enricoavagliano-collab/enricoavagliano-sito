import Link from "next/link";
import WowEffects from "@/components/WowEffects";
import { getArticles } from "@/lib/articles-store";
import { formatItDate } from "@/lib/articles";

export const dynamic = "force-dynamic";

const TAG_PALETTE = ["#7fb2e0", "#a9b975", "#d9a544", "#b7bcc2", "#7fc79a", "#c98fd1", "#d19f7f"];

function categoryColor(category: string) {
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = category.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_PALETTE[Math.abs(hash) % TAG_PALETTE.length];
}

export default async function HomePage() {
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
            <Link href="/diari-di-pesca">APP</Link>
          </nav>
          <span className="hp-social">
            <a href="https://www.instagram.com/enricoseabass/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
            <a href="https://www.facebook.com/profile.php?id=61556746483320" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
            <a href="https://www.tiktok.com/@enricopesca82" target="_blank" rel="noopener noreferrer" aria-label="TikTok">TT</a>
            <a href="https://www.youtube.com/channel/UCVX4Ydxgn4goHXylNDvt07A" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
            <a href="mailto:info@enricoavagliano.com" aria-label="Email">✉</a>
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
              📖 In arrivo: "Il senso dell'acqua" — il nuovo libro sulla pesca in foce
            </div>
            <h1 className="hp-display">
              <span className="line-gold">Registra</span>
              <span className="line-gold">ogni uscita.</span>
              <span className="line-white">Pesca meglio</span>
              <span className="line-white">la prossima.</span>
            </h1>
            <p>
              Diari tecnici, strumenti e conoscenze per pescatori che
              vogliono lasciare il segno — e presto anche un racconto più
              intimo di cosa significa pescare in foce.
            </p>
            <div className="hp-hero-ctas">
              <Link href="/diari-di-pesca" className="hp-btn-gold">
                SCOPRI I DIARI
              </Link>
              <Link href="/il-senso-dellacqua" className="hp-link-gold">
                Il senso dell'acqua →
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
            <form className="hp-news-form">
              <input type="email" placeholder="La tua email" />
              <button type="submit" className="hp-btn-solid">
                ISCRIVITI
              </button>
            </form>
            <div className="hp-news-fine">
              Iscrivendoti accetti la nostra <Link href="/privacy">Privacy Policy</Link>. Puoi
              annullare l'iscrizione in qualsiasi momento.
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
              <Link href="/il-senso-dellacqua">Il senso dell'acqua</Link>
            </div>
            <div>
              <h4>APP</h4>
              <Link href="/diari-di-pesca">Come funziona</Link>
              <Link href="/diari-di-pesca">Inclusa nel libro</Link>
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
            <span>P.IVA da inserire</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

