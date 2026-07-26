"use client";

export const dynamic = "force-static";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MessageCircle,
  Sparkles,
  Search,
  X,
  BookOpen,
  Clock,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  likes: number;
  comments: number;
  accentColor: string;
}

const articles: Article[] = [
  {
    id: 1,
    category: "Code",
    title: "CSS is Fine, Actually",
    excerpt:
      "Everyone hates CSS until they finally understand it. Then they love it. Here's why the most mocked language on the web is secretly a masterpiece.",
    content: `CSS gets a bad reputation. Developers joke about it at conferences, tweet memes about it, and treat it like the weird cousin no one talks about at family reunions. But here's the thing: they're wrong.

CSS is a constraint-based layout engine with a cascade model so elegantly designed that it still surprises people after 25 years. The specificity system? Pure genius. The cascade? Genius disguised as chaos.

Let me prove it.

**The Cascade is a Feature**

When a junior dev says "CSS is broken because my styles don't apply," what they really mean is "I don't understand specificity." The cascade is deterministic. Every conflict resolves predictably. Learn the rules and you have superpowers.

**Modern CSS is Unrecognizable (In a Good Way)**

We have container queries. We have :has(). We have logical properties. We have subgrid. The CSS of 2026 is not the CSS of 2009 — and it was never as bad as people claimed even then.

**The Real Problem**

The real problem isn't CSS. It's that people try to write CSS the same way they write Python or Java. CSS is declarative. Embrace it. Stop fighting the spec. Read it instead.

So next time someone tells you CSS is broken, ask them if they've read MDN lately. The answer will tell you everything.`,
    date: "2026.02.10",
    author: "Morgan Blake",
    readTime: "4 min",
    likes: 142,
    comments: 38,
    accentColor: "#ccff00",
  },
  {
    id: 2,
    category: "Opinion",
    title: "Stop Over-Engineering Your Side Projects",
    excerpt:
      "You do not need Kubernetes for a blog. You do not need a microservices architecture for a to-do app. Let us have an honest talk about scope creep.",
    content: `I have seen it happen a hundred times. Someone starts a side project. A simple blog. A recipe manager. A habit tracker. Two weeks later, they are designing a distributed event-driven architecture with a Kafka cluster.

The project never ships.

**Why We Over-Engineer**

Part of it is ego. We want to build something impressive. Part of it is anxiety — if we keep adding complexity, we never have to confront whether the actual idea is good. Part of it is that architecture is fun in ways that writing content or doing the boring parts isn't.

**The Math Never Works Out**

Let's be real. Your side project will have:
- 12 users (all of them you)
- 47 uncommitted GitHub issues
- A README that says "Coming soon"
- A Notion board with 200 cards in "Backlog"

Does this need Redis? No. Does this need three separate services? No. Does this need anything beyond a SQLite database and a single process? Probably not.

**The Cure**

Ship. Ship ugly. Ship incomplete. Ship with a single file of JavaScript if that's what it takes. The most impressive thing a side project can do is exist.

Start with the simplest possible stack. Add complexity only when you feel the actual pain of not having it. Not the imagined pain. The actual, this-is-breaking-in-production pain.

Your users do not care about your architecture. They care about whether the thing works.`,
    date: "2026.02.05",
    author: "Alex Rivera",
    readTime: "5 min",
    likes: 89,
    comments: 51,
    accentColor: "#ff6b6b",
  },
  {
    id: 3,
    category: "Design",
    title: "Hot Takes: Design Trends in 2026",
    excerpt:
      "Glassmorphism is out. Brutalism is in. Or is it? Let us sort the actual trends from the Twitter discourse and figure out what actually matters.",
    content: `Every January, design Twitter explodes with predictions. Every December, most of those predictions were wrong. Let me give you the actual lay of the land as we move through 2026.

**What's Actually Happening**

Anti-design is having a moment — and not just as an aesthetic. Websites that deliberately reject polish are resonating with audiences exhausted by the same Figma-template sameness. Brutalism is not new, but its current iteration is more playful, more interactive, less architectural-magazine and more zine.

**The Figma-ification Problem**

Every design tool makes it easy to produce the same defaults. Rounded corners. Subtle shadows. System fonts. Carefully balanced whitespace. These are not bad choices — but when everyone makes them by default, the web starts to look like one enormous product.

The designers pushing back against this are finding audiences hungry for something different.

**What Is Actually Fading**

Glassmorphism: gone. It was beautiful for six months and then everyone did it for two years past when it was interesting.

Neumorphism: still not back. It was always too subtle for accessibility. Good riddance.

Dark mode as a personality: also fading. Light mode is having a quiet comeback.

**What Matters More Than Trends**

Clarity. Accessibility. Speed. These are not trends — they are standards. The best design work being done in 2026 is not interesting because it follows a trend. It is interesting because it makes a bold choice and executes it with discipline.

Pick an aesthetic. Own it. Make it work.`,
    date: "2026.01.28",
    author: "Jordan Park",
    readTime: "6 min",
    likes: 203,
    comments: 67,
    accentColor: "#4ecdc4",
  },
  {
    id: 4,
    category: "Culture",
    title: "The Web Was Better When It Was Weird",
    excerpt:
      "Geocities, Flash intros, visitor counters, and tiled backgrounds. We lost something when we standardized the internet. Here is what I miss.",
    content: `I remember the first website I built. It had a tiled background of tiny stars. It had a visitor counter. It had marquee text. It was, by any modern metric, a disaster.

It was also completely, uniquely mine.

**What Standardization Costs**

The modern web is objectively better in almost every measurable way. Faster. More accessible. Works on phones. Doesn't require Flash. But something got lost in the professionalization.

The old web was authored. You could look at a site and know something about the person who made it. The color choices, the layout quirks, the random animated GIF — all of it was information about a human being.

The modern web is often managed. Templates selected from a Shopify theme store. Wordpress themes. Webflow templates. Squarespace. These tools are not evil — they let people build things — but they tend toward a sameness.

**The Indie Web Response**

There is a quiet movement of people building personal websites again. Hand-coded HTML. Deliberate weirdness. Web rings. Guestbooks. These people are not Luddites — they are making a conscious choice to author something rather than manage a template.

I think that is admirable. I think it is worth doing.

**What I Want**

I want the web to be weirder. I want to encounter a site that surprises me, that makes a choice I would never have made, that tells me something about the person behind it.

Corporate sameness is not the only option. Make your corner of the web yours.`,
    date: "2026.01.20",
    author: "Sam Chen",
    readTime: "5 min",
    likes: 176,
    comments: 43,
    accentColor: "#ffe66d",
  },
  {
    id: 5,
    category: "Code",
    title: "TypeScript Strict Mode or You Are Doing It Wrong",
    excerpt:
      "If your tsconfig.json has strict: false, we need to have a serious conversation. Here is what you are missing and why it matters.",
    content: `I will keep this short because it is not complicated.

If you are using TypeScript without strict mode, you are using TypeScript wrong. You are getting a fraction of the benefit at the same cost in setup and tooling.

**What Strict Mode Actually Does**

Strict mode is not one flag. It is a set of flags bundled together:
- strictNullChecks: null and undefined are not assignable to everything
- noImplicitAny: you have to annotate things when TypeScript cannot infer them
- strictFunctionTypes: function type checking is more rigorous
- And several others

Each of these catches real bugs. Not theoretical bugs. Bugs that ship to production. Bugs that cause runtime errors. Bugs that wake you up at 2am.

**The Common Objection**

"But it generates so many errors when I turn it on."

Yes. That is the point. Those are bugs. Errors in strict mode are TypeScript telling you that your assumptions about your own code are wrong. That is valuable information.

**How to Turn It On Safely**

If you have a large existing codebase, turn on each flag incrementally. Start with strictNullChecks. Fix the errors. Ship it. Then add the next flag. It takes time. The result is a codebase that is actually correct.

For new projects: strict: true from day one. No excuses.

TypeScript without strict mode is a type-annotated JavaScript with extra steps. With strict mode, it is a proper type system. The choice is yours.`,
    date: "2026.01.12",
    author: "Morgan Blake",
    readTime: "4 min",
    likes: 118,
    comments: 29,
    accentColor: "#95e1d3",
  },
  {
    id: 6,
    category: "Opinion",
    title: "Your Portfolio Does Not Need 50 Projects",
    excerpt:
      "One excellent project beats twenty mediocre ones every time. Quality is a strategy, not a cop-out. Here is how to think about your portfolio.",
    content: `I review portfolios. A lot of them. And I notice a pattern: the developers who seem the most junior have the most projects. The developers who get hired fast have fewer, better ones.

This is not a coincidence.

**The Logic of Depth**

When you build 50 small projects, you demonstrate breadth. You know a lot of things shallowly. When you build 3 excellent projects, you demonstrate that you can take something from idea to polished, production-quality reality. That is the skill employers actually want.

**What Makes a Portfolio Project Excellent**

It solves a real problem. It is deployed and running. It handles edge cases. It has decent error states. It looks intentional, not like a tutorial. It has a README that explains what problem it solves and why.

**The Tutorial Trap**

Most portfolio projects are tutorials. Clone a course. Build the thing the instructor built. Congratulations — you have a Netflix clone that works exactly like every other Netflix clone on every other junior developer's portfolio.

Do the tutorial to learn the concept. Then immediately apply it to something you actually care about. Something you would use. Something your friends might use.

**Quality Is Compounding**

A project you keep improving gets better over time. A project you ship and abandon stays exactly as broken as when you left it. Pick a few things worth your sustained attention.

Then make them excellent.`,
    date: "2025.12.30",
    author: "Alex Rivera",
    readTime: "5 min",
    likes: 234,
    comments: 72,
    accentColor: "#f38181",
  },
];

