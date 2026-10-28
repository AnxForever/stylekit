#!/usr/bin/env node
// Verify the distributable packages in a project with no workspace links.
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const temporary = mkdtempSync(join(tmpdir(), "stylekit-consumer-"));
const keep = process.argv.includes("--keep");
const run = (command, args, cwd = temporary) => execFileSync(command, args, {
  cwd, stdio: "pipe", timeout: 180_000,
});
// Windows exposes pnpm as a `.cmd` shim that Node cannot spawn directly, so
// resolve the JavaScript entry behind it. A global npm install ships a complete
// `pnpm.cjs`; the corepack shim is only used when that is absent because it
// re-enters the package manager instead of running standalone.
const PNPM_CLI_CANDIDATES = [
  ...(process.env.APPDATA
    ? [join(process.env.APPDATA, "npm", "node_modules", "pnpm", "bin", "pnpm.cjs")]
    : []),
  join(dirname(process.execPath), "node_modules", "pnpm", "bin", "pnpm.cjs"),
  join(dirname(process.execPath), "node_modules", "corepack", "dist", "pnpm.js"),
];
const PNPM_CLI = PNPM_CLI_CANDIDATES.find((candidate) => existsSync(candidate));
// A package manager run from inside another package manager inherits INIT_CWD,
// which makes pnpm treat the caller's workspace as the project. These commands
// target the throwaway consumer directory, so that hint must not leak in.
const PNPM_ENV = { ...process.env };
delete PNPM_ENV.INIT_CWD;
const pnpm = (args, cwd = temporary) => PNPM_CLI
  ? execFileSync(process.execPath, [PNPM_CLI, ...args], { cwd, env: PNPM_ENV, stdio: "pipe", timeout: 180_000 })
  : run("pnpm", args, cwd);

try {
  const tarballs = [];
  for (const name of ["core", "cli", "mcp"]) {
    const directory = join(root, "packages", name);
    if (!existsSync(join(directory, "dist", "index.js"))) {
      throw new Error(`Build packages first: pnpm run test:developer-packages (${name} dist is missing)`);
    }
    const tarball = join(temporary, `${name}.tgz`);
    pnpm(["pack", "--out", tarball], directory);
    tarballs.push(tarball);
  }
  writeFileSync(join(temporary, "package.json"), JSON.stringify({ name: "stylekit-consumer-check", private: true, type: "module" }));
  const mcp = JSON.parse(readFileSync(join(root, "packages", "mcp", "package.json"), "utf8"));
  const clientVersion = mcp.devDependencies["@modelcontextprotocol/client"];
  pnpm(["add", "--ignore-scripts", ...tarballs, `@modelcontextprotocol/client@${clientVersion}`]);
  copyFileSync(join(root, "tools", "lib", "developer-consumer-probe.mjs"), join(temporary, "probe.mjs"));
  process.stdout.write(run(process.execPath, ["probe.mjs"]));
} catch (error) {
  console.error(`[consumer-check] FAIL: ${error.message}`);
  if (error.stdout) process.stderr.write(error.stdout);
  if (error.stderr) process.stderr.write(error.stderr);
  process.exitCode = 1;
} finally {
  if (keep) console.log(`[consumer-check] Artifacts: ${temporary}`);
  else rmSync(temporary, { recursive: true, force: true });
}
