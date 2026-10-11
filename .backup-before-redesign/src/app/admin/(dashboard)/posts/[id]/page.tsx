import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "../_PostForm";
import { updatePost } from "../actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  const boundUpdate = updatePost.bind(null, post.id);

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Yazıyı Düzenle</h1>
      <PostForm
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          status: post.status,
          seoTitle: post.seoTitle ?? "",
          seoDescription: post.seoDescription ?? "",
          coverImageUrl: post.coverImageUrl ?? "",
        }}
        action={boundUpdate}
      />
    </div>
  );
}
