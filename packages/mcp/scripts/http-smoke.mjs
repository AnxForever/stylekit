// Smoke test: start the built server in HTTP mode and exercise it over the
// Streamable HTTP transport, including auth, CORS and body limits.
import { spawn } from "node:child_process";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const TOKEN = "smoke-token";
const child = spawn(process.execPath, ["dist/index.js", "--http", "--host", "127.0.0.1", "--port", "0"], {
  env: {
    ...process.env,
    MCP_HTTP_TOKEN: TOKEN,
    MCP_RATE_LIMIT: "0",
    MCP_MAX_BODY_BYTES: "4096",
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let failures = 0;
function check(cond, label) {
  console.log(`${cond ? "PASS" : "FAIL"}: ${label}`);
  if (!cond) failures++;
}

const address = await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error("HTTP server did not start")), 15_000);
  let stderr = "";
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk) => {
    stderr += chunk;
    const match = stderr.match(/listening on (http:\/\/[^\s]+)/);
    if (!match) return;
    clearTimeout(timer);
    resolve(match[1]);
  });
  child.once("exit", (code) => {
    clearTimeout(timer);
    reject(new Error(`HTTP server exited early (${code}): ${stderr}`));
  });
});

const health = await fetch(address.replace(/\/mcp$/, "/healthz"));
check(health.status === 200 && (await health.json()).ok === true, "health endpoint is public");

const unauthorized = await fetch(address, {
  method: "POST",
  headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
  body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
});
check(unauthorized.status === 401, "missing bearer token is rejected");

const preflight = await fetch(address, {
  method: "OPTIONS",
  headers: { origin: "http://localhost:3000", "access-control-request-method": "POST" },
});
check(
  preflight.status === 204 && preflight.headers.get("access-control-allow-origin") === "*",
  "CORS preflight allows browser clients",
);

const client = new Client({ name: "stylekit-mcp-http-smoke", version: "1.0.0" });
await client.connect(
  new StreamableHTTPClientTransport(new URL(address), {
    requestInit: { headers: { Authorization: `Bearer ${TOKEN}` } },
  }),
);

const { tools } = await client.listTools();
check(tools.length === 5, `five tools are served over HTTP (${tools.length})`);

const search = await client.callTool({ name: "stylekit_search_styles", arguments: { query: "glass" } });
check(
  search.isError !== true && search.structuredContent?.results?.length > 0,
  "search works over HTTP",
);

const lint = await client.callTool({
  name: "stylekit_lint_code",
  arguments: { slug: "neo-brutalist", code: '<div className="rounded-xl shadow-lg" />' },
});
check(
  lint.structuredContent?.ok === false && lint.structuredContent?.violations?.length > 0,
  "lint_code runs over HTTP and reports violations",
);

const guide = await client.callTool({
  name: "stylekit_get_style",
  arguments: { slug: "neo-brutalist" },
});
const withBrief = await client.callTool({
  name: "stylekit_get_style",
  arguments: { slug: "neo-brutalist", include: ["tokens", "brief"] },
});
check(
  withBrief.isError !== true &&
    withBrief.structuredContent?.tokens?.colors?.background?.primary !== undefined &&
    withBrief.structuredContent?.brief?.schemaVersion === "stylekit-brief-v1",
  "get_style attaches tokens and the implementation brief over HTTP",
);
check(
  withBrief.content[0].text.length > guide.content[0].text.length,
  "include adds sections to the rendered response",
);

const getAttempt = await fetch(address, {
  headers: { authorization: `Bearer ${TOKEN}`, accept: "text/event-stream" },
  signal: AbortSignal.timeout(3000),
});
check(getAttempt.status === 405, "stateless GET is rejected instead of holding an SSE stream");

const unknown = await client.callTool({ name: "stylekit_get_style", arguments: { slug: "no-such-style" } });
check(unknown.isError === true, "unknown style still returns a tool error over HTTP");

const tooLarge = await fetch(address, {
  method: "POST",
  headers: {
    authorization: `Bearer ${TOKEN}`,
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
  },
  body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list", padding: "x".repeat(8192) }),
});
check(tooLarge.status === 413, "oversized request bodies are rejected");

const unknownPath = await fetch(`${address}/nope`, {
  method: "POST",
  headers: { authorization: `Bearer ${TOKEN}`, "content-type": "application/json" },
  body: "{}",
});
check(unknownPath.status === 404, "unknown paths return 404");

await client.close();
child.kill("SIGTERM");
await new Promise((resolve) => child.once("exit", resolve));
console.log(failures === 0 ? "\nALL HTTP SMOKE TESTS PASSED" : `\n${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
