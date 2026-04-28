import { prisma } from "@/lib/prisma";
import { SectionCard } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function NavigationPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const navItems = await prisma.navItem.findMany({ orderBy: { sortOrder: "asc" } });
  const t = getMessages(locale).admin.navigationPage;

  return (
    <SectionCard title={t.title} description={t.desc}>
      <div className="space-y-2">
        {navItems.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3 text-sm">
            <p className="font-semibold">{item.label}</p>
            <p className="text-slate-600">{item.href} · {item.type} · {item.isVisible ? t.visible : t.hidden}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
