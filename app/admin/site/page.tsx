import { Locale } from "@prisma/client";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { upsertFooterNeighborhoods } from "@/lib/actions";
import { SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

const localeOptions = [
  { db: Locale.ja, app: "ja" },
  { db: Locale.en, app: "en" },
  { db: Locale.zh_Hant, app: "zh-Hant" }
] as const;

export default async function SiteInfoPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const localizedTexts = await prisma.localizedText.findMany({ where: { key: { in: ["footer.region.title", "footer.region.items"] } } });
  const messages = getMessages(locale);
  const t = messages.admin.companyPage;

  return (
    <SectionCard title={messages.admin.siteInfo} description={t.siteInfoDesc}>
      <div className="mb-4 flex gap-2">
        <Link href={`/${locale}/admin/company`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700">
          {messages.admin.company}
        </Link>
        <Link href={`/${locale}/admin/site`} className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white">
          {messages.admin.siteInfo}
        </Link>
      </div>
      <div className="space-y-4">
        {localeOptions.map((localeOption) => {
          const footerRegionTitle = localizedTexts.find((item) => item.locale === localeOption.db && item.key === "footer.region.title")?.value ?? "";
          const footerRegionItems = localizedTexts.find((item) => item.locale === localeOption.db && item.key === "footer.region.items")?.value ?? "";

          return (
            <form key={localeOption.db} action={upsertFooterNeighborhoods} className="space-y-3 rounded-xl border border-slate-200 p-4">
              <h3 className="text-lg font-semibold">{localeOption.app}</h3>
              <input type="hidden" name="locale" value={localeOption.app} />
              <TextField name="footerRegionTitle" label={t.footerTitle} defaultValue={footerRegionTitle} />
              <TextArea name="footerRegionItems" label={t.footerItems} defaultValue={footerRegionItems} rows={6} />
              <SubmitButton label={t.saveFooter} />
            </form>
          );
        })}
      </div>
    </SectionCard>
  );
}
