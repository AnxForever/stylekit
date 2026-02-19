"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Sun, Palmtree, Waves,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Compass, Shell, Sunrise,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Sunshine White", hex: "#fffde7", bg: "bg-[#fffde7]", border: true },
  { name: "Warm Sand", hex: "#fff8e1", bg: "bg-[#fff8e1]", border: true },
  { name: "Ocean Teal", hex: "#00897b", bg: "bg-[#00897b]" },
  { name: "Deep Teal", hex: "#00796b", bg: "bg-[#00796b]" },
  { name: "Coral Reef", hex: "#ff6f61", bg: "bg-[#ff6f61]" },
  { name: "Mango", hex: "#ffc107", bg: "bg-[#ffc107]" },
  { name: "Palm Green", hex: "#4caf50", bg: "bg-[#4caf50]" },
  { name: "Lagoon Blue", hex: "#26c6da", bg: "bg-[#26c6da]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Beaches", icon: Waves },
    { label: "Adventures", icon: Compass },
    { label: "Wellness", icon: Sunrise },
  ];

  const accordionItems = [
    { title: "What is Tropical Paradise design?", content: "Tropical Paradise design captures the vibrant energy of island life -- sun-drenched shores, crystal-clear waters, and lush tropical foliage. It translates the warmth and optimism of a tropical getaway into bright, airy digital interfaces." },
    { title: "Key Principles", content: "Bold, warm colours that evoke coral reefs and mango sunsets. Rounded, inviting shapes. Generous whitespace that feels like a sea breeze. Hover animations that lift elements upward like palm fronds swaying in the wind." },
    { title: "The Resort Experience", content: "Every interaction should feel like a vacation. Warm teal anchors the palette, coral accents draw the eye, and buttery sunshine backgrounds create a sense of endless summer warmth and relaxation." },
  ];

  return (
    <div className="min-h-screen bg-[#fffde7] text-gray-800">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#00897b]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/tropical-paradise"
            className="flex items-center gap-2 text-[#00897b] hover:text-[#00796b] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Palmtree className="w-5 h-5 text-[#4caf50]" />
            <span className="font-bold text-lg text-[#00897b]">
              Tropical Paradise
            </span>
          </div>
          <Link
            href="/styles"
            className="px-5 py-2 text-sm font-bold text-[#00897b] border-2 border-[#00897b]/20 rounded-full hover:bg-[#00897b] hover:text-white hover:-translate-y-0.5 transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#ffc107]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#00897b]/10 blur-3xl" />
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#ff6f61]/10 blur-2xl" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ff6f61]/10 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ff6f61]" />
            <span className="text-sm font-medium text-[#ff6f61]">Paradise Awaits</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#00897b] mb-8 leading-tight tracking-tight">
            Endless
            <span className="block text-[#ff6f61]">Summer</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Sun-kissed shores, crystal waters, and swaying palms. Every pixel radiates warmth and tropical bliss.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Destination metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#00897b] mb-2"
        subtitleClassName="text-sm text-gray-500 mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Travellers", value: "12,847" },
            { icon: TrendingUp, label: "Growth", value: "+34%" },
            { icon: Eye, label: "Views", value: "428K" },
            { icon: Heart, label: "Favourites", value: "9,203" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl border border-[#00897b]/15 shadow-[0_4px_20px_rgba(0,137,123,0.1)] hover:shadow-[0_8px_30px_rgba(0,137,123,0.15)] hover:-translate-y-1 transition-all duration-300"
            >
              <stat.icon className="w-5 h-5 text-[#00897b] mb-4" />
              <p className="text-3xl font-bold text-[#00897b] mb-1">{stat.value}</p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Inspired by tropical shores and coral reefs"
        className="py-16 px-6 bg-white/60"
        titleClassName="text-2xl font-bold text-[#00897b] mb-2"
        subtitleClassName="text-sm text-gray-500 mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-2xl overflow-hidden border border-[#00897b]/15 bg-white shadow-[0_4px_20px_rgba(0,137,123,0.08)]"
            labelClassName="text-sm font-bold text-gray-700"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Bright and inviting"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#00897b] mb-2"
        subtitleClassName="text-sm text-gray-500 mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-white rounded-2xl border border-[#00897b]/15 shadow-[0_4px_20px_rgba(0,137,123,0.1)]">
            <p className="text-6xl font-bold text-[#00897b] mb-4 leading-tight tracking-tight">Heading</p>
            <p className="text-4xl font-bold text-[#ff6f61] mb-4">Subheading</p>
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              Body text with a relaxed, breezy feel. Warm and approachable, like a conversation on the beach.
            </p>
            <p className="text-sm font-medium text-[#ffc107] uppercase tracking-wider">
              Label text with sunny warmth
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Vibrant and inviting"
        className="py-16 px-6 bg-white/60"
        titleClassName="text-2xl font-bold text-[#00897b] mb-2"
        subtitleClassName="text-sm text-gray-500 mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white rounded-2xl border border-[#00897b]/15 shadow-[0_4px_20px_rgba(0,137,123,0.1)]">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-8 py-3 bg-[#00897b] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,137,123,0.3)] hover:bg-[#00796b] hover:-translate-y-0.5 transition-all duration-300">
                Primary
              </button>
              <button className="px-8 py-3 bg-white text-[#00897b] text-sm font-bold rounded-full border-2 border-[#00897b]/20 hover:border-[#00897b] hover:-translate-y-0.5 transition-all duration-300">
                Secondary
              </button>
              <button className="px-8 py-3 text-[#ff6f61] text-sm font-bold hover:text-[#e65b50] transition-colors underline underline-offset-4 decoration-[#ff6f61]/30">
                Text Link
              </button>
              <button className="px-8 py-3 bg-[#ff6f61] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(255,111,97,0.3)] hover:bg-[#e65b50] hover:-translate-y-0.5 transition-all duration-300">
                Coral
              </button>
              <button className="px-8 py-3 bg-gray-100 text-gray-400 text-sm font-bold rounded-full cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Destination showcases"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#00897b] mb-2"
        subtitleClassName="text-sm text-gray-500 mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Shell, title: "Bali Retreat", price: "From $299/night", desc: "Private villas nestled among rice paddies and tropical gardens, with infinity pools overlooking the Indian Ocean." },
            { icon: Palmtree, title: "Maldives Escape", price: "From $599/night", desc: "Overwater bungalows floating above turquoise lagoons. Snorkel with sea turtles just steps from your deck." },
            { icon: Sun, title: "Costa Rica Lodge", price: "From $199/night", desc: "Rainforest canopy suites where howler monkeys greet you at sunrise and Pacific sunsets paint the sky." },
          ].map((card, index) => (
            <div key={index} className="p-6 bg-white rounded-2xl border border-[#00897b]/15 shadow-[0_4px_20px_rgba(0,137,123,0.1)] hover:shadow-[0_8px_30px_rgba(0,137,123,0.15)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#ff6f61]" />
                <span className="inline-block w-2 h-2 rounded-full bg-[#ffc107]" />
                <span className="inline-block w-2 h-2 rounded-full bg-[#4caf50]" />
              </div>
              <card.icon className="w-6 h-6 text-[#00897b] mb-3 group-hover:text-[#ff6f61] transition-colors" />
              <h3 className="text-lg font-bold text-[#00897b] mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{card.desc}</p>
              <div className="pt-3 border-t border-[#00897b]/10">
                <span className="text-[#ff6f61] font-bold text-sm">{card.price}</span>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Explore categories"
        className="py-16 px-6 bg-white/60"
        titleClassName="text-2xl font-bold text-[#00897b] mb-2"
        subtitleClassName="text-sm text-gray-500 mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#00897b]/15 overflow-hidden shadow-[0_4px_20px_rgba(0,137,123,0.1)]">
            <div className="flex border-b border-[#00897b]/10">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold transition-all border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#00897b] border-[#00897b]"
                      : "text-gray-400 border-transparent hover:text-gray-600"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6 min-h-[120px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-lg font-bold text-[#00897b] mb-2">White Sand Shores</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Powder-soft sand meets crystal-clear water in an endless ribbon of coastline. Palm trees sway gently in the trade winds as the sun paints everything gold.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-bold text-[#00897b] mb-2">Island Expeditions</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Kayak through hidden lagoons, hike to volcanic peaks, or dive alongside manta rays. Every day brings a new adventure under tropical skies.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-bold text-[#00897b] mb-2">Spa and Rejuvenation</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Open-air treatment rooms surrounded by tropical blooms. Traditional healing techniques meet modern wellness in paradise settings.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Frequently asked"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#00897b] mb-2"
        subtitleClassName="text-sm text-gray-500 mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl border border-[#00897b]/15 overflow-hidden shadow-[0_2px_8px_rgba(0,137,123,0.08)]">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#fffde7] transition-colors"
              >
                <span className="font-bold text-gray-700">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#00897b] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t border-[#00897b]/10">
                  <p className="text-sm text-gray-600 leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Travel notices"
        className="py-16 px-6 bg-white/60"
        titleClassName="text-2xl font-bold text-[#00897b] mb-2"
        subtitleClassName="text-sm text-gray-500 mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#4caf50]/10 rounded-2xl border-l-4 border-[#4caf50]">
            <Check className="w-4 h-4 text-[#4caf50] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#4caf50]">Booking confirmed</p>
              <p className="text-xs text-[#4caf50]/70 mt-0.5">Your paradise escape is secured. Pack your bags!</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ffc107]/10 rounded-2xl border-l-4 border-[#ffc107]">
            <AlertTriangle className="w-4 h-4 text-[#ffc107] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#9a6700]">Weather advisory</p>
              <p className="text-xs text-[#9a6700]/70 mt-0.5">Afternoon showers expected. Bring a light cover-up.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ff6f61]/10 rounded-2xl border-l-4 border-[#ff6f61]">
            <X className="w-4 h-4 text-[#ff6f61] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#ff6f61]">Sold out</p>
              <p className="text-xs text-[#ff6f61]/70 mt-0.5">This date is fully booked. Try nearby alternatives.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#00897b]/10 rounded-2xl border-l-4 border-[#00897b]">
            <Info className="w-4 h-4 text-[#00897b] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#00897b]">Travel tip</p>
              <p className="text-xs text-[#00897b]/70 mt-0.5">Visit during the dry season for the best snorkelling conditions.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Trip preferences"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#00897b] mb-2"
        subtitleClassName="text-sm text-gray-500 mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#00897b]/15 p-6 space-y-5 shadow-[0_4px_20px_rgba(0,137,123,0.1)]">
            {[
              { label: "Beachfront Rooms Only", desc: "Filter for oceanview and beachside accommodation" },
              { label: "All-Inclusive Packages", desc: "Include meals, drinks, and activities in pricing" },
              { label: "Eco-Friendly Options", desc: "Show sustainable and carbon-neutral resorts" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-bold text-gray-700">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    toggleStates[index] ? "bg-[#00897b]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                      toggleStates[index] ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="Progress"
        subtitle="Booking completion"
        className="py-16 px-6 bg-white/60"
        titleClassName="text-2xl font-bold text-[#00897b] mb-2"
        subtitleClassName="text-sm text-gray-500 mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#00897b]/15 p-6 space-y-6 shadow-[0_4px_20px_rgba(0,137,123,0.1)]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-gray-700">Trip planning progress</p>
                <p className="text-xs text-[#00897b] font-mono">{progress}%</p>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-[#00897b] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">Itinerary steps</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all ${value === 100 ? "bg-[#4caf50]" : value > 0 ? "bg-[#ffc107]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">Day {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#00897b]/10">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-5 py-2 text-sm font-bold text-[#00897b] bg-white border-2 border-[#00897b]/20 rounded-full hover:border-[#00897b] hover:-translate-y-0.5 transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-5 py-2 text-sm font-bold bg-[#00897b] text-white rounded-full shadow-[0_4px_16px_rgba(0,137,123,0.3)] hover:bg-[#00796b] hover:-translate-y-0.5 transition-all duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Book your escape"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#00897b] mb-2"
        subtitleClassName="text-sm text-gray-500 mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl border border-[#00897b]/15 p-8 shadow-[0_4px_20px_rgba(0,137,123,0.1)]">
            <h3 className="text-lg font-bold text-[#00897b] mb-6">Reserve Your Paradise</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-5 py-3 bg-white border-2 border-[#00897b]/20 rounded-full text-gray-800 placeholder-[#00897b]/40 font-medium focus:border-[#00897b] focus:shadow-[0_0_0_3px_rgba(0,137,123,0.15)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-5 py-3 bg-white border-2 border-[#00897b]/20 rounded-full text-gray-800 placeholder-[#00897b]/40 font-medium focus:border-[#00897b] focus:shadow-[0_0_0_3px_rgba(0,137,123,0.15)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Special Requests</label>
                <textarea
                  placeholder="Tell us about your dream trip..."
                  rows={3}
                  className="w-full px-5 py-3 bg-white border-2 border-[#00897b]/20 rounded-2xl text-gray-800 placeholder-[#00897b]/40 font-medium focus:border-[#00897b] focus:shadow-[0_0_0_3px_rgba(0,137,123,0.15)] focus:outline-none transition-all duration-300 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#00897b] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,137,123,0.3)] hover:bg-[#00796b] hover:-translate-y-0.5 transition-all duration-300 mt-2">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#00897b]/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-gray-500 tracking-wider">
            Tropical Paradise Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#00897b] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
