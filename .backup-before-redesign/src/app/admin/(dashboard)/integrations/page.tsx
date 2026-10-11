import { prisma } from "@/lib/prisma";
import IntegrationCard from "./_IntegrationCard";

export const dynamic = "force-dynamic";

const DEFS: Record<string, { title: string; description: string; fields: { name: string; label: string }[] }> = {
  google_analytics: {
    title: "Google Analytics 4",
    description: "Trafik ve dönüşüm verilerini görmek için GA4 ölçüm kimliğini girin.",
    fields: [{ name: "measurementId", label: "Measurement ID (G-XXXXXXX)" }],
  },
  google_ads: {
    title: "Google Ads Dönüşüm Takibi",
    description: "Form gönderimi ve bülten kaydı gibi olayları Google Ads'e bildirmek için dönüşüm kimliğini girin.",
    fields: [
      { name: "conversionId", label: "Dönüşüm Kimliği" },
      { name: "conversionLabel", label: "Dönüşüm Etiketi" },
    ],
  },
  search_console: {
    title: "Google Search Console",
    description: "Site doğrulama kodu ve sitemap gönderimi için kullanılır.",
    fields: [{ name: "verificationCode", label: "Doğrulama Kodu" }],
  },
  instagram: {
    title: "Instagram Graph API",
    description:
      "Profesyonel Instagram hesabı + Facebook sayfası bağlantısı ve uzun ömürlü erişim belirteci gerektirir.",
    fields: [
      { name: "appId", label: "App ID" },
      { name: "appSecret", label: "App Secret" },
      { name: "accessToken", label: "Access Token" },
    ],
  },
  smtp: {
    title: "SMTP (E-posta Gönderimi)",
    description: "İletişim/iş birliği bildirimleri ve şifre sıfırlama e-postaları için SMTP bilgileri.",
    fields: [
      { name: "host", label: "SMTP Host" },
      { name: "port", label: "Port" },
      { name: "user", label: "Kullanıcı Adı" },
      { name: "password", label: "Şifre" },
    ],
  },
};

export default async function AdminIntegrationsPage() {
  const rows = await prisma.integrationSetting.findMany();
  const byProvider = Object.fromEntries(rows.map((r) => [r.provider, r]));

  return (
    <div>
      <h1 className="text-2xl font-serif mb-1">Entegrasyonlar</h1>
      <p className="text-sm text-[#5b5f58] mb-6">
        Kimlik bilgisi girilmeden hiçbir entegrasyon &quot;bağlı&quot; olarak işaretlenmez; sahte veri
        gösterilmez. Bilgileri kaydettikten sonra canlı bağlantı testi ayrıca yapılmalıdır.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Object.entries(DEFS).map(([provider, def]) => (
          <IntegrationCard
            key={provider}
            provider={provider}
            title={def.title}
            description={def.description}
            fields={def.fields}
            isConnected={byProvider[provider]?.isConnected ?? false}
            lastError={byProvider[provider]?.lastError ?? null}
          />
        ))}
      </div>
    </div>
  );
}
