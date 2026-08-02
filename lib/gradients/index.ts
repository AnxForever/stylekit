// Gradient Library - Inspired by Grabient and other sources
// Provides pre-defined gradient palettes for design systems

export type GradientType = "linear" | "radial" | "conic" | "mesh";

export interface Gradient {
  id: string;
  name: string;
  nameZh: string;
  colors: string[];
  angle: number;
  /** Gradient family. Defaults to "linear" when omitted (the original palettes). */
  type?: GradientType;
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

  // === Mesh Gradients (layered radial blobs — the modern trend) ===
  {
    id: "aurora-mesh",
    name: "Aurora Mesh",
    nameZh: "极光网格",
    colors: ["#7c3aed", "#2563eb", "#06b6d4"],
    angle: 0,
    type: "mesh",
    css: "radial-gradient(at 20% 25%, #7c3aed 0px, transparent 55%), radial-gradient(at 75% 20%, #2563eb 0px, transparent 55%), radial-gradient(at 50% 80%, #06b6d4 0px, transparent 55%), radial-gradient(at 50% 50%, #0a0e27 0px, #0a0e27 100%)",
    tailwind: "bg-[radial-gradient(at_20%_25%,#7c3aed_0px,transparent_55%),radial-gradient(at_75%_20%,#2563eb_0px,transparent_55%),radial-gradient(at_50%_80%,#06b6d4_0px,transparent_55%),radial-gradient(at_50%_50%,#0a0e27_0px,#0a0e27_100%)]",
    category: "cool",
    mood: ["ethereal", "dreamy", "modern"],
  },
  {
    id: "sunset-mesh",
    name: "Sunset Mesh",
    nameZh: "日落网格",
    colors: ["#fb923c", "#f43f5e", "#c026d3"],
    angle: 0,
    type: "mesh",
    css: "radial-gradient(at 15% 30%, #fb923c 0px, transparent 55%), radial-gradient(at 80% 25%, #f43f5e 0px, transparent 55%), radial-gradient(at 50% 85%, #c026d3 0px, transparent 55%), radial-gradient(at 50% 50%, #1a0a2e 0px, #1a0a2e 100%)",
    tailwind: "bg-[radial-gradient(at_15%_30%,#fb923c_0px,transparent_55%),radial-gradient(at_80%_25%,#f43f5e_0px,transparent_55%),radial-gradient(at_50%_85%,#c026d3_0px,transparent_55%),radial-gradient(at_50%_50%,#1a0a2e_0px,#1a0a2e_100%)]",
    category: "sunset",
    mood: ["warm", "vibrant", "atmospheric"],
  },
  {
    id: "neon-mesh",
    name: "Neon Mesh",
    nameZh: "霓虹网格",
    colors: ["#22d3ee", "#ec4899", "#a3e635"],
    angle: 0,
    type: "mesh",
    css: "radial-gradient(at 25% 25%, #22d3ee 0px, transparent 50%), radial-gradient(at 75% 30%, #ec4899 0px, transparent 50%), radial-gradient(at 50% 80%, #a3e635 0px, transparent 50%), radial-gradient(at 50% 50%, #0c0a1d 0px, #0c0a1d 100%)",
    tailwind: "bg-[radial-gradient(at_25%_25%,#22d3ee_0px,transparent_50%),radial-gradient(at_75%_30%,#ec4899_0px,transparent_50%),radial-gradient(at_50%_80%,#a3e635_0px,transparent_50%),radial-gradient(at_50%_50%,#0c0a1d_0px,#0c0a1d_100%)]",
    category: "neon",
    mood: ["electric", "bold", "futuristic"],
  },
  {
    id: "pastel-dream-mesh",
    name: "Pastel Dream",
    nameZh: "柔梦网格",
    colors: ["#fbcfe8", "#bfdbfe", "#fef08a"],
    angle: 0,
    type: "mesh",
    css: "radial-gradient(at 20% 30%, #fbcfe8 0px, transparent 55%), radial-gradient(at 80% 20%, #bfdbfe 0px, transparent 55%), radial-gradient(at 60% 80%, #fef08a 0px, transparent 55%), radial-gradient(at 50% 50%, #fdf4ff 0px, #fdf4ff 100%)",
    tailwind: "bg-[radial-gradient(at_20%_30%,#fbcfe8_0px,transparent_55%),radial-gradient(at_80%_20%,#bfdbfe_0px,transparent_55%),radial-gradient(at_60%_80%,#fef08a_0px,transparent_55%),radial-gradient(at_50%_50%,#fdf4ff_0px,#fdf4ff_100%)]",
    category: "pastel",
    mood: ["soft", "gentle", "airy"],
  },
  {
    id: "ocean-depth-mesh",
    name: "Ocean Depth",
    nameZh: "深海网格",
    colors: ["#0ea5e9", "#14b8a6", "#6366f1"],
    angle: 0,
    type: "mesh",
    css: "radial-gradient(at 30% 25%, #0ea5e9 0px, transparent 55%), radial-gradient(at 70% 35%, #14b8a6 0px, transparent 55%), radial-gradient(at 50% 85%, #6366f1 0px, transparent 55%), radial-gradient(at 50% 50%, #021526 0px, #021526 100%)",
    tailwind: "bg-[radial-gradient(at_30%_25%,#0ea5e9_0px,transparent_55%),radial-gradient(at_70%_35%,#14b8a6_0px,transparent_55%),radial-gradient(at_50%_85%,#6366f1_0px,transparent_55%),radial-gradient(at_50%_50%,#021526_0px,#021526_100%)]",
    category: "cool",
    mood: ["deep", "calm", "immersive"],
  },
  {
    id: "ember-glow-mesh",
    name: "Ember Glow",
    nameZh: "余烬网格",
    colors: ["#ef4444", "#f97316", "#eab308"],
    angle: 0,
    type: "mesh",
    css: "radial-gradient(at 25% 30%, #ef4444 0px, transparent 55%), radial-gradient(at 75% 25%, #f97316 0px, transparent 55%), radial-gradient(at 55% 80%, #eab308 0px, transparent 55%), radial-gradient(at 50% 50%, #170a05 0px, #170a05 100%)",
    tailwind: "bg-[radial-gradient(at_25%_30%,#ef4444_0px,transparent_55%),radial-gradient(at_75%_25%,#f97316_0px,transparent_55%),radial-gradient(at_55%_80%,#eab308_0px,transparent_55%),radial-gradient(at_50%_50%,#170a05_0px,#170a05_100%)]",
    category: "warm",
    mood: ["fiery", "intense", "glowing"],
  },
  {
    id: "cotton-candy-mesh",
    name: "Cotton Candy",
    nameZh: "棉花糖网格",
    colors: ["#f9a8d4", "#d8b4fe", "#a5b4fc"],
    angle: 0,
    type: "mesh",
    css: "radial-gradient(at 20% 25%, #f9a8d4 0px, transparent 55%), radial-gradient(at 80% 30%, #d8b4fe 0px, transparent 55%), radial-gradient(at 50% 80%, #a5b4fc 0px, transparent 55%), radial-gradient(at 50% 50%, #fdf2f8 0px, #fdf2f8 100%)",
    tailwind: "bg-[radial-gradient(at_20%_25%,#f9a8d4_0px,transparent_55%),radial-gradient(at_80%_30%,#d8b4fe_0px,transparent_55%),radial-gradient(at_50%_80%,#a5b4fc_0px,transparent_55%),radial-gradient(at_50%_50%,#fdf2f8_0px,#fdf2f8_100%)]",
    category: "pastel",
    mood: ["sweet", "playful", "light"],
  },
  {
    id: "midnight-bloom-mesh",
    name: "Midnight Bloom",
    nameZh: "午夜绽放",
    colors: ["#8b5cf6", "#ec4899", "#3b82f6"],
    angle: 0,
    type: "mesh",
    css: "radial-gradient(at 30% 20%, #8b5cf6 0px, transparent 55%), radial-gradient(at 70% 25%, #ec4899 0px, transparent 55%), radial-gradient(at 50% 75%, #3b82f6 0px, transparent 55%), radial-gradient(at 50% 50%, #0a0118 0px, #0a0118 100%)",
    tailwind: "bg-[radial-gradient(at_30%_20%,#8b5cf6_0px,transparent_55%),radial-gradient(at_70%_25%,#ec4899_0px,transparent_55%),radial-gradient(at_50%_75%,#3b82f6_0px,transparent_55%),radial-gradient(at_50%_50%,#0a0118_0px,#0a0118_100%)]",
    category: "dark",
    mood: ["mysterious", "rich", "elegant"],
  },

