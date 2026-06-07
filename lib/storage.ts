import { mkdir, writeFile } from "fs/promises";
import path from "path";

const uploadDir = process.env.UPLOAD_DIR ?? "./data/uploads";

export function getUploadDir() {
  return path.resolve(uploadDir);
}

export async function saveUpload(file: File) {
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const targetDir = getUploadDir();
  await mkdir(targetDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const destination = path.join(targetDir, fileName);
  await writeFile(destination, buffer);

  return {
    fileName,
    path: `/api/media/${fileName}`,
    size: buffer.byteLength,
    mimeType: file.type || "application/octet-stream"
  };
}
