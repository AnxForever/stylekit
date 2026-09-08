import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { beginEnhancementCapture } from "../../services/style-extract/src/capture-enhancements";
import { componentCodeWithAssets } from "../../lib/style-preview/motion-css";
import { capturePageStyles } from "../../lib/submit/capture-page-styles";
import { extractedStyleToManifest } from "../../lib/submit/extract-to-manifest";

// No external sites or extraction service: exercise computed styles in a real
// browser, including colors and visibility APIs that a DOM mock cannot model.
test("extracts the page ground and a link action without hidden UI samples", async ({ page }) => {
  await page.setContent(`<!doctype html><html><head><style>
    body { margin: 0; background: #08090a; color: #f7f8f8; font: 16px/24px Georgia, serif; }
    main { min-height: 100vh; padding: 48px; }
    .action { display: inline-flex; align-items: center; height: 44px; padding: 0 20px;
      background: #e5e5e6; color: #08090a; border: 1px solid #e5e5e6; border-radius: 9999px; }
    .icon { width: 28px; height: 28px; background: purple; }
    .hidden { opacity: 0; }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; }
    textarea { color: transparent; background: transparent; }
  </style></head><body><main>
    <h1>Product workspace</h1><a href="/start" class="action">Get started</a>
    <button class="icon" aria-label="Settings"><svg width="16" height="16"></svg></button>
    <div class="hidden"><input placeholder="Hidden input"></div>
    <input class="sr-only" aria-label="Keyboard helper"><textarea aria-label="Editor overlay"></textarea>
  </main></body></html>`);

  const captured = await page.evaluate(capturePageStyles);
  const { manifest } = extractedStyleToManifest({
    ...captured,
    tokens: { colors: { semantic: { background: "#5e6ad2" } } },
  });
  expect(manifest.formData.background).toBe("#08090a");
  expect(manifest.formData.primaryColor).toBe("#e5e5e6");
  expect(manifest.formData.bodyFont).toBe("Georgia, serif");
  expect(manifest.formData.fontSizeBase).toBe("16px");
  expect(manifest.formData.buttonCode).toContain("border-radius: 9999px");
  expect(captured.components.button).toHaveLength(1);
  expect(captured.components.input).toHaveLength(0);
  expect(manifest.formData.inputCode).toBeUndefined();
});

test("resolves modern CSS paint and keeps a black primary action ahead of demo colors", async ({ page }) => {
  await page.setContent(`<!doctype html><html><head><style>
    body { margin: 0; background: oklch(1 0 0); color: lab(0 0 0); font: 16px/24px sans-serif; }
    main { padding: 48px; min-height: 100vh; }
    .action { display: inline-block; padding: 8px 16px; background: lab(0 0 0);
      color: oklch(1 0 0); border-radius: 32px; }
    .demo { margin-top: 120vh; background: #f6339a; color: white; padding: 8px 12px; }
  </style></head><body><main>
    <h1>Build something</h1><a class="action" href="/start">Get started</a>
    <div><button class="demo">Demo action</button></div>
  </main></body></html>`);

  const captured = await page.evaluate(capturePageStyles);
  const { manifest } = extractedStyleToManifest(captured);
  expect(manifest.formData.background).toBe("#ffffff");
  expect(manifest.formData.foreground).toBe("#000000");
  expect(manifest.formData.primaryColor).toBe("#000000");
  expect(manifest.formData.buttonCode).toContain("border-radius: 32px");
  expect(manifest.formData.buttonCode).toContain("background-color: #000000");
  expect(manifest.formData.buttonCode).not.toContain("#f6339a");
});


