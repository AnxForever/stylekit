import { getAllArchetypes } from "@/lib/archetypes";
import { NextResponse } from "next/server";

export async function GET() {
  const archetypes = getAllArchetypes();

  return NextResponse.json({
    total: archetypes.length,
    archetypes: archetypes.map((archetype) => ({
      id: archetype.id,
      name: archetype.name,
      nameZh: archetype.nameZh,
      description: archetype.description,
      category: archetype.category,
      recommendedStyles: archetype.recommendedStyles,
      sections: archetype.sections.map((s) => ({
        id: s.id,
        name: s.name,
        layoutType: s.layout.type,
      })),
      api: `/api/archetypes/${archetype.id}`,
    })),
  });
}
