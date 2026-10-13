import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSetting } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function MagazaPage() {
  const enabled = (await getSetting("ecommerce_mode_enabled")) === "true";
  if (!enabled) {
    return (
      <div className="mx-auto max-w-[800px] px-5 py-24 text-center">
        <h1 className="font-serif text-3xl">Mağaza yakında açılıyor</h1>
        <p className="mt-3 text-[#5b5f58]">Bu bölüm şu anda etkin değil.</p>
      </div>
    );
  }

  const products = await prisma.product.findMany({ where: { isPublished: true }, orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
      <h1 className="font-serif text-3xl mb-8">Mağaza</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link key={p.id} href={`/magaza/${p.slug}`} className="block rounded-xl border border-[#e2dccd] bg-white overflow-hidden hover:shadow-md transition-shadow">
            {p.coverImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.coverImageUrl} alt={p.title} className="h-44 w-full object-cover" />
            )}
            <div className="p-4">
              <p className="text-xs uppercase tracking-wide text-[#8b9a7a]">{p.type === "COURSE" ? "Online Eğitim" : "Dijital Ürün"}</p>
              <h2 className="mt-1 font-serif text-lg">{p.title}</h2>
              <p className="mt-2 font-semibold text-[#5e6b52]">{(p.priceCents / 100).toLocaleString("tr-TR")} {p.currency}</p>
            </div>
          </Link>
        ))}
        {products.length === 0 && <p className="text-[#5b5f58]">Henüz ürün eklenmedi.</p>}
      </div>
    </div>
  );
}
