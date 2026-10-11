"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Status {
  configured: boolean;
  provider: string | null;
  providerLabel: string | null;
  availableSizes: string[];
  message: string;
}

interface GenResult {
  id: string;
  url: string | null;
}
interface Generation {
  id: string;
  prompt: string;
  status: string;
  error: string | null;
  createdAt: Date;
  results: GenResult[];
}
interface Asset {
  id: string;
  url: string;
  altText: string | null;
}

const CATEGORIES = [
  { value: "hero", label: "Hero / Kapak" },
  { value: "about", label: "Hakkımda" },
  { value: "group", label: "Grup Atölyesi" },
  { value: "workshop", label: "Çalışma Alanları" },
  { value: "service", label: "Hizmetler" },
  { value: "blog", label: "Blog Görseli" },
  { value: "contact", label: "İletişim" },
  { value: "og", label: "Sosyal Paylaşım / OG" },
  { value: "other", label: "Diğer" },
];

const SUGGESTED: { category: string; prompt: string }[] = [
  {
    category: "hero",
    prompt:
      "Sakin, sıcak ve profesyonel bir psikoloji çalışma ofisi iç mekânı; ahşap tonlar, bir bitki, soft gün ışığı, boş koltuk, ortam ferah ve davetkâr. Ev boyutu 4:5, editoryal fotoğraf.",
  },
  {
    category: "about",
    prompt:
      "Türk, otuzlu yaşlarında, güler yüzlü, doğal saçlı bir kadın psikolog portresi; yumuşak ışık, nötr arka plan, omuz üstü çekim, profesyonel ve samimi ifade.",
  },
  {
    category: "group",
    prompt:
      "Dairesel oturma düzeninde, sıcak ışıkta bir grup terapi atölyesinin boş halinden genel bir atmosfer; lider sandalyesi ve grup sandalyeleri, psikodrama sahne alanı hissi.",
  },
  {
    category: "service",
    prompt:
      "Doğa ile bağlantılı dingin bir simge konsepti: iki el, açık kalpler ve çiçek sapı ile rahatlayan vektörel illüstrasyon, yumuşak pastel palet. Dekoratif, ölçülü.",
  },
  {
    category: "contact",
    prompt:
      "Modern, aydınlık bir psikolog resepsiyon/ofis kapısı; bitkiler, doğal ahşap, minimal, davetkâr giriş görünümü.",
  },
];

