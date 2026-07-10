import { describe, expect, it } from "vitest";
import { auditProductTruth } from "@/lib/product-truth/audit";

describe("public product truth", () => {
  it("keeps documented routes, redirects, and install commands aligned with working capabilities", async () => {
    const report = await auditProductTruth(process.cwd());

    expect(report.issues).toEqual([]);
  });
});
