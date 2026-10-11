# Task Plan — Zeynep Koçak Psikoloji Web Sitesi + Görsel CMS v2

## Goal
Build a complete, professional, responsive psychology website for Zeynep Koçak with a
real visual CMS: AI image generation integration, media library, drag-drop page editor,
theme customization, admin panel, database, security, SEO. All working and shipped.

## Context
- Workspace `C:\Users\root\Downloads\zeynepkocak` is empty.
- Sibling `C:\Users\root\Downloads\zeynepdr` is a complete v1 Next.js 16 + Prisma + Tailwind v4 + next-intl psychology site for the same person (already has admin, DB, pages, blog).
- Master prompt (prompt-1.txt) drives this v2: preserve tech stack, add visual CMS + AI image generation.
- No external AI image-generation service/API is configured in this environment → must detect this and build a *configurable* provider integration with honest status reporting (per prompt §2, §5, §7).
- Cannot see the design screenshots (image reading unsupported here).

## Phases
1. Scaffold base project into zeynepkocak (copy zeynepdr, preserve stack) — `in_progress`
2. Audit v1 codebase; map what exists vs what v2 requires
3. Database schema: add AI generation history, DesignSetting (theme), PageSection, MediaAsset usage refs
4. Image generation provider (configurable, server-side keys, honest status) + AI Studio `/admin/ai-studio`
5. Media library `/admin/media` (upload, replace, alt, usage, unused detection, focus)
6. Page editor `/admin/editor` (drag-drop sections, layout, typography, colors, responsive)
7. Theme customization (centralized design settings, draft/publish)
8. Integrate images into all pages; generate available SVG/vector decorative assets
9. Security, performance, SEO
10. Test + deliver (run, verify, document)

## Next Step
Copy the zeynepdr base into zeynepkocak and verify build.

## Status: COMPLETE (v3 — referans tasarım yenilemesi tamamlandı)
- v2 modülleri korundu; v3'te genel site ve yönetim paneli referans mockuplara göre yeniden tasarlandı.
- Yeni: `/grup-terapileri`, `/sss`, `POST /api/newsletter`, bülten formu, VideoCard, PageHero, AdminShell.
- Doğrulama: tsc temiz, lint temiz (yeni dosyalarda), `next build` başarılı, üretim `next start -p 3000` çalışıyor.
- Görsel üretim servisi yapılandırılmadı (sahte başarı yok). Detay: progress.md.

