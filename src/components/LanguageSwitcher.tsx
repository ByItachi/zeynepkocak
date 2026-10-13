"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useAppLocale } from "./LocaleProvider";
import { getLanguageOptions, LanguageOption } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useAppLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const options = useMemo<LanguageOption[]>(() => getLanguageOptions(), []);
  const active = options.find((o) => o.locale === locale) ?? options[0];

  const selectLocale = useCallback(
    (option: LanguageOption) => {
      setLocale(option.locale);
      setOpen(false);
    },
    [setLocale]
  );

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-forest/30 bg-white px-3 py-1.5 text-xs font-medium text-forest transition-colors hover:bg-forest/5 dark:border-tan/30 dark:bg-transparent dark:text-tan dark:hover:bg-tan/10"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Dil: ${active.label}`}
      >
        <span aria-hidden="true">{active.flag}</span>
        <span>{active.label}</span>
        <svg
          className={open ? "h-3.5 w-3.5 rotate-180 transition-transform" : "h-3.5 w-3.5 transition-transform"}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            aria-label="Dil seçimi"
            className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-xl border border-forest/20 bg-white p-1.5 shadow-lg dark:border-tan/20 dark:bg-forest"
          >
            {options.map((option) => (
              <li key={option.locale}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.locale === locale}
                  onClick={() => selectLocale(option)}
                  className={
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors " +
                    (option.locale === locale
                      ? "bg-forest/10 text-forest dark:bg-tan/10 dark:text-tan"
                      : "text-forest/80 hover:bg-forest/5 dark:text-tan/80 dark:hover:bg-tan/5")
                  }
                >
                  <span aria-hidden="true">{option.flag}</span>
                  <span>{option.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
