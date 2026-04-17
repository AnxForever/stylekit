import { describe, it, expect } from "vitest";
import { readAtom, hasCompleteAtoms, type StyleAtoms } from "../atoms";

const full: StyleAtoms = {
  philosophy: { zh: "哲学-zh", en: "philosophy-en" },
  layout: { zh: "布局-zh", en: "layout-en" },
  motion: { zh: "动效-zh", en: "motion-en" },
  color: { zh: "配色-zh", en: "color-en" },
  typography: { zh: "字体-zh", en: "typography-en" },
};

describe("readAtom", () => {
  it("returns zh for zh locale even when en is present", () => {
    expect(readAtom(full.philosophy, "zh")).toBe("哲学-zh");
  });

  it("returns en for en locale when en is present", () => {
    expect(readAtom(full.philosophy, "en")).toBe("philosophy-en");
  });

  it("falls back to zh when en is missing", () => {
    expect(readAtom({ zh: "only-zh" }, "en")).toBe("only-zh");
  });

  it("falls back to zh when en is empty/whitespace", () => {
    expect(readAtom({ zh: "only-zh", en: "   " }, "en")).toBe("only-zh");
  });
});

describe("hasCompleteAtoms", () => {
  it("returns false for undefined", () => {
    expect(hasCompleteAtoms(undefined)).toBe(false);
  });

  it("returns true when all 5 core fields are non-empty", () => {
    expect(hasCompleteAtoms(full)).toBe(true);
  });

  it("returns false when any core field is blank", () => {
    const missing: StyleAtoms = { ...full, motion: { zh: "   " } };
    expect(hasCompleteAtoms(missing)).toBe(false);
  });

  it("ignores forbiddens for completeness check", () => {
    const withoutForbiddens: StyleAtoms = { ...full };
    expect(hasCompleteAtoms(withoutForbiddens)).toBe(true);
  });
});
