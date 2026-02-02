import { getAllStylesMeta } from "@/lib/styles/meta";
import { NextResponse } from "next/server";

export async function GET() {
  const styleMeta = getAllStylesMeta();

  return NextResponse.json({
    total: styleMeta.length,
    styles: styleMeta.map((style) => ({
      slug: style.slug,
      name: style.name,
      nameEn: style.nameEn,
      description: style.description,
      styleType: style.styleType,
      keywords: style.keywords,
      colors: style.colors,
      api: {
        full: `/api/styles/${style.slug}`,
        tokens: `/api/styles/${style.slug}/tokens`,
        recipes: `/api/styles/${style.slug}/recipes`,
        skillPack: `/api/styles/${style.slug}/skill-pack`,
      },
    })),
  });
}
