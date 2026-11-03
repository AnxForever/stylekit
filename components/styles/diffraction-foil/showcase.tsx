"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { localizeHref } from "@/lib/i18n/routing";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";
import { diffractionFoilPrompt } from "@/lib/prompts/diffraction-foil";
import { diffractionFoil } from "@/lib/styles/diffraction-foil";
import { grating, rgbCss, useFoilLight, wavelengthColor } from "./foil";
import styles from "./showcase.module.css";

type PromptLocale = "zh" | "en";

const reference = "/experiments/diffraction-foil/index.html";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9c8d4]";
const action = `inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-sm transition-colors ${focus}`;
const panel = "rounded-2xl border border-white/10 bg-[#141319]";

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-white/10 py-12 md:py-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
        {intro && <p className="max-w-md text-sm leading-relaxed text-[#a9a8b6]">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

/** The reference page in an iframe, sized to its own content once it has laid out. */
function StudyFrame({ zh }: { zh: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [height, setHeight] = useState<number>();
  const synchronize = useCallback(() => {
    observer.current?.disconnect();
    let attempts = 0;
    const attach = () => {
      const doc = frame.current?.contentDocument;
      const body = doc?.body as HTMLElement | null | undefined;
      if (!body || !doc?.querySelector("main")) {
        if (attempts++ < 30) requestAnimationFrame(attach);
        return;
      }
      const measure = () => setHeight(Math.ceil(body.getBoundingClientRect().height));
      measure();
      observer.current = new ResizeObserver(measure);
      observer.current.observe(body);
    };
    requestAnimationFrame(attach);
  }, []);
  useEffect(() => () => observer.current?.disconnect(), []);
  useEffect(() => {
    synchronize();
  }, [synchronize]);
  return (
    <iframe
      ref={frame}
      title={zh ? "镭射收藏卡和镭射零件的实时效果" : "Live foil trading card and component sheet"}
      src={reference}
      onLoad={synchronize}
      className="block h-[2600px] w-full border-0 max-[680px]:h-[4200px]"
      style={height ? { height } : undefined}
    />
  );
}

/** Grating equation: a lamp at angle theta, viewer along the normal, groove period d. */
function GratingDemo({ zh }: { zh: boolean }) {
  const [angle, setAngle] = useState(32);
  const [period, setPeriod] = useState(1500);
  const s = Math.sin((angle * Math.PI) / 180);
  const orders = [1, 2, 3].map((m) => {
    const l = (period * s) / m;
    const visible = l >= 380 && l <= 780;
    return { m, l, visible, color: visible ? rgbCss(wavelengthColor(l)) : "transparent" };
  });
  const mixed = rgbCss(grating(s, period));
  const strip = useMemo(() => {
    const stops: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const l = 380 + (400 * i) / 40;
      stops.push(`${rgbCss(wavelengthColor(l))} ${(i / 40) * 100}%`);
    }
    return `linear-gradient(90deg, ${stops.join(", ")})`;
  }, []);
  return (
    <div className={`${panel} grid gap-8 p-6 md:grid-cols-[1fr_1.1fr] md:p-8`}>
      <div className="grid content-start gap-6">
        <p className="font-mono text-lg tracking-wide text-[#ececf2]">λ = d · sin θ / m</p>
        <label className="grid gap-2 text-sm text-[#a9a8b6]">
          <span className="flex justify-between"><span>{zh ? "灯的角度 θ" : "Lamp angle θ"}</span><span className="font-mono text-[#ececf2]">{angle}°</span></span>
          <input type="range" min={0} max={70} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className={`accent-[#c9c8d4] ${focus}`} />
        </label>
        <label className="grid gap-2 text-sm text-[#a9a8b6]">
          <span className="flex justify-between"><span>{zh ? "刻槽间距 d" : "Groove period d"}</span><span className="font-mono text-[#ececf2]">{period} nm</span></span>
          <input type="range" min={800} max={2200} step={50} value={period} onChange={(e) => setPeriod(Number(e.target.value))} className={`accent-[#c9c8d4] ${focus}`} />
        </label>
        <p className="text-sm leading-relaxed text-[#a9a8b6]">
          {zh
            ? "角度小时各级波长都落在可见光以外，箔面是银色；角度变大，第一级先扫过紫到红，第二、三级再跟上，颜色叠在一起。"
            : "At small angles every order falls outside the visible range and the foil stays silver. As the angle grows the first order sweeps violet to red, then the second and third orders follow and overlap."}
        </p>
      </div>
      <div className="grid content-start gap-5">
        <div className="relative h-8 overflow-hidden rounded-lg" style={{ background: strip }} aria-hidden="true">
          {orders.filter((o) => o.visible).map((o) => (
            <span key={o.m} className="absolute top-0 h-full w-0.5 bg-white" style={{ left: `${((o.l - 380) / 400) * 100}%` }} />
          ))}
        </div>
        <ul className="grid gap-2">
          {orders.map((o) => (
            <li key={o.m} className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm">
              <span className="text-[#a9a8b6]">{zh ? `第 ${o.m} 级` : `Order ${o.m}`}</span>
              <span className="flex items-center gap-3 font-mono">
                <span className="text-[#ececf2]">{o.l.toFixed(0)} nm</span>
                <span className="h-5 w-10 rounded border border-white/15" style={{ background: o.visible ? o.color : "repeating-linear-gradient(45deg, #1d1c24 0 4px, #141319 4px 8px)" }} />
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm">
          <span className="text-[#a9a8b6]">{zh ? "三级叠加后看到的颜色" : "Color after summing orders"}</span>
          <span className="h-8 w-20 rounded-lg border border-white/15" style={{ background: s * period < 380 ? "#a3a2af" : mixed }} />
        </div>
      </div>
    </div>
  );
}

function FoilSwitch({ on, onChange, label }: { on: boolean; onChange: (next: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`inline-flex items-center gap-3 rounded-full text-sm text-[#ececf2] ${focus}`}
    >
      <span className={`${styles.switchTrack} relative h-7 w-12 overflow-hidden rounded-full border border-white/15 ${on ? "" : "bg-[#26252e]"}`}>
        {on && <span data-foil="foil" className={`${styles.foil} ${styles.light} absolute inset-0`} aria-hidden="true" />}
        <span className={`${styles.switchThumb} absolute left-1 top-1 h-5 w-5 rounded-full bg-[#ececf2] shadow-[0_2px_6px_rgba(0,0,0,0.5)]`} style={{ transform: on ? "translateX(20px)" : "none" }} />
      </span>
      {label}
    </button>
  );
}

export default function DiffractionFoilShowcase() {
  const { locale } = useI18n();
  const zh = locale === "zh";
  const root = useRef<HTMLDivElement>(null);
  useFoilLight(root);
  const [promptLocale, setPromptLocale] = useState<PromptLocale | null>(null);
  const selectedLocale = promptLocale ?? (zh ? "zh" : "en");
  const prompt = diffractionFoilPrompt[selectedLocale];
  const { copy, result, isCopied } = useClipboard();
  const [packs, setPacks] = useState(0);
  const [foilOn, setFoilOn] = useState(true);
  const [code, setCode] = useState("");
  const codeValid = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code);

  const materials = [
    { id: "film", name: zh ? "彩虹膜" : "Film", body: zh ? "两组交叉光栅取平均，底下是拉丝银。最常见的镭射膜。" : "Two crossed gratings averaged over brushed silver. The everyday holographic film.", swatch: "foil" as const },
    { id: "star", name: zh ? "星芒" : "Star", body: zh ? "同心圆刻槽：只有朝着灯的那条半径和它对面那条亮出彩虹。" : "Concentric grooves: only the radius facing the lamp, and its opposite, shows color.", swatch: "seal" as const },
    { id: "glitter", name: zh ? "碎钻" : "Glitter", body: zh ? "随机角度的小碎片，光栅正好对上观者的那几片才闪。" : "Facets at random angles; only those whose grating meets the eye flash.", swatch: "glitter" as const },
    { id: "brushed", name: zh ? "拉丝" : "Brushed", body: zh ? "一组直纹光栅加顺着刻槽的拉丝，彩虹被拉成细长的光带。仅 WebGL。" : "One straight grating with streaks along the grooves, stretching color into long bands. WebGL only.", swatch: null },
    { id: "pearl", name: zh ? "幻彩" : "Pearl", body: zh ? "不是光栅，是薄膜干涉：膜厚起伏，颜色像肥皂泡一样柔和地偏移。仅 WebGL。" : "Thin-film interference instead of a grating: varying thickness shifts color softly, like a soap bubble. WebGL only.", swatch: null },
  ];
  const palette = [
    { name: zh ? "印张" : "Sheet", hex: "#0c0b10" },
    { name: zh ? "面板" : "Panel", hex: "#141319" },
    { name: zh ? "银箔" : "Silver", hex: "#c9c8d4" },
    { name: zh ? "油墨" : "Ink", hex: "#16151c" },
    { name: zh ? "正文" : "Text", hex: "#ececf2" },
    { name: zh ? "次要" : "Secondary", hex: "#a9a8b6" },
  ];
  const spectrumStrip = useMemo(() => {
    const stops: string[] = [];
    for (let i = 0; i <= 64; i++) stops.push(`${rgbCss(grating(Math.abs((i / 64) * 2 - 1) * 1.25))} ${(i / 64) * 100}%`);
    return `linear-gradient(90deg, ${stops.join(", ")})`;
  }, []);
  const architecture = [
    { title: zh ? "一个隐藏画布" : "One hidden canvas", body: zh ? "浏览器限制同时存在的 WebGL 上下文数量，整页只开一个 WebGL2 上下文，用材质 uniform 区分分支。" : "Browsers cap live WebGL contexts, so the page opens a single WebGL2 context and switches materials by uniform." },
    { title: zh ? "逐个元素渲染" : "Render each element", body: zh ? "视口改成元素的尺寸，传入灯的相对位置、材质和倾斜，画一个全屏三角形。" : "Resize the viewport to the element, pass the lamp position, material, and tilt, then draw one full-screen triangle." },
    { title: zh ? "拷进自己的画布" : "Copy into place", body: zh ? "用 drawImage 拷进元素自带的 2D 画布；灯、尺寸和倾斜都没变的元素这一帧跳过。" : "drawImage copies the result into the element's own 2D canvas; elements whose lamp, size, and tilt are unchanged are skipped." },
  ];
  const springs = [
    [zh ? "最大倾斜" : "Max tilt", "14°", zh ? "朝按下的位置弯" : "Toward the press point"],
    [zh ? "弹簧刚度" : "Stiffness", "320", zh ? "松手后弹回" : "Return on release"],
    [zh ? "阻尼比" : "Damping ratio", "0.32", zh ? "过冲一次" : "One overshoot"],
    [zh ? "切换冲量" : "Toggle impulse", "260", zh ? "开关、勾选、开一包" : "Switch, check, open a pack"],
  ];
  const checks = [
    [zh ? "灯" : "Lamp", zh ? "所有镭射元素上的彩虹同时移动，以灯为圆心" : "Bands move across every foil element at once, centered on the lamp"],
    [zh ? "空闲" : "Idle", zh ? "指针静止 4 秒后灯开始缓慢绕圈" : "After 4 idle seconds the lamp starts a slow orbit"],
    [zh ? "光谱" : "Spectrum", zh ? "角度变大颜色从紫走到红，高级次再重复" : "Color runs violet to red as the angle grows and repeats in higher orders"],
    [zh ? "上下文" : "Contexts", zh ? "整页只有一个 WebGL 上下文" : "Exactly one WebGL context on the page"],
    [zh ? "平替" : "Fallback", zh ? "切到 CSS 后版面不变，彩虹仍跟着灯" : "The CSS fallback keeps the layout and still follows the lamp"],
    [zh ? "减少动态" : "Reduced motion", zh ? "灯停住，画面静止" : "The lamp parks and the frame holds still"],
  ];

  return (
    <div ref={root} className="min-h-screen bg-[#0c0b10] font-sans text-[#ececf2] selection:bg-[#c9c8d4] selection:text-[#16151c]">
      <h1 className="sr-only">{zh ? "镭射箔" : "Diffraction Foil"}</h1>
      <nav className="border-b border-white/10" aria-label={zh ? "展示页导航" : "Showcase navigation"}>
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-4 md:px-10">
          <Link href={localizeHref("/styles/diffraction-foil", locale)} className={`text-sm text-[#a9a8b6] hover:text-[#ececf2] ${focus}`}>
            {zh ? "返回镭射箔" : "Back to Diffraction Foil"}
          </Link>
          <div className="flex items-center gap-4">
            <a href={reference} download="stylekit-diffraction-foil.html" className={`hidden text-sm text-[#a9a8b6] underline underline-offset-4 hover:text-[#ececf2] sm:inline ${focus}`}>
              {zh ? "下载 HTML" : "Download HTML"}
            </a>
            <button type="button" onClick={() => void copy(prompt, "reproduction-nav")} className={`${action} border-[#c9c8d4] bg-[#c9c8d4] text-[#16151c] hover:bg-[#e3e2ea]`}>
              {isCopied("reproduction-nav", prompt) ? (zh ? "已复制" : "Copied") : (zh ? "复制复现提示词" : "Copy reproduction prompt")}
            </button>
          </div>
        </div>
      </nav>

      <header className="mx-auto max-w-[1280px] px-6 pb-10 pt-14 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a8996]">Diffraction Foil · 1500 nm</p>
        <p className="mt-4 text-5xl font-extrabold tracking-tight md:text-7xl">
          <span data-foil="text" className={styles.text}>{zh ? "光就是油墨。" : "Light is the ink."}</span>
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#a9a8b6]">{zh ? diffractionFoil.description : diffractionFoil.descriptionEn}</p>
      </header>

      <section aria-label={zh ? "实时效果" : "Live study"} className="border-t border-white/10">
        <StudyFrame zh={zh} />
      </section>

      <main className="mx-auto max-w-[1280px] px-6 md:px-10">
        <Section id="grating" title={zh ? "颜色来自光栅方程" : "Color comes from the grating equation"} intro={zh ? "拖动灯的角度和刻槽间距，看每一级衍射落在哪个波长。" : "Drag the lamp angle and groove period to see where each diffraction order lands."}>
          <GratingDemo zh={zh} />
        </Section>

        <Section id="lamp" title={zh ? "指针就是灯" : "The pointer is the lamp"} intro={zh ? "这一节是 CSS 平替，和上面的 WebGL 版跟着同一套规则：灯离屏幕 300px，静止 4 秒后自己绕圈。" : "This section is the CSS fallback, following the same rules as the WebGL version: the lamp sits 300 px above the screen and orbits after 4 idle seconds."}>
          <div className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
            <div data-foil="foil" className={`${styles.foil} relative flex aspect-[1.8] items-end overflow-hidden rounded-2xl p-6 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.9)]`}>
              <span data-foil="text" className={`${styles.text} text-5xl font-extrabold tracking-tight md:text-7xl`}>Lumen</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div data-foil="seal" className={`${styles.seal} relative aspect-square`} aria-hidden="true" />
              <div data-foil="glitter" className={`${styles.glitter} relative aspect-square rounded-2xl`} aria-hidden="true" />
              <p className="col-span-2 text-sm leading-relaxed text-[#a9a8b6]">
                {zh ? "移动指针：大块箔面的彩虹以灯为圆心转动，星芒只亮两条相对的半径，碎钻一颗颗闪。" : "Move the pointer: the large panel's bands turn around the lamp, the star lights two opposite radii, and glitter flashes facet by facet."}
              </p>
            </div>
          </div>
        </Section>

        <Section id="materials" title={zh ? "材质是刻槽的排布" : "A material is a groove layout"} intro={zh ? "五种材质喂给同一个光栅函数；拉丝和幻彩只有逐像素渲染做得出，在上面的实时效果里看。" : "Five materials share one grating function; brushed and pearl need per-pixel rendering, so see them in the live study above."}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {materials.map((m) => (
              <li key={m.id} className={`${panel} grid content-start gap-4 p-4`}>
                {m.swatch === "foil" && <div data-foil="foil" className={`${styles.foil} relative aspect-square rounded-xl`} aria-hidden="true" />}
                {m.swatch === "seal" && <div data-foil="seal" className={`${styles.seal} relative aspect-square`} aria-hidden="true" />}
                {m.swatch === "glitter" && <div data-foil="glitter" className={`${styles.glitter} relative aspect-square rounded-xl`} aria-hidden="true" />}
                {m.swatch === null && (
                  <a href={reference} target="_blank" rel="noopener noreferrer" className={`grid aspect-square place-items-center rounded-xl border border-dashed border-white/15 text-xs text-[#8a8996] hover:text-[#ececf2] ${focus}`}>
                    WebGL →
                  </a>
                )}
                <div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#a9a8b6]">{m.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="components" title={zh ? "零件" : "Components"} intro={zh ? "CSS 平替版的按钮、开关、兑换码和收藏卡。油墨字只印在浅色箔上。" : "CSS-fallback buttons, switch, redeem field, and card. Ink sits only on light foil."}>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className={`${panel} grid content-start gap-5 p-6`}>
              <button
                type="button"
                data-foil="foil"
                onClick={() => setPacks((n) => n + 1)}
                className={`${styles.foil} ${styles.light} relative inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-3 font-semibold tracking-wide text-[#16151c] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_24px_-14px_rgba(0,0,0,0.8)] transition-transform duration-150 active:scale-[0.98] ${focus}`}
              >
                {zh ? "开一包" : "Open a pack"}
              </button>
              <p className="text-sm text-[#a9a8b6]" aria-live="polite">
                {packs === 0 ? (zh ? "还没开过" : "No packs opened") : zh ? `已开 ${packs} 包` : `${packs} ${packs === 1 ? "pack" : "packs"} opened`}
              </p>
              <div className="flex flex-wrap gap-2">
                <span data-foil="foil" className={`${styles.foil} ${styles.light} relative rounded-full px-3 py-1 text-xs font-semibold text-[#16151c]`}>{zh ? "限定" : "Limited"}</span>
                <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-[#ececf2]">No. 042</span>
              </div>
            </div>
            <div className={`${panel} grid content-start gap-5 p-6`}>
              <FoilSwitch on={foilOn} onChange={setFoilOn} label={zh ? "镭射膜" : "Foil layer"} />
              <div className="relative aspect-[1.8] overflow-hidden rounded-xl border border-white/10 bg-[#a3a2af]">
                {foilOn && <div data-foil="foil" className={`${styles.foil} absolute inset-0`} aria-hidden="true" />}
                <span className="absolute bottom-3 left-4 text-2xl font-extrabold tracking-tight text-[#16151c]/80">Lumen</span>
              </div>
              <p className="text-sm text-[#a9a8b6]">{foilOn ? (zh ? "开：银底上叠衍射光谱" : "On: diffraction over silver") : (zh ? "关：只剩银底" : "Off: bare silver")}</p>
            </div>
            <div className={`${panel} grid content-start gap-4 p-6`}>
              <label className="block text-sm text-[#a9a8b6]">
                {zh ? "兑换码" : "Redeem code"}
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="XXXX-XXXX-XXXX"
                  maxLength={14}
                  aria-invalid={code.length > 0 && !codeValid}
                  className="mt-2 block w-full rounded-xl border border-white/15 bg-[#0c0b10] px-4 py-3 font-mono tracking-[0.2em] text-[#ececf2] placeholder:text-[#6c6b78] transition-colors focus:border-[#c9c8d4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9c8d4]/40"
                />
              </label>
              <p className="text-sm" aria-live="polite">
                {code.length === 0
                  ? <span className="text-[#8a8996]">{zh ? "格式：四位一组，共三组" : "Format: three groups of four"}</span>
                  : codeValid
                    ? <span className="text-[#7be0a4]">{zh ? "格式正确" : "Looks valid"}</span>
                    : <span className="text-[#f2a1a1]">{zh ? "还差几位" : "Not complete yet"}</span>}
              </p>
            </div>
          </div>
        </Section>

        <Section id="palette" title={zh ? "配色" : "Palette"} intro={zh ? "印张、银和油墨是固定的；彩色只来自光谱。" : "Sheet, silver, and ink are fixed; color comes only from the spectrum."}>
          <div className="grid gap-4">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {palette.map((c) => (
                <li key={c.hex} className="overflow-hidden rounded-xl border border-white/10">
                  <div className="h-16" style={{ background: c.hex }} />
                  <div className="flex items-center justify-between bg-[#141319] px-3 py-2 text-xs">
                    <span>{c.name}</span>
                    <span className="font-mono text-[#a9a8b6]">{c.hex}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="h-10" style={{ background: spectrumStrip }} />
              <p className="bg-[#141319] px-3 py-2 text-xs text-[#a9a8b6]">
                {zh ? "光谱条：中间是银（波长落在可见光以外），往两边依次是一、二、三级" : "Spectrum strip: silver in the middle where wavelengths are invisible, then orders one, two, and three outward"}
              </p>
            </div>
          </div>
        </Section>

        <Section id="architecture" title={zh ? "整页一个 WebGL 上下文" : "One WebGL context for the page"}>
          <ol className="grid gap-4 md:grid-cols-3">
            {architecture.map((step, index) => (
              <li key={step.title} className={`${panel} p-6`}>
                <p className="font-mono text-xs text-[#8a8996]">0{index + 1}</p>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a9a8b6]">{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="touch" title={zh ? "手感落在材质上" : "Touch lands on the material"} intro={zh ? "按下、勾选、拖动时只弯着色法线，颜色跳一下，元素本身不动。" : "Press, toggle, and drag bend only the shading normal; the color jumps while the element stays put."}>
          <div className={panel}>
            <table className="w-full text-left text-sm">
              <tbody>
                {springs.map(([name, value, note]) => (
                  <tr key={name} className="border-t border-white/10 first:border-t-0">
                    <th scope="row" className="px-4 py-3 align-top font-medium sm:px-5">{name}</th>
                    <td className="px-2 py-3 align-top font-mono text-[#ececf2] sm:px-5">{value}</td>
                    <td className="px-4 py-3 align-top text-[#a9a8b6] sm:px-5">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="rules" title={zh ? "该做和不该做" : "Do and don't"}>
          <div className="grid gap-4 md:grid-cols-2">
            <ul className={`${panel} grid content-start gap-3 p-6 text-sm leading-relaxed`}>
              {(zh ? diffractionFoil.doList : diffractionFoil.doListEn ?? diffractionFoil.doList).map((item) => (
                <li key={item} className="flex gap-3"><span className="text-[#7be0a4]" aria-hidden="true">+</span><span className="text-[#ececf2]">{item}</span></li>
              ))}
            </ul>
            <ul className={`${panel} grid content-start gap-3 p-6 text-sm leading-relaxed`}>
              {(zh ? diffractionFoil.dontList : diffractionFoil.dontListEn ?? diffractionFoil.dontList).map((item) => (
                <li key={item} className="flex gap-3"><span className="text-[#f2a1a1]" aria-hidden="true">−</span><span className="text-[#ececf2]">{item}</span></li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="prompt" title={zh ? "复现提示词" : "Reproduction prompt"} intro={zh ? "一份完整的规格：光栅、灯、材质、单上下文、平替和验收条件。生成后对照上面的实时效果检查。" : "A complete specification: grating, lamp, materials, single context, fallback, and checks. Compare the result with the live study above."}>
          <div className={`${panel} grid gap-4 p-6`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex rounded-full border border-white/15 p-1" role="radiogroup" aria-label={zh ? "提示词语言" : "Prompt language"}>
                {(["zh", "en"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    role="radio"
                    aria-checked={selectedLocale === l}
                    onClick={() => setPromptLocale(l)}
                    className={`rounded-full px-4 py-1.5 text-sm ${selectedLocale === l ? "bg-[#c9c8d4] text-[#16151c]" : "text-[#a9a8b6] hover:text-[#ececf2]"} ${focus}`}
                  >
                    {l === "zh" ? "中文" : "English"}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={reference} download="stylekit-diffraction-foil.html" className={`${action} border-white/15 text-[#ececf2] hover:border-white/40`}>{zh ? "下载参考 HTML" : "Download reference HTML"}</a>
                <button type="button" onClick={() => void copy(prompt, "reproduction-body")} className={`${action} border-[#c9c8d4] bg-[#c9c8d4] text-[#16151c] hover:bg-[#e3e2ea]`}>
                  {isCopied("reproduction-body", prompt) ? (zh ? "已复制" : "Copied") : (zh ? "复制提示词" : "Copy prompt")}
                </button>
              </div>
            </div>
            <ClipboardFeedback result={result} locale={locale} currentText={prompt} />
            <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-[#0c0b10] p-5 font-mono text-xs leading-relaxed text-[#a9a8b6]">{prompt}</pre>
          </div>
        </Section>

        <Section id="checks" title={zh ? "验收" : "Checks"} intro={zh ? "生成结果要能逐条看出来。" : "Each condition should be observable in the result."}>
          <div className={panel}>
            <table className="w-full text-left text-sm">
              <tbody>
                {checks.map(([name, body]) => (
                  <tr key={name} className="border-t border-white/10 first:border-t-0">
                    <th scope="row" className="w-28 px-4 py-3 align-top font-medium sm:w-40 sm:px-5">{name}</th>
                    <td className="px-4 py-3 align-top text-[#a9a8b6] sm:px-5">{body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </main>

      <footer className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 border-t border-white/10 px-6 py-6 font-mono text-xs tracking-[0.12em] text-[#8a8996] md:px-10">
        <span>Grooves 1500 nm · Lamp 300 px</span>
        <span>One WebGL context</span>
      </footer>
    </div>
  );
}
