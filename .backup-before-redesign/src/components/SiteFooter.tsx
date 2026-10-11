import Link from "next/link";
import Logo from "./Logo";

export default function SiteFooter({
  brandName,
  instagramUrl,
}: {
  brandName: string;
  instagramUrl: string;
}) {
  return (
    <footer className="border-t border-[#e2dccd] dark:border-[#2f332e] bg-[#f1ece2] dark:bg-[#141714] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Sütun 1 — Logo + İletişim Bilgileri + Sosyal Medya */}
          <div>
            <Logo className="h-10 w-10 mb-4" />
            <ul className="space-y-2 text-sm text-[#5b5f58] dark:text-[#9a9e95]">
              <li>+90 555 123 45 67</li>
              <li>info@zeynepkocak.com</li>
              <li>Bağdat Caddesi, İstanbul</li>
            </ul>
            <div className="flex gap-3 mt-5">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-[#5b5f58] dark:border-[#6a6e65] text-[#5b5f58] dark:text-[#9a9e95] hover:bg-[#5e6b52] hover:text-white hover:border-[#5e6b52] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.218-1.79.465-2.428a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.45 2.525c.637-.247 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 1.8a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4Zm5.2-2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/905551234567"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-[#5b5f58] dark:border-[#6a6e65] text-[#5b5f58] dark:text-[#9a9e95] hover:bg-[#25d366] hover:text-white hover:border-[#25d366] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z"/>
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Sütun 2 — Hizmetler */}
          <div>
            <h3 className="font-serif text-lg mb-4 text-[#2f332e] dark:text-[#e8e4dc]">Hizmetler</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/yetiskinlerle-calisma" className="text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#5e6b52]">Yetişkinler</Link></li>
              <li><Link href="/ergenlerle-calisma" className="text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#5e6b52]">Ergenler</Link></li>
              <li><Link href="/ciftlerle-calisma" className="text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#5e6b52]">Çiftler</Link></li>
              <li><Link href="/online-gorusmeler" className="text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#5e6b52]">Online</Link></li>
            </ul>
          </div>

          {/* Sütun 3 — Grup Çalışmaları */}
          <div>
            <h3 className="font-serif text-lg mb-4 text-[#2f332e] dark:text-[#e8e4dc]">Grup Çalışmaları</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/psikodrama" className="text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#5e6b52]">Psikodrama</Link></li>
              <li><Link href="/atolyeler" className="text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#5e6b52]">Atölyeler</Link></li>
              <li><Link href="/transformational-breath" className="text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#5e6b52]">Transformational Breath®</Link></li>
            </ul>
          </div>

          {/* Sütun 4 — Yasal & İletişim (sağ hizada) */}
          <div>
            <h3 className="font-serif text-lg mb-4 text-[#2f332e] dark:text-[#e8e4dc]">Yasal & İletişim</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/iletisim" className="text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#5e6b52]">İletişim</Link></li>
              <li><Link href="/gizlilik-politikasi" className="text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#5e6b52]">Gizlilik</Link></li>
              <li><Link href="/kvkk" className="text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#5e6b52]">KVKK</Link></li>
              <li><Link href="/cerez-politikasi" className="text-[#5b5f58] dark:text-[#9a9e95] hover:text-[#5e6b52]">Çerezler</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#e2dccd] dark:border-[#2f332e] pt-8 text-left text-sm text-[#5b5f58] dark:text-[#9a9e95]">
          <p>&copy; {new Date().getFullYear()} {brandName}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
