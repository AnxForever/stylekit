import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolvePackageBin } from "./resolve-package-bin.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const nextCli = resolvePackageBin("next", "next", repositoryRoot);
const result = spawnSync(process.execPath, [nextCli, "build"], {
  cwd: repositoryRoot,
  env: { ...process.env, ANALYZE: "true" },
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

if (result.signal) {
  process.stderr.write(`Next build stopped after signal ${result.signal}.\n`);
  process.exitCode = 1;
} else {
  process.exitCode = result.status ?? 1;
}