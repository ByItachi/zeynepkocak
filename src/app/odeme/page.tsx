"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem, cartTotalCents, clearCart, getCart } from "@/lib/cart";
import { placeOrder } from "./actions";

export default function OdemePage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [provider, setProvider] = useState<"PAYTR" | "IYZICO">("PAYTR");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => setItems(getCart()), []);

  const total = cartTotalCents(items);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await placeOrder({
      customerName: String(formData.get("name") ?? ""),
      customerEmail: String(formData.get("email") ?? ""),
      customerPhone: String(formData.get("phone") ?? ""),
      provider,
      items,
    });
    setLoading(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    if (result?.redirectUrl) {
      window.location.href = result.redirectUrl;
      return;
    }
    clearCart();
    router.push(`/odeme/basarili?orderId=${result?.orderId}`);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[600px] px-5 py-24 text-center">
        <p className="text-[#5b5f58]">Sepetiniz boş.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[600px] px-5 py-16 sm:px-8">
      <h1 className="font-serif text-3xl mb-8">Ödeme</h1>
      {error && <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">Ad Soyad</label>
          <input name="name" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">E-posta</label>
          <input name="email" type="email" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">Telefon</label>
          <input name="phone" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
        </div>

        <fieldset className="border border-[#e2dccd] rounded p-4 space-y-2">
          <legend className="text-sm text-[#5b5f58] px-1">Ödeme Yöntemi</legend>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="providerRadio" checked={provider === "PAYTR"} onChange={() => setProvider("PAYTR")} /> PayTR
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="providerRadio" checked={provider === "IYZICO"} onChange={() => setProvider("IYZICO")} /> iyzico
          </label>
        </fieldset>

        <p className="text-lg font-semibold">Toplam: {(total / 100).toLocaleString("tr-TR")} TRY</p>

        <button type="submit" disabled={loading} className="w-full rounded-full bg-forest px-8 py-3.5 text-sm font-semibold text-white hover:bg-forest/90 disabled:opacity-60">
          {loading ? "İşleniyor..." : "Siparişi Tamamla"}
        </button>
      </form>
    </div>
  );
}
