#!/usr/bin/env node
import { createHash, randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  buildCoverageSummary,
  createEvaluationCheck,
  evaluateCandidateDirectory,
  statusExitCode,
  TOOL_WORKFLOW_SCENARIOS,
  type CandidateEvaluation,
  type EvaluationScope,
  type EvaluationStatus,
  type ToolWorkflowEvaluationReport,
} from "../lib/tool-workflow-evaluation.js";

interface Arguments {
  scope: EvaluationScope;
  candidateDirectory?: string;
  outputPath?: string;
  format: "json" | "markdown";
  scenariosOnly: boolean;
}

interface ToolObservation {
  client: "mcp" | "cli";
  operation: string;
  input: Record<string, unknown>;
  outputSha256: string;
  summary: Record<string, unknown>;
  output: Record<string, unknown>;
}

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "../..");
const noNetworkFetch = pathToFileURL(path.join(repositoryRoot, "tools", "lib", "no-network-fetch.mjs")).href;
const mcpServerEntry = path.join(repositoryRoot, "packages", "mcp", "dist", "index.js");
const cliEntry = path.join(repositoryRoot, "packages", "cli", "dist", "index.js");
const mcpPackageRequire = createRequire(path.join(repositoryRoot, "packages", "mcp", "package.json"));

interface ToolClient {
  connect(transport: unknown): Promise<void>;
  listTools(): Promise<{ tools: Array<{ name: string }> }>;
  callTool(input: { name: string; arguments: Record<string, unknown> }): Promise<unknown>;
  close(): Promise<void>;
}

interface ToolStdioTransport {
  stderr: { on(event: "data", listener: (chunk: unknown) => void): void } | null;
}

interface ToolSdkModules {
  Client: new (identity: { name: string; version: string }, options: { capabilities: Record<string, unknown> }) => ToolClient;
  StdioClientTransport: new (options: {
    command: string;
    args: string[];
    cwd: string;
    env: Record<string, string>;
    stderr?: "pipe" | "inherit";
  }) => ToolStdioTransport;
}

function usage(): string {
  return [
    "Usage: pnpm exec tsx tools/scripts/evaluate-tool-workflows.ts [options]",
    "",
    "Options:",
    "  --scope <toolchain|candidate|all>  Evaluation scope (default: all)",
    "  --candidate-dir <directory>       Candidate folder with stylekit-tool-workflow.json",
    "  --output <file>                   Write the evidence report JSON to a file",
    "  --format <json|markdown>           Output format (default: json)",
    "  --scenarios                        Export the full scenario acceptance contract as JSON",
    "  --help                             Show this help",
    "",
    "No model provider is called. Toolchain checks run the built MCP and CLI in child processes",
    "with remote fetch blocked, so only the bundled package snapshot is exercised.",
  ].join("\n");
}

function parseArguments(argv: string[]): Arguments | null {
  const result: Arguments = { scope: "all", format: "json", scenariosOnly: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") return null;
    if (argument === "--scope") {
      const value = argv[++index];
      if (value !== "toolchain" && value !== "candidate" && value !== "all") return null;
      result.scope = value;
      continue;
    }
    if (argument === "--candidate-dir") {
      const value = argv[++index];
      if (!value) return null;
      result.candidateDirectory = value;
      continue;
    }
    if (argument === "--output") {
      const value = argv[++index];
      if (!value) return null;
      result.outputPath = value;
      continue;
    }
    if (argument === "--format") {
      const value = argv[++index];
      if (value !== "json" && value !== "markdown") return null;
      result.format = value;
      continue;
    }
    if (argument === "--scenarios") {
      result.scenariosOnly = true;
      continue;
    }
    return null;
  }
  if (result.scope === "candidate" && !result.candidateDirectory) return result;
  return result;
}

