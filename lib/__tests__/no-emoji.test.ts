import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const EMOJI_REGEX = /\p{Extended_Pictographic}/u;
const VARIATION_SELECTOR_REGEX = /\uFE0F/u;

const INCLUDED_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".svg",
  ".css",
  ".txt",
  ".html",
]);

function toCodePoints(value: string): string {
  return Array.from(value)
    .map((ch) => `U+${(ch.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}`)
    .join(" ");
}

function collectFiles(entryPath: string, out: string[]) {
  const stat = statSync(entryPath);
  if (stat.isDirectory()) {
    for (const entry of readdirSync(entryPath, { withFileTypes: true })) {
      collectFiles(path.join(entryPath, entry.name), out);
    }
    return;
  }

  if (!stat.isFile()) return;
  const ext = path.extname(entryPath);
  if (!INCLUDED_EXTENSIONS.has(ext)) return;

  out.push(entryPath);
}

describe("unicode policy", () => {
  it("contains no emoji characters (project rule)", () => {
    const repoRoot = process.cwd();

    const scanTargets = [
      "app",
      "components",
      "lib",
      "docs",
      "public",
      "cli",
      "scripts",
      "mcp",
      "README.md",
      "CLAUDE.md",
      "AI-ICON-WORKFLOW-TUTORIAL.md",
      "NEO-BRUTALIST-GUIDE.md",
      "trae-rules.md",
      "proxy.ts",
      "next.config.ts",
      "eslint.config.mjs",
      "vitest.config.ts",
      "vitest.setup.ts",
      "package.json",
      "tsconfig.json",
    ]
      .map((p) => path.join(repoRoot, p))
      .filter((p) => {
        try {
          statSync(p);
          return true;
        } catch {
          return false;
        }
      });

    const files: string[] = [];
    for (const target of scanTargets) collectFiles(target, files);

    const violations: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      const emojiMatch = text.match(EMOJI_REGEX)?.[0];
      const vsMatch = text.match(VARIATION_SELECTOR_REGEX)?.[0];

      const firstMatch = emojiMatch ?? vsMatch;
      if (!firstMatch) continue;

      violations.push(
        `${path.relative(repoRoot, file)} contains ${toCodePoints(firstMatch)}`
      );
    }

    expect(violations).toEqual([]);
  });
});

