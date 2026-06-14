const BLOCK_ELEMENT_NAMES = new Set([
  "div",
  "span",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "section",
  "article",
  "nav",
  "aside",
  "header",
  "footer",
  "main",
  "ul",
  "ol",
  "li",
  "button",
  "label",
  "blockquote",
  "pre",
  "code",
  "form",
  "fieldset",
  "figure",
  "figcaption",
  "details",
  "summary",
  "a",
  "strong",
  "em",
  "time",
  "address",
]);

export function generatePreviewHTML(code: string): string {
  return closeSelfClosingBlockElements(
    code
      .replace(/className=/g, "class=")
      .replace(/\{`([^`]*)`\}/g, "$1")
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
  ).trim();
}

function closeSelfClosingBlockElements(html: string): string {
  let output = "";
  let cursor = 0;

  while (cursor < html.length) {
    const tagStart = html.indexOf("<", cursor);
    if (tagStart === -1) {
      output += html.slice(cursor);
      break;
    }

    output += html.slice(cursor, tagStart);

    const tagEnd = findTagEnd(html, tagStart + 1);
    if (tagEnd === -1) {
      output += html.slice(tagStart);
      break;
    }

    const tagContent = html.slice(tagStart + 1, tagEnd);
    const tagName = readTagName(tagContent);
    const slashIndex = findTrailingSlashIndex(tagContent);

    if (
      slashIndex !== -1 &&
      tagName &&
      BLOCK_ELEMENT_NAMES.has(tagName.toLowerCase())
    ) {
      const contentWithoutSlash = tagContent.slice(0, slashIndex).trimEnd();
      output += `<${contentWithoutSlash}></${tagName}>`;
    } else {
      output += html.slice(tagStart, tagEnd + 1);
    }

    cursor = tagEnd + 1;
  }

  return output;
}

function findTagEnd(html: string, start: number): number {
  let quote: string | null = null;

  for (let index = start; index < html.length; index += 1) {
    const char = html[index];

    if (quote) {
      if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "\"" || char === "'") {
      quote = char;
      continue;
    }

    if (char === ">") {
      return index;
    }
  }

  return -1;
}

function readTagName(tagContent: string): string | null {
  const match = tagContent.match(/^\s*([A-Za-z][A-Za-z0-9-]*)/);
  return match?.[1] ?? null;
}

function findTrailingSlashIndex(tagContent: string): number {
  for (let index = tagContent.length - 1; index >= 0; index -= 1) {
    const char = tagContent[index];
    if (/\s/.test(char)) {
      continue;
    }
    return char === "/" ? index : -1;
  }

  return -1;
}
