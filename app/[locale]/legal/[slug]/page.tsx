import { marked } from "marked";
import { notFound } from "next/navigation";
import { Locale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getMessages, isSupportedLocale } from "@/lib/i18n";

function toDbLocale(locale: string): Locale {
  if (locale === "zh-Hant") return Locale.zh_Hant;
  if (locale === "en") return Locale.en;
  return Locale.ja;
}

export default async function LegalSlugPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isSupportedLocale(params.locale)) notFound();

  const dbLocale = toDbLocale(params.locale);
  const page = await prisma.legalPage.findUnique({
    where: { slug_locale: { slug: params.slug, locale: dbLocale } }
  });

  if (!page) notFound();

  const html = page.contentType === "MARKDOWN" ? marked.parse(page.content) : page.content.replace(/\n/g, "<br />");
  const messages = getMessages(params.locale);

  return (
    <main className="container py-24">
      <h1 className="mb-4 text-3xl font-bold">{page.title}</h1>
      <p className="mb-6 text-sm text-slate-500">{messages.admin.title}</p>
      <article className="prose max-w-none rounded-xl bg-white p-6 shadow" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
