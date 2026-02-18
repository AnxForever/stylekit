"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, MessageCircle, Sparkles } from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const blogPosts = [
  {
    id: 1,
    category: "DESIGN",
    title: "为什么你的下一个项目需要大胆的颜色",
    excerpt: "安全的颜色选择是设计的坟墓。让我告诉你为什么应该放飞自我。",
    date: "2025.02.10",
    likes: 42,
    comments: 12,
    color: "bg-[#ff6b6b]",
    shadowColor: "shadow-[6px_6px_0px_0px_rgba(255,107,107,1)]",
    rotate: "-rotate-1",
  },
  {
    id: 2,
    category: "CODE",
    title: "CSS 也可以很 Punk：用 CSS 做出粗野风动画",
    excerpt: "谁说 CSS 只能做无聊的东西？看我用 10 行代码做出令人尖叫的效果。",
    date: "2025.02.05",
    likes: 67,
    comments: 23,
    color: "bg-[#4ecdc4]",
    shadowColor: "shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]",
    rotate: "rotate-1",
  },
  {
    id: 3,
    category: "OPINION",
    title: "极简主义已经无聊了——是时候回归混乱",
    excerpt: "整个互联网都长得一样。白色背景、无衬线字体、圆角卡片。够了。",
    date: "2025.01.28",
    likes: 128,
    comments: 45,
    color: "bg-[#ffe66d]",
    shadowColor: "shadow-[6px_6px_0px_0px_rgba(255,230,109,1)]",
    rotate: "-rotate-2",
  },
  {
    id: 4,
    category: "TUTORIAL",
    title: "从零打造一个 Neo-Brutalist 设计系统",
    excerpt: "粗边框、硬阴影、纯色块。这篇教程教你系统化地构建粗野风组件。",
    date: "2025.01.20",
    likes: 89,
    comments: 31,
    color: "bg-[#95e1d3]",
    shadowColor: "shadow-[6px_6px_0px_0px_rgba(149,225,211,1)]",
    rotate: "rotate-1",
  },
  {
    id: 5,
    category: "CULTURE",
    title: "Brutalism 不只是设计风格，它是一种态度",
    excerpt: "追溯粗野主义从建筑到数字设计的演变，以及它为何在今天再次流行。",
    date: "2025.01.12",
    likes: 56,
    comments: 19,
    color: "bg-[#f38181]",
    shadowColor: "shadow-[6px_6px_0px_0px_rgba(243,129,129,1)]",
    rotate: "-rotate-1",
  },
];

const categories = [
  { name: "ALL", color: "bg-black" },
  { name: "DESIGN", color: "bg-[#ff6b6b]" },
  { name: "CODE", color: "bg-[#4ecdc4]" },
  { name: "OPINION", color: "bg-[#ffe66d]" },
  { name: "TUTORIAL", color: "bg-[#95e1d3]" },
  { name: "CULTURE", color: "bg-[#f38181]" },
];

export default function BrutalistPlayfulBlogTemplate() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [email, setEmail] = useState("");

  const filteredPosts =
    activeCategory === "ALL"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Navigation */}
      <nav className="border-b-4 border-black bg-[#ffe66d]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between">
          <Link
            href="/templates/brutalist-playful-blog"
            className="border-4 border-black bg-black px-3 py-1 text-lg font-black text-white shadow-[4px_4px_0px_0px_rgba(255,107,107,1)]"
          >
            PUNK BLOG
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {["Blog", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="border-4 border-black bg-white px-4 py-2 text-xs font-black tracking-[0.12em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                {item.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 md:py-20 lg:py-28 px-4 md:px-8 lg:px-12 border-b-4 border-black bg-white relative overflow-hidden">
        <div className="absolute top-8 right-8 w-32 h-32 bg-[#ff6b6b] border-4 border-black rotate-12 hidden lg:block" />
        <div className="absolute bottom-12 left-12 w-20 h-20 bg-[#4ecdc4] border-4 border-black -rotate-6 hidden lg:block" />

        <div className="max-w-6xl mx-auto relative">
          <div className="inline-block -rotate-2 border-4 border-black bg-[#ff6b6b] px-4 py-2 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-xs font-black tracking-[0.15em] text-white">WELCOME TO THE CHAOS</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.85] tracking-[-0.04em]">
            <span className="block">THINK</span>
            <span className="block text-transparent [-webkit-text-stroke:3px_#000]">DIFFERENT</span>
            <span className="block">
              <span className="bg-[#4ecdc4] px-2">DESIGN</span>{" "}
              <span className="bg-[#ffe66d] px-2">LOUD</span>
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-sm md:text-base leading-relaxed text-gray-700">
            这里不聊安全的设计。我们谈论的是打破规则、拥抱混乱、
            让你的设计发出声音的那种设计。准备好了吗？
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section id="blog" className="py-8 px-4 md:px-8 lg:px-12 border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`border-4 border-black px-3 py-1.5 text-[10px] font-black tracking-[0.14em] transition-all ${
                  activeCategory === cat.name
                    ? `${cat.color} ${cat.name === "OPINION" || cat.name === "TUTORIAL" ? "text-black" : "text-white"} shadow-none translate-x-[2px] translate-y-[2px]`
                    : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <a
                key={post.id}
                href="#"
                className={`group block border-4 border-black bg-white ${post.shadowColor} ${post.rotate} hover:rotate-0 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-300`}
              >
                {/* Color Header */}
                <div className={`${post.color} px-5 py-3 border-b-4 border-black flex items-center justify-between`}>
                  <span className="text-[10px] font-black tracking-[0.15em]">{post.category}</span>
                  <span className="text-[10px] font-black">{post.date}</span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-3">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-bold">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" /> {post.comments}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-black group-hover:text-[#ff6b6b] transition-colors">
                      READ MORE <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 border-4 border-black border-dashed">
              <p className="text-xl font-black">NOTHING HERE YET</p>
              <p className="text-sm text-gray-500 mt-2">这个分类还没有文章，去看看别的吧！</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-12 bg-[#4ecdc4] border-y-4 border-black">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block -rotate-2 border-4 border-black bg-white px-4 py-2 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="w-5 h-5 inline mr-2" />
            <span className="text-xs font-black tracking-[0.12em]">JOIN THE REBELLION</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-4">
            不想错过<br />任何好文章？
          </h2>
          <p className="text-sm mb-8 max-w-md mx-auto">
            订阅我们的周报。每周精选最好的设计文章、教程和灵感，直接送到你的邮箱。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="邮箱地址"
              className="flex-1 border-4 border-black px-4 py-3 font-mono text-sm focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] transition-all"
            />
            <button className="border-4 border-black bg-black text-white px-6 py-3 font-black text-sm tracking-[0.12em] shadow-[4px_4px_0px_0px_rgba(255,107,107,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 lg:px-12 border-t-4 border-black bg-black text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-black text-lg">PUNK BLOG</span>
            <span className="text-xs text-gray-400">
              Copyright 2025 · Part of{" "}
              <Link href="/templates" className="text-white hover:text-[#4ecdc4] transition-colors">
                StyleKit Templates
              </Link>
            </span>
          </div>
          <div className="flex gap-3">
            {["TWITTER", "GITHUB", "DISCORD"].map((s) => (
              <a
                key={s}
                href="#"
                className="border-2 border-white px-3 py-1 text-[10px] font-black tracking-[0.12em] hover:bg-white hover:text-black transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
      <TemplateBackButton variant="brutal" />
    </div>
  );
}
