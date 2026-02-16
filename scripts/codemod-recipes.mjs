// Codemod: Convert recipe files to use createStyleRecipes()
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "lib/recipes");
const files = readdirSync(dir)
  .filter((f) => f.endsWith(".ts") && !["types.ts", "index.ts", "factory.ts"].includes(f) && !f.startsWith("__"))
  .map((f) => join(dir, f));

let converted = 0;
let skipped = 0;

for (const filePath of files) {
  const content = readFileSync(filePath, "utf-8");

  // Skip files already using createStyleRecipes
  if (content.includes("createStyleRecipes") && !content.includes('import type { StyleRecipes }')) {
    skipped++;
    continue;
  }

  // Must match the old pattern
  if (!content.includes('import type { StyleRecipes } from "./types"')) {
    console.log(`SKIP (no match): ${filePath.split("/").pop()}`);
    skipped++;
    continue;
  }

  let result = content;

  // 1. Replace import
  result = result.replace(
    'import type { StyleRecipes } from "./types";',
    'import { createStyleRecipes } from "./factory";'
  );

  // 2. Replace export pattern:
  //    export const xRecipes: StyleRecipes = {
  //      styleSlug: "xxx",
  //      styleName: "Xxx",
  //      recipes: {
  //    with:
  //    export const xRecipes = createStyleRecipes("xxx", "Xxx", {
  result = result.replace(
    /export const (\w+): StyleRecipes = \{\s*styleSlug:\s*"([^"]+)",\s*styleName:\s*"([^"]+)",\s*recipes:\s*\{/,
    'export const $1 = createStyleRecipes("$2", "$3", {'
  );

  // 3. Replace the final closing: two levels of }; -> });
  // The old pattern ends with:   },\n};  (closing recipes then StyleRecipes)
  // The new pattern ends with:   },\n});  (closing recipes then createStyleRecipes call)
  // Find the last },\n}; pattern
  const closingPattern = /\},\s*\n\};(\s*)$/;
  if (closingPattern.test(result)) {
    result = result.replace(closingPattern, "},\n});$1");
  } else {
    // Try simpler: just replace the very last };
    const lastSemicolon = result.lastIndexOf("};");
    if (lastSemicolon !== -1) {
      result = result.substring(0, lastSemicolon) + "});" + result.substring(lastSemicolon + 2);
    }
  }

  writeFileSync(filePath, result, "utf-8");
  converted++;
  console.log(`CONVERTED: ${filePath.split("/").pop()}`);
}

console.log(`\nDone: ${converted} converted, ${skipped} skipped`);
