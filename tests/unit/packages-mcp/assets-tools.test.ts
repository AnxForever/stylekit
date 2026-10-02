import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
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
}));

vi.mock("../../../packages/mcp/src/data.js", () => mocks);

import { registerStyleKitTools } from "../../../packages/mcp/src/tools";

type ToolResult = {
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
  content?: Array<{ text: string }>;
};

const metadata = {
  id: "sidebar-fixed-standard-breadcrumb",
  kind: "component-pattern",
  name: "Fixed sidebar breadcrumb",
  description: "A fixed sidebar with breadcrumbs.",
  tags: ["sidebar", "breadcrumb"],
  availability: "bundled",
  contentLevel: "source",
  license: { name: "MIT" },
};
const detail = {
  schemaVersion: "1",
  metadata,
  data: { previewId: "sidebar-fixed-standard-breadcrumb" },
  code: "export function Sidebar() { return <aside />; }",
  codeLanguage: "tsx",
  dependencies: ["react"],
  sourceUrls: ["https://github.com/AnxForever/stylekit"],
  capabilities: ["component-pattern-source"],
};

function registeredHandler<T extends Record<string, unknown>>(toolName: string) {
  const registerTool = vi.fn();
  registerStyleKitTools({ registerTool } as never);
  const registration = registerTool.mock.calls.find(([name]) => name === toolName);
  expect(registration).toBeDefined();
  return registration?.[2] as unknown as (input: T) => Promise<ToolResult>;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.searchStyles.mockReturnValue({ total: 0, results: [] });
  mocks.searchStylesLive.mockResolvedValue({ origin: "bundled", data: { total: 0, results: [] } });
});

