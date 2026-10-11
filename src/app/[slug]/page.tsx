import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) return {};
  return { title: page.seoTitle || page.title, description: page.seoDescription || undefined };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page || page.status !== "PUBLISHED") notFound();

  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl mb-6">{page.title}</h1>
      <div className="text-sm text-[#2f332e]" dangerouslySetInnerHTML={{ __html: page.content }} />
    </article>
  );
}
