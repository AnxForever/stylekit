import { NextResponse } from "next/server";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";
import { templateCatalog } from "@/lib/templates/catalog";
import { buildScaffoldFiles, stripSiteOnlyCode } from "@/lib/templates/export";

const TEMPLATES_DIR = path.join(process.cwd(), "app", "templates");

async function collectTemplateFiles(
  dir: string,
  prefix = ""
): Promise<Array<{ relPath: string; content: string }>> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: Array<{ relPath: string; content: string }> = [];

  for (const entry of entries) {
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectTemplateFiles(fullPath, relPath)));
    } else if (/\.(tsx|ts|css)$/.test(entry.name)) {
      files.push({ relPath, content: await readFile(fullPath, "utf-8") });
    }
  }

  return files;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  // Only catalog-listed templates are downloadable; this also keeps internal
  // route files (e.g. the [slug] loading boundary) out of reach.
  const entry = templateCatalog.find(
    (template) => template.href === `/templates/${slug}`
  );
  if (!entry) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  const templateDir = path.resolve(path.join(TEMPLATES_DIR, slug));
  if (!templateDir.startsWith(path.resolve(TEMPLATES_DIR))) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  let templateFiles: Array<{ relPath: string; content: string }>;
  try {
    templateFiles = await collectTemplateFiles(templateDir);
  } catch {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  if (!templateFiles.some((file) => file.relPath === "page.tsx")) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  const zip = new JSZip();
  const root = `${slug}-template`;

  const scaffold = buildScaffoldFiles({
    slug,
    nameEn: entry.name.en,
    nameZh: entry.name.zh,
    descriptionEn: entry.description.en,
  });
  for (const [filePath, content] of Object.entries(scaffold)) {
    zip.file(`${root}/${filePath}`, content);
  }

  for (const file of templateFiles) {
    const content =
      file.relPath === "page.tsx" ? stripSiteOnlyCode(file.content) : file.content;
    zip.file(`${root}/app/${file.relPath}`, content);
  }

  const buffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${slug}-template.zip"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
