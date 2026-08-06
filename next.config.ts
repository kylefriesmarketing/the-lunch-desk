import type { NextConfig } from "next";

// Static export — the whole site prerenders; forms post client-side to the
// endpoint in src/data/site.ts, so no server is needed.
//
// NOTE: basePath is intentionally absent. The site is served from the apex
// custom domain thelunchdesk.com (see public/CNAME), so every asset lives at
// the root. The old "/the-lunch-desk" basePath was only needed while the site
// lived at kylefriesmarketing.github.io/the-lunch-desk — reinstating it would
// break every asset URL on the custom domain.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  // Static export has no server to run Next's image optimizer, so images are
  // served as-authored. They're pre-sized by scripts/optimize-illustrations.ps1.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
