export const metadata = { title: "Privacy Policy — Enrico Avagliano" };

export default function Privacy() {
  return (
    <main className="wrap prose-width" style={{ padding: "70px 0 100px" }}>
      <div className="eyebrow" style={{ color: "var(--water)" }}>
        Informazioni legali
      </div>
      <h1 style={{ fontSize: "2.2rem", marginTop: 10 }}>Privacy Policy</h1>
      <p style={{ fontSize: "1rem", lineHeight: 1.75, marginTop: 24, color: "var(--muted)" }}>
        Ultimo aggiornamento: settembre 2026
      </p>

      <h2 style={{ fontSize: "1.25rem", marginTop: 36 }}>Titolare del trattamento</h2>
      <p style={{ fontSize: "1rem", lineHeight: 1.75, marginTop: 12 }}>
        Il Titolare del trattamento dei dati raccolti su questo sito è Enrico
        Avagliano, contattabile all'indirizzo email{" "}
        <a href="mailto:info@enricoavagliano.com">info@enricoavagliano.com</a>.
      </p>

      <h2 style={{ fontSize: "1.25rem", marginTop: 32 }}>Dati raccolti</h2>
      <p style={{ fontSize: "1rem", lineHeight: 1.75, marginTop: 12 }}>
        Questo sito raccoglie solo i dati personali che l'utente fornisce
        volontariamente, ad esempio compilando il modulo di contatto o
        iscrivendosi alla newsletter (nome e indirizzo email). Non vengono
        raccolti dati sensibili.
      </p>

      <h2 style={{ fontSize: "1.25rem", marginTop: 32 }}>Finalità del trattamento</h2>
      <p style={{ fontSize: "1rem", lineHeight: 1.75, marginTop: 12 }}>
        I dati forniti vengono utilizzati esclusivamente per rispondere alle
        richieste inviate tramite il modulo di contatto e, se l'utente si
        iscrive, per inviare la newsletter con aggiornamenti su articoli,
        libri e novità del sito. I dati non vengono ceduti, venduti o
        comunicati a terzi per finalità commerciali.
      </p>

      <h2 style={{ fontSize: "1.25rem", marginTop: 32 }}>Cookie</h2>
      <p style={{ fontSize: "1rem", lineHeight: 1.75, marginTop: 12 }}>
        Il sito utilizza esclusivamente cookie tecnici, necessari al suo
        corretto funzionamento (ad esempio per ricordare le preferenze di
        navigazione). Questi cookie non richiedono consenso ai sensi della
        normativa vigente. Non vengono attualmente utilizzati cookie di
        profilazione o di terze parti a fini pubblicitari; se in futuro
        venissero introdotti, questa pagina sarà aggiornata e verrà richiesto
        un consenso esplicito.
      </p>

      <h2 style={{ fontSize: "1.25rem", marginTop: 32 }}>Conservazione dei dati</h2>
      <p style={{ fontSize: "1rem", lineHeight: 1.75, marginTop: 12 }}>
        I dati raccolti tramite il modulo di contatto vengono conservati per
        il tempo necessario a gestire la richiesta. I dati di chi si iscrive
        alla newsletter vengono conservati fino alla richiesta di
        cancellazione da parte dell'utente.
      </p>

      <h2 style={{ fontSize: "1.25rem", marginTop: 32 }}>I tuoi diritti</h2>
      <p style={{ fontSize: "1rem", lineHeight: 1.75, marginTop: 12 }}>
        In qualsiasi momento puoi richiedere l'accesso ai tuoi dati, la loro
        rettifica o cancellazione, la limitazione del trattamento, o opporti
        al trattamento stesso, scrivendo a{" "}
        <a href="mailto:info@enricoavagliano.com">info@enricoavagliano.com</a>.
        Puoi inoltre annullare l'iscrizione alla newsletter in qualsiasi
        momento tramite il link presente in ogni email ricevuta.
      </p>

      <p style={{ fontSize: "1rem", lineHeight: 1.75, marginTop: 32 }}>
        Per qualsiasi domanda puoi scrivere anche tramite la pagina{" "}
        <a href="/contatti">Contatti</a>.
      </p>
    </main>
  );
}

