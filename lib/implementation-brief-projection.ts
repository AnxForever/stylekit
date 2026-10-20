import type { ImplementationBrief } from "./implementation-brief";

const SECTION_FIELDS = {
  identity: ["name", "nameEn", "category", "styleType", "description", "tags", "keywords"],
  guidance: ["philosophy", "aiRules", "doList", "dontList"],
  colors: ["colors"],
  globalCss: ["globalCss"],
  variants: ["variants"],
  components: ["components"],
  tokens: ["tokens"],
  recipes: ["recipes"],
  readiness: ["readiness"],
  lintRules: ["lintRules"],
} as const satisfies Record<string, readonly (keyof ImplementationBrief)[]>;

const SECTION_ORDER = Object.keys(SECTION_FIELDS) as ImplementationBriefSection[];

export type ImplementationBriefSection = keyof typeof SECTION_FIELDS;

export interface ImplementationBriefProjectionOptions {
  /** Select brief sections. Omitted means all sections. */
  sections?: readonly ImplementationBriefSection[];
  /** Restrict the selected components and recipes maps to these IDs. */
  componentIds?: readonly string[];
}

export type ImplementationBriefProjectionErrorCode =
  | "invalid_options"
  | "empty_sections"
  | "unknown_section"
  | "empty_component_ids"
  | "unknown_component"
  | "component_ids_require_components";

/** Invalid or contradictory input to the implementation-brief projector. */
export class ImplementationBriefProjectionError extends Error {
  readonly code: ImplementationBriefProjectionErrorCode;

  constructor(code: ImplementationBriefProjectionErrorCode, message: string) {
    super(message);
    this.name = "ImplementationBriefProjectionError";
    this.code = code;
  }
}

export interface ImplementationBriefProjectionMetadata {
  complete: boolean;
  mode: "full" | "partial";
  includedSections: ImplementationBriefSection[];
  excludedSections: ImplementationBriefSection[];
  componentFilter: string[] | null;
  lintRulesIncluded: boolean;
  /** True when the full serialized rule contract is included in this projection. */
  lintRulesComplete: boolean;
  notice: string;
}

export type ProjectedImplementationBrief =
  Pick<ImplementationBrief, "schemaVersion" | "slug" | "provenance">
  & Partial<Omit<ImplementationBrief, "schemaVersion" | "slug" | "provenance">>
  & { projection: ImplementationBriefProjectionMetadata };

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function projectionError(code: ImplementationBriefProjectionErrorCode, message: string): never {
  throw new ImplementationBriefProjectionError(code, message);
}

/**
 * Selects sections from a complete brief without modifying it. The original
 * provenance hash remains the identity of the full source payload, not a hash
 * of the projected excerpt. Fetch the full brief before treating an excerpt
 * as a complete implementation or lint contract.
 */
