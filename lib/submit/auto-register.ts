/**
 * Auto-Register Module
 *
 * Writes scaffold files to the filesystem and patches registry files
 * so that an approved community submission becomes a registered style.
 */

import { mkdir, readFile, rm, stat, writeFile } from "fs/promises";
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

interface PreparedWrite {
  relativePath: string;
  content: string;
  kind: "generated" | "registry";
  previousContent?: string;
}

interface PublicationOptions {
  writeFile?: typeof writeFile;
}

const REGISTRY_PATHS = {
  styles: "lib/styles/registry.ts",
  meta: "lib/styles/meta-registry.ts",
  tokens: "lib/styles/tokens-registry-data.ts",
  recipes: "lib/recipes/registry.ts",
  previewRegistry: "lib/style-preview/registry.ts",
  previewDelivery: "lib/style-preview/delivery.ts",
} as const;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR_RE = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export async function autoRegisterStyle(
  submission: SubmissionRecord,
): Promise<AutoRegisterResult> {
  return publishStyleToCodebase(submission, process.cwd());
}

export async function publishStyleToCodebase(
  submission: SubmissionRecord,
  rootDir: string,
  options: PublicationOptions = {},
): Promise<AutoRegisterResult> {
  const result: AutoRegisterResult = {
    success: false,
    filesWritten: [],
    registriesPatched: [],
    errors: [],
  };

  const committedWrites: PreparedWrite[] = [];
  const writeFileImpl = options.writeFile ?? writeFile;

  try {
    const writes = await preparePublicationWrites(submission, rootDir);

    for (const write of writes) {
      const absolutePath = path.join(rootDir, write.relativePath);
      await mkdir(path.dirname(absolutePath), { recursive: true });
      await writeFileImpl(absolutePath, write.content, "utf8");
      committedWrites.push(write);

      if (write.kind === "registry") {
        result.registriesPatched.push(write.relativePath);
      } else {
        result.filesWritten.push(write.relativePath);
      }
    }

    result.success = true;
  } catch (error: unknown) {
    result.errors.push(error instanceof Error ? error.message : String(error));
    const rollbackErrors = await rollbackPublication(committedWrites, rootDir);
    result.errors.push(...rollbackErrors);
    result.filesWritten = [];
    result.registriesPatched = [];
  }

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
  const tags = Array.isArray(fd.tags) ? fd.tags.map(String) as StyleTag[] : [];
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
  const previewModule = typeof fd.previewModule === "string" ? fd.previewModule : undefined;

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
    previewModule,
  };
}

