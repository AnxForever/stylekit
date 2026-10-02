import { NextResponse } from "next/server";
import { getPublicAsset, isAssetKind } from "@/lib/assets";
import { getTemplateProject } from "@/lib/templates/project";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ kind: string; id: string }> }
) {
  const { kind, id } = await params;
  if (!isAssetKind(kind) || !/^[a-z0-9][a-z0-9-]{0,127}$/.test(id)) {
    return NextResponse.json({ error: "Invalid asset kind or id" }, { status: 400 });
  }
  const asset = getPublicAsset(kind, id);
  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }
  if (kind === "template" && asset.metadata.availability === "remote") {
    try {
      const project = await getTemplateProject(id);
      if (!project) {
        return NextResponse.json({ error: "Template source unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
      }
      const catalogData = asset.data && typeof asset.data === "object" && !Array.isArray(asset.data) ? asset.data : {};
      return NextResponse.json({
        ...asset,
        data: {
          ...catalogData,
          sourceFilesIncluded: true,
          files: project.files,
          binaryFiles: project.binaryFiles,
          fileEncoding: "UTF-8 text; paths listed in binaryFiles contain base64",
          license: project.license,
          dependencies: project.dependencies,
          devDependencies: project.devDependencies,
        },
        dependencies: Object.entries(project.dependencies).map(([name, version]) => `${name}@${version}`),
      }, { headers: { "Cache-Control": "public, max-age=60, s-maxage=300" } });
    } catch {
      return NextResponse.json({ error: "Template source unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
    }
  }
  return NextResponse.json(asset, { headers: { "Cache-Control": "public, max-age=60, s-maxage=300" } });
}
