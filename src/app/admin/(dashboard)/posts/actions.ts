"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { logAudit } from "@/lib/audit";

const postSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalı."),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir."),
  excerpt: z.string().optional(),
  content: z.string().min(10, "İçerik en az 10 karakter olmalı."),
  status: z.enum(["DRAFT", "IN_REVIEW", "SCHEDULED", "PUBLISHED"]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  coverImageUrl: z.string().optional(),
});

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) {
    throw new Error("Yetkisiz işlem.");
  }
  return user;
}

export async function createPost(formData: FormData) {
  const user = await requireAdmin();

  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    status: formData.get("status"),
    seoTitle: formData.get("seoTitle") || undefined,
    seoDescription: formData.get("seoDescription") || undefined,
    coverImageUrl: formData.get("coverImageUrl") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz veri." };
  }

  const existing = await prisma.post.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return { error: "Bu slug zaten kullanılıyor." };
  }

  const words = parsed.data.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  const post = await prisma.post.create({
    data: {
      ...parsed.data,
      authorId: user.id,
      readingMinutes: Math.max(1, Math.round(words / 200)),
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  await logAudit({ userId: user.id, action: "CREATE", entity: "Post", entityId: post.id });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const user = await requireAdmin();

  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    status: formData.get("status"),
    seoTitle: formData.get("seoTitle") || undefined,
    seoDescription: formData.get("seoDescription") || undefined,
    coverImageUrl: formData.get("coverImageUrl") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz veri." };
  }

  const existing = await prisma.post.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
  });
  if (existing) {
    return { error: "Bu slug başka bir yazıda kullanılıyor." };
  }

  const current = await prisma.post.findUnique({ where: { id } });
  const words = parsed.data.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  await prisma.post.update({
    where: { id },
    data: {
      ...parsed.data,
      readingMinutes: Math.max(1, Math.round(words / 200)),
      publishedAt:
        parsed.data.status === "PUBLISHED" ? current?.publishedAt ?? new Date() : current?.publishedAt,
    },
  });

  await logAudit({ userId: user.id, action: "UPDATE", entity: "Post", entityId: id });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  const user = await requireAdmin();
  await prisma.post.delete({ where: { id } });
  await logAudit({ userId: user.id, action: "DELETE", entity: "Post", entityId: id });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}
