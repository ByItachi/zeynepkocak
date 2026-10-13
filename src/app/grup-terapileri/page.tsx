import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import VideoCard from "@/components/VideoCard";
import { getAllSettings } from "@/lib/settings";

export const metadata = {
  title: "Grup Terapileri | Zeynep Koçak",
  description:
    "Benzer deneyimler yaşayan insanların bir araya geldiği, güvenli ve profesyonel grup terapisi çalışmaları. Psikodrama temelli gruplar ve destek grupları.",
};

const VALUES = [
  {
    title: "Güvenli Ortam",
    desc: "Yargılamadan paylaşabileceğiniz, gizlilik ilkesiyle korunan bir alan.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.4-2.9 8.3-7 10-4.1-1.7-7-5.6-7-10V6l7-3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "İnsanlar Arası Destek",
    desc: "Benzer deneyimler yaşayan kişilerin birbirinden öğrenmesi ve destek olması.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 19a5 5 0 0 1 10 0M13.5 19a5 5 0 0 1 7.5-4.3" />
      </svg>
    ),
  },
  {
    title: "Kalıcı Beceriler",
    desc: "İletişim, duygusal farkındalık ve başa çıkma becerilerinde gelişim.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1" />
        <circle cx="12" cy="12" r="3.2" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    t: "Ön Görüşme",
    d: "Grubun size uygun olup olmadığını birlikte değerlendiririz. Beklentileriniz ve sorularınız konuşulur.",
  },
  {
    t: "Gruba Katılım",
    d: "Uygun bulunduğunuzda grup takvimi, sıklığı ve çerçevesi sizinle paylaşılır.",
  },
  {
    t: "Süreç",
    d: "Düzenli oturumlarda paylaşım, rol çalışmaları ve grup dinamikleri üzerinden ilerlenir.",
  },
  {
    t: "Kapanış",
    d: "Süreç sonunda kazanımlar değerlendirilir ve ihtiyaç duyulursa bireysel çalışmaya devam edilebilir.",
  },
];

// Müşteri tarafından sağlanan güncel program afişlerinden alınan gerçek bilgiler.
const PROGRAMS = [
  {
    title: "İlişki Halleri",
    kind: "Romantik İlişkiler Üzerine · 8 Haftalık Grup Terapisi",
    desc: "İlişkilerimizi anlamak, değişen dünyada daha sağlıklı ve doyurucu bağlar kurabilmek için…",
    image: "/images/grup/iliski-halleri.jpg",
    alt: "İlişki Halleri — romantik ilişkiler üzerine 8 haftalık grup terapisi afişi",
    details: [
      { k: "Tarih", v: "8 Ekim – 26 Kasım 2026" },
      { k: "Zaman", v: "Her Perşembe · 19.00" },
      { k: "Yer", v: "Suadiye / Bağdat Caddesi" },
      { k: "Katılım", v: "+18 yetişkin · Sınırlı kontenjan" },
    ],
  },
  {
    title: "İlişkiler Üzerine",
    kind: "8 Haftalık Grup Terapisi",
    desc: "Uzm. Psk. Zeynep Koçak eşliğinde, güvenli ve paylaşım temelli bir grup terapisi.",
    image: "/images/grup/iliskiler-uzerine.jpg",
    alt: "İlişkiler Üzerine — 8 haftalık grup terapisi afişi",
    details: [
      { k: "Tarih", v: "6 Ekim – 24 Kasım 2026" },
      { k: "Zaman", v: "Her Salı · 20.00 – 21.30" },
      { k: "Yer", v: "Ayrılık Çeşmesi, Marmaray yanı / Kadıköy" },
      { k: "Katılım", v: "Sınırlı kontenjan" },
    ],
  },
];

