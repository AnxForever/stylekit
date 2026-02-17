import { NextRequest, NextResponse } from "next/server";
import { analyzeProjectStyle } from "@/lib/analyzer";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

/**
 * POST /api/analyze-style
 *
 * Analyze component code to infer which StyleKit design style best matches.
 *
 * Body: { code: string, packageJson?: string, tailwindConfig?: string }
 * Returns: AnalysisResult
 */
export async function POST(request: NextRequest) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error },
      { status: originCheck.status ?? 403 },
    );
  }

  try {
    const body = await request.json();
    const { code, packageJson, tailwindConfig } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'code' field" },
        { status: 400 },
      );
    }

    const result = analyzeProjectStyle({
      code,
      packageJson: typeof packageJson === "string" ? packageJson : undefined,
      tailwindConfig:
        typeof tailwindConfig === "string" ? tailwindConfig : undefined,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
