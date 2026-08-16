// Kit export engine - compiles a set of KitItems into one coherent Design Kit.
// Unlike style-pack.ts (one style, all formats), this merges MULTIPLE assets
// (styles + animations + font pairings) into a single deliverable bundle.
//
// Keep this module out of list-page bundles: import it dynamically at the
// export call site (it pulls in full style/animation registries).

import { getStyleBySlug, type DesignStyle } from "@/lib/styles";
import { getAnimationBySlug } from "@/lib/animations";
import type { Animation } from "@/lib/animations/types";
import {
  getFontPairingById,
  generateGoogleFontsLink,
  generateFontCSS,
  generateTailwindTheme,
  fontStack,
  type FontPairing,
} from "@/lib/typography";
import { getGradientById, type Gradient } from "@/lib/gradients";
import { getShadowById, type Shadow } from "@/lib/shadows";
import { getBackgroundById, type BackgroundPattern } from "@/lib/backgrounds";
import { exportStyleTokens } from "@/lib/export/figma-tokens";
import { generateTailwindPresetJS } from "@/lib/export/tailwind-preset";
import type { KitItem } from "./types";

export interface KitFile {
  path: string;
  content: string;
}

export interface ResolvedKit {
  styles: DesignStyle[];
  animations: Animation[];
  fontPairings: FontPairing[];
  gradients: Gradient[];
  shadows: Shadow[];
  backgrounds: BackgroundPattern[];
  missing: string[];
}

export function resolveKitItems(items: KitItem[]): ResolvedKit {
  const styles: DesignStyle[] = [];
  const animations: Animation[] = [];
  const fontPairings: FontPairing[] = [];
  const gradients: Gradient[] = [];
  const shadows: Shadow[] = [];
  const backgrounds: BackgroundPattern[] = [];
  const missing: string[] = [];

  for (const item of items) {
    if (item.type === "style") {
      const style = getStyleBySlug(item.slug);
      if (style) styles.push(style);
      else missing.push(`style:${item.slug}`);
    } else if (item.type === "animation") {
      const animation = getAnimationBySlug(item.slug);
      if (animation) animations.push(animation);
      else missing.push(`animation:${item.slug}`);
    } else if (item.type === "font-pairing") {
      const pairing = getFontPairingById(item.slug);
      if (pairing) fontPairings.push(pairing);
      else missing.push(`font-pairing:${item.slug}`);
    } else if (item.type === "gradient") {
      const gradient = getGradientById(item.slug);
      if (gradient) gradients.push(gradient);
      else missing.push(`gradient:${item.slug}`);
    } else if (item.type === "shadow") {
      const shadow = getShadowById(item.slug);
      if (shadow) shadows.push(shadow);
      else missing.push(`shadow:${item.slug}`);
    } else {
      const background = getBackgroundById(item.slug);
      if (background) backgrounds.push(background);
      else missing.push(`background:${item.slug}`);
    }
  }

  return { styles, animations, fontPairings, gradients, shadows, backgrounds, missing };
}

function noteFor(items: KitItem[], type: KitItem["type"], slug: string): string | undefined {
  return items.find((item) => item.type === type && item.slug === slug)?.note;
}

// --- AI_PROMPT.md: one coherent prompt, not a concatenation ---

