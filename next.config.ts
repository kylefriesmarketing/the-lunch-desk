import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // For a fully static deploy (e.g. GitHub Pages), uncomment the next line.
  // Forms still work: they post to the endpoint in src/data/site.ts, not a server route.
  // output: "export",
};

export default nextConfig;
