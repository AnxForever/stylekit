"use client";

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
};

const recipes = [
  {
    title: "Mushroom Risotto",
    cookTime: "45 min",
    difficulty: "Medium",
    rating: 4.7,
    category: "Main Courses",
    gradient: "bg-gradient-to-br from-amber-300 to-yellow-500",
  },
  {
    title: "Caesar Salad",
    cookTime: "15 min",
    difficulty: "Easy",
    rating: 4.5,
    category: "Salads",
    gradient: "bg-gradient-to-br from-green-300 to-emerald-500",
  },
  {
    title: "Tiramisu",
    cookTime: "30 min",
    difficulty: "Medium",
    rating: 4.8,
    category: "Desserts",
    gradient: "bg-gradient-to-br from-amber-600 to-yellow-800",
  },
  {
    title: "Tom Yum Soup",
    cookTime: "25 min",
    difficulty: "Easy",
    rating: 4.6,
    category: "Soups",
    gradient: "bg-gradient-to-br from-red-400 to-orange-500",
  },
  {
    title: "Beef Wellington",
    cookTime: "90 min",
    difficulty: "Hard",
    rating: 4.9,
    category: "Main Courses",
    gradient: "bg-gradient-to-br from-red-700 to-rose-900",
  },
  {
    title: "Bruschetta",
    cookTime: "10 min",
    difficulty: "Easy",
    rating: 4.4,
    category: "Appetizers",
    gradient: "bg-gradient-to-br from-rose-300 to-red-400",
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
                  <ChefHat className="w-16 h-16 text-white/30" />
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
                        <ChefHat className="w-12 h-12 text-white/20" />
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
            Copyright 2025 CookBook. Part of{" "}
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
