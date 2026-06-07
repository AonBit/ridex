#!/usr/bin/env sh
set -e

UPLOAD_DIR="${UPLOAD_DIR:-./data/uploads}"

echo "[upgrade] Applying schema and data migrations..."

npx prisma generate

mkdir -p "$(dirname "$UPLOAD_DIR")"
mkdir -p "$UPLOAD_DIR"

npx prisma db push --accept-data-loss
node scripts/migrate-uploads.mjs
npm run prisma:seed

echo "[upgrade] Ready."
