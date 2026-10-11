"use client";

import { useTransition } from "react";
import { deleteSubscriber } from "./actions";

export default function SubscriberRow({ id, email, createdAt }: { id: string; email: string; createdAt: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <tr>
      <td className="px-4 py-3">{email}</td>
      <td className="px-4 py-3 text-xs text-[#5b5f58]">{new Date(createdAt).toLocaleDateString("tr-TR")}</td>
      <td className="px-4 py-3 text-right">
        <button
          disabled={isPending}
          onClick={() => startTransition(() => deleteSubscriber(id))}
          className="text-[#8b3a3a] hover:underline text-sm"
        >
          Sil
        </button>
      </td>
    </tr>
  );
}
