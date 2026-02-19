/**
 * Auto-Register Module
 *
 * Writes scaffold files to the filesystem and patches registry files
 * so that an approved community submission becomes a registered style.
 */

import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { SubmissionRecord } from "./reviewer";
import {
  generateStyleScaffoldFiles,
  slugToExportName,
  type StyleScaffoldInput,
} from "@/lib/scaffold/style-scaffold";
import type { StyleCategory, StyleTag, StyleType } from "@/lib/styles/meta";

export interface AutoRegisterResult {
  success: boolean;
  filesWritten: string[];
  registriesPatched: string[];
  errors: string[];
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export async function autoRegisterStyle(
  submission: SubmissionRecord,
): Promise<AutoRegisterResult> {
  const result: AutoRegisterResult = {
    success: false,
    filesWritten: [],
    registriesPatched: [],
    errors: [],
  };

  const scaffoldInput = buildScaffoldInput(submission);
  const files = generateStyleScaffoldFiles(scaffoldInput);
  const root = process.cwd();

  // 1. Write generated files --------------------------------------------------
  for (const file of files) {
    const absPath = path.join(root, file.name);
    const dir = path.dirname(absPath);

    try {
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
      await writeFile(absPath, file.content, "utf-8");
      result.filesWritten.push(file.name);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      result.errors.push(`Failed to write ${file.name}: ${message}`);
    }
  }

  // 2. Patch registry files ---------------------------------------------------
  const slug = scaffoldInput.slug;
  const exportName = slugToExportName(slug);
  const tokensExportName = `${exportName}Tokens`;
  const recipesExportName = `${exportName}Recipes`;

  await patchMeta(root, slug, scaffoldInput, result);
  await patchStylesIndex(root, slug, exportName, result);
  await patchTokensRegistry(root, slug, tokensExportName, result);
  await patchRecipesIndex(root, slug, recipesExportName, result);
  await patchStyleComponents(root, slug, scaffoldInput, result);

  result.success = result.errors.length === 0;
  return result;
}

// ---------------------------------------------------------------------------
// Build scaffold input from submission form data
// ---------------------------------------------------------------------------

function buildScaffoldInput(submission: SubmissionRecord): StyleScaffoldInput {
  const fd = submission.formData ?? {};

  const slug = submission.slug || String(fd.slug ?? "unknown-style");
  const name = String(fd.name ?? fd.nameEn ?? slug);
  const nameEn = String(fd.nameEn ?? fd.name ?? slug);
  const description = String(fd.description ?? "");
  const category = (String(fd.category ?? "modern") as StyleCategory);
  const styleType = (String(fd.styleType ?? "visual") as StyleType);
  const tags = Array.isArray(fd.tags) ? fd.tags.map(String) as StyleTag[] : ["modern" as StyleTag];
  const primaryColor = String(fd.primaryColor ?? "#000000");
  const secondaryColor = String(fd.secondaryColor ?? "#ffffff");
  const accentColors = Array.isArray(fd.accentColors)
    ? fd.accentColors.map(String)
    : [];
  const keywords = Array.isArray(fd.keywords)
    ? fd.keywords.map(String)
    : [];
  const philosophy = String(fd.philosophy ?? "");
  const doList = Array.isArray(fd.doList) ? fd.doList.map(String) : [];
  const dontList = Array.isArray(fd.dontList) ? fd.dontList.map(String) : [];
  const buttonCode = String(fd.buttonCode ?? "");
  const cardCode = String(fd.cardCode ?? "");
  const inputCode = String(fd.inputCode ?? "");

  return {
    name,
    nameEn,
    slug,
    description,
    category,
    styleType,
    tags,
    primaryColor,
    secondaryColor,
    accentColors,
    keywords,
    philosophy,
    doList,
    dontList,
    buttonCode,
    cardCode,
    inputCode,
  };
}

// ---------------------------------------------------------------------------
// Generic regex-based file patcher
// ---------------------------------------------------------------------------

async function patchFile(
  filePath: string,
  label: string,
  pattern: RegExp,
  buildReplacement: (content: string, match: RegExpExecArray) => string,
  result: AutoRegisterResult,
): Promise<void> {
  try {
    const content = await readFile(filePath, "utf-8");
    const match = pattern.exec(content);
    if (!match) {
      result.errors.push(`${label}: insertion point not found`);
      return;
    }
    const patched = buildReplacement(content, match);
    await writeFile(filePath, patched, "utf-8");
    result.registriesPatched.push(label);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    result.errors.push(`${label}: ${message}`);
  }
}

// ---------------------------------------------------------------------------
// Individual registry patchers
// ---------------------------------------------------------------------------

async function patchMeta(
  root: string,
  slug: string,
  input: StyleScaffoldInput,
  result: AutoRegisterResult,
): Promise<void> {
  const filePath = path.join(root, "lib/styles/meta.ts");

  const entry = [
    `  {`,
    `    slug: "${slug}",`,
    `    name: ${JSON.stringify(input.name)},`,
    `    nameEn: ${JSON.stringify(input.nameEn)},`,
    `    description: ${JSON.stringify(input.description)},`,
    `    cover: "/styles/${slug}.svg",`,
    `    styleType: "${input.styleType}",`,
    `    tags: ${JSON.stringify(input.tags)},`,
    `    category: "${input.category}",`,
    `    colors: {`,
    `      primary: "${input.primaryColor}",`,
    `      secondary: "${input.secondaryColor}",`,
    `      accent: ${JSON.stringify(input.accentColors)},`,
    `    },`,
    `    keywords: ${JSON.stringify(input.keywords)},`,
    `  },`,
  ].join("\n");

  // Insert before the closing ];
  await patchFile(
    filePath,
    "lib/styles/meta.ts",
    /\n\];/,
    (content, match) => {
      const idx = match.index!;
      return content.slice(0, idx) + "\n" + entry + "\n];" + content.slice(idx + match[0].length);
    },
    result,
  );
}

