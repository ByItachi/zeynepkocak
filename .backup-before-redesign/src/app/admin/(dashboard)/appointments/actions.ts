"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { logAudit } from "@/lib/audit";

const VALID_STATUSES = ["BEKLEMEDE", "ONAYLANDI", "IPTAL", "TAMAMLANDI"];

export async function updateAppointmentStatus(id: string, status: string) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) throw new Error("Yetkisiz işlem.");
  if (!VALID_STATUSES.includes(status)) throw new Error("Geçersiz durum.");

  await prisma.appointment.update({ where: { id }, data: { status } });
  await logAudit({
    userId: user.id,
    action: "UPDATE_STATUS",
    entity: "Appointment",
    entityId: id,
    metadata: { status },
  });
  revalidatePath("/admin/appointments");
}
