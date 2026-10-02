import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/styles/[slug]/brief/route";
import { resolveStyleDelivery } from "@/lib/style-delivery";
import { getImplementationBrief } from "@/lib/implementation-brief";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleRecipes } from "@/lib/recipes";

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
      ...JSON.parse(JSON.stringify(bundled)),
      provenance: { ...bundled.provenance, source: "static" },
    });
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
  });
});
