import { describe, expect, it } from "vitest";

import { getStyleBySlug, styles } from "@/lib/styles/registry";
import { generateShadcnTheme } from "@/lib/export/shadcn-theme";
import {
  REGISTRY_ITEM_SCHEMA,
  toRegistryItem,
  toRegistryItemJSON,
} from "@/lib/registry/to-registry-item";

// Bare HSL triplet, e.g. "0 0% 100%" or "220 15% 94%"
const HSL_RE = /^\d{1,3} \d{1,3}(\.\d+)?% \d{1,3}(\.\d+)?%$/;
const HEX6_RE = /^#[0-9a-fA-F]{6}$/;

describe("toRegistryItem", () => {
  const glass = getStyleBySlug("glassmorphism");
  // A style whose primary is a plain 6-digit hex — exercises the full,
  // brand-color-complete path. (glassmorphism uses rgba() for primary, so its
  // primary is sanitized away today; tracked by the theme-fidelity task.)
  const hexStyle = styles.find((s) => HEX6_RE.test(s.colors.primary));

  it("has fixtures available", () => {
    expect(glass).toBeDefined();
    expect(hexStyle).toBeDefined();
  });

  it("produces a shadcn registry:theme item with required fields", () => {
    const item = toRegistryItem(glass!);
    expect(item.$schema).toBe(REGISTRY_ITEM_SCHEMA);
    expect(item.name).toBe("glassmorphism");
    expect(item.type).toBe("registry:theme");
    expect(item.title.length).toBeGreaterThan(0);
    expect(item.description.length).toBeGreaterThan(0);
    expect(Array.isArray(item.files)).toBe(true);
  });

  it("always carries background and foreground in both modes", () => {
    for (const style of [glass!, hexStyle!]) {
      const item = toRegistryItem(style);
      for (const mode of ["light", "dark"] as const) {
        expect(item.cssVars[mode].background).toMatch(HSL_RE);
        expect(item.cssVars[mode].foreground).toMatch(HSL_RE);
      }
    }
  });

  it("emits brand colors as valid HSL when the source color is hex", () => {
    const item = toRegistryItem(hexStyle!);
    for (const key of ["primary", "secondary"] as const) {
      expect(item.cssVars.light[key]).toMatch(HSL_RE);
      expect(item.cssVars.dark[key]).toMatch(HSL_RE);
    }
  });

  it("derives hex colors with parity to generateShadcnTheme", () => {
    const theme = generateShadcnTheme(hexStyle!);
    const item = toRegistryItem(hexStyle!);
    expect(item.cssVars.light.primary).toBe(theme.cssVars.light.primary);
    expect(item.cssVars.dark.primary).toBe(theme.cssVars.dark.primary);
  });

  it("drops unparseable color tokens instead of emitting NaN", () => {
    // glassmorphism's primary is rgba(...), which the current theme generator
    // cannot convert to HSL, so it must be omitted rather than serialized as
    // "0 NaN% NaN%". Documents a known gap — see the theme-fidelity task.
    const item = toRegistryItem(glass!);
    expect(item.cssVars.light.primary).toBeUndefined();
  });

  it("serializes to valid JSON preserving identity", () => {
    const parsed = JSON.parse(toRegistryItemJSON(glass!));
    expect(parsed.name).toBe("glassmorphism");
    expect(parsed.type).toBe("registry:theme");
  });

  it("maps distinct styles to distinct item names", () => {
    expect(toRegistryItem(getStyleBySlug("glassmorphism")!).name).not.toBe(
      toRegistryItem(getStyleBySlug("neumorphism")!).name,
    );
  });

  // Hard contract: a registry item must never carry a malformed CSS value,
  // because shadcn injects cssVars verbatim into the consumer's stylesheet.
  it("never emits NaN/malformed cssVars for any registered style", () => {
    for (const style of styles) {
      const item = toRegistryItem(style);
      for (const mode of ["light", "dark"] as const) {
        for (const [key, value] of Object.entries(item.cssVars[mode])) {
          expect(value, `${style.slug}.${mode}.${key}`).not.toContain("NaN");
        }
      }
    }
  });
});
