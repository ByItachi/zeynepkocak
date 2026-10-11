"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hashPassword } from "@/lib/auth";
import { isSuperAdmin, ROLES } from "@/lib/roles";
import { logAudit } from "@/lib/audit";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8, "Şifre en az 8 karakter olmalı."),
  role: z.enum([
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
    ROLES.EDITOR,
    ROLES.COLLAB_MANAGER,
    ROLES.BRAND_CLIENT,
    ROLES.USER,
  ]),
});

export async function createUser(formData: FormData) {
  const actor = await getCurrentUser();
  if (!actor || !isSuperAdmin(actor.role)) {
    return { error: "Yalnızca Super Admin yeni kullanıcı oluşturabilir." };
  }

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz veri." };
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { error: "Bu e-posta zaten kayıtlı." };

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: parsed.data.role,
    },
  });

  await logAudit({ userId: actor.id, action: "CREATE", entity: "User", entityId: user.id });
  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUser(id: string) {
  const actor = await getCurrentUser();
  if (!actor || !isSuperAdmin(actor.role)) throw new Error("Yetkisiz işlem.");
  if (actor.id === id) throw new Error("Kendi hesabınızı silemezsiniz.");
  await prisma.user.delete({ where: { id } });
  await logAudit({ userId: actor.id, action: "DELETE", entity: "User", entityId: id });
  revalidatePath("/admin/users");
}
