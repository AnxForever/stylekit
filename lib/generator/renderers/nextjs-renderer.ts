import type { GeneratedFile, GeneratorConfig, StyleInput } from "../types";
import { generateGeneratorSupportFiles } from "../export-artifacts";
import { generateReactFiles } from "./react-renderer";

function sanitizePackageName(value: string): string {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || "stylekit-next-site";
}

function generateNextPackageJson(siteName: string): string {
  return JSON.stringify(
    {
      name: sanitizePackageName(siteName),
      private: true,
      version: "0.1.0",
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "next lint",
      },
      dependencies: {
        next: "^16.1.6",
        react: "^19.2.3",
        "react-dom": "^19.2.3",
      },
      devDependencies: {
        typescript: "^5.5.3",
        "@types/node": "^20.0.0",
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0",
        tailwindcss: "^3.4.7",
        postcss: "^8.4.40",
        autoprefixer: "^10.4.20",
      },
    },
    null,
    2
  );
}

function generateNextTsConfig(): string {
  return JSON.stringify(
    {
      compilerOptions: {
        target: "ES2022",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: false,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: {
          "@/*": ["./*"],
        },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    },
    null,
    2
  );
}

function generateNextConfigTs(): string {
  return `import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
`;
}

function generateNextEnvDts(): string {
  return `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited.
`;
}

function generateLayoutTsx(siteName: string, siteDescription: string): string {
  return `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "${siteName}",
  description: "${siteDescription}",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;
}

function generateNextReadme(config: GeneratorConfig, styleInput: StyleInput): string {
  const styleName = styleInput.type === "builtin"
    ? `${styleInput.style.name} (${styleInput.style.nameEn})`
    : `${styleInput.style.name} (${styleInput.style.nameEn})`;

  return `# ${config.globalContent.siteName || "StyleKit Next.js Site"}

Generated with [StyleKit](https://stylekit.dev) using the **${styleName}** style.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open [http://localhost:3000](http://localhost:3000).

## Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS

## Notes

- Main page: \`app/page.tsx\`
- Template route group:
  - marketing templates: \`app/(marketing)/page.tsx\`
  - dashboard templates: \`app/(dashboard)/page.tsx\`
- Shared styles: \`app/globals.css\`
- Generated metadata and content map:
  - \`stylekit.config.json\`
  - \`CONTENT_MAP.md\`
`;
}

function upsertFile(files: GeneratedFile[], nextFile: GeneratedFile): void {
  const existingIndex = files.findIndex((file) => file.name === nextFile.name);
  if (existingIndex === -1) {
    files.push(nextFile);
    return;
  }
  files[existingIndex] = nextFile;
}

export function generateNextjsFiles(
  config: GeneratorConfig,
  styleInput: StyleInput
): GeneratedFile[] {
  const reactFiles = generateReactFiles(config, styleInput);
  const transformed: GeneratedFile[] = [];
  const routeGroup = config.templateType === "dashboard" ? "(dashboard)" : "(marketing)";
  const routeRoot = `app/${routeGroup}`;
  const groupPagePath = `${routeRoot}/page.tsx`;

  for (const file of reactFiles) {
    if (
      file.name === "package.json" ||
      file.name === "vite.config.ts" ||
      file.name === "index.html" ||
      file.name === "src/main.tsx" ||
      file.name === "README.md" ||
      file.name === "stylekit.config.json" ||
      file.name === "CONTENT_MAP.md"
    ) {
      continue;
    }

    if (file.name === "src/App.tsx") {
      transformed.push({ ...file, name: groupPagePath, type: "ts" });
      continue;
    }

    if (file.name === "src/index.css") {
      transformed.push({ ...file, name: "app/globals.css" });
      continue;
    }

    if (file.name.startsWith("src/components/")) {
      const relativePath = file.name.replace("src/components/", "");
      transformed.push({ ...file, name: `${routeRoot}/components/${relativePath}`, type: "ts" });
      continue;
    }

    transformed.push(file);
  }

  upsertFile(transformed, {
    name: "package.json",
    content: generateNextPackageJson(config.globalContent.siteName || "stylekit-next-site"),
    type: "json",
  });
  upsertFile(transformed, {
    name: "tsconfig.json",
    content: generateNextTsConfig(),
    type: "json",
  });
  upsertFile(transformed, {
    name: "next.config.ts",
    content: generateNextConfigTs(),
    type: "ts",
  });
  upsertFile(transformed, {
    name: "next-env.d.ts",
    content: generateNextEnvDts(),
    type: "ts",
  });
  upsertFile(transformed, {
    name: "app/layout.tsx",
    content: generateLayoutTsx(
      config.globalContent.siteName || "StyleKit Site",
      config.globalContent.siteDescription || "Generated by StyleKit"
    ),
    type: "ts",
  });
  upsertFile(transformed, {
    name: "app/page.tsx",
    content: `export { default } from "./${routeGroup}/page";
`,
    type: "ts",
  });

  for (const supportFile of generateGeneratorSupportFiles(config, styleInput)) {
    upsertFile(transformed, supportFile);
  }

  upsertFile(transformed, {
    name: "README.md",
    content: generateNextReadme(config, styleInput),
    type: "md",
  });

  return transformed;
}
