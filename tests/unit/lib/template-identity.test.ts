import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { templateCatalog } from "@/lib/templates/catalog";
import {
  isExternalTemplateId,
  isShowcaseTemplateSlug,
} from "@/lib/templates/identity";

const templateRouteSlugs = readdirSync(path.join(process.cwd(), "app", "templates"), {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("["))
  .map((entry) => entry.name);

const partnerProjectIds = templateCatalog
  .filter((entry) => entry.external)
  .map((entry) => entry.id);

describe("template identity", () => {
  it("recognizes every in-site template route as a showcase", () => {
    expect(templateRouteSlugs.length).toBeGreaterThan(0);
    for (const slug of templateRouteSlugs) {
      expect(isShowcaseTemplateSlug(slug), slug).toBe(true);
    }
  });

  it("recognizes partner projects only as external templates", () => {
    expect(partnerProjectIds.length).toBeGreaterThan(0);
    for (const id of partnerProjectIds) {
      expect(isExternalTemplateId(id), id).toBe(true);
      expect(isShowcaseTemplateSlug(id), id).toBe(false);
    }
  });

  it("rejects unknown identifiers and showcase slugs posing as partner ids", () => {
    expect(isShowcaseTemplateSlug("not-a-template")).toBe(false);
    expect(isExternalTemplateId("not-a-template")).toBe(false);
    expect(isExternalTemplateId(templateRouteSlugs[0])).toBe(false);
  });
});
