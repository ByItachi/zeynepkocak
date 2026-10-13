import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Gizlilik ve KVKK | Zeynep Koçak",
  description: "Kişisel verilerinizin korunması, gizlilik politikası ve çerez kullanımı hakkında bilgilendirme.",
};

const DOCS = [
  { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
];

export default function GizlilikPolitikasi() {
  return (
    <div>
      <PageHero
        eyebrow="Gizlilik ve KVKK"
        title="Gizlilik ve KVKK"
        lead="Kişisel verileriniz bizim için değerlidir."
        quote="“Güven, ilişkinin temelidir.”"
        breadcrumb={[{ label: "Anasayfa", href: "/" }, { label: "Gizlilik ve KVKK" }]}
      />

      {/* Veri Güvenliği */}
      <section className="py-14 lg:py-16">
        <div className="mx-auto max-w-[860px] px-5 sm:px-8">
          <h2 className="font-serif text-[1.8rem] text-ink dark:text-cream sm:text-[2rem]">
            Veri Güvenliği
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
            Zeynep Koçak gizliliğinize saygı duyar ve kişisel verilerinizin korunmasını taahhüt eder.
            Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında,
            yalnızca hizmetlerin sunulması ve iletişim süreçlerinin yürütülmesi amacıyla işlenmektedir.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="font-serif text-[1.25rem] text-ink dark:text-cream">Toplanan Veriler</h3>
              <ul className="mt-2.5 space-y-1.5 text-[15px] leading-relaxed text-muted">
                <li>• Ad, e-posta adresi, telefon numarası</li>
                <li>• İletişim ve randevu formu aracılığıyla sağlanan bilgiler</li>
                <li>• Web sitesi kullanım verileri (IP adresi, tarayıcı türü vb.)</li>
                <li>• Çerezler aracılığıyla toplanan veriler</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-[1.25rem] text-ink dark:text-cream">Verilerin Kullanımı</h3>
              <ul className="mt-2.5 space-y-1.5 text-[15px] leading-relaxed text-muted">
                <li>• İletişim taleplerine yanıt vermek</li>
                <li>• Randevu yönetimi</li>
                <li>• Web sitesi performansının iyileştirilmesi</li>
                <li>• Yasal yükümlülüklerin yerine getirilmesi</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-[1.25rem] text-ink dark:text-cream">Paylaşım ve Saklama</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                Kişisel verileriniz, yasal zorunluluk olmadıkça üçüncü taraflarla paylaşılmaz. Veriler,
                işlenme amacı sona erene kadar; yasal zorunluluklar gereğince daha uzun süre
                saklanabilir.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[1.25rem] text-ink dark:text-cream">Haklarınız</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                KVKK uyarınca kişisel verilerinize erişim, düzeltme, silme; veri işlemeye itiraz etme
                ve veri taşınabilirliği haklarına sahipsiniz. Haklarınızı kullanmak için lütfen
                iletişime geçiniz; talebiniz makul bir süre içinde karşılanacaktır.
              </p>
            </div>
          </div>

          {/* İlgili Dokümanlar */}
          <h2 className="mt-12 font-serif text-[1.8rem] text-ink dark:text-cream sm:text-[2rem]">
            İlgili Dokümanlar
          </h2>
          <div className="mt-5 space-y-3">
            {DOCS.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="flex items-center gap-4 rounded-2xl border border-line bg-paper px-5 py-4 transition-colors hover:border-tan dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream text-forest dark:bg-white/10 dark:text-tan">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5M9 13h6M9 17h4" />
                  </svg>
                </span>
                <span className="text-[15.5px] font-medium text-ink dark:text-cream">{d.label}</span>
                <span className="ml-auto text-tan">→</span>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-[14.5px] italic text-muted">
            Detaylı bilgi için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </section>
    </div>
  );
}
