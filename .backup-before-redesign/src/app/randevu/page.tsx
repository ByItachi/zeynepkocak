import Link from "next/link";
import { getAllSettings } from "@/lib/settings";
import AppointmentForm from "./_AppointmentForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Randevu Alın | Uzm. Psk. Zeynep Koçak",
  description:
    "Yüz yüze veya online görüşme için randevu talebi oluşturun. İstanbul, Bağdat Caddesi.",
};

export default async function RandevuPage() {
  const settings = await getAllSettings();

  return (
    <div>
      {/* Giriş */}
      <section className="bg-gradient-to-b from-[#faf7f2] to-[#f1ece2] dark:from-[#1a1d1a] dark:to-[#1e211e] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#5e6b52] dark:text-[#8b9a7a] mb-4 font-medium">
              Randevu & Ön Görüşme
            </p>
            <h1 className="font-serif text-3xl md:text-5xl text-[#2f332e] dark:text-[#e8e4dc] mb-6">
              Birlikte çalışmaya nasıl başlarız?
            </h1>
            <p className="text-lg text-[#5b5f58] dark:text-[#9a9e95] leading-relaxed">
              Terapi sürecine başlamadan önce birbirinizi tanımak çok kıymetlidir. Bu nedenle ilk
              adım olarak <strong className="text-[#2f332e] dark:text-[#e8e4dc]">15–20 dakikalık online ön görüşme</strong>{" "}
              öneriyorum. Bu görüşmede ihtiyaçlarınızı dinler, birlikte çalışabileceğimizi birlikte
              değerlendiririz. Görüşmeler İstanbul&apos;da Bağdat Caddesi&apos;nde yüz yüze veya dünyanın
              her yerinden online olarak yapılabilir.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#5e6b52] text-white px-8 py-3 rounded hover:bg-[#4c5742] transition-colors font-medium"
              >
                WhatsApp ile Yazın
              </a>
              <a
                href="mailto:info@zeynepkocak.com"
                className="inline-block border-2 border-[#5e6b52] text-[#5e6b52] dark:text-[#8b9a7a] dark:border-[#8b9a7a] px-8 py-3 rounded hover:bg-[#f1ece2] dark:hover:bg-[#2f332e] transition-colors font-medium"
              >
                E-posta Gönderin
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-[#222522] border border-[#e2dccd] dark:border-[#2f332e] rounded-2xl p-8 md:p-10 shadow-sm">
              <h2 className="font-serif text-2xl mb-2 text-[#2f332e] dark:text-[#e8e4dc]">
                Randevu Talebi Formu
              </h2>
              <p className="text-sm text-[#5b5f58] dark:text-[#9a9e95] mb-8">
                Formu doldurun, talebiniz değerlendirildikten sonra size en kısa sürede dönüş yapılır.
              </p>
              <AppointmentForm whatsappUrl={settings.whatsapp_url} />
            </div>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="bg-[#f1ece2] dark:bg-[#1e211e] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-12 text-[#2f332e] dark:text-[#e8e4dc] text-center">
              Sık Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Ön görüşme ücretli mi?",
                  a: "İlk online ön görüşme (15-20 dakika) ücretsizdir. Bu görüşmede ihtiyaçlarınızı dinler ve birlikte çalışmanın sizin için uygun olup olmadığını değerlendiririz.",
                },
                {
                  q: "Seanslar ne kadar sürer?",
                  a: "Bireysel seanslar yaklaşık 50 dakika, çift seansları 75-90 dakika sürer. Değerlendirme sürecine göre seans sıklığı birlikte planlanır.",
                },
                {
                  q: "Online görüşme nasıl yapılır?",
                  a: "Güvenli bir video konferans platformu üzerinden yapılır. Dünyanın her yerinden online seans alabilirsiniz.",
                },
                {
                  q: "İlk görüşmede ne konuşulur?",
                  a: "Tanışma, ihtiyaçlarınızın paylaşılması ve hedeflerin birlikte belirlenmesi. Burası sizin alanınız — aklınızdaki her şeyi konuşabilirsiniz.",
                },
                {
                  q: "Bilgilerim gizli kalır mı?",
                  a: "Evet. Görüşme içerikleri ve kişisel bilgileriniz gizlilik ilkesi ve KVKK kapsamında korunur. Detaylar için Gizlilik Politikası sayfamızı inceleyebilirsiniz.",
                },
              ].map((faq, i) => (
                <details key={i} className="group bg-white dark:bg-[#222522] border border-[#e2dccd] dark:border-[#2f332e] rounded-lg">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-medium text-[#2f332e] dark:text-[#e8e4dc] list-none">
                    {faq.q}
                    <svg className="w-5 h-5 text-[#5e6b52] transition-transform group-open:rotate-180 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-sm text-[#5b5f58] dark:text-[#9a9e95] leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
            <p className="text-center mt-10 text-sm text-[#5b5f58] dark:text-[#9a9e95]">
              Başka sorularınız mı var?{" "}
              <Link href="/iletisim" className="text-[#5e6b52] dark:text-[#8b9a7a] hover:underline font-medium">
                İletişim sayfası
              </Link>{" "}
              üzerinden bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
