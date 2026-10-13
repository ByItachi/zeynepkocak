"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addToCart } from "@/lib/cart";

export default function AddToCartButton({ productId, title, priceCents }: { productId: string; title: string; priceCents: number }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => {
          addToCart({ productId, title, priceCents });
          setAdded(true);
        }}
        className="rounded-full bg-forest px-8 py-3 text-sm font-semibold text-white hover:bg-forest/90"
      >
        {added ? "Sepete Eklendi ✓" : "Sepete Ekle"}
      </button>
      {added && (
        <button onClick={() => router.push("/sepet")} className="rounded-full border border-forest/40 px-8 py-3 text-sm font-semibold text-forest hover:bg-forest/5">
          Sepete Git
        </button>
      )}
    </div>
  );
}
