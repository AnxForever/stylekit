// Layout Archetype System - Reusable page layout patterns
// Archetypes define structure, not style - they can be combined with any visual style

/**
 * A layout archetype defines the structure of a page or section
 */
export interface LayoutArchetype {
  /** Unique identifier, e.g., "landing-hero-centered" */
  id: string;

  /** Display name */
  name: string;

  /** Chinese name */
  nameZh: string;

  /** Page category this archetype belongs to */
  category: ArchetypeCategory;

  /** Description of this layout pattern */
  description: string;

  /** Chinese description */
  descriptionZh: string;

  /** Sections that make up this layout */
  sections: ArchetypeSection[];

  /** Responsive behavior descriptions */
  responsive: ResponsiveBehavior;

  /** Recommended visual styles for this archetype */
  recommendedStyles?: string[];

  /** Tags for filtering */
  tags?: string[];
}

export type ArchetypeCategory = "landing" | "dashboard" | "blog" | "form" | "list" | "detail";

/**
 * A section within a layout archetype
 */
export interface ArchetypeSection {
  /** Unique identifier within archetype */
  id: string;

  /** Display name */
  name: string;

  /** Chinese name */
  nameZh: string;

  /** Whether this section is required */
  required: boolean;

  /** Display order (1-based) */
  order: number;

  /** Layout configuration */
  layout: SectionLayout;

  /** Components typically used in this section */
  components: string[];

  /** Description of section purpose */
  description?: string;

  /** Slot definitions for content */
  slots?: SectionSlot[];

  // ============ Conversion strategy fields (from knowledge base) ============

  /** Conversion strategy for this section (e.g., "Social proof placement") */
  conversionStrategy?: string;

  /** CTA placement recommendation */
  ctaPlacement?: string;

  /** Color strategy for this section */
  colorStrategy?: string;

  /** Recommended visual effects */
  recommendedEffects?: string;
}

/**
 * Layout configuration for a section
 */
export interface SectionLayout {
  /** Layout type */
  type: "full-width" | "contained" | "split" | "grid" | "stack" | "sidebar";

  /** Maximum width constraint */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "7xl" | "full";

  /** Grid columns (for grid type) */
  columns?: number | { mobile: number; tablet: number; desktop: number };

  /** Split ratio (for split type), e.g., "1:1", "2:1", "1:2" */
  ratio?: string;

  /** Minimum height */
  minHeight?: string;

  /** Padding configuration */
  padding?: "none" | "sm" | "md" | "lg" | "xl";

  /** Gap between items */
  gap?: "none" | "sm" | "md" | "lg";

  /** Background style */
  background?: "transparent" | "primary" | "secondary" | "accent";

  /** Vertical alignment */
  verticalAlign?: "top" | "center" | "bottom" | "stretch";

  /** Horizontal alignment */
  horizontalAlign?: "left" | "center" | "right" | "stretch";
}

/**
 * A content slot within a section
 */
export interface SectionSlot {
  /** Slot identifier */
  id: string;

  /** Display name */
  name: string;

  /** Expected content type */
  type: "text" | "heading" | "paragraph" | "image" | "component" | "list";

  /** Whether required */
  required: boolean;
}

/**
 * Responsive behavior descriptions
 */
export interface ResponsiveBehavior {
  /** Mobile behavior description */
  mobile: string;

  /** Tablet behavior description */
  tablet: string;

  /** Desktop behavior description */
  desktop: string;
}

/**
 * Tailwind classes for a layout configuration
 */
export interface LayoutClasses {
  container: string;
  wrapper?: string;
  items?: string;
}

/**
 * Generate Tailwind classes from section layout
 */
export function getLayoutClasses(layout: SectionLayout): LayoutClasses {
  const classes: string[] = [];

  // Container max width
  if (layout.maxWidth && layout.maxWidth !== "full") {
    classes.push(`max-w-${layout.maxWidth}`);
  }

  // Layout type
  switch (layout.type) {
    case "contained":
      classes.push("mx-auto");
      break;
    case "grid":
      const cols = typeof layout.columns === "number"
        ? layout.columns
        : layout.columns?.desktop || 3;
      classes.push(`grid grid-cols-1 md:grid-cols-${Math.min(cols, 2)} lg:grid-cols-${cols}`);
      break;
    case "split":
      classes.push("grid grid-cols-1 lg:grid-cols-2");
      break;
    case "stack":
      classes.push("flex flex-col");
      break;
    case "sidebar":
      classes.push("grid grid-cols-1 lg:grid-cols-[280px_1fr]");
      break;
  }

  // Padding
  const paddingMap: Record<string, string> = {
    none: "",
    sm: "px-4 py-8 md:px-6 md:py-12",
    md: "px-4 py-12 md:px-8 md:py-16",
    lg: "px-4 py-16 md:px-12 md:py-24",
    xl: "px-4 py-20 md:px-16 md:py-32",
  };
  if (layout.padding && paddingMap[layout.padding]) {
    classes.push(paddingMap[layout.padding]);
  }

  // Gap
  const gapMap: Record<string, string> = {
    none: "",
    sm: "gap-4 md:gap-6",
    md: "gap-6 md:gap-8",
    lg: "gap-8 md:gap-12",
  };
  if (layout.gap && gapMap[layout.gap]) {
    classes.push(gapMap[layout.gap]);
  }

  // Alignment
  if (layout.verticalAlign === "center") {
    classes.push("items-center");
  }
  if (layout.horizontalAlign === "center") {
    classes.push("justify-center text-center");
  }

  // Min height
  if (layout.minHeight) {
    classes.push(`min-h-[${layout.minHeight}]`);
  }

  return {
    container: classes.join(" "),
  };
}

/**
 * Collection of archetypes for a category
 */
export interface ArchetypeCollection {
  category: ArchetypeCategory;
  archetypes: LayoutArchetype[];
}
