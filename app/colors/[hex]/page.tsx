import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { CopyValueRow } from "@/components/colors/copy-value-row";
import {
  getAllDetailSwatches,
  getCuratedColorDetail,
  hexToSlug,
  normalizeHexInput,
  type ColorDetail,
} from "@/lib/styles/color-detail";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { canonicalizeEnglishMetadata } from "@/lib/i18n/metadata";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();

export const revalidate = 86400;
// Only the curated swatches returned by generateStaticParams are public pages.
// This prevents arbitrary HEX URLs from triggering on-demand SSR/ISR work.
export const dynamicParams = false;

export function generateStaticParams(): { hex: string }[] {
  return getAllDetailSwatches().map((hex) => ({ hex: hexToSlug(hex) }));
}

interface PageProps {
  params: Promise<{ hex: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { hex: slug } = await params;
  const detail = getCuratedColorDetail(slug);
  if (!detail) return { title: "Color not found" };

  const hex = detail.hex;
  const styleNames = detail.usedBy.slice(0, 3).map((u) => u.nameEn);
  // Hex SERPs are zero-click for "conversions" — Google's own color widget
  // and colorhexa answer that before anyone clicks. What earns the click is
  // the part they can't show: which Tailwind token it is, which curated UI
  // styles use it, and what pairs with it. Lead with those (audit #6: ~2,900
  // impressions/28d across hex queries at ~0% CTR while ranking pos 6-10).
  const token = detail.tailwind.distance <= 0.05 ? detail.tailwind.token : null;
  const tokenPrefix = token ? `${hex} (${token})` : hex;
  const title = styleNames.length
    ? `${tokenPrefix} — UI styles that use it + pairings`
    : `${tokenPrefix} — pairings, tints & WCAG contrast`;

  const styleLead =
    styleNames.length > 0
      ? `Used by ${styleNames.join(", ")}${
          detail.usedBy.length > styleNames.length
            ? ` and ${detail.usedBy.length - styleNames.length} more curated styles`
            : ""
        }.`
      : "";
  const description = token
    ? `${hex} is Tailwind's ${token}. ${styleLead} See colors that pair with it, tints/shades, and WCAG-safe text colors.`.replace("  ", " ").trim()
    : `${hex}: ${styleLead} RGB/HSL/OKLCH values, tints/shades, palette pairings, and WCAG contrast readings.`.replace("  ", " ").trim();

  return canonicalizeEnglishMetadata(
    {
      title,
      description,
      keywords: [
        `${hex} color`,
        `${hex} tailwind`,
        `${hex} pairings`,
        `${hex} palette`,
        `${hex} contrast`,
        "hex color ui",
      ],
    },
    `/colors/${hexToSlug(hex)}`
  );
}

function textOn(detail: ColorDetail): string {
  return detail.luminance > 0.35 ? "#111111" : "#ffffff";
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="font-mono text-xs tracking-[0.2em] text-[#7aa2ff]">
        {index}
      </span>
      <h2 className="text-xl md:text-2xl text-white/90">{title}</h2>
      <span
        aria-hidden="true"
        className="hidden flex-1 self-center border-t border-white/10 md:block"
      />
    </div>
  );
}

function SwatchLink({ hex }: { hex: string }) {
  return (
    <LocalizedLink
      href={`/colors/${hexToSlug(hex)}`}
      className="group flex flex-col gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
    >
      <span
        className="block h-14 w-full border border-white/10 transition-transform duration-150 group-hover:-translate-y-0.5"
        style={{ backgroundColor: hex }}
      />
      <span className="font-mono text-[11px] text-white/50 group-hover:text-white/85">
        {hex}
      </span>
    </LocalizedLink>
  );
}

