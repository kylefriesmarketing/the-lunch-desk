import Link from "next/link";
import { NAV_LINKS, SITE } from "@/data/site";
import { Icon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink-900 text-ink-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
              <Icon name="bag" className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-white">
              The Lunch <span className="text-brand-300">Desk</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
            {SITE.tagline}. Office lunch coordination for businesses in{" "}
            {SITE.serviceAreas.join(", ")}, South Carolina.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink-300">
            Explore
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink-100 transition-colors hover:text-brand-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink-300">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SITE.phone && (
              <li>
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="hover:text-brand-300">
                  {SITE.phone}
                </a>
              </li>
            )}
            {SITE.email && (
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-brand-300">
                  {SITE.email}
                </a>
              </li>
            )}
            <li>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 font-display font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Plan Your Lunch <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-ink-400">
        © {new Date().getFullYear()} {SITE.legalName}. Serving {SITE.serviceAreas.join(" · ")},{" "}
        {SITE.region}.
      </div>
    </footer>
  );
}
