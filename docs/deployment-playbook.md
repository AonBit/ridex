# Deployment Playbook (Single-Customer Private Instance)

## 1. Prepare Environment
- Copy `.env.example` to `.env`
- Set `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- Local dev: `DATABASE_URL=file:./prisma/data.db`, `UPLOAD_DIR=./data/uploads`
- Docker (`docker/`): `DATABASE_URL=file:/app/data/data.db`, `UPLOAD_DIR=./data/uploads`

## 2. First Boot (local)
```bash
./scripts/bootstrap.sh
npm run build
npm run dev
```

`npm run dev` and `npm run start` automatically run schema push, media migration, and seed before starting.

## 3. Docker Deployment
```bash
docker compose up --build -d
```

The container entrypoint is `scripts/upgrade.sh`. On every start it:
- Pushes the Prisma schema to the persisted SQLite file
- Migrates uploaded media paths and files into `data/uploads`
- Runs idempotent seed
- Starts Next.js

To upgrade an existing deployment after a new image is published:
```bash
docker compose pull
docker compose up -d
```

No manual migration steps are required unless you are restoring from backup.

## 4. Data Portability
- Export config JSON: `GET /api/export`
- Import base config JSON: `POST /api/import`

## 5. Backup Strategy
- Backup `data/data.db`
- Backup `data/uploads`
- Restore both together to keep references valid

## 6. Delivery Checklist
- Admin login works
- Theme change reflects on public site
- Brand/contact info updated
- Fleet cards visible and sorted
- Blog/FAQ toggles and content display
- Export/import endpoints reachable
