/**
 * @module stylekit-core/export
 *
 * Turns a style into artifacts a project can actually adopt: IDE rule files,
 * a shadcn theme, a Tailwind preset, Figma tokens, CSS variables, an agent
 * skill pack.
 *
 * A prompt is spent the moment it is pasted. A rules file checked into a repo
 * governs everyone on the team, on every edit, without anyone re-pasting
 * anything — so these are the higher-leverage half of what a style can hand
 * over, and until now they were reachable only from inside the web app.
 *
 * Only pure generators live here. The browser-side `download*` and `openIn*`
 * helpers in `lib/export` stay behind, since they need a DOM.
 */

export type {
  /** One emitted file: name, contents, and language hint. */
  StylePackFile,
  /** Options for {@link generateStylePack}, currently the version stamp. */
  StylePackOptions,
} from "@/lib/export/style-pack";

export {
  /**
   * Bundles a style into the full set of adoption files — metadata, design
   * tokens, Tailwind preset, global CSS, shadcn theme, and CSS variables.
   * @param style - The style to export.
   * @param tokens - Its tokens, when available; sharpens the output.
   * @param options - Version stamp and related settings.
   * @returns One {@link StylePackFile} per artifact.
   */
  generateStylePack,
} from "@/lib/export/style-pack";

export type {
  /** Which assistant a rules file targets. */
  IdeConfigFormat,
} from "@/lib/export/ide-configs";

export {
  /**
   * Builds a Cursor rules file for a style.
   * @param slug - The style identifier.
   * @returns The rules markdown, or `null` if the style is unknown.
   */
  generateCursorRules,
  /**
   * Builds a Claude Code rules file for a style.
   * @param slug - The style identifier.
   * @returns The rules markdown, or `null` if the style is unknown.
   */
  generateClaudeRules,
  /**
   * Builds a Windsurf rules file for a style.
   * @param slug - The style identifier.
   * @returns The rules markdown, or `null` if the style is unknown.
   */
  generateWindsurfRules,
  /**
   * Builds an assistant-agnostic rules file for a style.
   * @param slug - The style identifier.
   * @returns The rules markdown, or `null` if the style is unknown.
   */
  generateGenericRules,
  /**
   * Builds a rules file in the requested format.
   * @param slug - The style identifier.
   * @param format - Which assistant to target.
   * @returns The rules markdown, or `null` if the style is unknown.
   */
  generateIdeConfig,
  /**
   * The conventional filename for a rules file, so callers write it to the
   * path the assistant actually reads.
   * @param slug - The style identifier.
   * @param format - Which assistant to target.
   * @returns The filename, including any directory the tool expects.
   */
  getIdeConfigFilename,
} from "@/lib/export/ide-configs";

export type {
  /** A shadcn theme: CSS custom properties for light and dark. */
  ShadcnTheme,
} from "@/lib/export/shadcn-theme";

export {
  /**
   * Builds a shadcn theme from a style's palette.
   * @param style - The style to convert.
   * @returns The theme as structured data.
   */
  generateShadcnTheme,
  /**
   * Same as {@link generateShadcnTheme}, serialized to JSON.
   * @param style - The style to convert.
   * @returns Pretty-printed JSON.
   */
  generateShadcnThemeJSON,
  /**
   * Same as {@link generateShadcnTheme}, rendered as a CSS block ready to
   * paste into a globals stylesheet.
   * @param style - The style to convert.
   * @returns The CSS text.
   */
  generateShadcnThemeCSS,
} from "@/lib/export/shadcn-theme";

export type {
  /** A Tailwind preset object: colors, fonts, and related theme extensions. */
  TailwindPreset,
} from "@/lib/export/tailwind-preset";

export {
  /**
   * Builds a Tailwind preset from a style.
   * @param style - The style to convert.
   * @returns The preset as structured data.
   */
  generateTailwindPreset,
  /**
   * Same as {@link generateTailwindPreset}, rendered as a JavaScript module.
   * @param style - The style to convert.
   * @param tokens - Its tokens, when available.
   * @returns The module source.
   */
  generateTailwindPresetJS,
} from "@/lib/export/tailwind-preset";

export type {
  /** A Figma-compatible token set. */
  FigmaTokenSet,
} from "@/lib/export/figma-tokens";

export {
  /**
   * Builds a Figma-compatible token set from a style.
   * @param style - The style to convert.
   * @returns The token set.
   */
  generateFigmaTokens,
  /**
   * Builds a Style Dictionary source from a style.
   * @param style - The style to convert.
   * @returns The Style Dictionary object.
   */
  generateStyleDictionary,
  /**
   * Renders a style's palette as CSS custom properties.
   * @param style - The style to convert.
   * @returns The CSS text.
   */
  generateCSSVariables,
  /**
   * Serializes a style's tokens in the requested format.
   * @param style - The style to convert.
   * @param format - The target token format.
   * @returns The serialized tokens.
   */
  exportStyleTokens,
} from "@/lib/export/figma-tokens";

export type {
  /** Inputs for {@link generateSkillPack}, including what to include. */
  SkillPackConfig,
} from "@/lib/export/skill-pack";

export {
  /**
   * Builds a `SKILL.md` agent skill pack for a style.
   * @param config - The style plus which sections to include.
   * @returns The skill markdown.
   */
  generateSkillPack,
  /**
   * The filename and size a skill pack will have, for previewing a download.
   * @param style - The style to export.
   * @returns The filename and byte size.
   */
  getSkillPackFileInfo,
} from "@/lib/export/skill-pack";

export {
  /**
   * Builds the full `llms.txt` text describing the whole catalog.
   * @returns The catalog as one document.
   */
  generateLlmsFullText,
} from "@/lib/export/llms-full";
