"use client";

import { useState, useTransition } from "react";
import { saveSettings } from "./actions";

const FIELDS: { key: string; label: string; type?: string }[] = [
  { key: "site_title", label: "Site Başlığı" },
  { key: "site_tagline", label: "Site Sloganı" },
  { key: "brand_name", label: "Marka Adı" },
  { key: "hero_heading", label: "Ana Sayfa Başlık" },
  { key: "hero_subheading", label: "Ana Sayfa Alt Başlık" },
  { key: "hero_description", label: "Ana Sayfa Açıklama", type: "textarea" },
  { key: "about_text", label: "Hakkımda Metni", type: "textarea" },
  { key: "location", label: "Konum" },
  { key: "whatsapp_url", label: "WhatsApp Bağlantısı" },
  { key: "instagram_url", label: "Instagram Bağlantısı" },
  { key: "contact_email", label: "İletişim E-postası" },
  { key: "primary_color", label: "Ana Renk (hex)" },
  { key: "accent_color", label: "Vurgu Rengi (hex)" },
  { key: "background_color", label: "Arka Plan Rengi (hex)" },
];

export default function SettingsForm({ values }: { values: Record<string, string> }) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setSaved(false);
    setError(null);
    startTransition(async () => {
      const result = await saveSettings(formData);
      if (result?.error) setError(result.error);
      else setSaved(true);
    });
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-4">
      {saved && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
          Ayarlar kaydedildi.
        </p>
      )}
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
      )}

      {FIELDS.map((field) => (
        <div key={field.key}>
          <label className="block text-sm text-[#5b5f58] mb-1">{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              name={field.key}
              defaultValue={values[field.key]}
              rows={3}
              className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
            />
          ) : (
            <input
              name={field.key}
              defaultValue={values[field.key]}
              className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-[#5e6b52] text-white text-sm px-5 py-2.5 hover:bg-[#4c5742] disabled:opacity-60"
      >
        {isPending ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
