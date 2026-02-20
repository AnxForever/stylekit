import { generateSkillPack } from "@/lib/export/skill-pack";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
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

  const tokens = resolved.tokens;
  const skillPackContent = generateSkillPack({
    style,
    tokens: tokens ?? undefined,
  });

  return new Response(skillPackContent, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}-SKILL.md"`,
    },
  });
}
