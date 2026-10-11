"use client";

import { useState, useTransition } from "react";
import { saveTheme, resetTheme } from "./actions";

const FIELDS: { key: string; label: string; darkDefault: string }[] = [
  { key: "background", label: "Arka Plan", darkDefault: "#faf7f2" },
  { key: "foreground", label: "Metin", darkDefault: "#2f332e" },
  { key: "primary", label: "Ana Vurgu", darkDefault: "#5e6b52" },
  { key: "accent", label: "İkincil Vurgu", darkDefault: "#9c7c5c" },
  { key: "muted", label: "Soluk Metin", darkDefault: "#5b5f58" },
  { key: "card", label: "Kart Arka Planı", darkDefault: "#ffffff" },
  { key: "borderColor", label: "Kenarlık", darkDefault: "#e2dccd" },
];

export default function ThemeForm({
  current,
  rows,
}: {
  current: Record<string, string>;
  rows: { key: string; value: string; isActive: boolean }[];
}) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Varsayılan değerlere geri dön (kayıtlı yoksa varsayılan)
  function initial(key: string, darkDefault: string) {
    return current[key] ?? darkDefault;
  }

  const [colors, setColors] = useState<Record<string, string>>(() => {
    const c: Record<string, string> = {};
    for (const f of FIELDS) c[f.key] = initial(f.key, f.darkDefault);
    return c;
  });

  function updateColor(key: string, value: string) {
    setColors((p) => ({ ...p, [key]: value }));
  }

  function handleSave(formData: FormData) {
    setSaved(false);
    setError(null);
    startTransition(async () => {
      const result = await saveTheme(formData);
      if (result?.error) setError(result.error);
      else setSaved(true);
    });
  }

  function handleReset() {
    if (!window.confirm("Özel tema ayarlarını kaldırıp varsayılanlara dönmek istiyor musunuz?")) return;
    setSaved(false);
    setError(null);
    startTransition(async () => {
      const result = await resetTheme();
      if (result?.error) setError(result.error);
      else {
        setSaved(true);
        window.location.reload();
      }
    });
  }

  return (
    <form action={handleSave} className="max-w-5xl">
      {saved && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 mb-4">
          Tema yayınlandı ve tüm sayfalara uygulandı.
        </p>
      )}
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol: renk ayarları */}
        <div className="bg-white border border-[#e2dccd] rounded-lg p-5 space-y-4">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block text-sm text-[#5b5f58] mb-1">{f.label}</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={colors[f.key]}
                  onChange={(e) => updateColor(f.key, e.target.value)}
                  className="h-9 w-12 rounded border border-[#e2dccd] cursor-pointer"
                />
                <input
                  value={colors[f.key]}
                  onChange={(e) => updateColor(f.key, e.target.value)}
                  placeholder="#rrggbb"
                  className="flex-1 rounded border border-[#e2dccd] px-3 py-2 text-sm"
                />
                <span className="text-xs text-[#a3a89f]">
                  {rows.find((r) => r.key === f.key)?.isActive ? "özel" : "varsayılan"}
                </span>
              </div>
            </div>
          ))}
          {FIELDS.map((f) => (
            <input key={f.key} type="hidden" name={`color_${f.key}`} value={colors[f.key]} />
          ))}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded bg-[#5e6b52] text-white text-sm px-5 py-2.5 hover:bg-[#4c5742] disabled:opacity-60"
            >
              {isPending ? "Yayınlanıyor..." : "Yayınla"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isPending}
              className="rounded border border-[#e2dccd] text-sm px-4 py-2.5 hover:bg-[#f1ece2]"
            >
              Sıfırla
            </button>
          </div>
        </div>

        {/* Sağ: canlı önizleme */}
        <div className="space-y-3">
          <p className="text-sm text-[#5b5f58]">Canlı Önizleme</p>
          <ThemePreview />
        </div>
      </div>
    </form>
  );
}

function ThemePreview() {
  return (
    <div className="rounded-lg border border-[var(--border-color)] bg-[var(--background)] p-6">
      <div className="rounded border-2 border-dashed border-[var(--border-color)] p-5 space-y-3">
        <span className="inline-block rounded bg-[var(--primary)] px-4 py-2 text-sm text-white">Ana Buton</span>
        <span className="inline-block rounded bg-[var(--accent)] px-4 py-2 text-sm text-white ml-2">Vurgu</span>
        <h3 className="font-serif text-xl" style={{ color: "var(--foreground)" }}>
          Başlık rengi
        </h3>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Soluk metin örneği — bu metin muted rengini kullanır.
        </p>
        <div className="rounded bg-[var(--card)] border border-[var(--border-color)] p-3 text-xs" style={{ color: "var(--foreground)" }}>
          Kart içeriği
        </div>
      </div>
    </div>
  );
}
