import { NextRequest, NextResponse } from "next/server";
import {
  generateStyleFromDescription,
  getAvailableStyleSlugs,
  getMoodKeywords,
} from "@/lib/ai-generator";

/**
 * POST /api/generate-style
 * Generate a custom style from natural language description
 *
 * Body: { description: string, baseStyle?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, baseStyle } = body;

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'description' field" },
        { status: 400 }
      );
    }

    if (description.length > 500) {
      return NextResponse.json(
        { error: "Description must be 500 characters or less" },
        { status: 400 }
      );
    }

    if (baseStyle && typeof baseStyle !== "string") {
      return NextResponse.json(
        { error: "Invalid 'baseStyle' field" },
        { status: 400 }
      );
    }

    const result = generateStyleFromDescription({ description, baseStyle });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate style" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/generate-style
 * Get available base styles and mood keywords
 */
export async function GET() {
  return NextResponse.json({
    availableStyles: getAvailableStyleSlugs(),
    moodKeywords: getMoodKeywords(),
  });
}
