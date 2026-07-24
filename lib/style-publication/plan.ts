import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import {
  generateStyleScaffoldFiles,
  slugToExportName,
  type StyleScaffoldInput,
} from "@/lib/scaffold/style-scaffold";
import type { PublicationWrite, StylePublicationPlan } from "./types";

export const STYLE_PUBLICATION_REGISTRIES = {
  styles: "lib/styles/registry.ts",
  meta: "lib/styles/meta-registry.ts",
  tokens: "lib/styles/tokens-registry-data.ts",
  recipes: "lib/recipes/registry.ts",
  previewRegistry: "lib/style-preview/registry.ts",
  previewDelivery: "lib/style-preview/delivery.ts",
} as const;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR_RE = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

/**
 * Build a complete publication plan without mutating the repository.
 *
 * Planning validates every target, reads every current projection, and
 * computes every derived write before the commit phase is allowed to start.
 */
export async function createStylePublicationPlan(
  input: StyleScaffoldInput,
  rootDir: string,
): Promise<StylePublicationPlan> {
  const normalizedInput = normalizeInput(input);
  validateInput(normalizedInput);

  const generatedWrites = generateStyleScaffoldFiles(normalizedInput)
    .filter((file) => file.name !== "scaffold/REGISTER.md")
    .map<PublicationWrite>((file) => ({
      relativePath: file.name,
      content: file.content,
      kind: "generated",
    }));

  await assertGeneratedTargetsAreNew(generatedWrites, rootDir);

  const registryContents = await readRegistryContents(rootDir);
  const exportName = slugToExportName(normalizedInput.slug);
  const tokensExportName = `${exportName}Tokens`;
  const recipesExportName = `${exportName}Recipes`;
  const previewExportName = `${exportName}Preview`;

  const registryWrites: PublicationWrite[] = [
    createRegistryWrite(
      STYLE_PUBLICATION_REGISTRIES.styles,
      registryContents,
      (content) => patchStylesRegistry(content, normalizedInput.slug, exportName),
    ),
    createRegistryWrite(
      STYLE_PUBLICATION_REGISTRIES.meta,
      registryContents,
      (content) => patchMetaRegistry(content, normalizedInput),
    ),
    createRegistryWrite(
      STYLE_PUBLICATION_REGISTRIES.tokens,
      registryContents,
      (content) => patchTokensRegistry(content, normalizedInput.slug, tokensExportName),
    ),
    createRegistryWrite(
      STYLE_PUBLICATION_REGISTRIES.recipes,
      registryContents,
      (content) => patchRecipesRegistry(content, normalizedInput.slug, recipesExportName),
    ),
    createRegistryWrite(
      STYLE_PUBLICATION_REGISTRIES.previewRegistry,
      registryContents,
      (content) =>
        patchPreviewEagerRegistry(content, normalizedInput.slug, previewExportName),
    ),
    createRegistryWrite(
      STYLE_PUBLICATION_REGISTRIES.previewDelivery,
      registryContents,
      (content) => patchPreviewDeliveryRegistry(content, normalizedInput.slug),
    ),
  ];

  assertRegistryProjectionIsConsistent(
    [...generatedWrites, ...registryWrites],
    normalizedInput.slug,
  );

  return {
    slug: normalizedInput.slug,
    writes: [...generatedWrites, ...registryWrites],
  };
}

function normalizeInput(input: StyleScaffoldInput): StyleScaffoldInput {
  return {
    ...input,
    slug: input.slug.trim().toLowerCase(),
    name: input.name.trim(),
    nameEn: input.nameEn.trim(),
    description: input.description.trim(),
    primaryColor: input.primaryColor.trim(),
    secondaryColor: input.secondaryColor.trim(),
    accentColors: input.accentColors.map((color) => color.trim()),
    keywords: input.keywords.map((keyword) => keyword.trim()),
    previewModule: input.previewModule?.trim(),
  };
}

function validateInput(input: StyleScaffoldInput): void {
  if (!SLUG_RE.test(input.slug)) {
    throw new Error(`Invalid style slug: ${input.slug}`);
  }

  const colors = [
    ["primary", input.primaryColor],
    ["secondary", input.secondaryColor],
    ...input.accentColors.map((color, index) => [`accent ${index + 1}`, color] as const),
  ] as const;

  for (const [label, color] of colors) {
    if (!HEX_COLOR_RE.test(color)) {
      throw new Error(`Invalid ${label} color: ${color}`);
    }
  }

  const previewModule = input.previewModule ?? "";
  if (!previewModule) {
    throw new Error(
      `Approved preview module required for ${input.slug}; publication will not invent a fallback renderer.`,
    );
  }
  if (previewModule.includes(`TODO(${input.slug})`) || !previewModule.includes("coverPreview")) {
    throw new Error(
      `Approved preview module required for ${input.slug}; replace the scaffold TODO with an approved coverPreview.`,
    );
  }
}

