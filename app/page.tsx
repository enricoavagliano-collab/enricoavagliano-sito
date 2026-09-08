import Link from "next/link";
import WowEffects from "@/components/WowEffects";

const logEntries = [
  { tag: "mare", label: "MARE", date: "24 MAG 2025", title: "Pesca notturna in foce: strategie e attrezzature vincenti" },
  { tag: "feeder", label: "FEEDER", date: "18 MAG 2025", title: "Pasturazione in primavera: trovate il ritmo giusto" },
  { tag: "tecnica", label: "TECNICA", date: "12 MAG 2025", title: "Nodi essenziali: sicurezza e semplicità" },
  { tag: "mare", label: "MARE", date: "05 MAG 2025", title: "Mare mosso, grandi catture: come adattarsi" },
  { tag: "attrezzatura", label: "ATTREZZATURA", date: "28 APR 2025", title: "Manutenzione mulinelli: guida completa" },
  { tag: "acquadolce", label: "ACQUA DOLCE", date: "21 APR 2025", title: "Feeder in fiume: lettura della corrente" },
];

export default function HomePage() {
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
            <span className="hp-social" aria-hidden>
              <span>IG</span>
              <span>YT</span>
            </span>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hp-hero">
        <div className="hp-stars" aria-hidden="true" />
        <div className="hp-hero-glow" aria-hidden="true" />
        <div className="wrap hp-hero-grid">
          <div data-reveal>
            <h1 className="hp-display">
              <span className="line-gold">Registra</span>
              <span className="line-gold">ogni uscita.</span>
              <span className="line-white">Pesca meglio</span>
              <span className="line-white">la prossima.</span>
            </h1>
            <p>
              Diari tecnici, strumenti e conoscenze per pescatori che
              vogliono lasciare il segno.
            </p>
            <Link href="/diari-di-pesca" className="hp-btn-gold">
              SCOPRI I DIARI
            </Link>
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
            <div className="photo-slot" data-reveal style={{ border: "none", background: "none", padding: 0 }}>
              <img
                src="/images/cover-mare-foce.jpg"
                alt="Diario di Pesca Professionale — Mare & Foce"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="photo-slot" data-reveal data-reveal-delay="1" style={{ border: "none", background: "none", padding: 0 }}>
              <img
                src="/images/cover-feeder.jpg"
                alt="Diario di Pesca Professionale — Feeder"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
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
              <div className="hp-store-badge">▶ Disponibile su Google Play</div>
              <div className="hp-store-badge"> Scarica su App Store</div>
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
            {logEntries.map((e, i) => (
              <Link href="/blog" key={i} className="hp-log-row">
                <span className={`hp-tag ${e.tag}`}>{e.label}</span>
                <span className="hp-log-date">{e.date}</span>
                <span className="hp-log-title">{e.title}</span>
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
            <div className="hp-news-fine">Nessuno spam. Promesso.</div>
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
              <Link href="/diari-di-pesca">Diario Mare &amp; Foce</Link>
              <Link href="/diari-di-pesca">Diario Feeder</Link>
              <Link href="/diari-di-pesca">Tutti i diari</Link>
              <Link href="/diari-di-pesca">Dove acquistare</Link>
            </div>
            <div>
              <h4>APP</h4>
              <Link href="/diari-di-pesca">Funzionalità</Link>
              <Link href="/diari-di-pesca">Come funziona</Link>
              <Link href="/diari-di-pesca">FAQ</Link>
              <Link href="/diari-di-pesca">Scarica l'app</Link>
            </div>
            <div>
              <h4>BLOG</h4>
              <Link href="/blog">Articoli</Link>
              <Link href="/blog?cat=Tecniche">Tecniche</Link>
              <Link href="/blog?cat=Attrezzatura">Attrezzatura</Link>
              <Link href="/blog">Ambienti</Link>
            </div>
            <div>
              <h4>INFO</h4>
              <Link href="/chi-sono">Chi sono</Link>
              <Link href="/contatti">Contatti</Link>
              <Link href="/contatti">Newsletter</Link>
              <Link href="/contatti">Privacy Policy</Link>
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

