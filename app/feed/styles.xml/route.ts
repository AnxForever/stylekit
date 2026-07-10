import { NextResponse } from "next/server";
import { stylesMeta } from "@/lib/styles/meta";
import { generateRss } from "@/lib/rss";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();

export async function GET() {
  const xml = generateRss({
    title: "StyleKit - New Styles",
    description:
      "New visual styles added to StyleKit design system",
    link: `${BASE_URL}/en/styles`,
    selfUrl: `${BASE_URL}/feed/styles.xml`,
    language: "en-us",
    items: stylesMeta.map((style) => ({
      title: style.nameEn,
      description: `Explore the ${style.nameEn} visual style, including its design constraints, component recipes, tokens, and implementation guidance.`,
      link: `${BASE_URL}/en/styles/${style.slug}`,
      guid: `${BASE_URL}/en/styles/${style.slug}`,
    })),
  });

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
