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
