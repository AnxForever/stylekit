import { describe, expect, it, vi } from "vitest";
import { resolve } from "node:path";
import {
  checkSupportAssets,
  classifySupportAsset,
  type SupportAssetReference,
} from "../../tools/scripts/check-support-assets";

const projectRoot = "C:/workspace/stylekit";

describe("support asset checker", () => {
  it("skips valid external HTTPS assets in the default source check without fetching or local-path lookup", async () => {
    const references = [
      { source: "receipt", src: "https://storage.example.test/support/receipt.png" },
    ];
    const fileExists = vi.fn(() => false);
    const isIgnored = vi.fn(() => false);
    const fetchAsset = vi.fn<typeof fetch>();
    const report = vi.fn();

    const result = await checkSupportAssets({
      projectRoot,
      references,
      fileExists,
      isIgnored,
      fetchAsset,
      report,
    });

    expect(result).toEqual({ checked: 0, skipped: 1, failures: [] });
    expect(fileExists).not.toHaveBeenCalled();
    expect(isIgnored).not.toHaveBeenCalled();
    expect(fetchAsset).not.toHaveBeenCalled();
    expect(report).toHaveBeenCalledWith(expect.stringContaining("external runtime asset is not fetched by default"));
  });

  it("checks HTTPS runtime assets when explicitly requested", async () => {
    const fetchAsset = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 200 }));
    const result = await checkSupportAssets({
      projectRoot,
      references: [{ source: "receipt", src: "https://storage.example.test/support/receipt.png" }],
      requireRuntimeAssets: true,
      fetchAsset,
      report: vi.fn(),
    });

    expect(result).toEqual({ checked: 1, skipped: 0, failures: [] });
    expect(fetchAsset).toHaveBeenCalledWith(
      new URL("https://storage.example.test/support/receipt.png"),
      expect.objectContaining({ method: "HEAD", redirect: "error" }),
    );
  });

  it("falls back to GET when a runtime host does not implement HEAD", async () => {
    const fetchAsset = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(null, { status: 405 }))
      .mockResolvedValueOnce(new Response(null, { status: 206 }));
    const result = await checkSupportAssets({
      projectRoot,
      references: [{ source: "receipt", src: "https://storage.example.test/support/receipt.png" }],
      requireRuntimeAssets: true,
      fetchAsset,
      report: vi.fn(),
    });

    expect(result.failures).toEqual([]);
    expect(fetchAsset).toHaveBeenNthCalledWith(
      2,
      new URL("https://storage.example.test/support/receipt.png"),
      expect.objectContaining({ method: "GET", headers: { Range: "bytes=0-0" } }),
    );
  });

  it("fails a runtime fetch when the configured timeout expires", async () => {
    const fetchAsset: typeof fetch = (_input, init) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
      });
    const result = await checkSupportAssets({
      projectRoot,
      references: [{ source: "receipt", src: "https://storage.example.test/support/receipt.png" }],
      requireRuntimeAssets: true,
      fetchAsset,
      report: vi.fn(),
      timeoutMs: 1,
    });

    expect(result.failures).toEqual([
      expect.objectContaining({ reason: "external runtime asset request failed (TimeoutError)" }),
    ]);
  });

  it("fails runtime verification when the external asset is absent", async () => {
    const fetchAsset = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 404 }));
    const result = await checkSupportAssets({
      projectRoot,
      references: [{ source: "receipt", src: "https://storage.example.test/support/receipt.png" }],
      requireRuntimeAssets: true,
      fetchAsset,
      report: vi.fn(),
    });

    expect(result.failures).toEqual([
      expect.objectContaining({ reason: "external runtime asset returned HTTP 404" }),
    ]);
  });

  it.each([
    "http://storage.example.test/receipt.png",
    "file:///etc/passwd",
    "https://user:password@storage.example.test/receipt.png",
    "https://storage.example.test/receipt.png?token=secret",
  ])("rejects unsafe external URL %s before making a request", async (src) => {
    const fetchAsset = vi.fn<typeof fetch>();
    const result = await checkSupportAssets({
      projectRoot,
      references: [{ source: "test", src }],
      requireRuntimeAssets: true,
      fetchAsset,
      report: vi.fn(),
    });

    expect(result.failures).toHaveLength(1);
    expect(fetchAsset).not.toHaveBeenCalled();
  });

  it("keeps repository-backed assets on the local existence and ignore checks", async () => {
    const fileExists = vi.fn(() => true);
    const isIgnored = vi.fn(() => false);
    const fetchAsset = vi.fn<typeof fetch>();
    const references: SupportAssetReference[] = [
      { source: "payment QR", src: "/support/alipay-qr.png" },
    ];
    const result = await checkSupportAssets({
      projectRoot,
      references,
      fileExists,
      isIgnored,
      fetchAsset,
      report: vi.fn(),
    });

    expect(result).toEqual({ checked: 1, skipped: 0, failures: [] });
    expect(fileExists).toHaveBeenCalledWith(resolve(projectRoot, "public/support/alipay-qr.png"));
    expect(isIgnored).toHaveBeenCalledWith("public/support/alipay-qr.png");
    expect(fetchAsset).not.toHaveBeenCalled();
  });

  it("rejects a local path that resolves outside public", () => {
    expect(classifySupportAsset("/../../outside.txt", projectRoot)).toMatchObject({
      kind: "invalid",
    });
  });
});
