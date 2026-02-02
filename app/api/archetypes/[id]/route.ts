import { getArchetype } from "@/lib/archetypes";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const archetype = getArchetype(id);

  if (!archetype) {
    return NextResponse.json(
      { error: "Archetype not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(archetype);
}
