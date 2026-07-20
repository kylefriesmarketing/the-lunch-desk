import { SITE } from "@/data/site";
import { FAQS } from "@/data/faqs";

/**
 * LocalBusiness + FAQPage structured data.
 * Telephone/address are only included once real values exist in src/data/site.ts.
 */
export function JsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.legalName,
    alternateName: SITE.name,
    slogan: SITE.tagline,
    description:
      "Office lunch coordination service helping businesses organize group food orders from local restaurants in Myrtle Beach, Conway, and Horry County, South Carolina.",
    url: SITE.url,
    areaServed: SITE.serviceAreas.map((name) => ({
      "@type": "Place",
      name: `${name}, ${SITE.region}`,
    })),
    knowsAbout: [
      "Office lunch coordination",
      "Corporate lunch coordination",
      "Group food orders",
      "Business lunch planning",
      "Employee lunch programs",
      "Meeting lunch coordination",
      "Restaurant order coordination",
      "Recurring office lunches",
    ],
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    ...(SITE.email ? { email: SITE.email } : {}),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
