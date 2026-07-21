#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { access, mkdir, mkdtemp, readFile, realpath, rename, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIR, "../..");
const PACK_SLUG = "corporate-clean-saas";
const EXPECTED = Object.freeze({
  next: "16.1.6",
  react: "19.2.3",
  reactDom: "19.2.3",
  tailwindcss: "4.1.18",
  tailwindPostcss: "4.1.18",
  typescript: "5.9.3",
  typesNode: "20.19.31",
  typesReact: "19.2.13",
  typesReactDom: "19.2.3",
  pnpm: "11.5.3",
});
const PROOF_PATH = path.resolve(
  REPOSITORY_ROOT,
  process.env.PACK_INSTALL_PROOF_PATH
    ?? "docs/examples/corporate-clean-saas-install-proof.json",
);
const KEEP_TEMP = process.env.PACK_INSTALL_KEEP_TEMP === "1";
const SKIP_BROWSER = process.env.PACK_INSTALL_SKIP_BROWSER === "1";
const COMMAND_TIMEOUT_MS = Number(process.env.PACK_INSTALL_COMMAND_TIMEOUT_MS ?? 600_000);
const SERVER_TIMEOUT_MS = Number(process.env.PACK_INSTALL_SERVER_TIMEOUT_MS ?? 90_000);

const proof = {
  schemaVersion: 1,
  pack: PACK_SLUG,
  status: "running",
  startedAt: new Date().toISOString(),
  finishedAt: null,
  durationMs: null,
  source: {
    repositoryCommit: null,
    repositoryDirty: null,
    registryItemSha256: null,
    registryFileCount: 0,
  },
  environment: {
    platform: process.platform,
    architecture: process.arch,
    node: process.version,
    pnpm: null,
  },
  expectedVersions: EXPECTED,
  installedVersions: {},
  temporaryProject: {
    path: null,
    retained: KEEP_TEMP,
    cleanupPolicy: KEEP_TEMP ? "retained by PACK_INSTALL_KEEP_TEMP=1" : "removed after verification",
  },
  conflictPolicy: {
    mode: "fail",
    overwritesAllowed: false,
    checkedTargets: 0,
  },
  commands: [],
  artifacts: {
    registryFiles: [],
    lockfile: null,
    buildId: null,
    response: null,
  },
  browserSmoke: {
    skipped: SKIP_BROWSER,
    desktop: null,
    mobile: null,
    reducedMotion: null,
    keyboard: null,
  },
  error: null,
};

const startedAtMs = Date.now();
let temporaryProject = null;
let productionServer = null;

function sha256(content) {
  return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}

function tail(value, length = 4_000) {
  const sanitized = value.replaceAll("⚠", "WARNING:");
  return sanitized.length <= length ? sanitized : sanitized.slice(-length);
}

function printableCommand(command, args) {
  return [command, ...args].map((part) => JSON.stringify(part)).join(" ");
}

function killProcessTree(child, signal = "SIGTERM") {
  if (!child || child.exitCode !== null || child.signalCode !== null) return;
  try {
    if (process.platform !== "win32" && child.pid) {
      process.kill(-child.pid, signal);
    } else {
      child.kill(signal);
    }
  } catch (error) {
    if (error?.code !== "ESRCH") throw error;
  }
}

async function runCommand(label, command, args, options = {}) {
  const commandStartedAt = Date.now();
  const record = {
    label,
    command: printableCommand(command, args),
    cwd: path.relative(REPOSITORY_ROOT, options.cwd ?? REPOSITORY_ROOT) || ".",
    startedAt: new Date(commandStartedAt).toISOString(),
    finishedAt: null,
    durationMs: null,
    exitCode: null,
    signal: null,
    stdoutTail: "",
    stderrTail: "",
  };
  proof.commands.push(record);

  const child = spawn(command, args, {
    cwd: options.cwd ?? REPOSITORY_ROOT,
    env: {
      ...process.env,
      CI: "1",
      NEXT_TELEMETRY_DISABLED: "1",
      COREPACK_ENABLE_DOWNLOAD_PROMPT: "0",
      ...options.env,
    },
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });

  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
  child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });

  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    killProcessTree(child, "SIGTERM");
    setTimeout(() => killProcessTree(child, "SIGKILL"), 3_000).unref();
  }, options.timeoutMs ?? COMMAND_TIMEOUT_MS);

  const result = await new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code, signal) => resolve({ code, signal }));
  }).finally(() => clearTimeout(timeout));

  const finishedAt = Date.now();
  record.finishedAt = new Date(finishedAt).toISOString();
  record.durationMs = finishedAt - commandStartedAt;
  record.exitCode = result.code;
  record.signal = result.signal;
  record.stdoutTail = options.summarizeStdout
    ? `[omitted ${Buffer.byteLength(stdout)} bytes; ${sha256(stdout)}]`
    : tail(stdout);
  record.stderrTail = tail(stderr);

  if (timedOut) {
    throw new Error(`${label} timed out after ${options.timeoutMs ?? COMMAND_TIMEOUT_MS}ms`);
  }
  if (result.code !== 0) {
    throw new Error(
      `${label} failed (${result.signal ?? result.code})\n${tail(stderr || stdout)}`,
    );
  }

  console.log(`[verify-pack-install] PASS ${label} (${record.durationMs}ms)`);
  return { stdout, stderr };
}

