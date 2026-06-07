import { createFaqItem, updateFaqItem } from "@/lib/actions";
import { getAdminData } from "@/lib/data";
import { LOCALE_OPTIONS } from "@/lib/i18n/locale-db";
import { FaqItemActions } from "@/components/admin/faq-item-actions";
import { SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function FaqPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const { faq } = await getAdminData();
  const t = getMessages(locale).admin.faqPage;

  return (
    <div className="space-y-4">
      {LOCALE_OPTIONS.map((localeOption) => {
        const items = faq.filter((item) => item.locale === localeOption.db);

        return (
          <SectionCard key={localeOption.app} title={`${t.title} (${localeOption.app})`} description={t.desc}>
            <form action={createFaqItem} className="space-y-3 rounded-lg border border-slate-200 p-4">
              <input type="hidden" name="locale" value={localeOption.app} />
              <TextField name="question" label={t.question} required />
              <TextArea name="answer" label={t.answer} rows={3} required />
              <TextField name="sortOrder" label={t.sortOrder} defaultValue="0" />
              <SubmitButton label={t.add} />
            </form>

            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                  <form action={updateFaqItem} className="space-y-3">
                    <input type="hidden" name="id" value={item.id} />
                    <TextField name="question" label={t.question} defaultValue={item.question} required />
                    <TextArea name="answer" label={t.answer} defaultValue={item.answer} rows={3} required />
                    <TextField name="sortOrder" label={t.sortOrder} defaultValue={String(item.sortOrder)} />
                    <div className="flex flex-wrap items-center gap-2">
                      <SubmitButton label={t.save} />
                      <FaqItemActions id={item.id} labels={{ delete: t.delete, confirmDelete: t.confirmDelete }} />
                    </div>
                  </form>
                </div>
              ))}
              {!items.length && <p className="text-sm text-slate-500">{t.empty}</p>}
            </div>
          </SectionCard>
        );
      })}
    </div>
  );
}
