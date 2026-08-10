import { describe, expect, it } from "vitest";
import { prepareShowcaseSnapshot } from "@/lib/export/showcase-html";

describe("prepareShowcaseSnapshot", () => {
  it("keeps assets portable and reveals content after scripts are removed", () => {
    const html = [
      "<!doctype html>",
      "<html><head><link rel=\"modulepreload\" href=\"/chunk.js\"></head>",
      "<body>",
      '<section style="opacity:0;transform:translateY(16px);transition:opacity 0.7s">Showcase</section>',
      "<script>window.__NEXT_DATA__ = {};</script>",
      "</body></html>",
    ].join("");

    const snapshot = prepareShowcaseSnapshot(
      html,
      "https://www.stylekit.top/",
    );

    expect(snapshot).toContain('<base href="https://www.stylekit.top/">');
    expect(snapshot).toContain("data-stylekit-showcase-download");
    expect(snapshot).toContain("translateY(0)");
    expect(snapshot).not.toContain("modulepreload");
    expect(snapshot).not.toContain("__NEXT_DATA__");
  });

  it("escapes the injected base URL", () => {
    const snapshot = prepareShowcaseSnapshot(
      "<html><head></head><body></body></html>",
      'https://example.com/\" onload=\"alert(1)',
    );

    expect(snapshot).toContain('&quot; onload=&quot;alert(1');
    expect(snapshot).not.toContain('onload="alert(1)');
  });
});
