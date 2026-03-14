import { trackStyleUsage } from "@/lib/analytics";
import { getStyleRecipes, type ComponentRecipe, type StyleRecipes } from "@/lib/recipes";
import type { ComponentTemplate, DesignStyle } from "@/lib/styles";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { after, NextResponse } from "next/server";

function trackStyleUsageNonBlocking(slug: string): void {
  try {
    after(() => {
      trackStyleUsage(slug, "api");
    });
  } catch {
    trackStyleUsage(slug, "api");
  }
}

function inferComponentElement(componentId: string): ComponentRecipe["skeleton"]["element"] {
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
  component: ComponentTemplate
): ComponentRecipe {
  const slots: ComponentRecipe["slots"] = componentId === "input"
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

function buildCommunityRecipes(style: DesignStyle): StyleRecipes {
  const recipes = Object.entries(style.components).reduce<StyleRecipes["recipes"]>(
    (acc, [componentId, component]) => {
      if (!component) {
        return acc;
      }

      const normalizedComponentId = componentId.toLowerCase();
      acc[normalizedComponentId] = buildCommunityRecipe(
        normalizedComponentId,
        component
      );
      return acc;
    },
    {}
  );

  return {
    styleSlug: style.slug,
    styleName: style.nameEn,
    recipes,
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  trackStyleUsageNonBlocking(slug);

  const resolved = await resolveStyleBySlug(slug);
  const style = resolved?.style;
  if (!style) {
    return NextResponse.json(
      { error: "Recipes not found for this style" },
      { status: 404 }
    );
  }

  const recipes = resolved.source === "static"
    ? getStyleRecipes(style.slug)
    : buildCommunityRecipes(style);

  if (!recipes || Object.keys(recipes.recipes).length === 0) {
    return NextResponse.json(
      { error: "Recipes not found for this style" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    styleSlug: recipes.styleSlug,
    recipes: recipes.recipes,
  });
}
