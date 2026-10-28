import { readFile } from "node:fs/promises";
import { describe, expect, it, vi } from "vitest";
import { GET as getLlmsMarkdown } from "@/app/llms.md/route";
import { GET as getLlmsFull } from "@/app/llms-full.txt/route";
import {
  addTemplateDemoBoundary,
  findTemplateEntryForPath,
  TEMPLATE_DEMO_BOUNDARY,
  templateDemoBoundaryMarkdown,
} from "@/lib/templates/demo-boundary";

vi.mock("@/lib/styles/community-runtime", () => ({
  listPromotedCommunityStyles: async () => [],
}));

describe("template demo product boundary", () => {
  it("matches detail and nested template paths without matching the gallery", () => {
    expect(findTemplateEntryForPath("/templates/pricing-page")?.id).toBe("pricing-page");
    expect(
      findTemplateEntryForPath("/templates/editorial-profile-archive/work")?.id
    ).toBe("editorial-profile-archive");
    expect(findTemplateEntryForPath("/templates")).toBeUndefined();
  });

  it("adds a demo boundary to social metadata", () => {
    const metadata = addTemplateDemoBoundary(
      {
        title: "Pricing Page",
        description: "Three-tier pricing layout.",
        openGraph: { title: "Pricing Page", description: "Three-tier pricing layout." },
        twitter: { title: "Pricing Page", description: "Three-tier pricing layout." },
      },
      "en"
    );

    expect(metadata.title).toContain("Template Demo");
    expect(metadata.description).toContain("not StyleKit offers");
    expect(metadata.openGraph?.description).toContain("not StyleKit offers");
    expect(metadata.twitter?.description).toContain("not StyleKit offers");
  });

  it("preserves absolute metadata title objects without stringifying them", () => {
    const metadata = addTemplateDemoBoundary(
      { title: { absolute: "Pricing Page" } },
      "en"
    );

    expect(metadata.title).toEqual({ absolute: "Pricing Page — Template Demo" });
    expect(JSON.stringify(metadata.title)).not.toContain("[object Object]");
  });

  it("keeps the sample-business boundary in all LLM discovery responses", async () => {
    const publicIndex = await readFile("public/llms.txt", "utf8");
    const [markdownResponse, fullResponse] = await Promise.all([
      getLlmsMarkdown(),
      getLlmsFull(),
    ]);
    const [markdown, full] = await Promise.all([
      markdownResponse.text(),
      fullResponse.text(),
    ]);
    const boundary = TEMPLATE_DEMO_BOUNDARY.en.machineReadable;

    expect(publicIndex).toContain(boundary);
    expect(templateDemoBoundaryMarkdown()).toContain(boundary);
    expect(markdown).toContain(boundary);
    expect(full).toContain(boundary);
  });
});
