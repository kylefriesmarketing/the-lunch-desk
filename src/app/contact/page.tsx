import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { LunchRequestForm } from "@/components/forms/LunchRequestForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/icons";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Plan an Office Lunch — Request Lunch Options",
  description:
    "Request office lunch options in Myrtle Beach, Conway, and Horry County. Share your date, headcount, and budget — The Lunch Desk will coordinate restaurant options and handle the order details.",
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd page={{ name: "Plan an Office Lunch", path: "/contact/" }} />
      <section className="dot-grid">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <SectionHeading
            eyebrow="Plan an office lunch"
            title="Tell us about your next lunch"
            lead="Fill in what you know — even a date and a headcount is enough to start. We'll reply with options that fit."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-ink-900 p-7 text-ink-100">
              <h2 className="font-display text-lg font-bold text-white">What happens next?</h2>
              <ol className="mt-4 space-y-3.5 text-[15px] leading-relaxed">
                <li className="flex gap-3">
                  <span className="font-display font-bold text-brand-300">1.</span>
                  We review your request and check restaurant availability.
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-bold text-brand-300">2.</span>
                  We send you lunch options that fit your budget and headcount.
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-bold text-brand-300">3.</span>
                  You pick — we place, confirm, and coordinate pickup details.
                </li>
              </ol>
            </div>

            <div className="rounded-3xl border border-ink-900/8 bg-white p-7 shadow-sm">
              <h2 className="font-display text-lg font-bold text-ink-900">Prefer to talk?</h2>
              <ul className="mt-3 space-y-2.5 text-[15px] text-ink-600">
                {SITE.phone ? (
                  <li className="flex items-center gap-2.5">
                    <Icon name="phone" className="h-5 w-5 text-brand-500" />
                    <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="font-semibold text-ink-900 hover:text-brand-600">
                      {SITE.phone}
                    </a>
                  </li>
                ) : (
                  <li className="text-ink-400">Phone number coming soon</li>
                )}
                {SITE.email && (
                  <li>
                    <a href={`mailto:${SITE.email}`} className="font-semibold text-ink-900 hover:text-brand-600">
                      {SITE.email}
                    </a>
                  </li>
                )}
                <li className="pt-1 text-sm text-ink-500">
                  Serving {SITE.serviceAreas.join(", ")}, {SITE.region}
                </li>
              </ul>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-ink-900/8 bg-white p-8 shadow-lift sm:p-10">
            <LunchRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
