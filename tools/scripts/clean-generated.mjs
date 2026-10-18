import { lstatSync, realpathSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

const cleanTargets = new Map([
  ["build", [".next"]],
  ["typecheck", [".next/dev", ".next/types"]],
  ["cli", ["packages/cli/dist"]],
  ["mcp", ["packages/mcp/dist"]],
]);

function normalizedPath(value) {
  let normalized = path.resolve(value);

  if (process.platform === "win32" && normalized.startsWith("\\\\?\\")) {
    normalized = normalized.slice(4);
  }

  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

function inspectPathComponents(absolutePath) {
  const parsedPath = path.parse(absolutePath);
  const segments = [parsedPath.root];
  let currentPath = parsedPath.root;
  const remainingPath = absolutePath.slice(parsedPath.root.length);

  for (const segment of remainingPath.split(path.sep).filter(Boolean)) {
    currentPath = path.join(currentPath, segment);
    segments.push(currentPath);
  }

  let finalStat = null;

  for (let index = 0; index < segments.length; index += 1) {
    const segmentPath = segments[index];
    let segmentStat;

    try {
      segmentStat = lstatSync(segmentPath);
    } catch (error) {
      if (error?.code === "ENOENT") {
        return null;
      }

      throw error;
    }

    if (segmentStat.isSymbolicLink()) {
      throw new Error(
        `Refusing to clean through a symbolic link or junction: ${segmentPath}`
      );
    }

    if (index < segments.length - 1 && !segmentStat.isDirectory()) {
      throw new Error(`Expected a directory in cleanup path: ${segmentPath}`);
    }

    const realPath = realpathSync.native(segmentPath);
    if (normalizedPath(realPath) !== normalizedPath(segmentPath)) {
      throw new Error(
        `Refusing to clean through a redirected path: ${segmentPath}`
      );
    }

    finalStat = segmentStat;
  }

  return finalStat;
}

function assertInsideRepository(targetPath) {
  const relativePath = path.relative(repositoryRoot, targetPath);

  if (
    !relativePath ||
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`Refusing to clean a path outside the repository: ${targetPath}`);
  }

  if (relativePath.split(path.sep)[0].toLowerCase() === "node_modules") {
    throw new Error("Refusing to clean node_modules.");
  }
}

const operation = process.argv[2];
if (process.argv.length !== 3 || !cleanTargets.has(operation)) {
  throw new Error(
    `Usage: node tools/scripts/clean-generated.mjs <${[...cleanTargets.keys()].join("|")}>`
  );
}

const repositoryStat = inspectPathComponents(repositoryRoot);
if (!repositoryStat?.isDirectory()) {
  throw new Error(`Repository root is missing or is not a directory: ${repositoryRoot}`);
}

for (const relativeTarget of cleanTargets.get(operation)) {
  const targetPath = path.resolve(repositoryRoot, relativeTarget);
  assertInsideRepository(targetPath);

  const targetStat = inspectPathComponents(targetPath);
  if (!targetStat) {
    continue;
  }

  if (!targetStat.isDirectory()) {
    throw new Error(`Refusing to remove a non-directory cleanup target: ${targetPath}`);
  }

  rmSync(targetPath, { recursive: true, force: true });
  process.stdout.write(`Removed generated output: ${relativeTarget}${path.sep}`);
  process.stdout.write("\n");
}