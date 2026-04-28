import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [siteConfig, themeConfig, pageContent, navItems, cars, blogPosts, faqItems, whyUsItems] = await Promise.all([
    prisma.siteConfig.findUnique({ where: { id: 1 } }),
    prisma.themeConfig.findUnique({ where: { id: 1 } }),
    prisma.pageContent.findUnique({ where: { id: 1 } }),
    prisma.navItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.fleetCar.findMany({ include: { media: true }, orderBy: { sortOrder: "asc" } }),
    prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } }),
    prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.whyUsItem.findMany({ orderBy: { order: "asc" } })
  ]);

  return NextResponse.json({
    exportedAt: new Date().toISOString(),
    siteConfig,
    themeConfig,
    pageContent,
    navItems,
    cars,
    blogPosts,
    faqItems,
    whyUsItems
  });
}