async function assertGeneratedTargetsAreNew(
  writes: readonly PublicationWrite[],
  rootDir: string,
): Promise<void> {
  for (const write of writes) {
    if (await fileExists(path.join(rootDir, write.relativePath))) {
      throw new Error(`Publication target already exists: ${write.relativePath}`);
    }
  }
}

async function readRegistryContents(rootDir: string): Promise<Map<string, string>> {
  const registryContents = await Promise.all(
    Object.values(STYLE_PUBLICATION_REGISTRIES).map(async (relativePath) => ({
      relativePath,
      content: await readFile(path.join(rootDir, relativePath), "utf8"),
    })),
  );
  return new Map(registryContents.map((item) => [item.relativePath, item.content]));
}

function createRegistryWrite(
  relativePath: string,
  contents: Map<string, string>,
  project: (content: string) => string,
): PublicationWrite {
  const previousContent = requiredContent(contents, relativePath);
  return {
    relativePath,
    content: project(previousContent),
    kind: "registry",
    previousContent,
  };
}

function assertRegistryProjectionIsConsistent(
  writes: readonly PublicationWrite[],
  slug: string,
): void {
  const exportName = slugToExportName(slug);
  const projections = new Map<string, (content: string) => boolean>([
    [
      STYLE_PUBLICATION_REGISTRIES.styles,
      (content) =>
        content.includes(`from "./${slug}"`) && content.includes(`\n  ${exportName},`),
    ],
    [STYLE_PUBLICATION_REGISTRIES.meta, (content) => content.includes(`slug: "${slug}"`)],
    [
      STYLE_PUBLICATION_REGISTRIES.tokens,
      (content) => content.includes(`"${slug}": ${exportName}Tokens`),
    ],
    [
      STYLE_PUBLICATION_REGISTRIES.recipes,
      (content) => content.includes(`"${slug}": ${exportName}Recipes`),
    ],
    [
      STYLE_PUBLICATION_REGISTRIES.previewRegistry,
      (content) =>
        content.includes(`${exportName}Preview from "./styles/${slug}"`) &&
        content.includes(`"${slug}": ${exportName}Preview`),
    ],
    [
      STYLE_PUBLICATION_REGISTRIES.previewDelivery,
      (content) =>
        content.includes(`"${slug}": () => import("./styles/${slug}")`) &&
        content.includes(`\n  "${slug}",`),
    ],
  ]);

  const missing = writes.filter((write) => {
    if (write.kind !== "registry") return false;
    return !(projections.get(write.relativePath)?.(write.content) ?? false);
  });
  if (missing.length > 0) {
    throw new Error(
      `Publication projection drift for ${slug}: ${missing.map((write) => write.relativePath).join(", ")}`,
    );
  }
}

function requiredContent(contents: Map<string, string>, relativePath: string): string {
  const content = contents.get(relativePath);
  if (content === undefined) {
    throw new Error(`Missing registry content: ${relativePath}`);
  }
  return content;
}

type RegistryCollection = ts.ArrayLiteralExpression | ts.ObjectLiteralExpression;

interface RegistrySyntaxAnchor {
  statement: ts.VariableStatement;
  collection: RegistryCollection;
}

function requireTextAnchor(content: string, marker: string, label: string): void {
  if (!content.includes(marker)) {
    throw new Error(`${label}: insertion point not found`);
  }
}

