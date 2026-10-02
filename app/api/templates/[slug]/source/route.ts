import { NextResponse } from "next/server";
import { getTemplateProject } from "@/lib/templates/project";

export async function GET(
  _request: Request,
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

  return NextResponse.json({
    slug,
    filename: project.filename,
    source: project.source,
  });
}
