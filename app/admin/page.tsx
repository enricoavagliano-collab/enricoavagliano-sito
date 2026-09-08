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
  searchParams: { error?: string; ok?: string };
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
        <h2>Nuovo articolo</h2>
        <form action={createArticleAction} className="admin-form">
          <label>
            Titolo
            <input type="text" name="title" required />
          </label>
          <label>
            Slug (opzionale — generato dal titolo se lo lasci vuoto)
            <input type="text" name="slug" placeholder="es. nodi-essenziali" />
          </label>
          <div className="admin-form-row">
            <label>
              Categoria
              <select name="category" defaultValue="Tecniche">
                <option>Tecniche</option>
                <option>Lenze</option>
                <option>Specie</option>
                <option>Attrezzatura</option>
                <option>Spot</option>
              </select>
            </label>
            <label>
              Data
              <input type="date" name="date" defaultValue={today} />
            </label>
          </div>
          <label>
            Estratto (anteprima nella lista blog)
            <textarea name="excerpt" rows={2} required />
          </label>
          <label>
            Contenuto completo
            <textarea name="content" rows={12} />
          </label>
          <button type="submit" className="hp-btn-solid" disabled={!dbConnected}>
            Pubblica
          </button>
        </form>
      </section>

      <section className="admin-card">
        <h2>Articoli pubblicati ({items.length})</h2>
        <div className="admin-list">
          {items.map((a) => (
            <div className="admin-list-row" key={a.slug}>
              <div>
                <strong>{a.title}</strong>
                <div className="admin-list-meta">
                  {a.category} — {a.date} — /blog/{a.slug}
                </div>
              </div>
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
          ))}
          {items.length === 0 && <p>Nessun articolo pubblicato.</p>}
        </div>
      </section>
    </main>
  );
}

