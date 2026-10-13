import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "KVKK Aydınlatma Metni | Zeynep Koçak",
  description: "Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca aydınlatma metni.",
};

export default function KVKK() {
  return (
    <div>
      <PageHero
        eyebrow="KVKK"
        title="KVKK Aydınlatma Metni"
        lead="Kişisel verileriniz bizim için değerlidir."
        quote="“Gizlilik, güvenin temelidir.”"
        breadcrumb={[{ label: "Anasayfa", href: "/" }, { label: "KVKK" }]}
      />

      <section className="py-14 lg:py-16">
        <div className="mx-auto max-w-[860px] px-5 sm:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-[1.5rem] text-ink dark:text-cream">1. Veri Sorumlusu</h2>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">
                Zeynep Koçak (Uzm. Psikolog), Bağdat Caddesi, İstanbul
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[1.5rem] text-ink dark:text-cream">
                2. Kişisel Verilerin Kategorileri
              </h2>
              <ul className="mt-2.5 space-y-1.5 text-[15.5px] leading-relaxed text-muted">
                <li>• Kimlik bilgileri (ad, soyadı)</li>
                <li>• İletişim bilgileri (e-posta, telefon)</li>
                <li>• Sağlık bilgileri (terapiye ilişkin)</li>
                <li>• Demografik bilgiler</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-[1.5rem] text-ink dark:text-cream">
                3. Verilerin İşlenme Amacı
              </h2>
              <ul className="mt-2.5 space-y-1.5 text-[15.5px] leading-relaxed text-muted">
                <li>• Psikolojik danışmanlık hizmetinin sağlanması</li>
                <li>• Randevu yönetimi</li>
                <li>• Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>• Hizmet kalitesinin iyileştirilmesi</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-[1.5rem] text-ink dark:text-cream">
                4. Verilerin Paylaşılması
              </h2>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">
                Kişisel veriler, yasal zorunluluk olmadıkça üçüncü taraflarla paylaşılmaz. Hizmet
                sağlayıcılarla (e-posta, hosting vb.) paylaşım yapılabilir.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[1.5rem] text-ink dark:text-cream">
                5. Verilerin Saklanma Süresi
              </h2>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">
                Kişisel veriler, işlenme amacı sona erene kadar saklanır. Yasal zorunluluklar
                gereğince daha uzun süre saklanabilir.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[1.5rem] text-ink dark:text-cream">6. Haklarınız</h2>
              <ul className="mt-2.5 space-y-1.5 text-[15.5px] leading-relaxed text-muted">
                <li>• Kişisel verilerinize erişim hakkı</li>
                <li>• Kişisel verilerinizi düzeltme hakkı</li>
                <li>• Kişisel verilerinizi silme hakkı</li>
                <li>• Veri işlemeye itiraz etme hakkı</li>
                <li>• Veri taşınabilirliği hakkı</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-[1.5rem] text-ink dark:text-cream">
                7. Haklarınızı Kullanma
              </h2>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">
                Haklarınızı kullanmak için lütfen iletişime geçiniz. Talebiniz, makul bir süre içinde
                karşılanacaktır.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[1.5rem] text-ink dark:text-cream">8. Gizlilik</h2>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">
                Terapiye ilişkin tüm bilgiler tamamen gizli tutulur. Yasal zorunluluk olmadıkça hiçbir
                bilgi paylaşılmaz.
              </p>
            </div>
          </div>

          {/* İlgili Dokümanlar */}
          <div className="mt-12 rounded-[22px] border border-line bg-cream p-7 dark:border-white/10 dark:bg-white/5">
            <h2 className="font-serif text-[1.4rem] text-ink dark:text-cream">İlgili Dokümanlar</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/gizlilik-politikasi"
                className="rounded-full border border-forest px-6 py-2.5 text-[13.5px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:border-tan dark:text-tan"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/cerez-politikasi"
                className="rounded-full border border-forest px-6 py-2.5 text-[13.5px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:border-tan dark:text-tan"
              >
                Çerez Politikası
              </Link>
              <Link
                href="/iletisim"
                className="rounded-full bg-forest px-6 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-forest-deep dark:bg-tan dark:text-forest"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
