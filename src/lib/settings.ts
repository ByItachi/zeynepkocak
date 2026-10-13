import { prisma, safeQuery } from "@/lib/prisma";

export const DEFAULT_SETTINGS: Record<string, string> = {
  site_title: "Zeynep Koçak | Uzm. Psikolog",
  site_tagline: "Yetişkin, Ergen ve Çift Terapisi — Yüz yüze & Online",
  brand_name: "Zeynep Koçak",
  hero_heading: "Zeynep Koçak",
  hero_subheading: "Uzm. Psikolog",
  hero_description:
    "📍Bağdat Cad • Yetişkin • Ergen • Çift 👥 Yüz yüze & Online\n📩 Co-Psychodramatist • Grup Atölyeleri\n🌍 Expat Psychologist\n🗣️ Transformational Breath® Practitioner",
  about_text:
    "Merhaba, ben Zeynep Koçak. Uzman Psikolog olarak İstanbul Bağdat Caddesi'ndeki ofisimde ve online olarak yetişkin, ergen ve çiftlerle çalışıyorum. Co-Psychodramatist kimliğimle grup atölyeleri yürütüyor, yurt dışında yaşayan (expat) danışanlara İngilizce psikolojik destek ve Transformational Breath® seansları da veriyorum.",
  location: "Bağdat Caddesi, İstanbul",
  whatsapp_url: "https://chat.whatsapp.com/ErASjydRWJhDWXw0JsXhsp?mode=gi_t",
  instagram_url: "https://www.instagram.com/zeynepleyolarkadasi/",
  contact_email: "info@example.com",
  primary_color: "#5e6b52",
  accent_color: "#8b9a7a",
  background_color: "#faf7f2",
  profile_image_url: "/instagram/profile.jpg",
  hero_image_url: "/instagram/zeynep-hero.jpg",
  instagram_followers: "4.867",
  instagram_following: "3.300",
  instagram_posts: "273",
  ecommerce_mode_enabled: "false",
};

export async function getSetting(key: string): Promise<string> {
  const row = await safeQuery(
    `getSetting(${key})`,
    () => prisma.siteSetting.findUnique({ where: { key } }),
    null
  );
  return row?.value ?? DEFAULT_SETTINGS[key] ?? "";
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const rows = await safeQuery("getAllSettings", () => prisma.siteSetting.findMany(), []);
  const fromDb = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return { ...DEFAULT_SETTINGS, ...fromDb };
}

export async function setSetting(key: string, value: string) {
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
