import type { Metadata } from "next";
import { readdirSync } from "fs";
import { join } from "path";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeContent } from "@/components/home/home-content";
import { getAllStylesMeta, type StyleMeta } from "@/lib/styles/meta";
import { getAllAnimationsMeta } from "@/lib/animations/meta";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";
import { HOME_SOCIAL_IMAGE } from "@/lib/seo/site-metadata";
import { getPublishedThankYouEntries } from "@/lib/support/acknowledgments";

export const metadata: Metadata = {
  // Use `absolute` so the root "%s | StyleKit" template does not append a second
  // "StyleKit" (the brand is already in the title). Kept under ~60 chars so it
  // renders in full in the SERP with the highest-value keywords front-loaded.
  title: {
    absolute: `StyleKit — UI Design Prompts & ${CURATED_STYLE_COUNT} Visual Styles`,
  },
  description:
    `Browse ${CURATED_STYLE_COUNT} visual styles with design tokens, component recipes, and AI prompts. Export to Tailwind, shadcn, Figma, and AI coding tools.`,
  keywords: [
    "UI design prompts",
    "web design prompts",
    "AI-friendly design system",
    "website style guides",
    "Tailwind UI prompts",
  ],
  openGraph: {
    images: [
      {
        url: HOME_SOCIAL_IMAGE.path,
        width: HOME_SOCIAL_IMAGE.width,
        height: HOME_SOCIAL_IMAGE.height,
        alt: HOME_SOCIAL_IMAGE.alt,
        type: "image/png",
      },
    ],
  },
};

function getTemplateCount() {
  return readdirSync(join(process.cwd(), "app/templates"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .length;
}

/**
 * Fields a home-page style card actually renders.
 *
 * The full StyleMeta carries `description`, `descriptionEn` and `keywords`,
 * which together are over half of the array's serialized weight. Only the eight
 * featured cards show a description; the trending grid and the carousel render
 * name, cover, palette and tags alone. Sending the prose for all 148 styles put
 * roughly 47 KB of never-rendered text into every home-page response.
 */
const CARD_FIELDS = [
  "slug",
  "name",
  "nameEn",
  "cover",
  "colors",
  "styleType",
  "tags",
  "category",
  "compatibleWith",
] as const satisfies readonly (keyof StyleMeta)[];

/**
 * Trim the catalog to what the page renders.
 *
 * The first eight (deduplicated, matching HomeContent's own featured slice)
 * keep every field because those cards show a description. The rest are
 * needed only so the trending grid can look a slug up by name and palette,
 * so they travel without prose.
 */
function buildHomeStyles(all: StyleMeta[]): StyleMeta[] {
  const featured = all
    .filter((style, index, list) => {
      if (!style.slug) return false;
      return list.findIndex((candidate) => candidate.slug === style.slug) === index;
    })
    .slice(0, 8);
  const featuredSlugs = new Set(featured.map((style) => style.slug));

  const rest = all
    .filter((style) => !featuredSlugs.has(style.slug))
    .map((style) => {
      const lean: Partial<StyleMeta> = {};
      for (const field of CARD_FIELDS) {
        if (style[field] !== undefined) {
          (lean as Record<string, unknown>)[field] = style[field];
        }
      }
      return lean as StyleMeta;
    });

  // Featured first so HomeContent's own `.slice(0, 8)` picks the same eight.
  return [...featured, ...rest];
}

export default async function Home() {
  const allStyles = getAllStylesMeta();
  const styles = buildHomeStyles(allStyles);
  const thankYouEntries = await getPublishedThankYouEntries();
  const stats = {
    styles: allStyles.length,
    animations: getAllAnimationsMeta().length,
    templates: getTemplateCount(),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HomeContent styles={styles} stats={stats} thankYouEntries={thankYouEntries} />
      </main>
      <Footer />
    </div>
  );
}
