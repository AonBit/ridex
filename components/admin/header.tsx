import { auth, signOut } from "@/lib/auth";
import { getMessages, type AppLocale } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";

export async function AdminHeader({
  locale,
  messages
}: {
  locale: AppLocale;
  messages: ReturnType<typeof getMessages>;
}) {
  const session = await auth();

  return (
    <header className="mb-6 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm text-slate-500">{messages.admin.signedInAs}</p>
        <p className="font-semibold">{session?.user?.email}</p>
      </div>
      <div className="flex items-center gap-2">
        <LocaleSwitcher locale={locale} />
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: `/${locale}/login` });
          }}
        >
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm">{messages.admin.signOut}</button>
        </form>
      </div>
    </header>
  );
}
