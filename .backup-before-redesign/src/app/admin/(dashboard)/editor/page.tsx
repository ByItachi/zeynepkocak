import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const KNOWN_PAGES = [
  { slug: "home", label: "Ana Sayfa" },
  { slug: "hakkimda", label: "Hakkımda" },
  { slug: "servisler", label: "Hizmetler" },
  { slug: "iletisim", label: "İletişim" },
];

export default async function AdminEditorListPage() {
  const sections = await prisma.pageSection.findMany();

  return (
    <div>
      <h1 className="text-2xl font-serif mb-1">Sayfa Editörü</h1>
      <p className="text-sm text-[#5b5f58] mb-6">
        Sürükle-bırak bölüm tabanlı sayfa editörü. Bir sayfa seçin, blok ekleyin ve özelleştirin.
      </p>
      <div className="max-w-2xl space-y-3">
        {KNOWN_PAGES.map((p) => {
          const count = sections.filter((s) => s.pageSlug === p.slug).length;
          return (
            <Link
              key={p.slug}
              href={`/admin/editor/${p.slug}`}
              className="flex items-center justify-between bg-white border border-[#e2dccd] rounded-lg px-4 py-3 hover:bg-[#f1ece2]"
            >
              <span className="font-medium">{p.label}</span>
              <span className="text-xs text-[#5b5f58]">{count} bölüm</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
