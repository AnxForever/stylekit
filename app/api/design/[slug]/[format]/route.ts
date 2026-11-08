import { NextResponse } from "next/server";
import {
  renderCssVariables,
  renderDesignMd,
  renderDtcg,
  renderTailwindTheme,
} from "@/lib/design-spec";
import { getDesignSpec } from "@/lib/design-spec/registry";
import type { SpecLocale } from "@/lib/design-spec/types";

/**
 * One spec, four outputs:
 *
 *   /api/design/editorial/design.md?locale=zh
 *   /api/design/editorial/theme.css
 *   /api/design/editorial/variables.css
 *   /api/design/editorial/tokens.json
 *
 * design.md is always the complete document. The other formats export related
 * tokens from the same spec. The legacy density query is ignored for URL
 * compatibility.
 */

const FORMATS = {
  "design.md": { contentType: "text/markdown; charset=utf-8", filename: "design.md" },
  "theme.css": { contentType: "text/css; charset=utf-8", filename: "theme.css" },
  "variables.css": { contentType: "text/css; charset=utf-8", filename: "variables.css" },
  "tokens.json": { contentType: "application/json; charset=utf-8", filename: "tokens.json" },
} as const;

type Format = keyof typeof FORMATS;

function isFormat(value: string): value is Format {
  return Object.prototype.hasOwnProperty.call(FORMATS, value);
}

const CACHE_CONTROL = "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string; format: string }> },
) {
  const { slug, format } = await context.params;

  if (!isFormat(format)) {
    return NextResponse.json(
      { error: `Unknown format "${format}". Use one of: ${Object.keys(FORMATS).join(", ")}` },
      { status: 404 },
    );
  }

  const spec = getDesignSpec(slug);
  if (!spec) {
    return NextResponse.json({ error: `No DESIGN.md spec for "${slug}"` }, { status: 404 });
  }

  const url = new URL(request.url);
  const localeParam = url.searchParams.get("locale");
  const locale: SpecLocale = localeParam === "zh" ? "zh" : "en";

  let body: string;
  switch (format) {
    case "design.md":
      body = renderDesignMd(spec, { locale });
      break;
    case "theme.css":
      body = renderTailwindTheme(spec);
      break;
    case "variables.css":
      body = renderCssVariables(spec);
      break;
    case "tokens.json":
      body = renderDtcg(spec);
      break;
  }

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": FORMATS[format].contentType,
      "Content-Disposition": `inline; filename="${FORMATS[format].filename}"`,
      "Cache-Control": CACHE_CONTROL,
      // The catalogue is public; letting agents read it cross-origin is the point.
      "Access-Control-Allow-Origin": "*",
    },
  });
}
