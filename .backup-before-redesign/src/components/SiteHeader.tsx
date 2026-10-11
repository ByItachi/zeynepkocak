"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

interface MegaMenuColumn {
  heading: string;
  links: { label: string; href: string; desc?: string }[];
}
interface MegaMenuItem {
  label: string;
  href?: string;
  columns?: MegaMenuColumn[];
  feature?: { title: string; desc: string; cta: string; ctaHref: string };
}

const MENU: MegaMenuItem[] = [
  {
    label: "Hakkımda",
    columns: [
      {
        heading: "Profesyonel Profil",
        links: [
          { label: "Hakkımda", href: "/hakkimda", desc: "Eğitim, deneyim ve çalışma yaklaşımı" },
          { label: "Çalışma Yaklaşımı", href: "/hakkimda#yaklasim" },
          { label: "Eğitim & Sertifikalar", href: "/hakkimda#egitim" },
        ],
      },
      {
        heading: "Uzmanlık Alanları",
        links: [
          { label: "Psikodrama Yaklaşımı", href: "/psikodrama" },
          { label: "Transformational Breath®", href: "/transformational-breath" },
        ],
      },
      {
        heading: "İletişim",
        links: [
          { label: "İletişim Formu", href: "/iletisim" },
          { label: "Randevu Alın", href: "/randevu" },
        ],
      },
    ],
    feature: {
      title: "Uzm. Psk. Zeynep Koçak",
      desc: "Bağdat Caddesi, İstanbul. Yüz yüze ve online görüşmeler.",
      cta: "Profili İncele",
      ctaHref: "/hakkimda",
    },
  },
  {
    label: "Çalışma Alanlarım",
    columns: [
      {
        heading: "Bireysel Çalışmalar",
        links: [
          { label: "Yetişkinlerle Çalışma", href: "/yetiskinlerle-calisma", desc: "Kaygı, tükenmişlik, ilişki güçlükleri" },
          { label: "Ergenlerle Çalışma", href: "/ergenlerle-calisma", desc: "Kimlik, aile ve okul sorunları" },
        ],
      },
      {
        heading: "İlişkiler",
        links: [
          { label: "Çiftlerle Çalışma", href: "/ciftlerle-calisma", desc: "İletişim, güven ve çatışma çözümü" },
        ],
      },
      {
        heading: "Görüşme Formatı",
        links: [
          { label: "Yüz Yüze Görüşmeler", href: "/iletisim", desc: "Bağdat Caddesi, İstanbul" },
          { label: "Online Görüşmeler", href: "/online-gorusmeler", desc: "Dünyanın her yerinden" },
        ],
      },
    ],
    feature: {
      title: "Hangi Alan Size Uygun?",
      desc: "Tüm çalışma alanlarını inceleyerek size en uygun desteği keşfedin.",
      cta: "Tüm Alanları Keşfet",
      ctaHref: "/calisma-alanlarim",
    },
  },
  {
    label: "Psikodrama & Atölyeler",
    columns: [
      {
        heading: "Psikodrama",
        links: [
          { label: "Psikodrama Hakkında", href: "/psikodrama", desc: "Co-Psychodramatist yaklaşımı" },
          { label: "Grup Çalışmaları", href: "/psikodrama#grup" },
        ],
      },
      {
        heading: "Atölyeler",
        links: [
          { label: "Yaklaşan Atölyeler", href: "/atolyeler" },
          { label: "Atölye Takvimi", href: "/atolyeler#takvim" },
          { label: "Katılım Süreci", href: "/atolyeler#katilim" },
        ],
      },
      {
        heading: "Bilgi & Başvuru",
        links: [
          { label: "Sık Sorulan Sorular", href: "/atolyeler#sss" },
          { label: "Bilgi Talebi", href: "/iletisim" },
          { label: "Ön Kayıt", href: "/randevu" },
        ],
      },
    ],
    feature: {
      title: "Grup Deneyimi",
      desc: "Psikodrama ve beden farkındalığı odaklı grup atölyeleri.",
      cta: "Atölyeleri Keşfet",
      ctaHref: "/atolyeler",
    },
  },
  {
    label: "Expat Support",
    columns: [
      {
        heading: "Services",
        links: [
          { label: "English-Speaking Support", href: "/expat-psychologist", desc: "Therapy sessions in English" },
          { label: "Online Sessions", href: "/online-gorusmeler", desc: "Available worldwide" },
        ],
      },
      {
        heading: "Focus Areas",
        links: [
          { label: "Working Across Cultures", href: "/expat-psychologist#cultures" },
          { label: "Life Transitions", href: "/expat-psychologist#transitions" },
          { label: "FAQ", href: "/expat-psychologist#faq" },
        ],
      },
      {
        heading: "Get in Touch",
        links: [
          { label: "About the Approach", href: "/hakkimda" },
          { label: "Session Format", href: "/expat-psychologist#format" },
          { label: "Contact in English", href: "/iletisim" },
        ],
      },
    ],
    feature: {
      title: "Expat Psychologist",
      desc: "Face-to-face in Bağdat Cad., İstanbul or online — for individuals, teens & couples.",
      cta: "Explore Services",
      ctaHref: "/expat-psychologist",
    },
  },
  {
    label: "Yazılar",
    columns: [
      {
        heading: "Kategoriler",
        links: [
          { label: "Tüm Yazılar", href: "/blog" },
          { label: "İlişkiler", href: "/blog?cat=iliskiler" },
          { label: "Kendini Tanıma", href: "/blog?cat=kendini-tanima" },
        ],
      },
      {
        heading: "Daha Fazla",
        links: [
          { label: "Yaşam Geçişleri", href: "/blog?cat=yasam-gecisleri" },
          { label: "Psikodrama", href: "/blog?cat=psikodrama" },
          { label: "Expat Yaşamı", href: "/blog?cat=expat" },
        ],
      },
    ],
    feature: {
      title: "Bilgi Merkezi",
      desc: "Psikoloji, ilişkiler ve kişisel gelişim üzerine uzman kaleminden yazılar.",
      cta: "Tüm Yazıları Gör",
      ctaHref: "/blog",
    },
  },
];

