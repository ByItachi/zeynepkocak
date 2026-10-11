"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";

const BLOCK_TYPES = [
  "hero",
  "text",
  "twoColumn",
  "image",
  "gallery",
  "quote",
  "stats",
  "cta",
  "video",
  "divider",
];

export async function addSection(pageSlug: string, blockType: string) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) throw new Error("Yetkisiz.");

  if (!BLOCK_TYPES.includes(blockType)) throw new Error("Bilinmeyen blok türü.");

  const count = await prisma.pageSection.count({ where: { pageSlug } });
  const section = await prisma.pageSection.create({
    data: {
      pageSlug,
      blockType,
      title: defaultTitle(blockType),
      position: count,
      isPublished: true,
    },
  });
  revalidatePath(`/admin/editor/${pageSlug}`);
  return section;
}

export async function updateSection(id: string, data: {
  title?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  layout?: string;
  style?: string;
}) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) throw new Error("Yetkisiz.");

  const update: Record<string, unknown> = {};
  if (typeof data.title === "string") update.title = data.title;
  if (typeof data.content === "string") update.content = data.content;
  if (typeof data.imageUrl === "string") update.imageUrl = data.imageUrl;
  if (typeof data.imageAlt === "string") update.imageAlt = data.imageAlt;
  if (typeof data.layout === "string") update.layout = data.layout;
  if (typeof data.style === "string") update.style = data.style;

  const section = await prisma.pageSection.update({ where: { id }, data: update });
  revalidatePath(`/admin/editor/${section.pageSlug}`, "layout");
  revalidatePath(section.pageSlug === "home" ? "/" : `/${section.pageSlug}`, "layout");
  return section;
}

export async function removeSection(id: string) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) throw new Error("Yetkisiz.");

  const section = await prisma.pageSection.findUnique({ where: { id } });
  if (section) {
    await prisma.pageSection.delete({ where: { id } });
    revalidatePath(`/admin/editor/${section.pageSlug}`, "layout");
  }
}

export async function reorderSections(pageSlug: string, orderedIds: string[]) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) throw new Error("Yetkisiz.");

  const tx = [];
  for (let i = 0; i < orderedIds.length; i++) {
    tx.push(
      prisma.pageSection.updateMany({
        where: { id: orderedIds[i], pageSlug },
        data: { position: i },
      })
    );
  }
  await prisma.$transaction(tx);
  revalidatePath(`/admin/editor/${pageSlug}`, "layout");
}

export async function toggleSection(id: string, isPublished: boolean) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) throw new Error("Yetkisiz.");

  await prisma.pageSection.update({ where: { id }, data: { isPublished } });
  const section = await prisma.pageSection.findUnique({ where: { id } });
  if (section) revalidatePath(`/admin/editor/${section.pageSlug}`, "layout");
}

function defaultTitle(blockType: string): string {
  const map: Record<string, string> = {
    hero: "Öne Çıkan Alan",
    text: "Metin Bölümü",
    twoColumn: "İki Kolon",
    image: "Görsel",
    gallery: "Galeri",
    quote: "Alıntı",
    stats: "İstatistikler",
    cta: "Harekete Geçirici",
    video: "Video",
    divider: "Bölücü",
  };
  return map[blockType] ?? "Bölüm";
}
