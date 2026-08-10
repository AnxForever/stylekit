import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { scanKnowledgeMirror } from "@/lib/knowledge";

describe("knowledge mirror scanner", () => {
  it("blocks credential-like content and ignores build/cache directories", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "stylekit-knowledge-"));
    try {
      await mkdir(path.join(root, "dist"));
      await writeFile(path.join(root, "README.md"), "safe docs");
      const fakeKey = ["sk", "12345678901234567890"].join("-");
      await writeFile(path.join(root, "config.ts"), `const apiKey = '${fakeKey}';`);
      await writeFile(path.join(root, "dist", "ignored.js"), `secret = '${fakeKey}'`);
      const report = await scanKnowledgeMirror(root);

      expect(report.filesScanned).toBe(2);
      expect(report.passed).toBe(false);
      expect(report.findings).toEqual(expect.arrayContaining([
        expect.objectContaining({ rule: "secret-pattern", severity: "critical", path: "config.ts" }),
        expect.objectContaining({ rule: "forbidden-path", path: "dist" }),
      ]));
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
