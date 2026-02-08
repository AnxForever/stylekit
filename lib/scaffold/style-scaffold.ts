import type { GeneratedFile } from "@/lib/generator/types";
import type { StyleCategory, StyleTag, StyleType } from "@/lib/styles/meta";

export interface StyleScaffoldInput {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  category: StyleCategory;
  styleType: StyleType;
  tags: StyleTag[];
  primaryColor: string;
  secondaryColor: string;
  accentColors: string[];
  keywords: string[];
  philosophy: string;
  doList: string[];
  dontList: string[];
  buttonCode: string;
  cardCode: string;
  inputCode: string;
}

export function generateStyleScaffoldFiles(input: StyleScaffoldInput): GeneratedFile[] {
  const slug = input.slug.trim();
  if (!slug) {
    throw new Error("Missing slug for scaffold generation.");
  }

  const exportName = slugToExportName(slug);
  const tokensExportName = `${exportName}Tokens`;

  const styleFile = generateStyleFile(input, exportName);
  const tokensFile = generateTokensFile(input, tokensExportName);
  const coverSvg = generateCoverSvg(input);
  const registerGuide = generateRegisterGuideMarkdown(input, {
    exportName,
    tokensExportName,
  });

  return [
    { name: `lib/styles/${slug}.ts`, content: styleFile, type: "ts" },
    { name: `lib/styles/${slug}-tokens.ts`, content: tokensFile, type: "ts" },
    { name: `public/styles/${slug}.svg`, content: coverSvg, type: "svg" },
    { name: `scaffold/REGISTER.md`, content: registerGuide, type: "md" },
  ];
}

function generateStyleFile(input: StyleScaffoldInput, exportName: string): string {
  const slug = input.slug.trim();
  const name = input.name.trim() || input.nameEn.trim() || slug;
  const nameEn = input.nameEn.trim() || input.name.trim() || slug;

  const styleObject = {
    slug,
    name,
    nameEn,
    description: input.description.trim(),
    cover: `/styles/${slug}.svg`,
    styleType: input.styleType,
    tags: input.tags,
    category: input.category,
    colors: {
      primary: input.primaryColor.trim(),
      secondary: input.secondaryColor.trim(),
      accent: input.accentColors.map((c) => c.trim()).filter(Boolean),
    },
    keywords: input.keywords.map((k) => k.trim()).filter(Boolean),
    philosophy: "__STYLEKIT_TPL_PHILOSOPHY__",
    doList: input.doList.map((item) => item.trim()).filter(Boolean),
    dontList: input.dontList.map((item) => item.trim()).filter(Boolean),
    components: {
      button: {
        name: "Button",
        description: "Button component in this style.",
        code: "__STYLEKIT_TPL_BUTTON__",
      },
      card: {
        name: "Card",
        description: "Card component in this style.",
        code: "__STYLEKIT_TPL_CARD__",
      },
      input: {
        name: "Input",
        description: "Input component in this style.",
        code: "__STYLEKIT_TPL_INPUT__",
      },
    },
    globalCss: "",
    aiRules: "",
  };

  let serialized = JSON.stringify(styleObject, null, 2);
  serialized = serialized.replace(
    JSON.stringify("__STYLEKIT_TPL_PHILOSOPHY__"),
    toTemplateLiteral(input.philosophy)
  );
  serialized = serialized.replace(
    JSON.stringify("__STYLEKIT_TPL_BUTTON__"),
    toTemplateLiteral(input.buttonCode)
  );
  serialized = serialized.replace(
    JSON.stringify("__STYLEKIT_TPL_CARD__"),
    toTemplateLiteral(input.cardCode)
  );
  serialized = serialized.replace(
    JSON.stringify("__STYLEKIT_TPL_INPUT__"),
    toTemplateLiteral(input.inputCode)
  );

  return [
    `import type { DesignStyle } from "./index";`,
    ``,
    `export const ${exportName}: DesignStyle = ${serialized};`,
    ``,
  ].join("\n");
}

