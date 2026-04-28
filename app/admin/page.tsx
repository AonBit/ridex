import Link from "next/link";
import { getAdminData } from "@/lib/data";
import { resetToRidexSnapshot } from "@/lib/actions";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function AdminPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const data = await getAdminData();
  const t = getMessages(locale).admin.dashboard;
  const cards = [
    [t.cards[0], data.cars.length, "cars"],
    [t.cards[1], data.blogPosts.length, "blog"],
    [t.cards[2], data.faq.length, "faq"],
    [t.cards[3], data.media.length, "media"],
    [t.cards[4], data.navItems.length, "navigation"]
  ] as const;

  return (
    <section className="admin-card rounded-2xl bg-white p-5 shadow-sm">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p className="mt-1 text-sm text-slate-500">{t.subtitle}</p>
      <form action={resetToRidexSnapshot} className="mt-4">
        <button className="admin-button rounded-lg px-4 py-2 text-sm text-white">{t.reset}</button>
      </form>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value, href]) => (
          <Link key={href} href={href} className="rounded-xl border border-slate-200 p-4 hover:border-slate-400">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
