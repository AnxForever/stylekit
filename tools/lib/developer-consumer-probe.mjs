import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { clearRemoteCache, getStyleDetailLive } from "stylekit-core/discovery";
import { ASSET_KINDS, getPublicAsset, listPublicAssets } from "stylekit-core/assets";

const checks = [];
function check(label, assertion) {
  assertion();
  checks.push(label);
  console.log(`[consumer-check] PASS ${label}`);
}

for (const name of ["stylekit-core", "stylekit-cli", "stylekit-mcp"]) {
  check(`${name} installed from tarball outside workspace`, () => {
    assert.ok(realpathSync(`node_modules/${name}`).startsWith(`${process.cwd()}/node_modules/`));
  });
}

// A missing resource must not prevent a subsequent valid, online-only resource.
const requests = [];
const server = createServer((request, response) => {
  requests.push(request.url);
  response.setHeader("content-type", "application/json");
  if (request.url === "/api/styles/consumer-live-only") {
    response.end(JSON.stringify({
      slug: "consumer-live-only", name: "Consumer Live", nameEn: "Consumer Live",
      category: "modern", description: "Consumer fixture", philosophy: "Fixture",
      keywords: [], colors: { primary: "#000000", secondary: "#ffffff", accent: [] },
      tokens: null, recipes: null,
    }));
  } else {
    response.statusCode = 404;
    response.end(JSON.stringify({ error: "Style not found" }));
  }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
try {
  clearRemoteCache();
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const missing = await getStyleDetailLive("consumer-missing", { baseUrl });
  const found = await getStyleDetailLive("consumer-live-only", { baseUrl });
  check("Core 404 is isolated to the missing resource", () => {
    assert.equal(missing.data, null);
    assert.equal(found.origin, "live");
    assert.equal(found.data?.slug, "consumer-live-only");
    assert.ok(requests.includes("/api/styles/consumer-live-only"));
  });
} finally {
  server.closeAllConnections();
  await new Promise((done) => server.close(done));
}

const assetCoverage = { core: {}, cli: {}, mcp: {}, policies: [] };
const assetPageSize = 100;

function assetKey(summary) {
  return String(summary.kind) + "/" + String(summary.id);
}

function codeText(detail) {
  if (typeof detail?.code === "string") return detail.code;
  if (Array.isArray(detail?.code)) return detail.code.join("\n");
  return "";
}

function checkPage(page, offset, label) {
  assert.ok(page && typeof page === "object", label + " page is missing");
  assert.equal(page.schemaVersion, "1", label + " schema version");
  assert.ok(Array.isArray(page.assets), label + " assets must be an array");
  assert.equal(page.offset, offset, label + " page offset");
  assert.equal(page.limit, assetPageSize, label + " page limit");
  assert.ok(Number.isInteger(page.total) && page.total >= 0, label + " total");
  assert.equal(page.hasMore, offset + page.assets.length < page.total, label + " pagination");
  for (const summary of page.assets) {
    assert.equal(typeof summary.id, "string", label + " asset id");
    assert.equal(typeof summary.kind, "string", label + " asset kind");
    assert.ok(summary.id.length > 0 && summary.kind.length > 0, label + " non-empty identity");
  }
}

async function collectAssetPages(fetchPage, label) {
  const assets = [];
  const origins = new Set();
  let expectedTotal;
  let offset = 0;
  let pages = 0;
  while (true) {
    assert.ok(pages < 100, label + " pagination did not terminate");
    const response = await fetchPage(offset);
    if (response.origin) origins.add(response.origin);
    if (response.source) origins.add(response.source);
    const page = response.data ?? response;
    checkPage(page, offset, label);
    expectedTotal ??= page.total;
    assert.equal(page.total, expectedTotal, label + " total must stay stable across pages");
    assets.push(...page.assets);
    pages += 1;
    if (!page.hasMore) break;
    assert.ok(page.assets.length > 0, label + " pagination advanced without any rows");
    offset += page.assets.length;
  }
  assert.equal(assets.length, expectedTotal, label + " must return every catalogue row");
  return { assets, pages, total: expectedTotal ?? 0, origins: [...origins] };
}

function sortedAssetKeys(assets) {
  return assets.map(assetKey).sort();
}

function pickAsset(assets, kind, predicate = () => true) {
  return assets.find((asset) => asset.kind === kind && predicate(asset));
}

function runCliJson(args) {
  const output = execFileSync(
    process.execPath,
    ["node_modules/stylekit-cli/dist/index.js", ...args, "--json"],
    { timeout: 60_000, maxBuffer: 16 * 1024 * 1024, encoding: "utf8" },
  );
  return JSON.parse(output);
}

// The bundled registry is the deterministic baseline. Resolve every listed
// summary to a detail so catalogue rows can never silently point nowhere.
const coreCatalog = await collectAssetPages(
  (offset) => listPublicAssets({ offset, limit: assetPageSize }),
  "Core",
);
const coreDetails = new Map();
for (const summary of coreCatalog.assets) {
  const detail = getPublicAsset(summary.kind, summary.id);
  assert.ok(detail, "Core detail missing for " + assetKey(summary));
  assert.equal(detail.schemaVersion, "1", "Core detail schema for " + assetKey(summary));
  assert.equal(detail.metadata.kind, summary.kind, "Core detail kind for " + assetKey(summary));
  assert.equal(detail.metadata.id, summary.id, "Core detail id for " + assetKey(summary));
  assert.ok(Array.isArray(detail.dependencies), "Core dependencies for " + assetKey(summary));
  assert.ok(Array.isArray(detail.sourceUrls), "Core source URLs for " + assetKey(summary));
  coreDetails.set(assetKey(summary), detail);
}
const coreKindCounts = Object.fromEntries(
  ASSET_KINDS.map((kind) => [kind, coreCatalog.assets.filter((asset) => asset.kind === kind).length]),
);
const coreFirstPage = listPublicAssets({ offset: 0, limit: assetPageSize });
check("Core paginates the complete namespaced public asset catalogue", () => {
  assert.ok(coreCatalog.total > 0);
  assert.equal(new Set(sortedAssetKeys(coreCatalog.assets)).size, coreCatalog.total);
  assert.deepEqual(Object.keys(coreFirstPage.kindCounts).sort(), [...ASSET_KINDS].sort());
  assert.deepEqual(Object.keys(coreKindCounts).sort(), [...ASSET_KINDS].sort());
  assert.ok(Object.values(coreKindCounts).every((count) => count > 0));
});
check("every Core summary resolves to a matching, attributable detail record", () => {
  assert.equal(coreDetails.size, coreCatalog.total);
  assert.ok(coreCatalog.assets.every((summary) => {
    const detail = coreDetails.get(assetKey(summary));
    return detail?.metadata.kind === summary.kind && detail?.metadata.id === summary.id;
  }));
  for (const detail of coreDetails.values()) {
    if (detail.license) assert.equal(typeof detail.license.name, "string");
    if (detail.attribution) assert.equal(typeof detail.attribution.source, "string");
  }
});

const coreKindCountsByName = Object.fromEntries(ASSET_KINDS.map((kind) => [kind, coreKindCounts[kind]]));
assetCoverage.core = {
  total: coreCatalog.total,
  pages: coreCatalog.pages,
  kinds: coreKindCountsByName,
  availability: Object.fromEntries(["bundled", "remote", "external", "restricted"].map((availability) => [
    availability,
    coreCatalog.assets.filter((asset) => asset.availability === availability).length,
  ])),
};

check("Core detail samples include full implementation briefs and reusable source by family", () => {
  const styleSummary = pickAsset(coreCatalog.assets, "style");
  const style = styleSummary && coreDetails.get(assetKey(styleSummary));
  assert.ok(style && style.data?.style && style.data?.brief);
  assert.equal(style.data.brief.schemaVersion, "stylekit-brief-v1");
  assert.ok(style.data.brief.components && typeof style.data.brief.components === "object");
  assert.ok(Array.isArray(style.data.brief.variants));
  assert.ok(style.data.brief.readiness && style.data.brief.lintRules);
  assert.ok(codeText(style).length > 0 && style.codeLanguage === "css");

  const recipeSummary = pickAsset(coreCatalog.assets, "recipe");
  const recipe = recipeSummary && coreDetails.get(assetKey(recipeSummary));
  assert.ok(recipe && JSON.parse(codeText(recipe)).id === recipeSummary.id);

  const animationSummary = pickAsset(coreCatalog.assets, "animation", (asset) => {
    const detail = coreDetails.get(assetKey(asset));
    return Boolean(detail?.data?.performanceNotes && detail?.data?.accessibilityNotes);
  });
  const animation = animationSummary && coreDetails.get(assetKey(animationSummary));
  assert.ok(animation && codeText(animation).length > 0);
  assert.ok(animation.data?.performanceNotes && animation.data?.accessibilityNotes);

  for (const kind of ["background", "gradient", "shadow", "palette", "spacing", "layout-grid", "design-principle", "type-scale"]) {
    const summary = pickAsset(coreCatalog.assets, kind);
    const detail = summary && coreDetails.get(assetKey(summary));
    assert.ok(detail && codeText(detail).trim().length > 0, kind + " should expose reusable source");
  }

  const typographySummary = pickAsset(coreCatalog.assets, "typography");
  const typography = typographySummary && coreDetails.get(assetKey(typographySummary));
  assert.ok(typography && typography.license?.name === "OFL");
  assert.ok(typography.sourceUrls.some((url) => url.includes("fonts.googleapis.com")));
  assert.ok(codeText(typography).includes("@import url"));

  const componentSummary = pickAsset(coreCatalog.assets, "component-pattern");
  const component = componentSummary && coreDetails.get(assetKey(componentSummary));
  assert.ok(component && component.codeLanguage === "tsx");
  assert.ok(codeText(component).length > 10_000);
  assert.ok(codeText(component).includes(component.data?.pattern?.previewId));
  assert.ok(component.dependencies.includes("react"));

  const hierarchySummary = pickAsset(coreCatalog.assets, "visual-hierarchy", (asset) => {
    const detail = coreDetails.get(assetKey(asset));
    return codeText(detail).length > 0;
  });
  const hierarchy = hierarchySummary && coreDetails.get(assetKey(hierarchySummary));
  assert.ok(hierarchy && codeText(hierarchy).includes(".text-"));

  const archetypeSummary = pickAsset(coreCatalog.assets, "archetype");
  const archetype = archetypeSummary && coreDetails.get(assetKey(archetypeSummary));
  assert.ok(archetype && JSON.parse(codeText(archetype)).id === archetypeSummary.id);
});

const externalTemplate = pickAsset(coreCatalog.assets, "template", (asset) => asset.availability === "external");
const remoteTemplate = pickAsset(coreCatalog.assets, "template", (asset) => asset.availability === "remote");
const restrictedPack = pickAsset(coreCatalog.assets, "experience-pack", (asset) => asset.availability === "restricted");
check("external templates and restricted Pro packs expose metadata without protected source", () => {
  assert.ok(externalTemplate, "external template should remain discoverable");
  const externalDetail = coreDetails.get(assetKey(externalTemplate));
  assert.ok(externalDetail && externalDetail.metadata.contentLevel === "metadata");
  assert.equal(externalDetail.code, undefined);
  assert.equal(externalDetail.data.sourceFilesIncluded, false);
  assert.ok(externalDetail.sourceUrls.length >= 2);

  assert.ok(remoteTemplate, "local template catalogue should include remote-download assets");
  const remoteDetail = coreDetails.get(assetKey(remoteTemplate));
  assert.equal(remoteDetail.metadata.contentLevel, "remote");
  assert.equal(remoteDetail.data.sourceFilesIncluded, false);
  assert.equal(remoteDetail.data.downloadFormat, "zip");
  assert.ok(remoteDetail.data.downloadUrl.includes("/api/templates/"));

  assert.ok(restrictedPack, "restricted experience pack should retain its public catalogue entry");
  const packDetail = coreDetails.get(assetKey(restrictedPack));
  assert.equal(packDetail.metadata.contentLevel, "restricted");
  assert.equal(packDetail.code, undefined);
  assert.deepEqual(packDetail.dependencies, []);
  assert.equal(packDetail.data.installableSourceIncluded, false);
  assert.equal(packDetail.data.license.sourceRedistribution, "prohibited");
});
check("private kits and unpublished knowledge are absent from the public asset catalogue", () => {
  assert.ok(!ASSET_KINDS.includes("knowledge"));
  assert.ok(!ASSET_KINDS.includes("kit"));
  assert.ok(!coreCatalog.assets.some((asset) => asset.kind === "knowledge" || asset.kind === "kit"));
});
assetCoverage.policies = [
  "public curated asset families only",
  "unpublished knowledge and private user kits excluded",
  "external template source excluded",
  "restricted Pro source excluded",
];


// Exercise every bundled family against both paginated package consumers.
const cliAssetCatalog = await collectAssetPages(
  (offset) => runCliJson(["assets", "--offset", String(offset), "--limit", String(assetPageSize)]),
  "CLI",
);
const cliOrigins = cliAssetCatalog.origins;
check("CLI assets JSON paginates every Core asset with matching stable IDs", () => {
  assert.deepEqual(sortedAssetKeys(cliAssetCatalog.assets), sortedAssetKeys(coreCatalog.assets));
  assert.ok(cliOrigins.every((origin) => origin === "live" || origin === "bundled"));
});
assetCoverage.cli = {
  total: cliAssetCatalog.total,
  pages: cliAssetCatalog.pages,
  origins: cliOrigins,
  kinds: Object.fromEntries(ASSET_KINDS.map((kind) => [
    kind,
    cliAssetCatalog.assets.filter((asset) => asset.kind === kind).length,
  ])),
};

const cliDetailSamples = [
  pickAsset(coreCatalog.assets, "component-pattern"),
  externalTemplate,
  restrictedPack,
].filter(Boolean);
for (const summary of cliDetailSamples) {
  const response = runCliJson(["asset", summary.kind, summary.id]);
  assert.ok(response.data, "CLI asset detail must return structured data");
  const detail = response.data;
  assert.equal(detail.schemaVersion, "1");
  assert.equal(detail.metadata.kind, summary.kind);
  assert.equal(detail.metadata.id, summary.id);
  if (summary.kind === "component-pattern") {
    assert.equal(detail.codeLanguage, "tsx");
    assert.ok(codeText(detail).length > 10_000);
    assert.ok(codeText(detail).includes(detail.data?.pattern?.previewId));
  }
  if (summary.availability === "external" || summary.availability === "restricted") {
    assert.equal(detail.code, undefined);
  }
}
check("CLI asset JSON returns real component source and safe external/restricted details", () => {
  assert.equal(cliDetailSamples.length, 3);
});
assetCoverage.cli.detailSamples = cliDetailSamples.map((asset) => ({
  kind: asset.kind,
  id: asset.id,
  availability: asset.availability,
}));


const brief = JSON.parse(execFileSync(process.execPath, ["node_modules/stylekit-cli/dist/index.js", "brief", "neo-brutalist"], { timeout: 20_000, encoding: "utf8" }));
check("CLI exports a complete reusable brief", () => {
  assert.equal(brief.schemaVersion, "stylekit-brief-v1");
  assert.deepEqual(brief.lintRules.sources, ["tokens", "curated"]);
});
writeFileSync("cli-brief.json", JSON.stringify(brief, null, 2));

const client = new Client({ name: "stylekit-consumer-check", version: "1.0.0" });
const transport = new StdioClientTransport({ command: process.execPath, args: [resolve("node_modules/stylekit-mcp/dist/index.js")], stderr: "pipe" });
const call = (name, args) => client.callTool({ name, arguments: args }, undefined, { timeout: 20_000 });
try {
  await client.connect(transport);
  const { tools } = await client.listTools();
  check("MCP starts and advertises the required read-only tools", () => {
    assert.equal(tools.length, 9);
    assert.ok(tools.some((tool) => tool.name === "stylekit_list_assets"));
    assert.ok(tools.some((tool) => tool.name === "stylekit_get_asset"));
    assert.ok(tools.every((tool) => tool.annotations?.readOnlyHint));
  });
  const mcpAssetCatalog = await collectAssetPages(async (offset) => {
    const result = await call("stylekit_list_assets", { offset, limit: assetPageSize });
    assert.ok(!result.isError && result.structuredContent, "MCP asset page must return structured content");
    return result.structuredContent;
  }, "MCP");
  check("MCP list_assets returns every Core asset through paginated stdio calls", () => {
    assert.deepEqual(sortedAssetKeys(mcpAssetCatalog.assets), sortedAssetKeys(coreCatalog.assets));
    assert.ok(mcpAssetCatalog.origins.every((origin) => origin === "live" || origin === "bundled"));
  });
  assetCoverage.mcp = {
    total: mcpAssetCatalog.total,
    pages: mcpAssetCatalog.pages,
    sources: mcpAssetCatalog.origins,
    kinds: Object.fromEntries(ASSET_KINDS.map((kind) => [
      kind,
      mcpAssetCatalog.assets.filter((asset) => asset.kind === kind).length,
    ])),
  };

  const mcpDetails = new Map();
  for (const kind of ASSET_KINDS) {
    const summary = kind === "template"
      ? externalTemplate
      : kind === "experience-pack"
        ? restrictedPack
        : kind === "animation"
          ? pickAsset(coreCatalog.assets, kind, (asset) => {
              const detail = coreDetails.get(assetKey(asset));
              return Boolean(detail?.data?.performanceNotes && detail?.data?.accessibilityNotes);
            })
          : pickAsset(coreCatalog.assets, kind, (asset) => asset.availability === "bundled");
    assert.ok(summary, "MCP should have a detail sample for " + kind);
    const result = await call("stylekit_get_asset", { kind: summary.kind, id: summary.id });
    assert.ok(!result.isError && result.structuredContent, "MCP get_asset must return " + kind + " detail");
    const detail = result.structuredContent;
    assert.equal(detail.schemaVersion, "1", "MCP detail schema for " + kind);
    assert.equal(detail.metadata.kind, kind, "MCP detail kind");
    assert.equal(detail.metadata.id, summary.id, "MCP detail ID");
    assert.ok(detail.data !== undefined, "MCP detail data for " + kind);
    mcpDetails.set(kind, detail);
  }
  check("MCP get_asset resolves a representative detail from every public asset family", () => {
    assert.equal(mcpDetails.size, ASSET_KINDS.length);
    assert.ok([...mcpDetails.values()].every((detail) => detail.source === undefined || detail.source === "live" || detail.source === "bundled"));
  });

  check("MCP serves complete style, motion, component, and design-source samples", () => {
    const style = mcpDetails.get("style");
    assert.equal(style.data.brief.schemaVersion, "stylekit-brief-v1");
    assert.ok(style.data.brief.components && style.data.brief.lintRules && style.data.brief.readiness);
    assert.ok(typeof style.code === "string" && style.code.length > 0);

    const animation = mcpDetails.get("animation");
    assert.ok(codeText(animation).length > 0);
    assert.ok(animation.data.performanceNotes && animation.data.accessibilityNotes);

    const component = mcpDetails.get("component-pattern");
    assert.equal(component.codeLanguage, "tsx");
    assert.ok(codeText(component).length > 10_000);
    assert.ok(codeText(component).includes(component.data.pattern.previewId));
    assert.ok(component.dependencies.includes("react"));

    const background = mcpDetails.get("background");
    const gradient = mcpDetails.get("gradient");
    const shadow = mcpDetails.get("shadow");
    const typography = mcpDetails.get("typography");
    assert.ok(codeText(background).trim().length > 0);
    assert.ok(codeText(gradient).trim().length > 0);
    assert.ok(codeText(shadow).trim().length > 0);
    assert.equal(typography.license.name, "OFL");
    assert.ok(typography.sourceUrls.some((url) => url.includes("fonts.googleapis.com")));

    const external = mcpDetails.get("template");
    assert.equal(external.metadata.availability, "external");
    assert.equal(external.metadata.contentLevel, "metadata");
    assert.equal(external.code, undefined);
    assert.deepEqual(external.data, {});
    assert.deepEqual(external.dependencies, []);
    assert.ok(external.sourceUrls.length >= 2);

    const restricted = mcpDetails.get("experience-pack");
    assert.equal(restricted.metadata.availability, "restricted");
    assert.equal(restricted.metadata.contentLevel, "restricted");
    assert.equal(restricted.code, undefined);
    assert.deepEqual(restricted.data, {});
    assert.deepEqual(restricted.dependencies, []);
    assert.ok(restricted.license?.name && restricted.sourceUrls.length > 0);
  });
  assetCoverage.mcp.detailSamples = [...mcpDetails.entries()].map(([kind, detail]) => ({
    kind,
    id: detail.metadata.id,
    availability: detail.metadata.availability,
    contentLevel: detail.metadata.contentLevel,
  }));


  const search = await call("stylekit_search_styles", { query: "glassmorphism", limit: 3 });
  check("MCP exact slug is first with explicit provenance", () => {
    assert.ok(!search.isError);
    assert.equal(search.structuredContent.results[0].slug, "glassmorphism");
    assert.ok(["live", "bundled"].includes(search.structuredContent.source));
  });
  // Semantic search can legitimately return neighbours for an unfamiliar
  // query. An offset beyond the catalogue deterministically exercises an
  // empty page; unit tests cover a zero-match source response separately.
  const empty = await call("stylekit_search_styles", { query: "glassmorphism", offset: 100_000 });
  check("MCP empty page succeeds with structured pagination", () => {
    assert.ok(!empty.isError);
    assert.deepEqual(empty.structuredContent.results, []);
    assert.ok(empty.structuredContent.total >= 1);
    assert.equal(empty.structuredContent.offset, 100_000);
    assert.equal(empty.structuredContent.has_more, false);
  });
  for (const name of ["stylekit_get_style", "stylekit_get_style_tokens", "stylekit_get_shadcn_install"]) {
    const result = await call(name, { slug: "neo-brutalist" });
    check(`${name} responds through stdio`, () => assert.ok(!result.isError && result.structuredContent));
  }
  const contract = await call("stylekit_get_implementation_brief", { slug: "neo-brutalist" });
  check("MCP and CLI deliver identical implementation inputs", () => {
    assert.ok(!contract.isError);
    assert.equal(contract.structuredContent.provenance.contentHash, brief.provenance.contentHash);
    assert.deepEqual(contract.structuredContent.lintRules, brief.lintRules);
  });
  writeFileSync("mcp-brief.json", JSON.stringify(contract, null, 2));
  const recipe = await call("stylekit_get_component_recipe", { slug: "swiss-style", component: "button" });
  const lint = await call("stylekit_lint_code", {
    slug: "swiss-style", code: `<button className="${recipe.structuredContent.className}">Continue</button>`,
    checkRequired: ["button"], strict: true,
  });
  check("official Swiss button passes its strict MCP rules", () => {
    assert.ok(!recipe.isError && !lint.isError);
    assert.equal(lint.structuredContent.status, "pass");
  });
  const dynamic = await call("stylekit_lint_code", { slug: "neo-brutalist", code: "<div className={styles.card} />" });
  check("runtime classes remain inconclusive", () => assert.equal(dynamic.structuredContent.status, "inconclusive"));
} finally {
  await client.close();
}
const versions = Object.fromEntries(["stylekit-core", "stylekit-cli", "stylekit-mcp"].map((name) => [name, JSON.parse(readFileSync(`node_modules/${name}/package.json`, "utf8")).version]));
writeFileSync("consumer-report.json", JSON.stringify({ node: process.version, versions, checks, assets: assetCoverage }, null, 2));
console.log(`[consumer-check] PASS ${checks.length} checks (local tarballs; not an npm release)`);
