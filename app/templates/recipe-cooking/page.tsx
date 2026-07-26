"use client";

export const dynamic = "force-static";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  ChefHat,
  Clock,
  Flame,
  Heart,
  Search,
  Star,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

type DishKey =
  | "salmon"
  | "risotto"
  | "caesar"
  | "tiramisu"
  | "tomyum"
  | "wellington"
  | "bruschetta";

function Plate({ children, rim = "#ffffff", well = "#f6f1ea" }: { children: React.ReactNode; rim?: string; well?: string }) {
  return (
    <div
      className="relative rounded-full"
      style={{
        width: "72%",
        aspectRatio: "1",
        background: rim,
        boxShadow: "0 14px 24px -10px rgba(60,30,10,0.35), inset 0 -3px 6px rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          inset: "11%",
          background: well,
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.10)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function DishIllustration({ dish }: { dish: DishKey }) {
  if (dish === "salmon") {
    return (
      <Plate well="#fdf6ee">
        {/* salmon fillet */}
        <div
          className="absolute"
          style={{
            left: "16%",
            top: "26%",
            width: "56%",
            height: "40%",
            borderRadius: "48% 52% 55% 45% / 60% 55% 45% 40%",
            background: "linear-gradient(135deg, #fb923c 0%, #f97316 55%, #ea580c 100%)",
            boxShadow: "inset 0 -4px 6px rgba(154,52,18,0.35)",
          }}
        >
          {[28, 48, 68].map((l) => (
            <div
              key={l}
              className="absolute"
              style={{
                left: `${l}%`,
                top: "12%",
                width: "6%",
                height: "76%",
                borderRadius: "999px",
                background: "rgba(255,247,237,0.65)",
                transform: "rotate(14deg)",
              }}
            />
          ))}
        </div>
        {/* lemon slice */}
        <div
          className="absolute rounded-full"
          style={{
            right: "10%",
            top: "18%",
            width: "22%",
            aspectRatio: "1",
            background: "radial-gradient(circle, #fef9c3 0 55%, #facc15 56% 100%)",
            boxShadow: "0 2px 3px rgba(0,0,0,0.12)",
          }}
        />
        {/* asparagus */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 8}%`,
              bottom: "12%",
              width: "5%",
              height: "26%",
              borderRadius: "999px",
              background: "linear-gradient(180deg, #4d7c0f, #65a30d)",
              transform: `rotate(${18 + i * 6}deg)`,
            }}
          />
        ))}
      </Plate>
    );
  }

  if (dish === "risotto") {
    return (
      <Plate well="#f3ede2">
        {/* creamy rice mound */}
        <div
          className="absolute"
          style={{
            left: "12%",
            top: "22%",
            width: "76%",
            height: "58%",
            borderRadius: "50% 50% 46% 54% / 62% 58% 42% 38%",
            background:
              "radial-gradient(circle at 35% 30%, #fef3c7 0 40%, #fde68a 41% 75%, #fbbf24 76% 100%)",
            boxShadow: "inset 0 -5px 8px rgba(180,83,9,0.25)",
          }}
        />
        {/* mushroom slices */}
        {[
          { l: 26, t: 30, r: -18 },
          { l: 52, t: 26, r: 12 },
          { l: 40, t: 48, r: 30 },
          { l: 62, t: 50, r: -8 },
        ].map((m, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${m.l}%`,
              top: `${m.t}%`,
              width: "16%",
              height: "9%",
              borderRadius: "999px 999px 30% 30% / 999px 999px 40% 40%",
              background: "linear-gradient(180deg, #92400e, #b45309)",
              transform: `rotate(${m.r}deg)`,
            }}
          />
        ))}
        {/* parsley flecks */}
        {[34, 50, 66].map((l, i) => (
          <div
            key={l}
            className="absolute rounded-full"
            style={{
              left: `${l}%`,
              top: `${36 + i * 8}%`,
              width: "4%",
              aspectRatio: "1",
              background: "#65a30d",
            }}
          />
        ))}
      </Plate>
    );
  }

  if (dish === "caesar") {
    return (
      <Plate well="#f0f6ec">
        {/* lettuce leaves */}
        {[
          { l: 12, t: 24, r: -24, c: "#86efac" },
          { l: 38, t: 16, r: 8, c: "#4ade80" },
          { l: 56, t: 30, r: 34, c: "#86efac" },
          { l: 20, t: 46, r: 16, c: "#4ade80" },
          { l: 46, t: 48, r: -14, c: "#a3e635" },
        ].map((leaf, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${leaf.l}%`,
              top: `${leaf.t}%`,
              width: "34%",
              height: "26%",
              borderRadius: "80% 20% 75% 25% / 65% 35% 70% 30%",
              background: `linear-gradient(135deg, ${leaf.c}, #22c55e)`,
              transform: `rotate(${leaf.r}deg)`,
              boxShadow: "0 1px 2px rgba(0,0,0,0.10)",
            }}
          />
        ))}
        {/* croutons */}
        {[
          { l: 30, t: 34 },
          { l: 56, t: 52 },
          { l: 44, t: 24 },
        ].map((c, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${c.l}%`,
              top: `${c.t}%`,
              width: "11%",
              aspectRatio: "1",
              borderRadius: "22%",
              background: "linear-gradient(135deg, #fcd34d, #d97706)",
              transform: `rotate(${i * 20}deg)`,
            }}
          />
        ))}
        {/* parmesan shavings */}
        {[
          { l: 24, t: 60 },
          { l: 60, t: 36 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${p.l}%`,
              top: `${p.t}%`,
              width: "14%",
              height: "5%",
              borderRadius: "999px",
              background: "#fef9c3",
              transform: `rotate(${-20 + i * 40}deg)`,
            }}
          />
        ))}
      </Plate>
    );
  }

  if (dish === "tiramisu") {
    return (
      <Plate rim="#fdf2f8" well="#fbe7ef">
        {/* layered slice */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: "22%",
            top: "22%",
            width: "56%",
            height: "52%",
            borderRadius: "10% 10% 14% 14%",
            boxShadow: "0 5px 10px rgba(80,40,20,0.30)",
          }}
        >
          {["#78350f", "#fef3c7", "#a16207", "#fef3c7", "#78350f"].map((c, i) => (
            <div key={i} className="absolute left-0 w-full" style={{ top: `${i * 20}%`, height: "20%", background: c }} />
          ))}
          {/* cocoa dusting */}
          <div
            className="absolute left-0 top-0 w-full"
            style={{ height: "20%", background: "repeating-linear-gradient(90deg, #451a03 0 6px, #78350f 6px 12px)" }}
          />
        </div>
        {/* coffee bean garnish */}
        <div
          className="absolute"
          style={{
            right: "16%",
            bottom: "14%",
            width: "12%",
            height: "8%",
            borderRadius: "999px",
            background: "#431407",
            transform: "rotate(-24deg)",
          }}
        />
      </Plate>
    );
  }

  if (dish === "tomyum") {
    return (
      <Plate rim="#fff7ed" well="#fff7ed">
        {/* bowl */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: "12%",
            top: "22%",
            width: "76%",
            height: "58%",
            borderRadius: "50% 50% 46% 46% / 40% 40% 62% 62%",
            background: "linear-gradient(180deg, #fecaca 0 8%, #ef4444 8% 100%)",
            boxShadow: "inset 0 -6px 10px rgba(127,29,29,0.4)",
          }}
        >
          {/* broth surface */}
          <div
            className="absolute left-0 top-0 w-full"
            style={{ height: "42%", background: "linear-gradient(180deg, #fb923c, #ea580c)" }}
          />
          {/* shrimp */}
          {[24, 56].map((l, i) => (
            <div
              key={l}
              className="absolute"
              style={{
                left: `${l}%`,
                top: "10%",
                width: "22%",
                height: "22%",
                borderRadius: "999px 999px 999px 20%",
                background: "linear-gradient(135deg, #fda4af, #f43f5e)",
                transform: `rotate(${i === 0 ? -20 : 25}deg)`,
              }}
            />
          ))}
          {/* lime leaf */}
          <div
            className="absolute"
            style={{
              left: "44%",
              top: "22%",
              width: "16%",
              height: "10%",
              borderRadius: "80% 20% 80% 20%",
              background: "#16a34a",
              transform: "rotate(30deg)",
            }}
          />
        </div>
        {/* steam wisps */}
        {[30, 48, 64].map((l, i) => (
          <div
            key={l}
            className="absolute motion-safe:animate-pulse"
            style={{
              left: `${l}%`,
              top: "8%",
              width: "4%",
              height: "14%",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.75)",
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </Plate>
    );
  }

  if (dish === "wellington") {
    return (
      <Plate well="#f5efe6">
        {/* pastry loaf */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: "14%",
            top: "28%",
            width: "72%",
            height: "42%",
            borderRadius: "48% 48% 22% 22% / 90% 90% 20% 20%",
            background: "linear-gradient(180deg, #d97706 0%, #b45309 60%, #92400e 100%)",
            boxShadow: "inset 0 -5px 8px rgba(69,26,3,0.40), 0 4px 8px rgba(69,26,3,0.30)",
          }}
        >
          {/* pastry lattice scoring */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(65deg, transparent 0 12px, rgba(254,243,199,0.45) 12px 15px)",
            }}
          />
        </div>
        {/* cut face showing beef center */}
        <div
          className="absolute"
          style={{
            left: "14%",
            top: "44%",
            width: "20%",
            height: "26%",
            borderRadius: "40% 20% 20% 40% / 50% 30% 30% 50%",
            background: "radial-gradient(circle at 50% 50%, #be123c 0 45%, #9f1239 46% 70%, #fbbf24 71% 100%)",
          }}
        />
        {/* rosemary sprig */}
        <div
          className="absolute"
          style={{
            right: "14%",
            bottom: "14%",
            width: "22%",
            height: "5%",
            borderRadius: "999px",
            background: "linear-gradient(90deg, #14532d, #166534)",
            transform: "rotate(-18deg)",
          }}
        />
      </Plate>
    );
  }

  // bruschetta
  return (
    <Plate rim="#fefce8" well="#faf5e4">
      {[
        { l: 10, t: 26, r: -14 },
        { l: 44, t: 40, r: 10 },
      ].map((slice, i) => (
        <div key={i} className="absolute" style={{ left: `${slice.l}%`, top: `${slice.t}%`, width: "46%", height: "32%", transform: `rotate(${slice.r}deg)` }}>
          {/* toasted bread */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "45% 55% 50% 50% / 60% 60% 40% 40%",
              background: "linear-gradient(135deg, #fbbf24, #d97706)",
              boxShadow: "0 3px 5px rgba(120,53,15,0.30)",
            }}
          />
          {/* tomato topping */}
          {[
            { l: 14, t: 12 },
            { l: 44, t: 8 },
            { l: 30, t: 38 },
            { l: 60, t: 34 },
          ].map((tm, j) => (
            <div
              key={j}
              className="absolute rounded-full"
              style={{
                left: `${tm.l}%`,
                top: `${tm.t}%`,
                width: "24%",
                aspectRatio: "1",
                background: "radial-gradient(circle at 35% 30%, #f87171, #dc2626)",
              }}
            />
          ))}
          {/* basil */}
          <div
            className="absolute"
            style={{
              left: "38%",
              top: "22%",
              width: "22%",
              height: "26%",
              borderRadius: "80% 20% 80% 20%",
              background: "#16a34a",
              transform: "rotate(24deg)",
            }}
          />
        </div>
      ))}
    </Plate>
  );
}

