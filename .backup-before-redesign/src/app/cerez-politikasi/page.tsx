export const metadata = {
  title: "Çerez Politikası | Zeynep Koçak",
  description: "Zeynep Koçak web sitesinin çerez politikası.",
};

export default function CerezPolitikasi() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#faf7f2] to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-[#2f332e]">
            Çerez Politikası
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
            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">1. Çerezler Nedir?</h2>
            <p className="mb-6 leading-relaxed">
              Çerezler, web sitesi ziyaretçilerinin tarayıcılarında depolanan küçük metin dosyalarıdır. Çerezler, web sitesi deneyimini kişiselleştirmek ve iyileştirmek için kullanılır.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">2. Kullanılan Çerezler</h2>
            <p className="mb-4 leading-relaxed">
              Web sitesi aşağıdaki çerezleri kullanabilir:
            </p>
            <ul className="mb-6 leading-relaxed space-y-2">
              <li>• <strong>Oturum Çerezleri:</strong> Oturum sırasında kullanıcı bilgilerini saklamak için</li>
              <li>• <strong>Kalıcı Çerezler:</strong> Kullanıcı tercihlerini hatırlamak için</li>
              <li>• <strong>Analitik Çerezleri:</strong> Web sitesi kullanımını analiz etmek için</li>
              <li>• <strong>Pazarlama Çerezleri:</strong> Hedefli reklamlar göstermek için</li>
            </ul>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">3. Çerezleri Kontrol Etme</h2>
            <p className="mb-6 leading-relaxed">
              Çerezleri tarayıcı ayarlarından kontrol edebilirsiniz. Çoğu tarayıcı, çerezleri kabul etmeden veya silmeden önce sizi uyarır. Çerezleri devre dışı bırakırsanız, web sitesinin bazı özellikleri düzgün çalışmayabilir.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">4. Üçüncü Taraf Çerezleri</h2>
            <p className="mb-6 leading-relaxed">
              Web sitesi, Google Analytics gibi üçüncü taraf hizmetleri kullanabilir. Bu hizmetler, kendi çerezlerini kullanabilir. Üçüncü taraf çerezleri hakkında daha fazla bilgi için, ilgili hizmetin gizlilik politikasını inceleyiniz.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">5. Gizlilik</h2>
            <p className="mb-6 leading-relaxed">
              Çerezler aracılığıyla toplanan veriler, gizlilik politikasına uygun şekilde işlenir.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-[#2f332e]">6. İletişim</h2>
            <p className="mb-6 leading-relaxed">
              Çerez politikası hakkında sorularınız varsa, lütfen iletişime geçiniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
