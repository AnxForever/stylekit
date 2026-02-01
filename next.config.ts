import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 性能优化
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // 实验性优化
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
      "@radix-ui/react-slider",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
    ],
  },

  // Turbopack 配置
  turbopack: {},
};

export default nextConfig;
