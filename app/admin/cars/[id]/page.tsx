import Link from "next/link";
import { notFound } from "next/navigation";
import { updateCar } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import {
  CAR_VISIBILITY_FIELDS,
  getVisibilityWarnings,
  resolveFieldVisibility,
  type CarVisibilityField
} from "@/lib/car-visibility";
import { CheckField, SectionCard, SubmitButton, TextField } from "@/components/forms/base";
import { CoverUploadField } from "@/components/forms/cover-upload-field";
import { getMessages, type AppLocale } from "@/lib/i18n";

const VISIBILITY_LABELS: Record<CarVisibilityField, keyof ReturnType<typeof getMessages>["admin"]["carsPage"]> = {
  brand: "showBrand",
  year: "showYear",
  seats: "showSeats",
  fuelType: "showFuelType",
  mileage: "showMileage",
  transmission: "showTransmission",
  price: "showPrice"
};

export default async function EditCarPage({
  params
}: {
  params?: { locale?: AppLocale; id?: string };
}) {
  const locale = params?.locale ?? "ja";
  const id = params?.id ?? "";
  const car = await prisma.fleetCar.findUnique({ where: { id } });
  if (!car) notFound();

  const t = getMessages(locale).admin.carsPage;
  const visibility = resolveFieldVisibility(car.fieldVisibility);
  const warnings = getVisibilityWarnings(car);

  return (
    <div className="space-y-4">
      <Link href={`/${locale}/admin/cars`} className="text-sm text-sky-700 hover:underline">
        ← {t.backToList}
      </Link>

      {warnings.length ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">{t.visibilityWarning}</p>
          <p className="mt-1 text-amber-800">{t.visibilityWarningDesc}</p>
          <ul className="mt-2 list-inside list-disc">
            {warnings.map((field) => (
              <li key={field}>{t[VISIBILITY_LABELS[field]]}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <SectionCard title={t.editCar} description={car.name}>
        <form action={updateCar} className="grid gap-3 md:grid-cols-3">
          <input type="hidden" name="id" value={car.id} />

          <p className="md:col-span-3 text-sm font-semibold text-slate-700">{t.basicSection}</p>
          <TextField name="name" label={t.name} defaultValue={car.name} required />
          <TextField name="brand" label={t.brand} defaultValue={car.brand} required />
          <TextField name="year" label={t.year} defaultValue={String(car.year)} />
          <TextField name="seats" label={t.seats} defaultValue={String(car.seats)} />
          <TextField name="fuelType" label={t.fuelType} defaultValue={car.fuelType} />
          <TextField name="transmission" label={t.transmission} defaultValue={car.transmission} />
          <TextField name="priceLabel" label={t.priceLabel} defaultValue={car.priceLabel} />
          <TextField name="mileageLabel" label={t.mileageLabel} defaultValue={car.mileageLabel} />
          <TextField name="sortOrder" label={t.sortOrder} defaultValue={String(car.sortOrder)} />
          <CheckField name="isPublished" label={t.published} defaultChecked={car.isPublished} />

          <p className="md:col-span-3 mt-2 text-sm font-semibold text-slate-700">{t.visibilitySection}</p>
          {CAR_VISIBILITY_FIELDS.map((field) => (
            <CheckField
              key={field}
              name={`visibility_${field}`}
              label={t[VISIBILITY_LABELS[field]]}
              defaultChecked={visibility[field]}
            />
          ))}

          <div className="md:col-span-3">
            <SubmitButton label={t.save} />
          </div>
        </form>
      </SectionCard>

      <SectionCard title={t.coverSection} description={t.coverImagePath}>
        <CoverUploadField
          carId={car.id}
          defaultPath={car.coverImagePath}
          usedBy={`fleet-car:${car.id}`}
          labels={{
            dropHint: t.uploadDropHint,
            selectHint: t.uploadSelectHint,
            uploading: t.uploadUploading,
            retry: t.uploadRetry,
            invalidType: t.uploadInvalidType,
            tooLarge: t.uploadTooLarge,
            uploadFailed: t.uploadFailed
          }}
        />
      </SectionCard>
    </div>
  );
}
