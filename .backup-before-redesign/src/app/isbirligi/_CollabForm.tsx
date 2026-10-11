"use client";

import { useState, useTransition } from "react";
import { sendCollaborationRequest } from "./actions";

export default function CollabForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setStatus("idle");
    setError(null);
    startTransition(async () => {
      const result = await sendCollaborationRequest(formData);
      if (result?.error) {
        setError(result.error);
        setStatus("error");
      } else {
        setStatus("success");
      }
    });
  }

  if (status === "success") {
    return (
      <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-4 py-3">
        Başvurunuz alındı, değerlendirildikten sonra size dönüş yapılacaktır.
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4 max-w-md">
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
      )}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Marka Adı</label>
        <input name="brandName" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Sektör</label>
        <input name="industry" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">İletişim Kişisi</label>
        <input name="contactName" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">E-posta</label>
        <input name="email" type="email" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Telefon</label>
        <input name="phone" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">Bütçe Aralığı</label>
          <input name="budgetRange" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">Hedef Tarih</label>
          <input name="deadline" type="date" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">İş Birliği Açıklaması</label>
        <textarea name="description" required rows={5} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-[#5e6b52] text-white text-sm px-5 py-2.5 hover:bg-[#4c5742] disabled:opacity-60"
      >
        {isPending ? "Gönderiliyor..." : "Başvuruyu Gönder"}
      </button>
    </form>
  );
}
