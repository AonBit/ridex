import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { renderLegalContent, resolveLegalContentFormat } from "@/lib/markdown";
import { getMessages, isSupportedLocale } from "@/lib/i18n";
import "vditor/dist/index.css";

export default async function LegalSlugPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isSupportedLocale(params.locale)) notFound();

  const page = await prisma.legalPage.findUnique({
    where: { slug_locale: { slug: params.slug, locale: Locale.ja } }
  });

  if (!page) notFound();

  const format = resolveLegalContentFormat(page.slug, page.content, page.contentType);
  const html = renderLegalContent(page.content, format);
  const messages = getMessages(params.locale);
  const showJapaneseOnlyNotice = params.locale !== "ja";

  return (
    <main className="container py-24">
      <Link href={`/${params.locale}`} className="mb-6 inline-block text-sm text-sky-700 hover:underline">
        ← {messages.site.exploreCars}
      </Link>
      <h1 className="mb-4 text-3xl font-bold">{page.title}</h1>
      <p className="mb-2 text-sm text-slate-500">{messages.legal.sectionLabel}</p>
      {showJapaneseOnlyNotice ? (
        <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900">
          {messages.legal.japaneseOnlyNotice}
        </p>
      ) : null}
      <article
        className="legal-content vditor-reset max-w-none rounded-xl bg-white p-6 shadow"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