  // === Radial Gradients ===
  {
    id: "radial-sunburst",
    name: "Radial Sunburst",
    nameZh: "放射朝阳",
    colors: ["#fde047", "#f97316", "#b91c1c"],
    angle: 0,
    type: "radial",
    css: "radial-gradient(circle at 50% 40%, #fde047 0%, #f97316 45%, #b91c1c 100%)",
    tailwind: "bg-[radial-gradient(circle_at_50%_40%,#fde047_0%,#f97316_45%,#b91c1c_100%)]",
    category: "warm",
    mood: ["radiant", "bold", "energetic"],
  },
  {
    id: "radial-spotlight",
    name: "Radial Spotlight",
    nameZh: "聚光灯",
    colors: ["#a5f3fc", "#0891b2", "#164e63"],
    angle: 0,
    type: "radial",
    css: "radial-gradient(circle at 50% 30%, #a5f3fc 0%, #0891b2 50%, #164e63 100%)",
    tailwind: "bg-[radial-gradient(circle_at_50%_30%,#a5f3fc_0%,#0891b2_50%,#164e63_100%)]",
    category: "cool",
    mood: ["focused", "clean", "calm"],
  },

  // === Conic Gradients ===
  {
    id: "conic-spectrum",
    name: "Conic Spectrum",
    nameZh: "锥形光谱",
    colors: ["#ef4444", "#f59e0b", "#06b6d4", "#d946ef"],
    angle: 0,
    type: "conic",
    css: "conic-gradient(from 0deg at 50% 50%, #ef4444, #f59e0b, #84cc16, #06b6d4, #6366f1, #d946ef, #ef4444)",
    tailwind: "bg-[conic-gradient(from_0deg_at_50%_50%,#ef4444,#f59e0b,#84cc16,#06b6d4,#6366f1,#d946ef,#ef4444)]",
    category: "vibrant",
    mood: ["spectral", "playful", "vivid"],
  },
  {
    id: "conic-twilight",
    name: "Conic Twilight",
    nameZh: "锥形暮光",
    colors: ["#1e3a8a", "#3b82f6", "#93c5fd"],
    angle: 180,
    type: "conic",
    css: "conic-gradient(from 180deg at 50% 50%, #1e3a8a, #6366f1, #3b82f6, #93c5fd, #3b82f6, #6366f1, #1e3a8a)",
    tailwind: "bg-[conic-gradient(from_180deg_at_50%_50%,#1e3a8a,#6366f1,#3b82f6,#93c5fd,#3b82f6,#6366f1,#1e3a8a)]",
    category: "cool",
    mood: ["serene", "twilight", "smooth"],
  },

