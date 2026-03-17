import { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join } from "path";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { getAllAnimationsMeta } from "@/lib/animations/meta";
import { getAllTopicSlugs } from "@/lib/prompts";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top";

function getTemplateSlugs(): string[] {
  const templatesDir = join(process.cwd(), "app/templates");
  return readdirSync(templatesDir, { withFileTypes: true })
    .filter((directoryEntry) => directoryEntry.isDirectory())
    .map((directoryEntry) => directoryEntry.name);
}

const ALTERNATE_REFS = [
  { hreflang: "en", href: BASE_URL },
  { hreflang: "zh-CN", href: BASE_URL },
  { hreflang: "x-default", href: BASE_URL },
];

function withAlternates(entry: MetadataRoute.Sitemap[number]): MetadataRoute.Sitemap[number] {
  return {
    ...entry,
    alternates: {
      languages: Object.fromEntries(
        ALTERNATE_REFS.map((ref) => [ref.hreflang, ref.href + new URL(entry.url).pathname])
      ),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const styles = getAllStylesMeta();
  const redirectedPromptSlugs = new Set([
    "landing-page",
    "dashboard-design",
    "tailwind-ui",
    "dark-mode",
  ]);
  // Use meaningful dates instead of current time to avoid misleading crawlers
  const CONTENT_UPDATED = new Date("2026-03-15");
  const TOOLS_UPDATED = new Date("2026-03-01");

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/styles`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/ui-prompts`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/landing-page-prompts`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/dashboard-prompts`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/tailwind-ui-prompts`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/dark-mode-ui-prompts`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/create-style`, lastModified: TOOLS_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/animations`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/templates`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/compare`, lastModified: TOOLS_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blend`, lastModified: TOOLS_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/analyze`, lastModified: TOOLS_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/docs`, lastModified: TOOLS_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/developers`, lastModified: TOOLS_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/developers/api`, lastModified: TOOLS_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/guide`, lastModified: TOOLS_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/components`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: TOOLS_UPDATED, changeFrequency: "monthly", priority: 0.4 },
  ];

  const stylePages: MetadataRoute.Sitemap = styles.map((style) => ({
    url: `${BASE_URL}/styles/${style.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const showcasePages: MetadataRoute.Sitemap = styles.map((style) => ({
    url: `${BASE_URL}/styles/${style.slug}/showcase`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const templatePages: MetadataRoute.Sitemap = getTemplateSlugs().map((slug) => ({
    url: `${BASE_URL}/templates/${slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const promptPages: MetadataRoute.Sitemap = getAllTopicSlugs()
    .filter((slug) => !redirectedPromptSlugs.has(slug))
    .map((slug) => ({
      url: `${BASE_URL}/prompts/${slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const animationPages: MetadataRoute.Sitemap = getAllAnimationsMeta().map((anim) => ({
    url: `${BASE_URL}/animations/${anim.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...stylePages,
    ...showcasePages,
    ...templatePages,
    ...promptPages,
    ...animationPages,
  ].map(withAlternates);
}
