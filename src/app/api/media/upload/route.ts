import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { prisma } from "@/lib/prisma";

// MIME → güvenli uzantı eşlemesi. Uzantı asla istemci dosya adından alınmaz;
// aksi halde "xss.html" gibi bir dosya "image/png" MIME'ı taklit edilerek
// public dizine çalıştırılabilir HTML/SVG olarak yazılabilir (stored XSS).
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "video/mp4": "mp4",
  "video/webm": "webm",
};
const MAX_IMAGE = 8 * 1024 * 1024; // görsel 8MB
const MAX_VIDEO = 80 * 1024 * 1024; // video 80MB

// Basit magic-byte imzaları (dosyanın gerçekten o MIME türü olduğunu doğrular).
function matchesMagicBytes(type: string, buf: Buffer): boolean {
  const b = (i: number) => buf[i];
  switch (type) {
    case "image/jpeg":
      return b(0) === 0xff && b(1) === 0xd8 && b(2) === 0xff;
    case "image/png":
      return b(0) === 0x89 && b(1) === 0x50 && b(2) === 0x4e && b(3) === 0x47;
    case "image/gif":
      return buf.slice(0, 4).toString("latin1") === "GIF8";
    case "image/webp":
      return buf.slice(0, 4).toString("latin1") === "RIFF" && buf.slice(8, 12).toString("latin1") === "WEBP";
    case "image/avif":
      return buf.slice(4, 8).toString("latin1") === "ftyp";
    case "video/mp4":
      return buf.slice(4, 8).toString("latin1") === "ftyp";
    case "video/webm":
      return b(0) === 0x1a && b(1) === 0x45 && b(2) === 0xdf && b(3) === 0xa3;
    default:
      return false;
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Desteklenmeyen dosya türü." }, { status: 400 });
  }

  const isVideo = file.type.startsWith("video");
  if (file.size > (isVideo ? MAX_VIDEO : MAX_IMAGE)) {
    return NextResponse.json(
      { error: isVideo ? "Video 80MB sınırını aşıyor." : "Görsel 8MB sınırını aşıyor." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // İçerik imzası doğrulaması: MIME taklidi (ör. HTML'i image/png olarak yükleme) reddedilir.
  if (!matchesMagicBytes(file.type, buffer)) {
    return NextResponse.json(
      { error: "Dosya içeriği, belirtilen türle uyuşmuyor." },
      { status: 400 }
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  // Güvenli, rastgele, tahmin edilemez ve yalnızca doğrulanmış uzantıyı taşıyan dosya adı.
  const fileName = `${crypto.randomUUID()}.${ext}`;
  await writeFile(path.join(uploadsDir, fileName), buffer);

  const asset = await prisma.mediaAsset.create({
    data: {
      fileName,
      url: `/uploads/${fileName}`,
      mimeType: file.type,
      sizeBytes: file.size,
      source: "upload",
      isAi: false,
    },
  });

  return NextResponse.json({ asset });
}
