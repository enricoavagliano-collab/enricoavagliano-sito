import Link from "next/link";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header">
        <div className="wrap site-header-inner">
          <Link href="/" className="brand">
            enrico<span>avagliano</span>.com
          </Link>
          <nav className="main-nav">
            <Link href="/blog">Articoli</Link>
            <Link href="/diari-di-pesca">Diari di Pesca</Link>
            <Link href="/chi-sono">Chi sono</Link>
            <Link href="/contatti">Contatti</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="wrap foot-grid">
          <div>
            <div className="brand" style={{ marginBottom: 10 }}>
              enrico<span>avagliano</span>.com
            </div>
            <p style={{ maxWidth: "32ch" }}>
              La pesca a portata di click. Ambassador Maver e Stonfo.
            </p>
          </div>
          <div>
            <Link href="/blog">Articoli</Link>
            <br />
            <Link href="/diari-di-pesca">Diari di Pesca</Link>
            <br />
            <Link href="/chi-sono">Chi sono</Link>
          </div>
          <div>© {new Date().getFullYear()} Enrico Avagliano</div>
        </div>
      </footer>
    </>
  );
}

