import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const payload = await request.json();

  await prisma.$transaction(async (tx) => {
    if (payload.siteConfig) {
      await tx.siteConfig.upsert({ where: { id: 1 }, update: payload.siteConfig, create: { id: 1, ...payload.siteConfig } });
    }
    if (payload.themeConfig) {
      await tx.themeConfig.upsert({ where: { id: 1 }, update: payload.themeConfig, create: { id: 1, ...payload.themeConfig } });
    }
    if (payload.pageContent) {
      await tx.pageContent.upsert({ where: { id: 1 }, update: payload.pageContent, create: { id: 1, ...payload.pageContent } });
    }
  });

  return NextResponse.json({ ok: true });
}
