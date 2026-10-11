import Link from "next/link";
import { getAllSettings } from "@/lib/settings";

export const metadata = {
  title: "Transformational Breath® | Zeynep Koçak",
  description: "Beden farkındalığı ve nefes çalışması temelli grup ve bireysel seanslar.",
};

export default async function TransformationalBreathPage() {
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
            Transformational Breath®
          </h1>
          <p className="text-lg text-[#5b5f58] leading-relaxed">
            Beden farkındalığı ve nefes çalışması temelli grup ve bireysel seanslar.
          </p>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Nedir?</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Transformational Breath®, beden farkındalığı ve nefes çalışması temelli bir yaklaşımdır. Bilinçli nefes alma teknikleri aracılığıyla, duygusal farkındalık, stres yönetimi ve kişisel gelişim desteklenir.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Nasıl Çalışır?</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Seanslar, rehberli nefes alma teknikleri, beden farkındalığı egzersizleri ve meditasyon gibi uygulamaları içerir. Bu uygulamalar, stres azaltmaya, duygusal farkındalık geliştirmeye ve genel refahı iyileştirmeye yardımcı olur.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Kimler İçin Uygun?</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• Stres ve kaygı yönetimi hakkında destek arayanlar</li>
              <li>• Beden farkındalığı geliştirmek isteyenler</li>
              <li>• Duygusal farkındalık kazanmak isteyenler</li>
              <li>• Kişisel gelişim hedefi olanlar</li>
              <li>• Meditasyon ve mindfulness ilgilenenler</li>
              <li>• Genel refahı iyileştirmek isteyenler</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Seans Formatı</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• <strong>Seans Süresi:</strong> 60 dakika</li>
              <li>• <strong>Sıklık:</strong> Haftada 1 seans (uygun olduğunda değişebilir)</li>
              <li>• <strong>Yer:</strong> Bağdat Caddesi, İstanbul (yüz yüze) veya online</li>
              <li>• <strong>Grup veya Bireysel:</strong> Her iki format da mevcut</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Katılım Öncesinde Bilinmesi Gerekenler</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• Transformational Breath® tıbbi tedavi değildir</li>
              <li>• Belirli sağlık koşulları varsa, doktorunuza danışınız</li>
              <li>• Seanslar fiziksel ve duygusal olarak yoğun olabilir</li>
              <li>• Rahat kıyafetler giyiniz</li>
              <li>• Seansdan 2 saat önce ağır yemek yemeyin</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Sıkça Sorulan Sorular</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Transformational Breath® güvenli midir?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Evet, rehberli ve profesyonel bir ortamda uygulandığında güvenlidir. Ancak, belirli sağlık koşulları varsa, doktorunuza danışınız.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Hemen sonuç görür müyüm?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Bazı kişiler ilk seansdan sonra rahatlamayı hissederken, diğerleri daha uzun bir süre gerektirebilir. Düzenli uygulamalar daha etkili sonuçlar sağlar.
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
            Transformational Breath® Seansına Katılmak İster misiniz?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Lütfen iletişime geçiniz. Katılım öncesinde detaylı bilgi verebilirim.
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