function generateTokensFile(input: StyleScaffoldInput, exportName: string): string {
  const borderWidth = input.category === "expressive" || input.category === "retro" ? "border-2" : "border";
  const borderRadius =
    input.category === "minimal"
      ? "rounded-md"
      : input.category === "expressive"
        ? "rounded-xl"
        : "rounded-lg";

  const bgPrimary = `bg-[${input.secondaryColor.trim()}]`;
  const bgSecondary = `bg-[${input.primaryColor.trim()}]`;
  const bgAccents = input.accentColors.map((c) => `bg-[${c.trim()}]`).filter(Boolean);

  const tokens = {
    border: {
      width: borderWidth,
      color: `border-[${input.primaryColor.trim()}]`,
      radius: borderRadius,
      style: "border-solid",
    },
    shadow: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      none: "shadow-none",
      hover: "hover:shadow-md",
      focus: "focus:shadow-md",
    },
    interaction: {
      transition: "transition-all duration-200",
      hoverOpacity: "hover:opacity-90",
      active: "active:scale-[0.98]",
    },
    typography: {
      heading: "font-semibold tracking-tight",
      body: "font-sans",
      sizes: {
        hero: "text-4xl md:text-6xl",
        h1: "text-3xl md:text-5xl",
        h2: "text-2xl md:text-3xl",
        h3: "text-xl md:text-2xl",
        body: "text-sm md:text-base",
        small: "text-xs md:text-sm",
      },
    },
    spacing: {
      section: "py-10 md:py-20",
      container: "px-4 md:px-8",
      card: "p-5 md:p-6",
      gap: {
        sm: "gap-2 md:gap-4",
        md: "gap-4 md:gap-6",
        lg: "gap-6 md:gap-8",
      },
    },
    colors: {
      background: {
        primary: bgPrimary,
        secondary: bgSecondary,
        accent: bgAccents.length > 0 ? bgAccents : [bgSecondary],
      },
      text: {
        primary: `text-[${input.primaryColor.trim()}]`,
        secondary: input.accentColors[0]
          ? `text-[${input.accentColors[0].trim()}]`
          : `text-[${input.primaryColor.trim()}]`,
        muted: "text-zinc-500",
      },
      button: {
        primary: `${bgSecondary} text-white`,
        secondary: `${bgPrimary} text-[${input.primaryColor.trim()}]`,
        danger: "bg-red-500 text-white",
      },
    },
    forbidden: {
      classes: [] as string[],
      patterns: [] as string[],
      reasons: {} as Record<string, string>,
    },
    required: {
      button: [borderRadius, borderWidth, "font-medium", "inline-flex", "items-center"],
      card: [borderRadius, borderWidth, "bg-white/80"],
      input: [borderRadius, borderWidth, "bg-background", "focus:outline-none"],
    },
  };

  const serialized = JSON.stringify(tokens, null, 2);

  return [
    `// ${input.nameEn.trim() || input.slug.trim()} Style Tokens - Scaffold`,
    `import type { StyleTokens } from "./tokens";`,
    ``,
    `export const ${exportName}: StyleTokens = ${serialized};`,
    ``,
  ].join("\n");
}

function generateCoverSvg(input: StyleScaffoldInput): string {
  const slug = input.slug.trim();
  const title = escapeXml(input.nameEn.trim() || input.name.trim() || slug);
  const subtitle = escapeXml(slug.toUpperCase());

  const primary = input.primaryColor.trim();
  const secondary = input.secondaryColor.trim();
  const accent1 = input.accentColors[0]?.trim() || primary;
  const accent2 = input.accentColors[1]?.trim() || accent1;

  const textColor = pickTextColor(secondary);

  return [
    `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">`,
    `  <rect width="1200" height="630" fill="${secondary}"/>`,
    `  <rect x="96" y="96" width="1008" height="438" rx="36" fill="${accent1}" opacity="0.18"/>`,
    `  <rect x="124" y="132" width="952" height="368" rx="28" fill="${accent2}" opacity="0.14"/>`,
    `  <rect x="156" y="168" width="888" height="296" rx="22" fill="${secondary}" stroke="${primary}" stroke-width="6"/>`,
    `  <rect x="196" y="210" width="240" height="18" rx="9" fill="${primary}" opacity="0.9"/>`,
    `  <rect x="196" y="248" width="140" height="14" rx="7" fill="${primary}" opacity="0.6"/>`,
    `  <rect x="196" y="422" width="200" height="16" rx="8" fill="${primary}" opacity="0.35"/>`,
    `  <rect x="420" y="406" width="400" height="44" rx="22" fill="${accent1}" opacity="0.25" stroke="${primary}" stroke-width="4"/>`,
    `  <text x="600" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="72" text-anchor="middle" fill="${textColor}" font-weight="700">${title}</text>`,
    `  <text x="600" y="392" font-family="system-ui, -apple-system, sans-serif" font-size="22" text-anchor="middle" fill="${textColor}" opacity="0.75" letter-spacing="6">${subtitle}</text>`,
    `</svg>`,
    ``,
  ].join("\n");
}

