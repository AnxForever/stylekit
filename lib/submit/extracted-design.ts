import { hexToRgb, hslToRgb, rgbToHex } from "@/lib/color/convert";
import type { ComponentMotion } from "@/lib/style-preview/preview-assets";

export interface ExtractedComponent {
  selector?: string;
  styles?: Record<string, string>;
  confidence?: string;
  inViewport?: boolean;
  motion?: ComponentMotion;
}

export type ExtractedComponents = Partial<
  Record<"button" | "card" | "input" | "heading", ExtractedComponent[]>
>;

export type ComponentSamples = Partial<
  Record<keyof ExtractedComponents, ExtractedComponent>
>;

/** Computed colors may be hex, legacy RGB, or CSS Color 4 space-separated RGB. */
export function normalizeExtractedColor(value: string | undefined, background?: string): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim().toLowerCase();
  let channels: number[];
  let alpha = 1;
  if (/^#[\da-f]{3,4}$|^#[\da-f]{6}(?:[\da-f]{2})?$/.test(text)) {
    const hex = text.length <= 5
      ? text.slice(1).split("").map((c) => c + c).join("")
      : text.slice(1);
    channels = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    if (hex.length === 8) alpha = parseInt(hex.slice(6), 16) / 255;
  } else {
    const match = text.match(/^(rgba?|hsla?|color)\((.+)\)$/);
    if (!match) return null;
    const srgb = match[1] === "color";
    if (srgb && !match[2].startsWith("srgb ")) return null;
    const parts = match[2].replace(/^srgb\s+/, "").trim().split(/[\s,/]+/);
    if (parts.length < 3 || parts.length > 4) return null;
    if (parts.some((part) => !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:%|deg)?$/.test(part))) return null;
    if (parts[3]) {
      alpha = parseFloat(parts[3]) / (parts[3].endsWith("%") ? 100 : 1);
    }
    if (match[1].startsWith("hsl")) {
      if (!parts[1].endsWith("%") || !parts[2].endsWith("%")) return null;
      const rgb = hslToRgb({
        h: ((parseFloat(parts[0]) % 360) + 360) % 360,
        s: parseFloat(parts[1]), l: parseFloat(parts[2]),
      });
      channels = [rgb.r, rgb.g, rgb.b];
    } else {
      channels = parts.slice(0, 3).map((part) =>
        parseFloat(part) * (part.endsWith("%") ? 255 / 100 : srgb ? 255 : 1),
      );
    }
  }
  // Transparent paint is not evidence of a black brand color. Partial alpha
  // needs a known background to become a solid submission palette color.
  if (alpha <= 0 || alpha > 1 || channels.some((channel) => !Number.isFinite(channel))) return null;
  if (alpha < 1) {
    if (!background) return null;
    const base = hexToRgb(background);
    channels = channels.map((channel, i) => channel * alpha + [base.r, base.g, base.b][i] * (1 - alpha));
  }
  return rgbToHex({ r: channels[0], g: channels[1], b: channels[2] });
}

/** Only standalone visual declarations; never URLs, injected CSS, or page layout. */
export function measuredValue(value: string | undefined): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.trim();
  if (!text || text.length > 500 || /[;{}<>\\@]|\b(?:url|expression|var)\s*\(/i.test(text)) {
    return undefined;
  }
  return text;
}

function visibleComponents(components: ExtractedComponent[] | undefined, background: string): ExtractedComponent[] {
  return (components ?? []).filter(({ styles }) => {
    if (!styles || !Object.keys(styles).length) return false;
    if (styles.color && !normalizeExtractedColor(styles.color, background)) return false;
    return styles.display !== "none" && styles.visibility !== "hidden" &&
      styles.visibility !== "collapse" && styles.opacity !== "0" &&
      styles.width !== "0px" && styles.height !== "0px";
  });
}

