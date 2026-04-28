# Ridex Template Platform

A private-deployable car rental website template with an admin panel.

## Stack
- Next.js 14 + TypeScript
- Prisma + SQLite
- NextAuth (credentials)
- Local disk media storage (`public/uploads`)
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
3. Start dev server:
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

Persisted data:
- `prisma/data.db`
- `public/uploads/*`

## APIs
- `POST /api/upload` (multipart file)
- `GET /api/theme`
- `GET /api/export`
- `POST /api/import`

## Docs
- Editable fields matrix: `docs/editable-fields.md`
- Migration blueprint: `docs/migration-map.md`
- Delivery playbook: `docs/deployment-playbook.md`
