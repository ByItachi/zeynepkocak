import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const SubscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email("Geçerli bir e-posta adresi girin."),
});

// Basit, bellek içi hız sınırı (IP başına dakikada 3 deneme)
const attempts = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.reset < now) {
    attempts.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 3;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Çok fazla deneme yaptınız. Lütfen biraz bekleyin." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
  }

  const parsed = SubscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Geçersiz e-posta." }, { status: 400 });
  }

  const email = parsed.data.email;
  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ ok: true, alreadySubscribed: true });
  }

  await prisma.newsletterSubscriber.create({ data: { email, isConfirmed: false } });
  return NextResponse.json({ ok: true });
}
