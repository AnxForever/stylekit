"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ─── Hooks ────────────────────────────────────────────────────────────────────

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

// ─── RevealBlock ──────────────────────────────────────────────────────────────

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
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconSearch({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconCart({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function IconTruck({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.684-.948V8h4l2 4v5a1 1 0 0 1-1 1h-1" />
      <circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function IconShield({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function IconRefresh({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />
    </svg>
  );
}

function IconStar({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function IconCheck({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = ["All", "Clothing", "Accessories", "Shoes", "Home", "Sale"];

const products = [
  { name: "Merino Wool Sweater", brand: "Essentials", price: 89, oldPrice: 120, rating: 4.8, reviews: 142, badge: "Sale" },
  { name: "Canvas Tote Bag", brand: "Carry Co.", price: 45, oldPrice: null, rating: 4.6, reviews: 89, badge: "New" },
  { name: "Leather Belt", brand: "Heritage", price: 65, oldPrice: null, rating: 4.9, reviews: 203, badge: null },
  { name: "Linen Shirt", brand: "Essentials", price: 72, oldPrice: 95, rating: 4.7, reviews: 167, badge: "Sale" },
  { name: "Running Sneakers", brand: "Motion", price: 130, oldPrice: null, rating: 4.5, reviews: 312, badge: "Best Seller" },
  { name: "Ceramic Mug Set", brand: "Home Studio", price: 38, oldPrice: 48, rating: 4.4, reviews: 76, badge: null },
];

const pricingPlans = [
  { name: "Basic", price: 29, period: "/mo", features: ["Up to 100 products", "2 staff accounts", "Basic analytics", "Email support"], cta: "Start Free Trial" },
  { name: "Pro", price: 79, period: "/mo", features: ["Unlimited products", "5 staff accounts", "Advanced analytics", "Priority support", "Custom domain"], cta: "Start Free Trial", popular: true },
  { name: "Enterprise", price: 299, period: "/mo", features: ["Unlimited everything", "15 staff accounts", "Custom reports", "Dedicated manager", "API access", "SLA guarantee"], cta: "Contact Sales" },
];

const testimonials = [
  { name: "Sarah M.", role: "Store Owner", text: "Switching to this platform doubled our conversion rate in the first month. The clean checkout flow makes all the difference." },
  { name: "James K.", role: "Brand Director", text: "The product pages look incredible. Our customers trust the shopping experience, and it shows in our repeat purchase rate." },
  { name: "Aiko T.", role: "E-commerce Manager", text: "Finally, a storefront that loads fast and looks professional. Our bounce rate dropped by 40%." },
];

const orderData = [
  { id: "#1042", customer: "Emily R.", items: 3, total: "$247.00", status: "Shipped" },
  { id: "#1041", customer: "Marcus L.", items: 1, total: "$89.00", status: "Processing" },
  { id: "#1040", customer: "Yuki S.", items: 2, total: "$156.00", status: "Delivered" },
  { id: "#1039", customer: "Alex P.", items: 5, total: "$412.00", status: "Shipped" },
  { id: "#1038", customer: "Nina W.", items: 1, total: "$65.00", status: "Delivered" },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ShopifyCleanShowcaseContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"monthly" | "annual">("monthly");

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((p) => p.brand === activeCategory);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      {/* ── Section 1: Navigation Header ─────────────────────────────────── */}
      <RevealBlock>
        <nav className="sticky top-0 z-50 bg-white border-b border-[#e3e3e3]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <Link
                    href="/styles/shopify-clean"
                    className="text-sm text-[#6b7280] hover:text-[#008060] transition-colors flex items-center gap-1.5"
                  >
                    <span>&larr;</span>
                    Back to Docs
                  </Link>
                  <div className="w-px h-4 bg-[#e3e3e3]" />
                  <span className="text-xl font-semibold tracking-tight text-[#1a1a1a]">STORE</span>
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm text-[#6b7280]">
                  <a href="#shop" className="hover:text-[#1a1a1a] transition-colors">Shop</a>
                  <a href="#collections" className="hover:text-[#1a1a1a] transition-colors">Collections</a>
                  <a href="#about" className="hover:text-[#1a1a1a] transition-colors">About</a>
                  <a href="#journal" className="hover:text-[#1a1a1a] transition-colors">Journal</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#f7f7f8] rounded-lg text-sm text-[#9ca3af]">
                  <IconSearch className="w-4 h-4" />
                  <span>Search...</span>
                </div>
                <button className="relative p-2 text-[#6b7280] hover:text-[#1a1a1a] transition-colors">
                  <IconCart className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#008060] text-white text-[10px] font-medium rounded-full flex items-center justify-center">3</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </RevealBlock>

      {/* ── Section 2: Hero Banner ────────────────────────────────────────── */}
      <RevealBlock>
        <section className="bg-[#f7f7f8] px-4 md:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.2em] uppercase text-[#008060] font-medium mb-4">New Collection</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1a1a1a] mb-5">Spring Essentials</h1>
            <p className="text-[#6b7280] text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              Discover our curated selection of timeless pieces designed for everyday comfort and effortless style.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button className="px-8 py-3 bg-[#1a1a1a] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors">
                Shop Now
              </button>
              <button className="px-8 py-3 bg-white text-[#1a1a1a] text-sm font-medium rounded-lg border border-[#e3e3e3] hover:border-[#1a1a1a] transition-colors">
                View Lookbook
              </button>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 3: Category Tabs ──────────────────────────────────── */}
      <RevealBlock>
        <section id="collections" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-16 scroll-mt-16">
          <div className="flex items-center gap-2 overflow-x-auto pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-[#1a1a1a] text-white"
                    : "bg-[#f7f7f8] text-[#6b7280] hover:text-[#1a1a1a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 4: Product Grid ──────────────────────────────────────── */}
      <RevealBlock>
        <section id="shop" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 scroll-mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <RevealBlock key={product.name} delay={i * 0.08}>
                <div className="group border border-[#e3e3e3] rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <div className="aspect-square bg-[#f7f7f8] overflow-hidden relative">
                    <div className="w-full h-full bg-gradient-to-br from-[#f0f0f0] to-[#e8e8e8] group-hover:scale-105 transition-transform duration-300" />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full ${
                        product.badge === "Sale" ? "bg-[#fef3c7] text-[#92400e]" :
                        product.badge === "New" ? "bg-[#d1fae5] text-[#065f46]" :
                        "bg-[#e0e7ff] text-[#3730a3]"
                      }`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-[#9ca3af] mb-1">{product.brand}</p>
                    <h3 className="text-sm font-medium text-[#1a1a1a] mb-1.5">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <IconStar key={si} className={`w-3 h-3 ${si < Math.floor(product.rating) ? "text-[#fbbf24]" : "text-[#e3e3e3]"}`} />
                      ))}
                      <span className="text-[10px] text-[#9ca3af] ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-[#1a1a1a]">${product.price}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-[#9ca3af] line-through">${product.oldPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 5: Trust Badges ──────────────────────────────────────── */}
      <RevealBlock>
        <section className="bg-[#f7f7f8] py-10 md:py-12">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <IconTruck className="w-6 h-6 text-[#008060]" />
                <p className="text-sm font-medium text-[#1a1a1a]">Free Shipping</p>
                <p className="text-xs text-[#9ca3af]">On orders over $50</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconRefresh className="w-6 h-6 text-[#008060]" />
                <p className="text-sm font-medium text-[#1a1a1a]">30-Day Returns</p>
                <p className="text-xs text-[#9ca3af]">Hassle-free returns</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconShield className="w-6 h-6 text-[#008060]" />
                <p className="text-sm font-medium text-[#1a1a1a]">Secure Checkout</p>
                <p className="text-xs text-[#9ca3af]">SSL encrypted payment</p>
              </div>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 6: Search Bar ────────────────────────────────────────── */}
      <RevealBlock>
        <section className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-6">Find What You Need</h2>
          <div className="relative">
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Search products, collections, brands..."
              className="w-full pl-12 pr-4 py-4 border border-[#e3e3e3] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#008060]/20 focus:border-[#008060] transition-colors bg-white"
            />
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 7: Pricing Cards ─────────────────────────────────────── */}
      <RevealBlock>
        <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">Simple, Transparent Pricing</h2>
            <p className="text-[#6b7280] text-sm md:text-base">Choose the plan that fits your business</p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setActiveTab("monthly")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "monthly" ? "bg-[#1a1a1a] text-white" : "text-[#6b7280] hover:text-[#1a1a1a]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setActiveTab("annual")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "annual" ? "bg-[#1a1a1a] text-white" : "text-[#6b7280] hover:text-[#1a1a1a]"
                }`}
              >
                Annual
                <span className="ml-1.5 text-[10px] text-[#008060] font-medium">Save 20%</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <RevealBlock key={plan.name} delay={i * 0.1}>
                <div className={`rounded-lg border p-6 md:p-8 flex flex-col ${
                  plan.popular
                    ? "border-[#008060] ring-1 ring-[#008060] relative"
                    : "border-[#e3e3e3]"
                }`}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#008060] text-white text-[10px] font-medium uppercase tracking-wider rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-semibold text-[#1a1a1a]">
                      ${activeTab === "annual" ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    <span className="text-sm text-[#9ca3af]">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#6b7280]">
                        <IconCheck className="w-4 h-4 text-[#008060] mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 text-sm font-medium rounded-lg transition-colors ${
                    plan.popular
                      ? "bg-[#008060] text-white hover:bg-[#006e52]"
                      : "bg-white text-[#1a1a1a] border border-[#e3e3e3] hover:border-[#1a1a1a]"
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              </RevealBlock>
            ))}
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 8: Checkout Form ──────────────────────────────────── */}
      <RevealBlock>
        <section className="bg-[#f7f7f8] py-12 md:py-16">
          <div className="max-w-xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">Checkout</h2>
            <div className="bg-white rounded-lg border border-[#e3e3e3] p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#6b7280] mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-[#e3e3e3] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#008060]/20 focus:border-[#008060] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#6b7280] mb-1.5">First Name</label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full px-4 py-3 border border-[#e3e3e3] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#008060]/20 focus:border-[#008060] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6b7280] mb-1.5">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-[#e3e3e3] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#008060]/20 focus:border-[#008060] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6b7280] mb-1.5">Shipping Address</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  className="w-full px-4 py-3 border border-[#e3e3e3] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#008060]/20 focus:border-[#008060] transition-colors"
                />
              </div>
              <div className="pt-2">
                <button className="w-full py-3 bg-[#008060] text-white text-sm font-medium rounded-lg hover:bg-[#006e52] transition-colors">
                  Complete Order
                </button>
              </div>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 9: Alerts / Notifications ────────────────────────────── */}
      <RevealBlock>
        <section className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Notifications</h2>
          <div className="flex items-start gap-3 p-4 bg-[#d1fae5] border border-[#a7f3d0] rounded-lg">
            <IconCheck className="w-5 h-5 text-[#065f46] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#065f46]">Order confirmed</p>
              <p className="text-xs text-[#065f46]/70 mt-0.5">Your order #1042 has been placed successfully.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#fef3c7] border border-[#fde68a] rounded-lg">
            <IconTruck className="w-5 h-5 text-[#92400e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#92400e]">Shipping update</p>
              <p className="text-xs text-[#92400e]/70 mt-0.5">Your package is on its way. Expected delivery: March 20.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#fee2e2] border border-[#fecaca] rounded-lg">
            <IconShield className="w-5 h-5 text-[#991b1b] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#991b1b]">Payment failed</p>
              <p className="text-xs text-[#991b1b]/70 mt-0.5">Please update your payment method to complete the order.</p>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 10: Orders Data Table ─────────────────────────────── */}
      <RevealBlock>
        <section className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Recent Orders</h2>
          <div className="border border-[#e3e3e3] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f7f7f8] text-left">
                  <th className="px-4 py-3 font-medium text-[#6b7280]">Order</th>
                  <th className="px-4 py-3 font-medium text-[#6b7280]">Customer</th>
                  <th className="px-4 py-3 font-medium text-[#6b7280] hidden sm:table-cell">Items</th>
                  <th className="px-4 py-3 font-medium text-[#6b7280]">Total</th>
                  <th className="px-4 py-3 font-medium text-[#6b7280]">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order) => (
                  <tr key={order.id} className="border-t border-[#e3e3e3] hover:bg-[#f7f7f8]/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#1a1a1a]">{order.id}</td>
                    <td className="px-4 py-3 text-[#6b7280]">{order.customer}</td>
                    <td className="px-4 py-3 text-[#6b7280] hidden sm:table-cell">{order.items}</td>
                    <td className="px-4 py-3 font-medium text-[#1a1a1a]">{order.total}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full ${
                        order.status === "Delivered" ? "bg-[#d1fae5] text-[#065f46]" :
                        order.status === "Shipped" ? "bg-[#e0e7ff] text-[#3730a3]" :
                        "bg-[#fef3c7] text-[#92400e]"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 11: Testimonials ──────────────────────────────────────── */}
      <RevealBlock>
        <section id="journal" className="bg-[#f7f7f8] py-12 md:py-16 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-10">What Our Merchants Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <RevealBlock key={t.name} delay={i * 0.1}>
                  <div className="bg-white rounded-lg border border-[#e3e3e3] p-6">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <IconStar key={si} className="w-4 h-4 text-[#fbbf24]" />
                      ))}
                    </div>
                    <p className="text-sm text-[#6b7280] leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                    <div>
                      <p className="text-sm font-medium text-[#1a1a1a]">{t.name}</p>
                      <p className="text-xs text-[#9ca3af]">{t.role}</p>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 12: Rules Summary ─────────────────────────────────────── */}
      <RevealBlock>
        <section id="about" className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 scroll-mt-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Shopify Clean Design Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-[#e3e3e3] p-6">
              <h3 className="text-sm font-semibold text-[#008060] uppercase tracking-wider mb-4">Do</h3>
              <ul className="space-y-2.5">
                {[
                  "Use white or #f7f7f8 backgrounds",
                  "Brand green #008060 for primary CTAs",
                  "Consistent aspect ratios for product images",
                  "Clear price hierarchy with font-semibold",
                  "Full-width CTA buttons on mobile",
                  "Subtle borders with #e3e3e3",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-sm text-[#6b7280]">
                    <IconCheck className="w-4 h-4 text-[#008060] mt-0.5 shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg border border-[#e3e3e3] p-6">
              <h3 className="text-sm font-semibold text-[#dc2626] uppercase tracking-wider mb-4">Don&apos;t</h3>
              <ul className="space-y-2.5">
                {[
                  "Dark backgrounds as primary color",
                  "Rounded corners beyond rounded-xl",
                  "Large decorative elements on listings",
                  "Low-contrast pricing text",
                  "Filters or overlays on product images",
                  "Heavy shadows (shadow-2xl)",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-sm text-[#6b7280]">
                    <span className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center text-[#dc2626] text-xs font-bold">x</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 13: Newsletter ────────────────────────────────────────── */}
      <RevealBlock>
        <section className="bg-[#1a1a1a] py-12 md:py-16">
          <div className="max-w-xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-3">Stay in the Loop</h2>
            <p className="text-sm text-[#9ca3af] mb-6">Get notified about new arrivals and exclusive offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#008060]/40 focus:border-[#008060] transition-colors"
              />
              <button className="px-6 py-3 bg-[#008060] text-white text-sm font-medium rounded-lg hover:bg-[#006e52] transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 14: Footer ────────────────────────────────────────────── */}
      <RevealBlock>
        <footer className="bg-[#1a1a1a] border-t border-white/10 text-white px-4 md:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <p className="font-medium mb-3">Shop</p>
              <div className="space-y-2 text-[#9ca3af]">
                <p>All Products</p><p>New Arrivals</p><p>Best Sellers</p><p>Sale</p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-3">Support</p>
              <div className="space-y-2 text-[#9ca3af]">
                <p>Contact Us</p><p>Shipping Info</p><p>Returns</p><p>FAQ</p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-3">Company</p>
              <div className="space-y-2 text-[#9ca3af]">
                <p>About</p><p>Blog</p><p>Careers</p><p>Press</p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-3">Legal</p>
              <div className="space-y-2 text-[#9ca3af]">
                <p>Privacy Policy</p><p>Terms of Service</p><p>Cookie Policy</p>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9ca3af]">
            <p>2026 STORE. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-6 bg-white/10 rounded" />
              <div className="w-10 h-6 bg-white/10 rounded" />
              <div className="w-10 h-6 bg-white/10 rounded" />
              <div className="w-10 h-6 bg-white/10 rounded" />
            </div>
          </div>
        </footer>
      </RevealBlock>
    </div>
  );
}
