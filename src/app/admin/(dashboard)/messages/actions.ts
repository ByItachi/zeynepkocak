"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";

export async function toggleRead(id: string, isRead: boolean) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) throw new Error("Yetkisiz işlem.");
  await prisma.contactMessage.update({ where: { id }, data: { isRead } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) throw new Error("Yetkisiz işlem.");
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
