import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDesignSettings } from "@/lib/design";

export const dynamic = "force-dynamic";

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  BEKLEMEDE: { label: "Beklemede", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  GORUSULDU: { label: "Görüşüldü", cls: "bg-sky-50 text-sky-700 border-sky-200" },
  ONAYLANDI: { label: "Onaylandı", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  TAMAMLANDI: { label: "Tamamlandı", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  IPTAL: { label: "İptal", cls: "bg-red-50 text-red-700 border-red-200" },
};

function Card({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-line bg-paper ${className}`}>
      <header className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="font-serif text-[17px] text-ink">{title}</h2>
        {action && (
          <Link href={action.href} className="text-[12.5px] font-semibold text-forest hover:text-tan-deep">
            {action.label} →
          </Link>
        )}
      </header>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="py-6 text-center text-[13px] text-muted">{text}</p>;
}

export default async function AdminDashboardPage() {
  const today = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [
    totalPages,
    publishedPosts,
    draftPosts,
    pendingAppointments,
    totalAppointments,
    latestAppointments,
    mediaCount,
    unreadMessages,
    messages,
    posts,
    pages,
    audits,
    integrations,
    subscribers,
    design,
  ] = await Promise.all([
    prisma.page.count(),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.count({ where: { status: { not: "PUBLISHED" } } }),
    prisma.appointment.count({ where: { status: "BEKLEMEDE" } }),
    prisma.appointment.count(),
    prisma.appointment.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.mediaAsset.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.post.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.page.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.integrationSetting.findMany(),
    prisma.newsletterSubscriber.count(),
    getDesignSettings(),
  ]);

  const stats = [
    { label: "Toplam Sayfa", value: totalPages, sub: "Yayındaki ve taslak sayfalar", href: "/admin/pages" },
    {
      label: "Blog Yazıları",
      value: publishedPosts,
      sub: `${draftPosts} taslak / planlanmış`,
      href: "/admin/posts",
    },
    {
      label: "Randevu Talepleri",
      value: totalAppointments,
      sub: `${pendingAppointments} beklemede`,
      href: "/admin/appointments",
    },
    { label: "Medya Dosyası", value: mediaCount, sub: "Kütüphanedeki görsel ve videolar", href: "/admin/media" },
  ];

  const quickActions = [
    { label: "Yeni Blog Yazısı", href: "/admin/posts/new" },
    { label: "Yeni Sayfa", href: "/admin/pages/new" },
    { label: "Sayfa Editörü", href: "/admin/editor" },
    { label: "Medya Yükle", href: "/admin/media" },
    { label: "Tema Ayarları", href: "/admin/theme" },
    { label: "AI Görsel Stüdyosu", href: "/admin/ai-studio" },
  ];

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-[28px] leading-tight text-ink">Hoş Geldiniz</h1>
          <p className="mt-1 text-[14px] text-muted">
            Web sitenizin tüm içerikleri buradan kolayca yönetilebilir.
          </p>
        </div>
        <p className="rounded-full border border-line bg-paper px-4 py-2 text-[12.5px] text-muted">{today}</p>
      </div>

      {/* İstatistik kartları */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-line bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-tan hover:shadow-[0_18px_36px_-28px_rgba(34,57,47,0.8)]"
          >
            <p className="text-[12.5px] uppercase tracking-[0.14em] text-muted">{card.label}</p>
            <p className="mt-2 font-serif text-[34px] leading-none text-forest">{card.value}</p>
            <p className="mt-2 text-[12px] text-muted">{card.sub}</p>
          </Link>
        ))}
      </div>

      {/* Önizleme + hızlı işlemler + aktivite */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          title="Site Önizleme"
          action={{ label: "Yeni sekmede aç", href: "/" }}
          className="lg:col-span-2"
        >
          <div className="relative h-[320px] overflow-hidden rounded-xl border border-line bg-cream">
            <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1 text-[11px] font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Canlı
            </span>
            <iframe
              src="/?preview=1"
              title="Canlı site önizlemesi"
              loading="lazy"
              className="h-[1400px] w-[1280px] origin-top-left scale-[0.25] border-0"
            />
          </div>
          <p className="mt-3 text-[12px] text-muted">
            Önizleme, sitenin gerçek sürümünü gösterir. İçerik ve tasarım değişikliklerini{" "}
            <Link href="/admin/editor" className="font-semibold text-forest">
              Sayfa Editörü
            </Link>
            ve{" "}
            <Link href="/admin/theme" className="font-semibold text-forest">
              Tema &amp; Tasarım
            </Link>{" "}
            üzerinden yapabilirsiniz.
          </p>
        </Card>

        <div className="space-y-6">
          <Card title="Hızlı İşlemler">
            <ul className="grid gap-2">
              {quickActions.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-[13.5px] font-medium text-ink transition-colors hover:border-tan hover:bg-cream"
                  >
                    {a.label}
                    <span className="text-tan">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Son Aktiviteler" action={{ label: "Tümü", href: "/admin/settings" }}>
            {audits.length === 0 ? (
              <Empty text="Henüz bir işlem kaydı yok." />
            ) : (
              <ul className="space-y-3">
                {audits.map((log) => (
                  <li key={log.id} className="flex items-start gap-3 text-[13px]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tan" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-ink">{log.action}</span>
                      <span className="block text-[11.5px] text-muted">
                        {new Date(log.createdAt).toLocaleString("tr-TR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>

      {/* Randevular + mesajlar */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Randevu Talepleri" action={{ label: "Yönet", href: "/admin/appointments" }} className="lg:col-span-2">
          {latestAppointments.length === 0 ? (
            <Empty text="Henüz randevu talebi gelmedi. Gelen talepler burada listelenir." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-line text-[11.5px] uppercase tracking-[0.1em] text-muted">
                    <th className="py-2 pr-3 font-semibold">Tarih</th>
                    <th className="py-2 pr-3 font-semibold">Ad Soyad</th>
                    <th className="py-2 pr-3 font-semibold">Hizmet</th>
                    <th className="py-2 pr-3 font-semibold">Tür</th>
                    <th className="py-2 font-semibold">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {latestAppointments.map((a) => {
                    const badge = STATUS_BADGE[a.status] ?? STATUS_BADGE.BEKLEMEDE;
                    return (
                      <tr key={a.id} className="border-b border-line/60 last:border-0">
                        <td className="py-3 pr-3 text-muted">
                          {new Date(a.createdAt).toLocaleDateString("tr-TR")}{" "}
                          {new Date(a.createdAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="py-3 pr-3 font-medium text-ink">{a.name}</td>
                        <td className="py-3 pr-3 text-muted">{a.service}</td>
                        <td className="py-3 pr-3 text-muted">{a.sessionType === "ONLINE" ? "Online" : "Yüz yüze"}</td>
                        <td className="py-3">
                          <span className={`rounded-full border px-2.5 py-1 text-[11.5px] font-medium ${badge.cls}`}>
                            {badge.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card title="Son Mesajlar" action={{ label: "Tümü", href: "/admin/messages" }}>
          {messages.length === 0 ? (
            <Empty text="Gelen kutusu boş." />
          ) : (
            <ul className="space-y-3">
              {messages.map((m) => (
                <li key={m.id} className="rounded-xl border border-line px-4 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[13.5px] font-semibold text-ink">{m.name}</p>
                    {!m.isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-tan" />}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[12.5px] text-muted">{m.message}</p>
                  <p className="mt-1.5 text-[11px] text-muted/80">
                    {new Date(m.createdAt).toLocaleString("tr-TR")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Sayfalar + yazılar + medya */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Sayfa Yönetimi" action={{ label: "Tüm sayfalar", href: "/admin/pages" }}>
          {pages.length === 0 ? (
            <Empty text="Kayıtlı sayfa yok." />
          ) : (
            <ul className="divide-y divide-line">
              {pages.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] text-ink">{p.title}</span>
                    <span className="block text-[11.5px] text-muted">/{p.slug}</span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] ${
                      p.status === "PUBLISHED"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    {p.status === "PUBLISHED" ? "Yayında" : "Taslak"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Blog Yazıları" action={{ label: "Yeni yazı", href: "/admin/posts/new" }}>
          {posts.length === 0 ? (
            <Empty text="Henüz blog yazısı eklenmedi." />
          ) : (
            <ul className="divide-y divide-line">
              {posts.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] text-ink">{p.title}</span>
                    <span className="block text-[11.5px] text-muted">
                      {p.updatedAt.toLocaleDateString("tr-TR")}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] ${
                      p.status === "PUBLISHED"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    {p.status === "PUBLISHED" ? "Yayında" : "Taslak"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Tema & Tasarım" action={{ label: "Düzenle", href: "/admin/theme" }}>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Ana Renk", value: design.primary || "#22392f" },
              { label: "Vurgu", value: design.accent || "#c9a97e" },
              { label: "Arka Plan", value: design.background || "#f8f4ee" },
              { label: "Metin", value: design.foreground || "#2b2f29" },
            ].map((c) => (
              <div key={c.label} className="text-center">
                <span
                  className="block h-12 w-full rounded-lg border border-line"
                  style={{ background: c.value }}
                />
                <span className="mt-1.5 block text-[11px] text-muted">{c.label}</span>
                <span className="block text-[10.5px] text-muted/70">{c.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            <Link
              href="/admin/theme"
              className="rounded-xl border border-line px-4 py-2.5 text-[13px] font-medium hover:border-tan hover:bg-cream"
            >
              Renk paletini düzenle
            </Link>
            <Link
              href="/admin/editor"
              className="rounded-xl border border-line px-4 py-2.5 text-[13px] font-medium hover:border-tan hover:bg-cream"
            >
              Sayfa düzenini düzenle
            </Link>
          </div>
        </Card>
      </div>

      {/* Sistem durumu */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="SEO & Entegrasyonlar" action={{ label: "Ayarlar", href: "/admin/integrations" }}>
          {integrations.length === 0 ? (
            <Empty text="Henüz entegrasyon yapılandırılmadı." />
          ) : (
            <ul className="divide-y divide-line">
              {integrations.map((i) => (
                <li key={i.provider} className="flex items-center justify-between py-2.5">
                  <span className="text-[13.5px] text-ink">{i.provider}</span>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11.5px] font-medium ${
                      i.isConnected
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    {i.isConnected ? "Bağlı" : "Bağlantı bekliyor"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Sistem Durumu" action={{ label: "Yedekleme", href: "/admin/settings" }}>
          <ul className="space-y-2.5 text-[13.5px]">
            <li className="flex items-center justify-between">
              <span className="text-muted">Bülten abonesi</span>
              <span className="font-semibold text-ink">{subscribers}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted">Okunmamış mesaj</span>
              <span className="font-semibold text-ink">{unreadMessages}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted">Veritabanı</span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11.5px] font-medium text-emerald-700">
                Bağlı
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted">AI görsel sağlayıcısı</span>
              <span className="rounded-full border border-line px-2.5 py-1 text-[11.5px] font-medium text-muted">
                Yapılandırılmadı
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
