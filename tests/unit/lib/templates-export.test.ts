import { describe, expect, it } from "vitest";
import JSZip from "jszip";
import ts from "typescript";
import path from "node:path";
import { buildScaffoldFiles, stripSiteOnlyCode } from "@/lib/templates/export";
import { templateCatalog } from "@/lib/templates/catalog";
import { getTemplateProject } from "@/lib/templates/project";
import { GET as getSource } from "@/app/api/templates/[slug]/source/route";
import { GET as getDownload } from "@/app/api/templates/[slug]/download/route";

describe("stripSiteOnlyCode", () => {
  it("removes the back-button import and JSX but nothing else", () => {
    const source = [
      '"use client";',
      "",
      'import { useState } from "react";',
      'import { TemplateBackButton } from "@/components/templates/template-back-button";',
      "",
      "export default function Page() {",
      "  return (",
      "    <main>",
      '      <TemplateBackButton variant="brutal" />',
      "      <h1>Hello</h1>",
      "    </main>",
      "  );",
      "}",
    ].join("\n");

    const stripped = stripSiteOnlyCode(source);

    expect(stripped).not.toContain("TemplateBackButton");
    expect(stripped).not.toContain("template-back-button");
    expect(stripped).toContain('import { useState } from "react";');
    expect(stripped).toContain("<h1>Hello</h1>");
  });

  it("leaves templates without the back button untouched", () => {
    const source = "export default function Page() {\n  return null;\n}\n";
    expect(stripSiteOnlyCode(source)).toBe(source);
  });
});

describe("buildScaffoldFiles", () => {
  const meta = {
    slug: "saas-landing",
    nameEn: "SaaS Landing",
    nameZh: "SaaS 落地页",
    descriptionEn: "A landing page.",
  };

  it("produces a complete runnable Next.js shell", () => {
    const files = buildScaffoldFiles(meta);

    expect(Object.keys(files).sort()).toEqual(
      [
        ".gitignore",
        "README.md",
        "app/globals.css",
        "app/layout.tsx",
        "next.config.ts",
        "package.json",
        "postcss.config.mjs",
        "tsconfig.json",
      ].sort()
    );

    const pkg = JSON.parse(files["package.json"]);
    expect(pkg.name).toBe("saas-landing-template");
    expect(pkg.dependencies).toHaveProperty("next");
    expect(pkg.dependencies).toHaveProperty("lucide-react");
    expect(pkg.devDependencies).toHaveProperty("tailwindcss");
    expect(pkg.devDependencies).toHaveProperty("@tailwindcss/postcss");

    expect(files["app/globals.css"]).toContain('@import "tailwindcss"');
    expect(files["app/layout.tsx"]).toContain('import "./globals.css"');
    expect(files["app/layout.tsx"]).toContain("SaaS Landing");
    expect(files["README.md"]).toContain("pnpm install");
    expect(files["README.md"]).toContain("SaaS 落地页");
  });
});

function collectModuleSpecifiers(source: string, filename: string): string[] {
  const scriptKind = filename.endsWith(".tsx")
    ? ts.ScriptKind.TSX
    : filename.endsWith(".jsx")
      ? ts.ScriptKind.JSX
      : ts.ScriptKind.TS;
  const ast = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  );
  const specifiers: string[] = [];

  function visit(node: ts.Node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      specifiers.push(node.moduleSpecifier.text);
    } else if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === "require")) &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      specifiers.push(node.arguments[0].text);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return specifiers;
}

function resolveProjectImport(
  projectFiles: Record<string, string>,
  importer: string,
  specifier: string
): string | null {
  const extensions = [".tsx", ".ts", ".jsx", ".js", ".css", ".json"];
  let base: string;
  if (specifier.startsWith("@/")) {
    base = specifier.slice(2);
  } else if (specifier.startsWith(".")) {
    base = path.posix.normalize(
      path.posix.join(
        path.posix.dirname(importer),
        specifier
      )
    );
  } else {
    return null;
  }

  const candidates = [base];
  if (!extensions.some((extension) => base.endsWith(extension))) {
    candidates.push(...extensions.map((extension) => `${base}${extension}`));
    candidates.push(...extensions.map((extension) => `${base}/index${extension}`));
  }
  return candidates.find((candidate) => candidate in projectFiles) ?? null;
}

function npmPackage(specifier: string): string {
  if (specifier.startsWith("@")) {
    const [scope, name] = specifier.split("/");
    return `${scope}/${name}`;
  }
  return specifier.split("/")[0];
}

