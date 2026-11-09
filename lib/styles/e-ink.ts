import type { DesignStyle } from "./types";

export const eInk: DesignStyle = {
  slug: "e-ink",
  name: "电子纸",
  nameEn: "E-Ink",
  description:
    "以暖纸白、墨色字级和克制的点阵纹理整理信息密度。保留纸张式的安静节奏，同时让数字、状态和导航在低色阶下仍然清楚。",
  descriptionEn:
    "A quiet, paper-toned interface organized by ink hierarchy and restrained halftone texture. Dense information, status and navigation remain distinct in a limited grayscale palette.",
  cover: "/styles/e-ink.svg",
  styleType: "visual",
  tags: ["high-contrast", "responsive", "texture-heavy"],
  category: "modern",
  colors: {
    primary: "#20211e",
    secondary: "#f5f3ea",
    accent: ["#555750", "#bab9b0", "#e6e4da"],
  },
  keywords: ["电子纸", "灰阶界面", "点阵纹理", "数据面板", "纸张白", "墨色排版", "低干扰"],
  keywordsEn: ["e-paper inspired", "grayscale dashboard", "halftone", "warm paper", "ink hierarchy", "low distraction", "dense reading"],
  philosophy: `电子纸风格以有限灰阶和纸张底色安排可读的信息，而不是把网页伪装成某一台电子设备。

颜色、边框和点阵负责分组；文本标签、字重、顺序和图形形状共同表达状态。屏幕分辨率、刷新率或色阶能力没有被检测时，不要声称真实硬件兼容，也不要用闪烁、连续动效或只有颜色的状态提示。`,
  philosophyEn: `E-Ink organizes readable information with limited grays on a warm paper ground; it does not dress a web page up as a particular piece of hardware.

Grayscale, rules and halftone separate groups. Text labels, weight, order and shape carry status together. Unless the actual device has been tested, do not claim hardware, refresh-rate or grayscale compatibility. Avoid flicker, continuous motion and color-only signals.`,
  doList: [
    "用纸色 #f5f3ea 作背景、墨色 #20211e 作主文本。",
    "用规范中定义的灰阶承担层级与状态，并检查实际文字配对的对比度。",
    "用数字列、短标签和清楚单位表达设备或列表数据。",
    "将点阵限制在背景纹理、图表填充或选中区域。",
    "为筛选、标签和状态同时提供文字或形状线索。",
    "在窄屏上按阅读顺序折叠网格，并保留键盘焦点提示。",
  ],
  doListEn: [
    "Use #f5f3ea paper and #20211e ink for the primary text pair.",
    "Use the documented grayscale roles for hierarchy and status, and check the actual text/background pairs.",
    "Use tabular values, short labels and explicit units for device or list data.",
    "Reserve halftone for a background texture, chart fill or selected area.",
    "Pair statuses with a word or shape as well as their grayscale treatment.",
    "Collapse grids in reading order on narrow screens and keep keyboard focus visible.",
  ],
  dontList: [
    "不要声称已经适配某种电子纸硬件、刷新率或灰阶能力。",
    "不要用闪烁、连续刷新式动效或大范围渐变营造屏幕效果。",
    "不要让低对比度灰字、极细文字或密集列承担关键数据。",
    "不要仅用颜色表达错误、警告、选择或进度。",
    "不要把点阵铺满正文、图标和每张卡片。",
    "不要为了设备外观添加没有内容依据的外框、按键或贝壳。",
  ],
  dontListEn: [
    "Do not claim support for an e-paper device, refresh rate or gray-depth tier that was not tested.",
    "Do not use flicker, looping refresh-like animation or broad gradients to fake a display.",
    "Do not put critical data in low-contrast grays, hairline text or tightly packed columns.",
    "Do not encode errors, warnings, selection or progress with color alone.",
    "Do not spread halftone across body text, icons and every card.",
    "Do not add a hardware bezel, buttons or shell unless the content calls for them.",
  ],
  aiRules: `你是电子纸风格的界面实现助手。先读取项目结构与完整 design.md，按用户指定范围实现。
- 背景使用暖纸色 #f5f3ea，主文字使用墨色 #20211e，辅助文字使用 #555750；面板为 #e6e4da，分隔线为 #bab9b0。
- 使用矩形边缘、清楚的数字列、单位和阅读顺序；点阵只用于装饰或图表填充，不覆盖文字。
- 状态同时使用文字或形状；主按钮变浅的悬停/按下状态必须同步切换为墨色文字。
- 为按钮和输入框提供 focus-visible:ring-2；触控目标至少 44px，窄屏按阅读顺序折叠网格。
- 使用项目已有组件与依赖；避免发光、玻璃模糊、彩色渐变、连续闪烁和夸张动画。
- 展示数据时说明真实来源或示例身份。只有经过真实设备验证，才可以声明电子纸硬件或刷新能力。
- 验证手机与桌面的内容溢出、键盘操作和相关交互状态；只报告实际执行的检查。`,
  aiRulesEn: `You implement E-Ink interfaces. Read the project and complete design.md first, then work within the user's requested scope.
- Use paper #f5f3ea, primary ink #20211e and secondary text #555750; panels use #e6e4da and rules use #bab9b0.
- Keep square edges, aligned values, explicit units and a clear reading order. Reserve halftone for decoration or chart fills, never text.
- Pair state with words or shapes. When a primary button changes to a light hover or active surface, switch its text to ink as well.
- Give buttons and inputs focus-visible:ring-2, at least 44px touch targets, and a narrow-screen layout that preserves reading order.
- Reuse the project's components and dependencies. Avoid glow, glass blur, colorful gradients, continuous flashing and exaggerated motion.
- Label real sources and sample data honestly. Claim e-paper hardware or refresh compatibility only after testing the actual device.
- Check narrow and wide layouts, overflow, keyboard operation and relevant states. Report only checks actually run.`,
  components: {
    button: {
      name: "墨面按钮",
      nameEn: "Ink action",
      description: "高对比的主操作，矩形边缘，焦点始终可见。",
      descriptionEn: "A high-contrast primary action with square edges and a visible focus ring.",
      code: `<button className="rounded-none border border-[#20211e] bg-[#20211e] px-4 py-3 font-mono text-sm font-semibold text-[#f5f3ea] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#20211e]">
  Open reading list
</button>`,
    },
    card: {
      name: "信息栏",
      nameEn: "Information panel",
      description: "暖灰表面、单线边框，用小标题和数字建立层级。",
      descriptionEn: "A warm-gray surface and single rule with hierarchy carried by a small label and a value.",
      code: `<article className="rounded-none border border-[#bab9b0] bg-[#e6e4da] p-5">
  <p className="text-xs font-semibold uppercase tracking-wide text-[#555750]">Page</p>
  <p className="mt-2 text-2xl font-semibold tabular-nums text-[#20211e]">04 / 12</p>
</article>`,
    },
    input: {
      name: "纸面输入框",
      nameEn: "Paper field",
      description: "纸色填充、单线边框；键盘焦点使用墨色轮廓。",
      descriptionEn: "A paper-filled field with one rule and an ink-colored keyboard focus outline.",
      code: `<label className="grid gap-2 text-sm text-[#20211e]">
  Search the archive
  <input className="min-h-11 rounded-none border border-[#77786f] bg-[#f5f3ea] px-3 text-[#20211e] placeholder:text-[#555750] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#20211e]" />
</label>`,
    },
  },
  globalCss: `/* E-Ink: optional, decorative paper grain; content remains legible without it. */
:root {
  --e-ink-paper: #f5f3ea;
  --e-ink-text: #20211e;
  --e-ink-muted: #555750;
  --e-ink-rule: #bab9b0;
  --e-ink-panel: #e6e4da;
}
[data-eink-grain="true"] {
  background-image: radial-gradient(#555750 0.55px, transparent 0.65px);
  background-size: 5px 5px;
}`,
  examplePrompts: [
    {
      title: "阅读清单",
      titleEn: "Reading queue",
      description: "用有限灰阶呈现阅读进度和下一步动作。",
      descriptionEn: "Show reading progress and the next action in a limited grayscale palette.",
      prompt: "用电子纸风格制作中文阅读清单：包含标题、四个编号条目、阅读进度和一个明确的下一步操作。用暖纸色与墨色、等宽数字和细分隔线，选中行可带局部点阵。800px参考布局在390px窄屏按阅读顺序折叠，保留可读字号，并用文字和形状说明选中状态。不声明未经测试的电子纸硬件支持。",
      promptEn: "Create a reading queue in E-Ink style. At an 800px-wide preview, place a title, four numbered items, explicit reading progress, and one next action. Use warm paper and ink colors, tabular page numbers, thin rules, and optional halftone on the selected row. Keep names readable at 390px and encode selection with text and shape. Do not claim e-paper hardware support.",
    },
    {
      title: "房间环境摘要",
      titleEn: "Room status summary",
      description: "把示例传感器数据放进易扫描的设备列表。",
      descriptionEn: "Arrange sample sensor readings in a list that is easy to scan.",
      prompt: "用电子纸风格制作房间状态摘要，清楚标注示例数据。将三项读数与单位对齐，用分隔线区分条目，用文字和形状共同表达状态；加入一张单色趋势图与一个可操作控件。保持克制的视觉层级、键盘可达性、窄屏可读性和减少动态效果支持。",
      promptEn: "Build a room-status summary in E-Ink style using explicitly labeled sample data, not a live-device claim. Separate three readings with aligned units and rules; show status with a word and shape; add one small monochrome sparkline and one actionable control. Keep it calm, keyboard reachable, responsive in portrait, and respectful of reduced motion.",
    },
  ],
};
