"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                       */
/* ------------------------------------------------------------------ */

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 5-3 3-4 10-4 10a7.56 7.56 0 0 1 5-5c2-1 4-1 5-3a5 5 0 0 0-3-2z" />
    </svg>
  );
}

function CartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function TruckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  { name: "Produce", emoji: "🥬" },
  { name: "Dairy", emoji: "🧀" },
  { name: "Bakery", emoji: "🍞" },
  { name: "Meat", emoji: "🥩" },
  { name: "Seafood", emoji: "🐟" },
  { name: "Beverages", emoji: "🧃" },
  { name: "Snacks", emoji: "🥜" },
  { name: "Organic", emoji: "🌱" },
];

const products = [
  { name: "Farm Fresh Avocados", weight: "500g, locally sourced", price: "$4.99", badge: "Organic", color: "bg-[#d4e4bc]" },
  { name: "Sourdough Bread", weight: "Freshly baked daily", price: "$6.50", badge: null, color: "bg-[#f5e6c8]" },
  { name: "Mixed Berry Bowl", weight: "250g, seasonal mix", price: "$5.99", badge: "Sale", color: "bg-[#e8c5d0]" },
  { name: "Free-Range Eggs", weight: "12 pack, pasture raised", price: "$7.99", badge: "Organic", color: "bg-[#f0e4d0]" },
  { name: "Greek Yogurt", weight: "500ml, honey flavor", price: "$3.49", badge: null, color: "bg-[#f5f0e0]" },
  { name: "Heirloom Tomatoes", weight: "400g, vine ripened", price: "$4.29", badge: "Local", color: "bg-[#e8d4c0]" },
];

const recipes = [
  { title: "Summer Avocado Toast", time: "10 min", difficulty: "Easy", ingredients: 4 },
  { title: "Berry Smoothie Bowl", time: "5 min", difficulty: "Easy", ingredients: 6 },
  { title: "Rustic Tomato Soup", time: "30 min", difficulty: "Medium", ingredients: 8 },
];

const testimonials = [
  { name: "Sarah M.", text: "The freshest produce I have ever had delivered. Love the organic selection!", rating: 5 },
  { name: "James K.", text: "Same-day delivery is a game changer. Everything arrives perfectly fresh.", rating: 5 },
  { name: "Linda R.", text: "Supporting local farms while getting restaurant-quality ingredients. Amazing!", rating: 4 },
];

const nutritionFacts = [
  { label: "Calories", value: "95 kcal" },
  { label: "Protein", value: "1.2g" },
  { label: "Carbs", value: "25g" },
  { label: "Fiber", value: "4.4g" },
  { label: "Vitamin C", value: "14% DV" },
  { label: "Potassium", value: "6% DV" },
];

/* ------------------------------------------------------------------ */
/*  Main Showcase                                                      */
/* ------------------------------------------------------------------ */