describe("getTemplateProject", () => {
  const localTemplates = templateCatalog.filter(
    (entry) => !entry.external && entry.href.startsWith("/templates/")
  );

  it("exports all 36 local templates with closed import graphs and license data", async () => {
    expect(localTemplates).toHaveLength(36);

    for (const entry of localTemplates) {
      const project = await getTemplateProject(entry.id);
      expect(project, entry.id).not.toBeNull();
      if (!project) continue;

      expect(project.files["app/page.tsx"], entry.id).toContain(
        `redirect("/templates/${entry.id}")`
      );
      expect(project.files[`app/templates/${entry.id}/page.tsx`]).toBe(
        project.source
      );
      expect(project.source).not.toContain("TemplateBackButton");
      expect(project.license.name).toBe("MIT License");
      expect(project.license.terms).toContain("MIT License");
      expect(project.license.terms).toContain("Copyright (c) 2026 AnxForever");
      expect(project.license.attribution.trim()).not.toBe("");
      expect(project.files["LICENSE"]).toContain("Copyright (c) 2026 AnxForever");

      const pkg = JSON.parse(project.files["package.json"]);
      expect(pkg.dependencies).toEqual(project.dependencies);
      expect(pkg.devDependencies).toEqual(project.devDependencies);
      expect(project.files["README.md"]).toContain("## License");
      expect(project.files["README.md"]).toContain("StyleKit Templates");

      for (const filePath of project.binaryFiles) {
        expect(project.files[filePath], `${entry.id}: ${filePath}`).toMatch(
          /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
        );
      }

      for (const [filePath, content] of Object.entries(project.files)) {
        if (!/\.(?:ts|tsx|js|jsx)$/.test(filePath)) continue;
        for (const specifier of collectModuleSpecifiers(content, filePath)) {
          if (specifier.startsWith(".") || specifier.startsWith("@/")) {
            expect(
              resolveProjectImport(project.files, filePath, specifier),
              `${entry.id}: ${filePath} imports ${specifier}`
            ).not.toBeNull();
            continue;
          }
          if (specifier.startsWith("node:")) continue;
          expect(
            pkg.dependencies[npmPackage(specifier)] ??
              pkg.devDependencies[npmPackage(specifier)],
            `${entry.id}: missing dependency for ${specifier}`
          ).toBeDefined();
        }
      }
    }
  });

  it("excludes external and unknown catalog entries", async () => {
    await expect(getTemplateProject("nextdevtpl")).resolves.toBeNull();
    await expect(getTemplateProject("../brutal-landing")).resolves.toBeNull();
    await expect(getTemplateProject("not-a-template")).resolves.toBeNull();
  });

  it("keeps the source endpoint JSON contract and excludes nonlocal slugs", async () => {
    const response = await getSource(
      new Request("https://stylekit.test/api/templates/brutal-landing/source"),
      { params: Promise.resolve({ slug: "brutal-landing" }) }
    );
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(Object.keys(body).sort()).toEqual(["filename", "slug", "source"]);
    expect(body.slug).toBe("brutal-landing");
    expect(body.filename).toBe("brutal-landing.tsx");
    expect(body.source).not.toContain("TemplateBackButton");

    const external = await getSource(
      new Request("https://stylekit.test/api/templates/nextdevtpl/source"),
      { params: Promise.resolve({ slug: "nextdevtpl" }) }
    );
    expect(external.status).toBe(404);
  });

  it("downloads the exact helper project, including binary bytes", async () => {
    const project = await getTemplateProject("brutal-landing");
    expect(project).not.toBeNull();
    if (!project) return;

    const response = await getDownload(
      new Request("https://stylekit.test/api/templates/brutal-landing/download"),
      { params: Promise.resolve({ slug: "brutal-landing" }) }
    );
    expect(response.status).toBe(200);
    const archive = await JSZip.loadAsync(await response.arrayBuffer());
    const root = "brutal-landing-template/";
    expect(
      Object.keys(archive.files)
        .filter((filePath) => !archive.files[filePath].dir)
        .map((filePath) => filePath.slice(root.length))
        .sort()
    ).toEqual(Object.keys(project.files).sort());

    for (const [filePath, content] of Object.entries(project.files)) {
      const archived = await archive.file(`${root}${filePath}`)?.async("nodebuffer");
      expect(archived).toBeDefined();
      const expected = project.binaryFiles.includes(filePath)
        ? Buffer.from(content, "base64")
        : Buffer.from(content, "utf8");
      expect(archived).toEqual(expected);
    }
  });
});
