# Progress Log — Zeynep Koçak Web Sitesi + Görsel CMS

## Session 2026-10-11 (v2 visual CMS)
Built on the copied v1 base.

### Completed features
1. **Prisma schema v2**: added AIGeneration, AIGenerationResult, AssetUsage, PageSection (editor), DesignSetting (theme). Extended MediaAsset with `source`, `isAi`, `focusX`, `focusY`, `posterUrl`. `prisma db push` applied; client regenerated.
2. **Image generation provider** (`src/lib/imagegen.ts`): configurable via server-side env (openai/stability/replicate/http). Honest status; no fake success. API `/api/ai/generate` (503 + clear message when unconfigured) and `/api/ai/save`.
3. **AI Studio** `/admin/ai-studio`: status panel, generation form (prompt, style, palette, aspect, category, variants), suggested prompts, generation history, save-to-media. Honest "not connected" UI.
4. **Media library v2** `/admin/media`: filters (all/images/videos/AI/unused), file upload (now videos too + larger limits), URL-add, edit alt/caption, delete with confirm. APIs: `/api/media/upload`, `/api/media/external`, `/api/media/asset` (PATCH/DELETE).
5. **Theme & design** `/admin/theme`: centralized CSS variables (background/foreground/primary/accent/muted/card/border), applied globally via #theme-css in root layout; draft/publish; preview; reset. Verified: published primary reflects on homepage.
6. **Page editor** `/admin/editor`: section-based drag-drop editor (hero/text/twoColumn/image/gallery/quote/stats/cta/video/divider). Add/edit/reorder/remove/publish-toggle; live preview; `PublicEditorSections` renders published sections on the live homepage. Verified end-to-end (add → shows on `/`, delete/cleanup).
7. **Security headers** + expanded image remote patterns (next.config.ts).
8. **`.env.example`**: image generation variables documented.

### Verified in browser
- Admin login works.
- AI Studio shows honest unconfigured state; generate API returns 503 with instructions.
- Theme publish + apply + reset works (primary reflected as CSS var on homepage).
- Editor add → live homepage render → delete works.
- Media manager: upload API (200), card shows unused badge + edit + delete, focus-point selection persists (objectPosition saved & reloaded), delete removes file+record.
- Security headers (nosniff, SAMEORIGIN, referrer, permissions-policy) confirmed present.
- AI generate API honesty: 503 + explicit unconfigured message.

### Test data cleaned up (theme reset + test section removed + test media asset deleted).
### Final DB state (verified): pageSections=0, activeDesignSettings=0, mediaAssets=0, aiGenerations=0.

## Session 2026-10-11 (v3 — referans tasarıma göre yeniden tasarım)
Eşlik eden referans görseller (ana sayfa + iç sayfa mockupları ve yönetim paneli mockupu)
esas alınarak görsel dil yenilendi. Yığın (Next 16 + Prisma + Tailwind v4) korundu.

### Tasarım sistemi
- `src/app/globals.css`: marka jetonları — krem `#f8f4ee`, orman yeşili `#22392f`, tan/bakır `#c9a97e`,
  adaçayı, mürekkep, çizgi renkleri; `--font-sans/serif/hand` değişkenleri; erişilebilir odak halkası;
  `prefers-reduced-motion` desteği.
- `src/app/layout.tsx`: next/font/google ile Inter + Playfair Display + Caveat (latin + latin-ext, Türkçe destekli).
- `src/components/Logo.tsx`: lotus marka işareti (tan renk, currentColor).

### Genel site
- `SiteHeader`: anasayfada koyu hero üzerinde şeffaf, kaydırınca ve iç sayfalarda krem; yeni menü yapısı
  (Anasayfa, Hakkımda, Hizmetler ▾, Grup Terapileri, Atölyeler, Blog, İletişim) + "Randevu Al" tan butonu,
  klavye/Escape destekli açılır menü, mobil çekmece menü.
- `SiteFooter`: 4 kolon (marka + hızlı erişim + iletişim + bülten) ve koyu alt bar (© + yasal bağlantılar).
- `NewsletterForm` + `POST /api/newsletter`: e-posta doğrulama (zod), IP başına hız sınırı, tekil kayıt.
- `VideoCard`: poster + oynat düğmesi, tıklayınca gerçek video oynatma (grup-terapisi-1.mp4).
- `PageHero`: iç sayfalar için koyu başlık bandı (breadcrumb + el yazısı alıntı).
- Ana sayfa yeniden yazıldı: koyu hero bandı, güven şeridi, "Her Danışan Özeldir", hizmet kartları,
  koyu grup terapisi bandı, bilimsel yaklaşım, blog, Instagram, randevu CTA.
