import { DesignStyle } from "./index";

export const steampunk: DesignStyle = {
  slug: "steampunk",
  name: "蒸汽朋克",
  nameEn: "Steampunk",
  description:
    "维多利亚时代与工业革命的融合美学，铜黄金属质感、齿轮装饰、铆钉面板和复古仪表，呈现精密机械的浪漫幻想。",
  cover: "/styles/steampunk.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#b5882c",
    secondary: "#2a1f14",
    accent: ["#c87533", "#8a8a8a", "#8b2500"],
  },
  keywords: ["蒸汽朋克", "维多利亚", "齿轮", "铜", "工业", "复古", "机械", "黄铜"],

  philosophy: `蒸汽朋克（Steampunk）是一种复古未来主义美学，融合了维多利亚时代的优雅与蒸汽动力工业革命的机械美感。

核心理念：
- 手工精神：每一个铆钉都有意义，每一道焊接都是工艺
- 材质真实：铜、铁、皮革、木材——真实可触的材料感
- 功能浪漫：想象蒸汽科技达到极致的平行世界
- 层次深度：通过金属面板、铆钉、阴影营造机械感层次`,

  doList: [
    "使用深棕色/暗色背景 bg-[#2a1f14] bg-[#1a1208]",
    "铜黄色作为主色调 text-[#b5882c] border-[#b5882c]",
    "添加铆钉装饰（圆形伪元素）",
    "使用衬线字体 font-serif",
    "金属渐变按钮 bg-gradient-to-b from-[#c87533] to-[#8b5220]",
    "面板式布局带边框 border-2 border-[#b5882c]/40",
  ],

  dontList: [
    "禁止使用现代扁平设计",
    "禁止使用明亮的霓虹色",
    "禁止使用无衬线的极简字体",
    "禁止使用大圆角 rounded-full",
  ],

  components: {
    button: {
      name: "按钮",
      description: "蒸汽朋克风按钮，金属质感",
      code: `<button className="
  px-6 py-3
  bg-gradient-to-b from-[#c87533] to-[#8b5220]
  text-[#f0e2c4] font-serif text-sm uppercase tracking-wider
  border border-[#b5882c]
  shadow-[0_2px_0_#4e1e0e,inset_0_1px_0_rgba(255,255,255,0.15)]
  hover:from-[#b5882c] hover:to-[#7a4a1c]
  active:shadow-none active:translate-y-0.5
  transition-all
">
  Activate
</button>`,
    },
    card: {
      name: "卡片",
      description: "蒸汽朋克风面板，铆钉装饰",
      code: `<div className="
  relative p-6
  bg-[#1a1208]
  border-2 border-[#b5882c]/40
  group hover:border-[#b5882c]
  transition-colors
">
  <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
  <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
  <h3 className="text-lg font-serif text-[#f0e2c4] mb-3">Panel Title</h3>
  <p className="text-sm font-serif text-[#c87533]/80">Content</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "蒸汽朋克风输入框，铜边",
      code: `<input
  type="text"
  placeholder="Enter value..."
  className="
    w-full px-4 py-2.5
    bg-[#2a1f14]
    border-2 border-[#b5882c]/30
    text-[#f0e2c4] font-serif
    placeholder-[#b5882c]/30
    focus:outline-none focus:border-[#b5882c]
    transition-colors
  "
/>`,
    },
  },

  globalCss: `/* Steampunk */
:root {
  --steampunk-bg: #2a1f14;
  --steampunk-panel: #1a1208;
  --steampunk-brass: #b5882c;
  --steampunk-copper: #c87533;
  --steampunk-iron: #8a8a8a;
  --steampunk-text: #f0e2c4;
}`,

  aiRules: `You are designing in Steampunk style.
- Dark brown backgrounds: #2a1f14, #1a1208
- Brass/copper accent colors: #b5882c, #c87533
- Always use serif fonts (font-serif)
- Add rivet decorations (small circles at corners)
- Metallic gradient buttons
- Victorian terminology in UI labels
- Border-2 panels with brass-colored borders
- No modern flat design, no bright neon colors`,
};
