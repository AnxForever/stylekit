import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rename, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import JSZip from "jszip";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/downloads/[slug]/[fileId]/route";
import type { DownloadPack } from "@/lib/downloads/types";

const { getDownloadPack } = vi.hoisted(() => ({ getDownloadPack: vi.fn() }));
vi.mock("@/lib/downloads/catalog", () => ({ getDownloadPack }));

const temporaryParent = path.resolve(tmpdir());
let fixtureRoot: string;
let pack: DownloadPack;
let zipBytes: Buffer;

function artifactDirectory(): string {
  return path.join(fixtureRoot, "content", "downloads", "test-pack", "1.0.0");
}

function artifactPath(): string {
  return path.join(artifactDirectory(), "test-pack.zip");
}

function request(slug = "test-pack", fileId = "bundle"): Promise<Response> {
  return GET(new Request("http://localhost/api/downloads/test-pack/bundle"), {
    params: Promise.resolve({ slug, fileId }),
  });
}

describe("controlled resource downloads", () => {
  beforeEach(async () => {
    fixtureRoot = await mkdtemp(path.join(temporaryParent, "stylekit-download-test-"));
    const zip = new JSZip();
    zip.file("README.txt", "Original test fixture; not a published resource.");
    zip.file("source.css", ".fixture { color: #321; }\n");
    zipBytes = await zip.generateAsync({ type: "nodebuffer" });
    await mkdir(artifactDirectory(), { recursive: true });
    await writeFile(artifactPath(), zipBytes);

    pack = {
      slug: "test-pack",
      kind: "3d",
      style: "low-poly",
      theme: "props",
      name: { zh: "测试资源", en: "Test fixture" },
      description: { zh: "仅用于测试", en: "Only used in automated tests" },
      version: "1.0.0",
      itemCount: 1,
      tags: [],
      styleSlugs: [],
      publication: "published",
      license: { status: "confirmed", name: "Test fixture only" },
      cover: { src: "/fixture.svg", kind: "image", alt: { zh: "测试", en: "Fixture" } },
      previews: [],
      files: [{
        id: "bundle",
        name: "test-pack.zip",
        format: "ZIP",
        bytes: zipBytes.byteLength,
        sha256: createHash("sha256").update(zipBytes).digest("hex"),
        role: "bundle",
      }],
      notes: [],
    };
    getDownloadPack.mockImplementation((slug: string) => slug === pack.slug ? pack : undefined);
    vi.spyOn(process, "cwd").mockReturnValue(fixtureRoot);
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    getDownloadPack.mockReset();
    // Cleanup is limited to the exact directory created by mkdtemp above.
    if (path.dirname(fixtureRoot) !== temporaryParent ||
        !path.basename(fixtureRoot).startsWith("stylekit-download-test-")) {
      throw new Error("Unexpected download test directory");
    }
    await rm(fixtureRoot, { recursive: true, force: true });
  });

  it("delivers the real ZIP with its source files and verified response headers", async () => {
    const response = await request();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/zip");
    expect(response.headers.get("content-disposition")).toBe('attachment; filename="test-pack.zip"');
    expect(response.headers.get("content-length")).toBe(String(zipBytes.byteLength));
    expect(response.headers.get("etag")).toBe(`"${pack.files[0].sha256}"`);
    expect(response.headers.get("x-content-sha256")).toBe(pack.files[0].sha256);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("content-security-policy")).toContain("sandbox");

    const received = Buffer.from(await response.arrayBuffer());
    expect(received.equals(zipBytes)).toBe(true);
    const archive = await JSZip.loadAsync(received);
    expect(Object.keys(archive.files).sort()).toEqual(["README.txt", "source.css"]);
    expect(await archive.file("source.css")?.async("string")).toBe(".fixture { color: #321; }\n");
  });

  it.each([
    ["draft", "pending"],
    ["draft", "confirmed"],
    ["published", "pending"],
  ] as const)("blocks %s / %s resources before accessing any artifact", async (publication, license) => {
    pack.publication = publication;
    pack.license.status = license;
    await rm(artifactPath());
    const response = await request();
    expect(response.status).toBe(403);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("content-disposition")).toBeNull();
    expect(await response.json()).toEqual({
      error: "This resource is awaiting publication and license confirmation",
    });
  });

  it("returns 404 for unknown packs or unlisted files", async () => {
    expect((await request("missing-pack")).status).toBe(404);
    expect((await request("test-pack", "not-in-manifest")).status).toBe(404);
  });

  it.each(["../test-pack", "..\\test-pack", "%2e%2e", "test/pack", "D:\\test-pack", "", "a".repeat(101)])(
    "rejects invalid identifier %s before looking up a pack", async (identifier) => {
      expect((await request(identifier)).status).toBe(400);
      expect((await request("test-pack", identifier)).status).toBe(400);
      expect(getDownloadPack).not.toHaveBeenCalled();
    }
  );

  it("refuses a corrupt artifact even when its byte size still matches", async () => {
    const modified = Buffer.from(zipBytes);
    modified[0] ^= 0xff;
    await writeFile(artifactPath(), modified);
    const response = await request();
    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ error: "Download file is temporarily unavailable" });
  });

  it("refuses an artifact with a mismatched size", async () => {
    await writeFile(artifactPath(), "truncated");
    expect((await request()).status).toBe(503);
  });

  it("reports a missing artifact without exposing filesystem paths", async () => {
    await rm(artifactPath());
    const response = await request();
    expect(response.status).toBe(503);
    const body = await response.text();
    expect(body).not.toContain(fixtureRoot);
    expect(body).not.toContain("ENOENT");
  });

  it.each(["../test-pack.zip", "..\\test-pack.zip", "D:\\outside.zip", "test.zip\r\nX-Injected: yes"])(
    "rejects an unsafe filename in the manifest: %s", async (filename) => {
      pack.files[0].name = filename;
      expect((await request()).status).toBe(503);
    }
  );

  it("rejects a version that escapes the content directory", async () => {
    pack.version = "../../outside";
    expect((await request()).status).toBe(503);
  });

  it("refuses a directory junction to an artifact outside the downloads root", async () => {
    const outside = path.join(fixtureRoot, "outside");
    await rename(artifactDirectory(), outside);
    await symlink(outside, artifactDirectory(), process.platform === "win32" ? "junction" : "dir");
    expect((await request()).status).toBe(503);
  });
});
