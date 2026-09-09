import type { CDPSession, Page, Response } from "playwright-core";
import type { CapturedPageStyles } from "@/lib/submit/capture-page-styles";
import { normalizeExtractedColor, selectComponentSamples } from "@/lib/submit/extracted-design";
import {
  componentMotionSchema,
  fontFamilies,
  fontFamilyKey,
  MAX_PREVIEW_FONT_BYTES,
  MAX_PREVIEW_FONT_DATA,
  MAX_PREVIEW_FONTS,
  MOTION_STYLE_PROPERTIES,
  PREVIEW_COMPONENT_KEYS,
  previewFontFaceSchema,
  type ComponentMotion,
  type MotionStyles,
  type PreviewFontFace,
} from "@/lib/style-preview/preview-assets";

interface ObservedFont {
  fontFamily: string;
  src: string;
  fontWeight?: string;
  fontStyle?: string;
  fontStretch?: string;
  unicodeRange?: string;
}

/** Self-contained for page.evaluate, including when bundled by esbuild. */
function readComponentMotion({ selector, properties, animations }: {
  selector: string;
  properties: readonly string[];
  animations: boolean;
}): { styles: MotionStyles; motion: ComponentMotion } | null {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return null;
  const computed = getComputedStyle(element);
  const motion: ComponentMotion = {};
  if (computed.transitionProperty !== "none" && computed.transitionDuration.split(",").some((time) => parseFloat(time) > 0)) {
    motion.transition = {
      property: computed.transitionProperty,
      duration: computed.transitionDuration,
      timingFunction: computed.transitionTimingFunction,
      delay: computed.transitionDelay,
    };
  }
  if (animations) {
    motion.animations = element.getAnimations().flatMap((animation) => {
      if (animation instanceof CSSTransition || !(animation.effect instanceof KeyframeEffect)) return [];
      const effect = animation.effect;
      if (effect.target !== element || effect.pseudoElement) return [];
      const timing = effect.getTiming();
      const delay = timing.delay ?? 0;
      const iterations = timing.iterations ?? 1;
      const frames = effect.getKeyframes();
      if (typeof timing.duration !== "number" || timing.duration <= 0 || timing.duration > 60_000 ||
          Math.abs(delay) > 60_000 || iterations <= 0 ||
          (Number.isFinite(iterations) && iterations > 1000) || frames.length < 2 || frames.length > 16) return [];
      const keyframes = frames.map((frame) => ({
        offset: frame.computedOffset,
        easing: frame.easing,
        styles: Object.fromEntries(properties.flatMap((property) =>
          typeof frame[property] === "string" ? [[property, frame[property]]] : [],
        )),
      }));
      if (!keyframes.some((frame) => Object.keys(frame.styles).length)) return [];
      return [{
        name: animation instanceof CSSAnimation ? animation.animationName : "Web animation",
        duration: timing.duration,
        delay,
        iterations: Number.isFinite(iterations) ? iterations : "infinite" as const,
        direction: timing.direction ?? "normal",
        fill: timing.fill ?? "auto",
        easing: timing.easing ?? "linear",
        keyframes,
      }];
    }).slice(0, 3);
    if (!motion.animations?.length) delete motion.animations;
  }

  // Read the end-state of a forced CSS pseudo class without clicking, submitting
  // forms or copying an animation's arbitrary intermediate frame. Restore the
  // exact inline attribute even if reading the site's styles throws.
  const originalStyle = element.getAttribute("style");
  try {
    element.style.setProperty("transition", "none", "important");
    element.style.setProperty("animation", "none", "important");
    const stable = getComputedStyle(element);
    const styles = Object.fromEntries(properties.map((property) => [
      property,
      stable.getPropertyValue(property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)),
    ]));
    return { styles, motion };
  } finally {
    if (originalStyle === null) element.removeAttribute("style");
    else element.setAttribute("style", originalStyle);
  }
}

