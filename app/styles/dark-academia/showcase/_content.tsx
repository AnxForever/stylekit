"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Check, X, AlertTriangle, Info, BookOpen, Feather, Library, GraduationCap, Pen, Glasses } from "lucide-react";
import { ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem } from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Espresso", value: "#3c2415", textColor: "white" },
  { name: "Moss", value: "#4a5d3a", textColor: "white" },
  { name: "Antique Gold", value: "#c4a35a", textColor: "black" },
  { name: "Parchment", value: "#f0e6d3", textColor: "black" },
  { name: "Ink", value: "#2c2c2c", textColor: "white" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(58);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = ["Literature", "Philosophy", "History"];
  const accordionItems = [
    { title: "The Dark Academia Aesthetic", content: "Dark Academia romanticizes the pursuit of knowledge. It draws from classical education, Gothic architecture, and literary culture to create an atmosphere of scholarly devotion." },
    { title: "Core Elements", content: "Tweed and leather, handwritten letters, dusty bookshelves, candlelight, Gothic libraries, classical music, and the eternal pursuit of truth through reading and reflection." },
    { title: "Cultural References", content: "The Secret History by Donna Tartt, Dead Poets Society, Oxford and Cambridge traditions, Greek and Latin classics, and the romantic ideal of the tortured scholar." },
  ];

  return (
    <div className="min-h-screen bg-[#f0e6d3]" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f0e6d3]/90 backdrop-blur-sm border-b border-[#3c2415]/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#3c2415]/60 hover:text-[#c4a35a] transition-colors"><ArrowLeft className="w-4 h-4" /><span className="text-sm italic">Return to the world</span></Link>
          <span className="text-[#3c2415]/40 text-sm italic tracking-wider">Dark Academia</span>
        </div>
      </nav>

      <ShowcaseHero title="Dark Academia" subtitle="To devote oneself to the pursuit of knowledge is the noblest of all callings" className="relative pt-28 pb-24 px-6 text-center" titleClassName="text-6xl md:text-8xl italic text-[#3c2415] mb-6" subtitleClassName="text-base text-[#4a5d3a] max-w-2xl mx-auto italic" />

      {/* Stats */}
      <ShowcaseSection title="Statistics" subtitle="By the numbers" className="py-16 px-6" titleClassName="text-3xl italic text-[#3c2415] mb-2 text-center" subtitleClassName="text-[#4a5d3a] italic mb-10 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, label: "Books Read", value: "1,247", color: "#3c2415" },
            { icon: Feather, label: "Essays", value: "342", color: "#4a5d3a" },
            { icon: Library, label: "Libraries", value: "28", color: "#c4a35a" },
            { icon: GraduationCap, label: "Subjects", value: "12", color: "#2c2c2c" },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white/50 border border-[#3c2415]/10 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: stat.color }} />
              <p className="text-3xl italic" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm text-[#3c2415]/40 italic mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Color Palette" subtitle="Autumn hues" className="py-16 px-6 bg-[#3c2415]/5" titleClassName="text-3xl italic text-[#3c2415] mb-2 text-center" subtitleClassName="text-[#4a5d3a] italic mb-10 text-center">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      <ShowcaseSection title="Typography" subtitle="The written word" className="py-16 px-6" titleClassName="text-3xl italic text-[#3c2415] mb-2 text-center" subtitleClassName="text-[#4a5d3a] italic mb-10 text-center">
        <div className="max-w-4xl mx-auto p-8 bg-white/50 border border-[#3c2415]/10">
          <p className="text-5xl italic text-[#3c2415] mb-3">Carpe Diem</p>
          <p className="text-3xl italic text-[#4a5d3a] mb-3">Seize the Day</p>
          <p className="text-xl text-[#c4a35a] italic mb-3">In the pursuit of beauty and truth</p>
          <p className="text-base text-[#3c2415]/50 leading-relaxed italic">Dark Academia typography favors classical serifs with generous spacing, evoking the printed pages of leather-bound volumes. Each letterform carries the weight of centuries of scholarly tradition.</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Buttons" subtitle="Actions of intent" className="py-16 px-6 bg-[#3c2415]/5" titleClassName="text-3xl italic text-[#3c2415] mb-2 text-center" subtitleClassName="text-[#4a5d3a] italic mb-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-[#3c2415] text-[#f0e6d3] italic hover:bg-[#4d3020] transition-colors">Read More</button>
          <button className="px-8 py-3 bg-[#4a5d3a] text-white italic hover:bg-[#5a6d4a] transition-colors">Explore</button>
          <button className="px-8 py-3 border border-[#3c2415] text-[#3c2415] italic hover:bg-[#3c2415] hover:text-[#f0e6d3] transition-colors">Annotate</button>
          <button className="px-8 py-3 bg-[#c4a35a] text-[#3c2415] italic hover:bg-[#b4933a] transition-colors">Bookmark</button>
          <button className="px-8 py-3 bg-[#d4c5a9] text-[#3c2415]/40 italic cursor-not-allowed">Sealed</button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cards" subtitle="Study notes" className="py-16 px-6" titleClassName="text-3xl italic text-[#3c2415] mb-2 text-center" subtitleClassName="text-[#4a5d3a] italic mb-10 text-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "The Library", desc: "Endless shelves of leather-bound volumes, the scent of old pages filling the air.", icon: Library, color: "#3c2415" },
            { title: "The Letter", desc: "Written by candlelight, each word carefully chosen, sealed with wax.", icon: Pen, color: "#4a5d3a" },
            { title: "The Lecture", desc: "A professor speaks of ancient civilizations while rain patters against tall windows.", icon: Glasses, color: "#c4a35a" },
          ].map((card, i) => (
            <div key={i} className="p-6 bg-white/50 border border-[#3c2415]/10 hover:shadow-lg transition-shadow">
              <card.icon className="w-8 h-8 mb-4" style={{ color: card.color }} />
              <h3 className="text-lg italic font-bold mb-2" style={{ color: card.color }}>{card.title}</h3>
              <p className="text-[#3c2415]/50 text-sm italic leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs" subtitle="Course catalog" className="py-16 px-6 bg-[#3c2415]/5" titleClassName="text-3xl italic text-[#3c2415] mb-2 text-center" subtitleClassName="text-[#4a5d3a] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/50 border border-[#3c2415]/10">
          <div className="flex border-b border-[#3c2415]/10">
            {tabs.map((tab, i) => (<button key={i} onClick={() => setActiveTab(i)} className={`flex-1 py-4 text-sm italic transition-colors ${activeTab === i ? "bg-[#3c2415] text-[#f0e6d3]" : "text-[#3c2415]/40 hover:text-[#3c2415]"}`}>{tab}</button>))}
          </div>
          <div className="p-6 min-h-[120px]">
            {activeTab === 0 && <div><h4 className="text-lg italic text-[#3c2415] font-bold mb-2">Classical Literature</h4><p className="text-[#3c2415]/50 text-sm italic">From Homer to Dostoevsky, the great works that shaped Western thought and continue to illuminate the human condition.</p></div>}
            {activeTab === 1 && <div><h4 className="text-lg italic text-[#4a5d3a] font-bold mb-2">Moral Philosophy</h4><p className="text-[#3c2415]/50 text-sm italic">Plato, Aristotle, Nietzsche - the eternal questions of ethics, existence, and the meaning of the good life.</p></div>}
            {activeTab === 2 && <div><h4 className="text-lg italic text-[#c4a35a] font-bold mb-2">Ancient History</h4><p className="text-[#3c2415]/50 text-sm italic">The rise and fall of civilizations, from the glory of Athens to the grandeur of Rome, echoing through time.</p></div>}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Accordion" subtitle="Folios" className="py-16 px-6" titleClassName="text-3xl italic text-[#3c2415] mb-2 text-center" subtitleClassName="text-[#4a5d3a] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-white/50 border border-[#3c2415]/10">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#3c2415]/5 transition-colors">
                <span className="italic text-[#3c2415]">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#c4a35a] transition-transform ${openAccordion === i ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === i && <div className="px-6 pb-5"><p className="text-[#3c2415]/50 text-sm italic leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alerts" subtitle="Marginalia" className="py-16 px-6 bg-[#3c2415]/5" titleClassName="text-3xl italic text-[#3c2415] mb-2 text-center" subtitleClassName="text-[#4a5d3a] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-4 p-4 bg-white/50 border-l-4 border-[#4a5d3a]"><Check className="w-5 h-5 text-[#4a5d3a]" /><div><p className="italic font-bold text-[#4a5d3a]">Well Done</p><p className="text-[#3c2415]/40 text-sm italic">Your thesis has been accepted.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-white/50 border-l-4 border-[#c4a35a]"><AlertTriangle className="w-5 h-5 text-[#c4a35a]" /><div><p className="italic font-bold text-[#c4a35a]">Due Date</p><p className="text-[#3c2415]/40 text-sm italic">The essay deadline approaches.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-white/50 border-l-4 border-[#8b4513]"><X className="w-5 h-5 text-[#8b4513]" /><div><p className="italic font-bold text-[#8b4513]">Overdue</p><p className="text-[#3c2415]/40 text-sm italic">The library book must be returned.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-white/50 border-l-4 border-[#3c2415]"><Info className="w-5 h-5 text-[#3c2415]" /><div><p className="italic font-bold text-[#3c2415]">Note</p><p className="text-[#3c2415]/40 text-sm italic">A new collection has arrived.</p></div></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Toggle" subtitle="Study preferences" className="py-16 px-6" titleClassName="text-3xl italic text-[#3c2415] mb-2 text-center" subtitleClassName="text-[#4a5d3a] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/50 border border-[#3c2415]/10 p-6 space-y-4">
          {[{ label: "Candlelight", desc: "Read by candlelight" },{ label: "Classical Music", desc: "Play background music" },{ label: "Annotations", desc: "Show margin notes" }].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#3c2415]/10 last:border-b-0">
              <div><p className="italic text-[#3c2415]">{item.label}</p><p className="text-sm text-[#3c2415]/30 italic">{item.desc}</p></div>
              <button onClick={() => { const n = [...toggleStates]; n[i] = !n[i]; setToggleStates(n); }} className={`relative w-14 h-7 rounded-full transition-colors ${toggleStates[i] ? "bg-[#3c2415]" : "bg-[#3c2415]/20"}`}>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-[#f0e6d3] rounded-full shadow transition-transform ${toggleStates[i] ? "translate-x-7" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Progress" subtitle="Semester progress" className="py-16 px-6 bg-[#3c2415]/5" titleClassName="text-3xl italic text-[#3c2415] mb-2 text-center" subtitleClassName="text-[#4a5d3a] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/50 border border-[#3c2415]/10 p-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2"><p className="italic text-[#3c2415]">Reading Progress</p><p className="text-sm italic text-[#c4a35a]">{progress}%</p></div>
            <div className="h-2 bg-[#3c2415]/10 rounded-full"><div className="h-full bg-gradient-to-r from-[#3c2415] to-[#4a5d3a] rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-6 py-2 border border-[#3c2415] text-[#3c2415] italic hover:bg-[#3c2415] hover:text-[#f0e6d3] transition-colors">Previous Chapter</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-6 py-2 bg-[#3c2415] text-[#f0e6d3] italic hover:bg-[#4d3020] transition-colors">Next Chapter</button>
          </div>
        </div>
      </ShowcaseSection>

      <footer className="py-12 px-6 text-center border-t border-[#3c2415]/10"><p className="text-[#3c2415]/30 text-sm italic">Dark Academia - The beauty of knowledge in darkness</p></footer>
    </div>
  );
}
