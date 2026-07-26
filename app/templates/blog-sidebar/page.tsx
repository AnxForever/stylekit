"use client";

export const dynamic = "force-static";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Search,
  Tag,
  X,
  Loader2,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
interface Post {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
  content: string;
}

const posts: Post[] = [
  {
    title: "Building Design Systems at Scale",
    excerpt:
      "How to build and maintain a unified design system across large teams — from tokens to components, a complete practice guide.",
    category: "Design",
    author: "Lin Zhang",
    date: "2025-01-20",
    readTime: "8 min read",
    featured: true,
    tags: ["Design", "UI/UX", "CSS"],
    content: `A design system is more than a component library. It is a shared language between designers and engineers — one that encodes decisions about spacing, color, typography, and interaction into reusable, versioned artifacts. At scale, without a design system, teams diverge. Buttons look different across products. Spacing feels inconsistent. Onboarding new engineers takes weeks instead of days.

The foundation of a robust design system is the design token layer. Tokens are named variables that represent raw design decisions: \`color.brand.primary\`, \`spacing.4\`, \`typography.heading.lg\`. These tokens are technology-agnostic — they can be consumed by CSS custom properties, Tailwind theme extensions, or iOS/Android native themes. By defining tokens first, you ensure that a rebrand requires editing a single source of truth rather than hunting down hex values across dozens of files.

Above tokens sit components. Each component should be built with a clear contract: documented props, accessibility requirements (ARIA roles, keyboard navigation, focus management), and visual regression tests. Tools like Storybook allow teams to develop components in isolation and maintain a living catalog. Pair this with Chromatic or Percy for visual diff snapshots, and you gain a safety net that prevents accidental regressions from landing in production. Governance matters as much as tooling — establish an RFC (Request for Comment) process so that new components or breaking changes go through review before they affect consuming teams.`,
  },
  {
    title: "The Future of CSS",
    excerpt:
      "CSS Container Queries, Cascade Layers, and a roundup of upcoming CSS features that will reshape how we write styles.",
    category: "Frontend",
    author: "Yuki Tanaka",
    date: "2025-01-18",
    readTime: "6 min read",
    featured: false,
    tags: ["CSS", "Frontend"],
    content: `CSS has evolved faster in the last three years than in the previous decade. Container Queries alone represent a paradigm shift: instead of adapting layouts based on the viewport width, components can now respond to the size of their parent container. This unlocks truly reusable UI components — a card component that reflows its layout whether it appears in a narrow sidebar or a wide content grid, without needing JavaScript or wrapper-specific class overrides.

Cascade Layers (\`@layer\`) solve a problem that has frustrated developers since CSS was invented: specificity wars. By giving authors explicit control over the order in which style layers are applied, you can safely import third-party libraries without worrying that their selectors will overpower your own. Define a base layer, a components layer, and a utilities layer, and the cascade becomes predictable and maintainable.

Looking ahead, CSS Anchor Positioning promises to eliminate nearly all the JavaScript-based tooltip and popover positioning logic that currently ships in every UI library. The \`:has()\` pseudo-class — now supported across all modern browsers — enables parent selection, letting you style a form field differently when it contains an invalid input. Combined with the View Transitions API, which makes page and component transitions declarative and hardware-accelerated, the gap between what CSS can achieve natively and what previously required JavaScript is narrowing rapidly.`,
  },
  {
    title: "React Server Components Deep Dive",
    excerpt:
      "Understanding the internals of React Server Components and how they are reshaping frontend architecture decisions.",
    category: "React",
    author: "Alex Chen",
    date: "2025-01-15",
    readTime: "12 min read",
    featured: false,
    tags: ["React", "Next.js", "Performance"],
    content: `React Server Components (RSC) represent the most significant change to the React programming model since hooks. The core idea is deceptively simple: components that run only on the server can directly access databases, file systems, and secrets without exposing them to the client. The rendered output — not the component code itself — is streamed to the browser as a serialized React tree. This means zero JavaScript is sent to the client for server-only components, which has a direct and measurable impact on bundle size and Time to Interactive.

The mental model shift is real. You no longer think in terms of "where does this data fetching live" — you fetch data where you need it, co-locating the query with the component that renders it. Waterfalls that used to require careful orchestration with React Query or SWR can be eliminated by passing server-fetched data directly as props down the component tree. Client Components, marked with the \`"use client"\` directive, become islands of interactivity embedded within a server-rendered shell.

The boundaries between server and client components require deliberate design. A common mistake is placing large interactive components at the root of the tree, forcing everything below to become a client component. Instead, push interactivity to the leaves: a server component renders the article list, and only the like-button within each article card is a client component. This pattern — sometimes called the "server component wrapper" pattern — maximizes the performance benefits of RSC while preserving rich interactivity where it is genuinely needed.`,
  },
  {
    title: "Typography in Web Design",
    excerpt:
      "Typography is the backbone of good design. Explore font selection, line height, and reading rhythm best practices for the web.",
    category: "Design",
    author: "Mika Sato",
    date: "2025-01-12",
    readTime: "5 min read",
    featured: false,
    tags: ["Design", "UI/UX", "CSS"],
    content: `Typography accounts for roughly 95% of the information on a webpage, yet it is frequently treated as an afterthought. The choice of typeface communicates personality before a single word is read. A geometric sans-serif like Inter signals precision and modernity; a humanist serif like Merriweather conveys authority and long-form readability. Neither is universally correct — the right choice depends on the context, the brand voice, and the reading environment.

Line height (leading) is one of the most impactful and most under-tuned typographic variables. Body copy set at 1.4–1.6 line height provides the breathing room readers need to track from one line to the next without losing their place. Headings, by contrast, benefit from tighter leading (1.1–1.25) since readers scan headings rather than read them word by word. Measure — the number of characters per line — should target 60–75 characters for comfortable long-form reading. Wider measures increase eye-tracking effort; narrower measures fragment thoughts across too many line breaks.

On the web, the fluid typography technique using CSS \`clamp()\` eliminates the need for breakpoint-specific font sizes. A declaration like \`font-size: clamp(1rem, 0.75rem + 1vw, 1.25rem)\` smoothly scales type between a minimum and maximum size based on viewport width. Pair this with a consistent type scale — where each step is a fixed ratio (1.25 or 1.333) above the previous — and you gain typographic hierarchy that feels intentional rather than arbitrary across every screen size.`,
  },
  {
    title: "Core Web Vitals and Performance Optimization",
    excerpt:
      "From Largest Contentful Paint to Cumulative Layout Shift — a complete frontend performance optimization guide for 2025.",
    category: "Performance",
    author: "David Kim",
    date: "2025-01-08",
    readTime: "10 min read",
    featured: false,
    tags: ["Performance", "JavaScript", "Next.js"],
    content: `Google's Core Web Vitals have moved from a ranking signal curiosity to a genuine engineering priority. The three metrics — Largest Contentful Paint (LCP), Interaction to Next Paint (INP, which replaced First Input Delay), and Cumulative Layout Shift (CLS) — measure real user experience dimensions: loading, responsiveness, and visual stability. Understanding what drives each metric is the prerequisite for improving them.

LCP is most commonly degraded by unoptimized hero images and render-blocking resources. Serving images in WebP or AVIF format, adding \`fetchpriority="high"\` to the LCP image, and eliminating render-blocking CSS or JavaScript in the \`<head>\` are the highest-leverage interventions. Preloading critical fonts with \`<link rel="preload">\` prevents invisible text during load, which also contributes to perceived LCP. For pages served from edge networks, ensuring aggressive caching headers so the initial HTML response arrives within the first 200ms of navigation is often the single biggest win.

INP measures the worst interaction latency experienced during the entire page visit. Long tasks on the main thread — typically large JavaScript bundles parsed and executed synchronously — are the primary culprit. Code splitting with dynamic \`import()\`, deferring non-critical third-party scripts, and moving expensive computations to Web Workers are all effective strategies. For React applications specifically, using \`React.startTransition()\` to defer non-urgent state updates prevents interaction jank during heavy re-renders. Establish a performance budget early in the project lifecycle and enforce it in CI with tools like Lighthouse CI or Calibre — catching regressions before they ship is exponentially cheaper than diagnosing them in production.`,
  },
  {
    title: "TypeScript Generics in Practice",
    excerpt:
      "Generics are TypeScript's most powerful feature. Learn how to write flexible, type-safe utilities that scale with your codebase.",
    category: "TypeScript",
    author: "Sora Inoue",
    date: "2025-01-05",
    readTime: "9 min read",
    featured: false,
    tags: ["TypeScript", "JavaScript"],
    content: `Generics allow you to write code that works across many types while preserving type safety — the best of both worlds between the permissiveness of \`any\` and the rigidity of concrete types. The simplest way to think about a generic is as a type parameter: a placeholder that gets filled in at the call site. A function like \`function identity<T>(value: T): T\` accepts a value of any type and returns that same type, and TypeScript infers \`T\` automatically from the argument.

Where generics become genuinely powerful is in utility types and higher-order functions. Consider a \`groupBy\` function that groups an array of objects by a key: \`function groupBy<T, K extends keyof T>(items: T[], key: K): Record<T[K] & string, T[]>\`. The constraint \`K extends keyof T\` ensures you can only pass a key that actually exists on the object type, and the return type is fully inferred — no manual type annotations needed at the call site. This pattern forms the basis of most data-transformation utilities in well-typed codebases.

Conditional types and mapped types extend generics further. \`type Partial<T> = { [K in keyof T]?: T[K] }\` — one of TypeScript's built-in utility types — uses a mapped type to make every property of \`T\` optional. Conditional types like \`type NonNullable<T> = T extends null | undefined ? never : T\` allow you to express type-level logic that mirrors runtime behavior. The combination of generics, conditional types, and template literal types enables libraries like tRPC and Zod to provide end-to-end type safety with zero runtime overhead — the types are erased at compilation and leave no trace in the emitted JavaScript.`,
  },
];

