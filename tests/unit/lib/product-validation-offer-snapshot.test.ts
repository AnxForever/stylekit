import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { productValidationBundleSchema } from "@/lib/product-validation";
import { verifyValidationOfferSnapshot } from "@/lib/product-validation/verify-offer-snapshot";

const EVIDENCE_PATH = "docs/examples/product-validation-empty.json";
const OFFER_PATH = "docs/examples/corporate-clean-saas-offer-v2.json";

function hash(content: Buffer | string): string {
  return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}

async function readExampleBundle() {
  const raw = await readFile(path.join(process.cwd(), EVIDENCE_PATH), "utf8");
  return productValidationBundleSchema.parse(JSON.parse(raw));
}

async function withTemporaryOffer(
  content: string,
  run: (rootDir: string) => Promise<void>,
): Promise<void> {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "stylekit-offer-snapshot-"));
  try {
    const artifactPath = path.join(rootDir, OFFER_PATH);
    await mkdir(path.dirname(artifactPath), { recursive: true });
    await writeFile(artifactPath, content, "utf8");
    await run(rootDir);
  } finally {
    await rm(rootDir, { recursive: true, force: true });
  }
}

describe("frozen product validation offer snapshot", () => {
  it("verifies the repository artifact hash and experiment identity", async () => {
    const bundle = await readExampleBundle();
    const report = await verifyValidationOfferSnapshot(process.cwd(), bundle);

    expect(report.ok).toBe(true);
    expect(report.actualSha256).toBe(bundle.experiment.offerSnapshot.sha256);
    expect(report.artifact?.offerVersion).toBe(bundle.experiment.offerVersion);
    expect(report.artifact?.pack.id).toBe(bundle.experiment.packId);
    expect(report.artifact?.variants).toEqual(bundle.experiment.variants);
  });

  it("rejects byte changes when the frozen hash is not updated", async () => {
    const bundle = await readExampleBundle();
    const original = await readFile(path.join(process.cwd(), OFFER_PATH), "utf8");

    await withTemporaryOffer(`${original}\n`, async (rootDir) => {
      const report = await verifyValidationOfferSnapshot(rootDir, bundle);
      expect(report.ok).toBe(false);
      expect(report.issues.map((issue) => issue.code)).toContain(
        "artifact-hash-mismatch",
      );
    });
  });

  it("rejects semantically different prices even when their new hash is supplied", async () => {
    const bundle = await readExampleBundle();
    const original = JSON.parse(
      await readFile(path.join(process.cwd(), OFFER_PATH), "utf8"),
    ) as { variants: Array<{ amountMinor: number }> };
    original.variants[0].amountMinor = 29_900;
    const changed = `${JSON.stringify(original, null, 2)}\n`;
    bundle.experiment.offerSnapshot.sha256 = hash(changed);

    await withTemporaryOffer(changed, async (rootDir) => {
      const report = await verifyValidationOfferSnapshot(rootDir, bundle);
      expect(report.actualSha256).toBe(bundle.experiment.offerSnapshot.sha256);
      expect(report.ok).toBe(false);
      expect(report.issues.map((issue) => issue.code)).toContain(
        "variant-mismatch",
      );
    });
  });
});
