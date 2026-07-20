import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/data/services";
import { AUDIENCES } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Business Services — Corporate Lunch Coordination in Horry County",
  description:
    "Weekly office lunches, staff meetings, training sessions, pharmaceutical lunches, sales presentations, and recurring lunch programs — The Lunch Desk coordinates group food orders for businesses in Myrtle Beach, Conway, and Horry County.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd page={{ name: "Business Services", path: "/services/" }} />
      <section className="dot-grid">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <SectionHeading
            eyebrow="Business services"
            title="Whatever the occasion, lunch is covered"
            lead="From a Tuesday team lunch to a hundred-person training day, The Lunch Desk coordinates food for the moments that keep your business moving."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <div className="rounded-[2.5rem] bg-white p-10 shadow-lift sm:p-14">
          <SectionHeading
            align="left"
            eyebrow="Who calls us"
            title="Offices of every kind"
            lead="If your workplace ever feeds a group, we can make it easier."
          />
          <ul className="mt-8 flex flex-wrap gap-3">
            {AUDIENCES.map((a) => (
              <li
                key={a}
                className="rounded-full bg-cream px-4.5 py-2 text-sm font-medium text-ink-700"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Need lunch for your team? Tell us what you're planning."
        lead="Date, headcount, budget — that's all we need to get started."
        buttonLabel="Get Started"
        buttonHref="/contact"
      />
    </>
  );
}
