# THE LUNCH DESK LLC — Master Handoff

**Last updated:** 2026-07-22
**Purpose:** Everything needed to rebuild, continue, or hand off this project.
Give this file to a new Claude session (or any developer) and they can pick up
exactly where things stand.

> ⚠️ **This file is in a PUBLIC GitHub repo.** It deliberately contains no
> passwords, no API keys, and not Kyle's home address. The street address used
> for Google verification is stored in the Google Business Profile account
> itself — look it up there, don't paste it into this repo.

---

## 1. The business

**The Lunch Desk LLC** — B2B office-lunch coordination for Myrtle Beach,
Conway, and greater Horry County, South Carolina. This is Kyle's real
business, not a demo.

**What it does:** acts as the single point of contact between local offices
and local restaurants. Browse options, fit a budget, organize group orders,
handle dietary needs, place and confirm the order, coordinate pickup, keep
recurring lunches organized.

**Positioning:** "Your Office Lunch Concierge."
Supporting: *One call. More choices. Easier office lunches.* /
*We coordinate the food. You focus on your business.*

**Target customers:** medical & dental offices, law firms, real estate,
property management, construction, timeshare/resorts, corporate and government
offices, banks, insurance, car dealerships, schools, and — importantly —
**sales reps and pharmaceutical reps** who buy lunch for offices on their route.

### 🚨 Non-negotiable content rules

These are load-bearing. Violating them creates legal/credibility risk:

1. **NEVER advertise delivery.** The business coordinates orders and
   restaurant *pickup*. Delivery may depend on the restaurant. All site copy
   is written carefully around this.
2. **NEVER invent restaurant partnerships.** Every restaurant entry on the
   site is a clearly-labeled placeholder. No real partners exist yet.
3. **NEVER invent testimonials or statistics.** `src/data/testimonials.ts` is
   intentionally empty and the section self-hides. There are no "500+ lunches
   delivered" style claims anywhere.
4. **No stock photos of food we didn't coordinate.** Photos wait until real
   operations start.

---

## 2. Current status at a glance

| Thing | Status |
|---|---|
| Website | ✅ **LIVE** — https://kylefriesmarketing.github.io/the-lunch-desk/ |
| Source repo | ✅ https://github.com/kylefriesmarketing/the-lunch-desk |
| Google Business Profile | ⚠️ **Built, NOT publicly visible** — awaiting video verification |
| Google Search Console | ✅ Verified, sitemap submitted |
| Form lead delivery | ⚠️ Email-fallback only — needs a Formspree endpoint |
| Custom domain | ❌ Not purchased |
| Logo | ✅ Generated (`brand/logo-1024.png`), not yet uploaded to Google |
| Bing Webmaster Tools | ❌ Not done |

**Contact details now live on the site:**
Phone `(252) 626-9250` · Email `LunchDeskLLC@gmail.com`

**Owning Google account:** `LunchDeskLLC@gmail.com` — this account permanently
owns the Business Profile. Never create business assets under a personal account.

---

## 3. ⚠️ The duplicate Google Business Profile (UNRESOLVED — read this)

There are **two** GBP listings on the account:

| Listing | ID | Detail |
|---|---|---|
| **A** (ChatGPT-era) | `02682413056881396468` | Category "Business to business service", website points at `the-lunch-desk.kfreezer.chatgpt.site`, no phone/hours/description/services |
| **B** (the good one) | `11636824579588147965` | Category "Personal concierge service", correct website, phone, hours, description, all 8 services |

**Kyle's decision:** keep **B**, remove **A**, point at the GitHub Pages site.
**This removal has NOT been executed yet.**

**Why it matters:** duplicate profiles for one business are a common cause of
Google **suspending both**. Do not verify both. Resolve to one listing before
recording the verification video.

---

## 4. Google Business Profile — what's configured

Manage at https://business.google.com (signed in as LunchDeskLLC@gmail.com).

- **Name:** The Lunch Desk LLC
- **Primary category:** Personal concierge service
  - *Deliberate choice.* "Caterer" attracts more search traffic but implies
    preparing food, which misrepresents a coordination service and risks
    verification problems. Category can be changed later.
- **Storefront:** No — service-area business
- **Service areas:** Myrtle Beach SC · Conway SC · Horry County SC
- **Hours:** Mon–Fri 8:00 AM – 5:00 PM (weekends closed)
- **Phone / Website:** as above
- **Description:** the 465-char version in `GBP_CONTENT.md`
- **Services:** all 8 added (Office Lunch Coordination, Corporate Lunch
  Coordination, Group Food Orders, Business Lunch Planning, Employee Lunch
  Programs, Meeting Lunch Coordination, Restaurant Order Coordination,
  Recurring Office Lunches)

