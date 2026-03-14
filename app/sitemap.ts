import { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join } from "path";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { getAllAnimationsMeta } from "@/lib/animations/meta";
import { getAllTopicSlugs } from "@/lib/prompts";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";

function getTemplateSlugs(): string[] {
  const templatesDir = join(process.cwd(), "app/templates");
  return readdirSync(templatesDir, { withFileTypes: true })
    .filter((directoryEntry) => directoryEntry.isDirectory())
    .map((directoryEntry) => directoryEntry.name);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const styles = getAllStylesMeta();
  const redirectedPromptSlugs = new Set([
    "landing-page",
    "dashboard-design",
    "tailwind-ui",
    "dark-mode",
  ]);
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/styles`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/ui-prompts`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/landing-page-prompts`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/dashboard-prompts`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/tailwind-ui-prompts`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/dark-mode-ui-prompts`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/generate`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/create-style`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/animations`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/templates`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/community`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blend`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/analyze`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/assets`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/docs`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/developers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/developers/api`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/components`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const stylePages: MetadataRoute.Sitemap = styles.map((style) => ({
    url: `${BASE_URL}/styles/${style.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const showcasePages: MetadataRoute.Sitemap = styles.map((style) => ({
    url: `${BASE_URL}/styles/${style.slug}/showcase`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const templatePages: MetadataRoute.Sitemap = getTemplateSlugs().map((slug) => ({
    url: `${BASE_URL}/templates/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const promptPages: MetadataRoute.Sitemap = getAllTopicSlugs()
    .filter((slug) => !redirectedPromptSlugs.has(slug))
    .map((slug) => ({
      url: `${BASE_URL}/prompts/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const animationPages: MetadataRoute.Sitemap = getAllAnimationsMeta().map((anim) => ({
    url: `${BASE_URL}/animations/${anim.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...stylePages, ...showcasePages, ...templatePages, ...promptPages, ...animationPages];
}
