import Link from "next/link";
import { getAllSettings } from "@/lib/settings";

export const metadata = {
  title: "Yetişkinlerle Çalışma | Zeynep Koçak",
  description: "Kaygı, tükenmişlik, ilişki güçlükleri, özgüven ve yaşamsal geçiş dönemlerinde profesyonel psikolojik destek.",
};

export default async function YetiskinlerPage() {
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
            Yetişkinlerle Çalışma
          </h1>
          <p className="text-lg text-[#5b5f58] leading-relaxed">
            Yaşamın farklı dönemlerinde karşılaşılan zorluklar, duygusal güçlükler ve kişisel gelişim hedefleri için bireysel psikolojik destek.
          </p>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Nedir?</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Yetişkinlerle çalışma, yaşamın farklı dönemlerinde ortaya çıkan duygusal, ilişkisel ve kişisel zorluklar hakkında konuşmak ve çözüm bulmak için bir alan sağlar. Kaygı, tükenmişlik, ilişki güçlükleri, özgüven sorunları, yaşamsal geçiş dönemleri ve kişisel gelişim hedefleri bu çalışmanın kapsamına girer.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Kimler İçin Uygun?</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• Kaygı, depresyon veya stres yaşayan yetişkinler</li>
              <li>• İlişkilerinde zorluk yaşayanlar</li>
              <li>• Yaşamsal geçiş dönemlerinde destek arayanlar (iş değişikliği, taşınma, ayrılık, vb.)</li>
              <li>• Özgüven ve öz-saygı geliştirmek isteyenler</li>
              <li>• Kişisel gelişim ve kendini tanıma hedefi olanlar</li>
              <li>• Tükenmişlik ve iş-yaşam dengesi sorunları yaşayanlar</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Nasıl Çalışırız?</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Çalışma, güvenli ve gizli bir ortamda, kişiye özel bir yaklaşımla gerçekleşir. İlk görüşmede durumunuzu anlamaya ve birlikte çalışma hedeflerini belirlemeye odaklanırız. Sonraki seanslar, sizin ihtiyaçlarınız ve hedefleriniz doğrultusunda şekillendirilir.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Seans Formatı</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• <strong>Seans Süresi:</strong> 50 dakika</li>
              <li>• <strong>Sıklık:</strong> Haftada 1 seans (uygun olduğunda değişebilir)</li>
              <li>• <strong>Yer:</strong> Bağdat Caddesi, İstanbul (yüz yüze) veya online</li>
              <li>• <strong>Gizlilik:</strong> Tamamen gizli ve güvenli ortam</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Sıkça Sorulan Sorular</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Kaç seans gerekir?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Bu, sizin durumunuz ve hedeflerinize bağlıdır. Bazı kişiler 5-10 seans sonra istediği değişimi görürken, diğerleri daha uzun bir süre çalışmayı tercih edebilir. İlk görüşmede birlikte bir plan oluşturabiliriz.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Online seans yüz yüze kadar etkili midir?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Araştırmalar, online terapinin yüz yüze terapiyle benzer etkinliğe sahip olduğunu göstermektedir. Önemli olan, güvenli bir ortamda ve profesyonel bir terapistle çalışmaktır.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Terapist benim hakkımda başkasına söyler mi?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Hayır. Mesleki etik kurallarına göre, tüm bilgiler tamamen gizlidir. Yasal zorunluluk olmadıkça, hiçbir bilgi paylaşılmaz.
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
            Başlamaya Hazır mısınız?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            İlk adım, iletişime geçmek ve durumunuzu konuşmaktır. Gizlilik ve güven, çalışmamızın temelini oluşturur.
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
