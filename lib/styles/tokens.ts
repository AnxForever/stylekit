// Style Token System - Precise CSS class mappings for AI consistency
// Each style defines exact Tailwind classes to use, eliminating ambiguity

export interface StyleTokens {
  // Border tokens
  border: {
    width: string;        // e.g., "border-2 md:border-4"
    color: string;        // e.g., "border-black"
    radius: string;       // e.g., "rounded-none"
    style?: string;       // e.g., "border-solid"
  };

  // Shadow tokens
  shadow: {
    sm: string;           // Small shadow
    md: string;           // Medium shadow (default)
    lg: string;           // Large shadow
    none: string;         // No shadow
    hover: string;        // Hover state shadow
    focus: string;        // Focus state shadow
    colored?: Record<string, string>; // Colored shadows by accent
  };

  // Interaction tokens
  interaction: {
    hoverScale?: string;      // e.g., "hover:scale-105"
    hoverTranslate?: string;  // e.g., "hover:translate-x-1 hover:translate-y-1"
    hoverOpacity?: string;    // e.g., "hover:opacity-90"
    transition: string;       // e.g., "transition-all duration-200"
    active?: string;          // Active/pressed state
  };

  // Typography tokens
  typography: {
    heading: string;      // Heading font style
    body: string;         // Body text font style
    mono?: string;        // Monospace style
    sizes: {
      hero: string;       // e.g., "text-4xl md:text-6xl lg:text-8xl"
      h1: string;
      h2: string;
      h3: string;
      body: string;
      small: string;
    };
  };

  // Spacing tokens
  spacing: {
    section: string;      // Section padding, e.g., "py-12 md:py-24"
    container: string;    // Container padding, e.g., "px-4 md:px-8"
    card: string;         // Card padding, e.g., "p-4 md:p-6"
    gap: {
      sm: string;
      md: string;
      lg: string;
    };
  };

  // Color tokens (semantic)
  colors: {
    background: {
      primary: string;
      secondary: string;
      accent: string[];
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    button: {
      primary: string;
      secondary: string;
      danger?: string;
    };
  };

  // Forbidden classes - AI must NEVER use these
  forbidden: {
    classes: string[];    // Exact classes to avoid
    patterns: string[];   // Regex patterns to avoid
    reasons: Record<string, string>; // Why each is forbidden
  };

  // Required patterns - AI must ALWAYS include these
  required: {
    button: string[];     // Required classes for buttons
    card: string[];       // Required classes for cards
    input: string[];      // Required classes for inputs
  };
}

// Helper function to generate a complete component class string
export function buildComponentClass(
  tokens: StyleTokens,
  component: "button" | "card" | "input",
  variant?: string
): string {
  const base = tokens.required[component].join(" ");
  return base;
}

// Validation function - checks if a class string violates forbidden rules
export function validateClasses(
  tokens: StyleTokens,
  classString: string
): { valid: boolean; violations: string[] } {
  const violations: string[] = [];
  const classes = classString.split(/\s+/);

  for (const cls of classes) {
    // Check exact matches
    if (tokens.forbidden.classes.includes(cls)) {
      violations.push(`"${cls}" is forbidden: ${tokens.forbidden.reasons[cls] || "violates style rules"}`);
    }

    // Check patterns
    for (const pattern of tokens.forbidden.patterns) {
      if (new RegExp(pattern).test(cls)) {
        violations.push(`"${cls}" matches forbidden pattern "${pattern}"`);
      }
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}
