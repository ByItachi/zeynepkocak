

export const SUPPORTED_LOCALES = ["tr", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

export const localeLabels: Record<Locale, { label: string; flag: string }> = {
  tr: { label: "Türkçe", flag: "🇹🇷" },
  en: { label: "English", flag: "🇬🇧" },
};

export const messages = {
  tr: {
    nav: {
      home: "Anasayfa",
      about: "Hakkımda",
      services: "Hizmetler",
      groups: "Grup Terapileri",
      workshops: "Atölyeler",
      blog: "Blog",
      contact: "İletişim",
      partnerships: "Marka İş Birlikleri",
      booking: "Randevu Al",
    },
    hero: {
      title: "Kendinizi anlamaya ve ilişkilerinize yeni bir alan açmaya.",
      subtitle: "PSYCHOLOGY & WELLBEING",
      description:
        "Yetişkinler, ergenler ve çiftlerle yürütülen çalışmalar; psikodrama ve beden farkındalığı odaklı grup deneyimleri.",
      cta_primary: "İletişime Geç",
      cta_secondary: "Çalışma Alanlarım",
    },
    services: {
      title: "Çalışma Alanlarım",
      adults: "Yetişkinlerle Çalışma",
      teens: "Ergenlerle Çalışma",
      couples: "Çiftlerle Çalışma",
      online: "Online Görüşmeler",
      psychodrama: "Psikodrama & Grup Atölyeleri",
      expat: "Expat Psychologist",
      breath: "Transformational Breath®",
    },
    footer: {
      about: "Hakkımda",
      services: "Hizmetler",
      groups: "Grup Çalışmaları",
      legal: "Yasal & İletişim",
      copyright: "Tüm hakları saklıdır.",
      follow: "Instagram'da takip edin",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      groups: "Group Therapy",
      workshops: "Workshops",
      blog: "Blog",
      contact: "Contact",
      partnerships: "Brand Partnerships",
      booking: "Book Appointment",
    },
    hero: {
      title: "Understanding yourself and opening new spaces in your relationships.",
      subtitle: "PSYCHOLOGY & WELLBEING",
      description:
        "Individual work with adults, teens and couples; group experiences focused on psychodrama and body awareness.",
      cta_primary: "Get in Touch",
      cta_secondary: "My Services",
    },
    services: {
      title: "My Services",
      adults: "Work with Adults",
      teens: "Work with Teens",
      couples: "Couples Therapy",
      online: "Online Sessions",
      psychodrama: "Psychodrama & Group Workshops",
      expat: "Expat Psychologist",
      breath: "Transformational Breath®",
    },
    footer: {
      about: "About",
      services: "Services",
      groups: "Group Work",
      legal: "Legal & Contact",
      copyright: "All rights reserved.",
      follow: "Follow on Instagram",
    },
  },
};

export type Messages = typeof messages.tr & typeof messages.en;

export interface LanguageOption {
  locale: Locale;
  label: string;
  flag: string;
}

export function getLanguageOptions(): LanguageOption[] {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
    label: localeLabels[locale].label,
    flag: localeLabels[locale].flag,
  }));
}

export function getLocaleLabel(locale: Locale): string {
  return localeLabels[locale].label;
}

export function getLocaleFlag(locale: Locale): string {
  return localeLabels[locale].flag;
}

export function getMessages(locale: Locale): Messages {
  return locale === "en" ? messages.en : messages.tr;
}

export function getLocaleFromNavigator(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const navLocale = navigator.language.slice(0, 2).toLowerCase();
  return SUPPORTED_LOCALES.includes(navLocale as Locale)
    ? (navLocale as Locale)
    : DEFAULT_LOCALE;
}

export function getBrowserLocale(): Locale | undefined {
  if (typeof navigator === "undefined") return undefined;
  const navLocale = navigator.language.slice(0, 2).toLowerCase();
  return SUPPORTED_LOCALES.includes(navLocale as Locale)
    ? (navLocale as Locale)
    : undefined;
}

export const LANGUAGE_COOKIE = "zdr_lang";

export async function getPreferredLocale(): Promise<Locale> {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(LANGUAGE_COOKIE);
    if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) {
      return stored as Locale;
    }
    return getLocaleFromNavigator();
  }
  return process.env.NEXT_LOCALE as Locale || DEFAULT_LOCALE;
}

export async function setLocalePreference(locale: Locale) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_COOKIE, locale);
    }
  } catch {
    // localStorage may be unavailable in some environments
  }
}


