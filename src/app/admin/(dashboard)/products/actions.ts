"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { logAudit } from "@/lib/audit";

const productSchema = z.object({
  title: z.string().min(2, "Başlık en az 2 karakter olmalı."),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir."),
  description: z.string().min(1, "Açıklama gerekli."),
  type: z.enum(["DIGITAL", "COURSE"]),
  price: z.coerce.number().min(0, "Fiyat 0 veya üzeri olmalı."),
  coverImageUrl: z.string().optional(),
  isPublished: z.coerce.boolean(),
  meetingUrl: z.string().optional(),
  meetingProvider: z.string().optional(),
  assetLabels: z.array(z.string()).optional(),
  assetUrls: z.array(z.string()).optional(),
  assetTypes: z.array(z.string()).optional(),
});

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) throw new Error("Yetkisiz işlem.");
  return user;
}

function parseForm(formData: FormData) {
  return productSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    type: formData.get("type"),
    price: formData.get("price"),
    coverImageUrl: formData.get("coverImageUrl") || undefined,
    isPublished: formData.get("isPublished") === "true",
    meetingUrl: formData.get("meetingUrl") || undefined,
    meetingProvider: formData.get("meetingProvider") || undefined,
    assetLabels: formData.getAll("assetLabel").map(String),
    assetUrls: formData.getAll("assetUrl").map(String),
    assetTypes: formData.getAll("assetType").map(String),
  });
}

function buildAssets(parsed: { assetLabels?: string[]; assetUrls?: string[]; assetTypes?: string[] }) {
  const labels = parsed.assetLabels ?? [];
  const urls = parsed.assetUrls ?? [];
  const types = parsed.assetTypes ?? [];
  const assets: { label: string; fileUrl: string; fileType: string }[] = [];
  for (let i = 0; i < urls.length; i++) {
    if (urls[i]?.trim()) {
      assets.push({ label: labels[i]?.trim() || `Dosya ${i + 1}`, fileUrl: urls[i].trim(), fileType: types[i] || "pdf" });
    }
  }
  return assets;
}

export async function createProduct(formData: FormData) {
  const user = await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Geçersiz veri." };

  const existing = await prisma.product.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) return { error: "Bu slug zaten kullanılıyor." };

  const assets = buildAssets(parsed.data);
  const product = await prisma.product.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      type: parsed.data.type,
      priceCents: Math.round(parsed.data.price * 100),
      coverImageUrl: parsed.data.coverImageUrl,
      isPublished: parsed.data.isPublished,
      meetingUrl: parsed.data.meetingUrl,
      meetingProvider: parsed.data.meetingProvider,
      assets: { create: assets },
    },
  });

  await logAudit({ userId: user.id, action: "CREATE", entity: "Product", entityId: product.id });
  revalidatePath("/admin/products");
  revalidatePath("/magaza");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const user = await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Geçersiz veri." };

  const existing = await prisma.product.findFirst({ where: { slug: parsed.data.slug, NOT: { id } } });
  if (existing) return { error: "Bu slug başka bir üründe kullanılıyor." };

  const assets = buildAssets(parsed.data);
  await prisma.$transaction([
    prisma.digitalAsset.deleteMany({ where: { productId: id } }),
    prisma.product.update({
      where: { id },
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        description: parsed.data.description,
        type: parsed.data.type,
        priceCents: Math.round(parsed.data.price * 100),
        coverImageUrl: parsed.data.coverImageUrl,
        isPublished: parsed.data.isPublished,
        meetingUrl: parsed.data.meetingUrl,
        meetingProvider: parsed.data.meetingProvider,
        assets: { create: assets },
      },
    }),
  ]);

  await logAudit({ userId: user.id, action: "UPDATE", entity: "Product", entityId: id });
  revalidatePath("/admin/products");
  revalidatePath("/magaza");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const user = await requireAdmin();
  await prisma.product.delete({ where: { id } });
  await logAudit({ userId: user.id, action: "DELETE", entity: "Product", entityId: id });
  revalidatePath("/admin/products");
  revalidatePath("/magaza");
}