function generateRegisterGuideMarkdown(
  input: StyleScaffoldInput,
  names: { exportName: string; tokensExportName: string }
): string {
  const slug = input.slug.trim();
  const coverPath = `/styles/${slug}.svg`;

  return [
    `# Style Scaffold Registration`,
    ``,
    `Slug: \`${slug}\``,
    `Cover: \`${coverPath}\``,
    `Style export: \`${names.exportName}\``,
    `Tokens export: \`${names.tokensExportName}\``,
    ``,
    `## Files Included In This ZIP`,
    ``,
    `- \`lib/styles/${slug}.ts\``,
    `- \`lib/styles/${slug}-tokens.ts\``,
    `- \`public/styles/${slug}.svg\``,
    ``,
    `## Registration Snippets`,
    ``,
    `### 1) Register Style Definition`,
    ``,
    `File: \`lib/styles/index.ts\``,
    ``,
    "```ts",
    `import { ${names.exportName} } from "./${slug}";`,
    "```",
    ``,
    `Add \`${names.exportName}\` into the exported \`styles\` array (keep ordering consistent with existing groups).`,
    ``,
    `### 2) Register Lightweight Metadata`,
    ``,
    `File: \`lib/styles/meta.ts\``,
    ``,
    "```ts",
    `{`,
    `  slug: "${slug}",`,
    `  name: ${JSON.stringify(input.name.trim() || input.nameEn.trim() || slug)},`,
    `  nameEn: ${JSON.stringify(input.nameEn.trim() || input.name.trim() || slug)},`,
    `  description: ${JSON.stringify(input.description.trim())},`,
    `  cover: "${coverPath}",`,
    `  category: "${input.category}",`,
    `  styleType: "${input.styleType}",`,
    `  tags: ${JSON.stringify(input.tags)},`,
    `  colors: {`,
    `    primary: "${input.primaryColor.trim()}",`,
    `    secondary: "${input.secondaryColor.trim()}",`,
    `    accent: ${JSON.stringify(input.accentColors.map((c) => c.trim()).filter(Boolean))},`,
    `  },`,
    `  keywords: ${JSON.stringify(input.keywords.map((k) => k.trim()).filter(Boolean))},`,
    `},`,
    "```",
    ``,
    `### 3) Register Tokens (Optional, Recommended)`,
    ``,
    `File: \`lib/styles/tokens-registry.ts\``,
    ``,
    "```ts",
    `import { ${names.tokensExportName} } from "./${slug}-tokens";`,
    "```",
    ``,
    "```ts",
    `"${slug}": ${names.tokensExportName},`,
    "```",
    ``,
    `### 4) Add Cover Preview Renderer`,
    ``,
    `File: \`lib/style-components.tsx\``,
    ``,
    "```tsx",
    `"${slug}": {`,
    `  coverPreview: () => (`,
    `    <div className="w-full h-full flex items-center justify-center p-4" style={{ backgroundColor: "${input.secondaryColor.trim()}" }}>`,
    `      <div className="w-full max-w-[240px]">`,
    `        <div className="h-14 rounded-xl" style={{ backgroundColor: "${input.primaryColor.trim()}" }} />`,
    `        <div className="mt-3 h-10 rounded-xl" style={{ backgroundColor: "${input.accentColors[0]?.trim() || input.primaryColor.trim()}", opacity: 0.35 }} />`,
    `        <div className="mt-4 flex items-center justify-between">`,
    `          <div className="text-[10px] font-semibold tracking-[0.22em]" style={{ color: "${pickTextColor(input.secondaryColor.trim())}" }}>`,
    `            ${escapeJsxText(slug.toUpperCase())}`,
    `          </div>`,
    `          <div className="h-2 w-10 rounded-full" style={{ backgroundColor: "${input.accentColors[1]?.trim() || input.primaryColor.trim()}" }} />`,
    `        </div>`,
    `      </div>`,
    `    </div>`,
    `  ),`,
    `},`,
    "```",
    ``,
    `## Verify`,
    ``,
    `- \`npm test\``,
    `- \`npm run lint\``,
    ``,
  ].join("\n");
}

function slugToExportName(slug: string): string {
  const cleaned = slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const parts = cleaned.split("-").filter(Boolean);
  if (parts.length === 0) return "newStyle";

  const [first, ...rest] = parts;
  return [
    first,
    ...rest.map((part) => part.slice(0, 1).toUpperCase() + part.slice(1)),
  ].join("");
}

function toTemplateLiteral(value: string): string {
  const normalized = (value ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const escaped = normalized.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  return `\`${escaped}\``;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeJsxText(value: string): string {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function pickTextColor(backgroundHex: string): string {
  const rgb = hexToRgb(backgroundHex);
  if (!rgb) return "#0f172a";

  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return luminance < 0.55 ? "#f8fafc" : "#0f172a";
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.trim().toLowerCase();
  if (!/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/.test(normalized)) return null;

  const full =
    normalized.length === 4
      ? `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`
      : normalized;

  return {
    r: Number.parseInt(full.slice(1, 3), 16),
    g: Number.parseInt(full.slice(3, 5), 16),
    b: Number.parseInt(full.slice(5, 7), 16),
  };
}

