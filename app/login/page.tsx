import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

export default function LoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const hasInvalidCredentials = searchParams?.error === "credentials";

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto mt-16 max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-500">Use seeded owner credentials to access settings.</p>
        {hasInvalidCredentials ? (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">邮箱或密码错误，请重试。</p>
        ) : null}
        <form
          className="mt-5 space-y-4"
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", {
                email: String(formData.get("email")),
                password: String(formData.get("password")),
                redirectTo: "/admin"
              });
            } catch (error) {
              if (error instanceof AuthError && error.type === "CredentialsSignin") {
                redirect("/login?error=credentials");
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
          <button className="w-full rounded-lg bg-slate-900 py-2 text-white">Sign in</button>
        </form>
      </div>
    </div>
  );
}