function synthesizePrompt(kit: ResolvedKit, items: KitItem[]): string {
  const [primary, ...secondary] = kit.styles;
  const lines: string[] = [];

  lines.push("# Design Kit Prompt");
  lines.push("");
  lines.push(
    "Use this as a single system/context prompt for AI coding tools (Cursor, v0, Claude, Copilot)."
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  if (primary) {
    lines.push(`Build the UI in the **${primary.nameEn}** design style.`);
    const note = noteFor(items, "style", primary.slug);
    if (note) lines.push(`(User note: ${note})`);
    lines.push("");
    lines.push("## Base style rules");
    lines.push("");
    lines.push(primary.aiRulesEn ?? primary.aiRules);
    lines.push("");

    for (const style of secondary) {
      lines.push(`## Accent style: ${style.nameEn}`);
      lines.push("");
      const accentNote = noteFor(items, "style", style.slug);
      lines.push(
        `Blend in **${style.nameEn}** as a secondary accent${accentNote ? ` (${accentNote})` : ""} — apply it to highlighted sections or standout components only; the base style above stays dominant. Key traits:`
      );
      lines.push("");
      const traits = (style.keywordsEn ?? style.keywords).slice(0, 8).join(", ");
      lines.push(`- Keywords: ${traits}`);
      lines.push(
        `- Palette: primary ${style.colors.primary}, secondary ${style.colors.secondary}, accents ${style.colors.accent.join(", ")}`
      );
      lines.push("");
    }
  }

  if (kit.fontPairings.length > 0) {
    lines.push("## Typography");
    lines.push("");
    for (const pairing of kit.fontPairings) {
      const note = noteFor(items, "font-pairing", pairing.id);
      lines.push(
        `- Pairing "${pairing.name}": headings in ${pairing.heading.family} (weight ${pairing.heading.weight}), body in ${pairing.body.family} (weight ${pairing.body.weight}). Load via Google Fonts.${note ? ` Note: ${note}` : ""}`
      );
    }
    lines.push("");
  }

  if (kit.animations.length > 0) {
    lines.push("## Motion");
    lines.push("");
    lines.push(
      "Implement the following animations (full CSS/React code is included in the `animations/` folder of this kit):"
    );
    lines.push("");
    for (const animation of kit.animations) {
      const note = noteFor(items, "animation", animation.slug);
      lines.push(
        `- **${animation.nameEn}** (${animation.trigger}, ${animation.duration}, easing ${animation.easing}): ${animation.descriptionEn}${note ? ` Note: ${note}` : ""}`
      );
    }
    lines.push("");
    lines.push(
      "Respect `prefers-reduced-motion`: gate non-essential animations behind the media query."
    );
    lines.push("");
  }

  const surfaces: string[] = [];
  for (const gradient of kit.gradients) {
    surfaces.push(`- Gradient "${gradient.name}": \`${gradient.css}\``);
  }
  for (const shadow of kit.shadows) {
    surfaces.push(`- Shadow "${shadow.name}": \`${shadow.value}\``);
  }
  for (const background of kit.backgrounds) {
    surfaces.push(`- Background "${background.name}": \`background-image: ${background.css};\``);
  }
  if (surfaces.length > 0) {
    lines.push("## Surfaces");
    lines.push("");
    lines.push("Use these surface treatments where appropriate (ready-to-paste CSS is in `surfaces.css`):");
    lines.push("");
    lines.push(...surfaces);
    lines.push("");
  }

  return lines.join("\n");
}

// --- DESIGN_SPEC.md: unified human-readable spec ---

function buildDesignSpec(kit: ResolvedKit, items: KitItem[]): string {
  const lines: string[] = ["# Design Specification", ""];

  if (kit.styles.length > 0) {
    lines.push("## Styles");
    lines.push("");
    for (const style of kit.styles) {
      const note = noteFor(items, "style", style.slug);
      lines.push(`### ${style.nameEn} (${style.name})`);
      lines.push("");
      if (note) lines.push(`> Note: ${note}`, "");
      lines.push(style.descriptionEn ?? style.description);
      lines.push("");
      lines.push("| Token | Value |");
      lines.push("| --- | --- |");
      lines.push(`| Primary | \`${style.colors.primary}\` |`);
      lines.push(`| Secondary | \`${style.colors.secondary}\` |`);
      style.colors.accent.forEach((color, i) => {
        lines.push(`| Accent ${i + 1} | \`${color}\` |`);
      });
      lines.push("");
      const doList = style.doListEn ?? style.doList;
      const dontList = style.dontListEn ?? style.dontList;
      if (doList.length) {
        lines.push("**Do:**");
        doList.forEach((entry) => lines.push(`- ${entry}`));
        lines.push("");
      }
      if (dontList.length) {
        lines.push("**Don't:**");
        dontList.forEach((entry) => lines.push(`- ${entry}`));
        lines.push("");
      }
    }
  }

  if (kit.fontPairings.length > 0) {
    lines.push("## Typography");
    lines.push("");
    for (const pairing of kit.fontPairings) {
      lines.push(`### ${pairing.name}`);
      lines.push("");
      lines.push(`- Heading: \`${fontStack(pairing.heading)}\` weight ${pairing.heading.weight}`);
      lines.push(`- Body: \`${fontStack(pairing.body)}\` weight ${pairing.body.weight}`);
      lines.push(`- Best for: ${pairing.bestFor}`);
      lines.push(`- Google Fonts: ${generateGoogleFontsLink(pairing)}`);
      lines.push("");
    }
  }

  if (kit.animations.length > 0) {
    lines.push("## Motion");
    lines.push("");
    lines.push("| Animation | Trigger | Duration | Easing | GPU-accelerated |");
    lines.push("| --- | --- | --- | --- | --- |");
    for (const animation of kit.animations) {
      lines.push(
        `| ${animation.nameEn} | ${animation.trigger} | ${animation.duration} | \`${animation.easing}\` | ${animation.isGPUAccelerated ? "yes" : "no"} |`
      );
    }
    lines.push("");
  }

  if (kit.gradients.length > 0) {
    lines.push("## Gradients");
    lines.push("");
    for (const gradient of kit.gradients) {
      lines.push(`- **${gradient.name}**: \`${gradient.css}\``);
    }
    lines.push("");
  }

  if (kit.shadows.length > 0) {
    lines.push("## Shadows");
    lines.push("");
    for (const shadow of kit.shadows) {
      lines.push(`- **${shadow.name}**: \`${shadow.value}\``);
    }
    lines.push("");
  }

  if (kit.backgrounds.length > 0) {
    lines.push("## Background Patterns");
    lines.push("");
    for (const background of kit.backgrounds) {
      lines.push(`- **${background.name}**: \`background-image: ${background.css};\``);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function buildReadme(kit: ResolvedKit, generatedAt: string): string {
  const counts = [
    kit.styles.length && `${kit.styles.length} style${kit.styles.length > 1 ? "s" : ""}`,
    kit.animations.length &&
      `${kit.animations.length} animation${kit.animations.length > 1 ? "s" : ""}`,
    kit.fontPairings.length &&
      `${kit.fontPairings.length} font pairing${kit.fontPairings.length > 1 ? "s" : ""}`,
    kit.gradients.length &&
      `${kit.gradients.length} gradient${kit.gradients.length > 1 ? "s" : ""}`,
    kit.shadows.length && `${kit.shadows.length} shadow${kit.shadows.length > 1 ? "s" : ""}`,
    kit.backgrounds.length &&
      `${kit.backgrounds.length} background${kit.backgrounds.length > 1 ? "s" : ""}`,
  ]
    .filter(Boolean)
    .join(", ");

  return [
    "# StyleKit Design Kit",
    "",
    `Generated by [StyleKit](https://www.stylekit.top) on ${generatedAt}.`,
    "",
    `Contents: ${counts || "empty kit"}.`,
    "",
    "## Files",
    "",
    "- `AI_PROMPT.md` — a single merged prompt for AI coding tools. Start here.",
    "- `DESIGN_SPEC.md` — human-readable design specification (palette, type, motion).",
    "- `tokens/` — per-style design tokens (Figma Tokens / Tokens Studio compatible) and Tailwind presets.",
    "- `animations/` — production-ready CSS / React code for each selected animation.",
    "- `fonts.md` — font loading snippets (Google Fonts links, CSS, Tailwind v4 theme).",
    ...(kit.gradients.length || kit.shadows.length || kit.backgrounds.length
      ? ["- `surfaces.css` — ready-to-use gradients, shadows and background patterns."]
      : []),
    "",
    "## Suggested workflow",
    "",
    "1. Paste `AI_PROMPT.md` into your AI tool as the design context.",
    "2. Import `tokens/*.tokens.json` into Figma (Tokens Studio) or wire the Tailwind preset.",
    "3. Drop the `animations/` snippets in as you build components.",
    "",
    ...(kit.missing.length
      ? ["> Note: some items could not be resolved and were skipped: " + kit.missing.join(", "), ""]
      : []),
  ].join("\n");
}

function buildSurfacesFile(kit: ResolvedKit): string {
  const lines: string[] = [
    "/* StyleKit Design Kit — surfaces",
    "   Gradients, shadows and background patterns as ready-to-use CSS. */",
    "",
  ];
  for (const gradient of kit.gradients) {
    lines.push(`/* Gradient: ${gradient.name} */`);
    lines.push(`.bg-${gradient.id} { background: ${gradient.css}; }`);
    lines.push("");
  }
  for (const shadow of kit.shadows) {
    lines.push(`/* Shadow: ${shadow.name} */`);
    lines.push(`.shadow-${shadow.id} { box-shadow: ${shadow.value}; }`);
    lines.push("");
  }
  for (const background of kit.backgrounds) {
    lines.push(`/* Background pattern: ${background.name} */`);
    lines.push(`.pattern-${background.id} { background-image: ${background.css}; }`);
    lines.push("");
  }
  return lines.join("\n");
}

function buildFontsFile(pairings: FontPairing[]): string {
  const lines: string[] = ["# Fonts", ""];
  for (const pairing of pairings) {
    lines.push(`## ${pairing.name}`);
    lines.push("");
    lines.push("HTML link tag:");
    lines.push("");
    lines.push("```html");
    lines.push(`<link rel="stylesheet" href="${generateGoogleFontsLink(pairing)}">`);
    lines.push("```");
    lines.push("");
    lines.push("CSS:");
    lines.push("");
    lines.push("```css");
    lines.push(generateFontCSS(pairing));
    lines.push("```");
    lines.push("");
    lines.push("Tailwind v4 theme:");
    lines.push("");
    lines.push("```css");
    lines.push(generateTailwindTheme(pairing));
    lines.push("```");
    lines.push("");
  }
  return lines.join("\n");
}

export interface BuildKitOptions {
  generatedAt?: string;
}

export function buildKitFiles(items: KitItem[], options?: BuildKitOptions): KitFile[] {
  const kit = resolveKitItems(items);
  const generatedAt = options?.generatedAt ?? new Date().toISOString().slice(0, 10);
  const files: KitFile[] = [];

  files.push({ path: "README.md", content: buildReadme(kit, generatedAt) });
  files.push({ path: "AI_PROMPT.md", content: synthesizePrompt(kit, items) });
  files.push({ path: "DESIGN_SPEC.md", content: buildDesignSpec(kit, items) });

  for (const style of kit.styles) {
    files.push({
      path: `tokens/${style.slug}.tokens.json`,
      content: exportStyleTokens(style, "figma-tokens"),
    });
    files.push({
      path: `tokens/${style.slug}.tailwind.preset.js`,
      content: generateTailwindPresetJS(style),
    });
    files.push({
      path: `tokens/${style.slug}.css`,
      content: exportStyleTokens(style, "css-variables"),
    });
  }

  for (const animation of kit.animations) {
    for (const snippet of animation.codeSnippets) {
      const ext = snippet.language === "tsx" ? "tsx" : "css";
      files.push({
        path: `animations/${animation.slug}.${ext}`,
        content: snippet.code,
      });
    }
  }

  if (kit.fontPairings.length > 0) {
    files.push({ path: "fonts.md", content: buildFontsFile(kit.fontPairings) });
  }

  if (kit.gradients.length || kit.shadows.length || kit.backgrounds.length) {
    files.push({ path: "surfaces.css", content: buildSurfacesFile(kit) });
  }

  return files;
}

export async function buildKitZipBlob(items: KitItem[]): Promise<Blob> {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  for (const file of buildKitFiles(items)) {
    zip.file(file.path, file.content);
  }
  return zip.generateAsync({ type: "blob" });
}
