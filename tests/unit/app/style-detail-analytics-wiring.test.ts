import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("style detail analytics wiring", () => {
  const source = readFileSync(
    path.join(process.cwd(), "app/styles/[slug]/_content.tsx"),
    "utf8"
  );
  const downloadButton = readFileSync(
    path.join(process.cwd(), "components/showcase/showcase-download-button.tsx"),
    "utf8"
  );

  it("tracks the remaining showcase entry point and download separately", () => {
    expect(source).toContain('source: "preview_card"');
    expect(source.match(/trackEvent\("showcase_open"/g)).toHaveLength(1);
    expect(downloadButton).toContain('trackEvent("style_export", { slug, format: "showcase-zip" })');
  });

  it("threads the current style slug into the component code preview", () => {
    expect(source).toContain("styleSlug={style.slug}");
  });

  it("records each style view through one analytics path", () => {
    expect(source.match(/trackEvent\("style_view"/g)).toHaveLength(1);
    expect(source).not.toContain('fetch("/api/analytics"');
  });
});