export default function AiStudio({
  status,
  history,
  assets,
}: {
  status: Status;
  history: Generation[];
  assets: Asset[];
}) {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [negative, setNegative] = useState("");
  const [style, setStyle] = useState("");
  const [palette, setPalette] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [category, setCategory] = useState("hero");
  const [n, setN] = useState(1);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [currentGen, setCurrentGen] = useState<{ id: string; results: GenResult[] } | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  async function generate() {
    if (!prompt.trim()) return;
    setBusy(true);
    setNotice(null);
    setCurrentGen(null);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          negative,
          style,
          palette,
          aspectRatio,
          category,
          n,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNotice(data.error || "Üretim başarısız.");
        return;
      }
      setCurrentGen({ id: data.generationId, results: data.results });
      router.refresh();
    } catch {
      setNotice("Sunucuya ulaşılamadı.");
    } finally {
      setBusy(false);
    }
  }

  async function saveResult(resultId: string, fileName: string) {
    setSaving(resultId);
    setNotice(null);
    try {
      const res = await fetch("/api/ai/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resultId,
          fileName: fileName || "generated",
          altText: prompt,
          caption: `${category} görseli — AI`,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNotice(data.error || "Kaydetme başarısız.");
        return;
      }
      setNotice("Görsel medya kütüphanesine eklendi.");
      router.refresh();
    } catch {
      setNotice("Sunucuya ulaşılamadı.");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sol: üretim formu */}
      <div className="lg:col-span-1">
        <div
          className={`rounded-lg border p-5 ${status.configured ? "border-[#cfe3cf] bg-[#f4faf4]" : "border-amber-200 bg-amber-50"}`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide mb-1">
            {status.configured ? "● Bağlı" : "○ Bağlı değil"}
          </p>
          <p className="text-sm">
            {status.configured ? status.providerLabel : "Görsel üretim sağlayıcısı sunucuda yapılandırılmamış."}
          </p>
          {!status.configured && (
            <p className="text-xs mt-2 text-amber-800">
              Kurulum: <code className="bg-white rounded px-1">IMG_GEN_PROVIDER</code> (openai | stability |
              replicate | http) ve ilgili anahtar env değişkenini <code className="bg-white rounded px-1">.env</code>{" "}
              dosyasında sunucu tarafında tanımlayın. Anahtarlar istemciye asla gönderilmez.
            </p>
          )}
        </div>

        <div className="bg-white border border-[#e2dccd] rounded-lg p-5 mt-4 space-y-4">
          <div>
            <label className="block text-sm text-[#5b5f58] mb-1">Görsel İpucu (Prompt)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="Üretmek istediğiniz sahneyi/görseli tarif edin..."
              className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-[#5b5f58] mb-1">İstemeyeceğiniz unsurlar (opsiyonel)</label>
            <input
              value={negative}
              onChange={(e) => setNegative(e.target.value)}
              className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[#5b5f58] mb-1">Stil</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm bg-white"
              >
                <option value="">Fotoğraf</option>
                <option value="İllüstrasyon, vektörel">İllüstrasyon</option>
                <option value="Suluboya">Suluboya</option>
                <option value="Minimal, temiz, bol boşluk">Minimal</option>
                <option value="Karakteristik, el çizimi">El çizimi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#5b5f58] mb-1">Palet</label>
              <input
                value={palette}
                onChange={(e) => setPalette(e.target.value)}
                placeholder="örn. zeytin yeşili, kum, boz"
                className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-[#5b5f58] mb-1">En-Boy</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm bg-white"
              >
                <option value="1:1">Kare (1:1)</option>
                <option value="16:9">Geniş (16:9)</option>
                <option value="4:5">Dikey (4:5)</option>
                <option value="3:2">Fotoğraf (3:2)</option>
                <option value="9:16">Hikâye (9:16)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#5b5f58] mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#5b5f58] mb-1">Varyasyon</label>
            <select
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm bg-white"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={4}>4</option>
            </select>
          </div>
          <button
            onClick={generate}
            disabled={busy || !status.configured}
            className="w-full rounded bg-[#5e6b52] text-white text-sm px-4 py-2.5 hover:bg-[#4c5742] disabled:opacity-50"
          >
            {busy ? "Üretiliyor..." : status.configured ? "Görsel Üret" : "Sağlayıcı Gerekli"}
          </button>
          {notice && <p className="text-xs text-[#8a5a20] bg-amber-50 border border-amber-200 rounded px-3 py-2">{notice}</p>}
        </div>

        {/* Hazır öneriler */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold mb-2">Önerilen İpuçları</h2>
          <div className="space-y-2">
            {SUGGESTED.map((s) => (
              <button
                key={s.prompt.slice(0, 30)}
                onClick={() => {
                  setPrompt(s.prompt);
                  setCategory(s.category);
                }}
                className="block w-full text-left text-xs text-[#5b5f58] bg-white border border-[#e2dccd] rounded px-3 py-2 hover:bg-[#f1ece2]"
              >
                {s.prompt.slice(0, 110)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orta: güncel üretim sonuçları */}
      <div className="lg:col-span-1">
        <h2 className="text-sm font-bold mb-3">Bu Üretim</h2>
        {currentGen ? (
          <div className="grid grid-cols-1 gap-4">
            {currentGen.results.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden p-3 flex flex-col gap-2"
              >
                {r.url && (
                  <div className="relative aspect-square rounded bg-[#f1ece2]">
                    <Image src={r.url} alt="üretilen görsel" fill className="object-cover rounded" sizes="300px" unoptimized />
                  </div>
                )}
                <button
                  onClick={() => saveResult(r.id, `${category}-${aspectRatio.replace(":", "x")}`)}
                  disabled={saving === r.id}
                  className="rounded bg-[#5e6b52] text-white text-xs px-3 py-2 hover:bg-[#4c5742] disabled:opacity-50"
                >
                  {saving === r.id ? "Kaydediliyor..." : "Medyaya Kaydet"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#5b5f58]">Henüz bu oturumda üretim yapılmadı.</p>
        )}

        <h2 className="text-sm font-bold mt-8 mb-3">AI Üretim Geçmişi</h2>
        <div className="space-y-3">
          {history.map((g) => (
            <div key={g.id} className="bg-white border border-[#e2dccd] rounded-lg p-3 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#5b5f58]">
                  {new Date(g.createdAt).toLocaleString("tr-TR")}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full ${
                    g.status === "SUCCESS"
                      ? "bg-green-100 text-green-800"
                      : g.status === "ERROR"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {g.status === "SUCCESS" ? "Başarılı" : g.status === "ERROR" ? "Hata" : g.status}
                </span>
              </div>
              <p className="text-[#2f332e] mb-1">{g.prompt.slice(0, 140)}</p>
              {g.error && <p className="text-red-700">{g.error.slice(0, 160)}</p>}
            </div>
          ))}
          {history.length === 0 && <p className="text-sm text-[#5b5f58]">Üretim geçmişi boş.</p>}
        </div>
      </div>

      {/* Sağ: kütüphanedeki AI görselleri */}
      <div className="lg:col-span-1">
        <h2 className="text-sm font-bold mb-3">Kütüphanedeki AI Görselleri</h2>
        {assets.length === 0 ? (
          <p className="text-sm text-[#5b5f58]">Henüz AI görseli kaydedilmedi.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {assets.map((a) => (
              <div key={a.id} className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden">
                <div className="relative aspect-square bg-[#f1ece2]">
                  <Image src={a.url} alt={a.altText ?? ""} fill sizes="180px" className="object-cover" unoptimized />
                </div>
                <p className="text-[10px] text-[#5b5f58] px-2 py-1 truncate">{a.altText ?? a.url}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
