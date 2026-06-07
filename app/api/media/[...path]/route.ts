import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getUploadDir } from "@/lib/storage";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif"
};

export async function GET(_request: Request, { params }: { params: { path: string[] } }) {
  const segments = params.path ?? [];
  if (!segments.length || segments.some((segment) => segment.includes("..") || segment.includes("/") || segment.includes("\\"))) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const fileName = segments.join("/");
  const filePath = path.join(getUploadDir(), fileName);

  if (!filePath.startsWith(getUploadDir())) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const buffer = await readFile(filePath);
    const ext = path.extname(fileName).toLowerCase();
    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
