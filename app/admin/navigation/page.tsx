import { createNavItem, updateNavItem } from "@/lib/actions";
import { getAdminData } from "@/lib/data";
import { NavItemActions } from "@/components/admin/nav-item-actions";
import { CheckField, SectionCard, SelectField, SubmitButton, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function NavigationPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const { navItems } = await getAdminData();
  const t = getMessages(locale).admin.navigationPage;

  const typeOptions = [
    { value: "INTERNAL", label: t.typeInternal },
    { value: "EXTERNAL", label: t.typeExternal }
  ];

  return (
    <div className="space-y-4">
      <SectionCard title={t.title} description={t.desc}>
        <form action={createNavItem} className="grid gap-3 md:grid-cols-2">
          <TextField name="label" label={t.label} required />
          <TextField name="href" label={t.href} defaultValue="#home" required />
          <SelectField name="type" label={t.type} defaultValue="INTERNAL" options={typeOptions} />
          <TextField name="sortOrder" label={t.sortOrder} defaultValue="0" />
          <CheckField name="isVisible" label={t.visible} defaultChecked />
          <div className="md:col-span-2">
            <SubmitButton label={t.add} />
          </div>
        </form>
      </SectionCard>

      <SectionCard title={t.list}>
        <div className="space-y-3">
          {navItems.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-4">
              <form action={updateNavItem} className="grid gap-3 md:grid-cols-2">
                <input type="hidden" name="id" value={item.id} />
                <TextField name="label" label={t.label} defaultValue={item.label} required />
                <TextField name="href" label={t.href} defaultValue={item.href} required />
                <SelectField name="type" label={t.type} defaultValue={item.type} options={typeOptions} />
                <TextField name="sortOrder" label={t.sortOrder} defaultValue={String(item.sortOrder)} />
                <CheckField name="isVisible" label={t.visible} defaultChecked={item.isVisible} />
                <div className="flex flex-wrap items-center gap-2 md:col-span-2">
                  <SubmitButton label={t.save} />
                  <NavItemActions id={item.id} labels={{ delete: t.delete, confirmDelete: t.confirmDelete }} />
                </div>
              </form>
            </div>
          ))}
          {!navItems.length && <p className="text-sm text-slate-500">{t.empty}</p>}
        </div>
      </SectionCard>
    </div>
  );
}
