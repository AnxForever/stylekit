import { NextResponse } from "next/server";
import { importTheme } from "@/lib/migration";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "import-theme",
    key: getRequestClientKey(request),
    limit: 10,
    windowMs: 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
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