async function preparePublicationWrites(
  submission: SubmissionRecord,
  rootDir: string,
): Promise<PreparedWrite[]> {
  const input = buildScaffoldInput(submission);
  const slug = input.slug.trim().toLowerCase();
  if (!SLUG_RE.test(slug)) {
    throw new Error(`Invalid style slug: ${input.slug}`);
  }
  input.slug = slug;
  validateColors(input);
  validatePreviewModule(input.previewModule, slug);

  const generatedWrites = generateStyleScaffoldFiles(input)
    .filter((file) => file.name !== "scaffold/REGISTER.md")
    .map((file) => ({
      relativePath: file.name,
      content: file.content,
      kind: "generated" as const,
    }));

  for (const write of generatedWrites) {
    if (await fileExists(path.join(rootDir, write.relativePath))) {
      throw new Error(`Publication target already exists: ${write.relativePath}`);
    }
  }

  const registryContents = await Promise.all(
    Object.values(REGISTRY_PATHS).map(async (relativePath) => ({
      relativePath,
      content: await readFile(path.join(rootDir, relativePath), "utf8"),
    })),
  );
  const byPath = new Map(registryContents.map((item) => [item.relativePath, item.content]));
  const exportName = slugToExportName(slug);
  const tokensExportName = `${exportName}Tokens`;
  const recipesExportName = `${exportName}Recipes`;
  const previewExportName = `${exportName}Preview`;

  const registryWrites: PreparedWrite[] = [
    {
      relativePath: REGISTRY_PATHS.styles,
      content: patchStylesRegistry(requiredContent(byPath, REGISTRY_PATHS.styles), slug, exportName),
      kind: "registry",
      previousContent: requiredContent(byPath, REGISTRY_PATHS.styles),
    },
    {
      relativePath: REGISTRY_PATHS.meta,
      content: patchMetaRegistry(requiredContent(byPath, REGISTRY_PATHS.meta), input),
      kind: "registry",
      previousContent: requiredContent(byPath, REGISTRY_PATHS.meta),
    },
    {
      relativePath: REGISTRY_PATHS.tokens,
      content: patchTokensRegistry(
        requiredContent(byPath, REGISTRY_PATHS.tokens),
        slug,
        tokensExportName,
      ),
      kind: "registry",
      previousContent: requiredContent(byPath, REGISTRY_PATHS.tokens),
    },
    {
      relativePath: REGISTRY_PATHS.recipes,
      content: patchRecipesRegistry(
        requiredContent(byPath, REGISTRY_PATHS.recipes),
        slug,
        recipesExportName,
      ),
      kind: "registry",
      previousContent: requiredContent(byPath, REGISTRY_PATHS.recipes),
    },
    {
      relativePath: REGISTRY_PATHS.previewRegistry,
      content: patchPreviewEagerRegistry(
        requiredContent(byPath, REGISTRY_PATHS.previewRegistry),
        slug,
        previewExportName,
      ),
      kind: "registry",
      previousContent: requiredContent(byPath, REGISTRY_PATHS.previewRegistry),
    },
    {
      relativePath: REGISTRY_PATHS.previewDelivery,
      content: patchPreviewDeliveryRegistry(
        requiredContent(byPath, REGISTRY_PATHS.previewDelivery),
        slug,
      ),
      kind: "registry",
      previousContent: requiredContent(byPath, REGISTRY_PATHS.previewDelivery),
    },
  ];

  return [...generatedWrites, ...registryWrites];
}

function validateColors(input: StyleScaffoldInput): void {
  const colors = [
    ["primary", input.primaryColor],
    ["secondary", input.secondaryColor],
    ...input.accentColors.map((color, index) => [`accent ${index + 1}`, color] as const),
  ] as const;

  for (const [label, color] of colors) {
    if (!HEX_COLOR_RE.test(color.trim())) {
      throw new Error(`Invalid ${label} color: ${color}`);
    }
  }
}

function validatePreviewModule(source: string | undefined, slug: string): void {
  const previewModule = source?.trim() ?? "";
  if (!previewModule) {
    throw new Error(
      `Approved preview module required for ${slug}; publication will not invent a fallback renderer.`,
    );
  }
  if (previewModule.includes(`TODO(${slug})`) || !previewModule.includes("coverPreview")) {
    throw new Error(
      `Approved preview module required for ${slug}; replace the scaffold TODO with an approved coverPreview.`,
    );
  }
}

async function rollbackPublication(
  writes: PreparedWrite[],
  rootDir: string,
): Promise<string[]> {
  const errors: string[] = [];

  for (const write of [...writes].reverse()) {
    const absolutePath = path.join(rootDir, write.relativePath);
    try {
      if (write.kind === "registry" && write.previousContent !== undefined) {
        await writeFile(absolutePath, write.previousContent, "utf8");
      } else {
        await rm(absolutePath, { force: true });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`Rollback failed for ${write.relativePath}: ${message}`);
    }
  }

  return errors;
}

function requiredContent(contents: Map<string, string>, relativePath: string): string {
  const content = contents.get(relativePath);
  if (content === undefined) {
    throw new Error(`Missing registry content: ${relativePath}`);
  }
  return content;
}

function insertBefore(
  content: string,
  marker: string,
  insertion: string,
  label: string,
  useLast = false,
): string {
  const index = useLast ? content.lastIndexOf(marker) : content.indexOf(marker);
  if (index === -1) {
    throw new Error(`${label}: insertion point not found`);
  }
  return content.slice(0, index) + insertion + content.slice(index);
}

