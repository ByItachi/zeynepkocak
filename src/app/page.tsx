import Link from "next/link";
import Image from "next/image";
import { getAllSettings } from "@/lib/settings";
import { prisma, safeQuery } from "@/lib/prisma";
import { INSTAGRAM_GALLERY } from "@/lib/instagram-gallery";
import InstagramGallery from "@/components/InstagramGallery";
import VideoCard from "@/components/VideoCard";
import PublicEditorSections from "@/components/PublicEditorSections";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";

export const dynamic = "force-dynamic";

const SERVICE_CARDS = [
  {
    title: "Bireysel Danışmanlık",
    desc: "Kendinizi daha iyi anlamak ve içsel kaynaklarınızı güçlendirmek için.",
    href: "/yetiskinlerle-calisma",
    image: "/instagram/post-4.jpg",
    alt: "Kitaplar ve gözlük — sakin bir okuma köşesi",
  },
  {
    title: "Çift Terapisi",
    desc: "İlişkideki iletişimi güçlendirmek ve daha sağlıklı bir bağ kurmak için.",
    href: "/ciftlerle-calisma",
    image: "/instagram/post-5.jpg",
    alt: "Birlikte not alan iki kişi",
  },
  {
    title: "Grup Terapileri",
    desc: "Paylaşmak, destek almak ve birlikte iyileşmek için güvenli alanlar.",
    href: "/grup-terapileri",
    image: "/images/grup-calismasi-1.jpg",
    alt: "Bir grup çalışmasından genel kadraj",
  },
  {
    title: "Atölyeler",
    desc: "Kendini keşfetmek ve farklılıkları artırmak için düzenlenen özel atölyeler.",
    href: "/atolyeler",
    image: "/images/atolye/atolye-atolyede.jpg",
    alt: "Bir atölyede grup çalışması yürütülürken",
  },
];

const TRUST = [
  {
    title: "Güvenli Alan",
    desc: "Yargılanmadan, rahatça paylaşabileceğiniz bir ortam.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.4-2.9 8.3-7 10-4.1-1.7-7-5.6-7-10V6l7-3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Bilimsel Yaklaşım",
    desc: "Kanıta dayalı, profesyonel danışmanlık.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a4 4 0 0 0-4 4 3.5 3.5 0 0 0-1 6.8V17a3 3 0 0 0 5 2.2A3 3 0 0 0 17 17v-2.2A3.5 3.5 0 0 0 16 8a4 4 0 0 0-4-4Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v15" />
      </svg>
    ),
  },
  {
    title: "Bütüncül Destek",
    desc: "Bireysel, çift ve grup terapileri ile kapsamlı yaklaşım.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 19a5 5 0 0 1 10 0M13.5 19a5 5 0 0 1 7.5-4.3" />
      </svg>
    ),
  },
  {
    title: "Daha Güçlü Sen",
    desc: "Kendini tanı, potansiyelini keşfet, yaşamına yön ver.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
      </svg>
    ),
  },
];

