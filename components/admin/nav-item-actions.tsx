"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteNavItem } from "@/lib/actions";

export function NavItemActions({
  id,
  labels
}: {
  id: string;
  labels: { delete: string; confirmDelete: string };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(labels.confirmDelete)) return;
        startTransition(async () => {
          await deleteNavItem(id);
          router.refresh();
        });
      }}
      className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-50 disabled:opacity-60"
    >
      {labels.delete}
    </button>
  );
}
