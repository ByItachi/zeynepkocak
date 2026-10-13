import { getAllSettings } from "@/lib/settings";
import PageHero from "@/components/PageHero";
import AppointmentForm from "./_AppointmentForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Randevu Alın | Uzm. Psk. Zeynep Koçak",
  description:
    "Yüz yüze veya online görüşme için randevu talebi oluşturun. İstanbul, Bağdat Caddesi.",
};

const STEPS = [
  {
    t: "Formu Doldurun",
    d: "Randevu talep formunu eksiksiz doldurun; ihtiyaçlarınızı kısaca belirtin.",
  },
  {
    t: "Ön Görüşme",
    d: "15-20 dakikalık ücretsiz online ön görüşmede beklentilerinizi dinleriz.",
  },
  {
    t: "Uygun Zaman",
    d: "Size en uygun gün ve saat birlikte belirlenir; onay bilgisi paylaşılır.",
  },
  {
    t: "Görüşme",
    d: "Yüz yüze (Bağdat Caddesi) veya online olarak ilk seans gerçekleştirilir.",
  },
];

export default async function RandevuPage() {
  const settings = await getAllSettings();

  return (
    <div>
      <PageHero
        eyebrow="Randevu"
        title="Randevu Al"
        lead="Kendine yeni bir adım at."
        quote="“İyi hissetmek bir lüks değil, bir ihtiyaçtır.”"
        breadcrumb={[{ label: "Anasayfa", href: "/" }, { label: "Randevu Al" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
          {/* Sol: form */}
          <div className="lg:col-span-7">
            <div className="rounded-[22px] border border-line bg-paper p-7 shadow-[0_20px_50px_-40px_rgba(34,57,47,0.6)] sm:p-9 dark:border-white/10 dark:bg-white/5">
              <h2 className="font-serif text-[1.7rem] text-ink dark:text-cream">Randevu Talep Formu</h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                Formu doldurun; talebiniz değerlendirildikten sonra size en kısa sürede dönüş yapılır.
                İlk online ön görüşme (15-20 dakika) ücretsizdir.
              </p>
              <div className="mt-7">
                <AppointmentForm whatsappUrl={settings.whatsapp_url} />
              </div>
            </div>
          </div>

          {/* Sağ: süreç + not */}
          <div className="lg:col-span-5">
            <div className="rounded-[22px] border border-line bg-cream p-7 dark:border-white/10 dark:bg-white/5">
              <p className="eyebrow text-sage dark:text-tan">Süreç</p>
              <h2 className="mt-3 font-serif text-[1.7rem] text-ink dark:text-cream">Randevu Süreci</h2>

              <ol className="mt-6 space-y-5">
                {STEPS.map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-[14px] text-white dark:bg-tan dark:text-forest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[15.5px] font-semibold text-ink dark:text-cream">
                        {s.t}
                      </span>
                      <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 rounded-[22px] border border-line bg-paper p-7 dark:border-white/10 dark:bg-white/5">
              <p className="hand text-[25px] leading-snug text-sage dark:text-tan">
                “Kendine zaman ayır, çünkü sen kıymetlisin.”
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                Görüşmeler İstanbul Bağdat Caddesi&apos;nde yüz yüze veya dünyanın her yerinden online
                olarak yapılabilir.
              </p>
              <dl className="mt-5 space-y-2.5 text-[14px]">
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-muted">Konum</dt>
                  <dd className="font-medium text-ink dark:text-cream">{settings.location}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-muted">Şekil</dt>
                  <dd className="font-medium text-ink dark:text-cream">Yüz yüze &amp; Online</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-muted">İptal</dt>
                  <dd className="font-medium text-ink dark:text-cream">
                    Saatinden önce haber verildiğinde planlanır
                  </dd>
                </div>
              </dl>
              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block w-full rounded-full bg-forest px-6 py-3.5 text-center text-[14px] font-semibold text-white transition-colors hover:bg-forest-deep dark:bg-tan dark:text-forest"
              >
                WhatsApp&apos;tan Hemen Yaz
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
