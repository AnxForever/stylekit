import { z } from "zod";
import { componentPatterns } from "@/lib/component-patterns";
import { scoreKeyword } from "./_scoring";
import type { AgentTool } from "./types";

const familyEnum = z.enum([
  "breadcrumb",
  "accordion",
  "tabs",
  "pagination",
  "sidebar-nav",
]);

const parametersSchema = z.object({
  query: z
    .string()
    .min(1)
    .describe("Free-text description of the UI element. Examples: 'category navigation', 'expandable FAQ sections'."),
  family: familyEnum
    .optional()
    .describe("Optional strict filter on UI component family. Prefer setting this when user names a known component type."),
  limit: z.number().int().min(1).max(8).default(5),
});

export const searchComponentsTool: AgentTool<typeof parametersSchema> = {
  name: "search_components",
  description:
    "Search StyleKit's UI component pattern library (breadcrumbs, accordions, tabs, pagination, sidebar nav). Returns matching component variants with id, family, name, summary, and source style. USE WHEN the user mentions specific UI elements or navigation patterns rather than overall page style.",
  parameters: parametersSchema,
  execute: ({ query, family, limit }) => {
    const filtered = family
      ? componentPatterns.filter((p) => p.family === family)
      : componentPatterns;

    const ranked = filtered
      .map((p) => {
        const text = `${p.id} ${p.family} ${p.name} ${p.nameZh} ${p.summary} ${p.summaryZh} ${p.tags.join(" ")} ${p.tagsZh.join(" ")}`;
        return { pattern: p, score: scoreKeyword(text, query, { fullMatchBonus: 8 }) };
      })
      .filter((e) => e.score > 0 || !!family)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return {
      count: ranked.length,
      components: ranked.map(({ pattern, score }) => ({
        id: pattern.id,
        family: pattern.family,
        name: pattern.name,
        nameZh: pattern.nameZh,
        summary: pattern.summary,
        summaryZh: pattern.summaryZh,
        sourceStyleSlug: pattern.sourceStyleSlug,
        score,
      })),
    };
  },
};
