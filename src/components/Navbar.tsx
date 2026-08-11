"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/data/site";
import { Icon } from "@/components/icons";

function Wordmark() {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2.5"
      aria-label={`${SITE.name} — home`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lift transition-transform duration-200 group-hover:-rotate-6">
        <Icon name="bag" className="h-5.5 w-5.5" />
      </span>
      <span className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-ink-900">
        The Lunch <span className="text-brand-600">Desk</span>
      </span>
    </Link>
  );
}

/** tel: links must be digits only — strip formatting from the display number. */
const telHref = `tel:${SITE.phoneTel}`;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Escape dismisses the mobile menu — expected behavior for any open menu,
  // and the only way out for keyboard users who don't want to tab through it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/8 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-3 py-2 text-[14.5px] font-medium transition-colors ${
                pathname === l.href
                  ? "bg-brand-100 text-brand-700"
                  : "text-ink-700 hover:bg-ink-900/5 hover:text-ink-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {SITE.phone && (
            <a
              href={telHref}
              className="ml-1 inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 font-display text-[14.5px] font-semibold text-ink-800 transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              <Icon name="phone" className="h-4 w-4 text-brand-500" />
              {SITE.phone}
            </a>
          )}
          <Link
            href="/contact"
            className="ml-1.5 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-brand-500 px-5 py-2.5 font-display text-[14.5px] font-semibold text-white shadow-lift transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Plan Your Lunch
          </Link>
        </nav>

        {/* Tap-to-call is the highest-intent action for a local B2B service,
            so it sits in the bar itself on mobile — not buried in the menu. */}
        <div className="flex items-center gap-1 lg:hidden">
          {SITE.phone && (
            <a
              href={telHref}
              aria-label={`Call ${SITE.name} at ${SITE.phone}`}
              className="rounded-xl p-2 text-brand-600 hover:bg-brand-50"
            >
              <Icon name="phone" className="h-6 w-6" />
            </a>
          )}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-xl p-2 text-ink-900 hover:bg-ink-900/5"
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-ink-900/8 bg-cream px-5 pb-6 pt-3 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${
                    pathname === l.href
                      ? "bg-brand-100 text-brand-700"
                      : "text-ink-800 hover:bg-ink-900/5"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-3">
              <Link
                href="/contact"
                className="block rounded-full bg-brand-500 px-5 py-3.5 text-center font-display font-semibold text-white shadow-lift"
              >
                Plan Your Lunch
              </Link>
            </li>
            {SITE.phone && (
              <li className="mt-2">
                <a
                  href={telHref}
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-ink-900/12 px-5 py-3.5 text-center font-display font-semibold text-ink-900"
                >
                  <Icon name="phone" className="h-4.5 w-4.5 text-brand-500" />
                  {SITE.phone}
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
