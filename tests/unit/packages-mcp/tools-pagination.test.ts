import { beforeEach, describe, expect, it, vi } from "vitest";
import { createRequire } from "node:module";

const requireFromMcp = createRequire(new URL("../../../packages/mcp/package.json", import.meta.url));
const { CallToolResultSchema } = requireFromMcp("@modelcontextprotocol/sdk/types.js") as {
  CallToolResultSchema: { parse: (value: unknown) => unknown };
};

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
  lintCodeWithRules: vi.fn(),
  rulesFromBrief: vi.fn(),
  hasLintableRules: vi.fn(),
  getImplementationBriefLive: vi.fn(),
  ASSET_KINDS: ["style", "component-pattern", "template", "experience-pack", "prompt"],
  listPublicAssetsLive: vi.fn(),
  getPublicAssetLive: vi.fn(),
  SITE_URL: "https://www.stylekit.top",
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

function detail() {
  return {
    slug: "existing-without-tokens",
    name: "Existing",
    nameEn: "Existing",
    category: "modern",
    tags: [],
    description: "",
    philosophy: "",
    colors: { primary: "#000000", secondary: "#111111", accent: [] },
    doList: [],
    dontList: [],
    keywords: [],
    hasTokens: false,
    hasRecipes: false,
    recipeIds: [],
    shadcnInstall: "npx shadcn add /r/existing.json",
    url: "https://www.stylekit.top/styles/existing",
    quality: {
      tier: "curated",
      capabilities: {
        tokens: "missing",
        recipes: "missing",
        componentCode: "missing",
        variants: "missing",
        readiness: "curated",
        darkMode: "missing",
        accessibility: "unavailable",
      },
      accessibilityScore: null,
      flags: [],
    },
  };
}

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

function registerBriefHandler(baseUrl?: string) {
  const registerTool = vi.fn();
  registerStyleKitTools({ registerTool } as never, { baseUrl });
  const registration = registerTool.mock.calls.find(([name]) => name === "stylekit_get_style");
  expect(registration).toBeDefined();
  return registration?.[2] as unknown as (input: { slug: string; include: string[] }) => Promise<ToolResult>;
}

function liveBrief(slug: string, designDocument?: { schemaVersion: string; fileName: string; locale: string; contentType: string; url: string; contentHash: string; content: string }) {
  return {
    schemaVersion: "stylekit-brief-v1",
    slug,
    name: "Style",
    nameEn: "Style",
    category: "modern",
    styleType: "visual",
    description: "A style.",
    tags: [],
    keywords: [],
    philosophy: "Be consistent.",
    aiRules: "Use the style.",
    doList: [],
    dontList: [],
    colors: { primary: "#000000", secondary: "#ffffff", accent: [] },
    globalCss: "",
    components: {},
    variants: [],
    tokens: null,
    recipes: {},
    readiness: {},
    lintRules: { schemaVersion: "stylekit-lint-v1", sources: [], forbiddenClasses: [], forbiddenPatterns: [], required: {}, exempt: [], unsupportedRules: [] },
    provenance: { source: "static", contentHash: "fnv1a32:1234abcd", url: `https://www.stylekit.top/api/styles/${slug}/brief` },
    ...(designDocument ? { designDocument } : {}),
  };
}

function canonicalDocument(content: string, locale = "en") {
  return {
    schemaVersion: "stylekit-design-document-v1",
    fileName: "design.md",
    locale,
    contentType: "text/markdown",
    url: `https://www.stylekit.top/api/design/existing-without-tokens/design.md?locale=${locale}`,
    contentHash: "fnv1a32:1234abcd",
    content,
  };
}

