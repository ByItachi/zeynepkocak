"use server";

import { prisma } from "@/lib/prisma";
import { createPaymentSession, PaymentProvider } from "@/lib/payments";

type CheckoutItem = { productId: string; title: string; priceCents: number; quantity: number };

export async function placeOrder(params: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  provider: PaymentProvider;
  items: CheckoutItem[];
}) {
  if (!params.items.length) return { error: "Sepetiniz boş." };

  const totalCents = params.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);

  const order = await prisma.order.create({
    data: {
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      customerPhone: params.customerPhone,
      totalCents,
      paymentProvider: params.provider,
      items: {
        create: params.items.map((i) => ({
          productId: i.productId,
          title: i.title,
          unitPriceCents: i.priceCents,
          quantity: i.quantity,
        })),
      },
    },
  });

  const session = await createPaymentSession({
    provider: params.provider,
    orderId: order.id,
    amountCents: totalCents,
    currency: "TRY",
    customerName: params.customerName,
    customerEmail: params.customerEmail,
  });

  if (session.testMode) {
    await prisma.order.update({ where: { id: order.id }, data: { status: "PAID" } });
    return { success: true, orderId: order.id, testMode: true };
  }

  if (!session.ok) {
    await prisma.order.update({ where: { id: order.id }, data: { status: "FAILED" } });
    return { error: session.error ?? "Ödeme başlatılamadı." };
  }

  return { success: true, orderId: order.id, redirectUrl: session.redirectUrl };
}
