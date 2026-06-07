# Ridex Template Platform

A private-deployable car rental website template with an admin panel.

## Stack
- Next.js 14 + TypeScript
- Prisma + SQLite
- NextAuth (credentials)
- Local disk media storage (`data/uploads`, served via `/api/media`)
- Docker Compose deployment

## Scope
- Editable brand, theme, homepage copy, fleet listing, blog, FAQ, navigation, and media.
- No online booking/payment/order workflow.

## Quick Start
1. Copy env:
   ```bash
   cp .env.example .env
   ```
2. Install and bootstrap:
   ```bash
   ./scripts/bootstrap.sh
   ```
3. Start dev server (schema/media/seed auto-upgrade via `predev`):
   ```bash
   npm run dev
   ```
4. Open:
   - Public site: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin`

Seed admin credentials are in `.env`:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Deployment
```bash
docker compose up --build -d
```

### Automatic upgrade on startup

Every container start runs [`scripts/upgrade.sh`](scripts/upgrade.sh):

1. `prisma generate` — refresh client
2. `prisma db push --accept-data-loss` — apply schema changes
3. `migrate-uploads.mjs` — copy legacy `public/uploads` files and rewrite `/uploads/` paths to `/api/media/`
4. `prisma:seed` — idempotent bootstrap data
5. `next start` — serve the app

Pull a newer image and restart to upgrade an existing instance:

```bash
docker compose pull
docker compose up -d
```

For local production-style runs: `npm run start` (auto-upgrades via `prestart`)

`npm run dev` and `npm run start` both run [`scripts/upgrade-steps.sh`](scripts/upgrade-steps.sh) automatically before launching the app.

For public domain deployment, ensure these env vars are set correctly:
- `NEXTAUTH_URL=https://your-domain.com`
- `NEXTAUTH_SECRET=<random-long-string>`
- `AUTH_TRUST_HOST=true`

Persisted data (survives upgrades):
- `data/data.db` (SQLite)
- `data/uploads/*` (uploaded media)

## APIs
- `POST /api/upload` (multipart file)
- `GET /api/media/[filename]` (uploaded media)
- `GET /api/theme`
- `GET /api/export`
- `POST /api/import`

## Docs
- Editable fields matrix: `docs/editable-fields.md`
- Migration blueprint: `docs/migration-map.md`
- Delivery playbook: `docs/deployment-playbook.md`
