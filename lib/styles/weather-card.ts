import { DesignStyle } from "./index";

export const weatherCard: DesignStyle = {
  slug: "weather-card",
  name: "诗意天气",
  nameEn: "Weather Card",
  description:
    "大气动画与毛玻璃叠加的诗意天气展示风格。云朵漂移、雨滴坠落、阳光旋转、雪花飘落，营造沉浸式天气体验。",
  descriptionEn:
    "Atmospheric animations with glassmorphic overlays for poetic weather display. Drifting clouds, falling rain, rotating sun rays, and floating snowflakes create an immersive weather experience.",
  cover: "/styles/weather-card.svg",
  styleType: "animation",
  tags: ["modern", "minimal", "responsive"],
  category: "modern",
  colors: {
    primary: "#87CEEB",
    secondary: "#f0f0f0",
    accent: ["#ff6b35", "#6bb5d6", "#ffd700", "#a8d8f0"],
  },
  keywords: ["weather", "atmospheric", "glassmorphic", "animation", "sky", "cloud", "rain", "sun", "snow", "poetic", "天气", "大气"],

  philosophy: `Weather Card 风格将天气数据转化为诗意的视觉体验。通过大气动画和毛玻璃效果，让用户感受天气的韵律与美感。

核心理念：
- 大气动画：云朵漂移、雨滴坠落、阳光旋转、雪花飘落，每种天气都有独特的动画表达
- 毛玻璃叠加：半透明卡片叠加在天空渐变上，创造深度和层次感
- 诗意配色：天空蓝 (#87CEEB) 为主色，日落橙 (#ff6b35) 为点缀，营造温暖而宁静的氛围
- 流体过渡：所有交互使用 spring easing，模拟自然界的物理运动
- 温度感知：通过色彩温度变化传达天气状态

设计原则：
- 视觉一致性：所有组件遵循统一的天空主题视觉语言
- 层次分明：通过毛玻璃透明度和模糊度建立信息层级
- 交互反馈：每个可交互元素都有明确的 hover、active、focus 状态
- 响应式适配：在移动端、平板、桌面端保持一致体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准`,

  philosophyEn: `Weather Card transforms weather data into a poetic visual experience. Through atmospheric animations and glassmorphic effects, users feel the rhythm and beauty of weather.

Core principles:
- Atmospheric animations: drifting clouds, falling rain, rotating sun rays, floating snowflakes — each weather condition has unique animation expression
- Glassmorphic overlay: semi-transparent cards layered over sky gradients create depth and hierarchy
- Poetic palette: sky blue (#87CEEB) as primary, sunset orange (#ff6b35) as accent, creating warm and serene atmosphere
- Fluid transitions: all interactions use spring easing to simulate natural physical motion
- Temperature perception: color temperature shifts convey weather states`,

  doList: [
    "使用天空蓝渐变背景 from-[#87CEEB] to-[#b8e4f9]",
    "卡片使用毛玻璃效果 bg-white/40 backdrop-blur-[30px]",
    "圆角使用 rounded-2xl 或 rounded-3xl",
    "过渡使用 duration-500 + spring easing",
    "使用日落橙 #ff6b35 作为强调色",
    "动画使用 @keyframes 实现云朵漂移和雨滴坠落",
    "hover 时轻微上浮并增强阴影",
  ],

  doListEn: [
    "Use sky blue gradient background from-[#87CEEB] to-[#b8e4f9]",
    "Cards use glassmorphic effect bg-white/40 backdrop-blur-[30px]",
    "Rounded corners use rounded-2xl or rounded-3xl",
    "Transitions use duration-500 + spring easing",
    "Use sunset orange #ff6b35 as accent color",
    "Animations use @keyframes for cloud drift and rain fall",
    "Slight lift on hover with enhanced shadows",
  ],

  dontList: [
    "禁止使用纯黑背景或深色主题",
    "禁止使用直角 rounded-none",
    "禁止使用快速过渡 duration-100",
    "禁止使用高饱和度霓虹色",
    "禁止使用粗重边框",
    "禁止使用不透明纯色卡片背景",
  ],

  dontListEn: [
    "Do not use pure black backgrounds or dark themes",
    "Do not use sharp corners rounded-none",
    "Do not use fast transitions duration-100",
    "Do not use high-saturation neon colors",
    "Do not use heavy borders",
    "Do not use opaque solid card backgrounds",
  ],

  components: {
    button: {
      name: "按钮",
      description: "天空渐变按钮，带柔和发光和日落点缀",
      code: `<button className="group relative
  px-6 py-3
  bg-gradient-to-r from-[#87CEEB] to-[#6bb5d6]
  border border-white/30
  rounded-2xl
  text-white font-medium
  shadow-[0_4px_16px_rgba(135,206,235,0.3)]
  hover:shadow-[0_8px_32px_rgba(135,206,235,0.4)]
  hover:-translate-y-0.5
  active:scale-[0.97]
  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  overflow-hidden
">
  <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
  <span className="relative z-10">Check Weather</span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "毛玻璃天气卡片，带温度显示和天气状态",
      code: `<div className="group relative
  p-6 md:p-8
  bg-white/40 backdrop-blur-[30px]
  border border-white/30
  rounded-2xl
  shadow-[0_4px_16px_rgba(135,206,235,0.2)]
  hover:shadow-[0_8px_32px_rgba(135,206,235,0.3)]
  hover:-translate-y-1
  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  overflow-hidden
">
  <div className="relative z-10">
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-500 text-sm">Today</span>
      <span className="text-[#ff6b35] text-sm font-medium">Partly Cloudy</span>
    </div>
    <div className="text-5xl font-bold text-gray-800 mb-2">22&deg;</div>
    <p className="text-gray-500 text-sm">Feels like 20&deg; &middot; Humidity 65%</p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "柔和云朵风格输入框，带毛玻璃背景",
      code: `<input
  type="text"
  placeholder="Search location..."
  className="
    w-full px-5 py-3.5
    bg-white/50 backdrop-blur-[20px]
    border border-white/30
    rounded-2xl
    text-gray-700 placeholder-gray-400
    shadow-[0_2px_8px_rgba(135,206,235,0.15)]
    focus:outline-none focus:border-[#87CEEB]
    focus:shadow-[0_0_0_3px_rgba(135,206,235,0.3)]
    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "毛玻璃天气导航栏",
      code: `<nav className="
  fixed top-0 left-0 right-0 z-50
  px-6 py-3
  bg-white/30 backdrop-blur-[30px]
  border-b border-white/20
  shadow-[0_1px_8px_rgba(135,206,235,0.1)]
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-gray-800 font-semibold text-lg tracking-tight">
      Weather
    </a>
    <div className="flex items-center gap-1">
      <a href="#" className="px-4 py-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-white/40 transition-all duration-300">
        Today
      </a>
      <a href="#" className="px-4 py-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-white/40 transition-all duration-300">
        Forecast
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区域",
      description: "天空渐变 Hero 区域，带漂浮云朵和温度显示",
      code: `<section className="
  relative min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#87CEEB] via-[#a8d8f0] to-[#b8e4f9]
  px-6 overflow-hidden
">
  <div className="absolute top-20 right-10 w-32 h-12 bg-white/60 rounded-full blur-sm animate-[wc-cloud-drift_20s_ease-in-out_infinite]" />
  <div className="absolute top-40 left-20 w-24 h-8 bg-white/40 rounded-full blur-sm animate-[wc-cloud-drift_25s_ease-in-out_infinite_reverse]" />
  <div className="
    relative max-w-md mx-auto text-center
    p-10 md:p-14
    bg-white/40 backdrop-blur-[30px]
    border border-white/30
    rounded-3xl
    shadow-[0_8px_32px_rgba(135,206,235,0.25)]
    overflow-hidden
  ">
    <h1 className="relative text-6xl md:text-8xl font-bold text-gray-800 mb-2">
      22&deg;
    </h1>
    <p className="relative text-lg text-gray-600 mb-6">
      Partly Cloudy
    </p>
    <button className="
      relative px-8 py-3
      bg-gradient-to-r from-[#87CEEB] to-[#6bb5d6]
      border border-white/30
      rounded-2xl
      text-white font-medium
      shadow-[0_4px_16px_rgba(135,206,235,0.3)]
      hover:shadow-[0_8px_32px_rgba(135,206,235,0.4)]
      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
    ">
      View Forecast
    </button>
  </div>
</section>`,
    },
    footer: {
      name: "页脚",
      description: "天气风格页脚",
      code: `<footer className="bg-white/20 backdrop-blur-[20px] border-t border-white/20 px-6 py-6">
  <p className="text-gray-400 text-sm text-center">
    Weather data updated every 15 minutes
  </p>
</footer>`,
    },
  },

  globalCss: `/* Weather Card Global Styles */

:root {
  --wc-sky: #87CEEB;
  --wc-sky-light: #b8e4f9;
  --wc-sunset: #ff6b35;
  --wc-cloud: rgba(255, 255, 255, 0.6);
  --wc-glass-bg: rgba(255, 255, 255, 0.4);
  --wc-glass-border: rgba(255, 255, 255, 0.3);
  --wc-glass-blur: 30px;
  --wc-spring: cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes wc-cloud-drift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(60px); }
}

@keyframes wc-rain-fall {
  0% { transform: translateY(-10px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

@keyframes wc-sun-rays {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes wc-temp-count {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes wc-snow-fall {
  0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.8; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}

@keyframes wc-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.wc-glass {
  background: var(--wc-glass-bg);
  backdrop-filter: blur(var(--wc-glass-blur));
  -webkit-backdrop-filter: blur(var(--wc-glass-blur));
  border: 1px solid var(--wc-glass-border);
  border-radius: 1rem;
}

.wc-sky-bg {
  background: linear-gradient(to bottom, var(--wc-sky), var(--wc-sky-light));
  min-height: 100vh;
}

.wc-animate-in {
  animation: wc-fade-in 0.5s ease-out both;
}`,

  aiRules: `STYLE: Weather Card
TYPE: 大气动画天气展示风格

必须使用：
- 背景：天空蓝渐变 from-[#87CEEB] to-[#b8e4f9]
- 主色：天空蓝 #87CEEB
- 强调色：日落橙 #ff6b35
- 卡片：毛玻璃效果 bg-white/40 backdrop-blur-[30px]
- 圆角：rounded-2xl 或 rounded-3xl
- 过渡：duration-500 + spring easing
- 动画：云朵漂移、雨滴坠落、阳光旋转、雪花飘落
- 文字：text-gray-800 主文字，text-gray-500 次要文字

禁止使用：
- 纯黑或深色背景
- 直角 rounded-none
- 快速过渡 duration-100
- 高饱和度霓虹色
- 不透明纯色卡片`,

  aiRulesEn: `STYLE: Weather Card
TYPE: Atmospheric animation weather display style

MUST USE:
- Background: sky blue gradient from-[#87CEEB] to-[#b8e4f9]
- Primary: sky blue #87CEEB
- Accent: sunset orange #ff6b35
- Cards: glassmorphic bg-white/40 backdrop-blur-[30px]
- Corners: rounded-2xl or rounded-3xl
- Transitions: duration-500 + spring easing
- Animations: cloud drift, rain fall, sun rays, snow fall
- Text: text-gray-800 primary, text-gray-500 secondary

MUST AVOID:
- Pure black or dark backgrounds
- Sharp corners rounded-none
- Fast transitions duration-100
- High-saturation neon colors
- Opaque solid card backgrounds`,

  examplePrompts: [
    {
      title: "天气仪表盘",
      titleEn: "Weather Dashboard",
      description: "毛玻璃天气仪表盘，带实时动画",
      descriptionEn: "Glassmorphic weather dashboard with live animations",
      prompt: `Create a Weather Card dashboard with:
1. Sky blue gradient background with drifting clouds
2. Main temperature card with glassmorphic overlay
3. Hourly forecast row with small weather icons
4. Rain/snow animation overlay
5. Sunset orange accent for alerts`,
    },
    {
      title: "天气详情页",
      titleEn: "Weather Detail Page",
      description: "沉浸式天气详情展示",
      descriptionEn: "Immersive weather detail display",
      prompt: `Create a Weather Card detail page with:
1. Full-screen sky gradient with animated clouds
2. Large temperature display with glassmorphic card
3. Weather condition animations (rain, sun, snow)
4. 7-day forecast grid
5. Humidity, wind, UV index cards`,
    },
  ],

  variants: [
    {
      id: "weather-card-warm",
      name: "诗意天气暖色版",
      nameEn: "Weather Card Warm",
      description: "Warm-toned variant with sunset and golden hour palette",
      colors: {
        primary: "#f0a050",
        secondary: "#fff5e6",
        accent: ["#ff6b35", "#ffd700", "#e8a87c", "#c0e0f0"],
      },
    },
    {
      id: "weather-card-cool",
      name: "诗意天气冷色版",
      nameEn: "Weather Card Cool",
      description: "Cool-toned variant with winter and overcast palette",
      colors: {
        primary: "#6ba3be",
        secondary: "#e8f0f5",
        accent: ["#4a90b8", "#8cc0d8", "#b0c4d0", "#d0e8f0"],
      },
    },
  ],
};
