import { describe, expect, it } from "vitest";

import { isMobileBottomNavVisible } from "@/lib/mobile-navigation";

describe("mobile bottom navigation visibility", () => {
  it("keeps the four primary destinations available through the bottom tabs", () => {
    expect(isMobileBottomNavVisible("/zh")).toBe(true);
    expect(isMobileBottomNavVisible("/en/styles/editorial")).toBe(true);
    expect(isMobileBottomNavVisible("/templates/saas")).toBe(true);
  });

  it("keeps mobile menu shortcuts available when the bottom tabs are suppressed", () => {
    for (const pathname of [
      "/admin",
      "/admin/users",
      "/experiments/webgl-lab",
      "/zh/validation/corporate-clean-saas",
      "/workspace/project-123",
    ]) {
      expect(isMobileBottomNavVisible(pathname)).toBe(false);
    }
  });

  it("matches route segments without hiding similarly named public routes", () => {
    expect(isMobileBottomNavVisible("/administrator")).toBe(true);
    expect(isMobileBottomNavVisible("/workspaces")).toBe(true);
    expect(isMobileBottomNavVisible("/experiment-gallery")).toBe(true);
  });
});
