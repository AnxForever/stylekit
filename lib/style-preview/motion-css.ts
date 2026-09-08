import {
  componentMotionSchema,
  parsePreviewAssets,
  type ComponentMotion,
  type MotionStyles,
  type PreviewAssets,
  type PreviewComponentKey,
} from "./preview-assets";

function declarations(styles: MotionStyles | undefined, important = false): string {
  return Object.entries(styles ?? {}).map(([key, value]) =>
    `${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}: ${value}${important ? " !important" : ""};`,
  ).join(" ");
}

/** All selectors/names are generated here; source styles never escape the sample. */
export function componentMotionCss(value: ComponentMotion | undefined, scope: string, play = true): string {
  const parsed = componentMotionSchema.safeParse(value);
  if (!parsed.success || !/^[a-zA-Z0-9_-]+$/.test(scope)) return "";
  const motion = parsed.data;
  const target = `[data-stylekit-preview="${scope}"] > :first-child`;
  const rules: string[] = [];
  if (motion.base) rules.push(`${target} { ${declarations(motion.base, true)} }`);
  if (motion.transition) {
    const t = motion.transition;
    rules.push(`${target} { transition-property: ${t.property}; transition-duration: ${t.duration}; transition-timing-function: ${t.timingFunction}; transition-delay: ${t.delay}; }`);
  }
  for (const state of ["hover", "focus", "active"] as const) {
    const styles = motion.states?.[state];
    if (!styles || !Object.keys(styles).length) continue;
    const pseudo = state === "focus" ? ":focus-visible" : `:${state}`;
    rules.push(`${target}${pseudo} { ${declarations(styles, true)} }`);
  }
  if (play && motion.animations?.length) {
    // Important base/state declarations take precedence over animations. Only
    // animated properties leave that layer; state changes still win on hover.
    const animatedProperties = new Set(motion.animations.flatMap((animation) =>
      animation.keyframes.flatMap((frame) => Object.keys(frame.styles)),
    ));
    const base = Object.fromEntries(Object.entries(motion.base ?? {}).filter(([key]) => !animatedProperties.has(key)));
    if (motion.base) rules[0] = `${target} { ${declarations(base, true)} }`;
    const animations: string[] = [];
    motion.animations.forEach((animation, index) => {
      const name = `sk-${scope}-${index}`;
      const frames = animation.keyframes.map((frame) =>
        `${Math.round(frame.offset * 10000) / 100}% { ${declarations(frame.styles)}${frame.easing ? ` animation-timing-function: ${frame.easing};` : ""} }`,
      ).join("\n");
      rules.push(`@keyframes ${name} {\n${frames}\n}`);
      animations.push(`${name} ${animation.duration}ms ${animation.easing} ${animation.delay}ms ${animation.iterations} ${animation.direction} ${animation.fill === "auto" ? "none" : animation.fill}`);
    });
    rules.push(`${target} { animation: ${animations.join(", ")}; }`);
  }
  rules.push(`@media (prefers-reduced-motion: reduce) { ${target} { animation: none !important; transition: none !important; } }`);
  return rules.join("\n");
}

function cssString(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[<>\n\r]/g, " ")}"`;
}

/** A copyable sample includes its fonts, state rules and reduced-motion fallback. */
export function componentCodeWithAssets(code: string, rawAssets: PreviewAssets | undefined, key: string): string {
  const assets = parsePreviewAssets(rawAssets);
  if (!assets || !/^(?:button|card|input)$/.test(key)) return code;
  const scope = `extracted-${key}`;
  const css = componentMotionCss(assets.motion?.[key as PreviewComponentKey], scope);
  const fonts = (assets.fonts ?? []).flatMap((font) => {
    const source = font.dataUrl ?? font.sourceUrl;
    if (!source) return [];
    return [`@font-face { font-family: ${cssString(font.family)}; src: url(${cssString(source)}); font-display: swap;${font.weight ? ` font-weight: ${font.weight};` : ""}${font.style ? ` font-style: ${font.style};` : ""}${font.stretch ? ` font-stretch: ${font.stretch};` : ""}${font.unicodeRange ? ` unicode-range: ${font.unicodeRange};` : ""} }`];
  }).join("\n");
  if (!css && !fonts) return code;
  return `<style>\n${[fonts, css].filter(Boolean).join("\n")}\n</style>\n<div data-stylekit-preview="${scope}">\n${code}\n</div>`;
}
