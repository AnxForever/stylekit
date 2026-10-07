import { describe, expect, it } from "vitest";
import { getShadowById, shadows } from "@/lib/shadows";

describe("shadow catalogue identifiers", () => {
  it("keeps every shadow id unique", () => {
    const ids = shadows.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps tinted smooth slugs stable and exposes neutral variants by distinct ids", () => {
    const pairs = [
      {
        legacyId: "smooth-low",
        legacyValue:
          "0 1px 1.5px rgba(28,25,60,0.07), 0 2.7px 4px rgba(28,25,60,0.05), 0 6.5px 10px rgba(28,25,60,0.04), 0 12px 18px rgba(28,25,60,0.03)",
        neutralId: "smooth-neutral-low",
        neutralValue:
          "0 0.5px 0.6px rgba(0,0,0,0.07), 0 1.3px 1.6px -0.6px rgba(0,0,0,0.07), 0 2.9px 3.6px -1.2px rgba(0,0,0,0.07)",
      },
      {
        legacyId: "smooth-medium",
        legacyValue:
          "0 1px 1.5px rgba(28,25,60,0.06), 0 3px 4px rgba(28,25,60,0.05), 0 7px 10px rgba(28,25,60,0.04), 0 14px 20px rgba(28,25,60,0.035), 0 24px 36px rgba(28,25,60,0.03)",
        neutralId: "smooth-neutral-medium",
        neutralValue:
          "0 0.6px 0.7px rgba(0,0,0,0.07), 0 2px 2.5px -0.4px rgba(0,0,0,0.07), 0 3.8px 4.7px -0.8px rgba(0,0,0,0.07), 0 6.7px 8.4px -1.2px rgba(0,0,0,0.07), 0 11.5px 14.4px -1.7px rgba(0,0,0,0.07)",
      },
      {
        legacyId: "smooth-high",
        legacyValue:
          "0 1.4px 2px rgba(28,25,60,0.06), 0 3.5px 5px rgba(28,25,60,0.05), 0 8px 11px rgba(28,25,60,0.045), 0 15px 22px rgba(28,25,60,0.04), 0 28px 40px rgba(28,25,60,0.035), 0 50px 70px rgba(28,25,60,0.03)",
        neutralId: "smooth-neutral-high",
        neutralValue:
          "0 0.7px 0.8px rgba(0,0,0,0.06), 0 2.4px 3px -0.3px rgba(0,0,0,0.06), 0 4.5px 5.6px -0.6px rgba(0,0,0,0.06), 0 7.5px 9.4px -0.9px rgba(0,0,0,0.06), 0 12.3px 15.4px -1.2px rgba(0,0,0,0.06), 0 19.5px 24.4px -1.5px rgba(0,0,0,0.06), 0 30px 37.5px -1.8px rgba(0,0,0,0.06)",
      },
    ];

    for (const pair of pairs) {
      const legacyShadow = getShadowById(pair.legacyId);
      const neutralShadow = getShadowById(pair.neutralId);

      expect(legacyShadow?.value).toBe(pair.legacyValue);
      expect(neutralShadow?.value).toBe(pair.neutralValue);
      expect(legacyShadow?.value).not.toBe(neutralShadow?.value);
    }
  });
});
