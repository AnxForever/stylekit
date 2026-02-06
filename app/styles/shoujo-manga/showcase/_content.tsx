"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Sparkles, Star, ChevronDown, ChevronUp, Check, X, AlertTriangle, Info, Users, TrendingUp, Eye, Crown } from "lucide-react";
import { ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem } from "@/components/showcase";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(70);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const colors: ColorItem[] = [
    { name: "Princess Pink", value: "#ffb3d9", description: "Primary" },
    { name: "Dreamy Purple", value: "#c8a2e0", description: "Secondary" },
    { name: "Gold Sparkle", value: "#ffd700", description: "Accent" },
    { name: "Rose Blush", value: "#ffb6c1", description: "Highlight" },
    { name: "Soft White", value: "#fff5f8", description: "Background" },
  ];

  const tabs = ["Love", "Magic", "Dreams"];
  const accordionItems = [
    { title: "What is Shoujo Manga Style?", content: "A romantic anime aesthetic inspired by Japanese shoujo manga, featuring sparkling stars, flowing flower petals, soft pastel colors, and dreamy atmospheres that capture the essence of youthful romance and magical girl stories." },
    { title: "Visual Elements", content: "Signature elements include sparkle effects, floating flower petals, soft gradients, decorative frames, ribbon accents, and shimmering highlights that create a magical, romantic atmosphere." },
    { title: "Perfect For", content: "Ideal for otome games, dating sims, magical girl apps, kawaii brands, anime fan sites, and any project targeting a feminine anime aesthetic with romantic and dreamy vibes." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 text-gray-800">
      <header className="border-b border-pink-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-lg shadow-pink-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-pink-600 hover:text-purple-500 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Gallery</span>
          </Link>
          <div className="flex gap-2">
            <Heart className="w-5 h-5 text-pink-400 animate-pulse" fill="currentColor" />
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" style={{ animationDelay: '0.6s' }} fill="currentColor" />
          </div>
        </div>
      </header>

      <ShowcaseHero
        title="✨ Shoujo Manga ✨"
        subtitle="Dreamy Romantic Aesthetic"
        description="Sparkles, petals, and endless romance - a magical anime aesthetic filled with youthful dreams and beautiful moments."
        className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100"
        titleClassName="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
        subtitleClassName="text-2xl text-purple-500 mb-8"
        descriptionClassName="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
      >
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {i % 3 === 0 ? <Heart className="w-4 h-4 text-pink-400" fill="currentColor" /> :
               i % 3 === 1 ? <Star className="w-4 h-4 text-yellow-400" fill="currentColor" /> :
               <Sparkles className="w-4 h-4 text-purple-400" />}
            </div>
          ))}
        </div>
      </ShowcaseHero>

      <ShowcaseSection title="Statistics" subtitle="Our lovely community" className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Fans", value: "12.8K", gradient: "from-pink-400 to-pink-600" },
            { icon: TrendingUp, label: "Growth", value: "+95%", gradient: "from-purple-400 to-purple-600" },
            { icon: Eye, label: "Views", value: "1.2M", gradient: "from-yellow-400 to-yellow-600" },
            { icon: Crown, label: "Premium", value: "3.4K", gradient: "from-pink-400 to-purple-600" },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white rounded-3xl shadow-xl hover:scale-105 transition-all relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-1 relative z-10">{stat.value}</p>
              <p className="text-sm text-gray-500 relative z-10">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Color Palette" subtitle="Pastel dreams" className="py-20 px-6 bg-white/50">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      <ShowcaseSection title="Typography" subtitle="Romantic fonts" className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          {[
            { text: "✨ Magical Title ✨", size: "text-6xl", gradient: "from-pink-500 via-purple-500 to-pink-500" },
            { text: "Romantic Heading", size: "text-4xl", gradient: "from-purple-400 to-pink-400" },
            { text: "Dreamy body text for beautiful stories", size: "text-xl", gradient: "from-gray-600 to-gray-700" },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white rounded-3xl shadow-lg">
              <p className={`${item.size} font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}>{item.text}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Buttons" subtitle="Lovely interactions" className="py-20 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          {[
            { label: "♥ Like", gradient: "from-pink-400 to-pink-600" },
            { label: "✨ Magic", gradient: "from-purple-400 to-purple-600" },
            { label: "⭐ Favorite", gradient: "from-yellow-400 to-yellow-600" },
            { label: "👑 Premium", gradient: "from-pink-400 to-purple-600" },
          ].map((btn, i) => (
            <button key={i} className={`px-8 py-4 bg-gradient-to-r ${btn.gradient} text-white font-bold rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all`}>
              {btn.label}
            </button>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cards" subtitle="Story panels" className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "First Love", desc: "Heart-fluttering moments", gradient: "from-pink-100 to-pink-200", icon: Heart },
            { title: "Magic Power", desc: "Transformation sequence", gradient: "from-purple-100 to-purple-200", icon: Sparkles },
            { title: "True Ending", desc: "Happily ever after", gradient: "from-yellow-100 to-yellow-200", icon: Star },
          ].map((card, i) => (
            <div key={i} className={`p-8 bg-gradient-to-br ${card.gradient} rounded-3xl shadow-xl hover:scale-105 hover:rotate-1 transition-all border-4 border-white relative overflow-hidden group`}>
              <div className="absolute top-4 right-4">
                <card.icon className="w-12 h-12 text-white/30 group-hover:scale-125 group-hover:rotate-12 transition-all" fill="currentColor" />
              </div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs" subtitle="Story chapters" className="py-20 px-6 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-pink-100">
            <div className="flex p-2 bg-gradient-to-r from-pink-50 to-purple-50">
              {tabs.map((tab, i) => (
                <button key={i} onClick={() => setActiveTab(i)} className={`flex-1 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === i ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-xl scale-105' : 'text-gray-500 hover:bg-white'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-10 min-h-[180px]">
              {activeTab === 0 && <div><h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-4">♥ Love Story</h4><p className="text-gray-600">Sweet romance and heart-fluttering moments between characters</p></div>}
              {activeTab === 1 && <div><h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">✨ Magical Powers</h4><p className="text-gray-600">Transformation sequences and special abilities</p></div>}
              {activeTab === 2 && <div><h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-500 mb-4">⭐ Dreams Come True</h4><p className="text-gray-600">Wishes fulfilled and happy endings achieved</p></div>}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Accordion" subtitle="Story details" className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-pink-100">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-pink-50 transition-colors">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">{item.title}</span>
                {openAccordion === i ? <ChevronUp className="w-6 h-6 text-pink-400" /> : <ChevronDown className="w-6 h-6 text-pink-400" />}
              </button>
              {openAccordion === i && <div className="px-6 pb-6 bg-gradient-to-br from-pink-50 to-purple-50"><p className="text-gray-600 leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alerts" subtitle="Sweet notifications" className="py-20 px-6 bg-white/50">
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { icon: Check, label: "Success", desc: "Your wish has been granted! ✨", gradient: "from-green-400 to-green-600" },
            { icon: AlertTriangle, label: "Notice", desc: "Something needs your attention! 💫", gradient: "from-yellow-400 to-yellow-600" },
            { icon: X, label: "Error", desc: "Oops! Magic spell failed! 💔", gradient: "from-red-400 to-red-600" },
            { icon: Info, label: "Info", desc: "New message from your destiny! 💕", gradient: "from-blue-400 to-blue-600" },
          ].map((alert, i) => (
            <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-xl hover:scale-105 transition-all border-2 border-pink-100">
              <div className={`w-12 h-12 bg-gradient-to-br ${alert.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                <alert.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${alert.gradient}`}>{alert.label}</p>
                <p className="text-gray-600 text-sm">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Toggle" subtitle="Magical switches" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-white rounded-3xl shadow-2xl border-4 border-pink-100 space-y-6">
            {[
              { label: "Sparkle Effects", desc: "Show magical sparkles", gradient: "from-pink-400 to-pink-600" },
              { label: "Petal Animation", desc: "Floating flower petals", gradient: "from-purple-400 to-purple-600" },
              { label: "Heart Reactions", desc: "Lovely heart effects", gradient: "from-red-400 to-pink-600" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b-2 border-pink-100 last:border-b-0">
                <div>
                  <p className="font-bold text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => { const newStates = [...toggleStates]; newStates[i] = !newStates[i]; setToggleStates(newStates); }}
                  className={`relative w-16 h-9 rounded-full transition-all shadow-lg ${toggleStates[i] ? `bg-gradient-to-r ${item.gradient}` : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-1 w-7 h-7 bg-white rounded-full shadow-md transition-all flex items-center justify-center ${toggleStates[i] ? 'left-8' : 'left-1'}`}>
                    {toggleStates[i] && <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Progress" subtitle="Loading magic" className="py-20 px-6 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-white rounded-3xl shadow-2xl border-4 border-pink-100 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-gray-800">Magical Power Charging ✨</p>
                <p className="text-sm text-pink-500 font-bold">{progress}%</p>
              </div>
              <div className="h-4 bg-pink-100 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 transition-all duration-500 rounded-full shadow-lg" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-800 mb-3">Story Progress</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((val, i) => (
                  <div key={i}>
                    <div className="h-3 bg-pink-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${val === 100 ? 'bg-gradient-to-r from-green-400 to-green-600' : val > 0 ? 'bg-gradient-to-r from-pink-400 to-purple-400' : ''}`} style={{ width: `${val}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">Ch.{i + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4 border-t-2 border-pink-100">
              <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-6 py-3 border-2 border-pink-300 text-pink-600 rounded-full hover:bg-pink-50 transition-all font-bold">Decrease</button>
              <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:shadow-xl transition-all font-bold">Increase</button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <footer className="border-t-4 border-pink-200 py-12 px-6 text-center bg-white/80">
        <p className="text-gray-500">✨ Shoujo Manga Style © 2026 - Made with love and magic ♥</p>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
