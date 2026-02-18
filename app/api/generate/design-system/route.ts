import { NextResponse } from "next/server";
import { getDesignRecommendation } from "@/lib/knowledge";
import { getStyleBySlug, styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getStyleRecipes } from "@/lib/recipes";
import { mapStyleToSlug, isDarkStyle, resolveColorScheme } from "@/lib/styles/style-mapping";
import type { StackId } from "@/lib/knowledge";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import {
  hashGeneratorClientKey,
  recordGeneratorApiEvent,
} from "@/lib/generator/api-events";
import { z } from "zod";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 40;
const DESIGN_SYSTEM_SCHEMA = z.object({
  productType: z.string().trim().min(1, "productType is required.").max(120, "productType is too long."),
  stylePreference: z.string().trim().default("auto"),
  stackId: z.string().trim().min(1).optional(),
  colorScheme: z.enum(["light", "dark", "auto"]).default("auto"),
  includeComponents: z
    .array(z.string().trim().min(1))
    .min(1, "includeComponents must contain at least one component.")
    .max(20, "includeComponents exceeds maximum size.")
    .default(["button", "card", "input"]),
});

function errorResponse(status: number, code: string, message: string, headers?: HeadersInit) {
  return NextResponse.json(
    { code, error: message },
    headers ? { status, headers } : { status }
  );
}

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
  const startedAt = Date.now();
  const clientKey = getRequestClientKey(request);
  const clientHash = hashGeneratorClientKey(clientKey);

  const attachTelemetryHeaders = (
    status: number,
    code?: string,
    headers?: HeadersInit
  ): Headers => {
    const merged = new Headers(headers);
    merged.set("x-stylekit-duration-ms", String(Date.now() - startedAt));
    merged.set("x-stylekit-status", String(status));
    if (code) {
      merged.set("x-stylekit-error-code", code);
    }
    return merged;
  };

  const respondError = (
    status: number,
    code: string,
    message: string,
    headers?: HeadersInit
  ) => {
    recordGeneratorApiEvent({
      endpoint: "generate-design-system",
      outcome: "error",
      status,
      code,
      durationMs: Date.now() - startedAt,
      clientHash,
    });
    return errorResponse(
      status,
      code,
      message,
      attachTelemetryHeaders(status, code, headers)
    );
  };

  const respondSuccess = (payload: unknown, headers?: HeadersInit) => {
    const status = 200;
    recordGeneratorApiEvent({
      endpoint: "generate-design-system",
      outcome: "success",
      status,
      durationMs: Date.now() - startedAt,
      clientHash,
    });

    return NextResponse.json(payload, {
      headers: attachTelemetryHeaders(status, undefined, headers),
    });
  };

  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return respondError(
      originCheck.status ?? 403,
      "ORIGIN_NOT_ALLOWED",
      originCheck.error ?? "Cross-origin request denied."
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:generate-design-system",
    key: clientKey,
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return respondError(
      429,
      "RATE_LIMITED",
      "Too many design-system generation requests. Please try again later.",
      createRateLimitHeaders(rateLimit)
    );
  }

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return respondError(400, "INVALID_JSON", "Invalid JSON request body.");
    }

    const parsed = DESIGN_SYSTEM_SCHEMA.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return respondError(
        400,
        "INVALID_REQUEST",
        firstIssue?.message ?? "Invalid request body."
      );
    }

    const {
      productType,
      stylePreference = "auto",
      stackId,
      colorScheme = "auto",
      includeComponents = ["button", "card", "input"],
    } = parsed.data;

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
      return respondError(404, "STYLE_NOT_FOUND", `Style not found: ${selectedStyle}`);
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

    return respondSuccess(designSystem, {
      "Cache-Control": "public, max-age=300, s-maxage=300",
    });
  } catch (error) {
    return respondError(
      500,
      "GENERATION_FAILED",
      `Failed to generate design system: ${(error as Error).message}`
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
