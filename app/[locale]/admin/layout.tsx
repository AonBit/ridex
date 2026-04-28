import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { getMessages, isSupportedLocale } from "@/lib/i18n";

export default async function LocalizedAdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isSupportedLocale(params.locale)) notFound();

  const session = await auth();
  if (!session?.user) {
    redirect(`/${params.locale}/login`);
  }

  const messages = getMessages(params.locale);

  return (
    <div className="admin-shell min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[240px_1fr]">
        <AdminSidebar locale={params.locale} messages={messages} />
        <main>
          <AdminHeader locale={params.locale} messages={messages} />
          <div className="space-y-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
