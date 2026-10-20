// Smoke test: spawn the built server over stdio and exercise every tool.
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["dist/index.js"],
});
const client = new Client({ name: "stylekit-mcp-smoke", version: "1.0.0" });

let failures = 0;
function check(cond, label) {
  console.log(`${cond ? "PASS" : "FAIL"}: ${label}`);
  if (!cond) failures++;
}

await client.connect(transport);

const { tools } = await client.listTools();
const names = tools.map((t) => t.name).sort();
check(tools.length === 9, `9 tools registered (${names.join(", ")})`);
check(
  tools.every((t) => t.annotations?.readOnlyHint === true),
  "all tools annotated readOnlyHint",
);
check(
  tools.every((t) => t.annotations?.openWorldHint === true),
  "all tools annotated openWorldHint for live or network-backed data",
);
const recipeToolSchema = tools.find((tool) => tool.name === "stylekit_get_component_recipe");
check(
  ["variant", "params", "slots"].every((key) =>
    Object.hasOwn(recipeToolSchema?.inputSchema?.properties ?? {}, key),
  ),
  "recipe tool schema exposes variant, JSON params, and slots",
);
const briefToolSchema = tools.find((tool) => tool.name === "stylekit_get_implementation_brief");
check(
  ["sections", "components"].every((key) =>
    Object.hasOwn(briefToolSchema?.inputSchema?.properties ?? {}, key),
  ) && Object.hasOwn(briefToolSchema?.outputSchema?.properties ?? {}, "projection"),
  "brief tool schemas expose section/component projections and the completeness marker",
);

const assetPage = await client.callTool({
  name: "stylekit_list_assets",
  arguments: { kind: "component-pattern", limit: 2 },
});
check(
  assetPage.isError !== true &&
    assetPage.structuredContent?.schemaVersion === "1" &&
    Array.isArray(assetPage.structuredContent?.assets) &&
    typeof assetPage.structuredContent?.total === "number" &&
    typeof assetPage.structuredContent?.hasMore === "boolean" &&
    typeof assetPage.structuredContent?.source === "string" &&
    assetPage.structuredContent.assets.every((asset) => asset.kind === "component-pattern"),
  "list_assets returns a namespaced, sourced page",
);
const emptyAssetPage = await client.callTool({
  name: "stylekit_list_assets",
  arguments: { kind: "component-pattern", offset: 100000, limit: 1 },
});
check(
  emptyAssetPage.isError !== true &&
    emptyAssetPage.structuredContent?.assets?.length === 0 &&
    emptyAssetPage.structuredContent?.hasMore === false &&
    typeof emptyAssetPage.structuredContent?.source === "string",
  "list_assets returns a successful empty offset page",
);
const patternAsset = await client.callTool({
  name: "stylekit_get_asset",
  arguments: { kind: "component-pattern", id: "sidebar-fixed-standard-breadcrumb" },
});
let patternTextJson = null;
try {
  patternTextJson = JSON.parse(patternAsset.content[0].text);
} catch {
  /* ignore */
}
check(
  patternAsset.isError !== true &&
    patternAsset.structuredContent?.metadata?.kind === "component-pattern" &&
    patternAsset.structuredContent?.metadata?.id === "sidebar-fixed-standard-breadcrumb" &&
    patternAsset.structuredContent?.metadata?.contentLevel === "source" &&
    typeof patternAsset.structuredContent?.code === "string" &&
    patternAsset.structuredContent.code.includes("previewId") &&
    patternTextJson?.code === patternAsset.structuredContent?.code,
  "get_asset returns full permitted pattern source as structured and complete JSON text",
);

const search = await client.callTool({
  name: "stylekit_search_styles",
  arguments: { query: "glass" },
});
check(/glass/i.test(search.content[0].text), "search 'glass' finds glass styles");
check(
  Array.isArray(search.structuredContent?.results) &&
    search.structuredContent.results.length > 0,
  "search returns structuredContent.results",
);
check(
  typeof search.structuredContent?.has_more === "boolean" &&
    search.structuredContent?.offset === 0,
  "search returns pagination (offset + has_more)",
);

const exactSearch = await client.callTool({
  name: "stylekit_search_styles",
  arguments: { query: "glassmorphism", limit: 1 },
});
check(
  exactSearch.structuredContent?.results?.[0]?.slug === "glassmorphism" &&
    exactSearch.structuredContent?.ranking === "exact",
  "search ranks an exact slug before semantic matches",
);
check(
  typeof exactSearch.structuredContent?.source === "string",
  "search returns source provenance",
);

const emptyPage = await client.callTool({
  name: "stylekit_search_styles",
  arguments: { query: "glass", offset: 100000 },
});
check(
  emptyPage.isError !== true &&
    emptyPage.structuredContent?.count === 0 &&
    Array.isArray(emptyPage.structuredContent?.results) &&
    emptyPage.structuredContent.results.length === 0 &&
    typeof emptyPage.structuredContent?.source === "string",
  "search returns a successful structured empty page",
);

