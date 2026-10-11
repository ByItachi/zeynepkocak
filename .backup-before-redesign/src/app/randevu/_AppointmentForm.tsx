"use client";

import { useMemo, useState, useTransition } from "react";
import { requestAppointment } from "./actions";

const SERVICES = [
  "Yetişkinlerle Çalışma",
  "Ergenlerle Çalışma",
  "Çiftlerle Çalışma",
  "Online Görüşmeler",
  "Psikodrama & Grup Atölyeleri",
  "Expat Psychologist",
  "Transformational Breath®",
];

const TIME_SLOTS = [
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function AppointmentForm({ whatsappUrl }: { whatsappUrl: string }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const min = useMemo(() => minDate(), []);

  function handleSubmit(formData: FormData) {
    setStatus("idle");
    setError(null);
    startTransition(async () => {
      const result = await requestAppointment(formData);
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
      <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-4 py-3 space-y-2">
        <p>Randevu talebiniz alındı. En kısa sürede e-posta veya telefon ile size dönüş yapılacaktır.</p>
        <p>
          Daha hızlı iletişim için{" "}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium">
            WhatsApp&apos;tan
          </a>{" "}
          da yazabilirsiniz.
        </p>
      </div>
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
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">E-posta</label>
          <input name="email" type="email" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">Telefon</label>
          <input name="phone" type="tel" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Çalışma Alanı</label>
        <select name="service" required defaultValue="" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm bg-white">
          <option value="" disabled>
            Seçiniz
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Görüşme Şekli</label>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="sessionType" value="YUZ_YUZE" defaultChecked /> Yüz yüze
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="sessionType" value="ONLINE" /> Online
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">Tercih Edilen Tarih</label>
          <input
            name="preferredDate"
            type="date"
            required
            min={min}
            className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">Tercih Edilen Saat</label>
          <select name="preferredTime" required defaultValue="" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm bg-white">
            <option value="" disabled>
              Seçiniz
            </option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm text-[#5b5f58] mb-1">Eklemek istediğiniz not (opsiyonel)</label>
        <textarea name="message" rows={4} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-[#5e6b52] text-white text-sm px-5 py-2.5 hover:bg-[#4c5742] disabled:opacity-60"
      >
        {isPending ? "Gönderiliyor..." : "Randevu Talebi Gönder"}
      </button>
      <p className="text-xs text-[#8a8e85]">
        Bu bir ön talep formudur; randevunuz, uygunluk teyit edildikten sonra kesinleşir.
      </p>
    </form>
  );
}