export function projectImplementationBrief(
  brief: ImplementationBrief,
  options: ImplementationBriefProjectionOptions = {},
): ProjectedImplementationBrief {
  if (!isRecord(brief)) {
    return projectionError("invalid_options", "An implementation brief object is required.");
  }
  if (Object.prototype.hasOwnProperty.call(brief, "projection")) {
    return projectionError("invalid_options", "Cannot project a brief excerpt; fetch the complete implementation brief first.");
  }
  if (!isRecord(options)) {
    return projectionError("invalid_options", "Implementation brief projection options must be an object.");
  }
  const unknownOption = Object.keys(options).find((key) => key !== "sections" && key !== "componentIds");
  if (unknownOption) {
    return projectionError("invalid_options", `Unknown implementation brief projection option "${unknownOption}".`);
  }

  const rawSections = options.sections;
  if (rawSections !== undefined && !Array.isArray(rawSections)) {
    return projectionError("invalid_options", "Implementation brief sections must be an array.");
  }
  if (Array.isArray(rawSections) && rawSections.length === 0) {
    return projectionError("empty_sections", "At least one implementation brief section must be selected.");
  }
  const selectedSections = new Set<ImplementationBriefSection>();
  if (rawSections === undefined) {
    SECTION_ORDER.forEach((section) => selectedSections.add(section));
  } else {
    for (const value of rawSections as readonly unknown[]) {
      if (typeof value !== "string" || !Object.prototype.hasOwnProperty.call(SECTION_FIELDS, value)) {
        return projectionError("unknown_section", `Unknown implementation brief section "${String(value)}".`);
      }
      selectedSections.add(value as ImplementationBriefSection);
    }
  }
  if (selectedSections.size === 0) {
    return projectionError("empty_sections", "At least one implementation brief section must be selected.");
  }

  const rawComponentIds = options.componentIds;
  let componentFilter: string[] | null = null;
  const selectedComponentMaps: Record<string, unknown>[] = [];
  if (selectedSections.has("components")) {
    selectedComponentMaps.push(isRecord(brief.components) ? brief.components : {});
  }
  if (selectedSections.has("recipes")) {
    selectedComponentMaps.push(isRecord(brief.recipes) ? brief.recipes : {});
  }
  if (rawComponentIds !== undefined) {
    if (!Array.isArray(rawComponentIds)) {
      return projectionError("invalid_options", "Component IDs must be an array.");
    }
    if (rawComponentIds.length === 0) {
      return projectionError("empty_component_ids", "At least one component ID must be selected.");
    }
    if (selectedComponentMaps.length === 0) {
      return projectionError("component_ids_require_components", "The components or recipes section must be included when component IDs are selected.");
    }
    if (!rawComponentIds.every((id) => typeof id === "string" && id.length > 0)) {
      return projectionError("invalid_options", "Component IDs must be non-empty strings.");
    }
    componentFilter = [...new Set(rawComponentIds as readonly string[])];
    const unknownComponent = componentFilter.find((componentId) => !selectedComponentMaps.some((componentMap) =>
      Object.prototype.hasOwnProperty.call(componentMap, componentId)));
    if (unknownComponent) {
      return projectionError("unknown_component", `Unknown component ID "${unknownComponent}" for style "${brief.slug}".`);
    }
  }

  const includedSections = SECTION_ORDER.filter((section) => selectedSections.has(section));
  const excludedSections = SECTION_ORDER.filter((section) => !selectedSections.has(section));
  // A deep copy keeps consumers from mutating nested recipes, tokens, or lint
  // rules retained by the live cache after they receive a projection.
  const projected: Record<string, unknown> = structuredClone(brief);
  for (const section of excludedSections) {
    for (const field of SECTION_FIELDS[section]) delete projected[field];
  }
  if (componentFilter) {
    for (const section of ["components", "recipes"] as const) {
      if (!selectedSections.has(section)) continue;
      const componentMap = isRecord(projected[section]) ? projected[section] : {};
      projected[section] = Object.fromEntries(componentFilter
        .filter((componentId) => Object.prototype.hasOwnProperty.call(componentMap, componentId))
        .map((componentId) => [componentId, componentMap[componentId]]));
    }
  }

  const hasAllComponentData = componentFilter === null || selectedComponentMaps.every((componentMap) =>
    componentFilter.length === Object.keys(componentMap).length &&
    componentFilter.every((componentId) => Object.prototype.hasOwnProperty.call(componentMap, componentId)));
  const complete = excludedSections.length === 0 && hasAllComponentData;
  const lintRulesIncluded = selectedSections.has("lintRules");
  const metadata: ImplementationBriefProjectionMetadata = {
    complete,
    mode: complete ? "full" : "partial",
    includedSections,
    excludedSections,
    componentFilter,
    lintRulesIncluded,
    lintRulesComplete: lintRulesIncluded,
    notice: complete
      ? "Complete stylekit-brief-v1 contract. provenance.contentHash identifies the complete source payload."
      : "Partial implementation brief excerpt. Omitted sections and components are not empty or default values. Check projection.lintRulesIncluded and projection.lintRulesComplete; an absent lintRules field is not an empty rule set. Fetch the full brief before treating this excerpt as a complete contract.",
  };
  projected.projection = metadata;

  // The spread above preserves caller-added transport metadata; only the
  // recognized brief sections are removed by the projection.
  return projected as ProjectedImplementationBrief;
}
