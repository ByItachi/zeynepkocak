import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./_DeleteButton";

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = { DIGITAL: "Dijital Ürün", COURSE: "Online Eğitim" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif">Ürünler & Kurslar</h1>
        <Link href="/admin/products/new" className="rounded bg-[#5e6b52] text-white text-sm px-4 py-2 hover:bg-[#4c5742]">
          + Yeni Ürün
        </Link>
      </div>

      <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f1ece2] text-left text-[#5b5f58]">
            <tr>
              <th className="px-4 py-3">Ürün</th>
              <th className="px-4 py-3">Tür</th>
              <th className="px-4 py-3">Fiyat</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dccd]">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-[#5b5f58]">/magaza/{p.slug}</p>
                </td>
                <td className="px-4 py-3">{TYPE_LABEL[p.type] ?? p.type}</td>
                <td className="px-4 py-3">{(p.priceCents / 100).toLocaleString("tr-TR")} {p.currency}</td>
                <td className="px-4 py-3">{p.isPublished ? "Yayında" : "Taslak"}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/products/${p.id}`} className="text-[#5e6b52] hover:underline">
                    Düzenle
                  </Link>
                  <DeleteButton id={p.id} title={p.title} />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#5b5f58]">
                  Henüz ürün eklenmedi. E-ticaret modunu Site Ayarları&apos;ndan etkinleştirmeyi unutmayın.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
