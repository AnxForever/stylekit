import { z } from "zod";
import { getDesignRecommendation } from "@/lib/knowledge";
import type { StackId } from "@/lib/knowledge";
import type { AgentTool } from "./types";

const stackEnum = z.enum(["nextjs", "react", "vue", "svelte", "astro"]);

const parametersSchema = z.object({
  query: z
    .string()
    .min(1)
    .describe(
      "Product/page query used to infer which design guidelines apply. Examples: 'developer SaaS landing', 'kids education app'."
    ),
  stackId: stackEnum
    .optional()
    .describe("Optional stack filter for returning stack-specific guidelines (e.g., nextjs-specific patterns)."),
  maxGuidelines: z
    .number()
    .int()
    .min(1)
    .max(8)
    .default(4)
    .describe("Max UX guidelines to return."),
});

export const getDesignGuidelinesTool: AgentTool<typeof parametersSchema> = {
  name: "get_design_guidelines",
  description:
    "Get design guidelines (color palette, typography pairing, landing pattern, UX rules) tailored to a product/page type. USE WHEN the plan is close to done and you need concrete design directives to ground the final coding prompt. Do NOT use during early ideation — too specific.",
  parameters: parametersSchema,
  execute: ({ query, stackId, maxGuidelines }) => {
    const rec = getDesignRecommendation(query, {
      stackId: stackId as StackId | undefined,
      maxGuidelines,
    });

    return {
      productType: rec.productType,
      stylePriority: {
        primary: rec.style.primary,
        secondary: rec.style.secondary.slice(0, 3),
      },
      colors: rec.colors
        ? {
            productType: rec.colors.productType,
            primary: rec.colors.primary,
            secondary: rec.colors.secondary,
            cta: rec.colors.cta,
            background: rec.colors.background,
          }
        : null,
      typography: rec.typography
        ? {
            name: rec.typography.name,
            headingFont: rec.typography.headingFont,
            bodyFont: rec.typography.bodyFont,
            mood: rec.typography.mood,
          }
        : null,
      landingPattern: rec.landingPattern
        ? {
            name: rec.landingPattern.name,
            sectionOrder: rec.landingPattern.sectionOrder,
            primaryCtaPlacement: rec.landingPattern.primaryCtaPlacement,
          }
        : null,
      uxGuidelines: rec.uxGuidelines.slice(0, maxGuidelines).map((g) => ({
        category: g.category,
        issue: g.issue,
        do: g.do,
        dont: g.dont,
        severity: g.severity,
      })),
    };
  },
};
