import { DesignStyle } from "./index";

export const particle: DesignStyle = {
  slug: "particle",
  name: "粒子系统",
  nameEn: "Particle System",
  description:
    "深色科技背景上漂浮的粒子网络，以连线、脉冲和轨迹营造数据流动感。适合科技公司、数据可视化、创意作品集。",
  cover: "/styles/particle.svg",
  styleType: "visual",
  tags: ["modern", "expressive"],
  category: "modern",
  colors: {
    primary: "#0a0e1a",
    secondary: "#0f1419",
    accent: ["#e0e8ff", "#64c8ff", "#64ffc8", "#a78bfa"],
  },
  keywords: ["particles", "network", "connections", "floating", "tech", "nodes", "constellation"],

  philosophy: `A living network of floating particles and connection lines creates a sense of data flowing through space — tech-forward yet organic and mesmerizing.

Core principles:
- Deep dark backgrounds provide the canvas for luminous particle effects
- Particles drift slowly and randomly, forming organic constellations
- Connection lines appear between nearby particles at low opacity
- Foreground content stays clean, readable, and unobstructed
- Cool-toned accents (blue, teal, violet) reinforce the tech atmosphere`,

  doList: [
    "Use deep dark backgrounds (blue-black #0a0e1a or #0f1419)",
    "Add floating particle elements as background decoration",
    "Show connection lines between nearby particles at low opacity",
    "Keep foreground content clean and highly readable",
    "Use cool-toned accent colors (blue, teal, violet)",
    "Apply subtle glow effects to particles and key UI elements",
    "Use backdrop-blur for glass-like card surfaces",
    "Hover 时强化节点激活感（角落亮点、细边框高光、局部电流光）",
    "阴影保持低不透明度大范围扩散，营造星云式幽灵光晕",
    "前景组件响应要快（duration-150~200），与背景慢速粒子形成反差",
  ],

  dontList: [
    "Don't let particles obscure content readability",
    "Don't use warm or earthy colors for primary palette",
    "Don't use heavy borders or thick outlines",
    "Don't use patterns that compete with particle animation",
    "Don't use light backgrounds",
    "Don't use conventional box shadows (use glow effects instead)",
    "Don't let hover glow become solid opaque blocks (must stay airy and translucent)",
    "Don't apply long bouncy easing to controls (particle UI should feel precise)",
  ],

  components: {
    button: {
      name: "Button",
      description: "Particle UI 按钮，快速响应并带节点扫光激活",
      code: `// Primary Button
<button className="group relative px-8 py-3 rounded-lg font-mono text-sm uppercase tracking-widest bg-blue-600/10 border border-blue-500/30 text-blue-400 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4),inset_0_0_10px_rgba(255,255,255,0.2)] active:scale-95 overflow-hidden">
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-linear" />
  <span className="relative z-10">Get Started</span>
</button>

// Secondary Button
<button className="px-6 py-3 rounded-lg font-medium text-sm bg-white/5 backdrop-blur border border-white/10 text-white/80 transition-all duration-200 hover:bg-white/10 hover:border-blue-400/30 hover:text-white">
  Learn More
</button>

// Ghost Button
<button className="px-6 py-3 rounded-lg font-medium text-sm text-white/60 transition-all duration-200 hover:text-white hover:bg-white/5">
  View Docs
</button>
`,
    },
    card: {
      name: "Card",
      description: "深色玻璃卡片，hover 时节点高亮与星云式边缘发光",
      code: `<div className="group relative bg-[#0f1419]/80 backdrop-blur-xl rounded-xl p-8 border border-white/5 transition-all duration-300 hover:border-blue-500/40 hover:bg-[#151b22] hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] overflow-hidden">
  <div className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#60a5fa] transition-opacity duration-300" />
  <div className="absolute bottom-0 left-0 w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#2dd4bf] transition-opacity duration-300 delay-75" />
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
      <span className="text-blue-400 group-hover:text-white transition-colors duration-300">N</span>
    </div>
    <h3 className="text-lg font-semibold text-[#e0e8ff] group-hover:text-white transition-colors duration-200">Feature Title</h3>
  </div>
  <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-200">
    Description with clean readability on deep dark background.
  </p>
</div>`,
    },
    input: {
      name: "Input",
      description: "Dark input fields with blue focus glow",
      code: `<div className="space-y-1.5">
  <label className="block text-sm font-medium text-white/60">Email</label>
  <input
    type="email"
    className="w-full px-4 py-3 bg-[#0a0e1a] border border-white/10 rounded-lg text-[#e0e8ff] placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all duration-300"
    placeholder="you@example.com"
  />
</div>`,
    },
    nav: {
      name: "Navigation",
      description: "Ultra-minimal dark glass navigation bar",
      code: `<nav className="bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <span className="text-[#e0e8ff] font-semibold">Brand</span>
    <div className="flex items-center gap-6 text-sm text-white/50">
      <a href="#" className="hover:text-white transition-colors">Features</a>
      <a href="#" className="hover:text-white transition-colors">Pricing</a>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors">
        Sign Up
      </button>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Deep dark hero section with particle-friendly background",
      code: `<section className="relative bg-[#0a0e1a] overflow-hidden py-24 px-6">
  {/* Particle layer goes here as absolute-positioned background */}
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <h1 className="text-4xl md:text-6xl font-semibold text-[#e0e8ff] mb-6">
      Particle System
    </h1>
    <p className="text-lg text-white/50 max-w-2xl mx-auto">
      A living network of floating particles and connection lines.
    </p>
  </div>
</section>`,
    },
    footer: {
      name: "Footer",
      description: "Minimal dark footer with subtle top border",
      code: `<footer className="bg-[#0a0e1a] border-t border-white/5 py-8 px-6">
  <div className="max-w-6xl mx-auto flex justify-between items-center">
    <span className="text-white/30 text-sm">Brand</span>
    <span className="text-white/20 text-xs">Built with particles</span>
  </div>
</footer>`,
    },
  },

  globalCss: `/* Particle System Global Styles */
@keyframes particle-float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, -15px); }
  50% { transform: translate(-5px, 10px); }
  75% { transform: translate(-10px, -5px); }
}
@keyframes particle-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.5); }
}
@keyframes particle-connect {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}`,

  aiRules: `STYLE: Particle System
