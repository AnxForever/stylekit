import { z } from "zod";
import { templateCatalog, type TemplateCatalogType } from "@/lib/templates/catalog";
import { scoreKeyword } from "./_scoring";
import type { AgentTool } from "./types";

const templateTypeEnum = z.enum([
  "landing",
  "dashboard",
  "blog",
  "portfolio",
  "saas",
  "ecommerce",
  "admin",
  "auth",
  "docs",
  "social",
  "messaging",
  "media",
  "lifestyle",
  "education",
]);

const parametersSchema = z.object({
  query: z
    .string()
    .min(1)
    .describe("Free-text description to search template names/descriptions. Examples: 'product launch', 'admin dashboard with charts'."),
  type: templateTypeEnum
    .optional()
    .describe("Optional strict filter on template type. Set only when user clearly asks for a specific page type."),
  styleSlug: z
    .string()
    .optional()
    .describe("Optional filter: only return templates that already use this StyleKit style slug (e.g. 'neo-brutalist')."),
  limit: z.number().int().min(1).max(6).default(4),
});

export const searchTemplatesTool: AgentTool<typeof parametersSchema> = {
  name: "search_templates",
  description:
    "Search StyleKit's ready-made page templates by keyword, page type, or style. Returns top matches with id, name, type, styleSlug, and a short description. USE WHEN the user wants a complete page starting point (landing, dashboard, blog, etc.) rather than just a visual style.",
  parameters: parametersSchema,
  execute: ({ query, type, styleSlug, limit }) => {
    const filtered = templateCatalog.filter((t) => {
      if (type && t.type !== (type as TemplateCatalogType)) return false;
      if (styleSlug && t.styleSlug !== styleSlug) return false;
      return true;
    });

    const ranked = filtered
      .map((t) => {
        const text = `${t.id} ${t.name.en} ${t.name.zh} ${t.description.en} ${t.description.zh} ${t.type}`;
        return { template: t, score: scoreKeyword(text, query) };
      })
      .filter((entry) => entry.score > 0 || type || styleSlug)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return {
      count: ranked.length,
      templates: ranked.map(({ template, score }) => ({
        id: template.id,
        name: template.name,
        type: template.type,
        styleSlug: template.styleSlug,
        description: template.description,
        score,
      })),
    };
  },
};
