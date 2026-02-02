"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, AlertTriangle, Info, ChevronDown, User } from "lucide-react";

export default function ShowcaseContent() {
  const [progress, setProgress] = useState(65);
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false]);
  const [checkboxStates, setCheckboxStates] = useState([true, false, true]);

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

      {/* Tabs */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">选项卡 Tabs</h2>
          <div className="bg-gray-50 border-2 border-gray-800 p-6 md:p-8">
            <div className="flex gap-2 mb-6">
              {["Overview", "Details", "Settings"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2.5 font-bold text-sm border-2 border-gray-800 transition-all ${
                    activeTab === i
                      ? "bg-pink-400 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
                      : "bg-white hover:bg-lime-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="font-mono text-gray-600">
              {activeTab === 0 && "A gentle overview of the soft brutalist design system."}
              {activeTab === 1 && "Detailed specifications with muted colors and soft shadows."}
              {activeTab === 2 && "Configure your preferences with ease and comfort."}
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">提示 Alerts</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-lime-100 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
              <Check className="w-5 h-5 text-lime-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800 mb-1">Success</p>
                <p className="font-mono text-sm text-gray-600">Operation completed successfully.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-amber-100 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800 mb-1">Warning</p>
                <p className="font-mono text-sm text-gray-600">Please review before continuing.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-pink-100 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
              <X className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800 mb-1">Error</p>
                <p className="font-mono text-sm text-gray-600">Something went wrong.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-sky-100 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
              <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800 mb-1">Info</p>
                <p className="font-mono text-sm text-gray-600">Here is some useful information.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-pink-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">控件 Controls</h2>
          <div className="space-y-8">
            <div>
              <p className="font-bold text-sm text-gray-600 mb-4">Toggles</p>
              <div className="space-y-3">
                {["Soft mode", "Pastel colors"].map((label, i) => (
                  <label key={label} className="flex items-center justify-between p-4 bg-white border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                    <span className="font-bold text-gray-800">{label}</span>
                    <button
                      role="switch"
                      aria-checked={toggleStates[i]}
                      aria-label={label}
                      onClick={() => {
                        const newStates = [...toggleStates];
                        newStates[i] = !newStates[i];
                        setToggleStates(newStates);
                      }}
                      className={`w-14 h-7 border-2 border-gray-800 transition-colors relative ${
                        toggleStates[i] ? "bg-pink-400" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white border border-gray-800 transition-all ${
                          toggleStates[i] ? "left-7" : "left-0.5"
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-600 mb-4">Checkboxes</p>
              <div className="space-y-3">
                {["Muted shadows", "Gray borders", "Soft palette"].map((label, i) => (
                  <label key={label} className="flex items-center gap-3 p-4 bg-white border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                    <button
                      role="checkbox"
                      aria-checked={checkboxStates[i]}
                      aria-label={label}
                      onClick={() => {
                        const newStates = [...checkboxStates];
                        newStates[i] = !newStates[i];
                        setCheckboxStates(newStates);
                      }}
                      className={`w-6 h-6 border-2 border-gray-800 flex items-center justify-center transition-colors ${
                        checkboxStates[i] ? "bg-lime-400" : "bg-white"
                      }`}
                    >
                      {checkboxStates[i] && <Check className="w-4 h-4 text-gray-800" />}
                    </button>
                    <span className="font-bold text-gray-800">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">下拉 Dropdown</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-3 bg-gray-50 border-2 border-gray-800 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <span>Select option</span>
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] z-10">
                {["Pink", "Lime", "Sky", "Amber"].map((item) => (
                  <button
                    key={item}
                    className="w-full px-5 py-3 text-left font-bold text-gray-700 hover:bg-lime-100 transition-colors border-b border-gray-200 last:border-0"
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
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">表格 Table</h2>
          <div className="border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-6 py-4 text-left font-bold">Name</th>
                  <th className="px-6 py-4 text-left font-bold">Type</th>
                  <th className="px-6 py-4 text-left font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Component A", type: "Primary", status: "Active" },
                  { name: "Component B", type: "Secondary", status: "Active" },
                  { name: "Component C", type: "Tertiary", status: "Pending" },
                ].map((row, idx) => (
                  <tr key={row.name} className={`border-t-2 border-gray-800 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-6 py-4 font-bold text-gray-800">{row.name}</td>
                    <td className="px-6 py-4 font-mono text-gray-600">{row.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 font-bold text-xs border-2 border-gray-800 ${
                        row.status === "Active"
                          ? "bg-lime-200"
                          : "bg-amber-200"
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
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-lime-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">统计 Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "98%", label: "Softness", bg: "bg-pink-100" },
              { value: "2.4k", label: "Components", bg: "bg-lime-100" },
              { value: "156", label: "Colors", bg: "bg-sky-100" },
              { value: "4.9", label: "Rating", bg: "bg-amber-100" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] p-6 text-center`}>
                <p className="font-bold text-3xl md:text-4xl text-gray-800 mb-2">
                  {stat.value}
                </p>
                <p className="font-mono text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avatars */}
      <section className="border-b-2 border-gray-800 px-4 md:px-8 py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl mb-8 md:mb-12">头像 Avatars</h2>
          <div className="flex flex-wrap items-end gap-6">
            <div className="w-16 h-16 bg-pink-400 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="w-14 h-14 bg-lime-400 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] flex items-center justify-center">
              <User className="w-7 h-7 text-gray-800" />
            </div>
            <div className="w-12 h-12 bg-sky-400 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="w-10 h-10 bg-amber-400 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] flex items-center justify-center">
              <User className="w-5 h-5 text-gray-800" />
            </div>
            <div className="flex -space-x-1">
              {["bg-pink-400", "bg-lime-400", "bg-sky-400", "bg-amber-400"].map((bg, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 ${bg} border-2 border-gray-800 flex items-center justify-center`}
                >
                  <User className="w-5 h-5 text-white" />
                </div>
              ))}
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
