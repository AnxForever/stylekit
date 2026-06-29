import { describe, expect, it } from "vitest";

import { styles } from "@/lib/styles/registry";
import {
  REGISTRY_SCHEMA,
  toRegistryIndex,
} from "@/lib/registry/registry-index";

describe("toRegistryIndex", () => {
  it("builds an index over all provided styles", () => {
    const index = toRegistryIndex(styles);
    expect(index.$schema).toBe(REGISTRY_SCHEMA);
    expect(index.name).toBe("stylekit");
    expect(index.homepage).toMatch(/^https?:\/\//);
    expect(index.items).toHaveLength(styles.length);
  });

  it("emits lightweight metadata items (no cssVars in the index)", () => {
    const index = toRegistryIndex(styles);
    for (const item of index.items) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.type).toBe("registry:theme");
      expect(item.title.length).toBeGreaterThan(0);
      expect(typeof item.description).toBe("string");
      expect(item).not.toHaveProperty("cssVars");
      expect(item).not.toHaveProperty("files");
    }
  });

  it("includes a known style and honors a custom homepage", () => {
    const index = toRegistryIndex(styles, "http://localhost:3000");
    expect(index.homepage).toBe("http://localhost:3000");
    expect(index.items.some((i) => i.name === "glassmorphism")).toBe(true);
  });

  it("item names are unique", () => {
    const names = toRegistryIndex(styles).items.map((i) => i.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
