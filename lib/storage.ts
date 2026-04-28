import { mkdir, writeFile } from "fs/promises";
import path from "path";

const uploadDir = process.env.UPLOAD_DIR ?? "./public/uploads";

export async function saveUpload(file: File) {
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const targetDir = path.resolve(uploadDir);
  await mkdir(targetDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const destination = path.join(targetDir, fileName);
  await writeFile(destination, buffer);

  return {
    fileName,
    path: `/uploads/${fileName}`,
    size: buffer.byteLength,
    mimeType: file.type || "application/octet-stream"
  };
}