// Uygulanan grup terapileri başlıkları (mockup yapısına göre)
const APPLIED_GROUPS = [
  {
    title: "Anksiyete Grubu",
    desc: "Kaygı ve stresle başa çıkma tekniklerini güvenli bir grup ortamında öğrenmek için.",
    image: "/images/grup/oturum-mum.jpg",
    alt: "Sıcak ışıkta mumlarla yürütülen grup oturumu",
  },
  {
    title: "Öz Güven ve Benlik Grubu",
    desc: "Kendini tanımak, benlik algısını güçlendirmek ve daha sağlıklı sınırlar kurmak için.",
    image: "/images/grup/oturum-yumruk.jpg",
    alt: "Grup egzersizinde katılımcıların kaldırdığı yumruklar",
  },
  {
    title: "İlişkiler ve İletişim Grubu",
    desc: "İlişki örüntülerini anlamak ve iletişim becerilerini geliştirmek için.",
    image: "/images/grup/oturum-daire.jpg",
    alt: "Grup terapisi oturumunda oturma daireyi",
  },
];

// Oturumdan fotoğraflar — katılımcı izniyle paylaşılan gerçek grup çalışması kareleri.
const SESSION_PHOTOS = [
  {
    image: "/images/grup/oturum-daire.jpg",
    alt: "Grup terapisi oturumunda katılımcıların oluşturduğu oturma daireyi",
    title: "Tanışma Dairesi",
    desc: "Oturum, herkesin görüldüğü ve söz hakkının eşit olduğu bir daireyle başlar.",
  },
  {
    image: "/images/grup/oturum-mum.jpg",
    alt: "Grup oturumunda mumlarla gerçekleştirilen ortak ritüel",
    title: "Ortak Ritüel",
    desc: "Birlikte yapılan ritüeller, grubun güvenini ve aidiyet duygusunu güçlendirir.",
  },
  {
    image: "/images/grup/oturum-yumruk.jpg",
    alt: "Grup egzersizinde katılımcıların kaldırdığı yumruklar",
    title: "Grup Egzersizi",
    desc: "Beden, nefes ve ifade üzerinden çalışan egzersizlerle duygusal farkındalık geliştirilir.",
  },
];

// Müze Gazhane gibi kültür kurumlarıyla yürütülen grup çalışmaları — /atolyeler'den taşındı.
const EVENTS = [
  {
    image: "/images/etkinlik/sevebilmek.jpg",
    alt: "Sevebilmek? — Müze Gazhane'de düzenlenen grup çalışması afişi",
    title: "Sevebilmek?",
    desc: "Müze Gazhane · Grup çalışması · 26 Temmuz",
  },
  {
    image: "/images/etkinlik/gecis-halinde-olmak.jpg",
    alt: "Geçiş Halinde Ol'mak — Müze Gazhane grup çalışması afişi",
    title: "Geçiş Halinde Ol'mak",
    desc: "Müze Gazhane · Grup çalışması · 14 Haziran",
  },
  {
    image: "/images/etkinlik/iliskilerde-sinir-koymak.jpg",
    alt: "İlişkilerde Sınır Koymak — Müze Gazhane grup çalışması afişi",
    title: "İlişkilerde Sınır Koymak",
    desc: "Müze Gazhane · Grup çalışması · 12 Nisan",
  },
  {
    image: "/images/etkinlik/kirilma-noktasi.jpg",
    alt: "Kırılma Noktası: Boşluk Hissi ve Nefesin Başlangıcı — Müze Gazhane grup çalışması afişi",
    title: "Kırılma Noktası",
    desc: "Müze Gazhane · Grup çalışması · 7 Şubat",
  },
  {
    image: "/images/grup/etkinlik-kulis.jpg",
    alt: "Bir etkinlik kulisinde aynada çekilen grup fotoğrafı",
    title: "Kulisinden",
    desc: "Etkinlik hazırlığı ve birlikte olma anları",
  },
];

