import { Config } from "@remotion/cli/config";
import path from "node:path";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(96);
Config.setCodec("h264");
Config.setCrf(18);
Config.setPixelFormat("yuv420p");
Config.setX264Preset("slow");
Config.setConcurrency(6);
Config.setPublicDir(path.resolve(process.cwd(), "public"));

// The film renders the app's real pages, so the Next modules they import must
// resolve to shims. Aliasing here keeps every app file untouched.
Config.overrideWebpackConfig((config) => {
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    "@": path.resolve(process.cwd(), "../.."),
    "next/link": path.resolve(process.cwd(), "src/shims/next-link.tsx"),
    "next/navigation": path.resolve(process.cwd(), "src/shims/next-navigation.ts"),
  };
  return config;
});
