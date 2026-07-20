/**
 * Restaurant partner directory.
 *
 * ⚠️ Every entry below is a clearly-labeled PLACEHOLDER — no real partnerships
 * exist yet. When a real restaurant signs on, replace a placeholder with its
 * actual details and set `placeholder: false`. Cards, filters and the request
 * flow all render automatically from this list.
 */

export type PriceRange = "$" | "$$" | "$$$";

export interface Restaurant {
  slug: string;
  /** Display name. Placeholders are named by slot, not by fake brands. */
  name: string;
  cuisine: string;
  priceRange: PriceRange;
  /** Service area the kitchen is based in. */
  area: string;
  /** Minimum order, if the restaurant requires one. */
  minOrder?: string;
  /** Largest group size the kitchen comfortably serves. */
  maxGroup: number;
  /** Offers catering-style trays/packages (vs. individual meals only). */
  catering: boolean;
  /** Short ordering notes shown on the card. */
  notes: string;
  /** Link to the restaurant's own menu. Empty until a real partner is added. */
  menuUrl?: string;
  placeholder: boolean;
}

export const CUISINES = [
  "Deli & Sandwiches",
  "Southern & BBQ",
  "Mexican",
  "Italian & Pizza",
  "Asian",
  "Salads & Healthy",
] as const;

export const RESTAURANTS: Restaurant[] = [
  {
    slug: "partner-slot-deli",
    name: "Partner Slot — Deli & Sandwiches",
    cuisine: "Deli & Sandwiches",
    priceRange: "$",
    area: "Myrtle Beach",
    maxGroup: 40,
    catering: true,
    notes:
      "Placeholder listing. A local deli partner will appear here — boxed lunches and sandwich platters are ideal for meetings.",
    placeholder: true,
  },
  {
    slug: "partner-slot-bbq",
    name: "Partner Slot — Southern & BBQ",
    cuisine: "Southern & BBQ",
    priceRange: "$$",
    area: "Conway",
    minOrder: "Typical 10-person minimum for trays",
    maxGroup: 100,
    catering: true,
    notes:
      "Placeholder listing. Group-style trays and plates for employee appreciation meals and large crews.",
    placeholder: true,
  },
  {
    slug: "partner-slot-mexican",
    name: "Partner Slot — Mexican",
    cuisine: "Mexican",
    priceRange: "$",
    area: "Myrtle Beach",
    maxGroup: 60,
    catering: true,
    notes:
      "Placeholder listing. Taco bars and burrito boxes work well for training sessions and office parties.",
    placeholder: true,
  },
  {
    slug: "partner-slot-italian",
    name: "Partner Slot — Italian & Pizza",
    cuisine: "Italian & Pizza",
    priceRange: "$$",
    area: "Horry County",
    maxGroup: 80,
    catering: true,
    notes:
      "Placeholder listing. Pasta trays and pizza spreads for staff meetings on a budget.",
    placeholder: true,
  },
  {
    slug: "partner-slot-asian",
    name: "Partner Slot — Asian",
    cuisine: "Asian",
    priceRange: "$$",
    area: "Myrtle Beach",
    maxGroup: 30,
    catering: false,
    notes:
      "Placeholder listing. Individual entrées suit offices where everyone orders their own meal.",
    placeholder: true,
  },
  {
    slug: "partner-slot-healthy",
    name: "Partner Slot — Salads & Healthy",
    cuisine: "Salads & Healthy",
    priceRange: "$$",
    area: "Conway",
    maxGroup: 50,
    catering: true,
    notes:
      "Placeholder listing. Salad and grain-bowl options for offices with dietary preferences.",
    placeholder: true,
  },
];
