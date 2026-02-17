import Link from "next/link";
import {
  Calendar,
  Clock,
  Search,
  Tag,
  User,
} from "lucide-react";

const posts = [
  {
    title: "Building Design Systems at Scale",
    excerpt: "如何在大型团队中构建和维护一套统一的设计系统，从 Token 到组件的完整实践。",
    category: "Design",
    author: "Lin Zhang",
    date: "2025-01-20",
    readTime: "8 min read",
    featured: true,
  },
  {
    title: "The Future of CSS",
    excerpt: "CSS Container Queries、Cascade Layers、以及即将到来的 CSS 新特性盘点。",
    category: "Frontend",
    author: "Yuki Tanaka",
    date: "2025-01-18",
    readTime: "6 min read",
    featured: false,
  },
  {
    title: "Server Components Deep Dive",
    excerpt: "深入理解 React Server Components 的工作原理，以及它如何改变前端架构。",
    category: "React",
    author: "Alex Chen",
    date: "2025-01-15",
    readTime: "12 min read",
    featured: false,
  },
  {
    title: "Typography in Web Design",
    excerpt: "排版是设计的基石。探索 Web 字体选择、行高设定和阅读节奏的最佳实践。",
    category: "Design",
    author: "Mika Sato",
    date: "2025-01-12",
    readTime: "5 min read",
    featured: false,
  },
  {
    title: "Performance Optimization Guide",
    excerpt: "从 Core Web Vitals 到 Bundle Size，一份完整的前端性能优化实践指南。",
    category: "Performance",
    author: "David Kim",
    date: "2025-01-08",
    readTime: "10 min read",
    featured: false,
  },
];

const categories = [
  { name: "All", count: 24 },
  { name: "Design", count: 8 },
  { name: "Frontend", count: 6 },
  { name: "React", count: 5 },
  { name: "Performance", count: 3 },
  { name: "Career", count: 2 },
];

const popularPosts = [
  "Understanding TypeScript Generics",
  "Tailwind CSS Best Practices",
  "State Management in 2025",
];

const tags = [
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Design",
  "UI/UX",
  "Performance",
  "Testing",
  "A11y",
];

export default function BlogSidebarTemplate() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link
            href="/templates/blog-sidebar"
            className="text-xl font-bold tracking-tight"
          >
            devlog<span className="text-emerald-500">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Articles
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Topics
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </a>
            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Articles */}
          <div>
            <h1 className="text-3xl font-bold mb-8">Latest Articles</h1>

            {/* Featured Post */}
            {posts
              .filter((p) => p.featured)
              .map((post) => (
                <a
                  key={post.title}
                  href="#"
                  className="block mb-10 group"
                >
                  <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl h-56 mb-5 flex items-center justify-center">
                    <span className="text-white/50 text-7xl font-black">
                      F
                    </span>
                  </div>
                  <span className="inline-block text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mb-3">
                    Featured
                  </span>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </a>
              ))}

            {/* Post List */}
            <div className="space-y-6">
              {posts
                .filter((p) => !p.featured)
                .map((post) => (
                  <a
                    key={post.title}
                    href="#"
                    className="block group bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </a>
                ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Search */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-gray-300 transition-colors"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <a
                    key={cat.name}
                    href="#"
                    className="flex items-center justify-between py-2 px-3 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-gray-400">{cat.count}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold mb-4">Popular</h3>
              <div className="space-y-3">
                {popularPosts.map((title, i) => (
                  <a
                    key={title}
                    href="#"
                    className="flex gap-3 group"
                  >
                    <span className="text-lg font-bold text-gray-200 group-hover:text-emerald-400 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm group-hover:text-emerald-600 transition-colors leading-snug">
                      {title}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <a
                    key={tag}
                    href="#"
                    className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-100 rounded-full hover:border-gray-300 hover:bg-white transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-900 text-white rounded-xl p-5">
              <h3 className="font-semibold mb-2">Newsletter</h3>
              <p className="text-sm text-gray-400 mb-4">
                Get the latest articles delivered to your inbox.
              </p>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-500 mb-3"
              />
              <button className="w-full py-2.5 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-4 md:px-8 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            Copyright 2025 devlog. Part of{" "}
            <Link
              href="/templates"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">
              RSS
            </a>
            <a href="#" className="hover:text-gray-600">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-600">
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Back to Templates */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href="/templates"
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
        >
          ← 返回模板
        </Link>
      </div>
    </div>
  );
}
