/**
 * SEO Keywords Database
 * Central repository for high-value keywords and search intent data
 */

export interface KeywordData {
  term: string;
  searchVolume: number; // estimated monthly searches
  difficulty: number; // 1-100 SEO difficulty
  intent: "informational" | "commercial" | "navigational" | "transactional";
  relatedPages: string[];
  contentType: "guide" | "comparison" | "tutorial" | "landing" | "resource";
}

export const seoKeywords: KeywordData[] = [
  // High-value design style keywords
  {
    term: "neumorphism design",
    searchVolume: 2400,
    difficulty: 45,
    intent: "informational",
    relatedPages: ["/guides/neumorphism", "/styles?search=neumorphism"],
    contentType: "guide",
  },
  {
    term: "flat design vs material design",
    searchVolume: 1900,
    difficulty: 38,
    intent: "informational",
    relatedPages: ["/guides/minimalist-flat", "/guides/material"],
    contentType: "comparison",
  },
  {
    term: "modern UI design trends",
    searchVolume: 4600,
    difficulty: 62,
    intent: "informational",
    relatedPages: ["/guides", "/styles", "/blog"],
    contentType: "guide",
  },
  {
    term: "web design styles collection",
    searchVolume: 1200,
    difficulty: 35,
    intent: "commercial",
    relatedPages: ["/styles", "/styles?type=visual"],
    contentType: "landing",
  },
  {
    term: "design system documentation",
    searchVolume: 3200,
    difficulty: 55,
    intent: "informational",
    relatedPages: ["/guides", "/components"],
    contentType: "guide",
  },
  {
    term: "UI component patterns",
    searchVolume: 2800,
    difficulty: 48,
    intent: "informational",
    relatedPages: ["/component-patterns", "/components"],
    contentType: "resource",
  },
  {
    term: "CSS animations guide",
    searchVolume: 5400,
    difficulty: 52,
    intent: "informational",
    relatedPages: ["/animations", "/guides"],
    contentType: "guide",
  },
  {
    term: "design token system",
    searchVolume: 1800,
    difficulty: 42,
    intent: "informational",
    relatedPages: ["/guides", "/exports"],
    contentType: "guide",
  },
  {
    term: "website color palette generator",
    searchVolume: 3100,
    difficulty: 58,
    intent: "commercial",
    relatedPages: ["/create-style", "/styles"],
    contentType: "tool",
  },
  {
    term: "responsive design best practices",
    searchVolume: 6200,
    difficulty: 65,
    intent: "informational",
    relatedPages: ["/guides", "/templates"],
    contentType: "guide",
  },
];

/**
 * Get related keyword suggestions for SEO optimization
 */
export function getRelatedKeywords(targetKeyword: string): KeywordData[] {
  return seoKeywords.filter((kw) =>
    kw.relatedPages.some((page) =>
      seoKeywords
        .find((k) => k.term === targetKeyword)
        ?.relatedPages.includes(page)
    )
  );
}

/**
 * Generate SEO-optimized page description based on keyword
 */
export function generateSEODescription(
  keyword: string,
  context: "guide" | "product" | "tool"
): string {
  const baseDescriptions: Record<string, Record<string, string>> = {
    guide: {
      default: `Learn about ${keyword}. Comprehensive guide with examples, best practices, and practical applications for modern web design.`,
    },
    product: {
      default: `Explore our ${keyword} collection. Curated designs with complete documentation, code snippets, and AI Rules for quick integration.`,
    },
    tool: {
      default: `Try our ${keyword} tool. Instantly generate, customize, and export ${keyword} for your projects.`,
    },
  };

  return (
    baseDescriptions[context]?.default ||
    `Learn about ${keyword} and discover how to apply it to your projects.`
  );
}

/**
 * Common SEO meta tags for design-related content
 */
export const designSEOTags = {
  general: [
    "web design",
    "UI design",
    "UX design",
    "design system",
    "design patterns",
    "CSS",
    "Tailwind CSS",
    "responsive design",
    "design trends",
  ],
  specific: [
    "neumorphism",
    "glassmorphism",
    "flat design",
    "minimalist design",
    "material design",
    "brutalism",
    "skeuomorphism",
  ],
  technical: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "design tokens",
    "component library",
  ],
  intent: ["how to", "best practices", "tutorial", "guide", "template", "example"],
};

/**
 * Generate structured data for rich snippets
 */
export function generateSchemaData(pageType: string, data: Record<string, unknown>) {
  const schemas: Record<string, Record<string, unknown>> = {
    guide: {
      "@context": "https://schema.org",
      "@type": "Guide",
      name: data.title,
      description: data.description,
      author: {
        "@type": "Organization",
        name: "StyleKit",
      },
      datePublished: data.datePublished,
      dateModified: data.dateModified,
    },
    article: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.description,
      author: {
        "@type": "Organization",
        name: "StyleKit",
      },
      datePublished: data.datePublished,
      dateModified: data.dateModified,
    },
    creativework: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: data.title,
      description: data.description,
      author: {
        "@type": "Organization",
        name: "StyleKit",
      },
    },
  };

  return schemas[pageType] || {};
}
