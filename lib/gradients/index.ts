// Gradient Library - Inspired by Grabient and other sources
// Provides pre-defined gradient palettes for design systems

export interface Gradient {
  id: string;
  name: string;
  nameZh: string;
  colors: string[];
  angle: number;
  css: string;
  tailwind: string;
  category: GradientCategory;
  mood: string[];
}

export type GradientCategory =
  | "warm"      // 暖色调
  | "cool"      // 冷色调
  | "vibrant"   // 鲜艳
  | "pastel"    // 柔和
  | "dark"      // 深色
  | "sunset"    // 日落
  | "nature"    // 自然
  | "neon";     // 霓虹

// Pre-defined gradient palettes
export const gradients: Gradient[] = [
  // === Warm Gradients ===
  {
    id: "sunrise-warmth",
    name: "Sunrise Warmth",
    nameZh: "暖日初升",
    colors: ["#ffffc4", "#ff6164", "#b00012"],
    angle: 135,
    css: "linear-gradient(135deg, #ffffc4 0%, #ff6164 50%, #b00012 100%)",
    tailwind: "bg-gradient-to-br from-[#ffffc4] via-[#ff6164] to-[#b00012]",
    category: "warm",
    mood: ["energetic", "passionate", "bold"],
  },
  {
    id: "peach-sunset",
    name: "Peach Sunset",
    nameZh: "蜜桃日落",
    colors: ["#ffecd2", "#fcb69f"],
    angle: 135,
    css: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    tailwind: "bg-gradient-to-br from-[#ffecd2] to-[#fcb69f]",
    category: "warm",
    mood: ["soft", "friendly", "approachable"],
  },
  {
    id: "orange-coral",
    name: "Orange Coral",
    nameZh: "橙珊瑚",
    colors: ["#ff9966", "#ff5e62"],
    angle: 90,
    css: "linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)",
    tailwind: "bg-gradient-to-r from-[#ff9966] to-[#ff5e62]",
    category: "warm",
    mood: ["creative", "playful", "energetic"],
  },

  // === Cool Gradients ===
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    nameZh: "深海蓝",
    colors: ["#2193b0", "#6dd5ed"],
    angle: 135,
    css: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
    tailwind: "bg-gradient-to-br from-[#2193b0] to-[#6dd5ed]",
    category: "cool",
    mood: ["calm", "trustworthy", "professional"],
  },
  {
    id: "turquoise-flow",
    name: "Turquoise Flow",
    nameZh: "绿松石流",
    colors: ["#07aeea", "#2bf598"],
    angle: 90,
    css: "linear-gradient(90deg, #07aeea 0%, #2bf598 100%)",
    tailwind: "bg-gradient-to-r from-[#07aeea] to-[#2bf598]",
    category: "cool",
    mood: ["fresh", "modern", "tech"],
  },
  {
    id: "midnight-city",
    name: "Midnight City",
    nameZh: "午夜都市",
    colors: ["#232526", "#414345"],
    angle: 180,
    css: "linear-gradient(180deg, #232526 0%, #414345 100%)",
    tailwind: "bg-gradient-to-b from-[#232526] to-[#414345]",
    category: "dark",
    mood: ["sophisticated", "elegant", "premium"],
  },

  // === Vibrant Gradients ===
  {
    id: "candy-pop",
    name: "Candy Pop",
    nameZh: "糖果波普",
    colors: ["#fada61", "#ff9188", "#ff5acd"],
    angle: 45,
    css: "linear-gradient(45deg, #fada61 0%, #ff9188 50%, #ff5acd 100%)",
    tailwind: "bg-gradient-to-tr from-[#fada61] via-[#ff9188] to-[#ff5acd]",
    category: "vibrant",
    mood: ["fun", "playful", "youthful"],
  },
  {
    id: "purple-dream",
    name: "Purple Dream",
    nameZh: "紫色梦境",
    colors: ["#4159d0", "#c84fc0", "#ffcd70"],
    angle: 45,
    css: "linear-gradient(45deg, #4159d0 0%, #c84fc0 50%, #ffcd70 100%)",
    tailwind: "bg-gradient-to-tr from-[#4159d0] via-[#c84fc0] to-[#ffcd70]",
    category: "vibrant",
    mood: ["creative", "magical", "inspiring"],
  },
  {
    id: "rainbow-mesh",
    name: "Rainbow Mesh",
    nameZh: "彩虹网格",
    colors: ["#ff0080", "#7928ca", "#0070f3"],
    angle: 135,
    css: "linear-gradient(135deg, #ff0080 0%, #7928ca 50%, #0070f3 100%)",
    tailwind: "bg-gradient-to-br from-[#ff0080] via-[#7928ca] to-[#0070f3]",
    category: "vibrant",
    mood: ["bold", "innovative", "dynamic"],
  },

  // === Pastel Gradients ===
  {
    id: "cotton-candy",
    name: "Cotton Candy",
    nameZh: "棉花糖",
    colors: ["#fbc2eb", "#a6c1ee"],
    angle: 135,
    css: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    tailwind: "bg-gradient-to-br from-[#fbc2eb] to-[#a6c1ee]",
    category: "pastel",
    mood: ["gentle", "feminine", "dreamy"],
  },
  {
    id: "mint-breeze",
    name: "Mint Breeze",
    nameZh: "薄荷微风",
    colors: ["#d4fc79", "#96e6a1"],
    angle: 90,
    css: "linear-gradient(90deg, #d4fc79 0%, #96e6a1 100%)",
    tailwind: "bg-gradient-to-r from-[#d4fc79] to-[#96e6a1]",
    category: "pastel",
    mood: ["fresh", "natural", "healthy"],
  },
  {
    id: "lavender-haze",
    name: "Lavender Haze",
    nameZh: "薰衣草雾",
    colors: ["#e0c3fc", "#8ec5fc"],
    angle: 135,
    css: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    tailwind: "bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc]",
    category: "pastel",
    mood: ["calm", "serene", "relaxing"],
  },

  // === Sunset Gradients ===
  {
    id: "golden-hour",
    name: "Golden Hour",
    nameZh: "黄金时刻",
    colors: ["#f6d365", "#fda085"],
    angle: 135,
    css: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    tailwind: "bg-gradient-to-br from-[#f6d365] to-[#fda085]",
    category: "sunset",
    mood: ["warm", "optimistic", "joyful"],
  },
  {
    id: "dusk-rose",
    name: "Dusk Rose",
    nameZh: "暮色玫瑰",
    colors: ["#ff758c", "#ff7eb3"],
    angle: 135,
    css: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
    tailwind: "bg-gradient-to-br from-[#ff758c] to-[#ff7eb3]",
    category: "sunset",
    mood: ["romantic", "soft", "inviting"],
  },
  {
    id: "twilight-purple",
    name: "Twilight Purple",
    nameZh: "暮光紫",
    colors: ["#667eea", "#764ba2"],
    angle: 135,
    css: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    tailwind: "bg-gradient-to-br from-[#667eea] to-[#764ba2]",
    category: "sunset",
    mood: ["mysterious", "elegant", "sophisticated"],
  },

  // === Nature Gradients ===
  {
    id: "forest-canopy",
    name: "Forest Canopy",
    nameZh: "森林穹顶",
    colors: ["#11998e", "#38ef7d"],
    angle: 135,
    css: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    tailwind: "bg-gradient-to-br from-[#11998e] to-[#38ef7d]",
    category: "nature",
    mood: ["natural", "growth", "sustainable"],
  },
  {
    id: "earth-tones",
    name: "Earth Tones",
    nameZh: "大地色调",
    colors: ["#a47451", "#9c9881", "#73a09d", "#3b899a", "#095b79", "#002847"],
    angle: 90,
    css: "linear-gradient(90deg, #a47451 0%, #9c9881 20%, #73a09d 40%, #3b899a 60%, #095b79 80%, #002847 100%)",
    tailwind: "bg-gradient-to-r from-[#a47451] via-[#73a09d] to-[#002847]",
    category: "nature",
    mood: ["grounded", "organic", "authentic"],
  },
  {
    id: "spring-meadow",
    name: "Spring Meadow",
    nameZh: "春日草甸",
    colors: ["#00b09b", "#96c93d"],
    angle: 135,
    css: "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)",
    tailwind: "bg-gradient-to-br from-[#00b09b] to-[#96c93d]",
    category: "nature",
    mood: ["fresh", "lively", "positive"],
  },

  // === Neon Gradients ===
  {
    id: "cyber-punk",
    name: "Cyber Punk",
    nameZh: "赛博朋克",
    colors: ["#f953c6", "#b91d73"],
    angle: 135,
    css: "linear-gradient(135deg, #f953c6 0%, #b91d73 100%)",
    tailwind: "bg-gradient-to-br from-[#f953c6] to-[#b91d73]",
    category: "neon",
    mood: ["futuristic", "bold", "edgy"],
  },
  {
    id: "electric-violet",
    name: "Electric Violet",
    nameZh: "电光紫",
    colors: ["#4776e6", "#8e54e9"],
    angle: 135,
    css: "linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)",
    tailwind: "bg-gradient-to-br from-[#4776e6] to-[#8e54e9]",
    category: "neon",
    mood: ["modern", "tech", "innovative"],
  },
  {
    id: "neon-life",
    name: "Neon Life",
    nameZh: "霓虹人生",
    colors: ["#b3ffab", "#12fff7"],
    angle: 135,
    css: "linear-gradient(135deg, #b3ffab 0%, #12fff7 100%)",
    tailwind: "bg-gradient-to-br from-[#b3ffab] to-[#12fff7]",
    category: "neon",
    mood: ["vibrant", "energetic", "exciting"],
  },
  {
    id: "hyper-blue",
    name: "Hyper Blue",
    nameZh: "超级蓝",
    colors: ["#00c6ff", "#0072ff"],
    angle: 90,
    css: "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
    tailwind: "bg-gradient-to-r from-[#00c6ff] to-[#0072ff]",
    category: "neon",
    mood: ["tech", "professional", "trustworthy"],
  },

  // === Dark Gradients ===
  {
    id: "deep-space",
    name: "Deep Space",
    nameZh: "深空",
    colors: ["#000428", "#004e92"],
    angle: 135,
    css: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
    tailwind: "bg-gradient-to-br from-[#000428] to-[#004e92]",
    category: "dark",
    mood: ["mysterious", "vast", "professional"],
  },
  {
    id: "royal-black",
    name: "Royal Black",
    nameZh: "皇家黑",
    colors: ["#141e30", "#243b55"],
    angle: 135,
    css: "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
    tailwind: "bg-gradient-to-br from-[#141e30] to-[#243b55]",
    category: "dark",
    mood: ["luxurious", "elegant", "premium"],
  },
  {
    id: "dark-knight",
    name: "Dark Knight",
    nameZh: "暗黑骑士",
    colors: ["#0f0c29", "#302b63", "#24243e"],
    angle: 135,
    css: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    tailwind: "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]",
    category: "dark",
    mood: ["powerful", "sleek", "modern"],
  },
];