**Deliberately skipped during setup:**
- Storefront & interior photos — no real photos exist; stock would misrepresent
- "$500 ad credit" — requires matching ad spend, a financial commitment
- Google Workspace trial — paid subscription decision
- SMS chat — commits to Google's response-time expectations

**Still to do after verification:** upload logo, seed the 6 Q&A entries, publish
the 5 launch posts. All content is written and waiting in `GBP_CONTENT.md`.

### The verification video (Kyle's task)

Google requires ONE CONTINUOUS UNEDITED TAKE. Most common rejection reason is
editing/cuts. Service-area businesses are the hardest case — no storefront to film.

Show, in one take:
1. You're in the service area (step outside, show the street)
2. Access to the office (walk in with your key)
3. **Operating agreement** held to camera (Kyle does not have Articles of
   Organization; the operating agreement serves the same purpose here)
4. EIN letter — **cover any SSN**
5. **Live account access** — sign into LunchDeskLLC@gmail.com, open the
   Business Profile manager, open the website. *This is the strongest proof
   and the step most rejected videos are missing.*

🚫 **Never show the Social Security card.** Google never asks for it.
🚫 **Cover business credit card numbers** — the business name is fine, the
numbers are a liability.

Review takes up to ~5 business days. Rejection is common for service-area
businesses; you can retry.

---

## 5. The website

### Stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · static export.
No server required — deploys as plain static files.

### Pages
`/` · `/how-it-works` · `/restaurants` (filterable partner directory) ·
`/services` · `/partners` (partner inquiry form) · `/about` ·
`/contact` (detailed lunch-request form)

### Where content lives — edit these, not the page code

| File | Contains |
|---|---|
| `src/data/site.ts` | Business name, tagline, canonical URL, **phone**, **email**, service areas, nav links |
| `src/data/restaurants.ts` | Partner directory (all placeholders; set `placeholder: false` when real) |
| `src/data/services.ts` | Business-services cards |
| `src/data/faqs.ts` | FAQs — also emitted as FAQPage structured data |
| `src/data/testimonials.ts` | **Empty on purpose.** Add real quotes → section renders itself |

Design tokens (colors, fonts, shadows) live in `src/app/globals.css` under `@theme`.

### Run locally

Node is portable at `C:\Users\kylef\tools\node` and **is not on PATH**:

```powershell
$env:Path = "C:\Users\kylef\tools\node;" + $env:Path
npm install
npm run dev        # → http://localhost:3010
```

### Deploy (one command)

```powershell
powershell -ExecutionPolicy Bypass -File scripts\deploy-gh-pages.ps1
```

Builds with `DEPLOY_TARGET=gh-pages` (applies the `/the-lunch-desk` basePath),
writes `.nojekyll`, force-pushes `out/` to the `gh-pages` branch.
**Source lives on `main`** — commit and push that separately.
Live in ~1 min; GitHub's CDN may serve cached assets for ~10 min longer.

### Other scripts
- `scripts/make-og-image.ps1` → regenerates `public/og-image.png` (1200×630 share card)
- `scripts/make-logo.ps1` → regenerates `brand/logo-1024.png` (square logo)

Both are pure System.Drawing — free, no image-generation credits.

---

## 6. Connecting the forms (highest-value remaining task)

Both forms currently **fall back to opening a prefilled email** because no
endpoint is configured. That works, but costs the visitor an extra step.

**To make lead delivery automatic:**
1. Create a free form at https://formspree.io *(account creation must be done
   by a human — Claude cannot create accounts)*
2. Set `NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/XXXXXXX`
   (`.env.local` locally; host environment variables in production)
3. Rebuild and redeploy, then send a real test lead and confirm it arrives

Payload shape:
`{ kind: "lunch-request" | "restaurant-partner", ...fields, receivedAt, source }`

---

## 7. SEO

- Per-page titles, descriptions, canonicals, Open Graph + Twitter cards — all
  generated through `src/lib/seo.ts` (`pageMeta()`).
  ⚠️ **Any new page MUST use `pageMeta()`.** Next.js *replaces* rather than
  merges `openGraph`, so hand-rolling it silently drops the share image.
- Structured data in `src/components/JsonLd.tsx`: `ProfessionalService` (with
  all services as offers) + `WebSite` site-wide, `FAQPage` on home,
  `BreadcrumbList` on interior pages.
- `sitemap.xml` / `robots.txt` generated from `src/app/sitemap.ts` / `robots.ts`.
  ⚠️ Sitemap URLs **must** keep trailing slashes to match `trailingSlash` and
  the canonicals — otherwise every entry redirects and contradicts its canonical.
