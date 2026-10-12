# VERİTABANI ENVANTERİ VE BÜTÜNLÜK — Zeynep Koçak Psikolog Web Sitesi

**Tarih:** 2026-10-12
**Motor:** SQLite (Prisma 6.1.0). Üretim için PostgreSQL'e geçiş şema-compatible (yorum notu schema'da mevcut).

## Modeller (şema)

User, Session, Profile, Page, Post, PostCategory, PostTag, PostTagMap, MediaAsset, SiteSetting, SeoMetadata, CollaborationRequest, ContactMessage, MenuItem, Appointment, NewsletterSubscriber, Admin (legacy), AdminSession (legacy), License, AuditLog, IntegrationSetting, AssetUsage, AIGeneration, AIGenerationResult, PageSection, DesignSetting.

## Mevcut veri (audit anı)

| Tablo | Kayıt |
|---|---|
| User | 1 (SUPER_ADMIN `admin@zeyneppsikolog.local`) |
| Admin (legacy) | 1 (`admin`) |
| Page | 1 (gizlilik-politikasi) |
| Post | 1 (demo) |
| MediaAsset | 16 |
| License | 1 (demo) |
| Appointment | 1 |
| AuditLog | 21 |

## Bütünlük kontrolleri (test edildi)

| Kontrol | Sonuç |
|---|---|
| Primary key (cuid) | ✅ Tüm modellerde |
| Unique constraint — Page.slug | ✅ P2002 ile reddedildi (kopya insert) |
| Unique — User.email, Post.slug, MenuItem, License.key, NewsletterSubscriber.email | ✅ şemada @unique |
| Foreign key (onDelete Cascade) | ✅ Session→User, PostTagMap→Post/Tag, AdminSession→Admin, AssetUsage→MediaAsset |
| NOT NULL zorunlu alanlar | ✅ Page.slug/title/content, Post.title/content vb. |
| CRUD + kalıcılık | ✅ (CRUD raporu) |
| Test verisi temizliği | ✅ Tüm test kayıtları silindi |

## İlişkiler ve silme davranışı

- `Session`, `AdminSession`, `AssetUsage`, `PostTagMap` → `onDelete: Cascade` (ana kayıt silinince bağlı kayıtlar temizlenir).
- `Post.author`, `CollaborationRequest.user`, `AuditLog.user` → optional FK (nullable).
- `MediaAsset` silmede dosya da diskten silinir (`/api/media/asset` DELETE), path-traversal korumalı (`startsWith(public)`).

## Bulgular

- **Legacy `Admin`/`AdminSession` tabloları** artık kullanılmıyor (SEC-01). Üretim öncesi temizlenmeli.
- **SQLite enum yok:** roller/durumlar string; uygulama kodunda sabit değerlerle tutarlı. PostgreSQL'e geçerken enum'a çevrilebilir.
- Şema migration'ı için `prisma migrate` kullanılmalı; mevcut `dev.db` üzerinde kontrolsüz migrate çalıştırılmadı (veri koruma kuralı).

## Eksikler / öneriler

- `SeoMetadata` modeli tanımlı ama public sayfa metadata'sı büyük ölçüde statik root-layout'tan geliyor (SEO raporu).
- Bazı tablolar (MenuItem, DesignSetting, PageSection) için indeks optimizasyonu üretim veri hacminde değerlendirilmeli.
