import { AuthError } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { getMessages, isSupportedLocale } from "@/lib/i18n";

export default function LocalizedLoginPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams?: { error?: string };
}) {
  if (!isSupportedLocale(params.locale)) notFound();
  const t = getMessages(params.locale).admin;
  const hasInvalidCredentials = searchParams?.error === "credentials";

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto mt-16 max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold">{t.signIn}</h1>
        <p className="mt-2 text-sm text-slate-500">Use seeded owner credentials to access settings.</p>
        {hasInvalidCredentials ? (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{t.invalidCredentials}</p>
        ) : null}
        <form
          className="mt-5 space-y-4"
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", {
                email: String(formData.get("email")),
                password: String(formData.get("password")),
                redirectTo: `/${params.locale}/admin`
              });
            } catch (error) {
              if (error instanceof AuthError && error.type === "CredentialsSignin") {
                redirect(`/${params.locale}/login?error=credentials`);
              }
              throw error;
            }
          }}
        >
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input name="email" type="email" required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm">Password</label>
            <input name="password" type="password" required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
          <button className="w-full rounded-lg bg-slate-900 py-2 text-white">{t.signIn}</button>
        </form>
      </div>
    </div>
  );
}
