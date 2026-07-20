import Link from "next/link";
import type { Restaurant } from "@/data/restaurants";
import { Icon } from "@/components/icons";

export function RestaurantCard({ restaurant: r }: { restaurant: Restaurant }) {
  return (
    <article className="flex flex-col rounded-3xl border border-ink-900/8 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
      {/* Logo slot — swaps to a real <Image> when a partner provides one */}
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cream-deep text-ink-400">
          <Icon name="utensils" className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold leading-snug text-ink-900">{r.name}</h3>
          <p className="mt-0.5 text-sm text-ink-500">
            {r.cuisine} · {r.priceRange} · {r.area}
          </p>
        </div>
      </div>

      {r.placeholder && (
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-fresh-100 px-3 py-1 text-xs font-semibold text-fresh-700">
          Partner slot — opening soon
        </span>
      )}

      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-600">{r.notes}</p>

      <dl className="mt-4 space-y-1.5 border-t border-ink-900/8 pt-4 text-sm text-ink-600">
        <div className="flex justify-between gap-3">
          <dt className="font-medium text-ink-500">Group size</dt>
          <dd>Up to {r.maxGroup}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-medium text-ink-500">Catering trays</dt>
          <dd>{r.catering ? "Available" : "Individual meals"}</dd>
        </div>
        {r.minOrder && (
          <div className="flex justify-between gap-3 text-right">
            <dt className="shrink-0 font-medium text-ink-500">Minimum</dt>
            <dd>{r.minOrder}</dd>
          </div>
        )}
      </dl>

      <div className="mt-5 flex items-center gap-3">
        {r.menuUrl ? (
          <a
            href={r.menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-ink-900/12 px-4 py-2 text-sm font-semibold text-ink-800 transition-colors hover:border-brand-500 hover:text-brand-600"
          >
            View menu
          </a>
        ) : (
          <span className="cursor-default rounded-full border-2 border-dashed border-ink-900/12 px-4 py-2 text-sm font-medium text-ink-400">
            Menu coming soon
          </span>
        )}
        <Link
          href={`/contact?restaurant=${encodeURIComponent(r.name)}`}
          className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          Request this style
        </Link>
      </div>
    </article>
  );
}
