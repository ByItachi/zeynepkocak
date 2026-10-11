"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

const NAV: NavItem[] = [
  { label: "Anasayfa", href: "/" },
  {
    label: "Hakkımda",
    href: "/hakkimda",
    children: [
      { label: "Profesyonel Profil", href: "/hakkimda", desc: "Eğitim, deneyim ve çalışma yaklaşımı" },
      { label: "Psikodrama Yaklaşımı", href: "/psikodrama", desc: "Co-Psychodramatist grup çalışması" },
      { label: "Transformational Breath®", href: "/transformational-breath", desc: "Nefes ve beden farkındalığı" },
    ],
  },
  {
    label: "Hizmetler",
    href: "/calisma-alanlarim",
    children: [
      { label: "Bireysel Danışmanlık", href: "/yetiskinlerle-calisma", desc: "Kaygı, tükenmişlik, öz farkındalık" },
      { label: "Ergenlerle Çalışma", href: "/ergenlerle-calisma", desc: "Kimlik, aile ve okul kaynaklı zorluklar" },
      { label: "Çift Terapisi", href: "/ciftlerle-calisma", desc: "İletişim, güven ve çatışma çözümü" },
      { label: "Online Görüşmeler", href: "/online-gorusmeler", desc: "Dünyanın her yerinden" },
      { label: "Expat Support", href: "/expat-psychologist", desc: "Therapy sessions in English" },
    ],
  },
  { label: "Grup Terapileri", href: "/grup-terapileri" },
  { label: "Atölyeler", href: "/atolyeler" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export default function SiteHeader({
  brandName,
  instagramUrl,
}: {
  brandName: string;
  instagramUrl: string;
  profileImageUrl?: string;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  // Rota değiştiğinde açık menüleri kapat (render sırasında ayarlanan durum deseni)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileAccordion(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  // Anasayfada hero'nun üzerinde şeffaf; kaydırınca ve iç sayfalarda krem zemin
  const solid = !isHome || scrolled;
  const textClass = solid ? "text-ink dark:text-cream" : "text-white";
  const linkClass = solid
    ? "text-ink/75 dark:text-cream/75 hover:text-forest dark:hover:text-tan"
    : "text-white/85 hover:text-white";

  function handleEnter(i: number) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(i);
  }
  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  }
  function keepOpen() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-cream/95 dark:bg-[#161a16]/95 backdrop-blur-md border-b border-line dark:border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className={`flex shrink-0 items-center gap-3 ${textClass}`}
            onClick={closeAll}
            aria-label={`${brandName} — Anasayfa`}
          >
            <Logo className="h-9 w-9 text-tan" />
            <span className="leading-none">
              <span className="block font-serif text-[19px] tracking-[0.02em]">{brandName}</span>
              <span className="mt-1 block text-[9.5px] font-semibold uppercase tracking-[0.3em] opacity-70">
                Psikolojik Danışmanlık
              </span>
            </span>
          </Link>

          {/* Masaüstü menü */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
            {NAV.map((item, i) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => (item.children ? handleEnter(i) : keepOpen())}
                onMouseLeave={handleLeave}
              >
                {item.children ? (
                  <button
                    onClick={() => setOpenMenu(openMenu === i ? null : i)}
                    aria-expanded={openMenu === i}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 px-3 py-2 text-[14px] font-medium transition-colors ${linkClass}`}
                  >
                    {item.label}
                    <svg
                      className={`h-3 w-3 transition-transform ${openMenu === i ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    className={`block px-3 py-2 text-[14px] font-medium transition-colors ${
                      pathname === item.href
                        ? solid
                          ? "text-forest dark:text-tan"
                          : "text-tan"
                        : linkClass
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Sağ taraf */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className={solid ? "" : "text-white"}>
              <ThemeToggle />
            </span>
            <Link
              href="/randevu"
              className="hidden rounded-full bg-tan px-6 py-2.5 text-[13.5px] font-semibold tracking-wide text-forest shadow-[0_6px_18px_-8px_rgba(0,0,0,0.5)] transition-colors hover:bg-tan-deep hover:text-white sm:inline-block"
            >
              Randevu Al
            </Link>
            <button
              className={`-mr-2 p-2 lg:hidden ${textClass}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Masaüstü açılır menü */}
      {openMenu !== null && NAV[openMenu]?.children && (
        <div
          className="absolute inset-x-0 hidden border-b border-line bg-paper/98 shadow-[0_24px_60px_-30px_rgba(34,57,47,0.45)] backdrop-blur-md lg:block animate-fadeIn"
          onMouseEnter={keepOpen}
          onMouseLeave={handleLeave}
        >
          <div className="mx-auto max-w-[1240px] px-8 py-8">
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 lg:grid-cols-3">
              {NAV[openMenu].children!.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  className="group rounded-lg px-4 py-3 transition-colors hover:bg-cream"
                >
                  <span className="block font-serif text-[17px] text-ink group-hover:text-forest">
                    {link.label}
                  </span>
                  {link.desc && <span className="mt-0.5 block text-[13px] text-muted">{link.desc}</span>}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-lg bg-cream px-5 py-4">
              <p className="text-sm text-muted">
                Karar veremediniz mi? Kısa bir ön görüşme ile size en uygun çalışma biçimini birlikte belirleyebiliriz.
              </p>
              <Link
                href={NAV[openMenu].href}
                onClick={closeAll}
                className="ml-6 shrink-0 text-sm font-semibold text-forest hover:text-tan-deep"
              >
                Tümünü Gör →
              </Link>
            </div>
          </div>
        </div>
      )}

      {openMenu !== null && <div className="fixed inset-0 z-[-1] hidden lg:block" onClick={() => setOpenMenu(null)} />}

      {/* Mobil menü */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-cream dark:bg-[#161a16] lg:hidden">
          <nav className="px-5 py-4" aria-label="Mobil menü">
            {NAV.map((item, i) => (
              <div key={item.label} className="border-b border-line dark:border-white/10">
                {item.children ? (
                  <>
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === i ? null : i)}
                      aria-expanded={mobileAccordion === i}
                      className="flex w-full items-center justify-between py-4 text-left font-serif text-lg text-ink dark:text-cream"
                    >
                      {item.label}
                      <svg
                        className={`h-4 w-4 transition-transform ${mobileAccordion === i ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileAccordion === i && (
                      <div className="animate-fadeIn pb-4">
                        <Link
                          href={item.href}
                          onClick={closeAll}
                          className="block py-2 text-[15px] font-medium text-forest dark:text-tan"
                        >
                          Genel Bakış →
                        </Link>
                        {item.children.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeAll}
                            className="block py-2 text-[15px] text-muted dark:text-cream/70"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    className="block py-4 font-serif text-lg text-ink dark:text-cream"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="py-6">
              <Link
                href="/randevu"
                onClick={closeAll}
                className="block rounded-full bg-tan py-3.5 text-center font-semibold text-forest"
              >
                Randevu Al
              </Link>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block py-2 text-center text-sm text-muted"
              >
                Instagram&apos;da takip et →
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
