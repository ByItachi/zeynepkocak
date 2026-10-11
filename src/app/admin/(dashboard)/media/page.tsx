import { prisma } from "@/lib/prisma";
import MediaManager from "./_MediaManager";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    include: { usages: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-1">Medya Kütüphanesi</h1>
      <p className="text-sm text-[#5b5f58] mb-6">
        Görsel/video yükleyin, AI görseli kaydedin veya URL ekleyin. Kullanılmayan öğeler 'kullanılmayan' olarak
        işaretlenir.
      </p>
      <MediaManager assets={assets} />
    </div>
  );
}