async function patchStylesIndex(
  root: string,
  slug: string,
  exportName: string,
  result: AutoRegisterResult,
): Promise<void> {
  const filePath = path.join(root, "lib/styles/index.ts");
  const importLine = `import { ${exportName} } from "./${slug}";`;

  try {
    let content = await readFile(filePath, "utf-8");

    // Add import after the last import line
    const lastImportIdx = content.lastIndexOf("\nimport ");
    if (lastImportIdx === -1) {
      result.errors.push("lib/styles/index.ts: could not find import block");
      return;
    }
    const endOfImportLine = content.indexOf("\n", lastImportIdx + 1);
    content =
      content.slice(0, endOfImportLine + 1) +
      `// Auto-registered\n${importLine}\n` +
      content.slice(endOfImportLine + 1);

    // Add to styles array before the closing ];
    const arrayCloseIdx = content.lastIndexOf("\n];");
    if (arrayCloseIdx === -1) {
      result.errors.push("lib/styles/index.ts: could not find styles array end");
      return;
    }
    content =
      content.slice(0, arrayCloseIdx) +
      `\n  // Auto-registered\n  ${exportName},` +
      content.slice(arrayCloseIdx);

    await writeFile(filePath, content, "utf-8");
    result.registriesPatched.push("lib/styles/index.ts");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    result.errors.push(`lib/styles/index.ts: ${message}`);
  }
}

async function patchTokensRegistry(
  root: string,
  slug: string,
  tokensExportName: string,
  result: AutoRegisterResult,
): Promise<void> {
  const filePath = path.join(root, "lib/styles/tokens-registry.ts");
  const importLine = `import { ${tokensExportName} } from "./${slug}-tokens";`;

  try {
    let content = await readFile(filePath, "utf-8");

    // Add import after the last import line
    const lastImportIdx = content.lastIndexOf("\nimport ");
    if (lastImportIdx === -1) {
      result.errors.push("lib/styles/tokens-registry.ts: could not find import block");
      return;
    }
    const endOfImportLine = content.indexOf("\n", lastImportIdx + 1);
    content =
      content.slice(0, endOfImportLine + 1) +
      `// Auto-registered\n${importLine}\n` +
      content.slice(endOfImportLine + 1);

    // Add entry before the closing };
    const registryCloseIdx = content.lastIndexOf("\n};");
    if (registryCloseIdx === -1) {
      result.errors.push("lib/styles/tokens-registry.ts: could not find registry object end");
      return;
    }
    content =
      content.slice(0, registryCloseIdx) +
      `\n  // Auto-registered\n  "${slug}": ${tokensExportName},` +
      content.slice(registryCloseIdx);

    await writeFile(filePath, content, "utf-8");
    result.registriesPatched.push("lib/styles/tokens-registry.ts");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    result.errors.push(`lib/styles/tokens-registry.ts: ${message}`);
  }
}

