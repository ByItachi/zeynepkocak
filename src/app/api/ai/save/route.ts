import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { saveGeneratedAsset } from "@/lib/imagegen";

export const dynamic = "force-dynamic";

const SaveSchema = z.object({
  resultId: z.string().min(1),
  fileName: z.string().min(1).max(120).default("generated"),
  altText: z.string().max(300).optional(),
  caption: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !canAccessAdmin(user.role)) {
      return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const parsed = SaveSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Geçersiz form." }, { status: 400 });
    }
    const { resultId, fileName, altText, caption } = parsed.data;

    const result = await prisma.aIGenerationResult.findUnique({
      where: { id: resultId },
      include: { generation: true },
    });
    if (!result || !result.url) {
      return NextResponse.json({ error: "Üretim sonucu bulunamadı." }, { status: 404 });
    }

    const { assetId, url } = await saveGeneratedAsset(result.url, {
      fileName,
      altText,
      caption,
      generationId: result.generationId,
      category: result.generation.category ?? "other",
    });

    if (fileName) {
      await prisma.aIGenerationResult.update({
        where: { id: resultId },
        data: { isSelected: true },
      });
    }

    // Bir sonuç seçilirse diğerlerinin seçimini kaldır
    await prisma.aIGenerationResult.updateMany({
      where: { generationId: result.generationId, id: { not: resultId } },
      data: { isSelected: false },
    });

    return NextResponse.json({ assetId, url });
  } catch (err: any) {
    return NextResponse.json(
      { error: String(err?.message ?? "Beklenmeyen hata.") },
      { status: 500 }
    );
  }
}
