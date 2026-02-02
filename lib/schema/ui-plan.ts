// UI Plan Schema - Structured output format for AI code generation
// Forces AI to plan structure before generating code

/**
 * A complete UI generation plan
 * AI should output this JSON before generating any code
 */
export interface UIPlan {
  /** Plan metadata */
  meta: UIPlanMeta;

  /** Page sections to generate */
  sections: UIPlanSection[];

  /** Global page settings */
  globals: UIPlanGlobals;
}

/**
 * Plan metadata
 */
export interface UIPlanMeta {
  /** Visual style to apply */
  style: string;

  /** Layout archetype ID */
  archetype: string;

  /** Page category (landing, dashboard, blog, etc.) */
  pageType: string;

  /** Plan creation timestamp (ISO 8601) */
  timestamp: string;

  /** Optional plan description */
  description?: string;

  /** Target tech stack */
  techStack?: "nextjs" | "react" | "vue" | "vanilla";
}

/**
 * A section in the UI plan
 */
export interface UIPlanSection {
  /** Section identifier (matches archetype section ID) */
  id: string;

  /** Section archetype reference */
  archetype: string;

  /** Components to render in this section */
  components: UIPlanComponent[];

  /** Optional section-level style overrides */
  styleOverrides?: Record<string, string>;

  /** Optional custom classes */
  customClasses?: string;
}

/**
 * A component instance in the plan
 */
export interface UIPlanComponent {
  /** Component type (button, card, heading, etc.) */
  type: string;

  /** Recipe ID to use */
  recipe: string;

  /** Variant to apply */
  variant: string;

  /** Parameter values */
  params: Record<string, string | boolean | number>;

  /** Content slots */
  slots: Record<string, string>;

  /** Optional token overrides */
  tokenOverrides?: Record<string, string>;

  /** Optional array of child components */
  children?: UIPlanComponent[];

  /** Optional component ID for referencing */
  id?: string;
}

/**
 * Global page settings
 */
export interface UIPlanGlobals {
  /** Color scheme */
  colorScheme: "light" | "dark" | "auto";

  /** Maximum content width */
  maxWidth: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "7xl" | "full";

  /** Overall spacing density */
  spacing: "compact" | "normal" | "spacious";

  /** Primary language */
  locale?: "en" | "zh";

  /** Custom CSS variables */
  cssVariables?: Record<string, string>;
}

/**
 * Validation result for a UI plan
 */
export interface UIPlanValidation {
  valid: boolean;
  errors: UIPlanError[];
  warnings: UIPlanWarning[];
}

export interface UIPlanError {
  path: string;
  message: string;
  code: string;
}

export interface UIPlanWarning {
  path: string;
  message: string;
  suggestion?: string;
}

/**
 * Create an empty UI plan with defaults
 */
export function createEmptyPlan(
  style: string,
  archetype: string,
  pageType: string
): UIPlan {
  return {
    meta: {
      style,
      archetype,
      pageType,
      timestamp: new Date().toISOString(),
    },
    sections: [],
    globals: {
      colorScheme: "light",
      maxWidth: "7xl",
      spacing: "normal",
    },
  };
}

/**
 * Create a component instance with defaults
 */
export function createComponent(
  type: string,
  variant: string,
  slots: Record<string, string> = {}
): UIPlanComponent {
  return {
    type,
    recipe: type,
    variant,
    params: {},
    slots,
  };
}

/**
 * Generate prompt instructions for UI Plan output
 */
export function generatePlanPromptInstructions(): string {
  return `
## UI Plan Output Format

Before generating any code, you MUST first output a structured UI Plan in JSON format.

### Required Structure:
\`\`\`json
{
  "meta": {
    "style": "style-slug",
    "archetype": "archetype-id",
    "pageType": "landing|dashboard|blog|form|list",
    "timestamp": "ISO-8601",
    "techStack": "nextjs"
  },
  "sections": [
    {
      "id": "section-id",
      "archetype": "section-archetype",
      "components": [
        {
          "type": "component-type",
          "recipe": "recipe-id",
          "variant": "variant-id",
          "params": { "size": "lg", "fullWidth": true },
          "slots": { "label": "Click Me", "icon": "ArrowRight" }
        }
      ]
    }
  ],
  "globals": {
    "colorScheme": "light",
    "maxWidth": "7xl",
    "spacing": "normal"
  }
}
\`\`\`

### Rules:
1. Output the complete UI Plan JSON first
2. Then generate code that implements the plan exactly
3. Every component must reference a valid recipe and variant
4. All required slots must be filled
5. Follow the archetype structure for section ordering
`;
}
