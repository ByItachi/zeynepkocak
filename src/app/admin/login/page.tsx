"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Giriş başarısız.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Sunucuya ulaşılamadı.");
    } finally {
      setLoading(false);
    }
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

        {error && (
          <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <label className="block text-sm text-[#5b5f58] mb-1" htmlFor="username">
          Kullanıcı Adı
        </label>
        <input
          id="username"
          type="text"
          required
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 rounded border border-[#e2dccd] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b9a7a]"
        />

        <label className="block text-sm text-[#5b5f58] mb-1" htmlFor="password">
          Şifre
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 rounded border border-[#e2dccd] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b9a7a]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-[#5e6b52] text-white py-2 text-sm font-medium hover:bg-[#4c5742] disabled:opacity-60"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>

        <div className="mt-4 text-center text-xs text-[#8b9a7a]">
          Demo: admin / admin123
        </div>
      </form>
    </div>
  );
}
