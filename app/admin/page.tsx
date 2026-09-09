import { isAuthenticated } from "@/lib/auth";
import { getArticles } from "@/lib/articles-store";
import {
  loginAction,
  logoutAction,
  createArticleAction,
  deleteArticleAction,
} from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Area riservata — Enrico Avagliano" };

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { error?: string; ok?: string; edit?: string };
}) {
  const authed = isAuthenticated();

  if (!authed) {
    return (
      <main className="admin-shell">
        <form action={loginAction} className="admin-login">
          <h1>Area riservata</h1>
          <p>Accedi per gestire gli articoli del blog.</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoFocus
          />
          <button type="submit" className="hp-btn-solid">
            Entra
          </button>
          {searchParams.error && (
            <p className="admin-error">
              {searchParams.error === "titolo-mancante"
                ? "Il titolo è obbligatorio."
                : "Password errata."}
            </p>
          )}
        </form>
      </main>
    );
  }

  const { items, dbConnected } = await getArticles();
  const today = new Date().toISOString().slice(0, 10);
  const editing = searchParams.edit
    ? items.find((a) => a.slug === searchParams.edit)
    : undefined;
  const baseCategories = [
    "Regolamenti",
    "Cronaca",
    "Curiosità",
    "Feeder",
    "Foce",
    "Tutorial",
    "Mosca",
    "Passata",
    "Inglese",
    "Carpfishing",
    "Racconti",
    "Accessori",
    "Mare",
    "Itinerario",
    "Bolognese",
  ];
  const categories = Array.from(
    new Set([...baseCategories, ...items.map((a) => a.category)])
  ).sort();

  return (
    <main className="admin-shell">
      <div className="admin-top">
        <h1>Gestione articoli</h1>
        <form action={logoutAction}>
          <button type="submit" className="admin-link-btn">
            Esci
          </button>
        </form>
      </div>

      {!dbConnected && (
        <div className="admin-warning">
          Database non collegato: imposta la variabile <code>DATABASE_URL</code>{" "}
          su Vercel per pubblicare davvero gli articoli. Per ora vedi solo i
          contenuti segnaposto e non puoi salvare.
        </div>
      )}
      {searchParams.ok && <div className="admin-ok">Salvato con successo.</div>}

      <section className="admin-card">
        <h2>{editing ? `Modifica: ${editing.title}` : "Nuovo articolo"}</h2>
        <form
          action={createArticleAction}
          className="admin-form"
          encType="multipart/form-data"
          key={editing?.slug || "new"}
        >
          <label>
            Titolo
            <input type="text" name="title" required defaultValue={editing?.title} />
          </label>
          <label>
            Slug {editing ? "(lascialo com'è per aggiornare lo stesso articolo)" : "(opzionale — generato dal titolo se lo lasci vuoto)"}
            <input
              type="text"
              name="slug"
              placeholder="es. nodi-essenziali"
              defaultValue={editing?.slug}
            />
          </label>
          <div className="admin-form-row">
            <label>
              Categoria
              <input
                type="text"
                name="category"
                list="category-list"
                defaultValue={editing?.category || ""}
                placeholder="es. Foce"
                required
              />
              <datalist id="category-list">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
            <label>
              Data
              <input type="date" name="date" defaultValue={editing?.date || today} />
            </label>
          </div>
          <label>
            Immagine di copertina (facoltativa, max 4MB)
            {editing?.imageUrl && (
              <div style={{ margin: "8px 0" }}>
                <img
                  src={editing.imageUrl}
                  alt=""
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                />
                <div className="admin-list-meta">
                  Immagine attuale — carica un file solo se vuoi sostituirla.
                </div>
              </div>
            )}
            <input type="file" name="image" accept="image/*" />
            <input type="hidden" name="existingImageUrl" value={editing?.imageUrl ?? ""} />
          </label>
          <label>
            Foto extra da inserire dentro al testo (facoltative, puoi selezionarne più di una insieme)
            {editing?.extraImages && editing.extraImages.length > 0 && (
              <div style={{ display: "flex", gap: 8, margin: "8px 0", flexWrap: "wrap" }}>
                {editing.extraImages.map((src, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <img
                      src={src}
                      alt=""
                      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                    />
                    <div className="admin-list-meta">[[img{i + 1}]]</div>
                  </div>
                ))}
              </div>
            )}
            <input type="file" name="extraImages" accept="image/*" multiple />
            <input
              type="hidden"
              name="existingExtraImages"
              value={editing?.extraImages ? JSON.stringify(editing.extraImages) : ""}
            />
            <div className="admin-list-meta" style={{ marginTop: 6 }}>
              Carica le foto nell'ordine in cui vuoi usarle, poi nel testo qui sotto scrivi{" "}
              <code>[[img1]]</code>, <code>[[img2]]</code> ecc. nel punto esatto dove vuoi
              che appaiano. Se ricarichi foto nuove qui, sostituiscono tutte quelle vecchie.
            </div>
          </label>
          <label>
            Video da inserire nel testo (link YouTube o Vimeo, uno per riga, facoltativi)
            <textarea
              name="videos"
              rows={3}
              placeholder={"https://youtube.com/watch?v=...\nhttps://youtube.com/watch?v=..."}
              defaultValue={editing?.videos ? editing.videos.join("\n") : ""}
            />
            <div className="admin-list-meta" style={{ marginTop: 6 }}>
              Incolla un link per riga. Poi nel testo scrivi <code>[[video1]]</code>,{" "}
              <code>[[video2]]</code> ecc. nel punto dove vuoi che appaia, seguendo lo
              stesso ordine dei link qui sopra.
            </div>
          </label>
          <label>
            Estratto (anteprima nella lista blog)
            <textarea name="excerpt" rows={2} required defaultValue={editing?.excerpt} />
          </label>
          <label>
            Contenuto completo
            <textarea name="content" rows={12} defaultValue={editing?.content} />
          </label>
          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" className="hp-btn-solid" disabled={!dbConnected}>
              {editing ? "Salva modifiche" : "Pubblica"}
            </button>
            {editing && (
              <a href="/admin" className="admin-link-btn">
                Annulla modifica
              </a>
            )}
          </div>
        </form>
      </section>

      <section className="admin-card">
        <h2>Articoli pubblicati ({items.length})</h2>
        <div className="admin-list">
          {items.map((a) => (
            <div className="admin-list-row" key={a.slug}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {a.imageUrl && (
                  <img
                    src={a.imageUrl}
                    alt=""
                    style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
                  />
                )}
                <div>
                  <strong>{a.title}</strong>
                  <div className="admin-list-meta">
                    {a.category} — {a.date} — /blog/{a.slug}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={`/admin?edit=${a.slug}`} className="admin-link-btn">
                  Modifica
                </a>
                <form action={deleteArticleAction}>
                  <input type="hidden" name="slug" value={a.slug} />
                  <button
                    type="submit"
                    className="admin-link-btn danger"
                    disabled={!dbConnected}
                  >
                    Elimina
                  </button>
                </form>
              </div>
            </div>
          ))}
          {items.length === 0 && <p>Nessun articolo pubblicato.</p>}
        </div>
      </section>
    </main>
  );
}

