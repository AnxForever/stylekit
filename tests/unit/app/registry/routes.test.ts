import { describe, expect, it } from "vitest";

import { GET as getItem } from "@/app/r/[name]/route";
import { GET as getIndex } from "@/app/registry.json/route";

function itemCall(name: string) {
  return getItem(new Request(`http://localhost/r/${name}`), {
    params: Promise.resolve({ name }),
  });
}

describe("GET /r/[name] (registry item)", () => {
  it("returns a registry:theme item for a known style, stripping .json", async () => {
    const res = await itemCall("glassmorphism.json");
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toContain("s-maxage");
    const body = await res.json();
    expect(body.name).toBe("glassmorphism");
    expect(body.type).toBe("registry:theme");
    expect(body.cssVars).toBeDefined();
  });

  it("also resolves without the .json suffix", async () => {
    const res = await itemCall("neumorphism");
    expect(res.status).toBe(200);
    expect((await res.json()).name).toBe("neumorphism");
  });

  it("resolves slugs case-insensitively", async () => {
    const res = await itemCall("Glassmorphism.json");
    expect(res.status).toBe(200);
    expect((await res.json()).name).toBe("glassmorphism");
  });

  it("404s for an unknown style", async () => {
    const res = await itemCall("does-not-exist.json");
    expect(res.status).toBe(404);
    expect((await res.json()).error).toContain("does-not-exist");
  });
});

describe("GET /registry.json (registry index)", () => {
  it("returns the stylekit index over many styles", async () => {
    const res = await getIndex();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.name).toBe("stylekit");
    expect(Array.isArray(body.items)).toBe(true);
    expect(body.items.length).toBeGreaterThan(50);
    expect(body.items[0]).toHaveProperty("title");
  });
});
