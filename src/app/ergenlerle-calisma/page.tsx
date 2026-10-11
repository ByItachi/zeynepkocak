import Link from "next/link";
import { getAllSettings } from "@/lib/settings";

export const metadata = {
  title: "Ergenlerle Çalışma | Zeynep Koçak",
  description: "Ergenlik dönemine özgü kimlik, aile ve okul kaynaklı sorunlarda profesyonel psikolojik destek.",
};

export default async function ErgenlerPage() {
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
            Ergenlerle Çalışma
          </h1>
          <p className="text-lg text-[#5b5f58] leading-relaxed">
            Ergenlik dönemine özgü kimlik sorgulamaları, aile ilişkileri, okul zorlukları ve duygusal gelişim hakkında destek.
          </p>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Nedir?</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Ergenlik, kimlik oluşumunun, duygusal değişimlerin ve sosyal ilişkilerin yoğun yaşandığı bir dönemdir. Bu dönemde ortaya çıkan kimlik sorgulamaları, aile çatışmaları, okul zorlukları, akran ilişkileri ve duygusal güçlükler hakkında destek sağlıyorum.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Kimler İçin Uygun?</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• Kimlik ve kendini tanıma sorgulamaları yaşayan ergenler</li>
              <li>• Aile ilişkilerinde zorluk yaşayanlar</li>
              <li>• Okul performansı veya sosyal ilişkilerde sorun yaşayanlar</li>
              <li>• Kaygı, depresyon veya duygusal zorluklar yaşayanlar</li>
              <li>• Akran ilişkilerinde sorun yaşayanlar</li>
              <li>• Yaşamsal geçiş dönemlerinde destek arayanlar</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Nasıl Çalışırız?</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Ergenlerle çalışma, onların sesini dinlemek ve kendilerini güvenli bir ortamda ifade etmelerine alan açmak üzerine kuruludur. Ebeveynlerle de iletişim kurarak, aile dinamiklerini anlamaya ve desteklemeye çalışırız.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Seans Formatı</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• <strong>Seans Süresi:</strong> 50 dakika</li>
              <li>• <strong>Sıklık:</strong> Haftada 1 seans (uygun olduğunda değişebilir)</li>
              <li>• <strong>Yer:</strong> Bağdat Caddesi, İstanbul (yüz yüze) veya online</li>
              <li>• <strong>Gizlilik:</strong> Ergenin gizliliği korunur, ancak ebeveynlerle iletişim kurulabilir</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Ebeveynler İçin Bilgi</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Ergenin gizliliği korunurken, ebeveynlerle de iletişim kurmak önemlidir. Gerekli durumlarda, ebeveynlerle ayrı görüşmeler yapabilir veya aile terapisi önerebilirim.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Sıkça Sorulan Sorular</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Ergenin gizliliği korunur mu?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Evet. Ergenin gizliliği korunur. Ancak, güvenlik riski veya yasal zorunluluk varsa, ebeveynlerle iletişim kurabilirim.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Ergen terapiye direniş gösterirse?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Bu çok yaygındır. Ergenin direncini anlamaya ve onun sesini dinlemeye çalışırız. Zamanla, güven oluştuğunda, çalışma daha etkili hale gelir.
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
            Ergenin Desteğe İhtiyacı Var mı?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Lütfen iletişime geçiniz. Birlikte, ergenin ihtiyaçlarını anlamaya ve uygun destek sağlamaya çalışabiliriz.
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
