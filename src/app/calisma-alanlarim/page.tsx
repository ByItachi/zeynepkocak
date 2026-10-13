import Link from "next/link";
import Image from "next/image";
import { getAllSettings } from "@/lib/settings";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Çalışma Alanlarım | Zeynep Koçak",
  description:
    "Bireysel danışmanlık, çift terapisi, grup terapileri, atölyeler, ergen ve online görüşme çalışma alanları.",
};

const PRIMARY_CARDS = [
  {
    title: "Bireysel Danışmanlık",
    desc: "Kaygı, tükenmişlik, ilişki güçlükleri, özgüven ve yaşamsal geçiş dönemlerinde bireysel görüşmeler.",
    href: "/yetiskinlerle-calisma",
    image: "/images/portre/zeynep-portre-yesil.jpg",
    alt: "Uzm. Psk. Zeynep Koçak portresi",
  },
  {
    title: "Çift Terapisi",
    desc: "İletişim sorunları, güven, çatışma çözümü ve ilişkiyi güçlendirme odaklı çift görüşmeleri.",
    href: "/ciftlerle-calisma",
    image: "/instagram/post-5.jpg",
    alt: "Birlikte not alan iki kişi",
  },
  {
    title: "Grup Terapileri",
    desc: "Benzer deneyimleri paylaşan bireyler için güvenli, destekleyici grup terapileri.",
    href: "/grup-terapileri",
    image: "/images/grup-calismasi-1.jpg",
    alt: "Bir grup çalışmasından genel kadraj",
  },
  {
    title: "Atölyeler",
    desc: "Psikodrama temelli atölyelerle farkındalık, kişisel gelişim ve grup deneyimi.",
    href: "/atolyeler",
    image: "/images/atolye/atolye-atolyede.jpg",
    alt: "Bir atölyede grup çalışması yürütülürken",
  },
];

const SECONDARY_LINKS = [
  {
    title: "Ergenlerle Çalışma",
    href: "/ergenlerle-calisma",
    desc: "Kimlik, aile ve okul kaynaklı zorluklarda ergenle birebir çalışma.",
  },
  {
    title: "Online Görüşmeler",
    href: "/online-gorusmeler",
    desc: "Dünyanın her yerinden güvenli ve gizli online seans imkânı.",
  },
  {
    title: "Psikodrama & Grup Atölyeleri",
    href: "/psikodrama",
    desc: "Co-Psychodramatist olarak psikodrama temelli grup çalışmaları.",
  },
  {
    title: "Expat Psychologist",
    href: "/expat-psychologist",
    desc: "Türkiye'de yaşayan yabancı danışanlar için İngilizce destek.",
  },
  {
    title: "Transformational Breath®",
    href: "/transformational-breath",
    desc: "Beden farkındalığı ve nefes çalışması temelli grup ve bireysel seanslar.",
  },
];

const APPROACH = [
  {
    title: "Bireysel Terapi",
    desc: "Zorluklarla başa çıkma, öz farkındalık ve kişisel gelişim için birebir çalışma.",
    href: "/yetiskinlerle-calisma",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />
      </svg>
    ),
  },
  {
    title: "Güvenli Alan",
    desc: "Yargılamadan, gizlilik ilkesiyle korunaklı bir ortamda ilerleyen süreç.",
    href: "/gizlilik-politikasi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.4-2.9 8.3-7 10-4.1-1.7-7-5.6-7-10V6l7-3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Bireysel Yaklaşım",
    desc: "Her danışana özel, ihtiyaç ve hedeflere göre kişiselleştirilen bir yol haritası.",
    href: "/hakkimda",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1" />
        <circle cx="12" cy="12" r="3.2" />
      </svg>
    ),
  },
];

const PROCESS = [
  { t: "İlk Görüşme", d: "İhtiyaçlarınızı ve beklentilerinizi dinler, birlikte çalışmayı değerlendiririz." },
  { t: "Değerlendirme", d: "Size en uygun yöntem ve görüşme sıklığı birlikte belirlenir." },
  { t: "Kişisel Plan", d: "Hedefleriniz doğrultusunda kişiye özel bir terapi planı oluşturulur." },
  { t: "Terapi Süreci", d: "Düzenli görüşmelerle ilerleme değerlendirilir ve süreç esnek biçimde güncellenir." },
];

