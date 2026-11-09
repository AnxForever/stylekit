import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdtemp, readFile, readdir, realpath, rename, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { commitStylePublication } from "../commit";
import type { StylePublicationPlan } from "../types";

describe("atomic style publication", () => {
  let root: string;
  const temporaryRoot = path.resolve(os.tmpdir());
  const plan: StylePublicationPlan = {
    slug: "atomic-probe",
    writes: [
      { relativePath: "registry.ts", kind: "registry", previousContent: "original\n", content: "updated\n" },
      { relativePath: "first.ts", kind: "generated", content: "first\n" },
      { relativePath: "second.ts", kind: "generated", content: "second\n" },
    ],
  };

  beforeEach(async () => {
    root = await mkdtemp(path.join(temporaryRoot, "stylekit-atomic-"));
    await writeFile(path.join(root, "registry.ts"), "original\n");
  });

  afterEach(async () => {
    const resolved = await realpath(root);
    if (!resolved.toLowerCase().startsWith((temporaryRoot + path.sep).toLowerCase())) {
      throw new Error("Temporary publication root escaped the test directory");
    }
    await rm(resolved, { recursive: true, force: true });
  });

  it("keeps an existing registry intact after a partial staging write rejects", async () => {
    const partial: typeof writeFile = async (...args) => {
      await writeFile(args[0], "partial");
      throw new Error("partial disk write");
    };
    const result = await commitStylePublication(plan, root, { writeFile: partial });
    expect(result.success).toBe(false);
    expect(result.outcome).toBe("not-applied");
    expect(await readFile(path.join(root, "registry.ts"), "utf8")).toBe("original\n");
    expect(await readdir(root)).toEqual(["registry.ts"]);
  });

  it("does not leave a new generated file after a partial staging rejection", async () => {
    const partial: typeof writeFile = async (...args) => {
      await writeFile(args[0], "partial");
      throw new Error("partial disk write");
    };
    const result = await commitStylePublication({ ...plan, writes: [
      { relativePath: "nested/new-style.ts", kind: "generated", content: "new\n" },
    ] }, root, { writeFile: partial });
    expect(result.success).toBe(false);
    expect(await readdir(root)).toEqual(["registry.ts"]);
  });

  it("rejects truncated content even when a custom writer resolves successfully", async () => {
    const incomplete: typeof writeFile = async (...args) => { await writeFile(args[0], "short"); };
    const result = await commitStylePublication(plan, root, { writeFile: incomplete });
    expect(result.errors[0]).toContain("Incomplete staged");
    expect(await readFile(path.join(root, "registry.ts"), "utf8")).toBe("original\n");
  });

  it("restores applied registry and generated files after a later replacement fails", async () => {
    let calls = 0;
    const failThird: typeof rename = async (...args) => {
      if (++calls === 3) throw new Error("replacement failed");
      return rename(...args);
    };
    const result = await commitStylePublication(plan, root, { rename: failThird });
    expect(result.success).toBe(false);
    expect(result.recoveryFiles).toBeUndefined();
    expect(await readFile(path.join(root, "registry.ts"), "utf8")).toBe("original\n");
    expect(await readdir(root)).toEqual(["registry.ts"]);
  });

  it("keeps a complete recovery file if restoration itself fails", async () => {
    let calls = 0;
    const failFromThird: typeof rename = async (...args) => {
      if (++calls >= 3) throw new Error("replacement unavailable");
      return rename(...args);
    };
    const result = await commitStylePublication(plan, root, { rename: failFromThird });
    expect(result.success).toBe(false);
    expect(result.errors.join("\n")).toContain("Rollback failed for registry.ts");
    expect(result.recoveryFiles).toHaveLength(1);
    expect(result.outcome).toBe("recovery-needed");
    expect(path.isAbsolute(result.recoveryFiles![0])).toBe(false);
    expect(await readFile(path.join(root, result.recoveryFiles![0]), "utf8")).toBe("original\n");
    expect(result.errors.join("\n")).toContain(result.recoveryFiles![0]);
    expect(await readFile(path.join(root, "registry.ts"), "utf8")).toBe("updated\n");
  });

  it("preserves edits made after planning instead of overwriting them", async () => {
    await writeFile(path.join(root, "registry.ts"), "newer edit\n");
    const result = await commitStylePublication(plan, root);
    expect(result.errors[0]).toContain("changed since planning");
    expect(result.outcome).toBe("conflict");
    expect(await readFile(path.join(root, "registry.ts"), "utf8")).toBe("newer edit\n");
    expect(await readdir(root)).toEqual(["registry.ts"]);
  });

  it("restores a replacement that happened before the adapter rejected", async () => {
    let calls = 0;
    const rejectAfterReplace: typeof rename = async (...args) => {
      await rename(...args);
      if (++calls === 1) throw new Error("replacement acknowledgement lost");
    };
    const result = await commitStylePublication(plan, root, { rename: rejectAfterReplace });
    expect(result.success).toBe(false);
    expect(result.recoveryFiles).toBeUndefined();
    expect(await readFile(path.join(root, "registry.ts"), "utf8")).toBe("original\n");
    expect(await readdir(root)).toEqual(["registry.ts"]);
  });

  it("rejects a competing publication instead of interleaving the same registries", async () => {
    let release: () => void = () => {};
    let announce: () => void = () => {};
    const started = new Promise<void>((resolve) => { announce = resolve; });
    const resume = new Promise<void>((resolve) => { release = resolve; });
    let waiting = false;
    const delayed: typeof writeFile = async (...args) => {
      if (!waiting) {
        waiting = true;
        announce();
        await resume;
      }
      return writeFile(...args);
    };
    const first = commitStylePublication(plan, root, { writeFile: delayed });
    await started;
    const second = await commitStylePublication(plan, root);
    expect(second.success).toBe(false);
    expect(second.outcome).toBe("busy");
    expect(second.errors[0]).toContain("already in progress");
    release();
    expect((await first).success).toBe(true);
    expect(await readFile(path.join(root, "registry.ts"), "utf8")).toBe("updated\n");
    expect(await readdir(root)).toEqual(["first.ts", "registry.ts", "second.ts"]);
  });

  it("does not report missing recovery files when restore happened before rejection", async () => {
    let calls = 0;
    const loseRestoreAcknowledgement: typeof rename = async (...args) => {
      calls++;
      if (calls === 3) throw new Error("apply failed");
      await rename(...args);
      if (calls === 4) throw new Error("restore acknowledgement lost");
    };
    const result = await commitStylePublication(plan, root, { rename: loseRestoreAcknowledgement });
    expect(result.success).toBe(false);
    expect(result.recoveryFiles).toBeUndefined();
    expect(await readFile(path.join(root, "registry.ts"), "utf8")).toBe("original\n");
    expect(await readdir(root)).toEqual(["registry.ts"]);
  });
});
