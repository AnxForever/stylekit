import { constants as fsConstants } from "node:fs";
import { lstat, open, readdir, realpath } from "node:fs/promises";
import path from "node:path";
import { templateCatalog } from "@/lib/templates/catalog";
import {
  buildScaffoldFiles,
  stripSiteOnlyCode,
  type TemplateProjectMeta,
} from "@/lib/templates/export";

const TEMPLATE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TEXT_EXTENSIONS = new Set([
  ".css", ".js", ".jsx", ".json", ".md", ".mjs", ".ts", ".tsx", ".txt",
]);
const OMIT_NAMES = new Set([".DS_Store", "node_modules", ".next", ".git"]);
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_PROJECT_BYTES = 30 * 1024 * 1024;

export type TemplateLicense = {
  name: string;
  terms: string;
  attribution: string;
};

/**
 * File values are UTF-8 text except paths named by binaryFiles, which contain
 * base64. File paths are relative to the exported project root.
 */
export type TemplateProject = {
  slug: string;
  filename: string;
  source: string;
  files: Record<string, string>;
  binaryFiles: string[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  license: TemplateLicense;
};

type SourceFile = { relativePath: string; content: Buffer };

const TEMPLATE_LICENSE: Omit<TemplateLicense, "terms"> = {
  name: "MIT License",
  attribution: "Copyright (c) 2026 AnxForever\nStyleKit Templates (https://www.stylekit.top/templates)",
};

function isInside(parent: string, candidate: string): boolean {
  const relative = path.relative(parent, candidate);
  return relative !== "" && relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function isSafeRelativePath(relativePath: string): boolean {
  if (!relativePath || path.isAbsolute(relativePath) ||
      relativePath.includes("\\") || relativePath.includes("\0")) return false;
  return relativePath.split("/").every((part) =>
    part !== "" && part !== "." && part !== ".."
  );
}

async function readRegularFile(filePath: string): Promise<Buffer> {
  const metadata = await lstat(filePath);
  if (!metadata.isFile() || metadata.isSymbolicLink() ||
      metadata.size > MAX_FILE_BYTES) {
    throw new Error("Unsupported template file");
  }

  const handle = await open(filePath, fsConstants.O_RDONLY | fsConstants.O_NOFOLLOW);
  try {
    const openedMetadata = await handle.stat();
    if (!openedMetadata.isFile() || openedMetadata.size > MAX_FILE_BYTES) {
      throw new Error("Unsupported template file");
    }
    return await handle.readFile();
  } finally {
    await handle.close();
  }
}

async function collectSourceFiles(
  sourceRoot: string,
  directory = sourceRoot,
  prefix = ""
): Promise<SourceFile[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name));
  const files: SourceFile[] = [];

  for (const entry of entries) {
    if (OMIT_NAMES.has(entry.name) || entry.name.startsWith(".env")) continue;

    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (!isSafeRelativePath(relativePath)) throw new Error("Unsafe template path");

    const absolutePath = path.join(directory, entry.name);
    const metadata = await lstat(absolutePath);
    if (metadata.isSymbolicLink()) throw new Error("Template symlinks are not exported");

    if (metadata.isDirectory()) {
      files.push(...await collectSourceFiles(sourceRoot, absolutePath, relativePath));
      continue;
    }
    if (!metadata.isFile()) continue;

    const resolvedPath = await realpath(absolutePath);
    if (!isInside(sourceRoot, resolvedPath)) {
      throw new Error("Template file resolves outside its source directory");
    }
    files.push({ relativePath, content: await readRegularFile(absolutePath) });
  }
  return files;
}

function packageDependencies(slug: string): Record<string, string> {
  // These cover imports used by the 36 local catalog templates and the
  // shared Brutal UI component barrel. Tests verify source imports against it.
  const dependencies: Record<string, string> = {
    "lucide-react": "^0.563.0",
    next: "^16.1.6",
    react: "^19.2.3",
    "react-dom": "^19.2.3",
  };
  if (slug === "brutal-landing") {
    dependencies.clsx = "^2.1.1";
    dependencies["tailwind-merge"] = "^3.4.0";
  }
  return dependencies;
}

function projectMeta(
  entry: (typeof templateCatalog)[number],
  slug: string
): TemplateProjectMeta {
  return {
    slug,
    nameEn: entry.name.en,
    nameZh: entry.name.zh,
    descriptionEn: entry.description.en,
  };
}

function withDependencies(
  scaffold: Record<string, string>,
  dependencies: Record<string, string>
): Record<string, string> {
  const pkg = JSON.parse(scaffold["package.json"] ?? "{}") as {
    dependencies?: Record<string, string>;
  };
  return {
    ...scaffold,
    "package.json": `${JSON.stringify({
      ...pkg,
      dependencies: { ...(pkg.dependencies ?? {}), ...dependencies },
    }, null, 2)}\n`,
  };
}

function getDevDependencies(scaffold: Record<string, string>): Record<string, string> {
  const pkg = JSON.parse(scaffold["package.json"] ?? "{}") as {
    devDependencies?: Record<string, string>;
  };
  return pkg.devDependencies ?? {};
}

