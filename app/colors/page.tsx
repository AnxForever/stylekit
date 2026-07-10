import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ColorsExplorer } from "@/components/colors/colors-explorer";
import { getAllStyleColors, getUniqueSwatchCount } from "@/lib/styles/colors";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();

export const metadata: Metadata = {
  title: "Color Palettes & Hex Codes for 135 Design Styles",
  description:
    "Search and copy hex codes from 135 curated design styles — Glassmorphism, Bauhaus, Cyberpunk, and more. Every color is tagged with its style for Tailwind, CSS, and AI prompts.",
  keywords: [
    "color palette",
    "hex codes",
    "design style colors",
    "UI color scheme",
    "Tailwind colors",
    "web design palette",
    "brand colors",
  ],
};

export const revalidate = 86400;

export default function ColorsPage() {
  const entries = getAllStyleColors();
  const swatchCount = getUniqueSwatchCount();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Design Style Color Palettes",
    description: `Color palettes and hex codes from ${entries.length} design styles, ${swatchCount}+ curated swatches.`,
    url: `${BASE_URL}/colors`,
    isPartOf: {
      "@type": "WebSite",
      name: "StyleKit",
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: entries.length,
      itemListElement: entries.slice(0, 50).map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${entry.nameEn} palette`,
        url: `${BASE_URL}/styles/${entry.slug}`,
      })),
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <ColorsExplorer entries={entries} swatchCount={swatchCount} />
      </main>
      <Footer />
    </div>
  );
}
