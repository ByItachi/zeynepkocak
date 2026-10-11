import Link from "next/link";
import { getAllSettings } from "@/lib/settings";

export const metadata = {
  title: "Atölyeler | Zeynep Koçak",
  description: "Psikodrama temelli grup atölyeleri ve çalışmaları.",
};

export default async function AtolyelerPage() {
  const settings = await getAllSettings();

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#faf7f2] to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-[#2f332e]">
            Grup Atölyeleri
          </h1>
          <p className="text-lg text-[#5b5f58] leading-relaxed">
            Psikodrama temelli grup atölyeleri aracılığıyla duygusal farkındalık, kişisel gelişim ve grup deneyimi.
          </p>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Atölyeler Hakkında</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Co-Psychodramatist olarak psikodrama temelli grup atölyeleri düzenliyorum. Bu atölyeler; bireylerin kendini keşfetmesine, grup içinde deneyim paylaşmasına ve rol oynama teknikleriyle duygusal farkındalık kazanmasına alan açıyor.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Atölye Konuları</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Atölye konuları, danışanların ihtiyaçlarına ve ilgi alanlarına göre belirlenir. Örneğin:
            </p>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• İlişkiler ve iletişim</li>
              <li>• Kendini tanıma ve kimlik</li>
              <li>• Yaşamsal geçişler</li>
              <li>• Duygusal farkındalık</li>
              <li>• Stres yönetimi</li>
              <li>• Grup dinamikleri</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Atölye Formatı</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• <strong>Grup Büyüklüğü:</strong> 8-15 kişi</li>
              <li>• <strong>Süre:</strong> 3-4 saat (atölye türüne göre değişebilir)</li>
              <li>• <strong>Sıklık:</strong> Aylık veya belirli dönemlerde</li>
              <li>• <strong>Yer:</strong> Bağdat Caddesi, İstanbul</li>
              <li>• <strong>Gizlilik:</strong> Grup gizliliği ve güveni korunur</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Atölye Süreci</h2>
            <ol className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>1. <strong>Açılış:</strong> Grup üyeleri tanışır ve atölye hedefleri belirlenir</li>
              <li>2. <strong>Isınma:</strong> Grup dinamiklerini geliştirmek için egzersizler</li>
              <li>3. <strong>Psikodrama:</strong> Rol oynama ve yaşamsal deneyimleri sahnelemek</li>
              <li>4. <strong>Paylaşım:</strong> Grup üyeleri deneyimlerini paylaşırlar</li>
              <li>5. <strong>Kapanış:</strong> Atölye özetlenir ve geri bildirim alınır</li>
            </ol>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Kimler İçin Uygun?</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• Grup deneyiminden yararlanmak isteyenler</li>
              <li>• Duygusal farkındalık geliştirmek isteyenler</li>
              <li>• Kişisel gelişim hedefi olanlar</li>
              <li>• Yaşamsal deneyimlerini keşfetmek isteyenler</li>
              <li>• Grup içinde kendini ifade etmek isteyenler</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Sıkça Sorulan Sorular</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Atölyeye katılmak için ön koşul var mı?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Hayır. Atölyeler, tüm yaşlardaki ve deneyim seviyesindeki kişiler için açıktır.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Atölyede rol oynamak zorunda mıyım?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Hayır. Katılımcılar, rahat oldukları düzeyde katılabilirler. Gözlemci olarak katılmak da mümkündür.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Atölyede gizlilik korunur mu?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Evet. Grup gizliliği ve güveni korunur. Grup üyeleri, atölyede konuşulanları başka kişilerle paylaşmamayı taahhüt ederler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YAKLAŞAN ATÖLYELER */}
      <section className="bg-[#f1ece2] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-[#2f332e]">
            Yaklaşan Atölyeler
          </h2>
          <p className="text-lg text-[#5b5f58] mb-8 leading-relaxed">
            Yeni atölye duyuruları ve tarihleri için Instagram hesabımı takip edebilir veya WhatsApp üzerinden bilgi alabilirsiniz.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#5e6b52] text-white px-8 py-3 rounded hover:bg-[#4c5742] transition-colors font-medium"
            >
              Instagram'da Takip Et
            </a>
            <a
              href={settings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-[#5e6b52] text-[#5e6b52] px-8 py-3 rounded hover:bg-white transition-colors font-medium"
            >
              WhatsApp'tan Bilgi Al
            </a>
          </div>
        </div>
      </section>

      {/* İLETİŞİM CTA */}
      <section className="bg-[#5e6b52] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Atölyeye Katılmak İster misiniz?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Lütfen iletişime geçiniz. Yaklaşan atölyeler hakkında bilgi verebilirim.
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