function safeChildEnvironment(): NodeJS.ProcessEnv {
  const environment: NodeJS.ProcessEnv = {
    CI: "1",
    NODE_OPTIONS: `--import=${noNetworkFetch}`,
    PATH: process.env.PATH ?? "",
    HOME: process.env.HOME,
    USERPROFILE: process.env.USERPROFILE,
    TMPDIR: process.env.TMPDIR,
    TEMP: process.env.TEMP,
    TMP: process.env.TMP,
    SYSTEMROOT: process.env.SYSTEMROOT,
    SystemRoot: process.env.SystemRoot,
  };
  return environment;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

async function withTimeout<T>(promise: Promise<T>, operation: string, timeoutMs = 15_000): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${operation} exceeded ${timeoutMs}ms.`)), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function record(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function structuredResult(value: unknown): Record<string, unknown> | null {
  const root = record(value);
  if (!root) return null;
  const structured = record(root.structuredContent);
  if (structured) return structured;
  const content = Array.isArray(root.content) ? root.content : [];
  const firstText = content.map(record).find((item) => typeof item?.text === "string")?.text;
  if (typeof firstText === "string") {
    try {
      return record(JSON.parse(firstText) as unknown);
    } catch {
      return null;
    }
  }
  return null;
}

function textValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function includesAll(haystack: string, needles: string[]): boolean {
  return needles.every((needle) => haystack.includes(needle));
}

function toObservation(
  client: ToolObservation["client"],
  operation: string,
  input: Record<string, unknown>,
  output: unknown,
  summary: Record<string, unknown>,
): ToolObservation {
  const encoded = JSON.stringify(output);
  const recordOutput = record(output);
  return {
    client,
    operation,
    input,
    outputSha256: sha256(encoded),
    summary,
    output: recordOutput ?? { value: output },
  };
}

function runCli(args: string[]): Record<string, unknown> {
  const child = spawnSync(process.execPath, [cliEntry, ...args], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: safeChildEnvironment(),
    maxBuffer: 8 * 1024 * 1024,
    timeout: 25_000,
  });
  if (child.error) throw child.error;
  if (child.status !== 0) {
    const detail = (child.stderr || child.stdout || `CLI exited ${child.status}`).trim();
    throw new Error(detail.slice(0, 1500));
  }
  try {
    const parsed = JSON.parse(child.stdout) as unknown;
    const root = record(parsed);
    if (!root) throw new Error("CLI returned a non-object JSON result.");
    return root;
  } catch (error) {
    throw new Error(`CLI did not return valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function checkOutput(
  checks: ReturnType<typeof createEvaluationCheck>[],
  id: string,
  ok: boolean,
  passMessage: string,
  failMessage: string,
): void {
  checks.push(createEvaluationCheck(id, ok ? "pass" : "fail", ok ? passMessage : failMessage));
}

function briefProjectionSummary(value: Record<string, unknown>): Record<string, unknown> {
  const projection = record(value.projection);
  return {
    slug: value.slug,
    origin: value.origin,
    schemaVersion: value.schemaVersion,
    projection: projection ? {
      complete: projection.complete,
      mode: projection.mode,
      includedSections: projection.includedSections,
      excludedSections: projection.excludedSections,
      componentFilter: projection.componentFilter,
    } : null,
    componentIds: Object.keys(record(value.components) ?? {}),
    recipeIds: Object.keys(record(value.recipes) ?? {}),
  };
}

function recipeSummary(value: Record<string, unknown>): Record<string, unknown> {
  return {
    slug: value.slug,
    component: value.component,
    origin: value.origin,
    className: value.className,
    code: value.code,
    renderOptions: value.renderOptions,
  };
}

async function runMcpToolchain(): Promise<{
  tools: string[];
  recipe: Record<string, unknown>;
  brief: Record<string, unknown>;
  assetPage: Record<string, unknown>;
  assetDetail: Record<string, unknown>;
}> {
  const clientModule = pathToFileURL(mcpPackageRequire.resolve("@modelcontextprotocol/sdk/client/index.js")).href;
  const transportModule = pathToFileURL(mcpPackageRequire.resolve("@modelcontextprotocol/sdk/client/stdio.js")).href;
  const [clientSdk, transportSdk] = await Promise.all([import(clientModule), import(transportModule)]);
  const ClientClass = (clientSdk as unknown as { Client: ToolSdkModules["Client"] }).Client;
  const StdioTransportClass = (transportSdk as unknown as { StdioClientTransport: ToolSdkModules["StdioClientTransport"] }).StdioClientTransport;
  const client = new ClientClass({ name: "stylekit-tool-workflow-evaluator", version: "1.0.0" }, { capabilities: {} });
  const transport = new StdioTransportClass({
    command: process.execPath,
    args: [mcpServerEntry],
    cwd: repositoryRoot,
    env: safeChildEnvironment() as Record<string, string>,
    stderr: "pipe",
  });
  const serverDiagnostics: string[] = [];
  transport.stderr?.on("data", (chunk) => serverDiagnostics.push(String(chunk)));

  try {
    await withTimeout(client.connect(transport), "MCP server connection", 15_000);
    const listed = await withTimeout(client.listTools(), "MCP tool listing");
    const toolNames = listed.tools.map((tool) => tool.name);
    const recipeResult = await withTimeout(client.callTool({
      name: "stylekit_get_component_recipe",
      arguments: {
        slug: "broadcast-glitch",
        component: "button",
        variant: "cyan",
        params: { size: "lg", fullWidth: true },
        slots: { label: "RUN REPORT" },
      },
    }), "MCP parameterized recipe call");
    const recipe = structuredResult(recipeResult);
    if (!recipe || record(recipeResult)?.isError === true) throw new Error("MCP parameterized recipe call did not return structured content.");

    const briefResult = await withTimeout(client.callTool({
      name: "stylekit_get_implementation_brief",
      arguments: {
        slug: "broadcast-glitch",
        sections: ["guidance", "readiness", "components", "recipes", "tokens"],
        components: ["button"],
      },
    }), "MCP partial brief call");
    const brief = structuredResult(briefResult);
    if (!brief || record(briefResult)?.isError === true) throw new Error("MCP implementation brief projection did not return structured content.");

    const assetPageResult = await withTimeout(client.callTool({
      name: "stylekit_list_assets",
      arguments: { kind: "component-pattern", offset: 0, limit: 1 },
    }), "MCP asset listing");
    const assetPage = structuredResult(assetPageResult);
    if (!assetPage || record(assetPageResult)?.isError === true) throw new Error("MCP asset listing did not return structured content.");
    const assets = Array.isArray(assetPage.assets) ? assetPage.assets : [];
    const firstAsset = record(assets[0]);
    if (!firstAsset || typeof firstAsset.id !== "string" || typeof firstAsset.kind !== "string") {
      throw new Error("MCP asset listing returned no addressable component-pattern asset.");
    }
    const assetDetailResult = await withTimeout(client.callTool({
      name: "stylekit_get_asset",
      arguments: { kind: firstAsset.kind, id: firstAsset.id },
    }), "MCP asset detail");
    const assetDetail = structuredResult(assetDetailResult);
    if (!assetDetail || record(assetDetailResult)?.isError === true) throw new Error("MCP asset detail did not return structured content.");

    return { tools: toolNames, recipe, brief, assetPage, assetDetail };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const diagnostics = serverDiagnostics.join("").trim();
    throw new Error(diagnostics ? `${message}; MCP server stderr: ${diagnostics.slice(0, 2000)}` : message);
  } finally {
    await client.close().catch(() => undefined);
  }
}

function assetPageSummary(value: Record<string, unknown>): Record<string, unknown> {
  const data = record(value.data) ?? value;
  const assets = Array.isArray(data.assets) ? data.assets : [];
  const first = record(assets[0]);
  return {
    source: data.source ?? data.origin,
    count: data.count ?? assets.length,
    total: data.total,
    firstAsset: first ? { kind: first.kind, id: first.id, name: first.name, availability: first.availability } : null,
  };
}

function assetDetailSummary(value: Record<string, unknown>): Record<string, unknown> {
  const nested = record(value.data);
  const data = record(value.metadata) ? value : nested && record(nested.metadata) ? nested : value;
  const metadata = record(data.metadata);
  return {
    source: data.source ?? data.origin,
    kind: metadata?.kind,
    id: metadata?.id,
    availability: metadata?.availability,
    contentLevel: metadata?.contentLevel,
    hasCode: typeof data.code === "string" || Array.isArray(data.code),
    hasLicense: Boolean(data.license ?? metadata?.license),
    hasAttribution: Boolean(data.attribution ?? metadata?.attribution),
  };
}

async function evaluateToolchain(): Promise<{
  status: EvaluationStatus;
  checks: ReturnType<typeof createEvaluationCheck>[];
  observations: ToolObservation[];
  limitations: string[];
}> {
  const checks: ReturnType<typeof createEvaluationCheck>[] = [];
  const observations: ToolObservation[] = [];
  const limitations = [
    "Network access is blocked for MCP and CLI subprocesses; this run proves package-bundled contracts, not the live StyleKit catalogue.",
    "Tool outputs are inspected for deterministic parameter, projection, and asset invariants; no language model is invoked.",
    "These calls do not establish that an agent can complete the three scenario tasks or that the resulting pages look correct in a browser.",
  ];
  const requestedVariant = "cyan";
  const requestedParams = { size: "lg", fullWidth: true };
  const requestedSlots = { label: "RUN REPORT" };
  const recipeInput = { slug: "broadcast-glitch", component: "button", variant: requestedVariant, params: requestedParams, slots: requestedSlots };
  const requestedSections = ["guidance", "readiness", "components", "recipes", "tokens"];

  try {
    const requiredBuilds = [
      path.join(repositoryRoot, "packages", "core", "dist", "discovery", "index.js"),
      mcpServerEntry,
      cliEntry,
    ];
    const missingBuilds = requiredBuilds.filter((file) => !existsSync(file));
    if (missingBuilds.length > 0) {
      throw new Error(`Developer package output is missing (${missingBuilds.map((file) => path.relative(repositoryRoot, file)).join(", ")}). Build stylekit-core, stylekit-cli, and stylekit-mcp before running --scope toolchain.`);
    }
    const mcp = await runMcpToolchain();
    const requiredTools = [
      "stylekit_get_component_recipe",
      "stylekit_get_implementation_brief",
      "stylekit_list_assets",
      "stylekit_get_asset",
    ];
    checkOutput(checks, "mcp:required-tools", requiredTools.every((name) => mcp.tools.includes(name)),
      "MCP server exposes recipe, projected brief, public asset listing, and asset detail tools.",
      "MCP server is missing one or more required tools.");

    const mcpRecipe = recipeSummary(mcp.recipe);
    const mcpClasses = textValue(mcp.recipe.className);
    const mcpCode = textValue(mcp.recipe.code);
    const recipeMatches = mcp.recipe.origin === "bundled" && includesAll(mcpClasses, ["bg-[#00E5D8]", "px-9", "py-4", "text-base", "w-full"]) && mcpCode.includes("RUN REPORT") && JSON.stringify(mcp.recipe.renderOptions ?? {}).includes("cyan");
    checkOutput(checks, "mcp:recipe-parameters", recipeMatches,
      "MCP applied the selected cyan variant, lg/full-width parameters, and custom label.",
      "MCP recipe output did not reflect every requested variant, parameter, and slot.");
    observations.push(toObservation("mcp", "stylekit_get_component_recipe", recipeInput, mcp.recipe, mcpRecipe));

    const mcpProjection = record(mcp.brief.projection);
    const includedSections = Array.isArray(mcpProjection?.includedSections) ? mcpProjection.includedSections.map(textValue) : [];
    const excludedSections = Array.isArray(mcpProjection?.excludedSections) ? mcpProjection.excludedSections.map(textValue) : [];
    const mcpBriefMatches = mcp.brief.origin === "bundled" && mcp.brief.schemaVersion === "stylekit-brief-v1" && mcpProjection?.complete === false && mcpProjection.mode === "partial" && requestedSections.every((section) => includedSections.includes(section)) && !includedSections.includes("lintRules") && excludedSections.includes("lintRules") && Object.keys(record(mcp.brief.components) ?? {}).join(",") === "button";
    checkOutput(checks, "mcp:brief-projection", mcpBriefMatches,
      "MCP brief returned the requested partial sections, selected button template, and an explicit completeness marker.",
      "MCP brief did not preserve the requested projection or mark the response as partial.");
    observations.push(toObservation("mcp", "stylekit_get_implementation_brief", { slug: "broadcast-glitch", sections: requestedSections, components: ["button"] }, mcp.brief, briefProjectionSummary(mcp.brief)));

    const mcpAssetSummary = assetPageSummary(mcp.assetPage);
    const mcpAssetDetail = assetDetailSummary(mcp.assetDetail);
    const mcpAssetMatches = mcpAssetSummary.source === "bundled" && mcpAssetDetail.source === "bundled" && mcpAssetSummary.firstAsset !== null && typeof mcpAssetDetail.id === "string" && mcpAssetDetail.id === (record(mcpAssetSummary.firstAsset)?.id) && mcpAssetDetail.hasLicense === true;
    checkOutput(checks, "mcp:public-asset-roundtrip", mcpAssetMatches,
      "MCP listed a public component-pattern asset and retrieved its attributable detail.",
      "MCP public asset listing/detail did not preserve the exact namespace and asset identity.");
    observations.push(toObservation("mcp", "stylekit_list_assets", { kind: "component-pattern", offset: 0, limit: 1 }, mcp.assetPage, mcpAssetSummary));
    observations.push(toObservation("mcp", "stylekit_get_asset", { kind: "component-pattern", id: mcpAssetDetail.id }, mcp.assetDetail, mcpAssetDetail));

    const cliRecipeRoot = runCli([
      "recipe", "broadcast-glitch", "button",
      "--variant", requestedVariant,
      "--params", JSON.stringify(requestedParams),
      "--slots", JSON.stringify(requestedSlots),
      "--json",
    ]);
    const cliRecipe = record(cliRecipeRoot.result) ?? cliRecipeRoot;
    const cliRecipeSummary = recipeSummary(cliRecipe);
    const cliRecipeClasses = textValue(cliRecipe.className);
    const cliRecipeCode = textValue(cliRecipe.code);
    const cliRecipeMatches = cliRecipe.origin === "bundled" && includesAll(cliRecipeClasses, ["bg-[#00E5D8]", "px-9", "py-4", "text-base", "w-full"]) && cliRecipeCode.includes("RUN REPORT") && JSON.stringify(cliRecipe.renderOptions ?? {}).includes("cyan");
    checkOutput(checks, "cli:recipe-parameters", cliRecipeMatches,
      "CLI applied the selected cyan variant, lg/full-width parameters, and custom label.",
      "CLI recipe output did not reflect every requested variant, parameter, and slot.");
    observations.push(toObservation("cli", "recipe", { slug: "broadcast-glitch", component: "button", variant: requestedVariant, params: requestedParams, slots: requestedSlots }, cliRecipe, cliRecipeSummary));
    checkOutput(checks, "cross-client:recipe-parity", JSON.stringify(cliRecipe.className) === JSON.stringify(mcp.recipe.className) && JSON.stringify(cliRecipe.code) === JSON.stringify(mcp.recipe.code),
      "MCP and CLI returned identical rendered recipe classes and code for the same structured request.",
      "MCP and CLI rendered different recipe output for an identical request.");

    const sectionArgument = requestedSections.join(",");
    const cliBriefRoot = runCli([
      "brief", "broadcast-glitch",
      "--sections", sectionArgument,
      "--components", "button",
      "--json",
    ]);
    const cliBrief = record(cliBriefRoot.result) ?? cliBriefRoot;
    const cliProjection = record(cliBrief.projection);
    const cliIncluded = Array.isArray(cliProjection?.includedSections) ? cliProjection.includedSections.map(textValue) : [];
    const cliExcluded = Array.isArray(cliProjection?.excludedSections) ? cliProjection.excludedSections.map(textValue) : [];
    const cliBriefMatches = cliBrief.origin === "bundled" && cliBrief.schemaVersion === "stylekit-brief-v1" && cliProjection?.complete === false && cliProjection.mode === "partial" && requestedSections.every((section) => cliIncluded.includes(section)) && cliExcluded.includes("lintRules") && Object.keys(record(cliBrief.components) ?? {}).join(",") === "button";
    checkOutput(checks, "cli:brief-projection", cliBriefMatches,
      "CLI brief returned the requested partial sections, selected button template, and explicit completeness marker.",
      "CLI brief did not preserve the requested projection or mark the response as partial.");
    observations.push(toObservation("cli", "brief", { slug: "broadcast-glitch", sections: requestedSections, components: ["button"] }, cliBrief, briefProjectionSummary(cliBrief)));

    const cliAssetsRoot = runCli(["assets", "--kind", "component-pattern", "--offset", "0", "--limit", "1", "--json"]);
    const cliAssets = record(cliAssetsRoot.data) ?? cliAssetsRoot;
    const cliAssetRows = Array.isArray(cliAssets.assets) ? cliAssets.assets : [];
    const cliFirstAsset = record(cliAssetRows[0]);
    const mcpRows = Array.isArray(mcp.assetPage.assets) ? mcp.assetPage.assets : [];
    const mcpFirstAsset = record(mcpRows[0]);
    const cliAssetsMatches = (cliAssets.origin === "bundled" || cliAssets.source === "bundled" || cliAssetsRoot.origin === "bundled" || cliAssetsRoot.source === "bundled") && cliFirstAsset?.id === mcpFirstAsset?.id && cliFirstAsset?.kind === mcpFirstAsset?.kind;
    checkOutput(checks, "cli:public-asset-listing", cliAssetsMatches,
      "CLI and MCP list the same first bundled component-pattern asset.",
      "CLI public asset listing diverged from the MCP bundled asset result.");
    observations.push(toObservation("cli", "assets", { kind: "component-pattern", offset: 0, limit: 1 }, cliAssetsRoot, assetPageSummary(cliAssetsRoot)));
    if (mcpFirstAsset && typeof mcpFirstAsset.kind === "string" && typeof mcpFirstAsset.id === "string") {
      const cliAssetRoot = runCli(["asset", mcpFirstAsset.kind, mcpFirstAsset.id, "--json"]);
      const cliAsset = record(cliAssetRoot.data) ?? cliAssetRoot;
      const cliDetail = assetDetailSummary(cliAsset);
      const mcpDetail = assetDetailSummary(mcp.assetDetail);
      const sameAssetDetail = (cliDetail.source === "bundled" || cliDetail.origin === "bundled" || cliAssetRoot.source === "bundled" || cliAssetRoot.origin === "bundled") && cliDetail.kind === mcpDetail.kind && cliDetail.id === mcpDetail.id && cliDetail.hasLicense === mcpDetail.hasLicense;
      checkOutput(checks, "cli:public-asset-detail", sameAssetDetail,
        "CLI retrieved the same public asset identity and license metadata as MCP.",
        "CLI public asset detail diverged from MCP or lost license metadata.");
      observations.push(toObservation("cli", "asset", { kind: mcpFirstAsset.kind, id: mcpFirstAsset.id }, cliAssetRoot, cliDetail));
    } else {
      checks.push(createEvaluationCheck("cli:public-asset-detail", "inconclusive", "MCP did not provide an asset identity for the CLI detail check."));
    }
  } catch (error) {
    checks.push(createEvaluationCheck("toolchain-runtime", "fail", error instanceof Error ? error.message : String(error)));
  }

  return {
    status: checks.length === 0 ? "inconclusive" : checks.some((check) => check.status === "fail") ? "fail" : checks.some((check) => check.status === "inconclusive") ? "inconclusive" : "pass",
    checks,
    observations,
    limitations,
  };
}

function renderMarkdown(report: ToolWorkflowEvaluationReport): string {
  const lines = [
    "# StyleKit tool workflow evaluation",
    "",
    `- Run: ${report.run.id}`,
    `- Scope: ${report.run.scope}`,
    `- Result: **${report.status.toUpperCase()}** (exit ${report.exitCode})`,
    `- Toolchain source: ${report.toolchain.sourceAuthority}; network ${report.toolchain.networkAccess}`,
    "",
    "## Deterministic tool-chain regression",
    "",
    `Status: **${report.toolchain.status.toUpperCase()}**`,
    "",
    ...report.toolchain.checks.map((check) => `- ${check.status.toUpperCase()} \`${check.id}\` — ${check.message}`),
    "",
    "## Candidate scenarios",
    "",
    ...(report.candidate
      ? report.candidate.scenarios.map((scenario) => {
          const spec = TOOL_WORKFLOW_SCENARIOS.find((entry) => entry.id === scenario.id);
          return `### ${spec?.title ?? scenario.id}\n\nStatus: **${scenario.status.toUpperCase()}**; source check ${scenario.sourceValidation}; CSS compile ${scenario.cssCompilation}.\n\n${scenario.checks.map((check) => `- ${check.status.toUpperCase()} \`${check.id}\` — ${check.message}`).join("\n")}`;
        })
      : ["No candidate directory was supplied; real model output and page/browser behavior are inconclusive." ]),
    "",
    "## Coverage",
    "",
    "| Scenario | Criteria | Runner verified | Browser/human reported | Failed | Inconclusive | TS/CSS consumer checks |",
    "|---|---:|---:|---:|---:|---:|---|",
    ...report.coverage.scenarios.map((scenario) => `| ${scenario.id} | ${scenario.criteria.length} | ${scenario.verified} | ${scenario.reported} | ${scenario.failed} | ${scenario.inconclusive} | ${scenario.consumerChecks.typeScript}/${scenario.consumerChecks.tailwindCss} |`),
    "",
    "## Limits",
    "",
    ...report.toolchain.limitations.map((item) => `- ${item}`),
    ...(report.candidate?.limitations ?? []).map((item) => `- ${item}`),
    "",
  ];
  return lines.join("\n");
}

async function main(): Promise<void> {
  const args = parseArguments(process.argv.slice(2));
  if (!args) {
    console.log(usage());
    process.exitCode = process.argv.slice(2).includes("--help") || process.argv.slice(2).includes("-h") ? 0 : 2;
    return;
  }

  if (args.scenariosOnly) {
    process.stdout.write(`${JSON.stringify({ schemaVersion: "stylekit-tool-workflow-scenarios-v1", scenarios: TOOL_WORKFLOW_SCENARIOS }, null, 2)}\n`);
    return;
  }

  const runId = `workflow-${new Date().toISOString().replaceAll(/[:.]/g, "-")}-${randomUUID().slice(0, 8)}`;
  const toolchain = args.scope === "candidate"
    ? {
        status: "inconclusive" as const,
        checks: [createEvaluationCheck("toolchain-skipped", "inconclusive", "Tool-chain regression was skipped by --scope candidate.")],
        observations: [],
        sourceAuthority: "bundled-package-snapshot" as const,
        networkAccess: "blocked" as const,
        limitations: ["Tool-chain regression was not requested for this run."],
      }
    : await evaluateToolchain();

  let candidate: CandidateEvaluation | null = null;
  if (args.candidateDirectory) {
    candidate = await evaluateCandidateDirectory(args.candidateDirectory, repositoryRoot);
  } else if (args.scope !== "toolchain") {
    candidate = {
      status: "inconclusive",
      directory: "",
      modelRun: { status: "not-provided", verification: "not-applicable" },
      scenarios: [],
      checks: [createEvaluationCheck("candidate-not-provided", "inconclusive", "Provide --candidate-dir to evaluate generated or recorded page artifacts.", "candidate-artifact")],
      limitations: ["No real model task or candidate artifact directory was supplied."],
    };
  }

  const selectedStatuses = args.scope === "toolchain"
    ? [toolchain.status]
    : args.scope === "candidate"
      ? [candidate?.status ?? "inconclusive"]
      : [toolchain.status, candidate?.status ?? "inconclusive"];
  const status: EvaluationStatus = selectedStatuses.includes("fail")
    ? "fail"
    : selectedStatuses.length === 0 || selectedStatuses.includes("inconclusive")
      ? "inconclusive"
      : "pass";

  const report: ToolWorkflowEvaluationReport = {
    schemaVersion: "stylekit-tool-workflow-evaluation-v1",
    run: { id: runId, createdAt: new Date().toISOString(), scope: args.scope },
    status,
    exitCode: statusExitCode(status),
    toolchain: {
      status: toolchain.status,
      checks: toolchain.checks,
      observations: toolchain.observations,
      sourceAuthority: "bundled-package-snapshot",
      networkAccess: "blocked",
      limitations: toolchain.limitations,
    },
    candidate,
    coverage: buildCoverageSummary(candidate),
  };

  const json = `${JSON.stringify(report, null, 2)}\n`;
  if (args.outputPath) {
    const absoluteOutput = path.resolve(args.outputPath);
    await mkdir(path.dirname(absoluteOutput), { recursive: true });
    await writeFile(absoluteOutput, json, "utf8");
    console.error(`[evaluate-tool-workflows] evidence JSON written: ${absoluteOutput}`);
  }
  if (args.format === "markdown") {
    process.stdout.write(renderMarkdown(report));
  } else if (args.outputPath) {
    const checks = [...report.toolchain.checks, ...(report.candidate?.checks ?? [])];
    process.stdout.write(`${JSON.stringify({
      schemaVersion: report.schemaVersion,
      run: report.run,
      status: report.status,
      exitCode: report.exitCode,
      toolchainStatus: report.toolchain.status,
      candidateStatus: report.candidate?.status ?? null,
      checks: {
        pass: checks.filter((check) => check.status === "pass").length,
        fail: checks.filter((check) => check.status === "fail").length,
        inconclusive: checks.filter((check) => check.status === "inconclusive").length,
      },
      evidencePath: path.resolve(args.outputPath),
    }, null, 2)}\n`);
  } else {
    process.stdout.write(json);
  }
  process.exitCode = report.exitCode;
}

void main().catch((error: unknown) => {
  console.error(`[evaluate-tool-workflows] ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
