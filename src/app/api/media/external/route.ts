import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { saveGeneratedAsset } from "@/lib/imagegen";

export const dynamic = "force-dynamic";

// SSRF koruması: yalnızca herkese açık http(s) adreslere izin ver.
// localhost, private IP aralıkları ve cloud metadata hedefleri reddedilir.
const BLOCKED_HOSTS = new Set(["localhost", "0.0.0.0", "::1", "metadata.google.internal"]);
function isPrivateHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (BLOCKED_HOSTS.has(h) || h.endsWith(".local") || h.endsWith(".internal")) return true;
  // IPv4 private/rezerve aralıkları
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    if (a === 10 || a === 127 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a === 169) return true;
  }
  return false;
}
function isSafePublicUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    return !isPrivateHost(u.hostname);
  } catch {
    return false;
  }
}

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
    if (!isSafePublicUrl(url)) {
      return NextResponse.json(
        { error: "Yalnızca herkese açık görsel URL'leri desteklenir." },
        { status: 400 }
      );
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
