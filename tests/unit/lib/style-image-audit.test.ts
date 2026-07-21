import { createHash } from "node:crypto";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import { afterEach, describe, expect, it } from "vitest";
import { auditStyleImages } from "../../../tools/scripts/audit-style-images.mjs";

const temporaryDirectories: string[] = [];

async function createFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "stylekit-image-audit-"));
  temporaryDirectories.push(root);
  const styleDirectory = path.join(root, "editorial");
  await mkdir(styleDirectory, { recursive: true });
  const file = path.join(styleDirectory, "01.webp");
  const buffer = await sharp({
    create: {
      width: 32,
      height: 18,
      channels: 3,
      background: "#111111",
    },
  }).webp().toBuffer();
  await writeFile(file, buffer);
  return { root, file, buffer };
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })
  ));
});

describe("style image asset audit", () => {
  it("blocks legacy images that have no provenance record", async () => {
    const fixture = await createFixture();
    const report = await auditStyleImages(fixture.root);

    expect(report.summary).toMatchObject({
      images: 1,
      styles: 1,
      blocked: 1,
      researchOnly: 0,
      paidDistributable: 0,
    });
    expect(report.items[0]).toMatchObject({
      assetPath: "/images/styles/editorial/01.webp",
      width: 32,
      height: 18,
      commercialReadiness: "blocked",
      issues: ["missing-provenance"],
    });
  });

  it("accepts complete Unsplash evidence only as research-only", async () => {
    const fixture = await createFixture();
    const contentHash = `sha256:${createHash("sha256").update(fixture.buffer).digest("hex")}`;
    await writeFile(
      fixture.file.replace(/\.webp$/, ".provenance.json"),
      JSON.stringify({
        schemaVersion: 1,
        provider: "unsplash",
        assetPath: "/images/styles/editorial/01.webp",
        photoId: "photo-1",
        creator: {
          name: "Example Photographer",
          username: "example",
          profileUrl: "https://unsplash.com/@example?utm_source=stylekit&utm_medium=referral",
        },
        sourceUrl: "https://unsplash.com/photos/photo-1?utm_source=stylekit&utm_medium=referral",
        downloadLocation: "https://api.unsplash.com/photos/photo-1/download",
        acquiredAt: "2026-07-11T00:00:00.000Z",
        contentHash,
        usage: {
          purpose: "internal-visual-research",
          distributable: false,
          auditStatus: "pending",
        },
        tracking: { downloadEndpointTriggered: true },
      }),
    );

    const report = await auditStyleImages(fixture.root);

    expect(report.summary).toMatchObject({ blocked: 0, researchOnly: 1, paidDistributable: 0 });
    expect(report.items[0]).toMatchObject({
      commercialReadiness: "research-only",
      issues: [],
    });
  });

  it("detects tampered image content and unsafe redistribution metadata", async () => {
    const fixture = await createFixture();
    await writeFile(
      fixture.file.replace(/\.webp$/, ".provenance.json"),
      JSON.stringify({
        schemaVersion: 1,
        provider: "unsplash",
        assetPath: "/images/styles/editorial/01.webp",
        photoId: "photo-1",
        creator: { name: "Photographer", username: "photographer" },
        sourceUrl: "https://unsplash.com/photos/photo-1",
        downloadLocation: "https://api.unsplash.com/photos/photo-1/download",
        acquiredAt: "2026-07-11T00:00:00.000Z",
        contentHash: `sha256:${"0".repeat(64)}`,
        usage: {
          purpose: "paid-pack",
          distributable: true,
          auditStatus: "approved",
        },
        tracking: { downloadEndpointTriggered: false },
      }),
    );

    const report = await auditStyleImages(fixture.root);

    expect(report.items[0].issues).toEqual(expect.arrayContaining([
      "content-hash-mismatch",
      "invalid-purpose",
      "must-not-be-distributable",
      "unexpected-audit-status",
      "download-not-tracked",
    ]));
  });
});
