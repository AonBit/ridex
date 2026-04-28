# Static-to-Platform Migration Map

## Source to Target
- Legacy `index.html` sections -> React section components in `components/site/public-home.tsx`
- Legacy `style.css` -> deployed static stylesheet at `public/assets/css/style.css` loaded in `app/layout.tsx`
- Legacy `script.js` interactions -> React client behavior in `components/site/site-behavior.tsx`

## Data-Driven Rendering
- Public page (`app/page.tsx`) fetches all editable data from SQLite via Prisma.
- Admin pages mutate data through server actions in `lib/actions.ts`.
- Upload API writes files to disk and metadata to `MediaAsset`.

## Incremental Rollout
1. Keep all runtime static assets in `public/assets` and `public/uploads`.
2. Replace hard-coded content block-by-block with DB-backed values.
3. Export baseline JSON with `/api/export` for customer-specific cloning.
