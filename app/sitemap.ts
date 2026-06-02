import { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join } from "path";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { getAllAnimationsMeta } from "@/lib/animations/meta";
import { getAllTopicSlugs } from "@/lib/prompts";
import { getAllPosts } from "@/lib/blog";
import { styleGuides } from "@/lib/seo/style-guides";
import {
  getAlternateLocalePath,
  getBaseUrl,
  getLocaleHtmlLang,
  LOCALES,
} from "@/lib/i18n/routing";

const BASE_URL = getBaseUrl();

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
  // Use meaningful dates instead of current time to avoid misleading crawlers
  const CONTENT_UPDATED = new Date("2026-03-15");
  const TOOLS_UPDATED = new Date("2026-03-01");

  const createLocalizedEntries = (
    pathname: string,
    lastModified: Date,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number
  ): MetadataRoute.Sitemap =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}${getAlternateLocalePath(pathname, locale)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((entry) => [
            getLocaleHtmlLang(entry),
            `${BASE_URL}${getAlternateLocalePath(pathname, entry)}`,
          ])
        ),
      },
    }));

  const staticPages: MetadataRoute.Sitemap = [
    ...createLocalizedEntries("/", CONTENT_UPDATED, "weekly", 1),
    ...createLocalizedEntries("/styles", CONTENT_UPDATED, "weekly", 0.9),
    ...createLocalizedEntries("/guides", CONTENT_UPDATED, "monthly", 0.8),
    ...createLocalizedEntries("/recipes", CONTENT_UPDATED, "weekly", 0.8),
    ...createLocalizedEntries("/ui-prompts", CONTENT_UPDATED, "weekly", 0.9),
    ...createLocalizedEntries("/landing-page-prompts", CONTENT_UPDATED, "weekly", 0.8),
    ...createLocalizedEntries("/dashboard-prompts", CONTENT_UPDATED, "weekly", 0.8),
    ...createLocalizedEntries("/tailwind-ui-prompts", CONTENT_UPDATED, "weekly", 0.8),
    ...createLocalizedEntries("/dark-mode-ui-prompts", CONTENT_UPDATED, "weekly", 0.8),
    ...createLocalizedEntries("/create-style", TOOLS_UPDATED, "weekly", 0.8),
    ...createLocalizedEntries("/animations", CONTENT_UPDATED, "weekly", 0.8),
    ...createLocalizedEntries("/templates", CONTENT_UPDATED, "weekly", 0.7),
    ...createLocalizedEntries("/compare", TOOLS_UPDATED, "monthly", 0.6),
    ...createLocalizedEntries("/blend", TOOLS_UPDATED, "monthly", 0.6),
    ...createLocalizedEntries("/analyze", TOOLS_UPDATED, "monthly", 0.6),
    ...createLocalizedEntries("/docs", TOOLS_UPDATED, "monthly", 0.6),
    ...createLocalizedEntries("/guide", TOOLS_UPDATED, "monthly", 0.6),
    ...createLocalizedEntries("/components", CONTENT_UPDATED, "weekly", 0.6),
    ...createLocalizedEntries("/about", TOOLS_UPDATED, "monthly", 0.4),
    ...createLocalizedEntries("/contact", TOOLS_UPDATED, "monthly", 0.4),
    ...createLocalizedEntries("/privacy", TOOLS_UPDATED, "yearly", 0.2),
    ...createLocalizedEntries("/terms", TOOLS_UPDATED, "yearly", 0.2),
    ...createLocalizedEntries("/blog", CONTENT_UPDATED, "weekly", 0.7),
    ...createLocalizedEntries("/changelog", CONTENT_UPDATED, "monthly", 0.5),
  ];

  const stylePages: MetadataRoute.Sitemap = styles.flatMap((style) =>
    createLocalizedEntries(`/styles/${style.slug}`, CONTENT_UPDATED, "weekly", 0.8)
  );

  const showcasePages: MetadataRoute.Sitemap = styles.flatMap((style) =>
    createLocalizedEntries(`/styles/${style.slug}/showcase`, CONTENT_UPDATED, "monthly", 0.6)
  );

  const templatePages: MetadataRoute.Sitemap = getTemplateSlugs().flatMap((slug) =>
    createLocalizedEntries(`/templates/${slug}`, CONTENT_UPDATED, "monthly", 0.6)
  );

  const promptPages: MetadataRoute.Sitemap = getAllTopicSlugs()
    .filter((slug) => !redirectedPromptSlugs.has(slug))
    .flatMap((slug) =>
      createLocalizedEntries(`/prompts/${slug}`, CONTENT_UPDATED, "weekly", 0.8)
    );

  const animationPages: MetadataRoute.Sitemap = getAllAnimationsMeta().flatMap((anim) =>
    createLocalizedEntries(`/animations/${anim.slug}`, CONTENT_UPDATED, "weekly", 0.7)
  );

  const blogPosts = getAllPosts();
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.flatMap((post) =>
    createLocalizedEntries(
      `/blog/${post.slug}`,
      post.date ? new Date(post.date) : CONTENT_UPDATED,
      "monthly",
      0.6
    )
  );

  const guidePages: MetadataRoute.Sitemap = Object.values(styleGuides).flatMap((guide) =>
    createLocalizedEntries(`/guides/${guide.slug}`, CONTENT_UPDATED, "monthly", 0.7)
  );

  return [
    ...staticPages,
    ...stylePages,
    ...showcasePages,
    ...templatePages,
    ...promptPages,
    ...animationPages,
    ...blogPostPages,
    ...guidePages,
  ];
}
