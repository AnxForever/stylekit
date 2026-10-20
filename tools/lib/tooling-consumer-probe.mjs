import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import {
  getComponentRecipe,
  getImplementationBrief,
  projectImplementationBrief,
} from "stylekit-core/discovery";
import { getStyleBySlug } from "stylekit-core/styles";
import { generateFigmaTokens, generateTailwindThemeCSS } from "stylekit-core/export";

const guard = resolve("tooling-network-guard.mjs");
writeFileSync(guard, "globalThis.fetch = async () => { throw new Error('Consumer probe: network disabled'); };\n");
const cliPath = resolve("node_modules/stylekit-cli/dist/index.js");
function cli(args, expectedStatus = 0) {
  const result = spawnSync(process.execPath, ["--import", guard, cliPath, ...args, "--json"], {
    encoding: "utf8", timeout: 30_000,
  });
  assert.ifError(result.error);
  assert.equal(result.status, expectedStatus, result.stderr || result.stdout);
  return JSON.parse(expectedStatus === 0 ? result.stdout : result.stderr);
}
function passed(label) {
  console.log(`[tooling-consumer] PASS ${label}`);
}

const defaults = getComponentRecipe("neo-brutalist", "button");
const renderOptions = {
  variant: "outline", params: { size: "sm", fullWidth: true },
  slots: { label: "Confirm migration <draft> & {review}" },
};
const rendered = getComponentRecipe("neo-brutalist", "button", renderOptions);
assert.ok(rendered && defaults);
assert.notEqual(rendered.code, defaults.code);
assert.match(rendered.code, /Confirm migration/);
assert.match(rendered.className, /w-full/);
assert.throws(() => getComponentRecipe("neo-brutalist", "button", { variant: "does-not-exist" }));
const recipeArgs = ["recipe", "neo-brutalist", "button", "--variant", "outline", "--params", JSON.stringify(renderOptions.params), "--slots", JSON.stringify(renderOptions.slots)];
const cliRecipe = cli(recipeArgs);
assert.equal(cliRecipe.code, rendered.code);
assert.equal(cliRecipe.origin, "bundled");
assert.ok(cliRecipe.fallbackReason);
cli(["recipe", "neo-brutalist", "button", "--params", '{"notAParameter":true}'], 1);
passed("Core and packaged CLI render explicit recipe choices and reject invalid inputs");

const complete = getImplementationBrief("neo-brutalist");
const projected = projectImplementationBrief(complete, { sections: ["tokens", "recipes"], componentIds: ["button"] });
assert.equal(projected.provenance.contentHash, complete.provenance.contentHash);
assert.equal(projected.projection.complete, false);
assert.equal(projected.projection.lintRulesIncluded, false);
assert.deepEqual(Object.keys(projected.recipes), ["button"]);
assert.equal(projected.aiRules, undefined);
assert.ok(JSON.stringify(projected).length < JSON.stringify(complete).length);
const cliBrief = cli(["brief", "neo-brutalist", "--sections", "tokens,recipes", "--components", "button"]);
assert.deepEqual(cliBrief.recipes, projected.recipes);
assert.equal(cliBrief.provenance.contentHash, complete.provenance.contentHash);
assert.equal(cliBrief.projection.complete, false);
passed("Core and packaged CLI project a brief without losing its complete-contract identity");

const synthwave = getStyleBySlug("synthwave");
const brutalist = getStyleBySlug("neo-brutalist");
assert.equal(generateFigmaTokens(synthwave).colors.background.value.toLowerCase(), "#0a0a1a");
assert.match(generateFigmaTokens(brutalist).borderRadius.default.value, /^0(?:px|rem)?$/);
assert.match(generateTailwindThemeCSS(synthwave), /@theme/);
assert.match(generateTailwindThemeCSS(synthwave).toLowerCase(), /#0a0a1a/);
passed("packaged exports preserve dark surfaces, square corners and a Tailwind v4 theme");

const fixture = mkdtempSync(join(process.cwd(), "tooling project "));
mkdirSync(join(fixture, "app"));
writeFileSync(join(fixture, "package.json"), JSON.stringify({
  name: "tooling-consumer-fixture", private: true, packageManager: "pnpm@10.0.0",
  dependencies: { next: "16.3.1", react: "19.2.3", tailwindcss: "4.1.18" },
}));
writeFileSync(join(fixture, "tsconfig.json"), JSON.stringify({ compilerOptions: { baseUrl: ".", paths: { "@/*": ["./*"] } } }));
writeFileSync(join(fixture, "components.json"), JSON.stringify({
  style: "new-york", rsc: true, tsx: true,
  tailwind: { css: "app/globals.css", baseColor: "neutral", cssVariables: true },
  aliases: { components: "@/components", utils: "@/lib/utils", ui: "@/components/ui", lib: "@/lib", hooks: "@/hooks" },
}));
writeFileSync(join(fixture, "app/globals.css"), '@import "tailwindcss";\n');
const snapshot = () => JSON.stringify(readdirSync(fixture, { recursive: true }).sort().map((name) => {
  try { return [name, readFileSync(join(fixture, name), "base64")]; } catch { return [name]; }
}));
const before = snapshot();
cli(["doctor", "--cwd", fixture]);
cli(["add", "synthwave", "--cwd", fixture, "--dry-run"]);
assert.equal(snapshot(), before);
passed("packaged CLI doctor and add dry-run inspect a project with spaces without writing files");

const transport = new StdioClientTransport({
  command: process.execPath,
  args: ["--import", guard, resolve("node_modules/stylekit-mcp/dist/index.js")],
  stderr: "pipe",
});
const client = new Client({ name: "tooling-tarball-consumer", version: "1.0.0" });
try {
  await client.connect(transport);
  const recipe = await client.callTool({ name: "stylekit_get_component_recipe", arguments: { slug: "neo-brutalist", component: "button", ...renderOptions } });
  assert.ok(!recipe.isError, JSON.stringify(recipe));
  assert.equal(recipe.structuredContent.code, rendered.code);
  const invalidIcon = await client.callTool({ name: "stylekit_get_component_recipe", arguments: { slug: "neo-brutalist", component: "button", slots: { icon: "<Icon/>" } } });
  assert.equal(invalidIcon.isError, true);
  const brief = await client.callTool({ name: "stylekit_get_implementation_brief", arguments: { slug: "neo-brutalist", sections: ["tokens", "recipes"], components: ["button"] } });
  assert.ok(!brief.isError, JSON.stringify(brief));
  assert.deepEqual(brief.structuredContent.recipes, projected.recipes);
  assert.equal(brief.structuredContent.projection.complete, false);
  assert.deepEqual(JSON.parse(brief.content.find((item) => item.type === "text").text), brief.structuredContent);
  const active = await client.callTool({ name: "stylekit_lint_code", arguments: { slug: "synthwave", code: '<button className="active:bg-white active:text-black" />' } });
  const base = await client.callTool({ name: "stylekit_lint_code", arguments: { slug: "synthwave", code: '<button className="bg-white text-black" />' } });
  assert.equal(active.structuredContent.status, "pass");
  assert.equal(base.structuredContent.status, "fail");
  passed("packaged MCP transports recipe options, projected JSON and state-scoped live-contract lint rules");
} finally {
  await client.close();
  await transport.close();
}
