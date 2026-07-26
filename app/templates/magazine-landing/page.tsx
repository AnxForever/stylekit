"use client";

export const dynamic = "force-static";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  X,
  Search,
  Clock,
  User,
  ChevronRight,
  Mail,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
// ─── Types ────────────────────────────────────────────────────────────────────

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  accentColor: string;
  isFeatured?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  {
    id: 1,
    category: "Technology",
    title: "The Quiet Revolution: How AI is Reshaping the Software Industry",
    excerpt:
      "Beneath the hype cycle, a more fundamental shift is underway — AI is changing not just what developers build, but how they think about building it.",
    content: `The past two years have seen an avalanche of proclamations about artificial intelligence transforming every industry overnight. The reality, as usual, is more nuanced — and arguably more interesting.

What is actually happening in software development is less a sudden revolution and more a quiet, persistent reshaping of workflows. Developers who once spent hours on boilerplate are now focusing on architecture and edge cases. Code review has shifted from catching syntax errors to evaluating design decisions.

The more significant change is cultural. Teams that adopt AI tooling effectively tend to ship more, but the nature of what they ship changes too. There is less tolerance for technical debt when generating clean code takes seconds. Documentation, long neglected, is suddenly more feasible to maintain.

The companies succeeding with AI integration share a common trait: they treat the tools as force multipliers for their best engineers, not replacements for their weakest ones. The delta between a senior and junior developer has not narrowed — if anything, it has widened, because AI amplifies existing judgment.

What the next five years look like depends heavily on how organizations answer a deceptively simple question: are they using AI to do the same things faster, or are they rethinking what they do entirely?`,
    author: "James Harrington",
    authorRole: "Technology Editor",
    date: "February 18, 2026",
    readTime: "9 min read",
    accentColor: "bg-slate-800",
    isFeatured: true,
  },
  {
    id: 2,
    category: "Culture",
    title: "The Museum Is Not Dead — It Just Learned to Stream",
    excerpt:
      "From the Louvre to the Smithsonian, cultural institutions are discovering that digital access does not cannibalize physical attendance. It amplifies it.",
    content: `When museums first began digitizing their collections, the anxiety was palpable in curatorial circles. Would people still bother flying to Paris if they could zoom into the Mona Lisa at 8K resolution from their living rooms?

The data from the past five years offers a decisive answer: yes, overwhelmingly. Institutions that invested most aggressively in digital access — high-resolution scans, virtual walkthroughs, robust online learning programs — have seen the strongest rebounds in physical attendance post-pandemic.

The mechanism is counterintuitive but, in retrospect, obvious. Digital access creates familiarity, and familiarity creates desire. A teenager in rural Nebraska who spends an afternoon exploring the Rijksmuseum's online collection develops a relationship with those objects. That relationship, more often than not, eventually produces a plane ticket.

What is changing is the nature of the physical visit. People arrive having done extensive research. They come with specific intentions — to see a particular painting, to attend a curator talk. The serendipitous wander through galleries still happens, but it now competes with a more purposeful mode of visiting.

For institutions with smaller collections and less international draw, the calculus is different. For them, digital presence is not a supplement — it may be the primary venue through which they reach a global audience.`,
    author: "Priya Anand",
    authorRole: "Arts Correspondent",
    date: "February 15, 2026",
    readTime: "7 min read",
    accentColor: "bg-amber-700",
    isFeatured: true,
  },
  {
    id: 3,
    category: "Politics",
    title: "The Infrastructure Bill That Nobody Is Talking About",
    excerpt:
      "Buried in a 1,200-page spending package is a provision that could reshape broadband access for 40 million Americans. Why is it getting so little attention?",
    content: `Legislative attention is a zero-sum resource. When Congress is debating several high-profile bills simultaneously, the ones that generate the most heat tend to consume all available oxygen — leaving genuinely consequential provisions to pass quietly into law.

The broadband allocation in the current infrastructure package is a case study in this phenomenon. The provision allocates $28 billion toward last-mile connectivity, with specific carve-outs for tribal lands, rural counties with fewer than 50,000 residents, and what the bill calls "persistent connectivity deserts" — urban areas with infrastructure but prohibitively high costs.

Telecommunications analysts have described it as the most substantive federal action on broadband equity since the 1996 Telecommunications Act. Several have noted that implementation details will determine whether it succeeds or becomes another line item absorbed by incumbent carriers with little reaching underserved communities.

The fight will play out at the state level over the next three years, as grant applications are reviewed and contracts awarded. The organizations best positioned to benefit — smaller municipal providers, rural electric cooperatives, and community networks — are also the least equipped to navigate federal procurement bureaucracy.

Whether the money reaches its intended targets will depend on whether the administration invests in technical assistance for smaller applicants. Early signs are mixed.`,
    author: "Theodora Walsh",
    authorRole: "Policy Reporter",
    date: "February 12, 2026",
    readTime: "11 min read",
    accentColor: "bg-blue-900",
  },
  {
    id: 4,
    category: "Business",
    title: "Remote Work's Second Act: What the Data Now Shows",
    excerpt:
      "Three years after the great return-to-office debate dominated every boardroom, researchers are finally getting a clearer picture of what actually happened to productivity.",
    content: `The return-to-office debate generated enormous heat and very little light for most of 2022 and 2023. Executives spoke of collaboration dying on muted Zoom calls. Employees cited commute times and mortgage payments. Both sides claimed to have data. Almost nobody did.

The longitudinal studies are now available, and the picture they paint is more complex than either camp predicted. Productivity — measured rigorously, accounting for output quality rather than hours logged — did not collapse in remote settings for knowledge workers. In some roles, particularly those requiring deep focus and individual output, it modestly increased.

What suffered, consistently, was a different category: organizational cohesion, informal knowledge transfer, and what researchers are calling "ambient awareness" — the low-grade situational understanding of what colleagues are working on and struggling with.

The hybrid arrangements that have emerged in most large organizations represent an implicit recognition of this tradeoff. Two to three days in office, often Tuesday through Thursday, has become a de facto standard in financial services and technology. Fully remote arrangements persist primarily in companies that were remote-native before 2020.

The more interesting question now is whether the next generation of collaboration tools can recover some of what was lost — and whether recovering it matters as much as originally feared.`,
    author: "Marcus Chen",
    authorRole: "Business Desk",
    date: "February 10, 2026",
    readTime: "8 min read",
    accentColor: "bg-green-900",
  },
  {
    id: 5,
    category: "Sports",
    title: "The Analytics Revolution Has Reached Its Limits — Coaches Are Fighting Back",
    excerpt:
      "A growing cohort of elite coaches is pushing back on data-driven roster management, arguing that what matters most in sport resists quantification.",
    content: `The sports analytics movement has delivered genuine value. Inefficiencies in player valuation have been corrected. Draft decisions have improved. Lineup optimization has become more rigorous across basketball, baseball, and football.

But something has shifted in the past two seasons. A cohort of high-performing coaches — several of whom operate at the highest professional levels — are beginning to articulate a critique that was once considered career-limiting to voice publicly: the models are running out of signal.

Their argument is not that data is useless. It is that the easy inefficiencies have been captured, and what remains is precisely the domain where human judgment, relationship quality, and read-the-room intelligence matters most.

The specific flashpoint has been player development. Analytics departments can identify talent and project performance curves with considerable accuracy. What they struggle to model is the developmental arc of a 22-year-old who is technically gifted but psychologically volatile — whose trajectory will depend heavily on coaching relationship quality, team culture, and sequence of challenges.

Several teams have quietly restructured the relationship between coaches and analytics staff — giving coaches final authority on roster decisions that were previously analytics-driven. The results are too recent to evaluate definitively. But the organizational acknowledgment that the pendulum swung too far is itself significant.`,
    author: "DeShawn Rivers",
    authorRole: "Sports Editor",
    date: "February 8, 2026",
    readTime: "10 min read",
    accentColor: "bg-red-900",
  },
  {
    id: 6,
    category: "Technology",
    title: "Open Source Sustainability Has a New Model — and It Might Actually Work",
    excerpt:
      "After years of maintainers burning out and critical projects collapsing for lack of funding, a new wave of sustainable open source arrangements is showing promise.",
    content: `The open source sustainability crisis has been well-documented for years. Critical infrastructure — libraries used by millions of applications, tools embedded in production systems at the world's largest companies — maintained by one or two unpaid volunteers working evenings and weekends.

The solutions tried so far have produced mixed results. Donation drives create spikes and then trail off. Bounty systems optimize for visible features over maintenance. Corporate sponsorship is unpredictable and often comes with implicit expectations that compromise project neutrality.

What is showing more durable results is a newer arrangement sometimes called the "maintainer cooperative" model. Small groups of two to six engineers operate as a collective — legally structured as a cooperative or LLC — and collectively negotiate with companies that depend heavily on their software.

The key innovation is not financial but relational. Rather than anonymous donations, these arrangements establish explicit service relationships: priority support, input into the roadmap, security disclosure before public announcements. Companies understand this model. It maps onto vendor relationships they already have.

Several cooperatives now operating this way have achieved annual revenue in the low millions with team sizes small enough to remain sustainable. More importantly, the maintainers report something previously rare in open source: a sense that the work is financially viable long-term.`,
    author: "Elena Vasquez",
    authorRole: "Tech Policy Correspondent",
    date: "February 5, 2026",
    readTime: "12 min read",
    accentColor: "bg-violet-900",
  },
  {
    id: 7,
    category: "Culture",
    title: "Literary Fiction's Unexpected Comeback Among Young Readers",
    excerpt:
      "After a decade of decline, publishers are reporting that serious literary fiction is finding new audiences in their twenties — and BookTok is only part of the story.",
    content: `The narrative about young people and literary fiction has been grim for fifteen years. Attention spans shortened by social media. Competition for time from streaming. The rise of genre fiction as the dominant commercial force. Serious novels were presumed to be aging out of cultural relevance.

The sales data from the past 18 months complicates this story considerably. Several major publishers are reporting that their literary fiction titles — long-form, character-driven, stylistically ambitious work — are finding their strongest audiences in the 22-34 demographic for the first time in a decade.

BookTok is part of the explanation, but not in the way usually assumed. The platform's dominant aesthetic is not quick content — it is the opposite. Long unboxing rituals, extended reading vlogs, multi-part discussions of single novels. The parasocial intimacy of the format maps well onto the experience of reading, which is itself intimate.

But there is something else operating underneath the algorithm. Several booksellers and librarians who work closely with young readers point to a generation that grew up with infinite content and is making increasingly deliberate choices to invest time in things with density and difficulty. Friction, paradoxically, has become part of the appeal.

Whether publishers will read this correctly — and resist the temptation to produce more accessible, less demanding literary fiction — will determine whether the moment persists or dissolves.`,
    author: "Sophie Lindqvist",
    authorRole: "Books Editor",
    date: "February 2, 2026",
    readTime: "9 min read",
    accentColor: "bg-amber-900",
  },
  {
    id: 8,
    category: "Business",
    title: "Why the Consulting Industry Is in Its Deepest Crisis in Forty Years",
    excerpt:
      "Strategy consulting firms that have defined corporate thinking for generations are facing a convergence of pressures that is reshaping the industry from top to bottom.",
    content: `McKinsey, Bain, Boston Consulting Group — the names have been synonymous with corporate strategy for so long that it is easy to forget they are businesses, subject to the same disruption forces they have spent decades helping clients navigate.

The current moment is genuinely precarious. Several converging pressures have materialized simultaneously in a way that individually manageable but collectively destabilizing.

AI has compressed the timeline and cost of the analytical work that historically justified consulting fees. Market analysis that required a team of associates working for two weeks can now be produced, in rough form, in hours. The value of the insight has not changed. The value of the labor required to generate it has dropped sharply.

Simultaneously, clients have become more sophisticated. The knowledge asymmetry that consulting firms relied on — clients simply not knowing what best practice looked like — has eroded as internal strategy functions have built capability and alumni networks have diffused firm methodologies broadly.

The firms that are navigating this best are those that have moved aggressively up the value chain — toward implementation, toward ongoing advisory relationships, toward proprietary data products that cannot be replicated by a language model. The firms still competing on traditional deliverable quality are under severe margin pressure.

The talent implication is already visible. The premium that consulting firms historically commanded in recruiting — the combination of compensation and perceived prestige — is narrowing at elite universities, where technology and finance remain more attractive destinations.`,
    author: "Nathaniel Osei",
    authorRole: "Business Analyst",
    date: "January 30, 2026",
    readTime: "13 min read",
    accentColor: "bg-stone-800",
  },
];

