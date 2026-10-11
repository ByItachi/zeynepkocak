import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./_DeleteButton";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Taslak",
  IN_REVIEW: "İncelemede",
  SCHEDULED: "Planlandı",
  PUBLISHED: "Yayında",
};

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif">Blog Yazıları</h1>
        <Link
          href="/admin/posts/new"
          className="rounded bg-[#5e6b52] text-white text-sm px-4 py-2 hover:bg-[#4c5742]"
        >
          + Yeni Yazı
        </Link>
      </div>

      <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f1ece2] text-left text-[#5b5f58]">
            <tr>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Güncelleme</th>
              <th className="px-4 py-3 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dccd]">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-[#5b5f58]">/blog/{post.slug}</p>
                </td>
                <td className="px-4 py-3">{STATUS_LABEL[post.status] ?? post.status}</td>
                <td className="px-4 py-3 text-xs text-[#5b5f58]">
                  {post.updatedAt.toLocaleDateString("tr-TR")}
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/posts/${post.id}`} className="text-[#5e6b52] hover:underline">
                    Düzenle
                  </Link>
                  <DeleteButton id={post.id} title={post.title} />
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[#5b5f58]">
                  Henüz yazı yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
