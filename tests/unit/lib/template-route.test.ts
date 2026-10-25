import { describe, expect, it } from "vitest";
import { getTemplateSlugFromPathname } from "@/lib/templates/route";

describe("getTemplateSlugFromPathname", () => {
  it.each([
    ["/zh/templates/saas-landing", "saas-landing"],
    ["/en/templates/saas-landing", "saas-landing"],
    ["/templates/saas-landing", "saas-landing"],
    ["/zh/templates/saas-landing/", "saas-landing"],
  ])("reads the template slug from %s", (pathname, slug) => {
    expect(getTemplateSlugFromPathname(pathname)).toBe(slug);
  });

  it.each([
    "/zh/templates",
    "/templates",
    "/zh/templates/saas-landing/extra",
    "/zh/styles/neo-brutalist",
    "/",
  ])("returns null outside a template page: %s", (pathname) => {
    expect(getTemplateSlugFromPathname(pathname)).toBeNull();
  });
});
