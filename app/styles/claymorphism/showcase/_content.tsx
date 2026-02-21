"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Hooks                                                               */
/* ------------------------------------------------------------------ */

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Clay Pink", hex: "#f8b4d9", textDark: true },
  { name: "Warm Cream", hex: "#fef3c7", textDark: true },
  { name: "Mint Green", hex: "#a7f3d0", textDark: true },
  { name: "Lavender", hex: "#c4b5fd", textDark: true },
  { name: "Golden Yellow", hex: "#fcd34d", textDark: true },
];

const buttonVariants = [
  { label: "Pink Clay", bg: "#f8b4d9", shadow: "rgba(248,180,217,0.55)" },
  { label: "Mint", bg: "#a7f3d0", shadow: "rgba(167,243,208,0.55)" },
  { label: "Lavender", bg: "#c4b5fd", shadow: "rgba(196,181,253,0.55)" },
  { label: "Yellow", bg: "#fcd34d", shadow: "rgba(252,211,77,0.55)" },
  { label: "Cream", bg: "#fed7aa", shadow: "rgba(254,215,170,0.55)" },
];

const cardItems = [
  {
    emoji: "\u{1F3A8}",
    title: "Creative Studio",
    desc: "Craft playful, squishy interfaces that feel tangible and alive.",
    bg: "#f8b4d9",
    badge: "Design",
    badgeBg: "#fcd34d",
  },
  {
    emoji: "\u{1F33F}",
    title: "Fresh Ideas",
    desc: "Soft mint tones and rounded shapes create a calm, welcoming space.",
    bg: "#a7f3d0",
    badge: "Concept",
    badgeBg: "#c4b5fd",
  },
  {
    emoji: "\u2728",
    title: "Magic Touch",
    desc: "Lavender gradients and glowing highlights bring pure delight.",
    bg: "#c4b5fd",
    badge: "Style",
    badgeBg: "#f8b4d9",
  },
];

const shadowLevels = [
  {
    label: "Flat",
    desc: "No depth — just a solid color block with no shadow.",
    shadow: "none",
    bg: "#f8b4d9",
    inner: "none",
  },
  {
    label: "Clay",
    desc: "Standard clay shadow: outer drop + inner highlight shine.",
    shadow: "8px 8px 0px 0px rgba(0,0,0,0.15)",
    bg: "#a7f3d0",
    inner: "inset 0 2px 4px rgba(255,255,255,0.6)",
  },
  {
    label: "Deep Clay",
    desc: "Exaggerated depth for hero elements, buttons, CTAs.",
    shadow: "12px 12px 0px 0px rgba(0,0,0,0.18)",
    bg: "#c4b5fd",
    inner: "inset 0 3px 6px rgba(255,255,255,0.7)",
  },
  {
    label: "Soft Bloom",
    desc: "Blurred shadow gives airy, cloud-like floating effect.",
    shadow: "0 16px 40px rgba(248,180,217,0.55)",
    bg: "#fcd34d",
    inner: "inset 0 2px 5px rgba(255,255,255,0.65)",
  },
];

const doRules = [
  "Use rounded-3xl or rounded-full — extreme rounded corners everywhere",
  "Combine outer offset shadow + inner white highlight for true clay depth",
  "Stick to candy pastel palette: pink, mint, lavender, yellow, cream",
  "Add hover:scale and active:scale for squish press interactions",
  "Use inner highlight: inset 0 2px 4px rgba(255,255,255,0.6)",
  "Apply soft pastel gradients: from-[#f8b4d9] to-[#c4b5fd]",
  "Keep backgrounds warm: cream, amber-50, very light pastels",
];

const dontRules = [
  "Never use sharp corners — not even rounded-sm or rounded-md",
  "Never use dark or moody backgrounds",
  "Never use flat minimal styling with no shadows",
  "Never use harsh dark drop shadows with heavy opacity",
  "Never use cool grays or desaturated neutrals",
  "Never use monospace or condensed fonts",
  "Never mix neon or electric colors into the palette",
];

