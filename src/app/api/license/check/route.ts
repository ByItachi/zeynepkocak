import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const licenseSchema = z.object({
  licenseKey: z.string().min(1),
});

const LICENSE_COOKIE = "zdr_license";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = licenseSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz lisans anahtarı." }, { status: 400 });
  }

  const license = await prisma.license.findUnique({
    where: { key: parsed.data.licenseKey },
  });

  if (!license) {
    return NextResponse.json({ error: "Lisans anahtarı bulunamadı." }, { status: 401 });
  }

  if (license.status !== "active") {
    return NextResponse.json({ error: "Lisans aktif değil." }, { status: 401 });
  }

  if (license.expiresAt && license.expiresAt < new Date()) {
    return NextResponse.json({ error: "Lisans süresi dolmuş." }, { status: 401 });
  }

  // Update usage count
  if (license.usedCount < license.maxUses) {
    await prisma.license.update({
      where: { id: license.id },
      data: { usedCount: license.usedCount + 1 },
    });
  }

  const cookieStore = await cookies();
  cookieStore.set(LICENSE_COOKIE, license.key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 yıl
  });

  return NextResponse.json({ ok: true });
}
