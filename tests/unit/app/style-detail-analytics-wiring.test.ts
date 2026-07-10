import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("style detail analytics wiring", () => {
  const source = readFileSync(
    path.join(process.cwd(), "app/styles/[slug]/_content.tsx"),
    "utf8"
  );

  it("tracks both existing showcase entry points with distinct sources", () => {
    expect(source).toContain(
      'trackEvent("showcase_open", { slug: style.slug, source: "hero" })'
    );
    expect(source).toContain('source: "preview_card"');
    expect(source.match(/trackEvent\("showcase_open"/g)).toHaveLength(2);
  });

  it("threads the current style slug into the component code preview", () => {
    expect(source).toContain("styleSlug={style.slug}");
  });

  it("records each style view through one analytics path", () => {
    expect(source.match(/trackEvent\("style_view"/g)).toHaveLength(1);
    expect(source).not.toContain('fetch("/api/analytics"');
  });
});
