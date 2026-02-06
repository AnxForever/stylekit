"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ChevronDown, Check, X, AlertTriangle, Info,
  Flame, Eye, Zap, Shield
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(73);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const colors: ColorItem[] = [
    { color: "#0a0a0f", name: "Void Black / 玄黑", textColor: "white" },
    { color: "#cc1a1a", name: "Vermillion / 朱红", textColor: "white" },
    { color: "#d4a017", name: "Imperial Gold / 帝金", textColor: "black" },
    { color: "#00d4ff", name: "Neon Cyan / 霓青", textColor: "black" },
    { color: "#8b00ff", name: "Neon Purple / 霓紫", textColor: "white" },
    { color: "#1a1a2e", name: "Deep Ink / 墨蓝", textColor: "white" },
  ];

  const tabs = ["Dragon / 龙", "Phoenix / 凤", "Qilin / 麒麟"];

  const accordionItems = [
    { title: "赛博中华是什么？", content: "赛博中华风格将中国传统美学元素（龙凤图腾、篆刻印章、云纹水纹、灯笼红墙）与赛博朋克的霓虹科技感融合，创造出东方未来主义的独特视觉语言。" },
    { title: "核心设计元素", content: "朱红与金色的传统配色搭配霓虹蓝紫的科技光效。龙凤纹样数字化、篆刻印章作为UI元素、云纹作为装饰图案、灯笼作为光源隐喻。" },
    { title: "文化灵感来源", content: "灵感源自《三体》科幻文学、中国古建筑的赛博化想象、赛博朋克电影中的东方元素、以及传统水墨与数字艺术的碰撞。" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e0d5c0] font-sans">
      {/* Back */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/styles/cyber-chinese" className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0f]/80 border border-[#cc1a1a]/50 text-[#cc1a1a] text-xs uppercase tracking-widest hover:bg-[#cc1a1a] hover:text-white transition-all backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4" /> RETURN / 返回
        </Link>
      </div>

      {/* Hero */}
      <ShowcaseHero
        title="赛博中华"
        subtitle="CYBER CHINESE // EASTERN FUTURISM"
        className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f] overflow-hidden"
        titleClassName="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#cc1a1a] to-[#d4a017] drop-shadow-[0_0_30px_rgba(204,26,26,0.4)]"
        subtitleClassName="text-xs uppercase tracking-[0.5em] text-[#00d4ff] mt-6"
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #cc1a1a 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="absolute top-8 right-8 text-right text-[#d4a017]/40 text-xs tracking-widest">
          <p>天下大同</p>
          <p>HARMONY PROTOCOL</p>
        </div>
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection title="数据 // DATA" subtitle="System metrics" className="py-16 px-6 bg-[#0a0a0f]" titleClassName="text-3xl font-black text-[#cc1a1a] mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#00d4ff] mb-10 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Flame, label: "Dragon Force / 龙力", value: "9,999", border: "border-[#cc1a1a]" },
            { icon: Eye, label: "Insight / 洞察", value: "88.8%", border: "border-[#d4a017]" },
            { icon: Zap, label: "Qi Flow / 气流", value: "1.21GW", border: "border-[#00d4ff]" },
            { icon: Shield, label: "Barrier / 结界", value: "ACTIVE", border: "border-[#8b00ff]" },
          ].map((s, i) => (
            <div key={i} className={`p-5 bg-[#1a1a2e]/60 border-l-4 ${s.border} border border-white/5 backdrop-blur-sm`}>
              <s.icon className="w-6 h-6 text-[#d4a017] mb-3" />
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs text-[#8b949e] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Colors */}
      <ShowcaseSection title="配色 // PALETTE" subtitle="Eastern neon spectrum" className="py-16 px-6 bg-[#0d0d14]" titleClassName="text-3xl font-black text-[#cc1a1a] mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#00d4ff] mb-10 text-center">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection title="字体 // TYPE" subtitle="Dual-script system" className="py-16 px-6 bg-[#0a0a0f]" titleClassName="text-3xl font-black text-[#cc1a1a] mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#00d4ff] mb-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 bg-[#1a1a2e]/60 border border-white/5 border-l-4 border-l-[#cc1a1a]">
            <p className="text-xs text-[#8b949e] uppercase tracking-widest mb-2">Display / Chinese + Latin</p>
            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#cc1a1a] to-[#d4a017]">龙腾四海 RISE</p>
          </div>
          <div className="p-6 bg-[#1a1a2e]/60 border border-white/5 border-l-4 border-l-[#00d4ff]">
            <p className="text-xs text-[#8b949e] uppercase tracking-widest mb-2">Body / Bilingual</p>
            <p className="text-base text-[#c9d1d9] leading-relaxed">当传统遇见未来，朱红与霓虹在数字空间中交织。When tradition meets the future, vermillion and neon interweave in digital space.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection title="按钮 // BUTTONS" subtitle="Action elements" className="py-16 px-6 bg-[#0d0d14]" titleClassName="text-3xl font-black text-[#cc1a1a] mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#00d4ff] mb-10 text-center">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-[#cc1a1a] text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(204,26,26,0.5)] transition-all">启动 ACTIVATE</button>
          <button className="px-8 py-3 bg-transparent border-2 border-[#d4a017] text-[#d4a017] font-bold uppercase tracking-widest text-xs hover:bg-[#d4a017] hover:text-black transition-all">传送 TRANSFER</button>
          <button className="px-8 py-3 bg-transparent border border-[#00d4ff] text-[#00d4ff] font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all">扫描 SCAN</button>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection title="模块 // MODULES" subtitle="Information panels" className="py-16 px-6 bg-[#0a0a0f]" titleClassName="text-3xl font-black text-[#cc1a1a] mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#00d4ff] mb-10 text-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            { title: "龙 Dragon", desc: "The digital dragon soars through data streams, its scales reflecting neon light across the network.", border: "border-t-[#cc1a1a]" },
            { title: "凤 Phoenix", desc: "Rising from corrupted data, the phoenix rebuilds systems with golden flame protocols.", border: "border-t-[#d4a017]" },
            { title: "麟 Qilin", desc: "Guardian of the firewall, the qilin patrols the boundary between tradition and innovation.", border: "border-t-[#00d4ff]" },
          ].map((c, i) => (
            <div key={i} className={`p-6 bg-[#1a1a2e]/60 border border-white/5 border-t-4 ${c.border}`}>
              <h3 className="text-lg font-black text-white mb-2">{c.title}</h3>
              <p className="text-sm text-[#8b949e] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection title="导航 // TABS" subtitle="Category selection" className="py-16 px-6 bg-[#0d0d14]" titleClassName="text-3xl font-black text-[#cc1a1a] mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#00d4ff] mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-[#1a1a2e]/60 border border-white/5">
          <div className="flex border-b border-white/5">
            {tabs.map((t, i) => (
              <button key={i} onClick={() => setActiveTab(i)} className={`flex-1 px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all ${activeTab === i ? "bg-[#cc1a1a] text-white shadow-[0_0_15px_rgba(204,26,26,0.3)]" : "text-[#8b949e] hover:text-[#cc1a1a]"}`}>{t}</button>
            ))}
          </div>
          <div className="p-6 min-h-[100px]">
            {activeTab === 0 && <p className="text-[#c9d1d9]">龙之力量：掌控数据洪流，以雷霆之势穿越防火墙。Dragon power: command data torrents, pierce firewalls with thunderous force.</p>}
            {activeTab === 1 && <p className="text-[#c9d1d9]">凤之重生：从系统崩溃中涅槃，以金色火焰重建一切。Phoenix rebirth: rise from system crashes, rebuild with golden flame.</p>}
            {activeTab === 2 && <p className="text-[#c9d1d9]">麒麟守卫：巡逻在传统与创新的边界，守护数字结界。Qilin guardian: patrol the boundary, defend the digital barrier.</p>}
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection title="档案 // ARCHIVE" subtitle="Knowledge base" className="py-16 px-6 bg-[#0a0a0f]" titleClassName="text-3xl font-black text-[#cc1a1a] mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#00d4ff] mb-10 text-center">
        <div className="max-w-3xl mx-auto">
          {accordionItems.map((item, i) => (
            <div key={i} className="border border-white/5 border-b-0 last:border-b bg-[#1a1a2e]/60">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left">
                <span className="font-bold text-[#d4a017]">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#00d4ff] transition-transform ${openAccordion === i ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === i && <div className="px-6 pb-4"><p className="text-sm text-[#8b949e] leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection title="通知 // ALERTS" subtitle="System messages" className="py-16 px-6 bg-[#0d0d14]" titleClassName="text-3xl font-black text-[#cc1a1a] mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#00d4ff] mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-3 p-4 bg-[#1a1a2e]/60 border-l-4 border-[#00d4ff] border border-white/5"><Check className="w-5 h-5 text-[#00d4ff]" /><div><p className="font-bold text-white text-sm">结界激活 / BARRIER ACTIVE</p><p className="text-xs text-[#8b949e]">Digital ward established successfully.</p></div></div>
          <div className="flex items-center gap-3 p-4 bg-[#1a1a2e]/60 border-l-4 border-[#d4a017] border border-white/5"><AlertTriangle className="w-5 h-5 text-[#d4a017]" /><div><p className="font-bold text-white text-sm">气流波动 / QI FLUCTUATION</p><p className="text-xs text-[#8b949e]">Energy levels unstable, recalibrating.</p></div></div>
          <div className="flex items-center gap-3 p-4 bg-[#1a1a2e]/60 border-l-4 border-[#cc1a1a] border border-white/5"><X className="w-5 h-5 text-[#cc1a1a]" /><div><p className="font-bold text-white text-sm">入侵检测 / INTRUSION</p><p className="text-xs text-[#8b949e]">Unauthorized access attempt blocked.</p></div></div>
          <div className="flex items-center gap-3 p-4 bg-[#1a1a2e]/60 border-l-4 border-[#8b00ff] border border-white/5"><Info className="w-5 h-5 text-[#8b00ff]" /><div><p className="font-bold text-white text-sm">新版本 / UPDATE</p><p className="text-xs text-[#8b949e]">Firmware v3.14 available for download.</p></div></div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection title="开关 // TOGGLE" subtitle="System switches" className="py-16 px-6 bg-[#0a0a0f]" titleClassName="text-3xl font-black text-[#cc1a1a] mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#00d4ff] mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-[#1a1a2e]/60 border border-white/5 p-6 space-y-4">
          {[{ label: "龙脉连接 / Dragon Link", desc: "Connect to ancestral data network" }, { label: "霓虹屏障 / Neon Shield", desc: "Activate visual protection layer" }, { label: "灵气增幅 / Qi Amplifier", desc: "Boost spiritual energy output" }].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-b-0">
              <div><p className="font-bold text-white text-sm">{item.label}</p><p className="text-xs text-[#8b949e]">{item.desc}</p></div>
              <button onClick={() => { const n = [...toggleStates]; n[i] = !n[i]; setToggleStates(n); }} className={`relative w-14 h-7 transition-all ${toggleStates[i] ? "bg-[#cc1a1a] shadow-[0_0_10px_rgba(204,26,26,0.4)]" : "bg-[#2d2d3f]"}`}>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white transition-transform ${toggleStates[i] ? "translate-x-7" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection title="进度 // PROGRESS" subtitle="Status indicators" className="py-16 px-6 bg-[#0d0d14]" titleClassName="text-3xl font-black text-[#cc1a1a] mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#00d4ff] mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-[#1a1a2e]/60 border border-white/5 p-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2"><p className="font-bold text-white text-sm">传送进度 / Transfer</p><p className="text-xs text-[#cc1a1a]">{progress}%</p></div>
            <div className="h-3 bg-[#0a0a0f] border border-white/5"><div className="h-full bg-gradient-to-r from-[#cc1a1a] to-[#d4a017] transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-2">五行能量 / Five Elements</p>
            <div className="grid grid-cols-5 gap-2">
              {[{ c: "bg-[#cc1a1a]", l: "火", v: 100 }, { c: "bg-[#d4a017]", l: "土", v: 88 }, { c: "bg-[#00d4ff]", l: "水", v: progress }, { c: "bg-[#2d4a1e]", l: "木", v: 65 }, { c: "bg-[#8b949e]", l: "金", v: 45 }].map((e, i) => (
                <div key={i}><div className="h-2 bg-[#0a0a0f] border border-white/5"><div className={`h-full ${e.c}`} style={{ width: `${e.v}%` }} /></div><p className="text-[10px] text-[#8b949e] text-center mt-1">{e.l}</p></div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-4 py-2 border border-white/10 text-[#8b949e] text-xs uppercase tracking-widest hover:border-[#cc1a1a] hover:text-[#cc1a1a] transition-colors">DECREASE</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-4 py-2 bg-[#cc1a1a] text-white text-xs uppercase tracking-widest font-bold hover:shadow-[0_0_15px_rgba(204,26,26,0.4)] transition-all">INCREASE</button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0a0a0f] border-t border-white/5 text-center">
        <p className="text-xs text-[#8b949e] tracking-wider">赛博中华 // CYBER CHINESE // 东方未来主义 // EASTERN FUTURISM</p>
      </footer>
    </div>
  );
}
