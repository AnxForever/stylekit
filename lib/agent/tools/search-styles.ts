import { z } from "zod";
import { getSmartRecommendation } from "@/lib/knowledge";
import { getStyleBySlug } from "@/lib/styles";
import type { AgentTool } from "./types";

const parametersSchema = z.object({
  query: z
    .string()
    .min(1)
    .describe(
      "Free-text description of the desired visual style. Can be a feeling, industry, reference brand, or product type. Examples: 'clean and sharp like Stripe', 'playful for a kids app', 'luxury ecommerce dark mode'."
    ),
  mood: z
    .enum(["playful", "professional", "luxury", "minimal", "bold"])
    .optional()
    .describe(
      "Optional brand mood hint. Only set when the user explicitly expresses this feeling."
    ),
  limit: z
    .number()
    .int()
    .min(1)
    .max(6)
    .default(4)
    .describe("Max number of style suggestions to return (1-6)."),
});

export const searchStylesTool: AgentTool<typeof parametersSchema> = {
  name: "search_styles",
  description:
    "Search StyleKit's 130+ design styles by keyword, mood, or reference. Returns the top matching style and up to 5 alternatives, each with slug, name, and match score. USE WHEN the user describes a visual feeling, industry context, or reference without naming a specific style. Do NOT use when the user has already named an exact StyleKit style slug.",
  parameters: parametersSchema,
  execute: async ({ query, mood, limit }) => {
    const recommendation = getSmartRecommendation(query, {
      brandMood: mood,
    });

    const topMeta = getStyleBySlug(recommendation.style.item.slug);
    const top = {
      slug: recommendation.style.item.slug,
      name: topMeta?.name ?? recommendation.style.item.name,
      nameEn: topMeta?.nameEn ?? recommendation.style.item.name,
      score: recommendation.style.score,
      reasons: recommendation.style.reasons.slice(0, 3),
    };

    const alternatives = recommendation.style.alternatives
      .slice(0, Math.max(0, limit - 1))
      .map((alt) => {
        const meta = getStyleBySlug(alt.slug);
        return {
          slug: alt.slug,
          name: meta?.name ?? alt.slug,
          nameEn: meta?.nameEn ?? alt.slug,
        };
      });

    return {
      top,
      alternatives,
      confidence: recommendation.summary.confidence,
    };
  },
};