async function pathExists(candidate) {
  try {
    await access(candidate);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function resolveSafeTarget(projectRoot, target) {
  if (
    typeof target !== "string"
    || target.length === 0
    || target.includes("\0")
    || path.isAbsolute(target)
  ) {
    throw new Error(`Unsafe registry target: ${String(target)}`);
  }

  const resolved = path.resolve(projectRoot, target);
  const relative = path.relative(projectRoot, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Registry target escapes the clean project: ${target}`);
  }
  return resolved;
}

async function writeNewFile(target, content) {
  if (await pathExists(target)) {
    throw new Error(`Conflict policy rejected existing target: ${target}`);
  }
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, { encoding: "utf8", flag: "wx" });
}

async function scaffoldCleanProject(projectRoot) {
  const files = {
    "package.json": JSON.stringify({
      name: "stylekit-corporate-clean-install-proof",
      version: "0.0.0",
      private: true,
      packageManager: `pnpm@${EXPECTED.pnpm}`,
      scripts: {
        typecheck: "tsc --noEmit",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        next: EXPECTED.next,
        react: EXPECTED.react,
        "react-dom": EXPECTED.reactDom,
      },
      devDependencies: {
        "@tailwindcss/postcss": EXPECTED.tailwindPostcss,
        "@types/node": EXPECTED.typesNode,
        "@types/react": EXPECTED.typesReact,
        "@types/react-dom": EXPECTED.typesReactDom,
        tailwindcss: EXPECTED.tailwindcss,
        typescript: EXPECTED.typescript,
      },
    }, null, 2) + "\n",
    "pnpm-workspace.yaml": "packages:\n  - .\n\nallowBuilds:\n  sharp: true\n",
    "tsconfig.json": JSON.stringify({
      compilerOptions: {
        target: "ES2017",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "react-jsx",
        incremental: true,
        plugins: [{ name: "next" }],
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    }, null, 2) + "\n",
    "next-env.d.ts": "/// <reference types=\"next\" />\n/// <reference types=\"next/image-types/global\" />\n\n// Generated for the isolated install verification project.\n",
    "postcss.config.mjs": "export default { plugins: { \"@tailwindcss/postcss\": {} } };\n",
    "app/globals.css": "@import \"tailwindcss\";\n\n* { box-sizing: border-box; }\nhtml, body { margin: 0; min-height: 100%; }\nbutton, input, select, textarea { font: inherit; }\n",
    "app/layout.tsx": "import \"./globals.css\";\n\nexport default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {\n  return <html lang=\"zh-CN\"><body>{children}</body></html>;\n}\n",
  };

  for (const [relative, content] of Object.entries(files)) {
    await writeNewFile(path.join(projectRoot, relative), content);
  }
}

async function compileRegistryItem() {
  const expression = [
    "import { corporateCleanSaasPack } from './lib/experience-packs/manifests/corporate-clean-saas';",
    "import { toExperiencePackRegistryItemJSON } from './lib/experience-packs/server/registry-item';",
    "void (async () => {",
    "  const first = await toExperiencePackRegistryItemJSON(process.cwd(), corporateCleanSaasPack);",
    "  const second = await toExperiencePackRegistryItemJSON(process.cwd(), corporateCleanSaasPack);",
    "  process.stdout.write(JSON.stringify({ first, second }));",
    "})();",
  ].join("\n");
  const result = await runCommand(
    "compile deterministic registry item",
    "pnpm",
    ["exec", "tsx", "-e", expression],
    { summarizeStdout: true },
  );
  const compiled = JSON.parse(result.stdout);
  if (compiled.first !== compiled.second) {
    throw new Error("Registry compiler produced different output in the same process");
  }
  const registryItem = JSON.parse(compiled.first);
  if (registryItem.name !== PACK_SLUG || registryItem.type !== "registry:block") {
    throw new Error(`Unexpected registry item identity: ${registryItem.name}/${registryItem.type}`);
  }
  if (registryItem.meta?.version !== "0.1.0") {
    throw new Error(`Unexpected pack version: ${registryItem.meta?.version}`);
  }
  if (!Array.isArray(registryItem.files) || registryItem.files.length === 0) {
    throw new Error("Registry item contains no installable files");
  }
  proof.source.registryItemSha256 = sha256(compiled.first);
  proof.source.registryFileCount = registryItem.files.length;
  return registryItem;
}

async function installRegistryFiles(projectRoot, registryItem) {
  const seen = new Set();
  const preparedFiles = [];
  for (const file of registryItem.files) {
    if (file.type !== "registry:file" || typeof file.content !== "string") {
      throw new Error(`Unsupported registry file entry: ${file.target ?? file.path}`);
    }
    const target = file.target ?? file.path;
    if (seen.has(target)) throw new Error(`Duplicate registry target: ${target}`);
    seen.add(target);

    const resolved = resolveSafeTarget(projectRoot, target);
    if (await pathExists(resolved)) {
      throw new Error(`Conflict policy rejected existing target: ${target}`);
    }
    preparedFiles.push({ file, target, resolved });
  }
  proof.conflictPolicy.checkedTargets = seen.size;

  for (const { file, target, resolved } of preparedFiles) {
    await writeNewFile(resolved, file.content);
    const installed = await readFile(resolved);
    const expectedHash = sha256(file.content);
    const installedHash = sha256(installed);
    if (expectedHash !== installedHash) {
      throw new Error(`Installed file hash mismatch: ${target}`);
    }
    proof.artifacts.registryFiles.push({
      target,
      bytes: installed.byteLength,
      sha256: installedHash,
    });
  }

  if (!seen.has("STYLEKIT_PACK.json")) {
    throw new Error("Registry installation is missing STYLEKIT_PACK.json");
  }
  const machineContext = JSON.parse(
    await readFile(path.join(projectRoot, "STYLEKIT_PACK.json"), "utf8"),
  );
  if (machineContext?.pack?.slug !== PACK_SLUG) {
    throw new Error(`Invalid machine context pack slug: ${machineContext?.pack?.slug}`);
  }
  if (!Array.isArray(machineContext.evidence) || machineContext.evidence.length < 3) {
    throw new Error("Machine context is missing the verified evidence set");
  }
  if (!Array.isArray(machineContext.claims) || machineContext.claims.length < 3) {
    throw new Error("Machine context is missing evidence-backed commercial claims");
  }
}

async function readInstalledPackageVersion(projectRoot, packageName) {
  const packageFile = path.join(projectRoot, "node_modules", ...packageName.split("/"), "package.json");
  const resolved = await realpath(packageFile);
  return JSON.parse(await readFile(resolved, "utf8")).version;
}

async function assertInstalledVersions(projectRoot) {
  const names = {
    next: "next",
    react: "react",
    reactDom: "react-dom",
    tailwindcss: "tailwindcss",
    tailwindPostcss: "@tailwindcss/postcss",
    typescript: "typescript",
    typesNode: "@types/node",
    typesReact: "@types/react",
    typesReactDom: "@types/react-dom",
  };
  for (const [proofKey, packageName] of Object.entries(names)) {
    const version = await readInstalledPackageVersion(projectRoot, packageName);
    proof.installedVersions[packageName] = version;
    if (version !== EXPECTED[proofKey]) {
      throw new Error(`${packageName} version mismatch: expected ${EXPECTED[proofKey]}, received ${version}`);
    }
  }
}

async function findAvailablePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : null;
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  if (!port) throw new Error("Unable to allocate a local verification port");
  return port;
}

async function startProductionServer(projectRoot, port) {
  const commandStartedAt = Date.now();
  const record = {
    label: "start production server",
    command: printableCommand("pnpm", ["exec", "next", "start", "-H", "127.0.0.1", "-p", String(port)]),
    cwd: path.relative(REPOSITORY_ROOT, projectRoot),
    startedAt: new Date(commandStartedAt).toISOString(),
    finishedAt: null,
    durationMs: null,
    exitCode: null,
    signal: null,
    stdoutTail: "",
    stderrTail: "",
  };
  proof.commands.push(record);
  const child = spawn("pnpm", ["exec", "next", "start", "-H", "127.0.0.1", "-p", String(port)], {
    cwd: projectRoot,
    env: { ...process.env, CI: "1", NEXT_TELEMETRY_DISABLED: "1", PORT: String(port) },
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
  child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });

  const exited = new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code, signal) => resolve({ code, signal }));
  });
  productionServer = { child, exited, record, getStdout: () => stdout, getStderr: () => stderr };

  const url = `http://127.0.0.1:${port}/corporate-clean`;
  const deadline = Date.now() + SERVER_TIMEOUT_MS;
  let lastError = "server did not respond";
  while (Date.now() < deadline) {
    if (child.exitCode !== null || child.signalCode !== null) {
      throw new Error(`Production server exited before ready: ${tail(stderr || stdout)}`);
    }
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(2_000) });
      if (response.ok) {
        await response.arrayBuffer();
        console.log(`[verify-pack-install] PASS production server ready (${Date.now() - commandStartedAt}ms)`);
        return url;
      }
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await delay(350);
  }
  throw new Error(`Production server was not ready after ${SERVER_TIMEOUT_MS}ms: ${lastError}`);
}

async function stopProductionServer() {
  if (!productionServer) return;
  const { child, exited, record, getStdout, getStderr } = productionServer;
  killProcessTree(child, "SIGTERM");
  const result = await Promise.race([
    exited,
    delay(5_000).then(() => null),
  ]);
  if (!result) {
    killProcessTree(child, "SIGKILL");
    await exited;
  }
  const finishedAt = Date.now();
  record.finishedAt = new Date(finishedAt).toISOString();
  record.durationMs = finishedAt - Date.parse(record.startedAt);
  record.exitCode = child.exitCode;
  record.signal = child.signalCode;
  record.stdoutTail = tail(getStdout());
  record.stderrTail = tail(getStderr());
  productionServer = null;
}

async function runBrowserSmoke(url) {
  if (SKIP_BROWSER) return;
  const smokeStartedAt = Date.now();
  const { chromium } = await import("@playwright/test");
  const browser = await chromium.launch({ headless: true });
  try {
    const desktop = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "reduce",
    });
    const page = await desktop.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    const heading = await page.locator("main h1").textContent();
    if (heading?.trim() !== "经营概览") throw new Error(`Unexpected dashboard heading: ${heading}`);

    const loadingButton = page.getByRole("button", { name: "加载" });
    await loadingButton.focus();
    await page.keyboard.press("Space");
    if (await loadingButton.getAttribute("aria-pressed") !== "true") {
      throw new Error("Keyboard activation did not select the loading state");
    }
    await page.getByRole("button", { name: "错误" }).click();
    await page.getByRole("heading", { name: "暂时无法读取数据" }).waitFor();
    await page.getByRole("button", { name: "重新加载" }).click();
    await page.getByRole("region", { name: "关键经营指标" }).waitFor();

    const dashboardMotion = await page.getByRole("region", { name: "关键经营指标" })
      .evaluate((element) => getComputedStyle(element.parentElement).animationName);
    if (dashboardMotion !== "none") {
      throw new Error(`Reduced-motion dashboard animation remained active: ${dashboardMotion}`);
    }
    proof.browserSmoke.desktop = { heading, errorRecovery: true };
    proof.browserSmoke.keyboard = { spaceActivatesStateControl: true };
    proof.browserSmoke.reducedMotion = { dashboardAnimationName: dashboardMotion };
    await desktop.close();

    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mobilePage = await mobile.newPage();
    await mobilePage.goto(url, { waitUntil: "networkidle" });
    const viewport = await mobilePage.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    if (viewport.scrollWidth > viewport.clientWidth) {
      throw new Error(`Mobile page overflows horizontally: ${viewport.scrollWidth} > ${viewport.clientWidth}`);
    }
    const menuButton = mobilePage.getByRole("button", { name: "打开导航" });
    await menuButton.click();
    if (await menuButton.getAttribute("aria-expanded") !== "true") {
      throw new Error("Mobile navigation did not expose its expanded state");
    }
    await mobilePage.getByRole("button", { name: "关闭导航" }).click({ position: { x: 380, y: 420 } });
    proof.browserSmoke.mobile = { ...viewport, menuOpenAndClose: true };
    await mobile.close();
  } finally {
    await browser.close();
  }
  console.log(`[verify-pack-install] PASS browser smoke (${Date.now() - smokeStartedAt}ms)`);
}

