import { prisma } from "@/lib/prisma";
import SubscriberRow from "./_Row";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const subs = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Bülten Aboneleri ({subs.length})</h1>
      <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f1ece2] text-left text-[#5b5f58]">
            <tr>
              <th className="px-4 py-3">E-posta</th>
              <th className="px-4 py-3">Kayıt Tarihi</th>
              <th className="px-4 py-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dccd]">
            {subs.map((s) => (
              <SubscriberRow key={s.id} id={s.id} email={s.email} createdAt={s.createdAt.toISOString()} />
            ))}
            {subs.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-[#5b5f58]">
                  Henüz abone yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