export default async function ColorDetailPage({ params }: PageProps) {
  const { hex: slug } = await params;
  const normalized = normalizeHexInput(slug);
  if (!normalized) notFound();

  // Canonicalize "FFF"/"667EEA" style slugs to the 6-digit lowercase form.
  const canonicalSlug = normalized.slice(1);
  if (slug !== canonicalSlug) {
    permanentRedirect(`/colors/${canonicalSlug}`);
  }

  const detail = getCuratedColorDetail(normalized);
  if (!detail) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${detail.hex} color information`,
    description: `Conversions, WCAG contrast, Tailwind mapping, and design styles for the hex color ${detail.hex}.`,
    url: `${BASE_URL}/colors/${canonicalSlug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Colors", item: `${BASE_URL}/colors` },
        { "@type": "ListItem", position: 2, name: detail.hex, item: `${BASE_URL}/colors/${canonicalSlug}` },
      ],
    },
  };

  const promptSnippet =
    detail.usedBy.length > 0
      ? `Use ${detail.hex} as the ${detail.usedBy[0].role} color, following the ${detail.usedBy[0].nameEn} style: ${detail.rgbCss}, nearest Tailwind token ${detail.tailwind.token}. Keep text contrast at least 4.5:1 (this color scores ${detail.contrast[0].ratio}:1 on white, ${detail.contrast[1].ratio}:1 on black).`
      : `Use ${detail.hex} (${detail.rgbCss}, nearest Tailwind token ${detail.tailwind.token}) as an accent. Keep text contrast at least 4.5:1 — this color scores ${detail.contrast[0].ratio}:1 on white and ${detail.contrast[1].ratio}:1 on black.`;

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-14">
          <nav className="mb-8 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
            <LocalizedLink href="/colors" className="hover:text-white/80">
              Colors
            </LocalizedLink>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="text-white/70">{detail.hex}</span>
          </nav>

          <header className="mb-12">
            <div
              className="flex h-40 items-end border border-white/10 p-4 md:h-52"
              style={{ backgroundColor: detail.hex }}
            >
              <h1
                className="font-mono text-3xl tracking-tight md:text-5xl"
                style={{ color: textOn(detail) }}
              >
                {detail.hex}
              </h1>
            </div>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-white/60">
              {detail.hex} converts to {detail.rgbCss} and {detail.hslCss}. Its
              nearest Tailwind CSS token is{" "}
              <span className="font-mono text-white/85">
                {detail.tailwind.token}
              </span>
              {detail.usedBy.length > 0 ? (
                <>
                  {" "}
                  and it appears in{" "}
                  {detail.usedBy.length === 1
                    ? "one curated design style"
                    : `${detail.usedBy.length} curated design styles`}{" "}
                  in the StyleKit library.
                </>
              ) : (
                "."
              )}
            </p>
          </header>

          <section className="mb-12">
            <SectionHeading index="01" title="Conversions" />
            <div className="border-t border-white/10">
              <CopyValueRow label="hex" value={detail.hex} />
              <CopyValueRow label="rgb" value={detail.rgbCss} />
              <CopyValueRow label="hsl" value={detail.hslCss} />
              <CopyValueRow label="oklch" value={detail.oklchCss} />
              <CopyValueRow
                label="tailwind"
                value={
                  detail.tailwind.distance === 0
                    ? detail.tailwind.token
                    : `${detail.tailwind.token} (nearest, ${detail.tailwind.hex})`
                }
              />
            </div>
          </section>

          <section className="mb-12">
            <SectionHeading index="02" title="WCAG contrast" />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/15 text-left font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
                    <th className="py-2 pr-4 font-normal">Background</th>
                    <th className="py-2 pr-4 font-normal">Ratio</th>
                    <th className="py-2 pr-4 font-normal">AA text</th>
                    <th className="py-2 pr-4 font-normal">AA large</th>
                    <th className="py-2 font-normal">AAA text</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.contrast.map((reading) => (
                    <tr
                      key={reading.background}
                      className="border-b border-white/10 text-white/75"
                    >
                      <td className="py-3 pr-4 font-mono">
                        {reading.background}
                      </td>
                      <td className="py-3 pr-4 font-mono">
                        {reading.ratio.toFixed(2)}:1
                      </td>
                      <td className="py-3 pr-4 font-mono">
                        {reading.passesAaNormal ? "pass" : "fail"}
                      </td>
                      <td className="py-3 pr-4 font-mono">
                        {reading.passesAaLarge ? "pass" : "fail"}
                      </td>
                      <td className="py-3 font-mono">
                        {reading.passesAaaNormal ? "pass" : "fail"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-white/50">
              Ratios are computed from WCAG 2.x relative luminance. AA requires
              4.5:1 for normal text and 3:1 for large text; AAA requires 7:1.
            </p>
          </section>

          {detail.usedBy.length > 0 && (
            <section className="mb-12">
              <SectionHeading index="03" title="Design styles using this color" />
              <ul className="border-t border-white/10">
                {detail.usedBy.map((usage) => (
                  <li key={usage.slug}>
                    <LocalizedLink
                      href={`/styles/${usage.slug}`}
                      className="grid grid-cols-[1fr_auto] items-baseline gap-3 border-b border-white/10 py-4 transition-colors duration-150 hover:bg-white/[0.03] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
                    >
                      <span className="text-[15px] text-white/85">
                        {usage.nameEn}
                        <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                          {usage.role} · {usage.category}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-sm text-white/30"
                      >
                        →
                      </span>
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mb-12">
            <SectionHeading
              index={detail.usedBy.length > 0 ? "04" : "03"}
              title="Tints and shades"
            />
            <div className="grid grid-cols-4 gap-3 md:grid-cols-8 md:gap-4">
              {[...detail.tints].reverse().map((hex) => (
                <SwatchLink key={`tint-${hex}`} hex={hex} />
              ))}
              {detail.shades.map((hex) => (
                <SwatchLink key={`shade-${hex}`} hex={hex} />
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-white/50">
              Lightness ladder in HSL space, from the lightest tint to the
              darkest shade of {detail.hex}.
            </p>
          </section>

          {detail.neighbors.length > 0 && (
            <section className="mb-12">
              <SectionHeading
                index={detail.usedBy.length > 0 ? "05" : "04"}
                title="Similar colors in the library"
              />
              <div className="grid grid-cols-4 gap-3 md:grid-cols-8 md:gap-4">
                {detail.neighbors.map((neighbor) => (
                  <SwatchLink key={neighbor.hex} hex={neighbor.hex} />
                ))}
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-white/50">
                Nearest swatches by perceptual OKLab distance across all
                curated style palettes.
              </p>
            </section>
          )}

          <section className="mb-12">
            <SectionHeading
              index={detail.usedBy.length > 0 ? "06" : "05"}
              title="AI prompt snippet"
            />
            <div className="border border-white/10 bg-white/[0.02] p-5">
              <p className="font-mono text-sm leading-[1.8] text-white/75">
                {promptSnippet}
              </p>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-white/50">
              Paste this into ChatGPT, Claude, Cursor, or v0 to use {detail.hex}
              {" "}with correct contrast constraints.{" "}
              <Link
                href="/colors"
                className="text-[#7aa2ff] hover:text-white/90"
              >
                Browse all palette colors
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
