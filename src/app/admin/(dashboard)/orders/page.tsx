import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = { PENDING: "Bekliyor", PAID: "Ödendi", FAILED: "Başarısız", CANCELED: "İptal" };

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, include: { items: true } });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Siparişler</h1>
      <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f1ece2] text-left text-[#5b5f58]">
            <tr>
              <th className="px-4 py-3">Müşteri</th>
              <th className="px-4 py-3">Ürünler</th>
              <th className="px-4 py-3">Tutar</th>
              <th className="px-4 py-3">Ödeme</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Tarih</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dccd]">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{o.customerName}</p>
                  <p className="text-xs text-[#5b5f58]">{o.customerEmail}</p>
                </td>
                <td className="px-4 py-3 text-xs">{o.items.map((i) => i.title).join(", ")}</td>
                <td className="px-4 py-3">{(o.totalCents / 100).toLocaleString("tr-TR")} {o.currency}</td>
                <td className="px-4 py-3 text-xs">{o.paymentProvider ?? "-"}</td>
                <td className="px-4 py-3">{STATUS_LABEL[o.status] ?? o.status}</td>
                <td className="px-4 py-3 text-xs text-[#5b5f58]">{o.createdAt.toLocaleDateString("tr-TR")}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#5b5f58]">Henüz sipariş yok.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
