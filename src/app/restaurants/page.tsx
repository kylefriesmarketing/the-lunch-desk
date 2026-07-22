import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { RestaurantDirectory } from "@/components/RestaurantDirectory";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Lunch Options — Local Restaurant Partners for Office Food Ordering",
  description:
    "Browse restaurant and catering styles for office lunches in Myrtle Beach, Conway, and Horry County. Filter by cuisine, price, location, group size, and catering availability — then request lunch options from The Lunch Desk.",
  path: "/restaurants",
});

export default function RestaurantsPage() {
  return (
    <>
      <BreadcrumbJsonLd page={{ name: "Lunch Options", path: "/restaurants/" }} />
      <section className="dot-grid">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <SectionHeading
            eyebrow="Lunch options"
            title="Local flavors, office-ready"
            lead="Our restaurant partner directory is just getting started — these slots show the kinds of local kitchens we're bringing on board. Filter by what your office needs, or just tell us and we'll do the matching."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <RestaurantDirectory />
        <p className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-5 text-sm leading-relaxed text-brand-800">
          <strong className="font-display">Restaurant listings are placeholders</strong> while we
          finalize our first local partnerships — no real restaurant partnerships are shown yet.
          Own a local kitchen?{" "}
          <Link href="/partners" className="font-semibold underline underline-offset-4">
            Become a restaurant partner.
          </Link>
        </p>
      </section>

      <CTASection
        title="Don't see what you're craving?"
        lead="We coordinate with local restaurants across the Grand Strand — tell us what your office wants and we'll find it."
        buttonLabel="Request Lunch Options"
        buttonHref="/contact"
      />
    </>
  );
}
