"use client";

import { useTransition } from "react";
import { updateCollaborationStatus } from "./actions";

const STATUS_LABEL: Record<string, string> = {
  RECEIVED: "Alındı",
  IN_REVIEW: "İnceleniyor",
  PROPOSAL: "Teklif Hazırlanıyor",
  APPROVED: "Onaylandı",
  IN_PROGRESS: "Devam Ediyor",
  COMPLETED: "Tamamlandı",
  REJECTED: "Reddedildi",
};

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateCollaborationStatus(id, e.target.value))}
      className="rounded border border-[#e2dccd] px-2 py-1 text-xs"
    >
      {Object.entries(STATUS_LABEL).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
