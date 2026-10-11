import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminUsername = "admin";
  const adminPassword = "admin123"; // Demo şifre
  
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  
  await prisma.admin.upsert({
    where: { username: adminUsername },
    update: { password: hashedPassword },
    create: {
      username: adminUsername,
      password: hashedPassword,
    },
  });
  
  console.log("Admin hesabı oluşturuldu:");
  console.log("Kullanıcı Adı:", adminUsername);
  console.log("Şifre:", adminPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
