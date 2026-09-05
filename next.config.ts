import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Optional origin for immutable Next.js build assets.
 *
 * Keeping this opt-in is important: local development and deployments that do
 * not have a CDN continue to use the same-origin `/_next/static` paths. When a
 * CDN hostname is supplied, Next rewrites only build assets (JS, CSS and the
 * fonts emitted by `next/font`); public files and API requests stay on the
 * application origin.
 */
function getAssetPrefix(value: string | undefined): string | undefined {
  const normalized = value?.trim().replace(/\/+$/, "");
  if (!normalized) return undefined;

  if (normalized.startsWith("//")) {
    throw new Error("NEXT_PUBLIC_ASSET_PREFIX must not be protocol-relative");
  }
  if (normalized.includes("?") || normalized.includes("#")) {
    throw new Error("NEXT_PUBLIC_ASSET_PREFIX must not contain a query or hash");
  }
  if (normalized.startsWith("/")) {
    return normalized;
  }

  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    throw new Error("NEXT_PUBLIC_ASSET_PREFIX must be an absolute http(s) URL or a path");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_ASSET_PREFIX must use http or https");
  }
  if (url.username || url.password) {
    throw new Error("NEXT_PUBLIC_ASSET_PREFIX must not contain URL credentials");
  }

  return url.toString().replace(/\/$/, "");
}

const assetPrefix = getAssetPrefix(process.env.NEXT_PUBLIC_ASSET_PREFIX);
const assetUrl = assetPrefix && !assetPrefix.startsWith("/")
  ? new URL(assetPrefix)
  : undefined;
