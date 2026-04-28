"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto mt-24 max-w-xl rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-900">Something went wrong</h2>
          <p className="mt-2 text-sm text-slate-600">{error?.message || "Unexpected application error."}</p>
          <button
            onClick={() => reset()}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
