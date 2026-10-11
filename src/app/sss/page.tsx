import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getAllSettings } from "@/lib/settings";

export const metadata = {
  title: "Sıkça Sorulan Sorular | Zeynep Koçak",
  description:
    "Terapi süreci, seans süreleri, online görüşme, grup çalışmaları, randevu ve gizlilik hakkında merak edilen soruların yanıtları.",
};

const FAQ_GROUPS = [
  {
    group: "Terapi Süreci",
    items: [
      {
        q: "Seanslar ne kadar sürüyor?",
        a: "Bireysel görüşmeler yaklaşık 50 dakika, çift ve grup çalışmalarının süresi ise içeriğine göre değişir. Detaylar ilk görüşmede netleştirilir.",
      },
      {
        q: "Hangi durumlarda destek almalıyım?",
        a: "Kaygı, stres, tükenmişlik, ilişki güçlükleri, yaşam geçişleri, özgüven sorunları veya kendinizi daha iyi tanımak istediğinizde başvurabilirsiniz.",
      },
      {
        q: "Terapiye nasıl başlanır?",
        a: "Randevu formunu doldurarak veya iletişim kanallarından biriyle ulaşarak başlayabilirsiniz. İlk görüşme tanışma ve beklentilerin konuşulması için ayrılmıştır.",
      },
    ],
  },
  {
    group: "Online Görüşme",
    items: [
      {
        q: "Online görüşme nasıl gerçekleşiyor?",
        a: "Güvenli bir video konferans platformu üzerinden, yüz yüze görüşmelerle aynı gizlilik ilkeleriyle yürütülür. Dünyanın her yerinden katılabilirsiniz.",
      },
      {
        q: "Online seans yüz yüze seans kadar etkili mi?",
        a: "Birçok danışan için online süreç de etkilidir. Size en uygun format, ihtiyaçlarınıza göre birlikte belirlenir.",
      },
    ],
  },
  {
    group: "Grup ve Atölyeler",
    items: [
      {
        q: "Grup terapilerine nasıl katılabilirim?",
        a: "Güncel grup programları dönemsel olarak duyurulur. Öncelikle ön görüşme yapılır; uygunluk birlikte değerlendirilir.",
      },
      {
        q: "Atölyelere katılım için ön koşul var mı?",
        a: "Atölyelerin içeriğine göre farklı katılım koşulları olabilir. Her atölye duyurusunda açıkça belirtilir.",
      },
    ],
  },
  {
    group: "Randevu ve Gizlilik",
    items: [
      {
        q: "Randevumu iptal edebilir miyim?",
        a: "Evet. Randevu saatinden önce haber verildiği takvimde yeni bir zaman planlanır. Ayrıntılar randevu onay mesajında yer alır.",
      },
      {
        q: "Görüşmeler gizli mi kalıyor?",
        a: "Evet. Tüm görüşme içerikleri ve kişisel bilgiler, mesleki etik kuralları ve KVKK kapsamında korunur; üçüncü kişilerle paylaşılmaz.",
      },
      {
        q: "Ücretlendirme hakkında bilgi alabilir miyim?",
        a: "Ücret bilgileri ve ödeme seçenekleri için lütfen doğrudan iletişime geçiniz; güncel bilgi tarafınıza iletilir.",
      },
    ],
  },
];

export default async function SssPage() {
  const settings = await getAllSettings();

  return (
    <div>
      <PageHero
        eyebrow="Sıkça Sorulan Sorular"
        title="Merak Ettiklerinizin Yanıtları Burada"
        lead="Süreç, seanslar, online görüşme, grup çalışmaları ve gizlilik hakkında en çok sorulan sorular."
        quote="“Sormak, iyileşmenin sessiz adımıdır.”"
        breadcrumb={[{ label: "Anasayfa", href: "/" }, { label: "Sıkça Sorulan Sorular" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[980px] px-5 sm:px-8">
          {FAQ_GROUPS.map((group) => (
            <div key={group.group} className="mb-12 last:mb-0">
              <h2 className="font-serif text-[1.6rem] text-ink dark:text-cream sm:text-[1.9rem]">{group.group}</h2>
              <div className="mt-5 space-y-3">
                {group.items.map((item) => (
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
          ))}
        </div>
      </section>

      <section className="bg-cream-deep py-14 dark:bg-[#101410] lg:py-20">
        <div className="mx-auto max-w-[980px] px-5 text-center sm:px-8">
          <h2 className="font-serif text-[1.9rem] text-ink dark:text-cream">Aradığınız yanıtı bulamadınız mı?</h2>
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
