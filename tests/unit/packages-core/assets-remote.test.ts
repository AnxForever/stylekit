import { afterEach, describe, expect, it, vi } from "vitest";
import { getPublicAsset, listPublicAssets } from "@/packages/core/src/assets/registry";
import { ASSET_KINDS } from "@/packages/core/src/assets/types";
import { getPublicAssetLive, listPublicAssetsLive } from "@/packages/core/src/assets/remote";

const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { "content-type": "application/json" },
});
const listEnvelope = (assets: ReturnType<typeof listPublicAssets>["assets"], patch = {}) => ({
  schemaVersion: "1",
  assets,
  total: assets.length,
  offset: 0,
  limit: 20,
  hasMore: false,
  kindCounts: listPublicAssets({ offset: 0, limit: 1 }).kindCounts,
  ...patch,
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("live public asset access", () => {
  it("sends filters and treats an empty live page as success", async () => {
    const empty = listEnvelope([], { total: 7, offset: 99, limit: 10 });
    const fetchMock = vi.fn().mockResolvedValue(response(empty));
    vi.stubGlobal("fetch", fetchMock);
    const result = await listPublicAssetsLive(
      { kind: "component-pattern", query: "sidebar", offset: 99, limit: 10, baseUrl: "https://assets.test/" },
    );
    const url = new URL(fetchMock.mock.calls[0][0] as string);
    expect(url.origin).toBe("https://assets.test");
    expect(url.pathname).toBe("/api/assets");
    expect(Object.fromEntries(url.searchParams)).toEqual({
      kind: "component-pattern", q: "sidebar", offset: "99", limit: "10",
    });
    expect(result).toMatchObject({ origin: "live", data: empty });
    expect(result.data.assets).toEqual([]);
  });

  it("falls back to a validated bundled list for malformed live data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ schemaVersion: "1", assets: [] })));
    const result = await listPublicAssetsLive(
      { kind: "animation", offset: 0, limit: 5, baseUrl: "https://bad-assets.test" },
    );
    expect(result.origin).toBe("bundled");
    expect(result.data.assets.length).toBeGreaterThan(0);
    expect(result.data.assets.every((asset) => asset.kind === "animation")).toBe(true);
    expect(result).toMatchObject({ failureKind: "unavailable" });
    expect(result.fallbackReason).toContain("invalid schemaVersion 1");
  });

  it("returns an exact namespaced detail with source intact", async () => {
    const bundled = getPublicAsset("component-pattern", "sidebar-fixed-standard-breadcrumb");
    expect(bundled).toBeTruthy();
    const detail = {
      ...bundled!,
      metadata: { ...bundled!.metadata, name: "Live sidebar pattern" },
      data: { ...(bundled!.data as Record<string, unknown>), origin: "live-source" },
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response(detail)));
    const result = await getPublicAssetLive(
      "component-pattern", "sidebar-fixed-standard-breadcrumb", { baseUrl: "https://assets.test" },
    );
    expect(result).toMatchObject({
      origin: "live",
      data: { metadata: { kind: "component-pattern", id: "sidebar-fixed-standard-breadcrumb", name: "Live sidebar pattern" } },
    });
    expect(typeof result.data?.code).toBe("string");
    expect(JSON.stringify(result.data?.data)).toContain("live-source");
  });

  it("rejects a detail response for a different id", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response(getPublicAsset("style", "glassmorphism"))));
    const result = await getPublicAssetLive("style", "not-glassmorphism", { baseUrl: "https://mismatch.test" });
    expect(result).toMatchObject({ origin: "bundled", data: null, failureKind: "unavailable" });
    expect(result.fallbackReason).toContain("did not match");
  });

  it("does not return a bundled asset after the live list confirms it was removed", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response({}, 404))
      .mockResolvedValueOnce(response(listEnvelope([], { total: 0, limit: 100 })));
    vi.stubGlobal("fetch", fetchMock);

    const result = await getPublicAssetLive("style", "glassmorphism", { baseUrl: "https://assets.test" });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(new URL(fetchMock.mock.calls[1][0] as string).pathname).toBe("/api/assets");
    expect(result).toMatchObject({ origin: "live", data: null, failureKind: "not-found" });
  });

  it.each([
    ["unsupported list endpoint", response({}, 404)],
    ["unavailable list endpoint", new Error("offline")],
  ])("keeps an explicit bundled fallback when the %s cannot confirm removal", async (_label, listResponse) => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response({}, 404))
      .mockImplementationOnce(() => listResponse instanceof Error
        ? Promise.reject(listResponse)
        : Promise.resolve(listResponse as Response));
    vi.stubGlobal("fetch", fetchMock);

    const result = await getPublicAssetLive("style", "glassmorphism", { baseUrl: "https://assets.test" });

    expect(result).toMatchObject({
      origin: "bundled",
      data: { metadata: { kind: "style", id: "glassmorphism" } },
    });
    expect(result.fallbackReason).toContain("using the bundled snapshot");
  });

  it("retains remote-template metadata but marks its source unavailable on outage", async () => {
    const template = listPublicAssets({ kind: "template", offset: 0, limit: 100 }).assets
      .find((asset) => asset.availability === "remote");
    expect(template).toBeTruthy();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({}, 503)));
    const result = await getPublicAssetLive("template", template!.id, { baseUrl: "https://offline.test" });
    expect(result).toMatchObject({
      origin: "bundled", failureKind: "unavailable",
      data: { metadata: { kind: "template", id: template!.id, contentLevel: "remote" } },
    });
    expect(result.fallbackReason).toContain("bundled metadata only");
    expect((result.data?.data as Record<string, unknown>).sourceFilesIncluded).toBe(false);
    expect((result.data?.data as Record<string, unknown>).files).toBeUndefined();
    expect(result.data?.code).toBeUndefined();
  });

  it("requires the live template marker and minimum project files before accepting source", async () => {
    const template = listPublicAssets({ kind: "template", offset: 0, limit: 100 }).assets
      .find((asset) => asset.availability === "remote");
    expect(template).toBeTruthy();
    const bundled = getPublicAsset("template", template!.id)!;
    const partial = {
      ...bundled,
      data: { ...(bundled.data as Record<string, unknown>), sourceFilesIncluded: true, files: { "README.md": "partial" } },
    };
    const complete = {
      ...bundled,
      data: {
        ...(bundled.data as Record<string, unknown>),
        sourceFilesIncluded: true,
        files: {
          "app/page.tsx": "export default function Page() { return null; }",
          "app/globals.css": "@tailwind base;",
          "package.json": JSON.stringify({ name: "stylekit-template" }),
        },
      },
    };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response(partial))
      .mockResolvedValueOnce(response(complete));
    vi.stubGlobal("fetch", fetchMock);

    const rejected = await getPublicAssetLive("template", template!.id, { baseUrl: "https://template-check.test" });
    const accepted = await getPublicAssetLive("template", template!.id, { baseUrl: "https://template-check.test" });
    expect(rejected).toMatchObject({ origin: "bundled", failureKind: "unavailable" });
    expect(rejected.fallbackReason).toContain("did not contain its actual source files");
    expect(accepted).toMatchObject({
      origin: "live",
      data: { data: { sourceFilesIncluded: true, files: { "app/page.tsx": expect.any(String) } } },
    });
  });

  it("scrubs accidental code and data from restricted assets", async () => {
    const restricted = listPublicAssets({ kind: "experience-pack", offset: 0, limit: 100 }).assets
      .find((asset) => asset.availability === "restricted");
    expect(restricted).toBeTruthy();
    const detail = getPublicAsset("experience-pack", restricted!.id)!;
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({
      ...detail, data: { privateSource: "must not escape" }, code: "must not escape",
      dependencies: ["private-package"],
    })));
    const result = await getPublicAssetLive("experience-pack", restricted!.id, { baseUrl: "https://restricted.test" });
    expect(result).toMatchObject({ origin: "live", data: { data: {}, dependencies: [] } });
    expect(result.data?.code).toBeUndefined();
    expect(JSON.stringify(result.data)).not.toContain("must not escape");
  });

  it("scrubs source payloads when contentLevel is metadata even if availability is bundled", async () => {
    const bundled = getPublicAsset("component-pattern", "sidebar-fixed-standard-breadcrumb")!;
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({
      ...bundled,
      metadata: { ...bundled.metadata, availability: "bundled", contentLevel: "metadata" },
      data: { accidentalSource: "must not escape" },
      code: "must not escape",
      dependencies: ["private-package"],
    })));

    const result = await getPublicAssetLive("component-pattern", bundled.metadata.id, { baseUrl: "https://metadata.test" });

    expect(result).toMatchObject({
      origin: "live",
      data: { metadata: { availability: "bundled", contentLevel: "metadata" }, data: {}, dependencies: [] },
    });
    expect(result.data?.code).toBeUndefined();
    expect(JSON.stringify(result.data)).not.toContain("must not escape");
    expect(JSON.stringify(result.data)).not.toContain("private-package");
  });

  it("keeps the prompt namespace dynamically sourced from Core", () => {
    expect(ASSET_KINDS).toContain("prompt");
    expect(listPublicAssets({ kind: "prompt", offset: 0, limit: 1 }).kindCounts.prompt).toBeGreaterThan(0);
  });
});
