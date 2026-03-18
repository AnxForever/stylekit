import { listCatalogStylesMeta } from "@/lib/styles/community-runtime";
import { NextResponse } from "next/server";

export async function GET() {
  const styleMeta = await listCatalogStylesMeta();

  return NextResponse.json({
    total: styleMeta.length,
    styles: styleMeta,
  });
}
