import Link from "next/link";
import Image from "next/image";
import { getAllSettings } from "@/lib/settings";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Atölyeler | Zeynep Koçak",
  description:
    "Psikodrama temelli grup atölyeleri: kendini tanıma, duygusal farkındalık, ilişkiler ve stres yönetimi üzerine atölyeler.",
};

const WORKSHOPS = [
  {
    title: "İlişkiler ve İletişim",
    desc: "İhtiyaçlarını ve sınırlarını ifade etmek, daha sağlıklı bağlar kurmak için.",
    image: "/instagram/post-5.jpg",
    alt: "Sıcak bir oturma alanında bitkiler ve koltuk — atölye ortamı",
  },
  {
    title: "Kendini Tanıma ve Kimlik",
    desc: "Kendini daha iyi anlamak, değerlerini ve örüntülerini keşfetmek için.",
    image: "/images/atolye/atolye-atolyede.jpg",
    alt: "Bir atölyede beyaz tahta üzerinde notlarla çalışan katılımcı",
  },
  {
    title: "Duygusal Farkındalık",
    desc: "Duyguları tanımak, düzenlemek ve günlük yaşamda farkındalık geliştirmek için.",
    image: "/images/grup/oturum-daire.jpg",
    alt: "Grup atölyesinde oturma daireinde katılımcılar",
  },
  {
    title: "Stres Yönetimi ve Nefes",
    desc: "Gerginlikle başa çıkmak, beden ve nefes üzerinden rahatlamak için.",
    image: "/images/grup/oturum-mum.jpg",
    alt: "Grup oturumunda mumlarla gerçekleştirilen ortak ritüel",
  },
];

const FORMAT = [
  { k: "Grup Büyüklüğü", v: "8-15 kişi" },
  { k: "Süre", v: "3-4 saat (atölye türüne göre değişebilir)" },
  { k: "Sıklık", v: "Aylık veya belirli dönemlerde" },
  { k: "Yer", v: "Bağdat Caddesi, İstanbul" },
  { k: "Gizlilik", v: "Grup gizliliği ve güveni korunur" },
];

const PROCESS = [
  { t: "Açılış", d: "Grup üyeleri tanışır ve atölye hedefleri belirlenir." },
  { t: "Isınma", d: "Grup dinamiklerini geliştirmek için egzersizler yapılır." },
  { t: "Psikodrama", d: "Rol oynama ve yaşamsal deneyimler sahnelenir." },
  { t: "Paylaşım", d: "Grup üyeleri deneyimlerini paylaşırlar." },
  { t: "Kapanış", d: "Atölye özetlenir ve geri bildirim alınır." },
];

const FAQ = [
  {
    q: "Atölyeye katılmak için ön koşul var mı?",
    a: "Hayır. Atölyeler, tüm yaşlardaki ve deneyim seviyesindeki kişiler için açıktır.",
  },
  {
    q: "Atölyede rol oynamak zorunda mıyım?",
    a: "Hayır. Katılımcılar, rahat oldukları düzeyde katılabilirler. Gözlemci olarak katılmak da mümkündür.",
  },
  {
    q: "Atölyede gizlilik korunur mu?",
    a: "Evet. Grup gizliliği ve güveni korunur; konuşulanlar grupta kalır.",
  },
];

