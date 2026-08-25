/**
 * @module stylekit-core/prompt
 *
 * Prompt builders that turn a design style into instructions an AI coding
 * assistant can follow. The hard prompt is the strict, rule-by-rule contract;
 * the soft prompt is the conversational brief. Both accept an optional
 * {@link PromptContext} so callers can bind a style to a concrete project.
 */

export type {
  /** Style fields the prompt builders read (rules, do/don't lists, keywords). */
  PromptPairInput,
  /** Project-specific context woven into the generated prompts. */
  PromptContext,
  /** Both prompts produced together. */
  PromptPairContent,
} from "@/lib/styles/prompt-pair";

export {
  /**
   * Builds the strict prompt: style rules, absolute prohibitions, and a
   * generic-output checklist. This is the long form, meant to be pasted into
   * an AI coding assistant as the governing spec.
   * @param input - Style fields to build from.
   * @param locale - Output language; defaults to `"zh"`.
   * @param context - Optional project context (type, personality, anti-references).
   * @returns The hard prompt as a markdown string.
   */
  buildHardPrompt,
  /**
   * Builds the conversational brief — shorter, and phrased as a request
   * rather than a contract.
   * @param input - Style fields to build from.
   * @param locale - Output language; defaults to `"zh"`.
   * @param context - Optional project context.
   * @returns The soft prompt as a markdown string.
   */
  buildSoftPrompt,
  /**
   * Builds both prompts in one call.
   * @param input - Style fields to build from.
   * @param locale - Output language; defaults to `"zh"`.
   * @param context - Optional project context.
   * @returns A {@link PromptPairContent} holding both prompts.
   */
  buildPromptPair,
  /**
   * Picks the keywords a prompt should lead with, de-duplicated and capped.
   * @param input - Style fields to draw keywords from.
   * @param locale - Which keyword list to prefer; defaults to `"zh"`.
   * @param limit - Maximum keywords to return; defaults to 6.
   * @returns The selected keywords.
   */
  resolvePromptKeywords,
} from "@/lib/styles/prompt-pair";
