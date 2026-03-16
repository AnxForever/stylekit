// Background Pattern Library
// CSS-only background patterns using gradients and repeating patterns

export interface BackgroundPattern {
  id: string;
  name: string;
  nameZh: string;
  css: string;
  tailwind: string;
  category: BackgroundCategory;
  tags: string[];
  mood: string[];
}

export type BackgroundCategory =
  | "grid"
  | "dots"
  | "stripes"
  | "waves"
  | "noise"
  | "geometric"
  | "gradient-pattern";

// Pre-defined background patterns
export const backgrounds: BackgroundPattern[] = [
  // === Grid Patterns ===
  {
    id: "dot-grid",
    name: "Dot Grid",
    nameZh: "点阵网格",
    css: "radial-gradient(circle, #00000020 1px, transparent 1px)",
    tailwind: "bg-[radial-gradient(circle,#00000020_1px,transparent_1px)] bg-[size:20px_20px]",
    category: "grid",
    tags: ["minimal", "clean", "subtle"],
    mood: ["professional", "organized", "structured"],
  },
  {
    id: "square-grid",
    name: "Square Grid",
    nameZh: "方格网格",
    css: "linear-gradient(#00000010 1px, transparent 1px), linear-gradient(90deg, #00000010 1px, transparent 1px)",
    tailwind: "bg-[linear-gradient(#00000010_1px,transparent_1px),linear-gradient(90deg,#00000010_1px,transparent_1px)] bg-[size:20px_20px]",
    category: "grid",
    tags: ["blueprint", "technical", "precise"],
    mood: ["structured", "technical", "clean"],
  },
  {
    id: "isometric-grid",
    name: "Isometric Grid",
    nameZh: "等距网格",
    css: "linear-gradient(30deg, #00000010 12%, transparent 12.5%, transparent 87%, #00000010 87.5%, #00000010), linear-gradient(150deg, #00000010 12%, transparent 12.5%, transparent 87%, #00000010 87.5%, #00000010), linear-gradient(30deg, #00000010 12%, transparent 12.5%, transparent 87%, #00000010 87.5%, #00000010), linear-gradient(150deg, #00000010 12%, transparent 12.5%, transparent 87%, #00000010 87.5%, #00000010), linear-gradient(60deg, #00000008 25%, transparent 25.5%, transparent 75%, #00000008 75%, #00000008), linear-gradient(60deg, #00000008 25%, transparent 25.5%, transparent 75%, #00000008 75%, #00000008)",
    tailwind: "bg-[linear-gradient(30deg,#00000010_12%,transparent_12.5%,transparent_87%,#00000010_87.5%)] bg-[size:80px_140px]",
    category: "grid",
    tags: ["3d", "isometric", "technical"],
    mood: ["technical", "modern", "architectural"],
  },
  {
    id: "cross-hatch",
    name: "Cross Hatch",
    nameZh: "交叉线",
    css: "repeating-linear-gradient(45deg, transparent, transparent 10px, #00000008 10px, #00000008 11px), repeating-linear-gradient(-45deg, transparent, transparent 10px, #00000008 10px, #00000008 11px)",
    tailwind: "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#00000008_10px,#00000008_11px),repeating-linear-gradient(-45deg,transparent,transparent_10px,#00000008_10px,#00000008_11px)]",
    category: "grid",
    tags: ["sketch", "artistic", "textured"],
    mood: ["artistic", "handcrafted", "organic"],
  },

  // === Dots Patterns ===
  {
    id: "polka-dots",
    name: "Polka Dots",
    nameZh: "波点",
    css: "radial-gradient(circle, #00000020 25%, transparent 25%)",
    tailwind: "bg-[radial-gradient(circle,#00000020_25%,transparent_25%)] bg-[size:30px_30px]",
    category: "dots",
    tags: ["playful", "retro", "fun"],
    mood: ["playful", "cheerful", "vintage"],
  },
  {
    id: "scattered-dots",
    name: "Scattered Dots",
    nameZh: "散点",
    css: "radial-gradient(circle at 25% 25%, #00000015 2px, transparent 2px), radial-gradient(circle at 75% 75%, #00000015 2px, transparent 2px)",
    tailwind: "bg-[radial-gradient(circle_at_25%_25%,#00000015_2px,transparent_2px),radial-gradient(circle_at_75%_75%,#00000015_2px,transparent_2px)] bg-[size:40px_40px]",
    category: "dots",
    tags: ["random", "organic", "subtle"],
    mood: ["organic", "natural", "soft"],
  },
  {
    id: "honeycomb",
    name: "Honeycomb",
    nameZh: "蜂巢",
    css: "radial-gradient(circle farthest-side at 0% 50%, #00000000 23.5%, #00000020 0), radial-gradient(circle farthest-side at 0% 50%, #00000015 24%, #00000000 0) 21px 30px, linear-gradient(#00000020 14%, #00000000 0, #00000000 85%, #00000020 0) 0 0, linear-gradient(150deg, #00000020 24%, #00000015 0, #00000015 26%, #00000000 0, #00000000 74%, #00000015 0, #00000015 76%, #00000020 0) 0 0, linear-gradient(30deg, #00000020 24%, #00000015 0, #00000015 26%, #00000000 0, #00000000 74%, #00000015 0, #00000015 76%, #00000020 0) 0 0, linear-gradient(90deg, #00000015 2%, #00000020 0, #00000020 98%, #00000015 0%) 0 0 #ffffff",
    tailwind: "bg-[radial-gradient(circle_farthest-side_at_0%_50%,#00000000_23.5%,#00000020_0)] bg-[size:42px_60px]",
    category: "dots",
    tags: ["geometric", "nature", "hexagon"],
    mood: ["natural", "structured", "organic"],
  },

  // === Stripes Patterns ===
  {
    id: "diagonal-stripes",
    name: "Diagonal Stripes",
    nameZh: "斜条纹",
    css: "repeating-linear-gradient(45deg, transparent, transparent 10px, #00000008 10px, #00000008 20px)",
    tailwind: "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#00000008_10px,#00000008_20px)]",
    category: "stripes",
    tags: ["classic", "diagonal", "simple"],
    mood: ["classic", "clean", "structured"],
  },
  {
    id: "vertical-stripes",
    name: "Vertical Stripes",
    nameZh: "竖条纹",
    css: "repeating-linear-gradient(90deg, transparent, transparent 10px, #00000008 10px, #00000008 20px)",
    tailwind: "bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#00000008_10px,#00000008_20px)]",
    category: "stripes",
    tags: ["vertical", "simple", "clean"],
    mood: ["clean", "modern", "structured"],
  },
  {
    id: "horizontal-stripes",
    name: "Horizontal Stripes",
    nameZh: "横条纹",
    css: "repeating-linear-gradient(0deg, transparent, transparent 10px, #00000008 10px, #00000008 20px)",
    tailwind: "bg-[repeating-linear-gradient(0deg,transparent,transparent_10px,#00000008_10px,#00000008_20px)]",
    category: "stripes",
    tags: ["horizontal", "simple", "clean"],
    mood: ["calm", "organized", "clean"],
  },
  {
    id: "zigzag",
    name: "Zigzag",
    nameZh: "锯齿纹",
    css: "linear-gradient(135deg, #00000010 25%, transparent 25%), linear-gradient(225deg, #00000010 25%, transparent 25%), linear-gradient(45deg, #00000010 25%, transparent 25%), linear-gradient(315deg, #00000010 25%, #ffffff 25%)",
    tailwind: "bg-[linear-gradient(135deg,#00000010_25%,transparent_25%),linear-gradient(225deg,#00000010_25%,transparent_25%)] bg-[size:20px_20px] bg-[position:0_0,10px_0]",
    category: "stripes",
    tags: ["zigzag", "dynamic", "energetic"],
    mood: ["energetic", "dynamic", "playful"],
  },
  {
    id: "chevron",
    name: "Chevron",
    nameZh: "人字纹",
    css: "repeating-linear-gradient(45deg, transparent, transparent 10px, #00000010 10px, #00000010 20px), repeating-linear-gradient(-45deg, transparent, transparent 10px, #00000010 10px, #00000010 20px)",
    tailwind: "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#00000010_10px,#00000010_20px),repeating-linear-gradient(-45deg,transparent,transparent_10px,#00000010_10px,#00000010_20px)]",
    category: "stripes",
    tags: ["chevron", "arrow", "directional"],
    mood: ["directional", "modern", "dynamic"],
  },

  // === Waves Patterns ===
  {
    id: "wave-simple",
    name: "Simple Wave",
    nameZh: "简单波浪",
    css: "repeating-radial-gradient(circle at 0 0, transparent 0, #ffffff 10px), repeating-linear-gradient(#00000010, #00000020)",
    tailwind: "bg-[repeating-radial-gradient(circle_at_0_0,transparent_0,#ffffff_10px),repeating-linear-gradient(#00000010,#00000020)]",
    category: "waves",
    tags: ["wave", "organic", "flowing"],
    mood: ["flowing", "organic", "calm"],
  },
  {
    id: "topographic",
    name: "Topographic Lines",
    nameZh: "等高线",
    css: "repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 10px, #00000008 10px, #00000008 11px)",
    tailwind: "bg-[repeating-radial-gradient(circle_at_50%_50%,transparent_0,transparent_10px,#00000008_10px,#00000008_11px)]",
    category: "waves",
    tags: ["topographic", "map", "contour"],
    mood: ["technical", "natural", "exploratory"],
  },

  // === Geometric Patterns ===
  {
    id: "checkerboard",
    name: "Checkerboard",
    nameZh: "棋盘格",
    css: "linear-gradient(45deg, #00000010 25%, transparent 25%, transparent 75%, #00000010 75%, #00000010), linear-gradient(45deg, #00000010 25%, transparent 25%, transparent 75%, #00000010 75%, #00000010)",
    tailwind: "bg-[linear-gradient(45deg,#00000010_25%,transparent_25%,transparent_75%,#00000010_75%),linear-gradient(45deg,#00000010_25%,transparent_25%,transparent_75%,#00000010_75%)] bg-[size:20px_20px] bg-[position:0_0,10px_10px]",
    category: "geometric",
    tags: ["checkerboard", "classic", "grid"],
    mood: ["classic", "structured", "playful"],
  },
  {
    id: "triangles",
    name: "Triangles",
    nameZh: "三角形",
    css: "linear-gradient(135deg, #00000010 25%, transparent 25%), linear-gradient(225deg, #00000010 25%, transparent 25%), linear-gradient(45deg, #00000010 25%, transparent 25%), linear-gradient(315deg, #00000010 25%, transparent 25%)",
    tailwind: "bg-[linear-gradient(135deg,#00000010_25%,transparent_25%),linear-gradient(225deg,#00000010_25%,transparent_25%)] bg-[size:40px_40px] bg-[position:0_0,20px_20px]",
    category: "geometric",
    tags: ["triangles", "geometric", "modern"],
    mood: ["modern", "sharp", "dynamic"],
  },
  {
    id: "diamonds",
    name: "Diamonds",
    nameZh: "菱形",
    css: "linear-gradient(45deg, #00000010 25%, transparent 25%, transparent 75%, #00000010 75%), linear-gradient(-45deg, #00000010 25%, transparent 25%, transparent 75%, #00000010 75%)",
    tailwind: "bg-[linear-gradient(45deg,#00000010_25%,transparent_25%,transparent_75%,#00000010_75%),linear-gradient(-45deg,#00000010_25%,transparent_25%,transparent_75%,#00000010_75%)] bg-[size:20px_20px]",
    category: "geometric",
    tags: ["diamonds", "geometric", "elegant"],
    mood: ["elegant", "structured", "sophisticated"],
  },
  {
    id: "circuit-board",
    name: "Circuit Board",
    nameZh: "电路板",
    css: "linear-gradient(90deg, #00000008 1px, transparent 1px), linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000015 1px, transparent 1px) 10px 10px, linear-gradient(#00000015 1px, transparent 1px) 10px 10px",
    tailwind: "bg-[linear-gradient(90deg,#00000008_1px,transparent_1px),linear-gradient(#00000008_1px,transparent_1px)] bg-[size:20px_20px]",
    category: "geometric",
    tags: ["tech", "circuit", "digital"],
    mood: ["technical", "digital", "modern"],
  },

  // === Gradient Patterns ===
  {
    id: "gradient-mesh",
    name: "Gradient Mesh",
    nameZh: "渐变网格",
    css: "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3), transparent 50%)",
    tailwind: "bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.3),transparent_50%)]",
    category: "gradient-pattern",
    tags: ["gradient", "mesh", "modern"],
    mood: ["modern", "soft", "colorful"],
  },
  {
    id: "gradient-rays",
    name: "Gradient Rays",
    nameZh: "渐变光线",
    css: "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0, 0, 0, 0.05) 10deg, transparent 20deg)",
    tailwind: "bg-[repeating-conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(0,0,0,0.05)_10deg,transparent_20deg)]",
    category: "gradient-pattern",
    tags: ["rays", "radial", "sunburst"],
    mood: ["radiant", "energetic", "dynamic"],
  },
];

