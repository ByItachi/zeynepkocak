import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { saveGeneratedAsset } from "@/lib/imagegen";

export const dynamic = "force-dynamic";

// Harici görsel URL'sini kütüphaneye indirip MediaAsset olarak kaydeder.
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !canAccessAdmin(user.role)) {
      return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
    }
    const body = await req.json().catch(() => null);
    const { url, altText, caption } = body ?? {};
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "url gerekli." }, { status: 400 });
    }

    const now = Date.now();
    const { assetId, url: savedUrl } = await saveGeneratedAsset(url, {
      fileName: `external-${now}`,
      altText,
      caption,
      category: "other",
    });

    // Kaydı external olarak işaretle
    await prisma.mediaAsset.update({
      where: { id: assetId },
      data: { source: "external", isAi: false },
    });

    return NextResponse.json({ assetId, url: savedUrl });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? "Hata") }, { status: 500 });
  }
}
