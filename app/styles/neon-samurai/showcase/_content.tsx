"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sword, Zap, Wind, ChevronDown, ChevronUp, Check, X, AlertTriangle, Info, Users, TrendingUp, Eye, Shield } from "lucide-react";
import { ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem } from "@/components/showcase";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(75);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const colors: ColorItem[] = [
    { name: "Crimson Blade", value: "#ff0055", description: "Primary" },
    { name: "Electric Cyan", value: "#00d9ff", description: "Secondary" },
    { name: "Neon Purple", value: "#b900ff", description: "Accent" },
    { name: "Sunset Orange", value: "#ff6600", description: "Highlight" },
    { name: "Void Black", value: "#0a0a0a", description: "Background" },
  ];

  const tabs = ["刀 Katana", "侍 Samurai", "霊 Spirit"];
  const accordionItems = [
    { title: "What is Neon Samurai?", content: "A fusion of traditional Japanese samurai aesthetics with futuristic cyberpunk neon elements, creating a striking visual style that honors ancient warrior culture while embracing high-tech dystopian futures." },
    { title: "Design Elements", content: "Features katana blade silhouettes, Japanese kanji typography, ukiyo-e wave patterns, samurai armor motifs, and intense neon lighting in pink, cyan, and purple that create dramatic contrast against dark backgrounds." },
    { title: "Perfect For", content: "Action games, anime streaming platforms, Japanese tech brands, cyberpunk content, martial arts apps, and any project blending traditional Japanese culture with futuristic aesthetics." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff0055] blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00d9ff] blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        <header className="border-b border-[#ff0055] bg-black/90 backdrop-blur-md sticky top-0 z-50" style={{ boxShadow: '0 0 30px rgba(255,0,85,0.5)' }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-[#00d9ff] hover:text-[#ff0055] transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold tracking-wider">戻る RETURN</span>
            </Link>
            <div className="flex gap-3">
              <Sword className="w-6 h-6 text-[#ff0055] animate-pulse" />
              <Zap className="w-6 h-6 text-[#00d9ff] animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </header>

        <ShowcaseHero
          title="霓虹武士"
          subtitle="NEON SAMURAI"
          description="Where ancient honor meets electric future - a cyberpunk fusion of traditional Japanese warrior culture and neon-lit dystopia"
          className="relative py-32 px-6 overflow-hidden"
          titleClassName="text-7xl md:text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-[#b900ff] to-[#00d9ff]"
          subtitleClassName="text-2xl text-[#00d9ff] mb-8 font-bold tracking-[0.3em]"
          descriptionClassName="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          style={{
            textShadow: '0 0 30px rgba(255,0,85,0.8), 0 0 60px rgba(0,217,255,0.6)'
          }}
        >
          <div className="absolute top-20 right-10 text-9xl font-black text-[#ff0055]/10 rotate-12">刀</div>
          <div className="absolute bottom-20 left-10 text-9xl font-black text-[#00d9ff]/10 -rotate-12">侍</div>
        </ShowcaseHero>

        <ShowcaseSection 
          title="戦士統計 / WARRIOR STATS" 
          subtitle="Battle metrics"
          className="py-20 px-6"
          titleClassName="text-4xl font-black text-[#ff0055] mb-3 text-center tracking-wider"
          subtitleClassName="text-[#00d9ff] mb-12 text-center text-sm tracking-widest"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: "WARRIORS", value: "15.2K", color: "#ff0055", glow: "rgba(255,0,85,0.5)" },
              { icon: TrendingUp, label: "HONOR", value: "+88%", color: "#00d9ff", glow: "rgba(0,217,255,0.5)" },
              { icon: Eye, label: "VIEWS", value: "892K", color: "#b900ff", glow: "rgba(185,0,255,0.5)" },
              { icon: Shield, label: "DEFENSE", value: "99", color: "#ff6600", glow: "rgba(255,102,0,0.5)" },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="p-6 bg-black/80 backdrop-blur-sm border-2 hover:scale-105 transition-all relative overflow-hidden group"
                style={{ 
                  borderColor: stat.color,
                  boxShadow: `0 0 30px ${stat.glow}, inset 0 0 30px ${stat.glow}20`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <stat.icon className="w-10 h-10 mb-4" style={{ color: stat.color, filter: `drop-shadow(0 0 10px ${stat.color})` }} />
                <p className="text-4xl font-black mb-2" style={{ color: stat.color, textShadow: `0 0 20px ${stat.glow}` }}>{stat.value}</p>
                <p className="text-xs text-gray-500 tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection 
          title="色彩 / COLORS" 
          subtitle="Neon palette"
          className="py-20 px-6 relative"
          titleClassName="text-4xl font-black text-[#00d9ff] mb-3 text-center tracking-wider"
          subtitleClassName="text-[#b900ff] mb-12 text-center text-sm tracking-widest"
        >
          <div className="absolute top-0 left-0 text-[200px] font-black text-[#ff0055]/5 select-none">刀</div>
          <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto relative z-10" />
        </ShowcaseSection>

        <ShowcaseSection 
          title="文字 / TYPOGRAPHY" 
          subtitle="Blade-sharp text"
          className="py-20 px-6"
          titleClassName="text-4xl font-black text-[#b900ff] mb-3 text-center tracking-wider"
          subtitleClassName="text-[#ff6600] mb-12 text-center text-sm tracking-widest"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { text: "霓虹武士", jp: "NEON SAMURAI", size: "text-7xl", color: "#ff0055", shadow: "rgba(255,0,85,0.8)" },
              { text: "侍道精神", jp: "BUSHIDO SPIRIT", size: "text-5xl", color: "#00d9ff", shadow: "rgba(0,217,255,0.8)" },
              { text: "Electric honor flows through cyber veins", size: "text-xl", color: "#b900ff", shadow: "rgba(185,0,255,0.6)" },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gradient-to-r from-black/80 to-black/40 backdrop-blur-sm border-l-4" style={{ borderColor: item.color }}>
                <p className={`${item.size} font-black mb-2`} style={{ color: item.color, textShadow: `0 0 30px ${item.shadow}, 0 0 60px ${item.shadow}` }}>
                  {item.text}
                </p>
                {item.jp && <p className="text-sm text-gray-500 tracking-[0.3em]">{item.jp}</p>}
              </div>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection 
          title="按鈕 / BUTTONS" 
          subtitle="Action commands"
          className="py-20 px-6 relative"
          titleClassName="text-4xl font-black text-[#ff6600] mb-3 text-center tracking-wider"
          subtitleClassName="text-[#ff0055] mb-12 text-center text-sm tracking-widest"
        >
          <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
            {[
              { label: "斬 SLASH", color: "#ff0055", shadow: "rgba(255,0,85,0.8)" },
              { label: "防 DEFEND", color: "#00d9ff", shadow: "rgba(0,217,255,0.8)" },
              { label: "霊 SPIRIT", color: "#b900ff", shadow: "rgba(185,0,255,0.8)" },
              { label: "炎 FIRE", color: "#ff6600", shadow: "rgba(255,102,0,0.8)" },
            ].map((btn, i) => (
              <button 
                key={i}
                className="px-8 py-4 font-black text-white relative overflow-hidden group border-2 transition-all hover:scale-110"
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  borderColor: btn.color,
                  boxShadow: `0 0 30px ${btn.shadow}, inset 0 0 20px ${btn.shadow}30`
                }}
              >
                <span className="relative z-10" style={{ textShadow: `0 0 10px ${btn.color}` }}>{btn.label}</span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: btn.color, opacity: 0.3 }}
                />
              </button>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection 
          title="卡片 / CARDS" 
          subtitle="Data panels"
          className="py-20 px-6"
          titleClassName="text-4xl font-black text-[#00d9ff] mb-3 text-center tracking-wider"
          subtitleClassName="text-[#ff0055] mb-12 text-center text-sm tracking-widest"
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { title: "刀 KATANA", desc: "Blade of honor", icon: Sword, color: "#ff0055" },
              { title: "雷 THUNDER", desc: "Electric strike", icon: Zap, color: "#00d9ff" },
              { title: "風 WIND", desc: "Silent approach", icon: Wind, color: "#b900ff" },
            ].map((card, i) => (
              <div 
                key={i} 
                className="p-8 bg-black/80 backdrop-blur-sm border-2 relative overflow-hidden group hover:scale-105 transition-all"
                style={{ 
                  borderColor: card.color,
                  boxShadow: `0 0 40px ${card.color}40`
                }}
              >
                <div className="absolute top-0 right-0 text-8xl font-black opacity-5" style={{ color: card.color }}>
                  <card.icon className="w-24 h-24" />
                </div>
                <h3 className="text-3xl font-black mb-4 relative z-10" style={{ color: card.color, textShadow: `0 0 20px ${card.color}` }}>
                  {card.title}
                </h3>
                <p className="text-gray-400 relative z-10">{card.desc}</p>
              </div>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection 
          title="標籤 / TABS" 
          subtitle="Navigation system"
          className="py-20 px-6 relative"
          titleClassName="text-4xl font-black text-[#ff0055] mb-3 text-center tracking-wider"
          subtitleClassName="text-[#00d9ff] mb-12 text-center text-sm tracking-widest"
        >
          <div className="max-w-3xl mx-auto">
            <div className="bg-black/90 backdrop-blur-md border-2 border-[#ff0055]" style={{ boxShadow: '0 0 40px rgba(255,0,85,0.4)' }}>
              <div className="flex border-b-2 border-[#ff0055]">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 px-6 py-4 font-black transition-all border-r-2 last:border-r-0 ${activeTab === i ? 'text-black' : 'text-[#00d9ff] hover:bg-white/5'}`}
                    style={{ 
                      backgroundColor: activeTab === i ? (i === 0 ? '#ff0055' : i === 1 ? '#00d9ff' : '#b900ff') : 'transparent',
                      borderColor: '#ff0055',
                      textShadow: activeTab !== i ? '0 0 10px currentColor' : 'none'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-8 min-h-[160px]">
                {activeTab === 0 && <div><h4 className="text-3xl font-black text-[#ff0055] mb-4" style={{ textShadow: '0 0 20px rgba(255,0,85,0.8)' }}>刀 KATANA</h4><p className="text-gray-400">The sacred blade that cuts through darkness with honor</p></div>}
                {activeTab === 1 && <div><h4 className="text-3xl font-black text-[#00d9ff] mb-4" style={{ textShadow: '0 0 20px rgba(0,217,255,0.8)' }}>侍 SAMURAI</h4><p className="text-gray-400">Warriors of code and steel in the neon wasteland</p></div>}
                {activeTab === 2 && <div><h4 className="text-3xl font-black text-[#b900ff] mb-4" style={{ textShadow: '0 0 20px rgba(185,0,255,0.8)' }}>霊 SPIRIT</h4><p className="text-gray-400">The eternal essence that transcends flesh and wire</p></div>}
              </div>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection 
          title="手風琴 / ACCORDION" 
          subtitle="Expandable data"
          className="py-20 px-6"
          titleClassName="text-4xl font-black text-[#b900ff] mb-3 text-center tracking-wider"
          subtitleClassName="text-[#ff6600] mb-12 text-center text-sm tracking-widest"
        >
          <div className="max-w-3xl mx-auto space-y-0">
            {accordionItems.map((item, i) => (
              <div key={i} className="bg-black/80 backdrop-blur-sm border-2 border-[#00d9ff]/30 border-b-0 last:border-b-2">
                <button
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#00d9ff]/10 transition-colors"
                >
                  <span className="font-black text-[#00d9ff]" style={{ textShadow: '0 0 10px rgba(0,217,255,0.6)' }}>{item.title}</span>
                  {openAccordion === i ? <ChevronUp className="w-6 h-6 text-[#ff0055]" /> : <ChevronDown className="w-6 h-6 text-[#ff0055]" />}
                </button>
                {openAccordion === i && (
                  <div className="px-6 pb-6 border-t-2 border-[#00d9ff]/20">
                    <p className="text-gray-400 leading-relaxed mt-4">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection 
          title="警報 / ALERTS" 
          subtitle="System messages"
          className="py-20 px-6 relative"
          titleClassName="text-4xl font-black text-[#ff6600] mb-3 text-center tracking-wider"
          subtitleClassName="text-[#b900ff] mb-12 text-center text-sm tracking-widest"
        >
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { icon: Check, label: "SUCCESS", desc: "Mission accomplished with honor", color: "#00ff88", glow: "rgba(0,255,136,0.5)" },
              { icon: AlertTriangle, label: "WARNING", desc: "Danger detected in sector 7", color: "#ffaa00", glow: "rgba(255,170,0,0.5)" },
              { icon: X, label: "ERROR", desc: "System breach - initiate protocol", color: "#ff0055", glow: "rgba(255,0,85,0.5)" },
              { icon: Info, label: "INFO", desc: "New data transmission received", color: "#00d9ff", glow: "rgba(0,217,255,0.5)" },
            ].map((alert, i) => (
              <div 
                key={i} 
                className="flex items-center gap-4 p-5 bg-black/80 backdrop-blur-sm border-2 border-l-8"
                style={{ 
                  borderColor: alert.color,
                  boxShadow: `0 0 30px ${alert.glow}`
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${alert.color}20`, boxShadow: `0 0 20px ${alert.glow}` }}>
                  <alert.icon className="w-6 h-6" style={{ color: alert.color, filter: `drop-shadow(0 0 5px ${alert.color})` }} />
                </div>
                <div>
                  <p className="font-black text-sm tracking-wider" style={{ color: alert.color, textShadow: `0 0 10px ${alert.glow}` }}>{alert.label}</p>
                  <p className="text-gray-400 text-sm">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection 
          title="開關 / TOGGLE" 
          subtitle="System controls"
          className="py-20 px-6"
          titleClassName="text-4xl font-black text-[#00d9ff] mb-3 text-center tracking-wider"
          subtitleClassName="text-[#ff0055] mb-12 text-center text-sm tracking-widest"
        >
          <div className="max-w-3xl mx-auto">
            <div className="p-8 bg-black/90 backdrop-blur-md border-2 border-[#00d9ff] space-y-6" style={{ boxShadow: '0 0 40px rgba(0,217,255,0.3)' }}>
              {[
                { label: "霓虹光 NEON GLOW", desc: "Illuminate the blade", color: "#ff0055" },
                { label: "電流 ELECTRIC", desc: "Enhance power flow", color: "#00d9ff" },
                { label: "紫霧 PURPLE MIST", desc: "Stealth mode active", color: "#b900ff" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b-2 border-white/10 last:border-b-0">
                  <div>
                    <p className="font-black" style={{ color: item.color, textShadow: `0 0 10px ${item.color}` }}>{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => { const newStates = [...toggleStates]; newStates[i] = !newStates[i]; setToggleStates(newStates); }}
                    className="relative w-16 h-8 border-2 transition-all rounded-full"
                    style={{ 
                      backgroundColor: toggleStates[i] ? item.color : '#000',
                      borderColor: item.color,
                      boxShadow: toggleStates[i] ? `0 0 20px ${item.color}` : 'none'
                    }}
                  >
                    <span
                      className="absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all"
                      style={{ 
                        left: toggleStates[i] ? 'calc(100% - 28px)' : '2px',
                        boxShadow: toggleStates[i] ? `0 0 10px ${item.color}` : 'none'
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection 
          title="進度 / PROGRESS" 
          subtitle="Power level"
          className="py-20 px-6 relative"
          titleClassName="text-4xl font-black text-[#ff0055] mb-3 text-center tracking-wider"
          subtitleClassName="text-[#00d9ff] mb-12 text-center text-sm tracking-widest"
        >
          <div className="max-w-3xl mx-auto">
            <div className="p-8 bg-black/90 backdrop-blur-md border-2 border-[#ff0055] space-y-8" style={{ boxShadow: '0 0 50px rgba(255,0,85,0.4)' }}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-black text-[#ff0055]" style={{ textShadow: '0 0 10px rgba(255,0,85,0.8)' }}>戦闘力 BATTLE POWER</p>
                  <p className="text-sm font-black text-[#00d9ff]">{progress}%</p>
                </div>
                <div className="h-4 bg-black border-2 border-[#00d9ff] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff0055] via-[#b900ff] to-[#00d9ff] transition-all duration-500"
                    style={{ 
                      width: `${progress}%`,
                      boxShadow: '0 0 20px rgba(255,0,85,0.8), inset 0 0 10px rgba(255,255,255,0.5)'
                    }}
                  />
                </div>
              </div>

              <div>
                <p className="font-black text-[#b900ff] mb-3" style={{ textShadow: '0 0 10px rgba(185,0,255,0.8)' }}>技能等級 SKILL LEVELS</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: 100, label: "刀", color: "#ff0055" },
                    { val: 100, label: "防", color: "#00d9ff" },
                    { val: progress, label: "霊", color: "#b900ff" },
                    { val: 0, label: "炎", color: "#ff6600" },
                  ].map((skill, i) => (
                    <div key={i}>
                      <div className="h-3 bg-black border border-white/30 rounded">
                        <div
                          className="h-full rounded transition-all"
                          style={{ 
                            width: `${skill.val}%`,
                            backgroundColor: skill.color,
                            boxShadow: skill.val > 0 ? `0 0 10px ${skill.color}` : 'none'
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center font-black">{skill.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t-2 border-white/10">
                <button
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  className="px-6 py-3 bg-black border-2 border-[#00d9ff] text-[#00d9ff] font-black hover:bg-[#00d9ff] hover:text-black transition-all"
                  style={{ textShadow: '0 0 10px currentColor' }}
                >
                  [-10]
                </button>
                <button
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  className="px-6 py-3 bg-gradient-to-r from-[#ff0055] to-[#b900ff] text-white font-black hover:scale-105 transition-all"
                  style={{ boxShadow: '0 0 20px rgba(255,0,85,0.6)' }}
                >
                  [+10]
                </button>
              </div>
            </div>
          </div>
        </ShowcaseSection>

        <footer className="border-t-2 border-[#ff0055] py-12 px-6 text-center bg-black/90 backdrop-blur-md relative" style={{ boxShadow: '0 -10px 50px rgba(255,0,85,0.3)' }}>
          <p className="text-gray-500 text-sm tracking-wider">
            霓虹武士 NEON SAMURAI © 2026 - 名誉と電気の道 HONOR AND ELECTRIC WAY
          </p>
        </footer>
      </div>
    </div>
  );
}
