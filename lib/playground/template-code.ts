/**
 * Playground Template Code Generator
 *
 * Maps archetype IDs to ready-to-use Tailwind HTML snippets
 * that render directly in the playground iframe (which loads Tailwind CDN).
 */

export interface PlaygroundTemplate {
  id: string;
  category: string;
  code: string;
}

const templates: Record<string, string> = {
  // ===== LANDING =====
  "landing-hero-centered": `<section class="min-h-[80vh] flex items-center justify-center px-4 py-16">
  <div class="max-w-4xl mx-auto text-center">
    <span class="inline-block px-4 py-1 mb-6 text-sm font-bold uppercase tracking-wider border-2 border-current bg-yellow-300">
      New Release
    </span>
    <h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
      Build Beautiful<br/><span class="text-pink-500">Products</span>
    </h1>
    <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
      Ship faster with a design system that keeps your UI consistent across every screen.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="px-8 py-3 text-lg font-bold bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
        Get Started
      </button>
      <button class="px-8 py-3 text-lg font-bold border-2 border-black rounded-lg hover:bg-gray-50 transition-colors">
        Learn More
      </button>
    </div>
  </div>
</section>

<section class="px-4 py-16 md:py-24 bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl md:text-5xl font-black text-center mb-4">Features</h2>
    <p class="text-gray-500 text-center mb-12 max-w-xl mx-auto">Everything you need to build production-ready interfaces.</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 font-bold">1</div>
        <h3 class="text-xl font-bold mb-2">Design Tokens</h3>
        <p class="text-gray-500 text-sm">Consistent colors, spacing, and typography across your entire app.</p>
      </div>
      <div class="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div class="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 font-bold">2</div>
        <h3 class="text-xl font-bold mb-2">Component Recipes</h3>
        <p class="text-gray-500 text-sm">Pre-built patterns with variants, slots, and interactive states.</p>
      </div>
      <div class="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div class="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 font-bold">3</div>
        <h3 class="text-xl font-bold mb-2">AI Rules Export</h3>
        <p class="text-gray-500 text-sm">Export rules for Cursor, Claude Code, and other AI coding tools.</p>
      </div>
    </div>
  </div>
</section>

<section class="px-4 py-16 md:py-24">
  <div class="max-w-3xl mx-auto text-center">
    <h2 class="text-3xl md:text-4xl font-black mb-4">Ready to get started?</h2>
    <p class="text-gray-500 mb-8">Join thousands of teams shipping better products.</p>
    <button class="px-8 py-3 text-lg font-bold bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
      Start Free Trial
    </button>
  </div>
</section>`,

  "landing-hero-split": `<section class="min-h-[80vh] flex items-center px-4 py-16">
  <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
      <span class="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-700 rounded-full">
        Launching Soon
      </span>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
        The future of<br/>design systems
      </h1>
      <p class="text-lg text-gray-600 mb-8 max-w-lg">
        A toolkit that bridges the gap between designers and AI-powered code generation.
      </p>
      <div class="flex gap-4">
        <button class="px-6 py-3 font-bold bg-black text-white rounded-lg">Get Started</button>
        <button class="px-6 py-3 font-bold border border-gray-300 rounded-lg">Watch Demo</button>
      </div>
    </div>
    <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 aspect-square flex items-center justify-center">
      <div class="w-full max-w-sm space-y-4">
        <div class="h-8 bg-white/80 rounded-lg shadow-sm"></div>
        <div class="h-24 bg-white/80 rounded-lg shadow-sm"></div>
        <div class="grid grid-cols-2 gap-4">
          <div class="h-16 bg-white/80 rounded-lg shadow-sm"></div>
          <div class="h-16 bg-white/80 rounded-lg shadow-sm"></div>
        </div>
      </div>
    </div>
  </div>
</section>`,

  // ===== DASHBOARD =====
  "dashboard-sidebar": `<div class="flex h-screen bg-gray-100">
  <aside class="w-64 bg-white border-r border-gray-200 p-4 hidden lg:block">
    <div class="font-bold text-lg mb-6 px-2">Dashboard</div>
    <nav class="space-y-1">
      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-100 text-gray-900 font-medium text-sm">
        <span class="w-5 h-5 bg-gray-400 rounded"></span> Overview
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
        <span class="w-5 h-5 bg-gray-300 rounded"></span> Analytics
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
        <span class="w-5 h-5 bg-gray-300 rounded"></span> Projects
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
        <span class="w-5 h-5 bg-gray-300 rounded"></span> Settings
      </a>
    </nav>
  </aside>
  <main class="flex-1 overflow-auto p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Overview</h1>
      <p class="text-gray-500 text-sm">Welcome back. Here's what's happening.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white rounded-xl p-5 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Revenue</div>
        <div class="text-2xl font-bold">$12,450</div>
        <div class="text-xs text-green-600 mt-1">+12.5% from last month</div>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Users</div>
        <div class="text-2xl font-bold">2,340</div>
        <div class="text-xs text-green-600 mt-1">+8.2% from last month</div>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Active Projects</div>
        <div class="text-2xl font-bold">18</div>
        <div class="text-xs text-gray-400 mt-1">3 due this week</div>
      </div>
    </div>
    <div class="bg-white rounded-xl border border-gray-200 p-5">
      <h2 class="font-semibold mb-4">Recent Activity</h2>
      <div class="space-y-3">
        <div class="flex items-center gap-3 py-2 border-b border-gray-100">
          <div class="w-8 h-8 bg-blue-100 rounded-full"></div>
          <div class="flex-1"><span class="font-medium text-sm">New user signed up</span><span class="text-gray-400 text-xs ml-2">2m ago</span></div>
        </div>
        <div class="flex items-center gap-3 py-2 border-b border-gray-100">
          <div class="w-8 h-8 bg-green-100 rounded-full"></div>
          <div class="flex-1"><span class="font-medium text-sm">Payment received</span><span class="text-gray-400 text-xs ml-2">15m ago</span></div>
        </div>
        <div class="flex items-center gap-3 py-2">
          <div class="w-8 h-8 bg-purple-100 rounded-full"></div>
          <div class="flex-1"><span class="font-medium text-sm">Project deployed</span><span class="text-gray-400 text-xs ml-2">1h ago</span></div>
        </div>
      </div>
    </div>
  </main>
</div>`,

  // ===== BLOG =====
  "blog-classic": `<article class="max-w-3xl mx-auto px-4 py-12">
  <header class="mb-8">
    <div class="flex items-center gap-2 mb-4">
      <span class="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">Design</span>
      <span class="text-sm text-gray-400">Feb 16, 2026</span>
    </div>
    <h1 class="text-3xl md:text-5xl font-black leading-tight mb-4">
      Building Design Systems That Scale
    </h1>
    <p class="text-lg text-gray-500 mb-6">
      How to create a design system that grows with your product without becoming a maintenance burden.
    </p>
    <div class="flex items-center gap-3 pb-6 border-b border-gray-200">
      <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
      <div>
        <div class="font-medium text-sm">Alex Chen</div>
        <div class="text-xs text-gray-400">5 min read</div>
      </div>
    </div>
  </header>
  <div class="prose max-w-none">
    <p class="text-gray-700 leading-relaxed mb-4">
      Design systems are the backbone of consistent user interfaces. But as products grow, maintaining consistency becomes increasingly challenging. In this article, we'll explore practical strategies for building systems that scale.
    </p>
    <h2 class="text-2xl font-bold mt-8 mb-4">Start with Tokens</h2>
    <p class="text-gray-700 leading-relaxed mb-4">
      Design tokens are the atomic building blocks of your system. They define colors, spacing, typography, and other visual properties in a platform-agnostic way.
    </p>
    <div class="bg-gray-50 rounded-lg p-4 my-6 font-mono text-sm">
      <code>--color-primary: #3b82f6;<br/>--spacing-md: 1rem;<br/>--font-heading: 'Inter', sans-serif;</code>
    </div>
    <h2 class="text-2xl font-bold mt-8 mb-4">Component Recipes</h2>
    <p class="text-gray-700 leading-relaxed mb-4">
      Once tokens are defined, component recipes provide the patterns for combining them into reusable UI elements.
    </p>
    <blockquote class="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-600">
      "A good design system is invisible. It just makes everything feel right."
    </blockquote>
  </div>
</article>`,

  // ===== PORTFOLIO =====
  "portfolio-grid": `<div class="min-h-screen">
  <header class="px-6 py-16 md:py-24 max-w-5xl mx-auto">
    <p class="text-sm uppercase tracking-widest text-gray-400 mb-4">Portfolio</p>
    <h1 class="text-4xl md:text-6xl font-black mb-4">Creative<br/>Developer</h1>
    <p class="text-lg text-gray-500 max-w-lg">
      I build beautiful, performant web experiences with attention to detail and clean code.
    </p>
  </header>
  <section class="px-6 pb-16 max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="group relative overflow-hidden rounded-xl aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-200">
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-6">
          <div class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all text-white">
            <h3 class="font-bold text-lg">E-Commerce Platform</h3>
            <p class="text-sm text-white/80">React, Next.js, Stripe</p>
          </div>
        </div>
      </div>
      <div class="group relative overflow-hidden rounded-xl aspect-[4/3] bg-gradient-to-br from-purple-100 to-pink-200">
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-6">
          <div class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all text-white">
            <h3 class="font-bold text-lg">SaaS Dashboard</h3>
            <p class="text-sm text-white/80">TypeScript, Tailwind, D3</p>
          </div>
        </div>
      </div>
      <div class="group relative overflow-hidden rounded-xl aspect-[4/3] bg-gradient-to-br from-green-100 to-emerald-200">
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-6">
          <div class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all text-white">
            <h3 class="font-bold text-lg">Mobile App</h3>
            <p class="text-sm text-white/80">React Native, Expo</p>
          </div>
        </div>
      </div>
      <div class="group relative overflow-hidden rounded-xl aspect-[4/3] bg-gradient-to-br from-orange-100 to-amber-200">
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-6">
          <div class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all text-white">
            <h3 class="font-bold text-lg">Design System</h3>
            <p class="text-sm text-white/80">Figma, Storybook, Tokens</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>`,

  // ===== ECOMMERCE =====
  "ecommerce-product-grid": `<div class="max-w-6xl mx-auto px-4 py-8">
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-2xl font-bold">New Arrivals</h1>
      <p class="text-gray-500 text-sm">Fresh picks for the season</p>
    </div>
    <div class="flex gap-2">
      <select class="text-sm border border-gray-200 rounded-lg px-3 py-2">
        <option>Sort by: Featured</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
      </select>
    </div>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    <div class="group">
      <div class="aspect-square bg-gray-100 rounded-xl mb-3 overflow-hidden">
        <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform"></div>
      </div>
      <h3 class="font-medium text-sm">Minimal Sneakers</h3>
      <p class="text-gray-500 text-xs">White / Leather</p>
      <p class="font-bold mt-1">$129</p>
    </div>
    <div class="group">
      <div class="aspect-square bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
        <div class="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 group-hover:scale-105 transition-transform"></div>
        <span class="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded">SALE</span>
      </div>
      <h3 class="font-medium text-sm">Canvas Tote</h3>
      <p class="text-gray-500 text-xs">Natural / Cotton</p>
      <p class="font-bold mt-1"><span class="line-through text-gray-400 mr-1">$89</span>$59</p>
    </div>
    <div class="group">
      <div class="aspect-square bg-gray-100 rounded-xl mb-3 overflow-hidden">
        <div class="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 group-hover:scale-105 transition-transform"></div>
      </div>
      <h3 class="font-medium text-sm">Wool Beanie</h3>
      <p class="text-gray-500 text-xs">Charcoal / Merino</p>
      <p class="font-bold mt-1">$45</p>
    </div>
    <div class="group">
      <div class="aspect-square bg-gray-100 rounded-xl mb-3 overflow-hidden">
        <div class="w-full h-full bg-gradient-to-br from-green-50 to-green-100 group-hover:scale-105 transition-transform"></div>
      </div>
      <h3 class="font-medium text-sm">Linen Shirt</h3>
      <p class="text-gray-500 text-xs">Sage / Relaxed Fit</p>
      <p class="font-bold mt-1">$78</p>
    </div>
  </div>
</div>`,

  // ===== FORM =====
  "form-single-column": `<div class="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
  <div class="w-full max-w-md">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 class="text-2xl font-bold mb-1">Create Account</h2>
      <p class="text-gray-500 text-sm mb-6">Start your free trial today.</p>
      <form class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">First Name</label>
            <input type="text" placeholder="John" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"/>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Last Name</label>
            <input type="text" placeholder="Doe" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"/>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input type="email" placeholder="john@example.com" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"/>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input type="password" placeholder="Min 8 characters" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"/>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="terms" class="rounded"/>
          <label for="terms" class="text-sm text-gray-600">I agree to the Terms and Privacy Policy</label>
        </div>
        <button type="submit" class="w-full py-2.5 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
          Create Account
        </button>
      </form>
      <p class="text-center text-sm text-gray-500 mt-4">
        Already have an account? <a href="#" class="text-black font-medium">Sign in</a>
      </p>
    </div>
  </div>
</div>`,

  // ===== AUTH =====
  "auth-centered": `<div class="min-h-screen flex items-center justify-center px-4 bg-gray-50">
  <div class="w-full max-w-sm">
    <div class="text-center mb-8">
      <div class="w-12 h-12 bg-black rounded-xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">S</div>
      <h1 class="text-2xl font-bold">Welcome back</h1>
      <p class="text-gray-500 text-sm mt-1">Sign in to your account</p>
    </div>
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input type="email" placeholder="you@example.com" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"/>
        </div>
        <div>
          <label class="flex items-center justify-between text-sm font-medium mb-1">
            Password
            <a href="#" class="text-gray-400 font-normal hover:text-gray-600">Forgot?</a>
          </label>
          <input type="password" placeholder="Enter password" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"/>
        </div>
        <button type="submit" class="w-full py-2.5 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
          Sign In
        </button>
      </form>
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
        <div class="relative flex justify-center"><span class="bg-white px-3 text-xs text-gray-400">or continue with</span></div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <button class="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Google</button>
        <button class="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">GitHub</button>
      </div>
    </div>
    <p class="text-center text-sm text-gray-500 mt-4">
      No account? <a href="#" class="text-black font-medium">Sign up</a>
    </p>
  </div>
</div>`,
};

/**
 * Get template HTML code by archetype ID.
 * Falls back to a category-level match or null.
 */
export function getTemplateCode(archetypeId: string): string | null {
  if (templates[archetypeId]) return templates[archetypeId];

  // Try category prefix match
  const category = archetypeId.split("-")[0];
  const fallback = Object.entries(templates).find(([key]) => key.startsWith(category));
  return fallback ? fallback[1] : null;
}

/**
 * Get all available template IDs that have code
 */
export function getAvailableTemplateIds(): string[] {
  return Object.keys(templates);
}