TYPE: Deep dark tech aesthetic with floating particle network

MUST USE:
- Background: Deep blue-black (#0a0e1a or #0f1419)
- Particles: Small circles (1-6px) in semi-transparent white/blue/teal, slowly drifting
- Connection lines: Thin lines between nearby particles, very low opacity
- Text: Light blue-white (#e0e8ff) for primary, white/50 for secondary
- Cards: Very dark glass (bg-[#0f1419]/80) with minimal borders (white/5)
- Accents: Blue (#3b82f6), Teal (#14b8a6), Violet (#a78bfa)
- Interactive elements: Subtle blue glow on hover
- Typography: Clean sans-serif, not too heavy
- Backdrop blur on cards and overlays

MUST AVOID:
- Light backgrounds (bg-white, bg-gray-50, etc.)
- Warm or earthy color palettes
- Heavy borders or thick outlines
- Conventional box shadows
- Patterns that compete with particle animation
- Dark text on dark backgrounds

COLOR HIERARCHY:
- Background: #0a0e1a (deepest)
- Surface: #0f1419/80 with backdrop-blur
- Border: white/5 or white/10
- Text primary: #e0e8ff
- Text secondary: white/50
- Accent: blue-500, teal-500, violet-500

PARTICLE LAYER:
- Purely decorative, never blocks content
- 50-150 particles, 1-6px size
- Slow random drift animation
- Connection lines at very low opacity

## Animation & Interaction Rules
- Node Excitation: hover 时用细边框高光和角落微亮点表现节点激活与能量注入。
- Nebula Glow: 阴影采用低不透明度大范围蓝青扩散，避免厚重实体阴影。
- Quantum Snap: 前景控件交互用 duration-150~200，保持精确快速反馈。
- Text Illumination: 卡片 hover 时次要文本可从 white/50 提升到 white/70 或亮蓝色。`,

  examplePrompts: [
    {
      title: "科技公司着陆页",
      titleEn: "Tech Company Landing Page",
      description: "深色背景上粒子网络装饰的科技着陆页",
      descriptionEn: "Tech landing page with particle network background",
      prompt: `Create a tech company landing page using Particle System style:
- Deep blue-black background with floating particles
- Glass-effect navigation bar
- Hero section with large title over particle field
- Feature cards with dark glass surfaces and blue glow hover
- Stats section with glowing numbers
- CTA section with primary blue and secondary glass buttons`,
    },
    {
      title: "数据可视化面板",
      titleEn: "Data Visualization Dashboard",
      description: "带粒子装饰的数据可视化仪表板",
      descriptionEn: "Data dashboard with particle decorations",
      prompt: `Create a data visualization dashboard using Particle System style:
- Dark background with subtle particle animation
- Sidebar navigation with glass effect
- Metric cards showing key data points
- Network graph visualization section
- Activity timeline with glowing nodes`,
    },
    {
      title: "作品集展示页",
      titleEn: "Portfolio Showcase",
      description: "星座风格粒子连线的个人作品集",
      descriptionEn: "Portfolio with constellation-style particle connections",
      prompt: `Create a portfolio page using Particle System style:
- Deep dark background with constellation particle field
- Minimal navigation
- Project cards with dark glass surface and glow hover
- Skills section with node-and-line visualization
- Contact section with blue accent buttons`,
    },
  ],
};
