import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

/**
 * AI Görsel Üretim Sağlayıcı Katmanı
 *
 * Bu modül, web sitesi için görsel üreten yapılandırılabilir bir köprüdür.
 * Sunucu tarafında yalnızca env değişkenlerinden okunan API anahtarlarını kullanır;
 * gizli anahtar asla istemci tarafına sızmaz.
 *
 * Desteklenen sağlayıcılar (IMG_GEN_PROVIDER env'i ile seçilir):
 *   - "openai"    : OpenAI Images API (gpt-image-1)   → IMG_GEN_OPENAI_API_KEY
 *   - "stability" : Stability AI (SD3)                → IMG_GEN_STABILITY_API_KEY
 *   - "replicate" : Replicate (FLUX)                  → IMG_GEN_REPLICATE_API_TOKEN
 *   - "http"      : Genel HTTP görsel üretim ucu       → IMG_GEN_HTTP_URL + IMG_GEN_HTTP_TOKEN
 *
 * Hiçbir sağlayıcı yapılandırılmadığında `getImageGenStatus()` status="unconfigured"
 * döndürür. Kullanıcı arayüzü bu durumu dürüst biçimde gösterir (sahte başarı değil).
 */

export type ImageGenProvider = "openai" | "stability" | "replicate" | "http";

export interface GenOptions {
  prompt: string;
  negative?: string;
  style?: string;
  palette?: string;
  aspectRatio?: string; // "16:9" | "1:1" | "4:5" | "3:2" | "9:16"
  size?: string; // "1024x1024" vb.
  category?: string;
  n?: number; // varyasyon sayısı
}

export interface GenStatus {
  configured: boolean;
  provider: ImageGenProvider | null;
  providerLabel: string | null;
  availableSizes: string[];
  message: string;
}

function getEnv(key: string): string {
  return process.env[key] ?? "";
}

/** Yapılandırılmış sağlayıcıyı döndürür (env yoksa null). */
export function getConfiguredProvider(): ImageGenProvider | null {
  const p = getEnv("IMG_GEN_PROVIDER").trim().toLowerCase();
  switch (p) {
    case "openai":
      return getEnv("IMG_GEN_OPENAI_API_KEY") ? "openai" : null;
    case "stability":
      return getEnv("IMG_GEN_STABILITY_API_KEY") ? "stability" : null;
    case "replicate":
      return getEnv("IMG_GEN_REPLICATE_API_TOKEN") ? "replicate" : null;
    case "http":
      return getEnv("IMG_GEN_HTTP_URL") ? "http" : null;
    default:
      return null;
  }
}

export function getImageGenStatus(): GenStatus {
  const provider = getConfiguredProvider();
  const map: Record<ImageGenProvider, string> = {
    openai: "OpenAI Images (gpt-image-1)",
    stability: "Stability AI (SD3)",
    replicate: "Replicate (FLUX)",
    http: "Özel HTTP Ucu",
  };
  return {
    configured: !!provider,
    provider,
    providerLabel: (provider && map[provider]) || null,
    availableSizes:
      provider === "openai" || provider === "stability"
        ? ["1024x1024", "1536x1024", "1024x1536"]
        : provider === "replicate"
          ? ["1024x1024", "832x1216", "1216x832"]
          : ["1024x1024"],
    message: provider
      ? `${map[provider]} yapılandırılmış ve kullanıma hazır.`
      : "Görsel üretim sağlayıcısı yapılandırılmamış. /admin/ai-studio sayfasında dürüst bir durum gösterilir.",
  };
}

function resolveAspect(aspectRatio?: string, size?: string): [number, number] {
  if (size && /^\d+x\d+$/.test(size)) {
    const [w, h] = size.split("x").map(Number);
    return [w, h];
  }
  const ratios: Record<string, [number, number]> = {
    "16:9": [1536, 1024],
    "1:1": [1024, 1024],
    "4:5": [1024, 1536],
    "3:2": [1536, 1024],
    "9:16": [1024, 1536],
  };
  return ratios[aspectRatio ?? "1:1"] ?? ratios["1:1"];
}

function buildPrompt(options: GenOptions): string {
  const parts: string[] = [
    options.prompt.trim(),
    options.style ? `Sanat yönetimi: ${options.style}.` : "",
    options.palette ? `Renk paleti: ${options.palette}.` : "",
  ];
  parts.push(
    "Editoryal, ölçülü ve profesyonel bir fotoğraf estetiği. AI ile üretilmiş yazı/metin yok, logo yok, filigran yok, bozuk eller ve yüzler yok."
  );
  return parts.filter(Boolean).join(" ");
}

