import { describe, it, expect } from "vitest";

// Replicate generatePreviewHTML logic for unit testing
const BLOCK_ELEMENTS =
  "div|span|p|h[1-6]|section|article|nav|aside|header|footer|main|ul|ol|li|button|label|blockquote|pre|code|form|fieldset|figure|figcaption|details|summary|a|strong|em|time|address";

function generatePreviewHTML(code: string): string {
  return code
    .replace(/className=/g, "class=")
    .replace(/\{`([^`]*)`\}/g, "$1")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(
      new RegExp(
        `<(${BLOCK_ELEMENTS})((?:[^>"]+?|"[^"]*"|'[^']*')*?)\\s*\\/>`,
        "g"
      ),
      "<$1$2></$1>"
    )
    .trim();
}

describe("generatePreviewHTML", () => {
  it("should convert self-closing span to explicit close tag", () => {
    const input = '<span className="foo" />';
    const result = generatePreviewHTML(input);
    expect(result).toBe('<span class="foo"></span>');
  });

  it("should not touch void elements like img", () => {
    const input = '<img className="foo" src="bar" />';
    const result = generatePreviewHTML(input);
    expect(result).toContain('<img');
    expect(result).not.toContain('</img>');
  });

  it("should convert self-closing divs inside complex markup", () => {
    const input = '<div className="outer"><span className="inner" /></div>';
    const result = generatePreviewHTML(input);
    expect(result).toBe(
      '<div class="outer"><span class="inner"></span></div>'
    );
  });

  it("should NOT cross > boundaries — regression for magazine-grid card/hero bug", () => {
    // This is the exact pattern that caused the magazine-grid card component to break.
    // The regex was matching <article> all the way to a nested <img />'s />, replacing
    // the img's self-closing with </article>.
    const cardCode = `<article className="group flex flex-col gap-4 cursor-pointer">
  <a href="#" className="block">
    <div className="relative overflow-hidden rounded-lg">
      <img
        src="/placeholder.jpg"
        alt="Article thumbnail"
        className="w-full aspect-[16/10] object-cover"
      />
      <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase bg-red-600 text-white rounded">
        Featured
      </span>
    </div>
  </a>
</article>`;

    const result = generatePreviewHTML(cardCode);
    // Must NOT have </article> inserted inside the <img> tag
    expect(result).not.toContain("></article>");
    // Must preserve the img tag intact
    expect(result).toContain('<img');
    expect(result).toContain('/>');
    // Must properly close the article at the end
    expect(result).toContain("</article>");
  });

  it("should handle hero component with grid layout", () => {
    // Simplified hero component — has JSX comments and nested structures
    const heroCode = `<section className="py-8 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Category Nav */}
    <nav className="flex items-center gap-6">
      <a href="#" className="text-red-600">All</a>
    </nav>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <article className="md:col-span-2 lg:row-span-2 group">
        <img src="/placeholder.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </article>
    </div>
  </div>
</section>`;

    const result = generatePreviewHTML(heroCode);
    // Must not cross article tag boundaries
    expect(result).not.toContain("></article>");
    expect(result).not.toContain("></section>");
    // JSX comments should be removed
    expect(result).not.toContain("{/*");
    expect(result).not.toContain("*/}");
    // Should be valid HTML structure
    expect(result).toContain("<section");
    expect(result).toContain("</section>");
  });

  it("should correctly handle multiple self-closing span elements", () => {
    const input =
      '<div><span className="a" /><span className="b" /><span className="c" /></div>';
    const result = generatePreviewHTML(input);
    expect(result).toBe(
      '<div><span class="a"></span><span class="b"></span><span class="c"></span></div>'
    );
  });

  it("should handle single-quoted attributes", () => {
    // JSX allows single quotes for attributes
    const input = "<div className='foo' />";
    const result = generatePreviewHTML(input);
    expect(result).toBe("<div class='foo'></div>");
  });
});
