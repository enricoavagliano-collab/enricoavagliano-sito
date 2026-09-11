export const metadata = { title: "Chi sono — Enrico Avagliano" };

export default function ChiSono() {
  return (
    <main className="wrap prose-width" style={{ padding: "70px 0 100px" }}>
      <div className="eyebrow" style={{ color: "var(--water)" }}>
        Chi sono
      </div>
      <h1 style={{ fontSize: "2.4rem", marginTop: 10 }}>Enrico Avagliano</h1>
      <p style={{ fontSize: "1.1rem", lineHeight: 1.7, marginTop: 24 }}>
        Scrivo di pesca dal 2011, con contributi su riviste come Pescare
        Mare, Pesca da Terra, Pesca In, I Segreti dei Pescatori e Correnti.
        Sono ambassador Maver e Stonfo, e gestisco questo blog per
        condividere tecniche, lenze e diari di pesca maturati sul campo, tra
        mare e foce.
      </p>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginTop: 18 }}>
        Oltre agli articoli, curo una collana di diari di pesca — libri
        pratici con un'app companion per tenere traccia di uscite, maree e
        montature.
      </p>
    </main>
  );
}

