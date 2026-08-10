import { z } from "zod";

/**
 * The shared contract between Bailian/Qwen and StyleKit.
 *
 * The model chooses a StyleKit slug and describes the user's intent. It does
 * not author final tokens or component code; those remain authoritative in
 * StyleKit's catalog and generator.
 */
export const styleIntentProjectTypeSchema = z.enum([
  "landing",
  "dashboard",
  "portfolio",
  "blog",
]);

export const styleIntentStateSchema = z.enum([
  "loading",
  "empty",
  "error",
  "success",
  "disabled",
]);

export const styleIntentBriefSchema = z
  .object({
    audience: z.string().trim().min(1).max(500),
    primaryGoal: z.string().trim().min(1).max(1_000),
    requiredPages: z.array(z.string().trim().min(1).max(120)).max(12),
    requiredStates: z.array(styleIntentStateSchema).max(5),
    brandPersonality: z.array(z.string().trim().min(1).max(60)).max(6),
    antiReferences: z.array(z.string().trim().min(1).max(120)).max(12),
    notes: z.string().trim().max(1_200),
  })
  .strict();

export const styleIntentSchema = z
  .object({
    schemaVersion: z.literal("style-intent-v1"),
    styleSlug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    confidence: z.number().min(0).max(1),
    rationale: z.array(z.string().trim().min(1).max(240)).min(1).max(4),
    projectType: styleIntentProjectTypeSchema,
    brief: styleIntentBriefSchema,
    constraints: z.array(z.string().trim().min(1).max(240)).max(8),
  })
  .strict();

export const DEMO_GENERATION_STYLE_SLUGS = [
  "neo-brutalist",
  "glassmorphism",
  "neumorphism",
  "editorial",
] as const;

export const demoGenerationStyleIntentSchema = styleIntentSchema.extend({
  styleSlug: z.enum(DEMO_GENERATION_STYLE_SLUGS),
  projectType: z.literal("dashboard"),
});

export type StyleIntent = z.infer<typeof styleIntentSchema>;
export type DemoGenerationStyleIntent = z.infer<
  typeof demoGenerationStyleIntentSchema
>;

export function parseStyleIntent(value: unknown): StyleIntent {
  return styleIntentSchema.parse(value);
}

export function parseDemoGenerationStyleIntent(
  value: unknown,
): DemoGenerationStyleIntent {
  return demoGenerationStyleIntentSchema.parse(value);
}
