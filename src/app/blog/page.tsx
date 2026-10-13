import Link from "next/link";
import Image from "next/image";
import { prisma, safeQuery } from "@/lib/prisma";
import PageHero from "@/components/PageHero";

export const dynamic = "force-dynamic";

const FALLBACK_IMAGES = [
  "/instagram/post-1.jpg",
  "/instagram/post-5.jpg",
  "/instagram/post-4.jpg",
];

function formatDate(d: Date | null) {
  if (!d) return "";
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;

  const [categories, posts] = await Promise.all([
    safeQuery("blog.categories", () => prisma.postCategory.findMany({ orderBy: { name: "asc" } }), []),
    safeQuery(
      "blog.posts",
      () =>
        prisma.post.findMany({
          where: {
            status: "PUBLISHED",
            ...(kategori
              ? { categories: { some: { slug: kategori } } }
              : {}),
          },
          orderBy: { publishedAt: "desc" },
          include: { categories: true },
        }),
      []
    ),
  ]);

  return (
    <div>
      <PageHero
        eyebrow="Blog"
        title="Blog"
        lead="Psikoloji, ilişkiler, kişisel gelişim ve farkındalık üzerine yazılar."
        quote="“Yazmak, kendinle konuşmanın sessiz yoludur.”"
        breadcrumb={[{ label: "Anasayfa", href: "/" }, { label: "Blog" }]}
      />

      {/* Kategori filtresi */}
      <section className="border-b border-line bg-cream dark:border-white/10 dark:bg-[#161a16]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap gap-2.5 px-5 py-5 sm:px-8">
          <Link
            href="/blog"
            className={`rounded-full border px-5 py-2 text-[13.5px] font-medium transition-colors ${
              !kategori
                ? "border-forest bg-forest text-white dark:border-tan dark:bg-tan dark:text-forest"
                : "border-line bg-paper text-ink hover:border-tan dark:border-white/10 dark:bg-white/5 dark:text-cream"
            }`}
          >
            Tümü
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/blog?kategori=${c.slug}`}
              className={`rounded-full border px-5 py-2 text-[13.5px] font-medium transition-colors ${
                kategori === c.slug
                  ? "border-forest bg-forest text-white dark:border-tan dark:bg-tan dark:text-forest"
                  : "border-line bg-paper text-ink hover:border-tan dark:border-white/10 dark:bg-white/5 dark:text-cream"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Yazı listesi */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          {posts.length === 0 ? (
        <div className="rounded-[22px] border border-line bg-paper px-8 py-14 text-center dark:border-white/10 dark:bg-white/5">
          <p className="font-serif text-[20px] text-ink dark:text-cream">
            {kategori ? "Bu kategoride henüz yazı yok." : "Henüz yayınlanmış yazı yok."}
          </p>
          <p className="mt-2 text-[14.5px] text-muted">
            Yeni yazılar yayına girdiğinde burada listelenecek.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-paper transition-shadow hover:shadow-[0_24px_50px_-40px_rgba(34,57,47,0.7)] dark:border-white/10 dark:bg-white/5"
            >
              <Link href={`/blog/${post.slug}`} className="relative block h-[220px] w-full overflow-hidden">
                <Image
                  src={post.coverImageUrl || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-muted">
                  <span>{formatDate(post.publishedAt)}</span>
                  {post.readingMinutes && <span>· {post.readingMinutes} dk okuma</span>}
                  {post.categories[0] && (
                    <span className="rounded-full bg-cream px-2.5 py-0.5 text-[11.5px] font-semibold text-sage dark:bg-white/10 dark:text-tan">
                      {post.categories[0].name}
                    </span>
                  )}
                </p>
                <h2 className="mt-3 font-serif text-[21px] leading-snug text-ink dark:text-cream">
                  <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-tan-deep dark:hover:text-tan">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted">{post.excerpt}</p>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-2 self-start border-b border-forest pb-0.5 text-[13.5px] font-semibold text-forest dark:border-tan dark:text-tan"
                >
                  Devamını Oku
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5-5m5 5-5 5" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest text-cream">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:justify-between">
          <p className="hand max-w-[380px] text-center text-[26px] leading-snug text-tan lg:text-left">
            “Kendini anlamak, daha iyi bir yarın için…”
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/randevu"
              className="rounded-full bg-tan px-7 py-3.5 text-[14.5px] font-semibold text-forest transition-colors hover:bg-white"
            >
              Randevu Al
            </Link>
            <Link
              href="/iletisim"
              className="rounded-full border border-white/60 px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-white hover:text-forest"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
