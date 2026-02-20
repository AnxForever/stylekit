import { DesignStyle } from "./index";

export const tropicalParadise: DesignStyle = {
  slug: "tropical-paradise",
  name: "热带天堂",
  nameEn: "Tropical Paradise",
  description:
    "热带度假风设计，棕榈叶、鲜艳花卉色彩、阳光沙滩的明快基调。适合旅游、度假村、生活方式和餐饮品牌。",
  cover: "/styles/tropical-paradise.svg",
  styleType: "visual",
  tags: ["modern", "expressive"],
  category: "modern",
  colors: {
    primary: "#00897b",
    secondary: "#fffde7",
    accent: ["#ff6f61", "#ffc107", "#4caf50"],
  },
  keywords: ["热带", "天堂", "棕榈", "花卉", "阳光", "度假", "明快"],

  philosophy: `Tropical Paradise（热带天堂）风格汲取热带岛屿的自然色彩与度假氛围，将阳光、海洋、棕榈叶和热带花卉的鲜活能量注入数字界面。

核心理念：
- 明快色彩：珊瑚红、芒果黄、棕榈绿与蓝绿色的大胆组合，传递热带的活力与热情
- 阳光基调：温暖的淡黄底色如同阳光洒落的沙滩，让人感到放松与愉悦
- 自然灵感：棕榈叶的有机形态、花卉的缤纷色彩融入设计元素中
- 度假体验：整体氛围传达轻松、自在、充满期待的度假感受

这种风格非常适合旅游度假村、热带餐饮、冲浪品牌、热带水果饮料、岛屿婚礼策划以及户外生活方式品牌。

设计时应大胆使用鲜艳色彩但保持协调，通过圆润的形状和充足的留白让画面保持通透感。热带风格不是杂乱无章的色彩堆砌，而是像热带花园一样——缤纷却有秩序，热烈却不失优雅。`,

  doList: [
    "使用蓝绿主色 #00897b 搭配暖黄底色 #fffde7",
    "强调色使用珊瑚红 #ff6f61 和芒果黄 #ffc107",
    "圆角使用 rounded-2xl 或 rounded-full，传达柔和度假感",
    "阴影使用彩色温暖阴影如 shadow-[0_4px_20px_rgba(0,137,123,0.2)]",
    "使用大号圆润字体，标题可搭配 font-bold 和 tracking-tight",
    "交互状态明快活泼：hover 时使用亮色变化",
    "背景可使用微妙的暖色渐变 from-[#fffde7] to-[#fff8e1]",
    "保持充足的留白和通透感",
    "hover 使用波浪漂浮感（轻旋转+上浮+小幅 scale），避免机械位移",
    "阴影强调热带阳光色彩（teal/coral）而非灰黑阴影",
    "卡片装饰点在 hover 时可做微幅弹动，模拟海风拂动",
  ],

  dontList: [
    "禁止使用深色/黑色背景主题",
    "禁止使用灰色调为主的配色",
    "禁止使用尖锐的直角和棱角 rounded-none",
    "禁止使用沉闷的暗色调",
    "禁止使用过于密集的布局",
    "禁止使用冷色调的阴影",
    "禁止使用过于正式的衬线字体",
    "禁止使用僵硬的短促线性动画破坏度假松弛感",
    "禁止使用暗灰重阴影替代热带彩色光晕",
  ],

  components: {
    button: {
      name: "按钮",
      description: "热带天堂风格按钮，圆润鲜艳",
      code: `<button className="
  px-10 py-4
  bg-[#00897b] text-white
  rounded-full font-bold tracking-wide
  shadow-[0_6px_20px_rgba(0,137,123,0.3)]
  hover:bg-[#00796b]
  hover:shadow-[0_10px_30px_rgba(0,137,123,0.4)]
  hover:-translate-y-1 hover:scale-105
  active:scale-95
  active:shadow-[0_2px_10px_rgba(0,137,123,0.3)]
  transition-all duration-300 ease-in-out
">
  Book Escape
</button>`,
    },
    card: {
      name: "卡片",
      description: "热带天堂风格卡片，温暖明快",
      code: `<div className="
  group p-8
  bg-white
  border border-[#00897b]/10
  rounded-[2rem]
  shadow-[0_8px_30px_rgba(0,137,123,0.08)]
  hover:shadow-[0_20px_50px_rgba(0,137,123,0.15)]
  hover:-translate-y-2 hover:rotate-1 hover:scale-[1.02]
  transition-all duration-500 ease-in-out
  cursor-pointer
">
  <div className="flex items-center gap-3 mb-6">
    <span className="inline-block w-3 h-3 rounded-full bg-[#ff6f61] group-hover:scale-125 transition-transform duration-300" />
    <span className="inline-block w-3 h-3 rounded-full bg-[#ffc107] group-hover:scale-125 transition-transform duration-300 delay-75" />
    <span className="inline-block w-3 h-3 rounded-full bg-[#4caf50] group-hover:scale-125 transition-transform duration-300 delay-150" />
  </div>
  <h3 className="text-2xl font-bold text-[#00897b] mb-3 group-hover:text-[#ff6f61] transition-colors duration-300">
    Bali Retreat
  </h3>
  <p className="text-gray-600 font-medium leading-relaxed mb-5">
    Escape to paradise with crystal waters and swaying palms. Let the warm breeze carry your worries away.
  </p>
  <div className="pt-4 border-t border-[#00897b]/10">
    <span className="text-[#ff6f61] font-black text-lg group-hover:tracking-wide transition-all duration-300">From $299/night</span>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "热带天堂风格输入框",
      code: `<input
  type="text"
  placeholder="Where to next?"
  className="
    w-full px-5 py-3
    bg-white
    border-2 border-[#00897b]/20
    rounded-full
    text-gray-800 placeholder-[#00897b]/40
    font-medium
    focus:border-[#00897b]
    focus:shadow-[0_0_0_3px_rgba(0,137,123,0.15)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "热带天堂风格 Hero 区域",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#fffde7] to-[#fff8e1]
  relative overflow-hidden
">
  <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#ffc107]/10 blur-3xl" />
  <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#00897b]/10 blur-3xl" />
  <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#ff6f61]/10 blur-2xl" />

  <div className="relative z-10 text-center px-6 max-w-3xl">
    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ff6f61]/10 rounded-full mb-6">
      <span className="w-2 h-2 rounded-full bg-[#ff6f61]" />
      <span className="text-sm font-medium text-[#ff6f61]">Paradise Awaits</span>
    </div>
    <h1 className="text-5xl md:text-7xl font-bold text-[#00897b] mb-6 leading-tight">
      Tropical Paradise
    </h1>
    <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
      Sun-kissed shores, crystal waters, and endless summer vibes await your next adventure.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="
        px-8 py-3 bg-[#00897b] text-white rounded-full font-bold
        shadow-[0_4px_16px_rgba(0,137,123,0.3)]
        hover:bg-[#00796b] hover:-translate-y-0.5
        transition-all duration-300
      ">
        Explore Destinations
      </button>
      <button className="
        px-8 py-3 bg-white text-[#00897b] rounded-full font-bold
        border-2 border-[#00897b]/20
        hover:border-[#00897b] hover:-translate-y-0.5
        transition-all duration-300
      ">
        View Gallery
      </button>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Tropical Paradise 全局样式 */

:root {
  --tp-teal: #00897b;
  --tp-teal-dark: #00796b;
  --tp-sunshine: #fffde7;
  --tp-coral: #ff6f61;
  --tp-mango: #ffc107;
  --tp-palm: #4caf50;
}

/* 阳光渐变背景 */
.tp-sunshine-bg {
  background: linear-gradient(180deg, var(--tp-sunshine) 0%, #fff8e1 100%);
}

/* 热带色彩渐变 */
.tp-tropical-gradient {
  background: linear-gradient(135deg, var(--tp-teal) 0%, var(--tp-palm) 100%);
}

/* 珊瑚强调 */
.tp-coral-accent {
  background-color: rgba(255, 111, 97, 0.1);
  color: var(--tp-coral);
}

/* 棕榈叶装饰阴影 */
.tp-palm-shadow {
  box-shadow: 0 4px 20px rgba(0, 137, 123, 0.15);
}

/* 度假卡片悬停效果 */
.tp-card-hover {
  transition: all 0.3s ease;
}
.tp-card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 137, 123, 0.2);
}`,

  aiRules: `你是一个 Tropical Paradise 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用深色/黑色背景
- 使用灰色调为主的配色
- 使用 rounded-none 直角
- 使用沉闷暗色调
- 使用冷色调阴影
- 使用衬线字体

## 必须遵守

- 蓝绿主色 #00897b，暖黄底色 #fffde7
- 强调色：珊瑚红 #ff6f61, 芒果黄 #ffc107, 棕榈绿 #4caf50
- 使用 rounded-2xl 或 rounded-full 圆润边角
- 温暖彩色阴影 shadow-[0_4px_20px_rgba(0,137,123,0.15)]
- 充足留白和通透感
- hover 效果使用 -translate-y 上浮

## 配色

主色调：
- 蓝绿: #00897b
- 阳光白: #fffde7
- 珊瑚红: #ff6f61
- 芒果黄: #ffc107
- 棕榈绿: #4caf50

## 特殊元素

- 圆形装饰模糊球 (blur-3xl)
- 彩色小圆点装饰
- 渐变背景 from-[#fffde7] to-[#fff8e1]
- 明快的 hover 上浮动画

## Animation & Interaction Rules

- Wave Drift: hover 使用轻旋转 + 上浮 + 微缩放（如 -translate-y-2 rotate-1 scale-[1.02]），并配合 duration-500 ease-in-out。
- Tropical Sun Glow: 悬停阴影扩散需采用 teal/coral 等热带色，不用暗灰阴影。
- Breeze Response: 彩色装饰点在 hover 产生短促微弹动，模拟海风吹拂。
- Fluid Clicks: active 使用柔和 scale-95 与阴影收敛，营造踩在沙滩上的下压感。`,

  examplePrompts: [
    {
      title: "度假村预订页面",
      titleEn: "Resort Booking Page",
      description: "热带天堂风格的度假村展示",
      descriptionEn: "Resort showcase in Tropical Paradise style",
      prompt: `用 Tropical Paradise 风格创建一个度假村预订页面，要求：
1. 背景：阳光白渐变，添加彩色装饰模糊球
2. Hero：大标题 + 搜索框，蓝绿色调
3. 卡片：白色圆角，温暖阴影，悬停上浮
4. 价格标签：珊瑚红强调
5. 整体传达阳光明快的度假氛围`,
    },
  ],
};
