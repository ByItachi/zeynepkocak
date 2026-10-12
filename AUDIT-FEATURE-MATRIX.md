# ÖZELLİK MATRİSİ — Zeynep Koçak Psikolog Web Sitesi

**Tarih:** 2026-10-12
**Durum açıklaması:** ✅ Çalışıyor (test edildi) | ✔ Mevcut (kod/şema, canlı test edilmedi) | ⚠ Kısmi | ❌ Eksik

## Public site

| Özellik | Durum | Backend | DB | Not |
|---|---|---|---|---|
| Ana sayfa | ✅ | — | Ayarlar | 200 |
| Hakkımda | ✅ | — | Ayarlar | 200 |
| Uzmanlık/hizmet sayfaları | ✅ | — | — | Statik, 200 |
| Blog listesi + detay | ✅ | — | Post | 200 |
| SSS | ✅ | — | — | 200 |
| İletişim formu | ✔ | `/api/iletisim`? → ContactMessage | ✅ | Tam otomasyon test edilmedi |
| Randevu formu | ✔ | Appointment | ✅ | Tam otomasyon test edilmedi |
| Telefon/e-posta/WhatsApp/Sosyal | ✅ | — | Ayarlar | FloatingButons/Footer |
| Gizlilik/KVKK/Çerez | ⚠ | — | Page | Metinler **DEMO placeholder**; hukuki içerik eksik |
| 404 | ✅ | — | — | 404 döndürüyor |
| 500 | ✔ | — | — | Özel sayfa test edilmedi |
| Bülten abone | ✅ | `/api/newsletter` | ✅ | Rate-limit'li |
| Lisans kapısı | ✅ | `/api/license/check` | License | Tüm public rotalar duvarlı |

## Admin panel

| Modül | Durum | DB | Not |
|---|---|---|---|
| Dashboard | ✅ | Gerçek sayaçlar | Test edildi (login sonrası) |
| Sayfa yönetimi | ✅ | Page | **Uçtan uca CRUD test edildi** |
| Blog yönetimi | ✔ | Post | zod + audit; canlı test edilmedi |
| Sayfa editörü (bölüm) | ✔ | PageSection | Canlı test edilmedi |
| Menü yönetimi | ✔ | MenuItem | Canlı test edilmedi |
| Medya kütüphanesi | ✅ | MediaAsset | Upload uçtan uca test edildi (SEC-02) |
| AI görsel stüdyosu | ⚠ | AIGeneration | Sağlayıcı yapılandırılmamış → 503 dürüst |
| Tema & tasarım | ✔ | DesignSetting | Canlı test edilmedi |
| Randevu talepleri | ✔ | Appointment | Status güncelleme, rol korumalı |
| Mesajlar | ✔ | ContactMessage | toggleRead/delete |
| İş birliği | ✔ | CollaborationRequest | Canlı test edilmedi |
| Bülten yönetimi | ✔ | NewsletterSubscriber | Canlı test edilmedi |
| Site ayarları | ✔ | SiteSetting | Canlı test edilmedi |
| Entegrasyonlar | ✔ | IntegrationSetting | Bağlı değil |
| Kullanıcılar & roller | ✔ | User | SUPER_ADMIN korumalı |

## Eksik özellikler (gerçekten gerekli geliştirmeler)

- **KVKK/Gizlilik metinleri demo placeholder** → hukuki uzmanla tamamlanmalı (P1, hukuki).
- **Public formlarda spam/koruma:** honeypot/rate-limit var mı değerlendirilmeli (randevu/iletişim).
- **Blog/SEO metadata:** sayfa bazlı unique title/description eksik (SEO raporu).
- **E-posta bildirimi:** randevu/mesaj için SMTP yapılandırması yok.

## Gereksiz/legacy

- `Admin`/`AdminSession` auth sistemi artık kullanılmıyor → temizlenmeli.
- Kurulu ama kullanılmayan: `next-intl`, `jose` (özel auth tercih edilmiş).
