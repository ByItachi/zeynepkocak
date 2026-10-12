# SEO VE RESPONSIVE/ERİŞİLEBİLİRLİK RAPORU — Zeynep Koçak Psikolog Web Sitesi

**Tarih:** 2026-10-12

## SEO denetimi

### Test edilenler (canlı)

| Kontrol | Sonuç |
|---|---|
| `robots.txt` | ✅ 200 |
| `sitemap.xml` | ✅ 200 |
| 404 davranışı | ✅ Var olmayan rota 404 döndürüyor (gizlemiyor) |
| Title (ana sayfa) | ⚠ `Zeynep Koçak \| Uzm. Psikolog` |
| Meta description | ⚠ `Yetişkin, Ergen ve Çift Terapisi — Yüz yüze & Online` |
| Canonical | ❌ Yok |
| Open Graph | ❌ Yok (tespit edilmedi) |
| Robots meta | — (varsayılan) |

### Bulgular

#### SEO-01 — Duplicate title: tüm sayfalar aynı başlık (P2 → OPEN)
- **Kanıt:** `/` ve `/blog` aynı `<title>Zeynep Koçak | Uzm. Psikolog</title>` döndürüyor.
- **Etki:** Arama sonuçlarında sayfalar ayırt edilemez; tıklama oranı ve sıralama olumsuz etkilenir.
- **Neden:** Root layout statik `generateMetadata` set ediyor; public sayfaların çoğunda sayfa bazlı `generateMetadata` yok.
- **Öneri:** Her public sayfaya unique `title`/`description` veren `generateMetadata` eklenmeli. `SeoMetadata` modeli zaten mevcut, kullanılabilir.
- **Durum:** Tüm sayfalara dağıtımı kapsam nedeniyle yapılmadı; açık.

#### SEO-02 — Canonical ve Open Graph eksik (P2 → OPEN)
- **Öneri:** `metadataBase` (layout'ta mevcut) + canonical + `openGraph` eklenebilir.

#### SEO-03 — KRİTİK: Site lisans duvarının arkasında, indexlenemez (P1 → OPEN)
- **Kanıt:** Middleware tüm public rotaları cookie'siz istemcide `/license-check`'e redirect ediyor (307).
- **Etki:** Arama motoru botları lisans cookie'si alamaz → **tüm site indexlenemez**. Bu, SEO için engelleyicidir.
- **Not:** Tasarım kararı olabilir (lisanslı erişim). SEO hedefleniyorsa public rotalar middleware'den muaf tutulmalı ve/veya `X-Robots-Tag`/robots ile yönetilmeli. Bilinçli olarak değiştirilmedi.

#### SEO-04 — İçerik doğrulama (bilgi)
- Demo/placeholder içerikler (KVKK, blog demo yazısı) gerçek uzmanlıkla değiştirilmeli. Sahte yorum/puan/unan üretilmedi (iyi).

### Yapılan düzeltme
- Bu denetimde SEO kodu değiştirilmedi (riskli/dağınık değişiklik yerine raporlama). Kritik ve yüksek güvenlik bulguları düzeltildi (bkz. SECURITY raporu).

## Responsive ve erişilebilirlik

### Gözlemler (AdminShell + public layout snapshot)

- **Responsive grid:** Dashboard kartları `sm:grid-cols-2 lg:grid-cols-4`, sidebar `md:` ile gizlenip mobil drawer oluyor → temel mobil deseni mevcut ✅.
- **Mobil menü:** AdminShell'de hamburger + drawer; public SiteHeader'da mobil menü mevcut.
- **Yatay taşma:** Tablolar `overflow-x-auto` ile sarılı (randevu tablosu) ✅.
- **Form label'ları:** Login, lisans ve admin formlarında `<label htmlFor>` mevcut ✅.
- **Focus göstergeleri:** Input'larda `focus:ring` visible ✅.
- **Ekran okuyucu:** Anlamlı `aria-label` (menü, bildirim, arama) mevcut ✅.
- **Kontrast:** Public palette (`#5b5f58` on `#faf7f2` vb.) kabul edilebilir; tam WCAG kontrast taraması yapılmadı.

### Bulgular

#### RWD-01 — Admin paneli public header/footer içinde render oluyor (P2 → OPEN)
- **Kanıt:** Admin sayfaları root layout'un `SiteHeader`/`SiteFooter`'ı içinde geliyor (snapshot'ta public nav + footer + "Randevu Al" görünüyor).
- **Etki:** Tasarım tutarsızlığı; admin akışında public navigasyon yanıltıcı. Ayrıca admin sayfalarının public metadata/title'ını miras alır (SEO-01 ile ilişkili).
- **Öneri:** `admin/(dashboard)` için ayrı bir root-boundary layout (route group layout ile public header/footer hariç tutularak).

#### RWD-02 — Tam genişlik taraması yapılmadı (kapsam)
- 320–1920 px arası 12 genişlikte otomatik tarama yapılmadı; temel mobil/masaüstü desenleri kod ile doğrulandı. Kapsamlı cross-viewport testi önerilir.

## Sonuç
- **Yüksek öncelikli SEO engeli:** lisans duvarı (SEO-03) — site gerçekten indexlenecekse çözülmeli.
- **Sonraki:** unique metadata (SEO-01), admin layout ayrıştırma (RWD-01).
