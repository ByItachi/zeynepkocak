export const metadata = {
  title: "Gizlilik Politikası | Zeynep Koçak",
  description: "Zeynep Koçak web sitesinin gizlilik politikası.",
};

export default function GizlilikPolitikasi() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#faf7f2] to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-[#2f332e]">
            Gizlilik Politikası
          </h1>
          <p className="text-lg text-[#5b5f58] leading-relaxed">
            Son güncelleme: Ekim 2026
          </p>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none text-[#5b5f58]">
            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">1. Giriş</h2>
            <p className="mb-6 leading-relaxed">
              Zeynep Koçak ("biz", "bizim" veya "Şirket") gizliliğinize saygı duyar ve kişisel verilerinizin korunmasını taahhüt eder. Bu Gizlilik Politikası, web sitesi (zeynepkocak.com) ziyaretçilerinin kişisel verilerinin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">2. Toplanan Veriler</h2>
            <p className="mb-4 leading-relaxed">
              Aşağıdaki kişisel verileri toplayabiliriz:
            </p>
            <ul className="mb-6 leading-relaxed space-y-2">
              <li>• Ad, e-posta adresi, telefon numarası</li>
              <li>• İletişim formu aracılığıyla sağlanan bilgiler</li>
              <li>• Web sitesi kullanım verileri (IP adresi, tarayıcı türü, vb.)</li>
              <li>• Çerezler aracılığıyla toplanan veriler</li>
            </ul>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">3. Verilerin Kullanımı</h2>
            <p className="mb-4 leading-relaxed">
              Toplanan veriler aşağıdaki amaçlarla kullanılır:
            </p>
            <ul className="mb-6 leading-relaxed space-y-2">
              <li>• İletişim taleplarına yanıt vermek</li>
              <li>• Randevu yönetimi</li>
              <li>• Web sitesi performansını iyileştirmek</li>
              <li>• Yasal yükümlülükleri yerine getirmek</li>
            </ul>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">4. Veri Güvenliği</h2>
            <p className="mb-6 leading-relaxed">
              Kişisel verileriniz, endüstri standartlarına uygun güvenlik önlemleriyle korunur. Ancak, internet üzerinden hiçbir veri aktarımı %100 güvenli değildir.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">5. Üçüncü Taraflarla Veri Paylaşımı</h2>
            <p className="mb-6 leading-relaxed">
              Kişisel verileriniz, yasal zorunluluk olmadıkça üçüncü taraflarla paylaşılmaz. Hizmet sağlayıcılarla (e-posta, hosting, vb.) paylaşım yapılabilir.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">6. Çerezler</h2>
            <p className="mb-6 leading-relaxed">
              Web sitesi, kullanıcı deneyimini iyileştirmek için çerezler kullanabilir. Çerezleri tarayıcı ayarlarından devre dışı bırakabilirsiniz.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">7. Haklarınız</h2>
            <p className="mb-4 leading-relaxed">
              Aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="mb-6 leading-relaxed space-y-2">
              <li>• Kişisel verilerinize erişim hakkı</li>
              <li>• Kişisel verilerinizi düzeltme hakkı</li>
              <li>• Kişisel verilerinizi silme hakkı</li>
              <li>• Veri işlemeye itiraz etme hakkı</li>
            </ul>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">8. İletişim</h2>
            <p className="mb-6 leading-relaxed">
              Gizlilik politikası hakkında sorularınız varsa, lütfen iletişime geçiniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
