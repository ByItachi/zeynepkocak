import { getAllSettings } from "@/lib/settings";
import SettingsForm from "./_SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const values = await getAllSettings();

  return (
    <div>
      <h1 className="text-2xl font-serif mb-1">Site Ayarları</h1>
      <p className="text-sm text-[#5b5f58] mb-6">
        Bu alanlar veritabanına kaydedilir ve ana sayfa/diğer sayfalarda anında yansır.
      </p>
      <SettingsForm values={values} />
    </div>
  );
}
