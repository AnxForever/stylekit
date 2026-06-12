import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const FORBIDDEN_PUBLIC_ENTRY_IMPORT =
  /^\s*(?:import|export)\s+(?:type\s+)?(?:[^;"']+\s+from\s+)?["'](?:\.\/index|@\/lib\/styles(?:\/meta)?)["']/m;

function collectSourceFiles(entryPath: string, out: string[]): void {
  const stat = statSync(entryPath);

  if (stat.isDirectory()) {
    if (path.basename(entryPath) === "__tests__") {
      return;
    }

    for (const entry of readdirSync(entryPath, { withFileTypes: true })) {
      collectSourceFiles(path.join(entryPath, entry.name), out);
    }
    return;
  }

  if (!stat.isFile()) return;
  if (path.basename(entryPath) === "index.ts") return;
  if (path.extname(entryPath) !== ".ts") return;

  out.push(entryPath);
}

describe("styles internal boundaries", () => {
  it("keeps production modules off public styles entrypoints", () => {
    const repoRoot = process.cwd();
    const stylesRoot = path.join(repoRoot, "lib", "styles");
    const files: string[] = [];
    collectSourceFiles(stylesRoot, files);

    const violations = files
      .filter((file) => FORBIDDEN_PUBLIC_ENTRY_IMPORT.test(readFileSync(file, "utf8")))
      .map((file) => path.relative(repoRoot, file));

    expect(violations).toEqual([]);
  });
});