function prepareBriefHandler(slug: string, brief: Record<string, unknown>, baseUrl?: string, detailPatch: Record<string, unknown> = {}) {
  mocks.getStyleDetailLive.mockResolvedValue({
    data: { ...detail(), slug, name: "Style", nameEn: "Style", ...detailPatch },
    origin: "live",
  });
  mocks.getImplementationBriefLive.mockResolvedValue({ data: brief, origin: "live" });
  return registerBriefHandler(baseUrl);
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
    }, {});
    expect(mocks.searchStylesLive).toHaveBeenNthCalledWith(2, {
      query: "modern",
      category: "modern",
    }, {});
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
    mocks.getStyleDetailLive.mockResolvedValue({ data: detail(), origin: "bundled" });
    const handler = registeredHandler<{ slug: string; include?: string[] }>("stylekit_get_style");

    const result = await handler({ slug: "existing-without-tokens", include: ["tokens"] });
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
    mocks.getStyleDetailLive.mockResolvedValue({ data: detail(), origin: "bundled" });
    const handler = registeredHandler<{ slug: string; include?: string[] }>("stylekit_get_style");

    const result = await handler({ slug: "known-online-style", include: ["brief"] });
    const message = result.content?.[0]?.text ?? "";

    expect(result.isError).toBe(true);
    expect(message).toContain("exists");
    expect(message).toContain("does not expose a compatible implementation brief");
    expect(message).not.toContain("Unknown style");
  });
});