const detail = await client.callTool({
  name: "stylekit_get_style",
  arguments: { slug: "neo-brutalist" },
});
check(/neo-brutalist/i.test(detail.content[0].text), "get_style neo-brutalist");
check(
  detail.structuredContent?.shadcnInstall?.includes("/r/neo-brutalist.json"),
  "get_style includes shadcn install command",
);
check(
  Array.isArray(detail.structuredContent?.keywords) &&
    typeof detail.structuredContent?.hasRecipes === "boolean",
  "get_style returns keywords + hasRecipes",
);
check(
  detail.structuredContent?.quality?.capabilities?.readiness === "curated" &&
    Array.isArray(detail.structuredContent?.quality?.flags) &&
    ["live", "bundled"].includes(detail.structuredContent?.origin) &&
    (detail.structuredContent.origin === "live" || typeof detail.structuredContent.fallbackReason === "string"),
  "get_style returns quality capabilities and truthful live or fallback origin",
);

const tokens = await client.callTool({
  name: "stylekit_get_style_tokens",
  arguments: { slug: "neo-brutalist" },
});
check(/radius|border/i.test(tokens.content[0].text), "get_style_tokens returns tokens");
check(
  typeof tokens.structuredContent?.colors?.background?.primary === "string",
  "get_style_tokens returns typed structured tokens",
);
check(
  ["live", "bundled"].includes(tokens.structuredContent?.origin) &&
    (tokens.structuredContent.origin === "live" || typeof tokens.structuredContent.fallbackReason === "string"),
  "get_style_tokens reports live origin or its bundled fallback reason",
);

const recipe = await client.callTool({
  name: "stylekit_get_component_recipe",
  arguments: { slug: "glassmorphism", component: "button" },
});
check(
  recipe.structuredContent?.className?.length > 0 &&
    ["live", "bundled"].includes(recipe.structuredContent?.origin),
  "get_component_recipe returns a className and its data origin",
);
const configuredRecipe = await client.callTool({
  name: "stylekit_get_component_recipe",
  arguments: {
    slug: "broadcast-glitch",
    component: "button",
    variant: "cyan",
    params: { size: "lg", fullWidth: true },
    slots: { label: "Transmit now" },
  },
});
check(
  configuredRecipe.isError !== true &&
    configuredRecipe.structuredContent?.renderOptions?.variant === "cyan" &&
    configuredRecipe.structuredContent?.className?.includes("bg-[#00E5D8]") &&
    configuredRecipe.structuredContent?.className?.includes("px-9 py-4 text-base") &&
    configuredRecipe.structuredContent?.className?.includes("w-full") &&
    configuredRecipe.structuredContent?.code?.includes("Transmit now"),
  "get_component_recipe renders the requested variant, parameters, and slot text",
);
const invalidRecipeOptions = await client.callTool({
  name: "stylekit_get_component_recipe",
  arguments: {
    slug: "broadcast-glitch",
    component: "button",
    params: { unknownOption: "ignored" },
  },
});
check(
  invalidRecipeOptions.isError === true &&
    /unknown_parameter/i.test(invalidRecipeOptions.content[0]?.text ?? ""),
  "get_component_recipe rejects unknown parameters instead of silently ignoring them",
);

const install = await client.callTool({
  name: "stylekit_get_shadcn_install",
  arguments: { slug: "synthwave" },
});
check(
  /npx shadcn add .*synthwave\.json/.test(install.content[0].text) &&
    ["live", "bundled"].includes(install.structuredContent?.lookupOrigin) &&
    /components\.json/.test(install.structuredContent?.prerequisite ?? "") &&
    /tailwind\.css/.test(install.structuredContent?.prerequisite ?? "") &&
    /CSS variables/.test(install.structuredContent?.prerequisite ?? "") &&
    /tsconfig\.json/.test(install.structuredContent?.prerequisite ?? "") &&
    /Tailwind CSS v4 only/.test(install.structuredContent?.prerequisite ?? "") &&
    /Tailwind v3/.test(install.structuredContent?.prerequisite ?? "") &&
    /Style Pack/.test(install.structuredContent?.prerequisite ?? "") &&
    /HSL/.test(install.structuredContent?.prerequisite ?? "") &&
    /preset/.test(install.structuredContent?.prerequisite ?? ""),
  "get_shadcn_install returns prerequisites, provenance, and Tailwind version guidance",
);

const unknown = await client.callTool({
  name: "stylekit_get_style",
  arguments: { slug: "does-not-exist-xyz" },
});
check(unknown.isError === true, "unknown slug returns isError");

