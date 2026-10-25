import { describe, expect, it } from "vitest";
import {
  getTemplateSourceLanguage,
  parseTemplateSourceProject,
  type TemplateSourceProject,
} from "@/lib/templates/source";

const entryPath = "app/templates/technical-profile/page.tsx";
const source = "export default function Page() { return null; }";

function validProject(
  overrides: Partial<TemplateSourceProject> = {}
): TemplateSourceProject {
  return {
    slug: "technical-profile",
    filename: "technical-profile.tsx",
    source,
    entryPath,
    files: {
      [entryPath]: source,
      "app/templates/technical-profile/_data.ts": "export const PROJECTS = [];",
    },
    binaryFiles: ["public/profile.png"],
    ...overrides,
  };
}

describe("parseTemplateSourceProject", () => {
  it("accepts a complete text source map and a separate binary path list", () => {
    const project = validProject();

    expect(parseTemplateSourceProject(project)).toEqual(project);
    expect(project.files).not.toHaveProperty("public/profile.png");
  });

  it.each([
    ["a missing source map", { files: undefined }],
    ["a missing binary manifest", { binaryFiles: undefined }],
    ["an absent entry file", { files: { "app/templates/technical-profile/_data.ts": "export {};" } }],
    ["entry source that disagrees with the file map", { source: "different source" }],
    ["a filename for a different slug", { filename: "other-template.tsx" }],
    ["an entry path for a different slug", { entryPath: "app/templates/other/page.tsx" }],
  ] as const)("rejects %s", (_label, overrides) => {
    expect(parseTemplateSourceProject(validProject(overrides))).toBeNull();
  });

  it.each([
    "../outside.tsx",
    "/absolute/page.tsx",
    "app\\templates\\technical-profile\\page.tsx",
    "app//templates/page.tsx",
    "app/./templates/page.tsx",
    "app/__proto__/page.tsx",
    "app/constructor/page.tsx",
    "app/prototype/page.tsx",
    "app/templates/technical-profile/page.tsx\nother.tsx",
  ])("rejects unsafe project path %s", (unsafePath) => {
    const project = validProject({
      files: {
        [entryPath]: source,
        [unsafePath]: "not safe",
      },
    });

    expect(parseTemplateSourceProject(project)).toBeNull();
  });

  it("rejects non-text file values and malformed top-level values", () => {
    expect(parseTemplateSourceProject(null)).toBeNull();
    expect(parseTemplateSourceProject([])).toBeNull();
    expect(parseTemplateSourceProject({ ...validProject(), files: { [entryPath]: source, "app/data.json": 1 } })).toBeNull();
  });

  it.each([
    ["a text path duplicated as binary", [entryPath]],
    ["a duplicate binary path", ["public/profile.png", "public/profile.png"]],
    ["an unsafe binary path", ["../profile.png"]],
  ] as const)("rejects %s", (_label, binaryFiles) => {
    expect(parseTemplateSourceProject(validProject({ binaryFiles: [...binaryFiles] }))).toBeNull();
  });
});

describe("getTemplateSourceLanguage", () => {
  it.each([
    ["app/templates/technical-profile/page.tsx", "tsx"],
    ["app/templates/technical-profile/_data.ts", "ts"],
    ["next.config.mjs", "js"],
    ["components/demo.jsx", "js"],
    ["app/globals.css", "css"],
    ["package.json", "json"],
    ["CUSTOMIZE.md", "md"],
    ["content/post.MDX", "md"],
  ] as const)("buckets %s as %s", (filePath, language) => {
    expect(getTemplateSourceLanguage(filePath)).toBe(language);
  });

  it.each([
    ".gitignore",
    "Dockerfile",
    "public/robots.txt",
    "lib.d/README",
    ".env.example",
  ])("falls back to other for %s", (filePath) => {
    expect(getTemplateSourceLanguage(filePath)).toBe("other");
  });
});
