import { z } from "zod";

const countSchema = z.number().int().nonnegative().max(1_000_000_000_000);

export const promptCopyStyleAnalyticsSchema = z.object({
  slug: z.string().trim().min(1).max(96).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  copies: countSchema,
  sessions: countSchema,
  hard: countSchema,
  soft: countSchema,
  designSpec: countSchema,
  creativeBrief: countSchema,
  examples: countSchema,
  recipes: countSchema,
  projectBrief: countSchema,
});

export const promptCopyAnalyticsSchema = z.object({
  totalCopies: countSchema,
  styles: z.array(promptCopyStyleAnalyticsSchema),
  generatedAt: z.string().datetime({ offset: true }),
});

export type PromptCopyStyleAnalytics = z.infer<typeof promptCopyStyleAnalyticsSchema>;
export type PromptCopyAnalytics = z.infer<typeof promptCopyAnalyticsSchema>;
