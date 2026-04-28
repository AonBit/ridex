import Link from "next/link";
import { getAdminData } from "@/lib/data";
import { resetToRidexSnapshot } from "@/lib/actions";

export default async function AdminPage() {
  const data = await getAdminData();

  const cards = [
    ["Cars", data.cars.length, "/admin/cars"],
    ["Blog Posts", data.blogPosts.length, "/admin/blog"],
    ["FAQ Items", data.faq.length, "/admin/faq"],
    ["Media Assets", data.media.length, "/admin/media"],
    ["Navigation", data.navItems.length, "/admin/navigation"]
  ];

  return (
    <section className="admin-card rounded-2xl bg-white p-5 shadow-sm">
      <h1 className="text-2xl font-bold">Configuration Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Everything below is editable for each deployment.</p>
      <form action={resetToRidexSnapshot} className="mt-4">
        <button className="admin-button rounded-lg px-4 py-2 text-sm text-white">Restore Ridex default snapshot</button>
      </form>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value, href]) => (
          <Link key={label} href={String(href)} className="rounded-xl border border-slate-200 p-4 hover:border-slate-400">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-semibold">{String(value)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
