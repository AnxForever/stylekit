import type { BlogPost } from "@/lib/blog";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();

interface StyleJsonLdInput {
  slug: string;
  nameEn: string;
  description: string;
  keywords: string[];
  category: string;
}

export function generateStyleJsonLd(style: StyleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${style.nameEn} - StyleKit`,
    description: style.description,
    url: `${BASE_URL}/styles/${style.slug}`,
    author: {
      "@type": "Organization",
      name: "StyleKit",
    },
    keywords: style.keywords.join(", "),
    genre: style.category,
  };
}

export function generateBlogPostJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "StyleKit",
      url: BASE_URL,
    },
    url: `${BASE_URL}/blog/${post.slug}`,
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
