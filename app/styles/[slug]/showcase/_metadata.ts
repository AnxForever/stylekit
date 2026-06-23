import type { Metadata } from "next";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import type { Locale } from "@/lib/i18n/translations";

/**
 * Build SEO metadata for a style's showcase page in a locale-aware way.
 *
 * Both the root page (`/styles/[slug]/showcase`) and the locale page
 * (`/[locale]/styles/[slug]/showcase`) delegate here so the content
 * (title / description / keywords / OG / Twitter) tracks the active
 * locale, while the locale page separately calls `localizeMetadata`
 * to attach hreflang alternates and a canonical URL.
 *
 * Falls back to English content when the requested style does not
 * have explicit Chinese fields, so partially-translated styles still
 * render a coherent English page rather than undefined fragments.
 */
export async function buildShowcaseMetadata(
  slug: string,
  locale: Locale = "en"
): Promise<Metadata> {
  const resolved = await resolveStyleBySlug(slug);
  if (!resolved) {
    return { title: "Showcase Not Found" };
  }
  const { style } = resolved;

  if (locale === "zh") {
    const name = style.name;
    const description =
      style.description ||
      `${name} 设计风格的现场演示，包含交互式组件、配色方案和排版规范。`;
    const title = `${name} 现场演示`;
    return {
      title,
      description,
      keywords: [name, "现场演示", "设计风格", "UI 组件", "配色方案"],
      openGraph: {
        title: `${title} — StyleKit`,
        description,
        siteName: "StyleKit",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} — StyleKit`,
        description,
      },
    };
  }

  const name = style.nameEn || style.name;
  const description = style.descriptionEn
    ? `Live demonstration of ${style.nameEn} design style. ${style.descriptionEn}`
    : `Live demonstration of ${style.nameEn} design style with interactive components, color palettes, and typography.`;
  const title = `${style.nameEn} Showcase`;
  return {
    title,
    description,
    keywords: [
      ...(style.keywordsEn ?? []),
      style.nameEn,
      "showcase",
      "design style",
      "UI components",
      "live demo",
    ],
    openGraph: {
      title: `${title} — StyleKit`,
      description,
      siteName: "StyleKit",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — StyleKit`,
      description,
    },
  };
}