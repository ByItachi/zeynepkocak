"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CartItem, cartTotalCents, getCart, removeFromCart, updateQuantity } from "@/lib/cart";

export default function SepetPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(getCart());
    sync();
    window.addEventListener("zk-cart-change", sync);
    return () => window.removeEventListener("zk-cart-change", sync);
  }, []);

  const total = cartTotalCents(items);

  return (
    <div className="mx-auto max-w-[800px] px-5 py-16 sm:px-8">
      <h1 className="font-serif text-3xl mb-8">Sepetim</h1>
      {items.length === 0 ? (
        <p className="text-[#5b5f58]">
          Sepetiniz boş. <Link href="/magaza" className="text-[#5e6b52] underline">Mağazaya göz atın</Link>.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.productId} className="flex items-center justify-between gap-4 rounded-lg border border-[#e2dccd] bg-white p-4">
              <div>
                <p className="font-medium">{i.title}</p>
                <p className="text-sm text-[#5b5f58]">{(i.priceCents / 100).toLocaleString("tr-TR")} TRY</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={i.quantity}
                  onChange={(e) => updateQuantity(i.productId, Number(e.target.value))}
                  className="w-16 rounded border border-[#e2dccd] px-2 py-1 text-sm"
                />
                <button onClick={() => removeFromCart(i.productId)} className="text-sm text-[#8b3a3a] hover:underline">
                  Kaldır
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-[#e2dccd] pt-4">
            <p className="text-lg font-semibold">Toplam: {(total / 100).toLocaleString("tr-TR")} TRY</p>
            <Link href="/odeme" className="rounded-full bg-forest px-8 py-3 text-sm font-semibold text-white hover:bg-forest/90">
              Ödemeye Geç
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
