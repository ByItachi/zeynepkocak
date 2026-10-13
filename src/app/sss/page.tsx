import Link from "next/link";
import Image from "next/image";
import { getAllSettings } from "@/lib/settings";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Sıkça Sorulan Sorular | Zeynep Koçak",
  description:
    "Terapi süreci, seans süreleri, online görüşme, grup çalışmaları, randevu ve gizlilik hakkında merak edilen soruların yanıtları.",
};

const FAQ = [
  {
    q: "Seanslar ne kadar sürüyor?",
    a: "Bireysel görüşmeler yaklaşık 50 dakika, çift ve grup çalışmalarının süresi ise içeriğine göre değişir. Detaylar ilk görüşmede netleştirilir.",
  },
  {
    q: "Online görüşme nasıl gerçekleşiyor?",
    a: "Güvenli bir video konferans platformu üzerinden, yüz yüze görüşmelerle aynı gizlilik ilkeleriyle yürütülür. Dünyanın her yerinden katılabilirsiniz.",
  },
  {
    q: "Grup terapilerine nasıl katılabilirim?",
    a: "Güncel grup programları dönemsel olarak duyurulur. Öncelikle ön görüşme yapılır; uygunluk birlikte değerlendirilir.",
  },
  {
    q: "Randevu iptali var mı?",
    a: "Evet. Randevu saatinden önce haber verildiğinde yeni bir zaman planlanır. Ayrıntılar randevu onay mesajında yer alır.",
  },
  {
    q: "Ücretlendirme hakkında bilgi alabilir miyim?",
    a: "Ücret bilgileri ve ödeme seçenekleri için lütfen doğrudan iletişime geçiniz; güncel bilgi tarafınıza iletilir.",
  },
  {
    q: "Hangi durumlarda destek almalıyım?",
    a: "Kaygı, stres, tükenmişlik, ilişki güçlükleri, yaşam geçişleri, özgüven sorunları veya kendinizi daha iyi tanımak istediğinizde başvurabilirsiniz.",
  },
  {
    q: "Terapiye nasıl başlanır?",
    a: "Randevu formunu doldurarak veya iletişim kanallarından biriyle ulaşarak başlayabilirsiniz. İlk görüşme tanışma ve beklentilerin konuşulması için ayrılmıştır.",
  },
  {
    q: "Atölyelere katılım için ön koşul var mı?",
    a: "Atölyelerin içeriğine göre farklı katılım koşulları olabilir. Her atölye duyurusunda açıkça belirtilir.",
  },
  {
    q: "Görüşmeler gizli mi kalıyor?",
    a: "Evet. Tüm görüşme içerikleri ve kişisel bilgiler, mesleki etik kuralları ve KVKK kapsamında korunur; üçüncü kişilerle paylaşılmaz.",
  },
];

export default async function SssPage() {
  const settings = await getAllSettings();

  return (
    <div>
      <PageHero
        eyebrow="Sıkça Sorulan Sorular"
        title="Sıkça Sorulan Sorular"
        lead="Merak ettiğiniz soruların yanıtları burada bulunabilir."
        quote="“Sormak, iyileşmenin sessiz adımıdır.”"
        breadcrumb={[{ label: "Anasayfa", href: "/" }, { label: "Sıkça Sorulan Sorular" }]}
      />

      {/* Sorular — düz liste */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[860px] px-5 sm:px-8">
          <div className="space-y-3">
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

      {/* Görsel + el yazısı alıntı bandı */}
      <section className="pb-6">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[22px]">
            <Image
              src="/images/grup/oturum-mum.jpg"
              alt="Sıcak ışıkta sakin bir ortam — mumlar ve bitkiler"
              width={1600}
              height={700}
              className="h-[280px] w-full object-cover sm:h-[340px]"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/55 to-transparent" />
            <div className="absolute inset-0 flex items-center px-7 sm:px-12">
              <p className="hand max-w-[520px] text-[26px] leading-snug text-tan sm:text-[32px]">
                “Sorularınız, doğru adım atmanız için bize yol gösterir.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-deep py-14 dark:bg-[#101410] lg:py-16">
        <div className="mx-auto max-w-[860px] px-5 text-center sm:px-8">
          <h2 className="font-serif text-[1.8rem] text-ink dark:text-cream">
            Aradığınız yanıtı bulamadınız mı?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted">
            Sorularınız için her zaman iletişime geçebilirsiniz. Size en kısa sürede dönüş yapılır.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/iletisim"
              className="rounded-full bg-forest px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-forest-deep dark:bg-tan dark:text-forest"
            >
              İletişim Formu
            </Link>
            <a
              href={settings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-forest px-7 py-3.5 text-[14.5px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:border-tan dark:text-tan"
            >
              WhatsApp&apos;tan Yaz
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
