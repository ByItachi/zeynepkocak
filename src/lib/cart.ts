"use client";

export type CartItem = { productId: string; title: string; priceCents: number; quantity: number };

const KEY = "zk_cart_v1";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("zk-cart-change"));
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const items = getCart();
  const existing = items.find((i) => i.productId === item.productId);
  if (existing) existing.quantity += 1;
  else items.push({ ...item, quantity: 1 });
  save(items);
}

export function removeFromCart(productId: string) {
  save(getCart().filter((i) => i.productId !== productId));
}

export function updateQuantity(productId: string, quantity: number) {
  const items = getCart();
  const item = items.find((i) => i.productId === productId);
  if (item) item.quantity = Math.max(1, quantity);
  save(items);
}

export function clearCart() {
  save([]);
}

export function cartTotalCents(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
}
