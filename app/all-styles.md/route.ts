import { styles } from "@/lib/styles";
import { getSiteBaseUrl } from "@/lib/site-url";

export const revalidate = 3600;

/**
 * The catalog as one Markdown table, for readers that prefer text over JSON:
 * an agent loading the whole library into context, a writer compiling a
 * roundup, or a human diffing two versions. Every row carries the style's
 * English and Chinese name, its category, one-line definition, and canonical
 * page, so a citation can point at the exact style rather than the homepage.
 */
export async function GET() {
  const baseUrl = getSiteBaseUrl();
  const rows = styles
    .map((style) => {
      const name = style.nameEn || style.name;
      const summary = (style.descriptionEn || style.description).replace(/\|/g, "\\|");
      return `| ${style.slug} | ${name} | ${style.name} | ${style.category} | ${summary} | ${baseUrl}/en/styles/${style.slug} |`;
    })
    .join("\n");

  const content = `# StyleKit style catalog

StyleKit (${baseUrl}) is an open-source design style library for AI-generated web interfaces: ${styles.length} curated styles, each with copy-ready AI prompts, design tokens, component recipes, and Tailwind or shadcn export.

This file lists every style in one table. For the full documentation use ${baseUrl}/llms-full.txt. For structured data use ${baseUrl}/api/styles/all.json. For one style at a time use ${baseUrl}/api/styles/{slug}/md. License: MIT.

| Slug | Style | 中文名 | Category | Definition | Page |
| --- | --- | --- | --- | --- | --- |
${rows}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
