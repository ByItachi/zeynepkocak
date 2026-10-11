# Zeynep Koçak - Profesyonel Psikoloji Web Sitesi

Uzman Psikolog Zeynep Koçak'ın profesyonel web sitesi. Yetişkin, ergen ve çiftlerle çalışan, psikodrama ve grup atölyeleri yürüten bir psikoloji pratiğinin dijital vitrin.

## 🎯 Özellikler

### Görsel CMS (v2) — Kod Gerekmeden Yönetim
- **AI Görsel Stüdyosu** (`/admin/ai-studio`) — Yapılandırılabilir görsel üretim: prompt, tarz, renk paleti, en-boy, varyasyon, üretim geçmişi, medyaya kaydetme. Sağlayıcı bağlı değilse durumu dürüst şekilde gösterir (sahte üretim yok).
- **Gelişmiş Medya Kütüphanesi** (`/admin/media`) — Görsel/video yükleme, URL ile görsel ekleme, filtreler (görsel/video/AI üretimi/kullanılmayan), alt metin & başlık düzenleme, odak noktası seçimi, kullanım kontrolü, dosya boyutu/format bilgisi, silme onayı.
- **Sayfa Editörü** (`/admin/editor`) — Sürükle-bırak bölüm tabanlı editör: hero, metin, iki kolon, görsel, galeri, alıntı, istatistik, CTA, video, bölücü blokları. Sıralama, yayınla/taslak, canlı önizleme. Yayınlanan bölümler anında sitede görünür.
- **Tema & Tasarım** (`/admin/theme`) — Merkezi renk değişkenleri (arka plan, metin, ana vurgu, ikincil, soluk, kart, kenarlık). Tüm siteye anında uygulanır, canlı önizleme ve sıfırlama.

### AI Görsel Üretim Yapılandırması
AI görsel üretimi için `/admin/ai-studio` içindeki entegrasyon **yapılandırılabilir** olarak kuruldu. Üretim anahtarları **yalnızca sunucu tarafında** tutulur; istemciye asla gönderilmez. Sağlayıcı yapılandırılmadığında sitede dürüst bir "bağlı değil" durumu gösterilir ve üretim devre dışı kalır — sahte üretim yapılmaz.

`/admin/ai-studio` sayfasında yönergelerle birlikte şu env değişkenleri `.env.example` dosyasına eklenmiştir:
`IMG_GEN_PROVIDER`, `IMG_GEN_OPENAI_API_KEY`, `IMG_GEN_STABILITY_API_KEY`, `IMG_GEN_REPLICATE_API_TOKEN`, `IMG_GEN_HTTP_URL`, `IMG_GEN_HTTP_TOKEN`.

### Hizmetler
- **Yetişkinlerle Çalışma** - Kaygı, tükenmişlik, ilişki güçlükleri
- **Ergenlerle Çalışma** - Kimlik, aile, okul sorunları
- **Çiftlerle Çalışma** - İletişim, güven, çatışma çözümü
- **Online Görüşmeler** - Dünyanın her yerinden erişim
- **Psikodrama & Grup Atölyeleri** - Co-Psychodramatist olarak grup çalışmaları
- **Expat Psychologist** - İngilizce psikolojik destek
- **Transformational Breath®** - Beden farkındalığı ve nefes çalışması

### Teknik Özellikler
- ✅ Responsive Design (Mobil uyumlu)
- ✅ SEO Optimized (Sitemap, Robots, Schema.org)
- ✅ Google Analytics & GTM Entegrasyonu
- ✅ Instagram Galerisi (Gerçek gönderi entegrasyonu)
- ✅ Blog Sistemi
- ✅ İletişim Formu
- ✅ Admin Paneli (Yönetim sistemi)
- ✅ Güvenli Kimlik Doğrulama
- ✅ KVKK & Gizlilik Politikası

## 🚀 Başlangıç

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur
cp .env.example .env.local

# Veritabanını başlat
npx prisma migrate dev

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── page.tsx                 # Ana sayfa
│   ├── hakkimda/               # Hakkımda sayfası
│   ├── calisma-alanlarim/       # Çalışma alanları
│   ├── yetiskinlerle-calisma/   # Hizmet sayfaları
│   ├── ergenlerle-calisma/
│   ├── ciftlerle-calisma/
│   ├── online-gorusmeler/
│   ├── psikodrama/
│   ├── atolyeler/
│   ├── expat-psychologist/
│   ├── transformational-breath/
│   ├── blog/                    # Blog sistemi
│   ├── iletisim/                # İletişim formu
│   ├── admin/                   # Admin paneli
│   ├── api/                     # API endpoints
│   ├── gizlilik-politikasi/     # Yasal sayfalar
│   ├── kvkk/
│   ├── cerez-politikasi/
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global stiller
│   ├── sitemap.ts               # SEO sitemap
│   └── robots.ts                # Robots.txt
├── components/
│   ├── SiteHeader.tsx           # Başlık
│   ├── SiteFooter.tsx           # Altbilgi
│   └── GoogleAnalytics.tsx      # Analytics
├── lib/
│   ├── settings.ts              # Site ayarları
│   ├── prisma.ts                # Prisma client
│   ├── instagram-gallery.ts     # Instagram galerisi
│   └── schema.ts                # Schema.org yapılandırması
└── middleware.ts                # Next.js middleware

