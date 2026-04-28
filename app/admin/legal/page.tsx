import { LegalContentType, Locale } from "@prisma/client";
import { marked } from "marked";
import { prisma } from "@/lib/prisma";
import { upsertLegalPage } from "@/lib/actions";
import { SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

const localeOptions = [
  { db: Locale.ja, app: "ja" },
  { db: Locale.en, app: "en" },
  { db: Locale.zh_Hant, app: "zh-Hant" }
] as const;

const legalSlugs = [
  { slug: "tokushoho", key: "tokushoho", contentType: LegalContentType.TEXT },
  { slug: "privacy", key: "privacy", contentType: LegalContentType.TEXT },
  { slug: "anti-social-policy", key: "antiSocialPolicy", contentType: LegalContentType.TEXT },
  { slug: "rental-terms", key: "rentalTerms", contentType: LegalContentType.MARKDOWN }
] as const;

export default async function LegalPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const legalPages = await prisma.legalPage.findMany();
  const messages = getMessages(locale);
  const t = messages.admin.legalPage;

  return (
    <SectionCard title={t.title} description={t.desc}>
      <div className="space-y-8">
        {localeOptions.map((localeOption) => (
          <div key={localeOption.db} className="rounded-xl border border-slate-200 p-4">
            <h3 className="mb-3 text-lg font-semibold">{localeOption.app}</h3>
            <div className="space-y-4">
              {legalSlugs.map((entry) => {
                const current = legalPages.find((item) => item.locale === localeOption.db && item.slug === entry.slug);
                const legalTitle = messages.legal[entry.key];
                return (
                  <form key={`${localeOption.db}-${entry.slug}`} action={upsertLegalPage} className="space-y-2 rounded-lg border border-slate-100 p-3">
                    <input type="hidden" name="locale" value={localeOption.app} />
                    <input type="hidden" name="slug" value={entry.slug} />
                    <input type="hidden" name="contentType" value={entry.contentType} />
                    <TextField name="title" label={`${legalTitle} ${t.titleSuffix}`} defaultValue={current?.title ?? legalTitle} />
                    <TextArea name="content" label={entry.contentType === LegalContentType.MARKDOWN ? t.markdownContent : t.content} defaultValue={current?.content ?? ""} rows={entry.contentType === LegalContentType.MARKDOWN ? 12 : 6} />
                    {entry.contentType === LegalContentType.MARKDOWN && current?.content ? (
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <p className="mb-2 text-xs text-slate-500">{t.preview}</p>
                        <div dangerouslySetInnerHTML={{ __html: marked.parse(current.content) }} />
                      </div>
                    ) : null}
                    <SubmitButton label={t.save} />
                  </form>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
