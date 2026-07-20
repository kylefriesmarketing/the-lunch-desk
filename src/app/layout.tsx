import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline} | Myrtle Beach & Conway, SC`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "The Lunch Desk helps Myrtle Beach, Conway, and Horry County businesses coordinate office lunches from local restaurants — one point of contact for group orders, meeting meals, and recurring office lunch programs.",
  keywords: [
    "office lunch Myrtle Beach",
    "office catering Myrtle Beach",
    "corporate lunch Myrtle Beach",
    "office lunch Conway SC",
    "corporate catering Conway SC",
    "group lunch ordering Horry County",
    "office food ordering Myrtle Beach",
    "business lunch coordination Myrtle Beach",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "One point of contact for office lunches in Myrtle Beach, Conway & Horry County. We coordinate the food — you focus on your business.",
    locale: "en_US",
    url: SITE.url,
    images: [
      {
        url: `${SITE.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Office lunch coordination for Myrtle Beach, Conway & Horry County businesses.",
    images: [`${SITE.url}/og-image.png`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#e86f2d",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:font-display focus:font-semibold focus:text-cream focus:shadow-lift"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}
