import JSZip from "jszip";
import { SHOWCASE_DOWNLOAD_REVEAL_STYLE } from "@/lib/export/showcase-html";

const MAX_RESOURCES = 600;
const MAX_RESOURCE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_RESOURCE_BYTES = 64 * 1024 * 1024;
const EXTERNAL_RESOURCE_HOSTS = new Set([
  "fonts.loli.net",
  "gstatic.loli.net",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "picsum.photos",
  "fastly.picsum.photos",
  "images.unsplash.com",
  "images.pexels.com",
]);

export class StandaloneShowcaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StandaloneShowcaseError";
  }
}

interface StandaloneExportOptions {
  origin: string;
  signal?: AbortSignal;
}

interface ResourceContext {
  origin: string;
  signal?: AbortSignal;
  cache: Map<string, Promise<string>>;
  resourceCount: number;
  totalResourceBytes: number;
}

function getAttribute(attributes: string, name: string): string | null {
  const match = attributes.match(
    new RegExp(`${name}\\s*=\\s*(["'])(.*?)\\1`, "i"),
  );
  return match?.[2] ?? null;
}

function resolveResource(value: string | null, baseUrl: string): URL | null {
  const raw = value?.trim();
  if (!raw || raw.startsWith("#") || /^(data|blob|javascript|mailto|tel):/i.test(raw)) {
    return null;
  }

  try {
    const url = new URL(raw, baseUrl);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

function isAllowedResource(url: URL, origin: string): boolean {
  return url.origin === origin || EXTERNAL_RESOURCE_HOSTS.has(url.hostname);
}

function inferContentType(url: URL): string {
  const extension = url.pathname.split(".").pop()?.toLowerCase();
  const types: Record<string, string> = {
    avif: "image/avif",
    css: "text/css",
    gif: "image/gif",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    js: "text/javascript",
    png: "image/png",
    svg: "image/svg+xml",
    webp: "image/webp",
    woff: "font/woff",
    woff2: "font/woff2",
  };
  return types[extension ?? ""] ?? "application/octet-stream";
}

async function fetchWithRetry(
  url: URL,
  init: RequestInit,
  resourceType: string,
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (response.ok || attempt === 2 || (response.status < 500 && response.status !== 429)) {
        return response;
      }
    } catch (error) {
      if (init.signal?.aborted) throw error;
      lastError = error;
      if (attempt === 2) break;
    }

    await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
  }

  const detail = lastError instanceof Error ? `: ${lastError.message}` : "";
  throw new StandaloneShowcaseError(
    `Could not download ${resourceType} from ${url.hostname}${detail}`,
  );
}

