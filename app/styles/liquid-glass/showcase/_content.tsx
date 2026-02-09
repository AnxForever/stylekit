"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Layers, Sparkles, Bell, Check, X, Volume2, Wifi, Bluetooth, Moon, Star, Rocket, Shield, Users } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Liquid Glass colors - Neon gradient palette
const colors: ColorItem[] = [
  { name: "Neon Pink", hex: "#ff2d92", bg: "bg-[#ff2d92]" },
  { name: "Neon Purple", hex: "#a855f7", bg: "bg-[#a855f7]" },
  { name: "Neon Cyan", hex: "#4ecdc4", bg: "bg-[#4ecdc4]" },
  { name: "Neon Yellow", hex: "#ffd93d", bg: "bg-[#ffd93d]" },
  { name: "Neon Orange", hex: "#ff6b35", bg: "bg-[#ff6b35]" },
  { name: "Glass", hex: "rgba(255,255,255,0.1)", bg: "bg-white/10" },
];

// Design rules
const designRules = [
  { title: "Hero 3px 描边", desc: "text-stroke: 3px #4ecdc4 + 紫色渐变填充" },
  { title: "3D 偏移阴影", desc: "4px 4px 0 rgba(0,0,0,0.5) 产生立体感" },
  { title: "青色发光", desc: "0 0 25px rgba(78,205,196,0.6) 霓虹效果" },
  { title: "彩虹边框", desc: "::before 伪元素实现渐变边框" },
  { title: "超高模糊", desc: "backdrop-blur-[40px] 强力玻璃效果" },
  { title: "流体动画", desc: "duration-500 ease-out 液态运动" },
];

