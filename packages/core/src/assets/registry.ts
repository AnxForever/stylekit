import { ASSET_KINDS, ASSET_SCHEMA_VERSION, isAssetKind } from "./types";
import type {
  AssetAttribution,
  AssetContentLevel,
  AssetKind,
  AssetLicense,
  AssetSummary,
  ListPublicAssetsOptions,
  PublicAssetDetail,
  PublicAssetListResponse,
} from "./types";
import { animations } from "@/lib/animations";
import { backgrounds } from "@/lib/backgrounds";
import { componentPatterns } from "@/lib/component-patterns";
import { DESIGN_PRINCIPLES } from "@/lib/design-principles";
import { getAllArchetypes } from "@/lib/archetypes";
import { gradients } from "@/lib/gradients";
import { shadows } from "@/lib/shadows";
import { getAllStyleColors } from "@/lib/styles/colors";
import { stylesMeta } from "@/lib/styles/meta";
import { getStyleBySlug } from "@/lib/styles/registry";
import { getAllRecipes } from "@/lib/styles/recipes";
import { getImplementationBrief } from "@/lib/implementation-brief";
import { SPACING_PRESETS, GRID_PRESETS, generateSpacingCSS, generateSpacingTailwind } from "@/lib/spacing";
import { SCALE_RATIOS, generateScale, generateScaleCSS, generateScaleTailwind } from "@/lib/type-scale";
import { HIERARCHY_LEVERS, SAMPLE_ELEMENTS, TEXT_LEVELS, generateHierarchyCSS } from "@/lib/visual-hierarchy";
import { fontPairings } from "@/lib/typography";
import { templateCatalog } from "@/lib/templates/catalog";
import { promptTopics } from "@/lib/prompts";
import { UI_PROMPT_EXAMPLES } from "@/lib/seo/ui-prompt-examples";
import { componentPatternPreviewSource } from "@/lib/assets/component-pattern-preview-source.generated";

const SITE_ORIGIN = "https://www.stylekit.top";
const GITHUB_ORIGIN = "https://github.com/AnxForever/stylekit/blob/main";
const MIT_LICENSE: AssetLicense = {
  name: "MIT",
  url: "https://github.com/AnxForever/stylekit/blob/main/LICENSE",
};

interface AssetInput<TData = unknown> {
  id: string;
  kind: AssetKind;
  name: string;
  nameZh?: string;
  description: string;
  tags?: string[];
  availability?: AssetSummary["availability"];
  contentLevel?: AssetContentLevel;
  sourceRef?: string;
  websiteUrl?: string;
  sourceUrls?: string[];
  license?: AssetLicense;
  attribution?: AssetAttribution;
  capabilities?: string[];
  data: TData;
  code?: string | string[];
  codeLanguage?: PublicAssetDetail["codeLanguage"];
  dependencies?: string[];
}

function createDetail<TData>(input: AssetInput<TData>): PublicAssetDetail<TData> {
  const sourceUrls = input.sourceUrls ?? [];
  const capabilities = input.capabilities ?? [];
  const metadata: AssetSummary = {
    id: input.id,
    kind: input.kind,
    name: input.name,
    ...(input.nameZh ? { nameZh: input.nameZh } : {}),
    description: input.description,
    tags: input.tags ?? [],
    availability: input.availability ?? "bundled",
    contentLevel: input.contentLevel ?? "source",
    ...(input.sourceRef ? { sourceRef: input.sourceRef } : {}),
    ...(input.websiteUrl ? { websiteUrl: input.websiteUrl } : {}),
    ...(sourceUrls.length ? { sourceUrls: [...sourceUrls] } : {}),
    ...(input.license ? { license: input.license } : {}),
    ...(input.attribution ? { attribution: input.attribution } : {}),
    ...(capabilities.length ? { capabilities: [...capabilities] } : {}),
  };
  return {
    schemaVersion: ASSET_SCHEMA_VERSION,
    metadata,
    data: input.data,
    ...(input.code ? { code: input.code } : {}),
    ...(input.codeLanguage ? { codeLanguage: input.codeLanguage } : {}),
    dependencies: [...(input.dependencies ?? [])],
    ...(input.attribution ? { attribution: input.attribution } : {}),
    ...(input.license ? { license: input.license } : {}),
    sourceUrls: [...sourceUrls],
    capabilities: [...capabilities],
  };
}

