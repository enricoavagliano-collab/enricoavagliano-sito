import { cookies } from "next/headers";
import crypto from "crypto";

// Login semplice a singola password, pensato per un solo amministratore
// (Enrico). La password va impostata come variabile d'ambiente ADMIN_PASSWORD
// su Vercel — non è mai scritta nel codice.

export const ADMIN_COOKIE = "ea_admin_session";

function expectedToken(): string | null {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export function isAuthenticated(): boolean {
  const expected = expectedToken();
  if (!expected) return false;
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return token === expected;
}

export function checkPassword(password: string): boolean {
  return !!process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
}

export function sessionCookieValue(): string {
  return expectedToken() ?? "";
}

