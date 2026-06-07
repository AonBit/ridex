import { updatePageToggles, upsertLocalizedPageContent } from "@/lib/actions";
import { getAdminData } from "@/lib/data";
import { LOCALE_OPTIONS } from "@/lib/i18n/locale-db";
import { PAGE_CONTENT_KEYS } from "@/lib/page-content";
import { CheckField, SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

const LONG_FIELDS = new Set(["page.heroSubtitle", "page.seoDescription"]);

const FIELD_LABELS: Record<(typeof PAGE_CONTENT_KEYS)[number], keyof ReturnType<typeof getMessages>["admin"]["contentPage"]> = {
  "page.heroTitle": "heroTitle",
  "page.heroSubtitle": "heroSubtitle",
  "page.heroCtaText": "heroCtaText",
  "page.heroCtaLink": "heroCtaLink",
  "page.sectionFeaturedTitle": "sectionFeaturedTitle",
  "page.sectionWhyUsTitle": "sectionWhyUsTitle",
  "page.sectionFaqTitle": "sectionFaqTitle",
  "page.seoTitle": "seoTitle",
  "page.seoDescription": "seoDescription"
};

export default async function ContentPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const { page, localizedTexts } = await getAdminData();
  const t = getMessages(locale).admin.contentPage;

  return (
    <div className="space-y-4">
      <SectionCard title={t.togglesTitle} description={t.togglesDesc}>
        <form action={updatePageToggles} className="grid gap-3 md:grid-cols-2">
          <CheckField name="showWhyUs" label={t.showWhyUs} defaultChecked={page?.showWhyUs} />
          <CheckField name="showFaq" label={t.showFaq} defaultChecked={page?.showFaq} />
          <div className="md:col-span-2">
            <SubmitButton label={t.saveToggles} />
          </div>
        </form>
      </SectionCard>

      {LOCALE_OPTIONS.map((localeOption) => {
        const values = new Map(
          localizedTexts
            .filter((entry) => entry.locale === localeOption.db)
            .map((entry) => [entry.key, entry.value])
        );

        return (
          <SectionCard key={localeOption.app} title={`${t.title} (${localeOption.app})`} description={t.desc}>
            <form action={upsertLocalizedPageContent} className="space-y-3">
              <input type="hidden" name="locale" value={localeOption.app} />
              {PAGE_CONTENT_KEYS.map((key) => {
                const labelKey = FIELD_LABELS[key];
                const defaultValue = values.get(key) ?? "";

                return LONG_FIELDS.has(key) ? (
                  <TextArea
                    key={key}
                    name={key}
                    label={t[labelKey]}
                    defaultValue={defaultValue}
                    rows={key === "page.seoDescription" ? 3 : 2}
                  />
                ) : (
                  <TextField key={key} name={key} label={t[labelKey]} defaultValue={defaultValue} />
                );
              })}
              <SubmitButton label={t.save} />
            </form>
          </SectionCard>
        );
      })}
    </div>
  );
}
