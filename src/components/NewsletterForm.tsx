"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setState("error");
        setMessage(data?.error || "Kayıt sırasında bir hata oluştu.");
        return;
      }
      setState("done");
      setEmail("");
      setMessage("Teşekkürler! Kaydınız alındı.");
    } catch {
      setState("error");
      setMessage("Bağlantı hatası, lütfen tekrar deneyin.");
    }
  }

  if (state === "done") {
    return (
      <p className="rounded-xl bg-forest/10 px-4 py-3 text-[13.5px] text-forest dark:bg-tan/10 dark:text-tan">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <label htmlFor="newsletter-email" className="sr-only">
        E-posta adresiniz
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          className="min-w-0 flex-1 rounded-full border border-line bg-paper px-5 py-3 text-[14px] text-ink outline-none placeholder:text-muted/70 focus:border-tan dark:border-white/15 dark:bg-white/5 dark:text-cream"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="rounded-full bg-forest px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-forest-deep disabled:opacity-60 dark:bg-tan dark:text-forest"
        >
          {state === "loading" ? "Gönderiliyor…" : "Abone Ol"}
        </button>
      </div>
      {message && state === "error" && <p className="mt-2 text-[12.5px] text-red-600">{message}</p>}
    </form>
  );
}
