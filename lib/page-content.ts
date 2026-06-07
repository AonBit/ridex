import type { PageContent } from "@prisma/client";

export const PAGE_CONTENT_KEYS = [
  "page.heroTitle",
  "page.heroSubtitle",
  "page.heroCtaText",
  "page.heroCtaLink",
  "page.sectionFeaturedTitle",
  "page.sectionWhyUsTitle",
  "page.sectionFaqTitle",
  "page.seoTitle",
  "page.seoDescription"
] as const;

export type PageContentKey = (typeof PAGE_CONTENT_KEYS)[number];

export type ResolvedPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  sectionFeaturedTitle: string;
  sectionWhyUsTitle: string;
  sectionFaqTitle: string;
  seoTitle: string;
  seoDescription: string;
  showWhyUs: boolean;
  showFaq: boolean;
};

const KEY_FIELD_MAP: Record<PageContentKey, keyof PageContent> = {
  "page.heroTitle": "heroTitle",
  "page.heroSubtitle": "heroSubtitle",
  "page.heroCtaText": "heroCtaText",
  "page.heroCtaLink": "heroCtaLink",
  "page.sectionFeaturedTitle": "sectionFeaturedTitle",
  "page.sectionWhyUsTitle": "sectionWhyUsTitle",
  "page.sectionFaqTitle": "sectionFaqTitle",
  "page.seoTitle": "seoTitle",
  "page.seoDescription": "seoDescription"
};

export function resolvePageContent(
  page: PageContent | null,
  localizedMap: Map<string, string>
): ResolvedPageContent {
  const text = (key: PageContentKey) => {
    const localized = localizedMap.get(key);
    if (localized !== undefined && localized !== "") return localized;
    const field = KEY_FIELD_MAP[key];
    const value = page?.[field];
    return typeof value === "string" ? value : "";
  };

  return {
    heroTitle: text("page.heroTitle"),
    heroSubtitle: text("page.heroSubtitle"),
    heroCtaText: text("page.heroCtaText"),
    heroCtaLink: text("page.heroCtaLink"),
    sectionFeaturedTitle: text("page.sectionFeaturedTitle"),
    sectionWhyUsTitle: text("page.sectionWhyUsTitle"),
    sectionFaqTitle: text("page.sectionFaqTitle"),
    seoTitle: text("page.seoTitle"),
    seoDescription: text("page.seoDescription"),
    showWhyUs: page?.showWhyUs ?? true,
    showFaq: page?.showFaq ?? false
  };
}
