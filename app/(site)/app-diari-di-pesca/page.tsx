export const metadata = { title: "App Diari di Pesca — Enrico Avagliano" };

const features = [
  {
    title: "Diario digitale",
    text: "Registra ogni uscita: spot, esche, lenze usate, catture e condizioni. Tutto organizzato e sempre a portata di mano, senza fogli sparsi.",
  },
  {
    title: "Maree e luna in tempo reale",
    text: "Consulta l'andamento delle maree e le fasi lunari direttamente in app, per pianificare le uscite nei momenti più propizi.",
  },
  {
    title: "Le lenze di Enrico",
    text: "Tutte le montature e gli assetti usati da Enrico Avagliano, pronti da consultare e replicare sul campo.",
  },
];

export default function AppDiariDiPesca() {
  return (
    <main className="wrap prose-width" style={{ padding: "70px 0 100px" }}>
      <div className="eyebrow" style={{ color: "var(--water)" }}>
        App companion
      </div>
      <h1 style={{ fontSize: "2.4rem", marginTop: 10 }}>App Diari di Pesca</h1>
      <p style={{ fontSize: "1.1rem", lineHeight: 1.7, marginTop: 24 }}>
        Un'app pensata per accompagnare i diari cartacei: il posto digitale
        dove tenere traccia di ogni sessione di pesca e trasformare
        l'esperienza sul campo in un metodo.
      </p>

      <div style={{ marginTop: 40, display: "grid", gap: 24 }}>
        {features.map((f) => (
          <div key={f.title}>
            <h2 style={{ fontSize: "1.15rem" }}>{f.title}</h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.7, marginTop: 6, color: "var(--muted)" }}>
              {f.text}
            </p>
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
          Non è disponibile come download libero: l'accesso è riservato a chi
          possiede il libro cartaceo, tramite il QR code stampato
          all'interno. Acquistando uno dei diari, sblocchi subito l'app
          companion completa, gratis per sempre.
        </p>
        <a
          href="/diari-di-pesca"
          className="btn btn-primary"
          style={{ display: "inline-block", marginTop: 20 }}
        >
          Scopri i diari
        </a>
      </div>
    </main>
  );
}

