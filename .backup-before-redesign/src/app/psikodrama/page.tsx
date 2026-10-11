import Link from "next/link";
import { getAllSettings } from "@/lib/settings";

export const metadata = {
  title: "Psikodrama & Grup Atölyeleri | Zeynep Koçak",
  description: "Co-Psychodramatist olarak psikodrama temelli grup çalışmaları ve atölyeler.",
};

export default async function PsikodramaPage() {
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
            Psikodrama & Grup Atölyeleri
          </h1>
          <p className="text-lg text-[#5b5f58] leading-relaxed">
            Co-Psychodramatist olarak psikodrama temelli grup çalışmaları ve atölyeler yürütüyorum.
          </p>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Psikodrama Nedir?</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Psikodrama, rol oynama ve yaşamsal deneyimleri sahnelemek aracılığıyla duygusal farkındalık ve kişisel gelişim sağlayan bir grup terapisi yöntemidir. Grup üyeleri, birbirlerinin deneyimlerini anlamaya ve kendi deneyimlerini keşfetmeye yardımcı olurlar.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Grup Atölyeleri</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Grup atölyeleri, belirli bir tema veya konu etrafında toplanmış bir grup ile çalışmaktır. Psikodrama teknikleri kullanarak, grup üyeleri birbirlerinden öğrenirler ve duygusal farkındalık kazanırlar.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Kimler İçin Uygun?</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• Grup deneyiminden yararlanmak isteyenler</li>
              <li>• Duygusal farkındalık geliştirmek isteyenler</li>
              <li>• Kişisel gelişim hedefi olanlar</li>
              <li>• Yaşamsal deneyimlerini keşfetmek isteyenler</li>
              <li>• Grup içinde kendini ifade etmek isteyenler</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Atölye Formatı</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• <strong>Grup Büyüklüğü:</strong> 8-15 kişi</li>
              <li>• <strong>Süre:</strong> 3-4 saat (atölye türüne göre değişebilir)</li>
              <li>• <strong>Sıklık:</strong> Aylık veya belirli dönemlerde</li>
              <li>• <strong>Yer:</strong> Bağdat Caddesi, İstanbul</li>
              <li>• <strong>Gizlilik:</strong> Grup gizliliği ve güveni korunur</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Atölye Konuları</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Atölye konuları, danışanların ihtiyaçlarına ve ilgi alanlarına göre belirlenir. Örneğin: ilişkiler, kendini tanıma, yaşamsal geçişler, duygusal farkındalık, vb.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Sıkça Sorulan Sorular</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Grup atölyesinde ne yapılır?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Atölyede, psikodrama teknikleri kullanarak rol oynama, yaşamsal deneyimleri sahnelemek ve grup üyeleri arasında deneyim paylaşımı yapılır.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Grup atölyesinde gizlilik korunur mu?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Evet. Grup gizliliği ve güveni korunur. Grup üyeleri, atölyede konuşulanları başka kişilerle paylaşmamayı taahhüt ederler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATÖLYE DUYURUSU */}
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
            <Link
              href="/atolyeler"
              className="inline-block border-2 border-[#5e6b52] text-[#5e6b52] px-8 py-3 rounded hover:bg-white transition-colors font-medium"
            >
              Atölyeler Sayfası
            </Link>
          </div>
        </div>
      </section>

      {/* İLETİŞİM CTA */}
      <section className="bg-[#5e6b52] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Grup Atölyesine Katılmak İster misiniz?
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
