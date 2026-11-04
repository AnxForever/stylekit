import { describe, expect, it } from "vitest";
import { parseDesignMarkdown, parseInline } from "@/lib/design-spec/parse-markdown";

describe("parseInline", () => {
  it("splits bold and code spans", () => {
    expect(parseInline("**Base unit:** `16px`")).toEqual([
      { type: "strong", children: [{ type: "text", value: "Base unit:" }] },
      { type: "text", value: " " },
      { type: "code", value: "16px" },
    ]);
  });

  it("keeps a lone marker as text", () => {
    expect(parseInline("a ** b")).toEqual([{ type: "text", value: "a ** b" }]);
  });

  it("parses code inside bold", () => {
    expect(parseInline("**`\"ss01\" on`**")).toEqual([
      { type: "strong", children: [{ type: "code", value: "\"ss01\" on" }] },
    ]);
  });
});

describe("parseDesignMarkdown", () => {
  it("reads headings, quotes and paragraphs", () => {
    const blocks = parseDesignMarkdown(
      ["# Apple Style — Style Reference", "> Quiet surfaces, precise type.", "**Theme:** light", "", "Body copy."].join(
        "\n",
      ),
    );

    expect(blocks).toEqual([
      { type: "heading", level: 1, text: "Apple Style — Style Reference" },
      { type: "blockquote", text: "Quiet surfaces, precise type." },
      { type: "paragraph", text: "**Theme:** light" },
      { type: "paragraph", text: "Body copy." },
    ]);
  });

  it("reads a table and keeps escaped pipes inside a cell", () => {
    const blocks = parseDesignMarkdown(
      [
        "| Name | Value | Role |",
        "|---|---|---|",
        "| Ink | `#111111` | Text a \\| b |",
        "| Canvas | `#ffffff` | Surface |",
      ].join("\n"),
    );

    expect(blocks).toEqual([
      {
        type: "table",
        headers: ["Name", "Value", "Role"],
        rows: [
          ["Ink", "`#111111`", "Text a | b"],
          ["Canvas", "`#ffffff`", "Surface"],
        ],
      },
    ]);
  });

  it("reads ordered and unordered lists", () => {
    const blocks = parseDesignMarkdown(
      ["- **Substitute:** system-ui", "- **Weights:** 400, 600", "", "1. First prompt", "2. Second prompt"].join(
        "\n",
      ),
    );

    expect(blocks).toEqual([
      {
        type: "list",
        ordered: false,
        items: ["**Substitute:** system-ui", "**Weights:** 400, 600"],
      },
      { type: "list", ordered: true, items: ["First prompt", "Second prompt"] },
    ]);
  });

  it("keeps a fenced block verbatim", () => {
    const blocks = parseDesignMarkdown(
      ["```html", '<div class="x">a | b</div>', "```"].join("\n"),
    );

    expect(blocks).toEqual([
      { type: "code", language: "html", code: '<div class="x">a | b</div>' },
    ]);
  });

  it("joins wrapped paragraph lines with a space", () => {
    const blocks = parseDesignMarkdown(
      ["**Base unit:** 16px", "**Density:** comfortable"].join("\n"),
    );

    expect(blocks).toEqual([
      { type: "paragraph", text: "**Base unit:** 16px **Density:** comfortable" },
    ]);
  });
});
