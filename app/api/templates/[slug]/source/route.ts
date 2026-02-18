import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

const TEMPLATES_DIR = path.join(process.cwd(), "app", "templates");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Sanitize: allow only alphanumeric + hyphens
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const filePath = path.join(TEMPLATES_DIR, slug, "page.tsx");

  // Ensure the resolved path is still inside TEMPLATES_DIR (path traversal guard)
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(TEMPLATES_DIR))) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  try {
    const source = await readFile(resolved, "utf-8");
    return NextResponse.json({
      slug,
      filename: `${slug}.tsx`,
      source,
    });
  } catch {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }
}
