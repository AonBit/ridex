# Editable Fields Matrix

## Brand
- Company name, tagline, logo path, favicon path
- Phone, email, WhatsApp/WeChat, address, business hours
- Rent-now CTA type (phone / email / WhatsApp / URL) and optional custom target
- Footer copyright and legal notice

## Theme
- Primary/secondary/accent colors
- Background/surface/text colors
- Success/warning/error colors
- Border radius, card shadow, heading/body fonts

## Homepage Content
- Per locale (`ja`, `en`, `zh-Hant`) via localized keys:
  - Hero title/subtitle/CTA text/CTA link
  - Featured section title, steps section title, FAQ section title
  - SEO title/description
- Global toggles: show steps section, show FAQ section

## Fleet
- Name, brand, year, seats
- Fuel type, transmission, price label, mileage label
- Cover image path
- Field visibility toggles (JSON): brand, year, seats, fuelType, mileage, transmission, price
- Published status and sort order
- Single language (not localized per vehicle)

## FAQ
- Question, answer, sort order
- Per locale (`ja`, `en`, `zh-Hant`)

## Navigation
- Label, href, type (internal/external), visibility, sort order

## Media Library
- File upload, file metadata (path/type/size)
- Optional usage reference (`usedBy`)

## Legal & Company (per locale)
- Legal pages (`/legal/*`): Japanese content only on public site; non-`ja` URLs show a Japanese-only notice
- Tokushoho: Vditor WYSIWYG with Yamato-style table template + restore button
- Privacy / anti-social policy / rental terms: Vditor SV (Markdown)
- Unified rendering via `lib/markdown.ts` (Vditor engine; `marked` removed)
- Company disclosure fields (structured form, not Markdown)
