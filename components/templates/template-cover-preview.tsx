/**
 * Abstract mini-layout thumbnails for template cards.
 * Each template gets a unique layout visualization using the style's real colors.
 */

interface CoverProps {
  templateId: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
}

/* Tiny reusable building blocks */
function Bar({ color, className }: { color: string; className?: string }) {
  return <div className={className} style={{ backgroundColor: color }} />;
}

function TextLines({ color, count = 3 }: { color: string; count?: number }) {
  return (
    <div className="flex flex-col gap-[3px]">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-[3px] rounded-full"
          style={{
            backgroundColor: color,
            opacity: 0.35,
            width: i === count - 1 ? "60%" : "100%",
          }}
        />
      ))}
    </div>
  );
}

/* ── Layout: Landing (hero + feature cards) ── */
function LandingLayout({ primary, secondary, accent }: { primary: string; secondary: string; accent: string[] }) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Nav */}
      <div className="flex items-center justify-between px-3 py-2">
        <Bar color={primary} className="w-8 h-2 rounded-sm" />
        <div className="flex gap-1.5">
          <Bar color={secondary} className="w-5 h-1.5 rounded-sm opacity-40" />
          <Bar color={secondary} className="w-5 h-1.5 rounded-sm opacity-40" />
          <Bar color={secondary} className="w-5 h-1.5 rounded-sm opacity-40" />
        </div>
      </div>
      {/* Hero */}
      <div className="flex-1 flex items-center px-4">
        <div className="w-1/2 space-y-2">
          <Bar color={secondary} className="w-3/4 h-3 rounded-sm" />
          <Bar color={secondary} className="w-full h-2 rounded-sm opacity-50" />
          <Bar color={primary} className="w-12 h-4 rounded-sm mt-2" />
        </div>
        <div className="w-1/2 flex justify-center">
          <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: primary, opacity: 0.2 }} />
        </div>
      </div>
      {/* Feature cards */}
      <div className="px-3 pb-3 flex gap-2">
        {(accent.length > 0 ? accent.slice(0, 3) : [primary, secondary, primary]).map((c, i) => (
          <div key={i} className="flex-1 h-10 rounded-md p-1.5" style={{ backgroundColor: c, opacity: 0.15 }}>
            <Bar color={c} className="w-3 h-3 rounded-sm mb-1" />
            <Bar color={secondary} className="w-full h-1 rounded-full opacity-30" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Layout: Dashboard (sidebar + stats + chart) ── */
function DashboardLayout({ primary, secondary, accent }: { primary: string; secondary: string; accent: string[] }) {
  return (
    <div className="w-full h-full flex">
      {/* Sidebar */}
      <div className="w-12 border-r flex flex-col gap-2 p-2" style={{ borderColor: `${secondary}20` }}>
        <Bar color={primary} className="w-full h-5 rounded-md" />
        <Bar color={secondary} className="w-full h-3 rounded-sm opacity-20" />
        <Bar color={secondary} className="w-full h-3 rounded-sm opacity-20" />
        <Bar color={secondary} className="w-full h-3 rounded-sm opacity-20" />
      </div>
      {/* Main */}
      <div className="flex-1 p-2 flex flex-col gap-2">
        {/* Stat cards */}
        <div className="flex gap-1.5">
          {(accent.length >= 2 ? accent.slice(0, 4) : [primary, secondary, primary, secondary]).map((c, i) => (
            <div key={i} className="flex-1 h-8 rounded-md p-1.5" style={{ backgroundColor: c, opacity: 0.15 }}>
              <Bar color={c} className="w-4 h-2 rounded-sm" />
            </div>
          ))}
        </div>
        {/* Chart area */}
        <div className="flex-1 rounded-md p-2 flex items-end gap-1" style={{ backgroundColor: `${secondary}08` }}>
          {[35, 58, 42, 68, 54, 78, 62, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{ height: `${h}%`, backgroundColor: primary, opacity: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Layout: Blog (article with text) ── */
function BlogLayout({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Nav */}
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: `${secondary}15` }}>
        <Bar color={secondary} className="w-10 h-2 rounded-sm opacity-60" />
        <div className="flex gap-1.5">
          <Bar color={secondary} className="w-4 h-1.5 rounded-sm opacity-30" />
          <Bar color={secondary} className="w-4 h-1.5 rounded-sm opacity-30" />
        </div>
      </div>
      {/* Article */}
      <div className="flex-1 flex justify-center px-4 py-3">
        <div className="w-3/4 space-y-3">
          <Bar color={primary} className="w-1/4 h-1.5 rounded-full opacity-40" />
          <Bar color={secondary} className="w-full h-3 rounded-sm" />
          <Bar color={secondary} className="w-2/3 h-2 rounded-sm opacity-40" />
          <div className="pt-2">
            <TextLines color={secondary} count={4} />
          </div>
          <div className="pt-1">
            <TextLines color={secondary} count={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Layout: Portfolio (project grid) ── */
function PortfolioLayout({ primary, secondary, accent }: { primary: string; secondary: string; accent: string[] }) {
  const gridColors = accent.length >= 3
    ? [...accent.slice(0, 3), primary, accent[0] || primary, secondary]
    : [primary, secondary, primary, secondary, primary, secondary];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Nav */}
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: `${secondary}15` }}>
        <Bar color={secondary} className="w-10 h-2 rounded-sm" />
        <div className="flex gap-1.5">
          <Bar color={secondary} className="w-4 h-1.5 rounded-sm opacity-30" />
          <Bar color={secondary} className="w-4 h-1.5 rounded-sm opacity-30" />
        </div>
      </div>
      {/* Hero */}
      <div className="px-4 py-3">
        <Bar color={secondary} className="w-1/2 h-4 rounded-sm mb-1" />
        <Bar color={secondary} className="w-1/3 h-2 rounded-sm opacity-30" />
      </div>
      {/* Project grid */}
      <div className="flex-1 px-3 pb-3 grid grid-cols-3 gap-1.5">
        {gridColors.map((c, i) => (
          <div key={i} className="rounded-md" style={{ backgroundColor: c, opacity: 0.2 }} />
        ))}
      </div>
    </div>
  );
}

/* ── Layout: Magazine (featured + grid) ── */
function MagazineLayout({ primary, secondary, accent }: { primary: string; secondary: string; accent: string[] }) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Masthead */}
      <div className="text-center py-2 border-b" style={{ borderColor: `${secondary}15` }}>
        <Bar color={secondary} className="w-16 h-2.5 rounded-sm mx-auto" />
      </div>
      {/* Featured row */}
      <div className="flex gap-1.5 px-2 py-2">
        <div className="flex-1 rounded-md" style={{ backgroundColor: primary, opacity: 0.2 }} />
        <div className="flex-1 rounded-md" style={{ backgroundColor: accent[0] || secondary, opacity: 0.2 }} />
      </div>
      {/* Grid */}
      <div className="flex-1 px-2 pb-2 grid grid-cols-3 gap-1.5">
        {[accent[1] || primary, accent[2] || secondary, primary].map((c, i) => (
          <div key={i} className="rounded-md flex flex-col" style={{ backgroundColor: c, opacity: 0.15 }}>
            <div className="flex-1" />
            <div className="p-1">
              <Bar color={secondary} className="w-full h-1 rounded-full opacity-40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Layout: Neumorphism (raised elements) ── */
function NeumorphismLayout({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div className="w-full h-full flex flex-col p-3 gap-2" style={{ backgroundColor: "#e0e5ec" }}>
      {/* Nav bar */}
      <div
        className="flex items-center justify-between px-2 py-1.5 rounded-lg"
        style={{ boxShadow: "2px 2px 4px #b8bcc2, -2px -2px 4px #ffffff" }}
      >
        <Bar color={secondary} className="w-8 h-2 rounded-sm opacity-60" />
        <div className="flex gap-1">
          <div className="w-4 h-3 rounded-md" style={{ boxShadow: "1px 1px 2px #b8bcc2, -1px -1px 2px #ffffff" }} />
          <div className="w-4 h-3 rounded-md" style={{ boxShadow: "1px 1px 2px #b8bcc2, -1px -1px 2px #ffffff" }} />
        </div>
      </div>
      {/* Hero */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-2">
          <Bar color={secondary} className="w-20 h-2.5 rounded-sm mx-auto" />
          <Bar color={primary} className="w-14 h-2 rounded-sm mx-auto opacity-60" />
          <div
            className="w-12 h-4 rounded-lg mx-auto mt-1"
            style={{ backgroundColor: primary, opacity: 0.7 }}
          />
        </div>
      </div>
      {/* Feature cards */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex-1 h-10 rounded-lg p-1.5"
            style={{ boxShadow: "2px 2px 4px #b8bcc2, -2px -2px 4px #ffffff" }}
          >
            <div
              className="w-3 h-3 rounded-md mb-1"
              style={{ boxShadow: "inset 1px 1px 2px #b8bcc2, inset -1px -1px 2px #ffffff" }}
            />
            <Bar color={secondary} className="w-full h-1 rounded-full opacity-25" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Layout: Brutalist (thick borders, hard shadows) ── */
function BrutalistLayout({ primary, secondary, accent }: { primary: string; secondary: string; accent: string[] }) {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Nav */}
      <div className="flex items-center justify-between px-2 py-1.5" style={{ backgroundColor: accent[0] || primary, borderBottom: "2px solid black" }}>
        <Bar color="black" className="w-10 h-2.5" />
        <div className="flex gap-1">
          <div className="w-6 h-3 bg-white border border-black" />
          <div className="w-6 h-3 bg-white border border-black" />
        </div>
      </div>
      {/* Content cards */}
      <div className="flex-1 p-2 grid grid-cols-2 gap-2">
        {(accent.length >= 3 ? accent.slice(0, 4) : [primary, secondary, accent[0] || primary, accent[1] || secondary]).map((c, i) => (
          <div
            key={i}
            className="border-2 border-black p-1.5"
            style={{
              boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
              transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
            }}
          >
            <div className="w-full h-3 mb-1" style={{ backgroundColor: c, opacity: 0.3 }} />
            <Bar color="black" className="w-3/4 h-1.5 opacity-70" />
            <Bar color="black" className="w-1/2 h-1 mt-0.5 opacity-30" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Specific template overrides for better accuracy ── */
const TEMPLATE_LAYOUT_MAP: Record<string, string> = {
  "brutal-landing": "landing-brutal",
  "glass-landing": "landing",
  "editorial-blog": "blog",
  "anx-blog": "blog-brutal",
  "warm-dashboard": "dashboard",
  "minimalist-portfolio": "portfolio",
  "magazine-landing": "magazine",
  "neumorphism-landing": "neumorphism",
  "brutalist-playful-blog": "blog-brutal",
  "social-feed": "blog",
  "file-manager": "dashboard",
  "chat-messaging": "blog",
  "calendar-schedule": "dashboard",
  "email-inbox": "dashboard",
  "music-player": "dashboard",
  "recipe-cooking": "magazine",
  "travel-booking": "landing",
  "fitness-health": "dashboard",
  "learning-course": "dashboard",
  "real-estate": "magazine",
};

export function TemplateCoverPreview({ templateId, colors }: CoverProps) {
  const { primary, secondary, accent } = colors;
  const layout = TEMPLATE_LAYOUT_MAP[templateId] || "landing";

  switch (layout) {
    case "dashboard":
      return <DashboardLayout primary={primary} secondary={secondary} accent={accent} />;
    case "portfolio":
      return <PortfolioLayout primary={primary} secondary={secondary} accent={accent} />;
    case "blog":
      return <BlogLayout primary={primary} secondary={secondary} />;
    case "blog-brutal":
      return <BrutalistLayout primary={primary} secondary={secondary} accent={accent} />;
    case "landing-brutal":
      return <BrutalistLayout primary={primary} secondary={secondary} accent={accent} />;
    case "magazine":
      return <MagazineLayout primary={primary} secondary={secondary} accent={accent} />;
    case "neumorphism":
      return <NeumorphismLayout primary={primary} secondary={secondary} />;
    default:
      return <LandingLayout primary={primary} secondary={secondary} accent={accent} />;
  }
}
