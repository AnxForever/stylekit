import assert from "node:assert/strict";
import { createServer } from "node:http";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { clearRemoteCache, getImplementationBrief } from "stylekit-core/discovery";
import { registerStyleKitTools } from "../src/tools.js";

const dynamicSlug = "live-only-lint-check";
const liveOnlyClass = "sk-live-only-forbidden-970px";
const sourceBrief = getImplementationBrief("neo-brutalist");
assert.ok(sourceBrief, "a bundled brief is available as a valid contract fixture");

const liveBrief = structuredClone(sourceBrief);
liveBrief.slug = dynamicSlug;
liveBrief.name = "Live-only lint fixture";
liveBrief.nameEn = "Live-only lint fixture";
liveBrief.provenance = {
  ...liveBrief.provenance,
  source: "static",
  contentHash: "test-live-lint-contract",
  url: `http://127.0.0.1/api/styles/${dynamicSlug}/brief`,
};
const lintRules = liveBrief.lintRules as unknown as {
  schemaVersion: "stylekit-lint-v1" | "stylekit-lint-v2";
  forbiddenClasses: Array<{ className: string; reason: string; source: "tokens" | "curated" }>;
  forbiddenExceptions?: Array<{
    className: string;
    reason: string;
    element?: {
      tags?: string[];
      classesAll?: string[];
      squareDimensions?: boolean;
      maxDimension?: number;
    };
  }>;
};
lintRules.schemaVersion = "stylekit-lint-v2";
lintRules.forbiddenExceptions = [{
  className: "rounded-full",
  reason: "Tiny square status dots may be round.",
  element: {
    tags: ["span"],
    classesAll: ["w-2", "h-2"],
    squareDimensions: true,
    maxDimension: 2,
  },
}];
lintRules.forbiddenClasses.push({
  className: liveOnlyClass,
  reason: "This rule exists only in the live test brief.",
  source: "tokens",
});

const httpServer = createServer((request, response) => {
  const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
  if (pathname === "/api/styles/synthwave/tokens") {
    response.writeHead(503, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "test token source unavailable" }));
    return;
  }
  if (pathname === `/api/styles/${dynamicSlug}/brief`) {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(liveBrief));
    return;
  }
  if (pathname === "/api/styles/neo-brutalist/brief") {
    response.writeHead(503, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "test source unavailable" }));
    return;
  }
  response.writeHead(404, { "content-type": "application/json" });
  response.end(JSON.stringify({ error: "not found" }));
});

await new Promise<void>((resolve) => httpServer.listen(0, "127.0.0.1", resolve));
const address = httpServer.address();
assert.ok(address && typeof address !== "string");
const baseUrl = `http://127.0.0.1:${address.port}`;

const server = new McpServer({ name: "stylekit-live-lint-test", version: "test" });
registerStyleKitTools(server, { baseUrl, timeoutMs: 1_000, cacheTtlMs: 0 });
const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
const client = new Client({ name: "stylekit-live-lint-test-client", version: "test" });
type LintOutput = {
  origin?: string;
  contentSource?: string;
  fallbackReason?: string;
  violations?: Array<{ className: string; reason: string }>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function structuredRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function resultText(result: unknown): string | undefined {
  const content = isRecord(result) && Array.isArray(result.content) ? result.content : [];
  const first = content[0];
  if (!isRecord(first) || first.type !== "text" || typeof first.text !== "string") {
    return undefined;
  }
  return first.text;
}

function records(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function lintOutput(value: unknown): LintOutput {
  const record = structuredRecord(value);
  const violations = records(record.violations).flatMap((item) =>
    typeof item.className === "string" && typeof item.reason === "string"
      ? [{ className: item.className, reason: item.reason }]
      : [],
  );
  return {
    ...(typeof record.origin === "string" ? { origin: record.origin } : {}),
    ...(typeof record.contentSource === "string" ? { contentSource: record.contentSource } : {}),
    ...(typeof record.fallbackReason === "string" ? { fallbackReason: record.fallbackReason } : {}),
    violations,
  };
}

try {
  clearRemoteCache();
  await server.connect(serverTransport);
  await client.connect(clientTransport);

  const tokenResult = await client.callTool({
    name: "stylekit_get_style_tokens",
    arguments: { slug: "synthwave" },
  });
  const tokenContent = structuredRecord(tokenResult.structuredContent);
  const tokenForbidden = structuredRecord(tokenContent.forbidden);
  assert.equal(tokenResult.isError, undefined, resultText(tokenResult));
  assert.equal(tokenContent.origin, "bundled");
  assert.match(String(tokenContent.fallbackReason), /503|unavailable/i);
  assert.ok(records(tokenForbidden.exceptions).length > 0);
  clearRemoteCache();

  const briefResult = await client.callTool({
    name: "stylekit_get_implementation_brief",
    arguments: { slug: dynamicSlug },
  });
  assert.equal(briefResult.isError, undefined, resultText(briefResult));
  const briefContent = structuredRecord(briefResult.structuredContent);
  const briefProvenance = structuredRecord(briefContent.provenance);
  assert.equal(briefContent.origin, "live");
  assert.equal(briefProvenance.source, "static");

  const liveLint = await client.callTool({
    name: "stylekit_lint_code",
    arguments: {
      slug: dynamicSlug,
      code: `<div className="${liveOnlyClass}" />`,
    },
  });
  const liveLintContent = lintOutput(liveLint.structuredContent);
  assert.equal(liveLint.isError, undefined);
  assert.equal(liveLintContent?.origin, "live");
  assert.equal(liveLintContent?.contentSource, "static");
  assert.deepEqual(
    liveLintContent?.violations?.map((item) => ({
      className: item.className,
      reason: item.reason,
    })),
    [{ className: liveOnlyClass, reason: "This rule exists only in the live test brief." }],
  );

  clearRemoteCache();
  const scopedException = await client.callTool({
    name: "stylekit_lint_code",
    arguments: {
      slug: dynamicSlug,
      code: '<span className="w-2 h-2 rounded-full" />',
    },
  });
  const scopedExceptionContent = structuredRecord(scopedException.structuredContent);
  assert.equal(scopedException.isError, undefined);
  assert.equal(scopedExceptionContent.status, "pass");
  assert.equal(
    records(scopedExceptionContent.violations).some((item) => item.className === "rounded-full"),
    false,
  );

  clearRemoteCache();
  const bundledLint = await client.callTool({
    name: "stylekit_lint_code",
    arguments: {
      slug: "neo-brutalist",
      code: '<div className="rounded-xl" />',
    },
  });
  const bundledLintContent = lintOutput(bundledLint.structuredContent);
  assert.equal(bundledLint.isError, undefined);
  assert.equal(bundledLintContent?.origin, "bundled");
  assert.match(String(bundledLintContent?.fallbackReason), /503|unavailable/i);
  assert.equal(bundledLintContent?.contentSource, "bundled");
  assert.equal(bundledLintContent?.violations?.[0]?.className, "rounded-xl");

  console.log("PASS: registered MCP lint handler applies a live-only rule and reports live and bundled provenance correctly");
} finally {
  clearRemoteCache();
  await client.close();
  await new Promise<void>((resolve, reject) => httpServer.close((error) => error ? reject(error) : resolve()));
}
