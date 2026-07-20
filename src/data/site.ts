/**
 * Site-wide configuration for The Lunch Desk.
 * Edit real business details HERE — every page reads from this file.
 */

export const SITE = {
  name: "The Lunch Desk",
  legalName: "The Lunch Desk LLC",
  tagline: "Your Office Lunch Concierge",

  /**
   * Canonical production URL. Update before launch, then re-deploy —
   * sitemap.ts, robots.ts and all metadata read from this value.
   */
  url: "https://thelunchdesk.com",

  /** TODO: official business phone, e.g. "(843) 555-0123". Empty = hidden. */
  phone: "" as string,

  /** TODO: official business inbox, e.g. "hello@thelunchdesk.com". Empty = hidden. */
  email: "" as string,

  serviceAreas: ["Myrtle Beach", "Conway", "Horry County"],
  region: "SC",

  /**
   * Where the two forms POST their JSON payloads (Formspree, a CRM webhook,
   * a Zapier/Make hook that writes to Google Sheets + email, etc.).
   * Set NEXT_PUBLIC_FORM_ENDPOINT in your deployment environment.
   * While empty, forms run in a clearly-labeled preview mode and do not
   * pretend the request was delivered.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
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
