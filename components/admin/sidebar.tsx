import Link from "next/link";

const links = [
  ["Overview", "/admin"],
  ["Brand", "/admin/brand"],
  ["Theme", "/admin/theme"],
  ["Homepage", "/admin/content"],
  ["Cars", "/admin/cars"],
  ["Blog", "/admin/blog"],
  ["FAQ", "/admin/faq"],
  ["Navigation", "/admin/navigation"],
  ["Media", "/admin/media"]
];

export function AdminSidebar() {
  return (
    <aside className="rounded-2xl bg-slate-900 p-4 text-slate-100">
      <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">Ridex Template Admin</p>
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
