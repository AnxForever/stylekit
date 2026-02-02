"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Palette, Rocket, Sparkles, FileText, ArrowLeft, Gamepad2, Eye, PenLine, Star, Heart, Leaf, Flower2, Target, ThumbsUp, ThumbsDown, Tag, Check, Ban, ChevronDown, User, AlertTriangle, Info, X } from "lucide-react";

export default function ShowcaseContent() {
  const [progress, setProgress] = useState(65);
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false]);
  const [checkboxStates, setCheckboxStates] = useState([true, false, true]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#ffe66d] border-b-4 border-black px-4 md:px-8 py-4 md:py-5">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/styles/neo-brutalist-playful/showcase" className="font-black text-xl md:text-2xl bg-black text-white px-3 py-1 rotate-[-2deg] hover:scale-110 transition-transform flex items-center gap-2">
            FUN <Zap className="w-5 h-5" />
          </Link>
          <div className="flex gap-3 md:gap-6">
            <Link href="/styles/neo-brutalist-playful" className="font-black text-sm md:text-base px-3 py-1 border-2 border-black hover:bg-[#ff6b6b] hover:text-white transition-colors flex items-center gap-1">
              <FileText className="w-4 h-4" /> 文档
            </Link>
            <Link href="/styles" className="font-black text-sm md:text-base px-3 py-1 border-2 border-black hover:bg-[#4ecdc4] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> 返回
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 md:px-8 bg-[#4ecdc4] border-b-4 border-black overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-10 -right-10 rotate-12">
            <Palette className="w-16 h-16 text-black/20" />
          </div>
          <div className="absolute bottom-0 -left-16 -rotate-12">
            <Zap className="w-14 h-14 text-black/20" />
          </div>
          <h1 className="font-black text-5xl md:text-7xl lg:text-9xl leading-none mb-6 rotate-[-2deg]">
            PLAY
            <br />
            <span className="text-white">FUL!</span>
          </h1>
          <p className="font-mono text-lg md:text-xl max-w-md mb-8 rotate-[1deg]">
            野兽派也可以很有趣
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#ff6b6b] text-white font-black px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all rotate-[-1deg] flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" /> 开始玩
            </button>
            <button className="bg-[#ffe66d] font-black px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all rotate-[1deg] flex items-center gap-2">
              <Eye className="w-5 h-5" /> 看看吧
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[-1deg] flex items-center gap-3">
            配色系统 <Palette className="w-8 h-8" />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Red", hex: "#ff6b6b", bg: "bg-[#ff6b6b]", icon: Heart },
              { name: "Teal", hex: "#4ecdc4", bg: "bg-[#4ecdc4]", icon: Sparkles },
              { name: "Yellow", hex: "#ffe66d", bg: "bg-[#ffe66d]", icon: Star },
              { name: "Mint", hex: "#95e1d3", bg: "bg-[#95e1d3]", icon: Leaf },
              { name: "Coral", hex: "#f38181", bg: "bg-[#f38181]", icon: Flower2 },
            ].map((color, i) => (
              <div key={color.name} className={`border-4 border-black ${i % 2 === 0 ? "rotate-[1deg]" : "rotate-[-1deg]"}`}>
                <div className={`h-24 md:h-32 ${color.bg} flex items-center justify-center`}>
                  <color.icon className="w-8 h-8 text-white/80" />
                </div>
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
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 text-white rotate-[1deg] flex items-center gap-3">
            按钮 Button <Sparkles className="w-8 h-8" />
          </h2>
          <div className="space-y-6">
            <div>
              <p className="font-mono text-sm text-white/80 mb-4">变体 Variants</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <button className="bg-[#ff6b6b] text-white font-black px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-105 transition-all rotate-[-1deg] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> 点我呀
                </button>
                <button className="bg-[#4ecdc4] text-white font-black px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-105 transition-all rotate-[1deg] flex items-center gap-2">
                  <Rocket className="w-4 h-4" /> Go!
                </button>
                <button className="bg-[#ffe66d] text-black font-black px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-105 transition-all rotate-[-1deg] flex items-center gap-2">
                  <Star className="w-4 h-4" /> Yeah!
                </button>
                <button className="bg-[#95e1d3] text-black font-black px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-105 transition-all rotate-[1deg] flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" /> Nice!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[-1deg]">卡片 Card</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(78,205,196,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,107,107,1)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-6 md:p-8 rotate-[1deg]">
              <Palette className="w-8 h-8 mb-4 text-[#4ecdc4]" />
              <h3 className="font-black text-xl md:text-2xl mb-2">有趣的卡片</h3>
              <p className="font-mono text-sm md:text-base text-gray-700">带有轻微旋转和彩色阴影</p>
            </div>
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,230,109,1)] hover:shadow-[12px_12px_0px_0px_rgba(78,205,196,1)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-6 md:p-8 rotate-[-1deg]">
              <Zap className="w-8 h-8 mb-4 text-[#ffe66d]" />
              <h3 className="font-black text-xl md:text-2xl mb-2">能量满满</h3>
              <p className="font-mono text-sm md:text-base text-gray-700">黄色阴影变青色</p>
            </div>
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(149,225,211,1)] hover:shadow-[12px_12px_0px_0px_rgba(243,129,129,1)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-6 md:p-8 rotate-[1deg]">
              <Star className="w-8 h-8 mb-4 text-[#95e1d3]" />
              <h3 className="font-black text-xl md:text-2xl mb-2">闪闪发光</h3>
              <p className="font-mono text-sm md:text-base text-gray-700">薄荷阴影变珊瑚色</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#ffe66d]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[1deg] flex items-center gap-3">
            表单 Form <PenLine className="w-8 h-8" />
          </h2>
          <div className="space-y-4 md:space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="输入点什么..."
                className="w-full px-4 py-3 md:px-6 md:py-4 border-4 border-black bg-[#ffe66d] font-mono text-base md:text-lg focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] transition-all placeholder:text-gray-600"
              />
              <PenLine className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-600" />
            </div>
            <div>
              <textarea
                placeholder="写点有趣的..."
                rows={4}
                className="w-full px-4 py-3 md:px-6 md:py-4 border-4 border-black bg-[#95e1d3] font-mono text-base md:text-lg focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(255,107,107,1)] transition-all placeholder:text-gray-700 resize-none"
              />
            </div>
            <button className="w-full bg-[#ff6b6b] text-white font-black px-6 py-4 border-4 border-black shadow-[6px_6px_0px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-[1.02] transition-all rotate-[-1deg] flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5" /> 提交
            </button>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#95e1d3]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[-1deg]">进度条 Progress</h2>
          <div className="space-y-6">
            <div className="border-4 border-black bg-white h-8 md:h-10 relative rotate-[1deg]">
              <div className="h-full bg-[#ff6b6b] transition-all duration-300" style={{ width: `${progress}%` }} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-black text-sm">{progress}%</span>
            </div>
            <div className="border-4 border-black bg-white h-8 md:h-10 rotate-[-1deg]">
              <div className="h-full bg-[#4ecdc4] w-[80%]" />
            </div>
            <div className="border-4 border-black bg-white h-8 md:h-10 rotate-[1deg]">
              <div className="h-full bg-[#ffe66d] w-[45%]" />
            </div>
            <div className="flex gap-3">
              <button className="bg-white font-black px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm flex items-center gap-1" onClick={() => setProgress(Math.max(0, progress - 10))}>
                <ThumbsDown className="w-4 h-4" /> -10
              </button>
              <button className="bg-white font-black px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm flex items-center gap-1" onClick={() => setProgress(Math.min(100, progress + 10))}>
                <ThumbsUp className="w-4 h-4" /> +10
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tags & Badges */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#f38181]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 text-white rotate-[1deg] flex items-center gap-3">
            标签与徽章 <Tag className="w-8 h-8" />
          </h2>
          <div className="space-y-6">
            <div>
              <p className="font-black text-sm text-white mb-4">Tags</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="px-3 py-1 border-4 border-black bg-black text-white font-black text-sm rotate-[-1deg] flex items-center gap-1">
                  <Target className="w-3 h-3" /> 默认
                </span>
                <span className="px-3 py-1 border-4 border-black bg-[#ff6b6b] text-white font-black text-sm rotate-[1deg]">Red</span>
                <span className="px-3 py-1 border-4 border-black bg-[#4ecdc4] font-black text-sm rotate-[-1deg]">Teal</span>
                <span className="px-3 py-1 border-4 border-black bg-[#ffe66d] font-black text-sm rotate-[1deg]">Yellow</span>
                <span className="px-3 py-1 border-4 border-black bg-[#95e1d3] font-black text-sm rotate-[-1deg]">Mint</span>
              </div>
            </div>
            <div>
              <p className="font-black text-sm text-white mb-4">Badges</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 border-4 border-black bg-[#ff6b6b] text-white font-black text-sm rotate-[-2deg]">1</span>
                <span className="inline-flex items-center justify-center min-w-8 h-8 px-2 border-4 border-black bg-[#4ecdc4] font-black text-sm rotate-[2deg]">99+</span>
                <span className="inline-flex items-center justify-center min-w-8 h-8 px-2 border-4 border-black bg-[#ffe66d] font-black text-sm rotate-[-1deg]">NEW</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#4ecdc4]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 text-white rotate-[-1deg] flex items-center gap-3">
            选项卡 Tabs <Sparkles className="w-8 h-8" />
          </h2>
          <div className="bg-white border-4 border-black p-6 md:p-8 rotate-[1deg]">
            <div className="flex gap-2 mb-6">
              {["Fun", "Cool", "Wow"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-3 font-black border-4 border-black transition-all ${
                    activeTab === i
                      ? "bg-[#ff6b6b] text-white shadow-[4px_4px_0px_0px_black] rotate-[-1deg]"
                      : "bg-white hover:bg-[#ffe66d] rotate-[1deg]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="font-mono text-gray-700">
              {activeTab === 0 && "This is the FUN tab! Everything here is playful and exciting."}
              {activeTab === 1 && "Welcome to the COOL zone. Stay frosty, friend!"}
              {activeTab === 2 && "WOW! You found the secret tab. Amazing!"}
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[1deg] flex items-center gap-3">
            提示 Alerts <AlertTriangle className="w-8 h-8" />
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 bg-[#95e1d3] border-4 border-black shadow-[6px_6px_0px_0px_black] rotate-[-1deg]">
              <Check className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-black mb-1">Success!</p>
                <p className="font-mono text-sm">You did it! High five!</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#ffe66d] border-4 border-black shadow-[6px_6px_0px_0px_black] rotate-[1deg]">
              <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-black mb-1">Warning!</p>
                <p className="font-mono text-sm">Careful there, buddy!</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#ff6b6b] text-white border-4 border-black shadow-[6px_6px_0px_0px_black] rotate-[-1deg]">
              <X className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-black mb-1">Error!</p>
                <p className="font-mono text-sm">Oops! Something went wrong!</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#4ecdc4] text-white border-4 border-black shadow-[6px_6px_0px_0px_black] rotate-[1deg]">
              <Info className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-black mb-1">Info!</p>
                <p className="font-mono text-sm">Here is some cool info for you!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#ffe66d]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[-1deg] flex items-center gap-3">
            控件 Controls <Target className="w-8 h-8" />
          </h2>
          <div className="space-y-8">
            <div>
              <p className="font-black text-sm mb-4">Toggles</p>
              <div className="space-y-3">
                {["Party mode", "Fun sounds"].map((label, i) => (
                  <label key={label} className={`flex items-center justify-between p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] cursor-pointer ${i % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"}`}>
                    <span className="font-black">{label}</span>
                    <button
                      onClick={() => {
                        const newStates = [...toggleStates];
                        newStates[i] = !newStates[i];
                        setToggleStates(newStates);
                      }}
                      className={`w-16 h-8 border-4 border-black transition-colors relative ${
                        toggleStates[i] ? "bg-[#4ecdc4]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute top-0 w-6 h-6 bg-white border-2 border-black transition-all ${
                          toggleStates[i] ? "left-8" : "left-0"
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="font-black text-sm mb-4">Checkboxes</p>
              <div className="space-y-3">
                {["Extra fun", "More colors", "Maximum joy"].map((label, i) => (
                  <label key={label} className={`flex items-center gap-4 p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] cursor-pointer ${i % 2 === 0 ? "rotate-[1deg]" : "rotate-[-1deg]"}`}>
                    <button
                      onClick={() => {
                        const newStates = [...checkboxStates];
                        newStates[i] = !newStates[i];
                        setCheckboxStates(newStates);
                      }}
                      className={`w-7 h-7 border-4 border-black flex items-center justify-center transition-colors ${
                        checkboxStates[i] ? "bg-[#ff6b6b]" : "bg-white"
                      }`}
                    >
                      {checkboxStates[i] && <Check className="w-5 h-5 text-white" />}
                    </button>
                    <span className="font-black">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#95e1d3]">
        <div className="max-w-md mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[1deg] flex items-center gap-3">
            下拉 Dropdown <ChevronDown className="w-8 h-8" />
          </h2>
          <div className="relative rotate-[-1deg]">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-6 py-4 bg-white border-4 border-black font-black shadow-[6px_6px_0px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              <span>Pick something fun!</span>
              <ChevronDown className={`w-6 h-6 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-black shadow-[6px_6px_0px_0px_black] z-10">
                {["Party", "Dance", "Celebrate", "Have fun"].map((item, i) => (
                  <button
                    key={item}
                    className={`w-full px-6 py-3 text-left font-black border-b-2 border-black last:border-0 hover:bg-[#ffe66d] transition-colors ${i % 2 === 0 ? "hover:rotate-[1deg]" : "hover:rotate-[-1deg]"}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 rotate-[-1deg]">表格 Table</h2>
          <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(78,205,196,1)] rotate-[1deg] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#ff6b6b] text-white">
                  <th className="px-6 py-4 text-left font-black border-r-4 border-black">Item</th>
                  <th className="px-6 py-4 text-left font-black border-r-4 border-black">Type</th>
                  <th className="px-6 py-4 text-left font-black">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: "Party Hat", type: "Fun", status: "Ready" },
                  { item: "Confetti", type: "Colorful", status: "Ready" },
                  { item: "Balloon", type: "Bouncy", status: "Inflating" },
                ].map((row, idx) => (
                  <tr key={row.item} className={`border-t-4 border-black ${idx % 2 === 0 ? "bg-white" : "bg-[#ffe66d]/30"}`}>
                    <td className="px-6 py-4 font-black border-r-4 border-black">{row.item}</td>
                    <td className="px-6 py-4 font-mono border-r-4 border-black">{row.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 font-black text-sm border-4 border-black ${
                        row.status === "Ready"
                          ? "bg-[#4ecdc4] text-white"
                          : "bg-[#ffe66d]"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#ff6b6b]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 text-white rotate-[1deg] flex items-center gap-3">
            统计 Stats <Star className="w-8 h-8" />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "99%", label: "Fun Level", color: "bg-[#4ecdc4]" },
              { value: "1M+", label: "Smiles", color: "bg-[#ffe66d]" },
              { value: "42", label: "Colors", color: "bg-[#95e1d3]" },
              { value: "100", label: "Joy", color: "bg-[#f38181]" },
            ].map((stat, i) => (
              <div key={stat.label} className={`${stat.color} border-4 border-black shadow-[6px_6px_0px_0px_black] p-6 text-center ${i % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"}`}>
                <p className="font-black text-3xl md:text-4xl mb-2">
                  {stat.value}
                </p>
                <p className="font-mono text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avatars */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-[#4ecdc4]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 text-white rotate-[-1deg] flex items-center gap-3">
            头像 Avatars <User className="w-8 h-8" />
          </h2>
          <div className="flex flex-wrap items-end gap-6">
            <div className="w-16 h-16 bg-[#ff6b6b] border-4 border-black shadow-[4px_4px_0px_0px_black] flex items-center justify-center rotate-[-2deg]">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="w-14 h-14 bg-[#ffe66d] border-4 border-black shadow-[4px_4px_0px_0px_black] flex items-center justify-center rotate-[2deg]">
              <User className="w-7 h-7" />
            </div>
            <div className="w-12 h-12 bg-[#95e1d3] border-4 border-black shadow-[4px_4px_0px_0px_black] flex items-center justify-center rotate-[-1deg]">
              <User className="w-6 h-6" />
            </div>
            <div className="w-10 h-10 bg-[#f38181] border-4 border-black shadow-[4px_4px_0px_0px_black] flex items-center justify-center rotate-[1deg]">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex -space-x-2">
              {["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3"].map((color, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 border-4 border-black flex items-center justify-center ${i % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"}`}
                  style={{ backgroundColor: color }}
                >
                  <User className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="border-b-4 border-black px-4 md:px-8 py-12 md:py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">核心规则</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="rotate-[1deg]">
              <h3 className="font-black text-xl md:text-2xl mb-4 text-[#4ecdc4] flex items-center gap-2">
                <Check className="w-6 h-6" /> DO - 必须
              </h3>
              <ul className="font-mono text-sm md:text-base space-y-2 text-gray-300">
                <li>- 无圆角 rounded-none</li>
                <li>- 粗边框 border-4 border-black</li>
                <li>- 元素旋转 rotate-[-2deg] ~ rotate-[2deg]</li>
                <li>- 彩色阴影</li>
                <li>- hover:scale-105 放大效果</li>
                <li>- 使用 Lucide 图标</li>
              </ul>
            </div>
            <div className="rotate-[-1deg]">
              <h3 className="font-black text-xl md:text-2xl mb-4 text-[#ff6b6b] flex items-center gap-2">
                <Ban className="w-6 h-6" /> DON&apos;T - 禁止
              </h3>
              <ul className="font-mono text-sm md:text-base space-y-2 text-gray-300">
                <li>- 圆角 rounded-*</li>
                <li>- 模糊阴影 shadow-lg</li>
                <li>- 渐变</li>
                <li>- 旋转超过 3 度</li>
                <li>- Emoji 表情符号</li>
                <li>- 柔和灰色</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t-4 border-black py-6 md:py-8 px-4 md:px-8 bg-[#ffe66d]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-gray-700">
            StyleKit - Neo-Brutalist Playful Showcase
          </p>
          <Link
            href="/styles/neo-brutalist-playful"
            className="font-black text-sm hover:text-[#ff6b6b] transition-colors flex items-center gap-1"
          >
            <FileText className="w-4 h-4" /> 查看完整文档
          </Link>
        </div>
      </div>
    </div>
  );
}
