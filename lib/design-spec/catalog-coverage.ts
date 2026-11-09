import type { DesignSpec } from "./types";

export interface DesignSpecCoverageIssue {
  slug: string;
  kind: "missing" | "incomplete";
}

/** Every curated style needs an authored, complete canonical document. */
export function validateDesignSpecCoverage(
  styleSlugs: readonly string[],
  specs: readonly Pick<DesignSpec, "slug" | "completeness">[],
): DesignSpecCoverageIssue[] {
  const bySlug = new Map(specs.map((spec) => [spec.slug, spec]));
  return styleSlugs.flatMap((slug): DesignSpecCoverageIssue[] => {
    const spec = bySlug.get(slug);
    if (!spec) return [{ slug, kind: "missing" }];
    return spec.completeness === "full" ? [] : [{ slug, kind: "incomplete" }];
  });
}
