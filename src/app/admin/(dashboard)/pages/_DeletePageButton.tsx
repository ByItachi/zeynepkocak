"use client";

import { useTransition } from "react";
import { deletePage } from "./actions";

export default function DeletePageButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (confirm(`"${title}" sayfasını silmek istediğinize emin misiniz?`)) {
          startTransition(() => deletePage(id));
        }
      }}
      className="text-[#8b3a3a] hover:underline"
    >
      Sil
    </button>
  );
}
