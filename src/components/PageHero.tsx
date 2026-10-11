import Link from "next/link";

/**
 * İç sayfa üst bandı — referans tasarımdaki koyu orman yeşili başlık bandı.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  quote,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  quote?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="bg-forest pt-10 text-white">
      <div className="mx-auto max-w-[1240px] px-5 pb-12 sm:px-8 lg:pb-16">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumb.map((item, i) => (
                <li key={item.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {item.href ? (
                    <Link href={item.href} className="transition-colors hover:text-tan">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white/85">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow && <p className="eyebrow text-tan">{eyebrow}</p>}
            <h1 className="mt-4 font-serif text-[2.3rem] leading-[1.1] sm:text-[3rem]">{title}</h1>
            {lead && <p className="mt-5 text-[16px] leading-relaxed text-white/75">{lead}</p>}
          </div>
          {quote && (
            <p className="hand max-w-[260px] shrink-0 text-[24px] leading-snug text-tan/90 lg:text-right">
              {quote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
