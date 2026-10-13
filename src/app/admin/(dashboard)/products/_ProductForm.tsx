"use client";

import { useState, useTransition } from "react";

type Asset = { label: string; fileUrl: string; fileType: string };

type ProductFormValues = {
  title: string;
  slug: string;
  description: string;
  type: string;
  price: number;
  coverImageUrl: string;
  isPublished: boolean;
  meetingUrl: string;
  meetingProvider: string;
  assets: Asset[];
};

export default function ProductForm({
  initial,
  action,
}: {
  initial?: Partial<ProductFormValues>;
  action: (formData: FormData) => Promise<{ error?: string } | void>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [type, setType] = useState(initial?.type ?? "DIGITAL");
  const [assets, setAssets] = useState<Asset[]>(initial?.assets ?? []);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) setError(result.error);
    });
  }

  function slugify(value: string) {
    return value
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-4">
      {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}

      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Ürün Adı</label>
        <input
          name="title"
          required
          defaultValue={initial?.title}
          onChange={(e) => { if (!initial?.slug) setSlug(slugify(e.target.value)); }}
          className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Slug (URL)</label>
        <input name="slug" required value={slug} onChange={(e) => setSlug(slugify(e.target.value))} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Açıklama</label>
        <textarea name="description" required defaultValue={initial?.description} rows={4} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">Ürün Türü</label>
          <select name="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm">
            <option value="DIGITAL">Dijital Ürün (video/pdf indirme)</option>
            <option value="COURSE">Online Eğitim (Zoom/Google Meet)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">Fiyat (TRY)</label>
          <input name="price" type="number" step="0.01" min="0" required defaultValue={initial?.price} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Kapak Görseli URL</label>
        <input name="coverImageUrl" defaultValue={initial?.coverImageUrl} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="isPublished" value="true" defaultChecked={initial?.isPublished ?? true} className="h-4 w-4" />
        <span className="text-sm text-[#5b5f58]">Mağazada yayında</span>
      </div>

      {type === "COURSE" && (
        <fieldset className="border border-[#e2dccd] rounded p-4 space-y-3">
          <legend className="text-sm text-[#5b5f58] px-1">Online Eğitim Bağlantısı</legend>
          <div>
            <label className="block text-sm text-[#5b5f58] mb-1">Platform</label>
            <select name="meetingProvider" defaultValue={initial?.meetingProvider ?? "zoom"} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm">
              <option value="zoom">Zoom</option>
              <option value="google_meet">Google Meet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#5b5f58] mb-1">Toplantı Bağlantısı</label>
            <input name="meetingUrl" defaultValue={initial?.meetingUrl} placeholder="https://zoom.us/j/..." className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
            <p className="mt-1 text-xs text-[#8a8f82]">Satın alma sonrası bu bağlantı müşteriye gösterilir.</p>
          </div>
        </fieldset>
      )}

      <fieldset className="border border-[#e2dccd] rounded p-4 space-y-3">
        <legend className="text-sm text-[#5b5f58] px-1">İndirilebilir Dosyalar (video/pdf)</legend>
        {assets.map((a, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_auto_auto] gap-2 items-center">
            <input name="assetLabel" defaultValue={a.label} placeholder="Etiket" className="rounded border border-[#e2dccd] px-2 py-1.5 text-sm" />
            <input name="assetUrl" defaultValue={a.fileUrl} placeholder="Dosya URL" className="rounded border border-[#e2dccd] px-2 py-1.5 text-sm" />
            <select name="assetType" defaultValue={a.fileType} className="rounded border border-[#e2dccd] px-2 py-1.5 text-sm">
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
            </select>
            <button type="button" onClick={() => setAssets(assets.filter((_, idx) => idx !== i))} className="text-[#8b3a3a] text-xs">
              Kaldır
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setAssets([...assets, { label: "", fileUrl: "", fileType: "pdf" }])}
          className="text-sm text-[#5e6b52] hover:underline"
        >
          + Dosya ekle
        </button>
        <p className="text-xs text-[#8a8f82]">Dosyayı Medya Kütüphanesi&apos;nden yükleyip URL&apos;sini buraya yapıştırın.</p>
      </fieldset>

      <button type="submit" disabled={isPending} className="rounded bg-[#5e6b52] text-white text-sm px-5 py-2.5 hover:bg-[#4c5742] disabled:opacity-60">
        {isPending ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
