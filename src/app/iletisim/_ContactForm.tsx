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
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
      )}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <div>
        <label className="block text-sm text-muted mb-1.5" htmlFor="cf-name">Ad Soyad</label>
        <input id="cf-name" name="name" required className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20" />
      </div>
      <div>
        <label className="block text-sm text-muted mb-1.5" htmlFor="cf-email">E-posta</label>
        <input id="cf-email" name="email" type="email" required className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20" />
      </div>
      <div>
        <label className="block text-sm text-muted mb-1.5" htmlFor="cf-subject">Konu</label>
        <input id="cf-subject" name="subject" className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20" />
      </div>
      <div>
        <label className="block text-sm text-muted mb-1.5" htmlFor="cf-message">Mesajınız</label>
        <textarea id="cf-message" name="message" required rows={5} className="w-full rounded-lg border border-line bg-cream px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20" />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto rounded-full bg-forest px-7 py-3 text-sm font-semibold text-cream hover:bg-forest-deep disabled:opacity-60 transition-colors"
      >
        {isPending ? "Gönderiliyor..." : "Gönder"}
      </button>
    </form>
  );
}
