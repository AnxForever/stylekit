import { NextResponse } from "next/server";
import { stylesMeta } from "@/lib/styles/meta";
import { generateRss } from "@/lib/rss";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";

export async function GET() {
  const xml = generateRss({
    title: "StyleKit - New Styles",
    description:
      "New visual styles added to StyleKit design system",
    link: `${BASE_URL}/styles`,
    items: stylesMeta.map((style) => ({
      title: style.nameEn,
      description: style.description,
      link: `${BASE_URL}/styles/${style.slug}`,
      pubDate: new Date().toISOString(),
      guid: `${BASE_URL}/styles/${style.slug}`,
    })),
  });

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