export default async function CalismAlanlarPage() {
  const settings = await getAllSettings();

  return (
    <div>
      <PageHero
        eyebrow="Hizmetler"
        title="Çalışma Alanlarım"
        lead="Kendinizi anlamak ve değişim alan açmak için."
        quote="“Her insanın hikâyesi kendine özgüdür.”"
        breadcrumb={[{ label: "Anasayfa", href: "/" }, { label: "Çalışma Alanlarım" }]}
      />

      {/* GİRİŞ — metin + görsel */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-sage dark:text-tan">Psikolojik Destek</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.4rem]">
              Her bireyin hikâyesi özeldir.
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
              Çalışma alanlarım; yaşamın farklı dönemlerinde karşılaşabileceğiniz duygusal, ilişkisel ve
              kişisel zorluklara yönelik profesyonel psikolojik destek sunmayı kapsar. İhtiyacınıza uygun
              terapi formunu birlikte belirleyerek, daha sağlıklı ve dengeli bir yaşam kurmanıza destek
              oluyorum.
            </p>
            <p className="hand mt-6 text-[26px] text-sage dark:text-tan">Zeynep Koçak</p>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[22px] shadow-[0_30px_70px_-45px_rgba(34,57,47,0.8)]">
              <Image
                src="/instagram/post-4.jpg"
                alt="Sakin bir okuma köşesi — kitaplar ve bitkiler"
                width={1200}
                height={800}
                className="h-[340px] w-full object-cover sm:h-[400px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ANA ÇALIŞMA ALANLARI — kartlar */}
      <section className="pb-4">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRIMARY_CARDS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-paper transition-shadow hover:shadow-[0_24px_50px_-40px_rgba(34,57,47,0.7)] dark:border-white/10 dark:bg-white/5"
              >
                <div className="relative h-[190px] w-full">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-[19px] text-ink dark:text-cream">{c.title}</h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 self-start border-b border-forest pb-0.5 text-[13.5px] font-semibold text-forest dark:border-tan dark:text-tan">
                    Detayları Gör
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* İkincil alanlar — kompakt bağlantılar */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SECONDARY_LINKS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-2xl border border-line bg-cream px-5 py-4 transition-colors hover:border-tan dark:border-white/10 dark:bg-white/5"
              >
                <span className="block font-serif text-[16px] text-ink dark:text-cream">{s.title}</span>
                <span className="mt-1 block text-[12.5px] leading-relaxed text-muted">{s.desc}</span>
                <span className="mt-2 inline-block text-[12.5px] font-semibold text-forest dark:text-tan">
                  Detay →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MESLEKİ YAKLAŞIM */}
      <section className="bg-cream-deep py-14 dark:bg-[#101410] lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="eyebrow text-center text-sage dark:text-tan">Yaklaşımım</p>
          <h2 className="mt-3 text-center font-serif text-[1.9rem] leading-tight text-ink dark:text-cream sm:text-[2.3rem]">
            Mesleki Yaklaşımım
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {APPROACH.map((a) => (
              <Link key={a.title} href={a.href} className="group text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-paper text-forest shadow-sm transition-colors group-hover:bg-tan group-hover:text-white dark:bg-white/10 dark:text-tan">
                  {a.icon}
                </span>
                <h3 className="mt-4 font-serif text-[19px] text-ink dark:text-cream">{a.title}</h3>
                <p className="mx-auto mt-2 max-w-[300px] text-[13.5px] leading-relaxed text-muted">
                  {a.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="eyebrow text-sage dark:text-tan">Süreç</p>
          <h2 className="mt-3 font-serif text-[1.9rem] leading-tight text-ink dark:text-cream sm:text-[2.3rem]">
            Süreç Nasıl İşler?
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div
                key={p.t}
                className="rounded-2xl border border-line bg-paper p-6 dark:border-white/10 dark:bg-white/5"
              >
                <span className="font-serif text-[26px] text-tan">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-serif text-[18px] text-ink dark:text-cream">{p.t}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest text-cream">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8 px-5 py-14 sm:px-8 lg:flex-row lg:justify-between lg:py-16">
          <div className="text-center lg:text-left">
            <h2 className="font-serif text-[1.7rem] leading-tight sm:text-[2.1rem]">
              İhtiyacınıza uygun desteği birlikte keşfedelim.
            </h2>
            <p className="mt-2 text-[15px] text-cream/75">
              Kendinize ayıracağınız her adım, daha iyi bir yarın için.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/randevu"
              className="rounded-full bg-tan px-7 py-3.5 text-[14.5px] font-semibold text-forest transition-colors hover:bg-white"
            >
              Randevu Al
            </Link>
            <a
              href={settings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/60 px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-white hover:text-forest"
            >
              WhatsApp&apos;tan Yaz
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
