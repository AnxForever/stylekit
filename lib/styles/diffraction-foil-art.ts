/**
 * Spectrum strip for the Diffraction Foil CSS fallback: t from -1.25 to 1.25, each stop
 * colored by the grating at |t| (groove period 1500 nm, orders 1-3 weighted 1, 0.5, 0.3,
 * CIE 1931 fit, ACES tone mapping). Silver shows through the black middle, where the
 * diffracted wavelengths fall below the visible range.
 */
export const DIFFRACTION_FOIL_SPECTRUM =
  "linear-gradient(90deg, #d2052d 0%, #dc463f 1.25%, #db8c4e 2.5%, #ceb557 3.75%, #abc75b 5%, #43ce5a 6.25%, #00cd57 7.5%, #00bd55 8.75%, #009562 10%, #005e8f 11.25%, #0417be 12.5%, #5504cc 13.75%, #b200cc 15%, #df00a7 16.25%, #eb6573 17.5%, #e8c479 18.75%, #cade7e 20%, #00e37b 21.25%, #00d777 22.5%, #00a09a 23.75%, #0022d8 25%, #6600e1 26.25%, #4200bb 27.5%, #01001e 28.75%, #000000 30%, #0a0301 31.25%, #cc0027 32.5%, #f7968e 33.75%, #e5f0af 35%, #00eca8 36.25%, #003ded 37.5%, #6d00dd 38.75%, #000000 40%, #000000 60%, #6d00dd 61.25%, #003ded 62.5%, #00eca8 63.75%, #e5f0af 65%, #f7968e 66.25%, #cc0027 67.5%, #0a0301 68.75%, #000000 70%, #01001e 71.25%, #4200bb 72.5%, #6600e1 73.75%, #0022d8 75%, #00a09a 76.25%, #00d777 77.5%, #00e37b 78.75%, #cade7e 80%, #e8c479 81.25%, #eb6573 82.5%, #df00a7 83.75%, #b200cc 85%, #5504cc 86.25%, #0417be 87.5%, #005e8f 88.75%, #009562 90%, #00bd55 91.25%, #00cd57 92.5%, #43ce5a 93.75%, #abc75b 95%, #ceb557 96.25%, #db8c4e 97.5%, #dc463f 98.75%, #d2052d 100%)";

const SILVER = {
  dark: "#4f4e59, #a3a2af 28%, #5e5d68 50%, #adacb9 76%, #575661",
  light: "#b4b3bf, #e9e8f0 30%, #bdbcc8 52%, #ecebf2 78%, #b6b5c1",
};

// Show the strip from `from` to `to` (fractions of its width) across the element.
function spectrumWindow(from: number, to: number) {
  const span = to - from;
  return { size: `${(100 / span).toFixed(1)}% 100%`, position: `${((100 * from) / (1 - span)).toFixed(1)}% 0` };
}

/**
 * Inline style for a still foil surface in static HTML previews, where neither globalCss
 * nor the lamp script runs. Grooves sit at `angle`; the strip window picks which bands show.
 */
export function foilPreviewStyle(tone: "dark" | "light", from: number, to: number, angle = 114): string {
  const strip = spectrumWindow(from, to);
  return [
    `background-image: radial-gradient(circle at 78% 0%, rgb(255 255 255 / 0.55), rgb(255 255 255 / 0) 150px), ${DIFFRACTION_FOIL_SPECTRUM.replace("90deg", `${angle}deg`)}, linear-gradient(${angle}deg, ${SILVER[tone]})`,
    `background-size: 100% 100%, ${strip.size}, 100% 100%`,
    `background-position: 0 0, ${strip.position}, 0 0`,
    "background-repeat: no-repeat",
    `background-blend-mode: screen, ${tone === "light" ? "overlay" : "screen"}, normal`,
  ].join("; ");
}

/**
 * Inline style for still foil type: vertical grooves, so the spectrum runs across the letters.
 * Small type needs a smaller `glow`, or the lamp highlight washes the whole word white.
 */
export function foilTextPreviewStyle(from: number, to: number, glow = 120): string {
  const strip = spectrumWindow(from, to);
  return [
    `background-image: radial-gradient(circle at 70% 0%, rgb(255 255 255 / 0.9), rgb(255 255 255 / 0) ${glow}px), ${DIFFRACTION_FOIL_SPECTRUM}, linear-gradient(#e2e1ea, #8f8e9b 55%, #cfced9)`,
    `background-size: 100% 100%, ${strip.size}, 100% 100%`,
    `background-position: 0 0, ${strip.position}, 0 0`,
    "background-repeat: no-repeat",
    "background-blend-mode: screen, screen, normal",
    "-webkit-background-clip: text",
    "background-clip: text",
    "color: transparent",
  ].join("; ");
}
