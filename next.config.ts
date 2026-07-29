import type { NextConfig } from "next";

// Static export — the whole site prerenders; forms post client-side to the
// endpoint in src/data/site.ts, so no server is needed. basePath only applies
// to the GitHub Pages deploy (DEPLOY_TARGET=gh-pages); a Vercel/custom-domain
// deploy builds without it.
const onGhPages = process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  // Static export has no server to run Next's image optimizer, so images are
  // served as-authored. They're pre-sized by scripts/optimize-illustrations.ps1.
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: onGhPages ? "/the-lunch-desk" : "",
};

export default nextConfig;
