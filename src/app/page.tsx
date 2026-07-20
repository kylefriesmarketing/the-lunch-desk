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
    blurb:
      "From the medical district to the resorts and dealerships along the Grand Strand, we coordinate office lunches for Myrtle Beach teams of every size.",
  },
  {
    name: "Conway",
    blurb:
      "Law firms, government offices, and growing businesses around Conway get one contact for corporate lunches and recurring staff meals.",
  },
  {
    name: "Horry County",
    blurb:
      "Wherever your office sits across greater Horry County, we help organize group food orders from restaurants close to you.",
  },
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

/** The playful "order ticket" card floating beside the hero copy. */
function HeroTicket() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:200ms]"
    >
      <div className="rotate-2 rounded-3xl border border-ink-900/8 bg-white p-6 shadow-lift-lg transition-transform duration-300 hover:rotate-0">
        <div className="flex items-center justify-between border-b border-dashed border-ink-900/15 pb-4">
          <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-600">
            Lunch Order
          </span>
          <span className="rounded-full bg-fresh-100 px-3 py-1 text-xs font-bold text-fresh-700">
            Confirmed ✓
          </span>
        </div>
        <ul className="mt-4 space-y-3 text-sm text-ink-700">
          <li className="flex justify-between">
            <span>Team headcount</span>
            <span className="font-semibold text-ink-900">14 people</span>
          </li>
          <li className="flex justify-between">
            <span>Budget</span>
            <span className="font-semibold text-ink-900">$14 / person</span>
          </li>
          <li className="flex justify-between">
            <span>Dietary notes</span>
            <span className="font-semibold text-ink-900">2 veg · 1 GF</span>
          </li>
          <li className="flex justify-between">
            <span>Pickup</span>
            <span className="font-semibold text-ink-900">11:45 AM</span>
          </li>
        </ul>
        <div className="mt-5 rounded-2xl bg-cream-deep p-4 text-center font-display text-sm font-semibold text-ink-800">
          Coordinated by The Lunch Desk 🥪
        </div>
      </div>
      <div className="absolute -left-6 -top-5 -rotate-6 rounded-2xl bg-brand-500 px-4 py-2 font-display text-sm font-bold text-white shadow-lift">
        One call, handled.
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="dot-grid relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-2 lg:pt-24">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
              <Icon name="bag" className="h-4 w-4" />
              Serving {SITE.serviceAreas.join(" · ")}
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
              Your Office <span className="text-brand-600">Lunch</span> Concierge
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
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
          </div>
          <HeroTicket />
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto mt-8 max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 rounded-[2.5rem] bg-white p-10 shadow-lift sm:p-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="The problem"
              title="Ordering Lunch Shouldn't Take All Morning"
            />
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              Office lunch orders can quickly turn into a mess of menus, group texts, special
              requests, restaurant phone calls, and last-minute changes.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              The Lunch Desk helps organize the process so businesses can spend less time managing
              lunch and more time running their business.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Six browser tabs of menus",
              "A group text 40 messages deep",
              "Three phone calls to the restaurant",
              "Somebody's order still missing",
            ].map((pain) => (
              <li
                key={pain}
                className="flex items-center gap-3 rounded-2xl bg-cream px-5 py-3.5 text-[15px] font-medium text-ink-700"
              >
                <span className="text-lg" aria-hidden="true">
                  😩
                </span>
                {pain}
              </li>
            ))}
            <li className="flex items-center gap-3 rounded-2xl bg-fresh-100 px-5 py-3.5 text-[15px] font-semibold text-fresh-700">
              <span className="text-lg" aria-hidden="true">
                ☎️
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
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="relative rounded-3xl border border-ink-900/8 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="absolute -top-4 left-8 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 font-display text-sm font-bold text-white">
                {s.n}
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink-900">{s.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Who we help"
          title="Built for busy offices"
          lead="If your workplace ever orders food for a group, The Lunch Desk was built for you."
        />
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {AUDIENCES.map((a) => (
            <li
              key={a}
              className="rounded-full border border-ink-900/10 bg-white px-5 py-2.5 text-[15px] font-medium text-ink-700 shadow-sm"
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
              className="rounded-3xl border border-ink-900/8 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-fresh-100 text-fresh-700">
                <Icon name="check" className="h-5.5 w-5.5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{a.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{a.blurb}</p>
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
