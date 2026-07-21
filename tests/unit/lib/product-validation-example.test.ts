import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  evaluateProductValidation,
  productValidationBundleSchema,
} from "@/lib/product-validation";
import { verifyValidationOfferSnapshot } from "@/lib/product-validation/verify-offer-snapshot";

describe("product validation example", () => {
  it("is valid, references an authentic frozen offer, and cannot authorize Pack 1", async () => {
    const raw = readFileSync(
      path.join(
        process.cwd(),
        "docs/examples/product-validation-empty.json",
      ),
      "utf8",
    );
    const parsed = productValidationBundleSchema.parse(JSON.parse(raw));
    const offerVerification = await verifyValidationOfferSnapshot(
      process.cwd(),
      parsed,
    );
    const result = evaluateProductValidation(parsed);

    expect(parsed.datasetStatus).toBe("template");
    expect(parsed.sealedAt).toBeNull();
    expect(parsed.experiment.contractVersions).toEqual({
      qualification: "qualified-visitor-v1",
      bot: "bot-exclusion-v1",
      assignment: "sticky-price-assignment-v1",
      authoritative: "authoritative-evidence-v1",
    });
    expect(offerVerification.ok).toBe(true);
    expect(offerVerification.actualSha256).toBe(
      parsed.experiment.offerSnapshot.sha256,
    );
    expect(parsed.participants).toEqual([]);
    expect(parsed.onlineEvents).toEqual([]);
    expect(parsed.interviews).toEqual([]);
    expect(result.decision).toBe("inconclusive_sample");
    expect(raw).not.toMatch(/@|email|name|phone/i);
  });
});