const assetOrigin = assetUrl?.origin;
const assetCspSource = assetOrigin ? ` ${assetOrigin}` : "";
const scriptCspSource = "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vibeloft.ai";
const PUBLIC_ASSET_CACHE_CONTROL =
  "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  serverExternalPackages: ["isomorphic-dompurify"],
  ...(assetPrefix ? { assetPrefix } : {}),
  ...(assetOrigin ? { crossOrigin: "anonymous" as const } : {}),

  images: {
    formats: ["image/avif", "image/webp"],
    // The optimizer output is content-addressed by its URL parameters. A
    // longer floor lets the reverse proxy/CDN serve repeat image requests
    // without waking the Next.js process.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "linux.do",
      },
      {
        protocol: "https",
        hostname: "*.linux.do",
      },
    ],
  },

  experimental: {
    // Keep production artifact generation deterministic on the constrained
    // local/CI builders used by the deployment runbook.
    cpus: 1,
    // Shared-element View Transitions come from React 19's <ViewTransition>
    // component, not from a Next flag. The experimental `viewTransition` key
    // was removed in Next 16.3 and now fails the build's type check.
    // Client Router Cache for back/forward: without this every back navigation
    // refetches the RSC payload (dynamic default is 0), which makes returning
    // to long pages feel slow and breaks scroll restoration timing.
    staleTimes: {
      dynamic: 60,
      static: 300,
    },
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-popover",
      "@radix-ui/react-progress",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-select",
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip",
    ],
  },

  async redirects() {
    return [
      {
        source: "/:locale(en|zh)/styles/:slug/showcase",
        destination: "/styles/:slug/showcase",
        permanent: true,
      },
      { source: "/:locale(en|zh)/prompts", destination: "/:locale/ui-prompts", permanent: true },
      { source: "/:locale(en|zh)/prompts/landing-page", destination: "/:locale/landing-page-prompts", permanent: true },
      { source: "/:locale(en|zh)/prompts/dashboard-design", destination: "/:locale/dashboard-prompts", permanent: true },
      { source: "/:locale(en|zh)/prompts/tailwind-ui", destination: "/:locale/tailwind-ui-prompts", permanent: true },
      { source: "/:locale(en|zh)/prompts/dark-mode", destination: "/:locale/dark-mode-ui-prompts", permanent: true },
      { source: "/prompts", destination: "/ui-prompts", permanent: true },
      { source: "/prompts/landing-page", destination: "/landing-page-prompts", permanent: true },
      { source: "/prompts/dashboard-design", destination: "/dashboard-prompts", permanent: true },
      { source: "/prompts/tailwind-ui", destination: "/tailwind-ui-prompts", permanent: true },
      { source: "/prompts/dark-mode", destination: "/dark-mode-ui-prompts", permanent: true },
      { source: "/prompt-builder", destination: "/ui-prompts", permanent: true },
      { source: "/linter", destination: "/developers", permanent: true },
      { source: "/playground", destination: "/styles", permanent: true },
      { source: "/api-test", destination: "/developers", permanent: true },
      // Asset libraries merged into the unified /resources page (2026-08).
      // 301 the standalone routes to the matching sidebar section.
      { source: "/:locale(en|zh)/typography", destination: "/:locale/resources?tab=typography", permanent: true },
      { source: "/:locale(en|zh)/gradients", destination: "/:locale/resources?tab=gradients", permanent: true },
      { source: "/:locale(en|zh)/shadows", destination: "/:locale/resources?tab=shadows", permanent: true },
      { source: "/:locale(en|zh)/backgrounds", destination: "/:locale/resources?tab=backgrounds", permanent: true },
      { source: "/typography", destination: "/resources?tab=typography", permanent: true },
      { source: "/gradients", destination: "/resources?tab=gradients", permanent: true },
      { source: "/shadows", destination: "/resources?tab=shadows", permanent: true },
      { source: "/backgrounds", destination: "/resources?tab=backgrounds", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/styles/:slug/showcase",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
      {
        source: "/validation/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `${scriptCspSource}${assetCspSource}`,
              `style-src 'self' 'unsafe-inline' https://fonts.loli.net${assetCspSource}`,
              `img-src 'self' data: https: blob:${assetCspSource}`,
              `font-src 'self' data: https://gstatic.loli.net${assetCspSource}`,
              "connect-src 'self' https://*.supabase.co https://connect.linux.do wss://*.supabase.co https://api.github.com https://api.vibeloft.ai",
              "media-src 'self'",
              "frame-src 'self'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
      {
        // Fallback for deployments where the Nginx static-file include has
        // not been installed yet. The extension-constrained pattern avoids
        // applying shared caching to dynamic pages such as `/styles/:slug`.
        // Nginx remains the preferred path because `try_files` can also avoid
        // caching a missing asset response.
        source:
          "/:assetRoot(styles|templates|images|brand|readme|video|launch|experiments|submission)/:assetPath*\\.:assetExt(png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|mp4|webm|m4v)",
        headers: [
          { key: "Cache-Control", value: PUBLIC_ASSET_CACHE_CONTROL },
          { key: "CDN-Cache-Control", value: "public, max-age=2592000" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Timing-Allow-Origin", value: "*" },
        ],
      },
      {
        // Next's build output is hashed and can be cached for the lifetime of
        // the artifact. Next already emits `public, max-age=31536000,
        // immutable` for this path in production; only add the provider hint
        // and CORS header here so development does not inherit a forced cache.
        source: "/_next/static/:path*",
        headers: [
          { key: "CDN-Cache-Control", value: "public, max-age=31536000" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          // Preserve cross-origin Resource Timing entries so field monitoring
          // can distinguish CDN transfer time from application rendering.
          { key: "Timing-Allow-Origin", value: "*" },
        ],
      },
      {
        // Optimized image variants are keyed by URL, width, quality, and
        // Accept. Next emits the browser cache policy; this hint lets a
        // whole-site CDN retain the generated variant as well.
        source: "/_next/image",
        headers: [
          { key: "CDN-Cache-Control", value: "public, max-age=2592000" },
        ],
      },
    ];
  },

  turbopack: {},
};

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withSentryConfig(analyzer(nextConfig), {
  silent: true,
  sourcemaps: {
    disable: true,
  },
});