export function selectComponentSamples(components: ExtractedComponents | undefined, background: string): ComponentSamples {
  const buttons = visibleComponents(components?.button, background).filter(({ styles }) => {
    const width = parseFloat(styles?.width ?? "");
    const height = parseFloat(styles?.height ?? "");
    return !(width <= 40 && height <= 40);
  });
  const scoreButton = (button: ExtractedComponent): number => {
    const fill = normalizeExtractedColor(button.styles?.backgroundColor, background);
    const primaryLabel = /(?:primary|cta|submit)/i.test(button.selector ?? "");
    // A visible filled action is stronger evidence than a frequent text color
    // or a transparent navigation control. Monochrome fills are equally valid.
    const contrast = fill ? Math.max(...[0, 2, 4].map((i) =>
      Math.abs(parseInt(fill.slice(i + 1, i + 3), 16) - parseInt(background.slice(i + 1, i + 3), 16)),
    )) : 0;
    return (contrast > 16 ? 4 : 0) + (button.inViewport ? 3 : 0) +
      (primaryLabel ? 2 : 0) + (button.confidence === "high" ? 0.5 : 0);
  };
  const representative = (items: ExtractedComponent[] | undefined) => {
    const visible = visibleComponents(items, background);
    // Prefer a repeated component style over a one-off wrapper.
    const signatures = visible.map((item) => JSON.stringify(VISUAL_PROPERTIES.map((key) => item.styles?.[key])));
    return visible.map((sample, i) => ({ sample, count: signatures.filter((s) => s === signatures[i]).length }))
      .sort((a, b) => Number(Boolean(b.sample.inViewport)) - Number(Boolean(a.sample.inViewport)) || b.count - a.count)[0]?.sample;
  };
  return {
    button: [...buttons].sort((a, b) => scoreButton(b) - scoreButton(a))[0],
    card: representative(components?.card),
    input: representative(components?.input),
    heading: visibleComponents(components?.heading, background).sort((a, b) =>
      Number(Boolean(b.inViewport)) - Number(Boolean(a.inViewport)) ||
      (parseFloat(b.styles?.fontSize ?? "0") || 0) - (parseFloat(a.styles?.fontSize ?? "0") || 0),
    )[0],
  };
}

const VISUAL_PROPERTIES = [
  "backgroundColor", "backgroundImage", "color", "border", "borderWidth", "borderStyle", "borderColor",
  "borderRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
  "boxShadow", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
  "fontFamily", "fontSize", "fontWeight", "fontStyle", "fontStretch", "fontVariationSettings", "fontFeatureSettings", "lineHeight", "letterSpacing", "textTransform",
] as const;

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function componentSampleCode(kind: "button" | "card" | "input", sample: ExtractedComponent | undefined): string | undefined {
  if (!sample?.styles) return undefined;
  // The browser extractor omits initial 0/none values. Reset them explicitly so
  // the sample cannot inherit StyleKit's rounded/shadowed component defaults.
  const styles: Record<string, string> = {
    boxSizing: "border-box", maxWidth: "100%", margin: "0", border: "none",
    borderRadius: "0px", boxShadow: "none", padding: "0px", backgroundColor: "transparent",
  };
  for (const key of VISUAL_PROPERTIES) {
    const value = measuredValue(sample.styles[key]);
    if (!value) continue;
    styles[key] = key.endsWith("Color") || key === "color"
      ? normalizeExtractedColor(value) ?? value
      : value;
  }
  const css = escapeAttribute(Object.entries(styles).map(([key, value]) =>
    `${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}: ${value}`,
  ).join("; "));
  // HTML works in the existing sanitized community preview and remains usable
  // outside React. No source text, handlers, images, or scripts are copied.
  if (kind === "button") return `<button type="button" style="${css}">Continue</button>`;
  if (kind === "input") return `<input type="text" aria-label="Example input" placeholder="Your email" style="${css}" />`;
  const focusable = sample.motion?.states?.focus ? ' tabindex="0"' : "";
  return `<article${focusable} style="${css}"><p style="margin: 0">A space for your next idea.</p></article>`;
}

export function componentSampleRules(samples: ComponentSamples): string[] {
  const rules: string[] = [];
  for (const [kind, label] of [["button", "Buttons"], ["card", "Cards"], ["input", "Inputs"]] as const) {
    const styles = samples[kind]?.styles;
    if (!styles) continue;
    const parts = [
      `border-radius: ${measuredValue(styles.borderRadius) ?? "0px"}`,
      `box-shadow: ${measuredValue(styles.boxShadow) ?? "none"}`,
    ];
    const border = measuredValue(styles.border);
    const padding = measuredValue(styles.padding);
    if (border) parts.push(`border: ${border}`);
    if (padding) parts.push(`padding: ${padding}`);
    rules.push(`${label} use ${parts.join("; ")}.`);
  }
  return rules;
}
