// Fix: Remove the extra }, from recipe files after codemod
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "lib/recipes");
const files = readdirSync(dir)
  .filter((f) => f.endsWith(".ts") && !["types.ts", "index.ts", "factory.ts", "renderer.ts"].includes(f) && !f.startsWith("__"))
  .map((f) => join(dir, f));

let fixed = 0;

for (const filePath of files) {
  const content = readFileSync(filePath, "utf-8");

  if (!content.includes("createStyleRecipes")) continue;

  // Handle mixed line endings: \r\n or \n
  // Pattern: ...,\r?\n  },\r?\n});\r?\n at end of file
  const fixed_content = content.replace(/,\r?\n  \},\r?\n\}\);(\s*)$/, ",\n});$1");

  if (fixed_content !== content) {
    writeFileSync(filePath, fixed_content, "utf-8");
    fixed++;
    console.log(`FIXED: ${filePath.split("/").pop()}`);
  }
}

console.log(`\nFixed ${fixed} files`);
