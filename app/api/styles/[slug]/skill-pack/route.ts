import { generateSkillPack } from "@/lib/export/skill-pack";
import { resolveStyleDelivery } from "@/lib/style-delivery";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const delivery = await resolveStyleDelivery(slug);
  const style = delivery?.style;

  if (!style) {
    return NextResponse.json(
      { error: "Style not found" },
      { status: 404 }
    );
  }

  const tokens = delivery.capabilities.tokens;
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