export default async function AtolyelerPage() {
  const settings = await getAllSettings();

  return (
    <div>
      <PageHero
        eyebrow="Atölyeler"
        title="Atölyeler"
        lead="Kendini keşfet, farkındalık büyüt."
        quote="“Kendini anlamak, daha iyi bir yarın için…”"
        breadcrumb={[{ label: "Anasayfa", href: "/" }, { label: "Atölyeler" }]}
      />

      {/* GİRİŞ */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[820px] px-5 text-center sm:px-8">
          <p className="text-[16px] leading-relaxed text-muted">
            Atölyelerimiz; kişisel gelişim, farkındalık ve yaratıcılık üzerine, psikodrama temelli
            yöntemlerle hazırlanır. Her atölye, katılımcıların kendilerini ifade edebileceği güvenli
            bir alanda yürütülür ve içeriği katılımcıların ihtiyaçlarına göre şekillenir.
          </p>
        </div>
      </section>

      {/* YAKLAŞAN ATÖLYELER */}
      <section className="pb-6 lg:pb-10">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-sage dark:text-tan">Atölye Programı</p>
              <h2 className="mt-3 font-serif text-[1.9rem] leading-tight text-ink dark:text-cream sm:text-[2.3rem]">
                Katılabileceğin Atölyeler
              </h2>
            </div>
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-forest pb-1 text-[14px] font-semibold text-forest dark:border-tan dark:text-tan"
            >
              Güncel tarihler için Instagram →
            </a>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKSHOPS.map((w) => (
              <article
                key={w.title}
                className="flex flex-col overflow-hidden rounded-[22px] border border-line bg-paper transition-shadow hover:shadow-[0_24px_50px_-40px_rgba(34,57,47,0.7)] dark:border-white/10 dark:bg-white/5"
              >
                <div className="relative h-[190px] w-full">
                  <Image
                    src={w.image}
                    alt={w.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-[19px] leading-snug text-ink dark:text-cream">
                    {w.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{w.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-muted">
                    <span>👥 8-15 kişi</span>
                    <span>🕑 3-4 saat</span>
                    <span>📍 Bağdat Caddesi</span>
                  </div>
                  <a
                    href={settings.whatsapp_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 self-start border-b border-forest pb-0.5 text-[13.5px] font-semibold text-forest dark:border-tan dark:text-tan"
                  >
                    Bilgi Al
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FORMAT + SÜREÇ */}
      <section className="bg-cream-deep py-14 dark:bg-[#101410] lg:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-sage dark:text-tan">Atölye Formatı</p>
            <h2 className="mt-3 font-serif text-[1.9rem] leading-tight text-ink dark:text-cream sm:text-[2.2rem]">
              Nasıl düzenlenir?
            </h2>
            <dl className="mt-6 space-y-3">
              {FORMAT.map((f) => (
                <div
                  key={f.k}
                  className="flex gap-4 rounded-2xl border border-line bg-paper px-5 py-3.5 dark:border-white/10 dark:bg-white/5"
                >
                  <dt className="w-32 shrink-0 text-[13.5px] text-muted">{f.k}</dt>
                  <dd className="text-[14.5px] font-medium text-ink dark:text-cream">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="eyebrow text-sage dark:text-tan">Atölye Süreci</p>
            <h2 className="mt-3 font-serif text-[1.9rem] leading-tight text-ink dark:text-cream sm:text-[2.2rem]">
              Adım adım atölye
            </h2>
            <ol className="mt-6 space-y-3">
              {PROCESS.map((p, i) => (
                <li
                  key={p.t}
                  className="flex gap-4 rounded-2xl border border-line bg-paper px-5 py-4 dark:border-white/10 dark:bg-white/5"
                >
                  <span className="font-serif text-[22px] leading-none text-tan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[15.5px] font-semibold text-ink dark:text-cream">
                      {p.t}
                    </span>
                    <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">{p.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[900px] px-5 sm:px-8">
          <h2 className="font-serif text-[1.9rem] text-ink dark:text-cream sm:text-[2.2rem]">
            Atölyeler Hakkında Sık Sorulanlar
          </h2>
          <div className="mt-7 space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-line bg-paper px-6 py-4 dark:border-white/10 dark:bg-white/5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-[17px] text-ink dark:text-cream">
                  {item.q}
                  <svg
                    className="h-5 w-5 shrink-0 text-tan transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest text-cream">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8 px-5 py-14 sm:px-8 lg:flex-row lg:justify-between lg:py-16">
          <p className="hand max-w-[380px] text-center text-[26px] leading-snug text-tan lg:text-left">
            “Birlikte öğrenmek, birlikte büyümektir.”
          </p>
          <div className="text-center lg:text-left">
            <h2 className="font-serif text-[1.7rem] leading-tight sm:text-[2rem]">
              Atölyelere katılmak ister misin?
            </h2>
            <p className="mt-2 text-[15px] text-cream/75">
              Güncel tarihler ve kontenjan bilgisi için bana ulaşabilirsin.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={settings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-tan px-7 py-3.5 text-[14.5px] font-semibold text-forest transition-colors hover:bg-white"
            >
              WhatsApp&apos;tan Yaz
            </a>
            <Link
              href="/randevu"
              className="rounded-full border border-white/60 px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-white hover:text-forest"
            >
              Randevu Al
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
