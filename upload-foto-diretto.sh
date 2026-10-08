#!/bin/bash
set -e
echo "Caricamento foto diretto su Blob (senza limite di peso/numero)..."
mkdir -p app/api/admin/upload components app/admin
cat > "app/api/admin/upload/route.ts" << 'EAWEBEOF'
import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Rilascia al browser (solo se sei loggato in /admin) il permesso di caricare
// una foto direttamente su Vercel Blob, senza passare dal limite di 4 MB.
export async function POST(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "non autorizzato" }, { status: 401 });
  }
  const body = (await request.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        maximumSizeInBytes: 20 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(json);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "errore" }, { status: 400 });
  }
}
EAWEBEOF

cat > "components/PhotoUploader.tsx" << 'EAWEBEOF'
"use client";

import { useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

type Item = { name: string; status: "in corso" | "ok" | "errore"; url?: string; msg?: string };

// Riduce la foto (lato lungo max 2000 px, JPEG 85%) prima di caricarla:
// meno peso, pagine piu' veloci. Se non riesce, carica l'originale.
async function ridimensiona(file: File): Promise<File> {
  try {
    if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
    const bmp = await createImageBitmap(file);
    const max = 2000;
    const scala = Math.min(1, max / Math.max(bmp.width, bmp.height));
    if (scala === 1 && file.size < 1.2 * 1024 * 1024) return file;
    const w = Math.round(bmp.width * scala);
    const h = Math.round(bmp.height * scala);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bmp, 0, 0, w, h);
    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/jpeg", 0.85));
    if (!blob || blob.size >= file.size) return file;
    const nome = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], nome, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export default function PhotoUploader({ name, multiple = false }: { name: string; multiple?: boolean }) {
  const [items, setItems] = useState<Item[]>([]);
  const wrap = useRef<HTMLDivElement>(null);
  const busy = items.some((i) => i.status === "in corso");

  // Finche' una foto e' in caricamento, il pulsante "Salva" resta bloccato
  useEffect(() => {
    const form = wrap.current?.closest("form");
    if (!form) return;
    const bottoni = form.querySelectorAll<HTMLButtonElement>('button[type="submit"], button:not([type])');
    bottoni.forEach((b) => (b.disabled = busy));
    return () => bottoni.forEach((b) => (b.disabled = false));
  }, [busy]);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    const base = multiple ? items.length : 0;
    if (!multiple) setItems([]);
    const nuovi: Item[] = files.map((f) => ({ name: f.name, status: "in corso" as const }));
    setItems((prev) => (multiple ? [...prev, ...nuovi] : nuovi));
    // una alla volta, in ordine di selezione
    for (let k = 0; k < files.length; k++) {
      const idx = base + k;
      try {
        const piccola = await ridimensiona(files[k]);
        const blob = await upload(`blog/${piccola.name}`, piccola, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
        });
        setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, status: "ok", url: blob.url } : it)));
      } catch (err: any) {
        setItems((prev) =>
          prev.map((it, i) => (i === idx ? { ...it, status: "errore", msg: err?.message || "errore" } : it))
        );
      }
    }
  }

  return (
    <div ref={wrap}>
      <input type="file" accept="image/*" multiple={multiple} onChange={onChange} />
      {items.map((it, i) => (
        <div key={i} className="admin-list-meta" style={{ marginTop: 4 }}>
          {it.status === "ok" ? "✓" : it.status === "errore" ? "✗" : "…"} {it.name}
          {it.status === "in corso" && " — caricamento in corso, attendi"}
          {it.status === "errore" && ` — non caricata (${it.msg}). Riprova.`}
          {it.status === "ok" && it.url && <input type="hidden" name={name} value={it.url} />}
        </div>
      ))}
      {items.length > 0 && !busy && items.some((i) => i.status === "ok") && (
        <div className="admin-list-meta" style={{ marginTop: 6, color: "var(--gold, #d9a544)" }}>
          Foto pronte: ora premi "Salva modifiche" in fondo.
        </div>
      )}
    </div>
  );
}
EAWEBEOF

cat > "app/admin/actions.ts" << 'EAWEBEOF'
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, checkPassword, sessionCookieValue } from "@/lib/auth";
import { uploadImage } from "@/lib/blob";
import { createArticle, deleteArticle, getArticleBySlug } from "@/lib/articles-store";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");

  if (!checkPassword(password)) {
    redirect("/admin?error=1");
  }

  cookies().set(ADMIN_COOKIE, sessionCookieValue(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 giorni
  });

  redirect("/admin");
}

