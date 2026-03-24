"use client";

export const dynamic = "force-static";

import Link from "next/link";
import { useState } from "react";
import { Search, X, Mail, ChevronRight } from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Category = "All" | "Design" | "Technology" | "Business" | "Culture";
type SubscribeState = "idle" | "loading" | "success";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: "Design" | "Technology" | "Business" | "Culture";
  author: string;
  authorInitial: string;
  date: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
}

// ---------------------------------------------------------------------------
// Article Data
// ---------------------------------------------------------------------------

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Design Thinking in the Age of Complexity",
    excerpt:
      "Design thinking is no longer just a methodology — it is the operating system for navigating ambiguity. As systems grow more entangled, the ability to frame problems before solving them has become the most valuable skill in any organization. The best designers are not those who draw the best, but those who ask the right questions.",
    category: "Design",
    author: "Marcus Ellison",
    authorInitial: "M",
    date: "Feb 10, 2026",
    readTime: "9 min read",
    featured: true,
    tags: ["Design Thinking", "Strategy", "Problem Framing"],
  },
  {
    id: 2,
    title: "The Typography Renaissance: Why Serifs Are Back",
    excerpt:
      "After a decade of sans-serif minimalism dominating the web, editorial designers are returning to the warmth and authority of serif typefaces. Digital screens have become sharp enough that serifs render beautifully, and readers have begun associating them with credibility and depth. The shift signals something deeper: audiences want substance.",
    category: "Design",
    author: "Clara Whitfield",
    authorInitial: "C",
    date: "Feb 6, 2026",
    readTime: "6 min read",
    tags: ["Typography", "Serifs", "Editorial Design"],
  },
  {
    id: 3,
    title: "Color Theory for Interface Designers",
    excerpt:
      "Color is the most immediate communication channel a designer has, and the most misunderstood. Picking a palette is not about personal preference — it is about the psychological and cultural associations that colors carry into every context. Getting color right means understanding your users before you open the color picker.",
    category: "Design",
    author: "Yuki Tanaka",
    authorInitial: "Y",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    tags: ["Color Theory", "UI Design", "Psychology"],
  },
  {
    id: 4,
    title: "AI-Assisted Design: Augmentation, Not Replacement",
    excerpt:
      "The conversation around AI in design has been hijacked by fear. Generative tools are not here to replace designers — they are here to compress the distance between intention and execution. The designers who will thrive are those who treat AI as a collaborator and maintain editorial control over every output.",
    category: "Technology",
    author: "Devon Park",
    authorInitial: "D",
    date: "Jan 22, 2026",
    readTime: "10 min read",
    tags: ["AI", "Generative Design", "Tools"],
  },
  {
    id: 5,
    title: "The Architecture of Remote Culture",
    excerpt:
      "Remote work did not create the trust deficit in organizations — it revealed it. Companies that thrived through the distributed shift were those that had already built cultures of clarity, written communication, and outcome-based accountability. Distance is not the variable; intentionality is.",
    category: "Culture",
    author: "Renata Melo",
    authorInitial: "R",
    date: "Jan 17, 2026",
    readTime: "8 min read",
    tags: ["Remote Work", "Organizational Culture", "Leadership"],
  },
  {
    id: 6,
    title: "Product Strategy Is Not a Roadmap",
    excerpt:
      "A roadmap is a sequence of deliverables. A strategy is a theory of how your product will win. Most product organizations confuse the two, spending enormous energy shipping features while never interrogating whether the underlying bets are correct. Real product strategy means being willing to say no to good ideas.",
    category: "Business",
    author: "James Okafor",
    authorInitial: "J",
    date: "Jan 12, 2026",
    readTime: "11 min read",
    tags: ["Product Strategy", "Roadmaps", "Decision Making"],
  },
  {
    id: 7,
    title: "The Slow Web: Reclaiming Depth Online",
    excerpt:
      "The web optimized for engagement has made us excellent at skimming and terrible at thinking. A growing counter-movement — the slow web — is pushing back, building experiences designed for reading, reflection, and retention rather than clicks and shares. Long-form content is not dead; it is consolidating into more intentional spaces.",
    category: "Culture",
    author: "Nina Bergstrom",
    authorInitial: "N",
    date: "Jan 5, 2026",
    readTime: "7 min read",
    tags: ["Slow Web", "Long-Form", "Digital Culture"],
  },
  {
    id: 8,
    title: "Accessibility as Creative Constraint",
    excerpt:
      "The most common objection to accessibility in design is that it limits creativity. The evidence suggests the opposite. Constraints force clarity, and the discipline of designing for all users produces interfaces that are cleaner, more logical, and more usable for everyone. Inclusive design is good design.",
    category: "Technology",
    author: "Priya Nair",
    authorInitial: "P",
    date: "Dec 29, 2025",
    readTime: "6 min read",
    tags: ["Accessibility", "Inclusive Design", "UX"],
  },
];

