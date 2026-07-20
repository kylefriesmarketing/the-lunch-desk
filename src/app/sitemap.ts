import type { MetadataRoute } from "next";
import { SITE, NAV_LINKS } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, priority: 1 },
    ...NAV_LINKS.map((l) => ({
      url: `${SITE.url}${l.href}`,
      lastModified: now,
      priority: l.href === "/contact" ? 0.9 : 0.7,
    })),
  ];
}
