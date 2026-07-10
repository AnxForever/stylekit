import type { Metadata } from "next";
import type { RequestLocaleContext } from "@/lib/i18n/request";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";

export function buildSiteMetadata(context: RequestLocaleContext): Metadata {
  const description = `UI design prompt library and AI-friendly design system with ${CURATED_STYLE_COUNT} curated visual styles. Export design tokens, component recipes, Tailwind-ready patterns, and AI prompts for consistent website UI generation.`;
  const socialDescription = `${CURATED_STYLE_COUNT} curated visual styles with design tokens, component recipes, Tailwind-ready patterns, and AI prompts for beautiful, consistent website UI.`;
  return {
    metadataBase: new URL(context.baseUrl),
    title: {
      default: "StyleKit - UI Design Prompts, Visual Styles & AI-Friendly Design System",
      template: "%s | StyleKit",
    },
    description,
    keywords: [
      "UI design prompts",
      "web design prompts",
      "website design prompts",
      "AI UI prompt library",
      "design system",
      "UI components",
      "Tailwind CSS",
      "Neo-Brutalist",
      "Glassmorphism",
      "Neumorphism",
      "AI coding",
      "design tokens",
      "React components",
      "v0 prompts",
      "shadcn/ui",
      "web design",
    ],
    authors: [{ name: "StyleKit Team", url: context.baseUrl }],
    creator: "StyleKit",
    publisher: "StyleKit",
    formatDetection: {
      email: false,
      telephone: false,
    },
    alternates: {
      types: {
        "application/rss+xml": [
          { url: "/feed.xml", title: "StyleKit Blog" },
          { url: "/feed/styles.xml", title: "StyleKit - New Styles" },
        ],
      },
    },
    openGraph: {
      type: "website",
      locale: context.openGraphLocale,
      alternateLocale: context.locale === "zh" ? ["en_US"] : ["zh_CN"],
      siteName: "StyleKit",
      title: "StyleKit - UI Design Prompts, Visual Styles & AI-Friendly Design System",
      description: socialDescription,
      images: [
        {
          url: `${context.baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "StyleKit - AI-Friendly Design System",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "StyleKit - UI Design Prompts, Visual Styles & AI-Friendly Design System",
      description: socialDescription,
      creator: "@Justice66890051",
      images: [`${context.baseUrl}/opengraph-image`],
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || "2f16e5aff2dd3b60",
      other: {
        "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
      },
    },
    category: "technology",
  };
}
