export const metadata = {
  title: "KVKK Aydınlatma Metni | Zeynep Koçak",
  description: "Kişisel Verilerin Korunması Kanunu (KVKK) aydınlatma metni.",
};

export default function KVKK() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#faf7f2] to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-[#2f332e]">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-lg text-[#5b5f58] leading-relaxed">
            Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca aydınlatma metni
          </p>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none text-[#5b5f58]">
            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">1. Veri Sorumlusu</h2>
            <p className="mb-6 leading-relaxed">
              Zeynep Koçak (Uzm. Psikolog), Bağdat Caddesi, İstanbul
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">2. Kişisel Verilerin Kategorileri</h2>
            <p className="mb-4 leading-relaxed">
              Aşağıdaki kişisel veriler toplanabilir:
            </p>
            <ul className="mb-6 leading-relaxed space-y-2">
              <li>• Kimlik bilgileri (ad, soyadı)</li>
              <li>• İletişim bilgileri (e-posta, telefon)</li>
              <li>• Sağlık bilgileri (terapiye ilişkin)</li>
              <li>• Demografik bilgiler</li>
            </ul>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">3. Verilerin İşlenme Amacı</h2>
            <p className="mb-4 leading-relaxed">
              Kişisel veriler aşağıdaki amaçlarla işlenir:
            </p>
            <ul className="mb-6 leading-relaxed space-y-2">
              <li>• Psikolojik danışmanlık hizmetinin sağlanması</li>
              <li>• Randevu yönetimi</li>
              <li>• Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>• Hizmet kalitesinin iyileştirilmesi</li>
            </ul>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">4. Verilerin Paylaşılması</h2>
            <p className="mb-6 leading-relaxed">
              Kişisel veriler, yasal zorunluluk olmadıkça üçüncü taraflarla paylaşılmaz. Hizmet sağlayıcılarla (e-posta, hosting, vb.) paylaşım yapılabilir.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">5. Verilerin Saklanma Süresi</h2>
            <p className="mb-6 leading-relaxed">
              Kişisel veriler, işlenme amacı sona erene kadar saklanır. Yasal zorunluluklar gereğince daha uzun süre saklanabilir.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">6. Haklarınız</h2>
            <p className="mb-4 leading-relaxed">
              KVKK uyarınca aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="mb-6 leading-relaxed space-y-2">
              <li>• Kişisel verilerinize erişim hakkı</li>
              <li>• Kişisel verilerinizi düzeltme hakkı</li>
              <li>• Kişisel verilerinizi silme hakkı</li>
              <li>• Veri işlemeye itiraz etme hakkı</li>
              <li>• Veri taşınabilirliği hakkı</li>
            </ul>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">7. Haklarınızı Kullanma</h2>
            <p className="mb-6 leading-relaxed">
              Haklarınızı kullanmak için lütfen iletişime geçiniz. Talebiniz, makul bir süre içinde karşılanacaktır.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">8. Gizlilik</h2>
            <p className="mb-6 leading-relaxed">
              Terapiye ilişkin tüm bilgiler tamamen gizli tutulur. Yasal zorunluluk olmadıkça, hiçbir bilgi paylaşılmaz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
