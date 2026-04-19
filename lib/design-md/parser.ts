import matter from "gray-matter";
import {
  type DesignMdBlock,
  type DesignMdDocument,
  type DesignMdFrontmatter,
  type DesignMdSection,
  designMdFrontmatterSchema,
} from "./schema";

/**
 * DESIGN.md parser.
 * Accepts raw text (with optional YAML frontmatter) and returns a structured
 * DesignMdDocument. Parser is forgiving: invalid frontmatter is dropped, not
 * thrown, and unknown sections are kept as opaque blocks. Validation against
 * the StyleKit 11-section contract is a separate concern (see schema.ts
 * `assessDesignMdQuality`).
 */

const SECTION_HEADING_RE = /^##\s+(?:(\d+)\.\s+)?(.+?)\s*$/;
const SUB_HEADING_RE = /^(#{3,6})\s+(.+?)\s*$/;
const BULLET_RE = /^[-*]\s+/;
const TABLE_ROW_RE = /^\s*\|/;
const TABLE_SEPARATOR_RE = /^\s*\|[\s\-:|]+\|\s*$/;

export function parseDesignMd(raw: string): DesignMdDocument {
  const parsed = matter(raw);
  const frontmatter = safeParseFrontmatter(parsed.data);
  const body = parsed.content;

  const { title, sections } = splitSections(body);

  return {
    frontmatter,
    title,
    sections,
    rawBody: body,
  };
}

function safeParseFrontmatter(
  data: Record<string, unknown> | null | undefined
): DesignMdFrontmatter | null {
  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    return null;
  }
  const result = designMdFrontmatterSchema.safeParse(data);
  return result.success ? result.data : null;
}

interface SectionBuffer {
  number: number | null;
  title: string;
  lines: string[];
}

function splitSections(body: string): {
  title: string | null;
  sections: DesignMdSection[];
} {
  const lines = body.split(/\r?\n/);

  const titleIdx = lines.findIndex((line) => /^#\s/.test(line));
  const title = titleIdx !== -1 ? lines[titleIdx].replace(/^#\s+/, "").trim() : null;

  const buffers: SectionBuffer[] = [];
  let current: SectionBuffer | null = null;

  for (const line of lines) {
    const match = line.match(SECTION_HEADING_RE);
    if (match) {
      if (current) {
        buffers.push(current);
      }
      current = {
        number: match[1] ? Number.parseInt(match[1], 10) : null,
        title: match[2].trim(),
        lines: [],
      };
      continue;
    }
    if (current) {
      current.lines.push(line);
    }
  }
  if (current) {
    buffers.push(current);
  }

  const sections: DesignMdSection[] = buffers.map((buf) => ({
    number: buf.number,
    title: buf.title,
    rawBody: buf.lines.join("\n").trim(),
    blocks: parseBlocks(buf.lines),
  }));

  return { title, sections };
}

function parseBlocks(lines: string[]): DesignMdBlock[] {
  const blocks: DesignMdBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    const subMatch = line.match(SUB_HEADING_RE);
    if (subMatch) {
      blocks.push({
        type: "sub-heading",
        level: subMatch[1].length,
        text: subMatch[2].trim(),
      });
      i++;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      // skip closing fence if present
      if (i < lines.length) {
        i++;
      }
      blocks.push({
        type: "code",
        language,
        code: codeLines.join("\n"),
      });
      continue;
    }

    if (
      TABLE_ROW_RE.test(line) &&
      i + 1 < lines.length &&
      TABLE_SEPARATOR_RE.test(lines[i + 1])
    ) {
      const headers = splitTableRow(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && TABLE_ROW_RE.test(lines[i])) {
        rows.push(splitTableRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (BULLET_RE.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && BULLET_RE.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(BULLET_RE, ""));
        i++;
      }
      blocks.push({ type: "bullet-list", items });
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !SUB_HEADING_RE.test(lines[i]) &&
      !lines[i].trim().startsWith("```") &&
      !BULLET_RE.test(lines[i].trim()) &&
      !TABLE_ROW_RE.test(lines[i])
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", text: paraLines.join(" ") });
    }
  }

  return blocks;
}

function splitTableRow(row: string): string[] {
  // Drop leading/trailing pipe artifacts, trim each cell.
  const cells = row.split("|").map((cell) => cell.trim());
  if (cells[0] === "") cells.shift();
  if (cells[cells.length - 1] === "") cells.pop();
  return cells;
}
