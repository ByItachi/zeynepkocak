# ÜRETİM HAZIRLIK RAPORU — Zeynep Koçak Psikolog Web Sitesi

**Tarih:** 2026-10-12

## Build & test sonuçları

| Kontrol | Sonuç |
|---|---|
| `tsc --noEmit` | ✅ Exit 0 (hata yok) |
| `next build` | ✅ Compiled successfully, 28/28 statik sayfa |
| `eslint src` | ⚠ 35 hata (çoğu önceden var: `react/no-unescaped-entities`, `@typescript-eslint/no-explicit-any`). Audit'in değiştirdiği dosyalarda hata yok. |
| Uçtan uca CRUD | ✅ (tarayıcı → server-action → DB) |
| Canlı pentest | ✅ (SECURITY raporu) |

## Ortam ve secret yönetimi

- `.env` git'te değil (`.env*` gizli) ✅
- `ADMIN_CREDENTIALS.local.txt` git'te değil ✅
- AI sağlayıcı anahtarları yalnızca sunucu tarafında (`process.env`), istemciye sızmıyor ✅
- ⚠ Üretim için: secret'lar env/vault üzerinden sağlanmalı; demo seed şifreleri (`admin123`) kaldırılmalı.

## Güvenlik (üretim için)

| Konu | Durum |
|---|---|
| Cookie'ler HttpOnly + SameSite=Lax | ✅ |
| Cookie Secure (üretimde) | ✅ `NODE_ENV===production` |
| Parola hash (bcrypt 12) | ✅ |
| Login rate-limit | ✅ (in-memory) |
| Lisans rate-limit | ✅ eklendi (in-memory) |
| Güvenlik başlıkları | ✅ nosniff/X-Frame/Referrer/Permissions |
| CSP | ❌ Yok (SEC-05, planlanmalı) |
| HSTS | ❌ Yok (SEC-06, HTTPS prod) |

## Kritik engeller (production-ready DEĞİL)

1. **Lisans duvarı siteyi indexlenemez yapıyor** (SEC-09 / SEO-03). SEO hedefi varsa public rotalar muaf edilmeli.
2. **Legacy Admin auth** ve demo kimlik bilgileri temizlenmeli (SEC-08).
3. **KVKK/Gizlilik metinleri demo placeholder** — hukuki tamamlanma gerekli (P1).
4. **CSP eklenmeli** (SEC-05).
5. Rate-limit'ler in-memory — çok üretim (cluster) instance'ta etkisiz; kalıcı/dağıtık sınıra geçilmeli.

## Ölçek / performans notları

- N+1 gözlemlenmedi; dashboard paralel `Promise.all` sorgular kullanıyor.
- SQLite tek dosya — üretimde PostgreSQL önerilir (şema hazır).
- Görsel/video boyut sınırları upload'da uygulanıyor (8MB görsel / 80MB video).
- Görsel optimizasyonu: Next `next/image` kullanımı değerlendirilmeli.

## Kalan riskler (açık)

- SEC-05 CSP, SEC-06 HSTS, SEC-07 dev bağımlılık audit, SEC-08 demo/legacy, SEC-09 lisans-duvarı.
- E-posta/SMS, AI sağlayıcı, üçüncü taraf entegrasyonlar test edilemedi (yapılandırılmamış).

## Nihai değerlendirme

**Production-ready: HAYIR.** Kritik ve yüksek güvenlik açıkları (SEC-01, SEC-02) **düzeltilmiş ve yeniden test edilmiştir**; CRUD ve veri bütünlüğü doğrulanmıştır. Ancak lisans-duvarı/SEO engeli, hukuki metinlerin eksikliği, CSP ve demo/legacy artıkları giderilmeden üretime çıkılmamalıdır.

## Üretim öncesi kontrol listesi

- [ ] Public rotaları lisans duvarından muaf tut (SEO için)
- [ ] Legacy Admin auth + demo seed temizle
- [ ] KVKK/Gizlilik metinlerini hukuki olarak tamamla
- [ ] CSP + HSTS ekle
- [ ] Rate-limit'i kalıcı/dağıtık yap
- [ ] PostgreSQL'e geç + `prisma migrate`
- [ ] E-posta bildirimi (SMTP) yapılandır ve test moduyla doğrula
- [ ] Secret'ları vault'tan enjekte et, demo şifreleri değiştir
- [ ] `npm audit fix` (dev bağımlılıklar)
- [ ] Cross-viewport (320–1920) ve Lighthouse/Core Web Vitals ölçümü
