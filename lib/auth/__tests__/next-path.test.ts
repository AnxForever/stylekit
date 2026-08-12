import { describe, expect, it } from "vitest";
import { isSafeNextPath, sanitizeNextPath } from "@/lib/auth/next-path";

describe("next-path sanitization", () => {
  it.each(["//evil.example", "/\\evil.example", " /styles", "/styles\n"]) (
    "rejects unsafe redirect %j",
    (value) => {
      expect(sanitizeNextPath(value, "/styles")).toBe("/styles");
      expect(isSafeNextPath(value)).toBe(false);
    },
  );

  it("keeps a normal internal path", () => {
    expect(sanitizeNextPath("/styles/neo-brutalist?tab=showcase")).toBe(
      "/styles/neo-brutalist?tab=showcase",
    );
    expect(isSafeNextPath("/styles/neo-brutalist")).toBe(true);
  });
});
