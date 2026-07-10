import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cp, mkdtemp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import ts from "typescript";
import { publishStyleToCodebase } from "@/lib/submit/auto-register";
import type { SubmissionRecord } from "@/lib/submit/reviewer";
import { generateStyleScaffoldFiles } from "@/lib/scaffold/style-scaffold";

const REGISTRY_FILES = [
  "lib/styles/registry.ts",
  "lib/styles/meta-registry.ts",
  "lib/styles/tokens-registry-data.ts",
  "lib/recipes/registry.ts",
  "lib/style-components.tsx",
] as const;

const submission: SubmissionRecord = {
  id: "sub-architecture-test",
  slug: "architecture-test-style",
  submittedAt: "2026-07-10T00:00:00.000Z",
  status: "approved",
  formData: {
    name: "架构测试风",
    nameEn: "Architecture Test Style",
    description: "A style used to verify codebase publication.",
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
  },
  tokens: {},
  designStyle: {},
};

describe("publishStyleToCodebase", () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await mkdtemp(path.join(os.tmpdir(), "stylekit-publication-"));

    for (const relativePath of REGISTRY_FILES) {
      const destination = path.join(rootDir, relativePath);
      await mkdir(path.dirname(destination), { recursive: true });
      await cp(path.join(process.cwd(), relativePath), destination);
    }
  });

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true });
  });

  it("publishes a style through the current split registries", async () => {
    const result = await publishStyleToCodebase(submission, rootDir);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.registriesPatched).toEqual(REGISTRY_FILES);

    await expect(
      readFile(path.join(rootDir, "lib/styles/architecture-test-style.ts"), "utf8"),
    ).resolves.toContain('"slug": "architecture-test-style"');

    const registryAssertions = [
      ["lib/styles/registry.ts", 'from "./architecture-test-style"'],
      ["lib/styles/meta-registry.ts", 'slug: "architecture-test-style"'],
      ["lib/styles/tokens-registry-data.ts", '"architecture-test-style": architectureTestStyleTokens'],
      ["lib/recipes/registry.ts", '"architecture-test-style": architectureTestStyleRecipes'],
      ["lib/style-components.tsx", '"architecture-test-style": {'],
    ] as const;

    for (const [relativePath, expectedText] of registryAssertions) {
      await expect(readFile(path.join(rootDir, relativePath), "utf8")).resolves.toContain(
        expectedText,
      );
    }

    const previewRegistry = await readFile(
      path.join(rootDir, "lib/style-components.tsx"),
      "utf8",
    );
    const publishedPreview = previewRegistry.slice(
      previewRegistry.indexOf('"architecture-test-style": {'),
    );
    expect(publishedPreview).toContain("coverPreview: () => (");
    expect(publishedPreview).not.toContain("button: () => (");
    expect(publishedPreview).not.toContain("card: () => (");
    expect(publishedPreview).not.toContain("input: () => (");
  });

  it("rolls back generated files and registries when a later write fails", async () => {
    const stylesRegistryBefore = await readFile(
      path.join(rootDir, "lib/styles/registry.ts"),
      "utf8",
    );
    const metaRegistryBefore = await readFile(
      path.join(rootDir, "lib/styles/meta-registry.ts"),
      "utf8",
    );
    let writeCount = 0;
    const failAfterRegistryWritesBegin: typeof writeFile = async (...args) => {
      writeCount += 1;
      if (writeCount === 9) {
        throw new Error("simulated publication write failure");
      }
      return writeFile(...args);
    };

    const result = await publishStyleToCodebase(submission, rootDir, {
      writeFile: failAfterRegistryWritesBegin,
    });

    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain("simulated publication write failure");
    await expect(
      stat(path.join(rootDir, "lib/styles/architecture-test-style.ts")),
    ).rejects.toMatchObject({ code: "ENOENT" });
    await expect(
      stat(path.join(rootDir, "lib/styles/architecture-test-style-tokens.ts")),
    ).rejects.toMatchObject({ code: "ENOENT" });
    await expect(readFile(path.join(rootDir, "lib/styles/registry.ts"), "utf8")).resolves.toBe(
      stylesRegistryBefore,
    );
    await expect(
      readFile(path.join(rootDir, "lib/styles/meta-registry.ts"), "utf8"),
    ).resolves.toBe(metaRegistryBefore);
  });

  it("generates syntactically valid recipe source", async () => {
    const result = await publishStyleToCodebase(submission, rootDir);
    expect(result.success).toBe(true);

    const recipeSource = await readFile(
      path.join(rootDir, "lib/recipes/architecture-test-style.ts"),
      "utf8",
    );
    const transpiled = ts.transpileModule(recipeSource, {
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

    expect(syntaxErrors).toEqual([]);
  });

  it("generates a showcase page that imports the generated default export", async () => {
    const result = await publishStyleToCodebase(submission, rootDir);
    expect(result.success).toBe(true);

    const pageSource = await readFile(
      path.join(rootDir, "app/styles/architecture-test-style/showcase/page.tsx"),
      "utf8",
    );
    const contentSource = await readFile(
      path.join(rootDir, "app/styles/architecture-test-style/showcase/_content.tsx"),
      "utf8",
    );

    expect(pageSource).toContain('import ShowcaseContent from "./_content";');
    expect(contentSource).toContain("export default function ShowcaseContent()");
  });

  it("does not write generated files when a registry cannot be planned", async () => {
    const registryPath = path.join(rootDir, "lib/styles/registry.ts");
    const registryBefore = await readFile(registryPath, "utf8");
    await writeFile(registryPath, registryBefore.replace("// 风格列表", "// marker removed"));

    const result = await publishStyleToCodebase(submission, rootDir);

    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain("insertion point not found");
    await expect(
      stat(path.join(rootDir, "lib/styles/architecture-test-style.ts")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("rejects unsafe color values before generating source", async () => {
    const unsafeSubmission = structuredClone(submission);
    unsafeSubmission.slug = "unsafe-color-style";
    unsafeSubmission.formData.primaryColor = '#112233" }}><script>alert(1)</script>';

    const result = await publishStyleToCodebase(unsafeSubmission, rootDir);

    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain("Invalid primary color");
    await expect(
      stat(path.join(rootDir, "lib/styles/unsafe-color-style.ts")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });
});

describe("style scaffold registration guide", () => {
  it("points maintainers at the current split registries", () => {
    const guide = generateStyleScaffoldFiles({
      name: "架构测试风",
      nameEn: "Architecture Test Style",
      slug: "architecture-test-style",
      description: "A style used to verify documentation.",
      category: "modern",
      styleType: "visual",
      tags: ["responsive"],
      primaryColor: "#112233",
      secondaryColor: "#f8fafc",
      accentColors: ["#22c55e"],
      keywords: ["architecture"],
      philosophy: "Keep publication behavior concentrated.",
      doList: ["Use current registries."],
      dontList: ["Do not patch public entry points."],
      buttonCode: "<button>Test</button>",
      cardCode: "<div>Card</div>",
      inputCode: "<input />",
    }).find((file) => file.name === "scaffold/REGISTER.md");

    expect(guide?.content).toContain("lib/styles/registry.ts");
    expect(guide?.content).toContain("lib/styles/meta-registry.ts");
    expect(guide?.content).toContain("lib/styles/tokens-registry-data.ts");
    expect(guide?.content).toContain("lib/recipes/registry.ts");
    expect(guide?.content).not.toContain("File: `lib/styles/index.ts`");
    expect(guide?.content).not.toContain("File: `lib/styles/meta.ts`");
  });
});
