#!/usr/bin/env node

import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { parseSmokeArgs, runSmokeCheck } from "./smoke-check.mjs";

const port = process.env.SMOKE_PORT || process.env.PORT || "3000";
const host = process.env.SMOKE_HOST || "localhost";
const baseUrl =
  process.env.SMOKE_BASE_URL || process.env.BASE_URL || `http://${host}:${port}`;
const readyUrl = new URL("/api/health", baseUrl).toString();
const readyTimeoutMs = Number(process.env.SMOKE_READY_TIMEOUT_MS || "60000");

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", port, "-H", host],
  {
    env: {
      ...process.env,
      PORT: port,
    },
    stdio: ["ignore", "pipe", "pipe"],
  }
);

let serverExited = false;
let serverExitCode = null;

server.stdout.on("data", (chunk) => process.stdout.write(`[next] ${chunk}`));
server.stderr.on("data", (chunk) => process.stderr.write(`[next] ${chunk}`));
server.on("exit", (code, signal) => {
  serverExited = true;
  serverExitCode = signal || code;
});

async function waitForReady() {
  const startedAt = Date.now();
  let lastError = "";

  while (Date.now() - startedAt < readyTimeoutMs) {
    if (serverExited) {
      throw new Error(`Next server exited before ready: ${serverExitCode}`);
    }

    try {
      const response = await fetch(readyUrl, {
        signal: AbortSignal.timeout(2000),
      });
      if (response.ok) {
        await response.arrayBuffer();
        return;
      }
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }

    await delay(500);
  }

  throw new Error(`Next server did not become ready at ${readyUrl}: ${lastError}`);
}

async function stopServer() {
  if (serverExited) return;
  server.kill("SIGTERM");
  await delay(3000);
  if (!serverExited) {
    server.kill("SIGKILL");
  }
}

process.on("SIGINT", () => {
  stopServer().finally(() => process.exit(130));
});

process.on("SIGTERM", () => {
  stopServer().finally(() => process.exit(143));
});

try {
  await waitForReady();
  await runSmokeCheck({
    ...parseSmokeArgs(process.argv.slice(2)),
    baseUrl,
  });
  console.log("[smoke] local production server passed");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await stopServer();
}
