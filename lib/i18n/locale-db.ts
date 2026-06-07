import { Locale } from "@prisma/client";
import type { AppLocale } from "@/lib/i18n";

export function toDbLocale(locale: string): Locale {
  if (locale === "zh-Hant") return Locale.zh_Hant;
  if (locale === "en") return Locale.en;
  return Locale.ja;
}

export function toAppLocale(locale: Locale): AppLocale {
  if (locale === Locale.zh_Hant) return "zh-Hant";
  if (locale === Locale.en) return "en";
  return "ja";
}

export const LOCALE_OPTIONS = [
  { db: Locale.ja, app: "ja" as const },
  { db: Locale.en, app: "en" as const },
  { db: Locale.zh_Hant, app: "zh-Hant" as const }
];