prisma/
├── schema.prisma                # Veritabanı şeması
└── seed.js                      # Seed verileri

public/
├── instagram/                   # Instagram görselleri
└── ...

.env.example                      # Ortam değişkenleri şablonu
package.json
tsconfig.json
tailwind.config.ts
next.config.js
```

## 🎨 Tasarım Sistemi

### Renk Paleti (marka jetonları — `src/app/globals.css`)
- **Krem:** #f8f4ee (arka plan) / #efe8dc (derin krem)
- **Koyu Orman Yeşili:** #22392f (hero bandı, koyu bölümler, alt bar)
- **Tan / Bakır Vurgu:** #c9a97e (butonlar, vurgular, el yazısı alıntılar)
- **Adaçayı:** #5b6a52
- **Mürekkep:** #2b2f29 · **Sessiz Metin:** #6a6f65 · **Çizgi:** #e6ded1

### Tipografi
- **Başlıklar:** Playfair Display (serif)
- **Gövde:** Inter
- **Vurgu alıntılar:** Caveat (el yazısı)
- Türkçe karakterler için `latin-ext` alt kümeleri yüklü; fontlar `next/font/google` ile derleme anında self-host edilir.

## 🔧 Yönetim Paneli

Admin paneline `/admin` adresinden erişin.

### Modüller
- **Genel Bakış** - Gerçek veritabanı istatistikleri, canlı site önizlemesi, hızlı işlemler, son aktiviteler
- **Yazılar** - Blog yazıları yönetimi
- **Sayfalar** - Statik sayfalar yönetimi
- **Sayfa Editörü** - Sürükle-bırak bölüm editörü
- **Medya Kütüphanesi** - Görsel/video yönetimi
- **AI Görsel Stüdyosu** - Yapılandırılabilir görsel üretimi
- **Tema & Tasarım** - Merkezi renk/tipografi ayarları
- **Randevu Talepleri** - Gelen randevu talepleri
- **İletişim Mesajları** - Gelen mesajlar
- **Marka İş Birlikleri** - Başvuru yönetimi
- **Bülten** - Newsletter aboneleri (site footer'ından gerçek kayıt: `POST /api/newsletter`)
- **Ayarlar** - Site ayarları
- **Entegrasyonlar** - Google Analytics, GTM, vb.

Kenar çubuğu grupludur (İçerik / Medya & Tasarım / İletişim / Sistem), üst barda panel araması, bildirim rozeti ve "Canlı Site" bağlantısı bulunur; mobilde çekmece menü olarak açılır.

## 📊 SEO & Teknik

### Sitemap
- Dinamik sitemap.xml (`/sitemap.xml`)
- Tüm sayfalar otomatik olarak dahil edilir

### Robots.txt
- Admin ve API endpoints hariç tutulur
- Sitemap referansı

### Yapılandırılmış Veri
- Schema.org LocalBusiness
- Schema.org Person (Profesyonel profili)
- Schema.org Service (Hizmetler)

### Google Entegrasyonları
- Google Analytics 4 (GA4)
- Google Tag Manager (GTM)
- Google Search Console (Doğrulama)

## 🔐 Güvenlik

- ✅ Bcrypt şifre hashleme
- ✅ CSRF koruması
- ✅ SQL injection koruması (Prisma ORM)
- ✅ XSS koruması
- ✅ Güvenli oturum yönetimi
- ✅ KVKK uyumlu veri işleme

## 📱 Responsive Design

- ✅ Mobil (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)
- ✅ Tailwind CSS ile responsive grid

## 🌐 Çok Dil Desteği

Şu anda Türkçe dilinde. İngilizce desteği için:
- i18n yapısı hazır (`messages/tr.json`, `messages/en.json`)
- Middleware yapılandırması tamamlandı
- Dil seçimi UI'ı eklenebilir

## 📧 İletişim Formu

- Doğrulama ve spam koruması
- Veritabanına kaydedilir
- Admin panelinde görüntülenebilir
- Email bildirimi (SMTP yapılandırıldığında)

## 🚀 Deployment

### Vercel'e Deploy

```bash
# Vercel CLI'ı yükle
npm i -g vercel

# Deploy et
vercel
```

### Diğer Platformlar

- **Railway:** `railway.app`
- **Render:** `render.com`
- **Heroku:** `heroku.com`
- **AWS:** EC2 + RDS

## 📝 Ortam Değişkenleri

`.env.local` dosyasını oluştur ve aşağıdaki değişkenleri ayarla:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXXX"
SMTP_HOST="smtp.gmail.com"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

## 🧪 Testler

```bash
# Unit testler
npm run test

# E2E testler
npm run test:e2e

# Coverage raporu
npm run test:coverage
```

## 📚 Kaynaklar

- [Next.js Dokumentasyonu](https://nextjs.org/docs)
- [Prisma Dokumentasyonu](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Schema.org](https://schema.org)

## 📄 Lisans

Tüm hakları saklıdır. © 2026 Zeynep Koçak

## 👤 İletişim

- **Web:** zeynepkocak.com
- **Instagram:** @zeynepleyolarkadasi
- **WhatsApp:** [WhatsApp Linki]
- **Email:** info@zeynepkocak.com

---

**Son Güncelleme:** 9 Ekim 2026
