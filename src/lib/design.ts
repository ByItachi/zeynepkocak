import { prisma } from "@/lib/prisma";

/**
 * Tema / tasarım özelleştirme.
 * DesignSetting tablosundaki her anahtar-değer, kök layout'ta
 * CSS değişkenleri olarak uygulanır. Admin tarafında düzenlenir ve
 * draft/publish (taslak/yayın) mantığıyla yönetilir.
 */

const COLORS_KEYS = ["background", "foreground", "primary", "accent", "muted", "card", "borderColor"];

export interface DesignValues {
  [key: string]: string;
}

export async function getDesignSettings(): Promise<DesignValues> {
  try {
    const rows = await prisma.designSetting.findMany();
    const out: DesignValues = {};
    for (const r of rows) {
      if (r.isActive) {
        out[r.key] = r.value;
      }
    }
    return out;
  } catch {
    return {};
  }
}

export async function publishDesignSettings(entries: DesignValues) {
  for (const [key, value] of Object.entries(entries)) {
    if (typeof value !== "string") continue;
    await prisma.designSetting.upsert({
      where: { key },
      update: { value, isActive: true },
      create: { key, value, group: COLORS_KEYS.includes(key) ? "colors" : "layout", label: key },
    });
  }
}

/** CSS değişkenleri ifade dizelerini üretir (kök layout ve/ya da admin önizleme için). */
export function designCssVariables(values: DesignValues): string {
  const map: Record<string, string> = {
    background: "--background",
    foreground: "--foreground",
    primary: "--primary",
    accent: "--accent",
    muted: "--muted",
    card: "--card",
    borderColor: "--border-color",
  };
  const lines: string[] = [];
  lines.push(".theme-applied{");
  for (const [key, value] of Object.entries(values)) {
    const cssVar = map[key];
    if (!cssVar) continue;
    lines.push(`  ${cssVar}: ${value};`);
  }
  lines.push("}");
  return lines.join("\n");
}
