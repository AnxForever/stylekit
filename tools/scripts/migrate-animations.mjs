#!/usr/bin/env node
/**
 * migrate-animations.mjs
 *
 * Batch-migrates flat-file animations to directory-based structure.
 * For each animation slug:
 *   1. Creates lib/animations/{slug}/ directory
 *   2. Moves flat file to _legacy/{slug}.ts (fixes import path)
 *   3. Generates meta.ts from the Animation object fields
 *   4. Moves preview to {slug}/preview.tsx (updates import path)
 *   5. Creates index.ts that re-exports from _legacy for codeSnippets
 *
 * Usage: node tools/scripts/migrate-animations.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync, readdirSync } from "fs";
import { join, basename } from "path";

const ANIM_DIR = "lib/animations";
const LEGACY_DIR = join(ANIM_DIR, "_legacy");
const PREVIEW_DIR = join(ANIM_DIR, "previews");

// Already migrated directories — skip these
const SKIP = new Set(["_legacy", "previews", "scroll-page-turn", "scroll-peel-away", "flip-card"]);

// Discover slugs from flat .ts files (exclude types, index, meta)
const EXCLUDE_FILES = new Set(["types.ts", "index.ts", "meta.ts"]);

function discoverSlugs() {
  const files = readdirSync(ANIM_DIR).filter(
    (f) => f.endsWith(".ts") && !EXCLUDE_FILES.has(f) && !f.startsWith("_")
  );
  return files.map((f) => f.replace(".ts", ""));
}

function toPascalCase(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function toCamelCase(slug) {
  const parts = slug.split("-");
  return parts[0] + parts.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

function migrateOne(slug) {
  const flatFile = join(ANIM_DIR, `${slug}.ts`);
  const previewFile = join(PREVIEW_DIR, `${slug}-preview.tsx`);
  const targetDir = join(ANIM_DIR, slug);
  const legacyFile = join(LEGACY_DIR, `${slug}.ts`);

  if (!existsSync(flatFile)) {
    console.log(`  SKIP ${slug}: flat file not found`);
    return false;
  }

  // 1. Create directory
  mkdirSync(targetDir, { recursive: true });

  // 2. Move flat file to _legacy, fix import path
  let flatContent = readFileSync(flatFile, "utf-8");
  flatContent = flatContent.replace(
    /from ["']\.\/types["']/,
    'from "../types"'
  );
  writeFileSync(legacyFile, flatContent);

  // 3. Extract metadata fields from flat file to generate meta.ts
  const camel = toCamelCase(slug);
  const metaName = `${camel}Meta`;

  // Parse key fields from the flat file using regex
  const extract = (field) => {
    const re = new RegExp(`${field}:\\s*([\\s\\S]*?)(?=,\\n\\s{2}\\w|\\n\\};)`, "m");
    const m = flatContent.match(re);
    return m ? m[1].trim().replace(/,$/, "") : null;
  };

  const name = extract("name")?.replace(/^"/, "").replace(/"$/, "") || slug;
  const nameEn = extract("nameEn")?.replace(/^"/, "").replace(/"$/, "") || slug;
  const description = extract("description");
  const category = extract("category");
  const tags = extract("tags");
  const trigger = extract("trigger");
  const difficulty = extract("difficulty");
  const duration = extract("duration");
  const keywords = extract("keywords");

  const metaContent = `import type { AnimationMeta } from "../types";

export const ${metaName}: AnimationMeta = {
  slug: "${slug}",
  name: ${name.startsWith('"') ? name : `"${name}"`},
  nameEn: ${nameEn.startsWith('"') ? nameEn : `"${nameEn}"`},
  description: ${description || `"${slug}"`},
  category: ${category || '"entrance"'},
  tags: ${tags || "[]"},
  trigger: ${trigger || '"on-mount"'},
  difficulty: ${difficulty || '"beginner"'},
  duration: ${duration || '"500ms"'},
  keywords: ${keywords || "[]"},
};
`;
  writeFileSync(join(targetDir, "meta.ts"), metaContent);

  // 4. Move preview if it exists
  if (existsSync(previewFile)) {
    let previewContent = readFileSync(previewFile, "utf-8");
    // Update import path for _shared
    previewContent = previewContent.replace(
      /from ["']\.\/\_shared["']/,
      'from "../previews/_shared"'
    );
    writeFileSync(join(targetDir, "preview.tsx"), previewContent);
  }

  // 5. Create index.ts
  const indexContent = `/**
 * ${slug} — directory-based animation
 */

export { ${metaName} } from "./meta";

import type { Animation } from "../types";
import { ${metaName} } from "./meta";
import { ${camel} as _legacy } from "../_legacy/${slug}";

export const ${camel}: Animation = {
  ..._legacy,
};
`;
  writeFileSync(join(targetDir, "index.ts"), indexContent);

  return true;
}

// Main
console.log("Discovering animations to migrate...");
const slugs = discoverSlugs();
console.log(`Found ${slugs.length} flat-file animations.\n`);

mkdirSync(LEGACY_DIR, { recursive: true });

let migrated = 0;
for (const slug of slugs) {
  process.stdout.write(`Migrating ${slug}...`);
  if (migrateOne(slug)) {
    console.log(" OK");
    migrated++;
  }
}

console.log(`\nDone. Migrated ${migrated}/${slugs.length} animations.`);
console.log("\nNext steps:");
console.log("  1. Delete old flat files: rm lib/animations/*.ts (keep types.ts, index.ts, meta.ts)");
console.log("  2. Delete old preview files: rm lib/animations/previews/*-preview.tsx");
console.log("  3. Update lib/animations/index.ts imports");
console.log("  4. Run: npx tsc --noEmit && npm run build");
