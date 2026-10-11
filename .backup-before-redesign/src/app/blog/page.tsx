import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogListPage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
            <h2 className="font-serif text-xl group-hover:text-[#5e6b52]">{post.title}</h2>
            <p className="text-sm text-[#5b5f58] mt-1">{post.excerpt}</p>
            <p className="text-xs text-[#8b9a7a] mt-1">
              {post.publishedAt?.toLocaleDateString("tr-TR")} · {post.readingMinutes} dk okuma
            </p>
          </Link>
        ))}
        {posts.length === 0 && <p className="text-[#5b5f58]">Henüz yayınlanmış yazı yok.</p>}
      </div>
    </div>
  );
}