export default async function HomePage() {
  const settings = await getAllSettings();
  const heroSlides: HeroSlide[] = [
    { type: "image", src: "/images/hero/slide-1.jpg", alt: "Uzm. Psk. Zeynep Koçak" },
    { type: "image", src: "/images/hero/slide-2.jpg", alt: "Uzm. Psk. Zeynep Koçak" },
    { type: "image", src: "/images/hero/slide-3.jpg", alt: "Uzm. Psk. Zeynep Koçak" },
    { type: "image", src: "/images/hero/slide-4.jpg", alt: "Uzm. Psk. Zeynep Koçak" },
    { type: "image", src: "/images/hero/slide-5.jpg", alt: "Uzm. Psk. Zeynep Koçak" },
    { type: "image", src: "/images/hero/slide-6.jpg", alt: "Uzm. Psk. Zeynep Koçak" },
    { type: "image", src: "/images/hero/slide-7.jpg", alt: "Uzm. Psk. Zeynep Koçak" },
    { type: "image", src: "/images/hero/slide-8.jpg", alt: "Uzm. Psk. Zeynep Koçak" },
  ];
  const latestPosts = await safeQuery(
    "home.latestPosts",
    () =>
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 3,
      }),
    []
  );

  return (
    <div>
      {/* ===== HERO — koyu orman yeşili bant ===== */}
      <section className="relative -mt-[72px] overflow-hidden bg-forest pt-[72px] text-white">
        {/* Sağdaki kayan banner (görsel + video) */}
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <HeroSlider
            slides={heroSlides}
            intervalMs={5000}
            className="h-full w-full"
            mediaClassName="object-[50%_28%]"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest via-forest/45 to-transparent" />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-[1240px] gap-10 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-12 lg:pb-28 lg:pt-24">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-tan">
              <span className="h-px w-10 bg-tan" />
              Daha İyi Bir Sen Mümkün
            </p>
            <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.06] sm:text-6xl lg:text-[4.4rem]">
              Kendini Anlamak
              <br />
              <span className="italic text-tan">Değişimin İlk Adımıdır</span>
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/80">
              Güvenli, bilimsel ve bütüncül bir yaklaşımla; hayatınızda kalıcı ve anlamlı değişiklikler
              yaratmanıza eşlik ediyorum.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/randevu"
                className="group inline-flex items-center gap-2 rounded-full bg-tan px-8 py-4 text-[15px] font-semibold text-forest transition-colors hover:bg-white"
              >
                Randevu Al
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
                </svg>
              </Link>
              <a href="#tanitim" className="group flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 transition-colors group-hover:border-tan group-hover:text-tan">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
                    <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l11-6.86a1.03 1.03 0 0 0 0-1.76l-11-6.86A1.03 1.03 0 0 0 8 5.14Z" />
                  </svg>
                </span>
                <span className="text-left">
                  <span className="block text-[13.5px] font-semibold">Tanıtım Videosu</span>
                  <span className="block text-[12px] text-white/60">Grup çalışmalarından kesitler</span>
                </span>
              </a>
            </div>

            {/* Mobil kayan banner (görsel + video) */}
            <HeroSlider
              slides={heroSlides}
              intervalMs={5000}
              className="mt-12 h-[300px] w-full rounded-[22px] lg:hidden"
              mediaClassName="object-[50%_25%]"
            />
          </div>

          {/* El yazısı alıntı + randevu kartı */}
          <div className="relative hidden lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
            <p className="hand ml-auto max-w-[260px] text-right text-[26px] leading-snug text-tan/90">
              “İyi hissetmek bir lüks değil, bir ihtiyaçtır.”
            </p>

            <div className="mt-10 max-w-[330px] rounded-2xl bg-cream p-6 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <p className="font-serif text-xl">Randevu Oluştur</p>
              <p className="mt-1 text-[13.5px] text-muted">Size en uygun zamanı ve çalışma biçimini seçin.</p>
              <Link
                href="/randevu"
                className="mt-4 flex items-center justify-between rounded-xl bg-forest px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-forest-deep"
              >
                Randevu Al
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GÜVEN ŞERİDİ ===== */}
      <section className="border-b border-line bg-cream dark:border-white/10 dark:bg-[#161a16]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-px px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {TRUST.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 border-line px-2 py-7 sm:border-r sm:last:border-r-0 sm:px-5"
            >
              <span className="text-forest dark:text-tan">{item.icon}</span>
              <span>
                <span className="block font-serif text-[17px] text-ink dark:text-cream">{item.title}</span>
                <span className="mt-1 block text-[13.5px] leading-relaxed text-muted">{item.desc}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HER DANIŞAN ÖZELDİR ===== */}
      <section id="tanitim" className="bg-cream py-16 dark:bg-[#161a16] lg:py-24">
        <div className="mx-auto grid max-w-[1240px] items-start gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <VideoCard
              src="/videos/tanitim.mp4"
              poster="/images/portre/zeynep-portre-yesil.jpg"
              label="Tanıtım Videosu"
              sub="Uzm. Psk. Zeynep Koçak"
              aspect="5/6"
              objectPosition="center top"
              caption="Kısa tanıtım videosu — 24 saniye."
            />
          </div>

          <div className="lg:col-span-4">
            <p className="eyebrow text-sage dark:text-tan">Terapi Yaklaşımım</p>
            <h2 className="mt-4 font-serif text-[2.1rem] leading-tight text-ink dark:text-cream sm:text-[2.5rem]">
              Her Danışan Özeldir
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
              Terapi sürecinde, ihtiyaçlarınıza ve yaşam öykünüze özel, bilimsel temellere dayanan yöntemlerle
              çalışıyorum. Amacım; sizi anlamak, güçlendirmek ve daha sağlıklı bir yaşam sürmenize destek olmak.
            </p>
            <Link
              href="/hakkimda"
              className="group mt-7 inline-flex items-center gap-2 border-b border-forest pb-1 text-[14.5px] font-semibold text-forest dark:border-tan dark:text-tan"
            >
              Hakkımda Daha Fazla
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
              </svg>
            </Link>
          </div>

          <div className="lg:col-span-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                {
                  title: "Bireysel Terapi",
                  desc: "Kaygı, stres, özgüven, ilişki sorunları ve daha fazlası.",
                  href: "/yetiskinlerle-calisma",
                },
                {
                  title: "Çift Terapisi",
                  desc: "İlişkilerde iletişimi güçlendirme, yeniden bağ kurma.",
                  href: "/ciftlerle-calisma",
                },
                {
                  title: "Grup Terapileri",
                  desc: "Paylaşmak, destek almak ve birlikte iyileşmek.",
                  href: "/grup-terapileri",
                },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-2xl border border-line bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-tan hover:shadow-[0_20px_40px_-30px_rgba(34,57,47,0.6)] dark:border-white/10 dark:bg-white/5"
                >
                  <span className="block font-serif text-[19px] text-ink dark:text-cream">{s.title}</span>
                  <span className="mt-1.5 block text-[13.5px] leading-relaxed text-muted">{s.desc}</span>
                </Link>
              ))}
            </div>

            <div className="relative mt-4 overflow-hidden rounded-2xl bg-forest px-6 py-6 text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/instagram/post-1.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-25"
                loading="lazy"
              />
              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <p className="hand max-w-[240px] text-[24px] leading-snug text-tan">
                  “Değişim, küçük bir farkındalıkla başlar.”
                </p>
                <Link
                  href="/calisma-alanlarim"
                  className="inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-2.5 text-[13.5px] font-semibold transition-colors hover:border-tan hover:text-tan"
                >
                  Tüm Hizmetler
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HİZMETLER ===== */}
      <section className="bg-cream-deep py-16 dark:bg-[#101410] lg:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-sage dark:text-tan">Hizmetler</p>
              <h2 className="mt-4 font-serif text-[2.1rem] leading-tight text-ink dark:text-cream sm:text-[2.6rem]">
                Çalışma Alanlarım
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
                Hayatın farklı dönemlerinde karşımıza çıkan zorluklar, bazen profesyonel bir destekle daha kolay
                yönetilebilir. Size uygun desteği birlikte belirleyebiliriz.
              </p>
              <Link
                href="/calisma-alanlarim"
                className="group mt-7 inline-flex items-center gap-2 border-b border-forest pb-1 text-[14.5px] font-semibold text-forest dark:border-tan dark:text-tan"
              >
                Tüm Hizmetleri Gör
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
                </svg>
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
              {SERVICE_CARDS.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(34,57,47,0.7)] dark:border-white/10 dark:bg-white/5"
                >
                  <span className="relative block h-40 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      width={480}
                      height={320}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="font-serif text-[18px] text-ink dark:text-cream">{card.title}</span>
                    <span className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{card.desc}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-forest dark:text-tan">
                      Detayları Gör
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
                      </svg>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== GRUP TERAPİSİ (koyu bant) ===== */}
      <section className="bg-forest py-16 text-white lg:py-24">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            {/* Video dikey 720×1280 (9:16) — kutu 5/6 ile hizalandı, siyah bant yok */}
            <VideoCard
              src="/videos/grup-yeni.mp4"
              poster="/images/grup/grup-yeni-poster.jpg"
              aspect="5/6"
              objectPosition="center"
              label="Grup Terapisi"
              sub="Son oturumdan kesitler"
            />
          </div>
          <div className="lg:col-span-6">
            <p className="eyebrow text-tan">Grup Terapisi</p>
            <h2 className="mt-4 font-serif text-[2.1rem] leading-tight sm:text-[2.7rem]">Birlikte Daha Güçlüyüz</h2>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-white/75">
              Grup terapileri; benzer deneyimler yaşayan bireylerin bir araya gelerek birbirinden öğrenmesini ve
              destek almasını sağlayan güçlü bir iyileşme alanıdır.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-8">
              <Link
                href="/grup-terapileri"
                className="inline-flex items-center gap-2 rounded-full bg-tan px-7 py-3.5 text-[14.5px] font-semibold text-forest transition-colors hover:bg-white"
              >
                Grup Terapilerini İncele
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
                </svg>
              </Link>
              <p className="hand max-w-[240px] text-[22px] leading-snug text-tan/90">
                “Kendini anlatabildiğin bir ortam, iyileşmenin ilk adımıdır.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BİLİMSEL YAKLAŞIM ===== */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="relative lg:col-span-4">
            <Image
              src="/instagram/post-4.jpg"
              alt="Kitaplar ve notlar — bilimsel çalışma ortamı"
              width={800}
              height={600}
              className="rounded-[22px] object-cover shadow-[0_30px_70px_-45px_rgba(34,57,47,0.8)]"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-4">
            <p className="eyebrow text-sage dark:text-tan">Bilimsel Yaklaşım</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.4rem]">
              Bilimle Desteklenen Profesyonel Bir Yaklaşım
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
              Çalışmalarımda psikolojinin bilimsel temellerine bağlı kalarak, kanıta dayalı yöntemleri etik
              ilkelerle uygun şekilde uyguluyorum.
            </p>
            <Link
              href="/hakkimda#egitim"
              className="group mt-7 inline-flex items-center gap-2 border-b border-forest pb-1 text-[14.5px] font-semibold text-forest dark:border-tan dark:text-tan"
            >
              Eğitim ve Mesleki Bilgiler
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
              </svg>
            </Link>
          </div>
          <div className="lg:col-span-4">
            <ul className="divide-y divide-line rounded-2xl border border-line bg-cream dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
              {[
                {
                  t: "Lisans ve Uzmanlık Eğitimleri",
                  d: "Psikoloji lisansı ve ilgili mesleki eğitimler.",
                },
                {
                  t: "Kanıta Dayalı Yöntemler",
                  d: "Bilimsel araştırmalarla desteklenen terapi yaklaşımları.",
                },
                {
                  t: "Etik ve Güvenli Çerçeve",
                  d: "Gizlilik, etik ilkeler ve profesyonel sınırlar.",
                },
              ].map((f) => (
                <li key={f.t} className="flex items-start gap-4 px-6 py-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="mt-0.5 h-6 w-6 shrink-0 text-tan">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.4-2.9 8.3-7 10-4.1-1.7-7-5.6-7-10V6l7-3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
                  </svg>
                  <span>
                    <span className="block text-[15.5px] font-semibold text-ink dark:text-cream">{f.t}</span>
                    <span className="mt-1 block text-[13.5px] text-muted">{f.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      {latestPosts.length > 0 && (
        <section className="bg-cream-deep py-16 dark:bg-[#101410] lg:py-24">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-sage dark:text-tan">Blog &amp; Makaleler</p>
                <h2 className="mt-4 font-serif text-[2.1rem] leading-tight text-ink dark:text-cream sm:text-[2.5rem]">
                  Hayatına Dokunan Yazılar
                </h2>
              </div>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 border-b border-forest pb-1 text-[14.5px] font-semibold text-forest dark:border-tan dark:text-tan"
              >
                Tüm Yazıları Gör
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
                </svg>
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {latestPosts.map((post, i) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
                  <span className="relative block h-52 overflow-hidden rounded-2xl bg-forest/10">
                    <Image
                      src={post.coverImageUrl || ["/instagram/post-1.jpg", "/instagram/post-5.jpg", "/instagram/post-4.jpg"][i % 3]}
                      alt={post.title}
                      width={640}
                      height={420}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </span>
                  <span className="mt-4 flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-muted">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) : ""}
                    {post.readingMinutes ? <><span className="text-line">|</span> {post.readingMinutes} dk okuma</> : null}
                  </span>
                  <span className="mt-2 font-serif text-[20px] leading-snug text-ink group-hover:text-forest dark:text-cream">
                    {post.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== INSTAGRAM ===== */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-sage dark:text-tan">Instagram</p>
              <h2 className="mt-4 font-serif text-[2rem] text-ink dark:text-cream">Gündemden</h2>
            </div>
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-semibold text-forest hover:text-tan-deep dark:text-tan"
            >
              @zeynepleyolarkadasi →
            </a>
          </div>
          <InstagramGallery posts={INSTAGRAM_GALLERY} instagramUrl={settings.instagram_url} />
        </div>
      </section>

      {/* Editor ile eklenen bölümler */}
      <PublicEditorSections pageSlug="home" />

      {/* ===== RANDEVU CTA ===== */}
      <section className="relative overflow-hidden bg-forest py-16 text-white lg:py-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cta-hands.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full animate-cta-kenburns object-cover opacity-20"
          loading="lazy"
        />
        <div className="relative mx-auto max-w-[1240px] px-5 text-center sm:px-8">
          <h2 className="mx-auto max-w-3xl font-serif text-[2.1rem] leading-tight sm:text-[2.8rem]">
            İlk adım, ihtiyacınızı konuşmak olabilir.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/75">
            Sorularınız, endişeleriniz veya merak ettikleriniz için iletişime geçebilirsiniz. Gizlilik ve güven,
            çalışmamızın temelini oluşturur.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/randevu"
              className="rounded-full bg-tan px-8 py-3.5 text-[15px] font-semibold text-forest transition-colors hover:bg-white"
            >
              Randevu Alın
            </Link>
            <a
              href={settings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/50 px-8 py-3.5 text-[15px] font-semibold transition-colors hover:border-tan hover:text-tan"
            >
              WhatsApp&apos;tan Yaz
            </a>
            <Link
              href="/iletisim"
              className="rounded-full border border-white/50 px-8 py-3.5 text-[15px] font-semibold transition-colors hover:border-tan hover:text-tan"
            >
              İletişim Formu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
