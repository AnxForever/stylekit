import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { hashKnowledgeMirror, validateKnowledgeMirrorRequest } from "@/lib/knowledge";

describe("knowledge mirror source", () => {
  it("accepts pinned public repositories and safe in-mirror license paths", () => {
    expect(validateKnowledgeMirrorRequest({ id: "radix-primitives", repositoryUrl: "https://github.com/radix-ui/primitives", commitSha: "a".repeat(40), destinationRoot: "/tmp/mirrors", licensePath: "LICENSE" }).licensePath).toBe("LICENSE");
  });

  it("rejects credentials, non-https sources, and traversal paths", () => {
    expect(() => validateKnowledgeMirrorRequest({ id: "resource", repositoryUrl: "http://github.com/example/resource", commitSha: "a".repeat(40), destinationRoot: "/tmp/mirrors", licensePath: "LICENSE" })).toThrow();
    expect(() => validateKnowledgeMirrorRequest({ id: "resource", repositoryUrl: "https://user:pass@github.com/example/resource", commitSha: "a".repeat(40), destinationRoot: "/tmp/mirrors", licensePath: "../LICENSE" })).toThrow();
  });

  it("produces a deterministic snapshot hash", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "stylekit-mirror-hash-"));
    try {
      await writeFile(path.join(root, "README.md"), "hello");
      const first = await hashKnowledgeMirror(root);
      const second = await hashKnowledgeMirror(root);
      expect(first).toBe(second);
      expect(first).toMatch(/^sha256:[0-9a-f]{64}$/);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
