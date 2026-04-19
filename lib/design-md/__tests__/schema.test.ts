import { describe, expect, it } from "vitest";
import {
  assessDesignMdQuality,
  designMdFrontmatterSchema,
  validateDesignMdFrontmatter,
  validateDesignMdDocument,
} from "@/lib/design-md";
import { parseDesignMd } from "@/lib/design-md/parser";

describe("designMdFrontmatterSchema", () => {
  it("accepts minimal valid frontmatter", () => {
    const result = validateDesignMdFrontmatter({
      name: "Test Style",
      slug: "test-style",
    });
    expect(result.success).toBe(true);
  });

  it("rejects non-kebab-case slug", () => {
    const result = validateDesignMdFrontmatter({
      name: "Test",
      slug: "Test Style",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid category enum", () => {
    const result = validateDesignMdFrontmatter({
      name: "Test",
      slug: "test",
      category: "invalid",
    });
    expect(result.success).toBe(false);
  });

  it("defaults tags to empty array when omitted", () => {
    const parsed = designMdFrontmatterSchema.parse({
      name: "Test",
      slug: "test",
    });
    expect(parsed.tags).toEqual([]);
  });

  it("accepts full valid frontmatter with snake_case keys", () => {
    const result = validateDesignMdFrontmatter({
      name: "Neo Brutalist",
      slug: "neo-brutalist",
      category: "expressive",
      style_type: "visual",
      inspired_by: "https://example.com",
      tags: ["high-contrast", "retro"],
      version: "1.0",
      author: "@anx",
      license: "CC-BY-4.0",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.style_type).toBe("visual");
      expect(result.data.inspired_by).toBe("https://example.com");
    }
  });

  it("accepts empty string inspired_by", () => {
    const result = validateDesignMdFrontmatter({
      name: "Test",
      slug: "test",
      inspired_by: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects malformed inspired_by URL", () => {
    const result = validateDesignMdFrontmatter({
      name: "Test",
      slug: "test",
      inspired_by: "not-a-url",
    });
    expect(result.success).toBe(false);
  });
});

describe("validateDesignMdDocument", () => {
  it("accepts a fully-parsed document shape", () => {
    const result = validateDesignMdDocument({
      frontmatter: null,
      title: "Test",
      sections: [],
      rawBody: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects unknown block types", () => {
    const result = validateDesignMdDocument({
      frontmatter: null,
      title: "Test",
      sections: [
        {
          number: 1,
          title: "Overview",
          rawBody: "",
          blocks: [{ type: "unknown-block", foo: "bar" }],
        },
      ],
      rawBody: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("assessDesignMdQuality", () => {
  it("flags all required sections missing on a minimal doc", () => {
    const doc = parseDesignMd("# Title\n\nJust a title.\n");
    const report = assessDesignMdQuality(doc);
    expect(report.missingRequired.length).toBe(5);
    expect(report.level).toBe("minimum");
    expect(report.hasFrontmatter).toBe(false);
  });

  it("flags partial completeness as minimum when required still missing", () => {
    const raw = [
      "# Title",
      "## 1. Overview",
      "A",
      "## 2. Visual Theme & Atmosphere",
      "A",
      "## 3. Color Palette & Roles",
      "A",
    ].join("\n\n");
    const doc = parseDesignMd(raw);
    const report = assessDesignMdQuality(doc);
    expect(report.missingRequired).toContain("Typography Rules");
    expect(report.level).toBe("minimum");
  });

  it("rates excellent when all 11 sections present", () => {
    const raw = [
      "# Title",
      "## 1. Overview\nA",
      "## 2. Visual Theme & Atmosphere\nA",
      "## 3. Color Palette & Roles\nA",
      "## 4. Typography Rules\nA",
      "## 5. Component Stylings\nA",
      "## 6. Layout Principles\nA",
      "## 7. Spacing Scale\nA",
      "## 8. Elevation & Depth\nA",
      "## 9. Do's & Don'ts\nA",
      "## 10. AI Rules\nA",
      "## 11. Responsive Breakpoints\nA",
    ].join("\n\n");
    const doc = parseDesignMd(raw);
    const report = assessDesignMdQuality(doc);
    expect(report.missingRequired).toEqual([]);
    expect(report.missingRecommended).toEqual([]);
    expect(report.level).toBe("excellent");
  });

  it("rates standard when required complete but recommended has gaps", () => {
    const raw = [
      "# Title",
      "## 1. Overview\nA",
      "## 2. Visual Theme & Atmosphere\nA",
      "## 3. Color Palette & Roles\nA",
      "## 4. Typography Rules\nA",
      "## 5. Component Stylings\nA",
    ].join("\n\n");
    const doc = parseDesignMd(raw);
    const report = assessDesignMdQuality(doc);
    expect(report.missingRequired).toEqual([]);
    expect(report.missingRecommended.length).toBe(6);
    expect(report.level).toBe("standard");
  });
});