describe("public asset MCP tools", () => {
  it("returns successful structured JSON and complete JSON text for an empty list page", async () => {
    const page = {
      schemaVersion: "1",
      assets: [],
      total: 12,
      offset: 200,
      limit: 20,
      hasMore: false,
      kindCounts: { style: 5, "component-pattern": 7 },
    };
    mocks.listPublicAssetsLive.mockResolvedValue({ data: page, origin: "live" });
    const handler = registeredHandler<{ kind?: string; query?: string; offset: number; limit: number }>(
      "stylekit_list_assets",
    );

    const result = await handler({ kind: "component-pattern", query: "missing", offset: 200, limit: 20 });

    expect(mocks.listPublicAssetsLive).toHaveBeenCalledWith({
      kind: "component-pattern", query: "missing", offset: 200, limit: 20,
    });
    expect(result.isError).toBeUndefined();
    expect(result.structuredContent).toMatchObject({ total: 12, assets: [], offset: 200, source: "live" });
    expect(JSON.parse(result.content?.[0]?.text ?? "{}")).toEqual(result.structuredContent);
  });

  it("returns permitted component-pattern source with a namespaced metadata identity", async () => {
    mocks.getPublicAssetLive.mockResolvedValue({ data: detail, origin: "live" });
    const handler = registeredHandler<{ kind: string; id: string }>("stylekit_get_asset");

    const result = await handler({ kind: "component-pattern", id: metadata.id });

    expect(mocks.getPublicAssetLive).toHaveBeenCalledWith("component-pattern", metadata.id);
    expect(result.isError).toBeUndefined();
    expect(result.structuredContent).toMatchObject({
      metadata: { kind: "component-pattern", id: metadata.id },
      code: detail.code,
      source: "live",
    });
    expect(JSON.parse(result.content?.[0]?.text ?? "{}")).toEqual(result.structuredContent);
  });

  it("returns unavailable for remote templates without pretending metadata is their source", async () => {
    const remoteDetail = {
      ...detail,
      metadata: { ...metadata, kind: "template", id: "starter-dashboard", availability: "remote", contentLevel: "remote" },
      data: { sourceFilesIncluded: false, downloadUrl: "https://stylekit.top/api/templates/starter-dashboard/download" },
      code: undefined,
      dependencies: [],
    };
    mocks.getPublicAssetLive.mockResolvedValue({
      data: remoteDetail,
      origin: "bundled",
      failureKind: "unavailable",
      fallbackReason: "HTTP 503; bundled metadata only",
    });
    const handler = registeredHandler<{ kind: string; id: string }>("stylekit_get_asset");

    const result = await handler({ kind: "template", id: "starter-dashboard" });
    const payload = JSON.parse(result.content?.[0]?.text ?? "{}");

    expect(result.isError).toBe(true);
    expect(payload).toMatchObject({
      kind: "template",
      id: "starter-dashboard",
      source: "bundled",
      failureKind: "unavailable",
      asset: { metadata: { availability: "remote" } },
    });
    expect(payload.asset.code).toBeUndefined();
    expect(payload.asset.data.files).toBeUndefined();
    expect(payload.asset.data.sourceFilesIncluded).toBe(false);
    expect(payload.asset.data.downloadUrl).toContain("/download");
  });

  it("keeps the bundled snapshot usable when the live asset detail API is unsupported", async () => {
    mocks.getPublicAssetLive.mockResolvedValue({
      data: detail,
      origin: "bundled",
      failureKind: "unsupported",
      fallbackReason: "live detail and list APIs are unsupported; using the bundled snapshot",
    });
    const handler = registeredHandler<{ kind: string; id: string }>("stylekit_get_asset");

    const result = await handler({ kind: "component-pattern", id: metadata.id });

    expect(result.isError).toBeUndefined();
    expect(result.structuredContent).toMatchObject({
      metadata: { kind: "component-pattern", id: metadata.id },
      code: detail.code,
      source: "bundled",
      fallbackReason: expect.stringContaining("unsupported"),
    });
  });

  it("does not return source for an asset confirmed absent from the live catalogue", async () => {
    mocks.getPublicAssetLive.mockResolvedValue({
      data: null,
      origin: "live",
      failureKind: "not-found",
      fallbackReason: "asset was not found in the live catalogue",
    });
    const handler = registeredHandler<{ kind: string; id: string }>("stylekit_get_asset");

    const result = await handler({ kind: "component-pattern", id: metadata.id });
    const payload = JSON.parse(result.content?.[0]?.text ?? "{}");

    expect(result.isError).toBe(true);
    expect(payload).toMatchObject({ failureKind: "not-found" });
    expect(payload.asset).toBeUndefined();
    expect(JSON.stringify(payload)).not.toContain(detail.code);
  });

  it("strips accidental source from restricted detail payloads", async () => {
    const restricted = {
      ...detail,
      metadata: { ...metadata, kind: "experience-pack", availability: "restricted", contentLevel: "restricted" },
      data: { privateSource: "must not leak" },
      code: "must not leak",
      dependencies: ["private-package"],
    };
    mocks.getPublicAssetLive.mockResolvedValue({ data: restricted, origin: "live" });
    const handler = registeredHandler<{ kind: string; id: string }>("stylekit_get_asset");

    const result = await handler({ kind: "experience-pack", id: metadata.id });

    expect(result.structuredContent).toMatchObject({ metadata: { availability: "restricted" }, data: {}, dependencies: [] });
    expect(JSON.stringify(result.structuredContent)).not.toContain("must not leak");
    expect(JSON.stringify(result.structuredContent)).not.toContain("private-package");
    expect(JSON.parse(result.content?.[0]?.text ?? "{}")).toEqual(result.structuredContent);
  });

  it("strips source from metadata-only assets regardless of availability", async () => {
    const metadataOnly = {
      ...detail,
      metadata: { ...metadata, availability: "bundled", contentLevel: "metadata" },
      data: { accidentalSource: "must not escape" },
      code: "must not escape",
      dependencies: ["private-package"],
    };
    mocks.getPublicAssetLive.mockResolvedValue({ data: metadataOnly, origin: "live" });
    const handler = registeredHandler<{ kind: string; id: string }>("stylekit_get_asset");

    const result = await handler({ kind: "component-pattern", id: metadata.id });

    expect(result.structuredContent).toMatchObject({
      metadata: { availability: "bundled", contentLevel: "metadata" },
      data: {},
      dependencies: [],
    });
    expect(JSON.stringify(result.structuredContent)).not.toContain("must not escape");
    expect(JSON.stringify(result.structuredContent)).not.toContain("private-package");
  });

  it("keeps partial remote template files out of the unavailable error payload", async () => {
    const partialTemplate = {
      ...detail,
      metadata: { ...metadata, kind: "template", id: "starter-dashboard", availability: "remote", contentLevel: "remote" },
      data: { sourceFilesIncluded: true, files: { "README.md": "partial" } },
      code: "partial source must not escape",
      dependencies: ["partial-dependency"],
    };
    mocks.getPublicAssetLive.mockResolvedValue({ data: partialTemplate, origin: "live" });
    const handler = registeredHandler<{ kind: string; id: string }>("stylekit_get_asset");

    const result = await handler({ kind: "template", id: "starter-dashboard" });
    const payload = JSON.parse(result.content?.[0]?.text ?? "{}");

    expect(result.isError).toBe(true);
    expect(payload).toMatchObject({
      failureKind: "unavailable",
      asset: { metadata: { contentLevel: "remote" }, data: {} },
    });
    expect(payload.asset.code).toBeUndefined();
    expect(payload.asset.dependencies).toEqual([]);
    expect(JSON.stringify(payload)).not.toContain("partial source must not escape");
    expect(JSON.stringify(payload)).not.toContain("partial-dependency");
  });
});
