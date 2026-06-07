import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { resolveMediaUrl } from "@/lib/media-url";
import { SectionCard } from "@/components/forms/base";
import { CarListActions } from "@/components/admin/car-list-actions";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function CarsPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const cars = await prisma.fleetCar.findMany({ orderBy: { sortOrder: "asc" } });
  const t = getMessages(locale).admin.carsPage;

  return (
    <div className="space-y-4">
      <SectionCard title={t.title} description={t.listDesc}>
        <div className="flex justify-end">
          <Link href={`/${locale}/admin/cars/new`} className="admin-button rounded-lg px-4 py-2 text-sm text-white">
            {t.addCar}
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {cars.map((car) => (
            <div key={car.id} className="flex flex-col gap-3 rounded-lg border border-slate-200 p-3 md:flex-row md:items-center">
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md bg-slate-100">
                {car.coverImagePath ? (
                  <img src={resolveMediaUrl(car.coverImagePath)} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">{car.name}</p>
                <p className="text-sm text-slate-500">
                  {car.brand} · {t.sortOrder} {car.sortOrder}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {car.isPublished ? t.statusPublished : t.statusDraft}
                </p>
              </div>
              <CarListActions
                carId={car.id}
                locale={locale}
                isPublished={car.isPublished}
                labels={{
                  edit: t.edit,
                  publish: t.publish,
                  unpublish: t.unpublish,
                  delete: t.delete,
                  confirmDelete: t.confirmDelete
                }}
              />
            </div>
          ))}
          {!cars.length && <p className="text-sm text-slate-500">{t.empty}</p>}
        </div>
      </SectionCard>
    </div>
  );
}
