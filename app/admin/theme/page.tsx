import { updateThemeConfig } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { SectionCard, SubmitButton, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

const colorFields = ["primaryColor", "secondaryColor", "accentColor", "backgroundColor", "surfaceColor", "textColor", "successColor", "warningColor", "errorColor"] as const;

export default async function ThemePage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const theme = await prisma.themeConfig.findUnique({ where: { id: 1 } });
  const t = getMessages(locale).admin.themePage;

  return (
    <SectionCard title={t.title} description={t.desc}>
      <form action={updateThemeConfig} className="grid gap-3 md:grid-cols-2">
        {colorFields.map((name, idx) => <TextField key={name} name={name} label={t.fields[idx]} defaultValue={theme?.[name]} />)}
        <TextField name="borderRadius" label={t.borderRadius} defaultValue={theme?.borderRadius} />
        <TextField name="shadowStyle" label={t.shadowStyle} defaultValue={theme?.shadowStyle} />
        <TextField name="fontHeading" label={t.fontHeading} defaultValue={theme?.fontHeading} />
        <TextField name="fontBody" label={t.fontBody} defaultValue={theme?.fontBody} />
        <div className="md:col-span-2"><SubmitButton label={t.save} /></div>
      </form>
    </SectionCard>
  );
}
