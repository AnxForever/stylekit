#!/usr/bin/env node

const fs = require("node:fs");
const http = require("node:http");
const { spawn } = require("node:child_process");

function getWslHostIp() {
  if (!process.env.WSL_DISTRO_NAME) return null;
  try {
    const resolvConf = fs.readFileSync("/etc/resolv.conf", "utf8");
    const match = resolvConf.match(/^nameserver\s+([0-9.]+)/m);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

function buildCandidates() {
  const candidates = [];
  if (process.env.CHROME_BROWSER_URL) {
    candidates.push(process.env.CHROME_BROWSER_URL);
  }

  const wslHostIp = getWslHostIp();
  if (wslHostIp) {
    candidates.push(`http://${wslHostIp}:9222`);
  }

  candidates.push("http://127.0.0.1:9222");
  return [...new Set(candidates)];
}

function isReachable(browserUrl, timeoutMs = 1200) {
  return new Promise((resolve) => {
    let url;
    try {
      url = new URL("/json/version", browserUrl);
    } catch {
      resolve(false);
      return;
    }

    const request = http.get(
      url,
      { timeout: timeoutMs, headers: { Accept: "application/json" } },
      (response) => {
        const ok = (response.statusCode ?? 500) >= 200 && (response.statusCode ?? 500) < 400;
        response.resume();
        resolve(ok);
      },
    );

    request.on("timeout", () => {
      request.destroy();
      resolve(false);
    });
    request.on("error", () => resolve(false));
  });
}

async function pickBrowserUrl() {
  const candidates = buildCandidates();
  for (const candidate of candidates) {
    if (await isReachable(candidate)) {
      return candidate;
    }
  }
  return candidates[0];
}

async function main() {
  const browserUrl = await pickBrowserUrl();
  const npxBin = process.platform === "win32" ? "npx.cmd" : "npx";
  const extraArgs = process.argv.slice(2);
  const args = ["chrome-devtools-mcp@latest", "--browserUrl", browserUrl, ...extraArgs];

  console.error(`[chrome-devtools-mcp] browserUrl=${browserUrl}`);

  const child = spawn(npxBin, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  child.on("error", (error) => {
    console.error(`[chrome-devtools-mcp] failed to start: ${error.message}`);
    process.exit(1);
  });
  child.on("exit", (code) => {
    process.exit(code ?? 1);
  });
}

main();
