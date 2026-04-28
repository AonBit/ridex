import { LegalContentType, Locale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { upsertLegalPage } from "@/lib/actions";
import { SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";
import { MarkdownEditor } from "@/components/forms/markdown-editor";
import { getMessages, type AppLocale } from "@/lib/i18n";

const legalSlugs = [
  { slug: "tokushoho", key: "tokushoho", contentType: LegalContentType.TEXT },
  { slug: "privacy", key: "privacy", contentType: LegalContentType.TEXT },
  { slug: "anti-social-policy", key: "antiSocialPolicy", contentType: LegalContentType.TEXT },
  { slug: "rental-terms", key: "rentalTerms", contentType: LegalContentType.MARKDOWN }
] as const;

export default async function LegalPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const legalPages = await prisma.legalPage.findMany({ where: { locale: Locale.ja } });
  const messages = getMessages(locale);
  const legalTitleJa = getMessages("ja").legal;
  const t = messages.admin.legalPage;

  return (
    <SectionCard title={t.title} description={`${t.desc}（日本語のみ）`}>
      <div className="space-y-4">
        {legalSlugs.map((entry) => {
          const current = legalPages.find((item) => item.slug === entry.slug);
          const legalTitle = legalTitleJa[entry.key];
          return (
            <form key={entry.slug} action={upsertLegalPage} className="space-y-2 rounded-lg border border-slate-100 p-3">
              <input type="hidden" name="locale" value="ja" />
              <input type="hidden" name="slug" value={entry.slug} />
              <input type="hidden" name="contentType" value={entry.contentType} />
              <TextField name="title" label={`${legalTitle} ${t.titleSuffix}`} defaultValue={current?.title ?? legalTitle} />
              {entry.contentType === LegalContentType.MARKDOWN ? (
                <MarkdownEditor name="content" label={t.markdownContent} defaultValue={current?.content ?? ""} previewLabel={t.preview} rows={12} />
              ) : (
                <TextArea name="content" label={t.content} defaultValue={current?.content ?? ""} rows={6} />
              )}
              <SubmitButton label={t.save} />
            </form>
          );
        })}
      </div>
    </SectionCard>
  );
}