- Yeni sayfalar: `/grup-terapileri` ve `/sss` (sahte tarih/kontenjan/ücret bilgisi üretilmedi).

### Yönetim paneli
- `AdminShell` (yeni): koyu yeşil, gruplu kenar çubuğu (İçerik / Medya & Tasarım / İletişim / Sistem),
  üst barda çalışan panel araması, bildirim rozeti (bekleyen randevu + okunmamış mesaj), "Canlı Site"
  bağlantısı, kullanıcı menüsü (ayarlar, kullanıcılar, çıkış); mobilde çekmece.
- Dashboard yeniden yazıldı: hoş geldiniz + tarih, 4 gerçek istatistik kartı, canlı site önizlemesi (iframe),
  hızlı işlemler, son aktiviteler (AuditLog), randevu tablosu, son mesajlar, sayfa/blog listeleri,
  tema renk özetine, SEO/entegrasyon ve sistem durumu. Sahte istatistik yok; veri yoksa boş durum gösterilir.
- ThemeToggle `useSyncExternalStore` ile yeniden yazıldı (lint hatası giderildi).

### Doğrulama (2026-10-11)
- `npx tsc --noEmit` temiz; `npm run lint` 89 → 41 problem (kalanlar önceden var; yedek klasörü lint'ten çıkarıldı).
- `npx next build` başarılı; `/grup-terapileri`, `/sss`, `/api/newsletter` rotaları üretimde.
- Üretim sunucusu `next start -p 3000` ile yeniden başlatıldı: tüm genel sayfalar 200, `/admin` 307 → giriş → dashboard.
- Tarayıcıda (agent-browser, 1440 ve 390 px): yatay taşma yok, mobil menü çalışıyor, koyu mod aç/kapa çalışıyor,
  bülten formu gerçek veritabanına kayıt yapıyor (test kaydı silindi), tüm admin alt sayfaları yeni kabukla açılıyor.
- Geçici dosyalar temizlendi; eski kod `.backup-before-redesign/` klasöründe saklandı.

### Not: görsel üretimi
Bu oturumda da yapılandırılmış bir AI görsel üretim servisi yok (env anahtarı yok) — arayüz dürüst şekilde
"bağlı değil" durumunu göstermeye devam ediyor. Sayfalarda, izin verilen gerçek fotoğraflar (instagram seti,
zeynep-portre.jpg, grup-calismasi-1.jpg) ve grup videosu kullanılıyor; sahte portre üretilmedi.

## Session 2026-10-11 (v3.1 — gerçek görseller ve tanıtım videosu)
Müşteri tarafından sağlanan gerçek görseller ve video alındı, medyaya işlendi ve sayfalara yerleştirildi.

### Eklenen varlıklar (public/)
- `images/grup/iliski-halleri.jpg` — "İlişki Halleri" 8 haftalık grup terapisi afişi (8 Ekim – 26 Kasım 2026, Her Perşembe 19.00, Suadiye/Bağdat Caddesi, +18, sınırlı kontenjan)
- `images/grup/iliskiler-uzerine.jpg` — "İlişkiler Üzerine" 8 haftalık grup terapisi afişi (Her Salı 20.00–21.30, Ayrılık Çeşmesi/Kadıköy, 6 Ekim – 24 Kasım 2026)
- `images/grup/program-akisi.jpg` — 8 haftalık program akışı görseli
- `images/portre/zeynep-portre-yesil.jpg` — profesyonel portre
- `images/atolye/atolye-atolyede.jpg` — atölyede grup çalışması fotoğrafı
- `images/etkinlik/sevebilmek.jpg` — Müze Gazhane "Sevebilmek?" etkinlik afişi
- `images/etkinlik/gecis-halinde-olmak.jpg` — Müze Gazhane "Geçiş Halinde Ol'mak" afişi
- `videos/tanitim.mp4` — 24,5 sn, 720×1280 dikey tanıtım videosu (alt üçte biri siyah dolgu; kartta `aspect 5/6 + object-position top` ile kırpılıyor)

### Sayfa değişiklikleri
- **Ana sayfa**: "Her Danışan Özeldir" bölümündeki kart artık tanıtım videosunu oynatır (poster: yeşil duvarlı portre); hero'daki "Tanıtım Videosu" bağlantısı bu bölüme (#tanitim) işaret ediyor. Grup bandındaki kart gerçek grup oturumu videosunu (`grup-terapisi-1.mp4`) oynatmaya devam ediyor. Atölyeler hizmet kartının görseli artık atölye fotoğrafı.
- **VideoCard**: `aspect` ve `objectPosition` propsları eklendi (dikey videolar için).
- **/grup-terapileri**: "Güncel Programlar" bölümü iki gerçek program afişi + tarih/saat/yer/kontenjan bilgileriyle, ardından "Program Akışı" bölümü 8 haftalık görsel + metin listesiyle eklendi.
- **/atolyeler**: "Etkinliklerden" galerisi (iki Müze Gazhane afişi + atölye fotoğrafı, açıklamalı).
- **/hakkimda**: yeni tasarım dilinde yeniden yazıldı — koyu PageHero, yeşil duvarlı portre, hakkında metni, etiketler, atölye fotoğrafı ve grup/atölye bölümü.
- 9 varlık `MediaAsset` olarak alt/açıklama bilgileriyle medya kütüphanesine kaydedildi (`source: upload`, `isAi: false`).

### Doğrulama
- `npx tsc --noEmit` temiz; lint 41 (önceden varan, tümü başka dosyalarda).
- `next build` + `next start -p 3000`: tüm yeni görseller/video 200 (video 206 partial), sayfalar 200.
- Tarayıcıda: tanıtım videosu oynatılıyor (`paused:false`, `readyState:4`), afişler ve fotoğraflar sayfalarda, alt metinleri dolu, 1440 ve 390 px'te yatay taşma yok; medya kütüphanesinde 9 varlık listeleniyor.
- Not: Next 16 `next start`, `public/` altındaki **yeni** dosyaları build almadan sunmuyor (404) — yeni medya ekleyince `next build` + sunucu yeniden başlatma gerekiyor.

## Session 2026-10-11 (v3.2 — grup bandı videosu düzeltmesi + 2 yeni etkinlik afişi)
- **Grup Terapisi bandı video düzeltmesi (ana sayfa):** Kart, kırılan `[&_figure>div]:aspect-[16/10]` Tailwind seçicisi yüzünden 4:3 kutuda kalıyor ve **16:9 (832×464) yatay videoyu object-cover ile ~%25 kırpıyordu.** Seçici kaldırıldı, `VideoCard`'ın `aspect="16/9"` propu kullanıldı ve karta "Grup Terapisi / Son oturumdan kesitler" etiketi eklendi. Tarayıcıda doğrulandı: kutu 564×317 (16/9), video oynuyor (`readyState: 4`), **kırpma yok**.
- **Yeni etkinlik afişleri** `public/images/etkinlik/` altına alındı ve /atölyeler galerisine eklendi (artık 4 afiş + 1 fotoğraf): `iliskilerde-sinir-koymak.jpg` (İlişkilerde Sınır Koymak · Müze Gazhane · 12 Nisan), `kirilma-noktasi.jpg` (Kırılma Noktası: Boşluk Hissi ve Nefesin Başlangıcı · Müze Gazhane · 7 Şubat).
- İki afiş alt/açıklama bilgisiyle `MediaAsset`'e kaydedildi (toplam medya: 11).
- Doğrulama: `tsc` exit 0, lint 41 (önceden varan), `next build` + `next start -p 3000`; yeni afişler 200, /  ve /atolyeler 200, 1440 ve 390 px'te yatay taşma yok.

## About image generation (honest position)
At delivery there is NO configured AI image-generation service in the environment and no
image-editing/rendering tool that can produce photorealistic site imagery. Per the master
prompt §2, this absence is detected and reported truthfully; the reusable, server-side-only,
configurable provider integration (openai/stability/replicate/http) is implemented and fully
wired (/admin/ai-studio + /api/ai/generate + /api/ai/save + media save). Real photos in the
project (the /instagram set, grup-calismasi-1.jpg, videos) are used on pages. Once a provider
key is added server-side, generation becomes active immediately.

