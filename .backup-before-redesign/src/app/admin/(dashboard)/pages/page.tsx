import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeletePageButton from "./_DeletePageButton";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  const pages = await prisma.page.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif">Sayfalar</h1>
        <Link href="/admin/pages/new" className="rounded bg-[#5e6b52] text-white text-sm px-4 py-2 hover:bg-[#4c5742]">
          + Yeni Sayfa
        </Link>
      </div>
      <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f1ece2] text-left text-[#5b5f58]">
            <tr>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dccd]">
            {pages.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-[#5b5f58]">/{p.slug}</p>
                </td>
                <td className="px-4 py-3">{p.status}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/pages/${p.id}`} className="text-[#5e6b52] hover:underline">
                    Düzenle
                  </Link>
                  <DeletePageButton id={p.id} title={p.title} />
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-[#5b5f58]">
                  Henüz sayfa yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
