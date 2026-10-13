"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Logo from "@/components/Logo";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  keywords?: string;
}

function Ic({ d, extra }: { d: string; extra?: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px] shrink-0"
    >
      <path d={d} />
      {extra}
    </svg>
  );
}

const ICONS = {
  grid: <Ic d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  page: <Ic d="M6 3h9l3 3v15H6zM14 3v4h4" />,
  post: <Ic d="M5 4h14v16H5zM8 9h8M8 13h8M8 17h5" />,
  menu: <Ic d="M4 7h16M4 12h16M4 17h16" />,
  editor: <Ic d="M4 5h16v6H4zM4 13h9v6H4zM15 13h5v6h-5z" />,
  palette: <Ic d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H16a5 5 0 0 0 5-5c0-3.9-4-6.5-9-6.5Z" extra={<circle cx="7.5" cy="12" r="1" /> } />,
  image: <Ic d="M4 5h16v14H4zM4 15l4-4 3 3 3-3 6 6" extra={<circle cx="9" cy="9" r="1.4" />} />,
  sparkles: <Ic d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />,
  calendar: <Ic d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" />,
  mail: <Ic d="M3 6h18v12H3zM3 7l9 6 9-6" />,
  handshake: <Ic d="M8 12l3-3 3 3 3-3 4 4v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3l2-2Z" />,
  users: <Ic d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a6 6 0 0 1 12 0M15 20a5.5 5.5 0 0 1 6-4.5" />,
  cog: <Ic d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" extra={<path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" />} />,
  plug: <Ic d="M9 3v6M15 3v6M7 9h10v3a5 5 0 0 1-10 0zM12 17v4" />,
  cart: <Ic d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" extra={<><circle cx="9" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></>} />,
};

const GROUPS: { title?: string; items: NavItem[] }[] = [
  {
    items: [{ href: "/admin", label: "Genel Bakış", icon: ICONS.grid }],
  },
  {
    title: "İçerik",
    items: [
      { href: "/admin/posts", label: "Blog Yazıları", icon: ICONS.post, keywords: "yazı blog makale" },
      { href: "/admin/pages", label: "Sayfalar", icon: ICONS.page, keywords: "sayfa sayfalar" },
      { href: "/admin/editor", label: "Sayfa Editörü", icon: ICONS.editor, keywords: "editör tasarım bölüm" },
      { href: "/admin/menu", label: "Menü Yönetimi", icon: ICONS.menu, keywords: "menü navigasyon" },
    ],
  },
  {
    title: "Medya & Tasarım",
    items: [
      { href: "/admin/media", label: "Medya Kütüphanesi", icon: ICONS.image, keywords: "medya görsel resim video" },
      { href: "/admin/ai-studio", label: "AI Görsel Stüdyosu", icon: ICONS.sparkles, keywords: "ai görsel üret" },
      { href: "/admin/theme", label: "Tema & Tasarım", icon: ICONS.palette, keywords: "tema renk yazı tipi" },
    ],
  },
  {
    title: "Mağaza",
    items: [
      { href: "/admin/products", label: "Ürünler & Kurslar", icon: ICONS.cart, keywords: "ürün kurs eğitim e-ticaret dijital" },
      { href: "/admin/orders", label: "Siparişler", icon: ICONS.calendar, keywords: "sipariş ödeme sepet" },
    ],
  },
  {
    title: "İletişim",
    items: [
      { href: "/admin/appointments", label: "Randevu Talepleri", icon: ICONS.calendar, keywords: "randevu" },
      { href: "/admin/messages", label: "Mesajlar", icon: ICONS.mail, keywords: "mesaj iletişim" },
      { href: "/admin/collaborations", label: "İş Birliği", icon: ICONS.handshake, keywords: "iş birliği marka" },
      { href: "/admin/newsletter", label: "Bülten", icon: ICONS.users, keywords: "bülten abone" },
    ],
  },
  {
    title: "Sistem",
    items: [
      { href: "/admin/settings", label: "Site Ayarları", icon: ICONS.cog, keywords: "ayarlar" },
      { href: "/admin/integrations", label: "Entegrasyonlar", icon: ICONS.plug, keywords: "seo analytics integrasyon" },
      { href: "/admin/users", label: "Kullanıcılar & Roller", icon: ICONS.users, keywords: "kullanıcı yetki" },
    ],
  },
];

