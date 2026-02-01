interface ColorPaletteProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
}

export function ColorPalette({ colors }: ColorPaletteProps) {
  const allColors = [
    { name: "Primary", value: colors.primary },
    { name: "Secondary", value: colors.secondary },
    ...colors.accent.map((c, i) => ({ name: `Accent ${i + 1}`, value: c })),
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {allColors.map((color) => (
        <div key={color.value} className="group">
          <div
            className="aspect-square border border-border mb-2"
            style={{ backgroundColor: color.value }}
          />
          <p className="text-xs text-muted">{color.name}</p>
          <p className="text-xs font-mono">{color.value}</p>
        </div>
      ))}
    </div>
  );
}
