import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";

export const dynamic = "force-dynamic";

// Düzenleme: alt text, caption, odak noktası
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !canAccessAdmin(user.role)) {
      return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
    }
    const body = await req.json().catch(() => null);
    const { id, altText, caption, focusX, focusY } = body ?? {};
    if (!id) return NextResponse.json({ error: "id gerekli." }, { status: 400 });

    const data: Record<string, unknown> = {};
    if (typeof altText === "string") data.altText = altText;
    if (typeof caption === "string") data.caption = caption;
    if (typeof focusX === "number") data.focusX = focusX;
    if (typeof focusY === "number") data.focusY = focusY;

    const asset = await prisma.mediaAsset.update({ where: { id }, data });
    return NextResponse.json({ asset });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? "Hata") }, { status: 500 });
  }
}

// Silme: kullanımda olan varlıklar engellemek yerine uyarıyla silinir.
export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !canAccessAdmin(user.role)) {
      return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id gerekli." }, { status: 400 });

    const asset = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!asset) return NextResponse.json({ error: "Bulunamadı." }, { status: 404 });

    // İlgili usages kayıtlarını temizle (cascade ile)
    await prisma.mediaAsset.delete({ where: { id } });

    // Dosyayı diskten sil (public/uploads veya public/images altındaysa)
    try {
      const cleaned = asset.url.replace(/^\/+/, "");
      const p = path.join(process.cwd(), "public", cleaned);
      if (p.startsWith(path.join(process.cwd(), "public"))) {
        if (fs.existsSync(p) && fs.statSync(p).isFile()) {
          fs.unlinkSync(p);
        }
      }
    } catch {
      /* dosya silinemediyse yok say */
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? "Hata") }, { status: 500 });
  }
}
