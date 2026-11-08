import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/styles/[slug]/brief/route";
import { resolveStyleDelivery } from "@/lib/style-delivery";
import { getImplementationBrief } from "@/lib/implementation-brief";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleRecipes } from "@/lib/recipes";
import { renderDesignMd } from "@/lib/design-spec";
import { getDesignSpec } from "@/lib/design-spec/registry";
import { createHash } from "node:crypto";
import { GET as getCanonicalDesign } from "@/app/api/design/[slug]/[format]/route";

async function canonicalDesignContent(slug: string, locale: "en" | "zh"): Promise<string> {
  const response = await getCanonicalDesign(
    new Request(`https://www.stylekit.top/api/design/${slug}/design.md?locale=${locale}`),
    { params: Promise.resolve({ slug, format: "design.md" }) },
  );
  return response.text();
}

vi.mock("@/lib/style-delivery", () => ({ resolveStyleDelivery: vi.fn() }));

describe("GET /api/styles/[slug]/brief", () => {
  beforeEach(() => vi.resetAllMocks());

  it("delivers the same complete inputs as Core, with HTTP source provenance", async () => {
    const bundled = getImplementationBrief("neo-brutalist")!;
    vi.mocked(resolveStyleDelivery).mockResolvedValue({
      source: "static",
      style: getStyleBySlug(bundled.slug)!,
      capabilities: {
        tokens: bundled.tokens,
        recipes: getStyleRecipes(bundled.slug)!,
        readiness: bundled.readiness,
        accessibility: null,
        versioning: null,
        exports: { ideConfigs: true },
      },
    });

    const response = await GET(new Request(`http://localhost/api/styles/${bundled.slug}/brief`), {
      params: Promise.resolve({ slug: bundled.slug }),
    });
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    const payload = await response.json();
    expect(payload).toEqual({
      designDocument: {
        schemaVersion: "stylekit-design-document-v1",
        fileName: "design.md",
        locale: "en",
        contentType: "text/markdown",
        url: `https://www.stylekit.top/api/design/${bundled.slug}/design.md?locale=en`,
        contentHash: createHash("sha256")
          .update(renderDesignMd(getDesignSpec(bundled.slug)!, { locale: "en" }), "utf8")
          .digest("hex"),
        content: renderDesignMd(getDesignSpec(bundled.slug)!, { locale: "en" }),
      },
      ...JSON.parse(JSON.stringify(bundled)),
      provenance: { ...bundled.provenance, source: "static" },
    });
    await expect(canonicalDesignContent(bundled.slug, "en")).resolves.toBe(
      payload.designDocument.content,
    );
    expect(payload.provenance.contentHash).toBe(bundled.provenance.contentHash);
    expect(payload.lintRules.sources).toEqual(["tokens", "curated"]);
    expect(resolveStyleDelivery).toHaveBeenCalledWith(bundled.slug);
  });

  it("returns 404 for a missing resource without inventing a contract", async () => {
    vi.mocked(resolveStyleDelivery).mockResolvedValue(null);
    const response = await GET(new Request("http://localhost/api/styles/unknown/brief"), {
      params: Promise.resolve({ slug: "unknown" }),
    });
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: "Style not found" });
  });

  it("uses the shared complete Chinese document and canonical URL when requested", async () => {
    const bundled = getImplementationBrief("editorial")!;
    vi.mocked(resolveStyleDelivery).mockResolvedValue({
      source: "static",
      style: getStyleBySlug(bundled.slug)!,
      capabilities: {
        tokens: bundled.tokens,
        recipes: getStyleRecipes(bundled.slug)!,
        readiness: bundled.readiness,
        accessibility: null,
        versioning: null,
        exports: { ideConfigs: true },
      },
    });

    const response = await GET(new Request(
      `https://www.stylekit.top/api/styles/${bundled.slug}/brief?locale=zh`,
    ), { params: Promise.resolve({ slug: bundled.slug }) });
    const payload = await response.json();
    const markdown = renderDesignMd(getDesignSpec(bundled.slug)!, { locale: "zh" });

    expect(response.status).toBe(200);
    expect(payload.designDocument).toMatchObject({
      schemaVersion: "stylekit-design-document-v1",
      fileName: "design.md",
      locale: "zh",
      contentType: "text/markdown",
      url: `https://www.stylekit.top/api/design/${bundled.slug}/design.md?locale=zh`,
      contentHash: createHash("sha256").update(markdown, "utf8").digest("hex"),
      content: markdown,
    });
    await expect(canonicalDesignContent(bundled.slug, "zh")).resolves.toBe(
      payload.designDocument.content,
    );
    expect(payload.provenance.contentHash).toBe(bundled.provenance.contentHash);
  });

  it("keeps community capabilities separate from bundled rules for a reused slug", async () => {
    const bundled = getImplementationBrief("neo-brutalist")!;
    vi.mocked(resolveStyleDelivery).mockResolvedValue({
      source: "community",
      style: { ...getStyleBySlug(bundled.slug)!, name: "Community submission" },
      capabilities: {
        tokens: null,
        recipes: null,
        readiness: bundled.readiness,
        accessibility: null,
        versioning: null,
        exports: { ideConfigs: false },
      },
    });
    const response = await GET(new Request(`http://localhost/api/styles/${bundled.slug}/brief`), {
      params: Promise.resolve({ slug: bundled.slug }),
    });
    const payload = await response.json();
    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      name: "Community submission", tokens: null, recipes: {},
      provenance: { source: "community" }, lintRules: { sources: [] },
    });
    expect(payload.provenance.contentHash).not.toBe(bundled.provenance.contentHash);
    expect(payload).not.toHaveProperty("designDocument");
  });

  it("omits the document extension when a delivered slug has no DesignSpec", async () => {
    const bundled = getImplementationBrief("neo-brutalist")!;
    const slug = "community-only-design";
    vi.mocked(resolveStyleDelivery).mockResolvedValue({
      source: "community",
      style: { ...getStyleBySlug(bundled.slug)!, slug, name: "Community only" },
      capabilities: {
        tokens: null,
        recipes: null,
        readiness: bundled.readiness,
        accessibility: null,
        versioning: null,
        exports: { ideConfigs: false },
      },
    });

    const response = await GET(new Request(`https://www.stylekit.top/api/styles/${slug}/brief`), {
      params: Promise.resolve({ slug }),
    });
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.slug).toBe(slug);
    expect(payload).not.toHaveProperty("designDocument");
  });
});