async function fetchDataUrl(url: URL, context: ResourceContext): Promise<string> {
  const cached = context.cache.get(url.href);
  if (cached) return cached;

  if (!isAllowedResource(url, context.origin)) {
    throw new StandaloneShowcaseError(
      `Unsupported external resource host: ${url.hostname}`,
    );
  }
  if (context.resourceCount >= MAX_RESOURCES) {
    throw new StandaloneShowcaseError("Showcase contains too many resources");
  }
  context.resourceCount += 1;

  const pending = (async () => {
    const response = await fetchWithRetry(url, {
      headers: { Accept: "*/*" },
      cache: "no-store",
      signal: context.signal,
    }, "resource");
    if (!response.ok) {
      throw new StandaloneShowcaseError(
        `Could not download resource (${response.status}): ${url.hostname}`,
      );
    }

    const contentLength = Number(response.headers.get("content-length") || 0);
    if (contentLength > MAX_RESOURCE_BYTES) {
      throw new StandaloneShowcaseError(`Resource is too large: ${url.hostname}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength > MAX_RESOURCE_BYTES) {
      throw new StandaloneShowcaseError(`Resource is too large: ${url.hostname}`);
    }
    context.totalResourceBytes += buffer.byteLength;
    if (context.totalResourceBytes > MAX_TOTAL_RESOURCE_BYTES) {
      throw new StandaloneShowcaseError("Showcase resources are too large to package");
    }

    const contentType =
      response.headers.get("content-type")?.split(";", 1)[0] || inferContentType(url);
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  })();

  context.cache.set(url.href, pending);
  return pending;
}

async function replaceAsync(
  value: string,
  pattern: RegExp,
  replace: (...matches: string[]) => Promise<string>,
): Promise<string> {
  const matches = [...value.matchAll(pattern)];
  const replacements = await Promise.all(
    matches.map((match) => replace(...match)),
  );
  let result = "";
  let cursor = 0;

  for (const [matchIndex, match] of matches.entries()) {
    const offset = match.index ?? 0;
    result += value.slice(cursor, offset);
    result += replacements[matchIndex];
    cursor = offset + match[0].length;
  }

  return result + value.slice(cursor);
}

async function inlineCss(
  css: string,
  baseUrl: string,
  context: ResourceContext,
): Promise<string> {
  return replaceAsync(
    css,
    /url\(\s*(["']?)([^)"']+)\1\s*\)/gi,
    async (full, _quote, rawUrl) => {
      const resource = resolveResource(rawUrl, baseUrl);
      if (!resource) return full;
      const dataUrl = await fetchDataUrl(resource, context);
      return `url("${dataUrl}")`;
    },
  );
}

async function inlineStyleAttributes(
  html: string,
  context: ResourceContext,
): Promise<string> {
  return replaceAsync(
    html,
    /(\sstyle=["'])(.*?)(["'])/gis,
    async (full, prefix, css, suffix) => {
      const rewritten = await inlineCss(css, context.origin, context);
      return `${prefix}${rewritten}${suffix}`;
    },
  );
}

async function inlineMediaAttributes(
  html: string,
  context: ResourceContext,
): Promise<string> {
  let result = await replaceAsync(
    html,
    /<(img|source|video|audio|image)\b[^>]*>/gi,
    async (tag) =>
      replaceAsync(
        tag,
        /\b(src|poster|href|xlink:href)=["']([^"']+)["']/gi,
        async (full, name, rawUrl) => {
          const resource = resolveResource(rawUrl, context.origin);
          if (!resource) return full;
          const dataUrl = await fetchDataUrl(resource, context);
          return `${name}="${dataUrl}"`;
        },
      ),
  );

  result = await replaceAsync(
    result,
    /\b(srcset)=["']([^"']+)["']/gi,
    async (full, name, value) => {
      const candidates = value.split(",");
      const rewritten = [];
      for (const candidate of candidates) {
        const [rawUrl, ...descriptor] = candidate.trim().split(/\s+/);
        const resource = resolveResource(rawUrl, context.origin);
        const dataUrl = resource
          ? await fetchDataUrl(resource, context)
          : rawUrl;
        rewritten.push([dataUrl, ...descriptor].join(" "));
      }
      return `${name}="${rewritten.join(", ")}"`;
    },
  );

  return result;
}

/**
 * Creates a genuinely self-contained Showcase ZIP. Visual resources that are
 * not in the explicit public allowlist fail the export instead of producing a
 * misleading partially offline file.
 */
export async function buildStandaloneShowcaseZip(
  html: string,
  options: StandaloneExportOptions,
): Promise<Uint8Array> {
  const context: ResourceContext = {
    origin: new URL(options.origin).origin,
    signal: options.signal,
    cache: new Map(),
    resourceCount: 0,
    totalResourceBytes: 0,
  };

  let output = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<base\b[^>]*>/gi, "")
    .replace(/<link\b[^>]*rel=["'](?:modulepreload|preload)["'][^>]*>/gi, "");

  output = await replaceAsync(
    output,
    /<link\b([^>]*)>/gi,
    async (full, attributes) => {
      const rel = getAttribute(attributes, "rel")?.toLowerCase();
      if (!rel?.split(/\s+/).includes("stylesheet")) return "";

      const href = getAttribute(attributes, "href");
      const resource = resolveResource(href, context.origin);
      if (!resource) {
        throw new StandaloneShowcaseError("Invalid stylesheet resource");
      }
      const response = await fetchWithRetry(resource, {
        headers: { Accept: "text/css" },
        cache: "no-store",
        signal: context.signal,
      }, "stylesheet");
      if (!response.ok) {
        throw new StandaloneShowcaseError(`Could not download stylesheet: ${resource.hostname}`);
      }
      const css = await response.text();
      const rewritten = await inlineCss(css, resource.href, context);
      return `<style data-stylekit-standalone-css>${rewritten}</style>`;
    },
  );

  output = await replaceAsync(
    output,
    /<style\b([^>]*)>([\s\S]*?)<\/style>/gi,
    async (full, attributes, css) => {
      const rewritten = await inlineCss(css, context.origin, context);
      return `<style${attributes}>${rewritten}</style>`;
    },
  );
  output = await inlineStyleAttributes(output, context);
  output = await inlineMediaAttributes(output, context);

  const revealStyle = `<style data-stylekit-showcase-download>${SHOWCASE_DOWNLOAD_REVEAL_STYLE}</style>`;
  output = /<head\b[^>]*>/i.test(output)
    ? output.replace(/<head\b[^>]*>/i, (head) => `${head}${revealStyle}`)
    : `${revealStyle}${output}`;

  const zip = new JSZip();
  zip.file("index.html", output);
  zip.file(
    "README.md",
    `# StyleKit Showcase\n\nThis archive is a self-contained offline export generated from ${context.origin}.\nOpen index.html directly; no web server or JavaScript runtime is required.\n`,
  );

  const buffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
  return new Uint8Array(buffer);
}
