import { getStyleBySlug } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { generateSkillPack } from "@/lib/export/skill-pack";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const style = getStyleBySlug(slug);

  if (!style) {
    return NextResponse.json(
      { error: "Style not found" },
      { status: 404 }
    );
  }

  const tokens = getStyleTokens(slug);
  const skillPackContent = generateSkillPack({ style, tokens });

  return new Response(skillPackContent, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}-SKILL.md"`,
    },
  });
}