/** OpenAI Images API çağrısı (sunucu tarafında). */
async function generateOpenAI(options: GenOptions): Promise<string[]> {
  const key = getEnv("IMG_GEN_OPENAI_API_KEY");
  const [w, h] = resolveAspect(options.aspectRatio, options.size);
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: buildPrompt(options),
      n: options.n ?? 1,
      size: `${w}x${h}`,
      quality: "high",
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI hatası (${res.status}): ${text.slice(0, 300)}`);
  }
  const data = await res.json();
  const urls: string[] = [];
  for (const item of data.data ?? []) {
    if (item.b64_json) {
      urls.push(bufferToDataUrl(Buffer.from(item.b64_json, "base64"), "image/png"));
    } else if (item.url) {
      urls.push(item.url);
    }
  }
  if (!urls.length) throw new Error("OpenAI görsel döndürmedi.");
  return urls;
}

/** Stability AI (SD3) çağrısı. */
async function generateStability(options: GenOptions): Promise<string[]> {
  const key = getEnv("IMG_GEN_STABILITY_API_KEY");
  const [w, h] = resolveAspect(options.aspectRatio, options.size);
  const form = new FormData();
  form.append("prompt", buildPrompt(options));
  if (options.negative) form.append("negative_prompt", options.negative);
  form.append("output_format", "png");
  form.append("aspect_ratio", `${w}:${h}`);
  const res = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, Accept: "image/*" },
    body: form,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Stability hatası (${res.status}): ${text.slice(0, 300)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  return [bufferToDataUrl(buf, "image/png")];
}

/** Replicate (FLUX) çağrısı — yoklama tabanlı. */
async function generateReplicate(options: GenOptions): Promise<string[]> {
  const token = getEnv("IMG_GEN_REPLICATE_API_TOKEN");
  const version = process.env.IMG_GEN_REPLICATE_MODEL ?? "black-forest-labs/flux-schnell";
  const create = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Prefer: "wait",
    },
    body: JSON.stringify({
      version,
      input: { prompt: buildPrompt(options), num_outputs: options.n ?? 1 },
    }),
  });
  if (!create.ok) {
    const text = await create.text();
    throw new Error(`Replicate hatası (${create.status}): ${text.slice(0, 300)}`);
  }
  const pred = await create.json();
  const output: unknown = pred.output;
  if (Array.isArray(output) && output.every((x) => typeof x === "string")) {
    return output as string[];
  }
  throw new Error("Replicate: üretim sonucu beklenen biçimde dönmedi.");
}

/** Genel HTTP ucu — POST JSON {prompt,...} → {images:[{url|b64_json }]} alma biçimi. */
async function generateHttp(options: GenOptions): Promise<string[]> {
  const url = getEnv("IMG_GEN_HTTP_URL");
  const token = getEnv("IMG_GEN_HTTP_TOKEN");
  const [w, h] = resolveAspect(options.aspectRatio, options.size);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      prompt: buildPrompt(options),
      negative_prompt: options.negative,
      size: `${w}x${h}`,
      n: options.n ?? 1,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ucu hatası (${res.status}): ${text.slice(0, 300)}`);
  }
  const data = await res.json();
  const arr: unknown[] = Array.isArray(data.images) ? data.images : Array.isArray(data) ? data : [];
  return arr.map((x: any) => {
    if (typeof x === "string") return x;
    if (x.url) return x.url;
    if (x.b64_json) return bufferToDataUrl(Buffer.from(x.b64_json, "base64"), "image/png");
    throw new Error("HTTP ucu beklenen yapıda görsel döndürmedi.");
  });
}

function bufferToDataUrl(buf: Buffer, mime: string): string {
  return `data:${mime};base64,${buf.toString("base64")}`;
}

/** Üretimi çalıştırır ve sonuç URL'lerini (data url / http url) döndürür. */
export async function runImageGeneration(options: GenOptions): Promise<string[]> {
  const provider = getConfiguredProvider();
  if (!provider) {
    throw new Error(
      "Görsel üretim sağlayıcısı yapılandırılmamış. IMG_GEN_PROVIDER ve ilgili anahtar env'lerini sunucuda ayarlayın."
    );
  }
  switch (provider) {
    case "openai":
      return generateOpenAI(options);
    case "stability":
      return generateStability(options);
    case "replicate":
      return generateReplicate(options);
    case "http":
      return generateHttp(options);
    default:
      throw new Error("Bilinmeyen sağlayıcı.");
  }
}

