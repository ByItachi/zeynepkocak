"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addSection, updateSection, removeSection, reorderSections, toggleSection } from "./actions";

interface Section {
  id: string;
  pageSlug: string;
  blockType: string;
  title: string | null;
  content: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  layout: string | null;
  style: string | null;
  position: number;
  isPublished: boolean;
}

const BLOCK_TYPES: { value: string; label: string }[] = [
  { value: "hero", label: "Öne Çıkan (Hero)" },
  { value: "text", label: "Metin" },
  { value: "twoColumn", label: "İki Kolon" },
  { value: "image", label: "Görsel" },
  { value: "gallery", label: "Galeri" },
  { value: "quote", label: "Alıntı" },
  { value: "stats", label: "İstatistik" },
  { value: "cta", label: "Harekete Geçirici" },
  { value: "video", label: "Video" },
  { value: "divider", label: "Bölücü" },
];

export default function SectionEditor({
  pageSlug,
  sections: initialSections,
}: {
  pageSlug: string;
  sections: Section[];
}) {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [busy, setBusy] = useState<string | false>(false); // false | sectionId
  const [notice, setNotice] = useState<string | null>(null);

  function toast(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  }

  async function handleAdd(blockType: string) {
    setBusy("add");
    try {
      const section = await addSection(pageSlug, blockType);
      setSections((p) => [...p, section as unknown as Section]);
      toast("Bölüm eklendi.");
      router.refresh();
    } catch (e: any) {
      toast(e?.message ?? "Eklenemedi.");
    } finally {
      setBusy(false);
    }
  }

  async function handleUpdate(id: string, data: Partial<Section>) {
    setBusy(id);
    try {
      const updated = await updateSection(id, {
        title: data.title ?? undefined,
        content: data.content ?? undefined,
        imageUrl: data.imageUrl ?? undefined,
        imageAlt: data.imageAlt ?? undefined,
        layout: data.layout ?? undefined,
        style: data.style ?? undefined,
      });
      setSections((p) => p.map((s) => (s.id === id ? updated : s)));
      toast("Kaydedildi.");
      router.refresh();
    } catch (e: any) {
      toast(e?.message ?? "Kaydedilemedi.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove(id: string) {
    if (!window.confirm("Bu bölümü silmek istiyor musunuz?")) return;
    try {
      await removeSection(id);
      setSections((p) => p.filter((s) => s.id !== id));
      toast("Silindi.");
      router.refresh();
    } catch (e: any) {
      toast(e?.message ?? "Silinemedi.");
    }
  }

  async function handleToggle(id: string, isPublished: boolean) {
    try {
      await toggleSection(id, isPublished);
      setSections((p) => p.map((s) => (s.id === id ? { ...s, isPublished } : s)));
      toast(isPublished ? "Bölüm yayında." : "Bölüm taslak olarak saklandı.");
      router.refresh();
    } catch {
      toast("Güncellenemedi.");
    }
  }

  async function commitReorder() {
    if (dragIdx === null || overIdx === null || dragIdx === overIdx) {
      setDragIdx(null);
      setOverIdx(null);
      return;
    }
    const next = [...sections];
    const moved = next.splice(dragIdx, 1)[0];
    next.splice(overIdx, 0, moved);
    const ordered = next.map((s) => s.id);
    setSections(next);
    setDragIdx(null);
    setOverIdx(null);
    try {
      await reorderSections(pageSlug, ordered);
      toast("Sıralama güncellendi.");
    } catch {
      toast("Sıralama kaydedilemedi.");
    }
  }

  function onDragStart(idx: number) {
    setDragIdx(idx);
  }
  function onDragOver(idx: number) {
    setOverIdx(idx);
  }

  return (
    <div className="space-y-3">
      {notice && (
        <p className="text-xs text-[#5e6b52] bg-[#f4faf4] border border-[#cfe3cf] rounded px-3 py-2">{notice}</p>
      )}

      {/* Blok ekleme */}
      <div className="bg-white border border-[#e2dccd] rounded-lg p-3 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-[#5b5f58] mr-1">+ Blok ekle:</span>
        {BLOCK_TYPES.map((b) => (
          <button
            key={b.value}
            disabled={busy !== false}
            onClick={() => handleAdd(b.value)}
            className="rounded-full border border-[#e2dccd] text-xs px-3 py-1.5 hover:bg-[#f1ece2] disabled:opacity-50"
          >
            {b.label}
          </button>
        ))}
      </div>

      {sections.length === 0 && (
        <p className="text-sm text-[#5b5f58] bg-white border border-dashed border-[#e2dccd] rounded-lg p-8 text-center">
          Henüz bölüm yok. Yukarıdan bir blok ekleyin.
        </p>
      )}

      {sections.map((s, idx) => (
        <div
          key={s.id}
          draggable
          onDragStart={() => onDragStart(idx)}
          onDragOver={(e) => {
            e.preventDefault();
            onDragOver(idx);
          }}
          onDrop={commitReorder}
          onDragEnd={() => {
            setDragIdx(null);
            setOverIdx(null);
          }}
          className={`bg-white border rounded-lg overflow-hidden ${overIdx === idx && dragIdx !== null && overIdx !== dragIdx ? "ring-2 ring-[#5e6b52] opacity-60" : "border-[#e2dccd]"}`}
        >
          <div className="flex items-center justify-between px-3 py-2 bg-[#f7f4ec] border-b border-[#e2dccd]">
            <div className="flex items-center gap-2">
              <span className="text-[#a3a89f] cursor-grab">⠿</span>
              <span className="text-sm font-medium">{s.title || BLOCK_TYPES.find((b) => b.value === s.blockType)?.label}</span>
              <span className="text-[10px] text-[#a3a89f] uppercase">{s.blockType}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggle(s.id, !s.isPublished)}
                className={`text-[10px] px-2 py-0.5 rounded-full ${s.isPublished ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
              >
                {s.isPublished ? "Yayında" : "Taslak"}
              </button>
              <button
                onClick={() => handleRemove(s.id)}
                className="text-xs text-red-600 hover:text-red-800"
              >
                Sil
              </button>
            </div>
          </div>
          <SectionForm
            section={s}
            loading={busy === s.id}
            onSave={(data) => handleUpdate(s.id, data)}
          />
        </div>
      ))}
    </div>
  );
}

function SectionForm({
  section,
  loading,
  onSave,
}: {
  section: Section;
  loading: boolean;
  onSave: (d: Partial<Section>) => void;
}) {
  const [title, setTitle] = useState(section.title ?? "");
  const [content, setContent] = useState(section.content ?? "");
  const [imageUrl, setImageUrl] = useState(section.imageUrl ?? "");
  const [imageAlt, setImageAlt] = useState(section.imageAlt ?? "");
  const [style, setStyle] = useState(section.style ?? '{"align":"left"}');

  function parsedStyle() {
    try {
      return JSON.parse(style || "{}");
    } catch {
      return {};
    }
  }
  const [align, setAlign] = useState<string>(parsedStyle().align ?? "left");
  const [bg, setBg] = useState<string>(parsedStyle().bg ?? "transparent");
  const [size, setSize] = useState<string>(parsedStyle().size ?? "md");

  return (
    <div className="p-4 space-y-3">
      {section.blockType !== "divider" && (
        <>
          <Field label="Başlık">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
            />
          </Field>
          {(section.blockType === "text" ||
            section.blockType === "hero" ||
            section.blockType === "twoColumn" ||
            section.blockType === "cta") && (
            <Field label="İçerik">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
              />
            </Field>
          )}
        </>
      )}

      {section.blockType === "divider" && (
        <p className="text-xs text-[#5b5f58]">Bölücü — yalnızca başlık kullanılabilir.</p>
      )}

      {["image", "gallery", "hero", "twoColumn", "video", "cta"].includes(section.blockType) && (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Görsel / Medya URL">
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/images/... veya /uploads/..."
              className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Alt metin">
            <input
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
            />
          </Field>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        <Field label="Hizalama">
          <select value={align} onChange={(e) => setAlign(e.target.value)} className="w-full rounded border border-[#e2dccd] px-2 py-2 text-sm bg-white">
            <option value="left">Sol</option>
            <option value="center">Orta</option>
            <option value="right">Sağ</option>
          </select>
        </Field>
        <Field label="Arka plan">
          <input
            type="color"
            value={bg === "transparent" ? "#ffffff" : bg}
            onChange={(e) => setBg(e.target.value)}
            className="h-9 w-full rounded border border-[#e2dccd] cursor-pointer"
          />
        </Field>
        <Field label="Boyut">
          <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full rounded border border-[#e2dccd] px-2 py-2 text-sm bg-white">
            <option value="sm">Küçük</option>
            <option value="md">Orta</option>
            <option value="lg">Büyük</option>
          </select>
        </Field>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() =>
            onSave({
              title,
              content,
              imageUrl,
              imageAlt,
              style: JSON.stringify({ align, bg, size }),
            })
          }
          disabled={loading}
          className="rounded bg-[#5e6b52] text-white text-sm px-4 py-2 hover:bg-[#4c5742] disabled:opacity-60"
        >
          {loading ? "Kaydediliyor..." : "Bölümü Kaydet"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-[#5b5f58] mb-1">{label}</label>
      {children}
    </div>
  );
}
