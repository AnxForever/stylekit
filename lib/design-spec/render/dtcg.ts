import type { DesignSpec } from "../types";
import { slugify } from "./shared";

interface DtcgToken {
  $value: unknown;
  $type: string;
  $description: string;
}

interface DtcgDocument {
  color: Record<string, DtcgToken>;
  font: Record<string, DtcgToken>;
  typography: Record<string, DtcgToken>;
  spacing: Record<string, DtcgToken>;
  borderRadius: Record<string, DtcgToken>;
  surface: Record<string, DtcgToken>;
}

/**
 * W3C Design Tokens Community Group format.
 *
 * The `$description` on each color is the role sentence, not the color name —
 * it is the only field an agent reads to decide when to use the token.
 */
export function renderDtcg(spec: DesignSpec): string {
  const document: DtcgDocument = {
    color: Object.fromEntries(
      spec.colors.map((color) => [
        slugify(color.nameEn),
        {
          $value: color.value,
          $type: "color",
          $description: `${color.nameEn} — ${color.role.en}`,
        },
      ]),
    ),
    font: Object.fromEntries(
      spec.fonts.map((font) => [
        slugify(font.family),
        {
          $value: font.family,
          $type: "fontFamily",
          $description: font.role.en,
        },
      ]),
    ),
    typography: Object.fromEntries(
      spec.typeScale.map((step) => [
        step.role,
        {
          $value: {
            ...(step.font ? { fontFamily: step.font } : {}),
            ...(step.weight ? { fontWeight: step.weight } : {}),
            fontSize: `${step.size}px`,
            lineHeight: step.lineHeight,
            ...(step.tracking ? { letterSpacing: step.tracking } : {}),
          },
          $type: "typography",
          $description: `${step.role} at ${step.size}px`,
        },
      ]),
    ),
    spacing: Object.fromEntries(
      spec.spacing.scale.map((step) => [
        String(step),
        {
          $value: `${step}px`,
          $type: "dimension",
          $description: `Spacing step ${step}, base unit ${spec.spacing.base}px`,
        },
      ]),
    ),
    borderRadius: Object.fromEntries(
      spec.radii.map((radius) => [
        slugify(radius.element),
        {
          $value: radius.value,
          $type: "dimension",
          $description: `Radius applied to ${radius.element}`,
        },
      ]),
    ),
    surface: Object.fromEntries(
      spec.surfaces.map((surface) => [
        slugify(surface.name),
        {
          $value: surface.value,
          $type: "color",
          $description: `Level ${surface.level} — ${surface.purpose}`,
        },
      ]),
    ),
  };

  return `${JSON.stringify(document, null, 2)}\n`;
}
