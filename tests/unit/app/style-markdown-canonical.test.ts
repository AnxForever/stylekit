import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/styles/[slug]/md/route";
import { getFrontendReadiness, getStyleBySlug } from "@/lib/styles";
import type { StyleDeliveryResult } from "@/lib/style-delivery";

const { resolveDelivery } = vi.hoisted(() => ({ resolveDelivery: vi.fn() }));
vi.mock("@/lib/style-delivery", () => ({ resolveStyleDelivery: resolveDelivery }));

beforeEach(() => resolveDelivery.mockReset());

function delivery(source: StyleDeliveryResult["source"]): StyleDeliveryResult {
  const style = { ...getStyleBySlug("neo-brutalist")!, slug: source === "static" ? "neo-brutalist" : "community-example" };
  return {
    source,
    style,
    capabilities: {
      tokens: null,
      recipes: null,
      readiness: getFrontendReadiness(style),
      accessibility: null,
      versioning: null,
      exports: { ideConfigs: source === "static" },
    },
  };
}

describe("Markdown representation canonical headers", () => {
  it.each(["en", "zh"] as const)("points the %s curated Markdown to its corresponding HTML document", async locale => {
    resolveDelivery.mockResolvedValue(delivery("static"));
    const response = await GET(new Request(`https://www.stylekit.top/api/styles/neo-brutalist/md?locale=${locale}`), { params: Promise.resolve({ slug: "neo-brutalist" }) });
    expect(response.status).toBe(200);
    expect(response.headers.get("link")).toMatch(new RegExp(`/${locale}/styles/neo-brutalist>; rel="canonical"$`));
    expect(response.headers.get("content-type")).toContain("text/markdown");
    expect(response.headers.get("x-robots-tag")).toBeNull();
    expect(await response.text()).toContain("## AI Rules");
  });

  it("links community Markdown to the community page rather than a missing curated page", async () => {
    resolveDelivery.mockResolvedValue(delivery("community"));
    const response = await GET(new Request("https://www.stylekit.top/api/styles/community-example/md?locale=zh"), { params: Promise.resolve({ slug: "community-example" }) });
    expect(response.headers.get("link")).toMatch(/\/zh\/community\/community-example>; rel="canonical"$/);
  });

  it("does not fabricate a canonical destination for an unknown style", async () => {
    resolveDelivery.mockResolvedValue(null);
    const response = await GET(new Request("https://www.stylekit.top/api/styles/missing/md"), { params: Promise.resolve({ slug: "missing" }) });
    expect(response.status).toBe(404);
    expect(response.headers.get("link")).toBeNull();
  });
});
