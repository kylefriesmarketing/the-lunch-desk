import { SectionHeading } from "@/components/SectionHeading";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Icon, type IconName } from "@/components/icons";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Restaurant Partners — Grow Your Business Orders",
  description:
    "Partner with The Lunch Desk to receive large and recurring office lunch orders from Myrtle Beach, Conway, and Horry County businesses. One contact, bigger group orders, simplified business ordering.",
  path: "/partners",
});

const BENEFITS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "users",
    title: "Access to local business customers",
    body: "Offices, clinics, firms and dealerships across the Grand Strand that order lunch for groups — regularly.",
  },
  {
    icon: "boxes",
    title: "Larger group orders",
    body: "Business lunches mean bigger tickets: boxed lunches, trays, and full-office orders instead of single plates.",
  },
  {
    icon: "repeat",
    title: "Recurring office customers",
    body: "Weekly team lunches and standing meeting orders turn one good lunch into a steady relationship.",
  },
  {
    icon: "chart",
    title: "Additional exposure",
    body: "Your kitchen in front of decision-makers who plan office meals — without extra marketing spend.",
  },
  {
    icon: "phone",
    title: "Simplified communication",
    body: "One organized contact for business orders — clear headcounts, confirmed details, and scheduled pickups instead of chaotic phone-in group orders.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <BreadcrumbJsonLd page={{ name: "Restaurant Partners", path: "/partners/" }} />
      <section className="hero-glow dot-grid">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-fresh-500/30 bg-fresh-100 px-4 py-1.5 text-sm font-semibold text-fresh-700">
            <Icon name="utensils" className="h-4 w-4" />
            For local restaurants
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl animate-fade-up font-display text-4xl font-bold tracking-tight text-balance text-ink-900 sm:text-5xl">
            More business orders.{" "}
            {/* nowrap stops the browser breaking the line mid-hyphenate
                ("Less back-" / "and-forth.") */}
            <span className="whitespace-nowrap text-brand-600">Less back-and-forth.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
            The Lunch Desk connects your kitchen with local offices that order food for teams,
            meetings, and events — and we handle the coordination so the orders arrive organized.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Flex + justify-center (not a grid) so the final row of 5 cards
            centres instead of leaving an orphan gap on the right. */}
        <div className="flex flex-wrap justify-center gap-6">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="group w-full rounded-3xl border border-ink-900/8 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-fresh-500/40 hover:shadow-lift sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-fresh-100 text-fresh-700 transition-colors duration-300 group-hover:bg-fresh-500 group-hover:text-white">
                <Icon name={b.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-lg font-bold text-ink-900">{b.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8" id="inquiry">
        <div className="grid gap-10 rounded-[2.5rem] bg-white p-8 shadow-lift sm:p-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Partner inquiry"
              title="Let's talk lunch"
              lead="Tell us about your restaurant and we'll reach out to discuss how partnering with The Lunch Desk works."
            />
            <ul className="mt-6 space-y-2.5 text-[15px] text-ink-600">
              <li className="flex items-center gap-2.5">
                <Icon name="check" className="h-5 w-5 text-fresh-500" /> No cost to inquire
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="check" className="h-5 w-5 text-fresh-500" /> You keep control of your menu
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="check" className="h-5 w-5 text-fresh-500" /> Local, Horry County focused
              </li>
            </ul>
          </div>
          <PartnerForm />
        </div>
      </section>
    </>
  );
}
