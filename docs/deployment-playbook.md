# Deployment Playbook (Single-Customer Private Instance)

## 1. Prepare Environment
- Copy `.env.example` to `.env`
- Set `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- Keep `DATABASE_URL=file:./prisma/data.db`

## 2. First Boot
```bash
npm install
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run build
npm run start
```

## 3. Docker Deployment
```bash
docker compose up --build -d
```

## 4. Data Portability
- Export config JSON: `GET /api/export`
- Import base config JSON: `POST /api/import`

## 5. Backup Strategy
- Backup `prisma/data.db`
- Backup `public/uploads`
- Restore both together to keep references valid

## 6. Delivery Checklist
- Admin login works
- Theme change reflects on public site
- Brand/contact info updated
- Fleet cards visible and sorted
- Blog/FAQ toggles and content display
- Export/import endpoints reachable
