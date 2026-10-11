import { prisma } from "@/lib/prisma";
import StatusSelect from "./_StatusSelect";

export const dynamic = "force-dynamic";

const SESSION_LABEL: Record<string, string> = {
  YUZ_YUZE: "Yüz yüze",
  ONLINE: "Online",
};

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({ orderBy: { preferredDate: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Randevu Talepleri</h1>
      <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f1ece2] text-left text-[#5b5f58]">
            <tr>
              <th className="px-4 py-3">Danışan</th>
              <th className="px-4 py-3">Tarih / Saat</th>
              <th className="px-4 py-3">Alan</th>
              <th className="px-4 py-3">Şekil</th>
              <th className="px-4 py-3">Not</th>
              <th className="px-4 py-3">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dccd]">
            {appointments.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3 align-top">
                  <p className="font-medium">{a.name}</p>
                  <p className="text-xs text-[#5b5f58]">{a.email}</p>
                  <p className="text-xs text-[#5b5f58]">{a.phone || "-"}</p>
                </td>
                <td className="px-4 py-3 align-top text-xs text-[#5b5f58]">
                  <p>{new Date(a.preferredDate).toLocaleDateString("tr-TR")}</p>
                  <p>{a.preferredTime}</p>
                </td>
                <td className="px-4 py-3 align-top text-xs">{a.service}</td>
                <td className="px-4 py-3 align-top text-xs">{SESSION_LABEL[a.sessionType] ?? a.sessionType}</td>
                <td className="px-4 py-3 align-top text-xs max-w-xs whitespace-pre-wrap text-[#5b5f58]">
                  {a.message || "-"}
                </td>
                <td className="px-4 py-3 align-top">
                  <StatusSelect id={a.id} status={a.status} />
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#5b5f58]">
                  Henüz randevu talebi yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
