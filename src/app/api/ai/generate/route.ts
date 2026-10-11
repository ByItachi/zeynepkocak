import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { getImageGenStatus, runImageGeneration } from "@/lib/imagegen";

export const dynamic = "force-dynamic";

const GenerationSchema = z.object({
  prompt: z.string().min(4).max(2000),
  negative: z.string().max(2000).optional(),
  style: z.string().max(500).optional(),
  palette: z.string().max(500).optional(),
  aspectRatio: z.string().optional(),
  size: z.string().optional(),
  category: z.string().optional(),
  n: z.number().int().min(1).max(4).optional(),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !canAccessAdmin(user.role)) {
      return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const parsed = GenerationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Geçersiz form: " + parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 }
      );
    }
    const opt = parsed.data;

    const status = getImageGenStatus();
    if (!status.configured) {
      return NextResponse.json(
        {
          error:
            "Görsel üretim sağlayıcısı yapılandırılmamış. Sunucuda IMG_GEN_PROVIDER ve ilgili anahtar env değişkenlerini ayarlayın (örn. IMG_GEN_OPENAI_API_KEY).",
          status: "unconfigured",
        },
        { status: 503 }
      );
    }

    // Üretim geçmişi kaydı
    const generation = await prisma.aIGeneration.create({
      data: {
        prompt: opt.prompt,
        negative: opt.negative,
        style: opt.style,
        palette: opt.palette,
        aspectRatio: opt.aspectRatio,
        size: opt.size,
        category: opt.category ?? "other",
        status: "GENERATING",
        provider: status.provider ?? undefined,
      },
    });

    let urls: string[];
    try {
      urls = await runImageGeneration({
        prompt: opt.prompt,
        negative: opt.negative,
        style: opt.style,
        palette: opt.palette,
        aspectRatio: opt.aspectRatio,
        size: opt.size,
        n: opt.n ?? 1,
      });
    } catch (err: any) {
      await prisma.aIGeneration.update({
        where: { id: generation.id },
        data: { status: "ERROR", error: String(err?.message ?? err) },
      });
      return NextResponse.json(
        { error: String(err?.message ?? err), generationId: generation.id },
        { status: 500 }
      );
    }

    const results = [];
    for (const url of urls) {
      const r = await prisma.aIGenerationResult.create({
        data: { generationId: generation.id, url, prompt: opt.prompt },
      });
      results.push(r);
    }

    await prisma.aIGeneration.update({
      where: { id: generation.id },
      data: { status: "SUCCESS" },
    });

    return NextResponse.json({
      generationId: generation.id,
      status: "SUCCESS",
      results: results.map((r) => ({ id: r.id, url: r.url })),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: String(err?.message ?? "Beklenmeyen hata.") },
      { status: 500 }
    );
  }
}
