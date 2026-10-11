import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "./_components/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const [pendingAppointments, unreadMessages] = await Promise.all([
    prisma.appointment.count({ where: { status: "BEKLEMEDE" } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  return (
    <AdminShell
      userName={admin.username}
      userEmail={`${admin.username}@admin.local`}
      userRole="SUPER_ADMIN"
      pendingAppointments={pendingAppointments}
      unreadMessages={unreadMessages}
    >
      {children}
    </AdminShell>
  );
}
