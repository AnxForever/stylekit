import { describe, it, expect } from "vitest";
import {
  generateIdeConfig,
  generateCursorRules,
  generateClaudeRules,
  generateWindsurfRules,
  generateGenericRules,
  getIdeConfigFilename,
  getIdeConfigMimeType,
  type IdeConfigFormat,
} from "@/lib/export/ide-configs";

const VALID_SLUG = "neo-brutalist";
const INVALID_SLUG = "nonexistent-style-zzzzz";

// ---------------------------------------------------------------------------
// generateIdeConfig (unified entry point)
// ---------------------------------------------------------------------------

describe("generateIdeConfig", () => {
  const formats: IdeConfigFormat[] = [
    "cursorrules",
    "claude-rules",
    "windsurf-rules",
    "generic",
  ];

  for (const format of formats) {
    it(`generates non-null output for valid slug with format: ${format}`, () => {
      const result = generateIdeConfig(VALID_SLUG, format);
      expect(result).not.toBeNull();
      expect(typeof result).toBe("string");
      expect(result!.length).toBeGreaterThan(0);
    });
  }

  for (const format of formats) {
    it(`returns null for invalid slug with format: ${format}`, () => {
      const result = generateIdeConfig(INVALID_SLUG, format);
      expect(result).toBeNull();
    });
  }
});

// ---------------------------------------------------------------------------
// Individual format generators
// ---------------------------------------------------------------------------

describe("generateCursorRules", () => {
  it("includes style name and slug in output", () => {
    const result = generateCursorRules(VALID_SLUG)!;
    expect(result).toContain("neo-brutalist");
    expect(result).toContain("StyleKit");
  });

  it("includes Do's and Don'ts sections", () => {
    const result = generateCursorRules(VALID_SLUG)!;
    expect(result).toContain("Do's");
    expect(result).toContain("Don'ts");
  });

  it("includes AI Rules section", () => {
    const result = generateCursorRules(VALID_SLUG)!;
    expect(result).toContain("AI Rules");
  });

  it("includes Color Palette section", () => {
    const result = generateCursorRules(VALID_SLUG)!;
    expect(result).toContain("Color Palette");
  });

  it("returns null for invalid slug", () => {
    expect(generateCursorRules(INVALID_SLUG)).toBeNull();
  });
});

describe("generateClaudeRules", () => {
  it("includes philosophy section", () => {
    const result = generateClaudeRules(VALID_SLUG)!;
    expect(result).toContain("Philosophy");
  });

  it("includes Rules section with Do and Don't", () => {
    const result = generateClaudeRules(VALID_SLUG)!;
    expect(result).toContain("## Rules");
    expect(result).toContain("### Do");
    expect(result).toContain("### Don't");
  });

  it("returns null for invalid slug", () => {
    expect(generateClaudeRules(INVALID_SLUG)).toBeNull();
  });
});

describe("generateWindsurfRules", () => {
  it("includes Windsurf header", () => {
    const result = generateWindsurfRules(VALID_SLUG)!;
    expect(result).toContain("Windsurf Rules");
  });

  it("includes Core Rules section", () => {
    const result = generateWindsurfRules(VALID_SLUG)!;
    expect(result).toContain("Core Rules");
  });

  it("returns null for invalid slug", () => {
    expect(generateWindsurfRules(INVALID_SLUG)).toBeNull();
  });
});

describe("generateGenericRules", () => {
  it("includes Design Style header", () => {
    const result = generateGenericRules(VALID_SLUG)!;
    expect(result).toContain("Design Style");
  });

  it("includes AI Generation Rules", () => {
    const result = generateGenericRules(VALID_SLUG)!;
    expect(result).toContain("AI Generation Rules");
  });

  it("returns null for invalid slug", () => {
    expect(generateGenericRules(INVALID_SLUG)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Multiple valid slugs
// ---------------------------------------------------------------------------

describe("generateIdeConfig with different styles", () => {
  const slugs = ["neo-brutalist", "glassmorphism", "minimalist-flat"];

  for (const slug of slugs) {
    it(`works for style: ${slug}`, () => {
      const result = generateIdeConfig(slug, "generic");
      expect(result).not.toBeNull();
      expect(result!.length).toBeGreaterThan(100);
    });
  }
});

// ---------------------------------------------------------------------------
// getIdeConfigFilename
// ---------------------------------------------------------------------------

describe("getIdeConfigFilename", () => {
  it("returns .cursorrules for cursorrules format", () => {
    expect(getIdeConfigFilename(VALID_SLUG, "cursorrules")).toBe(
      ".cursorrules"
    );
  });

  it("returns slug.md for claude-rules format", () => {
    expect(getIdeConfigFilename(VALID_SLUG, "claude-rules")).toBe(
      `${VALID_SLUG}.md`
    );
  });

  it("returns .windsurf-rules for windsurf-rules format", () => {
    expect(getIdeConfigFilename(VALID_SLUG, "windsurf-rules")).toBe(
      ".windsurf-rules"
    );
  });

  it("returns slug-rules.md for generic format", () => {
    expect(getIdeConfigFilename(VALID_SLUG, "generic")).toBe(
      `${VALID_SLUG}-rules.md`
    );
  });
});

// ---------------------------------------------------------------------------
// getIdeConfigMimeType
// ---------------------------------------------------------------------------

describe("getIdeConfigMimeType", () => {
  it("returns text/plain for cursorrules", () => {
    expect(getIdeConfigMimeType("cursorrules")).toBe("text/plain");
  });

  it("returns text/markdown for claude-rules", () => {
    expect(getIdeConfigMimeType("claude-rules")).toBe("text/markdown");
  });

  it("returns text/markdown for windsurf-rules", () => {
    expect(getIdeConfigMimeType("windsurf-rules")).toBe("text/markdown");
  });

  it("returns text/markdown for generic", () => {
    expect(getIdeConfigMimeType("generic")).toBe("text/markdown");
  });
});
