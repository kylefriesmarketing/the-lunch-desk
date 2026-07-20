import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/icons";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About — A Local Answer to Office Lunch Chaos",
  description:
    "The Lunch Desk was created to solve a simple problem: ordering food for an entire workplace is unnecessarily complicated. We connect local restaurants with local businesses across Myrtle Beach, Conway, and Horry County.",
};

const VALUES = [
  {
    title: "Local first",
    body: "We exist to route office lunch budgets into local kitchens — the restaurants that make the Grand Strand worth eating in.",
  },
  {
    title: "Practical, not fancy",
    body: "No apps to install, no platforms to learn. A conversation and a confirmed order — the way local business has always worked best.",
  },
  {
    title: "Honest coordination",
    body: "We tell you what's available, what it costs, and when it'll be ready. No inflated promises, no fine print.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd page={{ name: "About", path: "/about/" }} />
      <section className="dot-grid">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-brand-600">
              About The Lunch Desk
            </p>
            <h1 className="mt-4 animate-fade-up font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              Ordering food for a whole workplace is{" "}
              <span className="text-brand-600">unnecessarily complicated.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-600">
              That&apos;s the simple problem The Lunch Desk was created to solve.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-6 rounded-[2.5rem] bg-white p-10 text-lg leading-relaxed text-ink-700 shadow-lift sm:p-14">
          <p>
            Somebody in every office gets stuck with lunch duty — the office manager, the
            receptionist, the rep bringing food to a client's office. Suddenly their morning is
            menus, group texts, phone calls, and hoping the order comes out right.
          </p>
          <p>
            <strong className="font-display text-ink-900">
              The Lunch Desk exists to be the connection between local restaurants and local
              businesses
            </strong>{" "}
            — one point of contact that makes office lunch ordering easier for everyone involved.
            Offices get their time back. Restaurants get organized group orders. Lunch gets better.
          </p>
          <p>
            We&apos;re starting right here at home: {SITE.serviceAreas.join(", ")} — with room to
            grow.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="How we work" title="Local, practical, trustworthy" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-3xl border border-ink-900/8 bg-white p-7 shadow-sm">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                <Icon name="check" className="h-5.5 w-5.5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold text-ink-900">{v.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="We coordinate the food. You focus on your business."
        buttonLabel="Contact The Lunch Desk"
        buttonHref="/contact"
      />
    </>
  );
}
