"use client";

import { useState } from "react";
import Logo from "@/components/Logo";

export default function LicenseCheckPage() {
  const [licenseKey, setLicenseKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/license/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Lisans doğrulanamadı.");
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch {
      setError("Sunucuya ulaşılamadı.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f2] px-4">
        <div className="w-full max-w-sm bg-white border border-[#e2dccd] rounded-lg p-8 shadow-sm text-center">
          <div className="flex justify-center mb-6">
            <Logo variant="symbol" className="h-16 w-16" />
          </div>
          <p className="text-[#2f332e]">Lisans başarıyla doğrulandı.</p>
          <p className="text-sm text-[#5b5f58] mt-2">Yönlendiriliyorsunuz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7f2] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white border border-[#e2dccd] rounded-lg p-8 shadow-sm"
      >
        <div className="flex justify-center mb-6">
          <Logo variant="symbol" className="h-16 w-16" />
        </div>
        <h1 className="text-xl font-serif text-[#2f332e] mb-1 text-center">Lisans Doğrulaması</h1>
        <p className="text-sm text-[#5b5f58] mb-2 text-center">Site erişimi için lisans anahtarını girin.</p>
        <p className="text-xs text-[#8b9a7a] mb-6 bg-[#f5f7f2] p-2 rounded border border-[#e6e9dc] text-center">
          Demo: <span className="font-mono">LICENSE-DEMO-2024-XXXX</span>
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <label className="block text-sm text-[#5b5f58] mb-1" htmlFor="licenseKey">
          Lisans Anahtarı
        </label>
        <input
          id="licenseKey"
          type="text"
          required
          value={licenseKey}
          onChange={(e) => setLicenseKey(e.target.value)}
          className="w-full mb-6 rounded border border-[#e2dccd] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b9a7a] font-mono"
          placeholder="LICENSE-XXXX-XXXX-XXXX"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-[#5e6b52] text-white py-2 text-sm font-medium hover:bg-[#4c5742] disabled:opacity-60"
        >
          {loading ? "Doğrulanıyor..." : "Doğrula"}
        </button>
      </form>
    </div>
  );
}