function licenseFromSource(
  sources: SourceFile[],
  rootLicenseText: string
): TemplateLicense {
  const license: TemplateLicense = {
    ...TEMPLATE_LICENSE,
    terms: rootLicenseText.trim(),
  };
  const readme = sources.find((file) =>
    /^readme(?:\.|$)/i.test(path.basename(file.relativePath))
  );
  if (readme) {
    license.attribution += "\n\n" + readme.content.toString("utf8");
  }
  return license;
}

async function readRepositoryLicense(): Promise<string> {
  const root = path.resolve(process.cwd());
  const licensePath = path.join(root, "LICENSE");
  if (await realpath(root) !== root || await realpath(licensePath) !== licensePath) {
    throw new Error("Repository license resolves through a symlink");
  }
  return (await readRegularFile(licensePath)).toString("utf8");
}

async function collectBrutalUiFiles(): Promise<SourceFile[]> {
  const root = path.resolve(process.cwd(), "components", "ui", "brutal");
  const metadata = await lstat(root);
  if (!metadata.isDirectory() || metadata.isSymbolicLink() || await realpath(root) !== root) {
    throw new Error("Brutal UI source directory is unavailable");
  }
  const files = await collectSourceFiles(root);
  return files.map((file) => ({
    ...file,
    relativePath: `components/ui/brutal/${file.relativePath}`,
  }));
}

async function readSharedUtils(): Promise<SourceFile> {
  const root = path.resolve(process.cwd(), "lib");
  const filePath = path.join(root, "utils.ts");
  if (await realpath(root) !== root || await realpath(filePath) !== filePath) {
    throw new Error("Shared utility source resolves through a symlink");
  }
  return { relativePath: "lib/utils.ts", content: await readRegularFile(filePath) };
}

/** Returns a complete standalone project for local catalog entries only. */
export async function getTemplateProject(
  slug: string
): Promise<TemplateProject | null> {
  if (!TEMPLATE_SLUG.test(slug)) return null;

  const entry = templateCatalog.find((candidate) => candidate.id === slug);
  if (!entry || entry.external || entry.href !== `/templates/${slug}` ||
      entry.codePath !== `app/templates/${slug}/page.tsx`) {
    return null;
  }

  const templatesRoot = path.resolve(process.cwd(), "app", "templates");
  const templateRoot = path.resolve(templatesRoot, slug);
  if (!isInside(templatesRoot, templateRoot)) return null;

  try {
    const rootMetadata = await lstat(templateRoot);
    if (!rootMetadata.isDirectory() || rootMetadata.isSymbolicLink()) return null;
    if (await realpath(templateRoot) !== templateRoot) return null;

    const sourceFiles = await collectSourceFiles(templateRoot);
    const mainPage = sourceFiles.find((file) => file.relativePath === "page.tsx");
    if (!mainPage) return null;
    if (sourceFiles.reduce((total, file) => total + file.content.byteLength, 0) >
        MAX_PROJECT_BYTES) return null;

    const dependencies = packageDependencies(slug);
    const scaffold = buildScaffoldFiles(projectMeta(entry, slug));
    const files = withDependencies(scaffold, dependencies);
    const binaryFiles: string[] = [];

    const exportedSources = [...sourceFiles];
    if (slug === "brutal-landing") {
      exportedSources.push(...await collectBrutalUiFiles(), await readSharedUtils());
    }

    for (const file of exportedSources) {
      const projectPath = file.relativePath.startsWith("components/") ||
        file.relativePath.startsWith("lib/")
        ? file.relativePath
        : `app/templates/${slug}/${file.relativePath}`;
      const extension = path.extname(file.relativePath).toLowerCase();
      const isBinary = !TEXT_EXTENSIONS.has(extension);
      let content = isBinary
        ? file.content.toString("base64")
        : file.content.toString("utf8");

      if (!isBinary && (extension === ".tsx" || extension === ".ts")) {
        content = stripSiteOnlyCode(content);
      }
      files[projectPath] = content;
      if (isBinary) binaryFiles.push(projectPath);
    }

    const source = stripSiteOnlyCode(mainPage.content.toString("utf8"));
    files["app/page.tsx"] =
      `import { redirect } from "next/navigation";\n\nexport default function Home() {\n  redirect("/templates/${slug}");\n}\n`;

    const rootLicense = await readRepositoryLicense();
    const license = licenseFromSource(sourceFiles, rootLicense);
    files["LICENSE"] = rootLicense.endsWith("\n") ? rootLicense : rootLicense + "\n";
    files["README.md"] =
      (files["README.md"] ?? "") +
      "\n\n## Attribution\n\n" +
      license.attribution +
      "\n";

    return {
      slug,
      filename: `${slug}.tsx`,
      source,
      files,
      binaryFiles,
      dependencies,
      devDependencies: getDevDependencies(scaffold),
      license,
    };
  } catch {
    return null;
  }
}