const categories = ["All", "Design", "Code", "Culture", "Opinion"];

type SubscribeState = "idle" | "loading" | "success";

export default function BrutalistPlayfulBlogTemplate() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscribeState, setSubscribeState] = useState<SubscribeState>("idle");
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "All" ||
      article.category.toLowerCase() === activeCategory.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      query === "" ||
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const validateEmail = (value: string): string => {
    if (!value.trim()) return "Email address is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address.";
    return "";
  };

  const handleSubscribe = () => {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }
    setEmailError("");
    setSubscribeState("loading");
    setTimeout(() => {
      setSubscribeState("success");
    }, 1500);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError("");
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-200">
        <div
          className="h-full bg-[#ccff00] transition-all duration-100"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="border-b-4 border-black bg-[#ccff00] mt-1">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between">
          <Link
            href="/templates/brutalist-playful-blog"
            prefetch={false}
            className="border-4 border-black bg-black px-3 py-1 text-lg font-black text-[#ccff00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            BRUTAL BLOG
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {["Blog", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="border-4 border-black bg-white px-4 py-2 text-xs font-black tracking-[0.12em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                {item.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 md:py-20 lg:py-28 px-4 md:px-8 lg:px-12 border-b-4 border-black bg-white relative overflow-hidden">
        <div className="absolute top-8 right-8 w-32 h-32 bg-[#ccff00] border-4 border-black rotate-12 hidden lg:block" />
        <div className="absolute bottom-12 left-12 w-20 h-20 bg-black border-4 border-black -rotate-6 hidden lg:block" />

        <div className="max-w-6xl mx-auto relative">
          <div className="inline-block -rotate-2 border-4 border-black bg-black px-4 py-2 mb-6 shadow-[4px_4px_0px_0px_rgba(204,255,0,1)]">
            <span className="text-xs font-black tracking-[0.15em] text-[#ccff00]">
              NO SAFE OPINIONS HERE
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.85] tracking-[-0.04em]">
            <span className="block">THINK</span>
            <span className="block text-transparent [-webkit-text-stroke:3px_#000]">
              LOUD
            </span>
            <span className="block">
              <span className="bg-[#ccff00] px-2">SHIP</span>{" "}
              <span className="bg-black text-white px-2">WEIRD</span>
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-sm md:text-base leading-relaxed text-gray-700">
            Hot takes, honest opinions, and technical writing for developers and
            designers who are tired of playing it safe. No gatekeeping. No
            hedging. Just ideas.
          </p>
        </div>
      </section>

      {/* Search + Category Filter */}
      <section
        id="blog"
        className="py-8 px-4 md:px-8 lg:px-12 border-b-4 border-black bg-white"
      >
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full border-4 border-black pl-10 pr-4 py-2.5 font-mono text-sm font-bold focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] transition-all bg-white placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded-sm"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`border-4 border-black px-4 py-1.5 text-[11px] font-black tracking-[0.14em] transition-all ${
                  activeCategory === cat
                    ? "bg-black text-[#ccff00] shadow-none translate-x-[2px] translate-y-[2px]"
                    : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Results count */}
          <p className="text-xs font-black tracking-widest mb-6 text-gray-500">
            {filteredArticles.length} ARTICLE
            {filteredArticles.length !== 1 ? "S" : ""} FOUND
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group text-left block border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                {/* Accent Header */}
                <div
                  className="px-5 py-3 border-b-4 border-black flex items-center justify-between"
                  style={{ backgroundColor: article.accentColor }}
                >
                  <span className="text-[10px] font-black tracking-[0.15em] uppercase">
                    {article.category}
                  </span>
                  <span className="text-[10px] font-black">{article.date}</span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-3 group-hover:underline decoration-4 underline-offset-4">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" /> {article.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />{" "}
                        {article.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {article.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-black group-hover:text-black transition-colors">
                      READ <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20 border-4 border-black border-dashed">
              <p className="text-2xl font-black mb-2">NOTHING FOUND</p>
              <p className="text-sm text-gray-500">
                Try a different search term or category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-6 border-4 border-black bg-black text-white px-6 py-2 text-xs font-black tracking-widest shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-12 bg-[#ccff00] border-y-4 border-black">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block -rotate-2 border-4 border-black bg-black px-4 py-2 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="w-5 h-5 inline mr-2 text-[#ccff00]" />
            <span className="text-xs font-black tracking-[0.12em] text-[#ccff00]">
              JOIN THE REBELLION
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-4">
            Opinions Delivered
            <br />
            Weekly. Free.
          </h2>
          <p className="text-sm mb-8 max-w-md mx-auto font-bold">
            Get the best articles, hot takes, and tutorials straight to your
            inbox. No spam. No safe opinions. Unsubscribe anytime.
          </p>

          {subscribeState === "success" ? (
            <div className="border-4 border-black bg-black text-[#ccff00] px-8 py-6 max-w-md mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xl font-black mb-1">YOU ARE IN.</p>
              <p className="text-sm font-bold opacity-80">
                Check your inbox for a confirmation email.
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSubscribe()
                    }
                    placeholder="your@email.com"
                    aria-label="Email address"
                    aria-describedby={emailError ? "email-error" : undefined}
                    className={`w-full border-4 border-black px-4 py-3 font-mono text-sm font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-white ${
                      emailError ? "border-red-600" : ""
                    }`}
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  disabled={subscribeState === "loading"}
                  className="border-4 border-black bg-black text-[#ccff00] px-6 py-3 font-black text-sm tracking-[0.12em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
                >
                  {subscribeState === "loading" ? "SENDING..." : "SUBSCRIBE"}
                </button>
              </div>
              {emailError && (
                <p
                  id="email-error"
                  className="mt-2 text-xs font-black text-red-700 text-left"
                >
                  {emailError}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 lg:px-12 border-t-4 border-black bg-black text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-black text-lg text-[#ccff00]">
              BRUTAL BLOG
            </span>
            <span className="text-xs text-gray-400">
              Copyright 2026 &middot; Part of{" "}
              <Link
                href="/templates"
                className="text-white hover:text-[#ccff00] transition-colors"
              >
                StyleKit Templates
              </Link>
            </span>
          </div>
          <div className="flex gap-3">
            {["TWITTER", "GITHUB", "DISCORD"].map((s) => (
              <a
                key={s}
                href="#"
                className="border-2 border-white px-3 py-1 text-[10px] font-black tracking-[0.12em] hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Article Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-40 flex items-start justify-center bg-black/70 overflow-y-auto py-8 px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedArticle(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={selectedArticle.title}
        >
          <div className="relative w-full max-w-2xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-auto">
            {/* Modal Header */}
            <div
              className="border-b-4 border-black px-6 py-4 flex items-center justify-between"
              style={{ backgroundColor: selectedArticle.accentColor }}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black tracking-[0.15em] uppercase bg-black text-white px-2 py-1">
                  {selectedArticle.category}
                </span>
                <span className="text-[10px] font-black">
                  {selectedArticle.date}
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="border-4 border-black bg-black text-white w-9 h-9 flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]"
                aria-label="Close article"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-10">
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-xs font-black text-gray-500 mb-8 pb-6 border-b-4 border-black">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedArticle.readTime} read
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  {selectedArticle.likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {selectedArticle.comments}
                </span>
              </div>

              <div className="prose-sm max-w-none text-sm leading-relaxed text-gray-800 space-y-4">
                {selectedArticle.content
                  .split("\n\n")
                  .map((block, blockIndex) => {
                    if (block.startsWith("**") && block.endsWith("**")) {
                      return (
                        <h3
                          key={blockIndex}
                          className="text-lg font-black text-black mt-6 border-l-4 border-black pl-3"
                        >
                          {block.replace(/\*\*/g, "")}
                        </h3>
                      );
                    }
                    if (block.includes("**")) {
                      const parts = block.split(/\*\*(.*?)\*\*/g);
                      return (
                        <p key={blockIndex}>
                          {parts.map((part, partIndex) =>
                            partIndex % 2 === 1 ? (
                              <strong key={partIndex} className="font-black">
                                {part}
                              </strong>
                            ) : (
                              <span key={partIndex}>{part}</span>
                            )
                          )}
                        </p>
                      );
                    }
                    if (block.startsWith("- ")) {
                      const items = block
                        .split("\n")
                        .filter((l) => l.startsWith("- "));
                      return (
                        <ul key={blockIndex} className="space-y-1 pl-4">
                          {items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-2"
                            >
                              <span className="font-black mt-0.5">-</span>
                              <span>{item.slice(2)}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={blockIndex}>{block}</p>;
                  })}
              </div>

              <div className="mt-10 pt-6 border-t-4 border-black flex items-center justify-between">
                <span className="text-xs font-black text-gray-500 tracking-widest">
                  BY {selectedArticle.author.toUpperCase()}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="border-4 border-black bg-black text-[#ccff00] px-6 py-2 text-xs font-black tracking-[0.12em] shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <TemplateBackButton variant="brutal" />
    </div>
  );
}
