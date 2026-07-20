"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/data/site";
import { Icon } from "@/components/icons";

function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={`${SITE.name} — home`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lift transition-transform duration-200 group-hover:-rotate-6">
        <Icon name="bag" className="h-5.5 w-5.5" />
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-ink-900">
        The Lunch <span className="text-brand-600">Desk</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

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
              className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                pathname === l.href
                  ? "bg-brand-100 text-brand-700"
                  : "text-ink-700 hover:bg-ink-900/5 hover:text-ink-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 font-display text-[15px] font-semibold text-white shadow-lift transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Plan Your Lunch
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-xl p-2 text-ink-900 hover:bg-ink-900/5 lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
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
          </ul>
        </nav>
      )}
    </header>
  );
}
