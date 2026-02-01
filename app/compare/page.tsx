"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta } from "@/lib/styles";

type ComponentType = "button" | "card" | "input";

// Style-specific component renderers
const styleComponents: Record<string, Record<ComponentType, () => React.ReactNode>> = {
  "neo-brutalist": {
    button: () => (
      <button className="px-6 py-3 bg-[#ff006e] text-white font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#ccff00] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="font-black text-xl mb-2">Neo-Brutalist Card</h3>
        <p className="font-mono text-sm">大胆、直接、有冲击力的设计风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white border-4 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      />
    ),
  },
  "neo-brutalist-soft": {
    button: () => (
      <button className="px-6 py-3 bg-[#a855f7] text-white font-bold rounded-2xl border-2 border-black/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-black/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
        <h3 className="font-bold text-xl mb-2">Soft Brutalist Card</h3>
        <p className="text-sm text-gray-600">柔和的新粗野主义风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white rounded-xl border-2 border-black/20 focus:outline-none focus:border-purple-400 transition-colors"
      />
    ),
  },
  "neo-brutalist-playful": {
    button: () => (
      <button className="px-6 py-3 bg-[#fbbf24] text-black font-black rounded-full border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:rotate-1 transition-all">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#c4b5fd] rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1">
        <h3 className="font-black text-xl mb-2">Playful Card</h3>
        <p className="text-sm">活泼有趣的设计风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-[#fef3c7] rounded-full border-3 border-black font-mono focus:outline-none focus:rotate-1 transition-transform"
      />
    ),
  },
  editorial: {
    button: () => (
      <button className="px-6 py-3 bg-black text-white text-sm tracking-widest uppercase hover:bg-zinc-800 transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 border border-zinc-200">
        <p className="text-xs tracking-widest uppercase text-zinc-400 mb-2">Featured</p>
        <h3 className="font-serif text-xl italic mb-2">Editorial Card</h3>
        <p className="text-sm text-zinc-600">优雅的杂志编排风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-0 py-3 bg-transparent border-b border-zinc-300 text-sm tracking-wide focus:outline-none focus:border-black transition-colors"
      />
    ),
  },
  neumorphism: {
    button: () => (
      <button className="px-6 py-3 bg-[#e0e5ec] text-zinc-600 font-medium rounded-xl shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] transition-shadow">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#e0e5ec] rounded-2xl shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]">
        <h3 className="font-semibold text-lg mb-2 text-zinc-700">Neumorphism Card</h3>
        <p className="text-sm text-zinc-500">柔和的新拟态风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-[#e0e5ec] rounded-xl shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] text-zinc-600 focus:outline-none"
      />
    ),
  },
  glassmorphism: {
    button: () => (
      <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
        <button className="px-6 py-3 bg-white/20 backdrop-blur-md text-white font-medium rounded-lg border border-white/30 hover:bg-white/30 transition-all">
          点击按钮
        </button>
      </div>
    ),
    card: () => (
      <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
        <div className="p-6 bg-white/15 backdrop-blur-xl rounded-xl border border-white/20">
          <h3 className="font-semibold text-lg mb-2 text-white">Glassmorphism Card</h3>
          <p className="text-sm text-white/70">毛玻璃透明效果</p>
        </div>
      </div>
    ),
    input: () => (
      <div className="p-4 bg-gradient-to-br from-pink-500 to-orange-400 rounded-xl">
        <input
          type="text"
          placeholder="输入内容..."
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
        />
      </div>
    ),
  },
  "bento-grid": {
    button: () => (
      <button className="px-6 py-3 bg-zinc-900 text-white font-medium rounded-xl hover:bg-zinc-800 transition-colors">
        点击按钮
      </button>
    ),
    card: () => (
      <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white">
        <span className="text-3xl mb-3 block">🚀</span>
        <h3 className="font-bold text-lg mb-2">Bento Card</h3>
        <p className="text-sm text-white/80">便当盒布局风格</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="输入内容..."
        className="w-full px-4 py-3 bg-white rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
      />
    ),
  },
};

const componentLabels: Record<ComponentType, string> = {
  button: "按钮",
  card: "卡片",
  input: "输入框",
};

export default function ComparePage() {
  const styles = getAllStylesMeta();
  const [leftStyle, setLeftStyle] = useState(styles[0]?.slug || "");
  const [rightStyle, setRightStyle] = useState(styles[1]?.slug || "");
  const [activeComponent, setActiveComponent] = useState<ComponentType>("button");

  const renderComponent = (styleSlug: string, component: ComponentType) => {
    const styleRenderer = styleComponents[styleSlug];
    if (!styleRenderer) {
      return <div className="text-muted text-sm">此风格暂无组件预览</div>;
    }
    return styleRenderer[component]?.() || <div className="text-muted text-sm">暂无此组件</div>;
  };

  const getStyleName = (slug: string) => {
    return styles.find((s) => s.slug === slug)?.name || slug;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Side-by-Side Comparison
            </p>
            <h1 className="text-4xl md:text-5xl mb-4">风格对比</h1>
            <p className="text-lg text-muted max-w-2xl">
              选择两个风格，对比它们在同一组件上的不同呈现效果。
            </p>
          </div>
        </section>

        {/* Controls */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
            <div className="flex flex-wrap items-center gap-6">
              {/* Component Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">组件：</span>
                <div className="flex gap-2">
                  {(Object.keys(componentLabels) as ComponentType[]).map((comp) => (
                    <button
                      key={comp}
                      onClick={() => setActiveComponent(comp)}
                      className={`px-3 py-1.5 text-sm transition-colors ${
                        activeComponent === comp
                          ? "bg-foreground text-background"
                          : "border border-border hover:border-foreground"
                      }`}
                    >
                      {componentLabels[comp]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Swap Button */}
              <button
                onClick={() => {
                  setLeftStyle(rightStyle);
                  setRightStyle(leftStyle);
                }}
                className="px-3 py-1.5 text-sm border border-border hover:border-foreground transition-colors"
              >
                ⇄ 交换
              </button>
            </div>
          </div>
        </section>

        {/* Comparison Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Panel */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <select
                    value={leftStyle}
                    onChange={(e) => setLeftStyle(e.target.value)}
                    className="px-4 py-2 bg-background border border-border text-sm focus:outline-none focus:border-foreground"
                  >
                    {styles.map((style) => (
                      <option key={style.slug} value={style.slug}>
                        {style.name}
                      </option>
                    ))}
                  </select>
                  <Link
                    href={`/styles/${leftStyle}`}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    查看详情 →
                  </Link>
                </div>
                <div className="min-h-[200px] p-8 bg-zinc-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
                  {renderComponent(leftStyle, activeComponent)}
                </div>
                <p className="text-center text-sm text-muted">{getStyleName(leftStyle)}</p>
              </div>

              {/* Right Panel */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <select
                    value={rightStyle}
                    onChange={(e) => setRightStyle(e.target.value)}
                    className="px-4 py-2 bg-background border border-border text-sm focus:outline-none focus:border-foreground"
                  >
                    {styles.map((style) => (
                      <option key={style.slug} value={style.slug}>
                        {style.name}
                      </option>
                    ))}
                  </select>
                  <Link
                    href={`/styles/${rightStyle}`}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    查看详情 →
                  </Link>
                </div>
                <div className="min-h-[200px] p-8 bg-zinc-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
                  {renderComponent(rightStyle, activeComponent)}
                </div>
                <p className="text-center text-sm text-muted">{getStyleName(rightStyle)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* All Components Preview */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-2xl mb-8">全部组件对比</h2>
            <div className="space-y-12">
              {(Object.keys(componentLabels) as ComponentType[]).map((comp) => (
                <div key={comp}>
                  <h3 className="text-lg font-medium mb-4">{componentLabels[comp]}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
                      {renderComponent(leftStyle, comp)}
                    </div>
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
                      {renderComponent(rightStyle, comp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