const categories = [
  { name: "All Recipes", count: 48 },
  { name: "Appetizers", count: 12 },
  { name: "Main Courses", count: 16 },
  { name: "Desserts", count: 8 },
  { name: "Soups", count: 6 },
  { name: "Salads", count: 4 },
  { name: "Beverages", count: 2 },
];

const featuredRecipe = {
  title: "Pan-Seared Salmon with Lemon Butter",
  description:
    "A perfectly crispy salmon fillet drizzled with a luxurious lemon butter sauce, served alongside roasted asparagus and baby potatoes.",
  cookTime: "35 min",
  servings: 4,
  difficulty: "Medium",
  rating: 4.9,
  reviews: 328,
  gradient: "bg-gradient-to-br from-orange-400 to-rose-500",
  dish: "salmon" as DishKey,
};

const recipes: {
  title: string;
  cookTime: string;
  difficulty: string;
  rating: number;
  category: string;
  gradient: string;
  dish: DishKey;
}[] = [
  {
    title: "Mushroom Risotto",
    cookTime: "45 min",
    difficulty: "Medium",
    rating: 4.7,
    category: "Main Courses",
    gradient: "bg-gradient-to-br from-amber-300 to-yellow-500",
    dish: "risotto",
  },
  {
    title: "Caesar Salad",
    cookTime: "15 min",
    difficulty: "Easy",
    rating: 4.5,
    category: "Salads",
    gradient: "bg-gradient-to-br from-green-300 to-emerald-500",
    dish: "caesar",
  },
  {
    title: "Tiramisu",
    cookTime: "30 min",
    difficulty: "Medium",
    rating: 4.8,
    category: "Desserts",
    gradient: "bg-gradient-to-br from-amber-600 to-yellow-800",
    dish: "tiramisu",
  },
  {
    title: "Tom Yum Soup",
    cookTime: "25 min",
    difficulty: "Easy",
    rating: 4.6,
    category: "Soups",
    gradient: "bg-gradient-to-br from-red-400 to-orange-500",
    dish: "tomyum",
  },
  {
    title: "Beef Wellington",
    cookTime: "90 min",
    difficulty: "Hard",
    rating: 4.9,
    category: "Main Courses",
    gradient: "bg-gradient-to-br from-red-700 to-rose-900",
    dish: "wellington",
  },
  {
    title: "Bruschetta",
    cookTime: "10 min",
    difficulty: "Easy",
    rating: 4.4,
    category: "Appetizers",
    gradient: "bg-gradient-to-br from-rose-300 to-red-400",
    dish: "bruschetta",
  },
];

