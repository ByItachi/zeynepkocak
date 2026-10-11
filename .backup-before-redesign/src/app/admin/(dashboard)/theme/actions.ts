"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { publishDesignSettings } from "@/lib/design";
import { prisma } from "@/lib/prisma";

const ALLOWED = new Set([
  "background",
  "foreground",
  "primary",
  "accent",
  "muted",
  "card",
  "borderColor",
]);

export async function saveTheme(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) {
    return { error: "Yetkisiz." };
  }

  const entries: Record<string, string> = {};
  for (const key of ALLOWED) {
    const v = formData.get(`color_${key}`)?.toString().trim();
    if (v && /^#[0-9a-fA-F]{3,8}$/.test(v)) entries[key] = v;
  }

  if (Object.keys(entries).length === 0) {
    return { error: "En az bir renk girin." };
  }

  try {
    await publishDesignSettings(entries);
  } catch (e: any) {
    return { error: String(e?.message ?? "Kaydedilemedi.") };
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function resetTheme() {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) {
    return { error: "Yetkisiz." };
  }
  try {
    await prisma.designSetting.updateMany({ data: { isActive: false } });
  } catch (e: any) {
    return { error: String(e?.message ?? "Sıfırlanamadı.") };
  }
  revalidatePath("/", "layout");
  return { ok: true };
}
