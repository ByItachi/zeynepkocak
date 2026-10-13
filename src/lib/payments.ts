// Ödeme sağlayıcı entegrasyon iskeleti.
// PayTR ve iyzico için gerçek canlı ödeme almak üzere, ilgili mağaza hesabınızdan
// aldığınız API bilgilerini ortam değişkeni (environment variable) olarak tanımlamanız gerekir:
//   PAYTR_MERCHANT_ID, PAYTR_MERCHANT_KEY, PAYTR_MERCHANT_SALT
//   IYZICO_API_KEY, IYZICO_SECRET_KEY, IYZICO_BASE_URL
// Bu değerler tanımlı değilken sistem "test modunda" çalışır: sipariş oluşturulur ve
// ödeme adımı simüle edilerek sipariş otomatik PAID olarak işaretlenir. Bu sayede
// sepet/sipariş/indirme akışının tamamı, gerçek ödeme anahtarları eklenmeden de
// uçtan uca test edilebilir ve anahtarlar eklendiğinde yalnızca bu dosyadaki
// `createPaymentSession` fonksiyonunun içini gerçek API çağrılarıyla doldurmak yeterlidir.

export type PaymentProvider = "PAYTR" | "IYZICO";

export function isPaymentProviderConfigured(provider: PaymentProvider): boolean {
  if (provider === "PAYTR") {
    return Boolean(process.env.PAYTR_MERCHANT_ID && process.env.PAYTR_MERCHANT_KEY && process.env.PAYTR_MERCHANT_SALT);
  }
  if (provider === "IYZICO") {
    return Boolean(process.env.IYZICO_API_KEY && process.env.IYZICO_SECRET_KEY);
  }
  return false;
}

export interface PaymentSessionResult {
  ok: boolean;
  testMode: boolean;
  redirectUrl?: string;
  error?: string;
}

/**
 * Sipariş için ödeme oturumu başlatır.
 * Gerçek anahtarlar tanımlıysa burada PayTR "get-token" / iyzico "checkoutform" API
 * çağrıları yapılıp kullanıcı sağlayıcının ödeme sayfasına yönlendirilir.
 * Anahtarlar tanımlı değilse test modunda çalışır ve sipariş direkt onaylanır.
 */
export async function createPaymentSession(params: {
  provider: PaymentProvider;
  orderId: string;
  amountCents: number;
  currency: string;
  customerName: string;
  customerEmail: string;
}): Promise<PaymentSessionResult> {
  const configured = isPaymentProviderConfigured(params.provider);

  if (!configured) {
    // Test modu: gerçek ödeme sağlayıcı anahtarları tanımlanana kadar siparişi
    // doğrudan ödenmiş say ve kullanıcıyı teşekkür sayfasına yönlendir.
    return { ok: true, testMode: true };
  }

  if (params.provider === "PAYTR") {
    // TODO: PayTR "get-token" API çağrısı — PAYTR_MERCHANT_ID/KEY/SALT ile imza
    // üretip https://www.paytr.com/odeme/api/get-token adresine istek atın ve
    // dönen token ile iframe/redirect URL oluşturun.
    return { ok: false, testMode: false, error: "PayTR entegrasyonu için API çağrısı tamamlanmadı." };
  }

  if (params.provider === "IYZICO") {
    // TODO: iyzico "checkoutform/initialize" API çağrısı — IYZICO_API_KEY/SECRET_KEY
    // ile istek atıp dönen paymentPageUrl'e yönlendirin.
    return { ok: false, testMode: false, error: "iyzico entegrasyonu için API çağrısı tamamlanmadı." };
  }

  return { ok: false, testMode: false, error: "Bilinmeyen ödeme sağlayıcı." };
}
