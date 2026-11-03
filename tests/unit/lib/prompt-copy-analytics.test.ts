import { describe, expect, it } from "vitest";
import { promptCopyAnalyticsSchema } from "@/lib/admin/prompt-copy-analytics";

const validPayload = {
  totalCopies: 14,
  styles: [
    {
      slug: "neo-brutalist",
      copies: 14,
      sessions: 8,
      hard: 4,
      soft: 1,
      designSpec: 2,
      creativeBrief: 3,
      examples: 2,
      recipes: 0,
      projectBrief: 2,
    },
  ],
  generatedAt: "2026-10-29T08:00:00.000Z",
};

describe("prompt copy analytics contract", () => {
  it("accepts prompt copy totals and per-style prompt types", () => {
    expect(promptCopyAnalyticsSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects malformed slugs, negative values and invalid timestamps", () => {
    expect(
      promptCopyAnalyticsSchema.safeParse({
        ...validPayload,
        styles: [{ ...validPayload.styles[0], slug: "Neo Brutalist" }],
      }).success,
    ).toBe(false);
    expect(
      promptCopyAnalyticsSchema.safeParse({
        ...validPayload,
        styles: [{ ...validPayload.styles[0], copies: -1 }],
      }).success,
    ).toBe(false);
    expect(
      promptCopyAnalyticsSchema.safeParse({ ...validPayload, generatedAt: "not-a-date" }).success,
    ).toBe(false);
  });

  it("rejects partial rows instead of displaying missing categories as zero", () => {
    const partialStyle: Record<string, unknown> = { ...validPayload.styles[0] };
    delete partialStyle.projectBrief;
    expect(
      promptCopyAnalyticsSchema.safeParse({
        ...validPayload,
        styles: [partialStyle],
      }).success,
    ).toBe(false);
  });
});