export default function AdminShell({
  userName,
  userEmail,
  userRole,
  pendingAppointments,
  unreadMessages,
  children,
}: {
  userName: string;
  userEmail: string;
  userRole: string;
  pendingAppointments: number;
  unreadMessages: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const searchResults = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    if (q.length < 2) return [];
    const flat = GROUPS.flatMap((g) => g.items);
    return flat.filter(
      (i) =>
        i.label.toLocaleLowerCase("tr").includes(q) ||
        (i.keywords ?? "").toLocaleLowerCase("tr").includes(q)
    );
  }, [query]);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const sidebarNav = (
    <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Yönetim menüsü">
      {GROUPS.map((group) => (
        <div key={group.title ?? "root"} className="mb-5">
          {group.title && (
            <p className="px-3 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
              {group.title}
            </p>
          )}
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] transition-colors ${
                    isActive(item.href)
                      ? "bg-tan/95 font-semibold text-forest shadow-sm"
                      : "text-white/70 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  const sidebarInner = (
    <>
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <span className="text-tan">
          <Logo className="h-9 w-9" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-serif text-[17px] leading-tight text-white">Zeynep Koçak</p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">Yönetim Paneli</p>
        </div>
      </div>
      {sidebarNav}
      <div className="border-t border-white/10 px-5 py-4">
        <p className="truncate text-[13px] font-medium text-white/85">{userName}</p>
        <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-white/40">{userRole}</p>
        <Link
          href="/"
          target="_blank"
          className="block text-[12.5px] text-tan/90 hover:text-tan"
        >
          ← Canlı siteyi görüntüle
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-ink">
      {/* Masaüstü sabit kenar çubuğu */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col bg-forest md:flex">
        {sidebarInner}
      </aside>

      {/* Mobil çekmece */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-forest shadow-2xl">
            <button
              className="absolute right-3 top-4 p-2 text-white/70"
              onClick={() => setDrawerOpen(false)}
              aria-label="Menüyü kapat"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            {sidebarInner}
          </aside>
        </div>
      )}

      <div className="md:pl-[264px]">
        {/* Üst bar */}
        <header className="sticky top-0 z-20 border-b border-[#e2dccd] bg-cream/95 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              className="-ml-1 p-2 text-ink md:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Menüyü aç"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            {/* Arama */}
            <div className="relative w-full max-w-md">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              >
                <path strokeLinecap="round" d="m21 21-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sayfa, yazı veya ayar ara…"
                aria-label="Panelde ara"
                className="w-full rounded-full border border-line bg-paper py-2.5 pl-10 pr-4 text-[13.5px] outline-none placeholder:text-muted/70 focus:border-tan"
              />
              {searchResults.length > 0 && (
                <ul className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-line bg-paper shadow-xl">
                  {searchResults.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        onClick={() => setQuery("")}
                        className="flex items-center gap-3 px-4 py-2.5 text-[13.5px] hover:bg-cream"
                      >
                        {r.icon}
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              {/* Bildirimler */}
              <div className="relative">
                <Link
                  href="/admin/appointments"
                  aria-label="Bildirimler"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink hover:border-tan"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-[18px] w-[18px]">
                    <path strokeLinecap="round" d="M15 17h5l-1.4-2.1a2 2 0 0 1-.35-1.1V10a5.25 5.25 0 0 0-10.5 0v3.8c0 .4-.12.78-.34 1.1L6 17h5m4 0a2 2 0 1 1-4 0" />
                  </svg>
                  {pendingAppointments + unreadMessages > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                      {pendingAppointments + unreadMessages}
                    </span>
                  )}
                </Link>
              </div>

              <a
                href="/"
                target="_blank"
                className="hidden items-center gap-2 rounded-full border border-forest px-4 py-2 text-[13px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white sm:inline-flex"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-4 w-4">
                  <path strokeLinecap="round" d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="2.6" />
                </svg>
                Canlı Site
              </a>

              {/* Kullanıcı menüsü */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-expanded={menuOpen}
                  className="flex items-center gap-2 rounded-full border border-line bg-paper py-1.5 pl-1.5 pr-3 hover:border-tan"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest font-serif text-[13px] text-white">
                    {userName.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="hidden text-left leading-tight sm:block">
                    <span className="block text-[13px] font-semibold text-ink">{userName}</span>
                    <span className="block text-[10.5px] uppercase tracking-[0.12em] text-muted">{userRole}</span>
                  </span>
                </button>
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 top-full z-40 mt-2 w-56 rounded-xl border border-line bg-paper p-2 shadow-xl">
                      <p className="px-3 py-2 text-[12px] text-muted">{userEmail}</p>
                      <Link
                        href="/admin/settings"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-[13.5px] hover:bg-cream"
                      >
                        Site Ayarları
                      </Link>
                      <Link
                        href="/admin/users"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-[13.5px] hover:bg-cream"
                      >
                        Kullanıcılar &amp; Roller
                      </Link>
                      <div className="mt-1 border-t border-line pt-1">
                        <button
                          type="button"
                          onClick={async () => {
                            await fetch("/api/auth/logout", { method: "POST" });
                            router.push("/admin/login");
                            router.refresh();
                          }}
                          className="w-full rounded-lg px-3 py-2 text-left text-[13.5px] text-red-600 hover:bg-red-50"
                        >
                          Çıkış Yap
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
