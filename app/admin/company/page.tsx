import { Locale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { upsertCompanyInfo, upsertFooterNeighborhoods } from "@/lib/actions";
import { SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

const localeOptions = [
  { db: Locale.ja, app: "ja" },
  { db: Locale.en, app: "en" },
  { db: Locale.zh_Hant, app: "zh-Hant" }
] as const;

export default async function CompanyPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const [infos, localizedTexts] = await Promise.all([
    prisma.companyInfo.findMany(),
    prisma.localizedText.findMany({ where: { key: { in: ["footer.region.title", "footer.region.items"] } } })
  ]);
  const messages = getMessages(locale);
  const t = messages.admin.companyPage;
  const c = messages.company;

  return (
    <SectionCard title={t.title} description={t.desc}>
      <div className="space-y-8">
        {localeOptions.map((localeOption) => {
          const current = infos.find((item) => item.locale === localeOption.db);
          const footerRegionTitle = localizedTexts.find((item) => item.locale === localeOption.db && item.key === "footer.region.title")?.value ?? "";
          const footerRegionItems = localizedTexts.find((item) => item.locale === localeOption.db && item.key === "footer.region.items")?.value ?? "";

          return (
            <div key={localeOption.db} className="space-y-4 rounded-xl border border-slate-200 p-4">
              <h3 className="text-lg font-semibold">{localeOption.app}</h3>
              <form action={upsertCompanyInfo} className="space-y-3">
                <input type="hidden" name="locale" value={localeOption.app} />
                <div className="grid gap-3 md:grid-cols-2">
                  <TextField name="companyName" label={c.fieldCompanyName} defaultValue={current?.companyName} />
                  <TextField name="representative" label={c.fieldRepresentative} defaultValue={current?.representative} />
                  <TextField name="registrationNo" label={c.fieldRegistrationNo} defaultValue={current?.registrationNo} />
                  <TextField name="postalCode" label={c.fieldPostalCode} defaultValue={current?.postalCode} />
                  <TextField name="address" label={c.fieldAddress} defaultValue={current?.address} />
                  <TextField name="phone" label={c.fieldPhone} defaultValue={current?.phone} />
                  <TextField name="email" label={c.fieldEmail} defaultValue={current?.email} />
                  <TextField name="businessHours" label={c.fieldBusinessHours} defaultValue={current?.businessHours} />
                  <TextField name="supportHours" label={c.fieldSupportHours} defaultValue={current?.supportHours} />
                </div>
                <SubmitButton label={t.saveCompany} />
              </form>

              <form action={upsertFooterNeighborhoods} className="space-y-3 border-t border-slate-100 pt-4">
                <input type="hidden" name="locale" value={localeOption.app} />
                <TextField name="footerRegionTitle" label={t.footerTitle} defaultValue={footerRegionTitle} />
                <TextArea name="footerRegionItems" label={t.footerItems} defaultValue={footerRegionItems} rows={6} />
                <SubmitButton label={t.saveFooter} />
              </form>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
