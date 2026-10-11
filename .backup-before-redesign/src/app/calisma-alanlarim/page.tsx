import Link from "next/link";
import { getAllSettings } from "@/lib/settings";

export const metadata = {
  title: "Çalışma Alanlarım | Zeynep Koçak",
  description: "Yetişkin, ergen, çift terapisi, psikodrama, grup atölyeleri, expat desteği ve transformational breath çalışmaları.",
};

export default async function CalismAlanlarPage() {
  const settings = await getAllSettings();

  const areas = [
    {
      title: "Yetişkinlerle Çalışma",
      description: "Kaygı, tükenmişlik, ilişki güçlükleri, özgüven ve yaşamsal geçiş dönemlerinde bireysel görüşmeler.",
      href: "/yetiskinlerle-calisma",
      icon: "👤",
    },
    {
      title: "Ergenlerle Çalışma",
      description: "Ergenlik dönemine özgü kimlik, aile ve okul kaynaklı sorunlarda ergenle birebir çalışma.",
      href: "/ergenlerle-calisma",
      icon: "👥",
    },
    {
      title: "Çiftlerle Çalışma",
      description: "İletişim sorunları, güven, çatışma çözümü ve ilişkiyi güçlendirme odaklı çift görüşmeleri.",
      href: "/ciftlerle-calisma",
      icon: "💑",
    },
    {
      title: "Online Görüşmeler",
      description: "Dünyanın her yerinden güvenli ve gizli online seans imkânı.",
      href: "/online-gorusmeler",
      icon: "💻",
    },
    {
      title: "Psikodrama & Grup Atölyeleri",
      description: "Co-Psychodramatist olarak psikodrama temelli grup çalışmaları ve atölyeler.",
      href: "/psikodrama",
      icon: "🎭",
    },
    {
      title: "Expat Psychologist",
      description: "Türkiye'de yaşayan yabancı danışanlar için İngilizce psikolojik destek.",
      href: "/expat-psychologist",
      icon: "🌍",
    },
    {
      title: "Transformational Breath®",
      description: "Beden farkındalığı ve nefes çalışması temelli grup ve bireysel seanslar.",
      href: "/transformational-breath",
      icon: "🌬️",
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#faf7f2] to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-[#2f332e]">
            Çalışma Alanlarım
          </h1>
          <p className="text-lg text-[#5b5f58] leading-relaxed">
            Yetişkin, ergen ve çiftlerle çalışan, psikodrama ve grup atölyeleri yürüten, uluslararası danışanlara destek veren bir psikoloji pratiğiyim. Her hizmet alanı hakkında detaylı bilgi için aşağıdaki bölümleri inceleyebilirsiniz.
          </p>
        </div>
      </section>

      {/* ÇALIŞMA ALANLARI GRID */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="group"
              >
                <div className="bg-white border border-[#e2dccd] rounded-lg p-8 hover:border-[#8b9a7a] hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="font-serif text-2xl mb-4 text-[#2f332e] group-hover:text-[#5e6b52]">
                    {area.title}
                  </h3>
                  <p className="text-[#5b5f58] mb-6 flex-grow leading-relaxed">
                    {area.description}
                  </p>
                  <span className="text-[#5e6b52] font-medium">
                    Detaylar →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ORTAK ÖZELLIKLER */}
      <section className="bg-[#f1ece2] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-[#2f332e]">
            Tüm Çalışmalarda Ortak Özellikler
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-xl mb-4 text-[#2f332e]">Gizlilik & Güven</h3>
              <p className="text-[#5b5f58] leading-relaxed">
                Tüm görüşmeler tamamen gizli ve güvenli ortamda gerçekleşir. Danışan bilgileri kesinlikle başka kişilerle paylaşılmaz.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-4 text-[#2f332e]">Profesyonel Yaklaşım</h3>
              <p className="text-[#5b5f58] leading-relaxed">
                Uzman Psikolog olarak mesleki etik kurallarına uygun, kanıta dayalı ve kişiye özel bir yaklaşım sunuyorum.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-4 text-[#2f332e]">Yüz Yüze & Online</h3>
              <p className="text-[#5b5f58] leading-relaxed">
                Bağdat Caddesi'ndeki ofisimde yüz yüze veya dünyanın her yerinden online olarak çalışma imkânı.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-4 text-[#2f332e]">Kişiye Özel Çalışma</h3>
              <p className="text-[#5b5f58] leading-relaxed">
                Her danışan benzersizdir. Çalışmamız sizin ihtiyaçlarınız ve hedefleriniz doğrultusunda şekillendirilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* İLETİŞİM CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-[#2f332e]">
            Hangi hizmet sizin için uygun olabilir?
          </h2>
          <p className="text-lg text-[#5b5f58] mb-10 leading-relaxed">
            Emin değilseniz, lütfen iletişime geçiniz. Birlikte uygun çalışma alanını belirleyebiliriz.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={settings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#5e6b52] text-white px-8 py-3 rounded hover:bg-[#4c5742] transition-colors font-medium"
            >
              WhatsApp'tan Yaz
            </a>
            <Link
              href="/iletisim"
              className="inline-block border-2 border-[#5e6b52] text-[#5e6b52] px-8 py-3 rounded hover:bg-[#f1ece2] transition-colors font-medium"
            >
              İletişim Formu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
