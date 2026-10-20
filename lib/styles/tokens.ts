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
    subtitle?: string;    // Subtitle style (optional)
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
    // Custom style-specific typography effects (inline styles)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    neonStroke?: Record<string, any>;
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
    /** Narrow, auditable allowances for a forbidden utility in a specific state or element role. */
    exceptions?: StyleLintException[];
  };

  // Required patterns - AI must ALWAYS include these
  required: {
    button: string[];     // Required classes for buttons
    card: string[];       // Required classes for cards
    input: string[];      // Required classes for inputs
  };
}

/**
 * A constrained exception to a forbidden utility. The forbidden utility is
 * matched without its variant prefix; element scope evidence only counts plain
 * utilities without variants or important modifiers. Every declared scope
 * condition must also match.
 * `maxDimension` is measured in Tailwind spacing units (1 = 0.25rem).
 */
export interface StyleLintException {
  className: string;
  reason: string;
  variants?: {
    all?: string[];
    none?: string[];
  };
  element?: {
    tags?: string[];
    classesAll?: string[];
    classPrefixesAll?: string[];
    squareDimensions?: true;
    maxDimension?: number;
  };
}

export interface StyleLintElementContext {
  tagName?: string;
  classes: string[];
  complete: boolean;
}

export type StyleLintExceptionMatch = "match" | "miss" | "unknown";

function styleLintBaseClass(className: string): string {
  let depth = 0;
  let lastColon = -1;
  for (let i = 0; i < className.length; i += 1) {
    const ch = className[i];
    if (ch === "[" || ch === "(") depth += 1;
    else if (ch === "]" || ch === ")") depth -= 1;
    else if (ch === ":" && depth === 0) lastColon = i;
  }
  return (lastColon === -1 ? className : className.slice(lastColon + 1)).replace(/^!|!$/g, "");
}

function styleLintVariantStack(className: string): string[] {
  const variants: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < className.length; i += 1) {
    const ch = className[i];
    if (ch === "[" || ch === "(") depth += 1;
    else if (ch === "]" || ch === ")") depth -= 1;
    else if (ch === ":" && depth === 0) {
      variants.push(className.slice(start, i));
      start = i + 1;
    }
  }
  return variants;
}

/** Shared evaluator for the class-only helper and source-code linter. */
export function matchStyleLintException(
  exception: StyleLintException,
  rawClassName: string,
  element: StyleLintElementContext | undefined,
): StyleLintExceptionMatch {
  if (styleLintBaseClass(rawClassName) !== exception.className) return "miss";

  if ((exception.variants?.all !== undefined && exception.variants.all.length === 0) ||
      (exception.variants?.none !== undefined && exception.variants.none.length === 0) ||
      (exception.element?.tags !== undefined && exception.element.tags.length === 0) ||
      (exception.element?.classesAll !== undefined && exception.element.classesAll.length === 0) ||
      (exception.element?.classPrefixesAll !== undefined && exception.element.classPrefixesAll.length === 0)) return "unknown";

  const hasVariantScope = Boolean(exception.variants?.all?.length || exception.variants?.none?.length);
  const hasElementScope = Boolean(
    exception.element?.tags?.length ||
    exception.element?.classesAll?.length ||
    exception.element?.classPrefixesAll?.length ||
    exception.element?.squareDimensions ||
    exception.element?.maxDimension !== undefined,
  );
  if (!hasVariantScope && !hasElementScope) return "unknown";

  const variants = styleLintVariantStack(rawClassName);
  if (exception.variants?.all?.some((variant) => !variants.includes(variant))) return "miss";
  if (exception.variants?.none?.some((variant) => variants.includes(variant))) return "miss";
  if (!exception.element) return "match";

  const scope = exception.element;
  if (!element || !element.complete) return "unknown";
  if (scope.tags?.length) {
    if (!element.tagName) return "unknown";
    if (!scope.tags.includes(element.tagName.toLowerCase())) return "miss";
  }

  const classes = element.classes.filter((className) => styleLintBaseClass(className) === className);
  if (scope.classesAll?.some((className) => !classes.includes(className))) return "miss";
  if (scope.classPrefixesAll?.some((prefix) => !classes.some((className) => className.startsWith(prefix)))) return "miss";

  if (scope.squareDimensions || scope.maxDimension !== undefined) {
    const dimensions = getSquareElementDimensions(element.classes);
    if (dimensions.status === "unknown") return "unknown";
    if (dimensions.status === "not-square") return "miss";
    if (scope.maxDimension !== undefined) {
      if (dimensions.value === undefined) return "unknown";
      if (dimensions.value > scope.maxDimension) return "miss";
    }
  }

  return "match";
}

