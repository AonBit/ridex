import type { FleetCar } from "@prisma/client";

export const CAR_VISIBILITY_FIELDS = [
  "brand",
  "year",
  "seats",
  "fuelType",
  "mileage",
  "transmission",
  "price"
] as const;

export type CarVisibilityField = (typeof CAR_VISIBILITY_FIELDS)[number];

export type CarFieldVisibility = Record<CarVisibilityField, boolean>;

export const DEFAULT_FIELD_VISIBILITY: CarFieldVisibility = {
  brand: true,
  year: true,
  seats: true,
  fuelType: true,
  mileage: true,
  transmission: true,
  price: true
};

const FIELD_VALUE_GETTERS: Record<CarVisibilityField, (car: FleetCar) => string> = {
  brand: (car) => car.brand,
  year: (car) => String(car.year),
  seats: (car) => String(car.seats),
  fuelType: (car) => car.fuelType,
  mileage: (car) => car.mileageLabel,
  transmission: (car) => car.transmission,
  price: (car) => car.priceLabel
};

export function resolveFieldVisibility(raw: unknown): CarFieldVisibility {
  const parsed = (raw && typeof raw === "object" ? raw : {}) as Partial<CarFieldVisibility>;
  return { ...DEFAULT_FIELD_VISIBILITY, ...parsed };
}

export function isFieldVisible(car: FleetCar, field: CarVisibilityField): boolean {
  return resolveFieldVisibility(car.fieldVisibility)[field];
}

export function shouldRenderField(car: FleetCar, field: CarVisibilityField, value?: string): boolean {
  const resolved = value ?? FIELD_VALUE_GETTERS[field](car);
  return isFieldVisible(car, field) && Boolean(resolved?.trim());
}

export function getVisibilityWarnings(car: FleetCar): CarVisibilityField[] {
  return CAR_VISIBILITY_FIELDS.filter((field) => {
    const value = FIELD_VALUE_GETTERS[field](car);
    return isFieldVisible(car, field) && !value?.trim();
  });
}

export function parseFieldVisibilityFromForm(formData: FormData): CarFieldVisibility {
  return CAR_VISIBILITY_FIELDS.reduce<CarFieldVisibility>((acc, field) => {
    acc[field] = formData.get(`visibility_${field}`) === "on";
    return acc;
  }, { ...DEFAULT_FIELD_VISIBILITY });
}
