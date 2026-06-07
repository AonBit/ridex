import bcrypt from "bcryptjs";
import { LegalContentType, Locale, PrismaClient } from "@prisma/client";
import { TOKUSHOHO_TEMPLATE_HTML } from "../lib/legal-templates/tokushoho";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@ridex.local";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "OWNER" },
    create: { email, name: "Template Owner", passwordHash, role: "OWNER" }
  });

  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
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
      legalNotice: "日本全国向けにお得なレンタカー情報を提供。多様な車種から最適な一台を選べます。"
    }
  });

  await prisma.themeConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      primaryColor: "#3B82F6",
      secondaryColor: "#8B5CF6",
      accentColor: "#EC4899",
      backgroundColor: "#F8FAFC",
      surfaceColor: "#FFFFFF",
      textColor: "#1F2937",
      successColor: "#10B981",
      warningColor: "#F59E0B",
      errorColor: "#EF4444",
      borderRadius: "12px",
      shadowStyle: "0 8px 24px rgba(15, 23, 42, 0.08)",
      fontHeading: "Nunito",
      fontBody: "Open Sans"
    }
  });

  await prisma.pageContent.upsert({
    where: { id: 1 },
    update: { showFaq: true, showBlog: false, showTestimonials: false },
    create: {
      id: 1,
      heroTitle: "日本で手軽にレンタカー予約",
      heroSubtitle: "東京・神奈川・大阪エリアに対応",
      heroCtaText: "車両を見る",
      heroCtaLink: "#featured-car",
      sectionFeaturedTitle: "おすすめ車両",
      sectionWhyUsTitle: "4つのステップで利用開始",
      sectionBlogTitle: "お知らせ",
      sectionFaqTitle: "よくある質問",
      showWhyUs: true,
      showTestimonials: false,
      showFaq: true,
      showBlog: false,
      seoTitle: "Ridex - 日本向けレンタカー",
      seoDescription: "Ridex は日本市場向けの多言語レンタカーサイトテンプレートです。"
    }
  });

  if (!(await prisma.navItem.count())) {
    await prisma.navItem.createMany({
      data: [
        { label: "Home", href: "#home", sortOrder: 1 },
        { label: "Cars", href: "#featured-car", sortOrder: 2 },
        { label: "FAQ", href: "#faq", sortOrder: 3 }
      ]
    });
  }

  if (!(await prisma.fleetCar.count())) {
    await prisma.fleetCar.createMany({
      data: [
        { name: "Toyota RAV4", brand: "Toyota", year: 2021, seats: 4, fuelType: "Hybrid", transmission: "Automatic", priceLabel: "¥14,800", mileageLabel: "6.1km / 1-litre", coverImagePath: "/assets/images/car-1.jpg", sortOrder: 1 },
        { name: "BMW 3 Series", brand: "BMW", year: 2019, seats: 4, fuelType: "Gasoline", transmission: "Automatic", priceLabel: "¥12,000", mileageLabel: "8.2km / 1-litre", coverImagePath: "/assets/images/car-2.jpg", sortOrder: 2 },
        { name: "Volkswagen T-Cross", brand: "Volkswagen", year: 2020, seats: 4, fuelType: "Gasoline", transmission: "Automatic", priceLabel: "¥13,500", mileageLabel: "5.3km / 1-litre", coverImagePath: "/assets/images/car-3.jpg", sortOrder: 3 },
        { name: "Cadillac Escalade", brand: "Cadillac", year: 2020, seats: 4, fuelType: "Gasoline", transmission: "Automatic", priceLabel: "¥19,800", mileageLabel: "7.7km / 1-litre", coverImagePath: "/assets/images/car-4.jpg", sortOrder: 4 },
        { name: "BMW 4 Series GTI", brand: "BMW", year: 2021, seats: 4, fuelType: "Gasoline", transmission: "Automatic", priceLabel: "¥17,500", mileageLabel: "7.6km / 1-litre", coverImagePath: "/assets/images/car-5.jpg", sortOrder: 5 },
        { name: "BMW 4 Series", brand: "BMW", year: 2019, seats: 4, fuelType: "Gasoline", transmission: "Automatic", priceLabel: "¥15,900", mileageLabel: "7.2km / 1-litre", coverImagePath: "/assets/images/car-6.jpg", sortOrder: 6 }
      ]
    });
  }

  if (!(await prisma.faqItem.count())) {
    await prisma.faqItem.createMany({
      data: [
        { locale: Locale.ja, question: "予約に必要な書類は？", answer: "運転免許証と身分証明書をご用意ください。", sortOrder: 1 },
        { locale: Locale.ja, question: "キャンセルは可能ですか？", answer: "ご利用条件に応じてキャンセル可能です。詳細はお問い合わせください。", sortOrder: 2 },
        { locale: Locale.en, question: "What documents do I need?", answer: "Please bring a valid driver's license and ID.", sortOrder: 1 },
        { locale: Locale.en, question: "Can I cancel my booking?", answer: "Cancellation depends on your rental terms. Contact us for details.", sortOrder: 2 },
        { locale: Locale.zh_Hant, question: "租車需要哪些證件？", answer: "請攜帶有效駕照與身分證件。", sortOrder: 1 },
        { locale: Locale.zh_Hant, question: "可以取消預約嗎？", answer: "依租賃條款而定，詳情請聯絡我們。", sortOrder: 2 }
      ]
    });
  }

  const pageContentByLocale = {
    [Locale.ja]: {
      "page.heroTitle": "日本で手軽にレンタカー予約",
      "page.heroSubtitle": "東京・神奈川・大阪エリアに対応",
      "page.heroCtaText": "車両を見る",
      "page.heroCtaLink": "#featured-car",
      "page.sectionFeaturedTitle": "おすすめ車両",
      "page.sectionWhyUsTitle": "4つのステップで利用開始",
      "page.sectionFaqTitle": "よくある質問",
      "page.seoTitle": "Ridex - 日本向けレンタカー",
      "page.seoDescription": "Ridex は日本市場向けの多言語レンタカーサイトテンプレートです。"
    },
    [Locale.en]: {
      "page.heroTitle": "Rent a car in Japan with ease",
      "page.heroSubtitle": "Serving Tokyo, Kanagawa, and Osaka areas",
      "page.heroCtaText": "Explore cars",
      "page.heroCtaLink": "#featured-car",
      "page.sectionFeaturedTitle": "Featured vehicles",
      "page.sectionWhyUsTitle": "Get started in 4 simple steps",
      "page.sectionFaqTitle": "Frequently asked questions",
      "page.seoTitle": "Ridex - Car rental in Japan",
      "page.seoDescription": "Ridex is a multilingual car rental website template for the Japan market."
    },
    [Locale.zh_Hant]: {
      "page.heroTitle": "輕鬆在日本租車",
      "page.heroSubtitle": "服務東京、神奈川、大阪等地區",
      "page.heroCtaText": "查看車款",
      "page.heroCtaLink": "#featured-car",
      "page.sectionFeaturedTitle": "推薦車款",
      "page.sectionWhyUsTitle": "4 個步驟快速開始",
      "page.sectionFaqTitle": "常見問題",
      "page.seoTitle": "Ridex - 日本租車",
      "page.seoDescription": "Ridex 是面向日本市場的多語言租車網站模板。"
    }
  } as const;

  for (const locale of [Locale.ja, Locale.en, Locale.zh_Hant]) {
    const entries = pageContentByLocale[locale];
    for (const [key, value] of Object.entries(entries)) {
      await prisma.localizedText.upsert({
        where: { key_locale: { key, locale } },
        update: { value },
        create: { key, locale, value }
      });
    }
  }

  const legalSeed = {
    ja: {
      tokushoho: TOKUSHOHO_TEMPLATE_HTML,
      privacy: "個人情報の取得目的、第三者提供、保存期間、開示請求方法などをここに記載してください。",
      "anti-social-policy": "当社は反社会的勢力との一切の関係を遮断し、要求に対しては組織的に対応します。詳細方針をここに記載してください。",
      "rental-terms": "# レンタカー貸渡約款\n\nこのセクションに約款本文を Markdown で入力してください。"
    },
    en: {
      tokushoho: "Provide seller name, operator, address, contact, pricing, payment timing, delivery timing, and cancellation policy.",
      privacy: "Describe purpose of data collection, sharing, retention period, and data subject request process.",
      "anti-social-policy": "We reject all relationships with anti-social forces and respond in an organized manner.",
      "rental-terms": "# Rental Terms and Conditions\n\nWrite your markdown contract here."
    },
    zh_Hant: {
      tokushoho: "請填寫業者名稱、負責人、地址、聯絡方式、費用、付款時點、交付時點與取消政策。",
      privacy: "請填寫個人資料蒐集目的、第三方提供、保存期間與查詢更正方式。",
      "anti-social-policy": "本公司拒絕與反社會勢力往來，並以組織化方式處理相關要求。",
      "rental-terms": "# 租車借渡約款\n\n請在此以 Markdown 填寫條款內容。"
    }
  } as const;

  for (const locale of [Locale.ja, Locale.en, Locale.zh_Hant]) {
    const key = locale as keyof typeof legalSeed;
    const pages = legalSeed[key];
    for (const [slug, content] of Object.entries(pages)) {
      await prisma.legalPage.upsert({
        where: { slug_locale: { slug, locale } },
        update: {},
        create: {
          slug,
          locale,
          title:
            slug === "tokushoho"
              ? "特定商取引法に基づく表記"
              : slug === "privacy"
              ? "個人情報とプライバシー規約"
              : slug === "anti-social-policy"
              ? "反社会的勢力に対する基本方針"
              : "レンタカー貸渡約款",
          content,
          contentType:
            slug === "tokushoho" ? LegalContentType.TEXT : LegalContentType.MARKDOWN
        }
      });
    }

    await prisma.companyInfo.upsert({
      where: { locale },
      update: {},
      create: {
        locale,
        companyName: locale === Locale.ja ? "会社名（入力してください）" : locale === Locale.en ? "Company Name (Placeholder)" : "公司名稱（請填寫）",
        representative: locale === Locale.ja ? "代表者名（入力してください）" : locale === Locale.en ? "Representative Name (Placeholder)" : "代表人（請填寫）",
        registrationNo: locale === Locale.ja ? "法人番号（入力してください）" : locale === Locale.en ? "Registration Number (Placeholder)" : "統編/登記號（請填寫）",
        postalCode: locale === Locale.ja ? "郵便番号（入力してください）" : locale === Locale.en ? "Postal Code (Placeholder)" : "郵遞區號（請填寫）",
        address: locale === Locale.ja ? "所在地（入力してください）" : locale === Locale.en ? "Address (Placeholder)" : "地址（請填寫）",
        phone: locale === Locale.ja ? "電話番号（入力してください）" : locale === Locale.en ? "Phone (Placeholder)" : "電話（請填寫）",
        email: locale === Locale.ja ? "メール（入力してください）" : locale === Locale.en ? "Email (Placeholder)" : "電子郵件（請填寫）",
        businessHours: locale === Locale.ja ? "営業時間（入力してください）" : locale === Locale.en ? "Business Hours (Placeholder)" : "營業時間（請填寫）",
        supportHours: locale === Locale.ja ? "サポート対応時間（入力してください）" : locale === Locale.en ? "Support Hours (Placeholder)" : "客服時間（請填寫）"
      }
    });

    const footerRegionTitle =
      locale === Locale.ja ? "日本の主要エリア" : locale === Locale.en ? "Neighborhoods in Japan" : "日本熱門據點";
    const footerRegionItems =
      locale === Locale.ja
        ? "Tokyo\nShinjuku\nShibuya\nGinza\nUeno\nYokohama\nOsaka\nKyoto"
        : locale === Locale.en
          ? "Tokyo\nShinjuku\nShibuya\nGinza\nUeno\nYokohama\nOsaka\nKyoto"
          : "東京\n新宿\n澀谷\n銀座\n上野\n橫濱\n大阪\n京都";

    await prisma.localizedText.upsert({
      where: { key_locale: { key: "footer.region.title", locale } },
      update: { value: footerRegionTitle },
      create: { key: "footer.region.title", locale, value: footerRegionTitle }
    });

    await prisma.localizedText.upsert({
      where: { key_locale: { key: "footer.region.items", locale } },
      update: { value: footerRegionItems },
      create: { key: "footer.region.items", locale, value: footerRegionItems }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
