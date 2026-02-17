import { describe, expect, it } from "vitest";
import { sanitizePreviewHtml } from "@/lib/security/sanitize-html";

describe("sanitizePreviewHtml", () => {
  it("removes dangerous tags and event handlers", () => {
    const input =
      '<div onclick="alert(1)"><script>alert(1)</script><iframe src="/x"></iframe><p>safe</p></div>';

    const output = sanitizePreviewHtml(input);
    expect(output).not.toContain("<script");
    expect(output).not.toContain("<iframe");
    expect(output).not.toContain("onclick=");
    expect(output).toContain("<p>safe</p>");
  });

  it("neutralizes javascript urls while preserving safe links", () => {
    const input =
      '<a href="javascript:alert(1)">bad</a><img src="javascript:alert(1)" /><a href="https://stylekit.top">ok</a>';

    const output = sanitizePreviewHtml(input);
    expect(output).toContain('<a href="#">bad</a>');
    expect(output).toContain('<img src="#" />');
    expect(output).toContain('<a href="https://stylekit.top">ok</a>');
  });
});
