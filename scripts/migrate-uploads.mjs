import { copyFile, mkdir, readdir } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const legacyDir = path.resolve("./public/uploads");
const targetDir = path.resolve(process.env.UPLOAD_DIR ?? "./data/uploads");

function toMediaPath(fileName) {
  return `/api/media/${fileName}`;
}

function migrateStoredPath(storedPath) {
  if (!storedPath.startsWith("/uploads/")) return storedPath;
  return toMediaPath(storedPath.slice("/uploads/".length));
}

function normalizeMediaPath(storedPath) {
  let next = migrateStoredPath(storedPath.trim());
  next = next.replace(/^\/\.\//, "/").replace(/^\.\//, "");
  if (!next.startsWith("/") && !/^https?:\/\//i.test(next)) {
    next = `/${next}`;
  }
  return next.replace(/\/{2,}/g, "/");
}

async function copyLegacyFiles() {
  await mkdir(targetDir, { recursive: true });

  let entries = [];
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
  console.log("[upgrade] Upload migration complete.");
}

main()
  .catch((error) => {
    console.error("[upgrade] Upload migration failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