const detailRecipe = {
  title: "Pan-Seared Salmon with Lemon Butter",
  ingredients: [
    "4 salmon fillets (6 oz each)",
    "2 tbsp olive oil",
    "3 tbsp unsalted butter",
    "2 cloves garlic, minced",
    "Juice of 1 lemon",
    "1 tbsp fresh dill, chopped",
    "Salt and pepper to taste",
    "1 lb asparagus, trimmed",
    "1 lb baby potatoes, halved",
  ],
  steps: [
    "Pat salmon fillets dry and season generously with salt and pepper on both sides.",
    "Heat olive oil in a large skillet over medium-high heat until shimmering.",
    "Place salmon skin-side up and cook for 4 minutes until a golden crust forms.",
    "Flip carefully and cook for another 3 minutes for medium doneness.",
    "Remove salmon from pan and set aside on a warm plate.",
    "In the same pan, reduce heat to medium and add butter and garlic.",
    "Once butter is melted and garlic is fragrant, add lemon juice and dill.",
    "Drizzle the lemon butter sauce over the salmon and serve with roasted vegetables.",
  ],
};

export default function RecipeCookingTemplate() {
  const [activeCategory, setActiveCategory] = useState("All Recipes");
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSave = (title: string) => {
    setSavedRecipes((prev) =>
      prev.includes(title) ? prev.filter((r) => r !== title) : [...prev, title]
    );
  };

  const difficultyColor = (d: string) => {
    if (d === "Easy") return "text-green-600 bg-green-50";
    if (d === "Medium") return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-[#fffbf7] text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">CookBook</span>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-72">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle categories"
            >
              <UtensilsCrossed className="w-5 h-5" />
            </button>
            <button className="relative p-2" aria-label="Saved recipes">
              <Bookmark className="w-5 h-5" />
              {savedRecipes.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {savedRecipes.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside
            className={`fixed md:static inset-0 z-40 md:z-auto bg-white md:bg-transparent md:block w-64 md:w-52 shrink-0 transition-transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div className="p-6 md:p-0">
              <div className="flex items-center justify-between md:hidden mb-6">
                <h3 className="font-semibold">Categories</h3>
                <button onClick={() => setSidebarOpen(false)} className="p-1">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
              <h3 className="hidden md:block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Categories
              </h3>
              <nav className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeCategory === cat.name
                        ? "bg-orange-50 text-orange-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-gray-400">{cat.count}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Featured Recipe */}
            {!showDetail && (
              <section className="mb-10">
                <div
                  className={`relative rounded-2xl overflow-hidden ${featuredRecipe.gradient} p-8 md:p-12 cursor-pointer`}
                  onClick={() => setShowDetail(true)}
                >
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 fill-white" />
                    {featuredRecipe.rating}
                  </div>
                  <div className="hidden lg:flex absolute inset-y-0 right-8 w-64 items-center justify-center pointer-events-none">
                    <DishIllustration dish={featuredRecipe.dish} />
                  </div>
                  <div className="max-w-xl">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-4">
                      Featured Recipe
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {featuredRecipe.title}
                    </h2>
                    <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                      {featuredRecipe.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {featuredRecipe.cookTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        {featuredRecipe.servings} servings
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-4 h-4" />
                        {featuredRecipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Recipe Detail View */}
            {showDetail && (
              <section className="mb-10">
                <button
                  onClick={() => setShowDetail(false)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to recipes
                </button>
                <div className={`rounded-2xl overflow-hidden ${featuredRecipe.gradient} h-48 md:h-64 flex items-center justify-center mb-8`}>
                  <div className="h-full py-4 flex items-center justify-center aspect-square">
                    <DishIllustration dish={featuredRecipe.dish} />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {detailRecipe.title}
                  </h1>
                  <button
                    onClick={() => toggleSave(detailRecipe.title)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    aria-label="Save recipe"
                  >
                    {savedRecipes.includes(detailRecipe.title) ? (
                      <BookmarkCheck className="w-5 h-5 text-orange-500 fill-orange-500" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <UtensilsCrossed className="w-5 h-5 text-orange-500" />
                      Ingredients
                    </h3>
                    <ul className="space-y-2.5">
                      {detailRecipe.ingredients.map((ing, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm text-gray-700"
                        >
                          <div className="w-2 h-2 bg-orange-400 rounded-full shrink-0" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      Instructions
                    </h3>
                    <ol className="space-y-4">
                      {detailRecipe.steps.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-700">
                          <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </section>
            )}

            {/* Recipe Grid */}
            {!showDetail && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">
                    {activeCategory === "All Recipes" ? "All Recipes" : activeCategory}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {recipes.length} recipes
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map((recipe) => (
                    <div
                      key={recipe.title}
                      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      <div
                        className={`aspect-[4/3] ${recipe.gradient} flex items-center justify-center relative`}
                      >
                        <div className="h-full py-3 flex items-center justify-center aspect-square">
                          <DishIllustration dish={recipe.dish} />
                        </div>
                        <button
                          onClick={() => toggleSave(recipe.title)}
                          className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
                          aria-label="Save recipe"
                        >
                          {savedRecipes.includes(recipe.title) ? (
                            <Heart className="w-4 h-4 text-white fill-white" />
                          ) : (
                            <Heart className="w-4 h-4 text-white" />
                          )}
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-gray-400">
                            {recipe.category}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor(recipe.difficulty)}`}
                          >
                            {recipe.difficulty}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-3 group-hover:text-orange-600 transition-colors">
                          {recipe.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {recipe.cookTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            {recipe.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200/60 py-10 px-4 md:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; 2025 CookBook. Part of{" "}
            <Link
              href="/templates"
              className="text-gray-600 hover:text-black transition-colors"
            >
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">About</a>
            <a href="#" className="hover:text-gray-600">Contact</a>
            <a href="#" className="hover:text-gray-600">Privacy</a>
          </div>
        </div>
      </footer>
      <TemplateBackButton variant="recipe" />
    </div>
  );
}