function assertSlugAbsent(content: string, slug: string, label: string): void {
  if (content.includes(`"${slug}"`) || content.includes(`slug: "${slug}"`)) {
    throw new Error(`${label}: style already registered: ${slug}`);
  }
}

function patchStylesRegistry(content: string, slug: string, exportName: string): string {
  const label = REGISTRY_PATHS.styles;
  assertSlugAbsent(content, slug, label);
  const withImport = insertBefore(
    content,
    "\n// 风格列表",
    `\nimport { ${exportName} } from "./${slug}";\n`,
    label,
  );
  return insertBefore(
    withImport,
    "\n];\n\nexport const styles",
    `\n  ${exportName},`,
    label,
    true,
  );
}

function patchMetaRegistry(content: string, input: StyleScaffoldInput): string {
  const label = REGISTRY_PATHS.meta;
  assertSlugAbsent(content, input.slug, label);
  const entry = [
    "",
    "  {",
    `    slug: "${input.slug}",`,
    `    name: ${JSON.stringify(input.name)},`,
    `    nameEn: ${JSON.stringify(input.nameEn)},`,
    `    description: ${JSON.stringify(input.description)},`,
    `    cover: "/styles/${input.slug}.svg",`,
    `    styleType: "${input.styleType}",`,
    `    tags: ${JSON.stringify(input.tags)},`,
    `    category: "${input.category}",`,
    "    colors: {",
    `      primary: ${JSON.stringify(input.primaryColor)},`,
    `      secondary: ${JSON.stringify(input.secondaryColor)},`,
    `      accent: ${JSON.stringify(input.accentColors)},`,
    "    },",
    `    keywords: ${JSON.stringify(input.keywords)},`,
    "  },",
  ].join("\n");
  return insertBefore(content, "\n];", entry, label, true);
}

function patchTokensRegistry(
  content: string,
  slug: string,
  tokensExportName: string,
): string {
  const label = REGISTRY_PATHS.tokens;
  assertSlugAbsent(content, slug, label);
  const withImport = insertBefore(
    content,
    "\n// Registry of all style tokens",
    `\nimport { ${tokensExportName} } from "./${slug}-tokens";\n`,
    label,
  );
  return insertBefore(withImport, "\n};", `\n  "${slug}": ${tokensExportName},`, label, true);
}

function patchRecipesRegistry(
  content: string,
  slug: string,
  recipesExportName: string,
): string {
  const label = REGISTRY_PATHS.recipes;
  assertSlugAbsent(content, slug, label);
  const withImport = insertBefore(
    content,
    "\n// Recipe registry",
    `\nimport { ${recipesExportName} } from "./${slug}";\n`,
    label,
  );
  return insertBefore(
    withImport,
    "\n};\n\n/**\n * Get all recipes",
    `\n  "${slug}": ${recipesExportName},`,
    label,
  );
}

function patchPreviewEagerRegistry(
  content: string,
  slug: string,
  previewExportName: string,
): string {
  const label = REGISTRY_PATHS.previewRegistry;
  assertSlugAbsent(content, slug, label);
  const withImport = insertBefore(
    content,
    "\n// End style preview imports",
    `import ${previewExportName} from "./styles/${slug}";\n`,
    label,
  );
  return insertBefore(
    withImport,
    "\n  // End style preview entries",
    `  "${slug}": ${previewExportName},\n`,
    label,
  );
}

function patchPreviewDeliveryRegistry(content: string, slug: string): string {
  const label = REGISTRY_PATHS.previewDelivery;
  assertSlugAbsent(content, slug, label);
  const withLoader = insertBefore(
    content,
    "\n  // End style preview loaders",
    `  "${slug}": () => import("./styles/${slug}").then((module) => module.default),\n`,
    label,
  );
  return insertBefore(
    withLoader,
    "\n  // End style preview slugs",
    `  "${slug}",\n`,
    label,
  );
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch (error: unknown) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
