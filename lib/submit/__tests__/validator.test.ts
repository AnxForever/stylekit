import { describe, expect, it } from "vitest";
import {
  designMdSubmissionSchema,
  isDesignMdSubmissionPayload,
} from "@/lib/submit/validator";

const VALID_BODY = "x".repeat(220);

describe("designMdSubmissionSchema", () => {
  it("accepts a minimal valid design-md submission", () => {
    const result = designMdSubmissionSchema.safeParse({
      source: "design-md",
      slug: "test-style",
      name: "Test Style",
      design_md: VALID_BODY,
    });
    expect(result.success).toBe(true);
  });

  it("rejects design_md shorter than 200 chars", () => {
    const result = designMdSubmissionSchema.safeParse({
      source: "design-md",
      slug: "test-style",
      name: "Test",
      design_md: "too short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects slug with uppercase or spaces", () => {
    const result = designMdSubmissionSchema.safeParse({
      source: "design-md",
      slug: "Bad Slug",
      name: "Test",
      design_md: VALID_BODY,
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing source discriminator", () => {
    const result = designMdSubmissionSchema.safeParse({
      slug: "test",
      name: "Test",
      design_md: VALID_BODY,
    });
    expect(result.success).toBe(false);
  });

  it("defaults nameEn to empty string when omitted", () => {
    const parsed = designMdSubmissionSchema.parse({
      source: "design-md",
      slug: "test",
      name: "T",
      design_md: VALID_BODY,
    });
    expect(parsed.nameEn).toBe("");
  });

  it("rejects description longer than 300 chars", () => {
    const result = designMdSubmissionSchema.safeParse({
      source: "design-md",
      slug: "test",
      name: "Test",
      description: "x".repeat(301),
      design_md: VALID_BODY,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a full valid submission with cover svg", () => {
    const result = designMdSubmissionSchema.safeParse({
      source: "design-md",
      slug: "neo-brutalist",
      name: "Neo Brutalist",
      nameEn: "Neo Brutalist",
      category: "expressive",
      description: "Aggressive honesty with thick outlines.",
      design_md: VALID_BODY,
      coverSvg: "<svg xmlns='http://www.w3.org/2000/svg'/>",
    });
    expect(result.success).toBe(true);
  });
});

describe("isDesignMdSubmissionPayload", () => {
  it("returns true for bodies with source: design-md", () => {
    expect(isDesignMdSubmissionPayload({ source: "design-md", slug: "x" })).toBe(true);
  });

  it("returns false for wizard payloads", () => {
    expect(isDesignMdSubmissionPayload({ name: "Test", slug: "x" })).toBe(false);
  });

  it("returns false for non-object bodies", () => {
    expect(isDesignMdSubmissionPayload(null)).toBe(false);
    expect(isDesignMdSubmissionPayload("design-md")).toBe(false);
    expect(isDesignMdSubmissionPayload([])).toBe(false);
  });
});
