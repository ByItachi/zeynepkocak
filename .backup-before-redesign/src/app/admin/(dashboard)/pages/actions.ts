"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { logAudit } from "@/lib/audit";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) throw new Error("Yetkisiz işlem.");
  return user;
}

export async function savePage(id: string | null, formData: FormData) {
  const user = await requireAdmin();
  const slug = String(formData.get("slug") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "");
  const status = String(formData.get("status") || "DRAFT");

  if (!slug || !title) return { error: "Başlık ve slug zorunludur." };

  if (id) {
    await prisma.page.update({ where: { id }, data: { slug, title, content, status } });
    await logAudit({ userId: user.id, action: "UPDATE", entity: "Page", entityId: id });
  } else {
    const existing = await prisma.page.findUnique({ where: { slug } });
    if (existing) return { error: "Bu slug zaten kullanılıyor." };
    const page = await prisma.page.create({ data: { slug, title, content, status } });
    await logAudit({ userId: user.id, action: "CREATE", entity: "Page", entityId: page.id });
  }

  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function deletePage(id: string) {
  const user = await requireAdmin();
  await prisma.page.delete({ where: { id } });
  await logAudit({ userId: user.id, action: "DELETE", entity: "Page", entityId: id });
  revalidatePath("/admin/pages");
}
