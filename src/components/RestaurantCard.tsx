import Link from "next/link";
import type { Restaurant } from "@/data/restaurants";
import { Icon, type IconName } from "@/components/icons";

/** One glyph per cuisine so the grid doesn't read as six identical cards. */
const CUISINE_ICON: Record<string, IconName> = {
  "Deli & Sandwiches": "sandwich",
  "Southern & BBQ": "flame",
  Mexican: "pepper",
  "Italian & Pizza": "pizza",
  Asian: "bowl",
  "Salads & Healthy": "leaf",
};

export function RestaurantCard({ restaurant: r }: { restaurant: Restaurant }) {
  return (
    <article className="group flex flex-col rounded-3xl border border-ink-900/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      {/* Header: lead with the cuisine. The old title repeated "Partner Slot —"
          on every card and duplicated the meta line directly beneath it. */}
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cream-deep text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
          <Icon name={CUISINE_ICON[r.cuisine] ?? "utensils"} className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold leading-tight text-ink-900">{r.cuisine}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
            <span className="font-semibold text-ink-600">{r.priceRange}</span>
            <span aria-hidden="true" className="text-ink-300">
              ·
            </span>
            {r.area}
          </p>
        </div>
      </div>

      {r.placeholder && (
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-fresh-100 px-3 py-1 text-xs font-semibold text-fresh-700">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-fresh-500" />
          Partner slot — opening soon
        </span>
      )}

      <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{r.notes}</p>

      {/* mt-auto pins the footer to the bottom so details and buttons line up
          across the grid even when descriptions differ in length. */}
      <div className="mt-auto">
        <dl className="mt-5 space-y-1.5 border-t border-ink-900/8 pt-4 text-sm text-ink-600">
          <div className="flex justify-between gap-3">
            <dt className="font-medium text-ink-500">Group size</dt>
            <dd className="whitespace-nowrap">Up to {r.maxGroup}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="font-medium text-ink-500">Catering trays</dt>
            <dd className="whitespace-nowrap">{r.catering ? "Available" : "Individual meals"}</dd>
          </div>
          {r.minOrder && (
            <div className="flex justify-between gap-3">
              <dt className="shrink-0 font-medium text-ink-500">Minimum</dt>
              <dd className="text-right">{r.minOrder}</dd>
            </div>
          )}
        </dl>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {r.menuUrl ? (
            <a
              href={r.menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-full border-2 border-ink-900/12 px-4 py-2 text-sm font-semibold text-ink-800 transition-colors hover:border-brand-500 hover:text-brand-600"
            >
              View menu
            </a>
          ) : (
            <span className="cursor-default whitespace-nowrap rounded-full border-2 border-dashed border-ink-900/12 px-4 py-2 text-sm font-medium text-ink-400">
              Menu soon
            </span>
          )}
          {/* Prefills the cuisine dropdown rather than dropping a placeholder
              slot name into the "preferred restaurant" field. */}
          <Link
            href={`/contact?cuisine=${encodeURIComponent(r.cuisine)}`}
            className="whitespace-nowrap rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Request this style
          </Link>
        </div>
      </div>
    </article>
  );
}
