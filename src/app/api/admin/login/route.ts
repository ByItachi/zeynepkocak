import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import crypto from "crypto";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const ADMIN_SESSION_COOKIE = "zdr_admin_session";
const ADMIN_SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz giriş bilgisi." }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({ 
    where: { username: parsed.data.username } 
  });
  
  if (!admin || !(await verifyPassword(parsed.data.password, admin.password))) {
    return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı." }, { status: 401 });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_DURATION_MS);

  await prisma.adminSession.create({
    data: { adminId: admin.id, tokenHash, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return NextResponse.json({ ok: true });
}
