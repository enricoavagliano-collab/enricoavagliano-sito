"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, checkPassword, sessionCookieValue } from "@/lib/auth";
import { createArticle, deleteArticle } from "@/lib/articles-store";

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

  let imageUrl: string | null = null;
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > 4 * 1024 * 1024) {
      redirect("/admin?error=immagine-troppo-grande");
    }
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const mime = imageFile.type || "image/jpeg";
    imageUrl = `data:${mime};base64,${buffer.toString("base64")}`;
  }
  const existingImageUrl = String(formData.get("existingImageUrl") || "").trim();
  if (!imageUrl && existingImageUrl) {
    imageUrl = existingImageUrl;
  }

  await createArticle({ slug, title, category, excerpt, content, date, imageUrl });

  redirect("/admin?ok=1");
}

export async function deleteArticleAction(formData: FormData) {
  const slug = String(formData.get("slug") || "");
  if (slug) {
    await deleteArticle(slug);
  }
  redirect("/admin?ok=1");
}

