# ROTALAR VE API ENVANTERİ — Zeynep Koçak Psikolog Web Sitesi

**Tarih:** 2026-10-12

## Public sayfalar (route)

| Rota | Tip | Veri | Durum |
|---|---|---|---|
| `/` | Statik+DB | Ayarlar, menü, bölüm | 200 ✅ |
| `/hakkimda` | DB | Ayarlar | 200 ✅ |
| `/blog`, `/blog/[slug]` | DB | Post | 200 ✅ |
| `/randevu` | Form → API | Appointment | 200 ✅ |
| `/iletisim` | Form → API | ContactMessage | 200 ✅ |
| `/grup-terapileri`, `/atolyeler`, `/psikodrama`, `/transformational-breath`, `/online-gorusmeler`, `/ciftlerle-calisma`, `/ergenlerle-calisma`, `/yetiskinlerle-calisma`, `/calisma-alanlarim`, `/expat-psychologist`, `/isbirligi`, `/sss` | Statik | — | 200 ✅ |
| `/kvkk`, `/gizlilik-politikasi`, `/cerez-politikasi` | Statik/DB | Page | 200 ✅ |
| `/[slug]` | DB | Page (PUBLISHED) | 200 ✅ |
| `/license-check` | Form | License | 200 ✅ (bypass) |
| `/nonexistent` | 404 | — | 404 ✅ |

Tüm public rotaları **lisans duvarının arkasında** (middleware) — cookie yoksa `/license-check`'e redirect (307). Doğrulandı.

## API endpoint'leri

| Endpoint | Method | Auth | Rol | Validation | Rate-limit | Durum |
|---|---|---|---|---|---|---|
| `/api/auth/login` | POST | — | — | zod (email) | ✅ 8/10dk | 200/401/429 ✅ |
| `/api/auth/logout` | POST | oturum | — | — | — | 200 ✅ |
| `/api/admin/login` | POST | — | — | zod | ❌ | Legacy |
| `/api/admin/logout` | POST | — | — | — | — | Legacy |
| `/api/license/check` | POST | — | — | zod | ✅ 10/10dk (eklendi) | 200/401/429 ✅ |
| `/api/media/upload` | POST | oturum | canAccessAdmin | MIME+imza+boyut | ❌ | 200/400/401 ✅ |
| `/api/media/asset` | PATCH/DELETE | oturum | canAccessAdmin | id | ❌ | 401 ✅ |
| `/api/media/external` | POST | oturum | canAccessAdmin | URL (SSRF guard) | ❌ | 401/400 ✅ |
| `/api/ai/generate` | POST | oturum | canAccessAdmin | zod | ❌ | 401/503 ✅ |
| `/api/ai/save` | POST | oturum | canAccessAdmin | zod | ❌ | 401 ✅ |
| `/api/newsletter` | POST | — | — | zod (email) | ✅ 3/dk | 200/400/429 ✅ |

## Server Actions (admin, "use server")

Hepsi `getCurrentUser()` + rol kontrolü (SEC-01 sonrası tutarlı):
`pages/actions.ts` (savePage, deletePage), `posts/actions.ts` (create/update/deletePost), `messages/actions.ts` (toggleRead, deleteMessage), `appointments/actions.ts` (updateAppointmentStatus), `users/actions.ts` (createUser/deleteUser — SUPER_ADMIN), `menu/actions.ts`, `editor/actions.ts`, `theme/actions.ts`, `settings/actions.ts`, `integrations/actions.ts`, `collaborations/actions.ts`, `newsletter/actions.ts`.

## Yetkilendirme özeti

- Public API'ler (`license/check`, `newsletter`): açık, rate-limit'li.
- Admin API/action'lar: oturum + rol, sunucu tarafında; yetkisiz → 401/throw.
- Rol kontrolü frontend'de değil, backend'de (doğrulandı).
