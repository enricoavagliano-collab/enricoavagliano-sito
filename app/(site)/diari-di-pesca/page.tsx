export const metadata = { title: "Diari di Pesca — Enrico Avagliano" };

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
        digitale, maree e luna in tempo reale, e le lenze usate da Enrico.
      </p>
      <a
        href="https://diari-pesca-app-1wx8.vercel.app"
        className="btn btn-primary"
        style={{ display: "inline-block", marginTop: 30 }}
      >
        Apri l'app Diari di Pesca
      </a>
    </main>
  );
}

