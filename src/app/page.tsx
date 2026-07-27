import { ButtonLink } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { FAQList } from "@/components/FAQ";
import { TestimonialSection } from "@/components/TestimonialSection";
import { FaqJsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/icons";
import { FAQS } from "@/data/faqs";
import { AUDIENCES, SITE } from "@/data/site";

const AREAS = [
  {
    name: "Myrtle Beach",
    icon: "waves" as const,
    blurb:
      "From the medical district to the resorts and dealerships along the Grand Strand, we coordinate office lunches for Myrtle Beach teams of every size.",
  },
  {
    name: "Conway",
    icon: "building" as const,
    blurb:
      "Law firms, government offices, and growing businesses around Conway get one contact for corporate lunches and recurring staff meals.",
  },
  {
    name: "Horry County",
    icon: "pin" as const,
    blurb:
      "Wherever your office sits across greater Horry County, we help organize group food orders from restaurants close to you.",
  },
];

/** Honest, verifiable promises — no invented statistics. */
const TRUST = [
  { icon: "pin" as const, label: "Local to the Grand Strand" },
  { icon: "phone" as const, label: "One point of contact" },
  { icon: "sparkle" as const, label: "No app needed" },
];

/** The friction an office manager actually feels, with real iconography. */
const PAINS = [
  { icon: "tabs" as const, text: "Six browser tabs of menus" },
  { icon: "chat" as const, text: "A group text 40 messages deep" },
  { icon: "phoneRing" as const, text: "Three phone calls to the restaurant" },
  { icon: "userQuestion" as const, text: "Somebody's order still missing" },
];

const STEPS = [
  {
    n: "1",
    title: "Tell Us What You Need",
    body: "Tell us the date, number of people, approximate budget, location, and any preferences.",
    icon: "clipboard" as const,
  },
  {
    n: "2",
    title: "Choose Your Lunch",
    body: "We help you explore available restaurant and meal options that fit your needs.",
    icon: "utensils" as const,
  },
  {
    n: "3",
    title: "We Coordinate the Order",
    body: "We help organize, place, and confirm the order while coordinating the restaurant pickup details.",
    icon: "check" as const,
  },
];

/**
 * Hero visual: a layered "options behind, confirmed order in front" composition.
 * Illustrative only (aria-hidden) — cuisine styles are generic on purpose, since
 * no real restaurant partnerships exist yet.
 */
function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:200ms]"
    >
      {/* Warm glow puddle beneath the stack */}
      <div className="absolute inset-x-6 bottom-2 -z-10 h-24 rounded-[50%] bg-brand-500/20 blur-2xl" />

      {/* Behind: the options we come back with — offset up/right so a clean
          slice of the card reads above the confirmed order in front. */}
      <div className="absolute -top-14 right-[-0.75rem] hidden w-56 rotate-[8deg] rounded-3xl border border-ink-900/8 bg-white/95 p-5 shadow-lift backdrop-blur sm:block">
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">
          Options for Thursday
        </p>
        <ul className="mt-3 space-y-2.5">
          {[
            ["Deli & sandwiches", "$$"],
            ["Southern & BBQ", "$$"],
            ["Salads & bowls", "$"],
          ].map(([label, price]) => (
            <li key={label} className="flex items-center gap-2.5">
              <span className="h-7 w-7 shrink-0 rounded-lg bg-cream-deep" />
              <span className="flex-1 truncate text-[13px] font-medium text-ink-700">{label}</span>
              <span className="text-[13px] font-semibold text-ink-400">{price}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Front: the confirmed order */}
      <div className="relative rotate-[-1.5deg] rounded-[1.75rem] border border-ink-900/8 bg-white p-6 shadow-lift-lg transition-transform duration-500 hover:rotate-0 sm:mt-12">
        <div className="flex items-center justify-between border-b border-dashed border-ink-900/15 pb-4">
          <span className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-600">
            Lunch Order
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-fresh-100 px-3 py-1 text-xs font-bold text-fresh-700">
            <Icon name="check" className="h-3.5 w-3.5" />
            Confirmed
          </span>
        </div>
        <ul className="mt-4 space-y-3 text-sm text-ink-600">
          {[
            ["Team headcount", "14 people"],
            ["Budget", "$14 / person"],
            ["Dietary notes", "2 veg · 1 GF"],
            ["Pickup", "11:45 AM"],
          ].map(([k, v]) => (
            <li key={k} className="flex items-baseline justify-between gap-3">
              <span>{k}</span>
              <span className="font-display font-semibold text-ink-900">{v}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-cream-deep py-3.5 font-display text-sm font-semibold text-ink-800">
          <Icon name="bag" className="h-4 w-4 text-brand-600" />
          Coordinated by The Lunch Desk
        </div>
      </div>

      <div className="absolute -bottom-6 -left-4 rotate-[-5deg] rounded-2xl bg-brand-500 px-4 py-2.5 font-display text-sm font-bold text-white shadow-glow sm:-left-9">
        One call, handled.
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-glow dot-grid relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm backdrop-blur">
              <Icon name="bag" className="h-4 w-4" />
              Serving {SITE.serviceAreas.join(" · ")}
            </p>
            <h1 className="mt-6 font-display text-[2.85rem] font-bold leading-[1.03] tracking-[-0.02em] text-ink-900 sm:text-[3.4rem] lg:text-[3.85rem]">
              {/* Forced break keeps "Lunch Concierge" together on one line */}
              <span className="block">Your Office</span>
              <span className="relative whitespace-nowrap text-brand-600">
                Lunch
                {/* Hand-drawn underline keeps the brand playful without emoji */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1.5 left-0 h-[0.35em] w-full text-brand-300"
                >
                  <path
                    d="M2 9c34-5 68-7 100-6s60 4 96 2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Concierge
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-600">
              Stop wasting time searching through menus, collecting orders, and calling restaurants.
              The Lunch Desk helps businesses coordinate office lunches from local restaurants
              through one simple point of contact.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/contact">
                Plan Your Lunch <Icon name="arrow" className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="outline">
                How It Works
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink-900/8 pt-6">
              {TRUST.map((t) => (
                <li
                  key={t.label}
                  className="inline-flex items-center gap-2 whitespace-nowrap text-[13px] font-semibold text-ink-500"
                >
                  <Icon name={t.icon} className="h-4 w-4 text-fresh-500" />
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* PROBLEM — full-bleed dark band gives the page a spine of contrast */}
      <section className="band-dark relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:py-24">
          <div className="">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-brand-300">
              The problem
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance text-white sm:text-[2.75rem] sm:leading-[1.08]">
              Ordering Lunch Shouldn&apos;t Take All Morning
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
              Office lunch orders can quickly turn into a mess of menus, group texts, special
              requests, restaurant phone calls, and last-minute changes.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-200">
              The Lunch Desk helps organize the process so businesses can spend less time managing
              lunch and more time running their business.
            </p>
          </div>

          <ul className="space-y-2.5">
            {PAINS.map((p) => (
              <li
                key={p.text}
                className="flex items-center gap-3.5 rounded-2xl border border-white/8 bg-white/[0.06] px-5 py-3.5 text-[15px] font-medium text-ink-100"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-clay-500/30 text-clay-100">
                  <Icon name={p.icon} className="h-[18px] w-[18px]" />
                </span>
                {p.text}
              </li>
            ))}
            <li className="mt-4 flex items-center gap-3.5 rounded-2xl bg-fresh-500 px-5 py-4 font-display text-[15px] font-bold text-white shadow-lift">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Icon name="phone" className="h-[18px] w-[18px]" />
              </span>
              Or… one message to The Lunch Desk.
            </li>
          </ul>
        </div>
      </section>

      {/* THREE STEPS */}
      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Lunch in three easy steps"
          lead="From 'we should order food' to food on the table — without lunch becoming your job."
        />
        <div className="relative mt-14">
          {/* Dashed path connecting the three steps (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute left-[16.6%] right-[16.6%] top-7 hidden border-t-2 border-dashed border-brand-200 md:block"
          />
          <div className="relative grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="group text-center md:text-left">
                <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 font-display text-lg font-bold text-white shadow-glow transition-transform duration-300 group-hover:-translate-y-1 md:mx-0">
                  {s.n}
                </span>
                <div className="mt-5 rounded-3xl border border-ink-900/8 bg-white p-7 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cream-deep text-brand-600 transition-colors duration-300 group-hover:bg-brand-100">
                    <Icon name={s.icon} className="h-[22px] w-[22px]" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink-600">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Who we help"
          title="Built for busy offices"
          lead="If your workplace ever orders food for a group, The Lunch Desk was built for you."
        />
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {AUDIENCES.map((a) => (
            <li
              key={a}
              className="cursor-default rounded-full border border-ink-900/10 bg-white px-5 py-2.5 text-[15px] font-medium text-ink-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-lift"
            >
              {a}
            </li>
          ))}
        </ul>
      </section>

      {/* LOCAL — Grand Strand */}
      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Serving the Grand Strand"
          title="Local to Myrtle Beach, Conway & Horry County"
          lead="The Lunch Desk is a local service, built for local offices — coordinating lunches from restaurants right in your community."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {AREAS.map((a) => (
            <div
              key={a.name}
              className="group relative overflow-hidden rounded-3xl border border-ink-900/8 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              {/* Accent wash that warms on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-fresh-100 opacity-70 transition-all duration-500 group-hover:scale-125 group-hover:bg-brand-100"
              />
              <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-fresh-100 text-fresh-700 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                <Icon name={a.icon} className="h-[22px] w-[22px]" />
              </span>
              <h3 className="relative mt-4 font-display text-lg font-bold text-ink-900">{a.name}</h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-ink-600">{a.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <TestimonialSection />

      {/* FAQ */}
      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8" id="faq">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
        <FAQList faqs={FAQS} />
        <FaqJsonLd />
      </section>

      <CTASection
        title="Lunch is on the calendar. Let us take it off your desk."
        lead="Tell us the date, the headcount, and the budget — we'll handle the rest."
        buttonLabel="Request Lunch Options"
        buttonHref="/contact"
        secondaryLabel="Become a Restaurant Partner"
        secondaryHref="/partners"
      />
    </>
  );
}
