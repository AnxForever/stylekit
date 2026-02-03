import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 性能优化
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // 图片优化配置
  images: {
    // 支持现代图片格式
    formats: ["image/avif", "image/webp"],
    // 设备尺寸断点
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // 图片尺寸断点
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 允许的外部图片域名（头像等）
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
    ],
  },

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
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip",
    ],
  },

  // Turbopack 配置
  turbopack: {},
};

export default nextConfig;
