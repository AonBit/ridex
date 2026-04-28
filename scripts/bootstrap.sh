#!/usr/bin/env sh
set -e

if [ ! -f .env ]; then
  cp .env.example .env
fi

npm install
npx prisma generate
npx prisma db push
npm run prisma:seed

echo "Bootstrap complete. Run npm run dev"
