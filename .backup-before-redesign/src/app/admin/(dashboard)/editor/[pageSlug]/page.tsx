import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SectionEditor from "../_SectionEditor";
import PageRenderer from "../_PageRenderer";

export const dynamic = "force-dynamic";

const KNOWN = ["home", "hakkimda", "servisler", "iletisim"];

export default async function AdminEditorPage({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}) {
  const { pageSlug } = await params;
  if (!KNOWN.includes(pageSlug)) notFound();

  const sections = await prisma.pageSection.findMany({
    where: { pageSlug },
    orderBy: { position: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-serif">
          Düzenle: <span className="capitalize">{pageSlug === "home" ? "Ana Sayfa" : pageSlug}</span>
        </h1>
        <Link href="/admin/editor" className="text-sm text-[#5e6b52] hover:underline">
          ← Tüm sayfalar
        </Link>
      </div>
      <p className="text-sm text-[#5b5f58] mb-6">
        Bölümleri sürükleyip sıralayın, tıklayıp düzenleyin. Değişiklikler doğrudan sunucuya kaydedilir.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionEditor pageSlug={pageSlug} sections={sections} />
        </div>
        <div className="lg:col-span-1 lg:sticky lg:top-4 self-start">
          <PageRenderer sections={sections} />
        </div>
      </div>
    </div>
  );
}
