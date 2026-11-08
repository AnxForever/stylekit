import { NextResponse } from "next/server";
import { resolveStyleDelivery } from "@/lib/style-delivery";
import { createImplementationBrief } from "@/lib/implementation-brief";
import { getStyleDesignDocument } from "@/lib/ai-access/design-document";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const delivery = await resolveStyleDelivery(slug);
  if (!delivery) return NextResponse.json({ error: "Style not found" }, { status: 404 });
  const brief = createImplementationBrief(delivery.style, delivery.capabilities, delivery.source);
  const locale = new URL(request.url).searchParams.get("locale") === "zh" ? "zh" : "en";
  const designDocument = delivery.source === "community"
    ? null
    : getStyleDesignDocument(slug, locale);

  // Keep the optional document first so clients reading brief JSON text see
  // its canonical URL and complete Markdown before the longer legacy rules.
  // MCP structuredContent still carries the entire brief when text truncates.
  return NextResponse.json({
    ...(designDocument ? { designDocument } : {}),
    ...brief,
  });
}
