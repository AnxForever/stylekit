import JSZip from "jszip";
import { SHOWCASE_DOWNLOAD_REVEAL_STYLE } from "@/lib/export/showcase-html";

const MAX_ASSETS = 80;
const MAX_ASSET_BYTES = 8 * 1024 * 1024;

export interface ShowcasePackageResult {
  blob: Blob;
  bundledAssetCount: number;
  externalAssetCount: number;
}

function resolveResource(value: string | null, baseUrl: string): URL | null {
  const raw = value?.trim();
  if (!raw || raw.startsWith("#") || /^(data|blob|javascript|mailto|tel):/i.test(raw)) {
    return null;
  }

  try {
    const url = new URL(raw, baseUrl);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function isSameOrigin(url: URL, origin: string): boolean {
  return url.origin === origin;
}

function safeAssetName(value: string, fallback: string): string {
  const basename = value.split("/").pop() || fallback;
  const cleaned = basename.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned.slice(0, 96) || fallback;
}

function cssUrlReference(assetPath: string): string {
  return assetPath.split("/").pop() || assetPath;
}

async function rewriteCssUrls(
  css: string,
  cssBaseUrl: string,
  addBinaryAsset: (url: URL, fallbackName: string) => Promise<string | null>,
  onExternalResource: (url: URL) => void,
): Promise<string> {
  const matcher = /url\(\s*(["']?)([^)"']+)\1\s*\)/gi;
  let output = "";
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(css))) {
    output += css.slice(cursor, match.index);
    const resource = resolveResource(match[2], cssBaseUrl);
    if (!resource || !isSameOrigin(resource, new URL(cssBaseUrl).origin)) {
      if (resource) onExternalResource(resource);
      output += match[0];
    } else {
      const assetPath = await addBinaryAsset(resource, "asset");
      output += assetPath
        ? `url("${cssUrlReference(assetPath)}")`
        : match[0];
    }
    cursor = match.index + match[0].length;
  }

  return output + css.slice(cursor);
}

/**
 * Builds a ZIP that can be opened locally without Next.js or React runtime.
 * Same-origin stylesheets, fonts, images, and media are bundled; external
 * resources remain absolute URLs and are documented in README.md.
 */
export async function buildShowcasePackage(
  html: string,
  origin: string,
): Promise<ShowcasePackageResult> {
  const document = new DOMParser().parseFromString(html, "text/html");
  const zip = new JSZip();
  const assetPaths = new Map<string, string | null>();
  const externalResources = new Set<string>();
  let assetIndex = 0;

  const reserveAsset = (url: URL, fallbackName: string): string | null => {
    const key = url.href;
    const existing = assetPaths.get(key);
    if (existing !== undefined) return existing;
    if (assetIndex >= MAX_ASSETS) {
      assetPaths.set(key, null);
      return null;
    }

    const path = `assets/${String(assetIndex++).padStart(3, "0")}-${safeAssetName(
      url.pathname,
      fallbackName,
    )}`;
    assetPaths.set(key, path);
    return path;
  };

  const addBinaryAsset = async (url: URL, fallbackName: string): Promise<string | null> => {
    const path = reserveAsset(url, fallbackName);
    if (!path) return null;

    try {
      const response = await fetch(url.href, { credentials: "omit" });
      if (!response.ok) throw new Error(`asset ${response.status}`);
      const contentLength = Number(response.headers.get("content-length") || 0);
      if (contentLength > MAX_ASSET_BYTES) throw new Error("asset too large");
      const data = await response.arrayBuffer();
      if (data.byteLength > MAX_ASSET_BYTES) throw new Error("asset too large");
      zip.file(path, data);
      return path;
    } catch {
      assetPaths.set(url.href, null);
      return null;
    }
  };

  const addStylesheet = async (url: URL): Promise<string | null> => {
    const path = reserveAsset(url, "style.css");
    if (!path) return null;

    try {
      const response = await fetch(url.href, { credentials: "omit" });
      if (!response.ok) throw new Error(`stylesheet ${response.status}`);
      const css = await response.text();
      const rewritten = await rewriteCssUrls(
        css,
        url.href,
        addBinaryAsset,
        (resource) => externalResources.add(resource.href),
      );
      zip.file(path, rewritten);
      return path;
    } catch {
      assetPaths.set(url.href, null);
      return null;
    }
  };

  for (const script of Array.from(document.querySelectorAll("script"))) {
    script.remove();
  }
  for (const preload of Array.from(
    document.querySelectorAll('link[rel="modulepreload"], link[rel="preload"]'),
  )) {
    preload.remove();
  }

  const revealStyle = document.createElement("style");
  revealStyle.dataset.stylekitShowcaseDownload = "true";
  revealStyle.textContent = SHOWCASE_DOWNLOAD_REVEAL_STYLE;
  document.head.append(revealStyle);

  for (const link of Array.from(document.querySelectorAll('link[rel="stylesheet"]'))) {
    const url = resolveResource(link.getAttribute("href"), origin);
    if (!url) continue;
    if (isSameOrigin(url, origin)) {
      const localPath = await addStylesheet(url);
      if (localPath) link.setAttribute("href", localPath);
    } else {
      externalResources.add(url.href);
    }
  }

  for (const style of Array.from(document.querySelectorAll("style"))) {
    if (style === revealStyle || !style.textContent) continue;
    style.textContent = await rewriteCssUrls(
      style.textContent,
      origin,
      addBinaryAsset,
      (resource) => externalResources.add(resource.href),
    );
  }

  for (const element of Array.from(
    document.querySelectorAll("img[src], source[src], video[poster], video[src], audio[src]"),
  )) {
    for (const attribute of ["src", "poster"]) {
      const raw = element.getAttribute(attribute);
      if (!raw) continue;
      const url = resolveResource(raw, origin);
      if (!url) continue;
      if (isSameOrigin(url, origin)) {
        const localPath = await addBinaryAsset(url, "media");
        if (localPath) element.setAttribute(attribute, localPath);
      } else {
        externalResources.add(url.href);
      }
    }
  }

  const bundledAssetCount = [...assetPaths.values()].filter(Boolean).length;
  const externalNote = externalResources.size
    ? `\nSome external resources remain online because their servers do not allow browser bundling (${externalResources.size} resource(s)).\n`
    : "";
  zip.file(
    "README.md",
    `# StyleKit Showcase\n\nThis is a static export generated from ${origin}.\nOpen index.html in a browser.\n${externalNote}`,
  );
  zip.file("index.html", `<!doctype html>\n${document.documentElement.outerHTML}`);

  const blob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  return {
    blob,
    bundledAssetCount,
    externalAssetCount: externalResources.size,
  };
}
