import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import AdminShell from "./_components/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role)) {
    redirect("/admin/login");
  }

  const [pendingAppointments, unreadMessages] = await Promise.all([
    prisma.appointment.count({ where: { status: "BEKLEMEDE" } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  return (
    <AdminShell
      userName={user.name ?? user.email}
      userEmail={user.email}
      userRole={user.role}
      pendingAppointments={pendingAppointments}
      unreadMessages={unreadMessages}
    >
      {children}
    </AdminShell>
  );
}
