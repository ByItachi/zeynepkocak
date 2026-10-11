"use client";

import { useTransition } from "react";
import { toggleRead, deleteMessage } from "./actions";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function MessageRow({ msg }: { msg: Message }) {
  const [isPending, startTransition] = useTransition();

  return (
    <tr className={msg.isRead ? "" : "bg-[#f8f5ec]"}>
      <td className="px-4 py-3 align-top">
        <p className="font-medium">{msg.name}</p>
        <p className="text-xs text-[#5b5f58]">{msg.email}</p>
      </td>
      <td className="px-4 py-3 align-top">
        <p className="text-sm">{msg.subject || "(konu yok)"}</p>
        <p className="text-xs text-[#5b5f58] max-w-md whitespace-pre-wrap">{msg.message}</p>
      </td>
      <td className="px-4 py-3 align-top text-xs text-[#5b5f58]">
        {new Date(msg.createdAt).toLocaleString("tr-TR")}
      </td>
      <td className="px-4 py-3 align-top text-right space-x-3">
        <button
          disabled={isPending}
          onClick={() => startTransition(() => toggleRead(msg.id, !msg.isRead))}
          className="text-[#5e6b52] hover:underline text-sm"
        >
          {msg.isRead ? "Okunmadı yap" : "Okundu yap"}
        </button>
        <button
          disabled={isPending}
          onClick={() => {
            if (confirm("Bu mesajı silmek istediğinize emin misiniz?")) {
              startTransition(() => deleteMessage(msg.id));
            }
          }}
          className="text-[#8b3a3a] hover:underline text-sm"
        >
          Sil
        </button>
      </td>
    </tr>
  );
}
