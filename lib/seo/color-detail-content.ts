import type { Metadata } from "next";
import { canonicalizeEnglishMetadata } from "@/lib/i18n/metadata";
import { getSiteBaseUrl } from "@/lib/site-url";
import { contrastRatio, hexToRgb, normalizeHexInput, type ColorDetail } from "@/lib/styles/color-detail";
import { getAllStyleColors } from "@/lib/styles/colors";

export const COLOR_REFERENCE_PALETTE = "Tailwind CSS 4.1.18, converted from OKLCH to sRGB hex";
export const COLOR_REFERENCE_SOURCES = [
  { name: "Tailwind CSS color documentation", href: "https://tailwindcss.com/docs/colors" },
  { name: "Tailwind CSS 4.1.18 reference palette", href: "https://github.com/tailwindlabs/tailwindcss/blob/v4.1.18/packages/tailwindcss/theme.css" },
  { name: "WCAG 2.2: Contrast (Minimum)", href: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" },
] as const;

export interface ColorPairing {
  hex: string;
  contrast: number;
  passesNormalText: boolean;
  styles: { slug: string; name: string }[];
}

/** Co-occurrence is provenance, not a claim of universal aesthetic compatibility. */
export function getActualColorPairings(hex: string): ColorPairing[] {
  const normalized = normalizeHexInput(hex);
  const rgb = normalized ? hexToRgb(normalized) : null;
  if (!rgb || !normalized) return [];
  const pairs = new Map<string, ColorPairing>();
  for (const style of getAllStyleColors()) {
    const swatches = [...new Set(style.swatches.map(normalizeHexInput).filter((value): value is string => value !== null))];
    if (!swatches.includes(normalized)) continue;
    for (const other of swatches) {
      if (other === normalized) continue;
      const otherRgb = hexToRgb(other);
      if (!otherRgb) continue;
      const ratio = contrastRatio(rgb, otherRgb);
      const pair = pairs.get(other) ?? { hex: other, contrast: Number(ratio.toFixed(2)), passesNormalText: ratio >= 4.5, styles: [] };
      pair.styles.push({ slug: style.slug, name: style.nameEn });
      pairs.set(other, pair);
    }
  }
  return [...pairs.values()].sort((a, b) => b.styles.length - a.styles.length || a.hex.localeCompare(b.hex)).slice(0, 6);
}

export function isExactTailwindHex(detail: ColorDetail): boolean {
  // A rounded perceptual distance can be zero even when the hex values differ.
  return detail.hex === detail.tailwind.hex;
}

export function getPreferredTextColor(detail: ColorDetail) {
  const black = { r: 0, g: 0, b: 0 };
  const white = { r: 255, g: 255, b: 255 };
  const blackRatio = contrastRatio(detail.rgb, black);
  const whiteRatio = contrastRatio(detail.rgb, white);
  return blackRatio >= whiteRatio
    ? { hex: "#000000", name: "black", ratio: blackRatio }
    : { hex: "#ffffff", name: "white", ratio: whiteRatio };
}

export function getColorAnswer(detail: ColorDetail) {
  const match = isExactTailwindHex(detail)
    ? `It exactly matches the sRGB hex approximation of ${detail.tailwind.token} in the reference Tailwind v4 palette.`
    : `The nearest reference Tailwind v4 token is ${detail.tailwind.token} (${detail.tailwind.hex}), not an exact match.`;
  return `${detail.hex} is ${detail.rgbCss}, or ${detail.hslCss}. ${match}`;
}

export function getColorFaq(detail: ColorDetail) {
  const text = getPreferredTextColor(detail);
  return [
    { question: `What color is ${detail.hex}?`, answer: getColorAnswer(detail) },
    { question: `What text color should I use on ${detail.hex}?`, answer: `${text.name[0].toUpperCase()}${text.name.slice(1)} (${text.hex}) has the higher black-or-white contrast against ${detail.hex}: ${text.ratio.toFixed(2)}:1. This calculation assumes opaque, flat sRGB colors. Normal text requires 4.5:1 and large text 3:1 under WCAG 2.2 SC 1.4.3; it is not a complete accessibility assessment.` },
    { question: `How can I use exactly ${detail.hex} in Tailwind CSS?`, answer: `Use bg-[${detail.hex}], text-[${detail.hex}], or a CSS custom property instead of substituting a nearby named token. The reference palette is ${COLOR_REFERENCE_PALETTE}; newer Tailwind versions and custom themes can differ.` },
  ];
}

export function buildColorDetailMetadata(detail: ColorDetail): Metadata {
  const text = getPreferredTextColor(detail);
  const title = `${detail.hex} Hex Color — RGB, Pairings & Contrast`;
  const description = `${detail.hex} is ${detail.rgbCss}. Explore real UI palette pairings, ${text.name} text contrast (${text.ratio.toFixed(2)}:1), and exact vs nearest Tailwind v4 colors.`;
  return canonicalizeEnglishMetadata({
    title, description,
    openGraph: { title: `${title} | StyleKit`, description, type: "website" },
    twitter: { card: "summary", title: `${title} | StyleKit`, description },
  }, `/colors/${detail.hex.slice(1)}`);
}

export function buildColorDetailJsonLd(detail: ColorDetail) {
  const base = getSiteBaseUrl();
  const url = `${base}/en/colors/${detail.hex.slice(1)}`;
  return {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#webpage`,
    name: `${detail.hex} hex color, pairings, and contrast`, description: getColorAnswer(detail),
    url, inLanguage: "en", citation: COLOR_REFERENCE_SOURCES.map((source) => source.href),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Colors", item: `${base}/en/colors` },
        { "@type": "ListItem", position: 2, name: detail.hex, item: url },
      ],
    },
  };
}
