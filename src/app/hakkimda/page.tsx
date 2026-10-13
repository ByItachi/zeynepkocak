import Image from "next/image";
import Link from "next/link";
import { getAllSettings } from "@/lib/settings";
import PageHero from "@/components/PageHero";

export const dynamic = "force-dynamic";

const PILLARS = [
  {
    title: "Psikoloji Lisansı",
    desc: "Akademik temele dayalı, mesleki etik çerçevesiyle yürütülen profesyonel destek.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4 3 8l9 4 9-4-9-4Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 10v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      </svg>
    ),
  },
  {
    title: "Bireysel ve Grup",
    desc: "Bireysel, çift ve grup terapilerinde deneyim; psikodrama temelli çalışmalar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 19a5 5 0 0 1 10 0M13.5 19a5 5 0 0 1 7.5-4.3" />
      </svg>
    ),
  },
  {
    title: "Sürekli Gelişim",
    desc: "Eğitim, seminer ve atölyelerle kendimi sürekli yenileyen bir mesleki pratik.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-7 w-7">
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m20 20-3.5-3.5M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    title: "Güvenli Alan",
    desc: "Yargılamadan, kabul ve anlayışla ilerleyen gizli ve güvenli bir süreç.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.4-2.9 8.3-7 10-4.1-1.7-7-5.6-7-10V6l7-3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

const EDUCATION = [
  {
    t: "Lisans Eğitimi",
    d: "Psikoloji lisans derecesi ve temel mesleki formasyon.",
  },
  {
    t: "Uygulamalı Eğitimler",
    d: "Psikodrama, grup terapisi ve ilişkisel çalışmalar üzerine uygulamalı eğitimler.",
  },
  {
    t: "Sürekli Mesleki Gelişim",
    d: "Alanla ilgili seminer, eğitim ve atölyelere katılım.",
  },
  {
    t: "Etki ve Değerler",
    d: "Mesleki etik ilkeleri, gizlilik ve danışan yararı temel alınır.",
  },
  {
    t: "Süpervizyon",
    d: "Düzenli süpervizyon desteğiyle pratik geliştirme.",
  },
];

export default async function HakkimdaPage() {
  const settings = await getAllSettings();

  return (
    <div>
      <PageHero
        eyebrow="Hakkımda"
        title="Hakkımda"
        lead="Psikolojiye olan ilgim, insanların kendini anlamasına ve yaşamına daha fazla farkındalık katmasına inançla şekillendi."
        quote="“Her insan, kendi hikâyesinin en iyi uzmanıdır.”"
        breadcrumb={[{ label: "Anasayfa", href: "/" }, { label: "Hakkımda" }]}
      />

      {/* TANITIM — portre + metin */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[22px] shadow-[0_30px_70px_-45px_rgba(34,57,47,0.8)]">
              <Image
                src="/images/portre/zeynep-portre-yesil.jpg"
                alt="Uzm. Psk. Zeynep Koçak portresi"
                width={1200}
                height={1500}
                priority
                className="h-[460px] w-full object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow text-sage dark:text-tan">Psikolog</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.4rem]">
              Merhaba, ben Zeynep Koçak
            </h2>
            <p className="mt-5 whitespace-pre-line text-[15.5px] leading-relaxed text-muted">
              {settings.about_text}
            </p>
            <p className="hand mt-6 text-[27px] text-sage dark:text-tan">Sevgiyle, Zeynep Koçak</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/randevu"
                className="rounded-full bg-forest px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-forest-deep dark:bg-tan dark:text-forest"
              >
                Randevu Al
              </Link>
              <Link
                href="/calisma-alanlarim"
                className="rounded-full border border-forest px-7 py-3.5 text-[14.5px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:border-tan dark:text-tan"
              >
                Çalışma Alanlarım
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DAYANAKLAR — 4 sütun ikon şeridi */}
      <section className="border-y border-line bg-cream dark:border-white/10 dark:bg-[#161a16]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-px px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col items-center px-4 py-8 text-center"
            >
              <span className="text-forest dark:text-tan">{p.icon}</span>
              <span className="mt-3 block font-serif text-[17px] text-ink dark:text-cream">
                {p.title}
              </span>
              <span className="mt-1.5 block text-[13px] leading-relaxed text-muted">{p.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* EĞİTİM VE MESLEKİ GELİŞİM */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] items-start gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-sage dark:text-tan">Eğitim ve Mesleki Gelişim</p>
            <h2 className="mt-4 font-serif text-[1.9rem] leading-tight text-ink dark:text-cream sm:text-[2.2rem]">
              Sürekli Öğrenme, Daha İyi Destek
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Mesleki gelişime önem veriyor, güncel bilgi ve tekniklerle kendimi sürekli yeniliyorum.
              Böylece danışanlarıma daha etkili ve nitelikli bir destek sunabiliyorum.
            </p>
            <div className="mt-7 overflow-hidden rounded-[22px] border border-line dark:border-white/10">
              <Image
                src="/images/atolye/atolye-atolyede.jpg"
                alt="Bir atölyede beyaz tahta üzerinde çalışan Zeynep Koçak"
                width={1440}
                height={1080}
                className="h-[260px] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <ol className="space-y-3 lg:col-span-7">
            {EDUCATION.map((e, i) => (
              <li
                key={e.t}
                className="flex gap-4 rounded-2xl border border-line bg-paper px-5 py-4 dark:border-white/10 dark:bg-white/5"
              >
                <span className="font-serif text-[22px] leading-none text-tan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-ink dark:text-cream">{e.t}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">{e.d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* GRUP & ATÖLYE ÇALIŞMALARI */}
      <section className="bg-cream-deep py-14 dark:bg-[#101410] lg:py-20">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-sage dark:text-tan">Grup &amp; Atölye Çalışmaları</p>
            <h2 className="mt-4 font-serif text-[1.9rem] leading-tight text-ink dark:text-cream sm:text-[2.2rem]">
              Grup çalışmalarını atölye zemininde de yürütüyorum
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Psikodrama temelli grup atölyeleri, kültür kurumlarıyla yürütülen çalışmalar ve
              eğitim/kursiyer gruplarıyla yapılan atölye deneyimleri; paylaşım, iş birliği ve duygusal
              farkındalık üzerine kuruludur.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/grup-terapileri"
                className="rounded-full bg-forest px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-forest-deep dark:bg-tan dark:text-forest"
              >
                Grup Terapileri
              </Link>
              <Link
                href="/atolyeler"
                className="rounded-full border border-forest px-7 py-3.5 text-[14.5px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:border-tan dark:text-tan"
              >
                Atölyeler
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="overflow-hidden rounded-[22px] border border-line bg-paper dark:border-white/10 dark:bg-white/5">
              <Image
                src="/images/grup/oturum-daire.jpg"
                alt="Grup terapisi oturumunda katılımcıların oluşturduğu oturma daireyi"
                width={1440}
                height={1800}
                className="h-[340px] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="px-5 py-4 text-[13px] text-muted">
                Grup ve atölye çalışmalarından bir kare.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest text-cream">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8 px-5 py-14 sm:px-8 lg:flex-row lg:justify-between lg:py-16">
          <p className="hand max-w-[380px] text-center text-[26px] leading-snug text-tan lg:text-left">
            “İyi hissetmek bir lüks değil, bir ihtiyaçtır.”
          </p>
          <div className="text-center lg:text-left">
            <h2 className="font-serif text-[1.7rem] leading-tight sm:text-[2.1rem]">
              Birlikte ilk adımı atalım.
            </h2>
            <p className="mt-2 text-[15px] text-cream/75">
              Kendinize ayıracağınız en değerli yatırım, ruh sağlığınızdır.
            </p>
          </div>
          <Link
            href="/randevu"
            className="rounded-full bg-tan px-7 py-3.5 text-[14.5px] font-semibold text-forest transition-colors hover:bg-white"
          >
            Randevu Al
          </Link>
        </div>
      </section>
    </div>
  );
}
