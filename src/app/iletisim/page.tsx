import { getAllSettings } from "@/lib/settings";
import ContactForm from "./_ContactForm";

export const dynamic = "force-dynamic";

function Icon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d={path} />
    </svg>
  );
}

function InfoRow({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream text-forest">
        <Icon path={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">{title}</p>
        <div className="mt-1 text-[15px] leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  );
}

export default async function IletisimPage() {
  const settings = await getAllSettings();
  const mapQuery = encodeURIComponent(settings.location || "Bağdat Caddesi, İstanbul");

  return (
    <div className="bg-cream">
      {/* Başlık bandı */}
      <section className="border-b border-line bg-forest text-cream">
        <div className="site-container py-16 sm:py-20">
          <p className="eyebrow text-tan">İletişim</p>
          <h1 className="mt-3 font-serif text-[clamp(2rem,5vw,3.25rem)] leading-tight">
            Sorularınız ve geri bildirimleriniz için buradayım.
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] text-cream/80">
            Aşağıdaki formdan ya da iletişim bilgilerinden bana ulaşabilirsiniz. Genellikle 24 saat
            içinde dönüş yapılmaktadır.
          </p>
        </div>
      </section>

      {/* Sol bilgi — Sağ form */}
      <section className="site-container py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          {/* Sol: İletişim bilgileri */}
          <div className="rounded-2xl border border-line bg-paper p-7 shadow-[0_20px_50px_-40px_rgba(34,57,47,0.6)]">
            <h2 className="font-serif text-2xl text-ink">İletişim Bilgileri</h2>
            <div className="mt-6 space-y-6">
              <InfoRow
                icon="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                title="Adres"
              >
                {settings.location}
              </InfoRow>
              <InfoRow
                icon="M6.5 3.5 9 4l1 3-2 1.5a12 12 0 0 0 5.5 5.5L15 12l3 1 .5 2.5A2 2 0 0 1 16.4 18 14 14 0 0 1 6 7.6a2 2 0 0 1 .5-4.1Z"
                title="Telefon"
              >
                <a href="tel:+902163924141" className="hover:text-forest">
                  +90 216 392 41 41
                </a>
              </InfoRow>
              <InfoRow icon="M4 6h16v12H4zM4 7l8 6 8-6" title="E-posta">
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="break-words hover:text-forest"
                >
                  {settings.contact_email}
                </a>
              </InfoRow>
              <InfoRow
                icon="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                title="Çalışma Saatleri"
              >
                <span className="block">Pazartesi – Cuma: 09:00 – 18:00</span>
                <span className="block">Cumartesi: 09:00 – 13:00</span>
                <span className="block text-muted">Pazar: Kapalı</span>
              </InfoRow>
            </div>

            <div className="mt-7 border-t border-line pt-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">
                Sosyal Medya
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream text-forest transition-colors hover:bg-forest hover:text-cream"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    className="h-5 w-5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href={settings.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream text-forest transition-colors hover:bg-forest hover:text-cream"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.1.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1.9 1.9 1.2 2.2 1.3.3.1.5.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.1.1.5-.1 1Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Sağ: Mesaj formu */}
          <div className="rounded-2xl border border-line bg-paper p-7 shadow-[0_20px_50px_-40px_rgba(34,57,47,0.6)]">
            <h2 className="font-serif text-2xl text-ink">Mesaj Gönderin</h2>
            <p className="mt-2 text-[14px] text-muted">
              Formu doldurun, en kısa sürede size dönüş yapayım.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Alt: Harita */}
      <section className="site-container pb-16">
        <div className="overflow-hidden rounded-2xl border border-line">
          <iframe
            title="Konum haritası"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            width="100%"
            height="380"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="mt-3 text-right">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-forest hover:text-tan-deep"
          >
            Haritalar&apos;da aç ↗
          </a>
        </div>
      </section>
    </div>
  );
}
