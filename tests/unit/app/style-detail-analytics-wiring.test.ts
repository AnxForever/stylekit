import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("style detail analytics wiring", () => {
  const source = readFileSync(
    path.join(process.cwd(), "app/styles/[slug]/_content.tsx"),
    "utf8"
  );

  it("tracks the preview-card showcase entry point", () => {
    // The hero "View Showcase" link moved into <ShowcaseDownloadButton> when
    // the hero CTA became a snapshot download, so the detail page itself now
    // has a single showcase_open source: the live preview card.
    expect(source).toContain('source: "preview_card"');
    expect(source.match(/trackEvent\("showcase_open"/g)).toHaveLength(1);
  });

  it("tracks the hero showcase download entry point", () => {
    const downloadButton = readFileSync(
      path.join(process.cwd(), "components/showcase/showcase-download-button.tsx"),
      "utf8"
    );
    // The hero entry point now downloads a snapshot rather than opening the
    // showcase; that action is what carries analytics from the hero.
    expect(downloadButton).toContain('trackEvent("style_export"');
  });

  it("threads the current style slug into the component code preview", () => {
    expect(source).toContain("styleSlug={style.slug}");
  });

  it("records each style view through one analytics path", () => {
    expect(source.match(/trackEvent\("style_view"/g)).toHaveLength(1);
    expect(source).not.toContain('fetch("/api/analytics"');
  });
});