const CATEGORIES = ["All", "Politics", "Culture", "Technology", "Business", "Sports"];

const BREAKING_ITEMS = [
  "Federal Reserve holds rates steady for third consecutive quarter",
  "Global chip shortage shows first signs of easing as TSMC expands capacity",
  "Record-breaking winter storm reshapes travel across the Northeast",
  "Tech giant announces layoffs affecting 8,000 positions worldwide",
  "Climate summit reaches partial accord on methane emissions targets",
  "Three nations sign historic digital trade framework in Brussels",
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function BreakingTicker() {
  const tickerText = BREAKING_ITEMS.join("   ·   ");

  return (
    <div className="bg-red-600 text-white overflow-hidden flex items-stretch">
      <div className="flex-shrink-0 px-4 py-2 bg-red-800 flex items-center">
        <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap">
          Breaking
        </span>
      </div>
      <div className="flex-1 overflow-hidden py-2 relative">
        <div
          className="whitespace-nowrap text-xs font-medium inline-block"
          style={{
            animation: "ticker-scroll 40s linear infinite",
          }}
        >
          {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
        </div>
      </div>
    </div>
  );
}

function CategoryBadge({ category, small = false }: { category: string; small?: boolean }) {
  const colorMap: Record<string, string> = {
    Technology: "bg-slate-800 text-white",
    Culture: "bg-amber-700 text-white",
    Politics: "bg-blue-900 text-white",
    Business: "bg-green-900 text-white",
    Sports: "bg-red-900 text-white",
  };
  const color = colorMap[category] ?? "bg-zinc-700 text-white";
  return (
    <span
      className={`inline-block font-semibold uppercase tracking-widest rounded ${color} ${
        small ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"
      }`}
    >
      {category}
    </span>
  );
}

function ArticleModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8 px-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Modal header accent */}
        <div className={`h-1.5 w-full ${article.accentColor}`} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors z-10"
          aria-label="Close article"
        >
          <X className="w-4 h-4 text-zinc-600" />
        </button>

        <div className="p-6 md:p-10">
          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <CategoryBadge category={article.category} />
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
            <span className="text-xs text-zinc-500">{article.date}</span>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight text-zinc-900 mb-4">
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-base text-zinc-600 font-medium leading-relaxed mb-6 border-l-4 border-red-600 pl-4 italic">
            {article.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-zinc-200">
            <div className={`w-10 h-10 rounded-full ${article.accentColor} flex items-center justify-center flex-shrink-0`}>
              <User className="w-5 h-5 text-white/80" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">{article.author}</p>
              <p className="text-xs text-zinc-500">{article.authorRole}</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-zinc max-w-none">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-zinc-700 leading-relaxed mb-5 text-[15px] font-sans"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  onClick,
  variant = "grid",
}: {
  article: Article;
  onClick: () => void;
  variant?: "featured" | "grid";
}) {
  if (variant === "featured") {
    return (
      <button
        onClick={onClick}
        className="group text-left w-full rounded-xl overflow-hidden border border-zinc-200 hover:shadow-lg hover:border-zinc-300 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
      >
        <div className={`${article.accentColor} aspect-[16/9] relative flex items-end`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="relative p-5 md:p-6">
            <CategoryBadge category={article.category} />
          </div>
        </div>
        <div className="p-5 md:p-6">
          <h2 className="font-serif text-xl md:text-2xl font-bold leading-tight text-zinc-900 mb-3 group-hover:text-red-600 transition-colors">
            {article.title}
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="font-semibold text-zinc-700">{article.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
            <span>·</span>
            <span>{article.date}</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group text-left w-full flex flex-col border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md hover:border-zinc-300 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
    >
      <div className={`${article.accentColor} aspect-[16/10] relative flex-shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/40" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <CategoryBadge category={article.category} small />
        </div>
        <h3 className="font-serif text-base font-bold leading-snug text-zinc-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-3">
          {article.title}
        </h3>
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-zinc-400 mt-auto">
          <span className="font-medium text-zinc-600">{article.author}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {article.readTime}
          </span>
        </div>
      </div>
    </button>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscribeState, setSubscribeState] = useState<"idle" | "loading" | "success">("idle");

  const validateEmail = (value: string): string => {
    if (!value.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
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

  return (
    <section
      id="subscribe"
      className="py-14 md:py-20 px-4 md:px-6 lg:px-8 bg-zinc-50 border-y border-zinc-200"
    >
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">
          Newsletter
        </p>
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 mb-4 leading-tight">
          Journalism worth your inbox
        </h3>
        <p className="text-sm text-zinc-600 mb-8 leading-relaxed">
          Curated analysis across politics, culture, technology, and business — delivered
          every Tuesday and Friday. Join 12,000+ readers.
        </p>

        {subscribeState === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <p className="text-base font-semibold text-zinc-900">You are subscribed.</p>
            <p className="text-sm text-zinc-500">
              Check your inbox for a confirmation email from The Broadsheet.
            </p>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(validateEmail(e.target.value));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubscribe();
                  }}
                  placeholder="your@email.com"
                  aria-label="Email address"
                  aria-describedby={emailError ? "email-error" : undefined}
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                    emailError
                      ? "border-red-400 focus:ring-red-200"
                      : "border-zinc-300 focus:ring-red-200 focus:border-red-400"
                  }`}
                />
              </div>
              <button
                onClick={handleSubscribe}
                disabled={subscribeState === "loading"}
                className="flex-shrink-0 px-5 py-3 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 disabled:opacity-70 transition-colors flex items-center gap-2"
              >
                {subscribeState === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Subscribe <Mail className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
            {emailError && (
              <p id="email-error" className="mt-2 text-xs text-red-600 text-left">
                {emailError}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function MagazineLandingTemplate() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const featuredArticles = ARTICLES.filter((a) => a.isFeatured);

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.author.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const gridArticles = filteredArticles.filter((a) => !a.isFeatured);

  return (
    <>
      {/* Ticker animation keyframes */}
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="min-h-screen bg-white text-zinc-900">
        {/* ── Breaking Ticker ─────────────────────────────────────────────── */}
        <BreakingTicker />

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            {/* Top bar */}
            <div className="flex items-center justify-between py-2.5 border-b border-zinc-100 text-xs text-zinc-500">
              <span className="hidden sm:block uppercase tracking-widest">
                Est. 2021&nbsp;·&nbsp;Independent Journalism
              </span>
              <div className="flex items-center gap-5">
                <a href="#" className="hover:text-zinc-900 transition-colors">About</a>
                <a href="#" className="hover:text-zinc-900 transition-colors">Contribute</a>
                <a
                  href="#subscribe"
                  className="px-3 py-1 bg-red-600 text-white rounded font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  Subscribe
                </a>
              </div>
            </div>

            {/* Masthead */}
            <div className="py-7 md:py-10 text-center border-b border-zinc-100">
              <Link href="/templates/magazine-landing" prefetch={false} className="inline-block group">
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 group-hover:text-red-600 transition-colors">
                  The Broadsheet
                </h1>
                <p className="text-[10px] md:text-xs tracking-[0.4em] text-zinc-400 mt-2 uppercase">
                  Politics&nbsp;&nbsp;·&nbsp;&nbsp;Culture&nbsp;&nbsp;·&nbsp;&nbsp;Technology&nbsp;&nbsp;·&nbsp;&nbsp;Business
                </p>
              </Link>
            </div>

            {/* Category nav + search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
              <nav className="flex items-center gap-1 overflow-x-auto flex-shrink-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${
                      activeCategory === cat
                        ? "bg-red-600 text-white"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>

              {/* Search */}
              <div
                className={`relative flex items-center border rounded-lg transition-all ${
                  searchFocused
                    ? "border-red-400 ring-2 ring-red-100"
                    : "border-zinc-200 bg-zinc-50"
                }`}
              >
                <Search className="w-3.5 h-3.5 text-zinc-400 ml-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search articles..."
                  aria-label="Search articles"
                  className="bg-transparent py-2 pl-2 pr-4 text-sm w-44 md:w-56 focus:outline-none placeholder:text-zinc-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mr-2 p-0.5 rounded-full hover:bg-zinc-200 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3 text-zinc-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ── Featured Hero ────────────────────────────────────────────────── */}
        {!searchQuery && activeCategory === "All" && (
          <section className="py-8 md:py-12 px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Featured
                </h2>
                <div className="flex-1 mx-6 h-px bg-zinc-200" />
                <span className="text-xs text-zinc-400">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onClick={() => setSelectedArticle(article)}
                    variant="featured"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Divider ──────────────────────────────────────────────────────── */}
        {!searchQuery && activeCategory === "All" && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="border-t border-zinc-200" />
          </div>
        )}

        {/* ── Article Grid ─────────────────────────────────────────────────── */}
        <section className="py-8 md:py-12 lg:py-14 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : activeCategory === "All"
                  ? "Latest"
                  : activeCategory}
              </h2>
              <span className="text-xs text-zinc-400">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
              </span>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-zinc-400 text-sm">
                  No articles found{searchQuery ? ` for "${searchQuery}"` : ""}.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-4 text-xs font-semibold text-red-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {(searchQuery || activeCategory !== "All"
                  ? filteredArticles
                  : gridArticles
                ).map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onClick={() => setSelectedArticle(article)}
                    variant="grid"
                  />
                ))}
              </div>
            )}

            {/* View more prompt */}
            {filteredArticles.length > 0 && (
              <div className="mt-10 flex justify-center">
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 border border-red-200 hover:bg-red-50 rounded-lg px-5 py-2.5 transition-colors">
                  Load More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Sidebar Pull Quote ────────────────────────────────────────────── */}
        <section className="py-10 md:py-14 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-start border-t border-b border-zinc-200 py-10">
              <div className="md:col-span-2">
                <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">
                  Editor&apos;s Note
                </p>
                <blockquote className="font-serif text-2xl md:text-3xl font-bold text-zinc-900 leading-snug border-l-4 border-red-600 pl-6">
                  &ldquo;The value of independent journalism is not neutrality &mdash; it is rigor.
                  We are not trying to be balanced. We are trying to be right.&rdquo;
                </blockquote>
                <p className="mt-5 text-sm text-zinc-500">
                  — Catherine Moore, Editor-in-Chief
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  Most Read This Week
                </p>
                {ARTICLES.slice(0, 4).map((article, i) => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="group flex items-start gap-3 text-left focus:outline-none"
                  >
                    <span className="font-serif text-3xl font-bold text-zinc-200 leading-none flex-shrink-0 group-hover:text-red-200 transition-colors">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold leading-snug text-zinc-800 group-hover:text-red-600 transition-colors line-clamp-2">
                        {article.title}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0 mt-0.5 group-hover:text-red-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Newsletter ────────────────────────────────────────────────────── */}
        <NewsletterSection />

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer className="py-8 md:py-10 px-4 md:px-6 lg:px-8 border-t border-zinc-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <span className="font-serif text-xl font-bold text-zinc-900">
                  The Broadsheet
                </span>
                <p className="text-xs text-zinc-400 mt-1">Independent journalism since 2021.</p>
              </div>
              <div className="flex gap-5 text-xs text-zinc-500">
                <a href="#" className="hover:text-zinc-900 transition-colors">Twitter</a>
                <a href="#" className="hover:text-zinc-900 transition-colors">Instagram</a>
                <a href="#" className="hover:text-zinc-900 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-zinc-900 transition-colors">RSS</a>
              </div>
            </div>
            <div className="border-t border-zinc-100 pt-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-zinc-400">
              <span>
                Copyright 2026&nbsp;·&nbsp;Part of{" "}
                <Link href="/templates" className="text-zinc-600 hover:underline">
                  StyleKit Templates
                </Link>
              </span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-zinc-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-zinc-600 transition-colors">Terms</a>
                <a href="#" className="hover:text-zinc-600 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>

        <TemplateBackButton variant="editorial" />
      </div>

      {/* ── Article Modal ──────────────────────────────────────────────────── */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  );
}
