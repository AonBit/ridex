#!/usr/bin/env sh
set -e

sh scripts/upgrade-steps.sh
echo "[upgrade] Starting application..."
exec npm run start:app
