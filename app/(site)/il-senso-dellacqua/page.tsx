export const metadata = { title: "Il senso dell'acqua — Enrico Avagliano" };

export default function IlSensoDellAcqua() {
  return (
    <main className="wrap prose-width" style={{ padding: "70px 0 100px" }}>
      <div className="eyebrow" style={{ color: "var(--water)" }}>
        In arrivo
      </div>
      <h1 style={{ fontSize: "2.4rem", marginTop: 10 }}>Il senso dell'acqua</h1>
      <p style={{ fontSize: "1.1rem", lineHeight: 1.7, marginTop: 24 }}>
        Il nuovo libro dedicato alla pesca in foce: non solo tecnica, ma un
        racconto più intimo di cosa significa stare tra acqua dolce e acqua
        salata, leggere una corrente, riconoscere il momento giusto.
      </p>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginTop: 16, color: "var(--muted)" }}>
        98 pagine, 12 capitoli. In uscita a breve — resta aggiornato tramite
        la newsletter o i canali social per essere tra i primi a saperlo.
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

