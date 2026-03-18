import DOMPurify from "isomorphic-dompurify";

const PREVIEW_HTML_CONFIG: NonNullable<Parameters<typeof DOMPurify.sanitize>[1]> = {
  ALLOWED_TAGS: [
    // Structure
    "div", "span", "p", "section", "article", "nav", "aside",
    "header", "footer", "main", "figure", "figcaption",
    // Headings
    "h1", "h2", "h3", "h4", "h5", "h6",
    // Lists
    "ul", "ol", "li", "dl", "dt", "dd",
    // Text
    "a", "strong", "em", "b", "i", "u", "s", "small", "mark",
    "abbr", "time", "sub", "sup", "br", "hr", "wbr",
    // Code
    "pre", "code", "kbd", "samp", "var",
    // Quote
    "blockquote", "q", "cite",
    // Table
    "table", "thead", "tbody", "tfoot", "tr", "th", "td",
    "caption", "colgroup", "col",
    // Form (display only)
    "form", "fieldset", "legend", "label",
    "input", "textarea", "select", "option", "optgroup", "button",
    // Media (safe subset)
    "img", "picture", "source", "video", "audio",
    // Other
    "details", "summary", "dialog", "address",
  ],
  ALLOWED_ATTR: [
    "class", "style", "id", "type", "placeholder", "href", "src", "alt",
    "title", "role", "tabindex", "width", "height", "loading", "decoding",
    "name", "value", "disabled", "readonly", "checked", "selected",
    "for", "action", "method", "target", "rel",
    "colspan", "rowspan", "scope", "headers",
    "open", "datetime", "cite",
    // data-* is allowed by default in DOMPurify
    // aria-* attributes
    "aria-label", "aria-hidden", "aria-describedby", "aria-labelledby",
    "aria-expanded", "aria-controls", "aria-selected", "aria-current",
    "aria-live", "aria-atomic", "aria-busy",
  ],
  ALLOW_DATA_ATTR: true,
  ALLOW_ARIA_ATTR: true,
};

/**
 * Sanitize preview HTML using DOMPurify (DOM-based, not regex).
 * Strips all script execution vectors including inline event handlers,
 * javascript: URLs, data: URLs with HTML, and dangerous tags.
 */
export function sanitizePreviewHtml(html: string): string {
  if (!html) return "";
  return String(DOMPurify.sanitize(html, PREVIEW_HTML_CONFIG));
}

/**
 * Sanitize CSS to prevent data exfiltration via url(), @import, etc.
 * Strips potentially dangerous CSS constructs while preserving visual styles.
 */
export function sanitizeCss(css: string): string {
  if (!css) return "";

  return css
    // Remove @import rules (can load external resources)
    .replace(/@import\s+[^;]+;/gi, "")
    // Remove url() that reference external resources (keep data: for gradients etc.)
    .replace(
      /url\s*\(\s*(['"]?)\s*(?!data:image\/)(https?:|\/\/|ftp:)[^)]*\1\s*\)/gi,
      ""
    )
    // Remove expression() (IE CSS expressions)
    .replace(/expression\s*\([^)]*\)/gi, "")
    // Remove -moz-binding (XBL binding)
    .replace(/-moz-binding\s*:[^;]+;?/gi, "")
    // Remove behavior (IE htc)
    .replace(/behavior\s*:[^;]+;?/gi, "");
}
