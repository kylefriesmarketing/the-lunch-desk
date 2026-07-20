import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/icons";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "How It Works — Office Lunch Coordination in Myrtle Beach & Conway",
  description:
    "How The Lunch Desk coordinates office lunches: share your date, headcount, and budget — we organize restaurant options, place the order, and coordinate pickup details for Myrtle Beach, Conway, and Horry County businesses.",
  path: "/how-it-works",
});

const YOU_PROVIDE = [
  { label: "Date", note: "When lunch needs to happen" },
  { label: "Desired pickup time", note: "When the food should be ready" },
  { label: "Number of people", note: "From a team of 4 to the whole office" },
  { label: "Budget", note: "Per person or a total — either works" },
  { label: "Preferred restaurants or cuisines", note: "Favorites welcome, or leave it to us" },
  { label: "Dietary restrictions", note: "Vegetarian, gluten-free, allergies & more" },
  { label: "Individual orders or group-style", note: "Everyone picks, or shared trays" },
  { label: "Special instructions", note: "Anything else we should know" },
];

const WE_HANDLE = [
  "Researching restaurant and catering options that fit your budget",
  "Organizing everyone's selections for individual-order lunches",
  "Handling special requests and dietary needs when available",
  "Placing and confirming the order with the restaurant",
  "Coordinating the pickup details so food is ready on time",
  "Keeping recurring lunch orders organized week after week",
  "Simplifying invoicing and order tracking",
];

export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbJsonLd page={{ name: "How It Works", path: "/how-it-works/" }} />
      <section className="dot-grid">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <h1 className="mx-auto max-w-3xl animate-fade-up font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            One point of contact between your office and{" "}
            <span className="text-brand-600">every local restaurant</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
            No apps to learn, no accounts to set up, no group-order spreadsheets. You tell us what
            your office needs — we coordinate the rest.
          </p>
        </div>
      </section>

      {/* What you provide */}
      <section className="mx-auto mt-6 max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Step one"
          title="Tell us about your lunch"
          lead="A quick message or form is all it takes. The more you share, the better we can match options to your office."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {YOU_PROVIDE.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-ink-900/8 bg-white p-5 shadow-sm"
            >
              <h3 className="font-display text-[15px] font-bold text-ink-900">{item.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we handle */}
      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-10 rounded-[2.5rem] bg-ink-900 p-10 sm:p-14 lg:grid-cols-2">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-brand-300">
              Step two &amp; three
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Then The Lunch Desk gets to work
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-200">
              We help you explore options that fit, then organize, place, and confirm the order —
              coordinating restaurant pickup details so lunch shows up like it was never a problem
              in the first place.
            </p>
            <p className="mt-4 rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-ink-200">
              <strong className="text-white">A note on delivery:</strong> we coordinate orders and
              restaurant pickup arrangements. Delivery availability may depend on the restaurant or
              the specific order.
            </p>
          </div>
          <ul className="space-y-3">
            {WE_HANDLE.map((w) => (
              <li
                key={w}
                className="flex items-start gap-3 rounded-2xl bg-white/8 px-5 py-3.5 text-[15px] leading-relaxed text-ink-100"
              >
                <span className="mt-0.5 text-fresh-500">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Ready to hand off lunch?"
        lead="Send us your next lunch date and headcount — see how easy it can be."
        buttonLabel="Plan an Office Lunch"
        buttonHref="/contact"
        secondaryLabel="Browse Lunch Options"
        secondaryHref="/restaurants"
      />
    </>
  );
}
