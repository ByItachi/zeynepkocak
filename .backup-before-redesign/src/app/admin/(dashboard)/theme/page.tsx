import { getDesignSettings } from "@/lib/design";
import ThemeForm from "./_ThemeForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminThemePage() {
  const current = await getDesignSettings();
  const rows = await prisma.designSetting.findMany({ orderBy: { key: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-1">Tema & Tasarım</h1>
      <p className="text-sm text-[#5b5f58] mb-6">
        Renkler anında sitenin genelinde CSS değişkenleri olarak uygulanır. Kaydettiğinizde tüm sayfalara
        yansır (yayınlanır). &quot;Sıfırla&quot; düğmesi yalnızca kayıtlı değerleri kaldırır, varsayılanları geri getirir.
      </p>
      <ThemeForm current={current} rows={rows} />
    </div>
  );
}
