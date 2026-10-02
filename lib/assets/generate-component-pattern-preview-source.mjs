import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, "../..");
const inputPath = path.join(root, "components/component-patterns/pattern-previews.tsx");
const outputPath = path.join(directory, "component-pattern-preview-source.generated.ts");
const newline = String.fromCharCode(10);
const crlf = String.fromCharCode(13) + newline;

const input = (await readFile(inputPath, "utf8")).split(crlf).join(newline);
const output = input
  .split(newline)
  .filter((line) => line !== 'import type { ComponentPatternPreviewId } from "@/lib/component-patterns";')
  .join(newline)
  .replaceAll("ComponentPatternPreviewId", "string");
const generated = [
  "// Generated from components/component-patterns/pattern-previews.tsx. Run this file after editing that source.",
  `export const componentPatternPreviewSource = ${JSON.stringify(output)} as const;`,
  "",
].join(newline);

if (process.argv.includes("--check")) {
  const existing = await readFile(outputPath, "utf8").catch(() => "");
  if (existing !== generated) {
    console.error("Generated component-pattern preview source is stale.");
    process.exitCode = 1;
  }
} else {
  await writeFile(outputPath, generated, "utf8");
}