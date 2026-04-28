import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const theme = await prisma.themeConfig.findUnique({ where: { id: 1 } });
  return NextResponse.json({ theme });
}