const features = [
  {
    icon: "\u{1F36C}",
    title: "Candy Colors",
    desc: "Soft, cheerful pastels that feel edible and playful.",
    bg: "#ffd6e7",
  },
  {
    icon: "\u{1FAE7}",
    title: "Squishy Depth",
    desc: "Combined inner + outer shadows simulate real clay volume.",
    bg: "#d1fae5",
  },
  {
    icon: "\u{1F9F8}",
    title: "Rounded Everything",
    desc: "Extreme border-radius — nothing has a sharp edge.",
    bg: "#ede9fe",
  },
  {
    icon: "\u270B",
    title: "Tactile Feel",
    desc: "Press animations make UI feel physically touchable.",
    bg: "#fef9c3",
  },
  {
    icon: "\u{1F308}",
    title: "Gradient Surfaces",
    desc: "Pastel gradients add softness and dimension to surfaces.",
    bg: "#fce7f3",
  },
  {
    icon: "\u{1F4AB}",
    title: "Inner Shine",
    desc: "White inset highlight at top edge simulates clay sheen.",
    bg: "#e0f2fe",
  },
];

const stats = [
  { value: "99%", label: "Squish Factor", color: "#f8b4d9" },
  { value: "3D", label: "Clay Depth", color: "#a7f3d0" },
  { value: "0px", label: "Sharp Corners", color: "#c4b5fd" },
  { value: "100%", label: "Candy Vibes", color: "#fcd34d" },
];

const inputTabs = ["Text", "Email", "Search"];

const floatingBlobs = [
  {
    top: "8%",
    left: "3%",
    w: "120px",
    h: "100px",
    bg: "#f8b4d9",
    r: "60% 40% 55% 45% / 50% 60% 40% 50%",
    opacity: 0.55,
  },
  {
    top: "15%",
    right: "4%",
    w: "90px",
    h: "90px",
    bg: "#a7f3d0",
    r: "45% 55% 40% 60% / 60% 40% 55% 45%",
    opacity: 0.5,
  },
  {
    top: "42%",
    left: "1%",
    w: "70px",
    h: "80px",
    bg: "#c4b5fd",
    r: "55% 45% 60% 40% / 45% 55% 45% 55%",
    opacity: 0.45,
  },
  {
    top: "60%",
    right: "2%",
    w: "100px",
    h: "85px",
    bg: "#fcd34d",
    r: "40% 60% 45% 55% / 55% 45% 60% 40%",
    opacity: 0.4,
  },
  {
    top: "78%",
    left: "2%",
    w: "80px",
    h: "70px",
    bg: "#fed7aa",
    r: "60% 40% 50% 50% / 40% 60% 40% 60%",
    opacity: 0.45,
  },
  {
    top: "85%",
    right: "5%",
    w: "65px",
    h: "75px",
    bg: "#f8b4d9",
    r: "50% 50% 40% 60% / 60% 40% 55% 45%",
    opacity: 0.4,
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function ClayButton({
  label,
  bg,
  size = "md",
}: {
  label: string;
  bg: string;
  shadow?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const padMap = { sm: "px-5 py-2 text-sm", md: "px-7 py-3 text-base", lg: "px-9 py-4 text-lg" };

  const scale = pressed ? 0.96 : hovered ? 1.04 : 1;
  const boxShadow = pressed
    ? `4px 4px 0px 0px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.5)`
    : hovered
    ? `12px 12px 0px 0px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.6)`
    : `8px 8px 0px 0px rgba(0,0,0,0.13), inset 0 2px 4px rgba(255,255,255,0.6)`;

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        backgroundColor: bg,
        boxShadow,
        transform: `scale(${scale})`,
        transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.15s ease",
      }}
      className={`${padMap[size]} rounded-full font-bold text-gray-700 cursor-pointer border-0 outline-none`}
    >
      {label}
    </button>
  );
}

function ClayCard({ item }: { item: (typeof cardItems)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: item.bg,
        boxShadow: hovered
          ? `12px 12px 0px 0px rgba(0,0,0,0.14), inset 0 2px 5px rgba(255,255,255,0.65)`
          : `8px 8px 0px 0px rgba(0,0,0,0.12), inset 0 2px 4px rgba(255,255,255,0.6)`,
        transform: hovered ? "scale(1.03) translateY(-4px)" : "scale(1) translateY(0)",
        transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
      }}
      className="rounded-3xl p-6 flex flex-col gap-4 cursor-pointer"
    >
      {/* Inner shine strip */}
      <div
        className="absolute inset-x-4 top-3 h-1 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.55)" }}
      />
      <div className="relative">
        <div className="text-4xl mb-3">{item.emoji}</div>
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
          style={{
            backgroundColor: item.badgeBg,
            boxShadow: "3px 3px 0px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.5)",
          }}
        >
          {item.badge}
        </span>
        <h3 className="text-xl font-black text-gray-800 mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

