import type { DesignStyle } from "./types";
import { canvasLineCardsPrompt } from "@/lib/prompts/canvas-line-cards";

/** Default reproduction stays identical to the independently exercised recipe. */
export const quantizedLineField: DesignStyle = {
  slug: "quantized-line-field",
  name: "量化线场",
  nameEn: "Quantized Line Field",
  description: "把图形的明暗转换成四档竖线，用轻柔流动、弹簧位移和网格检测框，让品牌标志成为可探索的交互视觉。",
  descriptionEn: "Translate a mark's luminance into four weights of vertical lines, with slow drift, spring displacement, and grid-aligned scan overlays.",
  cover: "/styles/quantized-line-field.svg",
  styleType: "visual",
  category: "expressive",
  tags: ["high-contrast", "responsive", "brand-inspired"],
  colors: { primary: "#202220", secondary: "#fafaf8", accent: ["#2152e7", "#c2dcff", "#ec353e", "#267dff"] },
  keywords: ["竖线", "亮度场", "四档线宽", "竹节线条", "品牌卡片", "扫描框", "Canvas 2D", "创意编程"],
  keywordsEn: ["vertical line art", "luminance field", "four line weights", "segmented strokes", "brand cards", "scan overlay", "Canvas 2D", "creative coding"],
  philosophy: `把图形拆成光，再用四档竖线重新组合。细线铺满背景，粗线构成标志；噪声缓慢向下流动，指针让局部线段散开，再弹回原位。

把动感留给图形，文字和操作保持安静。浅灰、钴蓝、近黑三张卡片共享网格与比例，分别用黑、浅蓝、红色线条表达身份。衬线大标题和清晰的无衬线正文，配合等宽坐标注释，让编辑感与计算感共存。

检测框来自亮度窗口的排序，只是视觉交互。完整提示词包含实际路径、采样网格、线宽阈值和验收条件，使访客可以生成自己的单文件版本。`,
  philosophyEn: `Break a mark into light and rebuild it with four weights of vertical strokes. Thin lines form the field; thick lines reveal the identity. Noise drifts downward while pointer impulses part nearby segments and springs return them to the grid.

Keep motion in the artwork and controls quiet. Gray, cobalt, and near-black cards share proportions and spacing, with black, pale-blue, and red ink. Serif display type, clear sans-serif body copy, and monospace coordinates balance editorial and computational detail.

Scan boxes rank bright windows; they do not perform AI inference. Deliver actual paths, sampling dimensions, thresholds, and observable checks so visitors can reproduce a self-contained file.`,
  doList: [
    "以 bg-[#fafaf8] 纸面和 bg-[#eeeeeb]、bg-[#2152e7]、bg-[#111212] 卡片承载线场",
    "主标题使用 font-serif，界面文字使用 font-sans，坐标使用 font-mono",
    "卡片使用 rounded-[17px]、清晰留白和统一比例",
    "初始化时每个路径只采样一次，保存 60×60 亮度表",
    "用 60 列、30 段和四档线宽重建标志，保留分节感",
    "从当前带噪声和形变的线场重新检测亮区，蓝框稳定跟随并更新网格坐标",
    "指针脉冲驱动弹簧，静止后回到原位，遵守减少动态效果偏好",
    "交付含完整路径的提示词，并提供离线 HTML 参考",
  ],
  doListEn: [
    "Use bg-[#fafaf8] paper and bg-[#eeeeeb], bg-[#2152e7], bg-[#111212] card surfaces",
    "Use font-serif display type, font-sans interface text, and font-mono coordinates",
    "Use rounded-[17px] cards with generous spacing and consistent proportions",
    "Sample each path once into a 60-by-60 luminance table",
    "Rebuild marks with 60 columns, 30 segments, and exactly four stroke weights",
    "Rescan the current noisy, displaced field; track blue boxes and update their grid coordinates",
    "Use a decaying spring impulse and honor reduced-motion preferences",
    "Deliver complete path data in the prompt and an offline HTML reference",
  ],
  dontList: [
    "禁止用 Logo 图片或 SVG 元素替代展示中的竖线标志",
    "禁止每帧读取像素或在尺寸变化时重新采样路径",
    "禁止用 blur、backdrop-blur 或 shadow-lg 掩盖线条结构",
    "禁止将扫描框描述为真实 AI 识别结果",
    "禁止给每段线条使用连续线宽，必须保留四档分节",
    "禁止省略键盘聚焦、触控和暂停动效的行为",
  ],
  dontListEn: [
    "Do not replace the line-drawn marks with logo images or SVG elements",
    "Do not read pixels every frame or resample paths on resize",
    "Do not obscure strokes with blur, backdrop-blur, or shadow-lg",
    "Do not describe scan boxes as real AI recognition results",
    "Do not use continuous stroke weights; retain four discrete levels",
    "Do not omit keyboard focus, touch interaction, or a motion toggle",
  ],
  components: {
    button: {
      name: "来源按钮",
      description: "轻量边框与蓝色焦点，视觉重心留给线场。",
      code: `<button type="button" className="rounded-full border border-[#d9dbd5] bg-transparent px-5 py-2.5 font-sans text-sm text-[#202220] hover:border-[#267dff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#267dff]">Reveal the source →</button>`,
    },
    card: {
      name: "品牌卡片容器",
      description: "静态卡片容器；Canvas 采样与交互的完整实现规则包含在硬性提示词中。",
      code: `<article className="relative isolate flex aspect-[0.70] min-h-[460px] flex-col justify-between overflow-hidden rounded-[17px] bg-[#eeeeeb] p-7 font-sans text-[#202220]">
  <h3 className="text-sm font-medium">Apple</h3>
  {/* Implement the line-field canvas using the complete reproduction prompt. */}
  <footer className="relative z-10"><p className="mb-6 text-4xl leading-none tracking-tight">Think<br />different.</p><button type="button" className="text-sm underline underline-offset-4">Reveal the source →</button></footer>
</article>`,
    },
    input: {
      name: "参数输入框",
      description: "可读的标签、轻边框与明确的蓝色焦点。",
      code: `<label className="block font-sans text-sm text-[#202220]">Project name<input type="text" placeholder="Your next identity" className="mt-2 block w-full rounded-xl border border-[#d9dbd5] bg-[#fafaf8] px-4 py-3 placeholder:text-[#73766e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#267dff]" /></label>`,
    },
    nav: {
      name: "工作室导航",
      description: "字标、返回入口和简洁的操作。",
      code: `<nav className="flex items-center justify-between border-b border-[#d9dbd5] bg-[#fafaf8] px-6 py-5 text-[#202220]"><a href="/" className="font-serif text-2xl">Field studies</a><a href="#work" className="font-sans text-sm underline underline-offset-4">Explore the collection</a></nav>`,
    },
    hero: {
      name: "展览标题",
      description: "宽阔留白中的衬线标题，接续三张交互卡片。",
      code: `<header className="flex flex-wrap items-end justify-between gap-8 bg-[#fafaf8] px-6 py-14 text-[#202220]"><h1 className="font-serif text-5xl leading-none tracking-tight">Identity, in lines.</h1><p className="max-w-64 font-sans text-sm leading-relaxed text-[#686b64]">Move through a familiar mark.<br />Find the structure beneath the surface.</p></header>`,
    },
    footer: {
      name: "作品注释",
      description: "不干扰主视觉的简短注释。",
      code: `<footer className="flex flex-wrap justify-between gap-3 border-t border-[#d9dbd5] bg-[#fafaf8] px-6 py-6 font-sans text-xs text-[#686b64]"><span>A study of recognition and reconstruction.</span><span>One path. Four line weights.</span></footer>`,
    },
  },
  globalCss: `:root { --qf-paper: #fafaf8; --qf-ink: #202220; --qf-blue: #2152e7; --qf-detection: #267dff; --qf-red: #ec353e; }
body { background: var(--qf-paper); color: var(--qf-ink); font-family: Arial, Helvetica, sans-serif; }
::selection { background: #c2dcff; color: #202220; }
:focus-visible { outline: 2px solid var(--qf-detection); outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`,
  aiRules: `默认使用下方完整案例复现三张品牌卡片。用户追加的品牌、文案和配色需求可以覆盖对应的默认数据；其余采样、线宽、噪声、交互和无障碍规则保持一致。\n\n${canvasLineCardsPrompt.zh}`,
  aiRulesEn: `Use the complete case below as the default reproduction. Explicit user requests for different brands, copy, or colors override those default data values; preserve the sampling, quantization, noise, interaction, and accessibility rules.\n\n${canvasLineCardsPrompt.en}`,
  examplePrompts: [
    { title: "完整复现三张品牌卡片", titleEn: "Reproduce the three brand cards", description: "含完整路径和验收条件的独立 HTML。", descriptionEn: "Self-contained HTML with exact paths and observable checks.", prompt: canvasLineCardsPrompt.zh, promptEn: canvasLineCardsPrompt.en },
    { title: "替换为自己的品牌", titleEn: "Use your own identity", description: "替换路径、配色和文案，保留线场规则。", descriptionEn: "Replace paths, palette, and copy while retaining the line-field rules.", prompt: "使用量化线场风格制作品牌卡片。保留 60×60 单次采样、四档线宽、流动噪声、弹簧复位和检测框。把品牌路径、名称、标语和配色替换为我提供的数据；缺少路径时先明确缺失，不要猜测标志。交付单文件 HTML。", promptEn: "Create identity cards in Quantized Line Field style. Retain one-time 60-by-60 sampling, four stroke weights, flowing noise, spring return, and scan overlays. Replace paths, names, taglines, and colors with my data; identify missing path data instead of guessing a mark. Deliver one HTML file." },
  ],
};
