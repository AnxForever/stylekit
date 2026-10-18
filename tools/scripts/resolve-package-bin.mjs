import { existsSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

export function resolvePackageBin(packageName, binaryName, repositoryRoot) {
  const requireFromRepository = createRequire(
    path.join(repositoryRoot, "package.json")
  );
  let packageEntry;

  try {
    packageEntry = requireFromRepository.resolve(packageName);
  } catch (error) {
    throw new Error(`Could not resolve local package "${packageName}".`, {
      cause: error,
    });
  }

  let packageDirectory = path.dirname(packageEntry);

  while (true) {
    const packageJsonPath = path.join(packageDirectory, "package.json");

    if (existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

      if (packageJson.name === packageName) {
        const relativeBin =
          typeof packageJson.bin === "string"
            ? packageJson.bin
            : packageJson.bin?.[binaryName];

        if (!relativeBin) {
          throw new Error(
            `Package "${packageName}" does not declare the "${binaryName}" executable.`
          );
        }

        const binPath = path.resolve(packageDirectory, relativeBin);
        const relativeBinPath = path.relative(packageDirectory, binPath);

        if (
          relativeBinPath === ".." ||
          relativeBinPath.startsWith(`..${path.sep}`) ||
          path.isAbsolute(relativeBinPath)
        ) {
          throw new Error(
            `Package "${packageName}" declares an executable outside its package directory.`
          );
        }

        if (!statSync(binPath).isFile()) {
          throw new Error(
            `Package executable is not a file: ${binPath}`
          );
        }

        return binPath;
      }
    }

    const parentDirectory = path.dirname(packageDirectory);
    if (parentDirectory === packageDirectory) {
      break;
    }

    packageDirectory = parentDirectory;
  }

  throw new Error(
    `Could not locate the package root for "${packageName}".`
  );
}