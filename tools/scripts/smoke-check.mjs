#!/usr/bin/env node

import { pathToFileURL } from "node:url";

const DEFAULT_ROUTES = [
  "/api/health",
  "/api/styles",
  "/",
  "/styles",
  "/styles/graffiti-street",
  "/en/styles/graffiti-street",
  "/en/styles/graffiti-street/showcase",
];

function readOption(argv, name) {
  const prefix = `${name}=`;
  const values = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === name && argv[index + 1]) {
      values.push(argv[index + 1]);
      index += 1;
    } else if (arg.startsWith(prefix)) {
      values.push(arg.slice(prefix.length));
    }
  }

  return values;
}

function parseRoutes(argv) {
  const routes = [
    ...readOption(argv, "--route"),
    ...readOption(argv, "--routes").flatMap((value) => value.split(",")),
  ]
    .map((route) => route.trim())
    .filter(Boolean);

  if (routes.length > 0) {
    return routes;
  }

  if (process.env.SMOKE_ROUTES) {
    return process.env.SMOKE_ROUTES.split(",")
      .map((route) => route.trim())
      .filter(Boolean);
  }

  return DEFAULT_ROUTES;
}

export function parseSmokeArgs(argv = process.argv.slice(2)) {
  const baseUrl =
    readOption(argv, "--base-url")[0] ||
    process.env.SMOKE_BASE_URL ||
    process.env.BASE_URL ||
    `http://127.0.0.1:${process.env.PORT || "3000"}`;

  const timeoutMs = Number(
    readOption(argv, "--timeout-ms")[0] ||
      process.env.SMOKE_TIMEOUT_MS ||
      "15000"
  );

  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new Error(`Invalid smoke timeout: ${timeoutMs}`);
  }

  return {
    baseUrl,
    routes: parseRoutes(argv),
    timeoutMs,
  };
}

function buildUrl(baseUrl, route) {
  return new URL(route, baseUrl).toString();
}

async function checkRoute({ baseUrl, route, timeoutMs }) {
  const url = buildUrl(baseUrl, route);
  const startedAt = performance.now();
  const response = await fetch(url, {
    headers: {
      accept: "text/html,application/json;q=0.9,*/*;q=0.8",
      "user-agent": "stylekit-smoke-check/1.0",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(timeoutMs),
  });
  const body = await response.arrayBuffer();
  const durationMs = Math.round(performance.now() - startedAt);

  return {
    route,
    status: response.status,
    ok: response.ok,
    durationMs,
    bytes: body.byteLength,
  };
}

export async function runSmokeCheck(options = {}) {
  const config = {
    ...parseSmokeArgs([]),
    ...options,
  };
  const results = [];
  const failures = [];

  console.log(
    `[smoke] base=${config.baseUrl} routes=${config.routes.length} timeout=${config.timeoutMs}ms`
  );

  for (const route of config.routes) {
    try {
      const result = await checkRoute({
        baseUrl: config.baseUrl,
        route,
        timeoutMs: config.timeoutMs,
      });
      results.push(result);
      const status = result.ok ? "ok" : "fail";
      console.log(
        `[smoke] ${status} route=${route} status=${result.status} total=${result.durationMs}ms bytes=${result.bytes}`
      );
      if (!result.ok) {
        failures.push(`${route} returned HTTP ${result.status}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push(`${route} failed: ${message}`);
      console.log(`[smoke] fail route=${route} error=${message}`);
    }
  }

  if (failures.length > 0) {
    const error = new Error(
      `Smoke check failed:\n${failures.map((item) => `- ${item}`).join("\n")}`
    );
    error.results = results;
    throw error;
  }

  return results;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runSmokeCheck(parseSmokeArgs())
    .then(() => {
      console.log("[smoke] passed");
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exit(1);
    });
}
