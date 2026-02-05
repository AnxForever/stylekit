/**
 * Style Injector - Converts StyleKit style to CSS variables
 */

import type { DesignStyle } from "@/lib/styles";
import type { CustomStyleDefinition, GeneratorStyle } from "./types";

/**
 * Generate CSS variables from a built-in style
 */
export function generateCssVariablesFromStyle(style: DesignStyle): string {
  const { colors } = style;

  return `
:root {
  /* Colors */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent-1: ${colors.accent[0] || colors.primary};
  --color-accent-2: ${colors.accent[1] || colors.secondary};
  --color-accent-3: ${colors.accent[2] || colors.primary};
  --color-background: ${colors.secondary};
  --color-foreground: ${colors.primary};
  --color-muted: #6b7280;

  /* Typography */
  --font-heading: system-ui, -apple-system, sans-serif;
  --font-body: system-ui, -apple-system, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;

  /* Spacing */
  --spacing-unit: 0.25rem;
  --container-max-width: 1200px;

  /* Borders */
  --border-radius: 0.5rem;
  --border-width: 1px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
`.trim();
}

/**
 * Generate CSS variables from a custom style
 */
export function generateCssVariablesFromCustomStyle(style: CustomStyleDefinition): string {
  const { colors, typography, spacing, borders, shadows } = style;

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
 * Generate CSS variables from either built-in or custom style
 */
export function generateCssVariables(generatorStyle: GeneratorStyle): string {
  if (generatorStyle.type === "builtin") {
    return generateCssVariablesFromStyle(generatorStyle.style);
  } else {
    return generateCssVariablesFromCustomStyle(generatorStyle.style.definition);
  }
}

/**
 * Generate base CSS reset and utilities
 */
export function generateBaseCss(): string {
  return `
/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  color: var(--color-foreground);
  background-color: var(--color-background);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
}

h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
}

button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
}

/* Utilities */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 1rem;
}

.text-center { text-align: center; }
.text-muted { color: var(--color-muted); }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-background);
  border: var(--border-width) solid var(--color-primary);
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary);
  border: var(--border-width) solid var(--color-primary);
}

.btn-outline:hover {
  background-color: var(--color-primary);
  color: var(--color-background);
}

.card {
  background-color: var(--color-background);
  border: var(--border-width) solid var(--color-muted);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

/* Section spacing */
section {
  padding: 4rem 0;
}

@media (min-width: 768px) {
  section {
    padding: 6rem 0;
  }
}
`.trim();
}

/**
 * Get style-specific CSS overrides based on style characteristics
 */
export function getStyleSpecificCss(style: DesignStyle): string {
  const slug = style.slug;

  // Neo-brutalist specific
  if (slug === "neo-brutalist") {
    return `
/* Neo-Brutalist overrides */
:root {
  --border-radius: 0;
  --border-width: 3px;
  --shadow-md: 4px 4px 0 var(--color-foreground);
}

.btn {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
}

.card {
  box-shadow: 4px 4px 0 var(--color-foreground);
}
`;
  }

  // Glassmorphism specific
  if (slug === "glassmorphism") {
    return `
/* Glassmorphism overrides */
.card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
`;
  }

  // Neumorphism specific
  if (slug === "neumorphism") {
    return `
/* Neumorphism overrides */
:root {
  --color-background: #e0e5ec;
}

.card {
  background: var(--color-background);
  border: none;
  box-shadow: 8px 8px 16px #b8c0c8, -8px -8px 16px #ffffff;
  border-radius: 1rem;
}

.btn {
  box-shadow: 4px 4px 8px #b8c0c8, -4px -4px 8px #ffffff;
}

.btn:hover {
  box-shadow: inset 4px 4px 8px #b8c0c8, inset -4px -4px 8px #ffffff;
}
`;
  }

  // Editorial specific
  if (slug === "editorial") {
    return `
/* Editorial overrides */
:root {
  --font-heading: Georgia, 'Times New Roman', serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h1, h2, h3, h4 {
  font-weight: 400;
  letter-spacing: -0.02em;
}
`;
  }

  return "";
}
