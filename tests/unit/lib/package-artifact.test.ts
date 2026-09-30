import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { artifactContents } from "../../../tools/lib/package-artifact.mjs";

describe("published artifact comparison", () => {
  it("detects equal-size runtime changes while ignoring documentation and development metadata", () => {
    const root = mkdtempSync(path.join(os.tmpdir(), "stylekit-artifact-test-"));
    try {
      mkdirSync(path.join(root, "package", "dist"), { recursive: true });
      const manifest = { name: "test", version: "1.0.0", main: "dist/index.js", dependencies: { zod: "^4" } };
      writeFileSync(path.join(root, "package", "package.json"), JSON.stringify(manifest));
      writeFileSync(path.join(root, "package", "dist", "index.js"), 'export const value = "one";');
      const first = path.join(root, "first.tgz");
      execFileSync("tar", ["-czf", first, "-C", root, "package"]);
      const original = artifactContents(first);
      writeFileSync(path.join(root, "package", "package.json"), JSON.stringify({ ...manifest, scripts: { build: "tsup" }, devDependencies: { typescript: "^5" } }));
      writeFileSync(path.join(root, "package", "README.md"), "New documentation.");
      const second = path.join(root, "second.tgz");
      execFileSync("tar", ["-czf", second, "-C", root, "package"]);
      expect(artifactContents(second)).toEqual(original);
      writeFileSync(path.join(root, "package", "dist", "index.js"), 'export const value = "two";');
      execFileSync("tar", ["-czf", second, "-C", root, "package"]);
      expect(artifactContents(second).get("package/dist/index.js")).not.toBe(original.get("package/dist/index.js"));
      writeFileSync(path.join(root, "package", "package.json"), JSON.stringify({ ...manifest, dependencies: { zod: "^3" } }));
      execFileSync("tar", ["-czf", second, "-C", root, "package"]);
      expect(artifactContents(second).get("package/package.json")).not.toBe(original.get("package/package.json"));
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
