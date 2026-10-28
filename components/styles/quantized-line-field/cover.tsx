import { quantizedLineArtwork } from "@/lib/styles/quantized-line-field-art";

const widths = [0.38, 1.12, 2.28, 3.8];
const opacities = [0.15, 0.64, 0.93, 1];
const taglines = [["Think", "different."], ["Find your next", "possibility."], ["Accelerate", "the future."]];

export function QuantizedLineArtwork({ brand = "apple", className }: { brand?: "apple" | "google" | "tesla"; className?: string }) {
  const mark = quantizedLineArtwork.find((item) => item.id === brand)!;
  return (
    <svg viewBox="0 0 300 300" fill="none" aria-hidden="true" className={className}>
      {mark.paths.map((d, level) => <path key={level} d={d} stroke={mark.ink} strokeWidth={widths[level] * 5 / 5.25} opacity={opacities[level]} />)}
    </svg>
  );
}

export function QuantizedLineCover() {
  return (
    <svg viewBox="0 0 1200 630" className="h-full w-full" aria-hidden="true">
      <rect width="1200" height="630" fill="#fafaf8" />
      {quantizedLineArtwork.map((mark, index) => {
        const text = index === 0 ? "#202220" : "#f7faff";
        return (
          <g key={mark.id} transform={`translate(${40 + index * 380} 40)`}>
            <rect width="360" height="550" rx="17" fill={mark.background} />
            <text x="28" y="46" fill={text} fontFamily="Arial, Helvetica, sans-serif" fontSize="16">{mark.name}</text>
            <g transform="translate(30 96)">
              {mark.paths.map((d, level) => <path key={level} d={d} fill="none" stroke={mark.ink} strokeWidth={widths[level] * 5 / 5.25} opacity={opacities[level]} />)}
            </g>
            <text x="28" y="446" fill={text} fontFamily="Arial, Helvetica, sans-serif" fontSize="35" letterSpacing="-1">
              <tspan x="28">{taglines[index][0]}</tspan><tspan x="28" dy="36">{taglines[index][1]}</tspan>
            </text>
            <text x="28" y="521" fill={index === 1 ? "#bfd3ff" : index === 0 ? "#686b64" : "#adada7"} fontFamily="Arial, Helvetica, sans-serif" fontSize="12">Reveal the source →</text>
          </g>
        );
      })}
    </svg>
  );
}

export function QuantizedLineCardPreview() {
  return (
    <div className="relative w-full max-w-72 overflow-hidden rounded-[17px] bg-[#eeeeeb] p-6 text-[#202220]">
      <p className="font-sans text-sm">Apple</p>
      <QuantizedLineArtwork className="my-3 w-full" />
      <p className="font-sans text-3xl leading-none tracking-tight">Think different.</p>
    </div>
  );
}
