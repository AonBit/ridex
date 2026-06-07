import { LegalContentType, Locale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { LegalPageForm } from "@/components/admin/legal-page-form";
import { SectionCard } from "@/components/forms/base";
import { TOKUSHOHO_TEMPLATE_MD } from "@/lib/legal-templates/tokushoho";
import { getMessages, type AppLocale } from "@/lib/i18n";

const legalSlugs = [
  { slug: "tokushoho", key: "tokushoho" },
  { slug: "privacy", key: "privacy" },
  { slug: "anti-social-policy", key: "antiSocialPolicy" },
  { slug: "rental-terms", key: "rentalTerms" }
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
              titleLabel={`${legalTitle} ${t.titleSuffix}`}
              contentLabel={t.markdownContent}
              defaultTitle={current?.title ?? legalTitle}
              defaultContent={current?.content ?? (isTokushoho ? TOKUSHOHO_TEMPLATE_MD : "")}
              saveLabel={t.save}
              savedLabel={t.saved}
              restoreTemplate={isTokushoho ? TOKUSHOHO_TEMPLATE_MD : undefined}
              restoreLabel={isTokushoho ? t.restoreTemplate : undefined}
              confirmRestore={isTokushoho ? t.confirmRestoreTemplate : undefined}
            />
          );
        })}
      </div>
    </SectionCard>
  );
}
