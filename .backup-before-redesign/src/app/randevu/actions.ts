"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2, "Adınızı girin."),
  email: z.string().email("Geçerli bir e-posta girin."),
  phone: z.string().optional(),
  service: z.string().min(2, "Lütfen bir çalışma alanı seçin."),
  preferredDate: z.string().min(1, "Lütfen bir tarih seçin."),
  preferredTime: z.string().min(1, "Lütfen bir saat seçin."),
  sessionType: z.enum(["YUZ_YUZE", "ONLINE"]),
  message: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot
});

export async function requestAppointment(formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    service: formData.get("service"),
    preferredDate: formData.get("preferredDate"),
    preferredTime: formData.get("preferredTime"),
    sessionType: formData.get("sessionType") || "YUZ_YUZE",
    message: formData.get("message") || undefined,
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  if (parsed.data.website) {
    return { success: true };
  }

  const date = new Date(parsed.data.preferredDate);
  if (Number.isNaN(date.getTime())) {
    return { error: "Geçersiz tarih." };
  }

  await prisma.appointment.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      service: parsed.data.service,
      preferredDate: date,
      preferredTime: parsed.data.preferredTime,
      sessionType: parsed.data.sessionType,
      message: parsed.data.message,
    },
  });

  return { success: true };
}