const categories = [
  { name: "All", count: posts.length },
  { name: "Design", count: posts.filter((p) => p.category === "Design").length },
  { name: "Frontend", count: posts.filter((p) => p.category === "Frontend").length },
  { name: "React", count: posts.filter((p) => p.category === "React").length },
  { name: "Performance", count: posts.filter((p) => p.category === "Performance").length },
  { name: "TypeScript", count: posts.filter((p) => p.category === "TypeScript").length },
];

const popularPostIndices = [0, 4, 5];

const allTags = [
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Design",
  "UI/UX",
  "Performance",
  "Frontend",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeState = "idle" | "loading" | "success";

const AVATAR_COLORS = [
  "bg-emerald-600",
  "bg-cyan-600",
  "bg-teal-600",
  "bg-slate-600",
  "bg-sky-700",
  "bg-emerald-800",
];

function authorInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function authorColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 997;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length] ?? "bg-emerald-600";
}

function AuthorAvatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden="true"
      className={`${authorColor(name)} ${
        size === "md" ? "w-7 h-7 text-[11px]" : "w-5 h-5 text-[9px]"
      } rounded-full inline-flex items-center justify-center font-semibold text-white tracking-wide shrink-0 select-none`}
    >
      {authorInitials(name)}
    </span>
  );
}

