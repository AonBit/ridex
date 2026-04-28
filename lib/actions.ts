"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { LegalContentType, Locale } from "@prisma/client";

function toInt(value: FormDataEntryValue | null, fallback = 0) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function toBoolean(value: FormDataEntryValue | null) {
  return value === "on";
}

export async function updateSiteConfig(formData: FormData) {
  await prisma.siteConfig.update({
    where: { id: 1 },
    data: {
      companyName: String(formData.get("companyName") ?? ""),
      companyTagline: String(formData.get("companyTagline") ?? ""),
      contactPhone: String(formData.get("contactPhone") ?? ""),
      contactEmail: String(formData.get("contactEmail") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      address: String(formData.get("address") ?? ""),
      businessHours: String(formData.get("businessHours") ?? ""),
      footerCopyright: String(formData.get("footerCopyright") ?? ""),
      legalNotice: String(formData.get("legalNotice") ?? "")
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateThemeConfig(formData: FormData) {
  await prisma.themeConfig.update({
    where: { id: 1 },
    data: {
      primaryColor: String(formData.get("primaryColor") ?? "#3B82F6"),
      secondaryColor: String(formData.get("secondaryColor") ?? "#8B5CF6"),
      accentColor: String(formData.get("accentColor") ?? "#EC4899"),
      backgroundColor: String(formData.get("backgroundColor") ?? "#F8FAFC"),
      surfaceColor: String(formData.get("surfaceColor") ?? "#FFFFFF"),
      textColor: String(formData.get("textColor") ?? "#1F2937"),
      successColor: String(formData.get("successColor") ?? "#10B981"),
      warningColor: String(formData.get("warningColor") ?? "#F59E0B"),
      errorColor: String(formData.get("errorColor") ?? "#EF4444"),
      borderRadius: String(formData.get("borderRadius") ?? "12px"),
      shadowStyle: String(formData.get("shadowStyle") ?? "0 8px 24px rgba(15, 23, 42, 0.08)"),
      fontHeading: String(formData.get("fontHeading") ?? "Nunito"),
      fontBody: String(formData.get("fontBody") ?? "Open Sans")
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updatePageContent(formData: FormData) {
  await prisma.pageContent.update({
    where: { id: 1 },
    data: {
      heroTitle: String(formData.get("heroTitle") ?? ""),
      heroSubtitle: String(formData.get("heroSubtitle") ?? ""),
      heroCtaText: String(formData.get("heroCtaText") ?? ""),
      heroCtaLink: String(formData.get("heroCtaLink") ?? "#cars"),
      sectionFeaturedTitle: String(formData.get("sectionFeaturedTitle") ?? ""),
      sectionWhyUsTitle: String(formData.get("sectionWhyUsTitle") ?? ""),
      sectionBlogTitle: String(formData.get("sectionBlogTitle") ?? ""),
      sectionFaqTitle: String(formData.get("sectionFaqTitle") ?? ""),
      showWhyUs: toBoolean(formData.get("showWhyUs")),
      showTestimonials: toBoolean(formData.get("showTestimonials")),
      showFaq: toBoolean(formData.get("showFaq")),
      showBlog: toBoolean(formData.get("showBlog")),
      seoTitle: String(formData.get("seoTitle") ?? ""),
      seoDescription: String(formData.get("seoDescription") ?? "")
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createCar(formData: FormData) {
  await prisma.fleetCar.create({
    data: {
      name: String(formData.get("name") ?? ""),
      brand: String(formData.get("brand") ?? ""),
      year: toInt(formData.get("year"), 2024),
      seats: toInt(formData.get("seats"), 5),
      fuelType: String(formData.get("fuelType") ?? "Hybrid"),
      transmission: String(formData.get("transmission") ?? "AT"),
      priceLabel: String(formData.get("priceLabel") ?? "¥0/日"),
      mileageLabel: String(formData.get("mileageLabel") ?? "N/A"),
      coverImagePath: String(formData.get("coverImagePath") ?? "/uploads/placeholder-car.png"),
      isFeatured: toBoolean(formData.get("isFeatured")),
      isPublished: toBoolean(formData.get("isPublished")),
      sortOrder: toInt(formData.get("sortOrder"), 0)
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateCar(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.fleetCar.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? ""),
      brand: String(formData.get("brand") ?? ""),
      year: toInt(formData.get("year"), 2024),
      seats: toInt(formData.get("seats"), 5),
      fuelType: String(formData.get("fuelType") ?? "Hybrid"),
      transmission: String(formData.get("transmission") ?? "AT"),
      priceLabel: String(formData.get("priceLabel") ?? "¥0/日"),
      mileageLabel: String(formData.get("mileageLabel") ?? "N/A"),
      coverImagePath: String(formData.get("coverImagePath") ?? "/uploads/placeholder-car.png"),
      isFeatured: toBoolean(formData.get("isFeatured")),
      isPublished: toBoolean(formData.get("isPublished")),
      sortOrder: toInt(formData.get("sortOrder"), 0)
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/ja");
  revalidatePath("/en");
  revalidatePath("/zh-Hant");
}

export async function createBlogPost(formData: FormData) {
  const title = String(formData.get("title") ?? "");

  await prisma.blogPost.create({
    data: {
      title,
      slug: slugify(title),
      excerpt: String(formData.get("excerpt") ?? ""),
      body: String(formData.get("body") ?? ""),
      coverPath: String(formData.get("coverPath") ?? ""),
      isPublished: toBoolean(formData.get("isPublished")),
      publishedAt: new Date()
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createFaqItem(formData: FormData) {
  await prisma.faqItem.create({
    data: {
      question: String(formData.get("question") ?? ""),
      answer: String(formData.get("answer") ?? ""),
      sortOrder: toInt(formData.get("sortOrder"), 0)
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function resetToRidexSnapshot() {
  await prisma.$transaction(async (tx) => {
    await tx.siteConfig.upsert({
      where: { id: 1 },
      update: {
        companyName: "Ridex",
        companyTagline: "日本向けレンタカーソリューション",
        contactPhone: "8 800 234 56 78",
        contactEmail: "contact@ridex.local",
        whatsapp: "8 800 234 56 78",
        address: "東京都内・神奈川・大阪エリア対応",
        businessHours: "月 - 土: 9:00 - 18:00",
        logoPath: "/assets/images/logo.svg",
        faviconPath: "/favicon.svg",
        footerCopyright: "© 2022 codewithsadee. All Rights Reserved",
        legalNotice:
          "日本全国向けにお得なレンタカー情報を提供。多様な車種から最適な一台を選べます。"
      },
      create: {
        id: 1,
        companyName: "Ridex",
        companyTagline: "日本向けレンタカーソリューション",
        contactPhone: "8 800 234 56 78",
        contactEmail: "contact@ridex.local",
        whatsapp: "8 800 234 56 78",
        address: "東京都内・神奈川・大阪エリア対応",
        businessHours: "月 - 土: 9:00 - 18:00",
        logoPath: "/assets/images/logo.svg",
        faviconPath: "/favicon.svg",
        footerCopyright: "© 2022 codewithsadee. All Rights Reserved",
        legalNotice:
          "日本全国向けにお得なレンタカー情報を提供。多様な車種から最適な一台を選べます。"
      }
    });

    await tx.pageContent.upsert({
      where: { id: 1 },
      update: {
        heroTitle: "日本で手軽にレンタカー予約",
        heroSubtitle: "東京・神奈川・大阪エリアに対応",
        heroCtaText: "Explore cars",
        heroCtaLink: "#featured-car",
        sectionFeaturedTitle: "おすすめ車両",
        sectionWhyUsTitle: "4つのステップで利用開始",
        sectionBlogTitle: "お知らせ",
        sectionFaqTitle: "よくある質問",
        showWhyUs: true,
        showTestimonials: false,
        showFaq: false,
        showBlog: true,
        seoTitle: "Ridex - 日本向けレンタカー",
        seoDescription: "Ridex は日本市場向けの多言語レンタカーサイトテンプレートです。"
      },
      create: {
        id: 1,
        heroTitle: "日本で手軽にレンタカー予約",
        heroSubtitle: "東京・神奈川・大阪エリアに対応",
        heroCtaText: "Explore cars",
        heroCtaLink: "#featured-car",
        sectionFeaturedTitle: "おすすめ車両",
        sectionWhyUsTitle: "4つのステップで利用開始",
        sectionBlogTitle: "お知らせ",
        sectionFaqTitle: "よくある質問",
        showWhyUs: true,
        showTestimonials: false,
        showFaq: false,
        showBlog: true,
        seoTitle: "Ridex - 日本向けレンタカー",
        seoDescription: "Ridex は日本市場向けの多言語レンタカーサイトテンプレートです。"
      }
    });
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

function toDbLocale(locale: string): Locale {
  if (locale === "zh-Hant") return Locale.zh_Hant;
  if (locale === "en") return Locale.en;
  return Locale.ja;
}

export async function upsertLegalPage(formData: FormData) {
  const locale = toDbLocale(String(formData.get("locale") ?? "ja"));
  const slug = String(formData.get("slug") ?? "privacy");
  const title = String(formData.get("title") ?? "");
  const content = String(formData.get("content") ?? "");
  const contentType = String(formData.get("contentType") ?? "TEXT") as LegalContentType;

  await prisma.legalPage.upsert({
    where: { slug_locale: { slug, locale } },
    update: { title, content, contentType },
    create: { slug, locale, title, content, contentType }
  });

  revalidatePath("/");
  revalidatePath("/ja");
  revalidatePath("/en");
  revalidatePath("/zh-Hant");
}

export async function upsertCompanyInfo(formData: FormData) {
  const locale = toDbLocale(String(formData.get("locale") ?? "ja"));
  await prisma.companyInfo.upsert({
    where: { locale },
    update: {
      companyName: String(formData.get("companyName") ?? ""),
      representative: String(formData.get("representative") ?? ""),
      registrationNo: String(formData.get("registrationNo") ?? ""),
      postalCode: String(formData.get("postalCode") ?? ""),
      address: String(formData.get("address") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      businessHours: String(formData.get("businessHours") ?? ""),
      supportHours: String(formData.get("supportHours") ?? "")
    },
    create: {
      locale,
      companyName: String(formData.get("companyName") ?? ""),
      representative: String(formData.get("representative") ?? ""),
      registrationNo: String(formData.get("registrationNo") ?? ""),
      postalCode: String(formData.get("postalCode") ?? ""),
      address: String(formData.get("address") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      businessHours: String(formData.get("businessHours") ?? ""),
      supportHours: String(formData.get("supportHours") ?? "")
    }
  });

  revalidatePath("/");
  revalidatePath("/ja");
  revalidatePath("/en");
  revalidatePath("/zh-Hant");
}

export async function upsertFooterNeighborhoods(formData: FormData) {
  const locale = String(formData.get("locale") ?? "ja");
  const dbLocale = toDbLocale(locale);
  const title = String(formData.get("footerRegionTitle") ?? "");
  const itemsRaw = String(formData.get("footerRegionItems") ?? "");
  const items = itemsRaw
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .join("\n");

  await prisma.localizedText.upsert({
    where: { key_locale: { key: "footer.region.title", locale: dbLocale } },
    update: { value: title },
    create: { key: "footer.region.title", locale: dbLocale, value: title }
  });

  await prisma.localizedText.upsert({
    where: { key_locale: { key: "footer.region.items", locale: dbLocale } },
    update: { value: items },
    create: { key: "footer.region.items", locale: dbLocale, value: items }
  });

  revalidatePath("/");
  revalidatePath("/ja");
  revalidatePath("/en");
  revalidatePath("/zh-Hant");
}