test("retains a CDN font, measured interaction states and reduced-motion-safe keyframes", async ({ page }) => {
  const font = await readFile("node_modules/next/dist/next-devtools/server/font/geist-latin.woff2");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("https://assets.example.test/**", (route) => route.fulfill(
    route.request().url().endsWith(".woff2")
      ? { body: font, contentType: "font/woff2", headers: { "Access-Control-Allow-Origin": "*" } }
      : { contentType: "text/css", body: '@font-face {font-family:"Captured Face";src:url(./face.woff2);font-weight:100 900;font-display:swap}' },
  ));
  await page.route("https://sample.example.test/", (route) => route.fulfill({ contentType: "text/html", body: `<!doctype html>
    <link rel="stylesheet" href="https://assets.example.test/fonts.css">
    <style>
      body {margin:0;padding:48px;background:white;color:black;font:16px "Captured Face","Unused Fallback",sans-serif}
      button {font:500 18px "Captured Face","Unused Fallback",sans-serif;background:#111;color:white;padding:12px 24px;border:0;
        transition:transform .3s ease,background-color .2s linear}
      button:hover {transform:translateY(-4px);background-color:#0044cc}
      button:active {transform:scale(.95)}
      button:focus-visible {outline:3px solid #cc3300;outline-offset:4px}
      article {width:280px;padding:24px;min-height:90px;background:#eee;margin-top:32px}
      article:focus-visible {outline:2px solid #0044cc;outline-offset:4px}
      @media(prefers-reduced-motion:no-preference) {article {animation:soft-pulse 1.2s ease-in-out infinite alternate}}
      @keyframes soft-pulse {from {opacity:.4;transform:translateY(0)} to {opacity:1;transform:translateY(-8px)}}
    </style><h1>Measured interface</h1><button>Continue</button><article tabindex="0">A sample card with a measured animation.</article>` }));
  const enhancements = await beginEnhancementCapture(page);
  await page.goto("https://sample.example.test/", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  // The stylesheet is opaque to ordinary DOM extraction, but the browser has
  // loaded its face and can report which font file actually supplied the glyphs.
  expect(await page.evaluate(() => {
    try { return Boolean(document.styleSheets[0].cssRules); } catch { return false; }
  })).toBe(false);
  const captured = await page.evaluate(capturePageStyles);
  await enhancements.capture(captured);
  await enhancements.stop();
  const { manifest, needsReview } = extractedStyleToManifest(captured, { url: "https://sample.example.test/" });
  const assets = manifest.formData.previewAssets!;
  expect(assets.fonts).toHaveLength(1);
  expect(assets.fonts?.[0]).toMatchObject({ family: "Captured Face", weight: "100 900", sourceUrl: "https://assets.example.test/face.woff2" });
  expect(assets.fonts?.[0].dataUrl).toMatch(/^data:font\/woff2;base64,/);
  expect(needsReview).not.toContain("fonts");
  expect(assets.motion?.button?.transition?.duration).toBe("0.3s, 0.2s");
  expect(assets.motion?.button?.states?.hover?.transform).toBe("matrix(1, 0, 0, 1, 0, -4)");
  expect(assets.motion?.button?.states?.focus?.outlineWidth).toBe("3px");
  expect(assets.motion?.card?.animations?.[0]).toMatchObject({ duration: 1200, iterations: "infinite", direction: "alternate" });
  expect(assets.motion?.card?.animations?.[0].keyframes).toHaveLength(2);
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  expect(await page.locator("button").evaluate((element) => element.style.cssText)).toBe("");

  // Exported code is independently usable under the site's restrictive CSP,
  // without another request to the source or stylesheet/font origins.
  const code = componentCodeWithAssets(manifest.formData.buttonCode!, assets, "button");
  await page.unrouteAll();
  let requests = 0;
  await page.route("**/*", (route) => { requests += 1; return route.abort(); });
  await page.setContent(`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; font-src data:">${code}`);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => Array.from(document.fonts).some((font) => font.family === "Captured Face" && font.status === "loaded"))).toBe(true);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator("button").hover();
  await expect(page.locator("button")).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -4)");
  await expect(page.locator("button")).toHaveCSS("background-color", "rgb(0, 68, 204)");
  await page.mouse.move(700, 400);
  await expect(page.locator("button")).toHaveCSS("transform", "none");
  await page.locator("button").focus();
  await expect(page.locator("button")).toHaveCSS("outline-width", "3px");
  expect(requests).toBe(0);

  await page.setContent(componentCodeWithAssets(manifest.formData.cardCode!, assets, "card"));
  expect(await page.locator("article").evaluate((element) => element.getAnimations().length)).toBe(1);
  await expect(page.locator("article")).toHaveAttribute("tabindex", "0");
  await page.keyboard.press("Tab");
  await expect(page.locator("article")).toBeFocused();
  await expect(page.locator("article")).toHaveCSS("outline-width", "2px");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("article")).toHaveCSS("animation-name", "none");
});