// Get backgrounds by category
export function getBackgroundsByCategory(category: BackgroundCategory): BackgroundPattern[] {
  return backgrounds.filter((b) => b.category === category);
}

// Get background by ID
export function getBackgroundById(id: string): BackgroundPattern | undefined {
  return backgrounds.find((b) => b.id === id);
}

// Get backgrounds by mood
export function getBackgroundsByMood(mood: string): BackgroundPattern[] {
  return backgrounds.filter((b) =>
    b.mood.some((m) => m.toLowerCase().includes(mood.toLowerCase()))
  );
}

// Get all background categories with counts
export function getBackgroundCategories(): {
  category: BackgroundCategory;
  count: number;
  labelZh: string;
  labelEn: string;
}[] {
  const categoryLabelsZh: Record<BackgroundCategory, string> = {
    grid: "网格",
    dots: "点状",
    stripes: "条纹",
    waves: "波浪",
    noise: "噪点",
    geometric: "几何",
    "gradient-pattern": "渐变纹理",
  };

  const categoryLabelsEn: Record<BackgroundCategory, string> = {
    grid: "Grid",
    dots: "Dots",
    stripes: "Stripes",
    waves: "Waves",
    noise: "Noise",
    geometric: "Geometric",
    "gradient-pattern": "Gradient Pattern",
  };

  const categories = [...new Set(backgrounds.map((b) => b.category))];
  return categories.map((category) => ({
    category,
    count: backgrounds.filter((b) => b.category === category).length,
    labelZh: categoryLabelsZh[category],
    labelEn: categoryLabelsEn[category],
  }));
}

