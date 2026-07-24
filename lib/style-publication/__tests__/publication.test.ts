import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cp, mkdtemp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import ts from "typescript";
import { publishStyle } from "@/lib/style-publication";
import type { StyleScaffoldInput } from "@/lib/scaffold/style-scaffold";
import {
  STYLE_PUBLICATION_REGISTRIES,
  createStylePublicationPlan,
} from "@/lib/style-publication/plan";

const registryPaths = Object.values(STYLE_PUBLICATION_REGISTRIES);

const input: StyleScaffoldInput = {
  name: "架构测试风",
  nameEn: "Architecture Test Style",
  slug: "architecture-test-style",
  description: "A style used to verify the publication boundary.",
  category: "modern",
  styleType: "visual",
  tags: ["responsive"],
  primaryColor: "#112233",
  secondaryColor: "#f8fafc",
  accentColors: ["#22c55e"],
  keywords: ["architecture", "test"],
  philosophy: "Keep publication behavior concentrated.",
  doList: ["Use one publication interface."],
  dontList: ["Do not patch stale registries."],
  buttonCode: "<button>Test</button>",
  cardCode: "<div>Card</div>",
  inputCode: "<input />",
  previewModule: `import type { StylePreviewComponents } from "../types";

const preview = {
  coverPreview: () => <div data-approved-preview="architecture-test-style" />,
} satisfies StylePreviewComponents;

export default preview;
`,
};

async function createRegistryCopy(): Promise<string> {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "stylekit-publication-module-"));
  await Promise.all(
    registryPaths.map(async (relativePath) => {
      const destination = path.join(rootDir, relativePath);
      await mkdir(path.dirname(destination), { recursive: true });
      await cp(path.join(process.cwd(), relativePath), destination);
    }),
  );
  return rootDir;
}

async function snapshotRegistries(rootDir: string): Promise<Map<string, string>> {
  const entries = await Promise.all(
    registryPaths.map(async (relativePath) => [
      relativePath,
      await readFile(path.join(rootDir, relativePath), "utf8"),
    ] as const),
  );
  return new Map(entries);
}

async function expectRegistriesToEqual(
  rootDir: string,
  snapshot: ReadonlyMap<string, string>,
): Promise<void> {
  for (const relativePath of registryPaths) {
    await expect(readFile(path.join(rootDir, relativePath), "utf8")).resolves.toBe(
      snapshot.get(relativePath),
    );
  }
}

describe("style publication public interface", () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await createRegistryCopy();
  });

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true });
  });

  it("plans all generated files and registry projections without filesystem side effects", async () => {
    const before = await snapshotRegistries(rootDir);
    const plan = await createStylePublicationPlan(input, rootDir);

    expect(plan.slug).toBe(input.slug);
    expect(plan.writes).toHaveLength(13);
    expect(plan.writes.filter((write) => write.kind === "generated")).toHaveLength(7);
    expect(plan.writes.filter((write) => write.kind === "registry")).toHaveLength(6);
    expect(plan.writes.filter((write) => write.kind === "registry").every((write) => write.previousContent)).toBe(
      true,
    );
    for (const write of plan.writes.filter((item) => /\.tsx?$/.test(item.relativePath))) {
      const transpiled = ts.transpileModule(write.content, {
        compilerOptions: {
          jsx: ts.JsxEmit.ReactJSX,
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
        },
        reportDiagnostics: true,
      });
      const syntaxErrors = (transpiled.diagnostics ?? []).filter(
        (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
      );
      expect(syntaxErrors, write.relativePath).toEqual([]);
    }
    await expectRegistriesToEqual(rootDir, before);
    await expect(
      stat(path.join(rootDir, "lib/styles/architecture-test-style.ts")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("rejects a missing registry projection before writing generated files", async () => {
    const before = await snapshotRegistries(rootDir);
    const stylesPath = path.join(rootDir, STYLE_PUBLICATION_REGISTRIES.styles);
    const styles = await readFile(stylesPath, "utf8");
    await writeFile(stylesPath, styles.replace("// 风格列表", "// marker removed"));
    const changedBefore = await snapshotRegistries(rootDir);

    const result = await publishStyle(input, rootDir);

    expect(result.success).toBe(false);
    expect(result.filesWritten).toEqual([]);
    expect(result.registriesPatched).toEqual([]);
    expect(result.errors[0]).toContain("insertion point not found");
    await expectRegistriesToEqual(rootDir, changedBefore);
    await expect(
      stat(path.join(rootDir, "lib/styles/architecture-test-style.ts")),
    ).rejects.toMatchObject({ code: "ENOENT" });
    expect(before.get(STYLE_PUBLICATION_REGISTRIES.meta)).toBe(
      changedBefore.get(STYLE_PUBLICATION_REGISTRIES.meta),
    );
  });

  it("rejects a duplicate slug from an existing registry projection", async () => {
    const stylesPath = path.join(rootDir, STYLE_PUBLICATION_REGISTRIES.styles);
    const styles = await readFile(stylesPath, "utf8");
    await writeFile(
      stylesPath,
      styles.replace(
        "// 风格列表",
        `import { architectureTestStyle } from "./architecture-test-style";\n// 风格列表`,
      ),
    );

    const result = await publishStyle(input, rootDir);

    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain("style already registered");
    await expect(
      stat(path.join(rootDir, "lib/styles/architecture-test-style.ts")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("rolls back every completed write when commit fails", async () => {
    const before = await snapshotRegistries(rootDir);
    let writeCount = 0;
    const failDuringCommit: typeof writeFile = async (...args) => {
      writeCount += 1;
      if (writeCount === 9) {
        throw new Error("simulated publication write failure");
      }
      return writeFile(...args);
    };

    const result = await publishStyle(input, rootDir, { writeFile: failDuringCommit });

    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain("simulated publication write failure");
    expect(result.filesWritten).toEqual([]);
    expect(result.registriesPatched).toEqual([]);
    await expectRegistriesToEqual(rootDir, before);
    for (const relativePath of [
      "lib/styles/architecture-test-style.ts",
      "lib/styles/architecture-test-style-tokens.ts",
      "public/styles/architecture-test-style.svg",
      "lib/recipes/architecture-test-style.ts",
      "app/styles/architecture-test-style/showcase/page.tsx",
      "app/styles/architecture-test-style/showcase/_content.tsx",
      "lib/style-preview/styles/architecture-test-style.tsx",
    ]) {
      await expect(stat(path.join(rootDir, relativePath))).rejects.toMatchObject({ code: "ENOENT" });
    }
  });
});
