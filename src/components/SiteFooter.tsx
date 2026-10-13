import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

const SERVICE_LINKS = [
  { label: "Bireysel Danışmanlık", href: "/yetiskinlerle-calisma" },
  { label: "Ergenlerle Çalışma", href: "/ergenlerle-calisma" },
  { label: "Çift Terapisi", href: "/ciftlerle-calisma" },
  { label: "Online Görüşmeler", href: "/online-gorusmeler" },
  { label: "Expat Support", href: "/expat-psychologist" },
  { label: "Grup Terapileri", href: "/grup-terapileri" },
];

const LEGAL_LINKS = [
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { label: "KVKK", href: "/kvkk" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
];

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 shrink-0">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293a.75.75 0 0 1-.919.273 12.035 12.035 0 0 1-6.163-6.163.75.75 0 0 1 .274-.918l1.292-.97c.363-.272.527-.734.417-1.173L6.925 3.18A1.125 1.125 0 0 0 5.834 2.33H4.5A2.25 2.25 0 0 0 2.25 4.58v2.17Z"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 shrink-0">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 shrink-0">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

export default function SiteFooter({
  brandName,
  instagramUrl,
  whatsappUrl,
  email,
  location,
}: {
  brandName: string;
  instagramUrl: string;
  whatsappUrl?: string;
  email?: string;
  location?: string;
}) {
  // Örnek/boş e-posta gösterme (sahte bilgi üretme)
  const showEmail = email && !email.includes("example.com");

  return (
    <footer className="bg-cream-deep dark:bg-[#101410]">
      <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Marka */}
          <div>
            <div className="flex items-center gap-3 text-ink dark:text-cream">
              <Logo className="h-11 w-11 text-tan" />
              <span className="leading-none">
                <span className="block font-serif text-[20px]">{brandName}</span>
                <span className="mt-1 block text-[9.5px] font-semibold uppercase tracking-[0.3em] text-muted">
                  Psikolojik Danışmanlık
                </span>
              </span>
            </div>
            <p className="hand mt-5 max-w-[230px] text-[22px] leading-snug text-sage dark:text-tan">
              "Kendini anlamak, daha iyi bir yarın için..."
            </p>

            <ul className="mt-5 space-y-3 text-[14px] text-muted">
              {whatsappUrl && (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 transition-colors hover:text-forest dark:hover:text-tan"
                  >
                    <span className="text-tan">
                      <IconPhone />
                    </span>
                    WhatsApp ile ulaşın
                  </a>
                </li>
              )}
              {showEmail && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-3 transition-colors hover:text-forest dark:hover:text-tan"
                  >
                    <span className="text-tan">
                      <IconMail />
                    </span>
                    {email}
                  </a>
                </li>
              )}
              {location && (
                <li className="inline-flex items-center gap-3">
                  <span className="text-tan">
                    <IconPin />
                  </span>
                  {location}
                </li>
              )}
            </ul>
            <Link
              href="/randevu"
              className="mt-5 inline-block rounded-full border border-forest px-6 py-2.5 text-[13.5px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:border-tan dark:text-tan dark:hover:bg-tan dark:hover:text-forest"
            >
              Randevu Al
            </Link>

            <div className="mt-6 flex gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-tan hover:bg-tan hover:text-white dark:border-white/20 dark:text-cream"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.218-1.79.465-2.428a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.45 2.525c.637-.247 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 1.8a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4Zm5.2-2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
                </svg>
              </a>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-tan hover:bg-tan hover:text-white dark:border-white/20 dark:text-cream"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                      clipRule="evenodd"
                    />
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Hizmetler */}
          <nav aria-label="Hizmetler">
            <h3 className="font-serif text-[18px] text-ink dark:text-cream">Hizmetler</h3>
            <ul className="mt-5 space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-muted transition-colors hover:text-forest dark:hover:text-tan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bülten */}
          <div>
            <h3 className="font-serif text-[18px] text-ink dark:text-cream">Bültenimize Katılın</h3>
            <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
              Yeni yazılar, atölye duyuruları ve etkinliklerden haberdar olmak için e-posta listemize
              katılın.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Alt koyu bar */}
      <div className="bg-forest text-white/75">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-3 px-5 py-4 text-[12.5px] sm:px-8 md:flex-row">
          <p>
            © {new Date().getFullYear()} {brandName}. Tüm hakları saklıdır.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-tan">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
