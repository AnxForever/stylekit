import { MetadataRoute } from "next";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { listPromotedCommunityStyles } from "@/lib/styles/community-runtime";
import { getAllAnimationsMeta } from "@/lib/animations/meta";
import { getAllTopicSlugs } from "@/lib/prompts";
import { getAllPosts } from "@/lib/blog";
import { styleGuides } from "@/lib/seo/style-guides";
import { getAllCollections } from "@/lib/styles/collections";
import { getAllRecipes } from "@/lib/styles/recipes";
import { templateCatalog } from "@/lib/templates/catalog";
import { getAllDetailSwatches, hexToSlug } from "@/lib/styles/color-detail";
import {
  getAlternateLocalePath,
  getBaseUrl,
  getIndexableLocalesForPath,
  getLocaleHtmlLang,
  DEFAULT_LOCALE,
  LOCALES,
} from "@/lib/i18n/routing";

const BASE_URL = getBaseUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const styles = getAllStylesMeta();
  const redirectedPromptSlugs = new Set([
    "landing-page",
    "dashboard-design",
    "tailwind-ui",
    "dark-mode",
  ]);
  const requireSitemapLocales = (
    pathname: string,
    expected: "all" | "en"
  ): readonly (typeof LOCALES[number])[] => {
    const locales = getIndexableLocalesForPath(pathname);
    const valid = expected === "all"
      ? locales.length === LOCALES.length
      : locales.length === 1 && locales[0] === DEFAULT_LOCALE;

    if (!valid) {
      throw new Error(
        `[sitemap] ${pathname} is not registered for the expected ${expected} locale set`
      );
    }

    return locales;
  };

  const createLocalizedEntries = (
    pathname: string,
    lastModified: Date | undefined,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number
  ): MetadataRoute.Sitemap =>
    requireSitemapLocales(pathname, "all").map((locale) => ({
      url: `${BASE_URL}${getAlternateLocalePath(pathname, locale)}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            LOCALES.map((entry) => [
              getLocaleHtmlLang(entry),
              `${BASE_URL}${getAlternateLocalePath(pathname, entry)}`,
            ])
          ),
          "x-default": `${BASE_URL}${getAlternateLocalePath(pathname, DEFAULT_LOCALE)}`,
        },
      },
    }));

  const createEnglishEntry = (
    pathname: string,
    lastModified: Date | undefined,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number
  ): MetadataRoute.Sitemap => {
    // English-only pages remain reachable through the locale alias but do not
    // advertise a translated alternate.
    requireSitemapLocales(pathname, "en");
    return [{
      url: `${BASE_URL}${getAlternateLocalePath(pathname, "en")}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency,
      priority,
    }];
  };

  const staticPages: MetadataRoute.Sitemap = [
    ...createLocalizedEntries("/", undefined, "weekly", 1),
    ...createLocalizedEntries("/styles", undefined, "weekly", 0.9),
    ...createLocalizedEntries("/colors", undefined, "weekly", 0.7),
    ...createLocalizedEntries("/collections", undefined, "weekly", 0.7),
    ...createEnglishEntry("/guides", undefined, "monthly", 0.8),
    ...createLocalizedEntries("/recipes", undefined, "weekly", 0.8),
    ...createLocalizedEntries("/ui-prompts", undefined, "weekly", 0.9),
    ...createLocalizedEntries("/ai-ui-design", undefined, "weekly", 0.9),
    ...createLocalizedEntries("/ai-web-design", undefined, "weekly", 0.9),
    ...createLocalizedEntries("/ai-frontend-design", undefined, "weekly", 0.9),
    ...createLocalizedEntries("/ai-generated-website-fix", undefined, "monthly", 0.8),
    ...createLocalizedEntries("/ai-web-design-tools", undefined, "monthly", 0.8),
    ...createLocalizedEntries("/ai-ui-generator", undefined, "monthly", 0.8),
    ...createLocalizedEntries("/ai-frontend-workflow", undefined, "monthly", 0.8),
    ...createLocalizedEntries("/avoid-ai-slop", undefined, "monthly", 0.8),
    ...createLocalizedEntries("/claude-code-ui-design", undefined, "monthly", 0.8),
    ...createLocalizedEntries("/codex-ui-design", undefined, "monthly", 0.8),
    ...createLocalizedEntries("/landing-page-prompts", undefined, "weekly", 0.8),
    ...createLocalizedEntries("/dashboard-prompts", undefined, "weekly", 0.8),
    ...createLocalizedEntries("/tailwind-ui-prompts", undefined, "weekly", 0.8),
    ...createLocalizedEntries("/dark-mode-ui-prompts", undefined, "weekly", 0.8),
    ...createLocalizedEntries("/animations", undefined, "weekly", 0.8),
    ...createLocalizedEntries("/animations/vocabulary", undefined, "monthly", 0.6),
    ...createLocalizedEntries("/templates", undefined, "weekly", 0.7),
    ...createLocalizedEntries("/resources", undefined, "weekly", 0.7),
    ...createLocalizedEntries("/component-patterns", undefined, "monthly", 0.7),
    ...createLocalizedEntries("/learn", undefined, "monthly", 0.6),
    ...createLocalizedEntries("/liquid-glass", undefined, "weekly", 0.7),
    ...createLocalizedEntries("/developers", undefined, "monthly", 0.6),
    ...createLocalizedEntries("/mouse-interactions", undefined, "monthly", 0.6),
    ...createLocalizedEntries("/guide", undefined, "monthly", 0.6),
    ...createLocalizedEntries("/components", undefined, "weekly", 0.6),
    ...createLocalizedEntries("/about", undefined, "monthly", 0.4),
    ...createLocalizedEntries("/contact", undefined, "monthly", 0.4),
    ...createEnglishEntry("/privacy", undefined, "yearly", 0.2),
    ...createEnglishEntry("/terms", undefined, "yearly", 0.2),
    ...createEnglishEntry("/blog", undefined, "weekly", 0.7),
    ...createLocalizedEntries("/changelog", undefined, "monthly", 0.5),
  ];

  const stylePages: MetadataRoute.Sitemap = styles.flatMap((style) =>
    createLocalizedEntries(
      `/styles/${style.slug}`,
      undefined,
      "weekly",
      0.8
    )
  );

  // Promoted community styles earn a place in the index. Everything else under
  // /community stays out of it, which is what makes promotion mean something
  // beyond a label in the review console.
  // Written directly rather than through createLocalizedEntries: that helper
  // asserts the path is registered for a locale set, and /community is
  // deliberately registered as noindex so the *unpromoted* pages stay out of
  // search. Promotion is decided per style, not per route, so the entries are
  // emitted one at a time for the styles that earned it.
  const promotedCommunity = await listPromotedCommunityStyles();
  const communityPages: MetadataRoute.Sitemap = promotedCommunity.map((style) => ({
    // Locale-prefixed like every other entry: the sitemap is asserted to hold
    // only /en and /zh URLs, and a bare path would resolve through a redirect.
    // English only, matching how the community catalog is written.
    url: `${BASE_URL}/${DEFAULT_LOCALE}/community/${style.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const promptPages: MetadataRoute.Sitemap = getAllTopicSlugs()
    .filter((slug) => !redirectedPromptSlugs.has(slug))
    .flatMap((slug) =>
      createLocalizedEntries(`/prompts/${slug}`, undefined, "weekly", 0.8)
    );

  const animationPages: MetadataRoute.Sitemap = getAllAnimationsMeta().flatMap((anim) =>
    createLocalizedEntries(`/animations/${anim.slug}`, undefined, "weekly", 0.7)
  );

  const templatePages: MetadataRoute.Sitemap = templateCatalog
    .filter(
      (template) =>
        !template.external && template.href !== "/templates/editorial-profile-archive"
    )
    .flatMap((template) =>
      createLocalizedEntries(template.href, undefined, "monthly", 0.6)
    );

  const blogPosts = getAllPosts();
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.flatMap((post) =>
    createEnglishEntry(
      `/blog/${post.slug}`,
      post.modified
        ? new Date(post.modified)
        : post.date
          ? new Date(post.date)
          : undefined,
      "monthly",
      0.6
    )
  );

  const guidePages: MetadataRoute.Sitemap = Object.values(styleGuides).flatMap((guide) =>
    createEnglishEntry(`/guides/${guide.slug}`, undefined, "monthly", 0.7)
  );

  const collectionPages: MetadataRoute.Sitemap = getAllCollections().flatMap((collection) =>
    createLocalizedEntries(`/collections/${collection.slug}`, undefined, "weekly", 0.7)
  );

  const recipePages: MetadataRoute.Sitemap = getAllRecipes().flatMap((recipe) =>
    createLocalizedEntries(`/recipes/${recipe.id}`, undefined, "monthly", 0.7)
  );

  const colorDetailPages: MetadataRoute.Sitemap = getAllDetailSwatches().flatMap(
    (hex) => createEnglishEntry(`/colors/${hexToSlug(hex)}`, undefined, "monthly", 0.4)
  );

  return [
    ...communityPages,
    ...staticPages,
    ...stylePages,
    ...promptPages,
    ...animationPages,
    ...templatePages,
    ...blogPostPages,
    ...guidePages,
    ...collectionPages,
    ...recipePages,
    ...colorDetailPages,
  ];
}
