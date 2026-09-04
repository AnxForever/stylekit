/**
 * The prompt contributors paste into their AI assistant.
 *
 * Kept in code rather than fetched from a doc so the page cannot drift from the
 * gates: the vocabulary below is generated from the same constants the gates
 * validate against.
 *
 * Rewritten for the prompt-first contract. The previous version told assistants
 * that a cover SVG, three component snippets and a full typography scale were
 * mandatory — they are not, and a manifest built to those instructions asked a
 * contributor for roughly three times the work a usable style actually needs.
 */

import { STYLE_CATEGORIES, STYLE_TAGS, STYLE_TYPES } from "@/lib/styles/meta-types";

export const MASTER_PROMPT = `You are writing a StyleKit style submission.

Output exactly one JSON object and nothing else. No commentary.

WHAT STYLEKIT ACTUALLY NEEDS
A style is useful when an AI coding assistant can follow it. That means a clear
identity, a palette, and concrete rules. Component code and artwork are welcome
but optional — StyleKit renders a preview from the palette when they are absent.

MINIMUM SHAPE - everything here is required
{
  "formData": {
    "nameEn": "<English name>",
    "name": "<name in your language, or repeat the English one>",
    "slug": "<lowercase-kebab-case>",
    "description": "<one or two sentences a reader can judge the style by>",
    "category": "<${STYLE_CATEGORIES.join(" | ")}>",
    "styleType": "<${STYLE_TYPES.join(" | ")}>",
    "primaryColor": "#rrggbb",
    "secondaryColor": "#rrggbb",
    "background": "#rrggbb",
    "foreground": "#rrggbb",
    "aiRules": ["<rule>", "<rule>", "<rule>"]
  }
}

HARD CONSTRAINTS - the submission is rejected automatically if any fail
- slug matches ^[a-z0-9]+(?:-[a-z0-9]+)*$ and is not an existing StyleKit style
- category and styleType come from the lists above
- every color is a 3- or 6-digit hex value
- aiRules holds at least 3 non-empty, actionable rules
- no TODO, FIXME, lorem ipsum or placeholder text in any text or rule
- no <script>, <iframe>, inline event handlers or javascript: URLs anywhere

WRITING THE RULES - this is the part that matters
aiRules are the product. An assistant reads them and nothing else, so each rule
must be specific enough to act on:
  good: "Primary actions use #1d4ed8; never use another blue"
  good: "Corners stay at 8px; shadows are 0 2px 8px rgba(0,0,0,0.06)"
  weak: "Use a modern, clean look"
  weak: "Make it accessible"
Name exact colors, sizes, weights and shapes. Say what to avoid as well as what
to do.

OPTIONAL - add only what you genuinely have
  tags            from: ${STYLE_TAGS.join(", ")}
  accentColors    array of hex values
  muted           hex value
  keywords        array of strings
  philosophy      one or two sentences on the thinking behind the style
  doList,dontList arrays of short rules
  buttonCode, cardCode, inputCode, navCode, heroCode, footerCode
                  standalone HTML/JSX with Tailwind classes, no imports
  headingFont, bodyFont, fontSizeBase, fontSizeHeading, fontSizeSmall,
  fontWeightNormal, fontWeightBold, lineHeightNormal, lineHeightTight,
  borderRadius, spacingSm, spacingMd, spacingLg
                  neutral defaults are filled in when omitted
  assets.coverSvg an <svg> that draws the UI (shapes, not just a headline),
                  supplied as a sibling of formData

Anything you do supply must still clear the hard constraints. If you include
component code, reuse the declared palette rather than inventing colors, and
keep one coherent visual language across every snippet.

Add no fields beyond those listed.`;

/** What a contributor should decide before prompting. */
export const PROMPT_INPUT_CHECKLIST = [
  "Style name, in your language and in English",
  "A slug candidate in lowercase kebab-case",
  "Four core colors: primary, secondary, background, text",
  "3 or more concrete AI rules naming exact colors, sizes and shapes",
  "Optional: accents, tags, philosophy, Do/Don't rules",
  "Optional: component code and a cover SVG, if you have them",
] as const;