  // === Batch 2: community classics adapted from uiGradients (MIT, ghosh/uiGradients) ===
  {
    id: "cherry",
    name: "Cherry",
    nameZh: "樱桃",
    colors: ["#eb3349", "#f45c43"],
    angle: 135,
    css: "linear-gradient(135deg, #eb3349 0%, #f45c43 100%)",
    tailwind: "bg-gradient-to-br from-[#eb3349] to-[#f45c43]",
    category: "warm",
    mood: ["bold", "appetizing", "energetic"],
  },
  {
    id: "purple-love",
    name: "Purple Love",
    nameZh: "紫恋",
    colors: ["#cc2b5e", "#753a88"],
    angle: 135,
    css: "linear-gradient(135deg, #cc2b5e 0%, #753a88 100%)",
    tailwind: "bg-gradient-to-br from-[#cc2b5e] to-[#753a88]",
    category: "vibrant",
    mood: ["romantic", "rich", "expressive"],
  },
  {
    id: "aqua-marine",
    name: "Aqua Marine",
    nameZh: "碧海",
    colors: ["#1a2980", "#26d0ce"],
    angle: 135,
    css: "linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)",
    tailwind: "bg-gradient-to-br from-[#1a2980] to-[#26d0ce]",
    category: "cool",
    mood: ["deep", "aquatic", "calm"],
  },
  {
    id: "bloody-mary",
    name: "Bloody Mary",
    nameZh: "血腥玛丽",
    colors: ["#ff512f", "#dd2476"],
    angle: 135,
    css: "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)",
    tailwind: "bg-gradient-to-br from-[#ff512f] to-[#dd2476]",
    category: "vibrant",
    mood: ["fiery", "bold", "dramatic"],
  },
  {
    id: "kashmir",
    name: "Kashmir",
    nameZh: "克什米尔",
    colors: ["#614385", "#516395"],
    angle: 135,
    css: "linear-gradient(135deg, #614385 0%, #516395 100%)",
    tailwind: "bg-gradient-to-br from-[#614385] to-[#516395]",
    category: "cool",
    mood: ["muted", "twilight", "refined"],
  },
  {
    id: "emerald-water",
    name: "Emerald Water",
    nameZh: "翡翠之水",
    colors: ["#348f50", "#56b4d3"],
    angle: 135,
    css: "linear-gradient(135deg, #348f50 0%, #56b4d3 100%)",
    tailwind: "bg-gradient-to-br from-[#348f50] to-[#56b4d3]",
    category: "nature",
    mood: ["fresh", "aquatic", "natural"],
  },
  {
    id: "mango-pulp",
    name: "Mango",
    nameZh: "芒果",
    colors: ["#ffe259", "#ffa751"],
    angle: 135,
    css: "linear-gradient(135deg, #ffe259 0%, #ffa751 100%)",
    tailwind: "bg-gradient-to-br from-[#ffe259] to-[#ffa751]",
    category: "warm",
    mood: ["sunny", "cheerful", "juicy"],
  },
  {
    id: "mojito",
    name: "Mojito",
    nameZh: "莫吉托",
    colors: ["#1d976c", "#93f9b9"],
    angle: 135,
    css: "linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)",
    tailwind: "bg-gradient-to-br from-[#1d976c] to-[#93f9b9]",
    category: "nature",
    mood: ["fresh", "minty", "lively"],
  },
  {
    id: "quepal",
    name: "Quepal",
    nameZh: "翠谷",
    colors: ["#11998e", "#38ef7d"],
    angle: 135,
    css: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    tailwind: "bg-gradient-to-br from-[#11998e] to-[#38ef7d]",
    category: "nature",
    mood: ["vivid", "fresh", "energetic"],
  },
  {
    id: "frost",
    name: "Frost",
    nameZh: "霜寒",
    colors: ["#000428", "#004e92"],
    angle: 135,
    css: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
    tailwind: "bg-gradient-to-br from-[#000428] to-[#004e92]",
    category: "dark",
    mood: ["cold", "deep", "nocturnal"],
  },
  {
    id: "lush",
    name: "Lush",
    nameZh: "葱郁",
    colors: ["#56ab2f", "#a8e063"],
    angle: 135,
    css: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
    tailwind: "bg-gradient-to-br from-[#56ab2f] to-[#a8e063]",
    category: "nature",
    mood: ["verdant", "organic", "fresh"],
  },
  {
    id: "amethyst",
    name: "Amethyst",
    nameZh: "紫水晶",
    colors: ["#9d50bb", "#6e48aa"],
    angle: 135,
    css: "linear-gradient(135deg, #9d50bb 0%, #6e48aa 100%)",
    tailwind: "bg-gradient-to-br from-[#9d50bb] to-[#6e48aa]",
    category: "vibrant",
    mood: ["jewel", "mystical", "rich"],
  },
  {
    id: "dracula",
    name: "Dracula",
    nameZh: "德古拉",
    colors: ["#dc2424", "#4a569d"],
    angle: 135,
    css: "linear-gradient(135deg, #dc2424 0%, #4a569d 100%)",
    tailwind: "bg-gradient-to-br from-[#dc2424] to-[#4a569d]",
    category: "dark",
    mood: ["gothic", "moody", "dramatic"],
  },
  {
    id: "kyoto",
    name: "Kyoto",
    nameZh: "京都",
    colors: ["#c21500", "#ffc500"],
    angle: 135,
    css: "linear-gradient(135deg, #c21500 0%, #ffc500 100%)",
    tailwind: "bg-gradient-to-br from-[#c21500] to-[#ffc500]",
    category: "sunset",
    mood: ["autumnal", "warm", "intense"],
  },
  {
    id: "purpink",
    name: "Purpink",
    nameZh: "紫粉",
    colors: ["#7f00ff", "#e100ff"],
    angle: 135,
    css: "linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)",
    tailwind: "bg-gradient-to-br from-[#7f00ff] to-[#e100ff]",
    category: "neon",
    mood: ["electric", "bold", "digital"],
  },
  {
    id: "superman",
    name: "Superman",
    nameZh: "超人",
    colors: ["#0099f7", "#f11712"],
    angle: 135,
    css: "linear-gradient(135deg, #0099f7 0%, #f11712 100%)",
    tailwind: "bg-gradient-to-br from-[#0099f7] to-[#f11712]",
    category: "vibrant",
    mood: ["heroic", "high-contrast", "bold"],
  },
  {
    id: "harvey",
    name: "Harvey",
    nameZh: "哈维",
    colors: ["#1f4037", "#99f2c8"],
    angle: 135,
    css: "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)",
    tailwind: "bg-gradient-to-br from-[#1f4037] to-[#99f2c8]",
    category: "nature",
    mood: ["forest", "calm", "fresh"],
  },
  {
    id: "moonlit-asteroid",
    name: "Moonlit Asteroid",
    nameZh: "月照星体",
    colors: ["#0f2027", "#203a43", "#2c5364"],
    angle: 135,
    css: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    tailwind: "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]",
    category: "dark",
    mood: ["nocturnal", "deep", "cinematic"],
  },
  {
    id: "jshine",
    name: "JShine",
    nameZh: "光耀",
    colors: ["#12c2e9", "#c471ed", "#f64f59"],
    angle: 135,
    css: "linear-gradient(135deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)",
    tailwind: "bg-gradient-to-br from-[#12c2e9] via-[#c471ed] to-[#f64f59]",
    category: "vibrant",
    mood: ["playful", "colorful", "energetic"],
  },
  {
    id: "hazel",
    name: "Hazel",
    nameZh: "榛色",
    colors: ["#77a1d3", "#79cbca", "#e684ae"],
    angle: 135,
    css: "linear-gradient(135deg, #77a1d3 0%, #79cbca 50%, #e684ae 100%)",
    tailwind: "bg-gradient-to-br from-[#77a1d3] via-[#79cbca] to-[#e684ae]",
    category: "pastel",
    mood: ["soft", "dreamy", "gentle"],
  },
  {
    id: "cool-sky",
    name: "Cool Sky",
    nameZh: "凉爽天空",
    colors: ["#2980b9", "#6dd5fa", "#ffffff"],
    angle: 135,
    css: "linear-gradient(135deg, #2980b9 0%, #6dd5fa 50%, #ffffff 100%)",
    tailwind: "bg-gradient-to-br from-[#2980b9] via-[#6dd5fa] to-white",
    category: "cool",
    mood: ["airy", "clean", "bright"],
  },
  {
    id: "sin-city-red",
    name: "Sin City Red",
    nameZh: "罪恶之城",
    colors: ["#ed213a", "#93291e"],
    angle: 135,
    css: "linear-gradient(135deg, #ed213a 0%, #93291e 100%)",
    tailwind: "bg-gradient-to-br from-[#ed213a] to-[#93291e]",
    category: "dark",
    mood: ["intense", "noir", "dramatic"],
  },
  {
    id: "rainbow-blue",
    name: "Rainbow Blue",
    nameZh: "蓝虹",
    colors: ["#00f260", "#0575e6"],
    angle: 135,
    css: "linear-gradient(135deg, #00f260 0%, #0575e6 100%)",
    tailwind: "bg-gradient-to-br from-[#00f260] to-[#0575e6]",
    category: "vibrant",
    mood: ["fresh", "electric", "lively"],
  },
  {
    id: "sublime-light",
    name: "Sublime Light",
    nameZh: "轻盈崇高",
    colors: ["#fc5c7d", "#6a82fb"],
    angle: 135,
    css: "linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)",
    tailwind: "bg-gradient-to-br from-[#fc5c7d] to-[#6a82fb]",
    category: "pastel",
    mood: ["soft", "romantic", "modern"],
  },
  {
    id: "bighead",
    name: "Bighead",
    nameZh: "大头",
    colors: ["#c94b4b", "#4b134f"],
    angle: 135,
    css: "linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)",
    tailwind: "bg-gradient-to-br from-[#c94b4b] to-[#4b134f]",
    category: "dark",
    mood: ["moody", "warm-dark", "rich"],
  },
  {
    id: "taran-tado",
    name: "Taran Tado",
    nameZh: "塔兰塔多",
    colors: ["#23074d", "#cc5333"],
    angle: 135,
    css: "linear-gradient(135deg, #23074d 0%, #cc5333 100%)",
    tailwind: "bg-gradient-to-br from-[#23074d] to-[#cc5333]",
    category: "sunset",
    mood: ["dusky", "warm", "cinematic"],
  },
  {
    id: "relay",
    name: "Relay",
    nameZh: "接力",
    colors: ["#3a1c71", "#d76d77", "#ffaf7b"],
    angle: 135,
    css: "linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)",
    tailwind: "bg-gradient-to-br from-[#3a1c71] via-[#d76d77] to-[#ffaf7b]",
    category: "sunset",
    mood: ["warm", "romantic", "layered"],
  },
  {
    id: "celestial",
    name: "Celestial",
    nameZh: "天界",
    colors: ["#c33764", "#1d2671"],
    angle: 135,
    css: "linear-gradient(135deg, #c33764 0%, #1d2671 100%)",
    tailwind: "bg-gradient-to-br from-[#c33764] to-[#1d2671]",
    category: "dark",
    mood: ["cosmic", "deep", "mysterious"],
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
export function getGradientCategories(): {
  category: GradientCategory;
  count: number;
  labelZh: string;
  labelEn: string;
}[] {
  const categoryLabelsZh: Record<GradientCategory, string> = {
    warm: "暖色调",
    cool: "冷色调",
    vibrant: "鲜艳",
    pastel: "柔和",
    dark: "深色",
    sunset: "日落",
    nature: "自然",
    neon: "霓虹",
  };

  const categoryLabelsEn: Record<GradientCategory, string> = {
    warm: "Warm",
    cool: "Cool",
    vibrant: "Vibrant",
    pastel: "Pastel",
    dark: "Dark",
    sunset: "Sunset",
    nature: "Nature",
    neon: "Neon",
  };

  const categories = [...new Set(gradients.map((g) => g.category))];
  return categories.map((category) => ({
    category,
    count: gradients.filter((g) => g.category === category).length,
    labelZh: categoryLabelsZh[category],
    labelEn: categoryLabelsEn[category],
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
