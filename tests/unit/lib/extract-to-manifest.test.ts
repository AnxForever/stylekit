import { describe, expect, it } from "vitest";

import { extractedStyleToManifest, type ExtractedStyle } from "@/lib/submit/extract-to-manifest";
import { validateStyleSubmissionManifest } from "@/lib/submit/manifest-validator";
import { runStyleGates } from "@/lib/submission/gates/style-gates";

// Shaped exactly like the extractor's `stylekit.normalized` payload measured
// from a real site (linear.app): semantic roles plus a confidence-ranked palette.
const LINEAR_LIKE: ExtractedStyle = {
  name: "Linear – The system for product development",
  source: { url: "https://linear.app" },
  tokens: {
    colors: {
      semantic: { text: "#f7f8f8", background: "#5e6ad2" },
      palette: {
        "color-29": { value: "#f7f8f8", usage: ["text", "border"], confidence: "high" },
        "color-2": { value: "#ffffff", usage: ["text", "border"], confidence: "medium" },
        "color-1": { value: "#5e6ad2", usage: ["background"], confidence: "low" },
        "color-12": { value: "#8a8f98", usage: ["text", "border"], confidence: "high" },
      },
    },
    typography: {
      fontFamily: { primary: '"Inter Variable", Inter, sans-serif' },
      fontSize: { base: "16px", "2xl": "40px" },
    },
  },
};

// Reduced from the browser extractor: low-frequency CTA fills are absent from
// the palette, but remain present on the measured component.
const FIELD_NOTES = {
  name: "Field Notes — Creative tools",
  source: { url: "https://field-notes.example" },
  tokens: {
    colors: {
      semantic: { text: "#172c23", background: "#f3efe4" },
      palette: {
        text: { value: "#172c23", usage: ["text", "border"], confidence: "high" },
        background: { value: "#f3efe4", usage: ["background"], confidence: "low" },
        white: { value: "#ffffff", usage: ["text", "background"], confidence: "high" },
      },
    },
    typography: {
      fontFamily: { primary: "Georgia, serif" },
      fontSize: { xs: "16px", sm: "20px", base: "24px", lg: "64px" },
    },
  },
  components: {
    button: [{
      styles: {
        backgroundColor: "rgb(222, 91, 53)", color: "rgb(255, 255, 255)",
        border: "2px solid rgb(23, 44, 35)", borderRadius: "32px",
        boxShadow: "rgba(15, 23, 42, 0.28) 0px 20px 60px 0px",
        padding: "14px 24px", fontFamily: "Georgia, serif", fontSize: "16px",
      },
    }],
    card: [{ styles: {
      backgroundColor: "rgb(255, 255, 255)", color: "rgb(23, 44, 35)",
      fontFamily: "Georgia, serif", fontSize: "16px", padding: "32px",
      borderRadius: "32px", boxShadow: "rgba(15, 23, 42, 0.28) 0px 20px 60px 0px",
    } }],
    input: [{ styles: { color: "rgb(23, 44, 35)", padding: "14px", borderRadius: "32px" } }],
    heading: [{ styles: { fontFamily: "Georgia, serif", fontSize: "64px", lineHeight: "67.2px" } }],
  },
};

