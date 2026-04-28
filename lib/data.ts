import { prisma } from "@/lib/prisma";

export async function getPublicData() {
  const [site, theme, page, navItems, cars, whyUs, blogPosts, faq] = await Promise.all([
    prisma.siteConfig.findUnique({ where: { id: 1 } }),
    prisma.themeConfig.findUnique({ where: { id: 1 } }),
    prisma.pageContent.findUnique({ where: { id: 1 } }),
    prisma.navItem.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } }),
    prisma.fleetCar.findMany({ where: { isPublished: true }, orderBy: { sortOrder: "asc" } }),
    prisma.whyUsItem.findMany({ orderBy: { order: "asc" } }),
    prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" }, take: 6 }),
    prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } })
  ]);

  return { site, theme, page, navItems, cars, whyUs, blogPosts, faq };
}

export async function getAdminData() {
  const [site, theme, page, navItems, cars, whyUs, blogPosts, faq, media] = await Promise.all([
    prisma.siteConfig.findUnique({ where: { id: 1 } }),
    prisma.themeConfig.findUnique({ where: { id: 1 } }),
    prisma.pageContent.findUnique({ where: { id: 1 } }),
    prisma.navItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.fleetCar.findMany({ include: { media: true }, orderBy: { sortOrder: "asc" } }),
    prisma.whyUsItem.findMany({ orderBy: { order: "asc" } }),
    prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } }),
    prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } })
  ]);

  return { site, theme, page, navItems, cars, whyUs, blogPosts, faq, media };
}
