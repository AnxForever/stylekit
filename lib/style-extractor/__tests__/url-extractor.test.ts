import {
  extractStyleDraftFromDocument,
  extractStylesheetLinks,
} from "@/lib/style-extractor/url-extractor";

describe("url style extractor", () => {
  it("extracts stylesheet links with absolute resolution", () => {
    const html = `
      <html>
        <head>
          <link rel="stylesheet" href="/assets/main.css" />
          <link rel="preload" href="/fonts.woff2" />
          <link rel="stylesheet" href="https://cdn.example.com/ui.css" />
        </head>
      </html>
    `;

    const links = extractStylesheetLinks(html, "https://demo.example.com/path");

    expect(links).toEqual([
      "https://demo.example.com/assets/main.css",
      "https://cdn.example.com/ui.css",
    ]);
  });

  it("builds a usable draft from html and css evidence", () => {
    const html = `
      <html>
        <head>
          <title>Aurora Dashboard</title>
          <meta name="description" content="Modern analytics workspace with motion feedback." />
          <style>
            :root { --bg: #0f172a; --surface: #f8fafc; --accent: #22d3ee; }
            .panel { display: grid; grid-template-columns: 1fr 1fr; }
            .hero { animation: fade-in 300ms ease; }
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          </style>
        </head>
        <body>
          <h1>Analytics Workspace</h1>
        </body>
      </html>
    `;

    const result = extractStyleDraftFromDocument({
      url: "https://product.example.com",
      html,
      cssChunks: [".card { border: 1px solid #0f172a; background: #f8fafc; }"],
    });

    expect(result.draft.nameEn).toBe("Aurora Dashboard");
    expect(result.draft.slug).toBe("aurora-dashboard");
    expect(result.draft.styleType).toBe("animation");
    expect(result.draft.primaryColor).toBe("#0f172a");
    expect(result.draft.secondaryColor).toBe("#f8fafc");
    expect(result.draft.accentColors).toContain("#22d3ee");
    expect(result.draft.doList?.length).toBeGreaterThan(0);
    expect(result.draft.buttonCode).toContain("<button");
    expect(result.raw).toContain("## Do List");
    expect(result.evidence.hasAnimation).toBe(true);
    expect(result.evidence.hasGridLayout).toBe(true);
  });
});