const PROGRAM_FLOW = [
  { t: "Ben kimim, ilişkide kim oluyorum?", d: "Güven ve ilişkiye dair ilk izler." },
  { t: "Köklerimize Yolculuk", d: "Bağlanma stilleri ve ilk ilişkiler." },
  { t: "Ben Neredeyim?", d: "Kendilik algısı ve sağlıklı sınırlar koyma." },
  { t: "Duygular Taşınca", d: "Tetikleyiciler, kontrol duygusu ve duygusal regülasyon." },
  { t: "Söyleyemediklerimiz", d: "İletişim kalıplarını açma ve duygusal ifade." },
  { t: "İlişkide Kim Güçlü?", d: "Güç dinamikleri ve bağlılık korkuları." },
  { t: "Yas Süreci, Ayrılıklar", d: "Yeniden ilişki yapılandırma." },
  { t: "Seçimler", d: "Partner seçimi, ilişki niyetleri, kapanış, entegrasyon ve veda ritüeli." },
];

const FAQ = [
  {
    q: "Grup terapisi kimler için uygundur?",
    a: "Benzer konularda destek arayan, başkalarının deneyimlerinden öğrenmek isteyen yetişkinler için uygundur. Uygunluk, ön görüşmede birlikte değerlendirilir.",
  },
  {
    q: "Grup kaç kişiden oluşur?",
    a: "Grup büyüklüğü, çalışmanın amacına ve yöntemine göre belirlenir. Küçük ve orta boy gruplar, herkesin söz alabileceği güvenli bir alan sağlar.",
  },
  {
    q: "Grup çalışmalarında gizlilik nasıl korunur?",
    a: "Gizlilik, grup başlangıcında yapılan çerçeve sözleşmesiyle güvence altına alınır. Grup içinde konuşulanlar dışarı taşınmaz.",
  },
  {
    q: "Grup terapisi ile bireysel terapi birlikte yürütülebilir mi?",
    a: "Evet. Birçok danışan grup çalışmasını bireysel terapiyle birlikte yürütür; bu birlikte planlanır.",
  },
];

