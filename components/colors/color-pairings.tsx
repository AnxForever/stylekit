import { LocalizedLink } from "@/components/i18n/localized-link";
import { CopyValueRow } from "@/components/colors/copy-value-row";
import { type ColorDetail } from "@/lib/styles/color-detail";
import { getActualColorPairings, getPreferredTextColor } from "@/lib/seo/color-detail-content";

export function ColorPairings({ detail }: { detail: ColorDetail }) {
  const pairings = getActualColorPairings(detail.hex);
  const text = getPreferredTextColor(detail);
  return (
    <section aria-labelledby="color-pairings-title" className="mb-12">
      <h2 id="color-pairings-title" className="mb-3 text-xl text-white/90 md:text-2xl">Colors paired with {detail.hex} in real UI palettes</h2>
      <p className="mb-6 max-w-2xl text-sm leading-7 text-white/65">These colors appear alongside {detail.hex} in StyleKit&apos;s curated palettes. Co-occurrence is not a promise of text readability; each pair includes its measured contrast.</p>
      <ul className="divide-y divide-white/10 border-y border-white/10">
        {pairings.map((pair) => (
          <li key={pair.hex} className="flex flex-wrap items-start gap-4 py-5">
            <span aria-hidden="true" className="flex h-12 w-20 shrink-0 overflow-hidden border border-white/20">
              <span className="w-1/2" style={{ backgroundColor: detail.hex }} /><span className="w-1/2" style={{ backgroundColor: pair.hex }} />
            </span>
            <div className="min-w-0 flex-1">
              <LocalizedLink href={`/colors/${pair.hex.slice(1)}`} className="font-mono text-sm text-white/90 underline-offset-4 hover:underline">{pair.hex}</LocalizedLink>
              <p className="mt-1 text-xs leading-6 text-white/65">Used together in {pair.styles.slice(0, 2).map((style, index) => <span key={style.slug}>{index > 0 ? ", " : ""}<LocalizedLink href={`/styles/${style.slug}`} className="underline underline-offset-4">{style.name}</LocalizedLink></span>)}{pair.styles.length > 2 ? ` and ${pair.styles.length - 2} more styles` : ""}.</p>
            </div>
            <p className="text-xs leading-6 text-white/75"><span className="font-mono">{pair.contrast.toFixed(2)}:1</span><br />{pair.passesNormalText ? "AA normal text" : "Not for normal text"}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 border border-white/15 p-5" style={{ backgroundColor: detail.hex, color: text.hex }}>
        <p className="font-sans text-base font-medium">A readable starting point</p>
        <p className="mt-2 text-sm leading-6">{text.name} text on {detail.hex}: {text.ratio.toFixed(2)}:1 contrast.</p>
      </div>
      <CopyValueRow label="CSS pair" value={`background-color: ${detail.hex}; color: ${text.hex};`} />
      <CopyValueRow label="Tailwind exact" value={`bg-[${detail.hex}] text-[${text.hex}]`} />
    </section>
  );
}