function findRegistryCollection(
  content: string,
  variableName: string,
  kind: "array" | "object",
  label: string,
): RegistrySyntaxAnchor {
  const sourceFile = ts.createSourceFile(
    label,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  let anchor: RegistrySyntaxAnchor | undefined;

  function visit(node: ts.Node): void {
    if (anchor || !ts.isVariableStatement(node)) {
      ts.forEachChild(node, visit);
      return;
    }

    for (const declaration of node.declarationList.declarations) {
      if (
        !ts.isIdentifier(declaration.name) ||
        declaration.name.text !== variableName ||
        !declaration.initializer
      ) {
        continue;
      }

      const collection = findCollectionExpression(declaration.initializer, kind);
      if (collection) {
        anchor = {
          statement: node,
          collection: collection as RegistryCollection,
        };
        break;
      }
    }

    if (!anchor) {
      ts.forEachChild(node, visit);
    }
  }

  ts.forEachChild(sourceFile, visit);
  if (!anchor) {
    throw new Error(`${label}: syntax anchor not found for ${variableName}`);
  }
  return anchor;
}

function findCollectionExpression(
  expression: ts.Expression,
  kind: "array" | "object",
): RegistryCollection | null {
  if (kind === "array" && ts.isArrayLiteralExpression(expression)) {
    return expression;
  }
  if (kind === "object" && ts.isObjectLiteralExpression(expression)) {
    return expression;
  }
  if (ts.isParenthesizedExpression(expression)) {
    return findCollectionExpression(expression.expression, kind);
  }
  if (ts.isAsExpression(expression) || ts.isTypeAssertionExpression(expression)) {
    return findCollectionExpression(expression.expression, kind);
  }
  if (ts.isCallExpression(expression) && expression.arguments.length === 1) {
    return findCollectionExpression(expression.arguments[0], kind);
  }
  return null;
}

function insertImportBeforeRegistry(
  content: string,
  variableName: string,
  kind: "array" | "object",
  statement: string,
  label: string,
  marker: string,
): string {
  requireTextAnchor(content, marker, label);
  const { statement: variableStatement } = findRegistryCollection(
    content,
    variableName,
    kind,
    label,
  );
  const index = variableStatement.getFullStart();
  const prefix = content.slice(0, index);
  const separator = prefix.endsWith("\n") ? "" : "\n";
  return `${prefix}${separator}${statement}\n${content.slice(index)}`;
}

function insertRegistryEntry(
  content: string,
  variableName: string,
  kind: "array" | "object",
  entry: string,
  label: string,
): string {
  const { collection } = findRegistryCollection(content, variableName, kind, label);
  const index = collection.getEnd() - 1;
  const prefix = content.slice(0, index);
  const separator = prefix.endsWith("\n") ? "" : "\n";
  const suffix = entry.endsWith("\n") ? "" : "\n";
  return `${prefix}${separator}${entry}${suffix}${content.slice(index)}`;
}

function assertSlugAbsent(content: string, slug: string, label: string): void {
  const registeredMarkers = [
    `"${slug}"`,
    `slug: "${slug}"`,
    `from "./${slug}"`,
    `from "./${slug}-tokens"`,
    `from "./styles/${slug}"`,
    `import("./styles/${slug}")`,
  ];
  if (registeredMarkers.some((marker) => content.includes(marker))) {
    throw new Error(`${label}: style already registered: ${slug}`);
  }
}

function patchStylesRegistry(content: string, slug: string, exportName: string): string {
  const label = STYLE_PUBLICATION_REGISTRIES.styles;
  assertSlugAbsent(content, slug, label);
  const withImport = insertImportBeforeRegistry(
    content,
    "rawStyles",
    "array",
    `import { ${exportName} } from "./${slug}";`,
    label,
    "\n// 风格列表",
  );
  return insertRegistryEntry(
    withImport,
    "rawStyles",
    "array",
    `  ${exportName},`,
    label,
  );
}

function patchMetaRegistry(content: string, input: StyleScaffoldInput): string {
  const label = STYLE_PUBLICATION_REGISTRIES.meta;
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
  return insertRegistryEntry(content, "stylesMeta", "array", entry.trimStart(), label);
}

function patchTokensRegistry(
  content: string,
  slug: string,
  tokensExportName: string,
): string {
  const label = STYLE_PUBLICATION_REGISTRIES.tokens;
  assertSlugAbsent(content, slug, label);
  const withImport = insertImportBeforeRegistry(
    content,
    "styleTokensRegistry",
    "object",
    `import { ${tokensExportName} } from "./${slug}-tokens";`,
    label,
    "\n// Registry of all style tokens",
  );
  return insertRegistryEntry(
    withImport,
    "styleTokensRegistry",
    "object",
    `  "${slug}": ${tokensExportName},`,
    label,
  );
}

function patchRecipesRegistry(
  content: string,
  slug: string,
  recipesExportName: string,
): string {
  const label = STYLE_PUBLICATION_REGISTRIES.recipes;
  assertSlugAbsent(content, slug, label);
  const withImport = insertImportBeforeRegistry(
    content,
    "recipeRegistry",
    "object",
    `import { ${recipesExportName} } from "./${slug}";`,
    label,
    "\n// Recipe registry",
  );
  return insertRegistryEntry(
    withImport,
    "recipeRegistry",
    "object",
    `  "${slug}": ${recipesExportName},`,
    label,
  );
}

function patchPreviewEagerRegistry(
  content: string,
  slug: string,
  previewExportName: string,
): string {
  const label = STYLE_PUBLICATION_REGISTRIES.previewRegistry;
  assertSlugAbsent(content, slug, label);
  const withImport = insertImportBeforeRegistry(
    content,
    "styleComponents",
    "object",
    `import ${previewExportName} from "./styles/${slug}";`,
    label,
    "\n// End style preview imports",
  );
  return insertRegistryEntry(
    withImport,
    "styleComponents",
    "object",
    `  "${slug}": ${previewExportName},`,
    label,
  );
}

function patchPreviewDeliveryRegistry(content: string, slug: string): string {
  const label = STYLE_PUBLICATION_REGISTRIES.previewDelivery;
  assertSlugAbsent(content, slug, label);
  requireTextAnchor(content, "\n  // End style preview loaders", label);
  requireTextAnchor(content, "\n  // End style preview slugs", label);
  const withLoader = insertRegistryEntry(
    content,
    "stylePreviewLoaders",
    "object",
    `  "${slug}": () => import("./styles/${slug}").then((module) => module.default),`,
    label,
  );
  return insertRegistryEntry(
    withLoader,
    "stylePreviewSlugs",
    "array",
    `  "${slug}",`,
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
