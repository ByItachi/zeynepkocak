import { prisma } from "@/lib/prisma";
import StatusSelect from "./_StatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminCollaborationsPage() {
  const requests = await prisma.collaborationRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Marka İş Birliği Başvuruları</h1>
      <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f1ece2] text-left text-[#5b5f58]">
            <tr>
              <th className="px-4 py-3">Marka</th>
              <th className="px-4 py-3">İletişim</th>
              <th className="px-4 py-3">Bütçe / Teslim</th>
              <th className="px-4 py-3">Açıklama</th>
              <th className="px-4 py-3">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dccd]">
            {requests.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3 align-top">
                  <p className="font-medium">{r.brandName}</p>
                  <p className="text-xs text-[#5b5f58]">{r.industry || "-"}</p>
                </td>
                <td className="px-4 py-3 align-top text-xs">
                  <p>{r.contactName}</p>
                  <p className="text-[#5b5f58]">{r.email}</p>
                  <p className="text-[#5b5f58]">{r.phone || "-"}</p>
                </td>
                <td className="px-4 py-3 align-top text-xs text-[#5b5f58]">
                  <p>{r.budgetRange || "-"}</p>
                  <p>{r.deadline ? new Date(r.deadline).toLocaleDateString("tr-TR") : "-"}</p>
                </td>
                <td className="px-4 py-3 align-top text-xs max-w-xs whitespace-pre-wrap">
                  {r.description}
                </td>
                <td className="px-4 py-3 align-top">
                  <StatusSelect id={r.id} status={r.status} />
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#5b5f58]">
                  Henüz başvuru yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
