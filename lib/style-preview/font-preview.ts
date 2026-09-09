import { fontFamilies, fontFamilyKey, type PreviewFontFace } from "./preview-assets";

export interface PreviewFontResult {
  loaded: number;
  fallback: number;
}

/** Per-preview aliases prevent an extracted Inter/Geist face from replacing the
 * host app's font. Embedded bytes also avoid remote requests from community UI. */
export function installPreviewFonts(container: HTMLElement, fonts: PreviewFontFace[], scope: string) {
  const installed: FontFace[] = [];
  const restored: Array<{ element: HTMLElement; family: string }> = [];
  const aliases = new Map<string, string>();
  for (const font of fonts) {
    const family = fontFamilyKey(font.family);
    if (font.dataUrl && !aliases.has(family)) aliases.set(family, `sk-font-${scope}-${aliases.size}`);
  }
  const loads = fonts.map(async (font) => {
    if (!font.dataUrl || typeof FontFace === "undefined") return false;
    try {
      const face = new FontFace(aliases.get(fontFamilyKey(font.family))!, `url("${font.dataUrl}")`, {
        weight: font.weight ?? "normal",
        style: font.style ?? "normal",
        stretch: font.stretch ?? "normal",
        unicodeRange: font.unicodeRange ?? "U+0-10FFFF",
        display: "swap",
      });
      document.fonts.add(face);
      installed.push(face);
      await face.load();
      return true;
    } catch {
      return false;
    }
  });
  for (const element of container.querySelectorAll<HTMLElement>("[style]")) {
    const family = element.style.fontFamily;
    if (!family) continue;
    const stack = fontFamilies(family);
    if (!stack.some((name) => aliases.has(fontFamilyKey(name)))) continue;
    restored.push({ element, family });
    element.style.fontFamily = stack.map((name) => {
      const alias = aliases.get(fontFamilyKey(name));
      // Retain the original name as another fallback; fonts not included in the
      // extraction may already be installed on the reader's system.
      return alias ? `"${alias}", "${name.replace(/"/g, "")}"` : `"${name.replace(/"/g, "")}"`;
    }).join(", ");
    // CSS generic families must remain unquoted to keep their fallback meaning.
    element.style.fontFamily = element.style.fontFamily.replace(/"(serif|sans-serif|monospace|system-ui|ui-serif|ui-sans-serif|ui-monospace|ui-rounded|cursive|fantasy|math|emoji|fangsong|-apple-system|BlinkMacSystemFont)"/gi, "$1");
  }
  return {
    ready: Promise.all(loads).then((results): PreviewFontResult => ({
      loaded: results.filter(Boolean).length,
      fallback: results.filter((loaded) => !loaded).length,
    })),
    cleanup() {
      for (const face of installed) document.fonts.delete(face);
      for (const { element, family } of restored) element.style.fontFamily = family;
    },
  };
}