export default function FreshMarketShowcaseContent() {
  const [activeCategory, setActiveCategory] = useState("Produce");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#fef9f0] text-[#2d5016]">
      {/* ── 1. Navigation ─────────────────────────────────────── */}
      <RevealBlock>
        <nav className="flex items-center justify-between px-6 py-4 bg-[#fef9f0] border-b border-[#d4e4bc]/50 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <LeafIcon className="w-6 h-6 text-[#2d5016]" />
            <span className="text-xl font-bold text-[#2d5016]">FreshMarket</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-[#8b4513]">
            <span className="hover:text-[#2d5016] transition-colors cursor-pointer">Produce</span>
            <span className="hover:text-[#2d5016] transition-colors cursor-pointer">Dairy</span>
            <span className="hover:text-[#2d5016] transition-colors cursor-pointer">Bakery</span>
            <span className="hover:text-[#2d5016] transition-colors cursor-pointer">Recipes</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <CartIcon className="w-5 h-5 text-[#2d5016]" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#e8722a] text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </div>
          </div>
        </nav>
      </RevealBlock>

      {/* ── 2. Seasonal Hero ──────────────────────────────────── */}
      <RevealBlock delay={0.1}>
        <section className="bg-[#2d5016] text-white px-6 py-16 rounded-3xl mx-4 mt-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[#d4e4bc] text-xs tracking-[0.2em] uppercase mb-3">This Week</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Farm-Fresh Picks</h1>
            <p className="text-[#d4e4bc] mb-6 max-w-md mx-auto">Hand-selected seasonal produce from local farms, delivered fresh to your door within hours.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="px-8 py-3 bg-[#e8722a] text-white rounded-full font-medium hover:bg-[#d4641f] transition-colors active:scale-95">
                Shop This Week
              </button>
              <button className="px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors backdrop-blur-sm">
                View Recipes
              </button>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── 3. Search Bar ─────────────────────────────────────── */}
      <RevealBlock delay={0.15}>
        <div className="max-w-2xl mx-auto px-4 mt-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b7355]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for fresh produce, dairy, bakery..."
              className="w-full pl-12 pr-5 py-3.5 rounded-full border border-[#d4e4bc] bg-white text-sm text-[#2d5016] placeholder:text-[#8b7355] focus:outline-none focus:ring-2 focus:ring-[#2d5016]/20 focus:border-[#2d5016] transition-colors shadow-sm"
            />
          </div>
        </div>
      </RevealBlock>

      {/* ── 4. Category Pills ─────────────────────────────────── */}
      <RevealBlock delay={0.2}>
        <div className="px-4 mt-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.name
                      ? "bg-[#2d5016] text-white shadow-sm"
                      : "bg-white text-[#2d5016] border border-[#d4e4bc] hover:bg-[#d4e4bc]/30"
                  }`}
                >
                  <span className="mr-1.5">{cat.emoji}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </RevealBlock>

      {/* ── 5. Product Grid ───────────────────────────────────── */}
      <RevealBlock delay={0.25}>
        <section className="max-w-5xl mx-auto px-4 mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2d5016]">Featured Products</h2>
            <button className="text-sm text-[#e8722a] font-medium hover:underline">View all</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <div
                key={product.name}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className={`aspect-[4/3] ${product.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-colors duration-300" />
                  {product.badge === "Organic" && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#2d5016] text-white text-[10px] font-bold uppercase tracking-wide">
                      Organic
                    </span>
                  )}
                  {product.badge === "Sale" && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#f5c542] text-[#8b4513] text-[10px] font-bold uppercase tracking-wide">
                      Sale
                    </span>
                  )}
                  {product.badge === "Local" && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#d4e4bc] text-[#2d5016] text-[10px] font-bold uppercase tracking-wide">
                      Local
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#2d5016] mb-1">{product.name}</h3>
                  <p className="text-xs text-[#8b7355] mb-3">{product.weight}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#e8722a]">{product.price}</span>
                    <button className="w-9 h-9 rounded-full bg-[#2d5016] text-white text-lg flex items-center justify-center hover:bg-[#1e3a0e] transition-colors active:scale-95">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealBlock>

      {/* ── 6. Recipe Suggestion Cards ────────────────────────── */}
      <RevealBlock delay={0.1}>
        <section className="max-w-5xl mx-auto px-4 mt-14">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Recipe Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recipes.map((recipe) => (
              <div
                key={recipe.title}
                className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
              >
                <div className="w-full aspect-[3/2] bg-gradient-to-br from-[#d4e4bc] to-[#c5d4a8] rounded-xl mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <LeafIcon className="w-10 h-10 text-[#2d5016]/30 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <h3 className="font-bold text-[#2d5016] mb-2">{recipe.title}</h3>
                <div className="flex items-center gap-3 text-xs text-[#8b7355]">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" />
                    {recipe.time}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#d4e4bc] text-[#2d5016]">{recipe.difficulty}</span>
                  <span>{recipe.ingredients} ingredients</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealBlock>

      {/* ── 7. Delivery Info ──────────────────────────────────── */}
      <RevealBlock delay={0.1}>
        <section className="max-w-5xl mx-auto px-4 mt-14">
          <div className="bg-[#2d5016] rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <TruckIcon className="w-6 h-6 text-[#d4e4bc]" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Same-Day Delivery</h3>
                  <p className="text-sm text-[#d4e4bc]">Order by 2 PM for delivery today. Free on orders over $50.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <LeafIcon className="w-6 h-6 text-[#d4e4bc]" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">100% Organic</h3>
                  <p className="text-sm text-[#d4e4bc]">Certified organic produce sourced directly from local farms.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <CheckIcon className="w-6 h-6 text-[#d4e4bc]" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Freshness Guaranteed</h3>
                  <p className="text-sm text-[#d4e4bc]">Not satisfied? Get a full refund, no questions asked.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── 8. Trust Badges ───────────────────────────────────── */}
      <RevealBlock delay={0.1}>
        <section className="max-w-5xl mx-auto px-4 mt-14">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "USDA Organic Certified", icon: "leaf" },
              { label: "Same-Day Delivery", icon: "truck" },
              { label: "Local Farm Partners", icon: "check" },
              { label: "Eco-Friendly Packaging", icon: "leaf" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-sm border border-[#d4e4bc]/50">
                {badge.icon === "leaf" && <LeafIcon className="w-4 h-4 text-[#2d5016]" />}
                {badge.icon === "truck" && <TruckIcon className="w-4 h-4 text-[#2d5016]" />}
                {badge.icon === "check" && <CheckIcon className="w-4 h-4 text-[#2d5016]" />}
                <span className="text-xs font-medium text-[#2d5016]">{badge.label}</span>
              </div>
            ))}
          </div>
        </section>
      </RevealBlock>

      {/* ── 9. Nutrition Facts Card ───────────────────────────── */}
      <RevealBlock delay={0.1}>
        <section className="max-w-5xl mx-auto px-4 mt-14">
          <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-sm border border-[#d4e4bc]/50 overflow-hidden">
            <div className="bg-[#d4e4bc] px-5 py-3">
              <h3 className="font-bold text-[#2d5016]">Nutrition Facts</h3>
              <p className="text-xs text-[#2d5016]/70">Per serving (1 medium apple)</p>
            </div>
            <div className="px-5 py-4">
              {nutritionFacts.map((fact, i) => (
                <div key={fact.label} className={`flex items-center justify-between py-2 ${i < nutritionFacts.length - 1 ? "border-b border-[#d4e4bc]/30" : ""}`}>
                  <span className="text-sm text-[#8b4513]">{fact.label}</span>
                  <span className="text-sm font-bold text-[#2d5016]">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── 10. Testimonials ──────────────────────────────────── */}
      <RevealBlock delay={0.1}>
        <section className="max-w-5xl mx-auto px-4 mt-14">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-6 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl shadow-sm p-6 border border-[#d4e4bc]/30">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-[#f5c542]" />
                  ))}
                </div>
                <p className="text-sm text-[#8b4513] mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-bold text-[#2d5016]">{t.name}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealBlock>

      {/* ── 11. Newsletter Signup ─────────────────────────────── */}
      <RevealBlock delay={0.1}>
        <section className="max-w-5xl mx-auto px-4 mt-14">
          <div className="bg-[#f5f0e8] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#2d5016] mb-2">Get Fresh Updates</h2>
            <p className="text-sm text-[#8b4513] mb-6 max-w-md mx-auto">
              Subscribe to our weekly newsletter for seasonal recipes, farm stories, and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full border border-[#d4e4bc] bg-white text-sm text-[#2d5016] placeholder:text-[#8b7355] focus:outline-none focus:ring-2 focus:ring-[#2d5016]/20 focus:border-[#2d5016] transition-colors"
              />
              <button className="px-6 py-3 bg-[#e8722a] text-white rounded-full font-medium hover:bg-[#d4641f] transition-colors active:scale-95 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── 12. Alerts ────────────────────────────────────────── */}
      <RevealBlock delay={0.1}>
        <section className="max-w-5xl mx-auto px-4 mt-14">
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-5 py-3 bg-[#d4e4bc]/30 border border-[#d4e4bc] rounded-2xl">
              <LeafIcon className="w-5 h-5 text-[#2d5016] shrink-0" />
              <p className="text-sm text-[#2d5016]"><span className="font-bold">Seasonal Alert:</span> Strawberry season is here! Fresh picks available now.</p>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-[#f5c542]/20 border border-[#f5c542]/50 rounded-2xl">
              <TruckIcon className="w-5 h-5 text-[#8b4513] shrink-0" />
              <p className="text-sm text-[#8b4513]"><span className="font-bold">Delivery Notice:</span> Extended hours this weekend. Order until 5 PM for same-day delivery.</p>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-[#e8722a]/10 border border-[#e8722a]/30 rounded-2xl">
              <StarIcon className="w-5 h-5 text-[#e8722a] shrink-0" />
              <p className="text-sm text-[#8b4513]"><span className="font-bold">Special Offer:</span> Use code FRESH20 for 20% off your first order.</p>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── 13. Rules Summary ─────────────────────────────────── */}
      <RevealBlock delay={0.1}>
        <section className="max-w-5xl mx-auto px-4 mt-14">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Design Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#d4e4bc]/30">
              <h3 className="font-bold text-[#2d5016] mb-4 flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-[#2d5016]" />
                Do
              </h3>
              <ul className="space-y-2 text-sm text-[#8b4513]">
                <li className="flex items-start gap-2"><span className="text-[#2d5016] mt-0.5">&#x2022;</span>Use warm cream base bg-[#fef9f0]</li>
                <li className="flex items-start gap-2"><span className="text-[#2d5016] mt-0.5">&#x2022;</span>Primary CTA: pumpkin orange bg-[#e8722a]</li>
                <li className="flex items-start gap-2"><span className="text-[#2d5016] mt-0.5">&#x2022;</span>Large rounded corners (rounded-2xl, rounded-full)</li>
                <li className="flex items-start gap-2"><span className="text-[#2d5016] mt-0.5">&#x2022;</span>Green text-[#2d5016] for headings and freshness</li>
                <li className="flex items-start gap-2"><span className="text-[#2d5016] mt-0.5">&#x2022;</span>Category pills: rounded-full bg-[#d4e4bc]</li>
                <li className="flex items-start gap-2"><span className="text-[#2d5016] mt-0.5">&#x2022;</span>Price tags: bg-[#f5c542] text-[#8b4513]</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#e8722a]/20">
              <h3 className="font-bold text-[#e8722a] mb-4 flex items-center gap-2">
                <span className="text-lg">&#x2715;</span>
                Don&apos;t
              </h3>
              <ul className="space-y-2 text-sm text-[#8b4513]">
                <li className="flex items-start gap-2"><span className="text-[#e8722a] mt-0.5">&#x2022;</span>Cool-tone backgrounds (blue-gray)</li>
                <li className="flex items-start gap-2"><span className="text-[#e8722a] mt-0.5">&#x2022;</span>Sharp corners (rounded-none)</li>
                <li className="flex items-start gap-2"><span className="text-[#e8722a] mt-0.5">&#x2022;</span>Pure black text</li>
                <li className="flex items-start gap-2"><span className="text-[#e8722a] mt-0.5">&#x2022;</span>Industrial or geometric fonts</li>
                <li className="flex items-start gap-2"><span className="text-[#e8722a] mt-0.5">&#x2022;</span>Neon or fluorescent colors</li>
                <li className="flex items-start gap-2"><span className="text-[#e8722a] mt-0.5">&#x2022;</span>Heavy drop shadows</li>
              </ul>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── 14. Footer ────────────────────────────────────────── */}
      <RevealBlock delay={0.1}>
        <footer className="bg-[#2d5016] text-[#d4e4bc] px-6 py-12 rounded-t-3xl mt-14">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm mb-8">
              <div>
                <p className="font-bold text-white mb-3">Shop</p>
                <div className="space-y-2">
                  <p className="hover:text-white transition-colors cursor-pointer">Produce</p>
                  <p className="hover:text-white transition-colors cursor-pointer">Dairy</p>
                  <p className="hover:text-white transition-colors cursor-pointer">Bakery</p>
                  <p className="hover:text-white transition-colors cursor-pointer">Meat & Seafood</p>
                </div>
              </div>
              <div>
                <p className="font-bold text-white mb-3">Help</p>
                <div className="space-y-2">
                  <p className="hover:text-white transition-colors cursor-pointer">Delivery Info</p>
                  <p className="hover:text-white transition-colors cursor-pointer">Returns</p>
                  <p className="hover:text-white transition-colors cursor-pointer">FAQ</p>
                  <p className="hover:text-white transition-colors cursor-pointer">Contact</p>
                </div>
              </div>
              <div>
                <p className="font-bold text-white mb-3">About</p>
                <div className="space-y-2">
                  <p className="hover:text-white transition-colors cursor-pointer">Our Farm Partners</p>
                  <p className="hover:text-white transition-colors cursor-pointer">Sustainability</p>
                  <p className="hover:text-white transition-colors cursor-pointer">Blog</p>
                  <p className="hover:text-white transition-colors cursor-pointer">Careers</p>
                </div>
              </div>
              <div>
                <p className="font-bold text-white mb-3">Legal</p>
                <div className="space-y-2">
                  <p className="hover:text-white transition-colors cursor-pointer">Privacy Policy</p>
                  <p className="hover:text-white transition-colors cursor-pointer">Terms of Service</p>
                  <p className="hover:text-white transition-colors cursor-pointer">Cookie Policy</p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <LeafIcon className="w-5 h-5 text-[#d4e4bc]" />
                <span className="font-bold text-white">FreshMarket</span>
              </div>
              <p className="text-xs text-[#d4e4bc]/70">Fresh from farm to table. Supporting local agriculture since 2020.</p>
            </div>
          </div>
        </footer>
      </RevealBlock>

      {/* ── Back to style detail ──────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/styles/fresh-market"
          className="flex items-center gap-2 px-4 py-2 bg-[#2d5016] text-white rounded-full shadow-lg hover:bg-[#1e3a0e] transition-colors text-sm font-medium"
        >
          <span>&larr;</span> Back to Style
        </Link>
      </div>
    </div>
  );
}
