import { describe, expect, it } from "vitest";
import { SHOWCASE_DOWNLOAD_REVEAL_STYLE } from "@/lib/export/showcase-html";

describe("showcase download styles", () => {
  it("reveals content whose animation scripts were removed", () => {
    expect(SHOWCASE_DOWNLOAD_REVEAL_STYLE).toContain("translateY(0)");
    expect(SHOWCASE_DOWNLOAD_REVEAL_STYLE).toContain("!important");
  });
});
