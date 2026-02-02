import { NextResponse } from "next/server";
import {
  getStackIds,
  getStack,
  getStacksByCategory,
  getCriticalGuidelines,
  searchStackGuidelines,
} from "@/lib/knowledge";
import type { StackId } from "@/lib/knowledge";

/**
 * GET /api/knowledge/stacks
 *
 * List all available tech stacks or get stack-specific guidelines.
 *
 * Query params:
 * - id: specific stack ID (optional)
 * - category: filter by category (optional, e.g. "frontend", "backend", "fullstack")
 * - q: search query for guidelines (optional, requires id)
 * - critical: if "true", only return critical guidelines (optional, requires id)
 * - limit: max results (default: 10)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stackId = searchParams.get("id") as StackId | null;
  const category = searchParams.get("category");
  const query = searchParams.get("q");
  const critical = searchParams.get("critical") === "true";
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  // List all stacks
  if (!stackId && !category) {
    const stackIds = getStackIds();
    const stacks = stackIds.map((id) => {
      const stack = getStack(id);
      return {
        id,
        name: stack?.name,
        category: stack?.category,
        description: stack?.description,
        guidelineCount: stack?.guidelines.length || 0,
      };
    });

    return NextResponse.json(
      {
        count: stacks.length,
        stacks,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      }
    );
  }

  // Filter by category
  if (category && !stackId) {
    const stacks = getStacksByCategory(category as "web" | "mobile" | "cross-platform");
    const result = stacks.map((stack) => ({
      id: stack.id,
      name: stack.name,
      category: stack.category,
      description: stack.description,
      guidelineCount: stack.guidelines.length,
    }));

    return NextResponse.json(
      {
        count: result.length,
        category,
        stacks: result,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      }
    );
  }

  // Get specific stack
  if (stackId) {
    const stack = getStack(stackId);

    if (!stack) {
      return NextResponse.json(
        { error: `Stack not found: ${stackId}` },
        { status: 404 }
      );
    }

    // Get critical guidelines only
    if (critical) {
      const guidelines = getCriticalGuidelines(stackId);
      return NextResponse.json(
        {
          stackId,
          name: stack.name,
          count: guidelines.length,
          guidelines,
        },
        {
          headers: {
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        }
      );
    }

    // Search within stack
    if (query) {
      const results = searchStackGuidelines(stackId, query, limit);
      return NextResponse.json(
        {
          stackId,
          name: stack.name,
          query,
          count: results.length,
          guidelines: results,
        },
        {
          headers: {
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        }
      );
    }

    // Return full stack info
    return NextResponse.json(
      {
        ...stack,
        guidelineCount: stack.guidelines.length,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      }
    );
  }

  return NextResponse.json(
    { error: "Invalid request parameters" },
    { status: 400 }
  );
}
