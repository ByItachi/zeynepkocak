import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OdemeBasariliPage({ searchParams }: { searchParams: Promise<{ orderId?: string }> }) {
  const { orderId } = await searchParams;
  const order = orderId
    ? await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: { include: { assets: true } } } } },
      })
    : null;

  if (!order) {
    return (
      <div className="mx-auto max-w-[600px] px-5 py-24 text-center">
        <h1 className="font-serif text-3xl">Sipariş bulunamadı</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[700px] px-5 py-16 sm:px-8">
      <h1 className="font-serif text-3xl">Teşekkürler, {order.customerName}!</h1>
      <p className="mt-2 text-[#5b5f58]">
        Siparişiniz {order.status === "PAID" ? "onaylandı" : "alındı"}. Sipariş no: {order.id}
      </p>

      <div className="mt-8 space-y-6">
        {order.items.map((item) => (
          <div key={item.id} className="rounded-lg border border-[#e2dccd] bg-white p-5">
            <h2 className="font-serif text-lg">{item.title}</h2>
            {item.product.type === "COURSE" && item.product.meetingUrl && (
              <p className="mt-2 text-sm">
                Eğitim bağlantınız ({item.product.meetingProvider === "google_meet" ? "Google Meet" : "Zoom"}):{" "}
                <a href={item.product.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-[#5e6b52] underline">
                  {item.product.meetingUrl}
                </a>
              </p>
            )}
            {item.product.assets.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {item.product.assets.map((a) => (
                  <li key={a.id}>
                    <a href={a.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#5e6b52] underline">
                      {a.fileType === "video" ? "🎬" : "📄"} {a.label} — indir
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