async function sampleMotion(page: Page, cdp: CDPSession, selector: string): Promise<ComponentMotion | undefined> {
  const { root } = await cdp.send("DOM.getDocument");
  const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector });
  if (!nodeId) return undefined;
  const base = await page.evaluate(readComponentMotion, { selector, properties: MOTION_STYLE_PROPERTIES, animations: true });
  if (!base) return undefined;
  const motion: ComponentMotion = { ...base.motion, states: {} };
  try {
    for (const [state, forcedPseudoClasses] of [
      ["hover", ["hover"]],
      ["focus", ["focus", "focus-visible", "focus-within"]],
      ["active", ["hover", "active"]],
    ] as const) {
      await cdp.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: [...forcedPseudoClasses] });
      const sampled = await page.evaluate(readComponentMotion, { selector, properties: MOTION_STYLE_PROPERTIES, animations: false });
      if (!sampled) continue;
      const differences = Object.fromEntries(Object.entries(sampled.styles).filter(([property, value]) =>
        value !== base.styles[property as keyof MotionStyles],
      ));
      if (Object.keys(differences).length) motion.states![state] = differences;
    }
  } finally {
    await cdp.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: [] }).catch(() => {});
  }
  const changed = new Set([
    ...Object.values(motion.states ?? {}).flatMap((styles) => Object.keys(styles)),
    ...(motion.animations ?? []).flatMap((animation) => animation.keyframes.flatMap((frame) => Object.keys(frame.styles))),
  ]);
  if (changed.size) motion.base = Object.fromEntries(Object.entries(base.styles).filter(([property]) => changed.has(property)));
  if (!Object.keys(motion.states ?? {}).length) delete motion.states;
  if (!motion.transition && !motion.states && !motion.animations) return undefined;
  const parsed = componentMotionSchema.safeParse(motion);
  return parsed.success ? parsed.data : undefined;
}

function fontDataUrl(bytes: Buffer): string | undefined {
  if (bytes.length < 12 || bytes.length > MAX_PREVIEW_FONT_BYTES) return undefined;
  const signature = bytes.toString("ascii", 0, 4);
  const format = signature === "wOF2" ? "woff2" : signature === "wOFF" ? "woff" :
    signature === "OTTO" ? "otf" : bytes.readUInt32BE(0) === 0x00010000 ? "ttf" : null;
  return format ? `data:font/${format};base64,${bytes.toString("base64")}` : undefined;
}

const SYSTEM_FONTS = new Set([
  "system-ui", "sans-serif", "serif", "monospace", "ui-sans-serif", "ui-serif", "ui-monospace", "ui-rounded",
  "cursive", "fantasy", "math", "emoji", "fangsong", "-apple-system", "blinkmacsystemfont",
  "arial", "helvetica", "helvetica neue", "times new roman", "georgia", "verdana", "tahoma",
  "courier new", "trebuchet ms", "segoe ui", "apple color emoji", "segoe ui emoji",
]);

/** Start before navigation: CDP reports the actual loaded face, including CDN
 * stylesheets whose CSSOM is unreadable. Reuse downloaded bytes; never fetch a
 * new URL based on a page-supplied font reference. */
