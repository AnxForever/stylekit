"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Stage constants                                                    */
/* ------------------------------------------------------------------ */

const BASE = "#08090D";
const SURFACE = "#12131A";
const PAPER = "#EDEEF2";
const VIOLET = "#7C5CFF";
const CYAN = "#22D3EE";
const MAGENTA = "#F472B6";

const REDUCED_T = 6.0;

/* ------------------------------------------------------------------ */
/*  Shaders                                                            */
/* ------------------------------------------------------------------ */

const VERT = `attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_speed;
uniform float u_blend;
uniform float u_grain;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 q = uv;
  q.x *= u_res.x / u_res.y;
  float t = u_time * 0.05 * u_speed;

  float f1 = fbm(q * 1.5 + vec2(t, -t * 0.5));
  float f2 = fbm(q * 2.0 + vec2(f1 * u_blend - t * 0.3, f1 + t * 0.2));
  float f = fbm(q * 1.2 + f2 * (0.6 + u_blend));

  vec3 base = vec3(0.031, 0.035, 0.051);
  vec3 violet = vec3(0.486, 0.361, 1.0);
  vec3 cyan = vec3(0.133, 0.827, 0.933);
  vec3 magenta = vec3(0.956, 0.447, 0.714);

  vec3 col = base;
  col = mix(col, violet, smoothstep(0.15, 0.75, f + 0.35));
  col = mix(col, cyan, smoothstep(0.30, 0.90, f2 * 0.5 + 0.5) * 0.6);
  col = mix(col, magenta, smoothstep(0.40, 1.0, f1 * 0.5 + 0.5) * 0.45);

  float vig = smoothstep(1.2, 0.2, length(uv - 0.5));
  col *= 0.55 + 0.6 * vig;

  col += (fract(sin(dot(uv + t, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * u_grain * 0.12;

  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/* ------------------------------------------------------------------ */
/*  ShaderCanvas — real WebGL fbm gradient field.                      */
/*  dpr capped at 2; resize handled; rAF paused offscreen via          */
/*  IntersectionObserver; prefers-reduced-motion renders one frame;    */
/*  no-WebGL leaves the CSS .sg-fallback gradient visible underneath.  */
/* ------------------------------------------------------------------ */

type UniformRefs = {
  speed: React.MutableRefObject<number>;
  blend: React.MutableRefObject<number>;
  grain: React.MutableRefObject<number>;
};

function ShaderCanvas({
  refs,
  drawStaticRef,
  className = "",
}: {
  refs: UniformRefs;
  drawStaticRef?: React.MutableRefObject<(() => void) | null>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return; // CSS fallback under the canvas stays visible

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uSpeed = gl.getUniformLocation(prog, "u_speed");
    const uBlend = gl.getUniformLocation(prog, "u_blend");
    const uGrain = gl.getUniformLocation(prog, "u_grain");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (t: number) => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uSpeed, refs.speed.current);
      gl.uniform1f(uBlend, refs.blend.current);
      gl.uniform1f(uGrain, refs.grain.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = false;
    const loop = (now: number) => {
      render(now / 1000);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduce) {
      // exactly one static frame; slider changes re-draw the same fixed frame
      render(REDUCED_T);
      if (drawStaticRef) drawStaticRef.current = () => render(REDUCED_T);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (reduce) return;
        if (e.isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const onResize = () => {
      if (reduce) render(REDUCED_T);
    };
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("resize", onResize);
      if (drawStaticRef) drawStaticRef.current = null;
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [refs, drawStaticRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`sg-canvas ${className}`} />;
}

/* ------------------------------------------------------------------ */
/*  Reveal — opacity/transform only                                    */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.15) {
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionHead({ no, kicker, title, sub }: { no: string; kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-sm text-[#7C5CFF] tabular-nums">{no}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">{kicker}</span>
      </div>
      <div className="md:flex md:items-end md:justify-between md:gap-12">
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-[1.05] max-w-2xl">{title}</h2>
        {sub && <p className="mt-4 md:mt-0 text-white/55 text-base leading-relaxed max-w-sm md:text-right">{sub}</p>}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Base", value: BASE, label: "The canvas", text: PAPER },
  { name: "Surface", value: SURFACE, label: "Solid sections", text: PAPER },
  { name: "Paper", value: PAPER, label: "Section text", text: BASE },
  { name: "Violet", value: VIOLET, label: "The one accent", text: "#FFFFFF" },
  { name: "Cyan", value: CYAN, label: "Field only", text: BASE },
  { name: "Magenta", value: MAGENTA, label: "Field only", text: BASE },
];

const features = [
  { title: "Realtime by default", body: "Every frame is computed on the GPU with an fbm domain-warp field. Nothing is a baked PNG." },
  { title: "Frosted glass", body: "Content floats on backdrop-blur panels with a 1px white/10 border and a dark scrim for legibility." },
  { title: "One accent", body: "Violet carries every action and focus ring. The gradient supplies all the color it needs." },
  { title: "Kind to the machine", body: "devicePixelRatio capped at 2, the loop pauses offscreen, and a single frame renders under reduced motion." },
];

const plans = [
  { name: "Hobby", price: "$0", note: "Local renders", cta: "Start free", featured: false },
  { name: "Pro", price: "$29", note: "Per seat / month", cta: "Start building", featured: true },
  { name: "Scale", price: "Custom", note: "Volume + SSO", cta: "Talk to us", featured: false },
];

const tableRows = [
  { frame: "0001", uniform: "u_time", value: "0.00", state: "static" },
  { frame: "0420", uniform: "u_speed", value: "0.85", state: "flowing" },
  { frame: "0918", uniform: "u_blend", value: "1.40", state: "warping" },
  { frame: "1337", uniform: "u_grain", value: "0.30", state: "textured" },
];

type Tab = "buttons" | "cards" | "inputs";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [tab, setTab] = useState<Tab>("buttons");
  const [speed, setSpeed] = useState(0.85);
  const [blend, setBlend] = useState(1.4);
  const [grain, setGrain] = useState(0.3);
  const [progress, setProgress] = useState(72);

  const speedRef = useRef(0.85);
  const blendRef = useRef(1.4);
  const grainRef = useRef(0.3);
  const drawStaticRef = useRef<(() => void) | null>(null);

  const refs: UniformRefs = { speed: speedRef, blend: blendRef, grain: grainRef };

  const onSpeed = useCallback((v: number) => {
    speedRef.current = v;
    setSpeed(v);
    drawStaticRef.current?.();
  }, []);
  const onBlend = useCallback((v: number) => {
    blendRef.current = v;
    setBlend(v);
    drawStaticRef.current?.();
  }, []);
  const onGrain = useCallback((v: number) => {
    grainRef.current = v;
    setGrain(v);
    drawStaticRef.current?.();
  }, []);

  return (
    <div id="top" className="relative min-h-screen font-sans" style={{ backgroundColor: BASE, color: PAPER }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .sg-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        .sg-fallback {
          position: absolute; inset: 0;
          background:
            radial-gradient(60% 60% at 28% 32%, rgba(124,92,255,0.35), transparent 70%),
            radial-gradient(55% 55% at 74% 58%, rgba(34,211,238,0.22), transparent 70%),
            radial-gradient(50% 60% at 55% 85%, rgba(244,114,182,0.20), transparent 70%),
            ${BASE};
        }
        input[type="range"].sg-range { -webkit-appearance: none; appearance: none; height: 4px; border-radius: 9999px; background: rgba(255,255,255,0.14); outline: none; }
        input[type="range"].sg-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; border-radius: 9999px; background: ${VIOLET}; border: 2px solid #fff; cursor: pointer; }
        input[type="range"].sg-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 9999px; background: ${VIOLET}; border: 2px solid #fff; cursor: pointer; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      {/* ============================================================ */}
      {/* NAV                                                          */}
      {/* ============================================================ */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="max-w-6xl mx-auto mt-4 px-5 md:px-6">
          <div className="h-14 px-4 md:px-5 flex items-center justify-between rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/10">
            <div className="flex items-center gap-4">
              <Link href="/styles/shader-gradient" className="text-white/70 hover:text-white text-sm transition-colors duration-300">
                Back to Docs
              </Link>
              <span className="hidden sm:block text-white/25">/</span>
              <span className="hidden sm:block text-white font-semibold tracking-tight">Prism</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
              {[
                { label: "Field", href: "#field" },
                { label: "Palette", href: "#palette" },
                { label: "Components", href: "#components" },
                { label: "Lab", href: "#lab" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="hover:text-white transition-colors duration-300">
                  {item.label}
                </a>
              ))}
            </nav>
            <Link href="/styles" className="text-sm text-white/80 hover:text-[#7C5CFF] font-semibold transition-colors duration-300">
              StyleKit
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO — shader field behind glass                             */}
      {/* ============================================================ */}
      <section className="relative h-screen overflow-hidden">
        <div className="sg-fallback" aria-hidden="true" />
        <ShaderCanvas refs={refs} drawStaticRef={drawStaticRef} />
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(8,9,13,0.7), rgba(8,9,13,0.1) 55%, rgba(8,9,13,0.35))" }} />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-5 md:px-8 flex items-center">
          <Reveal>
            <div className="max-w-2xl rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 p-8 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
              <p className="font-mono text-[#a99bff] uppercase tracking-[0.3em] text-xs mb-5">Realtime WebGL</p>
              <h1 className="text-white text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02]">
                The living<br />gradient
              </h1>
              <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-lg">
                A fragment shader flows across the canvas - no two frames alike. Glass holds the words, violet carries the action, and only the pixels move.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#lab" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7C5CFF] text-white font-medium shadow-[0_8px_30px_rgba(124,92,255,0.35)] hover:bg-[#8f72ff] active:scale-[0.98] transition-all duration-300">
                  Start building
                </a>
                <a href="#field" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/8 backdrop-blur-xl border border-white/12 text-white hover:bg-white/12 transition-all duration-300">
                  View docs
                </a>
              </div>
            </div>
          </Reveal>
        </div>
        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 animate-bounce">Scroll</span>
      </section>

      {/* ============================================================ */}
      {/* QUIET BAND                                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: BASE }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-2xl md:text-3xl leading-relaxed text-white/85 font-light">
              A living background is a premium signal. It says <span className="text-[#7C5CFF]">we wrote a shader even for the backdrop</span> - not that we pasted an exported gradient.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FIELD — how it's wired                                       */}
      {/* ============================================================ */}
      <section id="field" className="scroll-mt-20 py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: "#0A0B11" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="01"
            kicker="The field"
            title="One quad, one shader, forever new"
            sub="A full-screen quad runs an fbm domain-warp field. The shader is compiled once; each frame only advances uniforms."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {features.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="border-t border-white/12 pt-5">
                  <div className="w-9 h-9 rounded-lg bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-12">
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-6 overflow-x-auto">
              <pre className="font-mono text-[12px] leading-relaxed text-white/80"><code>{`const gl = canvas.getContext("webgl");
