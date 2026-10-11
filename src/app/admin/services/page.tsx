import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Hizmetler Yönetimi</h1>
        <Link
          href="/admin/services/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Yeni Hizmet Ekle
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Başlık</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Açıklama</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Durum</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{service.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600 line-clamp-2">{service.excerpt}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <Link
                    href={`/admin/services/${service.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Düzenle
                  </Link>
                  <button className="text-red-600 hover:underline">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">Henüz hizmet eklenmemiş.</p>
          <Link
            href="/admin/services/new"
            className="text-blue-600 hover:underline"
          >
            İlk hizmetinizi ekleyin
          </Link>
        </div>
      )}
    </div>
  );
}
