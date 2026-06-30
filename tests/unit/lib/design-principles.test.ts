import { describe, it, expect } from "vitest";
import {
  DESIGN_PRINCIPLES,
  principleByLetter,
  allChecklist,
  generateChecklistMarkdown,
} from "@/lib/design-principles";

describe("design principles (CRAP)", () => {
  it("defines exactly the four CRAP principles in order", () => {
    expect(DESIGN_PRINCIPLES).toHaveLength(4);
    expect(DESIGN_PRINCIPLES.map((p) => p.letter).join("")).toBe("CRAP");
    expect(DESIGN_PRINCIPLES.map((p) => p.id)).toEqual([
      "contrast",
      "repetition",
      "alignment",
      "proximity",
    ]);
  });

  it("gives every principle complete bilingual content", () => {
    for (const p of DESIGN_PRINCIPLES) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.nameZh.length).toBeGreaterThan(0);
      expect(p.definition.length).toBeGreaterThan(0);
      expect(p.definitionZh.length).toBeGreaterThan(0);
      expect(p.mnemonic.length).toBeGreaterThan(0);
      expect(p.mnemonicZh.length).toBeGreaterThan(0);
      expect(p.checklist.length).toBeGreaterThan(0);
      for (const item of p.checklist) {
        expect(item.en.length).toBeGreaterThan(0);
        expect(item.zh.length).toBeGreaterThan(0);
      }
      expect(p.snippet.code.length).toBeGreaterThan(0);
    }
  });

  it("looks up principles by letter, case-insensitively", () => {
    expect(principleByLetter("C")?.id).toBe("contrast");
    expect(principleByLetter("p")?.id).toBe("proximity");
    expect(principleByLetter("z")).toBeUndefined();
  });

  it("flattens all checklist items tagged with their origin", () => {
    const all = allChecklist();
    const total = DESIGN_PRINCIPLES.reduce((n, p) => n + p.checklist.length, 0);
    expect(all).toHaveLength(total);
    expect(all[0].principle).toBe("contrast");
    expect(all.every((e) => e.en.length > 0 && e.zh.length > 0)).toBe(true);
  });

  it("renders a markdown checklist with all four principles and checkboxes", () => {
    const md = generateChecklistMarkdown("en");
    expect(md).toContain("# CRAP Design Checklist");
    for (const p of DESIGN_PRINCIPLES) {
      expect(md).toContain(`## ${p.letter} — ${p.name}`);
    }
    expect(md).toContain("- [ ] ");

    const mdZh = generateChecklistMarkdown("zh");
    expect(mdZh).toContain("# CRAP 设计自查清单");
    expect(mdZh).toContain("## C — 对比");
  });
});