function getSquareElementDimensions(
  rawClasses: string[],
): { status: "square"; value?: number } | { status: "not-square" } | { status: "unknown" } {
  const classes = rawClasses.map(styleLintBaseClass);
  const hasVariantDimension = rawClasses.some((raw) =>
    styleLintVariantStack(raw).length > 0 && /^(?:w|h|size|aspect)-/.test(styleLintBaseClass(raw)),
  );
  if (hasVariantDimension) return { status: "unknown" };

  const widths = getUniqueDimension(classes, "w");
  const heights = getUniqueDimension(classes, "h");
  const sizes = getUniqueDimension(classes, "size");
  if (widths.status === "conflict" || heights.status === "conflict" || sizes.status === "conflict") {
    return { status: "unknown" };
  }

  if ((widths.value !== undefined && sizes.value !== undefined && widths.value !== sizes.value) ||
      (heights.value !== undefined && sizes.value !== undefined && heights.value !== sizes.value)) {
    return { status: "unknown" };
  }

  const width = widths.value ?? sizes.value;
  const height = heights.value ?? sizes.value;
  const aspectSquare = classes.includes("aspect-square");
  if (width !== undefined && height !== undefined) {
    return width === height
      ? { status: "square", value: width }
      : { status: "not-square" };
  }
  if (aspectSquare) {
    const knownDimension = width ?? height;
    return knownDimension === undefined
      ? { status: "square" }
      : { status: "square", value: knownDimension };
  }
  return { status: "unknown" };
}

function getUniqueDimension(
  classes: string[],
  axis: "w" | "h" | "size",
): { status: "ok"; value?: number } | { status: "conflict" } {
  const values = classes
    .filter((className) => className.startsWith(`${axis}-`))
    .map((className) => parseTailwindDimension(className.slice(axis.length + 1)));
  if (values.some((value) => value === undefined)) return { status: "conflict" };
  const unique = [...new Set(values as number[])];
  if (unique.length > 1) return { status: "conflict" };
  return { status: "ok", value: unique[0] };
}

function parseTailwindDimension(value: string): number | undefined {
  if (/^\d+(?:\.\d+)?$/.test(value)) return Number(value);
  const arbitrary = value.match(/^\[(\d+(?:\.\d+)?)(px|rem)\]$/);
  if (!arbitrary) return undefined;
  const amount = Number(arbitrary[1]);
  return arbitrary[2] === "px" ? amount / 4 : amount * 4;
}

// Helper function to generate a complete component class string
export function buildComponentClass(
  tokens: StyleTokens,
  component: "button" | "card" | "input",
  variant?: string
): string {
  void variant;
  const base = tokens.required[component].join(" ");
  return base;
}

export interface StyleClassValidationContext {
  /** Required only when a scoped exception restricts the element tag. */
  elementTag?: string;
}

export interface StyleClassValidationResult {
  valid: boolean;
  status: "pass" | "fail" | "inconclusive";
  violations: string[];
  warnings: string[];
}

// Context-free token-list validation. Use the source linter for JSX when the
// exception depends on an element whose tag or complete class list is unknown.
export function validateClasses(
  tokens: StyleTokens,
  classString: string,
  context: StyleClassValidationContext = {},
): StyleClassValidationResult {
  const violations: string[] = [];
  const warnings: string[] = [];
  let uncertainScope = false;
  const classes = classString.split(/\s+/).filter(Boolean);
  const element: StyleLintElementContext = {
    tagName: context.elementTag?.toLowerCase(),
    classes,
    complete: true,
  };

  for (const cls of classes) {
    const base = styleLintBaseClass(cls);
    const exact = tokens.forbidden.classes.includes(base);
    let pattern: string | undefined;
    if (!exact) {
      pattern = tokens.forbidden.patterns.find((candidate) => {
        try {
          return new RegExp(candidate).test(base);
        } catch {
          uncertainScope = true;
          return false;
        }
      });
    }
    if (!exact && !pattern) continue;

    let exception: StyleLintExceptionMatch = "miss";
    for (const candidate of tokens.forbidden.exceptions ?? []) {
      if (candidate.className !== base) continue;
      const result = matchStyleLintException(candidate, cls, element);
      if (result === "match") {
        exception = result;
        break;
      }
      if (result === "unknown") exception = result;
    }
    if (exception === "match") continue;
    if (exception === "unknown") {
      uncertainScope = true;
      continue;
    }

    violations.push(exact
      ? `"${base}" is forbidden: ${tokens.forbidden.reasons[base] || "violates style rules"}`
      : `"${base}" matches forbidden pattern "${pattern}"`);
  }

  const status = violations.length > 0 ? "fail" : uncertainScope ? "inconclusive" : "pass";
  if (uncertainScope) warnings.push("Some scoped exceptions or forbidden patterns could not be resolved from this class list.");
  return {
    valid: status === "pass",
    status,
    violations,
    warnings,
  };
}
