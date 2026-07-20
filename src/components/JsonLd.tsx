import { SITE } from "@/data/site";
import { FAQS } from "@/data/faqs";
import { SERVICES } from "@/data/services";

const BUSINESS_ID = `${SITE.url}/#business`;

/**
 * Global organization + website structured data (rendered site-wide).
 * ProfessionalService carries the service offers and areas served;
 * WebSite ties pages back to the business. Telephone/email are only
 * emitted once real values exist in src/data/site.ts.
 */
export function JsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: SITE.legalName,
    alternateName: SITE.name,
    slogan: SITE.tagline,
    description:
      "Office lunch coordination service helping businesses organize group food orders from local restaurants in Myrtle Beach, Conway, and Horry County, South Carolina.",
    url: SITE.url,
    image: `${SITE.url}/og-image.png`,
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
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.blurb,
        areaServed: SITE.serviceAreas.map((name) => `${name}, ${SITE.region}`),
      },
    })),
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    ...(SITE.email ? { email: SITE.email } : {}),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "en-US",
    publisher: { "@id": BUSINESS_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

/** FAQPage structured data — render only on pages that show the FAQ. */
export function FaqJsonLd() {
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
    />
  );
}

/** BreadcrumbList structured data for interior pages. */
export function BreadcrumbJsonLd({ page }: { page: { name: string; path: string } }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: page.name,
        item: `${SITE.url}${page.path}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
