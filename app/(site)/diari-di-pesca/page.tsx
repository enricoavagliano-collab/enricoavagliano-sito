export const metadata = { title: "Diari di Pesca — Enrico Avagliano" };

const books = [
  {
    title: "Diario di Pesca Professionale — Mare & Foce",
    cover: "/images/cover-mare-foce.jpg",
    amazon: "https://www.amazon.it/dp/B0GRG9KWD1",
  },
  {
    title: "Diario di Pesca Professionale — Feeder",
    cover: "/images/cover-feeder.jpg",
    amazon: "https://www.amazon.it/dp/B0HH8LWVY7",
  },
];

export default function DiariDiPesca() {
  return (
    <main className="wrap prose-width" style={{ padding: "70px 0 100px" }}>
      <div className="eyebrow" style={{ color: "var(--water)" }}>
        Collana
      </div>
      <h1 style={{ fontSize: "2.4rem", marginTop: 10 }}>Diari di Pesca</h1>
      <p style={{ fontSize: "1.1rem", lineHeight: 1.7, marginTop: 24 }}>
        Una collana di libri pratici — Mare e Foce, Feeder — pensati come
        diari di bordo per ogni uscita, con un'app companion dedicata: diario
        digitale, maree e luna in tempo reale, e le lenze usate da Enrico
        Avagliano.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 24,
          marginTop: 40,
        }}
      >
        {books.map((b) => (
          <div key={b.amazon}>
            <img
              src={b.cover}
              alt={b.title}
              style={{ width: "100%", borderRadius: 6, display: "block" }}
            />
            <a
              href={b.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: "block", textAlign: "center", marginTop: 12 }}
            >
              Acquista su Amazon
            </a>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 40,
          padding: 24,
          border: "1px solid var(--border)",
          borderRadius: 8,
          background: "rgba(0,0,0,0.02)",
        }}
      >
        <h2 style={{ fontSize: "1.2rem", marginBottom: 10 }}>
          L'app è inclusa gratuitamente nel libro
        </h2>
        <p style={{ lineHeight: 1.7 }}>
          Non è disponibile come download libero: l'accesso all'app Diari di
          Pesca è riservato a chi possiede il libro cartaceo, tramite il QR
          code stampato all'interno. Acquistando uno dei diari, sblocchi
          subito l'app companion completa, gratis per sempre.
        </p>
        <a
          href="/app-diari-di-pesca"
          className="btn btn-secondary"
          style={{ display: "inline-block", marginTop: 16 }}
        >
          Scopri di più sull'app
        </a>
      </div>
    </main>
  );
}

