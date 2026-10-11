"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { setSetting } from "@/lib/settings";
import { logAudit } from "@/lib/audit";

const EDITABLE_KEYS = [
  "site_title",
  "site_tagline",
  "brand_name",
  "hero_heading",
  "hero_subheading",
  "hero_description",
  "about_text",
  "location",
  "whatsapp_url",
  "instagram_url",
  "contact_email",
  "primary_color",
  "accent_color",
  "background_color",
];

export async function saveSettings(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) {
    return { error: "Yetkisiz işlem." };
  }

  for (const key of EDITABLE_KEYS) {
    const value = formData.get(key);
    if (typeof value === "string") {
      await setSetting(key, value);
    }
  }

  await logAudit({ userId: user.id, action: "UPDATE", entity: "SiteSetting" });
  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
