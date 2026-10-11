import Link from "next/link";
import Image from "next/image";
import { getAllSettings } from "@/lib/settings";
import { prisma } from "@/lib/prisma";
import { INSTAGRAM_GALLERY } from "@/lib/instagram-gallery";
import InstagramGallery from "@/components/InstagramGallery";
import VideoSection from "@/components/VideoSection";
import { THERAPY_VIDEOS } from "@/lib/videos";
import PublicEditorSections from "@/components/PublicEditorSections";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getAllSettings();
  const latestPosts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const services = [
    {
      title: "Yetişkinlerle Çalışma",
      description: "Kaygı, tükenmişlik, ilişki güçlükleri, özgüven ve yaşamsal geçiş dönemlerinde destek.",
      href: "/yetiskinlerle-calisma",
    },
    {
      title: "Ergenlerle Çalışma",
      description: "Ergenlik dönemine özgü kimlik, aile ve okul kaynaklı sorunlarda birebir çalışma.",
      href: "/ergenlerle-calisma",
    },
    {
      title: "Çiftlerle Çalışma",
      description: "İletişim sorunları, güven, çatışma çözümü ve ilişkiyi güçlendirme odaklı görüşmeler.",
      href: "/ciftlerle-calisma",
    },
    {
      title: "Online Görüşmeler",
      description: "Dünyanın her yerinden güvenli ve gizli online seans imkânı.",
      href: "/online-gorusmeler",
    },
    {
      title: "Psikodrama & Grup Atölyeleri",
      description: "Co-Psychodramatist olarak psikodrama temelli grup çalışmaları ve atölyeler.",
      href: "/psikodrama",
    },
    {
      title: "Expat Psychologist",
      description: "Türkiye'de yaşayan yabancı danışanlar için İngilizce psikolojik destek.",
      href: "/expat-psychologist",
    },
    {
      title: "Transformational Breath®",
      description: "Beden farkındalığı ve nefes çalışması temelli grup ve bireysel seanslar.",
      href: "/transformational-breath",
    },
  ];

  return (
    <div>
      {/* BÖLÜM 1: HERO */}
      <section className="bg-[#faf7f2] dark:bg-[#1a1d1a] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Sol: Metin */}
            <div className="md:col-span-7">
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#8b9a7a] mb-6 font-medium">
                <span className="w-10 h-px bg-[#c9a87c]" />
                Uzm. Psk. Zeynep Koçak
              </p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 text-[#2f332e] dark:text-[#e8e4dc] leading-[1.08]">
                Kendini anlamak,
                <br />
                <span className="italic text-[#5e6b52] dark:text-[#8b9a7a]">değişimin</span> başlangıcıdır.
              </h1>
              <p className="text-lg text-[#5b5f58] dark:text-[#9a9e95] mb-10 leading-relaxed max-w-xl">
                Yetişkinler, ergenler ve çiftlerle psikolojik danışmanlık; psikodrama ve beden
                farkındalığı odaklı grup atölyeleri. İstanbul&apos;da yüz yüze ya da dünyanın
                her yerinden online.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/randevu"
                  className="inline-block bg-[#2f332e] dark:bg-[#e8e4dc] text-[#faf7f2] dark:text-[#1a1d1a] px-8 py-3.5 rounded hover:opacity-90 transition-opacity font-medium"
                >
                  Randevu Talebi Oluştur
                </Link>
                <Link
                  href="/calisma-alanlarim"
                  className="inline-block border border-[#2f332e]/30 dark:border-[#e8e4dc]/30 text-[#2f332e] dark:text-[#e8e4dc] px-8 py-3.5 rounded hover:border-[#c9a87c] hover:text-[#5e6b52] dark:hover:text-[#c9a87c] transition-colors font-medium"
                >
                  Çalışma Alanlarımı Keşfet
                </Link>
                <Link
                  href="/psikodrama"
                  className="inline-flex items-center gap-2 text-[#5e6b52] dark:text-[#8b9a7a] font-medium hover:text-[#c9a87c] transition-colors"
                >
                  Grup Terapilerini İncele
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Sağ: Portre */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-72 h-96 md:w-80 md:h-[26rem] lg:w-[22rem] lg:h-[30rem]">
                <Image
                  src={settings.hero_image_url}
                  alt={settings.hero_heading}
                  fill
                  sizes="(max-width: 768px) 288px, 384px"
                  className="object-cover rounded-md shadow-xl"
                  priority
                />
                <div className="absolute -bottom-6 -left-6 bg-[#c9a87c] text-white px-6 py-4 rounded-md shadow-lg max-w-[220px]">
                  <p className="text-sm font-medium leading-snug">
                    Psikolojik danışmanlık ve grup deneyimleri — güvenli alan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BÖLÜM 2: UZMANLIK ÖZETİ */}
      <section className="bg-[#f1ece2] dark:bg-[#1e211e] py-12 border-y border-[#e2dccd] dark:border-[#2f332e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <p className="text-sm text-[#5b5f58] dark:text-[#9a9e95] uppercase tracking-wide mb-1">Konum</p>
              <p className="font-serif text-lg text-[#2f332e] dark:text-[#e8e4dc]">Bağdat Caddesi, İstanbul</p>
            </div>
            <div>
              <p className="text-sm text-[#5b5f58] dark:text-[#9a9e95] uppercase tracking-wide mb-1">Çalışma Şekli</p>
              <p className="font-serif text-lg text-[#2f332e] dark:text-[#e8e4dc]">Yüz yüze & Online</p>
            </div>
            <div>
              <p className="text-sm text-[#5b5f58] dark:text-[#9a9e95] uppercase tracking-wide mb-1">Hizmetler</p>
              <p className="font-serif text-lg text-[#2f332e] dark:text-[#e8e4dc]">Yetişkin, Ergen, Çift</p>
            </div>
            <div>
              <p className="text-sm text-[#5b5f58] dark:text-[#9a9e95] uppercase tracking-wide mb-1">Grup Çalışmaları</p>
              <p className="font-serif text-lg text-[#2f332e] dark:text-[#e8e4dc]">Psikodrama & Atölyeler</p>
            </div>
          </div>
        </div>
      </section>

      {/* BÖLÜM 3: HAKKIMDA */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <Image
                src="/images/grup-calismasi-1.jpg"
                alt="Zeynep Koçak — grup çalışması"
                width={1024}
                height={768}
                className="rounded-md object-cover w-full shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#2f332e] text-[#faf7f2] px-5 py-3 text-sm rounded-md hidden sm:block">
                Bağdat Caddesi, İstanbul
              </div>
            </div>
            <div>
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#8b9a7a] mb-6 font-medium">
                <span className="w-10 h-px bg-[#c9a87c]" />
                Hakkımda
              </p>
              <h2 className="font-serif text-3xl md:text-4xl mb-8 text-[#2f332e] dark:text-[#e8e4dc] leading-tight">
                Her deneyimin kendine özgü bir hikâyesi vardır.
              </h2>
              <div className="prose prose-lg max-w-none text-[#5b5f58] dark:text-[#9a9e95]">
                <p className="mb-6 leading-relaxed">{settings.about_text}</p>
              </div>
              <Link
                href="/hakkimda"
                className="inline-flex items-center gap-2 text-[#5e6b52] dark:text-[#8b9a7a] font-medium hover:text-[#c9a87c] transition-colors mt-4"
              >
                Detaylı profil
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BÖLÜM 4: ÇALIŞMA ALANLARI */}
      <section className="bg-[#f1ece2] dark:bg-[#1e211e] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-16 text-[#2f332e] dark:text-[#e8e4dc] text-center">
            Çalışma Alanlarım
          </h2>
          <div className="divide-y divide-[#2f332e]/10 dark:divide-[#e8e4dc]/10 border-y border-[#2f332e]/10 dark:border-[#e8e4dc]/10">
            {services.map((service, i) => (
              <Link
                key={service.href}
                href={service.href}
                className="group grid md:grid-cols-12 gap-4 items-center py-8 transition-colors hover:bg-white/50 dark:hover:bg-[#222522]/50 px-2 rounded"
              >
                <span className="md:col-span-1 font-serif text-2xl text-[#c9a87c]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="md:col-span-4 font-serif text-xl md:text-2xl text-[#2f332e] dark:text-[#e8e4dc] group-hover:text-[#5e6b52] dark:group-hover:text-[#8b9a7a] transition-colors">
                  {service.title}
                </h3>
                <p className="md:col-span-5 text-sm md:text-base text-[#5b5f58] dark:text-[#9a9e95] leading-relaxed">
                  {service.description}
                </p>
                <span className="md:col-span-2 text-right text-[#5e6b52] dark:text-[#8b9a7a] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Detay →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BÖLÜM 5: PSIKODRAMA & GRUP ATÖLYELERI */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-[#2f332e] dark:text-[#e8e4dc]">
            Psikodrama & Grup Atölyeleri
          </h2>
          <p className="text-lg text-[#5b5f58] dark:text-[#9a9e95] mb-6 leading-relaxed">
            Co-Psychodramatist olarak psikodrama temelli grup atölyeleri düzenliyorum. Bu atölyeler; bireylerin kendini keşfetmesine, grup içinde deneyim paylaşmasına ve rol oynama teknikleriyle duygusal farkındalık kazanmasına alan açıyor.
          </p>
          <p className="text-lg text-[#5b5f58] dark:text-[#9a9e95] mb-8 leading-relaxed">
            Yeni atölye duyuruları ve tarihleri için Instagram hesabımı takip edebilir veya WhatsApp üzerinden bilgi alabilirsiniz.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/atolyeler"
              className="inline-block bg-[#5e6b52] text-white px-8 py-3 rounded hover:bg-[#4c5742] transition-colors font-medium"
            >
              Atölyeler Hakkında
            </Link>
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-[#5e6b52] text-[#5e6b52] px-8 py-3 rounded hover:bg-[#f1ece2] dark:bg-[#1e211e] transition-colors font-medium"
            >
              Instagram'da Takip Et
            </a>
          </div>
        </div>
      </section>

      {/* BÖLÜM 6: EXPAT PSYCHOLOGY */}
      <section className="bg-[#f1ece2] dark:bg-[#1e211e] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-[#2f332e] dark:text-[#e8e4dc]">
            Expat Psychologist
          </h2>
          <p className="text-lg text-[#5b5f58] dark:text-[#9a9e95] mb-6 leading-relaxed">
            Türkiye'de yaşayan yabancı danışanlar için İngilizce psikolojik destek veriyorum. Göç, kültürler arası yaşam, aidiyet ve değişim gibi konularda yüz yüze (Bağdat Cad.) veya online olarak çalışıyorum.
          </p>
          <p className="text-lg text-[#5b5f58] dark:text-[#9a9e95] mb-8 leading-relaxed italic">
            For expats living in Turkey, I offer therapy sessions in English — face to face in Bağdat Cad. or online, for individuals, teens and couples.
          </p>
          <Link
            href="/expat-psychologist"
            className="inline-block bg-[#5e6b52] text-white px-8 py-3 rounded hover:bg-[#4c5742] transition-colors font-medium"
          >
            Daha Fazla Bilgi
          </Link>
        </div>
      </section>

      {/* BÖLÜM 7: TRANSFORMATIONAL BREATH® */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-[#2f332e] dark:text-[#e8e4dc]">
            Transformational Breath®
          </h2>
          <p className="text-lg text-[#5b5f58] dark:text-[#9a9e95] mb-6 leading-relaxed">
            Transformational Breath® beden farkındalığı ve nefes çalışması temelli bir yaklaşımdır. Grup ve bireysel seanslar aracılığıyla duygusal farkındalık, stres yönetimi ve kişisel gelişim destekliyorum.
          </p>
          <p className="text-lg text-[#5b5f58] dark:text-[#9a9e95] mb-8 leading-relaxed">
            Katılım öncesinde bilinmesi gerekenler ve güvenlik hakkında detaylı bilgi için lütfen iletişime geçiniz.
          </p>
          <Link
            href="/transformational-breath"
            className="inline-block bg-[#5e6b52] text-white px-8 py-3 rounded hover:bg-[#4c5742] transition-colors font-medium"
          >
            Daha Fazla Bilgi
          </Link>
        </div>
      </section>

      {/* BÖLÜM 8: SIK SORULAN SORULAR */}
      <section className="bg-[#f1ece2] dark:bg-[#1e211e] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-[#2f332e] dark:text-[#e8e4dc] text-center">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-4">
            {[
              { q: "İlk görüşme nasıl başlar?", a: "İlk görüşmede tanışma, beklentileriniz ve ihtiyaçlarınız hakkında konuşulur. Bu görüşme karşılıklı bir değerlendirme sürecidir." },
              { q: "Seanslar ne kadar sürer?", a: "Bireysel seanslar genellikle 50 dakika, çift seansları 75–90 dakika sürer." },
              { q: "Online görüşme nasıl yapılır?", a: "Güvenli bir video konferans platformu üzerinden, dünyanın her yerinden online seans yapılabilir." },
              { q: "Hangi durumlarda başvurmalıyım?", a: "Kaygı, ilişki güçlükleri, tükenmişlik, yaşam geçişleri, özgüven sorunları veya kendinizi daha iyi tanımak istediğinizde başvurabilirsiniz." },
              { q: "Bilgilerim gizli kalır mı?", a: "Evet. Tüm görüşme içerikleri ve kişisel bilgiler gizlilik ilkesi ve KVKK kapsamında korunur." },
            ].map((faq, i) => (
              <details key={i} className="group bg-white dark:bg-[#222522] border border-[#e2dccd] dark:border-[#2f332e] rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-medium text-[#2f332e] dark:text-[#e8e4dc] list-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-[#5e6b52] transition-transform group-open:rotate-180 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-6 pb-4 text-sm text-[#5b5f58] dark:text-[#9a9e95] leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <VideoSection
        id="grup-videolari"
        eyebrow="Grup Çalışmalarından Kesitler"
        title="Süreci Yakından Hissedin"
        description="Psikodrama ve grup atölyelerinden kısa hareketli kesitler — süreci yakından tanımak için."
        clips={THERAPY_VIDEOS}
      />

      {/* BÖLÜM 9: INSTAGRAM GALERİSİ */}
      <section className="bg-[#f1ece2] dark:bg-[#1e211e] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-[#2f332e] dark:text-[#e8e4dc]">Instagram&apos;dan</h2>
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5e6b52] font-medium hover:underline"
            >
              @zeynepleyolarkadasi →
            </a>
          </div>
          <InstagramGallery posts={INSTAGRAM_GALLERY} instagramUrl={settings.instagram_url} />
        </div>
      </section>

      {/* BÖLÜM 9: SON YAZILAR */}
      {latestPosts.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl mb-12 text-[#2f332e] dark:text-[#e8e4dc]">Yazılar</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-[#222522] border border-[#e2dccd] dark:border-[#2f332e] rounded-lg p-6 hover:border-[#8b9a7a] hover:shadow-md transition-all h-full flex flex-col">
                    <p className="text-xs text-[#5b5f58] dark:text-[#9a9e95] mb-3 uppercase tracking-wide">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("tr-TR") : ""}
                    </p>
                    <h3 className="font-serif text-xl mb-3 text-[#2f332e] dark:text-[#e8e4dc] group-hover:text-[#5e6b52] flex-grow">
                      {post.title}
                    </h3>
                    <p className="text-[#5b5f58] dark:text-[#9a9e95] text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-[#5e6b52] font-medium text-sm">
                      Oku →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-block border-2 border-[#5e6b52] text-[#5e6b52] px-8 py-3 rounded hover:bg-[#f1ece2] dark:bg-[#1e211e] transition-colors font-medium"
              >
                Tüm Yazıları Gör
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Editor ile eklenen bölümlerin yayınlandığı alan */}
      <PublicEditorSections pageSlug="home" />

      {/* BÖLÜM 10: İLETİŞİM CTA */}
      <section className="bg-[#5e6b52] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            İlk adım, ihtiyacınızı konuşmak olabilir.
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Sorularınız, endişeleriniz veya merak ettikleriniz için lütfen iletişime geçiniz. Gizlilik ve güven, çalışmamızın temelini oluşturur.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/randevu"
              className="inline-block bg-white dark:bg-[#222522] text-[#5e6b52] px-8 py-3 rounded hover:bg-[#f1ece2] dark:bg-[#1e211e] transition-colors font-medium"
            >
              Randevu Alın
            </Link>
            <a
              href={settings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded hover:bg-[#4c5742] transition-colors font-medium"
            >
              WhatsApp'tan Yaz
            </a>
            <Link
              href="/iletisim"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded hover:bg-[#4c5742] transition-colors font-medium"
            >
              İletişim Formu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
