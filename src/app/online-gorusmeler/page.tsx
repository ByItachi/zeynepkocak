import Link from "next/link";
import { getAllSettings } from "@/lib/settings";

export const metadata = {
  title: "Online Görüşmeler | Zeynep Koçak",
  description: "Dünyanın her yerinden güvenli ve gizli online psikolojik destek seansları.",
};

export default async function OnlineGorusmelerPage() {
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
            Online Görüşmeler
          </h1>
          <p className="text-lg text-[#5b5f58] leading-relaxed">
            Dünyanın her yerinden, güvenli ve gizli bir ortamda online psikolojik destek seansları.
          </p>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Nedir?</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Online görüşmeler, video konferans aracılığıyla, dünyanın her yerinden psikolojik destek almak için bir imkândır. Yüz yüze terapiyle benzer etkinliğe sahip olan online seanslar, yer ve zaman kısıtlamalarını ortadan kaldırır.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Avantajları</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• <strong>Yer Esnekliği:</strong> Dünyanın her yerinden erişim</li>
              <li>• <strong>Zaman Esnekliği:</strong> Uygun saatlerde seans</li>
              <li>• <strong>Gizlilik:</strong> Kendi güvenli ortamınızdan çalışma</li>
              <li>• <strong>Erişilebilirlik:</strong> Seyahat veya mobilite sorunları olmayan kişiler için ideal</li>
              <li>• <strong>Etkinlik:</strong> Araştırmalar, online terapinin yüz yüze terapiyle benzer etkinliğe sahip olduğunu göstermektedir</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Teknik Gereksinimler</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• İnternet bağlantısı (stabil ve hızlı)</li>
              <li>• Bilgisayar, tablet veya akıllı telefon</li>
              <li>• Kamera ve mikrofon</li>
              <li>• Gizli bir yer (başkaları tarafından görülmeyecek)</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Gizlilik & Güvenlik</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              Online seanslar, güvenli ve şifreli bir platform aracılığıyla gerçekleşir. Tüm bilgiler gizli tutulur ve yasal zorunluluk olmadıkça paylaşılmaz.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Sıkça Sorulan Sorular</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Online seans yüz yüze kadar etkili midir?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Evet. Araştırmalar, online terapinin yüz yüze terapiyle benzer etkinliğe sahip olduğunu göstermektedir. Önemli olan, güvenli bir ortamda ve profesyonel bir terapistle çalışmaktır.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">İnternet kesilirse ne olur?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Teknik sorunlar yaşanırsa, seansı yeniden başlatmaya veya başka bir zamana ertelemeye çalışırız.
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
            Online Seans Başlamak İster misiniz?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Lütfen iletişime geçiniz. Birlikte, uygun bir saat belirleyebiliriz.
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
