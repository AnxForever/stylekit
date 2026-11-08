import type { DesignSpec } from "../types";

/** One CSS custom property, ready to print or to group. */
export interface Variable {
  name: string;
  value: string;
}

export interface VariableGroup {
  title: string;
  items: Variable[];
}

/** Lowercase, hyphenated, safe for a CSS custom property name. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Strip a leading `--` so a token name can be re-prefixed by the caller. */
export function bareName(token: string): string {
  return token.startsWith("--") ? token.slice(2) : token;
}

/**
 * Every variable the spec produces, grouped the way a reader expects to find
 * them. `renderCssVariables` prints all of it; `renderTailwindTheme` takes a
 * subset, because `@theme` only owns values Tailwind generates utilities from.
 */
export function collectVariables(spec: DesignSpec): VariableGroup[] {
  const groups: VariableGroup[] = [];

  groups.push({
    title: "Colors",
    items: spec.colors.map((color) => ({
      name: color.token.startsWith("--") ? color.token : `--${color.token}`,
      value: color.value,
    })),
  });

  groups.push({
    title: "Typography — Font Families",
    items: spec.fonts.map((font) => ({ name: font.token, value: fontFamilyValue(font) })),
  });

  groups.push({
    title: "Typography — Scale",
    items: spec.typeScale.flatMap((step) => {
      const items: Variable[] = [{ name: step.token, value: `${step.size}px` }];
      items.push({
        name: `--leading-${step.role}`,
        value: String(step.lineHeight),
      });
      if (step.tracking) {
        items.push({ name: `--tracking-${step.role}`, value: step.tracking });
      }
      return items;
    }),
  });

  const weights = Array.from(
    new Set(spec.fonts.flatMap((font) => font.weights)),
  ).sort((a, b) => a - b);
  if (weights.length > 0) {
    groups.push({
      title: "Typography — Weights",
      items: weights.map((weight) => ({
        name: `--font-weight-${weightName(weight)}`,
        value: String(weight),
      })),
    });
  }

  groups.push({
    title: "Spacing",
    items: [
      { name: "--spacing-unit", value: `${spec.spacing.base}px` },
      ...spec.spacing.scale.map((step) => ({
        name: `--spacing-${step}`,
        value: `${step}px`,
      })),
    ],
  });

  groups.push({
    title: "Layout",
    items: [
      { name: "--page-max-width", value: `${spec.spacing.maxWidth}px` },
      { name: "--section-gap", value: `${spec.spacing.sectionGap}px` },
      { name: "--card-padding", value: `${spec.spacing.cardPadding}px` },
      { name: "--element-gap", value: `${spec.spacing.elementGap}px` },
      { name: "--density", value: spec.spacing.density },
    ],
  });

  if (spec.radii.length > 0) {
    groups.push({
      title: "Border Radius",
      items: spec.radii.map((radius) => ({
        name: `--radius-${slugify(radius.element)}`,
        value: radius.value,
      })),
    });
  }

  if (spec.surfaces.length > 0) {
    groups.push({
      title: "Surfaces",
      items: spec.surfaces.map((surface) => ({
        name: `--surface-${slugify(surface.name)}`,
        value: surface.value,
      })),
    });
  }

  return groups;
}

export function fontFamilyValue(font: { family: string }): string {
  const fallback = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
  return `'${font.family}', ${fallback}`;
}

function weightName(weight: number): string {
  const names: Record<number, string> = {
    100: "thin",
    200: "extralight",
    300: "light",
    400: "regular",
    500: "medium",
    600: "semibold",
    700: "bold",
    800: "extrabold",
    900: "black",
  };
  return names[weight] ?? String(weight);
}

/** `key: value;` lines indented two spaces, for a `:root` or `@theme` body. */
export function printVariableGroups(groups: VariableGroup[], titleSeparator = true): string {
  const blocks = groups
    .filter((group) => group.items.length > 0)
    .map((group) => {
      const body = group.items
        .map((item) => `  ${item.name}: ${item.value};`)
        .join("\n");
      return titleSeparator ? `  /* ${group.title} */\n${body}` : body;
    });

  return blocks.join("\n\n");
}
