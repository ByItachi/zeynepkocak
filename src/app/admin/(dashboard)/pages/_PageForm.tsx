"use client";

import { useState, useTransition } from "react";

export default function PageForm({
  initial,
  action,
}: {
  initial?: { title: string; slug: string; content: string; status: string };
  action: (formData: FormData) => Promise<{ error?: string } | void>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-4">
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
      )}
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Başlık</label>
        <input name="title" required defaultValue={initial?.title} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Slug</label>
        <input name="slug" required defaultValue={initial?.slug} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">İçerik (HTML desteklenir)</label>
        <textarea name="content" required rows={10} defaultValue={initial?.content} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm font-mono" />
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Durum</label>
        <select name="status" defaultValue={initial?.status ?? "DRAFT"} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm">
          <option value="DRAFT">Taslak</option>
          <option value="PUBLISHED">Yayında</option>
        </select>
      </div>
      <button type="submit" disabled={isPending} className="rounded bg-[#5e6b52] text-white text-sm px-5 py-2.5 hover:bg-[#4c5742] disabled:opacity-60">
        {isPending ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