/**
 * Verilen görsel verisini (data url / http url / public altı dosya yolu)
 * projenin `public/images/ai` dizinine indirir, MediaAsset kaydı oluşturur ve
 * isteğe bağlı olarak üretim sonucuna bağlar.
 */
export async function saveGeneratedAsset(
  sourceDataUrl: string,
  meta: {
    fileName: string;
    altText?: string;
    caption?: string;
    generationId?: string;
    assetId?: string;
    category?: string;
  }
): Promise<{ assetId: string; url: string }> {
  let buffer: Buffer;
  let mimeType = "image/png";
  if (sourceDataUrl.startsWith("data:")) {
    const m = sourceDataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!m) throw new Error("Boş veya geçersiz görsel verisi.");
    mimeType = m[1].split(";")[0];
    buffer = Buffer.from(m[2], "base64");
  } else if (sourceDataUrl.startsWith("http")) {
    const res = await fetch(sourceDataUrl);
    if (!res.ok) throw new Error(`Uzaktaki görsele ulaşılamadı (${res.status}).`);
    mimeType = (res.headers.get("content-type") ?? "image/png").split(";")[0];
    buffer = Buffer.from(await res.arrayBuffer());
  } else {
    const p = path.join(process.cwd(), "public", sourceDataUrl.replace(/^\/+/, ""));
    if (!fs.existsSync(p)) throw new Error("Görsel dosyası bulunamadı.");
    buffer = fs.readFileSync(p);
    mimeType = mimeTypeFromExt(p);
  }

  const ext = extFromMime(mimeType);
  const dir = path.join(process.cwd(), "public", "images", "ai");
  fs.mkdirSync(dir, { recursive: true });
  const safeName = (meta.fileName || "gen").replace(/[^a-z0-9_-]/gi, "-").toLowerCase();
  const filename = `${Date.now()}-${safeName}.${ext}`;
  fs.writeFileSync(path.join(dir, filename), buffer);
  const url = `/images/ai/${filename}`;
  const sizeBytes = buffer.length;
  const [w, h] = guessDimensions(buffer, mimeType);
  const category = meta.category ?? "";

  const existing = meta.assetId
    ? await prisma.mediaAsset.findUnique({ where: { id: meta.assetId } })
    : null;

  const asset = existing
    ? await prisma.mediaAsset.update({
        where: { id: existing.id },
        data: {
          fileName: filename,
          url,
          mimeType,
          sizeBytes,
          width: w ?? existing.width,
          height: h ?? existing.height,
          source: "ai",
          isAi: true,
          altText: meta.altText ?? existing.altText,
          caption: meta.caption ?? existing.caption,
        },
      })
    : await prisma.mediaAsset.create({
        data: {
          fileName: filename,
          url,
          mimeType,
          sizeBytes,
          width: w,
          height: h,
          source: "ai",
          isAi: true,
          altText: meta.altText,
          caption: meta.caption,
        },
      });

  if (meta.generationId) {
    await prisma.aIGenerationResult.updateMany({
      where: { generationId: meta.generationId, assetId: null },
      data: { assetId: asset.id, url: asset.url },
    });
  }

  // Ek metadatasını (category) generation'a yansıt — zaten kayıt anında yazılır.
  void category;

  return { assetId: asset.id, url: asset.url };
}

function mimeTypeFromExt(filepath: string): string {
  const ext = path.extname(filepath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    default:
      return "image/png";
  }
}

function extFromMime(mime: string): string {
  if (mime.includes("jpeg")) return "jpg";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("gif")) return "gif";
  if (mime.includes("avif")) return "avif";
  return "png";
}

function guessDimensions(buf: Buffer, mime: string): [number | null, number | null] {
  try {
    if (mime.includes("png") && buf.length > 24) {
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      if (width > 0 && height > 0) return [width, height];
    }
    if (mime.includes("jpeg") && buf.length > 20) {
      let offset = 2;
      while (offset < buf.length) {
        if (buf[offset] !== 0xff) {
          offset++;
          continue;
        }
        const marker = buf[offset + 1];
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8) {
          const height = buf.readUInt16BE(offset + 5);
          const width = buf.readUInt16BE(offset + 7);
          if (width > 0 && height > 0) return [width, height];
        }
        const len = buf.readUInt16BE(offset + 2);
        offset += 2 + len;
      }
    }
  } catch {
    /* yok say */
  }
  return [null, null];
}