export async function logoutAction() {
  cookies().delete(ADMIN_COOKIE);
  redirect("/admin");
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

export async function createArticleAction(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "Tecniche").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const date =
    String(formData.get("date") || "").trim() ||
    new Date().toISOString().slice(0, 10);
  const customSlug = String(formData.get("slug") || "").trim();

  if (!title) {
    redirect("/admin?error=titolo-mancante");
  }

  const slug = slugify(customSlug || title);

  const isBlobUrl = (u: string) =>
    /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\//.test(u);

  let imageUrl: string | undefined = undefined;
  const coverUrl = String(formData.get("coverUrl") || "");
  if (isBlobUrl(coverUrl)) imageUrl = coverUrl;
  const imageFile = formData.get("image");
  if (!imageUrl && imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > 1.5 * 1024 * 1024) {
      redirect("/admin?error=immagine-troppo-grande");
    }
    imageUrl = await uploadImage(imageFile);
  }

  let extraImages: string[] | undefined = undefined;
  const extraFiles = formData.getAll("extraImages") as unknown as File[];
  const newExtraImages: string[] = [];
  for (const u of formData.getAll("extraUrls")) {
    if (typeof u === "string" && isBlobUrl(u)) newExtraImages.push(u);
  }
  for (const f of extraFiles) {
    if (f instanceof File && f.size > 0) {
      if (f.size > 1.5 * 1024 * 1024) {
        redirect("/admin?error=immagine-troppo-grande");
      }
      newExtraImages.push(await uploadImage(f));
    }
  }
  if (newExtraImages.length > 0) {
    const existing = await getArticleBySlug(slug);
    const oldExtraImages = existing?.extraImages || [];
    extraImages = [...oldExtraImages, ...newExtraImages];
  }

  const videosRaw = String(formData.get("videos") || "");
  const videos = videosRaw
    .split(/\r?\n/)
    .map((v) => v.trim())
    .filter(Boolean);

  await createArticle({ slug, title, category, excerpt, content, date, imageUrl, extraImages, videos });

  redirect("/admin?ok=1");
}

export async function deleteArticleAction(formData: FormData) {
  const slug = String(formData.get("slug") || "");
  if (slug) {
    await deleteArticle(slug);
  }
  redirect("/admin?ok=1");
}
EAWEBEOF

cat > "app/admin/page.tsx" << 'EAWEBEOF'
import { isAuthenticated } from "@/lib/auth";
import { getArticles, getArticleBySlug } from "@/lib/articles-store";
import PhotoUploader from "@/components/PhotoUploader";
import {
  loginAction,
  logoutAction,
  createArticleAction,
  deleteArticleAction,
} from "./actions";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Area riservata — Enrico Avagliano",
  robots: { index: false, follow: false },
};

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
    ? (await getArticleBySlug(searchParams.edit)) ?? undefined
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
      {searchParams.error === "immagine-troppo-grande" && (
        <div className="admin-warning">
          Una delle immagini caricate supera 1,5 MB. Riducila di dimensione (anche solo
          con uno screenshot ridimensionato) e riprova.
        </div>
      )}
      {searchParams.error === "titolo-mancante" && (
        <div className="admin-warning">Il titolo è obbligatorio.</div>
      )}

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
            Immagine di copertina (facoltativa, viene ridotta in automatico)
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
            <PhotoUploader name="coverUrl" />
          </label>
          <label>
            Foto extra da inserire dentro al testo (facoltative, anche molte insieme: vengono ridotte e caricate una alla volta)
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
            <PhotoUploader name="extraUrls" multiple />
            <div className="admin-list-meta" style={{ marginTop: 6 }}>
              Carica le foto nell'ordine in cui vuoi usarle, poi nel testo qui sotto scrivi{" "}
              <code>[[img1]]</code>, <code>[[img2]]</code> ecc. nel punto esatto dove vuoi
              che appaiano. Le foto che carichi qui si aggiungono a quelle già presenti
              (non le cancellano): se ne hai già 4 e ne carichi altre 2, le nuove diventano{" "}
              <code>[[img5]]</code> e <code>[[img6]]</code>.
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
            <div className="admin-list-meta" style={{ marginTop: 6 }}>
              Per un link nel testo scrivi <code>[testo](https://indirizzo.com)</code> — es.{" "}
              <code>[il sito di Stonfo](https://stonfo.com)</code>.
            </div>
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

EAWEBEOF

echo "Fatto."
