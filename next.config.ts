import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  serverExternalPackages: ["isomorphic-dompurify"],

  images: {
    formats: ["image/avif", "image/webp"],
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
    // Shared-element View Transitions (styles list cover -> detail cover).
    // Pages opt in via React's <ViewTransition>; browsers without the API
    // fall back to instant navigation.
    viewTransition: true,
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vibeloft.ai",
              "style-src 'self' 'unsafe-inline' https://fonts.loli.net",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://gstatic.loli.net",
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
        source: "/(.*)\\.(png|jpg|jpeg|gif|webp|avif|svg|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/styles/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/templates/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=86400, stale-while-revalidate=604800" },
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
