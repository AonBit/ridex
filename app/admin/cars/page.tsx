import { createCar } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { CheckField, SectionCard, SubmitButton, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function CarsPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const cars = await prisma.fleetCar.findMany({ orderBy: { sortOrder: "asc" } });
  const t = getMessages(locale).admin.carsPage;

  return (
    <div className="space-y-4">
      <SectionCard title={t.title} description={t.desc}>
        <form action={createCar} className="grid gap-3 md:grid-cols-3">
          <TextField name="name" label={t.name} required />
          <TextField name="brand" label={t.brand} required />
          <TextField name="year" label={t.year} />
          <TextField name="seats" label={t.seats} />
          <TextField name="fuelType" label={t.fuelType} />
          <TextField name="transmission" label={t.transmission} />
          <TextField name="priceLabel" label={t.priceLabel} />
          <TextField name="mileageLabel" label={t.mileageLabel} />
          <TextField name="coverImagePath" label={t.coverImagePath} />
          <TextField name="sortOrder" label={t.sortOrder} />
          <CheckField name="isFeatured" label={t.featured} defaultChecked />
          <CheckField name="isPublished" label={t.published} defaultChecked />
          <div className="md:col-span-3"><SubmitButton label={t.add} /></div>
        </form>
      </SectionCard>

      <SectionCard title={t.existing}>
        <div className="space-y-2">
          {cars.map((car) => (
            <div key={car.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <p className="font-semibold">{car.name} <span className="font-normal text-slate-500">({car.year})</span></p>
              <p className="text-slate-600">{car.brand} · {car.fuelType} · {car.priceLabel}</p>
            </div>
          ))}
          {!cars.length && <p className="text-sm text-slate-500">{t.empty}</p>}
        </div>
      </SectionCard>
    </div>
  );
}
