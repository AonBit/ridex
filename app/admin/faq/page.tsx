import { createFaqItem } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function FaqPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const faq = await prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } });
  const t = getMessages(locale).admin.faqPage;

  return (
    <div className="space-y-4">
      <SectionCard title={t.title} description={t.desc}>
        <form action={createFaqItem} className="space-y-3">
          <TextField name="question" label={t.question} required />
          <TextArea name="answer" label={t.answer} rows={3} />
          <TextField name="sortOrder" label={t.sortOrder} defaultValue="0" />
          <SubmitButton label={t.add} />
        </form>
      </SectionCard>

      <SectionCard title={t.list}>
        <div className="space-y-2">
          {faq.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <p className="font-semibold">{item.question}</p>
              <p className="text-slate-600">{item.answer}</p>
            </div>
          ))}
          {!faq.length && <p className="text-sm text-slate-500">{t.empty}</p>}
        </div>
      </SectionCard>
    </div>
  );
}
