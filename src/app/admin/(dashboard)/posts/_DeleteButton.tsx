"use client";

import { useTransition } from "react";
import { deletePost } from "./actions";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (confirm(`"${title}" yazısını silmek istediğinize emin misiniz?`)) {
          startTransition(() => deletePost(id));
        }
      }}
      className="text-[#8b3a3a] hover:underline disabled:opacity-50"
    >
      Sil
    </button>
  );
}
