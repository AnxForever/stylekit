import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("style detail server boundary", () => {
  it("keeps frontend readiness outside the client component", () => {
    const serverSection = readFileSync(
      path.join(process.cwd(), "app/styles/[slug]/_readiness-section.tsx"),
      "utf8"
    );
    const clientContent = readFileSync(
      path.join(process.cwd(), "app/styles/[slug]/_content.tsx"),
      "utf8"
    );

    expect(serverSection).not.toMatch(/^\s*["']use client["']/m);
    expect(clientContent).toContain("readinessSection: ReactNode");
    expect(clientContent).not.toContain("readiness: FrontendReadinessProfile");
  });
});
