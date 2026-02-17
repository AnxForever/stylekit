import { NextResponse } from "next/server";
import { importTheme } from "@/lib/migration";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  try {
    const body = await request.json();
    const type = body?.type;
    const themeConfig = body?.themeConfig;

    if (!type || !themeConfig) {
      return NextResponse.json(
        { error: "Missing required fields: type, themeConfig" },
        { status: 400 }
      );
    }

    if (!["material-ui", "ant-design", "chakra-ui", "style-extractor"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Must be one of: material-ui, ant-design, chakra-ui, style-extractor" },
        { status: 400 }
      );
    }

    if (typeof themeConfig !== "string") {
      return NextResponse.json(
        { error: "themeConfig must be a JSON string." },
        { status: 400 }
      );
    }

    const result = importTheme({ type, themeConfig });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to process theme import request." },
      { status: 500 }
    );
  }
}
