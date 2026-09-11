export const metadata = { title: "Privacy Policy — Enrico Avagliano" };

export default function Privacy() {
  return (
    <main className="wrap prose-width" style={{ padding: "70px 0 100px" }}>
      <div className="eyebrow" style={{ color: "var(--water)" }}>
        Informazioni legali
      </div>
      <h1 style={{ fontSize: "2.2rem", marginTop: 10 }}>Privacy Policy</h1>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginTop: 24 }}>
        Questa pagina è in fase di completamento e conterrà a breve
        l'informativa completa sul trattamento dei dati personali, ai sensi
        del Regolamento (UE) 2016/679 (GDPR), inclusa la gestione dei cookie
        e dell'iscrizione alla newsletter.
      </p>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginTop: 16 }}>
        Per qualsiasi domanda nel frattempo, puoi scrivere tramite la pagina{" "}
        <a href="/contatti">Contatti</a>.
      </p>
    </main>
  );
}

