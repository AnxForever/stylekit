/**
 * The contract between the planner and the bot: a real style slug plus the
 * project context the prompt builders consume.
 *
 * This mirrors the web app's style-intent contract but is defined locally so
 * the package stays standalone. The slug regex alone is not enough — a
 * well-formed invention would fail later against tokens — so callers must
 * confirm the slug exists in the catalog before using the intent.
 */

import { z } from "zod";

export const PROJECT_TYPES = [
  "landing",
  "dashboard",
  "portfolio",
  "blog",
] as const;

export const STATES = [
  "loading",
  "empty",
  "error",
  "success",
  "disabled",
] as const;

export const styleIntentSchema = z
  .object({
    schemaVersion: z.literal("style-intent-v1"),
    styleSlug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    confidence: z.number().min(0).max(1),
    rationale: z.array(z.string().trim().min(1).max(240)).min(1).max(4),
    projectType: z.enum(PROJECT_TYPES),
    brief: z
      .object({
        audience: z.string().trim().min(1).max(500),
        primaryGoal: z.string().trim().min(1).max(1_000),
        requiredPages: z.array(z.string().trim().min(1).max(120)).max(12),
        requiredStates: z.array(z.enum(STATES)).max(5),
        brandPersonality: z.array(z.string().trim().min(1).max(60)).max(6),
        antiReferences: z.array(z.string().trim().min(1).max(120)).max(12),
        notes: z.string().trim().max(1_200),
      })
      .strict(),
    constraints: z.array(z.string().trim().min(1).max(240)).max(8),
  })
  .strict();

export type StyleIntent = z.infer<typeof styleIntentSchema>;

export function parseStyleIntent(value: unknown): StyleIntent {
  return styleIntentSchema.parse(value);
}
