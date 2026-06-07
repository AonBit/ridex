import { prisma } from "@/lib/prisma";
import { normalizeLocale } from "@/lib/i18n";
import { resolvePageContent } from "@/lib/page-content";
import { Locale } from "@prisma/client";

export async function getPublicData(localeInput?: string) {
  const locale = normalizeLocale(localeInput);
  const dbLocale: Locale = locale === "zh-Hant" ? Locale.zh_Hant : (locale as Locale);

  const [site, theme, page, navItems, cars, faq, localizedTexts, legalPages, companyInfo] = await Promise.all([
    prisma.siteConfig.findUnique({ where: { id: 1 } }),
    prisma.themeConfig.findUnique({ where: { id: 1 } }),
    prisma.pageContent.findUnique({ where: { id: 1 } }),
    prisma.navItem.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } }),
    prisma.fleetCar.findMany({ where: { isPublished: true }, orderBy: { sortOrder: "asc" } }),
    prisma.faqItem.findMany({ where: { locale: dbLocale }, orderBy: { sortOrder: "asc" } }),
    prisma.localizedText.findMany({
      where: { locale: dbLocale, key: { startsWith: "page." } }
    }),
    prisma.legalPage.findMany({ where: { locale: dbLocale } }),
    prisma.companyInfo.findUnique({ where: { locale: dbLocale } })
  ]);

  const localizedMap = new Map(localizedTexts.map((entry) => [entry.key, entry.value]));
  const resolvedPage = resolvePageContent(page, localizedMap);

  return { site, theme, page: resolvedPage, navItems, cars, faq, locale, localizedTexts, legalPages, companyInfo };
}

export async function getAdminData() {
  const [site, theme, page, navItems, cars, faq, media, localizedTexts] = await Promise.all([
    prisma.siteConfig.findUnique({ where: { id: 1 } }),
    prisma.themeConfig.findUnique({ where: { id: 1 } }),
    prisma.pageContent.findUnique({ where: { id: 1 } }),
    prisma.navItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.fleetCar.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.faqItem.findMany({ orderBy: [{ locale: "asc" }, { sortOrder: "asc" }] }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.localizedText.findMany({ where: { key: { startsWith: "page." } } })
  ]);

  return { site, theme, page, navItems, cars, faq, media, localizedTexts };
}