export default function SiteHeader({ brandName }: { brandName: string; instagramUrl: string; profileImageUrl?: string }) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeAll(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [mobileOpen]);

  function handleEnter(i: number) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(i);
  }
  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 200);
  }
  function handlePanelEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-[#faf7f2]/95 dark:bg-[#1a1d1a]/95 backdrop-blur-md border-b border-[#e2dccd] dark:border-[#2f332e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="font-serif text-lg lg:text-xl flex items-center gap-2.5 text-[#2f332e] dark:text-[#e8e4dc] shrink-0" onClick={closeAll}>
            <Logo className="h-9 w-9" />
            <span className="hidden sm:inline">{brandName}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-sm" role="menubar">
            {MENU.map((item, i) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={handleLeave}
              >
                <button
                  onClick={() => setOpenMenu(openMenu === i ? null : i)}
                  aria-expanded={openMenu === i}
                  aria-haspopup="true"
                  className={`px-3 py-2 rounded-md transition-colors font-medium ${openMenu === i ? "text-[#5e6b52] bg-[#f1ece2] dark:bg-[#2f332e] dark:text-[#8b9a7a]" : "text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#2f332e] dark:hover:text-white"}`}
                >
                  {item.label}
                  <svg className={`inline-block ml-1 w-3.5 h-3.5 transition-transform ${openMenu === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link href="/randevu" className="hidden sm:inline-block text-sm rounded-md bg-[#5e6b52] text-white px-4 py-2 hover:bg-[#4a5542] transition-colors font-medium">
              İletişim
            </Link>
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-[#5b5f58] dark:text-[#9a9e95]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu Panels */}
      {openMenu !== null && MENU[openMenu]?.columns && (
        <div
          className="hidden lg:block absolute left-0 right-0 bg-white dark:bg-[#1e211e] border-b border-[#e2dccd] dark:border-[#2f332e] shadow-xl animate-fadeIn"
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handleLeave}
          role="menu"
        >
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className={`grid gap-8 ${MENU[openMenu].feature ? "grid-cols-4" : "grid-cols-3"}`}>
              {MENU[openMenu].columns!.map((col) => (
                <div key={col.heading}>
                  <h3 className="text-xs uppercase tracking-widest text-[#5e6b52] dark:text-[#8b9a7a] font-semibold mb-4">{col.heading}</h3>
                  <ul className="space-y-1">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeAll}
                          className="block px-3 py-2.5 rounded-md hover:bg-[#f1ece2] dark:hover:bg-[#2a2d2a] transition-colors group"
                        >
                          <span className="text-sm font-medium text-[#2f332e] dark:text-[#e8e4dc] group-hover:text-[#5e6b52] dark:group-hover:text-[#8b9a7a]">{link.label}</span>
                          {link.desc && <span className="block text-xs text-[#8a8e85] dark:text-[#6a6e65] mt-0.5">{link.desc}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {MENU[openMenu].feature && (
                <div className="bg-[#f1ece2] dark:bg-[#2a2d2a] rounded-lg p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#2f332e] dark:text-[#e8e4dc] mb-2">{MENU[openMenu].feature!.title}</h3>
                    <p className="text-sm text-[#5b5f58] dark:text-[#9a9e95] mb-4 leading-relaxed">{MENU[openMenu].feature!.desc}</p>
                  </div>
                  <Link
                    href={MENU[openMenu].feature!.ctaHref}
                    onClick={closeAll}
                    className="inline-block text-sm font-medium text-[#5e6b52] dark:text-[#8b9a7a] hover:underline"
                  >
                    {MENU[openMenu].feature!.cta} →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click-outside overlay for desktop */}
      {openMenu !== null && (
        <div className="hidden lg:block fixed inset-0 z-[-1]" onClick={() => setOpenMenu(null)} />
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-[#faf7f2] dark:bg-[#1a1d1a] overflow-y-auto">
          <nav className="px-4 py-4 space-y-1">
            {MENU.map((item, i) => (
              <div key={item.label} className="border-b border-[#e2dccd] dark:border-[#2f332e] last:border-0">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === i ? null : i)}
                  aria-expanded={mobileAccordion === i}
                  className="w-full flex items-center justify-between py-3.5 text-left font-medium text-[#2f332e] dark:text-[#e8e4dc]"
                >
                  {item.label}
                  <svg className={`w-4 h-4 transition-transform ${mobileAccordion === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileAccordion === i && item.columns && (
                  <div className="pb-4 pl-2 space-y-4 animate-fadeIn">
                    {item.columns.map((col) => (
                      <div key={col.heading}>
                        <p className="text-xs uppercase tracking-widest text-[#5e6b52] dark:text-[#8b9a7a] font-semibold mb-2">{col.heading}</p>
                        <ul className="space-y-1">
                          {col.links.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href} onClick={closeAll} className="block py-2 pl-3 text-sm text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#2f332e] dark:hover:text-white">
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link href="/randevu" onClick={closeAll} className="block w-full text-center bg-[#5e6b52] text-white py-3 rounded-md font-medium hover:bg-[#4a5542] transition-colors">
                Randevu Alın
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
