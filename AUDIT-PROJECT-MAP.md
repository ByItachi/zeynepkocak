# PROJE HARİTASI — Zeynep Koçak Psikolog Web Sitesi

**Tarih:** 2026-10-12

## Teknoloji yığını

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16.4.0 (App Router, Server Actions) |
| UI | React 19.3.0, Tailwind CSS 4 |
| Backend | Next.js API route'ları + Server Actions (Node runtime) |
| Veritabanı | SQLite (Prisma 6.1.0 ORM); üretimde PostgreSQL'e geçiş şema-compatible |
| Auth | Özel: bcrypt (cost 12) + token-hash session cookie (`jose` mevcut) |
| Validation | zod |
| i18n | next-intl (kurulu) |
| Build | `next build` (Turbopack), `next dev` |

## Dosya/dizin yapısı (kritik)

```
src/
  middleware.ts              # Lisans + oturum kapısı (public rotalar lisans-duvarlı)
  lib/
    prisma.ts                # Prisma client singleton
    auth.ts                  # User-auth: createSession/getCurrentUser (zdr_session)
    roles.ts                 # ROLES, canAccessAdmin, isSuperAdmin
    admin-auth.ts            # LEGACY Admin-auth (artık kullanılmıyor)
    audit.ts                 # logAudit → AuditLog
    design.ts, settings.ts   # Tema/ayar okuma
    imagegen.ts              # AI görsel üretici + saveGeneratedAsset
  app/
    layout.tsx               # Root layout (SiteHeader/Footer, tema, GA)
    page.tsx                 # Ana sayfa
    [slug]/page.tsx          # DB tabanlı dinamik sayfa
    <public-pages>/          # hakkimda, blog, iletisim, randevu, sss, kvkk, ...
    license-check/           # Lisans doğrulama (public)
    admin/
      login/                 # Auth login (email)
      (dashboard)/           # Yetkili admin paneli (getCurrentUser korumalı)
        _components/AdminShell.tsx
        page.tsx, pages/, posts/, media/, menu/, editor/, theme/, ai-studio/,
        appointments/, messages/, collaborations/, newsletter/,
        settings/, integrations/, users/
    api/
      auth/login, auth/logout         # User-auth
      admin/login, admin/logout       # LEGACY
      license/check                   # Lisans + rate-limit
      media/upload, media/asset, media/external
      ai/generate, ai/save
      newsletter
prisma/
  schema.prisma              # Tüm modeller
  seed.js, seed-admin.ts, seed-license.ts
```

## Kimlik doğrulama mimarisi (audit sonrası)

- **Tek kaynak:** User-auth (`zdr_session`, `User`+`Session`+rol). Login → `/api/auth/login`.
- **Dashboard:** `getCurrentUser()` + `canAccessAdmin()`.
- **Legacy:** `Admin`/`AdminSession` + `/api/admin/*` artık kullanılmıyor (SEC-01 birleştirmesi).
- **Kapı (middleware):** Public rotalar lisans cookie'si (`zdr_license`) OTE oturum cookie'si olmadan `/license-check`'e yönlendirilir (SEC-09 — SEO etkisi var).

## Roller

`SUPER_ADMIN | ADMIN | EDITOR | COLLAB_MANAGER | BRAND_CLIENT | USER`
- Admin paneline erişim: SUPER_ADMIN, ADMIN, EDITOR, COLLAB_MANAGER.
- Kullanıcı yönetimi: yalnızca SUPER_ADMIN.

## Veri modeli (özet)

User, Session, Profile, Page, Post, PostCategory, PostTag, PostTagMap, MediaAsset, SiteSetting, SeoMetadata, CollaborationRequest, ContactMessage, MenuItem, Appointment, NewsletterSubscriber, Admin (legacy), AdminSession (legacy), License, AuditLog, IntegrationSetting, AssetUsage, AIGeneration, AIGenerationResult, PageSection, DesignSetting.
