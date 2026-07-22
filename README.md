# The Lunch Desk — Website

Marketing + lead-generation site for **The Lunch Desk LLC**, an office lunch
coordination service for Myrtle Beach, Conway, and Horry County, SC.

**Live:** https://kylefriesmarketing.github.io/the-lunch-desk/

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS 4**, exported
as a fully static site (no server required).

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, problem, 3-step process, audiences, service areas, FAQ, CTA |
| `/how-it-works` | The service explained in detail |
| `/restaurants` | Filterable restaurant partner directory (placeholder slots) |
| `/services` | Business situations we coordinate lunch for |
| `/partners` | Restaurant partner pitch + inquiry form |
| `/about` | Company story and values |
| `/contact` | Detailed lunch request form |

---

## Run locally

Requires Node 18.18+. On this machine Node is portable at
`C:\Users\kylef\tools\node` and is **not** on PATH, so add it first:

```powershell
$env:Path = "C:\Users\kylef\tools\node;" + $env:Path
npm install
npm run dev        # → http://localhost:3010
```

`npm run build` produces the static export in `out/`.

---

## Editing content (no code archaeology required)

Everything editable lives in `src/data/`:

| File | Holds |
|---|---|
| `site.ts` | Business name, tagline, canonical URL, **phone**, **email**, service areas, nav links |
| `restaurants.ts` | The partner directory (all entries currently placeholders) |
| `services.ts` | The business-services cards |
| `faqs.ts` | FAQ questions/answers (also emitted as FAQPage structured data) |
| `testimonials.ts` | Empty on purpose — see below |

**Adding your phone and email:** fill in `phone` and `email` in `site.ts`.
They automatically appear in the footer, the contact page, and the search
structured data. While blank, they're cleanly hidden rather than showing
placeholder junk.

**Adding a real restaurant partner:** replace one of the placeholder entries in
`restaurants.ts` and set `placeholder: false`. Cards, filters, and the request
flow all render from that list automatically.

**Testimonials are deliberately empty.** Add real quotes to `testimonials.ts`
and the home-page testimonial section renders itself. Never add fake ones.

Page copy lives in each `src/app/<route>/page.tsx`. Design tokens (colors,
fonts, shadows) are in `src/app/globals.css` under `@theme`.

---

## Connecting the forms

Both forms POST JSON to `NEXT_PUBLIC_FORM_ENDPOINT`. **Until it's set, the
forms validate but show an honest "preview mode" notice** instead of pretending
to send — no leads are silently lost.

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy `.env.example` → `.env.local` and paste the endpoint.
3. Rebuild and redeploy.

Any URL accepting a JSON POST works (CRM webhook, or a Zapier/Make hook that
emails you and appends to a Google Sheet). Payload shape:

```json
{ "kind": "lunch-request" | "restaurant-partner", "...fields": "", "receivedAt": "ISO", "source": "site url" }
```

---

## Deploying

### Current setup — GitHub Pages (one command)

```powershell
powershell -ExecutionPolicy Bypass -File scripts\deploy-gh-pages.ps1
powershell -ExecutionPolicy Bypass -File scripts\deploy-gh-pages.ps1 -Message "Add real phone number"
```

That script builds with `DEPLOY_TARGET=gh-pages` (which applies the
`/the-lunch-desk` basePath), writes `.nojekyll`, and force-pushes `out/` to the
`gh-pages` branch. **Source code lives on `main`** — commit and push that
separately with normal git.

Expect the page to go live in ~1 minute; GitHub's CDN may serve cached assets
(manifest, images) for several minutes longer.

### Moving to a custom domain or Vercel

1. Set `url` in `src/data/site.ts` to the real domain — sitemap, robots,
   canonicals, and all social metadata derive from it.
2. **Vercel:** import the repo, add `NEXT_PUBLIC_FORM_ENDPOINT` under
   Environment Variables, deploy. No basePath needed — `DEPLOY_TARGET` is only
   set by the GitHub Pages script.
3. **Custom domain on GitHub Pages:** also remove the `basePath` logic in
   `next.config.ts`, since the site would then sit at the domain root.

---

## SEO

- Per-page titles, descriptions, canonical URLs, and Open Graph/Twitter cards,
  all generated through `src/lib/seo.ts` (`pageMeta()`). **Use that helper for
  any new page** — Next.js *replaces* rather than merges `openGraph`, so
  hand-rolling it is how pages silently lose their share image.
- Structured data in `src/components/JsonLd.tsx`: `ProfessionalService`
  (with services as offers) + `WebSite` site-wide, `FAQPage` on the home page,
  `BreadcrumbList` on interior pages.
- `sitemap.xml` and `robots.txt` generated from `src/app/sitemap.ts` / `robots.ts`.
- Local keywords targeted throughout: office lunch / office catering / corporate
  lunch Myrtle Beach, office lunch Conway SC, group lunch ordering Horry County,
  business lunch coordination.
- **Copy never promises delivery** — coordination and restaurant pickup only.
  Keep it that way unless delivery actually becomes a service.

### Social share image

`public/og-image.png` (1200×630) is generated by:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\make-og-image.ps1
```

Edit that script to change the card, then rerun and redeploy.

---

## Accessibility

Verified: one `<h1>` per page with correct heading order, skip-to-content link,
`main` landmark, labelled form fields with inline validation errors, focus moved
to the confirmation message on submit, decorative SVGs hidden from screen
readers, visible focus rings, and `prefers-reduced-motion` support.

---

## Google Business Profile

`GBP_CONTENT.md` holds the ready-to-paste launch package: business description,
services list, post drafts, Q&A seeds, photo checklist, and verification notes.

---

## Pre-launch checklist

- [x] Add real phone + email to `src/data/site.ts`
- [ ] Connect `NEXT_PUBLIC_FORM_ENDPOINT` and send a real test lead
- [ ] Replace restaurant placeholders as partners sign on
- [ ] Point a custom domain and update `site.ts` → `url`
- [ ] Create + verify the Google Business Profile
- [ ] Add real photos once operating (no stock photos of lunches we didn't coordinate)

---

## Future expansion

`src/data/` is the seam for growth: customer/partner accounts, saved offices,
recurring orders, employee ordering links, payments, and dashboards can be added
as new routes plus a real backend without touching the marketing pages.
Restaurant cards already carry the fields (menus, minimums, group sizes,
catering flags) a live marketplace needs.
