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
