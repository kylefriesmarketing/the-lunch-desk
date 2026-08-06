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

  /** Official business phone. Empty = hidden everywhere. */
  phone: "(252) 626-9250" as string,

  /** Official business inbox. Empty = hidden everywhere. */
  email: "LunchDeskLLC@gmail.com" as string,

  serviceAreas: ["Myrtle Beach", "Conway", "Horry County"],
  region: "SC",

  /**
   * Where the two forms POST their JSON payloads.
   *
   * Defaults to FormSubmit's AJAX endpoint, which relays submissions straight
   * to the business inbox above — a static site has no server of its own, so
   * some relay is required to turn a form into an email.
   *
   * ⚠️ FormSubmit requires a ONE-TIME activation: the very first submission
   * triggers a confirmation email to that inbox. Until the link in it is
   * clicked, submissions are not forwarded. After that it works permanently.
   *
   * Override with NEXT_PUBLIC_FORM_ENDPOINT to point at Formspree, a CRM
   * webhook, or an automation that writes to Google Sheets instead.
   * Set it to "" to fall back to the prefilled-email flow.
   */
  formEndpoint:
    process.env.NEXT_PUBLIC_FORM_ENDPOINT ??
    "https://formsubmit.co/ajax/LunchDeskLLC@gmail.com",
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
