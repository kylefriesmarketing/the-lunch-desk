import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.legalName,
    short_name: SITE.name,
    description: `Office lunch coordination for ${SITE.serviceAreas.join(", ")}, ${SITE.region}.`,
    start_url: `${SITE.url}/`,
    display: "standalone",
    background_color: "#faf6ef",
    theme_color: "#e86f2d",
    icons: [
      { src: `${SITE.url}/icon.svg`, sizes: "any", type: "image/svg+xml" },
      {
        src: `${SITE.url}/apple-icon.png`,
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
