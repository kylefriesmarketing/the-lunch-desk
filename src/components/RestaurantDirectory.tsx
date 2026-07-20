"use client";

import { useMemo, useState } from "react";
import { RESTAURANTS, CUISINES, type PriceRange } from "@/data/restaurants";
import { SITE } from "@/data/site";
import { RestaurantCard } from "@/components/RestaurantCard";

const PRICES: PriceRange[] = ["$", "$$", "$$$"];
const GROUP_SIZES = [
  { label: "Any group size", min: 0 },
  { label: "10+ people", min: 10 },
  { label: "30+ people", min: 30 },
  { label: "60+ people", min: 60 },
];

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink-700">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-ink-900/12 bg-white px-3.5 py-2.5 text-sm font-normal text-ink-900 shadow-sm focus:border-brand-500"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Filterable partner directory — cuisine / price / location / group size / catering. */
export function RestaurantDirectory() {
  const [cuisine, setCuisine] = useState("all");
  const [price, setPrice] = useState("all");
  const [area, setArea] = useState("all");
  const [groupMin, setGroupMin] = useState("0");
  const [cateringOnly, setCateringOnly] = useState(false);

  const results = useMemo(
    () =>
      RESTAURANTS.filter(
        (r) =>
          (cuisine === "all" || r.cuisine === cuisine) &&
          (price === "all" || r.priceRange === price) &&
          (area === "all" || r.area === area) &&
          r.maxGroup >= Number(groupMin) &&
          (!cateringOnly || r.catering),
      ),
    [cuisine, price, area, groupMin, cateringOnly],
  );

  return (
    <div>
      <div className="rounded-3xl border border-ink-900/8 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            label="Cuisine"
            value={cuisine}
            onChange={setCuisine}
            options={[
              { value: "all", label: "All cuisines" },
              ...CUISINES.map((c) => ({ value: c, label: c })),
            ]}
          />
          <FilterSelect
            label="Price"
            value={price}
            onChange={setPrice}
            options={[
              { value: "all", label: "Any price" },
              ...PRICES.map((p) => ({ value: p, label: p })),
            ]}
          />
          <FilterSelect
            label="Location"
            value={area}
            onChange={setArea}
            options={[
              { value: "all", label: "All areas" },
              ...SITE.serviceAreas.map((a) => ({ value: a, label: a })),
            ]}
          />
          <FilterSelect
            label="Group size"
            value={groupMin}
            onChange={setGroupMin}
            options={GROUP_SIZES.map((g) => ({ value: String(g.min), label: g.label }))}
          />
        </div>
        <label className="mt-4 flex items-center gap-2.5 text-sm font-medium text-ink-700">
          <input
            type="checkbox"
            checked={cateringOnly}
            onChange={(e) => setCateringOnly(e.target.checked)}
            className="h-4.5 w-4.5 rounded accent-brand-500"
          />
          Catering trays available
        </label>
      </div>

      <p className="mt-6 text-sm text-ink-500" role="status">
        Showing {results.length} of {RESTAURANTS.length} partner slots
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((r) => (
          <RestaurantCard key={r.slug} restaurant={r} />
        ))}
      </div>

      {results.length === 0 && (
        <p className="mt-8 rounded-2xl bg-white p-8 text-center text-ink-600 shadow-sm">
          No partner slots match those filters yet — but we can still coordinate it.{" "}
          <a href="/contact" className="font-semibold text-brand-600 underline underline-offset-4">
            Tell us what you&apos;re looking for.
          </a>
        </p>
      )}
    </div>
  );
}
