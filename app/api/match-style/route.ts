import { NextRequest, NextResponse } from "next/server";
import { importExtractorTheme } from "@/lib/migration/extractor-importer";
import { findClosestStyles } from "@/lib/styles/style-diff";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

/**
 * POST /api/match-style
 *
 * Accept style-extractor JSON output and find the closest matching
 * StyleKit styles based on token similarity.
 *
 * Body: { tokens: string (JSON from style-extractor) }
 * Returns: { matches: StyleDiffResult[], importResult: MigrationResult }
 */
export async function POST(request: NextRequest) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  try {
    const body = await request.json();
    const { tokens } = body;

    if (!tokens || typeof tokens !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'tokens' field. Provide style-extractor JSON output as a string." },
        { status: 400 }
      );
    }

    // Import extracted tokens into StyleTokens format
    const importResult = importExtractorTheme(tokens);

    if (!importResult.success) {
      return NextResponse.json(
        { error: "Failed to parse extracted tokens", warnings: importResult.warnings },
        { status: 400 }
      );
    }

    // Find closest styles
    const matches = findClosestStyles(importResult.tokens, 5);

    return NextResponse.json({
      matches,
      importResult: {
        coverage: importResult.coverage,
        warnings: importResult.warnings,
        unmapped: importResult.unmapped,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process match request." },
      { status: 500 }
    );
  }
}
