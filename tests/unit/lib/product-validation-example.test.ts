import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  evaluateProductValidation,
  productValidationBundleSchema,
} from "@/lib/product-validation";

describe("product validation example", () => {
  it("is valid, anonymous, and cannot authorize Pack 1", () => {
    const raw = readFileSync(
      path.join(
        process.cwd(),
        "docs/examples/product-validation-empty.json",
      ),
      "utf8",
    );
    const parsed = productValidationBundleSchema.parse(JSON.parse(raw));
    const result = evaluateProductValidation(parsed);

    expect(parsed.participants).toEqual([]);
    expect(parsed.onlineEvents).toEqual([]);
    expect(parsed.interviews).toEqual([]);
    expect(result.decision).toBe("inconclusive_sample");
    expect(raw).not.toMatch(/@|email|name|phone/i);
  });
});
