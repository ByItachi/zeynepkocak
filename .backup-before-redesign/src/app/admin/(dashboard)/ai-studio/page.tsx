import { getImageGenStatus } from "@/lib/imagegen";
import { prisma } from "@/lib/prisma";
import AiStudio from "./_AiStudio";

export const dynamic = "force-dynamic";

export default async function AdminAiStudioPage() {
  const status = getImageGenStatus();
  const history = await prisma.aIGeneration.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    include: { results: true },
  });
  const assets = await prisma.mediaAsset.findMany({
    where: { isAi: true },
    orderBy: { createdAt: "desc" },
    take: 40,
  });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-1">AI Görsel Stüdyosu</h1>
      <p className="text-sm text-[#5b5f58] mb-6">
        Fotoğraf aynı şekilde üretilen görsel akışını yönetin; sonuçları medya kütüphanesine kaydedin ve
        sayfalarda kullanın.
      </p>
      <AiStudio status={status} history={history} assets={assets} />
    </div>
  );
}