describe("stylekit_get_style brief text budget", () => {
  it("keeps a complete canonical document inline when the full brief JSON is oversized", async () => {
    const slug = "editorial";
    const markdown = `# Editorial visual guide\n\n${"Use the documented type scale and restrained layout.\n".repeat(180)}`;
    const brief = {
      ...liveBrief(slug, canonicalDocument(markdown)),
      largeLegacyPayload: "x".repeat(30_000),
    };
    const handler = prepareBriefHandler(slug, brief, "https://preview.stylekit.test/context/");

    const result = await handler({ slug, include: ["brief"] });
    const text = result.content?.[0]?.text ?? "";

    expect(result.content).toHaveLength(1);
    expect(JSON.stringify(result.structuredContent).length).toBeGreaterThan(25_000);
    expect(text.length).toBeLessThanOrEqual(25_000);
    expect(text).toContain(`## Canonical design.md\n${markdown}`);
    expect(text).toContain("Full machine-readable brief JSON: https://preview.stylekit.test/context/api/styles/editorial/brief");
    expect(text).not.toContain("largeLegacyPayload");
    expect(CallToolResultSchema.parse(result)).toMatchObject({ structuredContent: result.structuredContent });
  });

  it("does not inline a partial canonical document when the document exceeds the budget", async () => {
    const slug = "oversized-guide";
    const markdown = `CANONICAL_BEGIN\n${"Complete visual rules.\n".repeat(1_400)}CANONICAL_END`;
    const handler = prepareBriefHandler(slug, liveBrief(slug, canonicalDocument(markdown)));

    const result = await handler({ slug, include: ["brief"] });
    const text = result.content?.[0]?.text ?? "";

    expect(text.length).toBeLessThanOrEqual(25_000);
    expect(text).toContain("not embedded partially");
    expect(text).toContain("Read the complete design.md: https://www.stylekit.top/api/design/oversized-guide/design.md?locale=en");
    expect(text).not.toContain("CANONICAL_BEGIN");
    expect((result.structuredContent?.brief as Record<string, unknown>)?.["designDocument"]).toMatchObject({ content: markdown });
    expect(() => CallToolResultSchema.parse(result)).not.toThrow();
  });

  it("uses the configured HTTP base URL and encodes the canonical slug", async () => {
    const slug = "editorial/style 1";
    const handler = prepareBriefHandler(slug, liveBrief(slug, canonicalDocument("# Full guide")), "https://preview.stylekit.test/prefix/");

    const result = await handler({ slug, include: ["brief"] });
    const text = result.content?.[0]?.text ?? "";

    expect(text).toContain("https://preview.stylekit.test/prefix/api/styles/editorial%2Fstyle%201/brief");
    expect(text).toContain("https://preview.stylekit.test/prefix/api/design/editorial%2Fstyle%201/design.md?locale=en");
    expect(() => CallToolResultSchema.parse(result)).not.toThrow();
  });

  it.each(["credentials", "non-http", "empty"] as const)(
    "does not emit an unsafe configured base URL (%s)",
    async (kind) => {
      const slug = "editorial";
      const configuredUrl = new URL(kind === "non-http" ? "file:///private/stylekit" : "https://preview.stylekit.test");
      if (kind === "credentials") {
        configuredUrl.username = "fixture-user";
        configuredUrl.password = "example-test-value";
      }
      const baseUrl = kind === "empty" ? " " : configuredUrl.toString();
      const handler = prepareBriefHandler(slug, liveBrief(slug, canonicalDocument("# Full guide")), baseUrl);

      const result = await handler({ slug, include: ["brief"] });
      const text = result.content?.[0]?.text ?? "";

      expect(text).toContain("no safe HTTP URL is configured");
      expect(text).not.toContain("fixture-user");
      expect(text).not.toContain("example-test-value");
      expect(text).not.toContain("file:///private/stylekit");
      expect(() => CallToolResultSchema.parse(result)).not.toThrow();
    },
  );

  it("clearly identifies bundled briefs that do not carry a canonical design.md", async () => {
    const slug = "bundled-style";
    mocks.getStyleDetailLive.mockResolvedValue({ data: { ...detail(), slug }, origin: "bundled", fallbackReason: "offline" });
    mocks.getImplementationBriefLive.mockResolvedValue({ data: liveBrief(slug), origin: "bundled", fallbackReason: "offline" });
    const handler = registerBriefHandler();

    const result = await handler({ slug, include: ["brief"] });
    const text = result.content?.[0]?.text ?? "";

    expect(text).toContain("The bundled fallback does not include a canonical design.md.");
    expect(text).toContain("Full machine-readable brief JSON: https://www.stylekit.top/api/styles/bundled-style/brief");
    expect(text).not.toContain("## Canonical design.md");
    expect(text.length).toBeLessThanOrEqual(25_000);
    expect(() => CallToolResultSchema.parse(result)).not.toThrow();
  });

  it("includes requested token and recipe sections when they fit alongside the canonical document", async () => {
    const slug = "editorial";
    mocks.getTokensLive.mockResolvedValue({ data: { colors: { primary: "#000000" } }, origin: "live" });
    mocks.getComponentRecipeLive.mockResolvedValue({
      data: { component: "button", className: "button", code: "<button>Save</button>" },
      origin: "live",
    });
    const handler = prepareBriefHandler(slug, liveBrief(slug, canonicalDocument("# Full guide")), undefined, {
      hasTokens: true,
      hasRecipes: true,
      recipeIds: ["button"],
    });

    const result = await handler({ slug, include: ["brief", "tokens", "recipe"] });
    const text = result.content?.[0]?.text ?? "";

    expect(text).toContain("## Tokens");
    expect(text).toContain("## Recipe — button");
    expect(text).toContain("<button>Save</button>");
    expect(result.structuredContent?.tokens).toBeDefined();
    expect(result.structuredContent?.recipe).toBeDefined();
    expect(text.length).toBeLessThanOrEqual(25_000);
    expect(() => CallToolResultSchema.parse(result)).not.toThrow();
  });

  it("says where explicitly requested sections went when they cannot fit", async () => {
    const slug = "editorial";
    mocks.getTokensLive.mockResolvedValue({ data: { oversized: "token".repeat(5_000) }, origin: "live" });
    mocks.getComponentRecipeLive.mockResolvedValue({
      data: { component: "button", className: "button", code: "<button>Save</button>" },
      origin: "live",
    });
    const handler = prepareBriefHandler(slug, liveBrief(slug, canonicalDocument("# Full guide")), undefined, {
      hasTokens: true,
      hasRecipes: true,
      recipeIds: ["button"],
    });

    const result = await handler({ slug, include: ["brief", "tokens", "recipe"] });
    const text = result.content?.[0]?.text ?? "";

    expect(text.length).toBeLessThanOrEqual(25_000);
    expect(text).toContain("Requested sections exceed the text budget and were not partially included.");
    expect(text).toContain('call include: ["tokens"] or include: ["recipe"] separately.');
    expect(text).toContain("Tokens JSON: https://www.stylekit.top/api/styles/editorial/tokens");
    expect(text).not.toContain("## Tokens");
    expect(result.structuredContent?.tokens).toBeDefined();
    expect(result.structuredContent?.recipe).toBeDefined();
    expect(() => CallToolResultSchema.parse(result)).not.toThrow();
  });
});
