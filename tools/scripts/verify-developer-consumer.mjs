#!/usr/bin/env node
// Verify the distributable packages in a project with no workspace links.
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const temporary = mkdtempSync(join(tmpdir(), "stylekit-consumer-"));
const keep = process.argv.includes("--keep");
const run = (command, args, cwd = temporary) => execFileSync(command, args, {
  cwd, stdio: "pipe", timeout: 180_000,
});

try {
  const tarballs = [];
  for (const name of ["core", "cli", "mcp"]) {
    const directory = join(root, "packages", name);
    if (!existsSync(join(directory, "dist", "index.js"))) {
      throw new Error(`Build packages first: pnpm run test:developer-packages (${name} dist is missing)`);
    }
    const tarball = join(temporary, `${name}.tgz`);
    run("pnpm", ["pack", "--out", tarball], directory);
    tarballs.push(tarball);
  }
  writeFileSync(join(temporary, "package.json"), JSON.stringify({ name: "stylekit-consumer-check", private: true, type: "module" }));
  const mcp = JSON.parse(readFileSync(join(root, "packages", "mcp", "package.json"), "utf8"));
  run("pnpm", ["add", "--ignore-scripts", ...tarballs, `@modelcontextprotocol/sdk@${mcp.dependencies["@modelcontextprotocol/sdk"]}`]);
  const networkGuard = join(temporary, "consumer-network-guard.mjs");
  writeFileSync(networkGuard, [
    "const originalFetch = globalThis.fetch;",
    "globalThis.fetch = async (input, init) => {",
    "  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);",
    "  if (!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) throw new Error('Consumer verification: external fetch disabled');",
    "  return originalFetch(input, init);",
    "};",
    "",
  ].join("\n"));
  const probeEnvironment = {
    ...process.env,
    NODE_OPTIONS: [process.env.NODE_OPTIONS, `--import=${pathToFileURL(networkGuard).href}`].filter(Boolean).join(" "),
  };
  for (const name of ["developer-consumer-probe.mjs", "tooling-consumer-probe.mjs"]) {
    copyFileSync(join(root, "tools", "lib", name), join(temporary, name));
    // Probe child processes inherit the guard; localhost fault fixtures remain
    // available while the installed packages use their bundled catalog.
    process.stdout.write(execFileSync(process.execPath, [name], {
      cwd: temporary, env: probeEnvironment, stdio: "pipe", timeout: 180_000,
    }));
  }
} catch (error) {
  console.error(`[consumer-check] FAIL: ${error.message}`);
  if (error.stdout) process.stderr.write(error.stdout);
  if (error.stderr) process.stderr.write(error.stderr);
  process.exitCode = 1;
} finally {
  if (keep) console.log(`[consumer-check] Artifacts: ${temporary}`);
  else rmSync(temporary, { recursive: true, force: true });
}