if (!gl) return;                 `}<span style={{ color: "#6b7684" }}>{`// CSS gradient fallback stays`}</span>{`
const dpr = Math.min(devicePixelRatio, 2);
`}<span style={{ color: "#6b7684" }}>{`// per frame: only advance uniforms`}</span>{`
gl.uniform1f(uTime, performance.now() / 1000);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);`}</code></pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PALETTE                                                      */}
      {/* ============================================================ */}
      <section id="palette" className="scroll-mt-20 py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: BASE }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="02"
            kicker="Palette"
            title="Near-black, then iridescence"
            sub="A deep base and a raised surface for solid sections; violet is the single UI accent, cyan and magenta live only in the field."
          />
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {paletteSwatches.map((s) => (
                <div key={s.name} className="group">
                  <div className="h-28 rounded-xl border border-white/10 flex items-end p-3 transition-transform duration-500 group-hover:-translate-y-1" style={{ backgroundColor: s.value }}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: s.text, opacity: 0.8 }}>{s.value}</span>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-white">{s.name}</div>
                  <div className="text-xs text-white/55">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TYPOGRAPHY                                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: "#0A0B11" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="03" kicker="Typography" title="Crisp sans, monospace signals" sub="A clean grotesque for content; monospace for kickers and telemetry so the interface reads engineered." />
          <Reveal>
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-8 md:p-12 space-y-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#7C5CFF]">Display / Semibold</p>
              <p className="text-white text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02]">Ship the living web</p>
              <p className="text-white/80 text-xl leading-relaxed max-w-2xl">A gradient that breathes, panels that stay legible, and one accent to carry every action a visitor can take.</p>
              <p className="text-white/55 text-base leading-relaxed max-w-2xl">Body copy holds at a comfortable measure over the near-black base. Because the field is decorative, text never competes with it for attention.</p>
              <p className="font-mono text-sm text-white/45">u_speed 0.85 &middot; u_blend 1.40 &middot; u_grain 0.30</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPONENTS — over the shader                                 */}
      {/* ============================================================ */}
      <section id="components" className="scroll-mt-0 relative min-h-screen overflow-hidden flex items-center py-24">
        <div className="sg-fallback" aria-hidden="true" />
        <ShaderCanvas refs={refs} drawStaticRef={drawStaticRef} />
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(8,9,13,0.85), rgba(8,9,13,0.5) 50%, rgba(8,9,13,0.6))" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 w-full">
          <SectionHead
            no="04"
            kicker="Components"
            title="Legible over any frame"
            sub="Violet for the one action, frosted translucency for everything else, so controls never hide the field."
          />

          {/* tabs */}
          <Reveal className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                    tab === t ? "bg-white/20 backdrop-blur-md border border-white/40 text-white" : "bg-white/8 backdrop-blur-md border border-white/15 text-white/65 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-white/15 bg-black/30 backdrop-blur-2xl p-8 md:p-12 min-h-[240px]">
              {tab === "buttons" && (
                <div className="flex flex-wrap items-center gap-5">
                  <button className="px-6 py-3 rounded-xl bg-[#7C5CFF] text-white font-medium shadow-[0_8px_30px_rgba(124,92,255,0.35)] hover:bg-[#8f72ff] active:scale-[0.98] transition-all duration-300">Start building</button>
                  <button className="px-6 py-3 rounded-xl bg-white/8 backdrop-blur-xl border border-white/12 text-white hover:bg-white/12 transition-all duration-300">View docs</button>
                  <button className="px-6 py-3 rounded-xl bg-transparent text-white/70 hover:text-white transition-colors duration-300">Learn more</button>
                  <button className="px-6 py-3 rounded-xl bg-white/8 backdrop-blur-xl border border-white/12 text-white/40 cursor-not-allowed" disabled>Disabled</button>
                </div>
              )}
              {tab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {features.slice(0, 3).map((f) => (
                    <div key={f.title} className="rounded-2xl bg-white/[0.06] backdrop-blur-2xl border border-white/10 p-5">
                      <div className="w-9 h-9 rounded-lg bg-[#7C5CFF]/20 border border-[#7C5CFF]/30 mb-3" />
                      <h4 className="text-white text-base font-semibold mb-1">{f.title}</h4>
                      <p className="text-white/55 text-sm leading-relaxed">{f.body}</p>
                    </div>
                  ))}
                </div>
              )}
              {tab === "inputs" && (
                <div className="max-w-sm space-y-5">
                  <input type="email" placeholder="you@company.com" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/12 text-white placeholder-white/40 focus:outline-none focus:border-[#7C5CFF]/70 focus:bg-white/[0.09] focus:ring-2 focus:ring-[#7C5CFF]/25 transition-all duration-300" />
                  <textarea rows={3} placeholder="Tell us what you're shipping" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/12 text-white placeholder-white/40 focus:outline-none focus:border-[#7C5CFF]/70 focus:bg-white/[0.09] focus:ring-2 focus:ring-[#7C5CFF]/25 transition-all duration-300 resize-none" />
                  <button className="w-full px-6 py-3 rounded-xl bg-[#7C5CFF] text-white font-medium hover:bg-[#8f72ff] active:scale-[0.98] transition-all duration-300">Request access</button>
                </div>
              )}
            </div>
          </Reveal>

          {/* badges + progress + alerts over glass */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
            <Reveal delay={0.05}>
              <div className="rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 p-6 h-full">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-4">Badges</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#7C5CFF]/20 border border-[#7C5CFF]/35 text-[#c7bcff] text-xs font-medium">Realtime</span>
                  <span className="px-3 py-1 rounded-lg bg-white/8 border border-white/15 text-white/75 text-xs">WebGL</span>
                  <span className="px-3 py-1 rounded-lg bg-[#22D3EE]/15 border border-[#22D3EE]/30 text-[#9fe9f4] text-xs">GPU</span>
                  <span className="px-3 py-1 rounded-lg bg-[#F472B6]/15 border border-[#F472B6]/30 text-[#f9b8d6] text-xs">fbm</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 p-6 h-full">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">Compile</p>
                  <span className="font-mono text-xs text-[#7C5CFF] tabular-nums">{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-[#7C5CFF] transition-[width] duration-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setProgress((p) => Math.max(0, p - 12))} className="px-3 py-1.5 rounded-lg bg-white/8 border border-white/15 text-white/75 text-xs hover:bg-white/12 transition-all">Slower</button>
                  <button onClick={() => setProgress((p) => Math.min(100, p + 12))} className="px-3 py-1.5 rounded-lg bg-[#7C5CFF] text-white text-xs hover:bg-[#8f72ff] transition-all">Faster</button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 p-6 h-full space-y-2.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-1">Alerts</p>
                {[
                  { c: "#7C5CFF", t: "Shader linked in 4ms" },
                  { c: "#22D3EE", t: "Context restored" },
                  { c: "#F59E0B", t: "Reduced motion active" },
                  { c: "#F87171", t: "WebGL unavailable - CSS fallback" },
                ].map((a) => (
                  <div key={a.t} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: a.c }} />
                    {a.t}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SHADER LAB — sliders wired to uniforms                       */}
      {/* ============================================================ */}
      <section id="lab" className="scroll-mt-20 py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: BASE }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="05" kicker="Shader lab" title="Drive the uniforms live" sub="Each slider writes straight into the fragment shader. Scroll up to the hero or components to watch the same field respond." />
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* live preview panel */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 min-h-[280px]">
                <div className="sg-fallback" aria-hidden="true" />
                <ShaderCanvas refs={refs} drawStaticRef={drawStaticRef} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,9,13,0.6), transparent 55%)" }} />
                <div className="absolute bottom-0 inset-x-0 p-5 font-mono text-[11px] text-white/70 tabular-nums">
                  u_speed {speed.toFixed(2)} &middot; u_blend {blend.toFixed(2)} &middot; u_grain {grain.toFixed(2)}
                </div>
              </div>

              {/* controls */}
              <div className="rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 p-8 flex flex-col justify-center gap-8">
                {[
                  { key: "speed", label: "Speed", value: speed, min: 0, max: 3, step: 0.01, on: onSpeed },
                  { key: "blend", label: "Color blend", value: blend, min: 0, max: 3, step: 0.01, on: onBlend },
                  { key: "grain", label: "Grain", value: grain, min: 0, max: 1, step: 0.01, on: onGrain },
                ].map((s) => (
                  <div key={s.key}>
                    <div className="flex items-center justify-between mb-3">
                      <label htmlFor={`lab-${s.key}`} className="text-sm font-medium text-white">{s.label}</label>
                      <span className="font-mono text-xs text-[#7C5CFF] tabular-nums">{s.value.toFixed(2)}</span>
                    </div>
                    <input
                      id={`lab-${s.key}`}
                      type="range"
                      className="sg-range w-full"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={s.value}
                      onChange={(e) => s.on(parseFloat(e.target.value))}
                    />
                  </div>
                ))}
                <p className="text-white/45 text-xs leading-relaxed">Under prefers-reduced-motion the field renders a single static frame; the sliders re-draw that frame instead of animating.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PRICING — glass cards                                        */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: "#0A0B11" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="06" kicker="Pricing" title="Glass all the way down" sub="Cards float on the near-black base; only the featured plan borrows the accent." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className={`rounded-2xl p-7 h-full flex flex-col border backdrop-blur-2xl ${p.featured ? "bg-[#7C5CFF]/[0.12] border-[#7C5CFF]/40 shadow-[0_20px_60px_rgba(124,92,255,0.2)]" : "bg-white/[0.05] border-white/10"}`}>
                  <p className="text-white/60 text-sm mb-2">{p.name}</p>
                  <p className="text-white text-4xl font-semibold tracking-tight mb-1">{p.price}</p>
                  <p className="text-white/45 text-xs mb-6">{p.note}</p>
                  <button className={`mt-auto w-full px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${p.featured ? "bg-[#7C5CFF] text-white hover:bg-[#8f72ff]" : "bg-white/8 border border-white/12 text-white hover:bg-white/12"}`}>{p.cta}</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TABLE + TESTIMONIAL                                          */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: BASE }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* table */}
          <Reveal>
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 overflow-hidden h-full">
              <div className="px-6 py-4 border-b border-white/10">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">Uniform telemetry</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/45 text-xs">
                    <th className="text-left font-medium px-6 py-3">Frame</th>
                    <th className="text-left font-medium px-6 py-3">Uniform</th>
                    <th className="text-left font-medium px-6 py-3">Value</th>
                    <th className="text-left font-medium px-6 py-3">State</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((r) => (
                    <tr key={r.frame} className="border-t border-white/8">
                      <td className="px-6 py-3 font-mono text-white/80 tabular-nums">{r.frame}</td>
                      <td className="px-6 py-3 font-mono text-[#7C5CFF]">{r.uniform}</td>
                      <td className="px-6 py-3 font-mono text-white/70 tabular-nums">{r.value}</td>
                      <td className="px-6 py-3 text-white/60">{r.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* testimonial */}
          <Reveal delay={0.08}>
            <figure className="rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 p-8 h-full flex flex-col justify-center">
              <div className="text-[#7C5CFF] text-5xl leading-none font-serif mb-4">&ldquo;</div>
              <blockquote className="text-white text-xl md:text-2xl font-light leading-relaxed">
                The background alone made the product feel expensive. We shipped one shader and the whole page grew up.
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE]" />
                <div>
                  <p className="text-white text-sm font-semibold">Dana Ford</p>
                  <p className="text-white/50 text-xs">Head of Design, Prism</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DO / DON'T                                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: "#0A0B11" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="07" kicker="Guidelines" title="Do / Don't" />
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border-t-2 border-[#7C5CFF] pt-6">
                <h3 className="text-2xl font-semibold text-white mb-6">Do</h3>
                <ul className="space-y-3">
                  {[
                    "Drive the field with a real WebGL fragment shader",
                    "Cap devicePixelRatio at 2 and handle resize",
                    "Pause the rAF loop offscreen via IntersectionObserver",
                    "Render one static frame under reduced motion",
                    "Fall back to a CSS gradient when WebGL is missing",
                    "Sit text on glass panels with a scrim for 4.5:1",
                    "Use a single violet accent; animate only transform / opacity",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                      <span className="text-[#7C5CFF] font-mono shrink-0">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t-2 border-white/25 pt-6">
                <h3 className="text-2xl font-semibold text-white/60 mb-6">Don&apos;t</h3>
                <ul className="space-y-3">
                  {[
                    "Fake the shader with a static PNG or CSS keyframes",
                    "Skip the devicePixelRatio cap",
                    "Keep the loop running while offscreen",
                    "Ignore prefers-reduced-motion or the no-WebGL path",
                    "Put text on the field with no glass or scrim",
                    "Fill the screen with canvases or loud accents",
                    "Animate DOM position and steal the shader's budget",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/55 leading-relaxed">
                      <span className="text-white/35 font-mono shrink-0">x</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="py-16 px-5 md:px-8 border-t border-white/10" style={{ backgroundColor: BASE }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <p className="text-white/45 text-sm">Shader Gradient - the living gradient.</p>
          <div className="flex items-center gap-6">
            <a href="#top" className="text-sm text-white/60 hover:text-white transition-colors duration-300">Back to top</a>
            <Link href="/styles" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
              Back to all styles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