export default function ShowcaseContent() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [toggleStates, setToggleStates] = useState([true, false, true, false]);

  const toggleSwitch = (index: number) => {
    const newStates = [...toggleStates];
    newStates[index] = !newStates[index];
    setToggleStates(newStates);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]">
      {/* Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] border-b border-white/10 [box-shadow:0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(168,85,247,0.2)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/liquid-glass"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <span className="font-bold text-xl text-white">Liquid Glass</span>
          <Link
            href="/styles"
            className="relative px-4 py-2 bg-white/10 backdrop-blur-md rounded-[12px] text-white text-sm hover:bg-white/15 transition-all duration-300 before:absolute before:inset-0 before:rounded-[12px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#ff2d92]/15 rounded-full blur-[100px]" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-[#a855f7]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#4ecdc4]/15 rounded-full blur-[100px]" />

        {/* Decorative elements */}
        <Star className="absolute top-24 left-20 w-8 h-8 text-yellow-400 fill-yellow-400" />
        <Rocket className="absolute top-32 right-32 w-10 h-10 text-pink-400" />
        <Sparkles className="absolute bottom-40 right-20 w-6 h-6 text-purple-400" />

        {/* Top neon line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff2d92] to-transparent" />

        <div className="max-w-5xl mx-auto relative">
          {/* Badge - 黄色虚线边框徽章 */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-yellow-400/60 rounded-full text-yellow-400 text-sm">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span>加入已经在使用 ACME 的 50,000+ 团队</span>
              <Star className="w-4 h-4 fill-yellow-400" />
            </div>
          </div>

          {/* Hero Title with Neon Effect - 参考图片风格 */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
              {/* 第一行：紫色渐变 + 粗青色描边 + 3D阴影 */}
              <span
                className="block bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text"
                style={{
                  WebkitTextStroke: '3px #4ecdc4',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '4px 4px 0 rgba(0,0,0,0.5), 0 0 30px rgba(78, 205, 196, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)',
                  filter: 'drop-shadow(0 0 15px rgba(78, 205, 196, 0.5))',
                }}
              >
                改变你的方式
              </span>
              {/* 第二行：青色发光文字 */}
              <span
                className="block text-white mt-4"
                style={{
                  textShadow: '0 0 25px rgba(78, 205, 196, 0.9), 0 0 50px rgba(78, 205, 196, 0.5), 3px 3px 0 rgba(0,0,0,0.4)',
                }}
              >
                团队著作
              </span>
            </h1>
          </div>

          {/* Description in glass panel */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative p-6 bg-white/5 backdrop-blur-[40px] rounded-[20px] border border-white/10">
              <p className="text-lg text-white/80 text-center">
                Acme 平台通过强大的工具将您的团队整合在一起，旨在简化工作流程、提升生产力并推动成果。
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button className="relative px-8 py-4 bg-gradient-to-r from-[#ff2d92] to-[#a855f7] rounded-full text-white font-bold hover:shadow-[0_0_40px_rgba(255,45,146,0.5)] transition-all duration-500 flex items-center gap-2">
              开始免费试用
              <Sparkles className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/15 transition-all duration-500 flex items-center gap-2">
              <span className="mr-1">→</span>
              <span>观看演示</span>
            </button>
          </div>

          {/* Feature Cards Grid - 参考图片的实色渐变卡片 */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - Purple to Pink */}
            <div className="relative p-6 rounded-[24px] overflow-hidden group hover:-translate-y-2 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7] to-[#ff2d92]" />
              <div className="absolute inset-[3px] rounded-[21px] bg-gradient-to-br from-[#a855f7]/90 to-[#ff2d92]/90" />
              <div className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white/20 rounded-[14px] flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">快点</h3>
              </div>
            </div>

            {/* Card 2 - Green to Cyan */}
            <div className="relative p-6 rounded-[24px] overflow-hidden group hover:-translate-y-2 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4ecdc4] to-[#6bcb77]" />
              <div className="absolute inset-[3px] rounded-[21px] bg-gradient-to-br from-[#4ecdc4]/90 to-[#6bcb77]/90" />
              <div className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white/20 rounded-[14px] flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">安全</h3>
              </div>
            </div>

            {/* Card 3 - Pink to Orange */}
            <div className="relative p-6 rounded-[24px] overflow-hidden group hover:-translate-y-2 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff2d92] to-[#ff6b35]" />
              <div className="absolute inset-[3px] rounded-[21px] bg-gradient-to-br from-[#ff2d92]/90 to-[#ff6b35]/90" />
              <div className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white/20 rounded-[14px] flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">团队</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Rainbow Spectrum"
        subtitle="Prismatic edge colors for light refraction effect"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="relative rounded-[16px] overflow-hidden bg-white/5 backdrop-blur-md before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/20 before:to-transparent"
            labelClassName="font-semibold text-sm text-white"
            hexClassName="text-xs text-white/60 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography - 霓虹描边字体展示 */}
      <ShowcaseSection
        title="霓虹字体"
        subtitle="紫色渐变 + 青色粗描边 + 3D阴影 = Liquid Glass 标志性文字效果"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Style - 最重要的霓虹效果 */}
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#ff2d92]/50 before:via-[#4ecdc4]/50 before:to-[#a855f7]/50">
            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6">Hero 标题样式（3px 描边 + 3D 阴影）</p>
            <h1
              className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text mb-6"
              style={{
                WebkitTextStroke: '3px #4ecdc4',
                WebkitTextFillColor: 'transparent',
                textShadow: '4px 4px 0 rgba(0,0,0,0.5), 0 0 25px rgba(78, 205, 196, 0.6), 0 0 50px rgba(168, 85, 247, 0.4)',
                filter: 'drop-shadow(0 0 12px rgba(78, 205, 196, 0.4))',
              }}
            >
              改变你的方式
            </h1>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{
                textShadow: '0 0 25px rgba(78, 205, 196, 0.9), 0 0 50px rgba(78, 205, 196, 0.5), 3px 3px 0 rgba(0,0,0,0.4)',
              }}
            >
              团队著作
            </h2>
            <p className="text-white/60 text-sm mt-4">
              关键CSS: -webkit-text-stroke: 3px #4ecdc4; text-shadow: 4px 4px 0 rgba(0,0,0,0.5), 0 0 25px rgba(78,205,196,0.6);
            </p>
          </div>

          {/* Heading Styles */}
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent">
            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6">标题层级（2px 描边）</p>
            <h2
              className="text-3xl font-bold bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text mb-4"
              style={{
                WebkitTextStroke: '2px #4ecdc4',
                WebkitTextFillColor: 'transparent',
                textShadow: '3px 3px 0 rgba(0,0,0,0.4), 0 0 15px rgba(78, 205, 196, 0.5)',
                filter: 'drop-shadow(0 0 8px rgba(78, 205, 196, 0.3))',
              }}
            >
              H2 渐变标题
            </h2>
            <h3
              className="text-2xl font-semibold bg-gradient-to-r from-[#4ecdc4] to-[#6bcb77] bg-clip-text text-transparent mb-4"
            >
              H3 青色渐变
            </h3>
            <h4
              className="text-xl font-medium text-white mb-4"
              style={{
                textShadow: '0 0 15px rgba(78, 205, 196, 0.5), 2px 2px 0 rgba(0,0,0,0.2)',
              }}
            >
              H4 发光白色
            </h4>
          </div>

          {/* Body Text */}
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent">
            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6">正文与说明</p>
            <p className="text-white/90 mb-4 text-lg">主要正文 - 高对比度白色，确保在深色玻璃背景上的可读性。</p>
            <p className="text-white/70 mb-4">次要文字 - 稍微淡化，用于支持性信息和描述。</p>
            <p className="text-white/50 text-sm">说明文字 - 更淡的颜色用于元数据和时间戳。</p>
          </div>

          {/* Text on Gradient Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative p-6 rounded-[20px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7] to-[#ff2d92]" />
              <div className="absolute inset-[2px] rounded-[18px] bg-gradient-to-br from-[#a855f7]/95 to-[#ff2d92]/95" />
              <div className="relative">
                <h4 className="text-xl font-bold text-white mb-2">卡片标题</h4>
                <p className="text-white/80 text-sm">渐变卡片上的文字保持高对比度</p>
              </div>
            </div>
            <div className="relative p-6 rounded-[20px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4ecdc4] to-[#6bcb77]" />
              <div className="absolute inset-[2px] rounded-[18px] bg-gradient-to-br from-[#4ecdc4]/95 to-[#6bcb77]/95" />
              <div className="relative">
                <h4 className="text-xl font-bold text-white mb-2">卡片标题</h4>
                <p className="text-white/80 text-sm">鲜艳渐变上白色文字效果最佳</p>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Gradient buttons with glow effects and hover states"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[28px] before:absolute before:inset-0 before:rounded-[28px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#ff2d92]/30 before:via-transparent before:to-[#a855f7]/30">
            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6">Primary Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff2d92] to-[#a855f7] rounded-full text-white font-bold hover:shadow-[0_0_30px_rgba(255,45,146,0.5)] transition-all duration-500 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Primary
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#4ecdc4] to-[#6bcb77] rounded-full text-white font-bold hover:shadow-[0_0_30px_rgba(78,205,196,0.5)] transition-all duration-500">
                Success
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#ffd93d] rounded-full text-white font-bold hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] transition-all duration-500">
                Warning
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/15 transition-all duration-500">
                Secondary
              </button>
            </div>

            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6 mt-10">Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-4 py-2 text-sm bg-gradient-to-r from-[#ff2d92] to-[#a855f7] rounded-full text-white font-semibold hover:shadow-[0_0_20px_rgba(255,45,146,0.4)] transition-all duration-500">
                Small
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff2d92] to-[#a855f7] rounded-full text-white font-bold hover:shadow-[0_0_25px_rgba(255,45,146,0.5)] transition-all duration-500">
                Medium
              </button>
              <button className="px-8 py-4 text-lg bg-gradient-to-r from-[#ff2d92] to-[#a855f7] rounded-full text-white font-bold hover:shadow-[0_0_35px_rgba(255,45,146,0.6)] transition-all duration-500">
                Large
              </button>
            </div>

            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6 mt-10">With Border Glow</p>
            <div className="flex flex-wrap gap-4">
              <button className="relative px-6 py-3 rounded-full text-white font-bold transition-all duration-500 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff2d92] to-[#a855f7] group-hover:shadow-[0_0_30px_rgba(255,45,146,0.5)]" />
                <div className="absolute inset-[2px] rounded-full bg-[#1a1a2e]" />
                <span className="relative bg-gradient-to-r from-[#ff2d92] to-[#a855f7] bg-clip-text text-transparent">Outline</span>
              </button>
              <button className="relative px-6 py-3 rounded-full text-white font-bold transition-all duration-500 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4ecdc4] to-[#6bcb77] group-hover:shadow-[0_0_30px_rgba(78,205,196,0.5)]" />
                <div className="absolute inset-[2px] rounded-full bg-[#1a1a2e]" />
                <span className="relative bg-gradient-to-r from-[#4ecdc4] to-[#6bcb77] bg-clip-text text-transparent">Outline</span>
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Gradient cards with neon borders and hover effects"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Card 1 - Purple to Pink with neon border */}
          <div className="relative p-6 rounded-[24px] overflow-hidden group hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7] to-[#ff2d92]" />
            <div className="absolute inset-[3px] rounded-[21px] bg-gradient-to-br from-[#a855f7]/90 to-[#ff2d92]/90" />
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-[12px] flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Multi-Layer</h3>
              <p className="text-white/80 text-sm">Stacked glass panels create depth and dimension</p>
            </div>
          </div>

          {/* Card 2 - Cyan to Green with neon border */}
          <div className="relative p-6 rounded-[24px] overflow-hidden group hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(78,205,196,0.4)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4ecdc4] to-[#6bcb77]" />
            <div className="absolute inset-[3px] rounded-[21px] bg-gradient-to-br from-[#4ecdc4]/90 to-[#6bcb77]/90" />
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-[12px] flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Refraction</h3>
              <p className="text-white/80 text-sm">Rainbow edges simulate light through glass</p>
            </div>
          </div>

          {/* Card 3 - Pink to Orange with neon border */}
          <div className="relative p-6 rounded-[24px] overflow-hidden group hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,107,53,0.4)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff2d92] to-[#ff6b35]" />
            <div className="absolute inset-[3px] rounded-[21px] bg-gradient-to-br from-[#ff2d92]/90 to-[#ff6b35]/90" />
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-[12px] flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fluid Motion</h3>
              <p className="text-white/80 text-sm">Smooth transitions create liquid movement</p>
            </div>
          </div>
        </div>

        {/* Large feature card */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="relative p-8 rounded-[28px] overflow-hidden hover:shadow-[0_0_50px_rgba(255,45,146,0.3)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff2d92] via-[#a855f7] to-[#4ecdc4]" />
            <div className="absolute inset-[3px] rounded-[25px] bg-gradient-to-r from-[#ff2d92]/95 via-[#a855f7]/95 to-[#4ecdc4]/95" />
            <div className="relative flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-[16px] flex items-center justify-center flex-shrink-0">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Featured Card</h3>
                <p className="text-white/80">Large cards with multi-color gradients for hero sections and featured content.</p>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="Form Elements"
        subtitle="Glass inputs with rainbow focus rings"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[32px] shadow-2xl before:absolute before:inset-0 before:rounded-[32px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7] after:absolute after:inset-[1px] after:rounded-[31px] after:-z-10 after:bg-gradient-to-b after:from-white/20 after:to-transparent">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Contact Form</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-[16px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-transparent focus:shadow-[0_0_0_2px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.2)] transition-all duration-500"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-[16px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-transparent focus:shadow-[0_0_0_2px_rgba(78,205,196,0.5),0_0_20px_rgba(78,205,196,0.2)] transition-all duration-500"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Message</label>
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-[16px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-transparent focus:shadow-[0_0_0_2px_rgba(255,107,107,0.5),0_0_20px_rgba(255,107,107,0.2)] transition-all duration-500 resize-none"
                />
              </div>
              <button className="relative w-full px-6 py-3 bg-white/10 backdrop-blur-md rounded-[16px] text-white font-semibold hover:bg-white/15 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-500 before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Glass tab navigation with glow indicators"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent">
            <div className="flex gap-2 p-1 bg-white/5 rounded-[16px] mb-6">
              {["Overview", "Features", "Pricing"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(i)}
                  className={`flex-1 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-500 ${
                    selectedTab === i
                      ? "bg-white/15 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-white/80">
              {selectedTab === 0 && <p>Overview content with glass morphism styling and smooth transitions.</p>}
              {selectedTab === 1 && <p>Features list showcasing rainbow edge effects and fluid animations.</p>}
              {selectedTab === 2 && <p>Pricing tiers displayed in multi-layer glass cards.</p>}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Refraction Badges */}
      <ShowcaseSection
        title="Badges"
        subtitle="Capsule badges with rainbow pulse animation"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent">
            <div className="flex flex-wrap gap-3">
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]">
                <Sparkles className="w-3.5 h-3.5" /> New
              </span>
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#34C759] before:to-[#30D158]">
                <Check className="w-3.5 h-3.5" /> Success
              </span>
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#FF9500] before:to-[#FFCC00]">
                <Bell className="w-3.5 h-3.5" /> Warning
              </span>
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#FF2D55] before:to-[#FF3B30]">
                <X className="w-3.5 h-3.5" /> Error
              </span>
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm animate-pulse before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#007AFF] before:to-[#5AC8FA]">
                <Zap className="w-3.5 h-3.5" /> Live
              </span>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Glass Stack Demo */}
      <ShowcaseSection
        title="Glass Stack"
        subtitle="Multi-layer stacking with depth offset"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-md mx-auto relative h-80">
          {/* Stack layer 3 (back) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[280px] h-[180px] bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] rotate-[-3deg] translate-y-4" />
          {/* Stack layer 2 (middle) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[280px] h-[180px] bg-white/8 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] rotate-[1deg] translate-y-2" />
          {/* Stack layer 1 (front) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[280px] h-[180px] relative bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] shadow-xl before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7] after:absolute after:inset-[1px] after:rounded-[23px] after:-z-10 after:bg-gradient-to-b after:from-white/15 after:to-transparent p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Stacked Layers</h3>
            <p className="text-white/70 text-sm">Multiple glass panels create rich depth perception</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Control Center Demo */}
      <ShowcaseSection
        title="Control Center"
        subtitle="iOS-style glass control tiles"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-sm mx-auto">
          <div className="relative p-4 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[28px] before:absolute before:inset-0 before:rounded-[28px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Wifi, label: "Wi-Fi", active: toggleStates[0] },
                { icon: Bluetooth, label: "Bluetooth", active: toggleStates[1] },
                { icon: Moon, label: "Focus", active: toggleStates[2] },
                { icon: Volume2, label: "Sound", active: toggleStates[3] },
              ].map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => toggleSwitch(i)}
                  className={`aspect-square flex flex-col items-center justify-center gap-2 rounded-[20px] transition-all duration-500 ${
                    item.active
                      ? "bg-[#007AFF]/40 shadow-[0_0_20px_rgba(0,122,255,0.4)]"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                  <span className="text-white text-xs">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Volume slider */}
            <div className="mt-4 p-3 bg-white/5 rounded-[16px]">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-white/60" />
                <div className="flex-1 h-2 bg-white/10 rounded-full relative">
                  <div className="absolute left-0 top-0 h-full w-2/3 bg-gradient-to-r from-[#007AFF] to-[#5AC8FA] rounded-full" />
                  <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-black/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress Bars */}
      <ShowcaseSection
        title="Progress"
        subtitle="Glass progress bars with gradient fills"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="relative p-6 bg-white/5 backdrop-blur-[40px] rounded-[20px]">
            <p className="text-sm text-white/60 mb-2">Rainbow Progress</p>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-[#ff6b6b] via-[#4ecdc4] to-[#a855f7] rounded-full" />
            </div>
          </div>
          <div className="relative p-6 bg-white/5 backdrop-blur-[40px] rounded-[20px]">
            <p className="text-sm text-white/60 mb-2">Apple Blue</p>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-[#007AFF] to-[#5AC8FA] rounded-full" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Glass notification cards with status indicators"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-md mx-auto space-y-4">
          <div className="relative p-4 bg-white/10 backdrop-blur-[40px] rounded-[16px] flex items-start gap-3 before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#34C759] before:to-[#30D158]">
            <div className="w-8 h-8 bg-[#34C759]/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-[#34C759]" />
            </div>
            <div>
              <p className="font-semibold text-white">Success</p>
              <p className="text-white/70 text-sm">Your changes have been saved successfully.</p>
            </div>
          </div>

          <div className="relative p-4 bg-white/10 backdrop-blur-[40px] rounded-[16px] flex items-start gap-3 before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#FF9500] before:to-[#FFCC00]">
            <div className="w-8 h-8 bg-[#FF9500]/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Bell className="w-4 h-4 text-[#FF9500]" />
            </div>
            <div>
              <p className="font-semibold text-white">Warning</p>
              <p className="text-white/70 text-sm">Please review your settings before continuing.</p>
            </div>
          </div>

          <div className="relative p-4 bg-white/10 backdrop-blur-[40px] rounded-[16px] flex items-start gap-3 before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#FF2D55] before:to-[#FF3B30]">
            <div className="w-8 h-8 bg-[#FF2D55]/30 rounded-full flex items-center justify-center flex-shrink-0">
              <X className="w-4 h-4 text-[#FF2D55]" />
            </div>
            <div>
              <p className="font-semibold text-white">Error</p>
              <p className="text-white/70 text-sm">Something went wrong. Please try again.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Rules"
        subtitle="Key principles for implementing Liquid Glass"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {designRules.map((rule, i) => (
            <div key={i} className="relative p-5 bg-white/5 backdrop-blur-[40px] rounded-[16px] before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent">
              <h4 className="font-semibold text-white mb-1">{rule.title}</h4>
              <p className="text-white/60 text-sm">{rule.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="px-6 py-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] border-t border-white/10 [box-shadow:0_-1px_0_0_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(168,85,247,0.2)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/60 text-sm">Liquid Glass Design System</span>
          <div className="flex gap-6">
            <Link href="/styles/liquid-glass" className="text-white/70 hover:text-white transition-colors duration-300">
              Documentation
            </Link>
            <Link href="/styles" className="text-white/70 hover:text-white transition-colors duration-300">
              All Styles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
