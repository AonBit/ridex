"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SUPPORTED_LOCALES, type AppLocale } from "@/lib/i18n";

const LABELS: Record<AppLocale, string> = {
  ja: "JA",
  en: "EN",
  "zh-Hant": "繁中"
};

function replaceLocalePrefix(pathname: string, targetLocale: AppLocale) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0] as AppLocale)) {
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  }
  return `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function LocaleSwitcher({ locale, className = "" }: { locale: AppLocale; className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  return (
    <div className={`inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white/90 px-1 py-1 ${className}`}>
      {SUPPORTED_LOCALES.map((item) => {
        const href = `${replaceLocalePrefix(pathname || "/", item)}${search ? `?${search}` : ""}`;
        const active = item === locale;
        return (
          <Link
            key={item}
            href={href}
            className={`rounded-md px-2 py-1 text-xs font-semibold transition ${active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
          >
            {LABELS[item]}
          </Link>
        );
      })}
    </div>
  );
}
