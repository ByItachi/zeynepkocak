import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import PageHero from "@/components/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
  };
}

const FALLBACK_IMAGES = [
  "/instagram/post-1.jpg",
  "/instagram/post-5.jpg",
  "/instagram/post-4.jpg",
];

function formatDate(d: Date | null) {
  if (!d) return "";
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { categories: true },
  });
  if (!post || post.status !== "PUBLISHED") notFound();

  const recentPosts = await prisma.post.findMany({
    where: { status: "PUBLISHED", id: { not: post.id } },
    orderBy: { publishedAt: "desc" },
    take: 4,
  });

  return (
    <div>
      <PageHero
        eyebrow={post.categories[0]?.name || "Blog"}
        title={post.title}
        breadcrumb={[
          { label: "Anasayfa", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="py-12 lg:py-16">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          {/* Ana içerik */}
          <div className="lg:col-span-8">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
              <span>{formatDate(post.publishedAt)}</span>
              {post.readingMinutes && <span>· {post.readingMinutes} dk okuma</span>}
              <span>· Zeynep Koçak</span>
            </p>

            {post.coverImageUrl && (
              <div className="relative mt-6 h-[340px] w-full overflow-hidden rounded-[22px] sm:h-[420px]">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div
              className="prose prose-sage mt-8 max-w-none text-[16px] leading-relaxed text-ink dark:text-cream/90 [&_a]:text-forest [&_a]:underline [&_h2]:font-serif [&_h2]:text-[1.6rem] [&_h2]:text-ink [&_h3]:font-serif [&_h3]:text-[1.25rem] [&_h3]:text-ink [&_li]:text-muted [&_p]:mb-5 dark:[&_a]:text-tan dark:[&_h2]:text-cream dark:[&_h3]:text-cream"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-10 rounded-[22px] border border-line bg-cream px-7 py-6 dark:border-white/10 dark:bg-white/5">
              <p className="hand text-[24px] leading-snug text-sage dark:text-tan">
                “Bu yazıyla ilgili sorularınız varsa çekinmeden yazabilirsiniz.”
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/iletisim"
                  className="rounded-full bg-forest px-6 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-forest-deep dark:bg-tan dark:text-forest"
                >
                  İletişime Geç
                </Link>
                <Link
                  href="/randevu"
                  className="rounded-full border border-forest px-6 py-3 text-[13.5px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:border-tan dark:text-tan"
                >
                  Randevu Al
                </Link>
              </div>
            </div>
          </div>

          {/* Sağ sidebar — Son Yazılar */}
          <aside className="lg:col-span-4">
            <div className="rounded-[22px] border border-line bg-paper p-6 dark:border-white/10 dark:bg-white/5">
              <h2 className="font-serif text-[20px] text-ink dark:text-cream">Son Yazılar</h2>
              <ul className="mt-5 space-y-5">
                {recentPosts.map((rp, i) => (
                  <li key={rp.id} className="flex gap-3.5">
                    <Link
                      href={`/blog/${rp.slug}`}
                      className="relative block h-[62px] w-[62px] shrink-0 overflow-hidden rounded-xl"
                    >
                      <Image
                        src={rp.coverImageUrl || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                        alt={rp.title}
                        fill
                        sizes="62px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        href={`/blog/${rp.slug}`}
                        className="line-clamp-2 font-serif text-[15px] leading-snug text-ink transition-colors hover:text-tan-deep dark:text-cream dark:hover:text-tan"
                      >
                        {rp.title}
                      </Link>
                      <p className="mt-1 text-[12px] text-muted">{formatDate(rp.publishedAt)}</p>
                    </div>
                  </li>
                ))}
                {recentPosts.length === 0 && (
                  <li className="text-[14px] text-muted">Henüz başka yazı yok.</li>
                )}
              </ul>
              <Link
                href="/blog"
                className="mt-6 inline-block border-b border-forest pb-0.5 text-[13.5px] font-semibold text-forest dark:border-tan dark:text-tan"
              >
                Tüm Yazılar →
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
