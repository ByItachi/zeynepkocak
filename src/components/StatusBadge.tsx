'use client';

import { useAppLocale } from './LocaleProvider';

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  PENDING: 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-medium transition-colors bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  CONFIRMED: 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-medium transition-colors bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  COMPLETED: 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-medium transition-colors bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
  CANCELLED: 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-medium transition-colors bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { locale } = useAppLocale();
  const styles: string = statusStyles[status] ?? statusStyles.PENDING;
  const labels: Record<string, Record<string, string>> = {
    en: { PENDING: 'Pending', CONFIRMED: 'Confirmed', COMPLETED: 'Completed', CANCELLED: 'Cancelled' },
    tr: { PENDING: 'Beklemede', CONFIRMED: 'Onaylandı', COMPLETED: 'Tamamlandı', CANCELLED: 'İptal Edildi' },
  };
  const label = labels[locale]?.[status] ?? status;
  return <span className={styles}>{label}</span>;
}
