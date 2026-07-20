import type { Metadata } from "next";
import { SITE } from "@/data/site";

const OG_IMAGE = {
  url: `${SITE.url}/og-image.png`,
  width: 1200,
  height: 630,
  alt: `${SITE.name} — ${SITE.tagline}`,
};

/**
 * Builds a page's Metadata with correct per-page Open Graph + Twitter cards,
 * a self-canonical URL, and the shared social image.
 *
 * Next.js replaces (does not deep-merge) a child's `openGraph`, so every page
 * that customizes sharing text must re-declare the image — this helper does
 * that in one place so no page silently loses its share preview.
 *
 * @param title       Page <title> (the layout appends "| The Lunch Desk").
 * @param description Meta + social description.
 * @param path        Route without trailing slash, e.g. "/how-it-works".
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE.url}${path}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url,
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
