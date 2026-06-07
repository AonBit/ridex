import { notFound } from "next/navigation";
import { loginWithCredentials } from "@/lib/actions";
import { getMessages, isSupportedLocale } from "@/lib/i18n";

export default function LocalizedLoginPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams?: { error?: string };
}) {
  if (!isSupportedLocale(params.locale)) notFound();
  const t = getMessages(params.locale);
  const hasInvalidCredentials = searchParams?.error === "credentials";

  return (
    <div className="admin-shell min-h-screen bg-slate-100 p-6">
      <div className="mx-auto mt-16 max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold">{t.admin.signIn}</h1>
        <p className="mt-2 text-sm text-slate-500">{t.admin.loginHint}</p>
        {hasInvalidCredentials ? (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{t.admin.invalidCredentials}</p>
        ) : null}
        <form className="mt-5 space-y-4" action={loginWithCredentials}>
          <input type="hidden" name="locale" value={params.locale} />
          <div>
            <label className="mb-1 block text-sm">{t.admin.emailLabel}</label>
            <input name="email" type="email" required className="w-full border-0 border-b-2 border-slate-300 bg-transparent px-1 py-2 outline-none transition duration-200 focus:-translate-y-0.5 focus:border-sky-500" />
          </div>
          <div>
            <label className="mb-1 block text-sm">{t.admin.passwordLabel}</label>
            <input name="password" type="password" required className="w-full border-0 border-b-2 border-slate-300 bg-transparent px-1 py-2 outline-none transition duration-200 focus:-translate-y-0.5 focus:border-sky-500" />
          </div>
          <button className="w-full rounded-lg bg-slate-900 py-2 text-white">{t.admin.signIn}</button>
        </form>
      </div>
    </div>
  );
}
