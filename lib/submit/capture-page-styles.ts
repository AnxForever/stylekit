import type { ExtractedComponent, ExtractedComponents } from "./extracted-design";
import type { PreviewFontFace } from "@/lib/style-preview/preview-assets";

export interface CapturedPageStyles {
  page: ExtractedComponent;
  components: ExtractedComponents;
  fonts?: PreviewFontFace[];
}

/**
 * Runs inside page.evaluate, before the vendor extractor scrolls or interacts.
 * Keep this function self-contained: only computed visual styles leave the page.
 */
export function capturePageStyles(): CapturedPageStyles {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true, colorSpace: "srgb" });
  const paintCache = new Map<string, string>();
  // Chromium resolves modern CSS colors (lab/oklch/display-p3) into the sRGB
  // palette required by submission manifests. Retain alpha for component code.
  const sampler = {
    color(value: string): string {
      if (!context || !value) return value;
      const cached = paintCache.get(value);
      if (cached) return cached;
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = "transparent";
      context.fillStyle = value;
      context.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
      const result = a === 255 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a / 255})`;
      paintCache.set(value, result);
      return result;
    },
    painted(value: string): boolean {
      const normalized = sampler.color(value);
      return Boolean(normalized) && normalized !== "transparent" && !/^rgba\(.+, 0\)$/.test(normalized);
    },
    styles(element: Element): Record<string, string> {
      const properties = [
        "backgroundColor", "backgroundImage", "color", "borderWidth", "borderStyle", "borderColor",
        "borderRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
        "boxShadow", "padding", "fontFamily", "fontSize", "fontWeight", "fontStyle", "fontStretch",
        "fontVariationSettings", "fontFeatureSettings", "lineHeight",
        "letterSpacing", "textTransform", "width", "height",
      ] as const;
      const computed = getComputedStyle(element);
      const styles: Record<string, string> = {};
      for (const key of properties) {
        styles[key] = key === "color" || key === "backgroundColor" ? sampler.color(computed[key]) : computed[key];
      }
      // Border shorthands can contain several modern colors; normalize each side
      // individually instead of treating a multi-color string as one paint.
      styles.borderColor = [computed.borderTopColor, computed.borderRightColor, computed.borderBottomColor, computed.borderLeftColor]
        .map(sampler.color).join(" ");
      if (computed.border) {
        styles.border = `${computed.borderTopWidth} ${computed.borderTopStyle} ${sampler.color(computed.borderTopColor)}`;
      }
      return styles;
    },
    visible(element: Element): element is HTMLElement {
      if (!(element instanceof HTMLElement)) return false;
      const rect = element.getBoundingClientRect();
      return rect.width >= 8 && rect.height >= 8 && rect.bottom > 0 && rect.right > 0 && rect.left < innerWidth &&
        element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
    },
    inViewport(element: Element): boolean {
      const rect = element.getBoundingClientRect();
      return rect.bottom > 0 && rect.right > 0 && rect.top < innerHeight && rect.left < innerWidth;
    },
    component(element: HTMLElement): ExtractedComponent {
      const path: string[] = [];
      let ancestor: Element | null = element;
      while (ancestor && path.length < 32) {
        const parent: Element | null = ancestor.parentElement;
        const index = parent ? Array.from(parent.children).indexOf(ancestor) + 1 : 1;
        path.unshift(`${ancestor.tagName.toLowerCase()}:nth-child(${index})`);
        ancestor = parent;
      }
      return { selector: path.join(" > "), styles: sampler.styles(element), inViewport: sampler.inViewport(element) };
    },
    hasSurface(element: HTMLElement): boolean {
      const style = getComputedStyle(element);
      return sampler.painted(style.backgroundColor) || style.boxShadow !== "none" ||
        /gradient\(/.test(style.backgroundImage) ||
        ["Top", "Right", "Bottom", "Left"].some((side) =>
          parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`)) > 0 &&
          sampler.painted(style.getPropertyValue(`border-${side.toLowerCase()}-color`)),
        );
    },
    candidates(selector: string): HTMLElement[] {
      return Array.from(document.querySelectorAll(selector)).slice(0, 600).filter(sampler.visible)
        .sort((a, b) => Number(sampler.inViewport(b)) - Number(sampler.inViewport(a)));
    },
  };

  // Vote on large painted ancestors across the viewport, so a small purple
  // illustration cannot become the background of an otherwise dark page.
  const grounds = new Map<HTMLElement, number>();
  for (const x of [0.08, 0.5, 0.92]) {
    for (const y of [0.18, 0.5, 0.82]) {
      let element = document.elementFromPoint(innerWidth * x, innerHeight * y);
      while (element) {
        if (element instanceof HTMLElement) {
          const rect = element.getBoundingClientRect();
          if (rect.width >= innerWidth * 0.6 && rect.height >= innerHeight * 0.5 &&
              sampler.painted(getComputedStyle(element).backgroundColor)) {
            grounds.set(element, (grounds.get(element) ?? 0) + 1);
            break;
          }
        }
        element = element.parentElement;
      }
    }
  }
  const ground = [...grounds].sort((a, b) => b[1] - a[1])[0]?.[0] ?? document.body;
  const pageStyles = sampler.styles(ground);
  if (context) {
    const layers: string[] = [];
    let ancestor: HTMLElement | null = ground;
    while (ancestor) {
      layers.unshift(getComputedStyle(ancestor).backgroundColor);
      ancestor = ancestor.parentElement;
    }
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 1, 1);
    for (const layer of layers) {
      context.fillStyle = layer;
      context.fillRect(0, 0, 1, 1);
    }
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    pageStyles.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }

  const buttons = sampler.candidates('button, a[href], [role="button"], input[type="submit"], input[type="button"]')
    .filter((element) => {
      const text = element instanceof HTMLInputElement ? element.value : element.innerText;
      if (!text.trim() || element.matches(':disabled, [aria-disabled="true"]') || element.closest('dialog, [aria-modal="true"]')) return false;
      const rect = element.getBoundingClientRect();
      if ((rect.width <= 40 && rect.height <= 40) || rect.height > 100 || rect.width > 600) return false;
      // Most primary actions are links. Ordinary navigation links are not
      // button samples: require a painted surface and button-like padding.
      if (element.matches("a")) {
        const style = getComputedStyle(element);
        return sampler.hasSurface(element) && parseFloat(style.paddingLeft) > 0 && rect.height >= 24;
      }
      return sampler.painted(getComputedStyle(element).color);
    }).slice(0, 20).map(sampler.component);
  const cards = sampler.candidates('article, [class*="card" i], [class*="panel" i]')
    .filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width >= 160 && rect.width < innerWidth * 0.85 && rect.height >= 80 && rect.height < innerHeight &&
        element.innerText.trim().length > 8 && sampler.hasSurface(element);
    }).slice(0, 20).map(sampler.component);
  const inputs = sampler.candidates('input:not([type]), input[type="text"], input[type="email"], input[type="search"], input[type="url"], input[type="tel"], input[type="password"], input[type="number"], textarea')
    .filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      // An unpainted text node needs its surrounding field wrapper to look like
      // an input. Omit it instead of presenting an unstyled or hidden editor.
      return rect.width >= 80 && rect.height >= 20 && sampler.painted(style.color) &&
        (sampler.hasSurface(element) || parseFloat(style.paddingTop) > 0);
    })
    .slice(0, 12).map(sampler.component);
  const headings = sampler.candidates("h1, h2, h3").filter((element) => element.innerText.trim().length > 0)
    .slice(0, 20).map(sampler.component);

  return {
    page: { styles: pageStyles },
    components: { button: buttons, card: cards, input: inputs, heading: headings },
  };
}
