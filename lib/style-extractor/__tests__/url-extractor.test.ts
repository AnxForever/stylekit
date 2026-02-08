import { describe, it, expect } from "vitest";
import { extractStyleDraftFromDocument } from "@/lib/style-extractor/url-extractor";

describe("url-extractor", () => {
  it("infers colors, typography, borders, and shadows from CSS variables", () => {
    const html = `
      <!doctype html>
      <html>
        <head>
          <title>Example Site</title>
          <meta name="description" content="Demo page" />
        </head>
        <body>
          <h1>Heading</h1>
          <div class="card">Card</div>
        </body>
      </html>
    `;

    const css = `
      :root {
        --primary: #112233;
        --secondary: hsl(0 100% 50%);
        --font-body: "Inter", system-ui, sans-serif;
        --font-heading: "Playfair Display", serif;
        --radius: 12px;
        --border-w: 2px;
        --shadow-md: 0 8px 20px rgba(0,0,0,0.12);
      }

      body {
        font-family: var(--font-body);
        background: var(--primary);
        color: var(--primary);
      }

      h1 {
        font-family: var(--font-heading);
        color: var(--secondary);
      }

      .btn {
        border-color: var(--primary);
      }

      .card {
        border-radius: var(--radius);
        border: var(--border-w) solid var(--primary);
        box-shadow: var(--shadow-md);
      }
    `;

    const result = extractStyleDraftFromDocument({
      url: "https://example.com",
      html,
      cssChunks: [css],
    });

    expect(result.draft.primaryColor).toBe("#112233");
    expect(result.draft.secondaryColor).toBe("#ff0000");
    expect(result.draft.bodyFont).toContain("Inter");
    expect(result.draft.headingFont).toContain("Playfair");
    expect(result.draft.borderRadius).toBe("12px");
    expect(result.draft.borderWidth).toBe("2px");
    expect(result.draft.shadowMd).toContain("rgba(");
    expect(result.evidence.cssVariableCount).toBeGreaterThan(0);
    expect(result.evidence.fontFamilyCount).toBeGreaterThan(0);
    expect(result.evidence.boxShadowCount).toBeGreaterThan(0);
  });
});

