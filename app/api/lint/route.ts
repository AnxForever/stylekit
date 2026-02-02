import { NextRequest, NextResponse } from "next/server";
import { lintCode, getFixSuggestions } from "@/lib/linter/style-linter";
import { getStyleLintRules, getStylesWithLintRules } from "@/lib/styles/lint-rules";

/**
 * POST /api/lint
 * Lint code against a specific design style
 *
 * Body: { code: string, style: string }
 * Returns: LintResult with issues and fix suggestions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, style } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'code' field" },
        { status: 400 }
      );
    }

    if (!style || typeof style !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'style' field" },
        { status: 400 }
      );
    }

    // Check if style has lint rules
    const availableStyles = getStylesWithLintRules();
    if (!availableStyles.includes(style)) {
      return NextResponse.json(
        {
          error: `No lint rules for style '${style}'`,
          availableStyles,
        },
        { status: 400 }
      );
    }

    const result = lintCode(code, style);
    const fixes = getFixSuggestions(result);

    return NextResponse.json({
      ...result,
      fixes,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

/**
 * GET /api/lint?style=<style>
 * Get lint rules for a specific style, or list all lintable styles
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const style = searchParams.get("style");

  // If no style specified, return list of lintable styles
  if (!style) {
    const styles = getStylesWithLintRules();
    return NextResponse.json({
      styles,
      count: styles.length,
    });
  }

  // Get rules for specific style
  const rules = getStyleLintRules(style);

  if (!rules) {
    return NextResponse.json(
      {
        error: `No lint rules for style '${style}'`,
        availableStyles: getStylesWithLintRules(),
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    style: rules.slug,
    name: rules.name,
    forbidden: {
      classes: rules.forbidden.classes,
      patterns: rules.forbidden.patterns.map((p) => p.source),
      reasons: rules.forbidden.reasons,
    },
    required: rules.required,
    recommended: rules.recommended,
    colors: rules.colors,
    typography: rules.typography,
  });
}
