import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import LogoutButton from "./_components/LogoutButton";
import Logo from "@/components/Logo";

const NAV = [
  { href: "/admin", label: "Genel Bakış" },
  { href: "/admin/ai-studio", label: "AI Görsel Stüdyosu" },
  { href: "/admin/posts", label: "Blog Yazıları" },
  { href: "/admin/pages", label: "Sayfalar" },
  { href: "/admin/editor", label: "Sayfa Editörü" },
  { href: "/admin/media", label: "Medya Kütüphanesi" },
  { href: "/admin/menu", label: "Navigasyon & Menü" },
  { href: "/admin/appointments", label: "Randevu Talepleri" },
  { href: "/admin/messages", label: "İletişim Talepleri" },
  { href: "/admin/collaborations", label: "İş Birliği Başvuruları" },
  { href: "/admin/newsletter", label: "Bülten Aboneleri" },
  { href: "/admin/settings", label: "Site Ayarları" },
  { href: "/admin/theme", label: "Tema & Tasarım" },
  { href: "/admin/integrations", label: "Entegrasyonlar" },
  { href: "/admin/users", label: "Kullanıcılar & Roller" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-[#faf7f2] text-[#2f332e]">
      <aside className="w-64 shrink-0 border-r border-[#e2dccd] bg-white hidden md:flex md:flex-col">
        <div className="px-5 py-5 border-b border-[#e2dccd] flex items-center gap-3">
          <Logo className="h-9 w-9 shrink-0" />
          <div>
            <p className="font-serif text-lg leading-tight">Zeynep Koçak</p>
            <p className="text-xs text-[#5b5f58]">Yönetim Paneli</p>
          </div>
        </div>
        <nav className="flex-1 py-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-5 py-2.5 text-sm text-[#5b5f58] hover:bg-[#f1ece2] hover:text-[#2f332e]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-[#e2dccd] text-xs text-[#5b5f58]">
          <p>{user.name ?? user.email}</p>
          <p className="mb-2">{user.role}</p>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-6 md:p-10">{children}</main>
    </div>
  );
}