// lint_code must catch a real violation and hand back a usable fix.
const lintBad = await client.callTool({
  name: "stylekit_lint_code",
  arguments: {
    slug: "neo-brutalist",
    code: '<div className="rounded-xl shadow-lg" />',
  },
});
check(
  lintBad.structuredContent?.ok === false &&
    lintBad.structuredContent?.violations?.length >= 2,
  "lint_code flags forbidden classes",
);
check(
  lintBad.structuredContent?.violations?.every((v) => typeof v.reason === "string") &&
    lintBad.structuredContent?.violations?.some((v) => typeof v.fix === "string"),
  "lint_code returns reasons and at least one concrete fix",
);

// The style's own canonical classes must never be reported.
const lintGood = await client.callTool({
  name: "stylekit_lint_code",
  arguments: {
    slug: "neo-brutalist",
    code: '<div className="rounded-none border-2 border-black hidden md:block" />',
  },
});
check(lintGood.structuredContent?.ok === true, "lint_code passes conforming code");

const lintMissing = await client.callTool({
  name: "stylekit_lint_code",
  arguments: {
    slug: "neo-brutalist",
    code: '<button className="px-4" />',
    checkRequired: ["button"],
  },
});
check(
  lintMissing.structuredContent?.missingRequired?.[0]?.missing?.length > 0,
  "lint_code reports missing required classes when asked",
);

const brief = await client.callTool({ name: "stylekit_get_implementation_brief", arguments: { slug: "neo-brutalist" } });
check(brief.structuredContent?.schemaVersion === "stylekit-brief-v1" &&
  brief.structuredContent?.components?.button?.code?.includes("className") &&
  brief.structuredContent?.recipes?.button?.skeleton?.baseClasses?.length > 0 &&
  brief.structuredContent?.lintRules?.sources?.includes("curated") &&
  brief.structuredContent?.aiRules?.length > 0,
  "implementation brief includes instructions, template code, recipes and merged rules");
check(JSON.stringify(JSON.parse(brief.content[0].text)) === JSON.stringify(brief.structuredContent), "brief text contains complete valid JSON for legacy clients");
check(
  brief.structuredContent?.projection?.complete === true &&
    brief.structuredContent?.projection?.mode === "full" &&
    brief.structuredContent?.projection?.lintRulesComplete === true,
  "full brief marks its complete projection explicitly",
);
const partialBrief = await client.callTool({
  name: "stylekit_get_implementation_brief",
  arguments: { slug: "neo-brutalist", sections: ["identity", "recipes"], components: ["button"] },
});
check(
  partialBrief.isError !== true &&
    partialBrief.structuredContent?.projection?.complete === false &&
    partialBrief.structuredContent?.projection?.mode === "partial" &&
    partialBrief.structuredContent?.projection?.componentFilter?.[0] === "button" &&
    partialBrief.structuredContent?.recipes?.button &&
    partialBrief.structuredContent?.components === undefined &&
    typeof partialBrief.structuredContent?.provenance?.contentHash === "string",
  "projected brief returns only requested sections and marks itself partial",
);
const invalidBriefProjection = await client.callTool({
  name: "stylekit_get_implementation_brief",
  arguments: { slug: "neo-brutalist", sections: ["identity"], components: ["button"] },
});
check(
  invalidBriefProjection.isError === true &&
    /component_ids_require_components/i.test(invalidBriefProjection.content[0]?.text ?? ""),
  "brief rejects component filters when neither components nor recipes are selected",
);
check(
  ["live", "bundled"].includes(brief.structuredContent?.origin) &&
    ["bundled", "static", "community"].includes(brief.structuredContent?.provenance?.source) &&
    (brief.structuredContent.origin === "live" || typeof brief.structuredContent.fallbackReason === "string"),
  "implementation brief separates transport origin from content provenance and explains fallback",
);
check(
  lintBad.structuredContent?.contentSource === brief.structuredContent?.provenance?.source &&
    JSON.stringify([...lintBad.structuredContent.ruleSources].sort()) === JSON.stringify([...brief.structuredContent.lintRules.sources].sort()),
  "lint_code uses the same brief rules and reports the distinct content source",
);
const strict = await client.callTool({ name: "stylekit_lint_code", arguments: {
  slug: "neo-brutalist", code: '<button className="p-4" />', checkRequired: ["button"], strict: true,
} });
check(strict.structuredContent?.status === "fail" && strict.structuredContent?.ok === false, "strict lint fails missing requirements");
const dynamic = await client.callTool({ name: "stylekit_lint_code", arguments: {
  slug: "neo-brutalist", code: '<div className={styles.card} />',
} });
check(dynamic.structuredContent?.status === "inconclusive" && dynamic.structuredContent?.ok === false, "runtime classes return an inconclusive structured report");

await client.close();
console.log(
  failures === 0
    ? "\nALL SMOKE TESTS PASSED"
    : `\n${failures} FAILURE(S)`,
);
process.exit(failures === 0 ? 0 : 1);
