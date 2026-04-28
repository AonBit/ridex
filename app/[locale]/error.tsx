"use client";

import { useParams } from "next/navigation";

const messages = {
  ja: { title: "エラーが発生しました", retry: "再試行" },
  en: { title: "Something went wrong", retry: "Try again" },
  "zh-Hant": { title: "發生錯誤", retry: "重試" }
} as const;

export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale = (params?.locale as keyof typeof messages) || "ja";
  const t = messages[locale] ?? messages.ja;

  return (
    <main className="container py-24">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="mt-2 text-sm text-slate-600">{error?.message || "Unexpected error."}</p>
        <button onClick={() => reset()} className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
          {t.retry}
        </button>
      </div>
    </main>
  );
}
