import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { prisma } from "@/lib/prisma";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "video/mp4",
  "video/webm",
];
const MAX_IMAGE = 8 * 1024 * 1024; // görsel 8MB
const MAX_VIDEO = 80 * 1024 * 1024; // video 80MB

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
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Desteklenmeyen dosya türü." }, { status: 400 });
  }
  const isVideo = file.type.startsWith("video");
  if (file.size > (isVideo ? MAX_VIDEO : MAX_IMAGE)) {
    return NextResponse.json(
      { error: isVideo ? "Video 80MB sınırını aşıyor." : "Görsel 8MB sınırını aşıyor." },
      { status: 400 }
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const ext = path.extname(file.name) || "";
  const fileName = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
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
