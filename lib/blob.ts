import { put } from "@vercel/blob";

// Carica un'immagine su Vercel Blob e restituisce l'indirizzo pubblico (URL).
// Nel database resta solo questo indirizzo, non l'immagine.
export async function uploadImage(file: File, folder = "blog"): Promise<string> {
  const safeName = (file.name || "foto.jpg").replace(/[^a-zA-Z0-9._-]/g, "-");
  const blob = await put(`${folder}/${safeName}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type || "image/jpeg",
  });
  return blob.url;
}

export async function uploadDataUri(dataUri: string, folder = "blog"): Promise<string> {
  const m = /^data:([^;,]+);base64,([\s\S]*)$/.exec(dataUri);
  if (!m) return dataUri;
  const mime = m[1];
  const ext = mime.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
  const buf = Buffer.from(m[2], "base64");
  const blob = await put(`${folder}/img.${ext}`, buf, {
    access: "public",
    addRandomSuffix: true,
    contentType: mime,
  });
  return blob.url;
}