export async function beginEnhancementCapture(page: Page) {
  const cdp = await page.context().newCDPSession(page);
  const observed: ObservedFont[] = [];
  const downloads = new Map<string, string>();
  const pending = new Set<Promise<void>>();
  let requested = 0;
  const observeFont = ({ font }: { font?: ObservedFont }) => {
    if (font && observed.length < 128 && !observed.some((known) =>
      known.src === font.src && known.fontFamily === font.fontFamily && known.fontWeight === font.fontWeight && known.fontStyle === font.fontStyle && known.unicodeRange === font.unicodeRange,
    )) observed.push(font);
  };
  const observeResponse = (response: Response) => {
    if (response.request().resourceType() !== "font" || !response.ok() || requested >= 24) return;
    requested += 1;
    const task = (async () => {
      if (Number(response.headers()["content-length"]) > MAX_PREVIEW_FONT_BYTES) return;
      const bytes = await response.body();
      const data = fontDataUrl(bytes);
      if (data) downloads.set(response.url(), data);
    })().catch(() => {});
    pending.add(task);
    void task.finally(() => pending.delete(task));
  };
  cdp.on("CSS.fontsUpdated", observeFont);
  page.on("response", observeResponse);
  await cdp.send("DOM.enable");
  await cdp.send("CSS.enable");

  return {
    async capture(captured: CapturedPageStyles): Promise<void> {
      const samples = selectComponentSamples(captured.components, normalizeExtractedColor(captured.page.styles?.backgroundColor) ?? "#ffffff");
      // Static sampling keeps reduced motion to avoid entrance-frame colors.
      // Temporarily enable motion only after that snapshot has been retained.
      await page.emulateMedia({ reducedMotion: "no-preference" });
      try {
        for (const key of PREVIEW_COMPONENT_KEYS) {
          const sample = samples[key];
          if (sample?.selector) sample.motion = await sampleMotion(page, cdp, sample.selector).catch(() => undefined);
        }
      } finally {
        await page.emulateMedia({ reducedMotion: "reduce" });
      }
      await Promise.allSettled([...pending]);
      const families = new Map<string, { name: string; styles: Set<string> }>();
      for (const sample of [captured.page, samples.heading, samples.button, samples.card, samples.input]) {
        const stack = fontFamilies(sample?.styles?.fontFamily ?? "");
        const loaded = stack.filter((name) => observed.some((font) => fontFamilyKey(font.fontFamily) === fontFamilyKey(name)));
        // Unused fallback names are not missing assets. Keep a reference to the
        // first custom family only when the browser reported no loaded face.
        const selected = loaded.length ? loaded : stack.filter((name) => !SYSTEM_FONTS.has(fontFamilyKey(name))).slice(0, 1);
        for (const name of selected) {
          const key = fontFamilyKey(name);
          const family = families.get(key) ?? { name, styles: new Set<string>() };
          family.styles.add(sample?.styles?.fontStyle ?? "normal");
          families.set(key, family);
        }
      }
      const fonts: PreviewFontFace[] = [];
      let dataSize = 0;
      for (const [key, family] of families) {
        const observedFaces = observed.filter((font) => fontFamilyKey(font.fontFamily) === key);
        const matchingStyles = observedFaces.filter((font) => family.styles.has(font.fontStyle ?? "normal"));
        // Sites often preload italic faces that none of the samples use. Give
        // the measured variants the limited embedding budget first.
        const matches = matchingStyles.length ? matchingStyles : observedFaces;
        for (const font of matches) {
          if (fonts.length >= MAX_PREVIEW_FONTS) break;
          const sourceUrl = /^https?:\/\//.test(font.src) ? font.src : undefined;
          const candidate = downloads.get(font.src) ?? (font.src.startsWith("data:font/") ? font.src : undefined);
          const dataUrl = candidate && dataSize + candidate.length <= MAX_PREVIEW_FONT_DATA ? candidate : undefined;
          const parsed = previewFontFaceSchema.safeParse({
            family: font.fontFamily.replace(/^["']|["']$/g, ""), sourceUrl, dataUrl,
            weight: font.fontWeight, style: font.fontStyle, stretch: font.fontStretch, unicodeRange: font.unicodeRange,
          });
          if (parsed.success) {
            fonts.push(parsed.data);
            dataSize += dataUrl?.length ?? 0;
          }
        }
        if (!matches.length && fonts.length < MAX_PREVIEW_FONTS) {
          const parsed = previewFontFaceSchema.safeParse({ family: family.name });
          if (parsed.success) fonts.push(parsed.data);
        }
      }
      if (fonts.length) captured.fonts = fonts;
    },
    async stop() {
      page.off("response", observeResponse);
      cdp.off("CSS.fontsUpdated", observeFont);
      await cdp.detach().catch(() => {});
    },
  };
}
