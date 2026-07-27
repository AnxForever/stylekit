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
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { getAlternateLocalePath } from "@/lib/i18n/routing";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";

const BASE_URL = getSiteBaseUrl();

export const metadata: Metadata = {
  title: "Design Style Collections by Theme",
  description:
    `Browse ${CURATED_STYLE_COUNT} design styles grouped by theme — dark mode, retro & vintage, anime, game UI, bold color, and hand-drawn. Find the right style by intent, then copy constraints or install a registry theme through shadcn.`,
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

export default async function CollectionsPage() {
  const { locale } = await getRequestLocaleContext();
  const isZh = locale === "zh";
  const collections = getAllCollections().map((collection) => ({
    collection,
    count: getCollectionStyleCount(collection),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}${getAlternateLocalePath("/collections", locale)}#collection-page`,
    name: isZh ? "设计风格主题合集" : "Design Style Collections",
    description: isZh
      ? "按暗色模式、复古、动漫、游戏 UI、强烈配色和手绘等主题整理的设计风格合集。"
      : "Curated collections of design styles grouped by theme — dark mode, retro, anime, game UI, and more.",
    url: `${BASE_URL}${getAlternateLocalePath("/collections", locale)}`,
    inLanguage: isZh ? "zh-CN" : "en",
    isPartOf: { "@type": "WebSite", "@id": `${BASE_URL}/#website`, name: "StyleKit", url: BASE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: collections.length,
      itemListElement: collections.map(({ collection }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: isZh ? collection.titleZh : collection.titleEn,
        url: `${BASE_URL}${getAlternateLocalePath(`/collections/${collection.slug}`, locale)}`,
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
