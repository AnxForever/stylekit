import { z } from "zod";

export const PREVIEW_COMPONENT_KEYS = ["button", "card", "input"] as const;
export type PreviewComponentKey = typeof PREVIEW_COMPONENT_KEYS[number];

// Allow common variable fonts while bounding embedded data. The converter also
// reserves space for the rest of the manifest under the 512 KiB submission limit.
// A source reference survives when a file cannot fit in the preview.
export const MAX_PREVIEW_FONT_BYTES = 384 * 1024;
export const MAX_PREVIEW_FONT_DATA = 480 * 1024;
export const MAX_PREVIEW_FONTS = 8;

export const MOTION_STYLE_PROPERTIES = [
  "backgroundColor", "color", "borderColor", "borderWidth", "borderRadius",
  "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
  "boxShadow", "opacity", "transform", "transformOrigin", "translate", "rotate", "scale", "filter",
  "outlineColor", "outlineStyle", "outlineWidth", "outlineOffset", "letterSpacing",
] as const;
export type MotionStyleProperty = typeof MOTION_STYLE_PROPERTIES[number];

const cssValue = z.string().min(1).max(500).regex(
  /^[^;{}<>\\@]+$/,
  "Expected a standalone CSS value",
).refine((value) => !/\b(?:url|expression|var)\s*\(/i.test(value), "CSS resources are not allowed here");

const motionStylesSchema = z.object(Object.fromEntries(
  MOTION_STYLE_PROPERTIES.map((property) => [property, cssValue.optional()]),
) as Record<MotionStyleProperty, z.ZodOptional<typeof cssValue>>);

const durationList = z.string().max(200).regex(/^\d*\.?\d+(?:ms|s)(?:,\s*\d*\.?\d+(?:ms|s))*$/);
const delayList = z.string().max(200).regex(/^-?\d*\.?\d+(?:ms|s)(?:,\s*-?\d*\.?\d+(?:ms|s))*$/);
const easing = cssValue;

export const componentMotionSchema = z.object({
  transition: z.object({
    property: z.string().max(240).regex(/^[a-z-]+(?:,\s*[a-z-]+)*$/),
    duration: durationList,
    timingFunction: easing,
    delay: delayList,
  }).optional(),
  // Base values are needed to restore properties such as transform and outline
  // when leaving a state; static samples intentionally omit page positioning.
  base: motionStylesSchema.optional(),
  states: z.object({
    hover: motionStylesSchema.optional(),
    focus: motionStylesSchema.optional(),
    active: motionStylesSchema.optional(),
  }).optional(),
  animations: z.array(z.object({
    name: z.string().max(160).optional(),
    duration: z.number().finite().positive().max(60_000),
    delay: z.number().finite().min(-60_000).max(60_000),
    iterations: z.union([z.number().finite().positive().max(1000), z.literal("infinite")]),
    direction: z.enum(["normal", "reverse", "alternate", "alternate-reverse"]),
    fill: z.enum(["none", "forwards", "backwards", "both", "auto"]),
    easing,
    keyframes: z.array(z.object({
      offset: z.number().finite().min(0).max(1),
      easing: easing.optional(),
      styles: motionStylesSchema,
    })).min(2).max(16),
  })).max(3).optional(),
});
export type ComponentMotion = z.infer<typeof componentMotionSchema>;
export type MotionStyles = z.infer<typeof motionStylesSchema>;

export const previewFontFaceSchema = z.object({
  family: cssValue.max(160),
  sourceUrl: z.string().max(2048).url().refine((value) => {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password;
  }).optional(),
  // Only embedded font bytes are loaded in the preview, never arbitrary remote
  // URLs. This works with the site's existing font-src CSP and needs no proxy.
  dataUrl: z.string().max(Math.ceil(MAX_PREVIEW_FONT_BYTES / 3) * 4 + 40)
    .regex(/^data:font\/(?:woff2?|ttf|otf);base64,[A-Za-z0-9+/]+={0,2}$/).optional(),
  weight: cssValue.max(80).optional(),
  style: cssValue.max(80).optional(),
  stretch: cssValue.max(80).optional(),
  unicodeRange: z.string().max(2000).regex(/^U\+[\da-f?]+(?:-[\da-f]+)?(?:,\s*U\+[\da-f?]+(?:-[\da-f]+)?)*$/i).optional(),
});
export type PreviewFontFace = z.infer<typeof previewFontFaceSchema>;

export const previewAssetsSchema = z.object({
  fonts: z.array(previewFontFaceSchema).max(MAX_PREVIEW_FONTS).optional(),
  motion: z.object({
    button: componentMotionSchema.optional(),
    card: componentMotionSchema.optional(),
    input: componentMotionSchema.optional(),
  }).optional(),
}).refine((assets) => (assets.fonts ?? []).reduce((sum, font) => sum + (font.dataUrl?.length ?? 0), 0) <= MAX_PREVIEW_FONT_DATA, {
  message: "Embedded preview fonts exceed the size limit",
  path: ["fonts"],
});
export type PreviewAssets = z.infer<typeof previewAssetsSchema>;

export function parsePreviewAssets(value: unknown): PreviewAssets | undefined {
  if (!value) return undefined;
  const result = previewAssetsSchema.safeParse(value);
  return result.success ? result.data : undefined;
}

export function fontFamilies(stack: string): string[] {
  return (stack.match(/"[^"]*"|'[^']*'|[^,]+/g) ?? [])
    .map((family) => family.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

export function fontFamilyKey(family: string): string {
  return family.replace(/^["']|["']$/g, "").trim().toLowerCase();
}
