import Image from "next/image";
import Link from "next/link";
import { getAllSettings } from "@/lib/settings";
import PageHero from "@/components/PageHero";

export const dynamic = "force-dynamic";

export default async function HakkimdaPage() {
  const settings = await getAllSettings();

  const tags = [
    "Yetişkin",
    "Ergen",
    "Çift",
    "Yüz yüze & Online",
    "Co-Psychodramatist",
    "Expat Psychologist",
    "Transformational Breath® Practitioner",
  ];

  return (
    <div>
      <PageHero
        eyebrow="Hakkımda"
        title="Merhaba, ben Zeynep Koçak"
        lead="Psikoloji insanın kendini daha iyi anlaması ve yaşamına daha fazla farkındalık katması inancıyla; bireylerin duygularını, düşüncelerini ve ilişkilerini keşfetmesine eşlik ediyorum."
        quote="“Her insan, kendi hikâyesinin en iyi uzmanıdır.”"
        breadcrumb={[{ label: "Anasayfa", href: "/" }, { label: "Hakkımda" }]}
      />

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
            <p className="eyebrow text-sage dark:text-tan">Uzman Psikolog</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.4rem]">
              Bilimsel temellere dayanan, kişiye özel bir yaklaşım
            </h2>
            <p className="mt-5 whitespace-pre-line text-[15.5px] leading-relaxed text-muted">
              {settings.about_text}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-paper px-4 py-1.5 text-[13px] text-ink dark:border-white/10 dark:bg-white/5 dark:text-cream"
                >
                  {tag}
                </li>
              ))}
            </ul>

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
              <p className="text-[13.5px] text-muted">Konum: {settings.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ATÖLYE / GRUP ÇALIŞMALARI */}
      <section className="bg-cream-deep py-14 dark:bg-[#101410] lg:py-20">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-sage dark:text-tan">Grup &amp; Atölye Çalışmaları</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.3rem]">
              Grup çalışmalarını atölye zemininde de yürütüyorum
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
              Psikodrama temelli grup atölyeleri, kültür kurumlarıyla yürütülen çalışmalar ve
              eğitim/kursiyer gruplarıyla yapılan atölye deneyimleri; paylaşım, iş birliği ve duygusal
              farkındalık üzerine kuruludur.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
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
                src="/images/atolye/atolye-atolyede.jpg"
                alt="Atölyede grup çalışması planlanırken"
                width={1600}
                height={1200}
                className="h-[340px] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="px-5 py-4 text-[13px] text-muted">
                Atölye ve grup çalışmalarından bir kare.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
