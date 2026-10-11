"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  brandName: z.string().min(2, "Marka adını girin."),
  industry: z.string().optional(),
  contactName: z.string().min(2, "İletişim kişisini girin."),
  email: z.string().email("Geçerli bir e-posta girin."),
  phone: z.string().optional(),
  budgetRange: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalı."),
  website: z.string().max(0).optional(),
});

export async function sendCollaborationRequest(formData: FormData) {
  const parsed = schema.safeParse({
    brandName: formData.get("brandName"),
    industry: formData.get("industry") || undefined,
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    budgetRange: formData.get("budgetRange") || undefined,
    deadline: formData.get("deadline") || undefined,
    description: formData.get("description"),
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  if (parsed.data.website) {
    return { success: true };
  }

  await prisma.collaborationRequest.create({
    data: {
      brandName: parsed.data.brandName,
      industry: parsed.data.industry,
      contactName: parsed.data.contactName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      budgetRange: parsed.data.budgetRange,
      deadline: parsed.data.deadline ? new Date(parsed.data.deadline) : undefined,
      description: parsed.data.description,
    },
  });

  return { success: true };
}
