import Link from "next/link";
import { createCar } from "@/lib/actions";
import { CheckField, SectionCard, SubmitButton, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function NewCarPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const t = getMessages(locale).admin.carsPage;

  return (
    <div className="space-y-4">
      <Link href={`/${locale}/admin/cars`} className="text-sm text-sky-700 hover:underline">
        ← {t.backToList}
      </Link>

      <SectionCard title={t.newCar} description={t.desc}>
        <form action={createCar} className="grid gap-3 md:grid-cols-2">
          <input type="hidden" name="locale" value={locale} />
          <TextField name="name" label={t.name} required />
          <TextField name="brand" label={t.brand} required />
          <TextField name="sortOrder" label={t.sortOrder} defaultValue="0" />
          <CheckField name="isPublished" label={t.published} defaultChecked />
          <div className="md:col-span-2">
            <SubmitButton label={t.createAndContinue} />
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