async function writeProof() {
  proof.finishedAt = new Date().toISOString();
  proof.durationMs = Date.now() - startedAtMs;
  await mkdir(path.dirname(PROOF_PATH), { recursive: true });
  const temporaryProof = `${PROOF_PATH}.${process.pid}.tmp`;
  await writeFile(temporaryProof, JSON.stringify(proof, null, 2) + "\n", "utf8");
  await rename(temporaryProof, PROOF_PATH);
}

async function main() {
  const commit = await runCommand("read repository commit", "git", ["rev-parse", "HEAD"]);
  proof.source.repositoryCommit = commit.stdout.trim();
  const status = await runCommand(
    "read repository status",
    "git",
    ["status", "--porcelain"],
    { summarizeStdout: true },
  );
  proof.source.repositoryDirty = status.stdout.trim().length > 0;

  const pnpmVersion = await runCommand("verify pnpm version", "pnpm", ["--version"]);
  proof.environment.pnpm = pnpmVersion.stdout.trim();
  if (proof.environment.pnpm !== EXPECTED.pnpm) {
    throw new Error(`pnpm version mismatch: expected ${EXPECTED.pnpm}, received ${proof.environment.pnpm}`);
  }

  const registryItem = await compileRegistryItem();
  temporaryProject = await mkdtemp(path.join(tmpdir(), `${PACK_SLUG}-install-`));
  proof.temporaryProject.path = temporaryProject;
  await scaffoldCleanProject(temporaryProject);
  await installRegistryFiles(temporaryProject, registryItem);

  await runCommand(
    "resolve exact dependency lockfile",
    "pnpm",
    ["install", "--lockfile-only", "--no-frozen-lockfile", "--prefer-offline"],
    { cwd: temporaryProject },
  );
  await runCommand(
    "install from frozen lockfile",
    "pnpm",
    ["install", "--frozen-lockfile", "--prefer-offline"],
    { cwd: temporaryProject },
  );
  await assertInstalledVersions(temporaryProject);

  const lockfile = await readFile(path.join(temporaryProject, "pnpm-lock.yaml"));
  proof.artifacts.lockfile = { bytes: lockfile.byteLength, sha256: sha256(lockfile) };

  await runCommand("typecheck clean project", "pnpm", ["run", "typecheck"], { cwd: temporaryProject });
  await runCommand("build clean project", "pnpm", ["run", "build"], { cwd: temporaryProject });
  proof.artifacts.buildId = (await readFile(path.join(temporaryProject, ".next", "BUILD_ID"), "utf8")).trim();

  const port = await findAvailablePort();
  const url = await startProductionServer(temporaryProject, port);
  const responseFile = path.join(temporaryProject, "corporate-clean-response.html");
  const curl = await runCommand(
    "curl corporate-clean production route",
    "curl",
    ["--fail-with-body", "--silent", "--show-error", "--max-time", "10", "--output", responseFile, "--write-out", "%{http_code}", url],
    { cwd: temporaryProject, timeoutMs: 20_000 },
  );
  const response = await readFile(responseFile);
  if (curl.stdout.trim() !== "200") throw new Error(`Expected HTTP 200, received ${curl.stdout.trim()}`);
  if (!response.toString("utf8").includes("经营概览")) {
    throw new Error("Production response did not include the Corporate Clean dashboard heading");
  }
  proof.artifacts.response = {
    url: "/corporate-clean",
    status: 200,
    bytes: response.byteLength,
    sha256: sha256(response),
    containsDashboardHeading: true,
  };

  await runBrowserSmoke(url);

  for (const file of proof.artifacts.registryFiles) {
    const installed = await readFile(path.join(temporaryProject, file.target));
    if (sha256(installed) !== file.sha256) {
      throw new Error(`Build or runtime mutated installed registry file: ${file.target}`);
    }
  }

  proof.status = "passed";
}

try {
  await main();
} catch (error) {
  proof.status = "failed";
  proof.error = error instanceof Error
    ? { name: error.name, message: error.message, stack: error.stack ?? null }
    : { name: "UnknownError", message: String(error), stack: null };
  console.error(`[verify-pack-install] FAIL ${proof.error.message}`);
  process.exitCode = 1;
} finally {
  try {
    await stopProductionServer();
  } catch (error) {
    proof.status = "failed";
    proof.error ??= { name: "ServerCleanupError", message: String(error), stack: null };
    process.exitCode = 1;
  }
  if (temporaryProject && !KEEP_TEMP) {
    await rm(temporaryProject, { recursive: true, force: true });
  }
  await writeProof();
  console.log(`[verify-pack-install] ${proof.status.toUpperCase()} proof: ${path.relative(REPOSITORY_ROOT, PROOF_PATH)}`);
}
