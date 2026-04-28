import { prisma } from "@/lib/prisma";
import { SectionCard } from "@/components/forms/base";

export default async function NavigationPage() {
  const navItems = await prisma.navItem.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <SectionCard title="Navigation" description="This MVP exposes current nav items. CRUD can be added in next iteration.">
      <div className="space-y-2">
        {navItems.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3 text-sm">
            <p className="font-semibold">{item.label}</p>
            <p className="text-slate-600">{item.href} · {item.type} · {item.isVisible ? "Visible" : "Hidden"}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
