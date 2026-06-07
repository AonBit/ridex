#!/usr/bin/env sh
set -e

if [ ! -f .env ]; then
  cp .env.example .env
fi

npm install
sh scripts/upgrade-steps.sh

echo "Bootstrap complete. Run npm run dev"
