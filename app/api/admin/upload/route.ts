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
