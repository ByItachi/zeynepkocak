"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2, "Adınızı girin."),
  email: z.string().email("Geçerli bir e-posta girin."),
  subject: z.string().optional(),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalı."),
  website: z.string().max(0).optional(), // honeypot
});

export async function sendContactMessage(formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  // Honeypot doluysa botlardan geldiğini varsay, kullanıcıya başarı göster ama kaydetme.
  if (parsed.data.website) {
    return { success: true };
  }

  await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    },
  });

  // NOT: SMTP yapılandırılmadığı için bildirim e-postası gönderilmiyor;
  // mesaj admin panelindeki "İletişim Talepleri" bölümünden görülebilir.

  return { success: true };
}
