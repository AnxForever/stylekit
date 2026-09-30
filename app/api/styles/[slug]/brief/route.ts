import { NextResponse } from "next/server";
import { resolveStyleDelivery } from "@/lib/style-delivery";
import { createImplementationBrief } from "@/lib/implementation-brief";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const delivery = await resolveStyleDelivery(slug);
  if (!delivery) return NextResponse.json({ error: "Style not found" }, { status: 404 });
  const brief = createImplementationBrief(delivery.style, delivery.capabilities, delivery.source);
  return NextResponse.json(brief);
}
