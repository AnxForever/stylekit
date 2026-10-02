import { NextResponse } from "next/server";
import JSZip from "jszip";
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

  const zip = new JSZip();
  const root = `${slug}-template`;
  const binaryFiles = new Set(project.binaryFiles);

  for (const [filePath, content] of Object.entries(project.files)) {
    zip.file(
      `${root}/${filePath}`,
      content,
      binaryFiles.has(filePath) ? { base64: true } : {}
    );
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
