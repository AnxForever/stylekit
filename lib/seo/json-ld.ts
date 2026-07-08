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

interface StyleFaqInput {
  /** Display name shown to users, e.g. "Glassmorphism". */
  name: string;
  description: string;
  /** Optional design philosophy / rationale for the "when to use" answer. */
  philosophy?: string;
  category?: string;
  /** A few concrete do's used to enrich the "how to apply" answer. */
  dos?: string[];
  locale?: "en" | "zh";
}

/**
 * FAQPage schema for a style detail page. Feeds both Google rich results and
 * generative engines (GEO): the Q&A pairs are phrased as direct, citable
 * answers to the questions users actually ask about a visual style.
 */
export function generateStyleFaqJsonLd(style: StyleFaqInput) {
  const isZh = style.locale === "zh";
  const name = style.name;
  const doHint =
    style.dos && style.dos.length > 0
      ? isZh
        ? `关键实践包括：${style.dos.slice(0, 3).join("、")}。`
        : `Key practices include: ${style.dos.slice(0, 3).join("; ")}.`
      : "";

  const qa: Array<{ q: string; a: string }> = [
    {
      q: isZh ? `什么是 ${name} 设计风格？` : `What is the ${name} design style?`,
      a: style.description,
    },
    {
      q: isZh
        ? `什么时候适合使用 ${name} 风格？`
        : `When should I use the ${name} style?`,
      a:
        (style.philosophy && style.philosophy.trim()) ||
        (isZh
          ? `${name} 适合需要${style.category ?? "该视觉方向"}氛围的界面。你可以在 StyleKit 上浏览它的实际渲染效果，判断是否契合你的产品调性。`
          : `${name} fits interfaces that call for a ${style.category ?? "distinctive"} visual direction. Preview its live rendering on StyleKit to judge whether it matches your product tone.`),
    },
    {
      q: isZh
        ? `如何用 AI 编码工具落地 ${name} 风格？`
        : `How do I apply the ${name} style with AI coding tools?`,
      a: isZh
        ? `StyleKit 为 ${name} 提供完整的 design tokens、组件配方和可导出的 AI Rules。把这些约束粘贴给 ChatGPT、Cursor、Claude 或 v0，即可稳定生成符合该风格的 UI。${doHint}`
        : `StyleKit provides ${name} as ready-to-use design tokens, component recipes, and exportable AI Rules. Paste those constraints into ChatGPT, Cursor, Claude, or v0 to generate UI that stays on-style. ${doHint}`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