function ClayInput({
  placeholder,
  type = "text",
}: {
  placeholder: string;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          background: "rgba(255,255,255,0.85)",
          boxShadow: focused
            ? `0 0 0 3px #f8b4d9, 6px 6px 0px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.7)`
            : `6px 6px 0px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.6)`,
          transition: "box-shadow 0.2s ease",
        }}
        className="w-full rounded-2xl px-5 py-3 text-gray-700 font-medium border-0 outline-none placeholder-gray-400"
      />
      {/* Top shine */}
      <div
        className="absolute inset-x-3 top-2 h-0.5 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.7)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { ref: heroRef, inView: heroInView } = useInView();

  const [activeColorTab, setActiveColorTab] = useState(0);
  const [activeInputTab, setActiveInputTab] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(248);
  const [activeNav, setActiveNav] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "explore", label: "Explore" },
    { id: "create", label: "Create" },
    { id: "play", label: "Play" },
  ];

  function handleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ backgroundColor: "#fffbeb", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Floating background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {floatingBlobs.map((blob, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: blob.top,
              left: (blob as { left?: string }).left,
              right: (blob as { right?: string }).right,
              width: blob.w,
              height: blob.h,
              backgroundColor: blob.bg,
              borderRadius: blob.r,
              opacity: blob.opacity,
              filter: "blur(1px)",
              boxShadow: `4px 4px 0px rgba(0,0,0,0.06), inset 0 2px 4px rgba(255,255,255,0.5)`,
            }}
          />
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 1. Navigation                                                     */}
      {/* ---------------------------------------------------------------- */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: "rgba(255,251,235,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "2px solid rgba(248,180,217,0.25)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-gray-700 text-sm"
              style={{
                background: "linear-gradient(135deg, #f8b4d9, #c4b5fd)",
                boxShadow: "4px 4px 0px rgba(0,0,0,0.12), inset 0 1px 3px rgba(255,255,255,0.6)",
              }}
            >
              SK
            </div>
            <span className="font-black text-gray-800 text-lg tracking-tight">StyleKit</span>
            <span
              className="text-sm font-semibold px-2 py-0.5 rounded-full ml-1"
              style={{
                backgroundColor: "#f8b4d9",
                boxShadow: "2px 2px 0px rgba(0,0,0,0.1)",
              }}
            >
              →
            </span>
          </Link>

          {/* Nav items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className="px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer border-0 outline-none"
                style={{
                  backgroundColor: activeNav === item.id ? "#f8b4d9" : "transparent",
                  boxShadow:
                    activeNav === item.id
                      ? "4px 4px 0px rgba(0,0,0,0.12), inset 0 1px 3px rgba(255,255,255,0.6)"
                      : "none",
                  color: activeNav === item.id ? "#7c2d62" : "#6b7280",
                  transform: activeNav === item.id ? "scale(1.03)" : "scale(1)",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <ClayButton label="Get Started" bg="#a7f3d0" shadow="rgba(167,243,208,0.5)" size="sm" />
        </div>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Hero                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section
        ref={heroRef}
        className="relative pt-36 pb-28 px-6 text-center overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Hero decorative blobs */}
        <div
          className="absolute top-20 left-12 w-32 h-28 pointer-events-none"
          style={{
            backgroundColor: "#fcd34d",
            borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%",
            boxShadow: "8px 8px 0px rgba(0,0,0,0.12), inset 0 2px 5px rgba(255,255,255,0.65)",
            opacity: heroInView ? 0.85 : 0,
            transform: heroInView ? "scale(1) rotate(-8deg)" : "scale(0.6) rotate(-8deg)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
          }}
        />
        <div
          className="absolute top-28 right-16 w-24 h-24 pointer-events-none"
          style={{
            backgroundColor: "#a7f3d0",
            borderRadius: "40% 60% 45% 55% / 60% 40% 60% 40%",
            boxShadow: "8px 8px 0px rgba(0,0,0,0.12), inset 0 2px 5px rgba(255,255,255,0.65)",
            opacity: heroInView ? 0.85 : 0,
            transform: heroInView ? "scale(1) rotate(12deg)" : "scale(0.6) rotate(12deg)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
          }}
        />
        <div
          className="absolute bottom-16 left-20 w-20 h-20 pointer-events-none"
          style={{
            backgroundColor: "#c4b5fd",
            borderRadius: "60% 40% 55% 45% / 40% 60% 40% 60%",
            boxShadow: "6px 6px 0px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.6)",
            opacity: heroInView ? 0.75 : 0,
            transform: heroInView ? "scale(1) rotate(5deg)" : "scale(0.6) rotate(5deg)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.3s",
          }}
        />
        <div
          className="absolute bottom-20 right-24 w-28 h-22 pointer-events-none"
          style={{
            backgroundColor: "#f8b4d9",
            borderRadius: "45% 55% 40% 60% / 55% 45% 55% 45%",
            boxShadow: "7px 7px 0px rgba(0,0,0,0.11), inset 0 2px 4px rgba(255,255,255,0.6)",
            opacity: heroInView ? 0.75 : 0,
            transform: heroInView ? "scale(1) rotate(-15deg)" : "scale(0.6) rotate(-15deg)",
            transition: "opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.15s",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Badge */}
          <div
            className="inline-block mb-6"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
              transition: "opacity 0.6s ease 0.05s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.05s",
            }}
          >
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-gray-700"
              style={{
                background: "linear-gradient(135deg, #f8b4d9, #fcd34d)",
                boxShadow: "6px 6px 0px rgba(0,0,0,0.12), inset 0 2px 4px rgba(255,255,255,0.65)",
              }}
            >
              <span>Clay + Play-Doh UI</span>
              <span>&#10022;</span>
              <span>Claymorphism</span>
            </span>
          </div>

          {/* Main title */}
          <h1
            className="text-6xl md:text-8xl font-black text-gray-800 leading-tight mb-6 tracking-tight"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            Squishy.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f8b4d9 0%, #c4b5fd 50%, #a7f3d0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Soft.
            </span>
            <br />
            Touchable.
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            UI that feels like clay — oversized rounded corners, candy pastel colors,
            and 3D depth that makes every element look squishy and alive.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-4"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.35s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            <ClayButton label="Explore the Style" bg="#f8b4d9" shadow="rgba(248,180,217,0.5)" size="lg" />
            <ClayButton label="View Components" bg="#a7f3d0" shadow="rgba(167,243,208,0.5)" size="lg" />
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 mt-14"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.45s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center px-6 py-4 rounded-3xl"
                style={{
                  backgroundColor: s.color,
                  boxShadow: "6px 6px 0px rgba(0,0,0,0.11), inset 0 2px 4px rgba(255,255,255,0.6)",
                  minWidth: "110px",
                }}
              >
                <span className="text-2xl font-black text-gray-800">{s.value}</span>
                <span className="text-xs font-semibold text-gray-600 mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Component Demos                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-20" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              Component Library
            </h2>
            <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
              Every element shaped by clay: puffed up, colorful, and satisfying to press.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1} className="mb-10">
            <div className="flex justify-center">
              <div
                className="inline-flex gap-1.5 p-1.5 rounded-full"
                style={{
                  backgroundColor: "#fde68a",
                  boxShadow: "5px 5px 0px rgba(0,0,0,0.1), inset 0 2px 3px rgba(255,255,255,0.5)",
                }}
              >
                {["Buttons", "Cards", "Inputs"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveColorTab(i)}
                    className="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 cursor-pointer border-0 outline-none"
                    style={{
                      backgroundColor: activeColorTab === i ? "#f8b4d9" : "transparent",
                      boxShadow:
                        activeColorTab === i
                          ? "4px 4px 0px rgba(0,0,0,0.12), inset 0 1px 3px rgba(255,255,255,0.6)"
                          : "none",
                      color: activeColorTab === i ? "#7c2d62" : "#92400e",
                      transform: activeColorTab === i ? "scale(1.04)" : "scale(1)",
                      transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Buttons panel */}
          {activeColorTab === 0 && (
            <RevealBlock>
              <div
                className="rounded-3xl p-10"
                style={{
                  backgroundColor: "#fff7ed",
                  boxShadow: "10px 10px 0px rgba(0,0,0,0.1), inset 0 2px 5px rgba(255,255,255,0.7)",
                }}
              >
                <h3 className="text-xl font-black text-gray-700 mb-2">Clay Buttons</h3>
                <p className="text-sm text-gray-500 mb-8">
                  Press any button — feel the squish animation. Each color has calibrated shadow depth.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {buttonVariants.map((v) => (
                    <ClayButton key={v.label} label={v.label} bg={v.bg} shadow={v.shadow} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <ClayButton label="Small Pill" bg="#f8b4d9" shadow="rgba(248,180,217,0.5)" size="sm" />
                  <ClayButton label="Medium Slab" bg="#c4b5fd" shadow="rgba(196,181,253,0.5)" size="md" />
                  <ClayButton label="Large Chunk" bg="#a7f3d0" shadow="rgba(167,243,208,0.5)" size="lg" />
                </div>

                {/* Like button demo */}
                <div className="mt-8 pt-8 border-t border-pink-100">
                  <p className="text-sm text-gray-500 mb-4 font-medium">Interactive Like Button</p>
                  <button
                    onClick={handleLike}
                    className="inline-flex items-center gap-3 px-7 py-3 rounded-full font-bold text-gray-700 cursor-pointer border-0 outline-none transition-all duration-200"
                    style={{
                      backgroundColor: liked ? "#f8b4d9" : "#fef3c7",
                      boxShadow: liked
                        ? "6px 6px 0px rgba(0,0,0,0.13), inset 0 2px 4px rgba(255,255,255,0.6)"
                        : "4px 4px 0px rgba(0,0,0,0.1), inset 0 2px 3px rgba(255,255,255,0.5)",
                      transform: liked ? "scale(1.04)" : "scale(1)",
                    }}
                  >
                    <span className="text-xl" style={{ transform: liked ? "scale(1.3)" : "scale(1)", display: "inline-block", transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}>
                      {liked ? "\u2665" : "\u2661"}
                    </span>
                    <span>{likeCount} Likes</span>
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Cards panel */}
          {activeColorTab === 1 && (
            <RevealBlock>
              <div className="grid md:grid-cols-3 gap-6">
                {cardItems.map((item, i) => (
                  <RevealBlock key={item.title} delay={i * 0.08} className="relative">
                    <ClayCard item={item} />
                  </RevealBlock>
                ))}
              </div>

              {/* Wide card */}
              <RevealBlock delay={0.25} className="mt-6">
                <div
                  className="rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-center"
                  style={{
                    background: "linear-gradient(135deg, #f8b4d9 0%, #c4b5fd 100%)",
                    boxShadow: "10px 10px 0px rgba(0,0,0,0.13), inset 0 2px 6px rgba(255,255,255,0.65)",
                  }}
                >
                  {/* Shine */}
                  <div
                    className="absolute inset-x-6 top-4 h-1 rounded-full pointer-events-none"
                    style={{ background: "rgba(255,255,255,0.5)" }}
                  />
                  <div className="text-6xl">&#127914;</div>
                  <div className="flex-1">
                    <span
                      className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                      style={{
                        backgroundColor: "#fcd34d",
                        boxShadow: "3px 3px 0px rgba(0,0,0,0.1)",
                      }}
                    >
                      Featured
                    </span>
                    <h3 className="text-2xl font-black text-white mb-2">The Full Clay Experience</h3>
                    <p className="text-pink-100 leading-relaxed">
                      Gradient surfaces + extreme rounded corners + 3D offset shadows. This card
                      demonstrates how layering techniques compound to maximum clay depth.
                    </p>
                  </div>
                  <ClayButton label="Explore" bg="#fcd34d" shadow="rgba(252,211,77,0.5)" size="md" />
                </div>
              </RevealBlock>
            </RevealBlock>
          )}

          {/* Inputs panel */}
          {activeColorTab === 2 && (
            <RevealBlock>
              <div
                className="rounded-3xl p-10"
                style={{
                  backgroundColor: "#f0fdf4",
                  boxShadow: "10px 10px 0px rgba(0,0,0,0.1), inset 0 2px 5px rgba(255,255,255,0.7)",
                }}
              >
                <h3 className="text-xl font-black text-gray-700 mb-2">Clay Inputs</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Click any field — the pink ring focus state shows the clay glow effect.
                </p>

                {/* Input type tabs */}
                <div className="flex gap-2 mb-6">
                  {inputTabs.map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setActiveInputTab(i)}
                      className="px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer border-0 outline-none transition-all duration-150"
                      style={{
                        backgroundColor: activeInputTab === i ? "#a7f3d0" : "#d1fae5",
                        boxShadow:
                          activeInputTab === i
                            ? "3px 3px 0px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.6)"
                            : "none",
                        color: activeInputTab === i ? "#065f46" : "#6b7280",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-4 max-w-md">
                  <ClayInput
                    placeholder={
                      activeInputTab === 0
                        ? "Your name..."
                        : activeInputTab === 1
                        ? "hello@example.com"
                        : "Search for something..."
                    }
                    type={
                      activeInputTab === 0
                        ? "text"
                        : activeInputTab === 1
                        ? "email"
                        : "search"
                    }
                  />
                  <ClayInput placeholder="Another squishy field..." />
                  <ClayInput placeholder="Tell us something..." />
                </div>

                <div className="mt-6">
                  <ClayButton label="Submit" bg="#a7f3d0" shadow="rgba(167,243,208,0.5)" size="md" />
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Color Palette                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-20" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              Candy Color Palette
            </h2>
            <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
              Five soft, cheerful colors chosen for maximum clay warmth. No dark tones. No neons.
              Pure pastel joy.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {palette.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.08}>
                <div
                  className="rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    boxShadow: "8px 8px 0px rgba(0,0,0,0.12), inset 0 2px 5px rgba(255,255,255,0.65)",
                  }}
                >
                  {/* Swatch */}
                  <div
                    className="h-36 relative"
                    style={{ backgroundColor: color.hex }}
                  >
                    {/* Shine strip */}
                    <div
                      className="absolute inset-x-4 top-3 h-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.6)" }}
                    />
                    {/* Small clay blob decoration */}
                    <div
                      className="absolute bottom-4 right-4 w-8 h-8"
                      style={{
                        background: "rgba(255,255,255,0.35)",
                        borderRadius: "55% 45% 60% 40% / 40% 60% 40% 60%",
                        boxShadow: "2px 2px 0px rgba(0,0,0,0.08)",
                      }}
                    />
                  </div>
                  {/* Info */}
                  <div
                    className="p-4"
                    style={{ backgroundColor: "#fffbeb" }}
                  >
                    <p className="font-black text-gray-800 text-sm mb-0.5">{color.name}</p>
                    <p className="text-xs font-mono text-gray-500">{color.hex}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient demo */}
          <RevealBlock delay={0.4} className="mt-8">
            <div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #f8b4d9 0%, #c4b5fd 40%, #a7f3d0 70%, #fcd34d 100%)",
                boxShadow: "10px 10px 0px rgba(0,0,0,0.12), inset 0 3px 6px rgba(255,255,255,0.65)",
              }}
            >
              <div
                className="absolute inset-x-8 top-4 h-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.55)" }}
              />
              <p className="text-white font-black text-xl mb-2">All-Color Gradient</p>
              <p className="text-white/80 text-sm max-w-sm">
                Combining all five palette colors produces a signature claymorphism rainbow gradient.
                Use sparingly for hero and accent surfaces.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Clay Effects Demo                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-20" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              Shadow Depth System
            </h2>
            <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
              The clay 3D illusion comes from combining an outer offset shadow with an inner highlight.
              Here are four depth levels, side by side.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {shadowLevels.map((level, i) => (
              <RevealBlock key={level.label} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-5">
                  {/* Demo shape */}
                  <div
                    className="w-full h-32 rounded-3xl flex items-center justify-center"
                    style={{
                      backgroundColor: level.bg,
                      boxShadow:
                        level.inner !== "none"
                          ? `${level.shadow}, ${level.inner}`
                          : level.shadow,
                    }}
                  >
                    <span className="font-black text-gray-700 text-sm">{level.label}</span>
                  </div>

                  {/* Info */}
                  <div
                    className="w-full rounded-2xl p-4"
                    style={{
                      backgroundColor: "#fff7ed",
                      boxShadow: "4px 4px 0px rgba(0,0,0,0.08), inset 0 1px 3px rgba(255,255,255,0.6)",
                    }}
                  >
                    <p className="font-bold text-gray-700 text-sm mb-1">{level.label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{level.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Code snippet */}
          <RevealBlock delay={0.4}>
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                boxShadow: "8px 8px 0px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.5)",
              }}
            >
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{
                  background: "linear-gradient(135deg, #f8b4d9, #fcd34d)",
                  boxShadow: "inset 0 1px 3px rgba(255,255,255,0.5)",
                }}
              >
                <div className="w-3 h-3 rounded-full bg-white/60" />
                <div className="w-3 h-3 rounded-full bg-white/60" />
                <div className="w-3 h-3 rounded-full bg-white/60" />
                <span className="ml-2 font-bold text-gray-700 text-sm">clay-shadow.css</span>
              </div>
              <div
                className="p-6 font-mono text-sm leading-loose overflow-x-auto"
                style={{ backgroundColor: "#1e1e2e", color: "#cdd6f4" }}
              >
                <p><span style={{ color: "#89b4fa" }}>.clay-element</span> {"{"}</p>
                <p className="ml-4"><span style={{ color: "#a6e3a1" }}>{`/* Standard clay depth */`}</span></p>
                <p className="ml-4">
                  <span style={{ color: "#cba6f7" }}>box-shadow</span>
                  <span style={{ color: "#cdd6f4" }}>: </span>
                  <span style={{ color: "#f9e2af" }}>8px 8px 0px 0px rgba(0,0,0,0.13)</span>,
                </p>
                <p className="ml-12">
                  <span style={{ color: "#f9e2af" }}>inset 0 2px 4px rgba(255,255,255,0.6)</span>;
                </p>
                <p className="ml-4"><span style={{ color: "#cba6f7" }}>border-radius</span>: <span style={{ color: "#f9e2af" }}>24px</span>;</p>
                <p>{"}"}</p>
                <p className="mt-3"><span style={{ color: "#89b4fa" }}>.clay-element:hover</span> {"{"}</p>
                <p className="ml-4">
                  <span style={{ color: "#cba6f7" }}>box-shadow</span>: <span style={{ color: "#f9e2af" }}>12px 12px 0px rgba(0,0,0,0.15)</span>,
                </p>
                <p className="ml-12"><span style={{ color: "#f9e2af" }}>inset 0 2px 4px rgba(255,255,255,0.6)</span>;</p>
                <p className="ml-4"><span style={{ color: "#cba6f7" }}>transform</span>: <span style={{ color: "#f9e2af" }}>scale(1.04)</span>;</p>
                <p>{"}"}</p>
                <p className="mt-3"><span style={{ color: "#89b4fa" }}>.clay-element:active</span> {"{"}</p>
                <p className="ml-4">
                  <span style={{ color: "#cba6f7" }}>box-shadow</span>: <span style={{ color: "#f9e2af" }}>4px 4px 0px rgba(0,0,0,0.1)</span>,
                </p>
                <p className="ml-12"><span style={{ color: "#f9e2af" }}>inset 0 2px 4px rgba(255,255,255,0.5)</span>;</p>
                <p className="ml-4"><span style={{ color: "#cba6f7" }}>transform</span>: <span style={{ color: "#f9e2af" }}>scale(0.97)</span>;</p>
                <p>{"}"}</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. Feature Cards                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-20" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              What Makes Clay, Clay
            </h2>
            <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
              Six defining characteristics that separate claymorphism from every other design style.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
            {features.map((f, i) => (
              <RevealBlock key={f.title} delay={i * 0.07}>
                <div
                  className="rounded-3xl p-6 h-full relative overflow-hidden"
                  style={{
                    backgroundColor: f.bg,
                    boxShadow: "8px 8px 0px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.65)",
                  }}
                >
                  {/* Shine */}
                  <div
                    className="absolute inset-x-4 top-3 h-0.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.65)" }}
                  />
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-black text-gray-800 text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. Design Principles — Do / Don't                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-20" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              Design Principles
            </h2>
            <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
              The rules that keep your clay UI looking authentic — and the traps that break the spell.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Do */}
            <RevealBlock>
              <div
                className="rounded-3xl p-8 h-full relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                  boxShadow: "10px 10px 0px rgba(0,0,0,0.1), inset 0 3px 6px rgba(255,255,255,0.65)",
                }}
              >
                <div
                  className="absolute inset-x-6 top-4 h-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.6)" }}
                />
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-lg"
                    style={{
                      backgroundColor: "#059669",
                      boxShadow: "3px 3px 0px rgba(0,0,0,0.15), inset 0 1px 3px rgba(255,255,255,0.4)",
                    }}
                  >
                    +
                  </div>
                  <h3 className="font-black text-gray-800 text-xl">Do These</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {doRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white"
                        style={{
                          backgroundColor: "#34d399",
                          boxShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                        }}
                      >
                        &#10003;
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed font-medium">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.1}>
              <div
                className="rounded-3xl p-8 h-full relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #fce7f3 0%, #f8b4d9 100%)",
                  boxShadow: "10px 10px 0px rgba(0,0,0,0.1), inset 0 3px 6px rgba(255,255,255,0.65)",
                }}
              >
                <div
                  className="absolute inset-x-6 top-4 h-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.6)" }}
                />
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-lg"
                    style={{
                      backgroundColor: "#e11d48",
                      boxShadow: "3px 3px 0px rgba(0,0,0,0.15), inset 0 1px 3px rgba(255,255,255,0.4)",
                    }}
                  >
                    -
                  </div>
                  <h3 className="font-black text-gray-800 text-xl">Avoid These</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {dontRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white"
                        style={{
                          backgroundColor: "#fb7185",
                          boxShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                        }}
                      >
                        x
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed font-medium">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Comparison showcase */}
          <RevealBlock delay={0.2} className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Wrong example */}
              <div>
                <p className="font-bold text-gray-500 text-sm mb-3 flex items-center gap-2">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-black"
                    style={{ backgroundColor: "#fb7185" }}
                  >
                    x
                  </span>
                  Anti-pattern: sharp, flat, dark
                </p>
                <div
                  className="p-6"
                  style={{
                    backgroundColor: "#1e1e2e",
                    border: "2px solid #444",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    className="text-white font-bold text-sm px-4 py-2 cursor-pointer"
                    style={{
                      backgroundColor: "#6366f1",
                      borderRadius: "2px",
                      display: "inline-block",
                    }}
                  >
                    Sharp Button
                  </div>
                </div>
              </div>

              {/* Right example */}
              <div>
                <p className="font-bold text-gray-500 text-sm mb-3 flex items-center gap-2">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-black"
                    style={{ backgroundColor: "#34d399" }}
                  >
                    &#10003;
                  </span>
                  Clay pattern: rounded, soft, 3D
                </p>
                <div
                  className="p-6 rounded-3xl"
                  style={{
                    backgroundColor: "#fffbeb",
                    boxShadow: "6px 6px 0px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.6)",
                  }}
                >
                  <ClayButton label="Clay Button" bg="#f8b4d9" shadow="rgba(248,180,217,0.5)" size="sm" />
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 8. Footer                                                         */}
      {/* ---------------------------------------------------------------- */}
      <footer className="relative px-6 pt-20 pb-10" style={{ zIndex: 1 }}>
        {/* Footer blob decorations */}
        <div
          className="absolute top-8 left-8 w-16 h-16 pointer-events-none"
          style={{
            backgroundColor: "#fcd34d",
            borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%",
            boxShadow: "5px 5px 0px rgba(0,0,0,0.1), inset 0 1px 3px rgba(255,255,255,0.5)",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute top-12 right-12 w-12 h-12 pointer-events-none"
          style={{
            backgroundColor: "#a7f3d0",
            borderRadius: "40% 60% 45% 55% / 60% 40% 60% 40%",
            boxShadow: "4px 4px 0px rgba(0,0,0,0.08), inset 0 1px 3px rgba(255,255,255,0.5)",
            opacity: 0.55,
          }}
        />
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-20 h-14 pointer-events-none"
          style={{
            backgroundColor: "#c4b5fd",
            borderRadius: "60% 40% 50% 50% / 40% 60% 40% 60%",
            boxShadow: "5px 5px 0px rgba(0,0,0,0.08), inset 0 1px 3px rgba(255,255,255,0.5)",
            opacity: 0.4,
          }}
        />

        <div className="max-w-6xl mx-auto">
          {/* Top row */}
          <div
            className="rounded-3xl p-10 mb-10 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #fef3c7 0%, #fce7f3 50%, #ede9fe 100%)",
              boxShadow: "10px 10px 0px rgba(0,0,0,0.1), inset 0 3px 6px rgba(255,255,255,0.65)",
            }}
          >
            <div
              className="absolute inset-x-8 top-5 h-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.6)" }}
            />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-gray-800 mb-2">
                  Ready to go squishy?
                </h2>
                <p className="text-gray-500 font-medium max-w-sm">
                  Start building clay UIs today. Every element, touchable. Every corner, round.
                  Every color, a candy.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ClayButton label="Browse Styles" bg="#f8b4d9" shadow="rgba(248,180,217,0.5)" size="md" />
                <ClayButton label="Read Docs" bg="#a7f3d0" shadow="rgba(167,243,208,0.5)" size="md" />
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-pink-100">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-black text-gray-700 text-xs"
                style={{
                  background: "linear-gradient(135deg, #f8b4d9, #c4b5fd)",
                  boxShadow: "3px 3px 0px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.6)",
                }}
              >
                SK
              </div>
              <span className="font-bold text-gray-600 text-sm">StyleKit Claymorphism</span>
            </div>

            <div className="flex items-center gap-2">
              {palette.map((c) => (
                <div
                  key={c.hex}
                  className="w-5 h-5 rounded-full"
                  style={{
                    backgroundColor: c.hex,
                    boxShadow: "2px 2px 0px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.5)",
                  }}
                  title={c.name}
                />
              ))}
            </div>

            <p className="text-gray-400 text-xs font-medium">
              Soft. Squishy. Satisfying.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
