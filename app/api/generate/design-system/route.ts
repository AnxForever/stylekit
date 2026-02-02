import { NextResponse } from "next/server";
import { getDesignRecommendation } from "@/lib/knowledge";
import { getStyleBySlug, styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getStyleRecipes } from "@/lib/recipes";
import { mapStyleToSlug, isDarkStyle, resolveColorScheme } from "@/lib/styles/style-mapping";
import type { StackId } from "@/lib/knowledge";

/**
 * POST /api/generate/design-system
 *
 * AI Design System Generator - Generate a complete design system
 * based on product type, style preference, and tech stack.
 *
 * Request body:
 * {
 *   "productType": "SaaS dashboard" | "e-commerce" | "blog" | etc.
 *   "stylePreference": "neo-brutalist" | "corporate-clean" | "auto" (optional)
 *   "stackId": "nextjs" | "react-vite" | etc. (optional)
 *   "colorScheme": "light" | "dark" | "auto" (optional)
 *   "includeComponents": ["button", "card", "input", "nav"] (optional)
 * }
 *
 * Returns a complete design system package.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      productType,
      stylePreference = "auto",
      stackId,
      colorScheme = "auto",
      includeComponents = ["button", "card", "input"],
    } = body;

    if (!productType) {
      return NextResponse.json(
        { error: "Missing required field: productType" },
        { status: 400 }
      );
    }

    // 1. Get design recommendation from knowledge base
    const recommendation = getDesignRecommendation(productType, {
      stackId: stackId as StackId | undefined,
      maxGuidelines: 10,
    });

    // 2. Determine style
    let selectedStyle: string;

    if (stylePreference === "auto") {
      // Auto-select based on recommendation and color scheme
      const stylePriority = recommendation.style.primary;
      selectedStyle = mapStyleToSlug(stylePriority, colorScheme);
    } else {
      selectedStyle = stylePreference;
    }

    // Handle dark mode preference
    if (colorScheme === "dark" && !isDarkStyle(selectedStyle)) {
      // Check if we should use dark-mode style instead
      if (selectedStyle === "corporate-clean" || selectedStyle === "soft-ui") {
        selectedStyle = "dark-mode";
      }
    }

    // 3. Get style details
    const style = getStyleBySlug(selectedStyle);
    if (!style) {
      return NextResponse.json(
        { error: `Style not found: ${selectedStyle}` },
        { status: 404 }
      );
    }

    // 4. Get tokens and recipes
    const tokens = getStyleTokens(selectedStyle);
    const recipes = getStyleRecipes(selectedStyle);

    // 5. Build design system package
    const designSystem = {
      meta: {
        generatedFor: productType,
        generatedAt: new Date().toISOString(),
        styleSlug: selectedStyle,
        styleName: style.nameEn,
        colorScheme: resolveColorScheme(colorScheme, selectedStyle),
      },

      // Style overview
      style: {
        name: style.nameEn,
        description: style.description,
        philosophy: style.philosophy,
        doList: style.doList,
        dontList: style.dontList,
        aiRules: style.aiRules,
      },

      // Design tokens
      tokens: tokens || {
        note: "Custom tokens - refer to style.aiRules for guidance",
      },

      // Color palette
      colors: {
        primary: style.colors.primary,
        secondary: style.colors.secondary,
        accent: style.colors.accent,
        recommendation: recommendation.colors,
      },

      // Typography
      typography: {
        styleTypography: tokens?.typography || null,
        recommendation: recommendation.typography,
      },

      // Components
      components: filterComponents(style.components, includeComponents),

      // Recipes (if available)
      recipes: recipes
        ? {
            styleSlug: recipes.styleSlug,
            available: Object.keys(recipes.recipes),
          }
        : null,

      // Layout recommendation
      layout: {
        landingPattern: recommendation.landingPattern,
      },

      // UX Guidelines
      guidelines: {
        ux: recommendation.uxGuidelines,
        stack: recommendation.stackGuidelines,
      },

      // Icons recommendation
      icons: recommendation.icons,

      // Charts recommendation (if applicable)
      charts: recommendation.charts,

      // Quick start code
      quickStart: generateQuickStart(style, tokens, includeComponents),
    };

    return NextResponse.json(designSystem, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to generate design system: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

// Helper: Filter components
function filterComponents(
  components: Record<string, unknown>,
  include: string[]
): Record<string, unknown> {
  const filtered: Record<string, unknown> = {};
  for (const key of include) {
    if (components[key]) {
      filtered[key] = components[key];
    }
  }
  return filtered;
}

// Helper: Generate quick start code
function generateQuickStart(
  style: NonNullable<ReturnType<typeof getStyleBySlug>>,
  tokens: ReturnType<typeof getStyleTokens>,
  components: string[]
): string {
  const parts: string[] = [];

  parts.push(`// ${style.nameEn} Quick Start`);
  parts.push(`// Generated by StyleKit AI Design System Generator\n`);

  // Add global CSS
  if (style.globalCss) {
    parts.push(`/* Global Styles */`);
    parts.push(style.globalCss);
    parts.push("");
  }

  // Add component examples
  for (const comp of components) {
    const component = style.components[comp as keyof typeof style.components];
    if (component && "code" in component) {
      parts.push(`// ${component.name}`);
      parts.push(component.code);
      parts.push("");
    }
  }

  return parts.join("\n");
}

/**
 * GET /api/generate/design-system
 *
 * Returns available options for the generator.
 */
export async function GET() {
  return NextResponse.json({
    description: "AI Design System Generator",
    usage: "POST with productType to generate a complete design system",
    options: {
      productTypes: [
        "SaaS dashboard",
        "e-commerce store",
        "personal blog",
        "portfolio",
        "landing page",
        "mobile app",
        "admin panel",
        "social platform",
        "news/media site",
        "documentation site",
      ],
      styles: styles.map((s) => ({
        slug: s.slug,
        name: s.nameEn,
        type: s.styleType,
      })),
      colorSchemes: ["light", "dark", "auto"],
      components: [
        "button",
        "card",
        "input",
        "nav",
        "hero",
        "footer",
      ],
    },
    example: {
      productType: "SaaS dashboard",
      stylePreference: "auto",
      colorScheme: "light",
      includeComponents: ["button", "card", "input"],
    },
  });
}
