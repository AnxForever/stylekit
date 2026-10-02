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
  forbiddenClasses: Array<{ className: string; reason: string; source: "tokens" | "curated" }>;
};
lintRules.forbiddenClasses.push({
  className: liveOnlyClass,
  reason: "This rule exists only in the live test brief.",
  source: "tokens",
});

const httpServer = createServer((request, response) => {
  const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
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

try {
  clearRemoteCache();
  await server.connect(serverTransport);
  await client.connect(clientTransport);

  const briefResult = await client.callTool({
    name: "stylekit_get_implementation_brief",
    arguments: { slug: dynamicSlug },
  });
  assert.equal(briefResult.isError, undefined);
  const briefContent = briefResult.structuredContent as { origin?: string; provenance?: { source?: string } };
  assert.equal(briefContent?.origin, "live");
  assert.equal(briefContent?.provenance?.source, "static");

  const liveLint = await client.callTool({
    name: "stylekit_lint_code",
    arguments: {
      slug: dynamicSlug,
      code: `<div className="${liveOnlyClass}" />`,
    },
  });
  const liveLintContent = liveLint.structuredContent as LintOutput;
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
  const bundledLint = await client.callTool({
    name: "stylekit_lint_code",
    arguments: {
      slug: "neo-brutalist",
      code: '<div className="rounded-xl" />',
    },
  });
  const bundledLintContent = bundledLint.structuredContent as LintOutput;
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
