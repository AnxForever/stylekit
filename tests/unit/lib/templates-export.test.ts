import { describe, expect, it } from "vitest";
import { buildScaffoldFiles, stripSiteOnlyCode } from "@/lib/templates/export";

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
