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
