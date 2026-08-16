import { describe, expect, it } from "vitest";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  auditDeveloperToolkitTruth,
  auditProductTruth,
} from "@/lib/product-truth/audit";

describe("public product truth", () => {
  it("keeps documented routes, redirects, and install commands aligned with working capabilities", async () => {
    const report = await auditProductTruth(process.cwd());

    expect(report.issues).toEqual([]);
  });

  it("keeps Developer Toolkit repository versions aligned with package manifests", async () => {
    const issues = await auditDeveloperToolkitTruth(process.cwd());

    expect(
      issues.filter((issue) => issue.code === "toolkit-repository-version-mismatch"),
    ).toEqual([]);
  });

  it("rejects unpublished wording for a package marked as a public beta", async () => {
    const rootDir = await mkdtemp(path.join(os.tmpdir(), "stylekit-truth-"));

    try {
      await Promise.all([
        writePackageVersion(rootDir, "core", "1.0.0-beta.1"),
        writePackageVersion(rootDir, "cli", "0.1.1"),
        writePackageVersion(rootDir, "mcp", "0.1.1"),
      ]);
      await mkdir(path.join(rootDir, "public"), { recursive: true });
      await writeFile(
        path.join(rootDir, "public/llms.txt"),
        "The CLI and MCP packages are repository-only and are not published to npm.\n",
      );

      const issues = await auditDeveloperToolkitTruth(rootDir);

      expect(issues).toContainEqual(
        expect.objectContaining({
          code: "toolkit-public-state-contradiction",
          source: "public/llms.txt",
        }),
      );
    } finally {
      await rm(rootDir, { recursive: true, force: true });
    }
  });
});

async function writePackageVersion(
  rootDir: string,
  packageDir: "core" | "cli" | "mcp",
  version: string,
): Promise<void> {
  const directory = path.join(rootDir, "packages", packageDir);
  await mkdir(directory, { recursive: true });
  await writeFile(
    path.join(directory, "package.json"),
    JSON.stringify({ version }),
  );
}
