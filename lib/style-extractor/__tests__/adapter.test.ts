import { parseStyleExtractorInput } from "@/lib/style-extractor/adapter";

describe("style-extractor adapter", () => {
  it("parses nested JSON output", () => {
    const input = JSON.stringify({
      style: {
        name: "Neo Grid",
        nameEn: "Neo Grid",
        description: "A clean dashboard layout style with subtle depth.",
        category: "modern",
        styleType: "layout",
        tags: ["modern", "responsive"],
        colors: {
          primary: "#111111",
          secondary: "#f4f4f4",
          accent: ["#5b8cff", "#43d9ad"],
        },
        philosophy: "Prioritize hierarchy and high information density.",
        doList: ["Use strict spacing scale", "Keep typography compact"],
        dontList: ["Avoid decorative gradients"],
      },
      components: {
        button: { code: "<button className=\"px-4 py-2\">Save</button>" },
        card: { code: "<div className=\"border p-4\">Card</div>" },
      },
      keywords: ["dashboard", "b2b", "analytics"],
      slug: "neo-grid",
    });

    const result = parseStyleExtractorInput(input);

    expect(result.ok).toBe(true);
    expect(result.source).toBe("json");
    expect(result.data?.slug).toBe("neo-grid");
    expect(result.data?.styleType).toBe("layout");
    expect(result.data?.category).toBe("modern");
    expect(result.data?.primaryColor).toBe("#111111");
    expect(result.data?.secondaryColor).toBe("#f4f4f4");
    expect(result.data?.accentColors).toEqual(["#5b8cff", "#43d9ad"]);
    expect(result.data?.buttonCode).toContain("Save");
    expect(result.data?.cardCode).toContain("Card");
  });

  it("parses markdown output with rules and components", () => {
    const input = `
# Aurora Motion

Modern motion-first interface style for SaaS onboarding flows.

Keywords: motion, micro-interaction, onboarding

## Design Philosophy
- Motion should clarify user intent.

## Do List
- Use spring transitions for panel changes
- Keep animation duration between 200ms and 400ms

## Don't List
- Avoid long blocking animations

Primary: #0f172a
Secondary: #f8fafc
Accent: #22d3ee

### Button
\`\`\`tsx
<button className="bg-cyan-400 text-slate-900 px-4 py-2">Continue</button>
\`\`\`

### Card
\`\`\`tsx
<div className="rounded-xl border border-slate-700/40 p-6">Card</div>
\`\`\`

### Input
\`\`\`tsx
<input className="border border-cyan-300/40 px-3 py-2" />
\`\`\`
`;

    const result = parseStyleExtractorInput(input);

    expect(result.ok).toBe(true);
    expect(result.source).toBe("markdown");
    expect(result.data?.name).toBe("Aurora Motion");
    expect(result.data?.styleType).toBe("animation");
    expect(result.data?.primaryColor).toBe("#0f172a");
    expect(result.data?.secondaryColor).toBe("#f8fafc");
    expect(result.data?.accentColors).toEqual(["#22d3ee"]);
    expect(result.data?.keywords).toEqual(["motion", "micro-interaction", "onboarding"]);
    expect(result.data?.doList).toContain("Use spring transitions for panel changes");
    expect(result.data?.dontList).toContain("Avoid long blocking animations");
    expect(result.data?.buttonCode).toContain("Continue");
    expect(result.data?.inputCode).toContain("input");
  });

  it("parses style-extractor-dev export schema (tokens.colors.semantic)", () => {
    const input = JSON.stringify({
      $schema: "https://stylekit.dev/schema/style-collection-v1.json",
      version: "1.0.0",
      meta: {
        id: "example-com",
        name: "Example Site",
        description: "Style extracted from example.com",
        source: {
          url: "https://example.com",
          domain: "example.com",
          extractedAt: "2026-02-07T00:00:00.000Z",
        },
        tags: ["responsive", "grid-layout"],
        thumbnail: null,
      },
      tokens: {
        colors: {
          semantic: {
            primary: "#123456cc",
            secondary: "#abcdef",
            accent: "rgb(255 0 102 / 0.9)",
          },
          palette: {
            "color-0": "#123456cc",
            "color-1": "#abcdef",
            "color-2": "#ff0066",
          },
        },
      },
      structure: {},
      components: {},
      code: {},
      evidence: {},
    });

    const result = parseStyleExtractorInput(input);

    expect(result.ok).toBe(true);
    expect(result.source).toBe("json");
    expect(result.data?.name).toBe("Example Site");
    expect(result.data?.slug).toBe("example-site");
    expect(result.data?.description).toBe("Style extracted from example.com");
    // Alpha channel is dropped for <input type="color"> compatibility.
    expect(result.data?.primaryColor).toBe("#123456");
    expect(result.data?.secondaryColor).toBe("#abcdef");
    expect(result.data?.accentColors).toEqual(["#ff0066"]);
  });

  it("normalizes hsl/oklch and resolves cssVariables var() references", () => {
    const input = JSON.stringify({
      name: "Vars Site",
      cssVariables: {
        "--primary": "hsl(0 100% 50%)",
        "--secondary": "oklch(100% 0 0)",
      },
      primaryColor: "var(--primary)",
      secondaryColor: "var(--secondary)",
      accentColors: ["oklch(0% 0 0)"],
    });

    const result = parseStyleExtractorInput(input);

    expect(result.ok).toBe(true);
    expect(result.source).toBe("json");
    expect(result.data?.primaryColor).toBe("#ff0000");
    expect(result.data?.secondaryColor).toBe("#ffffff");
    expect(result.data?.accentColors).toEqual(["#000000"]);
  });

  it("returns error for empty input", () => {
    const result = parseStyleExtractorInput("   ");

    expect(result.ok).toBe(false);
    expect(result.error).toBeTruthy();
  });
});
