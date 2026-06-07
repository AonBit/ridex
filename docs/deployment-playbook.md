# Deployment Playbook (Single-Customer Private Instance)

## 1. Prepare Environment
- Copy `.env.example` to `.env` (local) or `docker/.env.example` to `docker/.env`
- Set `AUTH_SECRET` / `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- Set `NEXTAUTH_URL` to your public site URL (e.g. `https://rent.example.com`), not `/api/auth`
- Set `AUTH_TRUST_HOST=true` when behind a reverse proxy (Synology, nginx, Cloudflare)
- Generate and set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` (`openssl rand -base64 32`); use the **same value** when building the Docker image and when running the container
- Do not set `AUTH_URL` unless required — incorrect values cause Auth.js `UnknownAction` errors
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

## 7. Troubleshooting

### `Failed to find Server Action "0000…"` or `reading 'workers'`
- Set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` in `.env`, rebuild the image (`docker compose build --no-cache`), then redeploy
- Hard-refresh the browser (Ctrl+Shift+R) after redeploy — old cached JS may reference stale action IDs
- Short action IDs like `"x"` in logs are usually bot probes; safe to ignore

### `[auth][error] UnknownAction: Cannot parse action at /api/auth/*`
- Verify `NEXTAUTH_URL` matches the public URL users visit (https + correct hostname)
- Set `AUTH_TRUST_HOST=true`
- Remove `AUTH_URL` from `.env` if present
- Ensure the reverse proxy forwards `X-Forwarded-Host` and `X-Forwarded-Proto` to the container
