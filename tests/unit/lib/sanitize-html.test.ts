import { describe, expect, it } from "vitest";
import { sanitizePreviewHtml, sanitizeCss } from "@/lib/security/sanitize-html";

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

  it("neutralizes javascript urls", () => {
    const input =
      '<a href="javascript:alert(1)">bad</a><a href="https://stylekit.top">ok</a>';

    const output = sanitizePreviewHtml(input);
    expect(output).not.toContain("javascript:");
    expect(output).toContain("https://stylekit.top");
  });

  it("removes SVG-based XSS vectors", () => {
    const input = '<svg onload="alert(1)"><circle r="10"/></svg>';
    const output = sanitizePreviewHtml(input);
    expect(output).not.toContain("onload");
    expect(output).not.toContain("<svg");
  });

  it("removes img onerror XSS", () => {
    const input = '<img src="x" onerror="alert(1)">';
    const output = sanitizePreviewHtml(input);
    expect(output).not.toContain("onerror");
    expect(output).toContain("<img");
  });

  it("removes data: URLs in anchors", () => {
    const input =
      '<a href="data:text/html,<script>alert(1)</script>">xss</a>';
    const output = sanitizePreviewHtml(input);
    expect(output).not.toContain("data:");
  });

  it("preserves safe HTML structure", () => {
    const input =
      '<div class="card"><h2>Title</h2><p>Content</p><button type="button">Click</button></div>';
    const output = sanitizePreviewHtml(input);
    expect(output).toContain('<div class="card">');
    expect(output).toContain("<h2>Title</h2>");
    expect(output).toContain("<p>Content</p>");
    expect(output).toContain("<button");
  });

  it("returns empty string for empty input", () => {
    expect(sanitizePreviewHtml("")).toBe("");
    expect(sanitizePreviewHtml(null as unknown as string)).toBe("");
  });
});

describe("sanitizeCss", () => {
  it("removes @import rules", () => {
    const input = '@import url("https://evil.com/steal.css"); .card { color: red; }';
    const output = sanitizeCss(input);
    expect(output).not.toContain('@import url');
    expect(output).toContain(".card { color: red; }");
  });

  it("removes external url() references", () => {
    const input = ".card { background: url(https://evil.com/track.png); color: red; }";
    const output = sanitizeCss(input);
    expect(output).not.toContain("evil.com");
    expect(output).toContain("color: red;");
  });

  it("preserves data:image URLs", () => {
    const input = ".icon { background: url(data:image/svg+xml,...); }";
    const output = sanitizeCss(input);
    expect(output).toContain("data:image/svg+xml");
  });

  it("removes expression()", () => {
    const input = ".card { width: expression(document.body.clientWidth); }";
    const output = sanitizeCss(input);
    expect(output).not.toContain("expression(");
  });

  it("returns empty string for empty input", () => {
    expect(sanitizeCss("")).toBe("");
  });
});
