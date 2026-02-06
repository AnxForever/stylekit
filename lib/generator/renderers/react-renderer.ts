/**
 * React Renderer - Generates React component files from templates
 */

import type { GeneratorConfig, GeneratedFile, SectionConfig, StyleInput } from "../types";

/**
 * Get section content by ID
 */
function getSectionContent(sections: SectionConfig[], sectionId: string): Record<string, string> {
  const section = sections.find((s) => s.id === sectionId);
  return section?.content || {};
}

/**
 * Check if section is enabled
 */
function isSectionEnabled(sections: SectionConfig[], sectionId: string): boolean {
  const section = sections.find((s) => s.id === sectionId);
  return section?.enabled ?? true;
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
function generateIndexCss(): string {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground;
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
            style={{ background: "linear-gradient(135deg, var(--tw-accent-${(i % 3) + 1}, #888) 0%, var(--tw-primary, #333) 100%)" }}
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
  const bio = content.bio || "Writer, thinker, maker.";

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
  const sectionTitle = content.title || "Latest Posts";

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
    .map(
      (p) => `        <article className="border-b border-muted/30 pb-8 mb-8 last:border-0">
          <div className="flex items-center gap-3 mb-3">
            <time className="text-sm text-muted">${p.date}</time>
            <span className="bg-secondary text-primary text-xs font-medium px-2.5 py-0.5 rounded">${p.category}</span>
          </div>
          <h3 className="text-xl font-bold mb-2">
            <a href="#" className="text-foreground hover:text-primary transition">${p.title}</a>
          </h3>
          <p className="text-muted leading-relaxed mb-3">${p.excerpt}</p>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </article>`
    )
    .join("\n");

  return `export function BlogPosts() {
  return (
    <section className="flex-1">
      <h2 className="text-2xl font-bold mb-8">${sectionTitle}</h2>
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
  const aboutText = content.about || "A blog about design, development, and creative work.";
  const categoriesStr = content.categories || "Design, Development, Workflow, Tutorials";
  const tagsStr = content.tags || "CSS, React, TypeScript, UI, UX, Tailwind, Node.js";

  const categories = categoriesStr.split(",").map((c) => c.trim());
  const tags = tagsStr.split(",").map((t) => t.trim());

  const categoryItems = categories
    .map(
      (cat) =>
        `            <li>
              <a href="#" className="text-muted hover:text-foreground transition">${cat}</a>
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
    <aside className="w-80 shrink-0 hidden lg:block">
      <div className="bg-secondary rounded-lg p-4 mb-6">
        <h3 className="font-bold mb-2">About</h3>
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
  const { sections } = config;
  const imports: string[] = [];

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
    <div className="flex min-h-screen">
${isSectionEnabled(sections, "sidebar") ? "      <Sidebar />\n" : ""}      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 space-y-6">
${mainContent}        </div>
${isSectionEnabled(sections, "footer") ? "        <Footer />\n" : ""}      </div>
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
  const navItems = navItemsStr.split(",").map((n) => n.trim());

  const navElements = navItems
    .map(
      (item, i) =>
        `          <a
            href="#"
            className="${i === 0 ? "flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white font-medium" : "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition"}"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              ${i === 0 ? '<rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />' : i === 1 ? '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />' : i === 2 ? '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />' : '<circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />'}
            </svg>
            ${item}
          </a>`
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
    </aside>
  );
}
`;
}

/**
 * Generate dashboard KPI cards component
 */
function generateDashboardKpiComponent(content: Record<string, string>): string {
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

  const kpiCards = kpis
    .map(
      (kpi) => `        <div className="bg-background border border-muted/30 rounded-lg p-5 shadow-sm">
          <p className="text-sm text-muted mb-1">${kpi.label}</p>
          <p className="text-2xl font-bold text-foreground mb-1">${kpi.value}</p>
          <p className="${kpi.change.startsWith("+") ? "text-sm text-green-600" : "text-sm text-red-600"}">${kpi.change} from last period</p>
        </div>`
    )
    .join("\n");

  return `export function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
${kpiCards}
    </div>
  );
}
`;
}

/**
 * Generate dashboard charts component
 */
function generateDashboardChartsComponent(content: Record<string, string>): string {
  const chartTitle = content.title || "Analytics Overview";

  return `export function Charts() {
  return (
    <div className="bg-background border border-muted/30 rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-bold mb-4">${chartTitle}</h2>
      <div className="bg-secondary/50 rounded-lg aspect-[2/1] flex items-center justify-center">
        <p className="text-muted font-medium">Chart Area</p>
      </div>
    </div>
  );
}
`;
}

/**
 * Generate dashboard data table component
 */
function generateDashboardTableComponent(content: Record<string, string>): string {
  const tableTitle = content.title || "Recent Transactions";
  const columnsStr = content.columns || "ID, Customer, Amount, Status, Date";
  const columns = columnsStr.split(",").map((c) => c.trim());

  const headerCells = columns
    .map(
      (col) =>
        `              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">${col}</th>`
    )
    .join("\n");

  const sampleData = [
    ["#1001", "Alice Johnson", "$250.00", "Completed", "Jan 15, 2024"],
    ["#1002", "Bob Smith", "$120.50", "Pending", "Jan 14, 2024"],
    ["#1003", "Carol White", "$340.00", "Completed", "Jan 13, 2024"],
    ["#1004", "David Brown", "$89.99", "Failed", "Jan 12, 2024"],
    ["#1005", "Eve Davis", "$199.00", "Completed", "Jan 11, 2024"],
  ];

  const rows = sampleData
    .map(
      (row, i) =>
        `            <tr className="${i % 2 === 1 ? "bg-secondary/30" : "bg-background"}">
${row.map((cell) => `              <td className="px-4 py-3 text-sm">${cell}</td>`).join("\n")}
            </tr>`
    )
    .join("\n");

  return `export function DataTable() {
  return (
    <div className="bg-background border border-muted/30 rounded-lg shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-muted/30">
        <h2 className="text-lg font-bold">${tableTitle}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
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
  files.push({ name: "src/index.css", content: generateIndexCss(), type: "css" });

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