// Get gradients by category
export function getGradientsByCategory(category: GradientCategory): Gradient[] {
  return gradients.filter((g) => g.category === category);
}

// Get gradient by ID
export function getGradientById(id: string): Gradient | undefined {
  return gradients.find((g) => g.id === id);
}

// Get gradients by mood
export function getGradientsByMood(mood: string): Gradient[] {
  return gradients.filter((g) =>
    g.mood.some((m) => m.toLowerCase().includes(mood.toLowerCase()))
  );
}

// Generate CSS custom properties for a gradient
export function generateGradientCSSVariables(gradient: Gradient): string {
  const vars = gradient.colors.map((color, i) =>
    `  --gradient-color-${i + 1}: ${color};`
  ).join("\n");

  return `:root {\n${vars}\n  --gradient: ${gradient.css};\n}`;
}

// Get all gradient categories with counts
export function getGradientCategories(): { category: GradientCategory; count: number; labelZh: string }[] {
  const categoryLabels: Record<GradientCategory, string> = {
    warm: "暖色调",
    cool: "冷色调",
    vibrant: "鲜艳",
    pastel: "柔和",
    dark: "深色",
    sunset: "日落",
    nature: "自然",
    neon: "霓虹",
  };

  const categories = [...new Set(gradients.map((g) => g.category))];
  return categories.map((category) => ({
    category,
    count: gradients.filter((g) => g.category === category).length,
    labelZh: categoryLabels[category],
  }));
}

// Recommend gradients based on style
export function recommendGradientsForStyle(styleSlug: string): Gradient[] {
  const styleGradientMap: Record<string, GradientCategory[]> = {
    "neo-brutalist": ["vibrant", "neon"],
    "neo-brutalist-soft": ["pastel", "warm"],
    "neo-brutalist-playful": ["vibrant", "pastel"],
    "glassmorphism": ["vibrant", "sunset", "neon"],
    "neumorphism": ["pastel", "cool"],
    "editorial": ["warm", "nature"],
    "cyberpunk-neon": ["neon", "dark"],
    "modern-gradient": ["vibrant", "sunset", "neon"],
    "natural-organic": ["nature", "pastel"],
    "dark-mode": ["dark", "cool"],
    "soft-ui": ["pastel", "warm"],
  };

  const categories = styleGradientMap[styleSlug] || ["vibrant", "cool"];
  return gradients.filter((g) => categories.includes(g.category)).slice(0, 6);
}
