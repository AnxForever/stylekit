/**
 * Real prompt text, generated at build time by the app itself.
 *
 * The film must never show a prompt it wrote for the film. This module calls
 * the product's own buildHardPrompt() for a real curated style and exports the
 * resulting string, so what scrolls on screen is byte-for-byte what a user
 * would copy from the site.
 */
import { cyberpunkNeon } from "../../../../lib/styles/cyberpunk-neon";
import { editorial } from "../../../../lib/styles/editorial";
import { buildHardPrompt, type PromptPairInput } from "../../../../lib/styles/prompt-pair";
import type { DesignStyle } from "../../../../lib/styles/types";

const promptInput = (s: DesignStyle): PromptPairInput => ({
  styleName: s.name,
  styleSlug: s.slug,
  aiRules: s.aiRules,
  aiRulesEn: s.aiRulesEn,
  doList: s.doList ?? [],
  doListEn: s.doListEn,
  dontList: s.dontList ?? [],
  dontListEn: s.dontListEn,
  keywords: s.keywords ?? [],
  keywordsEn: s.keywordsEn,
});

/** The exact string the app produces for 赛博朋克霓虹. */
export const HARD_PROMPT_CYBERPUNK = buildHardPrompt(promptInput(cyberpunkNeon), "zh");

/** Same tool, a very different style - proof that the rules are per-style. */
export const HARD_PROMPT_EDITORIAL = buildHardPrompt(promptInput(editorial), "zh");

export const PROMPT_LINES = (text: string) => text.split("\n");
