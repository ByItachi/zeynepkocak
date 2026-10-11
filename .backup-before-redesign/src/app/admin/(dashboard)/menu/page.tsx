import { prisma } from "@/lib/prisma";
import { createMenuItem, deleteMenuItem, toggleMenuItem } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const topItems = await prisma.menuItem.findMany({
    where: { parentId: null },
    orderBy: { position: "asc" },
    include: { children: { orderBy: { position: "asc" } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif">Navigasyon & Mega Menü</h1>
      </div>

      <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-[#f1ece2] text-left text-[#5b5f58]">
            <tr>
              <th className="px-4 py-3">Menü Öğesi</th>
              <th className="px-4 py-3">URL</th>
              <th className="px-4 py-3">Sıra</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dccd]">
            {topItems.map((item) => (
              <>
                <tr key={item.id} className="bg-white">
                  <td className="px-4 py-3 font-medium">{item.label}</td>
                  <td className="px-4 py-3 text-xs text-[#5b5f58]">{item.href || "—"}</td>
                  <td className="px-4 py-3 text-xs">{item.position}</td>
                  <td className="px-4 py-3">
                    <form action={toggleMenuItem.bind(null, item.id, !item.isActive)}>
                      <button type="submit" className={`text-xs px-2 py-1 rounded ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {item.isActive ? "Aktif" : "Pasif"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <form action={deleteMenuItem.bind(null, item.id)}>
                      <button type="submit" className="text-xs text-red-600 hover:underline">Sil</button>
                    </form>
                  </td>
                </tr>
                {item.children.map((child) => (
                  <tr key={child.id} className="bg-[#faf7f2]">
                    <td className="px-4 py-2 pl-8 text-sm">↳ {child.label}</td>
                    <td className="px-4 py-2 text-xs text-[#5b5f58]">{child.href || "—"}</td>
                    <td className="px-4 py-2 text-xs">S{child.column} / P{child.position}</td>
                    <td className="px-4 py-2">
                      <form action={toggleMenuItem.bind(null, child.id, !child.isActive)}>
                        <button type="submit" className={`text-xs px-2 py-1 rounded ${child.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {child.isActive ? "Aktif" : "Pasif"}
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-2">
                      <form action={deleteMenuItem.bind(null, child.id)}>
                        <button type="submit" className="text-xs text-red-600 hover:underline">Sil</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </>
            ))}
            {topItems.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[#5b5f58]">Henüz menü öğesi yok. Aşağıdan ekleyin.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-[#e2dccd] rounded-lg p-6">
        <h2 className="font-serif text-lg mb-4">Yeni Menü Öğesi Ekle</h2>
        <form action={createMenuItem} className="grid grid-cols-2 gap-4 max-w-2xl">
          <div>
            <label className="block text-sm text-[#5b5f58] mb-1">Başlık (TR)</label>
            <input name="label" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-[#5b5f58] mb-1">Başlık (EN)</label>
            <input name="labelEn" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-[#5b5f58] mb-1">URL</label>
            <input name="href" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" placeholder="/sayfa-yolu" />
          </div>
          <div>
            <label className="block text-sm text-[#5b5f58] mb-1">Üst Menü ID (boş = üst seviye)</label>
            <input name="parentId" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-[#5b5f58] mb-1">Açıklama</label>
            <input name="description" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[#5b5f58] mb-1">Sütun</label>
              <input name="column" type="number" defaultValue={0} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm text-[#5b5f58] mb-1">Sıra</label>
              <input name="position" type="number" defaultValue={0} className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="col-span-2 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="openInNew" /> Yeni sekmede aç
            </label>
            <button type="submit" className="rounded bg-[#5e6b52] text-white text-sm px-5 py-2 hover:bg-[#4c5742]">
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
