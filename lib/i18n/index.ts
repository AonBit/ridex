import ja from "@/lib/i18n/locales/ja";
import en from "@/lib/i18n/locales/en";
import zhHant from "@/lib/i18n/locales/zhHant";

export const SUPPORTED_LOCALES = ["ja", "en", "zh-Hant"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = "ja";

export function isSupportedLocale(value: string): value is AppLocale {
  return SUPPORTED_LOCALES.includes(value as AppLocale);
}

export function normalizeLocale(value: string | null | undefined): AppLocale {
  if (!value) return DEFAULT_LOCALE;
  const lower = value.toLowerCase();
  if (lower.startsWith("ja")) return "ja";
  if (lower.startsWith("zh")) return "zh-Hant";
  if (lower.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}

export function detectLocaleFromHeader(acceptLanguage: string | null): AppLocale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const first = acceptLanguage.split(",")[0]?.trim();
  return normalizeLocale(first);
}

const messages = { ja, en, "zh-Hant": zhHant } as const;

export function getMessages(locale: AppLocale) {
  return messages[locale] ?? messages[DEFAULT_LOCALE];
}
