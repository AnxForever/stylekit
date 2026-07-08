import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CollectionsIndex } from "@/components/collections/collections-index";
import {
  getAllCollections,
  getCollectionStyleCount,
} from "@/lib/styles/collections";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();

export const metadata: Metadata = {
  title: "Design Style Collections by Theme",
  description:
    "Browse 130+ design styles grouped by theme — dark mode, retro & vintage, anime, game UI, bold color, and hand-drawn. Find the right style by intent, then copy tokens or install via shadcn, CLI, or MCP.",
  keywords: [
    "design style collections",
    "dark mode styles",
    "retro web design",
    "anime UI styles",
    "game UI design",
    "themed design systems",
  ],
};

export const revalidate = 86400;

export default function CollectionsPage() {
  const collections = getAllCollections().map((collection) => ({
    collection,
    count: getCollectionStyleCount(collection),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Design Style Collections",
    description:
      "Curated collections of design styles grouped by theme — dark mode, retro, anime, game UI, and more.",
    url: `${BASE_URL}/collections`,
    isPartOf: { "@type": "WebSite", name: "StyleKit", url: BASE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: collections.length,
      itemListElement: collections.map(({ collection }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: collection.titleEn,
        url: `${BASE_URL}/collections/${collection.slug}`,
      })),
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <CollectionsIndex collections={collections} />
      </main>
      <Footer />
    </div>
  );
}
