import type { BlogPost } from "@/lib/blog";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();

export function generateAboutPageJsonLd(options: {
  url: string;
  language: "en" | "zh-CN";
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${options.url}#aboutpage`,
    url: options.url,
    name: "About StyleKit",
    description: options.description,
    inLanguage: options.language,
    mainEntity: {
      "@id": `${BASE_URL}/#organization`,
    },
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
  };
}

interface StyleJsonLdInput {
  name: string;
  description: string;
  keywords: string[];
  category: string;
  url: string;
  language: "en" | "zh-CN";
}

export function generateStyleJsonLd(style: StyleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${style.url}#creative-work`,
    name: `${style.name} - StyleKit`,
    description: style.description,
    url: style.url,
    mainEntityOfPage: style.url,
    inLanguage: style.language,
    author: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "StyleKit",
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "StyleKit",
      url: BASE_URL,
    },
    keywords: style.keywords.join(", "),
    genre: style.category,
  };
}

export function generateBlogPostJsonLd(
  post: BlogPost,
  options: { url: string; language: string }
) {
  const author = post.author === "StyleKit Team"
    ? {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "StyleKit",
        url: BASE_URL,
      }
    : {
        "@type": "Person",
        name: post.author,
      };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${options.url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    ...(post.modified ? { dateModified: post.modified } : {}),
    inLanguage: options.language,
    mainEntityOfPage: options.url,
    author,
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "StyleKit",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon-512x512.png`,
      },
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "StyleKit",
      url: BASE_URL,
    },
    url: options.url,
    keywords: post.tags.join(", "),
  };
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export interface CommunityStyleJsonLdInput {
  name: string;
  description: string;
  keywords: string[];
  category: string;
  url: string;
  language: "en" | "zh-CN";
  author?: { name: string; url?: string };
  datePublished?: string;
  isPromoted?: boolean;
}

/** Structured data for an approved community contribution. */
export function generateCommunityStyleJsonLd(style: CommunityStyleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${style.url}#creative-work`,
    name: style.name,
    description: style.description,
    url: style.url,
    mainEntityOfPage: style.url,
    inLanguage: style.language,
    ...(style.datePublished ? { datePublished: style.datePublished } : {}),
    ...(style.isPromoted !== undefined
      ? { isPartOf: { "@id": `${BASE_URL}/#website` }, isAccessibleForFree: true }
      : {}),
    author: style.author
      ? {
          "@type": "Person",
          name: style.author.name,
          ...(style.author.url ? { url: style.author.url } : {}),
        }
      : {
          "@type": "Organization",
          "@id": `${BASE_URL}/#organization`,
          name: "StyleKit Community",
        },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "StyleKit",
      url: BASE_URL,
    },
    keywords: style.keywords.join(", "),
    genre: style.category,
  };
}

export interface CommunityCollectionJsonLdInput {
  name: string;
  description: string;
  url: string;
  language: "en" | "zh-CN";
  items: Array<{ name: string; url: string; description?: string }>;
}

/** A compact, extractable catalog graph for the public community hub. */
export function generateCommunityCollectionJsonLd(
  collection: CommunityCollectionJsonLdInput
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${collection.url}#collection-page`,
    name: collection.name,
    description: collection.description,
    url: collection.url,
    inLanguage: collection.language,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: collection.items.length,
      itemListElement: collection.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: item.name,
          url: item.url,
          ...(item.description ? { description: item.description } : {}),
        },
      })),
    },
  };
}

export function generateContributorProfileJsonLd(options: {
  name: string;
  description: string;
  url: string;
  image?: string;
  language: "en" | "zh-CN";
  publishedStyles: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${options.url}#profile-page`,
    name: options.name,
    description: options.description,
    url: options.url,
    inLanguage: options.language,
    mainEntity: {
      "@type": "Person",
      name: options.name,
      url: options.url,
      ...(options.image ? { image: options.image } : {}),
      // No `worksFor`: a community contributor is independent, and asserting an
      // employment relationship would invent a fact about a real person.
      // No `subjectOf`: schema.org reads it as "works about this Person", while
      // these styles are works *authored by* them. That relation belongs on each
      // CreativeWork's `author` (see generateCommunityStyleJsonLd), not inverted
      // here. `publishedStyles` stays in the input for callers that render the
      // list as visible markup.
    },
  };
}
