import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import path from "node:path";

const RUNTIME_FIELDS = ["name", "version", "type", "main", "module", "types", "exports", "bin", "dependencies", "engines", "sideEffects"];

function run(command, args, cwd) {
  return execFileSync(command, args, { cwd, stdio: ["ignore", "pipe", "pipe"], timeout: 60_000, maxBuffer: 25_000_000 });
}

export function artifactContents(tarball) {
  // Run tar from the archive's directory with a bare filename: GNU tar treats
  // an argument containing a colon, such as a Windows "C:\..." path, as a
  // remote host and fails to open the archive.
  const cwd = path.dirname(tarball);
  const archive = path.basename(tarball);
  const entries = run("tar", ["-tzf", archive], cwd).toString("utf8").trim().split(/\r?\n/);
  const result = new Map();
  for (const entry of entries) {
    if (!entry.startsWith("package/dist/") && entry !== "package/package.json") continue;
    if (entry.endsWith("/")) continue;
    const content = run("tar", ["-xOzf", archive, "--", entry], cwd);
    if (entry === "package/package.json") {
      const manifest = JSON.parse(content.toString("utf8"));
      result.set(entry, JSON.stringify(Object.fromEntries(RUNTIME_FIELDS.filter((key) => key in manifest).map((key) => [key, manifest[key]]))));
    } else result.set(entry, createHash("sha256").update(content).digest("hex"));
  }
  if (![...result.keys()].some((entry) => entry.startsWith("package/dist/"))) throw new Error("Artifact has no built dist files");
  return result;
}
