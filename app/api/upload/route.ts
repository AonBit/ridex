import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUpload } from "@/lib/storage";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const usedBy = formData.get("usedBy");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  const allowedMimeTypes = new Set(["image/jpeg", "image/png"]);
  if (!allowedMimeTypes.has(file.type)) {
    return NextResponse.json({ error: "Only JPG and PNG images are allowed" }, { status: 400 });
  }

  const saved = await saveUpload(file);

  const asset = await prisma.mediaAsset.create({
    data: {
      path: saved.path,
      fileName: saved.fileName,
      mimeType: saved.mimeType,
      size: saved.size,
      usedBy: typeof usedBy === "string" ? usedBy : null
    }
  });

  return NextResponse.json({ asset });
}
