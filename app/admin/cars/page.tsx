import { createCar } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { CheckField, SectionCard, SubmitButton, TextField } from "@/components/forms/base";

export default async function CarsPage() {
  const cars = await prisma.fleetCar.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-4">
      <SectionCard title="Fleet Cars" description="Add and list published vehicles (no ordering workflow).">
        <form action={createCar} className="grid gap-3 md:grid-cols-3">
          <TextField name="name" label="Name" required />
          <TextField name="brand" label="Brand" required />
          <TextField name="year" label="Year" />
          <TextField name="seats" label="Seats" />
          <TextField name="fuelType" label="Fuel type" />
          <TextField name="transmission" label="Transmission" />
          <TextField name="priceLabel" label="Price label" />
          <TextField name="mileageLabel" label="Mileage label" />
          <TextField name="coverImagePath" label="Cover image path" />
          <TextField name="sortOrder" label="Sort order" />
          <CheckField name="isFeatured" label="Featured" defaultChecked />
          <CheckField name="isPublished" label="Published" defaultChecked />
          <div className="md:col-span-3"><SubmitButton label="Add car" /></div>
        </form>
      </SectionCard>

      <SectionCard title="Existing Cars">
        <div className="space-y-2">
          {cars.map((car) => (
            <div key={car.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <p className="font-semibold">{car.name} <span className="font-normal text-slate-500">({car.year})</span></p>
              <p className="text-slate-600">{car.brand} · {car.fuelType} · {car.priceLabel}</p>
            </div>
          ))}
          {!cars.length && <p className="text-sm text-slate-500">No cars yet.</p>}
        </div>
      </SectionCard>
    </div>
  );
}
