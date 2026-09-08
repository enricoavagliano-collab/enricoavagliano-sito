export const metadata = { title: "Contatti — Enrico Avagliano" };

export default function Contatti() {
  return (
    <main className="wrap prose-width" style={{ padding: "70px 0 100px" }}>
      <div className="eyebrow" style={{ color: "var(--water)" }}>
        Contatti
      </div>
      <h1 style={{ fontSize: "2.4rem", marginTop: 10 }}>Scrivimi</h1>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginTop: 24 }}>
        Per collaborazioni, richieste stampa o domande sui diari di pesca,
        scrivi a{" "}
        <a href="mailto:info@enricoavagliano.com" style={{ borderBottom: "1px solid var(--line)" }}>
          info@enricoavagliano.com
        </a>
        .
      </p>
    </main>
  );
}

