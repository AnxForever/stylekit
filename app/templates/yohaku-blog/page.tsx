"use client";

export const dynamic = "force-static";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  year: string;
  excerpt: string;
  readTime: string;
  content: string[];
  headings: { id: string; text: string; level: number }[];
}

type View = "home" | "posts" | "post";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SITE_NAME = "Yohaku";
const SITE_TAGLINE = "Stay hungry. Stay foolish.";

const navItems = [
  { label: "Home", view: "home" as View },
  { label: "Posts", view: "posts" as View },
  { label: "About", view: "home" as View },
];

const posts: Post[] = [
  {
    id: "design-system-tokens",
    title: "Design Tokens Are the New Design System",
    category: "Design Engineering",
    date: "2026-03-15",
    year: "2026",
    excerpt:
      "How atomic design tokens replaced monolithic component libraries and why your next project should start with tokens, not components.",
    readTime: "8 min",
    content: [
      "The traditional approach to design systems has always been component-first. We build buttons, cards, modals, and then try to make them consistent. But this approach has a fundamental flaw: it conflates structure with style.",
      "Design tokens solve this by separating the what from the how. A token like --color-primary doesn't care whether it's applied to a button or a heading. It simply defines a value that can be consumed by any element in the system.",
      "At its core, a design token is a named entity that stores a visual design attribute. Think of it as a variable, but with semantic meaning. Instead of #3b82f6, you write --color-action-primary. Instead of 16px, you write --space-4.",
      "The real power emerges when you layer tokens. Primitive tokens define raw values. Semantic tokens reference primitives and add meaning. Component tokens reference semantic tokens and add context.",
      "This layered approach means you can swap entire themes by changing only the primitive layer. Your semantic and component tokens remain stable, which means your components remain stable.",
      "The ecosystem has matured significantly. Tools like Style Dictionary, Figma Variables, and Tailwind CSS v4's design token support make it practical to adopt a token-first approach today.",
    ],
    headings: [
      { id: "problem", text: "The Component-First Problem", level: 2 },
      { id: "tokens", text: "What Are Design Tokens?", level: 2 },
      { id: "layers", text: "The Token Layer Cake", level: 2 },
      { id: "ecosystem", text: "Ecosystem & Tooling", level: 2 },
    ],
  },
  {
    id: "spring-animations",
    title: "Why Spring Animations Feel Right",
    category: "Motion Design",
    date: "2026-03-08",
    year: "2026",
    excerpt:
      "Linear easing is a lie. Real objects don't move that way. A deep dive into spring physics and why every frame matters.",
    readTime: "6 min",
    content: [
      "Open any native iOS or Android app. Notice how elements don't just slide into place -- they settle. There's an overshoot, a gentle bounce, then rest. This is spring physics at work.",
      "The fundamental equation behind spring animations is Hooke's Law: F = -kx, where F is the restoring force, k is the spring constant (stiffness), and x is the displacement from equilibrium.",
      "When you add damping to this system, you get the critically damped, underdamped, and overdamped behaviors that make interfaces feel alive. Most UI animations use underdamping for that satisfying bounce.",
      "CSS alone can approximate springs with cubic-bezier curves, but true spring animations need JavaScript. Libraries like Motion (formerly Framer Motion) and React Spring compute real physics each frame.",
      "The key parameters are stiffness, damping, and mass. Higher stiffness means snappier motion. Higher damping reduces oscillation. Mass affects how heavy the element feels.",
    ],
    headings: [
      { id: "physics", text: "The Physics Behind Springs", level: 2 },
      { id: "parameters", text: "Stiffness, Damping & Mass", level: 2 },
      { id: "css-vs-js", text: "CSS vs JavaScript Springs", level: 2 },
    ],
  },
  {
    id: "minimal-css",
    title: "The Art of Writing Less CSS",
    category: "Frontend",
    date: "2026-02-20",
    year: "2026",
    excerpt:
      "Every line of CSS you write is a line you have to maintain. Techniques for achieving more with radically less.",
    readTime: "5 min",
    content: [
      "The best CSS is the CSS you never wrote. Every property you add is a potential source of bugs, specificity conflicts, and maintenance burden. The goal isn't zero CSS -- it's minimal, intentional CSS.",
      "Start by questioning every declaration. Does this margin need to be explicit, or can the parent's gap handle it? Does this color need a custom value, or can it inherit from a design token?",
      "Modern CSS features have eliminated entire categories of hacks. Container queries replace JavaScript-based responsive logic. :has() removes the need for parent-aware JavaScript. Logical properties handle internationalization.",
      "Utility-first frameworks like Tailwind CSS take this further by constraining your design space. When you can only use predefined values, consistency emerges naturally.",
    ],
    headings: [
      { id: "less-is-more", text: "Less Is More", level: 2 },
      { id: "modern-css", text: "Modern CSS Eliminates Hacks", level: 2 },
      { id: "utility-first", text: "The Utility-First Approach", level: 2 },
    ],
  },
  {
    id: "typography-web",
    title: "Typography on the Web Is Broken",
    category: "Typography",
    date: "2025-12-10",
    year: "2025",
    excerpt:
      "We have beautiful typefaces but terrible defaults. How to fix line-height, measure, and vertical rhythm in your projects.",
    readTime: "7 min",
    content: [
      "The browser's default line-height of 1.2 is too tight for body text. Research suggests 1.5 to 1.7 for optimal readability, yet most websites never change it.",
      "Measure -- the number of characters per line -- is equally neglected. The ideal range is 45 to 75 characters. This is why max-width on prose containers matters so much.",
      "Vertical rhythm creates visual harmony by aligning all elements to a baseline grid. While pixel-perfect baseline grids are impractical on the web, consistent spacing multiples achieve a similar effect.",
      "Font loading is another pain point. FOUT, FOIT, and layout shift from web fonts can destroy the reading experience. The font-display: swap strategy with size-adjust provides the best balance.",
    ],
    headings: [
      { id: "line-height", text: "Line Height Defaults Are Wrong", level: 2 },
      { id: "measure", text: "The 45-75 Character Rule", level: 2 },
      { id: "rhythm", text: "Vertical Rhythm", level: 2 },
      { id: "loading", text: "Font Loading Strategy", level: 2 },
    ],
  },
  {
    id: "color-spaces",
    title: "Beyond RGB: oklch and the Future of Color",
    category: "Color Theory",
    date: "2025-11-28",
    year: "2025",
    excerpt:
      "Why perceptual uniformity matters and how oklch changes the way we think about color palettes.",
    readTime: "9 min",
    content: [
      "RGB is a hardware color model. It describes how screens emit light, not how humans perceive color. This disconnect means that mathematically equidistant RGB colors don't look equidistant to our eyes.",
      "oklch fixes this by operating in a perceptually uniform color space. Equal numeric steps produce equal perceptual steps. This means you can generate consistent color palettes algorithmically.",
      "The three channels -- lightness (L), chroma (C), and hue (H) -- map directly to how we think about color. Want a darker shade? Reduce L. Want it more vivid? Increase C. Want a different hue? Change H.",
      "CSS now supports oklch() natively. Combined with CSS custom properties and color-mix(), you can build entire theme systems with just a few base values.",
    ],
    headings: [
      { id: "rgb-problem", text: "The RGB Problem", level: 2 },
      { id: "oklch", text: "How oklch Works", level: 2 },
      { id: "css-native", text: "Native CSS Support", level: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function groupByYear(items: Post[]): Record<string, Post[]> {
  const groups: Record<string, Post[]> = {};
  for (const p of items) {
    (groups[p.year] ??= []).push(p);
  }
  return groups;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Paper Texture SVG (inline, no external dependency)
// ---------------------------------------------------------------------------

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "oklch(0.55 0.15 250)",
        }}
      />
    </div>
  );
}

function Header({
  currentView,
  onNavigate,
}: {
  currentView: View;
  onNavigate: (v: View) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--yh-bg)]/80 backdrop-blur-xl shadow-[0_1px_0_var(--yh-border)]"
          : "bg-transparent"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <button
          onClick={() => onNavigate("home")}
          className="text-lg font-semibold tracking-tight text-[var(--yh-text)] transition-opacity hover:opacity-60"
        >
          {SITE_NAME}
        </button>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className={`text-sm transition-colors duration-300 ${
                currentView === item.view
                  ? "text-[var(--yh-text)] font-medium"
                  : "text-[var(--yh-muted)] hover:text-[var(--yh-text)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function FooterSection() {
  return (
    <footer className="border-t border-[var(--yh-border)] py-12 mt-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs text-[var(--yh-muted)] tracking-wide">
            {SITE_TAGLINE}
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--yh-muted)]">
            <span>RSS</span>
            <span className="text-[var(--yh-border)]">|</span>
            <span>Sitemap</span>
            <span className="text-[var(--yh-border)]">|</span>
            <span>GitHub</span>
          </div>
          <p className="text-[11px] text-[var(--yh-muted)]/60">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Views
// ---------------------------------------------------------------------------

function HomeView({ onNavigate }: { onNavigate: (v: View, postId?: string) => void }) {
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="animate-[fadeIn_0.6s_ease-out]">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <h1
            className="text-4xl md:text-5xl font-semibold leading-[1.15] tracking-tight text-[var(--yh-text)] mb-4"
            style={{
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            Hi, I&apos;m Yohaku
          </h1>
          <p className="text-lg md:text-xl text-[var(--yh-muted)] leading-relaxed max-w-xl">
            A developer who cares about the spaces between things.
            Writing about design engineering, typography, and the craft of building for the web.
          </p>
        </div>
      </section>

      {/* Activity / Recent */}
      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-medium tracking-widest uppercase text-[var(--yh-muted)]">
              Recent Writing
            </h2>
            <button
              onClick={() => onNavigate("posts")}
              className="text-xs text-[var(--yh-accent)] hover:underline underline-offset-4 transition-colors"
            >
              View all
            </button>
          </div>

          <div className="space-y-0 divide-y divide-[var(--yh-border)]">
            {recentPosts.map((post, idx) => (
              <button
                key={post.id}
                onClick={() => onNavigate("post", post.id)}
                className="group w-full text-left py-6 first:pt-0 transition-all duration-500 hover:pl-2"
                style={{
                  animationDelay: `${idx * 100}ms`,
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[var(--yh-muted)] mb-1.5 tracking-wide">
                      {post.category}
                    </p>
                    <h3 className="text-base md:text-lg font-medium text-[var(--yh-text)] group-hover:text-[var(--yh-accent)] transition-colors duration-300 leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[var(--yh-muted)] leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <time className="shrink-0 text-xs text-[var(--yh-muted)]/70 pt-0.5">
                    {formatDate(post.date)}
                  </time>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Thinking / Short thoughts */}
      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xs font-medium tracking-widest uppercase text-[var(--yh-muted)] mb-8">
            Thinking
          </h2>
          <div className="space-y-6">
            {[
              {
                text: "The best interfaces are the ones where you don't notice the interface.",
                time: "3 hours ago",
              },
              {
                text: "Just realized that 90% of CSS complexity comes from fighting the defaults instead of understanding them.",
                time: "2 days ago",
              },
              {
                text: "Reading Dieter Rams again. 'Good design is as little design as possible' hits different after shipping 100+ components.",
                time: "5 days ago",
              },
            ].map((thought, idx) => (
              <div
                key={idx}
                className="border-l-2 border-[var(--yh-border)] pl-4 py-1 transition-all duration-500 hover:border-[var(--yh-accent)] hover:pl-5"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <p className="text-sm text-[var(--yh-text)] leading-relaxed">
                  {thought.text}
                </p>
                <time className="text-[11px] text-[var(--yh-muted)]/60 mt-1 block">
                  {thought.time}
                </time>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

function PostsView({
  onNavigate,
}: {
  onNavigate: (v: View, postId?: string) => void;
}) {
  const grouped = groupByYear(posts);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="animate-[fadeIn_0.6s_ease-out]">
      <section className="pt-32 pb-8 md:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--yh-text)] mb-2">
            Posts
          </h1>
          <p className="text-sm text-[var(--yh-muted)]">
            {posts.length} articles on design, code, and craft.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-6">
          {years.map((year) => (
            <div key={year} className="mb-12 last:mb-0">
              <h2 className="text-sm font-medium text-[var(--yh-muted)]/50 mb-4 tracking-wide">
                {year}
              </h2>
              <div className="space-y-0 divide-y divide-[var(--yh-border)]">
                {grouped[year].map((post, idx) => (
                  <button
                    key={post.id}
                    onClick={() => onNavigate("post", post.id)}
                    className="group w-full text-left py-5 first:pt-0 last:pb-0 transition-all duration-500 hover:pl-2"
                    style={{
                      animationDelay: `${idx * 80}ms`,
                      transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-[var(--yh-text)] group-hover:text-[var(--yh-accent)] transition-colors duration-300 truncate">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[11px] text-[var(--yh-muted)]">
                            {post.category}
                          </span>
                          <span className="text-[var(--yh-border)]">/</span>
                          <span className="text-[11px] text-[var(--yh-muted)]/60">
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                      <time className="shrink-0 text-xs text-[var(--yh-muted)]/60 tabular-nums">
                        {formatDate(post.date)}
                      </time>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

function PostView({
  postId,
  onNavigate,
}: {
  postId: string;
  onNavigate: (v: View) => void;
}) {
  const post = posts.find((p) => p.id === postId);
  const [activeHeading, setActiveHeading] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [postId]);

  useEffect(() => {
    if (!post) return;

    function handleScroll() {
      if (!contentRef.current) return;
      const headingElements = contentRef.current.querySelectorAll("h2[id]");
      let current = "";
      for (const el of headingElements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          current = el.id;
        }
      }
      setActiveHeading(current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  if (!post) {
    return (
      <div className="pt-40 text-center text-[var(--yh-muted)]">
        Post not found.
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.6s_ease-out]">
      <ReadingProgress />

      {/* Article header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <button
            onClick={() => onNavigate("posts")}
            className="inline-flex items-center gap-1.5 text-sm text-[var(--yh-muted)] hover:text-[var(--yh-text)] transition-colors duration-300 mb-8"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 hover:-translate-x-0.5"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to posts
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] tracking-wide text-[var(--yh-accent)]">
              {post.category}
            </span>
            <span className="text-[var(--yh-border)]">/</span>
            <span className="text-[11px] text-[var(--yh-muted)]/60">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-[2.5rem] font-semibold leading-[1.2] tracking-tight text-[var(--yh-text)] mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-[var(--yh-muted)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>
      </section>

      {/* Content + TOC */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex gap-16">
            {/* Main content */}
            <article
              ref={contentRef}
              className="flex-1 max-w-3xl"
            >
              {post.content.map((paragraph, idx) => {
                const heading = post.headings[idx];
                return (
                  <div key={idx}>
                    {heading && (
                      <h2
                        id={heading.id}
                        className="text-xl font-semibold text-[var(--yh-text)] mt-12 mb-4 scroll-mt-24"
                      >
                        {heading.text}
                      </h2>
                    )}
                    <p className="text-[15px] leading-[1.8] text-[var(--yh-text)]/85 mb-6">
                      {paragraph}
                    </p>
                  </div>
                );
              })}
            </article>

            {/* TOC sidebar */}
            <aside className="hidden lg:block w-48 shrink-0">
              <div className="sticky top-32">
                <p className="text-[10px] font-medium tracking-widest uppercase text-[var(--yh-muted)]/50 mb-4">
                  On this page
                </p>
                <nav className="space-y-2">
                  {post.headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(h.id)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`block text-[13px] leading-snug transition-all duration-300 ${
                        activeHeading === h.id
                          ? "text-[var(--yh-accent)] translate-x-0.5"
                          : "text-[var(--yh-muted)] hover:text-[var(--yh-text)]"
                      }`}
                      style={{
                        transitionTimingFunction:
                          "cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Post nav */}
      <section className="border-t border-[var(--yh-border)] py-12">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex justify-between">
            {(() => {
              const currentIdx = posts.findIndex((p) => p.id === postId);
              const prevPost = currentIdx < posts.length - 1 ? posts[currentIdx + 1] : null;
              const nextPost = currentIdx > 0 ? posts[currentIdx - 1] : null;

              return (
                <>
                  <div>
                    {prevPost && (
                      <button
                        onClick={() => onNavigate("post" as View)}
                        className="text-left group"
                      >
                        <p className="text-[11px] text-[var(--yh-muted)] mb-1">Previous</p>
                        <p className="text-sm font-medium text-[var(--yh-text)] group-hover:text-[var(--yh-accent)] transition-colors">
                          {prevPost.title}
                        </p>
                      </button>
                    )}
                  </div>
                  <div>
                    {nextPost && (
                      <button
                        onClick={() => onNavigate("post" as View)}
                        className="text-right group"
                      >
                        <p className="text-[11px] text-[var(--yh-muted)] mb-1">Next</p>
                        <p className="text-sm font-medium text-[var(--yh-text)] group-hover:text-[var(--yh-accent)] transition-colors">
                          {nextPost.title}
                        </p>
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function YohakuBlogTemplate() {
  const [view, setView] = useState<View>("home");
  const [activePostId, setActivePostId] = useState<string>("");

  function navigate(v: View, postId?: string) {
    if (v === "post" && postId) {
      setActivePostId(postId);
    }
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className="min-h-screen antialiased"
      style={
        {
          "--yh-bg": "#fefdfa",
          "--yh-text": "#1c1c1e",
          "--yh-muted": "#8e8e93",
          "--yh-border": "#e5e5e7",
          "--yh-accent": "oklch(0.55 0.15 250)",
          backgroundColor: "var(--yh-bg)",
          color: "var(--yh-text)",
        } as CSSProperties
      }
    >
      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-40"
        style={{ backgroundImage: NOISE_SVG, backgroundRepeat: "repeat" }}
      />

      {/* Content */}
      <div className="relative z-[2]">
        <Header currentView={view} onNavigate={navigate} />

        {view === "home" && <HomeView onNavigate={navigate} />}
        {view === "posts" && <PostsView onNavigate={navigate} />}
        {view === "post" && (
          <PostView postId={activePostId} onNavigate={navigate} />
        )}
      </div>

      <TemplateBackButton variant="minimalist" />

      {/* Keyframe animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
