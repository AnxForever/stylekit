// Codemod: Convert *-tokens.ts files to use createStyleTokens()
import { readFileSync, writeFileSync } from "fs";
import { globSync } from "fs";
import { readdirSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "lib/styles");
const files = readdirSync(dir)
  .filter((f) => f.endsWith("-tokens.ts") && !f.startsWith("__"))
  .map((f) => join(dir, f));

let converted = 0;
let skipped = 0;

for (const filePath of files) {
  const content = readFileSync(filePath, "utf-8");

  // Skip files already using createStyleTokens
  if (content.includes("createStyleTokens")) {
    skipped++;
    continue;
  }

  // Must match the old pattern
  if (!content.includes('import type { StyleTokens } from "./tokens"')) {
    console.log(`SKIP (no match): ${filePath}`);
    skipped++;
    continue;
  }

  let result = content;

  // 1. Replace import
  result = result.replace(
    'import type { StyleTokens } from "./tokens";',
    'import { createStyleTokens } from "./token-defaults";'
  );

  // 2. Replace export const xTokens: StyleTokens = { with export const xTokens = createStyleTokens({
  result = result.replace(
    /export const (\w+): StyleTokens = \{/,
    "export const $1 = createStyleTokens({"
  );

  // 3. Replace the final closing }; with });
  // Find the last occurrence of };\n (the export object closing)
  const lastSemicolon = result.lastIndexOf("};");
  if (lastSemicolon !== -1) {
    result = result.substring(0, lastSemicolon) + "});" + result.substring(lastSemicolon + 2);
  }

  writeFileSync(filePath, result, "utf-8");
  converted++;
  console.log(`CONVERTED: ${filePath.split("/").pop()}`);
}

console.log(`\nDone: ${converted} converted, ${skipped} skipped`);
