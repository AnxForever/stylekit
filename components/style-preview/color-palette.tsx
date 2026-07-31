import { LocalizedLink } from "@/components/i18n/localized-link";

interface ColorPaletteProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
}

const HEX_RE = /^#[0-9a-f]{6}$/i;

export function ColorPalette({ colors }: ColorPaletteProps) {
  const allColors = [
    { name: "Primary", value: colors.primary },
    { name: "Secondary", value: colors.secondary },
    ...colors.accent.map((c, i) => ({ name: `Accent ${i + 1}`, value: c })),
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
      {allColors.map((color, index) => {
        const isLinkable = HEX_RE.test(color.value);
        const swatch = (
          <>
            <div
              className="aspect-square border border-border mb-2"
              style={{ backgroundColor: color.value }}
            />
            <p className="text-xs text-muted">{color.name}</p>
            <p className="text-xs font-mono">{color.value}</p>
          </>
        );

        return (
          <div
            key={`${color.name}-${color.value}-${index}`}
            className={`group ${index >= 4 ? "hidden sm:block" : ""}`}
          >
            {isLinkable ? (
              <LocalizedLink
                href={`/colors/${color.value.slice(1).toLowerCase()}`}
                className="block hover:opacity-80 transition-opacity"
                aria-label={`${color.value} color details`}
              >
                {swatch}
              </LocalizedLink>
            ) : (
              swatch
            )}
          </div>
        );
      })}
    </div>
  );
}
