import { execFile } from "node:child_process";
import { access, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const PACKAGES = [
  { name: "stylekit-core", dir: "packages/core", maxUnpacked: 12_000_000 },
  { name: "stylekit-cli", dir: "packages/cli", maxUnpacked: 6_000_000 },
  { name: "stylekit-mcp", dir: "packages/mcp", maxUnpacked: 6_000_000 },
];

function formatBytes(bytes) {
  return `${(bytes / 1_000_000).toFixed(2)} MB`;
}

let failed = false;
for (const pkg of PACKAGES) {
  const packageDir = path.join(ROOT, pkg.dir);
  const distEntry = path.join(packageDir, "dist", pkg.name === "stylekit-core" ? "discovery/index.js" : "index.js");

  try {
    await access(distEntry);
  } catch {
    console.error(`[package-size] FAIL - ${pkg.name} is not built: ${distEntry}`);
    failed = true;
    continue;
  }

  const entrySize = (await stat(distEntry)).size;
  const { stdout } = await execFileAsync("npm", ["pack", "--dry-run", "--json"], {
    cwd: packageDir,
    maxBuffer: 2 * 1024 * 1024,
  });
  const report = JSON.parse(stdout.trim())[0];

  if (report.unpackedSize > pkg.maxUnpacked) {
    console.error(
      `[package-size] FAIL - ${pkg.name} unpacked size ${formatBytes(report.unpackedSize)} exceeds ${formatBytes(pkg.maxUnpacked)}.`,
    );
    failed = true;
    continue;
  }

  console.log(
    `[package-size] PASS - ${pkg.name}: ${formatBytes(report.size)} packed, ${formatBytes(report.unpackedSize)} unpacked, entry ${formatBytes(entrySize)}.`,
  );
}

if (failed) process.exitCode = 1;
