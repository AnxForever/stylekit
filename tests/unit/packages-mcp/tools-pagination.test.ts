import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
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

function registeredSearchHandler() {
  const registerTool = vi.fn();
  registerStyleKitTools({ registerTool } as never);
  const searchRegistration = registerTool.mock.calls.find(
    ([name]) => name === "stylekit_search_styles",
  );
  expect(searchRegistration).toBeDefined();
  return searchRegistration?.[2] as (input: {
    query?: string;
    category?: string;
    limit: number;
    offset: number;
  }) => Promise<{
    structuredContent?: Record<string, unknown>;
    isError?: boolean;
  }>;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.searchStylesLive.mockResolvedValue({
    origin: "bundled",
    data: { total: results.length, results },
  });
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
});
