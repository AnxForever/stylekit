"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                        */
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
      { threshold: 0.15, ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
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
/*  CSS-only particle field                                             */
/* ------------------------------------------------------------------ */

function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (i * 37 + 13) % 100,
    y: (i * 53 + 7) % 100,
    size: (i % 3) + 1,
    opacity: 0.3 + (i % 4) * 0.15,
    delay: (i * 0.3) % 3,
    color:
      i % 4 === 0
        ? "#64c8ff"
        : i % 4 === 1
          ? "#64ffc8"
          : i % 4 === 2
            ? "#a78bfa"
            : "#e0e8ff",
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size * 2,
            height: p.size * 2,
            background: p.color,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Constellation SVG overlay for hero                                  */
/* ------------------------------------------------------------------ */

function ConstellationLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="12%"
        y1="18%"
        x2="28%"
        y2="35%"
        stroke="rgba(100,200,255,0.12)"
        strokeWidth="0.8"
        style={{ animation: "pulse 4s ease-in-out infinite" }}
      />
      <line
        x1="28%"
        y1="35%"
        x2="55%"
        y2="22%"
        stroke="rgba(100,200,255,0.08)"
        strokeWidth="0.8"
        style={{ animation: "pulse 5s ease-in-out infinite 0.5s" }}
      />
      <line
        x1="55%"
        y1="22%"
        x2="72%"
        y2="40%"
        stroke="rgba(167,139,250,0.1)"
        strokeWidth="0.8"
        style={{ animation: "pulse 6s ease-in-out infinite 1s" }}
      />
      <line
        x1="72%"
        y1="40%"
        x2="88%"
        y2="25%"
        stroke="rgba(100,255,200,0.08)"
        strokeWidth="0.8"
        style={{ animation: "pulse 4.5s ease-in-out infinite 0.3s" }}
      />
      <line
        x1="5%"
        y1="65%"
        x2="20%"
        y2="55%"
        stroke="rgba(100,200,255,0.1)"
        strokeWidth="0.8"
        style={{ animation: "pulse 5.5s ease-in-out infinite 1.2s" }}
      />
      <line
        x1="20%"
        y1="55%"
        x2="42%"
        y2="70%"
        stroke="rgba(167,139,250,0.08)"
        strokeWidth="0.8"
        style={{ animation: "pulse 4s ease-in-out infinite 0.7s" }}
      />
      <line
        x1="42%"
        y1="70%"
        x2="65%"
        y2="60%"
        stroke="rgba(100,255,200,0.1)"
        strokeWidth="0.8"
        style={{ animation: "pulse 6s ease-in-out infinite 2s" }}
      />
      <line
        x1="65%"
        y1="60%"
        x2="85%"
        y2="72%"
        stroke="rgba(100,200,255,0.08)"
        strokeWidth="0.8"
        style={{ animation: "pulse 5s ease-in-out infinite 1.5s" }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const networkNodes = [
  { id: 0, cx: 300, cy: 120, r: 10, color: "#64c8ff", label: "Core", connections: 4 },
  { id: 1, cx: 150, cy: 80,  r: 7,  color: "#a78bfa", label: "Alpha", connections: 2 },
  { id: 2, cx: 460, cy: 90,  r: 8,  color: "#64ffc8", label: "Beta",  connections: 3 },
  { id: 3, cx: 120, cy: 220, r: 6,  color: "#64c8ff", label: "Gamma", connections: 2 },
  { id: 4, cx: 480, cy: 230, r: 7,  color: "#a78bfa", label: "Delta", connections: 2 },
  { id: 5, cx: 260, cy: 270, r: 8,  color: "#64ffc8", label: "Epsilon", connections: 3 },
  { id: 6, cx: 380, cy: 250, r: 6,  color: "#64c8ff", label: "Zeta",  connections: 2 },
];

const networkEdges = [
  { x1: 300, y1: 120, x2: 150, y2: 80 },
  { x1: 300, y1: 120, x2: 460, y2: 90 },
  { x1: 300, y1: 120, x2: 260, y2: 270 },
  { x1: 300, y1: 120, x2: 380, y2: 250 },
  { x1: 150, y1: 80,  x2: 120, y2: 220 },
  { x1: 460, y1: 90,  x2: 480, y2: 230 },
  { x1: 460, y1: 90,  x2: 380, y2: 250 },
  { x1: 120, y1: 220, x2: 260, y2: 270 },
  { x1: 260, y1: 270, x2: 380, y2: 250 },
  { x1: 480, y1: 230, x2: 380, y2: 250 },
];

const colorSystem = [
  { hex: "#0a0e1a", name: "Deep Space",   role: "Primary Background",  glow: "#1a2040" },
  { hex: "#0f1419", name: "Near Black",   role: "Surface / Cards",     glow: "#1a2030" },
  { hex: "#e0e8ff", name: "Cool White",   role: "Primary Text",        glow: "#c0d0ff" },
  { hex: "#64c8ff", name: "Sky Blue",     role: "Primary Accent",      glow: "#64c8ff" },
  { hex: "#64ffc8", name: "Mint",         role: "Secondary Accent",    glow: "#64ffc8" },
  { hex: "#a78bfa", name: "Violet",       role: "Tertiary Accent",     glow: "#a78bfa" },
];

const featureCards = [
  {
    id: 0,
    title: "Floating Nodes",
    description:
      "Individual particles drift slowly in organic trajectories, creating a breathing constellation effect across deep dark backgrounds. Each node pulses with its own cadence.",
    iconPath:
      "M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm8 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm8 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
    accentColor: "#64c8ff",
  },
  {
    id: 1,
    title: "Network Connections",
    description:
      "Luminous connection lines trace relationships between nodes. Low-opacity strands that pulse gently communicate data flow and structural topology in real time.",
    iconPath:
      "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
    accentColor: "#64ffc8",
  },
  {
    id: 2,
    title: "Data Streams",
    description:
      "Animated data packets travel along connection pathways, visualizing information moving through the network. Speed and color encode packet priority and type.",
    iconPath:
      "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z",
    accentColor: "#a78bfa",
  },
  {
    id: 3,
    title: "Dynamic Topology",
    description:
      "The network graph self-organizes as nodes appear, merge, or drop out. Clusters form naturally based on connection density, revealing hidden structure in the data.",
    iconPath:
      "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
    accentColor: "#64c8ff",
  },
];

const doRules = [
  "Deep black canvas: bg-[#0a0e1a] as the base for all sections",
  "Glass cards: bg-[#0f1419]/80 backdrop-blur-xl with subtle border-white/5",
  "Glow text: text-shadow for primary headline accents (blue or mint)",
  "Particle dots: animate-pulse with boxShadow glow matching the dot color",
  "Corner node dots on interactive cards: appear on group-hover with glow",
  "Cool-toned accent triad: sky blue #64c8ff, mint #64ffc8, violet #a78bfa",
  "SVG node graphs with hover interactivity for active state glow",
  "Monospace font for all labels, hex codes, and technical copy",
];

const dontRules = [
  "Never use warm colors — no red, orange, or yellow anywhere in the system",
  "Never use high-opacity backgrounds — glass surfaces need translucency",
  "Never use solid white text at full opacity — use text-white/80 or softer",
  "Never add rounded-full to cards — keep rounded-xl for glass panels",
  "Never use canvas or requestAnimationFrame — CSS-only particle animations",
  "Never stack more than 3 accent colors in one section — maintain hierarchy",
  "Never use light mode styling — the entire system is dark-canvas only",
  "Never place particles in front of interactive content — pointer-events-none",
];

/* ------------------------------------------------------------------ */
/*  Network node graph component                                        */
/* ------------------------------------------------------------------ */

function NetworkGraph({
  activeNode,
  onNodeClick,
}: {
  activeNode: number | null;
  onNodeClick: (id: number) => void;
}) {
  return (
    <svg
      viewBox="0 0 600 340"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background grid dots */}
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 12 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 55 + 20}
            cy={row * 45 + 20}
            r="1"
            fill="rgba(255,255,255,0.04)"
          />
        )),
      )}

      {/* Edges */}
      {networkEdges.map((edge, i) => {
        const fromNode = networkNodes.find(
          (n) => n.cx === edge.x1 && n.cy === edge.y1,
        );
        const toNode = networkNodes.find(
          (n) => n.cx === edge.x2 && n.cy === edge.y2,
        );
        const isActive =
          activeNode !== null &&
          (fromNode?.id === activeNode || toNode?.id === activeNode);
        return (
          <line
            key={i}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke={isActive ? "rgba(100,200,255,0.6)" : "rgba(100,200,255,0.15)"}
            strokeWidth={isActive ? 1.5 : 0.8}
            style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
          />
        );
      })}

      {/* Nodes */}
      {networkNodes.map((node) => {
        const isActive = activeNode === node.id;
        return (
          <g
            key={node.id}
            onClick={() => onNodeClick(node.id)}
            style={{ cursor: "pointer" }}
          >
            {/* Outer ring */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r * 2.5}
              fill="none"
              stroke={node.color}
              strokeWidth="0.8"
              opacity={isActive ? 0.5 : 0.15}
              style={{ transition: "opacity 0.3s" }}
            />
            {/* Glow ring (active) */}
            {isActive && (
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 3.5}
                fill="none"
                stroke={node.color}
                strokeWidth="1"
                opacity="0.2"
              />
            )}
            {/* Node body */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={isActive ? node.r * 1.3 : node.r}
              fill={node.color}
              opacity={isActive ? 1 : 0.8}
              style={{
                transition: "r 0.3s, opacity 0.3s",
                filter: isActive
                  ? `drop-shadow(0 0 ${node.r * 3}px ${node.color})`
                  : "none",
              }}
            />
            {/* Label */}
            <text
              x={node.cx}
              y={node.cy + node.r * 3.5}
              textAnchor="middle"
              fontSize="9"
              fill={isActive ? node.color : "rgba(255,255,255,0.35)"}
              fontFamily="monospace"
              style={{ transition: "fill 0.3s" }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleNodeClick = (id: number) => {
    setActiveNode((prev) => (prev === id ? null : id));
  };

  const selectedNode = activeNode !== null ? networkNodes[activeNode] : null;

  const networkTabLabels = ["Nodes", "Edges", "Flow"];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#e0e8ff]">
      {/* ============================================================ */}
      {/* 1. Fixed Nav                                                  */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            {/* Logo with particle dots */}
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 flex items-center justify-center">
                <span
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#64c8ff] animate-pulse"
                  style={{ top: 2, left: 2, boxShadow: "0 0 6px #64c8ff" }}
                />
                <span
                  className="absolute w-1 h-1 rounded-full bg-[#64ffc8] animate-pulse"
                  style={{
                    bottom: 2,
                    right: 2,
                    boxShadow: "0 0 4px #64ffc8",
                    animationDelay: "0.8s",
                  }}
                />
                <span
                  className="absolute w-1 h-1 rounded-full bg-[#a78bfa] animate-pulse"
                  style={{
                    top: 10,
                    right: 4,
                    boxShadow: "0 0 4px #a78bfa",
                    animationDelay: "1.4s",
                  }}
                />
              </div>
              <span className="font-mono text-sm font-semibold tracking-widest text-[#e0e8ff] uppercase">
                Particle
              </span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                ["Network", "#network"],
                ["Components", "#components"],
                ["Colors", "#colors"],
                ["Docs", "#rules"],
              ].map(([item, href]) => (
                <a
                  key={item}
                  href={href}
                  className="text-sm text-white/40 hover:text-[#64c8ff] transition-colors duration-200 font-mono"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* StyleKit link */}
            <Link
              href="/styles"
              className="flex items-center gap-1.5 text-sm text-white/50 hover:text-[#64c8ff] transition-colors duration-200"
            >
              <span>StyleKit</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. Hero Section                                               */}
      {/* ============================================================ */}
      <section className="relative pt-32 md:pt-44 pb-28 overflow-hidden">
        {/* Particle field background */}
        <ParticleField />
        {/* Constellation SVG lines */}
        <ConstellationLines />

        {/* Gradient veil */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e1a]/20 to-[#0a0e1a] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          {/* Eyebrow label */}
          <div
            className="inline-flex items-center gap-2 mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#64ffc8] animate-pulse" style={{ boxShadow: "0 0 6px #64ffc8" }} />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#64ffc8]">
              粒子系统 / Particle System
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#64ffc8] animate-pulse" style={{ boxShadow: "0 0 6px #64ffc8" }} />
          </div>

          {/* Main headline */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6 font-mono"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              textShadow: "0 0 40px rgba(100,200,255,0.8), 0 0 80px rgba(100,200,255,0.3)",
              color: "#e0e8ff",
            }}
          >
            PARTICLE
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-[#64ffc8] font-mono tracking-widest mb-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            Living Network
          </p>

          {/* Description */}
          <p
            className="max-w-xl mx-auto text-white/50 text-base leading-relaxed mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            A living network of floating particles and connection lines.
            Tech-forward yet organic. Deep dark canvas, cool-toned luminous
            accents, glass-like card surfaces.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            <button
              type="button"
              className="px-7 py-3 bg-[#64c8ff]/10 border border-[#64c8ff]/30 text-[#64c8ff] rounded-xl text-sm font-mono font-medium transition-all duration-300 hover:bg-[#64c8ff]/20 hover:border-[#64c8ff]/60 hover:shadow-[0_0_24px_rgba(100,200,255,0.3)]"
            >
              Explore Network
            </button>
            <button
              type="button"
              className="px-7 py-3 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm font-mono font-medium transition-all duration-300 hover:bg-white/10 hover:text-white/80"
            >
              View Source
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Network Visualization                                      */}
      {/* ============================================================ */}
      <section id="network" className="scroll-mt-16 py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#64c8ff] block mb-3">
                Section 02
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Network{" "}
                <span style={{ textShadow: "0 0 20px rgba(100,200,255,0.5)" }} className="text-[#64c8ff]">
                  Visualization
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-white/40 text-sm leading-relaxed">
              Click any node to activate it. Edges light up to show connections.
              The active node&apos;s data appears below the graph.
            </p>
          </div>
        </RevealBlock>

        {/* Tab switcher */}
        <RevealBlock delay={0.05} className="mb-6">
          <div className="flex items-center gap-1 bg-[#0f1419]/80 backdrop-blur-xl border border-white/5 rounded-xl p-1 w-fit">
            {networkTabLabels.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2 rounded-lg text-sm font-mono font-medium transition-all duration-200 ${
                  activeTab === i
                    ? "bg-[#64c8ff]/10 text-[#64c8ff] border border-[#64c8ff]/20 shadow-[0_0_12px_rgba(100,200,255,0.1)]"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <div className="bg-[#0f1419]/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-[#64c8ff]/20 transition-all duration-300">
            {/* Graph area */}
            <div className="relative p-6 md:p-8">
              {/* Status indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#64ffc8] animate-pulse" style={{ boxShadow: "0 0 6px #64ffc8" }} />
                <span className="font-mono text-[10px] text-[#64ffc8] tracking-widest uppercase">
                  Live
                </span>
              </div>

              {/* Node count badge */}
              <div className="absolute top-4 left-4">
                <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                  {networkNodes.length} nodes / {networkEdges.length} edges
                </span>
              </div>

              <div className="mt-6">
                <NetworkGraph
                  activeNode={activeNode}
                  onNodeClick={handleNodeClick}
                />
              </div>
            </div>

            {/* Active node info panel */}
            <div className="border-t border-white/5 px-6 md:px-8 py-4">
              {selectedNode ? (
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: selectedNode.color,
                        boxShadow: `0 0 8px ${selectedNode.color}`,
                      }}
                    />
                    <span className="font-mono text-sm text-white/80">
                      Node: <span style={{ color: selectedNode.color }}>{selectedNode.label}</span>
                    </span>
                  </div>
                  <div className="font-mono text-xs text-white/40">
                    Connections:{" "}
                    <span className="text-[#64c8ff]">{selectedNode.connections}</span>
                  </div>
                  <div className="font-mono text-xs text-white/40">
                    Position:{" "}
                    <span className="text-[#64ffc8]">
                      ({selectedNode.cx}, {selectedNode.cy})
                    </span>
                  </div>
                  <div className="font-mono text-xs text-white/40">
                    Radius:{" "}
                    <span className="text-[#a78bfa]">{selectedNode.r}px</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveNode(null)}
                    className="ml-auto font-mono text-xs text-white/30 hover:text-white/60 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <p className="font-mono text-xs text-white/25 tracking-wide">
                  Click a node to inspect its properties
                </p>
              )}
            </div>
          </div>
        </RevealBlock>

        {/* Tab content description */}
        <RevealBlock delay={0.15} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: "Node View",
                desc: "Inspect individual particle nodes, their position, radius, and connection count.",
                active: activeTab === 0,
              },
              {
                label: "Edge View",
                desc: "Examine connection topology. Each edge represents a data pathway between nodes.",
                active: activeTab === 1,
              },
              {
                label: "Flow View",
                desc: "Visualize data streaming across edges in real time. Packet color encodes priority.",
                active: activeTab === 2,
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`bg-[#0f1419]/60 border rounded-xl p-4 transition-all duration-300 ${
                  item.active
                    ? "border-[#64c8ff]/20 shadow-[0_0_20px_rgba(100,200,255,0.05)]"
                    : "border-white/5"
                }`}
              >
                <p
                  className={`font-mono text-xs font-medium mb-1.5 ${
                    item.active ? "text-[#64c8ff]" : "text-white/40"
                  }`}
                >
                  {item.label}
                </p>
                <p className="text-xs text-white/30 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 4. Component Showcase                                         */}
      {/* ============================================================ */}
      <section id="components" className="scroll-mt-16 py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#a78bfa] block mb-3">
            Section 03
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Component{" "}
            <span style={{ textShadow: "0 0 20px rgba(167,139,250,0.5)" }} className="text-[#a78bfa]">
              Showcase
            </span>
          </h2>
          <p className="text-white/40 text-sm max-w-md leading-relaxed">
            All components share the particle design language. Glass surfaces,
            blue glow accents, and corner node dots that activate on hover.
          </p>
        </RevealBlock>

        <div className="space-y-6">
          {/* Buttons */}
          <RevealBlock>
            <div className="bg-[#0f1419]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-all duration-300">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-white/30 mb-6">
                Buttons
              </p>
              <div className="flex flex-wrap gap-4">
                {/* Primary glow */}
                <button
                  type="button"
                  className="px-6 py-2.5 bg-[#64c8ff]/10 border border-[#64c8ff]/40 text-[#64c8ff] rounded-xl text-sm font-mono font-medium transition-all duration-300 hover:bg-[#64c8ff]/20 hover:border-[#64c8ff]/70 hover:shadow-[0_0_20px_rgba(100,200,255,0.4)]"
                >
                  Primary Glow
                </button>
                {/* Secondary glass */}
                <button
                  type="button"
                  className="px-6 py-2.5 bg-white/5 border border-white/10 text-white/70 rounded-xl text-sm font-mono font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white/90"
                >
                  Secondary Glass
                </button>
                {/* Ghost */}
                <button
                  type="button"
                  className="px-6 py-2.5 text-white/40 rounded-xl text-sm font-mono font-medium transition-all duration-300 hover:text-[#64c8ff] hover:bg-[#64c8ff]/5"
                >
                  Ghost
                </button>
                {/* Mint accent */}
                <button
                  type="button"
                  className="px-6 py-2.5 bg-[#64ffc8]/10 border border-[#64ffc8]/30 text-[#64ffc8] rounded-xl text-sm font-mono font-medium transition-all duration-300 hover:bg-[#64ffc8]/20 hover:shadow-[0_0_20px_rgba(100,255,200,0.3)]"
                >
                  Mint Accent
                </button>
                {/* Violet */}
                <button
                  type="button"
                  className="px-6 py-2.5 bg-[#a78bfa]/10 border border-[#a78bfa]/30 text-[#a78bfa] rounded-xl text-sm font-mono font-medium transition-all duration-300 hover:bg-[#a78bfa]/20 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)]"
                >
                  Violet
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* Input */}
          <RevealBlock delay={0.05}>
            <div className="bg-[#0f1419]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-all duration-300">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-white/30 mb-6">
                Inputs
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-white/40 mb-2 tracking-wide">
                    Node Identifier
                  </label>
                  <input
                    type="text"
                    placeholder="particle-node-001"
                    onFocus={() => setFocusedInput(true)}
                    onBlur={() => setFocusedInput(false)}
                    className="w-full px-4 py-3 bg-[#0a0e1a] border border-white/10 rounded-xl text-[#e0e8ff] placeholder:text-white/20 text-sm font-mono focus:outline-none focus:border-[#64c8ff]/50 transition-all duration-300"
                    style={
                      focusedInput
                        ? { boxShadow: "0 0 0 1px rgba(100,200,255,0.2), 0 0 16px rgba(100,200,255,0.1)" }
                        : {}
                    }
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-white/40 mb-2 tracking-wide">
                    Connection Radius
                  </label>
                  <input
                    type="text"
                    placeholder="150px"
                    className="w-full px-4 py-3 bg-[#0a0e1a] border border-white/10 rounded-xl text-[#e0e8ff] placeholder:text-white/20 text-sm font-mono focus:outline-none focus:border-[#64c8ff]/50 focus:shadow-[0_0_0_1px_rgba(100,200,255,0.2),_0_0_16px_rgba(100,200,255,0.1)] transition-all duration-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-mono text-xs text-white/40 mb-2 tracking-wide">
                    Particle Description
                  </label>
                  <textarea
                    placeholder="Describe the particle behavior..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#0a0e1a] border border-white/10 rounded-xl text-[#e0e8ff] placeholder:text-white/20 text-sm font-mono focus:outline-none focus:border-[#64c8ff]/50 focus:shadow-[0_0_0_1px_rgba(100,200,255,0.2),_0_0_16px_rgba(100,200,255,0.1)] transition-all duration-300 resize-none"
                  />
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Card with corner nodes */}
          <RevealBlock delay={0.1}>
            <div className="bg-[#0f1419]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-all duration-300">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-white/30 mb-6">
                Glass Card with Corner Nodes
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Total Nodes", value: "2,048", accent: "#64c8ff" },
                  { label: "Active Links", value: "8,192", accent: "#64ffc8" },
                  { label: "Clusters", value: "17", accent: "#a78bfa" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group relative bg-[#0a0e1a]/60 border border-white/5 rounded-xl p-5 hover:border-white/15 transition-all duration-300"
                  >
                    {/* Corner node dots */}
                    <span
                      className="absolute top-2 left-2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        background: item.accent,
                        boxShadow: `0 0 10px ${item.accent}`,
                      }}
                    />
                    <span
                      className="absolute top-2 right-2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        background: item.accent,
                        boxShadow: `0 0 10px ${item.accent}`,
                        transitionDelay: "0.05s",
                      }}
                    />
                    <span
                      className="absolute bottom-2 left-2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        background: item.accent,
                        boxShadow: `0 0 10px ${item.accent}`,
                        transitionDelay: "0.1s",
                      }}
                    />
                    <span
                      className="absolute bottom-2 right-2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        background: item.accent,
                        boxShadow: `0 0 10px ${item.accent}`,
                        transitionDelay: "0.15s",
                      }}
                    />

                    <p className="font-mono text-xs text-white/35 mb-2">{item.label}</p>
                    <p
                      className="text-2xl font-bold font-mono transition-all duration-300"
                      style={{ color: item.accent }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Color System                                               */}
      {/* ============================================================ */}
      <section id="colors" className="scroll-mt-16 py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#64ffc8] block mb-3">
            Section 04
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Color{" "}
            <span style={{ textShadow: "0 0 20px rgba(100,255,200,0.5)" }} className="text-[#64ffc8]">
              System
            </span>
          </h2>
          <p className="text-white/40 text-sm max-w-md leading-relaxed">
            A six-token dark palette built for deep space. Each color has a
            semantic role in the particle system hierarchy.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colorSystem.map((color, i) => (
            <RevealBlock key={color.hex} delay={i * 0.06}>
              <div className="group relative bg-[#0f1419]/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 cursor-pointer">
                {/* Swatch */}
                <div
                  className="h-24 w-full relative transition-all duration-300"
                  style={{
                    background: color.hex,
                    boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.05)`,
                  }}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${color.glow}40 0%, transparent 70%)`,
                    }}
                  />
                  {/* Hex label on swatch */}
                  <div className="absolute bottom-2 left-2">
                    <span className="font-mono text-[9px] text-white/40 group-hover:text-white/70 transition-colors duration-300">
                      {color.hex}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="font-mono text-xs font-semibold text-[#e0e8ff] mb-0.5">
                    {color.name}
                  </p>
                  <p className="font-mono text-[10px] text-white/30 leading-tight">
                    {color.role}
                  </p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Color usage tokens */}
        <RevealBlock delay={0.3} className="mt-8">
          <div className="bg-[#0f1419]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-white/30 mb-5">
              Usage Tokens
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { token: "bg-[#0a0e1a]", desc: "Page-level background" },
                { token: "bg-[#0f1419]/80", desc: "Glass card surfaces" },
                { token: "text-[#e0e8ff]", desc: "Primary body text" },
                { token: "text-[#64c8ff]", desc: "Sky blue accent / links" },
                { token: "text-[#64ffc8]", desc: "Mint accent / success states" },
                { token: "text-[#a78bfa]", desc: "Violet accent / tertiary" },
              ].map((item) => (
                <div
                  key={item.token}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <code className="font-mono text-xs text-[#64c8ff] bg-[#64c8ff]/5 px-2 py-0.5 rounded">
                    {item.token}
                  </code>
                  <span className="text-xs text-white/35">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 6. Feature Cards                                              */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#64c8ff] block mb-3">
            Section 05
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Feature{" "}
            <span style={{ textShadow: "0 0 20px rgba(100,200,255,0.5)" }} className="text-[#64c8ff]">
              Cards
            </span>
          </h2>
          <p className="text-white/40 text-sm max-w-md leading-relaxed">
            Hover each card to activate the corner node dots. Each card
            demonstrates a core capability of the particle system.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featureCards.map((card, i) => (
            <RevealBlock key={card.id} delay={i * 0.07}>
              <div
                className="group relative bg-[#0f1419]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-7 transition-all duration-300 hover:border-white/10 cursor-pointer"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={
                  hoveredCard === card.id
                    ? { boxShadow: `0 0 40px rgba(59,130,246,0.08)` }
                    : {}
                }
              >
                {/* Corner node dots */}
                <span
                  className="absolute top-3 left-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: card.accentColor, boxShadow: `0 0 10px ${card.accentColor}` }}
                />
                <span
                  className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: card.accentColor,
                    boxShadow: `0 0 10px ${card.accentColor}`,
                    transitionDelay: "0.04s",
                  }}
                />
                <span
                  className="absolute bottom-3 left-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: card.accentColor,
                    boxShadow: `0 0 10px ${card.accentColor}`,
                    transitionDelay: "0.08s",
                  }}
                />
                <span
                  className="absolute bottom-3 right-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: card.accentColor,
                    boxShadow: `0 0 10px ${card.accentColor}`,
                    transitionDelay: "0.12s",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                  style={{
                    background: `${card.accentColor}12`,
                    border: `1px solid ${card.accentColor}25`,
                    boxShadow:
                      hoveredCard === card.id
                        ? `0 0 16px ${card.accentColor}30`
                        : "none",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill={card.accentColor}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={card.iconPath} />
                  </svg>
                </div>

                {/* Content */}
                <h3
                  className="text-base font-semibold mb-3 transition-all duration-300"
                  style={{ color: hoveredCard === card.id ? card.accentColor : "#e0e8ff" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {card.description}
                </p>

                {/* Number badge */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
                    Feature {String(card.id + 1).padStart(2, "0")}
                  </span>
                  <svg
                    className="w-4 h-4 transition-all duration-300"
                    style={{
                      color:
                        hoveredCard === card.id ? card.accentColor : "rgba(255,255,255,0.2)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. Do / Don't Rules                                          */}
      {/* ============================================================ */}
      <section id="rules" className="scroll-mt-16 py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/30 block mb-3">
            Section 06
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Design Rules
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do */}
          <RevealBlock>
            <div className="bg-[#0f1419]/80 backdrop-blur-xl border border-[#64ffc8]/15 rounded-2xl p-6 md:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-6 h-6 rounded-full bg-[#64ffc8]/10 flex items-center justify-center"
                  style={{ border: "1px solid rgba(100,255,200,0.3)" }}
                >
                  <svg
                    className="w-3.5 h-3.5 text-[#64ffc8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-base text-[#64ffc8]">Do</h3>
              </div>
              <ul className="space-y-3">
                {doRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span
                      className="mt-1 w-1 h-1 rounded-full shrink-0"
                      style={{ background: "#64ffc8", boxShadow: "0 0 4px #64ffc8" }}
                    />
                    <span className="text-white/55 leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* Don't */}
          <RevealBlock delay={0.1}>
            <div className="bg-[#0f1419]/80 backdrop-blur-xl border border-[#64c8ff]/10 rounded-2xl p-6 md:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <svg
                    className="w-3.5 h-3.5 text-white/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-base text-white/60">
                  Don&apos;t
                </h3>
              </div>
              <ul className="space-y-3">
                {dontRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 text-white/20 shrink-0 font-mono text-xs">
                      &mdash;
                    </span>
                    <span className="text-white/40 leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. Stats / Data Metrics                                       */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#a78bfa] block mb-3">
            Section 07
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            System{" "}
            <span style={{ textShadow: "0 0 20px rgba(167,139,250,0.5)" }} className="text-[#a78bfa]">
              Metrics
            </span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "2,048", label: "Max Nodes", accent: "#64c8ff" },
            { value: "8,192", label: "Max Edges", accent: "#64ffc8" },
            { value: "60fps", label: "Target Rate", accent: "#a78bfa" },
            { value: "< 2ms", label: "Frame Budget", accent: "#64c8ff" },
            { value: "CSS", label: "Animation Engine", accent: "#64ffc8" },
            { value: "0", label: "JS Animations", accent: "#a78bfa" },
            { value: "30+", label: "Particle Count", accent: "#64c8ff" },
            { value: "Dark", label: "Theme Support", accent: "#64ffc8" },
          ].map((stat, i) => (
            <RevealBlock key={i} delay={i * 0.04}>
              <div className="group relative bg-[#0f1419]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-5 text-center hover:border-white/10 transition-all duration-300">
                {/* Corner dots */}
                <span
                  className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: stat.accent, boxShadow: `0 0 6px ${stat.accent}` }}
                />
                <span
                  className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: stat.accent,
                    boxShadow: `0 0 6px ${stat.accent}`,
                    transitionDelay: "0.06s",
                  }}
                />

                <div
                  className="text-2xl md:text-3xl font-bold font-mono mb-1.5 transition-all duration-300"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. Footer                                                     */}
      {/* ============================================================ */}
      <footer className="border-t border-white/5 bg-[#0a0e1a] relative overflow-hidden">
        {/* Subtle particle field in footer */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${(i * 41 + 5) % 100}%`,
                top: `${(i * 29 + 10) % 100}%`,
                width: 2,
                height: 2,
                background:
                  i % 3 === 0 ? "#64c8ff" : i % 3 === 1 ? "#64ffc8" : "#a78bfa",
                opacity: 0.4,
                animationDelay: `${(i * 0.4) % 3}s`,
                boxShadow: `0 0 4px ${i % 3 === 0 ? "#64c8ff" : i % 3 === 1 ? "#64ffc8" : "#a78bfa"}`,
              }}
            />
          ))}
        </div>

        {/* Constellation footer lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="5%"
            y1="20%"
            x2="25%"
            y2="60%"
            stroke="rgba(100,200,255,0.08)"
            strokeWidth="0.6"
          />
          <line
            x1="25%"
            y1="60%"
            x2="50%"
            y2="35%"
            stroke="rgba(100,200,255,0.06)"
            strokeWidth="0.6"
          />
          <line
            x1="75%"
            y1="25%"
            x2="90%"
            y2="70%"
            stroke="rgba(167,139,250,0.07)"
            strokeWidth="0.6"
          />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {/* Particle logo dots */}
                <div className="relative w-6 h-6">
                  <span
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#64c8ff] animate-pulse"
                    style={{ top: 0, left: 0, boxShadow: "0 0 5px #64c8ff" }}
                  />
                  <span
                    className="absolute w-1 h-1 rounded-full bg-[#64ffc8] animate-pulse"
                    style={{
                      bottom: 0,
                      right: 0,
                      boxShadow: "0 0 4px #64ffc8",
                      animationDelay: "0.7s",
                    }}
                  />
                  <span
                    className="absolute w-1 h-1 rounded-full bg-[#a78bfa] animate-pulse"
                    style={{
                      top: 8,
                      right: 2,
                      boxShadow: "0 0 4px #a78bfa",
                      animationDelay: "1.3s",
                    }}
                  />
                </div>
                <span className="font-mono text-sm font-semibold tracking-widest text-[#e0e8ff] uppercase">
                  Particle System
                </span>
              </div>
              <p className="font-mono text-xs text-white/25 leading-relaxed max-w-xs">
                StyleKit &middot; 粒子系统 &middot; Living Network design language
                for deep-space interfaces
              </p>
            </div>

            {/* Status + links */}
            <div className="flex flex-col items-start md:items-end gap-4">
              {/* System online indicator */}
              <div className="flex items-center gap-2 bg-[#64ffc8]/5 border border-[#64ffc8]/15 rounded-full px-4 py-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#64ffc8] animate-pulse"
                  style={{ boxShadow: "0 0 6px #64ffc8" }}
                />
                <span className="font-mono text-[10px] text-[#64ffc8] tracking-widest uppercase">
                  System Online
                </span>
              </div>

              <div className="flex items-center gap-5">
                <Link
                  href="/styles/particle"
                  className="font-mono text-xs text-[#64c8ff] hover:text-[#64c8ff]/80 transition-colors duration-200"
                >
                  Documentation
                </Link>
                <Link
                  href="/styles"
                  className="font-mono text-xs text-white/30 hover:text-white/55 transition-colors duration-200"
                >
                  All Styles
                </Link>
              </div>

              <p className="font-mono text-[10px] text-white/20">
                &copy; 2026 StyleKit &mdash; Particle System
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
