import { describe, it, expect } from "vitest";
import { getTemplates } from "@/lib/generator";
import type { TemplateDefinition } from "@/lib/generator";

describe("getTemplates", () => {
  const templates = getTemplates();

  it("returns exactly 4 templates", () => {
    expect(templates).toHaveLength(4);
  });

  it("includes all expected template types", () => {
    const types = templates.map((t) => t.type);
    expect(types).toContain("landing");
    expect(types).toContain("portfolio");
    expect(types).toContain("blog");
    expect(types).toContain("dashboard");
  });

  it("has no duplicate template types", () => {
    const types = templates.map((t) => t.type);
    const unique = new Set(types);
    expect(unique.size).toBe(types.length);
  });

  describe("each template has required fields", () => {
    it.each(templates.map((t) => [t.type, t] as const))(
      "%s has type and non-empty sections",
      (_type, template) => {
        expect(template.type).toBeTruthy();
        expect(Array.isArray(template.sections)).toBe(true);
        expect(template.sections.length).toBeGreaterThan(0);
      }
    );
  });

  describe("section structure", () => {
    for (const template of templates) {
      describe(`template "${template.type}"`, () => {
        it("has no duplicate section IDs", () => {
          const ids = template.sections.map((s) => s.id);
          const unique = new Set(ids);
          expect(unique.size).toBe(ids.length);
        });

        it.each(template.sections.map((s) => [s.id, s] as const))(
          'section "%s" has id, label (name), and non-empty fields',
          (_id, section) => {
            expect(section.id).toBeTruthy();
            expect(section.name).toBeTruthy();
            expect(Array.isArray(section.fields)).toBe(true);
            expect(section.fields.length).toBeGreaterThan(0);
          }
        );
      });
    }
  });

  describe("field structure", () => {
    for (const template of templates) {
      for (const section of template.sections) {
        it.each(section.fields.map((f) => [f.id, f] as const))(
          `${template.type}/${section.id} field "%s" has id, label, and type`,
          (_id, field) => {
            expect(field.id).toBeTruthy();
            expect(field.label).toBeTruthy();
            expect(field.type).toBeTruthy();
          }
        );
      }
    }
  });
});
