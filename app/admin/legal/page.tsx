import { LegalContentType, Locale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { LegalPageForm } from "@/components/admin/legal-page-form";
import { SectionCard } from "@/components/forms/base";
import { TOKUSHOHO_TEMPLATE_HTML } from "@/lib/legal-templates/tokushoho";
import { getMessages, type AppLocale } from "@/lib/i18n";

const legalSlugs = [
  { slug: "tokushoho", key: "tokushoho", mode: "wysiwyg" as const, contentType: LegalContentType.TEXT },
  { slug: "privacy", key: "privacy", mode: "sv" as const, contentType: LegalContentType.MARKDOWN },
  { slug: "anti-social-policy", key: "antiSocialPolicy", mode: "sv" as const, contentType: LegalContentType.MARKDOWN },
  { slug: "rental-terms", key: "rentalTerms", mode: "sv" as const, contentType: LegalContentType.MARKDOWN }
] as const;

export default async function LegalPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const legalPages = await prisma.legalPage.findMany({ where: { locale: Locale.ja } });
  const messages = getMessages(locale);
  const legalTitleJa = getMessages("ja").legal;
  const t = messages.admin.legalPage;

  return (
    <SectionCard title={t.title} description={t.desc}>
      <div className="space-y-4">
        {legalSlugs.map((entry) => {
          const current = legalPages.find((item) => item.slug === entry.slug);
          const legalTitle = legalTitleJa[entry.key];
          const isTokushoho = entry.slug === "tokushoho";

          return (
            <LegalPageForm
              key={entry.slug}
              slug={entry.slug}
              contentType={entry.contentType}
              mode={entry.mode}
              titleLabel={`${legalTitle} ${t.titleSuffix}`}
              contentLabel={isTokushoho ? t.htmlContent : t.markdownContent}
              defaultTitle={current?.title ?? legalTitle}
              defaultContent={current?.content ?? (isTokushoho ? TOKUSHOHO_TEMPLATE_HTML : "")}
              saveLabel={t.save}
              restoreTemplate={isTokushoho ? TOKUSHOHO_TEMPLATE_HTML : undefined}
              restoreLabel={isTokushoho ? t.restoreTemplate : undefined}
              confirmRestore={isTokushoho ? t.confirmRestoreTemplate : undefined}
            />
          );
        })}
      </div>
    </SectionCard>
  );
}
