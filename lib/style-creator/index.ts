/**
 * Style Creator - Main Entry Point
 */

export * from "./types";
export * from "./storage";

import type { CustomStyleDefinition } from "./types";

/**
 * Generate CSS variables from custom style definition
 */
export function generateCssFromCustomStyle(definition: CustomStyleDefinition): string {
  const { colors, typography, spacing, borders, shadows } = definition;

  return `
:root {
  /* Colors */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent-1: ${colors.accent[0] || colors.primary};
  --color-accent-2: ${colors.accent[1] || colors.secondary};
  --color-accent-3: ${colors.accent[2] || colors.primary};
  --color-background: ${colors.background};
  --color-foreground: ${colors.foreground};
  --color-muted: ${colors.muted};

  /* Typography */
  --font-heading: ${typography.headingFont};
  --font-body: ${typography.bodyFont};
  --font-size-xs: ${typography.fontSize.xs};
  --font-size-sm: ${typography.fontSize.sm};
  --font-size-base: ${typography.fontSize.base};
  --font-size-lg: ${typography.fontSize.lg};
  --font-size-xl: ${typography.fontSize.xl};
  --font-size-2xl: ${typography.fontSize["2xl"]};
  --font-size-3xl: ${typography.fontSize["3xl"]};
  --font-size-4xl: ${typography.fontSize["4xl"]};

  /* Spacing */
  --spacing-unit: ${spacing.unit}px;
  --container-max-width: ${spacing.containerMaxWidth};

  /* Borders */
  --border-radius: ${borders.radius};
  --border-width: ${borders.width};

  /* Shadows */
  --shadow-sm: ${shadows.sm};
  --shadow-md: ${shadows.md};
  --shadow-lg: ${shadows.lg};
}
`.trim();
}

/**
 * Generate Tailwind config from custom style
 */
export function generateTailwindConfig(definition: CustomStyleDefinition): string {
  const { colors } = definition;

  return `
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${colors.primary}',
        secondary: '${colors.secondary}',
        accent: {
          1: '${colors.accent[0] || colors.primary}',
          2: '${colors.accent[1] || colors.secondary}',
          3: '${colors.accent[2] || colors.primary}',
        },
        background: '${colors.background}',
        foreground: '${colors.foreground}',
        muted: '${colors.muted}',
      },
    },
  },
}
`.trim();
}
