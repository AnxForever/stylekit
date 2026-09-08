// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";

import { fontPairings } from "@/lib/typography";
import { loadFontFaces, resetFontLoader, warmFonts } from "@/lib/typography/font-loader";

const allSpecs = fontPairings.flatMap((p) => [p.heading, p.body]);
const familyCount = new Set(allSpecs.map((s) => s.family)).size;

function stylesheets() {
  return [...document.head.querySelectorAll("link[data-stylekit-fonts]")] as HTMLLinkElement[];
}

async function settle(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

afterEach(() => {
  resetFontLoader();
  document.head.querySelectorAll("link").forEach((link) => link.remove());
});

describe("font loader", () => {
  it("batches the whole catalogue instead of one stylesheet per pairing", async () => {
    loadFontFaces(allSpecs);
    await settle(1200);

    const links = stylesheets();
    // One request per pairing is the regression this exists to prevent.
    expect(links.length).toBeLessThan(fontPairings.length / 3);
    expect(links.length).toBe(Math.ceil(familyCount / 8));
  });

  it("asks for every family exactly once across the batches", async () => {
    loadFontFaces(allSpecs);
    await settle(1200);

    const requested = stylesheets().flatMap((link) =>
      [...new URL(link.href).searchParams.getAll("family")].map((f) => f.split(":")[0]),
    );
    expect(new Set(requested).size).toBe(familyCount);
    expect(requested.length).toBe(familyCount);
  });

  it("ships the first batch immediately so the top of the wall is not last", async () => {
    loadFontFaces(allSpecs);
    await settle(0);
    expect(stylesheets().length).toBe(1);

    const first = new URL(stylesheets()[0].href).searchParams.getAll("family").join("&");
    expect(first).toContain(fontPairings[0].heading.family.replace(/ /g, "+"));
  });

  it("preconnects to the font hosts once", async () => {
    loadFontFaces(allSpecs);
    loadFontFaces(allSpecs);
    await settle(1200);
    expect(document.head.querySelectorAll('link[rel="preconnect"]').length).toBe(2);
  });

  it("does not re-inject on repeat calls", async () => {
    loadFontFaces(allSpecs);
    await settle(1200);
    const count = stylesheets().length;

    loadFontFaces(allSpecs);
    await settle(1200);
    expect(stylesheets().length).toBe(count);
  });

  it("warms a face at most once and never touches the DOM", async () => {
    const calls: string[] = [];
    // happy-dom has no CSS Font Loading API; stand one in.
    Object.defineProperty(document, "fonts", {
      configurable: true,
      value: {
        load: (spec: string) => {
          calls.push(spec);
          return Promise.resolve([]);
        },
      },
    });

    const pairing = fontPairings[0];
    warmFonts([pairing.heading, pairing.body]);
    warmFonts([pairing.heading, pairing.body]);
    await settle(50);

    expect(calls).toHaveLength(2);
    expect(calls[0]).toContain(pairing.heading.family);
    expect(stylesheets()).toHaveLength(0);
  });
});
