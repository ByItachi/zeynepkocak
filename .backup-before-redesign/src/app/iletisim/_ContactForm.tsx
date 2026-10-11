"use client";

import { useState, useTransition } from "react";
import { sendContactMessage } from "./actions";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setStatus("idle");
    setError(null);
    startTransition(async () => {
      const result = await sendContactMessage(formData);
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
        Mesajınız alındı, en kısa sürede dönüş yapılacaktır.
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
        <label className="block text-sm text-[#5b5f58] mb-1">Ad Soyad</label>
        <input name="name" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">E-posta</label>
        <input name="email" type="email" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Konu</label>
        <input name="subject" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Mesajınız</label>
        <textarea name="message" required rows={5} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-[#5e6b52] text-white text-sm px-5 py-2.5 hover:bg-[#4c5742] disabled:opacity-60"
      >
        {isPending ? "Gönderiliyor..." : "Gönder"}
      </button>
    </form>
  );
}
