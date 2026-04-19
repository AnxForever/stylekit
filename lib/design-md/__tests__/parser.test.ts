import { describe, expect, it } from "vitest";
import { parseDesignMd } from "@/lib/design-md/parser";

const MINIMAL = `# Design System: Test Style

## 1. Overview

A minimalist test style.

## 2. Visual Theme & Atmosphere

Calm and airy.

## 3. Color Palette & Roles

- Primary: Test Blue (#0077B6)
- Secondary: Soft Gray (#F5F5F5)

## 4. Typography Rules

Inter 400-700.

## 5. Component Stylings

### Buttons

- Pill-shaped
- Primary uses Test Blue fill
`;

const WITH_FRONTMATTER = `---
name: Test Style
slug: test-style
category: minimal
tags: [clean, airy]
version: "1.0"
---

# Design System: Test Style

## 1. Overview

A test.
`;

describe("parseDesignMd frontmatter", () => {
  it("parses YAML frontmatter when present", () => {
    const doc = parseDesignMd(WITH_FRONTMATTER);
    expect(doc.frontmatter).not.toBeNull();
    expect(doc.frontmatter?.slug).toBe("test-style");
    expect(doc.frontmatter?.category).toBe("minimal");
    expect(doc.frontmatter?.tags).toEqual(["clean", "airy"]);
  });

  it("returns null frontmatter when absent", () => {
    const doc = parseDesignMd(MINIMAL);
    expect(doc.frontmatter).toBeNull();
  });

  it("returns null frontmatter when invalid (swallow error)", () => {
    const raw = `---\nslug: Bad Slug\n---\n# Title\n`;
    const doc = parseDesignMd(raw);
    expect(doc.frontmatter).toBeNull();
  });
});

describe("parseDesignMd document shape", () => {
  it("extracts document title from # heading", () => {
    const doc = parseDesignMd(MINIMAL);
    expect(doc.title).toBe("Design System: Test Style");
  });

  it("returns null title when no # heading present", () => {
    const doc = parseDesignMd("## 1. Overview\n\nA\n");
    expect(doc.title).toBeNull();
  });

  it("handles empty input gracefully", () => {
    const doc = parseDesignMd("");
    expect(doc.title).toBeNull();
    expect(doc.sections).toEqual([]);
    expect(doc.frontmatter).toBeNull();
  });

  it("preserves rawBody (without frontmatter)", () => {
    const doc = parseDesignMd(WITH_FRONTMATTER);
    expect(doc.rawBody).toContain("Design System: Test Style");
    expect(doc.rawBody).not.toContain("slug: test-style");
  });
});

describe("parseDesignMd section splitting", () => {
  it("splits sections by `## N. Title`", () => {
    const doc = parseDesignMd(MINIMAL);
    expect(doc.sections).toHaveLength(5);
    expect(doc.sections[0].number).toBe(1);
    expect(doc.sections[0].title).toBe("Overview");
    expect(doc.sections[4].title).toBe("Component Stylings");
  });

  it("handles sections without numeric prefix", () => {
    const doc = parseDesignMd("## Overview\n\nBody.\n");
    expect(doc.sections[0].number).toBeNull();
    expect(doc.sections[0].title).toBe("Overview");
  });

  it("keeps unknown extra sections rather than dropping them", () => {
    const raw = `## 1. Overview\n\nA\n\n## 99. Custom Section\n\nB\n`;
    const doc = parseDesignMd(raw);
    expect(doc.sections).toHaveLength(2);
    expect(doc.sections[1].title).toBe("Custom Section");
    expect(doc.sections[1].number).toBe(99);
  });
});

describe("parseDesignMd block extraction", () => {
  it("parses paragraph blocks", () => {
    const doc = parseDesignMd(MINIMAL);
    const overview = doc.sections[0];
    const paragraph = overview.blocks.find((b) => b.type === "paragraph");
    expect(paragraph).toBeDefined();
    if (paragraph?.type === "paragraph") {
      expect(paragraph.text).toContain("minimalist test style");
    }
  });

  it("parses bullet-list blocks", () => {
    const doc = parseDesignMd(MINIMAL);
    const colors = doc.sections[2];
    const list = colors.blocks.find((b) => b.type === "bullet-list");
    expect(list).toBeDefined();
    if (list?.type === "bullet-list") {
      expect(list.items).toHaveLength(2);
      expect(list.items[0]).toContain("Test Blue (#0077B6)");
    }
  });

  it("parses sub-heading blocks", () => {
    const doc = parseDesignMd(MINIMAL);
    const components = doc.sections[4];
    const sub = components.blocks.find((b) => b.type === "sub-heading");
    expect(sub).toBeDefined();
    if (sub?.type === "sub-heading") {
      expect(sub.level).toBe(3);
      expect(sub.text).toBe("Buttons");
    }
  });

  it("parses fenced code blocks with language", () => {
    const raw = "## 1. Test\n\n```tsx\nconst x = 1;\n```\n";
    const doc = parseDesignMd(raw);
    const code = doc.sections[0].blocks.find((b) => b.type === "code");
    expect(code).toBeDefined();
    if (code?.type === "code") {
      expect(code.language).toBe("tsx");
      expect(code.code).toBe("const x = 1;");
    }
  });

  it("parses code blocks with no language", () => {
    const raw = "## 1. Test\n\n```\nplain text\n```\n";
    const doc = parseDesignMd(raw);
    const code = doc.sections[0].blocks.find((b) => b.type === "code");
    if (code?.type === "code") {
      expect(code.language).toBe("");
      expect(code.code).toBe("plain text");
    }
  });

  it("parses table blocks", () => {
    const raw = "## 1. Test\n\n| A | B |\n|---|---|\n| 1 | 2 |\n| 3 | 4 |\n";
    const doc = parseDesignMd(raw);
    const table = doc.sections[0].blocks.find((b) => b.type === "table");
    expect(table).toBeDefined();
    if (table?.type === "table") {
      expect(table.headers).toEqual(["A", "B"]);
      expect(table.rows).toEqual([
        ["1", "2"],
        ["3", "4"],
      ]);
    }
  });

  it("separates paragraphs from bullet-lists correctly", () => {
    const raw = `## 1. Test\n\nA paragraph here.\n\n- Bullet one\n- Bullet two\n`;
    const doc = parseDesignMd(raw);
    const blocks = doc.sections[0].blocks;
    expect(blocks[0].type).toBe("paragraph");
    expect(blocks[1].type).toBe("bullet-list");
  });
});