// ---------------------------------------------------------------------------
// Category badge colors
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<string, string> = {
  Design: "bg-rose-50 text-rose-700 border border-rose-200",
  Technology: "bg-blue-50 text-blue-700 border border-blue-200",
  Business: "bg-amber-50 text-amber-700 border border-amber-200",
  Culture: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

const AUTHOR_BG: Record<string, string> = {
  M: "bg-rose-100 text-rose-700",
  C: "bg-violet-100 text-violet-700",
  Y: "bg-amber-100 text-amber-700",
  D: "bg-blue-100 text-blue-700",
  R: "bg-emerald-100 text-emerald-700",
  J: "bg-orange-100 text-orange-700",
  N: "bg-teal-100 text-teal-700",
  P: "bg-pink-100 text-pink-700",
};

// ---------------------------------------------------------------------------
// Body content for modal (extended per article)
// ---------------------------------------------------------------------------

const ARTICLE_BODY: Record<number, [string, string]> = {
  1: [
    "The design thinking process was originally popularized in academic and consulting circles as a five-step framework. But practitioners who use it daily will tell you that the steps are less important than the posture — a fundamental willingness to hold your assumptions lightly and remain curious longer than feels comfortable. Most failed design projects fail in the problem definition stage, not the execution stage.",
    "The organizations that internalize design thinking do not just produce better products — they make faster decisions, because the team shares a common language for evaluating trade-offs. When everyone understands that a prototype is a question, not an answer, the cycle time from idea to learning collapses dramatically. That is the real return on investment.",
  ],
  2: [
    "The revival of serif type on screen is partly technical. Sub-pixel rendering, high-DPI displays, and variable fonts have removed the historical objection that serifs 'bleed' at small sizes. But the deeper driver is cultural. In an era of viral content and fragmented attention, serif type signals that what follows is worth your time — it is the typographic equivalent of a firm handshake.",
    "Editorial publications that made the shift early — from Georgia to more expressive faces like Freight, Canela, or Lyon — report measurably longer session times and lower bounce rates. Readers stay when they feel they have entered a considered space. Typography sets the first impression before a single word is processed semantically.",
  ],
  3: [
    "The most common color mistake in interface design is treating a palette as a set of decorative choices rather than a communication system. Every color in your UI should earn its place by doing a specific job: directing attention, signaling state, grouping related elements, or establishing hierarchy. When you audit an interface and find a color with no job, cut it.",
    "Cultural context multiplies in global products. Red means danger in most Western contexts, but prosperity in Chinese culture. White is associated with purity in the West and mourning in parts of Asia. There is no universal color language, which means international products need a systematic approach to color semantics rather than relying on intuition alone.",
  ],
  4: [
    "The practical reality of AI tools in design workflows is far more nuanced than either the utopian or dystopian narratives suggest. Generative tools excel at exploration — producing fifty directions in the time it would take a human to sketch three. But exploration without editorial judgment produces noise. The designer's role shifts toward curation, critique, and the articulation of taste.",
    "What AI cannot currently replicate is the understanding of context that comes from working closely with users and stakeholders over time. A language model can generate a plausible-sounding rationale for any design decision. A designer who has sat in user research sessions, who has seen people struggle with an interface in real time, has a different kind of knowledge — one that is embodied and hard-won.",
  ],
  5: [
    "The companies that handled the pandemic-era transition to remote work best shared a common trait: they already had strong documentation cultures. Teams that wrote things down — decisions, context, rationale — found that distributed work simply extended a practice already in place. Teams that had relied on informal hallway knowledge suddenly found themselves operating with critical gaps.",
    "Building culture at a distance requires replacing ambient signals with explicit ones. The casual lunch where a senior engineer shares her mental model of the codebase does not happen accidentally on a remote team. It must be engineered: structured onboarding documents, recorded architecture discussions, asynchronous forums where questions are welcomed. Remote culture is documentation culture.",
  ],
  6: [
    "The confusion between strategy and roadmap is perpetuated by the tools we use. Project management software is built around deliverables, timelines, and assignees — all of which are tactical categories. When product teams do their planning exclusively inside these tools, they unconsciously frame every conversation in tactical terms. Strategy conversations require a different kind of space.",
    "A useful test for whether you have a strategy or just a plan: can you articulate what you have decided not to do, and why? Strategy is as much about exclusion as inclusion. A roadmap that contains every reasonable idea is not a strategy — it is a wish list with dates attached. Real strategic choices create tension, and that tension should be visible and owned.",
  ],
  7: [
    "The slow web is not anti-technology — it is a critique of a specific set of design incentives. Platforms optimized for engagement metrics have converged on a common set of patterns: infinite scroll, notification badges, algorithmic feeds calibrated to outrage. These patterns are technically choices, not laws of physics. Different incentives produce different designs.",
    "Some of the most interesting publishing experiments of the past few years have explicitly rejected engagement as a success metric. Newsletters, audio essays, and curated link digests are growing precisely because they offer readers something the engagement economy cannot: the feeling of completion. Finishing a long essay is a different cognitive experience than refreshing a feed.",
  ],
  8: [
    "The Web Content Accessibility Guidelines exist not as a ceiling but as a floor. Meeting WCAG 2.1 AA does not mean your product is maximally accessible — it means you have cleared the baseline. The designers and teams doing genuinely inclusive work are going beyond checklists, involving disabled users in research, and treating accessibility as a design quality dimension rather than a compliance exercise.",
    "The creative constraint argument for accessibility holds up under scrutiny. Consider focus states: designing clear, visible focus indicators for keyboard navigation requires thinking carefully about color contrast, size, and placement. That discipline produces interfaces where the visual hierarchy is clearer for all users, not just keyboard users. Constraints applied thoughtfully do not limit expression — they clarify it.",
  ],
};

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase rounded-sm ${CATEGORY_COLORS[category] ?? "bg-zinc-100 text-zinc-600 border border-zinc-200"}`}
    >
      {category}
    </span>
  );
}

function AuthorAvatar({
  initial,
  size = "sm",
}: {
  initial: string;
  size?: "sm" | "lg";
}) {
  const dim = size === "lg" ? "w-12 h-12 text-lg" : "w-8 h-8 text-sm";
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-semibold shrink-0 ${AUTHOR_BG[initial] ?? "bg-zinc-100 text-zinc-600"}`}
    >
      {initial}
    </div>
  );
}

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(article)}
      className="group text-left w-full border border-zinc-200 bg-white hover:border-zinc-400 transition-all duration-200 p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <CategoryBadge category={article.category} />
        <span className="text-[10px] text-zinc-400 tracking-wide">
          {article.readTime}
        </span>
      </div>

      <div>
        <h3 className="font-serif italic text-xl leading-snug text-zinc-900 mb-2 group-hover:text-zinc-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-100">
        <div className="flex items-center gap-2.5">
          <AuthorAvatar initial={article.authorInitial} />
          <div>
            <p className="text-xs font-medium text-zinc-700">{article.author}</p>
            <p className="text-[10px] text-zinc-400">{article.date}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 transition-colors" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-zinc-400 bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded-sm tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
}

