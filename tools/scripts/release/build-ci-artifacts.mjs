import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import {
  canonicalJson,
  isPublicBuildKey,
  nextBuildFiles,
  RELEASE_RUNTIME,
  sha256,
  validateBuildInputs,
} from "./ci-build-contract.mjs";

const root = fs.realpathSync(process.cwd());
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const commit = git("rev-parse", "HEAD");
const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
const publicEnv = validateBuildInputs(event, {
  eventName: process.env.GITHUB_EVENT_NAME,
  repository: process.env.GITHUB_REPOSITORY,
  sha: process.env.GITHUB_SHA,
});
if (commit !== process.env.GITHUB_SHA || git("status", "--porcelain")) throw new Error("Release checkout must be clean and pinned");
if (process.platform !== "linux" || process.arch !== "x64" || process.versions.node !== RELEASE_RUNTIME.node) {
  throw new Error("Release artifacts require the pinned Linux x64 Node runtime");
}
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const declaredPnpm = /^pnpm@([0-9]+\.[0-9]+\.[0-9]+)(?:\+.*)?$/.exec(packageJson.packageManager)?.[1];
const pnpm = execFileSync("pnpm", ["--version"], { encoding: "utf8" }).trim();
if (!declaredPnpm || pnpm !== declaredPnpm) throw new Error("Installed pnpm differs from packageManager pin");
for (const name of [".env", ".env.local", ".env.production", ".env.production.local"]) {
  if (fs.existsSync(path.join(root, name))) throw new Error("Release CI must not load environment files");
}
const output = path.resolve(process.env.STYLEKIT_RELEASE_OUTPUT_DIR || "");
const runnerTemp = fs.realpathSync(process.env.RUNNER_TEMP);
if (!output.startsWith(runnerTemp + path.sep) || fs.existsSync(output)) throw new Error("Release output must be a fresh runner temporary directory");
fs.mkdirSync(output);
fs.mkdirSync(path.join(output, "mcp"));
const childEnv = Object.fromEntries(Object.entries(process.env).filter(([key]) => !isPublicBuildKey(key)));
Object.assign(childEnv, publicEnv.values, { NEXT_TELEMETRY_DISABLED: "1", NODE_OPTIONS: "--max-old-space-size=6144" });
delete childEnv.STYLEKIT_PUBLIC_BUILD_ENV_B64;
const checks = [];
function run(name, command, args) {
  console.log(`[release-build] ${name}`);
  execFileSync(command, args, { cwd: root, env: childEnv, stdio: "inherit" });
  checks.push({ name, exitCode: 0 });
}
run("next-build", "pnpm", ["run", "build"]);
run("core-build", "pnpm", ["--filter", "stylekit-core", "build"]);
run("core-typecheck", "pnpm", ["--filter", "stylekit-core", "typecheck"]);
run("mcp-build", "pnpm", ["--filter", "stylekit-mcp", "build"]);
run("node-syntax", process.execPath, ["--check", "packages/mcp/dist/index.js"]);
run("mcp-test", "pnpm", ["--filter", "stylekit-mcp", "test"]);
run("mcp-test-http", "pnpm", ["--filter", "stylekit-mcp", "test:http"]);
if (git("status", "--porcelain") || git("rev-parse", "HEAD") !== commit) throw new Error("Build changed committed source");
const dependencyVersion = (name) => {
  const file = fs.realpathSync(path.join(root, "packages/mcp/node_modules", name, "package.json"));
  const metadata = JSON.parse(fs.readFileSync(file, "utf8"));
  if (metadata.name !== name) throw new Error("Unexpected MCP dependency package");
  return metadata.version;
};
const versions = { "@modelcontextprotocol/sdk": dependencyVersion("@modelcontextprotocol/sdk"), zod: dependencyVersion("zod") };
if (versions["@modelcontextprotocol/sdk"] !== RELEASE_RUNTIME.mcpSdk || versions.zod !== RELEASE_RUNTIME.mcpZod) {
  throw new Error("MCP external dependencies differ from the reviewed production runtime");
}
const nextFiles = nextBuildFiles(root);
const fileList = path.join(runnerTemp, `stylekit-next-files-${process.env.GITHUB_RUN_ID}.txt`);
fs.writeFileSync(fileList, nextFiles.map((file) => file.path).join("\0") + "\0", { flag: "wx" });
const archive = path.join(output, "next-build.tar.gz");
execFileSync("tar", ["--create", "--gzip", "--file", archive, "--no-recursion", "--null", "--files-from", fileList], { cwd: root, stdio: "inherit" });
const bundle = fs.readFileSync(path.join(root, "packages/mcp/dist/index.js"));
fs.writeFileSync(path.join(output, "mcp/index.js"), bundle, { flag: "wx" });
const files = {
  "next-build.tar.gz": { sha256: sha256(fs.readFileSync(archive)), bytes: fs.statSync(archive).size },
  "mcp/index.js": { sha256: sha256(bundle), bytes: bundle.length },
};
const metadata = {
  schemaVersion: 1,
  origin: "github-actions",
  repository: process.env.GITHUB_REPOSITORY,
  workflow: ".github/workflows/ci.yml",
  job: "release-artifacts",
  runId: Number(process.env.GITHUB_RUN_ID),
  runAttempt: Number(process.env.GITHUB_RUN_ATTEMPT),
  candidateCommit: commit,
  sourceTree: git("rev-parse", "HEAD^{tree}"),
  lockSha256: sha256(fs.readFileSync(path.join(root, "pnpm-lock.yaml"))),
  publicEnvSha256: publicEnv.sha256,
  publicEnvKeys: publicEnv.keys,
  buildId: fs.readFileSync(path.join(root, ".next/BUILD_ID"), "utf8").trim(),
  runtime: { platform: process.platform, arch: process.arch, node: process.versions.node, pnpm },
  mcp: { packageVersion: JSON.parse(fs.readFileSync(path.join(root, "packages/mcp/package.json"), "utf8")).version, versions },
  checks,
  nextFiles,
  files,
  payloadSha256: sha256(canonicalJson(files)),
  environmentFileArchived: false,
  runtimeSecretsSupplied: false,
};
fs.writeFileSync(path.join(output, "metadata.json"), JSON.stringify(metadata, null, 2) + "\n", { flag: "wx" });
const sums = [...Object.entries(files).map(([name, file]) => `${file.sha256}  ${name}`), `${sha256(fs.readFileSync(path.join(output, "metadata.json")))}  metadata.json`].join("\n") + "\n";
fs.writeFileSync(path.join(output, "SHA256SUMS"), sums, { flag: "wx" });
console.log(JSON.stringify({ candidateCommit: commit, sourceTree: metadata.sourceTree, publicEnvSha256: publicEnv.sha256, publicEnvKeyCount: publicEnv.keys.length, buildId: metadata.buildId, payloadSha256: metadata.payloadSha256, output }));
