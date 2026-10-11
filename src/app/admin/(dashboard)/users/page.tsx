import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import UserTools from "./_UserTools";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const currentUser = await getCurrentUser();
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-1">Kullanıcılar &amp; Roller</h1>
      <p className="text-sm text-[#5b5f58] mb-6">
        Yeni kullanıcı oluşturma yalnızca Super Admin rolüne açıktır.
      </p>
      <UserTools users={users} currentUserId={currentUser!.id} />
    </div>
  );
}
