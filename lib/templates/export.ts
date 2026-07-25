// Turns an in-repo template page into a standalone, runnable Next.js project.
// Used by the /api/templates/[slug]/download route; pure functions so the
// stripping and scaffold contents stay unit-testable.

export type TemplateProjectMeta = {
  slug: string;
  nameEn: string;
  nameZh: string;
  descriptionEn: string;
};

// Templates import the site-only floating back button; a downloaded project
// has no template list to go back to, so both the import and the JSX go away.
export function stripSiteOnlyCode(source: string): string {
  return source
    .split("\n")
    .filter(
      (line) =>
        !line.includes("components/templates/template-back-button") &&
        !line.includes("<TemplateBackButton")
    )
    .join("\n");
}

function packageJson(meta: TemplateProjectMeta): string {
  return `${JSON.stringify(
    {
      name: `${meta.slug}-template`,
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        "lucide-react": "^0.563.0",
        next: "^16.1.6",
        react: "^19.2.3",
        "react-dom": "^19.2.3",
      },
      devDependencies: {
        "@tailwindcss/postcss": "^4",
        "@types/node": "^20",
        "@types/react": "^19",
        "@types/react-dom": "^19",
        tailwindcss: "^4",
        typescript: "^5",
      },
    },
    null,
    2
  )}\n`;
}

const TSCONFIG = `${JSON.stringify(
  {
    compilerOptions: {
      target: "ES2017",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [{ name: "next" }],
      paths: { "@/*": ["./*"] },
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"],
  },
  null,
  2
)}\n`;

const NEXT_CONFIG = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
`;

const POSTCSS_CONFIG = `const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
`;

const GLOBALS_CSS = `@import "tailwindcss";
`;

const GITIGNORE = `node_modules
.next
out
*.tsbuildinfo
next-env.d.ts
.DS_Store
`;

function layoutTsx(meta: TemplateProjectMeta): string {
  return `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: ${JSON.stringify(meta.nameEn)},
  description: ${JSON.stringify(meta.descriptionEn)},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;
}

function readme(meta: TemplateProjectMeta): string {
  return `# ${meta.nameEn} / ${meta.nameZh}

${meta.descriptionEn}

A standalone Next.js + Tailwind CSS v4 project exported from
[StyleKit Templates](https://www.stylekit.top/templates).

## Getting started / 快速开始

\`\`\`bash
pnpm install   # or: npm install / yarn
pnpm dev       # http://localhost:3000
\`\`\`

## Stack

- Next.js (App Router) + React
- Tailwind CSS v4 (no config file needed)
- lucide-react icons

## License

Free for personal and commercial use. Attribution appreciated but not
required — a link back to stylekit.top helps the project keep going.
`;
}

// Static project shell: everything except the template's own source files,
// which the API route reads from disk and places under app/.
export function buildScaffoldFiles(meta: TemplateProjectMeta): Record<string, string> {
  return {
    "package.json": packageJson(meta),
    "tsconfig.json": TSCONFIG,
    "next.config.ts": NEXT_CONFIG,
    "postcss.config.mjs": POSTCSS_CONFIG,
    ".gitignore": GITIGNORE,
    "README.md": readme(meta),
    "app/globals.css": GLOBALS_CSS,
    "app/layout.tsx": layoutTsx(meta),
  };
}