function ArticleModal({ article, onClose }: ArticleModalProps) {
  const [body1, body2] = ARTICLE_BODY[article.id] ?? [
    "Extended content for this article is not yet available.",
    "Check back soon for the full piece.",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-zinc-100 px-8 py-4 flex items-center justify-between z-10">
          <CategoryBadge category={article.category} />
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors rounded-sm"
            aria-label="Close article preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-8 py-8">
          <h2 className="font-serif italic text-3xl leading-tight text-zinc-900 mb-6">
            {article.title}
          </h2>

          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-zinc-100">
            <AuthorAvatar initial={article.authorInitial} size="lg" />
            <div>
              <p className="text-sm font-semibold text-zinc-800">
                {article.author}
              </p>
              <p className="text-xs text-zinc-400">
                {article.date} &middot; {article.readTime}
              </p>
            </div>
          </div>

          <div className="space-y-5 text-zinc-700 leading-relaxed text-[15px]">
            <p className="text-base font-medium text-zinc-800 leading-relaxed">
              {article.excerpt}
            </p>
            <p>{body1}</p>
            <p>{body2}</p>
          </div>

          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-zinc-100">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-zinc-500 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-sm tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 p-6 bg-zinc-50 border border-zinc-200 text-center">
            <p className="font-serif italic text-lg text-zinc-800 mb-1">
              Enjoying this piece?
            </p>
            <p className="text-sm text-zinc-500 mb-4">
              Subscribe to The Editorial for full access to every article.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-zinc-900 text-white text-xs tracking-widest uppercase hover:bg-zinc-700 transition-colors"
            >
              Subscribe to Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

const CATEGORIES: Category[] = [
  "All",
  "Design",
  "Technology",
  "Business",
  "Culture",
];

export default function EditorialBlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscribeState, setSubscribeState] = useState<SubscribeState>("idle");

  // ---------------------------------------------------------------------------
  // Filter logic
  // ---------------------------------------------------------------------------

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = ARTICLES.find((a) => a.featured);

  // When filtering, show all filtered articles in the grid
  const showFeaturedHero =
    activeCategory === "All" && searchQuery === "" && featuredArticle;
  const articleGridItems = showFeaturedHero
    ? filteredArticles.filter((a) => !a.featured)
    : filteredArticles;

  // ---------------------------------------------------------------------------
  // Newsletter submission
  // ---------------------------------------------------------------------------

  function validateEmail(value: string): string {
    if (!value.trim()) return "Please enter your email address.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address.";
    return "";
  }

  function handleSubscribe() {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }
    setEmailError("");
    setSubscribeState("loading");
    setTimeout(() => {
      setSubscribeState("success");
    }, 1400);
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* ------------------------------------------------------------------ */}
      {/* Navigation                                                           */}
      {/* ------------------------------------------------------------------ */}
      <nav className="border-b border-zinc-200 bg-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6">
          {/* Top bar */}
          <div className="flex items-center justify-between py-4 border-b border-zinc-100">
            <div>
              <span className="font-serif text-2xl tracking-tight text-zinc-900">
                The Editorial
              </span>
              <span className="ml-3 text-[10px] tracking-widest uppercase text-zinc-400 hidden sm:inline">
                Design &amp; Technology
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="pl-9 pr-4 py-2 text-xs border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-zinc-400 focus:outline-none transition-colors w-52"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-0 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-3 text-xs tracking-widest uppercase transition-colors whitespace-nowrap border-b-2 ${
                  activeCategory === cat
                    ? "border-zinc-900 text-zinc-900 font-semibold"
                    : "border-transparent text-zinc-400 hover:text-zinc-700 font-medium"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* Featured Article Hero                                                */}
      {/* ------------------------------------------------------------------ */}
      {showFeaturedHero && featuredArticle && (
        <section className="border-b border-zinc-200">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 mb-5">
                  <CategoryBadge category={featuredArticle.category} />
                  <span className="text-[10px] tracking-widest uppercase text-zinc-400">
                    Featured
                  </span>
                </div>

                <h1 className="font-serif italic text-4xl md:text-5xl xl:text-6xl leading-tight text-zinc-900 mb-6">
                  {featuredArticle.title}
                </h1>

                <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8 max-w-2xl">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center gap-4 mb-8">
                  <AuthorAvatar
                    initial={featuredArticle.authorInitial}
                    size="lg"
                  />
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">
                      {featuredArticle.author}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {featuredArticle.date} &middot; {featuredArticle.readTime}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white text-xs tracking-widest uppercase hover:bg-zinc-700 transition-colors"
                >
                  Read Article
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="md:col-span-4 hidden md:flex flex-col gap-3">
                <div className="h-px bg-zinc-900 w-16 mb-2" />
                <div className="flex flex-wrap gap-2">
                  {featuredArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-zinc-500 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-sm tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-zinc-100">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                    In this issue
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {ARTICLES.length} articles across {CATEGORIES.length - 1}{" "}
                    categories — design, technology, business, and culture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Article Grid                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        {/* Section label */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-zinc-900" />
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
              {showFeaturedHero ? "Latest Articles" : activeCategory === "All" ? "All Articles" : activeCategory}
            </p>
          </div>
          {searchQuery && (
            <p className="text-xs text-zinc-400">
              {filteredArticles.length} result
              {filteredArticles.length !== 1 ? "s" : ""} for &ldquo;
              {searchQuery}&rdquo;
            </p>
          )}
        </div>

        {articleGridItems.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif italic text-xl text-zinc-400 mb-2">
              No articles found
            </p>
            <p className="text-sm text-zinc-400">
              Try adjusting your search or browsing a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-6 text-xs text-zinc-500 underline underline-offset-4 hover:text-zinc-900 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {articleGridItems.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={setSelectedArticle}
              />
            ))}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Newsletter Section                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="max-w-xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
            </div>

            <h2 className="font-serif italic text-3xl text-zinc-900 mb-3">
              Subscribe to The Editorial
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed mb-8">
              Thoughtful writing on design, technology, and the ideas shaping
              how we work — delivered to your inbox every week.
            </p>

            {subscribeState === "success" ? (
              <div className="py-6 border border-emerald-200 bg-emerald-50 text-center">
                <p className="font-serif italic text-lg text-emerald-800 mb-1">
                  You are subscribed.
                </p>
                <p className="text-xs text-emerald-600">
                  Welcome to The Editorial. Your first issue arrives next week.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex gap-0 border border-zinc-300 bg-white focus-within:border-zinc-700 transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubscribe();
                    }}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3.5 text-sm bg-transparent focus:outline-none text-zinc-900 placeholder:text-zinc-400"
                    disabled={subscribeState === "loading"}
                  />
                  <button
                    type="button"
                    onClick={handleSubscribe}
                    disabled={subscribeState === "loading"}
                    className="px-6 py-3.5 bg-zinc-900 text-white text-xs tracking-widest uppercase hover:bg-zinc-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {subscribeState === "loading" ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>

                {emailError && (
                  <p className="mt-2 text-xs text-rose-600 text-left">
                    {emailError}
                  </p>
                )}

                <p className="mt-4 text-[10px] text-zinc-400 tracking-wide">
                  No spam. Unsubscribe at any time. We respect your privacy.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Footer                                                               */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            <div>
              <p className="font-serif text-lg text-zinc-900 mb-2">
                The Editorial
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Independent writing on design, technology, and culture. Published
                weekly since 2023.
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mb-3">
                Categories
              </p>
              <ul className="space-y-2">
                {(["Design", "Technology", "Business", "Culture"] as const).map(
                  (cat) => (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        {cat}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mb-3">
                Publication
              </p>
              <ul className="space-y-2">
                {["About", "Archive", "RSS Feed", "Contribute"].map((link) => (
                  <li key={link}>
                    <span className="text-xs text-zinc-400">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] text-zinc-400 tracking-wide">
              &copy; 2026 The Editorial. Part of{" "}
              <Link
                href="/templates"
                className="text-zinc-500 hover:text-zinc-800 underline underline-offset-2"
              >
                StyleKit Templates
              </Link>
              .
            </p>
            <div className="flex gap-4 text-[10px] text-zinc-400">
              <span>Privacy Policy</span>
              <span>Terms of Use</span>
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ------------------------------------------------------------------ */}
      {/* Article Preview Modal                                                */}
      {/* ------------------------------------------------------------------ */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Back Button                                                          */}
      {/* ------------------------------------------------------------------ */}
      <TemplateBackButton variant="editorial" />
    </div>
  );
}
