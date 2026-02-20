import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getStyleRecipes } from "@/lib/recipes";
import { getStyleVersion } from "@/lib/versioning";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const resolved = await resolveStyleBySlug(slug);
  const style = resolved?.style;

  if (!style) {
    return NextResponse.json(
      { error: "Style not found" },
      { status: 404 }
    );
  }

  const history = getStyleVersion(slug);
  if (!history) {
    return NextResponse.json(
      { error: "No version history found" },
      { status: 404 }
    );
  }

  const requestedVersion = request.nextUrl.searchParams.get("version");

  // If a specific version is requested, validate it exists
  if (requestedVersion) {
    const versionEntry = history.versions.find(
      (v) => v.version === requestedVersion
    );
    if (!versionEntry) {
      return NextResponse.json(
        { error: `Version ${requestedVersion} not found for style ${slug}` },
        { status: 404 }
      );
    }

    // For now all versions point to the same current data,
    // since we only have 1.0.0. Future versions will store snapshots.
    const tokens = resolved.tokens ?? getStyleTokens(slug);
    const recipes =
      resolved.source === "static" ? getStyleRecipes(slug) : null;

    return NextResponse.json({
      slug,
      version: versionEntry.version,
      date: versionEntry.date,
      changes: versionEntry.changes,
      tokens: tokens || null,
      recipes: recipes
        ? { styleSlug: recipes.styleSlug, recipes: recipes.recipes }
        : null,
    });
  }

  // No version param: return full version history
  return NextResponse.json({
    slug,
    current: history.current,
    versions: history.versions,
  });
}