function website(path: string): string {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

function github(path: string): string {
  return `${GITHUB_ORIGIN}/${path}`;
}

function cssVars(entries: Array<[string, string]>): string {
  return [":root {", ...entries.map(([key, value]) => `  --${key}: ${value};`), "}"].join("\n");
}

function snippetDependencies(language: "css" | "tsx", code: string): string[] {
  const dependencies = new Set<string>();
  if (language === "tsx") dependencies.add("react");
  const imports = /\bfrom\s*["']([^"']+)["']|\bimport\s*["']([^"']+)["']/g;
  for (const match of code.matchAll(imports)) {
    const specifier = match[1] ?? match[2];
    if (!specifier || specifier.startsWith(".") || specifier.startsWith("@/")) continue;
    const segments = specifier.split("/");
    dependencies.add(specifier.startsWith("@") ? segments.slice(0, 2).join("/") : segments[0]);
  }
  return [...dependencies].sort();
}
const assets: PublicAssetDetail[] = [];

// Full style records, plus the complete implementation brief, component recipes,
// lint rules, tokens, readiness notes, and associated palette when present.
for (const meta of stylesMeta) {
  const style = getStyleBySlug(meta.slug);
  if (!style) continue;
  const brief = getImplementationBrief(meta.slug);
  const palette = getAllStyleColors().find((entry) => entry.slug === meta.slug) ?? null;
  const sourceRef = `lib/styles/${meta.slug}.ts`;
  const sourceUrls = [website(`/api/styles/${meta.slug}`), github(sourceRef), website(style.cover)];
  assets.push(createDetail({
    id: meta.slug,
    kind: "style",
    name: meta.nameEn || meta.name,
    nameZh: meta.name,
    description: meta.descriptionEn || meta.description,
    tags: [...meta.tags, meta.category, meta.styleType],
    sourceRef,
    websiteUrl: website(`/styles/${meta.slug}`),
    sourceUrls,
    license: MIT_LICENSE,
    capabilities: ["full-style-definition", "component-code", "design-tokens", "implementation-brief", "lint-rules", "component-recipes", "readiness-guidance"],
    data: { style, brief, palette },
    code: style.globalCss,
    codeLanguage: "css",
    dependencies: ["react", "tailwindcss"],
  }));
}

// These are the site's curated compositions (visual style + layout + motion),
// not the lower-level per-style button/card/input recipe skeletons.
for (const recipe of getAllRecipes()) {
  const sourceRef = "lib/styles/recipe-registry.ts";
  assets.push(createDetail({
    id: recipe.id,
    kind: "recipe",
    name: recipe.name,
    nameZh: recipe.nameZh,
    description: recipe.description,
    tags: [...recipe.tags, recipe.useCase, recipe.visualStyle, recipe.layout, ...(recipe.animations ?? [])],
    sourceRef,
    websiteUrl: website(`/recipes/${recipe.id}`),
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["composition-recipe", "visual-style-reference", "layout-reference", "motion-reference"],
    data: recipe,
    code: JSON.stringify(recipe, null, 2),
    codeLanguage: "json",
    dependencies: [],
  }));
}

for (const animation of animations) {
  const sourceRef = `lib/animations/${animation.slug}/index.ts`;
  const websiteUrl = website(`/animations/${animation.slug}`);
  const codeSnippets = animation.codeSnippets.map((snippet) => ({
    ...snippet,
    dependencies: snippetDependencies(snippet.language, snippet.code),
  }));
  const dependencies = [...new Set(codeSnippets.flatMap((snippet) => snippet.dependencies))].sort();
  const upstreamAttribution: AssetAttribution | undefined = animation.slug === "border-beam"
    ? { source: "border-beam", author: "Jakub Antalík", license: "MIT", url: "https://github.com/Jakubantalik/border-beam" }
    : undefined;
  assets.push(createDetail({
    id: animation.slug,
    kind: "animation",
    name: animation.nameEn || animation.name,
    nameZh: animation.name,
    description: animation.descriptionEn || animation.description,
    tags: [...animation.tags, animation.category, animation.trigger, animation.difficulty],
    sourceRef,
    websiteUrl,
    sourceUrls: [github(sourceRef), ...(upstreamAttribution?.url ? [upstreamAttribution.url] : [])],
    ...(upstreamAttribution ? { attribution: upstreamAttribution } : {}),
    license: upstreamAttribution ? { name: "MIT", url: upstreamAttribution.url } : MIT_LICENSE,
    capabilities: ["animation-snippets", "performance-guidance", "accessibility-guidance"],
    data: { ...animation, codeSnippets },
    code: codeSnippets.map((snippet) => snippet.code),
    dependencies,
  }));
}

for (const background of backgrounds) {
  const sourceRef = "lib/backgrounds/index.ts";
  const attribution = background.attribution;
  const license = attribution
    ? { name: attribution.license, url: attribution.url, notes: "Follow the source attribution terms when redistributing this pattern." }
    : MIT_LICENSE;
  assets.push(createDetail({
    id: background.id,
    kind: "background",
    name: background.name,
    nameZh: background.nameZh,
    description: `${background.category} background pattern for ${background.mood.join(", ")} use cases.`,
    tags: [...background.tags, background.category, ...background.mood],
    sourceRef,
    websiteUrl: website("/resources?tab=backgrounds"),
    sourceUrls: [github(sourceRef), ...(attribution?.url ? [attribution.url] : [])],
    ...(attribution ? { attribution } : {}),
    license,
    capabilities: ["css", "tailwind-classes"],
    data: background,
    code: background.css,
    codeLanguage: "css",
    dependencies: [],
  }));
}

for (const gradient of gradients) {
  const sourceRef = "lib/gradients/index.ts";
  assets.push(createDetail({
    id: gradient.id,
    kind: "gradient",
    name: gradient.name,
    nameZh: gradient.nameZh,
    description: `${gradient.type ?? "linear"} gradient palette in the ${gradient.category} family.`,
    tags: [...gradient.mood, gradient.category, ...(gradient.type ? [gradient.type] : [])],
    sourceRef,
    websiteUrl: website("/resources?tab=gradients"),
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["css", "tailwind-classes", "color-stops"],
    data: gradient,
    code: gradient.css,
    codeLanguage: "css",
    dependencies: [],
  }));
}

for (const shadow of shadows) {
  const sourceRef = "lib/shadows/index.ts";
  assets.push(createDetail({
    id: shadow.id,
    kind: "shadow",
    name: shadow.name,
    nameZh: shadow.nameZh,
    description: `${shadow.category} box-shadow preset for ${(shadow.tags ?? []).join(", ")}.`,
    tags: [...shadow.tags, shadow.category],
    sourceRef,
    websiteUrl: website("/resources?tab=shadows"),
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["css", "tailwind-classes"],
    data: shadow,
    code: shadow.css,
    codeLanguage: "css",
    dependencies: [],
  }));
}

for (const pairing of fontPairings) {
  const sourceRef = "lib/typography/index.ts";
  const families = [pairing.heading, pairing.body];
  const fontUrls = families.map((spec) => {
    const family = encodeURIComponent(spec.family).replace(/%20/g, "+");
    return `https://fonts.googleapis.com/css2?family=${family}:wght@${spec.weight}&display=swap`;
  });
  const imports = fontUrls.map((url) => `@import url("${url}");`);
  const code = [
    ...imports,
    "",
    `:root { --font-heading: '${pairing.heading.family}', sans-serif; --font-body: '${pairing.body.family}', sans-serif; }`,
  ].join("\n");
  assets.push(createDetail({
    id: pairing.id,
    kind: "typography",
    name: pairing.name,
    nameZh: pairing.nameZh,
    description: pairing.description,
    tags: [...pairing.tags, pairing.category, ...pairing.mood],
    sourceRef,
    websiteUrl: website("/resources?tab=typography"),
    sourceUrls: [...new Set([pairing.sourceUrl, github(sourceRef), ...fontUrls])],
    license: { name: pairing.license, url: "https://openfontlicense.org/" },
    capabilities: ["font-pairing", "google-fonts-import", "css-variables"],
    data: pairing,
    code,
    codeLanguage: "css",
    dependencies: [],
  }));
}

const colorPalettes = getAllStyleColors();
for (const palette of colorPalettes) {
  const sourceRef = "lib/styles/colors.ts";
  const code = cssVars([
    ["color-primary", palette.colors.primary],
    ["color-secondary", palette.colors.secondary],
    ...palette.colors.accent.map((color, index) => [`color-accent-${index + 1}`, color] as [string, string]),
  ]);
  assets.push(createDetail({
    id: palette.slug,
    kind: "palette",
    name: palette.nameEn || palette.name,
    nameZh: palette.name,
    description: `${palette.category} color palette with ${palette.swatches.length} unique swatches.`,
    tags: [palette.category, palette.slug, ...palette.swatches],
    sourceRef,
    websiteUrl: website(`/colors?style=${encodeURIComponent(palette.slug)}`),
    sourceUrls: [github(sourceRef), website(`/api/styles/${palette.slug}`)],
    license: MIT_LICENSE,
    capabilities: ["color-swatches", "css-custom-properties", "style-reference"],
    data: palette,
    code,
    codeLanguage: "css",
    dependencies: [],
  }));
}

for (const pattern of componentPatterns) {
  const sourceRef = "components/component-patterns/pattern-previews.tsx";
  assets.push(createDetail({
    id: pattern.id,
    kind: "component-pattern",
    name: pattern.name,
    nameZh: pattern.nameZh,
    description: pattern.summary,
    tags: [...pattern.tags, pattern.family, pattern.category, pattern.sourceStyleSlug],
    sourceRef,
    websiteUrl: website(pattern.sourceHref),
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["react-preview-source", "tailwind-utilities", "preview-selector"],
    data: { pattern, entryPoint: "PatternPreview", selector: { prop: "previewId", value: pattern.previewId }, sourceFile: "component-pattern-previews.tsx" },
    code: componentPatternPreviewSource,
    codeLanguage: "tsx",
    dependencies: ["react", "tailwindcss"],
  }));
}

for (const preset of SPACING_PRESETS) {
  const sourceRef = "lib/spacing/index.ts";
  const code = generateSpacingCSS(preset);
  assets.push(createDetail({
    id: preset.id,
    kind: "spacing",
    name: preset.name,
    description: preset.hint,
    tags: ["spacing", "design-tokens", `${preset.base}px-grid`],
    sourceRef,
    websiteUrl: website("/spacing"),
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["spacing-scale", "css-custom-properties", "tailwind-v4-theme"],
    data: { ...preset, tokens: preset.values.map((value) => ({ ...value, rem: value.px / 16 })), tailwindV4: generateSpacingTailwind(preset) },
    code,
    codeLanguage: "css",
    dependencies: [],
  }));
}

for (const preset of GRID_PRESETS) {
  const sourceRef = "lib/spacing/index.ts";
  const code = [
    `.container {`,
    `  display: grid;`,
    `  grid-template-columns: repeat(${preset.columns}, minmax(0, 1fr));`,
    `  gap: ${preset.gutter}px;`,
    `  width: min(100% - ${preset.margin * 2}px, ${preset.maxWidth}px);`,
    `  margin-inline: auto;`,
    `}`,
  ].join("\n");
  assets.push(createDetail({
    id: preset.id,
    kind: "layout-grid",
    name: `${preset.label} ${preset.columns}-column grid`,
    description: `Responsive starting grid for ${preset.label.toLowerCase()} layouts, capped at ${preset.maxWidth}px.`,
    tags: [preset.label.toLowerCase(), "grid", `${preset.columns}-column`, "responsive-layout"],
    sourceRef,
    websiteUrl: website("/spacing"),
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["css-grid", "layout-guidance"],
    data: preset,
    code,
    codeLanguage: "css",
    dependencies: [],
  }));
}

for (const principle of DESIGN_PRINCIPLES) {
  const sourceRef = "lib/design-principles/index.ts";
  assets.push(createDetail({
    id: principle.id,
    kind: "design-principle",
    name: principle.name,
    nameZh: principle.nameZh,
    description: principle.definition,
    tags: ["crap", principle.letter.toLowerCase(), principle.id],
    sourceRef,
    websiteUrl: website("/design-principles"),
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["design-guidance", "self-review-checklist", "css-example"],
    data: principle,
    code: principle.snippet.code,
    codeLanguage: principle.snippet.lang === "css" ? "css" : "text",
    dependencies: [],
  }));
}

for (const lever of HIERARCHY_LEVERS) {
  const sourceRef = "lib/visual-hierarchy/index.ts";
  assets.push(createDetail({
    id: `lever-${lever.id}`,
    kind: "visual-hierarchy",
    name: `${lever.name} lever`,
    nameZh: `${lever.nameZh}杠杆`,
    description: lever.desc,
    tags: ["hierarchy-lever", lever.id],
    sourceRef,
    websiteUrl: website("/visual-hierarchy"),
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["visual-hierarchy-guidance"],
    data: lever,
    dependencies: [],
  }));
}
for (const level of TEXT_LEVELS) {
  const sourceRef = "lib/visual-hierarchy/index.ts";
  const code = `.text-${level.name} {\n  font-size: ${level.size};\n  font-weight: ${level.weight};\n  opacity: ${level.opacity};\n}`;
  assets.push(createDetail({
    id: `text-${level.name}`,
    kind: "visual-hierarchy",
    name: `${level.name} text level`,
    nameZh: level.name === "primary" ? "主要文字层级" : level.name === "secondary" ? "次要文字层级" : "辅助文字层级",
    description: `${level.size} text at weight ${level.weight} with ${level.opacity} opacity.`,
    tags: ["text-hierarchy", level.name],
    sourceRef,
    websiteUrl: website("/visual-hierarchy"),
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["typographic-hierarchy", "css"],
    data: level,
    code,
    codeLanguage: "css",
    dependencies: [],
  }));
}
assets.push(createDetail({
  id: "sample-elements",
  kind: "visual-hierarchy",
  name: "Sample visual hierarchy composition",
  nameZh: "视觉层级示例组合",
  description: "Example content roles with their relative size, weight, color, and space strengths.",
  tags: ["sample", "composition", "scan-order"],
  sourceRef: "lib/visual-hierarchy/index.ts",
  websiteUrl: website("/visual-hierarchy"),
  sourceUrls: [github("lib/visual-hierarchy/index.ts")],
  license: MIT_LICENSE,
  capabilities: ["sample-content", "visual-weight-input"],
  data: { elements: SAMPLE_ELEMENTS, css: generateHierarchyCSS() },
  code: generateHierarchyCSS(),
  codeLanguage: "css",
  dependencies: [],
}));

for (const ratio of SCALE_RATIOS) {
  const sourceRef = "lib/type-scale/index.ts";
  const scale = generateScale(16, ratio.value);
  const code = generateScaleCSS(scale);
  assets.push(createDetail({
    id: `ratio-${String(ratio.value).replace(".", "-")}`,
    kind: "type-scale",
    name: ratio.name,
    description: ratio.hint,
    tags: ["modular-scale", "typography", ratio.name.toLowerCase().replace(/ /g, "-")],
    sourceRef,
    websiteUrl: website("/type-scale"),
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["modular-scale", "fluid-scale-generator", "css-custom-properties", "tailwind-v4-theme"],
    data: { ratio, basePx: 16, scale, css: code, tailwindV4: generateScaleTailwind(scale) },
    code,
    codeLanguage: "css",
    dependencies: [],
  }));
}

for (const archetype of getAllArchetypes()) {
  const sourceRef = "lib/archetypes/index.ts";
  assets.push(createDetail({
    id: archetype.id,
    kind: "archetype",
    name: archetype.name,
    nameZh: archetype.nameZh,
    description: archetype.description,
    tags: [...(archetype.tags ?? []), archetype.category],
    sourceRef,
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["page-structure", "section-layouts", "responsive-guidance", "content-slots"],
    data: archetype,
    code: JSON.stringify(archetype, null, 2),
    codeLanguage: "json",
    dependencies: [],
  }));
}

for (const topic of promptTopics) {
  const sourceRef = "lib/prompts/topics.ts";
  const promptText = topic.prompts.map((prompt) => `## ${prompt.titleEn} (${prompt.tool})\n\n${prompt.prompt}`).join("\n\n");
  assets.push(createDetail({
    id: topic.slug,
    kind: "prompt",
    name: topic.titleEn,
    nameZh: topic.titleZh,
    description: topic.descriptionEn,
    tags: [...topic.keywords, ...topic.relatedStyleSlugs, "prompt-topic"],
    sourceRef,
    websiteUrl: website(`/prompts/${topic.slug}`),
    sourceUrls: [github(sourceRef)],
    license: MIT_LICENSE,
    capabilities: ["bilingual-topic-guidance", "tool-specific-prompts", "faq", "use-cases"],
    data: topic,
    code: promptText,
    codeLanguage: "text",
    dependencies: [],
  }));
}

for (const example of UI_PROMPT_EXAMPLES) {
  const sourceRef = "lib/seo/ui-prompt-examples.ts";
  const code = `English\n\n${example.prompt.en}\n\nChinese\n\n${example.prompt.zh}`;
  assets.push(createDetail({
    id: `example-${example.id}`,
    kind: "prompt",
    name: example.title.en,
    nameZh: example.title.zh,
    description: `${example.sourceLabel.en} / ${example.sourceLabel.zh}`,
    tags: ["prompt-example", example.id],
    sourceRef,
    websiteUrl: website("/ui-prompts"),
    sourceUrls: [github(sourceRef), website(example.sourceHref)],
    license: MIT_LICENSE,
    capabilities: ["bilingual-copyable-prompt", "source-topic-link"],
    data: example,
    code,
    codeLanguage: "text",
    dependencies: [],
  }));
}
for (const template of templateCatalog) {
  if (template.external) {
    assets.push(createDetail({
      id: template.id,
      kind: "template",
      name: template.name.en,
      nameZh: template.name.zh,
      description: template.description.en,
      tags: [template.type, "external-template"],
      availability: "external",
      contentLevel: "metadata",
      sourceRef: "lib/templates/catalog.ts",
      websiteUrl: template.external.siteUrl,
      sourceUrls: [template.external.repoUrl, template.external.siteUrl],
      license: { name: "External project license", notes: "Review the linked repository's license before reuse." },
      capabilities: ["external-project-reference"],
      data: { ...template, sourceFilesIncluded: false },
      dependencies: [],
    }));
    continue;
  }

  const downloadUrl = website(`/api/templates/${encodeURIComponent(template.id)}/download`);
  assets.push(createDetail({
    id: template.id,
    kind: "template",
    name: template.name.en,
    nameZh: template.name.zh,
    description: template.description.en,
    tags: [template.type, template.styleSlug, "nextjs", "tailwind-v4"].filter(Boolean),
    availability: "remote",
    contentLevel: "remote",
    sourceRef: template.codePath,
    websiteUrl: website(template.href),
    sourceUrls: [downloadUrl],
    license: MIT_LICENSE,
    capabilities: ["runnable-project-download", "nextjs", "tailwind-v4"],
    data: { ...template, downloadUrl, downloadMethod: "GET", downloadFormat: "zip", sourceFilesIncluded: false },
    dependencies: [],
  }));
}

// This allow-list intentionally copies only the public product card and license
// fields. The restricted pack manifest and its installable source are never
// imported into this package.
const restrictedExperiencePacks = [
  {
    slug: "corporate-clean-saas",
    styleSlug: "corporate-clean",
    version: "0.1.0",
    tier: "pro",
    status: "preview",
    title: "Corporate Clean SaaS Workspace",
    summary: "A self-contained B2B SaaS analytics workspace with responsive navigation, business states, scoped styles, documentation, and an owned product illustration.",
    categories: ["saas", "dashboard", "corporate-clean"],
    license: {
      id: "stylekit-pro-v1",
      name: "StyleKit Pro License v1",
      sourceRedistribution: "prohibited",
      assetRedistribution: "prohibited",
      termsUrl: "https://www.stylekit.top/packs/corporate-clean-saas/license",
    },
  },
] as const;
for (const pack of restrictedExperiencePacks) {
  const termsUrl = pack.license.termsUrl;
  const license: AssetLicense = {
    name: pack.license.name,
    url: termsUrl,
    notes: "Source redistribution is prohibited. Only the public catalogue and license metadata are included here.",
  };
  assets.push(createDetail({
    id: pack.slug,
    kind: "experience-pack",
    name: pack.title,
    description: pack.summary,
    tags: [...pack.categories, pack.tier],
    availability: "restricted",
    contentLevel: "restricted",
    sourceRef: "lib/experience-packs/manifests/corporate-clean-saas.ts",
    websiteUrl: website(`/styles/${pack.styleSlug}`),
    sourceUrls: [termsUrl],
    license,
    capabilities: ["catalogue-metadata", "license-terms-link"],
    data: {
      slug: pack.slug,
      styleSlug: pack.styleSlug,
      version: pack.version,
      tier: pack.tier,
      status: pack.status,
      presentation: { title: pack.title, summary: pack.summary, categories: [...pack.categories] },
      license: { ...pack.license },
      installableSourceIncluded: false,
    },
    dependencies: [],
  }));
}

const duplicateIdCounts = new Map<string, number>();
for (let index = 0; index < assets.length; index += 1) {
  const detail = assets[index];
  const originalId = detail.metadata.id;
  const key = `${detail.metadata.kind}:${originalId}`;
  const occurrence = (duplicateIdCounts.get(key) ?? 0) + 1;
  duplicateIdCounts.set(key, occurrence);
  if (occurrence < 2) continue;

  const variantId = `${originalId}-variant-${occurrence}`;
  const sourceData = detail.data;
  const data = sourceData && typeof sourceData === "object" && !Array.isArray(sourceData)
    ? { ...(sourceData as Record<string, unknown>), id: variantId, sourceId: originalId }
    : { sourceId: originalId, value: sourceData };
  assets[index] = {
    ...detail,
    metadata: {
      ...detail.metadata,
      id: variantId,
      description: `${detail.metadata.description} (catalog variant ${occurrence}; original source id: ${originalId}).`,
      tags: [...detail.metadata.tags, "id-variant", `variant-${occurrence}`],
    },
    data,
  };
}
function normalize(value: string): string {
  return value.normalize("NFKD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

function searchScore(metadata: AssetSummary, query: string): number {
  if (!query) return 0;
  const id = normalize(metadata.id);
  const name = normalize(metadata.name);
  const nameZh = normalize(metadata.nameZh ?? "");
  if (id === query) return 1000;
  if (name === query || nameZh === query) return 900;
  if (id.startsWith(query)) return 800;
  if (name.startsWith(query) || nameZh.startsWith(query)) return 700;
  if (id.includes(query)) return 600;
  if (name.includes(query) || nameZh.includes(query)) return 500;
  return 0;
}
function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

const searchable = assets.map((detail) => ({
  detail,
  searchText: normalize(JSON.stringify({ metadata: detail.metadata, data: detail.data, code: detail.code })),
}));
const assetByKey = new Map<string, PublicAssetDetail>();
for (const detail of assets) {
  const key = `${detail.metadata.kind}:${detail.metadata.id}`;
  if (assetByKey.has(key)) throw new Error(`Duplicate public asset key: ${key}`);
  assetByKey.set(key, detail);
}
const kindCounts = Object.fromEntries(
  ASSET_KINDS.map((kind) => [kind, assets.filter((asset) => asset.metadata.kind === kind).length]),
) as Record<AssetKind, number>;

/** Search the complete public bundled catalogue and return deterministic pages. */
export function listPublicAssets(options: ListPublicAssetsOptions = {}): PublicAssetListResponse {
  const { kind, query } = options;
  const offset = options.offset ?? 0;
  const limit = options.limit ?? 20;
  if (kind !== undefined && !isAssetKind(kind)) throw new RangeError(`Unknown asset kind: ${String(kind)}`);
  if (!Number.isInteger(offset) || offset < 0) throw new RangeError("offset must be a non-negative integer");
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) throw new RangeError("limit must be an integer from 1 to 100");
  if (query !== undefined && (typeof query !== "string" || query.length > 500)) throw new RangeError("query must be a string of at most 500 characters");

  const normalizedQuery = normalize(query?.trim() ?? "");
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const matching = searchable
    .filter(({ detail, searchText }) =>
      (kind === undefined || detail.metadata.kind === kind) &&
      tokens.every((token) => searchText.includes(token)),
    )
    .map((entry, order) => ({ ...entry, order }))
    .sort((a, b) => searchScore(b.detail.metadata, normalizedQuery) - searchScore(a.detail.metadata, normalizedQuery) || a.order - b.order);
  const page = matching.slice(offset, offset + limit).map(({ detail }) => clone(detail.metadata));
  return {
    schemaVersion: ASSET_SCHEMA_VERSION,
    assets: page,
    total: matching.length,
    offset,
    limit,
    hasMore: offset + page.length < matching.length,
    kindCounts: { ...kindCounts },
  };
}

/** Return a copy of one public asset detail, or null when no record exists. */
export function getPublicAsset(kind: AssetKind, id: string): PublicAssetDetail | null {
  if (!isAssetKind(kind) || typeof id !== "string" || !id.trim()) return null;
  const detail = assetByKey.get(`${kind}:${id.trim()}`);
  return detail ? clone(detail) : null;
}
