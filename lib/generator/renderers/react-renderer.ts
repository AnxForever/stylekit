/**
 * React Renderer - Generates React component files from templates
 */

import type { GeneratorConfig, GeneratedFile, SectionConfig, StyleInput } from "../types";
import { generateGeneratorSupportFiles } from "../export-artifacts";

const sectionLookupCache = new WeakMap<SectionConfig[], Map<string, SectionConfig>>();

function getSectionLookup(sections: SectionConfig[]): Map<string, SectionConfig> {
  let lookup = sectionLookupCache.get(sections);
  if (!lookup) {
    lookup = new Map();
    for (const section of sections) {
      lookup.set(section.id, section);
    }
    sectionLookupCache.set(sections, lookup);
  }
  return lookup;
}

/**
 * Get section content by ID
 */
function getSectionContent(sections: SectionConfig[], sectionId: string): Record<string, string> {
  const section = getSectionLookup(sections).get(sectionId);
  return section?.content || {};
}

/**
 * Check if section is enabled
 */
function isSectionEnabled(sections: SectionConfig[], sectionId: string): boolean {
  const section = getSectionLookup(sections).get(sectionId);
  return section?.enabled ?? true;
}

function splitCommaList(value: string, fallback: string[]): string[] {
  const source = value.trim() ? value : fallback.join(", ");
  return source
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function splitNumberList(value: string, fallback: number[]): number[] {
  const source = value.trim() ? value : fallback.join(", ");
  const parsed = source
    .split(",")
    .map((item) => Number.parseFloat(item.trim()))
    .filter((item) => Number.isFinite(item));

  return parsed.length > 0 ? parsed : fallback;
}

function normalizeSeries(values: number[], targetLength: number): number[] {
  if (targetLength <= 0) return [];

  if (values.length === targetLength) {
    return values.map((value) => Math.max(0, value));
  }

  const normalized = Array.from({ length: targetLength }, (_unused, index) => {
    if (values.length === 0) return 0;
    return values[index % values.length] ?? values[values.length - 1] ?? 0;
  });

  return normalized.map((value) => Math.max(0, value));
}

function estimateReadingTime(text: string): string {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.round(wordCount / 90));
  return `${minutes} min read`;
}

function buildDashboardCellValue(column: string, rowIndex: number): string {
  const normalized = column.toLowerCase();
  const names = ["Avery Johnson", "Morgan Chen", "Riley Carter", "Jordan Kim", "Casey Patel"];
  const owners = ["Ops Team", "Growth Team", "Finance Team", "Platform Team", "CS Team"];
  const statuses = ["Completed", "Pending", "At Risk", "In Progress", "Blocked"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const dates = ["Mar 03, 2026", "Mar 02, 2026", "Mar 01, 2026", "Feb 28, 2026", "Feb 27, 2026"];
  const regions = ["US-East", "US-West", "EU-Central", "APAC-SG", "Global"];

  if (normalized.includes("id") || normalized.includes("order")) {
    return `#${(1200 + rowIndex).toString()}`;
  }
  if (normalized.includes("customer") || normalized.includes("account") || normalized.includes("name")) {
    return names[rowIndex % names.length];
  }
  if (normalized.includes("owner") || normalized.includes("team") || normalized.includes("csm")) {
    return owners[rowIndex % owners.length];
  }
  if (normalized.includes("status") || normalized.includes("health")) {
    return statuses[rowIndex % statuses.length];
  }
  if (normalized.includes("priority")) {
    return priorities[rowIndex % priorities.length];
  }
  if (normalized.includes("arr") || normalized.includes("revenue") || normalized.includes("amount")) {
    const value = 11000 + rowIndex * 1850;
    return `$${value.toLocaleString()}`;
  }
  if (normalized.includes("score")) {
    return `${88 - rowIndex * 4}`;
  }
  if (normalized.includes("date") || normalized.includes("time") || normalized.includes("updated")) {
    return dates[rowIndex % dates.length];
  }
  if (normalized.includes("region")) {
    return regions[rowIndex % regions.length];
  }

  return `Value ${rowIndex + 1}`;
}

/**
 * Generate CSS variables string from StyleInput
 */
function getCssVariables(styleInput: StyleInput): Record<string, string> {
  if (styleInput.type === "builtin") {
    const { colors } = styleInput.style;
    return {
      primary: colors.primary,
      secondary: colors.secondary,
      "accent-1": colors.accent[0] || colors.primary,
      "accent-2": colors.accent[1] || colors.secondary,
      "accent-3": colors.accent[2] || colors.primary,
      background: colors.secondary,
      foreground: colors.primary,
      muted: "#6b7280",
    };
  } else {
    const { colors } = styleInput.style.definition;
    return {
      primary: colors.primary,
      secondary: colors.secondary,
      "accent-1": colors.accent[0] || colors.primary,
      "accent-2": colors.accent[1] || colors.secondary,
      "accent-3": colors.accent[2] || colors.primary,
      background: colors.background,
      foreground: colors.foreground,
      muted: colors.muted,
    };
  }
}

/**
 * Generate Tailwind config content
 */
function generateTailwindConfig(vars: Record<string, string>): string {
  return `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "${vars.primary}",
        secondary: "${vars.secondary}",
        accent: {
          1: "${vars["accent-1"]}",
          2: "${vars["accent-2"]}",
          3: "${vars["accent-3"]}",
        },
        background: "${vars.background}",
        foreground: "${vars.foreground}",
        muted: "${vars.muted}",
      },
    },
  },
  plugins: [],
};
`;
}

/**
 * Generate package.json
 */
function generatePackageJson(siteName: string): string {
  const name = siteName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return JSON.stringify(
    {
      name: name || "my-site",
      private: true,
      version: "0.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
      },
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1",
      },
      devDependencies: {
        "@types/react": "^18.3.1",
        "@types/react-dom": "^18.3.1",
        "@vitejs/plugin-react": "^4.3.1",
        autoprefixer: "^10.4.20",
        postcss: "^8.4.40",
        tailwindcss: "^3.4.7",
        typescript: "^5.5.3",
        vite: "^5.4.0",
      },
    },
    null,
    2
  );
}

