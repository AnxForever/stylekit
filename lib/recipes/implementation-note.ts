const LIQUID_GLASS_FALLBACK_NOTE = `/* Liquid Glass: CSS fallback only; this snippet does not refract the backdrop.
 * Real refraction requires the optical implementation described at:
 * https://www.stylekit.top/api/design/liquid-glass/design.md?locale=en
 * Keep foreground text separate from the filtered backdrop layer.
 */`;

/** Keep material requirements attached when consumers copy rendered code alone. */
export function withRecipeImplementationNote(styleSlug: string, code: string): string {
  return styleSlug === "liquid-glass"
    ? `${LIQUID_GLASS_FALLBACK_NOTE}\n${code}`
    : code;
}
