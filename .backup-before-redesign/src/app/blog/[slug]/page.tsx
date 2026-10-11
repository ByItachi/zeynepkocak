import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || post.status !== "PUBLISHED") notFound();

  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl mb-2">{post.title}</h1>
      <p className="text-xs text-[#8b9a7a] mb-8">
        {post.publishedAt?.toLocaleDateString("tr-TR")} · {post.readingMinutes} dk okuma
      </p>
      <div
        className="prose prose-sm max-w-none text-[#2f332e]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
