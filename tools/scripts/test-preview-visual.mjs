import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolvePackageBin } from "./resolve-package-bin.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const nextCli = resolvePackageBin("next", "next", repositoryRoot);
const playwrightCli = resolvePackageBin(
  "@playwright/test",
  "playwright",
  repositoryRoot
);

function quoteForShell(value) {
  if (process.platform === "win32") {
    if (value.includes('"')) {
      throw new Error("A command path contains an unsupported quote character.");
    }

    return `"${value}"`;
  }

  return "'" + value.replace(/'/g, "'\\''") + "'";
}

const webServerCommand = [
  quoteForShell(process.execPath),
  quoteForShell(nextCli),
  "start",
  "-p",
  "3187",
].join(" ");

const result = spawnSync(
  process.execPath,
  [
    playwrightCli,
    "test",
    "--config",
    "tests/playwright.config.ts",
    "tests/e2e/approved-preview-visual.spec.ts",
  ],
  {
    cwd: repositoryRoot,
    env: {
      ...process.env,
      PLAYWRIGHT_WEB_SERVER_COMMAND: webServerCommand,
    },
    stdio: "inherit",
  }
);

if (result.error) {
  throw result.error;
}

if (result.signal) {
  process.stderr.write(`Playwright stopped after signal ${result.signal}.\n`);
  process.exitCode = 1;
} else {
  process.exitCode = result.status ?? 1;
}