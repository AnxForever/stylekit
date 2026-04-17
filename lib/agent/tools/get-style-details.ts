import { z } from "zod";
import { getStyleBySlug } from "@/lib/styles";
import type { AgentTool } from "./types";

const parametersSchema = z.object({
  slug: z
    .string()
    .min(1)
    .describe(
      "The exact style slug, e.g. 'neo-brutalist', 'glassmorphism', 'ghibli'. Must match a registered slug in lib/styles/index.ts."
    ),
  locale: z
    .enum(["zh", "en"])
    .default("en")
    .describe("Language for returned text fields (name, description, philosophy, do/don't lists)."),
});

export const getStyleDetailsTool: AgentTool<typeof parametersSchema> = {
  name: "get_style_details",
  description:
    "Fetch the full definition of a single StyleKit design style by its slug: philosophy, do/don't list, keywords, color palette. USE WHEN you already know the target style slug and need deeper detail to ground a recommendation or generate a prompt. Do NOT use to discover styles — use search_styles for that.",
  parameters: parametersSchema,
  execute: ({ slug, locale }) => {
    const style = getStyleBySlug(slug);
    if (!style) {
      throw new Error(
        `Style '${slug}' not found. Use search_styles first to discover a valid slug.`
      );
    }

    const pick = (zh: string, en?: string) => (locale === "zh" ? zh : en ?? zh);

    return {
      slug: style.slug,
      name: locale === "zh" ? style.name : style.nameEn,
      description: pick(style.description, style.descriptionEn),
      philosophy: pick(style.philosophy, style.philosophyEn),
      category: style.category,
      styleType: style.styleType,
      tags: style.tags,
      colors: {
        primary: style.colors.primary,
        secondary: style.colors.secondary,
        accent: style.colors.accent,
      },
      doList: locale === "zh" ? style.doList : style.doListEn ?? style.doList,
      dontList: locale === "zh" ? style.dontList : style.dontListEn ?? style.dontList,
      keywords: locale === "zh" ? style.keywords : style.keywordsEn ?? style.keywords,
    };
  },
};
