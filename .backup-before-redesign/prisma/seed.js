const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@zeyneppsikolog.local";
  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!admin) {
    const rawPassword = crypto.randomBytes(9).toString("base64url");
    const passwordHash = await bcrypt.hash(rawPassword, 12);
    admin = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: "Site Yöneticisi",
        role: "SUPER_ADMIN",
        emailVerified: new Date(),
      },
    });

    const credsFile = path.join(__dirname, "..", "ADMIN_CREDENTIALS.local.txt");
    fs.writeFileSync(
      credsFile,
      `İlk admin girişi (bu dosyayı güvenli sakla, ardından şifreni admin panelinden değiştir ve dosyayı sil):\nE-posta: ${adminEmail}\nŞifre: ${rawPassword}\n`,
      "utf8"
    );
    console.log(`Admin kullanıcısı oluşturuldu. Giriş bilgileri: ${credsFile}`);
  } else {
    console.log("Admin kullanıcısı zaten mevcut, atlandı.");
  }

  const integrations = ["google_analytics", "google_ads", "search_console", "instagram", "smtp"];
  for (const provider of integrations) {
    await prisma.integrationSetting.upsert({
      where: { provider },
      update: {},
      create: { provider, isConnected: false },
    });
  }

  const category = await prisma.postCategory.upsert({
    where: { slug: "yasam-ve-terapi" },
    update: {},
    create: { name: "Yaşam ve Terapi", slug: "yasam-ve-terapi" },
  });

  await prisma.post.upsert({
    where: { slug: "ornek-yazi-terapiye-baslarken" },
    update: {},
    create: {
      slug: "ornek-yazi-terapiye-baslarken",
      title: "[DEMO] Terapiye Başlarken Bilmeniz Gerekenler",
      excerpt: "Bu bir örnek/demo içeriktir; admin panelinden düzenleyebilir veya silebilirsiniz.",
      content:
        "<p>Bu yazı, içerik yönetim sisteminin nasıl çalıştığını göstermek için eklenmiş bir <strong>demo</strong> yazıdır. Gerçek Instagram hesabı giriş duvarının arkasında olduğu için gerçek gönderi içeriği buraya aktarılmamıştır.</p><p>Admin panelinden bu yazıyı düzenleyebilir, yayından kaldırabilir veya silebilirsiniz.</p>",
      status: "PUBLISHED",
      publishedAt: new Date(),
      readingMinutes: 3,
      seoTitle: "Terapiye Başlarken Bilmeniz Gerekenler (Demo)",
      seoDescription: "Demo içerik - gerçek yazılarınızla değiştirin.",
      categories: { connect: { id: category.id } },
    },
  });

  await prisma.page.upsert({
    where: { slug: "gizlilik-politikasi" },
    update: {},
    create: {
      slug: "gizlilik-politikasi",
      title: "Gizlilik Politikası ve KVKK Aydınlatma Metni",
      status: "PUBLISHED",
      content:
        "<p>[DEMO METİN] Bu bölüm, gerçek işletme bilgileriniz ve KVKK yükümlülükleriniz doğrultusunda bir hukuk danışmanı tarafından tamamlanmalıdır. Aşağıdaki alanları doldurun: veri sorumlusu kimliği, işlenen veri kategorileri, işleme amaçları, saklama süreleri, haklarınız ve başvuru yöntemi.</p>",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
