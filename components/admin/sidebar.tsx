import Link from "next/link";
import { getMessages, type AppLocale } from "@/lib/i18n";

type Messages = ReturnType<typeof getMessages>;

export function AdminSidebar({ locale, messages }: { locale: AppLocale; messages: Messages }) {
  const links = [
    [messages.admin.overview, `/${locale}/admin`],
    [messages.admin.brand, `/${locale}/admin/brand`],
    [messages.admin.theme, `/${locale}/admin/theme`],
    [messages.admin.homepage, `/${locale}/admin/content`],
    [messages.admin.cars, `/${locale}/admin/cars`],
    [messages.admin.blog, `/${locale}/admin/blog`],
    [messages.admin.faq, `/${locale}/admin/faq`],
    [messages.admin.navigation, `/${locale}/admin/navigation`],
    [messages.admin.media, `/${locale}/admin/media`],
    [messages.admin.legal, `/${locale}/admin/legal`],
    [messages.admin.company, `/${locale}/admin/company`]
  ];

  return (
    <aside className="rounded-2xl bg-slate-900 p-4 text-slate-100">
      <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">{messages.admin.title}</p>
      <nav className="space-y-2 text-sm">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded-lg px-3 py-2 hover:bg-slate-800">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