- Target keywords: office lunch / office catering / corporate lunch Myrtle
  Beach, office lunch Conway SC, group lunch ordering Horry County, business
  lunch coordination.
- **Google Search Console:** verified via the HTML file
  `public/google05bc1ea16bc14b1c.html`. **Do not delete that file** — removing
  it un-verifies the property. Sitemap submitted.

---

## 8. Traps learned the hard way

**Deployment / tooling**
- GitHub's CDN caches for ~10 min. After deploying, verify against the
  `gh-pages` branch raw file, not the served URL, or you'll misread a stale
  cache as a bug.
- Raw `<a href="/path">` **bypasses Next's basePath** and 404s in production
  while working locally. Always use `next/link` for internal links. (This
  shipped once — `/partners` and `/contact` were live 404s.)
- PowerShell bulk-editing `.tsx` **mangles UTF-8** (`—` → `â€"`). Prefer the
  Edit tool. To repair: read text → `[Text.Encoding]::GetEncoding(1252).GetBytes()`
  → `[Text.Encoding]::UTF8.GetString()` → write with `UTF8Encoding($false)`.

**Seeing the site (important — the old "screenshots don't work" note is wrong)**
- The Browser pane can't composite here and Claude-in-Chrome drops out, but
  **headless Chrome works**:
  ```
  Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList `
    "--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",`
    "--virtual-time-budget=10000","--user-data-dir=<tmp>","--window-size=1440,4200",`
    "--screenshot=<out.png>","<url>" -Wait -NoNewWindow
  ```
- ⚠️ `--virtual-time-budget` is **required** or you capture the page with no CSS.
- ⚠️ Screenshot the **production export** via a static server, not `next dev`.
- ⚠️ Headless does **not** emulate mobile. A narrow `--window-size` renders the
  desktop layout and crops it, which looks like broken overflow but isn't.
  Verify mobile with a DOM check (`scrollWidth` vs `clientWidth`).

**CSS**
- ⚠️ **Do not add scroll-driven reveal animations.** `animation-timeline: view()`
  goes INACTIVE when the document isn't scrollable, holding elements at their
  `from` state — on a tall monitor or zoomed-out window entire sections
  (including the closing CTA) render permanently faded. An `@supports` gate does
  not help; Chrome supports it and still stalls. This was built, caught, and
  deliberately removed. There's a comment in `globals.css` explaining why.

---

## 9. Design system

"Lunch Hour" palette — warm terracotta (appetite/hospitality) + deep harbor
navy (corporate trust) + fresh green accent, on warm cream.

- `brand-*` terracotta (`#e86f2d` primary) · `ink-*` navy (`#16233a`) ·
  `fresh-*` green · `clay-*` muted red for friction states · `cream` ground
- Fonts: **Bricolage Grotesque** (display) + **Inter** (body)
- Page rhythm alternates cream → **full-bleed dark navy band** → cream → dark
  CTA, so the page doesn't read as one flat texture
- `.hero-glow` = warm radial light spill; `.band-dark` = navy + warm glow
- Layered two-part shadows (`--shadow-lift`, `--shadow-lift-lg`, `--shadow-glow`)
- **No emoji as UI iconography** — real monoline icons in `src/components/icons.tsx`.
  Repeated emoji read as unpolished to law/medical/finance buyers.

---

## 10. What to do next (priority order)

1. **Resolve the duplicate GBP listing** (§3) — remove listing A. Blocks
   verification safety.
2. **Record the verification video** (§4). Only Kyle can do this. This is what
   makes the business appear on Google Search and Maps.
3. **Formspree signup** (§6) — 2 minutes, free, makes lead delivery automatic.
4. After verification: upload the logo, seed Q&A, publish the launch posts
   (all written in `GBP_CONTENT.md`).
5. Optional: buy `thelunchdesk.com` (~$12/yr). A real domain reads far more
   credible to corporate clients. Then update `url` in `src/data/site.ts` and
   remove the `basePath` logic in `next.config.ts`.
6. Optional: Bing Webmaster Tools (free, ~2 min).

---

## 11. Related files in this repo

- `README.md` — developer setup, editing, deploying
- `GBP_CONTENT.md` — the Google Business Profile launch package: description,
  services, 5 post drafts, Q&A seeds, photo checklist
- `.env.example` — form endpoint configuration

## 12. Other context

There is a **parallel ChatGPT/Codex build** of this same brief at
`../lunch-desk/` (vinext / Cloudflare / OpenAI Sites stack). It is untouched
and separate. This project is the Claude build. Don't confuse the two —
listing A of the duplicate GBP points at that other build's URL.
