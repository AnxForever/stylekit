import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  // Read synchronously by tools.ts when it builds the search tool's description,
  // so it must return a value rather than a promise.
  searchStyles: vi.fn(),
  searchStylesLive: vi.fn(),
  getStyleDetail: vi.fn(),
  getComponentRecipe: vi.fn(),
  knownSlug: vi.fn(),
  getStyleDetailLive: vi.fn(),
  getTokensLive: vi.fn(),
  knownSlugLive: vi.fn(),
  getComponentRecipeLive: vi.fn(),
  shadcnInstallCommand: vi.fn(),
  registryUrl: vi.fn(),
  lintStyleCode: vi.fn(),
  hasLintableRules: vi.fn(),
  getImplementationBriefLive: vi.fn(),
  ASSET_KINDS: ["style", "component-pattern", "template", "experience-pack", "prompt"],
  listPublicAssetsLive: vi.fn(),
  getPublicAssetLive: vi.fn(),
}));

vi.mock("../../../packages/mcp/src/data.js", () => mocks);

import { registerStyleKitTools } from "../../../packages/mcp/src/tools";

const results = ["first", "second", "third"].map((slug) => ({
  slug,
  name: slug,
  nameEn: slug,
  category: "modern",
  tags: [],
  description: `${slug} description`,
}));

type ToolResult = {
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
  content?: Array<{ text: string }>;
};

function registeredHandler<T extends Record<string, unknown>>(toolName: string) {
  const registerTool = vi.fn();
  registerStyleKitTools({ registerTool } as never);
  const registration = registerTool.mock.calls.find(([name]) => name === toolName);
  expect(registration).toBeDefined();
  return registration?.[2] as unknown as (input: T) => Promise<ToolResult>;
}

function registeredSearchHandler() {
  return registeredHandler<{
    query?: string;
    category?: string;
    limit: number;
    offset: number;
  }>("stylekit_search_styles");
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.searchStyles.mockReturnValue({ total: results.length, results });
  mocks.searchStylesLive.mockResolvedValue({
    origin: "bundled",
    data: { total: results.length, results },
  });
  mocks.listPublicAssetsLive.mockResolvedValue({ data: {}, origin: "bundled" });
  mocks.getPublicAssetLive.mockResolvedValue({ data: null, origin: "bundled" });
});

describe("stylekit_search_styles pagination", () => {
  it("returns the requested offset page and reports whether another page exists", async () => {
    const handler = registeredSearchHandler();

    const firstPage = await handler({
      query: "modern",
      category: "modern",
      limit: 2,
      offset: 1,
    });
    const secondPage = await handler({
      query: "modern",
      category: "modern",
      limit: 2,
      offset: 2,
    });

    expect(mocks.searchStylesLive).toHaveBeenNthCalledWith(1, {
      query: "modern",
      category: "modern",
    });
    expect(firstPage.structuredContent).toMatchObject({
      total: 3,
      count: 2,
      offset: 1,
      has_more: false,
      results: [results[1], results[2]],
    });
    expect(secondPage.structuredContent).toMatchObject({
      total: 3,
      count: 1,
      offset: 2,
      has_more: false,
      results: [results[2]],
    });
    expect(firstPage.isError).toBeUndefined();
    expect(secondPage.isError).toBeUndefined();
  });

  it("returns a successful, structured empty page and exposes search provenance", async () => {
    mocks.searchStylesLive.mockResolvedValue({
      origin: "bundled",
      fallbackReason: "HTTP 503",
      data: { total: 3, results },
    });
    const handler = registeredSearchHandler();

    const page = await handler({ query: "modern", limit: 2, offset: 50 });

    expect(page.isError).toBeUndefined();
    expect(page.structuredContent).toMatchObject({
      total: 3,
      count: 0,
      offset: 50,
      has_more: false,
      source: "bundled",
      fallbackReason: "HTTP 503",
      results: [],
    });
  });

  it("does not call an inconclusive live detail lookup an unknown style", async () => {
    mocks.getStyleDetailLive.mockResolvedValue({
      data: null,
      origin: "bundled",
      failureKind: "unavailable",
      fallbackReason: "HTTP 503",
    });
    const handler = registeredHandler<{ slug: string }>("stylekit_get_style");

    const result = await handler({ slug: "possibly-live" });
    const message = result.content?.[0]?.text ?? "";

    expect(result.isError).toBe(true);
    expect(message).toContain("source is unavailable");
    expect(message).toContain("HTTP 503");
    expect(message).not.toContain("Unknown style");
  });

  it("uses catalogue confirmation to distinguish an unknown token style from missing tokens", async () => {
    mocks.getTokensLive.mockResolvedValue({
      data: null,
      origin: "bundled",
      failureKind: "not-found",
      fallbackReason: "HTTP 404",
    });
    mocks.knownSlugLive.mockResolvedValue({ data: true, origin: "live" });
    const handler = registeredHandler<{ slug: string }>("stylekit_get_style_tokens");

    const result = await handler({ slug: "existing-without-tokens" });
    const message = result.content?.[0]?.text ?? "";

    expect(result.isError).toBe(true);
    expect(message).toContain("exists but has no registered design tokens");
    expect(message).not.toContain("Unknown style");
  });

  it("tells the caller when the style exists but the live brief endpoint is unsupported", async () => {
    mocks.getImplementationBriefLive.mockResolvedValue({
      data: null,
      origin: "bundled",
      failureKind: "unsupported",
      fallbackReason: "live implementation brief endpoint is unavailable (HTTP 404) for an existing style",
    });
    const handler = registeredHandler<{ slug: string }>("stylekit_get_implementation_brief");

    const result = await handler({ slug: "known-online-style" });
    const message = result.content?.[0]?.text ?? "";

    expect(result.isError).toBe(true);
    expect(message).toContain("exists");
    expect(message).toContain("does not expose a compatible implementation brief");
    expect(message).not.toContain("Unknown style");
  });
});
