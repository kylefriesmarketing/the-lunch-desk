/**
 * Site-wide configuration for The Lunch Desk.
 * Edit real business details HERE — every page reads from this file.
 */

export const SITE = {
  name: "The Lunch Desk",
  legalName: "The Lunch Desk LLC",
  tagline: "Your Office Lunch Concierge",

  /**
   * Canonical production URL. Sitemap, robots, canonicals, Open Graph and the
   * structured data all derive from this — change it here and nowhere else.
   * No trailing slash: routes are appended as `${url}/path/`.
   */
  url: "https://thelunchdesk.com",

  /** Official business phone, formatted for display. Empty = hidden everywhere. */
  phone: "(252) 626-1950" as string,

  /**
   * Same number in E.164. Used for `tel:` links and schema.org `telephone`,
   * both of which want the country code. Kept separate so the displayed
   * format stays clean and US-local.
   */
  phoneTel: "+12526261950" as string,

  /** Official business inbox. Empty = hidden everywhere. */
  email: "LunchDeskLLC@gmail.com" as string,

  serviceAreas: ["Myrtle Beach", "Conway", "Horry County"],
  region: "SC",

  /**
   * Where the two forms POST their JSON payloads.
   *
   * Defaults to FormSubmit's STANDARD endpoint, which relays submissions
   * straight to the business inbox above — a static site has no server of its
   * own, so some relay is required to turn a form into an email.
   *
   * ⚠️ Use the standard endpoint, NOT `/ajax/`. FormSubmit activates the two
   * SEPARATELY: clicking the activation link enabled the standard endpoint
   * while `/ajax/` kept returning {"success":"false","message":"needs
   * Activation"} forever. Because the standard endpoint replies with HTML and
   * a redirect (not JSON), the forms submit natively and FormSubmit returns
   * the visitor to `?sent=1` via its `_next` field — see submitLead().
   *
   * Override with NEXT_PUBLIC_FORM_ENDPOINT to point at Formspree, a CRM
   * webhook, or an automation that writes to Google Sheets instead.
   * Set it to "" to fall back to the prefilled-email flow.
   */
  formEndpoint:
    process.env.NEXT_PUBLIC_FORM_ENDPOINT ??
    "https://formsubmit.co/LunchDeskLLC@gmail.com",
} as const;

export const NAV_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/restaurants", label: "Lunch Options" },
  { href: "/services", label: "Business Services" },
  { href: "/partners", label: "Restaurant Partners" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** The audiences we serve — used on the home + services pages. */
export const AUDIENCES = [
  "Medical offices",
  "Dental offices",
  "Law firms",
  "Real estate offices",
  "Property management",
  "Construction companies",
  "Timeshare & resorts",
  "Corporate offices",
  "Government offices",
  "Banks",
  "Insurance offices",
  "Car dealerships",
  "Schools & education",
  "Sales reps",
  "Pharma & medical reps",
] as const;
