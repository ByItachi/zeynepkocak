"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";

async function checkAdmin() {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) throw new Error("Yetkisiz işlem.");
  return user;
}

export async function createMenuItem(formData: FormData) {
  await checkAdmin();
  const label = formData.get("label") as string;
  const labelEn = (formData.get("labelEn") as string) || null;
  const href = (formData.get("href") as string) || null;
  const description = (formData.get("description") as string) || null;
  const parentId = (formData.get("parentId") as string) || null;
  const column = parseInt((formData.get("column") as string) || "0", 10);
  const position = parseInt((formData.get("position") as string) || "0", 10);
  const openInNew = formData.get("openInNew") === "on";

  await prisma.menuItem.create({
    data: { label, labelEn, href, description, parentId, column, position, openInNew },
  });
  revalidatePath("/admin/menu");
}

export async function updateMenuItem(id: string, formData: FormData) {
  await checkAdmin();
  const label = formData.get("label") as string;
  const labelEn = (formData.get("labelEn") as string) || null;
  const href = (formData.get("href") as string) || null;
  const description = (formData.get("description") as string) || null;
  const column = parseInt((formData.get("column") as string) || "0", 10);
  const position = parseInt((formData.get("position") as string) || "0", 10);
  const isActive = formData.get("isActive") !== "false";
  const openInNew = formData.get("openInNew") === "on";

  await prisma.menuItem.update({
    where: { id },
    data: { label, labelEn, href, description, column, position, isActive, openInNew },
  });
  revalidatePath("/admin/menu");
}

export async function deleteMenuItem(id: string) {
  await checkAdmin();
  await prisma.menuItem.deleteMany({ where: { parentId: id } });
  await prisma.menuItem.delete({ where: { id } });
  revalidatePath("/admin/menu");
}

export async function toggleMenuItem(id: string, isActive: boolean) {
  await checkAdmin();
  await prisma.menuItem.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/menu");
}