async function patchRecipesIndex(
  root: string,
  slug: string,
  recipesExportName: string,
  result: AutoRegisterResult,
): Promise<void> {
  const filePath = path.join(root, "lib/recipes/index.ts");
  const importLine = `import { ${recipesExportName} } from "./${slug}";`;

  try {
    let content = await readFile(filePath, "utf-8");

    // Add import after the last import line
    const lastImportIdx = content.lastIndexOf("\nimport ");
    if (lastImportIdx === -1) {
      result.errors.push("lib/recipes/index.ts: could not find import block");
      return;
    }
    const endOfImportLine = content.indexOf("\n", lastImportIdx + 1);
    content =
      content.slice(0, endOfImportLine + 1) +
      `// Auto-registered\n${importLine}\n` +
      content.slice(endOfImportLine + 1);

    // Add entry before the closing }; of the recipeRegistry
    const registryClosePattern = /\n\};\n\n\/\*\*/;
    const registryMatch = registryClosePattern.exec(content);
    if (registryMatch && registryMatch.index !== undefined) {
      const insertIdx = registryMatch.index;
      content =
        content.slice(0, insertIdx) +
        `\n  // Auto-registered\n  "${slug}": ${recipesExportName},` +
        content.slice(insertIdx);
    } else {
      // Fallback: find the last };
      const lastRegistryClose = content.lastIndexOf("\n};");
      if (lastRegistryClose === -1) {
        result.errors.push("lib/recipes/index.ts: could not find recipeRegistry object end");
        return;
      }
      content =
        content.slice(0, lastRegistryClose) +
        `\n  // Auto-registered\n  "${slug}": ${recipesExportName},` +
        content.slice(lastRegistryClose);
    }

    await writeFile(filePath, content, "utf-8");
    result.registriesPatched.push("lib/recipes/index.ts");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    result.errors.push(`lib/recipes/index.ts: ${message}`);
  }
}

async function patchStyleComponents(
  root: string,
  slug: string,
  input: StyleScaffoldInput,
  result: AutoRegisterResult,
): Promise<void> {
  const filePath = path.join(root, "lib/style-components.tsx");
  const secondary = input.secondaryColor.trim();
  const primary = input.primaryColor.trim();
  const accent = input.accentColors[0]?.trim() || primary;

  const entry = [
    `  "${slug}": {`,
    `    coverPreview: () => (`,
    `      <div className="w-full h-full flex items-center justify-center p-4" style={{ backgroundColor: "${secondary}" }}>`,
    `        <div className="w-full max-w-[200px] rounded-lg p-4" style={{ border: "1px solid ${primary}30" }}>`,
    `          <div className="text-sm font-medium mb-2" style={{ color: "${primary}" }}>${input.nameEn.trim()}</div>`,
    `          <div className="h-px mb-3" style={{ backgroundColor: "${primary}20" }} />`,
    `          <p className="text-xs mb-3" style={{ color: "${accent}" }}>${slug}</p>`,
    `          <button className="text-xs px-3 py-1 rounded" style={{ backgroundColor: "${primary}", color: "${secondary}" }}>View</button>`,
    `        </div>`,
    `      </div>`,
    `    ),`,
    `  },`,
  ].join("\n");

  try {
    let content = await readFile(filePath, "utf-8");

    // Find the closing }; of styleComponents object before the renderStyleComponent function
    const closingPattern = /\n\};\n\n\/\/ /;
    const closingMatch = closingPattern.exec(content);
    if (closingMatch && closingMatch.index !== undefined) {
      const insertIdx = closingMatch.index;
      content =
        content.slice(0, insertIdx) +
        "\n" + entry +
        content.slice(insertIdx);
    } else {
      result.errors.push("lib/style-components.tsx: insertion point not found");
      return;
    }

    await writeFile(filePath, content, "utf-8");
    result.registriesPatched.push("lib/style-components.tsx");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    result.errors.push(`lib/style-components.tsx: ${message}`);
  }
}
