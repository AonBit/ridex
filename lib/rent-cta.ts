import type { SiteConfig } from "@prisma/client";

export function resolveRentCtaHref(site: SiteConfig | null | undefined): string {
  if (!site) return "#";

  const target = site.rentCtaTarget?.trim();
  const type = site.rentCtaType ?? "phone";

  switch (type) {
    case "phone": {
      const phone = (target || site.contactPhone || "").replace(/\s+/g, "");
      return phone ? `tel:${phone}` : "#";
    }
    case "email": {
      const email = target || site.contactEmail || "";
      return email ? `mailto:${email}` : "#";
    }
    case "whatsapp": {
      const raw = (target || site.whatsapp || site.contactPhone || "").replace(/\D/g, "");
      return raw ? `https://wa.me/${raw}` : "#";
    }
    case "url":
      return target || "#";
    default:
      return "#";
  }
}
