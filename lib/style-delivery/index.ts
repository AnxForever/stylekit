import { scoreStyle, type AccessibilityScore } from "@/lib/accessibility";
import {
  getStyleRecipes,
  type ComponentRecipe,
  type StyleRecipes,
} from "@/lib/recipes";
import {
  getFrontendReadiness,
  type DesignStyle,
  type FrontendReadinessProfile,
} from "@/lib/styles";
import {
  resolveStyleBySlug,
  type RuntimeStyleSource,
} from "@/lib/styles/community-runtime";
import type { StyleTokens } from "@/lib/styles/tokens";
import { getStyleVersion, type StyleVersionHistory } from "@/lib/versioning";

export interface StyleDeliveryCapabilities {
  tokens: StyleTokens | null;
  recipes: StyleRecipes | null;
  readiness: FrontendReadinessProfile;
  accessibility: AccessibilityScore | null;
  versioning: StyleVersionHistory | null;
  exports: {
    ideConfigs: boolean;
  };
}

export interface StyleDeliveryResult {
  source: RuntimeStyleSource;
  style: DesignStyle;
  submissionId?: string;
  capabilities: StyleDeliveryCapabilities;
}

/** Resolve one style with source-specific fallback rules hidden behind one interface. */
export async function resolveStyleDelivery(slug: string): Promise<StyleDeliveryResult | null> {
  const resolved = await resolveStyleBySlug(slug);
  if (!resolved) {
    return null;
  }

  const { source, style } = resolved;
  const isStatic = source === "static";

  return {
    source,
    style,
    ...(resolved.submissionId ? { submissionId: resolved.submissionId } : {}),
    capabilities: {
      tokens: resolved.tokens,
      recipes: isStatic
        ? getStyleRecipes(style.slug) ?? null
        : buildCommunityRecipes(style),
      readiness: getFrontendReadiness(style),
      accessibility: isStatic ? scoreStyle(style.slug) : null,
      versioning: isStatic ? getStyleVersion(style.slug) ?? null : null,
      exports: {
        ideConfigs: isStatic,
      },
    },
  };
}

function inferComponentElement(
  componentId: string,
): ComponentRecipe["skeleton"]["element"] {
  switch (componentId) {
    case "button":
      return "button";
    case "input":
      return "input";
    case "nav":
      return "nav";
    case "hero":
    case "footer":
      return "section";
    default:
      return "div";
  }
}

function buildCommunityRecipe(
  componentId: string,
  component: NonNullable<DesignStyle["components"][keyof DesignStyle["components"]]>,
): ComponentRecipe {
  const slots: ComponentRecipe["slots"] =
    componentId === "input"
      ? [
          {
            id: "placeholder",
            label: "Placeholder",
            labelZh: "占位符",
            required: false,
            type: "text",
          },
        ]
      : componentId === "button"
        ? [
            {
              id: "label",
              label: "Label",
              labelZh: "文字",
              required: true,
              default: "Click",
              type: "text",
            },
          ]
        : [
            {
              id: "children",
              label: "Content",
              labelZh: "内容",
              required: true,
              type: "children",
            },
          ];

  return {
    id: componentId,
    name: component.name,
    nameZh: component.name,
    description: component.description,
    skeleton: {
      element: inferComponentElement(componentId),
      baseClasses: [],
      structure: component.code,
    },
    parameters: [],
    variants: {
      default: {
        id: "default",
        label: "Default",
        labelZh: "默认",
        classes: [],
        description: "Community submitted base variant.",
      },
    },
    slots,
  };
}

function buildCommunityRecipes(style: DesignStyle): StyleRecipes | null {
  const recipes = Object.entries(style.components).reduce<StyleRecipes["recipes"]>(
    (acc, [componentId, component]) => {
      if (!component) {
        return acc;
      }

      const normalizedComponentId = componentId.toLowerCase();
      acc[normalizedComponentId] = buildCommunityRecipe(normalizedComponentId, component);
      return acc;
    },
    {},
  );

  if (Object.keys(recipes).length === 0) {
    return null;
  }

  return {
    styleSlug: style.slug,
    styleName: style.nameEn,
    recipes,
  };
}
