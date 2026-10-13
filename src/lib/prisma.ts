import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Veritabanı erişilemezken (ör. Vercel derlemesinde DATABASE_URL tanımsız ya da
 * SQLite dosyası salt-okunur sunucu dosya sisteminde) sayfaların 500 vermek
 * yerine yedek değerle render edilmesini sağlar. Hata saklanmaz: console.error
 * olarak loglanır. Yazma işlemleri (create/update/delete) bu sarmalayıcıyı
 * kullanmaz; onlar hatalarını çağıranın iletmesi gerekir.
 */
export async function safeQuery<T>(
  label: string,
  query: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await query();
  } catch (error) {
    console.error(
      `[prisma] ${label} sorgusu başarısız (yedek değer kullanılıyor):`,
      error instanceof Error ? error.message : error
    );
    return fallback;
  }
}
