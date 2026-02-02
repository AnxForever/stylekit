// Style Pack - Unified export bundle
// Bundles all export formats for a style

import type { DesignStyle } from "../styles";
import type { StyleTokens } from "../styles/tokens";
import { exportStyleTokens } from "./figma-tokens";
import { generateTailwindPresetJS } from "./tailwind-preset";
import { generateShadcnThemeJSON, generateShadcnThemeCSS } from "./shadcn-theme";

export interface StylePackFile {
  name: string;
  filename: string;
  description: string;
  descriptionEn: string;
  content: string;
  mimeType: string;
  icon: string;
}

export function generateStylePack(
  style: DesignStyle,
  tokens?: StyleTokens
): StylePackFile[] {
  const files: StylePackFile[] = [
    {
      name: "Design Tokens",
      filename: `${style.slug}-tokens.json`,
      description: "Figma / Style Dictionary / Tokens Studio 兼容",
      descriptionEn: "Compatible with Figma / Style Dictionary / Tokens Studio",
      content: exportStyleTokens(style, "figma-tokens"),
      mimeType: "application/json",
      icon: "tokens",
    },
    {
      name: "Tailwind Preset",
      filename: `${style.slug}-tailwind-preset.js`,
      description: "Tailwind CSS 主题预设，可直接在配置中引用",
      descriptionEn: "Tailwind CSS theme preset, import directly in config",
      content: generateTailwindPresetJS(style, tokens),
      mimeType: "application/javascript",
      icon: "tailwind",
    },
    {
      name: "Global CSS",
      filename: `${style.slug}-globals.css`,
      description: "包含 CSS 变量和基础样式",
      descriptionEn: "CSS variables and base styles",
      content: style.globalCss,
      mimeType: "text/css",
      icon: "css",
    },
    {
      name: "shadcn Theme",
      filename: `${style.slug}-shadcn-theme.json`,
      description: "shadcn/ui 主题配置",
      descriptionEn: "shadcn/ui theme configuration",
      content: generateShadcnThemeJSON(style),
      mimeType: "application/json",
      icon: "shadcn",
    },
    {
      name: "CSS Variables",
      filename: `${style.slug}-variables.css`,
      description: "纯 CSS 变量，适用于任何项目",
      descriptionEn: "Pure CSS variables, works with any project",
      content: generateShadcnThemeCSS(style),
      mimeType: "text/css",
      icon: "variables",
    },
  ];

  return files;
}

export function downloadFile(file: StylePackFile): void {
  const blob = new Blob([file.content], { type: file.mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadAllAsZip(style: DesignStyle, tokens?: StyleTokens): void {
  // Since we can't use JSZip in the browser without a dependency,
  // we'll download files individually
  const files = generateStylePack(style, tokens);
  files.forEach((file, i) => {
    setTimeout(() => downloadFile(file), i * 300);
  });
}
