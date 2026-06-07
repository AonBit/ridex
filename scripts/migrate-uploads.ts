import { copyFile, mkdir, readdir } from "fs/promises";
import path from "path";
import { prisma } from "../lib/prisma";

const legacyDir = path.resolve("./public/uploads");
const targetDir = path.resolve(process.env.UPLOAD_DIR ?? "./data/uploads");

function toMediaPath(fileName: string) {
  return `/api/media/${fileName}`;
}

function migrateStoredPath(storedPath: string) {
  if (!storedPath.startsWith("/uploads/")) return storedPath;
  const fileName = storedPath.slice("/uploads/".length);
  return toMediaPath(fileName);
}

import { normalizeStoredMediaPath } from "../lib/media-url";

function normalizeMediaPath(storedPath: string) {
  return normalizeStoredMediaPath(migrateStoredPath(storedPath));
}

async function copyLegacyFiles() {
  await mkdir(targetDir, { recursive: true });

  let entries: string[] = [];
  try {
    entries = await readdir(legacyDir);
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry.startsWith(".")) continue;
    await copyFile(path.join(legacyDir, entry), path.join(targetDir, entry));
  }
}

async function migrateDatabasePaths() {
  const cars = await prisma.fleetCar.findMany();
  for (const car of cars) {
    const nextPath = normalizeMediaPath(car.coverImagePath);
    if (nextPath !== car.coverImagePath) {
      await prisma.fleetCar.update({
        where: { id: car.id },
        data: { coverImagePath: nextPath }
      });
    }
  }

  const assets = await prisma.mediaAsset.findMany();
  for (const asset of assets) {
    const nextPath = normalizeMediaPath(asset.path);
    if (nextPath !== asset.path) {
      await prisma.mediaAsset.update({
        where: { id: asset.id },
        data: { path: nextPath }
      });
    }
  }
}

async function main() {
  await copyLegacyFiles();
  await migrateDatabasePaths();
  console.log("Upload migration complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
