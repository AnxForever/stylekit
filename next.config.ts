import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

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
      { source: "/prompts", destination: "/ui-prompts", permanent: true },
      { source: "/prompts/landing-page", destination: "/landing-page-prompts", permanent: true },
      { source: "/prompts/dashboard-design", destination: "/dashboard-prompts", permanent: true },
      { source: "/prompts/tailwind-ui", destination: "/tailwind-ui-prompts", permanent: true },
      { source: "/prompts/dark-mode", destination: "/dark-mode-ui-prompts", permanent: true },
      { source: "/prompt-builder", destination: "/generate", permanent: false },
      { source: "/linter", destination: "/generate", permanent: false },
      { source: "/playground", destination: "/generate", permanent: false },
      { source: "/api-test", destination: "/developers", permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co https://connect.linux.do wss://*.supabase.co https://api.github.com",
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
        source: "/(.*)\\.(js|css|woff2?|ttf|ico|svg)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)\\.(png|jpg|jpeg|gif|webp|avif)",
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
