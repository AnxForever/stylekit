import { describe, expect, it } from "vitest";
import { isSafeNextPath, sanitizeNextPath } from "@/lib/auth/next-path";

describe("sanitizeNextPath", () => {
  it("keeps ordinary in-app paths", () => {
    expect(sanitizeNextPath("/profile")).toBe("/profile");
    expect(sanitizeNextPath("/styles/glassmorphism?tab=tokens")).toBe(
      "/styles/glassmorphism?tab=tokens"
    );
    expect(sanitizeNextPath("/workspace#section")).toBe("/workspace#section");
  });

  it("rejects protocol-relative paths that navigate off-site", () => {
    // `window.location.href = "//evil.com"` leaves the origin entirely, even
    // though the value starts with a slash.
    expect(sanitizeNextPath("//evil.com")).toBe("/styles");
    expect(sanitizeNextPath("//evil.com/phish")).toBe("/styles");
  });

  it("rejects backslash variants, which browsers normalize to slashes", () => {
    expect(sanitizeNextPath("/\\evil.com")).toBe("/styles");
    expect(sanitizeNextPath("/\\/evil.com")).toBe("/styles");
  });

  it("rejects absolute URLs and non-path values", () => {
    expect(sanitizeNextPath("https://evil.com")).toBe("/styles");
    expect(sanitizeNextPath("javascript:alert(1)")).toBe("/styles");
    expect(sanitizeNextPath("dashboard")).toBe("/styles");
    expect(sanitizeNextPath("")).toBe("/styles");
    expect(sanitizeNextPath(null)).toBe("/styles");
    expect(sanitizeNextPath(undefined)).toBe("/styles");
  });

  it("rejects control characters and whitespace used to smuggle a scheme", () => {
    expect(sanitizeNextPath("/\tevil")).toBe("/styles");
    expect(sanitizeNextPath("/ evil")).toBe("/styles");
    expect(sanitizeNextPath("/\nevil")).toBe("/styles");
  });

  it("honours a caller-supplied fallback", () => {
    expect(sanitizeNextPath("//evil.com", "/")).toBe("/");
    expect(sanitizeNextPath(null, "/admin")).toBe("/admin");
  });

  it("exposes the predicate used by callers that branch on validity", () => {
    expect(isSafeNextPath("/profile")).toBe(true);
    expect(isSafeNextPath("//evil.com")).toBe(false);
  });
});