/**
 * Generate vite.config.ts
 */
function generateViteConfig(): string {
  return `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`;
}

/**
 * Generate tsconfig.json
 */
function generateTsConfig(): string {
  return JSON.stringify(
    {
      compilerOptions: {
        target: "ES2020",
        useDefineForClassFields: true,
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        module: "ESNext",
        skipLibCheck: true,
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        isolatedModules: true,
        moduleDetection: "force",
        noEmit: true,
        jsx: "react-jsx",
        strict: true,
      },
      include: ["src"],
    },
    null,
    2
  );
}

/**
 * Generate postcss.config.js
 */
function generatePostcssConfig(): string {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
}

/**
 * Generate index.html for Vite
 */
function generateIndexHtml(siteName: string, siteDescription: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${siteDescription}" />
    <title>${siteName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

/**
 * Generate src/main.tsx
 */
function generateMainTsx(): string {
  return `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
}

/**
 * Generate src/index.css
 */
function generateIndexCss(vars: Record<string, string>): string {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --style-primary: ${vars.primary};
  --style-secondary: ${vars.secondary};
  --style-accent-1: ${vars["accent-1"]};
  --style-accent-2: ${vars["accent-2"]};
  --style-accent-3: ${vars["accent-3"]};
  --style-background: ${vars.background};
  --style-foreground: ${vars.foreground};
  --style-muted: ${vars.muted};
}

@layer base {
  body {
    @apply bg-background text-foreground antialiased;
  }
}
`;
}

/**
 * Generate landing page App.tsx
 */
function generateLandingAppTsx(config: GeneratorConfig): string {
  const { sections } = config;
  const imports: string[] = [];
  const components: string[] = [];

  if (isSectionEnabled(sections, "hero")) {
    imports.push('import { Hero } from "./components/Hero";');
    components.push("      <Hero />");
  }
  if (isSectionEnabled(sections, "features")) {
    imports.push('import { Features } from "./components/Features";');
    components.push("      <Features />");
  }
  if (isSectionEnabled(sections, "cta")) {
    imports.push('import { CTA } from "./components/CTA";');
    components.push("      <CTA />");
  }
  if (isSectionEnabled(sections, "footer")) {
    imports.push('import { Footer } from "./components/Footer";');
    components.push("      <Footer />");
  }

  return `${imports.join("\n")}

export default function App() {
  return (
    <main>
${components.join("\n")}
    </main>
  );
}
`;
}

/**
 * Generate landing Hero component
 */
function generateHeroComponent(content: Record<string, string>): string {
  const headline = content.headline || "Build Better Products";
  const subheadline = content.subheadline || "We help teams turn ideas into reality faster.";
  const ctaText = content.ctaText || "Get Started";
  const ctaSecondaryText = content.ctaSecondaryText || "Watch Demo";

  return `export function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-secondary to-background">
      <div className="max-w-[1200px] mx-auto px-4 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            ${headline}
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
            ${subheadline}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
            >
              ${ctaText}
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded font-medium hover:bg-primary hover:text-background transition"
            >
              ${ctaSecondaryText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
`;
}

/**
 * Generate landing Features component
 */
function generateFeaturesComponent(content: Record<string, string>): string {
  const title = content.title || "Core Features";
  const subtitle = content.subtitle || "We provide comprehensive solutions.";

  const features = [
    { title: content.feature1Title || "Fast Deploy", desc: content.feature1Desc || "Deploy to cloud in minutes." },
    { title: content.feature2Title || "Secure & Reliable", desc: content.feature2Desc || "Enterprise-grade security." },
    { title: content.feature3Title || "Flexible Scaling", desc: content.feature3Desc || "Scale on demand." },
  ];

  const featureItems = features
    .map(
      (f) => `        <div className="bg-background border border-muted/30 rounded p-6 text-center shadow-sm">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-primary text-background rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">${f.title}</h3>
          <p className="text-muted leading-relaxed">${f.desc}</p>
        </div>`
    )
    .join("\n");

  return `export function Features() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">${title}</h2>
          <p className="text-muted">${subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
${featureItems}
        </div>
      </div>
    </section>
  );
}
`;
}

/**
 * Generate landing CTA component
 */
function generateCtaComponent(content: Record<string, string>): string {
  const title = content.title || "Ready to get started?";
  const description = content.description || "Join thousands of companies already using our product.";
  const buttonText = content.buttonText || "Sign Up Free";

  return `export function CTA() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">${title}</h2>
        <p className="text-muted mb-8">${description}</p>
        <a
          href="#"
          className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
        >
          ${buttonText}
        </a>
      </div>
    </section>
  );
}
`;
}

/**
 * Generate landing Footer component
 */
function generateFooterComponent(content: Record<string, string>): string {
  const copyright = content.copyright || "2024 Your Company. All rights reserved.";
  const linksStr = content.links || "About, Terms, Privacy";
  const links = linksStr.split(",").map((l) => l.trim());

  const linkElements = links
    .map((link) => `          <a href="#" className="text-sm text-muted hover:text-foreground transition">${link}</a>`)
    .join("\n");

  return `export function Footer() {
  return (
    <footer className="py-8 border-t border-muted/30">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-6 flex-wrap justify-center">
${linkElements}
        </div>
        <p className="text-sm text-muted">${copyright}</p>
      </div>
    </footer>
  );
}
`;
}

/**
 * Generate portfolio App.tsx
 */
function generatePortfolioAppTsx(config: GeneratorConfig): string {
  const { sections } = config;
  const imports: string[] = [];
  const components: string[] = [];

  if (isSectionEnabled(sections, "hero")) {
    imports.push('import { Hero } from "./components/Hero";');
    components.push("      <Hero />");
  }
  if (isSectionEnabled(sections, "projects")) {
    imports.push('import { Projects } from "./components/Projects";');
    components.push("      <Projects />");
  }
  if (isSectionEnabled(sections, "about")) {
    imports.push('import { About } from "./components/About";');
    components.push("      <About />");
  }
  if (isSectionEnabled(sections, "contact")) {
    imports.push('import { Contact } from "./components/Contact";');
    components.push("      <Contact />");
  }

  return `${imports.join("\n")}

export default function App() {
  return (
    <main>
${components.join("\n")}
    </main>
  );
}
`;
}

/**
 * Generate portfolio Hero component
 */
function generatePortfolioHeroComponent(content: Record<string, string>): string {
  const name = content.name || "Zhang San";
  const title = content.title || "Full-Stack Developer";
  const bio = content.bio || "Focused on creating beautiful, functional digital products.";
  const ctaText = content.ctaText || "View Work";

  return `export function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-secondary to-background">
      <div className="max-w-[1200px] mx-auto px-4 w-full">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-secondary border-[3px] border-primary flex items-center justify-center text-primary">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <p className="text-lg text-muted mb-2">Hello, I am</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">${name}</h1>
          <p className="text-xl text-primary font-medium mb-6">${title}</p>
          <p className="text-lg text-muted mb-8 leading-relaxed">${bio}</p>
          <a
            href="#projects"
            className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
          >
            ${ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
`;
}

/**
 * Generate portfolio Projects component
 */
function generatePortfolioProjectsComponent(content: Record<string, string>): string {
  const title = content.title || "Featured Work";
  const subtitle = content.subtitle || "Some of my recent projects.";

  const projects = [
    { title: content.project1Title || "Project 1", desc: content.project1Desc || "Description", tag: content.project1Tag || "Design" },
    { title: content.project2Title || "Project 2", desc: content.project2Desc || "Description", tag: content.project2Tag || "Development" },
    { title: content.project3Title || "Project 3", desc: content.project3Desc || "Description", tag: content.project3Tag || "Branding" },
  ];

  const projectCards = projects
    .map(
      (p, i) => `        <div className="bg-background border border-muted/30 rounded overflow-hidden shadow-sm hover:-translate-y-1 transition-transform">
          <div
            className="h-48 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--style-accent-${(i % 3) + 1}) 0%, var(--style-primary) 100%)" }}
          >
            <span className="text-6xl font-bold text-white/30">0${i + 1}</span>
          </div>
          <div className="p-6">
            <span className="inline-block text-xs uppercase tracking-wider text-primary bg-secondary px-3 py-1 rounded mb-3">${p.tag}</span>
            <h3 className="text-xl font-bold mb-2">${p.title}</h3>
            <p className="text-muted leading-relaxed mb-4">${p.desc}</p>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
              View Details
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>`
    )
    .join("\n");

  return `export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">${title}</h2>
          <p className="text-muted">${subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
${projectCards}
        </div>
      </div>
    </section>
  );
}
`;
}

/**
 * Generate portfolio About component
 */
function generatePortfolioAboutComponent(content: Record<string, string>): string {
  const title = content.title || "About Me";
  const description = content.description || "A creator passionate about design and technology.";

  const skills = [
    content.skill1 || "UI/UX Design",
    content.skill2 || "Frontend Development",
    content.skill3 || "Brand Design",
    content.skill4 || "Product Strategy",
  ];

  const skillItems = skills
    .map(
      (skill) => `          <div className="flex items-center gap-3">
            <svg className="text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>${skill}</span>
          </div>`
    )
    .join("\n");

  return `export function About() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">${title}</h2>
            <p className="text-lg text-muted leading-relaxed">${description}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Skills</h3>
            <div className="grid grid-cols-2 gap-4">
${skillItems}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`;
}

/**
 * Generate portfolio Contact component
 */
function generatePortfolioContactComponent(content: Record<string, string>): string {
  const title = content.title || "Contact";
  const description = content.description || "Interested in working together? Send me an email.";
  const email = content.email || "hello@example.com";
  const buttonText = content.buttonText || "Send Email";
  const socialLinksStr = content.socialLinks || "GitHub, Twitter, LinkedIn";
  const socialLinks = socialLinksStr.split(",").map((l) => l.trim());

  const socialButtons = socialLinks
    .map(
      (link) => `          <a href="#" className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary text-foreground hover:bg-primary hover:text-background transition" title="${link}">
            <span className="text-sm font-medium">${link[0]}</span>
          </a>`
    )
    .join("\n");

  return `export function Contact() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">${title}</h2>
        <p className="text-muted mb-8">${description}</p>
        <a
          href="mailto:${email}"
          className="inline-flex items-center px-6 py-3 bg-primary text-background rounded font-medium hover:opacity-90 transition"
        >
          ${buttonText}
        </a>
        <div className="flex justify-center gap-4 mt-8">
${socialButtons}
        </div>
      </div>
    </section>
  );
}
`;
}

/**
 * Generate blog page App.tsx
 */
function generateBlogAppTsx(config: GeneratorConfig): string {
  const { sections } = config;
  const imports: string[] = [];
  const components: string[] = [];

  if (isSectionEnabled(sections, "hero")) {
    imports.push('import { BlogHero } from "./components/BlogHero";');
    components.push("        <BlogHero />");
  }

  const hasPostsOrSidebar =
    isSectionEnabled(sections, "posts") || isSectionEnabled(sections, "sidebar");

  if (isSectionEnabled(sections, "posts")) {
    imports.push('import { BlogPosts } from "./components/BlogPosts";');
  }
  if (isSectionEnabled(sections, "sidebar")) {
    imports.push('import { BlogSidebar } from "./components/BlogSidebar";');
  }
  if (isSectionEnabled(sections, "footer")) {
    imports.push('import { Footer } from "./components/Footer";');
  }

  let body = "";
  if (isSectionEnabled(sections, "hero")) {
    body += "        <BlogHero />\n";
  }

  if (hasPostsOrSidebar) {
    body += '        <div className="flex gap-8 max-w-[1200px] mx-auto px-4 py-12">\n';
    if (isSectionEnabled(sections, "posts")) {
      body += "          <BlogPosts />\n";
    }
    if (isSectionEnabled(sections, "sidebar")) {
      body += "          <BlogSidebar />\n";
    }
    body += "        </div>\n";
  }

  if (isSectionEnabled(sections, "footer")) {
    body += "        <Footer />";
  }

  return `${imports.join("\n")}

export default function App() {
  return (
    <main>
${body}
    </main>
  );
}
`;
}

/**
 * Generate blog hero component
 */
function generateBlogHeroComponent(content: Record<string, string>): string {
  const blogName = content.blogName || "My Blog";
  const tagline = content.tagline || "Thoughts, stories, and ideas.";
  const authorName = content.authorName || "Author";
  const bio = content.authorBio || content.bio || "Writer, thinker, maker.";

  return `export function BlogHero() {
  return (
    <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
          ${blogName}
        </h1>
        <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
          ${tagline}
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full bg-secondary border-2 border-primary flex items-center justify-center text-primary">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">${authorName}</p>
            <p className="text-sm text-muted">${bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
`;
}

/**
 * Generate blog posts component
 */
function generateBlogPostsComponent(content: Record<string, string>): string {
  const sectionTitle = content.sectionTitle || "Latest Posts";

  const posts = [
    {
      date: content.post1Date || "Jan 15, 2024",
      category: content.post1Category || "Design",
      title: content.post1Title || "Building Better User Interfaces",
      excerpt: content.post1Excerpt || "Exploring the principles of clean, functional design that users love.",
    },
    {
      date: content.post2Date || "Jan 10, 2024",
      category: content.post2Category || "Development",
      title: content.post2Title || "Modern CSS Techniques",
      excerpt: content.post2Excerpt || "A deep dive into the latest CSS features and how to use them effectively.",
    },
    {
      date: content.post3Date || "Jan 5, 2024",
      category: content.post3Category || "Workflow",
      title: content.post3Title || "Streamlining Your Dev Process",
      excerpt: content.post3Excerpt || "Tips and tools for a more productive development workflow.",
    },
  ];

  const postCards = posts
    .map((p, index) => {
      const readingTime = estimateReadingTime(p.excerpt);
      const isFeatured = index === 0;
      const featuredBadge = isFeatured
        ? '<span className="text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-full bg-primary text-background">Featured</span>'
        : "";
      const cardTone = isFeatured
        ? "border-primary/40 bg-secondary/35"
        : "border-muted/30 bg-background";

      return `        <article className="group border ${cardTone} rounded-xl p-6 mb-6 last:mb-0 hover:border-primary/60 hover:shadow-sm transition-all">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <time className="text-sm text-muted">${p.date}</time>
              <span className="bg-secondary text-primary text-xs font-semibold px-2.5 py-1 rounded-full">${p.category}</span>
${featuredBadge ? `              ${featuredBadge}` : ""}
            </div>
            <span className="text-xs text-muted uppercase tracking-wide">${readingTime}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 leading-tight">
            <a href="#" className="text-foreground group-hover:text-primary transition-colors">${p.title}</a>
          </h3>
          <p className="text-muted leading-relaxed mb-4">${p.excerpt}</p>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
            Continue reading
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </article>`;
    })
    .join("\n");

  return `export function BlogPosts() {
  return (
    <section className="flex-1">
      <div className="flex items-end justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold">${sectionTitle}</h2>
        <p className="text-xs uppercase tracking-wide text-muted">${posts.length} curated articles</p>
      </div>
${postCards}
    </section>
  );
}
`;
}

/**
 * Generate blog sidebar component
 */
function generateBlogSidebarComponent(content: Record<string, string>): string {
  const aboutTitle = content.aboutTitle || "About this publication";
  const aboutText = content.aboutText || "A blog about design, development, and creative work.";
  const categoriesStr = content.categories || "Design, Development, Workflow, Tutorials";
  const tagsStr = content.tags || "CSS, React, TypeScript, UI, UX, Tailwind, Node.js";

  const categories = splitCommaList(categoriesStr, ["Design", "Development", "Workflow"]);
  const tags = splitCommaList(tagsStr, ["CSS", "React", "TypeScript"]);

  const categoryItems = categories
    .map(
      (cat, index) =>
        `            <li>
              <a href="#" className="flex items-center justify-between text-muted hover:text-foreground transition">
                <span>${cat}</span>
                <span className="text-xs text-muted/70">${Math.max(3, 14 - index * 2)}</span>
              </a>
            </li>`
    )
    .join("\n");

  const tagItems = tags
    .map(
      (tag) =>
        `          <a href="#" className="bg-secondary rounded-full px-3 py-1 text-sm text-foreground hover:bg-primary hover:text-background transition">${tag}</a>`
    )
    .join("\n");

  return `export function BlogSidebar() {
  return (
    <aside className="w-80 shrink-0 hidden lg:block space-y-6">
      <div className="bg-secondary rounded-lg p-4 mb-6">
        <h3 className="font-bold mb-2">${aboutTitle}</h3>
        <p className="text-sm text-muted leading-relaxed">${aboutText}</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-3">Categories</h3>
        <ul className="space-y-2">
${categoryItems}
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
${tagItems}
        </div>
      </div>
      <div className="rounded-lg border border-muted/30 p-4">
        <h3 className="font-bold mb-2">Newsletter</h3>
        <p className="text-sm text-muted leading-relaxed mb-3">Get one practical article every week.</p>
        <button className="w-full px-3 py-2 text-sm font-semibold bg-primary text-background rounded hover:opacity-90 transition">
          Subscribe
        </button>
      </div>
    </aside>
  );
}
`;
}

/**
 * Generate blog footer component
 */
function generateBlogFooterComponent(content: Record<string, string>): string {
  const copyright = content.copyright || "2024 My Blog. All rights reserved.";
  const linksStr = content.links || "RSS, About, Contact, Privacy";
  const links = linksStr.split(",").map((l) => l.trim());

  const linkElements = links
    .map(
      (link) =>
        `          <a href="#" className="text-sm text-muted hover:text-foreground transition">${link}</a>`
    )
    .join("\n");

  return `export function Footer() {
  return (
    <footer className="border-t border-muted/30 py-8">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-6 flex-wrap justify-center">
${linkElements}
        </div>
        <p className="text-sm text-muted">${copyright}</p>
      </div>
    </footer>
  );
}
`;
}

/**
 * Generate dashboard page App.tsx
 */
function generateDashboardAppTsx(config: GeneratorConfig): string {
  const { sections, globalContent } = config;
  const imports: string[] = [];
  const appTitle = globalContent.siteName || "Operations Dashboard";
  const appDescription = globalContent.siteDescription || "Track performance and critical metrics.";

  if (isSectionEnabled(sections, "sidebar")) {
    imports.push('import { Sidebar } from "./components/Sidebar";');
  }
  if (isSectionEnabled(sections, "kpi")) {
    imports.push('import { KpiCards } from "./components/KpiCards";');
  }
  if (isSectionEnabled(sections, "charts")) {
    imports.push('import { Charts } from "./components/Charts";');
  }
  if (isSectionEnabled(sections, "table")) {
    imports.push('import { DataTable } from "./components/DataTable";');
  }
  if (isSectionEnabled(sections, "footer")) {
    imports.push('import { Footer } from "./components/Footer";');
  }

  let mainContent = "";
  if (isSectionEnabled(sections, "kpi")) {
    mainContent += "            <KpiCards />\n";
  }
  if (isSectionEnabled(sections, "charts")) {
    mainContent += "            <Charts />\n";
  }
  if (isSectionEnabled(sections, "table")) {
    mainContent += "            <DataTable />\n";
  }

  return `${imports.join("\n")}

export default function App() {
  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="flex min-h-screen">
${isSectionEnabled(sections, "sidebar") ? "        <Sidebar />\n" : ""}        <div className="flex-1 flex flex-col">
          <header className="border-b border-muted/30 bg-background/90 backdrop-blur">
            <div className="px-6 py-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Control Center</p>
                <h1 className="text-2xl font-bold text-foreground mt-1">${appTitle}</h1>
                <p className="text-sm text-muted mt-1 max-w-2xl">${appDescription}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="px-3 py-2 rounded-lg border border-muted/30 bg-background">
                  <p className="text-muted">Latency</p>
                  <p className="font-semibold text-foreground">128ms</p>
                </div>
                <div className="px-3 py-2 rounded-lg border border-muted/30 bg-background">
                  <p className="text-muted">Incidents</p>
                  <p className="font-semibold text-foreground">0 open</p>
                </div>
              </div>
            </div>
          </header>
          <div className="flex-1 p-6 space-y-6">
${mainContent}          </div>
${isSectionEnabled(sections, "footer") ? "          <Footer />\n" : ""}        </div>
      </div>
    </div>
  );
}
`;
}

/**
 * Generate dashboard sidebar component
 */
function generateDashboardSidebarComponent(content: Record<string, string>): string {
  const appName = content.appName || "Dashboard";
  const navItemsStr = content.navItems || "Overview, Analytics, Reports, Settings";
  const navItems = splitCommaList(navItemsStr, ["Overview", "Analytics", "Reports", "Settings"]);
  const activeItem = content.activeItem || navItems[0] || "Overview";

  const navElements = navItems
    .map(
      (item, i) => {
        const isActive = item.toLowerCase() === activeItem.toLowerCase();
        return `          <a
            href="#"
            className="${isActive ? "flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white font-medium" : "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition"}"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              ${i === 0 ? '<rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />' : i === 1 ? '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />' : i === 2 ? '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />' : '<circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />'}
            </svg>
            ${item}
          </a>`;
      }
    )
    .join("\n");

  return `export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="px-4 py-5 border-b border-white/10">
        <h1 className="text-lg font-bold">${appName}</h1>
      </div>
      <nav className="flex-1 p-3 space-y-1">
${navElements}
      </nav>
      <div className="p-3 border-t border-white/10">
        <div className="rounded-lg bg-white/5 px-3 py-2">
          <p className="text-xs uppercase tracking-wide text-gray-400">Status</p>
          <p className="text-sm font-medium text-white">All systems operational</p>
        </div>
      </div>
    </aside>
  );
}
`;
}

/**
 * Generate dashboard KPI cards component
 */
function generateDashboardKpiComponent(content: Record<string, string>): string {
  const sectionTitle = content.sectionTitle || "Performance Snapshot";
  const kpis = [
    {
      label: content.kpi1Label || "Total Revenue",
      value: content.kpi1Value || "$45,231",
      change: content.kpi1Change || "+20.1%",
    },
    {
      label: content.kpi2Label || "Active Users",
      value: content.kpi2Value || "2,350",
      change: content.kpi2Change || "+15.3%",
    },
    {
      label: content.kpi3Label || "Conversion Rate",
      value: content.kpi3Value || "3.2%",
      change: content.kpi3Change || "-2.1%",
    },
    {
      label: content.kpi4Label || "Avg. Order Value",
      value: content.kpi4Value || "$124",
      change: content.kpi4Change || "+8.4%",
    },
  ];

  const sparklineProfiles = [
    ["h-2", "h-3", "h-4", "h-5", "h-6"],
    ["h-3", "h-4", "h-5", "h-4", "h-6"],
    ["h-5", "h-4", "h-3", "h-2", "h-3"],
    ["h-2", "h-3", "h-5", "h-4", "h-5"],
  ];

  const kpiCards = kpis
    .map((kpi, index) => {
      const isPositive = !kpi.change.trim().startsWith("-");
      const normalizedChange = kpi.change.replace(/^[+-]/, "");
      const changeTone = isPositive
        ? "text-emerald-700 bg-emerald-50"
        : "text-red-700 bg-red-50";
      const changeLabel = `${isPositive ? "Up" : "Down"} ${normalizedChange}`;
      const bars = (sparklineProfiles[index] || sparklineProfiles[0])
        .map(
          (heightClass) =>
            `            <span className="w-1.5 rounded-sm bg-primary/35 ${heightClass}" />`
        )
        .join("\n");

      return `        <div className="bg-background border border-muted/30 rounded-lg p-5 shadow-sm">
          <p className="text-sm text-muted mb-1">${kpi.label}</p>
          <p className="text-2xl font-bold text-foreground">${kpi.value}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${changeTone}">
              ${changeLabel}
            </span>
            <span className="text-xs text-muted">vs last period</span>
          </div>
          <div className="mt-4 h-7 flex items-end gap-1">
${bars}
          </div>
        </div>`;
    })
    .join("\n");

  return `export function KpiCards() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">${sectionTitle}</h2>
        <span className="text-xs uppercase tracking-wide text-muted">Updated just now</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
${kpiCards}
      </div>
    </section>
  );
}
`;
}
/**
 * Generate dashboard charts component
 */
function generateDashboardChartsComponent(content: Record<string, string>): string {
  const chartTitle = content.chartTitle || "Analytics Overview";
  const chartType = (content.chartType || "bar").toLowerCase();
  const chartSummary = content.chartSummary || "Compare performance trends across key segments.";

  const labels = splitCommaList(content.chartLabels || "", ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]);
  const primarySeriesLabel = content.primarySeriesLabel || "Current";
  const secondarySeriesLabel = content.secondarySeriesLabel || "Target";

  const primarySeries = normalizeSeries(
    splitNumberList(content.primarySeriesValues || "", [42, 54, 61, 58, 72, 81]),
    labels.length
  );
  const secondarySeries = normalizeSeries(
    splitNumberList(content.secondarySeriesValues || "", [38, 46, 52, 56, 62, 68]),
    labels.length
  );

  const chartTypeLabel = chartType === "line"
    ? "Trend analysis"
    : chartType === "pie"
      ? "Segment share"
      : "Monthly comparison";

  const maxValue = Math.max(1, ...primarySeries, ...secondarySeries);
  const horizontalStep = labels.length > 1 ? 304 / (labels.length - 1) : 0;

  const primaryLinePoints = primarySeries
    .map((value, index) => {
      const x = 8 + index * horizontalStep;
      const y = 128 - (value / maxValue) * 92;
      return `${Math.round(x)},${Math.round(y)}`;
    })
    .join(" ");

  const secondaryLinePoints = secondarySeries
    .map((value, index) => {
      const x = 8 + index * horizontalStep;
      const y = 128 - (value / maxValue) * 92;
      return `${Math.round(x)},${Math.round(y)}`;
    })
    .join(" ");

  const highlightPoints = primarySeries
    .map((value, index) => {
      if (!(index === 0 || index === primarySeries.length - 1 || index % 2 === 1)) {
        return "";
      }

      const x = 8 + index * horizontalStep;
      const y = 128 - (value / maxValue) * 92;
      return `          <circle cx="${Math.round(x)}" cy="${Math.round(y)}" r="3.5" fill="currentColor" />`;
    })
    .filter(Boolean)
    .join("\n");

  const axisLabels = labels
    .map((label) => `          <span>${label}</span>`)
    .join("\n");

  const barGroups = labels
    .map((label, index) => {
      const primaryHeight = Math.max(12, Math.round((primarySeries[index] / maxValue) * 100));
      const secondaryHeight = Math.max(12, Math.round((secondarySeries[index] / maxValue) * 100));

      return `          <div className="flex-1 min-w-[44px] text-center">
            <div className="h-44 flex items-end justify-center gap-1.5">
              <div className="w-3 rounded-t bg-primary/40" style={{ height: "${secondaryHeight}%" }} />
              <div className="w-3 rounded-t bg-primary" style={{ height: "${primaryHeight}%" }} />
            </div>
            <p className="text-xs text-muted mt-2">${label}</p>
          </div>`;
    })
    .join("\n");

  const piePalette = ["var(--style-primary)", "var(--style-accent-1)", "var(--style-accent-2)", "var(--style-accent-3)"];
  const pieEntries = labels
    .map((label, index) => ({
      label,
      value: primarySeries[index] ?? 0,
    }))
    .filter((entry) => entry.value > 0)
    .slice(0, 4);

  if (pieEntries.length === 0) {
    pieEntries.push({ label: "Segment", value: 1 });
  }

  const pieTotal = pieEntries.reduce((sum, entry) => sum + entry.value, 0);
  let cursor = 0;
  const pieSegments = pieEntries.map((entry, index) => {
    const percent = (entry.value / pieTotal) * 100;
    const start = cursor;
    const end = cursor + percent;
    cursor = end;

    return {
      ...entry,
      percent,
      start,
      end,
      color: piePalette[index % piePalette.length],
    };
  });

  const pieGradient = pieSegments
    .map((segment) => `${segment.color} ${segment.start.toFixed(2)}% ${segment.end.toFixed(2)}%`)
    .join(", ");

  const pieLegend = pieSegments
    .map(
      (segment) => `          <div className="flex items-center justify-between gap-8">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "${segment.color}" }} />
              ${segment.label}
            </span>
            <span className="font-semibold">${Math.round(segment.percent)}%</span>
          </div>`
    )
    .join("\n");

  const latestValue = primarySeries[primarySeries.length - 1] ?? 0;
  const previousValue = primarySeries[primarySeries.length - 2] ?? latestValue;
  const deltaPercent = previousValue === 0 ? 0 : ((latestValue - previousValue) / previousValue) * 100;
  const deltaLabel = `${deltaPercent >= 0 ? "+" : ""}${deltaPercent.toFixed(1)}%`;
  const averageValue = primarySeries.reduce((sum, value) => sum + value, 0) / Math.max(1, primarySeries.length);
  const peakIndex = primarySeries.indexOf(Math.max(...primarySeries));
  const peakLabel = labels[peakIndex] || labels[labels.length - 1] || "n/a";

  const chartBody = chartType === "line"
    ? `      <div className="rounded-lg border border-muted/30 p-4 bg-background/80">
        <svg viewBox="0 0 320 160" className="w-full h-44 text-primary">
          <line x1="8" y1="128" x2="312" y2="128" stroke="rgba(120,120,120,0.35)" strokeWidth="1" />
          <line x1="8" y1="88" x2="312" y2="88" stroke="rgba(120,120,120,0.22)" strokeWidth="1" />
          <line x1="8" y1="48" x2="312" y2="48" stroke="rgba(120,120,120,0.14)" strokeWidth="1" />
          <polyline
            fill="none"
            stroke="rgba(120,120,120,0.6)"
            strokeWidth="2"
            points="${secondaryLinePoints}"
          />
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            points="${primaryLinePoints}"
          />
${highlightPoints}
        </svg>
        <div className="mt-3 flex justify-between text-xs text-muted">
${axisLabels}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <span className="inline-flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-primary" />${primarySeriesLabel}</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-muted" />${secondarySeriesLabel}</span>
        </div>
      </div>`
    : chartType === "pie"
      ? `      <div className="rounded-lg border border-muted/30 p-4 bg-background/80 md:flex items-center gap-8">
        <div className="mx-auto md:mx-0 w-36 h-36 rounded-full relative" style={{ background: "conic-gradient(${pieGradient})" }}>
          <div className="absolute inset-[22%] rounded-full bg-background border border-muted/30" />
        </div>
        <div className="mt-5 md:mt-0 space-y-3 text-sm">
          <p className="text-xs uppercase tracking-wide text-muted">${primarySeriesLabel}</p>
${pieLegend}
          <p className="text-xs text-muted">Benchmark: ${secondarySeriesLabel}</p>
        </div>
      </div>`
      : `      <div className="rounded-lg border border-muted/30 p-4 bg-background/80">
        <div className="flex items-end gap-3">
${barGroups}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <span className="inline-flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-primary" />${primarySeriesLabel}</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-primary/40" />${secondarySeriesLabel}</span>
        </div>
      </div>`;

  return `export function Charts() {
  return (
    <section className="bg-background border border-muted/30 rounded-lg p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">${chartTitle}</h2>
          <p className="text-sm text-muted">${chartSummary}</p>
        </div>
        <span className="text-xs uppercase tracking-wide text-muted">${chartTypeLabel}</span>
      </div>
${chartBody}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border border-muted/30 px-3 py-2">
          <p className="text-xs uppercase tracking-wide text-muted">Latest</p>
          <p className="text-sm font-semibold text-foreground mt-1">${latestValue.toFixed(1)}</p>
        </div>
        <div className="rounded-lg border border-muted/30 px-3 py-2">
          <p className="text-xs uppercase tracking-wide text-muted">Period change</p>
          <p className="text-sm font-semibold text-foreground mt-1">${deltaLabel}</p>
        </div>
        <div className="rounded-lg border border-muted/30 px-3 py-2">
          <p className="text-xs uppercase tracking-wide text-muted">Peak month</p>
          <p className="text-sm font-semibold text-foreground mt-1">${peakLabel} / ${averageValue.toFixed(1)} avg</p>
        </div>
      </div>
    </section>
  );
}
`;
}
/**
 * Generate dashboard data table component
 */
function generateDashboardTableComponent(content: Record<string, string>): string {
  const tableTitle = content.tableTitle || "Recent Transactions";
  const columnsStr = content.columns || "ID, Customer, Amount, Status, Date";
  const columns = splitCommaList(columnsStr, ["ID", "Customer", "Amount", "Status", "Date"]);
  const requestedRows = Number.parseInt(content.rowCount || "5", 10);
  const rowCount = Number.isFinite(requestedRows)
    ? Math.min(20, Math.max(1, requestedRows))
    : 5;
  const tableMeta = `${rowCount} ${rowCount === 1 ? "row" : "rows"} shown`;

  const headerCells = columns
    .map(
      (col) =>
        `              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">${col}</th>`
    )
    .join("\n");

  const sampleData = Array.from({ length: rowCount }, (_, rowIndex) =>
    columns.map((column) => buildDashboardCellValue(column, rowIndex))
  );

  const rows = sampleData
    .map((row, rowIndex) => {
      const cells = row
        .map((cell, cellIndex) => {
          const column = columns[cellIndex]?.toLowerCase() || "";
          if (column.includes("status") || column.includes("health")) {
            const tone = cell.toLowerCase().includes("risk") || cell.toLowerCase().includes("blocked")
              ? "bg-red-50 text-red-700"
              : cell.toLowerCase().includes("pending") || cell.toLowerCase().includes("progress")
                ? "bg-amber-50 text-amber-700"
                : "bg-emerald-50 text-emerald-700";
            return `              <td className="px-4 py-3 text-sm"><span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold ${tone}">${cell}</span></td>`;
          }
          if (cellIndex === 0) {
            return `              <td className="px-4 py-3 text-sm font-medium text-foreground">${cell}</td>`;
          }
          return `              <td className="px-4 py-3 text-sm text-foreground">${cell}</td>`;
        })
        .join("\n");

      return `            <tr className="${rowIndex % 2 === 1 ? "bg-secondary/30" : "bg-background"} hover:bg-secondary/40 transition-colors">
${cells}
            </tr>`;
    })
    .join("\n");

  return `export function DataTable() {
  return (
    <div className="bg-background border border-muted/30 rounded-lg shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-muted/30 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">${tableTitle}</h2>
          <p className="text-xs text-muted mt-1">${tableMeta} - sorted by latest update</p>
        </div>
        <button className="px-3 py-1.5 text-xs font-medium border border-muted/40 rounded hover:border-primary hover:text-primary transition-colors">
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-secondary/50">
            <tr>
${headerCells}
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/20">
${rows}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;
}
/**
 * Generate dashboard footer component
 */
function generateDashboardFooterComponent(content: Record<string, string>): string {
  const copyright = content.copyright || "2024 Dashboard App. All rights reserved.";
  const version = content.version || "v1.0.0";

  return `export function Footer() {
  return (
    <footer className="py-4 px-6 border-t border-muted/30">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">${copyright}</p>
        <p className="text-sm text-muted">${version}</p>
      </div>
    </footer>
  );
}
`;
}

/**
 * Generate all React files for output
 */
export function generateReactFiles(
  config: GeneratorConfig,
  styleInput: StyleInput
): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const { sections, globalContent } = config;
  const cssVars = getCssVariables(styleInput);

  // Config files
  files.push({ name: "package.json", content: generatePackageJson(globalContent.siteName), type: "json" });
  files.push({ name: "vite.config.ts", content: generateViteConfig(), type: "js" });
  files.push({ name: "tsconfig.json", content: generateTsConfig(), type: "json" });
  files.push({ name: "postcss.config.js", content: generatePostcssConfig(), type: "js" });
  files.push({ name: "tailwind.config.js", content: generateTailwindConfig(cssVars), type: "js" });
  files.push({ name: "index.html", content: generateIndexHtml(globalContent.siteName, globalContent.siteDescription), type: "html" });

  // Source files
  files.push({ name: "src/main.tsx", content: generateMainTsx(), type: "js" });
  files.push({ name: "src/index.css", content: generateIndexCss(cssVars), type: "css" });

  if (config.templateType === "landing") {
    files.push({ name: "src/App.tsx", content: generateLandingAppTsx(config), type: "js" });

    if (isSectionEnabled(sections, "hero")) {
      files.push({ name: "src/components/Hero.tsx", content: generateHeroComponent(getSectionContent(sections, "hero")), type: "js" });
    }
    if (isSectionEnabled(sections, "features")) {
      files.push({ name: "src/components/Features.tsx", content: generateFeaturesComponent(getSectionContent(sections, "features")), type: "js" });
    }
    if (isSectionEnabled(sections, "cta")) {
      files.push({ name: "src/components/CTA.tsx", content: generateCtaComponent(getSectionContent(sections, "cta")), type: "js" });
    }
    if (isSectionEnabled(sections, "footer")) {
      files.push({ name: "src/components/Footer.tsx", content: generateFooterComponent(getSectionContent(sections, "footer")), type: "js" });
    }
  } else if (config.templateType === "portfolio") {
    files.push({ name: "src/App.tsx", content: generatePortfolioAppTsx(config), type: "js" });

    if (isSectionEnabled(sections, "hero")) {
      files.push({ name: "src/components/Hero.tsx", content: generatePortfolioHeroComponent(getSectionContent(sections, "hero")), type: "js" });
    }
    if (isSectionEnabled(sections, "projects")) {
      files.push({ name: "src/components/Projects.tsx", content: generatePortfolioProjectsComponent(getSectionContent(sections, "projects")), type: "js" });
    }
    if (isSectionEnabled(sections, "about")) {
      files.push({ name: "src/components/About.tsx", content: generatePortfolioAboutComponent(getSectionContent(sections, "about")), type: "js" });
    }
    if (isSectionEnabled(sections, "contact")) {
      files.push({ name: "src/components/Contact.tsx", content: generatePortfolioContactComponent(getSectionContent(sections, "contact")), type: "js" });
    }
  } else if (config.templateType === "blog") {
    files.push({ name: "src/App.tsx", content: generateBlogAppTsx(config), type: "js" });

    if (isSectionEnabled(sections, "hero")) {
      files.push({ name: "src/components/BlogHero.tsx", content: generateBlogHeroComponent(getSectionContent(sections, "hero")), type: "js" });
    }
    if (isSectionEnabled(sections, "posts")) {
      files.push({ name: "src/components/BlogPosts.tsx", content: generateBlogPostsComponent(getSectionContent(sections, "posts")), type: "js" });
    }
    if (isSectionEnabled(sections, "sidebar")) {
      files.push({ name: "src/components/BlogSidebar.tsx", content: generateBlogSidebarComponent(getSectionContent(sections, "sidebar")), type: "js" });
    }
    if (isSectionEnabled(sections, "footer")) {
      files.push({ name: "src/components/Footer.tsx", content: generateBlogFooterComponent(getSectionContent(sections, "footer")), type: "js" });
    }
  } else if (config.templateType === "dashboard") {
    files.push({ name: "src/App.tsx", content: generateDashboardAppTsx(config), type: "js" });

    if (isSectionEnabled(sections, "sidebar")) {
      files.push({ name: "src/components/Sidebar.tsx", content: generateDashboardSidebarComponent(getSectionContent(sections, "sidebar")), type: "js" });
    }
    if (isSectionEnabled(sections, "kpi")) {
      files.push({ name: "src/components/KpiCards.tsx", content: generateDashboardKpiComponent(getSectionContent(sections, "kpi")), type: "js" });
    }
    if (isSectionEnabled(sections, "charts")) {
      files.push({ name: "src/components/Charts.tsx", content: generateDashboardChartsComponent(getSectionContent(sections, "charts")), type: "js" });
    }
    if (isSectionEnabled(sections, "table")) {
      files.push({ name: "src/components/DataTable.tsx", content: generateDashboardTableComponent(getSectionContent(sections, "table")), type: "js" });
    }
    if (isSectionEnabled(sections, "footer")) {
      files.push({ name: "src/components/Footer.tsx", content: generateDashboardFooterComponent(getSectionContent(sections, "footer")), type: "js" });
    }
  }

  // README
  files.push({ name: "README.md", content: generateReactReadme(config, styleInput), type: "md" });

  for (const supportFile of generateGeneratorSupportFiles(config, styleInput)) {
    files.push(supportFile);
  }

  return files;
}

/**
 * Generate README for React project
 */
function generateReactReadme(config: GeneratorConfig, styleInput: StyleInput): string {
  const siteName = config.globalContent.siteName || "My Website";
  const styleName = styleInput.type === "builtin"
    ? `${styleInput.style.name} (${styleInput.style.nameEn})`
    : `${styleInput.style.name} (${styleInput.style.nameEn})`;

  return `# ${siteName}

Generated with [StyleKit](https://stylekit.dev) using the **${styleName}** style.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

\`\`\`bash
npm run build
\`\`\`

## Tech Stack

- **React** + **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for styling

## Customization

### Colors

Edit \`tailwind.config.js\` to change theme colors:

\`\`\`js
colors: {
  primary: "${styleInput.type === "builtin" ? styleInput.style.colors.primary : styleInput.style.definition.colors.primary}",
  // ...
}
\`\`\`

### Components

Each section is a separate component in \`src/components/\`.

## License

This template is free to use for personal and commercial projects.

---

Made with StyleKit
`;
}
