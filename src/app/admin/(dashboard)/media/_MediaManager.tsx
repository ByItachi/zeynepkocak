"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Asset {
  id: string;
  fileName: string;
  url: string;
  altText: string | null;
  caption: string | null;
  mimeType: string;
  sizeBytes: number;
  source: string;
  isAi: boolean;
  focusX: number | null;
  focusY: number | null;
  usages: { refType: string; refId: string; field: string }[];
}

type Filter = "all" | "image" | "video" | "ai" | "unused";

export default function MediaManager({ assets }: { assets: Asset[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [addingExternal, setAddingExternal] = useState(false);

  // Kullanım araması
  function usedCount(assetId: string) {
    return assets.find((a) => a.id === assetId)?.usages.length ?? 0;
  }

  const filtered = assets.filter((a) => {
    const isImage = a.mimeType.startsWith("image");
    if (filter === "image") return isImage;
    if (filter === "video") return a.mimeType.startsWith("video");
    if (filter === "ai") return a.isAi;
    if (filter === "unused") return usedCount(a.id) === 0;
    return true;
  });

  async function handleUpload() {
    const file = inputRef.current?.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/media/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Yükleme başarısız.");
        return;
      }
      if (inputRef.current) inputRef.current.value = "";
      router.refresh();
    } catch {
      setError("Sunucuya ulaşılamadı.");
    } finally {
      setLoading(false);
    }
  }

  async function addExternal() {
    if (!externalUrl.trim()) return;
    setAddingExternal(true);
    setError(null);
    try {
      const res = await fetch("/api/media/external", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: externalUrl.trim(), category: "other" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Eklenemedi.");
        return;
      }
      setExternalUrl("");
      router.refresh();
    } catch {
      setError("Sunucuya ulaşılamadı.");
    } finally {
      setAddingExternal(false);
    }
  }

  async function updateAsset(
    id: string,
    altText: string,
    caption: string,
    focusX?: number | null,
    focusY?: number | null
  ) {
    const body: Record<string, unknown> = { id, altText, caption };
    if (focusX !== undefined && focusX !== null) body.focusX = focusX;
    if (focusY !== undefined && focusY !== null) body.focusY = focusY;
    await fetch("/api/media/asset", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    router.refresh();
  }

  async function deleteAsset(id: string) {
    if (usedCount(id) > 0) {
      const ok = window.confirm(
        "Bu öğe içerikte kullanılıyor olabilir. Yine de silmek istiyor musunuz?"
      );
      if (!ok) return;
    } else {
      const ok = window.confirm("Bu öğeyi silmek istediğinize emin misiniz?");
      if (!ok) return;
    }
    const res = await fetch(`/api/media/asset?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const d = await res.json().catch(() => null);
      setError(d?.error || "Silme başarısız.");
      return;
    }
    router.refresh();
  }

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "Tümü" },
    { key: "image", label: "Görseller" },
    { key: "video", label: "Videolar" },
    { key: "ai", label: "AI Üretimi" },
    { key: "unused", label: "Kullanılmayan" },
  ];

  return (
    <div>
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 mb-4">{error}</p>
      )}

      {/* Yükleme + URL */}
      <div className="bg-white border border-[#e2dccd] rounded-lg p-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">Dosya Yükle</label>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/mp4,video/webm"
            onChange={handleUpload}
            disabled={loading}
            className="text-sm"
          />
          <p className="text-xs text-[#5b5f58] mt-2">
            JPEG, PNG, WEBP, GIF, AVIF — görsel 8MB; MP4/WebM video maks. 80MB.
          </p>
        </div>
        <div>
          <label className="block text-sm text-[#5b5f58] mb-1">URL ile Görsel Ekle</label>
          <div className="flex gap-2">
            <input
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://example.com/gorsel.jpg"
              className="flex-1 rounded border border-[#e2dccd] px-3 py-2 text-sm"
            />
            <button
              onClick={addExternal}
              disabled={addingExternal}
              className="rounded border border-[#5e6b52] text-[#5e6b52] text-xs px-3 py-2 hover:bg-[#f1ece2] disabled:opacity-50"
            >
              Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Filtreler */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`rounded-full px-4 py-1.5 text-xs ${
              filter === t.key
                ? "bg-[#5e6b52] text-white"
                : "bg-white border border-[#e2dccd] text-[#5b5f58] hover:bg-[#f1ece2]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Izgara */}
      {filtered.length === 0 ? (
        <p className="text-sm text-[#5b5f58]">Bu filtre için öğe yok.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((a) => (
            <MediaCard
              key={a.id}
              asset={a}
              usedCount={usedCount(a.id)}
              onDelete={() => deleteAsset(a.id)}
              onUpdate={(alt, cap, fx, fy) => updateAsset(a.id, alt, cap, fx, fy)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MediaCard({
  asset,
  usedCount,
  onDelete,
  onUpdate,
}: {
  asset: Asset;
  usedCount: number;
  onDelete: () => void;
  onUpdate: (alt: string, cap: string, fx?: number | null, fy?: number | null) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [setFocus, setSetFocus] = useState(false);
  const [alt, setAlt] = useState(asset.altText ?? "");
  const [cap, setCap] = useState(asset.caption ?? "");
  const [fx, setFx] = useState<number | null>(asset.focusX ?? null);
  const [fy, setFy] = useState<number | null>(asset.focusY ?? null);
  const isVideo = asset.mimeType.startsWith("video");
  const isImage = asset.mimeType.startsWith("image");

  function handleImageClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!editing || !setFocus || !isImage) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setFx(x);
    setFy(y);
  }

  return (
    <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden flex flex-col">
      <div
        className={`relative aspect-square bg-[#f1ece2] ${setFocus && editing ? "cursor-crosshair ring-2 ring-[#5e6b52] inset-0" : ""}`}
        onClick={handleImageClick}
      >{isVideo ? (
        <video src={asset.url} className="absolute inset-0 w-full h-full object-cover" muted />
      ) : isImage ? (
        <Image
          src={asset.url}
          alt={asset.altText ?? asset.fileName}
          fill
          sizes="200px"
          className="object-cover"
          style={fx !== null && fy !== null ? { objectPosition: `${fx * 100}% ${fy * 100}%` } : undefined}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[#5b5f58] text-xs px-2 text-center">
          {asset.mimeType || "dosya"}
        </div>
      )}
      {fx !== null && fy !== null && isImage && (
        <span
          className="absolute w-3 h-3 bg-white border-2 border-[#5e6b52] rounded-full pointer-events-none"
          style={{ left: `${fx * 100}%`, top: `${fy * 100}%`, transform: "translate(-50%,-50%)" }}
        />
      )}
      {asset.isAi && (
        <span className="absolute top-2 left-2 bg-[#5e6b52] text-white text-[10px] px-2 py-0.5 rounded-full">
          AI
        </span>
      )}
      {usedCount === 0 && (
        <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full">
          Kullanılmıyor
        </span>
      )}
    </div>

    <div className="p-2 text-xs flex flex-col gap-1 flex-1">
      <p className="text-[#2f332e] truncate" title={asset.url}>
        {asset.fileName}
      </p>
      <p className="text-[#5b5f58]">
        {asset.mimeType.slice(0, 18)} · {(asset.sizeBytes / 1024).toFixed(0)} KB · {usedCount} kullanım
      </p>

      {editing ? (
        <div className="space-y-1 mt-1">
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Alt metin (erişilebilirlik)"
            className="w-full rounded border border-[#e2dccd] px-2 py-1"
          />
          <input
            value={cap}
            onChange={(e) => setCap(e.target.value)}
            placeholder="Başlık / açıklama"
            className="w-full rounded border border-[#e2dccd] px-2 py-1"
          />
          <div className="flex flex-wrap gap-2">
            {isImage && (
              <button
                type="button"
                onClick={() => setSetFocus((p) => !p)}
                className={`rounded border px-2 py-1 ${setFocus ? "bg-[#5e6b52] text-white border-[#5e6b52]" : "border-[#e2dccd]"}`}
                title="Görsele tıklayıp odak noktasını seçin"
              >
                {setFocus ? "Odak: görsele tıkla" : "Odak noktası"}
              </button>
            )}
            <button
              onClick={() => {
                onUpdate(alt, cap, fx, fy);
                setEditing(false);
                setSetFocus(false);
              }}
              className="rounded bg-[#5e6b52] text-white px-2 py-1"
            >
              Kaydet
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setSetFocus(false);
              }}
              className="rounded border border-[#e2dccd] px-2 py-1"
            >
              İptal
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => {
              setAlt(asset.altText ?? "");
              setCap(asset.caption ?? "");
              setFx(asset.focusX ?? null);
              setFy(asset.focusY ?? null);
              setEditing(true);
            }}
            className="rounded border border-[#e2dccd] px-2 py-1 hover:bg-[#f1ece2]"
          >
            Düzenle
          </button>
          <button onClick={onDelete} className="rounded border border-red-200 text-red-700 px-2 py-1 hover:bg-red-50">
            Sil
          </button>
        </div>
      )}
    </div>
  </div>
  );
}
