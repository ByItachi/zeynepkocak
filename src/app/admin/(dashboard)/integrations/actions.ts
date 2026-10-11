"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { logAudit } from "@/lib/audit";

export async function saveIntegrationConfig(provider: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) return { error: "Yetkisiz işlem." };

  const config: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && value.trim() !== "") config[key] = value;
  }

  await prisma.integrationSetting.upsert({
    where: { provider },
    update: {
      config: JSON.stringify(config),
      // Kayıt yalnızca bilgileri saklar; canlı bağlantı testi yapılmadığı için
      // isConnected burada otomatik true yapılmaz.
      lastError: "Bağlantı doğrulanmadı — kimlik bilgileri kaydedildi, canlı test yapılmadı.",
    },
    create: {
      provider,
      config: JSON.stringify(config),
      lastError: "Bağlantı doğrulanmadı — kimlik bilgileri kaydedildi, canlı test yapılmadı.",
    },
  });

  await logAudit({ userId: user.id, action: "UPDATE", entity: "IntegrationSetting", entityId: provider });
  revalidatePath("/admin/integrations");
  return { success: true };
}