/* Pure-CSS editorial art per post topic. Keyed by post title. */
function PostArt({ title, className = "" }: { title: string; className?: string }) {
  if (title === "Building Design Systems at Scale") {
    // Token swatch grid with a type specimen
    return (
      <div className={`relative overflow-hidden bg-emerald-950 ${className}`}>
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-px p-6 opacity-90">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={
                i % 7 === 0
                  ? "bg-emerald-400/70 rounded-sm"
                  : i % 5 === 0
                    ? "bg-cyan-400/40 rounded-sm"
                    : "bg-white/5 rounded-sm"
              }
            />
          ))}
        </div>
        <span className="absolute bottom-3 left-5 text-emerald-100 font-black text-5xl leading-none select-none">
          Aa
        </span>
        <span className="absolute top-3 right-5 text-emerald-300/60 text-[10px] font-mono tracking-widest select-none">
          TOKENS / 24
        </span>
      </div>
    );
  }
  if (title === "The Future of CSS") {
    // Nested container-query outlines
    return (
      <div className={`relative overflow-hidden bg-cyan-950 ${className}`}>
        <div className="absolute inset-5 border border-cyan-400/50 rounded-lg" />
        <div className="absolute inset-x-10 top-9 bottom-5 border border-cyan-300/35 rounded-lg" />
        <div className="absolute right-14 top-1/2 -translate-y-1/2 w-16 h-16 border border-emerald-300/60 rounded-full" />
        <span className="absolute bottom-4 left-8 text-cyan-200 font-mono text-sm select-none">
          @container
        </span>
        <span className="absolute top-4 left-8 text-cyan-400/50 font-mono text-[10px] select-none">
          @layer base, components;
        </span>
      </div>
    );
  }
  if (title === "React Server Components Deep Dive") {
    // Server shell with client islands
    return (
      <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
        <div className="absolute inset-5 rounded-lg border border-slate-600" />
        <div className="absolute left-9 top-9 w-1/3 h-2 rounded-full bg-slate-600/70" />
        <div className="absolute left-9 top-14 w-1/2 h-2 rounded-full bg-slate-700/70" />
        <div className="absolute right-10 top-10 w-8 h-8 rounded-full bg-cyan-400/80" />
        <div className="absolute right-16 bottom-8 w-5 h-5 rounded-full bg-emerald-400/80" />
        <div className="absolute left-10 bottom-8 w-4 h-4 rounded-full bg-cyan-300/60" />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-slate-400 font-mono text-[10px] select-none">
          &quot;use client&quot; islands
        </span>
      </div>
    );
  }
  if (title === "Typography in Web Design") {
    // Cropped serif specimen with baseline rules
    return (
      <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
        <div className="absolute inset-x-6 top-1/4 border-t border-stone-300" />
        <div className="absolute inset-x-6 top-2/4 border-t border-stone-300" />
        <div className="absolute inset-x-6 top-3/4 border-t border-emerald-400/60" />
        <span className="absolute -bottom-6 left-4 font-serif italic text-stone-800 text-8xl leading-none select-none">
          Rg
        </span>
        <span className="absolute top-3 right-5 text-stone-400 font-mono text-[10px] tracking-widest select-none">
          1.5 LEADING
        </span>
      </div>
    );
  }
  if (title === "Core Web Vitals and Performance Optimization") {
    // Mini bar chart with threshold line
    return (
      <div className={`relative overflow-hidden bg-gray-900 ${className}`}>
        <div className="absolute inset-x-8 bottom-10 top-8 flex items-end gap-2">
          {[38, 62, 45, 80, 55, 70, 30, 90, 48].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-t-sm ${
                h > 65 ? "bg-emerald-400" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-x-8 bottom-[52%] border-t border-dashed border-cyan-400/60" />
        <span className="absolute bottom-3 left-8 text-gray-400 font-mono text-[10px] select-none">
          LCP · INP · CLS
        </span>
      </div>
    );
  }
  if (title === "TypeScript Generics in Practice") {
    // Angle-bracket type specimen
    return (
      <div className={`relative overflow-hidden bg-sky-950 ${className}`}>
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sky-500/30 font-black text-8xl select-none">
          {"<"}
        </span>
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sky-500/30 font-black text-8xl select-none">
          {">"}
        </span>
        <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-4xl text-sky-200 select-none">
          T
        </span>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sky-400/60 font-mono text-[10px] select-none">
          K extends keyof T
        </span>
      </div>
    );
  }
  // Fallback: duotone diagonal split
  return (
    <div className={`relative overflow-hidden bg-emerald-900 ${className}`}>
      <div className="absolute -right-1/4 -top-1/2 w-full h-[200%] bg-cyan-800 rotate-12" />
      <span className="absolute bottom-3 left-5 text-white/60 font-black text-4xl select-none">
        {title.charAt(0)}
      </span>
    </div>
  );
}

export default function BlogSidebarTemplate() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<Post | null>(null);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [subscribeState, setSubscribeState] = useState<SubscribeState>("idle");
  const [activeTag, setActiveTag] = useState<string>("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === "" || post.tags.includes(activeTag);
    return matchesCategory && matchesSearch && matchesTag;
  });

  const featuredPost = filteredPosts.find((p) => p.featured) ?? null;
  const listPosts = filteredPosts.filter((p) => !p.featured);

  function handleCategoryClick(name: string) {
    setActiveCategory(name);
    setActiveTag("");
  }

  function handleTagClick(tag: string) {
    if (activeTag === tag) {
      setActiveTag("");
    } else {
      setActiveTag(tag);
      setActiveCategory("All");
    }
  }

  function handleSubscribe() {
    setEmailError("");
    if (!email.trim()) {
      setEmailError("Email address is required.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setSubscribeState("loading");
    setTimeout(() => {
      setSubscribeState("success");
    }, 1500);
  }

  const activeFilterLabel = (() => {
    if (activeTag) return `Tag: ${activeTag}`;
    if (activeCategory !== "All") return `Category: ${activeCategory}`;
    if (searchQuery) return `Search: "${searchQuery}"`;
    return null;
  })();

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
              setActiveTag("");
            }}
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            devlog<span className="text-emerald-500">.</span>
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <button
              onClick={() => handleCategoryClick("All")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Articles
            </button>
            <button
              onClick={() => handleCategoryClick("Design")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Design
            </button>
            <button
              onClick={() => handleCategoryClick("React")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              React
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("newsletter-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Latest Articles</h1>
              {activeFilterLabel && (
                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                  <span>{activeFilterLabel}</span>
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchQuery("");
                      setActiveTag("");
                    }}
                    className="hover:text-emerald-900 transition-colors"
                    aria-label="Clear filter"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {filteredPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No articles found
                </h3>
                <p className="text-sm text-gray-400 max-w-xs">
                  Try adjusting your search or filter to find what you are
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                    setActiveTag("");
                  }}
                  className="mt-6 px-4 py-2 text-sm text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                {/* Result count */}
                <p className="text-sm text-gray-400 mb-6">
                  Showing{" "}
                  <span className="font-medium text-gray-700">
                    {filteredPosts.length}
                  </span>{" "}
                  {filteredPosts.length === 1 ? "article" : "articles"}
                </p>

                {/* Featured Post */}
                {featuredPost && (
                  <button
                    key={featuredPost.title}
                    onClick={() => setSelectedArticle(featuredPost)}
                    className="block w-full mb-10 group text-left"
                  >
                    <div className="relative rounded-xl h-56 mb-5 overflow-hidden">
                      <PostArt
                        title={featuredPost.title}
                        className="absolute inset-0"
                      />
                      <span className="absolute bottom-4 right-4 text-xs text-white/70 bg-black/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        Click to read
                      </span>
                    </div>
                    <span className="inline-block text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mb-3">
                      Featured
                    </span>
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-500 mb-4 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <AuthorAvatar name={featuredPost.author} />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-500">
                        <ChevronRight className="w-3.5 h-3.5" />
                        Read article
                      </span>
                    </div>
                  </button>
                )}

                {/* Post List */}
                <div className="space-y-6">
                  {listPosts.map((post) => (
                    <button
                      key={post.title}
                      onClick={() => setSelectedArticle(post)}
                      className="block w-full text-left group bg-white rounded-xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex gap-5">
                        <PostArt
                          title={post.title}
                          className="hidden sm:block w-32 h-28 rounded-lg shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-400">
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 leading-relaxed mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <span className="flex items-center gap-1.5">
                                <AuthorAvatar name={post.author} />
                                {post.author}
                              </span>
                              <span>{post.date}</span>
                            </div>
                            <div className="flex gap-1.5">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Search */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveCategory("All");
                    setActiveTag("");
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-100 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors ${
                      activeCategory === cat.name && activeTag === ""
                        ? "bg-emerald-50 text-emerald-700 font-medium"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        activeCategory === cat.name && activeTag === ""
                          ? "bg-emerald-100 text-emerald-600"
                          : "text-gray-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold mb-4">Popular</h3>
              <div className="space-y-3">
                {popularPostIndices.map((idx, i) => {
                  const post = posts[idx];
                  if (!post) return null;
                  return (
                    <button
                      key={post.title}
                      onClick={() => setSelectedArticle(post)}
                      className="flex gap-3 group w-full text-left"
                    >
                      <span className="text-lg font-bold text-gray-200 group-hover:text-emerald-400 transition-colors shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm group-hover:text-emerald-600 transition-colors leading-snug">
                        {post.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                      activeTag === tag
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-gray-50 border-gray-100 hover:border-gray-300 hover:bg-white text-gray-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {activeTag && (
                <button
                  onClick={() => setActiveTag("")}
                  className="mt-3 text-xs text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  Clear tag filter
                </button>
              )}
            </div>

            {/* Newsletter */}
            <div
              id="newsletter-section"
              className="bg-gray-900 text-white rounded-xl p-5"
            >
              <h3 className="font-semibold mb-2">Newsletter</h3>
              <p className="text-sm text-gray-400 mb-4">
                Get the latest articles delivered to your inbox. No spam, ever.
              </p>

              {subscribeState === "success" ? (
                <div className="flex flex-col items-center text-center py-4 gap-3">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                  <p className="text-sm text-emerald-400 font-medium">
                    You are subscribed!
                  </p>
                  <p className="text-xs text-gray-500">
                    Check your inbox for a confirmation email.
                  </p>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubscribe();
                    }}
                    className={`w-full px-3 py-2.5 bg-gray-800 border rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none transition-colors mb-1 ${
                      emailError
                        ? "border-red-500 focus:border-red-400"
                        : "border-gray-700 focus:border-gray-500"
                    }`}
                  />
                  {emailError && (
                    <p className="text-xs text-red-400 mb-2">{emailError}</p>
                  )}
                  {!emailError && <div className="mb-2" />}
                  <button
                    onClick={handleSubscribe}
                    disabled={subscribeState === "loading"}
                    className="w-full py-2.5 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {subscribeState === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-4 md:px-8 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            Copyright 2025 devlog. Part of{" "}
            <Link
              href="/templates"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">
              RSS
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <TemplateBackButton variant="editorial" />

      {/* Article Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedArticle(null);
          }}
        >
          <div className="relative bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            {/* Modal Header */}
            <div className="relative rounded-t-2xl h-36 overflow-hidden">
              <PostArt
                title={selectedArticle.title}
                className="absolute inset-0"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Close article"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              {/* Category + tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {selectedArticle.category}
                </span>
                {selectedArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                {selectedArticle.title}
              </h2>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6 pb-6 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                  <AuthorAvatar name={selectedArticle.author} size="md" />
                  <span className="text-gray-600">{selectedArticle.author}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedArticle.readTime}
                </span>
              </div>

              {/* Content */}
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4">
                {selectedArticle.content.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Back to articles
                </button>
                <div className="flex gap-2">
                  {selectedArticle.tags.slice(0, 2).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedArticle(null);
                        handleTagClick(tag);
                      }}
                      className="text-xs text-emerald-600 hover:text-emerald-800 border border-emerald-200 hover:border-emerald-400 px-3 py-1 rounded-full transition-colors"
                    >
                      More {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
