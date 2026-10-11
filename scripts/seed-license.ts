import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  const licenseKey = "LICENSE-DEMO-2024-XXXX"; // Can be customized
  
  await prisma.license.upsert({
    where: { key: licenseKey },
    update: {},
    create: {
      key: licenseKey,
      status: "active",
      maxUses: 999,
      note: "Demo lisans",
    },
  });
  
  console.log("Demo lisans oluşturuldu:");
  console.log("Lisans Anahtarı:", licenseKey);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
