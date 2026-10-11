"use client";

import { useState, useTransition } from "react";
import { createUser, deleteUser } from "./actions";

type User = { id: string; name: string | null; email: string; role: string };

const ROLE_OPTIONS = ["SUPER_ADMIN", "ADMIN", "EDITOR", "COLLAB_MANAGER", "BRAND_CLIENT", "USER"];

export default function UserTools({ users, currentUserId }: { users: User[]; currentUserId: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleCreate(formData: FormData) {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const result = await createUser(formData);
      if (result?.error) setError(result.error);
      else setSuccess(true);
    });
  }

  return (
    <div className="space-y-8">
      <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f1ece2] text-left text-[#5b5f58]">
            <tr>
              <th className="px-4 py-3">Ad</th>
              <th className="px-4 py-3">E-posta</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dccd]">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3">{u.name || "-"}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3 text-right">
                  {u.id !== currentUserId && (
                    <button
                      disabled={isPending}
                      onClick={() => {
                        if (confirm(`${u.email} kullanıcısını silmek istediğinize emin misiniz?`)) {
                          startTransition(() => deleteUser(u.id));
                        }
                      }}
                      className="text-[#8b3a3a] hover:underline"
                    >
                      Sil
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-[#e2dccd] rounded-lg p-5 max-w-md">
        <h2 className="font-serif text-lg mb-3">Yeni Kullanıcı</h2>
        {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 mb-3">{error}</p>}
        {success && <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 mb-3">Kullanıcı oluşturuldu.</p>}
        <form action={handleCreate} className="space-y-3">
          <input name="name" placeholder="Ad Soyad" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
          <input name="email" type="email" placeholder="E-posta" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
          <input name="password" type="password" placeholder="Geçici şifre (en az 8 karakter)" required className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm" />
          <select name="role" className="w-full rounded border border-[#e2dccd] px-3 py-2 text-sm">
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <button type="submit" disabled={isPending} className="rounded bg-[#5e6b52] text-white text-sm px-4 py-2 hover:bg-[#4c5742] disabled:opacity-60">
            {isPending ? "Oluşturuluyor..." : "Oluştur"}
          </button>
        </form>
      </div>
    </div>
  );
}
