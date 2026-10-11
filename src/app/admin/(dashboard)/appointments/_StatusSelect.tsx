"use client";

import { useTransition } from "react";
import { updateAppointmentStatus } from "./actions";

const STATUS_LABEL: Record<string, string> = {
  BEKLEMEDE: "Beklemede",
  ONAYLANDI: "Onaylandı",
  IPTAL: "İptal",
  TAMAMLANDI: "Tamamlandı",
};

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateAppointmentStatus(id, e.target.value))}
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
