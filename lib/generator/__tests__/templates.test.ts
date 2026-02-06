import { describe, it, expect } from "vitest";
import { landingTemplate } from "@/lib/generator/templates/landing";
import { portfolioTemplate } from "@/lib/generator/templates/portfolio";
import { blogTemplate } from "@/lib/generator/templates/blog";
import { dashboardTemplate } from "@/lib/generator/templates/dashboard";
import type { TemplateDefinition } from "@/lib/generator";

const VALID_FIELD_TYPES = ["text", "textarea", "select", "number", "color", "image"];

const allTemplates: [string, TemplateDefinition][] = [
  ["landing", landingTemplate],
  ["portfolio", portfolioTemplate],
  ["blog", blogTemplate],
  ["dashboard", dashboardTemplate],
];

describe("individual template definitions", () => {
  it.each(allTemplates)("%s template has correct type value", (expectedType, template) => {
    expect(template.type).toBe(expectedType);
  });

  it.each(allTemplates)("%s template has at least 3 sections", (_type, template) => {
    expect(template.sections.length).toBeGreaterThanOrEqual(3);
  });

  describe("field types are valid", () => {
    for (const [templateName, template] of allTemplates) {
      for (const section of template.sections) {
        it.each(section.fields.map((f) => [f.id, f] as const))(
          `${templateName}/${section.id} field "%s" has a valid type`,
          (_id, field) => {
            expect(VALID_FIELD_TYPES).toContain(field.type);
          }
        );
      }
    }
  });

  describe("field IDs are unique within sections", () => {
    for (const [templateName, template] of allTemplates) {
      for (const section of template.sections) {
        it(`${templateName}/${section.id} has no duplicate field IDs`, () => {
          const ids = section.fields.map((f) => f.id);
          const unique = new Set(ids);
          expect(unique.size).toBe(ids.length);
        });
      }
    }
  });

  describe("templates have default values where appropriate", () => {
    for (const [templateName, template] of allTemplates) {
      it(`${templateName} has defaultValue on most fields`, () => {
        const allFields = template.sections.flatMap((s) => s.fields);
        const withDefaults = allFields.filter(
          (f) => f.defaultValue !== undefined && f.defaultValue !== ""
        );
        // At least half the fields should have default values
        expect(withDefaults.length).toBeGreaterThan(allFields.length / 2);
      });
    }
  });
});
