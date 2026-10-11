import { prisma } from "@/lib/prisma";
import MessageRow from "./_Row";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">İletişim Talepleri</h1>
      <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f1ece2] text-left text-[#5b5f58]">
            <tr>
              <th className="px-4 py-3">Gönderen</th>
              <th className="px-4 py-3">Mesaj</th>
              <th className="px-4 py-3">Tarih</th>
              <th className="px-4 py-3 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dccd]">
            {messages.map((m) => (
              <MessageRow
                key={m.id}
                msg={{ ...m, createdAt: m.createdAt.toISOString() }}
              />
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[#5b5f58]">
                  Henüz mesaj yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
