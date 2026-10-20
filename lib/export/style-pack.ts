// Style Pack - Unified export bundle
// Bundles all export formats for a style

import type { DesignStyle } from "../styles";
import type { StyleTokens } from "../styles/tokens";
import JSZip from "jszip";
import { generateFigmaTokenExport } from "./figma-tokens";
import {
  generateTailwindPresetExport,
  generateTailwindPresetJS,
  generateTailwindThemeCSSExport,
  serializeTailwindDiagnostics,
} from "./tailwind-preset";
import { generateShadcnThemeExport, generateShadcnThemeCSS } from "./shadcn-theme";
import { generateSkillPack, getSkillPackFileInfo } from "./skill-pack";

export interface StylePackFile {
  name: string;
  filename: string;
  description: string;
  descriptionEn: string;
  content: string;
  mimeType: string;
  icon: string;
}

export interface StylePackOptions {
  version?: string;
}

export function generateStylePack(
  style: DesignStyle,
  tokens?: StyleTokens,
  options?: StylePackOptions
): StylePackFile[] {
  const version = options?.version ?? "0.0.0";
  const figmaExport = generateFigmaTokenExport(style, tokens);
  const tailwindPresetExport = generateTailwindPresetExport(style, tokens);
  const tailwindThemeExport = generateTailwindThemeCSSExport(style, tokens);
  const shadcnExport = generateShadcnThemeExport(style, tokens);
  const files: StylePackFile[] = [
    {
      name: "Metadata",
      filename: `${style.slug}-meta.json`,
      description: "Style metadata including version information",
      descriptionEn: "Style metadata including version information",
      content: JSON.stringify(
        {
          slug: style.slug,
          name: style.nameEn,
          version,
          generatedAt: new Date().toISOString(),
        },
        null,
        2
      ),
      mimeType: "application/json",
      icon: "info",
    },
    {
      name: "Design Tokens",
      filename: `${style.slug}-tokens.json`,
      description: "Figma / Style Dictionary / Tokens Studio 兼容",
      descriptionEn: "Compatible with Figma / Style Dictionary / Tokens Studio",
      content: JSON.stringify(figmaExport.tokens, null, 2),
      mimeType: "application/json",
      icon: "tokens",
    },
    {
      name: "Tailwind v3 Preset",
      filename: `${style.slug}-tailwind-preset.js`,
      description: "Tailwind CSS v3 CommonJS 主题预设，附未支持值说明",
      descriptionEn: "Tailwind CSS v3 CommonJS theme preset with export limitations noted",
      content: generateTailwindPresetJS(style, tokens),
      mimeType: "application/javascript",
      icon: "tailwind",
    },
    {
      name: "Tailwind v4 Theme",
      filename: `${style.slug}-tailwind-theme.css`,
      description: "Tailwind CSS v4 @theme 样式表；spacing 使用 stylekit-* 命名，避免覆盖 max-w-sm 等默认别名",
      descriptionEn: "Tailwind CSS v4 @theme stylesheet; stylekit-* spacing names preserve default aliases such as max-w-sm",
      content: tailwindThemeExport.css,
      mimeType: "text/css",
      icon: "tailwind",
    },
    {
      name: "Export Diagnostics",
      filename: `${style.slug}-export-diagnostics.json`,
      description: "列出导出中使用的回退和无法表达的值",
      descriptionEn: "Lists fallbacks and values that could not be represented in generated artifacts",
      content: JSON.stringify({
        schemaVersion: 1,
        generatedBy: "StyleKit",
        styleSlug: style.slug,
        figmaTokens: figmaExport.diagnostics,
        tailwindV3Preset: serializeTailwindDiagnostics(tailwindPresetExport.diagnostics, style.slug),
        tailwindV4Theme: serializeTailwindDiagnostics(tailwindThemeExport.diagnostics, style.slug),
        shadcnTheme: {
          schemaVersion: 1,
          generatedBy: "StyleKit",
          styleSlug: style.slug,
          fallbacks: shadcnExport.diagnostics.fallbacks,
          unsupported: shadcnExport.diagnostics.unsupported,
        },
      }, null, 2),
      mimeType: "application/json",
      icon: "info",
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
      description: "旧版 shadcn/Tailwind v3 的 HSL 通道配置",
      descriptionEn: "Legacy shadcn/Tailwind v3 HSL channel configuration",
      content: JSON.stringify(shadcnExport.theme, null, 2),
      mimeType: "application/json",
      icon: "shadcn",
    },
    {
      name: "CSS Variables",
      filename: `${style.slug}-variables.css`,
      description: "旧版 HSL 通道变量，配合 hsl(var(--token)) 使用；v4 请用 Theme CSS",
      descriptionEn: "Legacy HSL channels for hsl(var(--token)); use Theme CSS for v4",
      content: generateShadcnThemeCSS(style, tokens),
      mimeType: "text/css",
      icon: "variables",
    },
  ];
  const skillPackInfo = getSkillPackFileInfo(style);

  files.push({
    ...skillPackInfo,
    content: generateSkillPack({ style, tokens }),
    mimeType: "text/markdown",
    icon: "skill",
  });

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

export async function downloadAllAsZip(
  style: DesignStyle,
  tokens?: StyleTokens,
  options?: StylePackOptions
): Promise<void> {
  const files = generateStylePack(style, tokens, options);
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.filename, file.content);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${style.slug}-style-pack.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
