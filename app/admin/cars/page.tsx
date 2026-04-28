import { createCar, updateCar } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { CheckField, SectionCard, SubmitButton, TextField } from "@/components/forms/base";
import { ImageUploadField } from "@/components/forms/image-upload-field";
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
          <TextField name="priceLabel" label={t.priceLabel} defaultValue="¥0/日" />
          <TextField name="mileageLabel" label={t.mileageLabel} />
          <div className="md:col-span-2">
            <ImageUploadField name="coverImagePath" label={t.coverImagePath} usedBy="fleet-car" />
          </div>
          <TextField name="sortOrder" label={t.sortOrder} />
          <CheckField name="isFeatured" label={t.featured} defaultChecked />
          <CheckField name="isPublished" label={t.published} defaultChecked />
          <div className="md:col-span-3"><SubmitButton label={t.add} /></div>
        </form>
      </SectionCard>

      <SectionCard title={t.existing}>
        <div className="space-y-2">
          {cars.map((car) => (
            <form key={car.id} action={updateCar} className="rounded-lg border border-slate-200 p-3 text-sm">
              <input type="hidden" name="id" value={car.id} />
              <div className="grid gap-3 md:grid-cols-3">
                <TextField name="name" label={t.name} defaultValue={car.name} required />
                <TextField name="brand" label={t.brand} defaultValue={car.brand} required />
                <TextField name="year" label={t.year} defaultValue={String(car.year)} />
                <TextField name="seats" label={t.seats} defaultValue={String(car.seats)} />
                <TextField name="fuelType" label={t.fuelType} defaultValue={car.fuelType} />
                <TextField name="transmission" label={t.transmission} defaultValue={car.transmission} />
                <TextField name="priceLabel" label={t.priceLabel} defaultValue={car.priceLabel} />
                <TextField name="mileageLabel" label={t.mileageLabel} defaultValue={car.mileageLabel} />
                <div className="md:col-span-2">
                  <ImageUploadField name="coverImagePath" label={t.coverImagePath} defaultValue={car.coverImagePath} usedBy={`fleet-car:${car.id}`} />
                </div>
                <TextField name="sortOrder" label={t.sortOrder} defaultValue={String(car.sortOrder)} />
                <CheckField name="isFeatured" label={t.featured} defaultChecked={car.isFeatured} />
                <CheckField name="isPublished" label={t.published} defaultChecked={car.isPublished} />
                <div className="md:col-span-3">
                  <SubmitButton label={t.save ?? "Save"} />
                </div>
              </div>
            </form>
          ))}
          {!cars.length && <p className="text-sm text-slate-500">{t.empty}</p>}
        </div>
      </SectionCard>
    </div>
  );
}
