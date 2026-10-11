import Link from "next/link";
import { getAllSettings } from "@/lib/settings";

export const metadata = {
  title: "Çiftlerle Çalışma | Zeynep Koçak",
  description: "İletişim sorunları, güven, çatışma çözümü ve ilişkiyi güçlendirme odaklı çift terapisi.",
};

export default async function CiftlerPage() {
  const settings = await getAllSettings();

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#faf7f2] to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/calisma-alanlarim" className="text-[#5e6b52] text-sm hover:underline mb-4 inline-block">
            ← Çalışma Alanlarım
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-[#2f332e]">
            Çiftlerle Çalışma
          </h1>
          <p className="text-lg text-[#5b5f58] leading-relaxed">
            İletişim sorunları, güven, çatışma çözümü ve ilişkiyi güçlendirme odaklı çift terapisi.
          </p>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Nedir?</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Çift terapisi, ilişkideki iletişim sorunları, çatışmalar, güven eksikliği ve ilişkiyi güçlendirme hedefleri hakkında çalışmaktır. Her iki partnerin sesini dinleyerek, ilişkinin dinamiklerini anlamaya ve daha sağlıklı bir iletişim kurulmasına yardımcı oluyorum.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Kimler İçin Uygun?</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• İletişim sorunları yaşayan çiftler</li>
              <li>• Çatışma çözümü hakkında destek arayanlar</li>
              <li>• Güven sorunları yaşayan çiftler</li>
              <li>• İlişkiyi güçlendirmek isteyenler</li>
              <li>• Ayrılık veya boşanma sürecinde destek arayanlar</li>
              <li>• Evlilik öncesi danışmanlık arayanlar</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Nasıl Çalışırız?</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Çift terapisinde, her iki partnerin perspektifini anlamaya ve onları birbirini daha iyi anlamaya yardımcı olmaya çalışırız. Güvenli bir ortamda, iletişim becerilerini geliştirmeye ve ilişkiyi güçlendirmeye odaklanırız.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Seans Formatı</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• <strong>Seans Süresi:</strong> 60 dakika</li>
              <li>• <strong>Sıklık:</strong> Haftada 1 seans (uygun olduğunda değişebilir)</li>
              <li>• <strong>Yer:</strong> Bağdat Caddesi, İstanbul (yüz yüze) veya online</li>
              <li>• <strong>Gizlilik:</strong> Her iki partnerin gizliliği korunur</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Sıkça Sorulan Sorular</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Çift terapisi ilişkiyi kurtarır mı?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Çift terapisi, ilişkiyi güçlendirmek ve iletişimi iyileştirmek için bir araçtır. Ancak, her iki partnerin de çalışmaya istekli olması gerekir.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Terapist taraf tutar mı?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Hayır. Çift terapisinde, terapist tarafsız kalır ve her iki partnerin perspektifini anlamaya çalışır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İLETİŞİM CTA */}
      <section className="bg-[#5e6b52] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            İlişkinizi Güçlendirmek İster misiniz?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Çift terapisi, ilişkiyi güçlendirmek ve iletişimi iyileştirmek için etkili bir araçtır. Lütfen iletişime geçiniz.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={settings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#5e6b52] px-8 py-3 rounded hover:bg-[#f1ece2] transition-colors font-medium"
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
