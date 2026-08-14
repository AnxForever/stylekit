import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CollectionContent } from "@/components/collections/collection-content";
import {
  getAllCollections,
  getCollectionBySlug,
  getCollectionStyles,
} from "@/lib/styles/collections";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { generateBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getSiteBaseUrl } from "@/lib/site-url";
import type { Locale } from "@/lib/i18n/translations";

const BASE_URL = getSiteBaseUrl();

export function generateStaticParams() {
  return getAllCollections().map((collection) => ({ theme: collection.slug }));
}

export const revalidate = 86400;
export const dynamicParams = false;

export async function generateMetadata({
  params,
  locale = "en",
}: {
  params: Promise<{ theme: string }>;
  locale?: Locale;
}): Promise<Metadata> {
  const { theme } = await params;
  const collection = getCollectionBySlug(theme);
  if (!collection) return { title: "Collection Not Found" };

  const title = locale === "zh" ? collection.titleZh : collection.titleEn;
  const description =
    locale === "zh" ? collection.metaDescriptionZh : collection.metaDescriptionEn;

  return {
    title,
    description,
    openGraph: {
      title: `${title} — StyleKit`,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — StyleKit`,
      description,
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ theme: string }>;
}) {
  const { theme } = await params;
  const collection = getCollectionBySlug(theme);
  if (!collection) notFound();

  const styles = getCollectionStyles(collection);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: BASE_URL },
    { name: "Collections", url: `${BASE_URL}/collections` },
    { name: collection.titleEn, url: `${BASE_URL}/collections/${collection.slug}` },
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.titleEn,
    description: collection.metaDescriptionEn,
    url: `${BASE_URL}/collections/${collection.slug}`,
    isPartOf: { "@type": "WebSite", name: "StyleKit", url: BASE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: styles.length,
      itemListElement: styles.map((style, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: style.nameEn,
        url: `${BASE_URL}/styles/${style.slug}`,
      })),
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <CollectionContent collection={collection} styles={styles} />
      </main>
      <Footer />
    </div>
  );
}
