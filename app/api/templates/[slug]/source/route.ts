import { NextResponse } from "next/server";
import { getTemplateProject } from "@/lib/templates/project";
import type { TemplateSourceProject } from "@/lib/templates/source";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const project = await getTemplateProject(slug);
  if (!project) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  if (new URL(request.url).searchParams.get("view") === "project") {
    const binaryFiles = new Set(project.binaryFiles);
    const response: TemplateSourceProject = {
      slug,
      filename: project.filename,
      source: project.source,
      entryPath: `app/templates/${slug}/page.tsx`,
      files: Object.fromEntries(
        Object.entries(project.files).filter(([name]) => !binaryFiles.has(name))
      ),
      binaryFiles: project.binaryFiles,
    };
    return NextResponse.json(response);
  }

  return NextResponse.json({
    slug,
    filename: project.filename,
    source: project.source,
  });
}
