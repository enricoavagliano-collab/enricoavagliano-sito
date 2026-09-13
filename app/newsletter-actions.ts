"use server";

import { redirect } from "next/navigation";
import { getPool, ensureSchema } from "@/lib/db";

const WELCOME_EMAIL_HTML = `
<div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #16211f;">
  <h1 style="font-size: 22px; margin-bottom: 4px;">Benvenuto/a!</h1>
  <p style="font-size: 15px; line-height: 1.6;">
    Grazie per esserti iscritto/a alla newsletter di Enrico Avagliano. Da qui in poi
    riceverai aggiornamenti su nuovi articoli, tecniche di pesca e le novità sui
    prossimi libri.
  </p>
  <p style="font-size: 15px; line-height: 1.6;">
    Nel frattempo, se non li conosci ancora, ti presento i <strong>Diari di Pesca
    Professionale</strong>: due diari pratici — <em>Mare &amp; Foce</em> e
    <em>Feeder</em> — pensati per registrare ogni uscita, tenere traccia di lenze,
    esche e catture, e migliorare uscita dopo uscita.
  </p>
  <p style="font-size: 15px; line-height: 1.6;">
    Ogni diario include gratuitamente l'accesso all'<strong>app companion</strong>:
    diario digitale, maree e fasi lunari in tempo reale, e tutte le lenze usate da
    Enrico, pronte da consultare sul campo.
  </p>
  <p style="margin: 28px 0;">
    <a href="https://www.amazon.it/dp/B0GRG9KWD1" style="background:#d9a544;color:#0a1520;padding:12px 20px;text-decoration:none;border-radius:4px;font-weight:bold;display:inline-block;margin-right:10px;">Diario Mare &amp; Foce</a>
    <a href="https://www.amazon.it/dp/B0HH8LWVY7" style="background:#d9a544;color:#0a1520;padding:12px 20px;text-decoration:none;border-radius:4px;font-weight:bold;display:inline-block;">Diario Feeder</a>
  </p>
  <p style="font-size: 15px; line-height: 1.6;">
    In arrivo anche <strong>"Il senso dell'acqua"</strong>, il nuovo libro dedicato
    alla pesca in mare e in foce — resterai aggiornato/a anche su questo.
  </p>
  <p style="font-size: 13px; color: #6b7570; margin-top: 40px;">
    Enrico Avagliano — enricoavagliano.com
  </p>
</div>
`;

async function addToBrevo(email: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  if (!apiKey) return;

  // Aggiunge il contatto alla lista
  await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: listId ? [parseInt(listId, 10)] : undefined,
      updateEnabled: true,
    }),
  }).catch((err) => console.error("Errore Brevo contatto:", err));

  // Invia l'email di benvenuto
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Enrico Avagliano", email: "info@enricoavagliano.com" },
      to: [{ email }],
      subject: "Benvenuto nella community di Enrico Avagliano",
      htmlContent: WELCOME_EMAIL_HTML,
    }),
  }).catch((err) => console.error("Errore Brevo email:", err));
}

export async function subscribeAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    redirect("/?newsletter=errore");
  }

  const pool = getPool();
  if (pool) {
    try {
      await ensureSchema();
      await pool.query(
        `INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING`,
        [email]
      );
    } catch (err) {
      console.error("Errore salvataggio iscritto:", err);
    }
  }

  await addToBrevo(email);

  redirect("/?newsletter=ok");
}

