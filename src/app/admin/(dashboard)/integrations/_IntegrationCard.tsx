"use client";

import { useState, useTransition } from "react";
import { saveIntegrationConfig } from "./actions";

export default function IntegrationCard({
  provider,
  title,
  description,
  fields,
  isConnected,
  lastError,
}: {
  provider: string;
  title: string;
  description: string;
  fields: { name: string; label: string }[];
  isConnected: boolean;
  lastError: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(formData: FormData) {
    setSaved(false);
    startTransition(async () => {
      await saveIntegrationConfig(provider, formData);
      setSaved(true);
    });
  }

  return (
    <div className="bg-white border border-[#e2dccd] rounded-lg p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-serif text-lg">{title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            isConnected
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {isConnected ? "Bağlı" : "Bağlantı bekliyor"}
        </span>
      </div>
      <p className="text-sm text-[#5b5f58] mb-4">{description}</p>

      <form action={handleSubmit} className="space-y-3">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-xs text-[#5b5f58] mb-1">{field.label}</label>
            <input
              name={field.name}
              type="password"
              placeholder="Yapılandırılmadı"
              className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={isPending}
          className="rounded border border-[#5e6b52] text-[#5e6b52] text-sm px-4 py-2 hover:bg-[#f1ece2] disabled:opacity-60"
        >
          {isPending ? "Kaydediliyor..." : "Bilgileri Kaydet"}
        </button>
        {saved && <p className="text-xs text-[#5b5f58]">Kaydedildi. {lastError}</p>}
      </form>
    </div>
  );
}