export default async function GrupTerapileriPage() {
  const settings = await getAllSettings();

  return (
    <div>
      <PageHero
        eyebrow="Grup Terapileri"
        title="Grup Terapileri"
        lead="Paylaşmak, dinlemek, birlikte büyümek."
        quote="“Kendini anlatabildiğin bir ortam, iyileşmenin ilk adımıdır.”"
        breadcrumb={[{ label: "Anasayfa", href: "/" }, { label: "Grup Terapileri" }]}
      />

      {/* NEDEN GRUP */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* Video 16:9 (832×464) — kutu oranı videoyla eşleştirildi ki kırpma olmasın */}
            <VideoCard
              src="/videos/grup-terapisi-1.mp4"
              poster="/images/grup-calismasi-1.jpg"
              aspect="16/9"
              label="Grup çalışmasından bir kesit"
              caption="Katılımcı mahremiyetine saygı çerçevesinde, izinli görüntüler kullanılır."
            />
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow text-sage dark:text-tan">Grup Terapileri</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.4rem]">
              Grup Terapilerinin Faydaları
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
              Yalnız olmadığınızı görmek, değişimin güçlü bir başlangıcıdır. Grup terapisi; benzer
              deneyimler yaşayan insanların bir araya gelerek güçlü bir destek ağı oluşturduğu
              profesyonel süreçlerdir.
            </p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
              Grup terapileri; bireyin kendi deneyimini başkalarının deneyimleriyle karşılaştırmasına,
              yeni iletişim yolları denemesi ve güvenli bir çerçevede duygularını ifade etmesine alan açar.
              Süreç, alanında uzman bir kolaylaştırıcı tarafından yürütülür ve bilimsel temellere dayanır.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {VALUES.map((v) => (
                <div key={v.title} className="rounded-2xl border border-line bg-cream p-5 dark:border-white/10 dark:bg-white/5">
                  <span className="text-tan">{v.icon}</span>
                  <p className="mt-3 font-serif text-[17px] text-ink dark:text-cream">{v.title}</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UYGULANAN GRUP TERAPİLERİ */}
      <section className="bg-cream py-14 dark:bg-[#161a16] lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="eyebrow text-sage dark:text-tan">Uygulanan Grup Terapileri</p>
          <h2 className="mt-4 font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.3rem]">
            Hangi gruplar yürütülüyor?
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Grupların teması ve süresi ihtiyaca göre belirlenir. Aşağıdaki başlıklar, yürütülen grup
            çalışmalarının genel çerçevesini gösterir.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {APPLIED_GROUPS.map((g) => (
              <article
                key={g.title}
                className="overflow-hidden rounded-[22px] border border-line bg-paper dark:border-white/10 dark:bg-white/5"
              >
                <Image
                  src={g.image}
                  alt={g.alt}
                  width={1440}
                  height={900}
                  className="h-[230px] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="font-serif text-[19px] text-ink dark:text-cream">{g.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{g.desc}</p>
                  <Link
                    href="/randevu"
                    className="mt-4 inline-flex items-center gap-2 border-b border-forest pb-0.5 text-[13.5px] font-semibold text-forest dark:border-tan dark:text-tan"
                  >
                    Detayları Gör
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Birlikte iyileşmek — CTA kartı */}
          <div className="mt-10 flex flex-col items-center gap-6 rounded-[22px] bg-forest px-8 py-10 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h3 className="font-serif text-[1.7rem] leading-tight text-cream sm:text-[2rem]">
                Birlikte iyileşmek mümkün.
              </h3>
              <p className="mt-2 max-w-xl text-[15px] text-cream/75">
                Grup terapisi yolculuğuna çıkmak, yalnız olmadığınızı görmek demektir.
              </p>
            </div>
            <Link
              href="/randevu"
              className="shrink-0 rounded-full bg-tan px-7 py-3.5 text-[14.5px] font-semibold text-forest transition-colors hover:bg-white"
            >
              Randevu Al
            </Link>
          </div>
        </div>
      </section>

      {/* OTURUM GÖRÜNTÜLERİ */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="eyebrow text-sage dark:text-tan">Oturum Görüntüleri</p>
          <h2 className="mt-4 font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.3rem]">
            Grup çalışmalarından kareler
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Katılımcı izniyle paylaşılan oturum fotoğrafları; tanışma daireleri, ortak ritüeller ve grup
            egzersizlerinden oluşan güçlü bir birlikte deneyimi yansıtır.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SESSION_PHOTOS.map((item) => (
              <figure
                key={item.title}
                className="overflow-hidden rounded-[22px] border border-line bg-paper dark:border-white/10 dark:bg-white/5"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1440}
                  height={1800}
                  className="h-[360px] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="p-5">
                  <p className="font-serif text-[18px] text-ink dark:text-cream">{item.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{item.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="bg-cream-deep py-14 dark:bg-[#101410] lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <h2 className="font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.3rem]">
            Gruba Katılım Süreci
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.t} className="rounded-2xl bg-paper p-6 dark:border dark:border-white/10 dark:bg-white/5">
                <span className="font-serif text-[26px] text-tan">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-serif text-[18px] text-ink dark:text-cream">{s.t}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GÜNCEL PROGRAMLAR — müşterinin afişlerindeki gerçek programlar */}
      <section className="bg-cream py-14 dark:bg-[#161a16] lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-sage dark:text-tan">Güncel Programlar</p>
              <h2 className="mt-4 font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.4rem]">
                Devam eden grup programları
              </h2>
            </div>
            <p className="max-w-md text-[14.5px] leading-relaxed text-muted">
              Her iki program da 8 haftalık ve +18 yetişkin grubudur. Kontenjanlar sınırlıdır; bilgi ve
              başvuru için WhatsApp üzerinden ulaşabilirsiniz.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {PROGRAMS.map((program) => (
              <article
                key={program.title}
                className="overflow-hidden rounded-[22px] border border-line bg-paper dark:border-white/10 dark:bg-white/5"
              >
                <Image
                  src={program.image}
                  alt={program.alt}
                  width={1080}
                  height={1350}
                  className="h-[380px] w-full object-cover object-top"
                  loading="lazy"
                />
                <div className="p-6">
                  <p className="eyebrow text-tan">{program.kind}</p>
                  <h3 className="mt-3 font-serif text-[1.5rem] leading-tight text-ink dark:text-cream">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{program.desc}</p>
                  <dl className="mt-5 grid gap-2.5 text-[14px]">
                    {program.details.map((d) => (
                      <div key={d.k} className="flex gap-3">
                        <dt className="w-20 shrink-0 text-muted">{d.k}</dt>
                        <dd className="font-medium text-ink dark:text-cream">{d.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={settings.whatsapp_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-forest px-6 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-forest-deep dark:bg-tan dark:text-forest"
                    >
                      Bilgi / Başvuru
                    </a>
                    <Link
                      href="/randevu"
                      className="rounded-full border border-forest px-6 py-3 text-[13.5px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:border-tan dark:text-tan"
                    >
                      Randevu Al
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ETKİNLİKLERDEN — kültür kurumlarıyla yürütülen grup çalışmaları (/atolyeler'den taşındı) */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="eyebrow text-sage dark:text-tan">Etkinliklerden</p>
          <h2 className="mt-4 font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.3rem]">
            Düzenlenen grup çalışmaları ve etkinlikler
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Kültür kurumlarıyla yürütülen grup çalışmaları ve atölyelerden seçilmiş görseller.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {EVENTS.map((item) => (
              <figure
                key={item.title}
                className="overflow-hidden rounded-[22px] border border-line bg-paper dark:border-white/10 dark:bg-white/5"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1080}
                  height={1350}
                  className="h-[360px] w-full object-cover object-top"
                  loading="lazy"
                />
                <figcaption className="p-5">
                  <p className="font-serif text-[18px] text-ink dark:text-cream">{item.title}</p>
                  <p className="mt-1 text-[13px] text-muted">{item.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM AKIŞI */}
      <section className="bg-cream-deep py-14 dark:bg-[#101410] lg:py-20">
        <div className="mx-auto grid max-w-[1240px] items-start gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-sage dark:text-tan">Program Akışı</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-tight text-ink dark:text-cream sm:text-[2.3rem]">
              8 hafta, adım adım
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Program; ilişki örüntülerini anlamaktan sağlıklı sınırlar koymaya, duygusal regülasyondan
              bilinçli partner seçimine uzanan bir akış izler.
            </p>
            <div className="mt-6 overflow-hidden rounded-[22px] border border-line dark:border-white/10">
              <Image
                src="/images/grup/program-akisi.jpg"
                alt="8 haftalık grup terapisi program akışı görseli"
                width={1080}
                height={1350}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <ol className="space-y-3 lg:col-span-7">
            {PROGRAM_FLOW.map((step, i) => (
              <li
                key={step.t}
                className="flex gap-4 rounded-2xl border border-line bg-paper px-5 py-4 dark:border-white/10 dark:bg-white/5"
              >
                <span className="font-serif text-[22px] leading-none text-tan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-ink dark:text-cream">{step.t}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">{step.d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SSS */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[900px] px-5 sm:px-8">
          <h2 className="font-serif text-[2rem] text-ink dark:text-cream sm:text-[2.3rem]">
            Grup Terapileri Hakkında Sık Sorulanlar
          </h2>
          <div className="mt-8 space-y-3">
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
          <div className="mt-10 text-center">
            <Link
              href="/sss"
              className="border-b border-forest pb-1 text-[14.5px] font-semibold text-forest dark:border-tan dark:text-tan"
            >
              Tüm sorular için SSS sayfası →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