describe("extractedStyleToManifest", () => {
  it("uses the rendered page ground and body scale ahead of inferred palette semantics", () => {
    const { manifest } = extractedStyleToManifest({
      ...LINEAR_LIKE,
      page: { styles: {
        backgroundColor: "rgb(8, 9, 10)", color: "rgb(247, 248, 248)",
        fontFamily: '"Inter Variable", sans-serif', fontSize: "16px", lineHeight: "24px",
      } },
      components: { button: [
        { styles: { backgroundColor: "rgba(255, 255, 255, 0.02)", color: "#888", width: "28px", height: "28px" } },
        { inViewport: true, styles: { backgroundColor: "rgb(230, 230, 230)", color: "rgb(8, 9, 10)", width: "160px", height: "48px" } },
      ] },
    });
    expect(manifest.formData.background).toBe("#08090a");
    expect(manifest.formData.primaryColor).toBe("#e6e6e6");
    expect(manifest.formData.fontSizeBase).toBe("16px");
    expect(manifest.formData.lineHeightNormal).toBe("24px");
  });

  it("does not present an invisible editor overlay as a reusable input", () => {
    const result = extractedStyleToManifest({
      components: { input: [{ styles: {
        color: "rgba(0, 0, 0, 0)", backgroundColor: "rgba(0, 0, 0, 0)",
        width: "784px", height: "432px", fontSize: "14px",
      } }] },
    });
    expect(result.manifest.formData.inputCode).toBeUndefined();
    expect(result.needsReview).toContain("components");
  });

  it("keeps the measured action color even when the palette omits it", () => {
    const { manifest } = extractedStyleToManifest(FIELD_NOTES);
    expect(manifest.formData.primaryColor).toBe("#de5b35");
    expect(manifest.formData.secondaryColor).toBe("#ffffff");
    expect(manifest.formData.aiRules.join("\n")).toContain("#de5b35");
  });

  it("retains component shape, depth, spacing and the actual type hierarchy", () => {
    const { manifest } = extractedStyleToManifest(FIELD_NOTES);
    const f = manifest.formData;
    expect(f.bodyFont).toBe("Georgia, serif");
    // The extractor's sorted scale calls 24px `base`; the card inherits 16px.
    expect(f.fontSizeBase).toBe("16px");
    expect(f.fontSizeHeading).toBe("64px");
    expect(f.borderRadius).toBe("32px");
    for (const signal of ["32px", "20px 60px", "14px 24px", "64px"]) {
      expect(f.aiRules.join("\n")).toContain(signal);
    }
    expect(f.buttonCode).toContain("#de5b35");
    expect(f.cardCode).toContain("border-radius: 32px");
    expect(f.inputCode).toContain("padding: 14px");
    expect(validateStyleSubmissionManifest(manifest).ok).toBe(true);
  });

  it("distinguishes omitted zero radius and no shadow from rounded raised components", () => {
    const sharp = structuredClone(FIELD_NOTES);
    for (const component of [...sharp.components.button, ...sharp.components.card]) {
      Reflect.deleteProperty(component.styles, "borderRadius");
      Reflect.deleteProperty(component.styles, "boxShadow");
    }
    const flat = extractedStyleToManifest(sharp).manifest.formData;
    const rounded = extractedStyleToManifest(FIELD_NOTES).manifest.formData;
    expect(flat.aiRules).not.toEqual(rounded.aiRules);
    expect(flat.buttonCode).toContain("border-radius: 0px");
    expect(flat.buttonCode).toContain("box-shadow: none");
  });

  it("keeps a monochrome action instead of picking a decorative saturated color", () => {
    const result = extractedStyleToManifest({
      tokens: { colors: {
        semantic: { background: "#ffffff", text: "#111111" },
        palette: { decoration: { value: "#ff0000", usage: ["border"] } },
      } },
      components: { button: [
        { styles: { backgroundColor: "rgba(0, 0, 0, 0)", color: "#111111" } },
        { styles: { backgroundColor: "rgb(17 17 17 / 100%)", color: "#ffffff" } },
      ] },
    });
    expect(result.manifest.formData.primaryColor).toBe("#111111");
  });

  it("does not mistake transparent or invisible buttons for a primary fill", () => {
    const result = extractedStyleToManifest({
      tokens: { colors: {
        semantic: { background: "#fff", text: "#111" },
        palette: { link: { value: "#0070f3", usage: ["link"] } },
      } },
      components: { button: [
        { styles: { backgroundColor: "rgba(0, 0, 0, 0)" } },
        { styles: { backgroundColor: "#ff0000", display: "none" } },
      ] },
    });
    expect(result.manifest.formData.primaryColor).toBe("#0070f3");
  });

  it("does not put remote resources or page positioning into reusable component samples", () => {
    const site = structuredClone(FIELD_NOTES);
    Object.assign(site.components.button[0].styles, {
      backgroundImage: 'url("https://tracking.example/pixel")',
      position: "fixed", width: "100vw", zIndex: "999999",
      fontFamily: 'Georgia; background-image: url("https://tracking.example/pixel")',
    });
    const code = extractedStyleToManifest(site).manifest.formData.buttonCode;
    expect(code).toContain("#de5b35");
    expect(code).not.toMatch(/tracking\.example|position:|100vw|999999/);
  });


  it("maps semantic colors, cleans the name, and slugifies", () => {
    const { manifest } = extractedStyleToManifest(LINEAR_LIKE);
    const f = manifest.formData;

    expect(f.name).toBe("Linear"); // tagline after the en-dash dropped
    expect(f.slug).toBe("linear");
    expect(f.background).toBe("#5e6ad2");
    expect(f.foreground).toBe("#f7f8f8");
    // The brand indigo is the most chromatic hue, so it becomes primary even
    // though it was captured as the background — not the gray palette entry.
    expect(f.primaryColor).toBe("#5e6ad2");
    // Every core color is a valid hex.
    for (const hex of [f.primaryColor, f.secondaryColor, f.background, f.foreground]) {
      expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("synthesizes at least three concrete AI rules from real tokens", () => {
    const { manifest } = extractedStyleToManifest(LINEAR_LIKE);
    const rules = manifest.formData.aiRules;

    expect(rules.length).toBeGreaterThanOrEqual(3);
    expect(rules.join("\n")).toContain("#5e6ad2"); // background named
    expect(rules.some((r) => r.includes("Inter"))).toBe(true); // typeface named
  });

  it("takes the brand name from the shortest title segment and the saturated brand color", () => {
    const { manifest } = extractedStyleToManifest({
      name: "Agentic Infrastructure - Vercel",
      source: { url: "https://vercel.com" },
      tokens: {
        colors: {
          semantic: { background: "#ffffff", text: "#000000" },
          palette: { c1: { value: "#0070f3", usage: ["link"], confidence: "high" } },
        },
      },
    });
    // Brand name is "Vercel", not the longer leading phrase.
    expect(manifest.formData.name).toBe("Vercel");
    // The saturated blue is the brand color, not black text or white background.
    expect(manifest.formData.primaryColor).toBe("#0070f3");
  });

  it("keeps in-word hyphens in a single-segment name", () => {
    const { manifest } = extractedStyleToManifest({
      name: "Neo-Brutalist",
      source: { url: "https://example.com" },
      tokens: { colors: { semantic: {}, palette: {} } },
    });
    expect(manifest.formData.name).toBe("Neo-Brutalist");
  });

  it("flags machine-unknowable fields for review", () => {
    const { needsReview } = extractedStyleToManifest(LINEAR_LIKE);
    expect(needsReview).toContain("name");
    expect(needsReview).toContain("category");
    expect(needsReview).toContain("description");
  });

  it("honors explicit overrides and does not flag them", () => {
    const { manifest, needsReview } = extractedStyleToManifest(LINEAR_LIKE, {
      name: "Aurora",
      category: "expressive",
      description: "A vivid indigo product UI with high-contrast type.",
    });
    expect(manifest.formData.name).toBe("Aurora");
    expect(manifest.formData.category).toBe("expressive");
    expect(needsReview).not.toContain("name");
    expect(needsReview).not.toContain("category");
    expect(needsReview).not.toContain("description");
  });

  it("produces a manifest the shared validator accepts", () => {
    const { manifest } = extractedStyleToManifest(LINEAR_LIKE);
    const parsed = validateStyleSubmissionManifest(manifest);
    expect(parsed.ok).toBe(true);
  });

  it("clears every blocking submission gate (slug clash aside)", async () => {
    const { manifest } = extractedStyleToManifest(LINEAR_LIKE, { slug: "linear-extracted-demo" });
    const report = await runStyleGates(manifest, { slugTaken: false });
    const blockingFails = report.gates.filter((g) => g.severity === "blocking" && !g.passed);
    expect(blockingFails.map((g) => `${g.id}: ${g.detail}`)).toEqual([]);
  });

  it("falls back to safe neutrals when there is no usable color signal", () => {
    const { manifest, needsReview } = extractedStyleToManifest({
      name: "Bare",
      source: { url: "https://bare.example" },
      tokens: { colors: { palette: {} } },
    });
    const f = manifest.formData;
    for (const hex of [f.primaryColor, f.secondaryColor, f.background, f.foreground]) {
      expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    }
    expect(needsReview).toContain("colors");
  });
});
