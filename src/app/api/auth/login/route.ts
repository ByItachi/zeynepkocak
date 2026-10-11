import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { logAudit } from "@/lib/audit";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const attempts = new Map<string, { count: number; firstAttempt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || now - record.firstAttempt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttempt: now });
    return false;
  }
  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz giriş bilgisi." }, { status: 400 });
  }

  if (isRateLimited(`${ip}:${parsed.data.email}`)) {
    return NextResponse.json(
      { error: "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin." },
      { status: 429 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: "E-posta veya şifre hatalı." }, { status: 401 });
  }

  if (!canAccessAdmin(user.role)) {
    return NextResponse.json({ error: "Bu hesabın admin paneline erişim yetkisi yok." }, { status: 403 });
  }

  await createSession(user.id);
  await logAudit({ userId: user.id, action: "LOGIN", entity: "User", entityId: user.id });

  return NextResponse.json({ ok: true });
}
