# The Lunch Desk — Website

Marketing + lead-generation site for **The Lunch Desk LLC**, an office lunch
coordination service for Myrtle Beach, Conway, and Horry County, SC.

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS 4**.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, problem, 3-step process, audiences, FAQ, CTA |
| `/how-it-works` | The service explained in detail |
| `/restaurants` | Filterable restaurant partner directory (placeholder slots) |
| `/services` | Business situations we coordinate lunch for |
| `/partners` | Restaurant partner pitch + inquiry form |
| `/about` | Company story and values |
| `/contact` | Detailed lunch request form |

## Run locally

Requires Node 18.18+ (this machine's portable Node lives at `C:\Users\kylef\tools\node`).

```powershell
$env:Path = "C:\Users\kylef\tools\node;" + $env:Path   # if node isn't on PATH
npm install
npm run dev        # → http://localhost:3010
```

`npm run build` produces the production build; `npm start` serves it.

## Editing content (no code archaeology required)

Everything editable lives in `src/data/`:

- **`site.ts`** — business name, tagline, canonical URL, **phone**, **email**,
  service areas, nav links, form endpoint. Fill in phone/email here and they
  appear in the footer, contact page, and structured data automatically.
- **`restaurants.ts`** — the partner directory. All entries are clearly-labeled
  placeholders; replace one with a real partner and set `placeholder: false`.
- **`services.ts`** — the business-services cards.
- **`faqs.ts`** — FAQ questions/answers (also emitted as FAQPage structured data).
- **`testimonials.ts`** — empty on purpose. Add real quotes and the home-page
  testimonial section renders itself. **Never add fake testimonials.**

Page copy lives in each `src/app/<route>/page.tsx`. Design tokens (colors,
fonts, shadows) are in `src/app/globals.css` under `@theme`.

## Connecting the forms

Both forms (lunch request + partner inquiry) POST JSON to the endpoint in
`NEXT_PUBLIC_FORM_ENDPOINT`. Until it's set, forms validate but show an honest
"preview mode" notice instead of pretending to send.

Easiest options:

1. **Formspree** (fastest): create a form at formspree.io, set
   `NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/XXXXXXXX`.
2. **Zapier / Make webhook**: point the endpoint at a catch-hook that emails
   you and appends to a Google Sheet.
3. **Your own CRM/API** later — payload shape:
   `{ kind: "lunch-request" | "restaurant-partner", ...fields, receivedAt, source }`.

Set the variable in `.env.local` for local testing or in Vercel → Project
Settings → Environment Variables for production.

## SEO

- Per-page titles/descriptions targeting: office lunch Myrtle Beach, office
  catering Myrtle Beach, corporate lunch, office lunch Conway SC, group lunch
  ordering Horry County, business lunch coordination.
- `ProfessionalService` + `FAQPage` JSON-LD in `src/components/JsonLd.tsx`
  (phone/email only emitted once real values exist in `site.ts`).
- `sitemap.xml` and `robots.txt` generated from `src/app/sitemap.ts` / `robots.ts`.
- **Before launch:** set the real domain in `src/data/site.ts` (`url`) — the
  sitemap, robots, canonical and OG metadata all derive from it.
- Copy deliberately never promises delivery — coordination + pickup only.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. vercel.com → Add New Project → import the repo (framework auto-detected).
3. Add `NEXT_PUBLIC_FORM_ENDPOINT` under Environment Variables.
4. Deploy, then point the custom domain and update `SITE.url`.

Static-host alternative (GitHub Pages etc.): uncomment `output: "export"` in
`next.config.ts` and run `npm run build` — the site is fully static-friendly
(forms post client-side to the external endpoint).

## Future expansion

The data layer (`src/data/`) is the seam for growth: customer/partner accounts,
saved offices, recurring orders, employee ordering links, payments, and
dashboards can be added as new routes + a real backend without touching the
marketing pages. Restaurant cards already carry the fields (menus, minimums,
group sizes, catering flags) that a live marketplace needs.

## Google Business Profile

`GBP_CONTENT.md` contains the ready-to-paste launch package: business
description, services list, posts, and Q&A seeds.
