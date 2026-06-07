"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteCar, toggleCarPublished } from "@/lib/actions";

export function CarListActions({
  carId,
  locale,
  isPublished,
  labels
}: {
  carId: string;
  locale: string;
  isPublished: boolean;
  labels: {
    edit: string;
    publish: string;
    unpublish: string;
    delete: string;
    confirmDelete: string;
  };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/${locale}/admin/cars/${carId}`}
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50"
      >
        {labels.edit}
      </Link>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await toggleCarPublished(carId);
            router.refresh();
          })
        }
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50 disabled:opacity-60"
      >
        {isPublished ? labels.unpublish : labels.publish}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (!window.confirm(labels.confirmDelete)) return;
          startTransition(async () => {
            await deleteCar(carId);
            router.refresh();
          });
        }}
        className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-50 disabled:opacity-60"
      >
        {labels.delete}
      </button>
    </div>
  );
}
