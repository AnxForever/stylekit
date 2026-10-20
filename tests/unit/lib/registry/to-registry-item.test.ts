import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { compile as compileTailwind } from "tailwindcss";

import { getStyleBySlug, styles } from "@/lib/styles/registry";
import { generateShadcnTheme } from "@/lib/export/shadcn-theme";
import {
  REGISTRY_ITEM_SCHEMA,
  toRegistryItem,
  toRegistryItemJSON,
} from "@/lib/registry/to-registry-item";

// Registry cssVars contain CSS colors. HSL alpha is optional but normalized.
const CSS_HSL_RE = /^hsl\(\d{1,3}(?:\.\d+)? \d{1,3}(?:\.\d+)?% \d{1,3}(?:\.\d+)?%(?: \/ (?:0(?:\.\d+)?|1(?:\.0+)?|(?:\d{1,2}(?:\.\d+)?|100)%))?\)$/;
const HEX6_RE = /^#[0-9a-fA-F]{6}$/;
const require = createRequire(import.meta.url);

describe("toRegistryItem", () => {
  const glass = getStyleBySlug("glassmorphism");
  // A style whose primary is a plain 6-digit hex — exercises the full,
  // brand-color-complete path.
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
        expect(item.cssVars[mode].background).toMatch(CSS_HSL_RE);
        expect(item.cssVars[mode].foreground).toMatch(CSS_HSL_RE);
      }
    }
  });

  it("emits brand colors as valid CSS HSL when the source color is hex", () => {
    const item = toRegistryItem(hexStyle!);
    for (const key of ["primary", "secondary"] as const) {
      expect(item.cssVars.light[key]).toMatch(CSS_HSL_RE);
      expect(item.cssVars.dark[key]).toMatch(CSS_HSL_RE);
    }
  });

  it("derives hex colors with parity to generateShadcnTheme", () => {
    const theme = generateShadcnTheme(hexStyle!);
    const item = toRegistryItem(hexStyle!);
    expect(item.cssVars.light.primary).toBe(`hsl(${theme.cssVars.light.primary})`);
    expect(item.cssVars.dark.primary).toBe(`hsl(${theme.cssVars.dark.primary})`);
  });

  it("resolves glassmorphism's rgba primary (theme-fidelity fix)", () => {
    // Registry items need CSS color values, so internal HSL components are
    // projected to `hsl(...)` while retaining the alpha channel.
    const item = toRegistryItem(glass!);
    expect(item.cssVars.light.primary).toBeDefined();
    expect(item.cssVars.light.primary).toMatch(CSS_HSL_RE);
  });

  it("consumes an alpha registry color through a real Tailwind v4 utility", async () => {
    const item = toRegistryItem(glass!);
    const background = item.cssVars.light.background;
    expect(background).toMatch(/^hsl\(0 0% 100% \/ 0\.08\)$/);

    const css = `@import "tailwindcss";\n@theme inline { --color-background: var(--background); }\n:root { --background: ${background}; }`;
    const compiler = await compileTailwind(css, {
      base: process.cwd(),
      loadStylesheet: async (id, base) => {
        const path = id === "tailwindcss"
          ? require.resolve("tailwindcss/index.css", { paths: [base] })
          : require.resolve(id, { paths: [base] });
        return { path, base: dirname(path), content: await readFile(path, "utf8") };
      },
    });
    const output = compiler.build(["bg-background"]);

    expect(output).toContain(`--background: ${background};`);
    expect(output).toMatch(/\.bg-background\s*\{\s*background-color:\s*var\(--background\);/);
    expect(output).not.toContain("NaN");
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

  // Hard contract: a registry item must never carry malformed CSS values,
  // because shadcn injects cssVars directly into the consumer's stylesheet.
  it("never emits NaN/malformed CSS colors for any registered style", () => {
    for (const style of styles) {
      const item = toRegistryItem(style);
      for (const mode of ["light", "dark"] as const) {
        for (const [key, value] of Object.entries(item.cssVars[mode])) {
          expect(value, `${style.slug}.${mode}.${key}`).not.toContain("NaN");
          if (key === "radius") expect(value, `${style.slug}.${mode}.${key}`).toMatch(/^(?:\d+(?:\.\d+)?(?:px|rem)|9999px)$/);
          else expect(value, `${style.slug}.${mode}.${key}`).toMatch(CSS_HSL_RE);
        }
      }
    }
  });
});
