import type { BackgroundPattern } from "./index";

const PREVIEW_BACKGROUND_SIZE = "20px 20px";

export interface BackgroundPatternPresentation {
  style: {
    background: string;
    backgroundSize: string;
  };
  css: string;
  tailwind: string;
}

function toTailwindArbitraryValue(value: string): string {
  return value
    .replace(/url\("(data:[^"]+)"\)/g, "url($1)")
    .replace(/_/g, "\\_")
    .replace(/\s+/g, "_");
}

/** Keeps the preview and both copy formats aligned to the same background. */
export function getBackgroundPatternPresentation(
  background: Pick<BackgroundPattern, "css">,
): BackgroundPatternPresentation {
  const size = PREVIEW_BACKGROUND_SIZE;

  return {
    style: {
      background: background.css,
      backgroundSize: size,
    },
    css: `background: ${background.css};\nbackground-size: ${size};`,
    tailwind: `[background:${toTailwindArbitraryValue(background.css)}] [background-size:${size.replace(/\s+/g, "_")}]`,
  };
}
