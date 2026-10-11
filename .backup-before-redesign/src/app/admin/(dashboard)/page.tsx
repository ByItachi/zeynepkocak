import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getCounts() {
  const [
    publishedPosts,
    draftPosts,
    contactMessages,
    unreadMessages,
    collaborationRequests,
    pendingCollaborations,
    newsletterSubscribers,
    integrations,
    appointments,
    pendingAppointments,
  ] = await Promise.all([
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.count({ where: { status: { not: "PUBLISHED" } } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.collaborationRequest.count(),
    prisma.collaborationRequest.count({ where: { status: "RECEIVED" } }),
    prisma.newsletterSubscriber.count(),
    prisma.integrationSetting.findMany(),
    prisma.appointment.count(),
    prisma.appointment.count({ where: { status: "BEKLEMEDE" } }),
  ]);

  return {
    publishedPosts,
    draftPosts,
    contactMessages,
    unreadMessages,
    collaborationRequests,
    pendingCollaborations,
    newsletterSubscribers,
    integrations,
    appointments,
    pendingAppointments,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    {
      label: "Randevu Talepleri",
      value: counts.appointments,
      sub: `${counts.pendingAppointments} beklemede`,
      href: "/admin/appointments",
    },
    { label: "Yayınlanan İçerik", value: counts.publishedPosts, href: "/admin/(dashboard)/posts" },
    { label: "Taslak / Planlanmış", value: counts.draftPosts, href: "/admin/(dashboard)/posts" },
    { label: "Gelen İletişim Talepleri", value: counts.contactMessages, sub: `${counts.unreadMessages} okunmadı`, href: "/admin/(dashboard)/messages" },
    {
      label: "Marka İş Birliği Başvuruları",
      value: counts.collaborationRequests,
      sub: `${counts.pendingCollaborations} yeni`,
      href: "/admin/(dashboard)/collaborations",
    },
    { label: "Bülten Abonesi", value: counts.newsletterSubscribers, href: "/admin/(dashboard)/newsletter" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif mb-1">Genel Bakış</h1>
      <p className="text-sm text-[#5b5f58] mb-8">
        Bu veriler veritabanından gerçek zamanlı okunur; sayfa görüntüleme/trafik grafikleri Google
        Analytics bağlanmadığı için gösterilmiyor (bkz. Entegrasyonlar).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href || "#"}
            className="bg-white border border-[#e2dccd] rounded-lg p-5 hover:border-[#8b9a7a] hover:shadow-md transition-all"
          >
            <p className="text-sm text-[#5b5f58]">{card.label}</p>
            <p className="text-3xl font-serif mt-1">{card.value}</p>
            {card.sub && <p className="text-xs text-[#8b9a7a] mt-1">{card.sub}</p>}
          </Link>
        ))}
      </div>

      <h2 className="text-lg font-serif mb-3">Entegrasyon Durumu</h2>
      <div className="bg-white border border-[#e2dccd] rounded-lg divide-y divide-[#e2dccd]">
        {counts.integrations.map((integration) => (
          <div key={integration.provider} className="flex items-center justify-between px-5 py-3">
            <span className="text-sm">{integration.provider}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                integration.isConnected
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {integration.isConnected ? "Bağlı" : "Bağlantı bekliyor"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
