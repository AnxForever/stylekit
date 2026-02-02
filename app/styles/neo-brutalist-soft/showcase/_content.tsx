"use client";

import { useState } from "react";
import Link from "next/link";

export default function ShowcaseContent() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className="bg-gray-50 border-b-2 border-gray-800 px-4 md:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/styles/neo-brutalist-soft/showcase" className="font-bold text-lg md:text-xl text-gray-800">
            SOFT
          </Link>
          <div className="flex gap-4 md:gap-6">
            <Link href="/styles/neo-brutalist-soft" className="font-mono text-sm md:text-base text-gray-600 hover:text-pink-500 transition-colors">
              文档
            </Link>
            <Link href="/styles" className="font-mono text-sm md:text-base text-gray-600 hover:text-pink-500 transition-colors">
              返回
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[60vh] md:min-h-[80vh] flex items-center px-4 md:px-8 py-12 md:py-0 bg-lime-200 border-b-2 border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl leading-tight text-gray-800 mb-4 md:mb-6">
            柔和的
            <br />
            野兽派
          </h1>
          <p className="font-mono text-base md:text-lg text-gray-700 max-w-xl mb-6 md:mb-8">
            保留结构，软化视觉。2px 边框、灰色阴影、马卡龙配色。
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gray-800 text-white font-bold px-6 py-3 md:px-8 md:py-4 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(244,114,182,0.5)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              开始探索
            </button>
            <button className="bg-gray-50 text-gray-800 font-bold px-6 py-3 md:px-8 md:py-4 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-lime-300 transition-all">
              查看文档
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">配色系统</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Pink", hex: "#f472b6", bg: "bg-pink-400" },
              { name: "Lime", hex: "#a3e635", bg: "bg-lime-400" },
              { name: "Sky", hex: "#38bdf8", bg: "bg-sky-400" },
              { name: "Amber", hex: "#fbbf24", bg: "bg-amber-400" },
            ].map((color) => (
              <div key={color.name} className="border-2 border-gray-800">
                <div className={`h-24 md:h-32 ${color.bg}`} />
                <div className="p-3 md:p-4 border-t-2 border-gray-800">
                  <p className="font-bold text-sm md:text-base">{color.name}</p>
                  <p className="font-mono text-xs text-gray-600">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-pink-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">按钮 Button</h2>
          <div className="space-y-6">
            <div>
              <p className="font-mono text-sm text-gray-600 mb-4">变体 Variants</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <button className="bg-pink-400 text-white font-bold px-4 py-2 md:px-6 md:py-3 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm md:text-base">
                  Primary
                </button>
                <button className="bg-gray-50 text-gray-800 font-bold px-4 py-2 md:px-6 md:py-3 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-lime-300 transition-all text-sm md:text-base">
                  Secondary
                </button>
                <button className="bg-sky-400 text-white font-bold px-4 py-2 md:px-6 md:py-3 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm md:text-base">
                  Sky
                </button>
                <button className="bg-amber-400 text-gray-800 font-bold px-4 py-2 md:px-6 md:py-3 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm md:text-base">
                  Amber
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">卡片 Card</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_0px_0px_rgba(244,114,182,0.4)] md:hover:shadow-[8px_8px_0px_0px_rgba(244,114,182,0.4)] hover:-translate-y-1 transition-all duration-300 p-4 md:p-6">
              <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-2">Pink Hover</h3>
              <p className="font-mono text-sm md:text-base text-gray-600">
                悬停时阴影变为粉色
              </p>
            </div>
            <div className="bg-white border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_0px_0px_rgba(163,230,53,0.4)] hover:-translate-y-1 transition-all duration-300 p-4 md:p-6">
              <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-2">Lime Hover</h3>
              <p className="font-mono text-sm md:text-base text-gray-600">
                悬停时阴影变为青柠色
              </p>
            </div>
            <div className="bg-white border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_0px_0px_rgba(56,189,248,0.4)] hover:-translate-y-1 transition-all duration-300 p-4 md:p-6">
              <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-2">Sky Hover</h3>
              <p className="font-mono text-sm md:text-base text-gray-600">
                悬停时阴影变为天蓝色
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-sky-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">表单 Form</h2>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="font-bold text-sm mb-2 block">输入框 Input</label>
              <input
                type="text"
                placeholder="请输入..."
                className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-gray-800 bg-gray-50 font-mono text-sm md:text-base text-gray-800 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(56,189,248,0.3)] transition-shadow placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="font-bold text-sm mb-2 block">文本域 Textarea</label>
              <textarea
                placeholder="请输入详细内容..."
                rows={4}
                className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-gray-800 bg-gray-50 font-mono text-sm md:text-base text-gray-800 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(56,189,248,0.3)] transition-shadow placeholder:text-gray-400 resize-none"
              />
            </div>
            <button className="w-full bg-gray-800 text-white font-bold px-6 py-3 md:px-8 md:py-4 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(244,114,182,0.5)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              提交
            </button>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-lime-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">进度条 Progress</h2>
          <div className="space-y-6">
            <div className="border-2 border-gray-800 bg-white h-6 md:h-8 relative">
              <div
                className="h-full bg-pink-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs md:text-sm">
                {progress}%
              </span>
            </div>
            <div className="border-2 border-gray-800 bg-white h-6 md:h-8">
              <div className="h-full bg-lime-400 w-[80%]" />
            </div>
            <div className="border-2 border-gray-800 bg-white h-6 md:h-8">
              <div className="h-full bg-sky-400 w-[45%]" />
            </div>
            <div className="flex gap-3">
              <button
                className="bg-gray-50 font-bold px-4 py-2 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-sm"
                onClick={() => setProgress(Math.max(0, progress - 10))}
              >
                -10
              </button>
              <button
                className="bg-gray-50 font-bold px-4 py-2 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-sm"
                onClick={() => setProgress(Math.min(100, progress + 10))}
              >
                +10
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tags & Badges */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-amber-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">标签与徽章</h2>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-sm mb-4">Tags</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="px-3 py-1 border-2 border-gray-800 bg-gray-800 text-white font-bold text-xs md:text-sm">默认</span>
                <span className="px-3 py-1 border-2 border-gray-800 bg-pink-400 text-white font-bold text-xs md:text-sm">Pink</span>
                <span className="px-3 py-1 border-2 border-gray-800 bg-lime-400 font-bold text-xs md:text-sm">Lime</span>
                <span className="px-3 py-1 border-2 border-gray-800 bg-sky-400 text-white font-bold text-xs md:text-sm">Sky</span>
                <span className="px-3 py-1 border-2 border-gray-800 bg-amber-400 font-bold text-xs md:text-sm">Amber</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-sm mb-4">Badges</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="inline-flex items-center justify-center w-6 h-6 border-2 border-gray-800 bg-pink-400 text-white font-bold text-xs">1</span>
                <span className="inline-flex items-center justify-center min-w-6 h-6 px-1 border-2 border-gray-800 bg-lime-400 font-bold text-xs">99+</span>
                <span className="inline-flex items-center justify-center min-w-6 h-6 px-1 border-2 border-gray-800 bg-sky-400 text-white font-bold text-xs">NEW</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">核心规则</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="font-bold text-xl md:text-2xl mb-4 text-lime-400">DO - 必须</h3>
              <ul className="font-mono text-sm md:text-base space-y-2 text-gray-300">
                <li>• 无圆角 rounded-none</li>
                <li>• 边框 2px border-gray-800</li>
                <li>• 灰色阴影 rgba(0,0,0,0.15~0.2)</li>
                <li>• hover 阴影消失 + 位移</li>
                <li>• 柔和配色 pink/lime/sky/amber-400</li>
                <li>• 背景 bg-gray-50</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl md:text-2xl mb-4 text-pink-400">DON'T - 禁止</h3>
              <ul className="font-mono text-sm md:text-base space-y-2 text-gray-300">
                <li>• 圆角 rounded-*</li>
                <li>• 纯黑边框 border-black</li>
                <li>• 纯黑阴影 rgba(0,0,0,1)</li>
                <li>• 高饱和纯色</li>
                <li>• 模糊阴影 shadow-lg</li>
                <li>• 渐变</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t-2 border-gray-800 py-6 md:py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-gray-600">
            StyleKit · Neo-Brutalist Soft Showcase
          </p>
          <Link
            href="/styles/neo-brutalist-soft"
            className="font-bold text-sm hover:text-pink-500 transition-colors"
          >
            查看完整文档 →
          </Link>
        </div>
      </div>
    </div>
  );
}
