"use client";

import { useState, useTransition } from "react";

type PostFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  seoTitle: string;
  seoDescription: string;
  coverImageUrl: string;
};

export default function PostForm({
  initial,
  action,
}: {
  initial?: Partial<PostFormValues>;
  action: (formData: FormData) => Promise<{ error?: string } | void>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [slug, setSlug] = useState(initial?.slug ?? "");

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
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-4">
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
      )}

      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Başlık</label>
        <input
          name="title"
          required
          defaultValue={initial?.title}
          onChange={(e) => {
            if (!initial?.slug) setSlug(slugify(e.target.value));
          }}
          className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Slug (URL)</label>
        <input
          name="slug"
          required
          value={slug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Özet</label>
        <textarea
          name="excerpt"
          defaultValue={initial?.excerpt}
          rows={2}
          className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">İçerik (HTML desteklenir)</label>
        <textarea
          name="content"
          required
          defaultValue={initial?.content}
          rows={10}
          className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm font-mono"
        />
      </div>

      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Kapak Görseli URL</label>
        <input
          name="coverImageUrl"
          defaultValue={initial?.coverImageUrl}
          className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Durum</label>
        <select
          name="status"
          defaultValue={initial?.status ?? "DRAFT"}
          className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
        >
          <option value="DRAFT">Taslak</option>
          <option value="IN_REVIEW">İncelemede</option>
          <option value="SCHEDULED">Planlandı</option>
          <option value="PUBLISHED">Yayında</option>
        </select>
      </div>

      <fieldset className="border border-[#e2dccd] rounded p-4">
        <legend className="text-sm text-[#5b5f58] px-1">SEO</legend>
        <div className="mb-3">
          <label className="block text-sm text-[#5b5f58] mb-1">SEO Başlığı</label>
          <input
            name="seoTitle"
            defaultValue={initial?.seoTitle}
            className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">Meta Açıklama</label>
          <textarea
            name="seoDescription"
            defaultValue={initial?.seoDescription}
            rows={2}
            className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
          />
        </div>
      </fieldset>

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
