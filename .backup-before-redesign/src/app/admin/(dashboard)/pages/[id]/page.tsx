import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageForm from "../_PageForm";
import { savePage } from "../actions";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();
  const action = savePage.bind(null, page.id);

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Sayfayı Düzenle</h1>
      <PageForm initial={page} action={action} />
    </div>
  );
}
