import { auth, signOut } from "@/lib/auth";

export async function AdminHeader() {
  const session = await auth();

  return (
    <header className="mb-6 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm text-slate-500">Signed in as</p>
        <p className="font-semibold">{session?.user?.email}</p>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/admin/login" });
        }}
      >
        <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Sign out</button>
      </form>
    </header>
  );
}
