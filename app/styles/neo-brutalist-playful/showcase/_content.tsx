"use client";

import { useState } from "react";
import Link from "next/link";

export default function ShowcaseContent() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#ffe66d] border-b-4 border-black px-4 md:px-8 py-4 md:py-5">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/styles/neo-brutalist-playful/showcase" className="font-black text-xl md:text-2xl bg-black text-white px-3 py-1 rotate-[-2deg] hover:scale-110 transition-transform">
            FUN ⚡
          </Link>
          <div className="flex gap-3 md:gap-6">
            <Link href="/styles/neo-brutalist-playful" className="font-black text-sm md:text-base px-3 py-1 border-2 border-black hover:bg-[#ff6b6b] hover:text-white transition-colors">
              文档 📖
            </Link>
            <Link href="/styles" className="font-black text-sm md:text-base px-3 py-1 border-2 border-black hover:bg-[#4ecdc4] transition-colors">
              返回 ↩️
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 md:px-8 bg-[#4ecdc4] border-b-4 border-black overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-10 -right-10 text-6xl rotate-12">🎨</div>
          <div className="absolute bottom-0 -left-16 text-5xl -rotate-12">⚡</div>
          <h1 className="font-black text-5xl md:text-7xl lg:text-9xl leading-none mb-6 rotate-[-2deg]">
            PLAY
            <br />
            <span className="text-white">FUL!</span>
          </h1>
          <p className="font-mono text-lg md:text-xl max-w-md mb-8 rotate-[1deg]">
            野兽派也可以很有趣 ✨
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#ff6b6b] text-white font-black px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all rotate-[-1deg]">
              开始玩 🎮
            </button>
            <button className="bg-[#ffe66d] font-black px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all rotate-[1deg]">
              看看吧 👀
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[-1deg]">配色系统 🎨</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Red", hex: "#ff6b6b", bg: "bg-[#ff6b6b]", emoji: "❤️" },
              { name: "Teal", hex: "#4ecdc4", bg: "bg-[#4ecdc4]", emoji: "💚" },
              { name: "Yellow", hex: "#ffe66d", bg: "bg-[#ffe66d]", emoji: "💛" },
              { name: "Mint", hex: "#95e1d3", bg: "bg-[#95e1d3]", emoji: "🌿" },
              { name: "Coral", hex: "#f38181", bg: "bg-[#f38181]", emoji: "🌸" },
            ].map((color, i) => (
              <div key={color.name} className={`border-4 border-black ${i % 2 === 0 ? "rotate-[1deg]" : "rotate-[-1deg]"}`}>
                <div className={`h-24 md:h-32 ${color.bg} flex items-center justify-center text-3xl`}>{color.emoji}</div>
                <div className="p-3 md:p-4 border-t-4 border-black bg-white">
                  <p className="font-black text-sm md:text-base">{color.name}</p>
                  <p className="font-mono text-xs text-gray-600">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#ff6b6b]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 text-white rotate-[1deg]">按钮 Button ✨</h2>
          <div className="space-y-6">
            <div>
              <p className="font-mono text-sm text-white/80 mb-4">变体 Variants</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <button className="bg-[#ff6b6b] text-white font-black px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-105 transition-all rotate-[-1deg]">
                  点我呀 ✨
                </button>
                <button className="bg-[#4ecdc4] text-white font-black px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-105 transition-all rotate-[1deg]">
                  Go! 🚀
                </button>
                <button className="bg-[#ffe66d] text-black font-black px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-105 transition-all rotate-[-1deg]">
                  Yeah! 🎉
                </button>
                <button className="bg-[#95e1d3] text-black font-black px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-105 transition-all rotate-[1deg]">
                  Nice! 👍
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[-1deg]">卡片 Card 🃏</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(78,205,196,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,107,107,1)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-6 md:p-8 rotate-[1deg]">
              <span className="text-3xl mb-4 block">🎨</span>
              <h3 className="font-black text-xl md:text-2xl mb-2">有趣的卡片</h3>
              <p className="font-mono text-sm md:text-base text-gray-700">带有轻微旋转和彩色阴影</p>
            </div>
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,230,109,1)] hover:shadow-[12px_12px_0px_0px_rgba(78,205,196,1)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-6 md:p-8 rotate-[-1deg]">
              <span className="text-3xl mb-4 block">⚡</span>
              <h3 className="font-black text-xl md:text-2xl mb-2">能量满满</h3>
              <p className="font-mono text-sm md:text-base text-gray-700">黄色阴影变青色</p>
            </div>
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(149,225,211,1)] hover:shadow-[12px_12px_0px_0px_rgba(243,129,129,1)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-6 md:p-8 rotate-[1deg]">
              <span className="text-3xl mb-4 block">🌟</span>
              <h3 className="font-black text-xl md:text-2xl mb-2">闪闪发光</h3>
              <p className="font-mono text-sm md:text-base text-gray-700">薄荷阴影变珊瑚色</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#ffe66d]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[1deg]">表单 Form ✏️</h2>
          <div className="space-y-4 md:space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="输入点什么... 💭"
                className="w-full px-4 py-3 md:px-6 md:py-4 border-4 border-black bg-[#ffe66d] font-mono text-base md:text-lg focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] transition-all placeholder:text-gray-600"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">✏️</span>
            </div>
            <div>
              <textarea
                placeholder="写点有趣的... 📝"
                rows={4}
                className="w-full px-4 py-3 md:px-6 md:py-4 border-4 border-black bg-[#95e1d3] font-mono text-base md:text-lg focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(255,107,107,1)] transition-all placeholder:text-gray-700 resize-none"
              />
            </div>
            <button className="w-full bg-[#ff6b6b] text-white font-black px-6 py-4 border-4 border-black shadow-[6px_6px_0px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-[1.02] transition-all rotate-[-1deg]">
              提交！ 🚀
            </button>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#95e1d3]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[-1deg]">进度条 Progress 📊</h2>
          <div className="space-y-6">
            <div className="border-4 border-black bg-white h-8 md:h-10 relative rotate-[1deg]">
              <div className="h-full bg-[#ff6b6b] transition-all duration-300" style={{ width: `${progress}%` }} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-black text-sm">{progress}% 🔥</span>
            </div>
            <div className="border-4 border-black bg-white h-8 md:h-10 rotate-[-1deg]">
              <div className="h-full bg-[#4ecdc4] w-[80%]" />
            </div>
            <div className="border-4 border-black bg-white h-8 md:h-10 rotate-[1deg]">
              <div className="h-full bg-[#ffe66d] w-[45%]" />
            </div>
            <div className="flex gap-3">
              <button className="bg-white font-black px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                -10 👎
              </button>
              <button className="bg-white font-black px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                +10 👍
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tags & Badges */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#f38181]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 text-white rotate-[1deg]">标签与徽章 🏷️</h2>
          <div className="space-y-6">
            <div>
              <p className="font-black text-sm text-white mb-4">Tags</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="px-3 py-1 border-4 border-black bg-black text-white font-black text-sm rotate-[-1deg]">默认 🎯</span>
                <span className="px-3 py-1 border-4 border-black bg-[#ff6b6b] text-white font-black text-sm rotate-[1deg]">Red ❤️</span>
                <span className="px-3 py-1 border-4 border-black bg-[#4ecdc4] font-black text-sm rotate-[-1deg]">Teal 💚</span>
                <span className="px-3 py-1 border-4 border-black bg-[#ffe66d] font-black text-sm rotate-[1deg]">Yellow 💛</span>
                <span className="px-3 py-1 border-4 border-black bg-[#95e1d3] font-black text-sm rotate-[-1deg]">Mint 🌿</span>
              </div>
            </div>
            <div>
              <p className="font-black text-sm text-white mb-4">Badges</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 border-4 border-black bg-[#ff6b6b] text-white font-black text-sm rotate-[-2deg]">1</span>
                <span className="inline-flex items-center justify-center min-w-8 h-8 px-2 border-4 border-black bg-[#4ecdc4] font-black text-sm rotate-[2deg]">99+</span>
                <span className="inline-flex items-center justify-center min-w-8 h-8 px-2 border-4 border-black bg-[#ffe66d] font-black text-sm rotate-[-1deg]">NEW✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">核心规则 📋</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="rotate-[1deg]">
              <h3 className="font-black text-xl md:text-2xl mb-4 text-[#4ecdc4]">✅ 必须</h3>
              <ul className="font-mono text-sm md:text-base space-y-2 text-gray-300">
                <li>• 无圆角 rounded-none</li>
                <li>• 粗边框 border-4 border-black</li>
                <li>• 元素旋转 rotate-[-2deg] ~ rotate-[2deg]</li>
                <li>• 彩色阴影</li>
                <li>• hover:scale-105 放大效果</li>
                <li>• 适当使用 emoji ✨</li>
              </ul>
            </div>
            <div className="rotate-[-1deg]">
              <h3 className="font-black text-xl md:text-2xl mb-4 text-[#ff6b6b]">⛔ 禁止</h3>
              <ul className="font-mono text-sm md:text-base space-y-2 text-gray-300">
                <li>• 圆角 rounded-*</li>
                <li>• 模糊阴影 shadow-lg</li>
                <li>• 渐变</li>
                <li>• 旋转超过 3 度</li>
                <li>• 过度使用 emoji</li>
                <li>• 柔和灰色</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t-4 border-black py-6 md:py-8 px-4 md:px-8 bg-[#ffe66d]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-gray-700">
            StyleKit · Neo-Brutalist Playful Showcase ✨
          </p>
          <Link
            href="/styles/neo-brutalist-playful"
            className="font-black text-sm hover:text-[#ff6b6b] transition-colors"
          >
            查看完整文档 → 📖
          </Link>
        </div>
      </div>
    </div>
  );
}
