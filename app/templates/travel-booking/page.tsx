"use client";

export const dynamic = "force-static";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Compass,
  Heart,
  Mail,
  MapPin,
  Menu,
  Plane,
  Quote,
  Route,
  Search,
  Send,
  Star,
  Users,
  X,
} from "lucide-react";
import { Fraunces, Space_Mono, Work_Sans } from "next/font/google";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const display = Fraunces({ subsets: ["latin"], style: ["normal", "italic"] });
const sans = Work_Sans({ subsets: ["latin"] });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"] });

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = ["Destinations", "Journeys", "The Journal", "About"];

const HERO_BODY =
  "Wayfare is a booking house run by travel editors. We sleep in the rooms, walk the routes, and hand you the trip already solved -- flights, stays, and the small print folded into one honest price.";

const HERO_TRUST = ["No booking fees", "Free cancellation", "24/7 human desk"];

const TICKER = ["Kyoto", "Merzouga", "Reykjavik", "Amalfi Coast", "Jaipur", "Banff", "Lisbon", "Hakone"];

type SceneKind = "kyoto" | "sahara" | "reykjavik" | "amalfi" | "jaipur" | "banff";

interface Destination {
  scene: SceneKind;
  place: string;
  country: string;
  stay: string;
  coords: string;
  price: number;
  rating: number;
  reviews: number;
  tags: string[];
  blurb: string;
}

const DESTINATIONS: Destination[] = [
  {
    scene: "kyoto",
    place: "Kyoto",
    country: "Japan",
    stay: "Tawaraya Ryokan",
    coords: "35.01 N / 135.77 E",
    price: 312,
    rating: 4.9,
    reviews: 218,
    tags: ["Ryokan", "Onsen", "Garden"],
    blurb: "Tatami mornings and a private garden the colour of moss and rain.",
  },
  {
    scene: "sahara",
    place: "Merzouga",
    country: "Morocco",
    stay: "Erg Chebbi Camp",
    coords: "31.10 N / 4.01 W",
    price: 189,
    rating: 4.8,
    reviews: 164,
    tags: ["Desert camp", "Stargazing", "Full board"],
    blurb: "A tented suite at the foot of the dunes, silent but for the wind.",
  },
  {
    scene: "reykjavik",
    place: "Reykjavik",
    country: "Iceland",
    stay: "Hotel Borealis",
    coords: "64.15 N / 21.94 W",
    price: 268,
    rating: 4.7,
    reviews: 302,
    tags: ["Aurora", "Geothermal", "Design"],
    blurb: "Glass angled straight at the aurora, a hot spring waiting below.",
  },
  {
    scene: "amalfi",
    place: "Amalfi",
    country: "Italy",
    stay: "Villa Lucia",
    coords: "40.63 N / 14.60 E",
    price: 395,
    rating: 4.9,
    reviews: 276,
    tags: ["Sea view", "Terrace", "Breakfast"],
    blurb: "Lemon terraces stacked above a sea that refuses to be one blue.",
  },
  {
    scene: "jaipur",
    place: "Jaipur",
    country: "India",
    stay: "Rambagh Haveli",
    coords: "26.91 N / 75.79 E",
    price: 224,
    rating: 4.8,
    reviews: 189,
    tags: ["Palace", "Courtyard", "Pool"],
    blurb: "A restored haveli of pink sandstone, courtyards cool as dusk.",
  },
  {
    scene: "banff",
    place: "Banff",
    country: "Canada",
    stay: "Moraine Lodge",
    coords: "51.18 N / 115.57 W",
    price: 342,
    rating: 4.7,
    reviews: 241,
    tags: ["Alpine", "Lake", "Fireplace"],
    blurb: "Timber and glass on a glacier lake, pines right to the waterline.",
  },
];

interface RouteCity {
  name: string;
  x: number;
  y: number;
  arc: string;
}

const HUB = { name: "London", x: 360, y: 150 };

const ROUTE_CITIES: RouteCity[] = [
  { name: "Reykjavik", x: 330, y: 92, arc: "M360,150 Q322,74 330,92" },
  { name: "Banff", x: 150, y: 132, arc: "M360,150 Q240,86 150,132" },
  { name: "Marrakech", x: 348, y: 252, arc: "M360,150 Q340,208 348,252" },
  { name: "Amalfi", x: 432, y: 182, arc: "M360,150 Q404,148 432,182" },
  { name: "Jaipur", x: 598, y: 216, arc: "M360,150 Q492,118 598,216" },
  { name: "Kyoto", x: 690, y: 178, arc: "M360,150 Q540,92 690,178" },
];

const WHY = [
  {
    icon: Compass,
    label: "We go first",
    body: "Every stay is booked, slept in, and written up by our own editors before it ever reaches your screen. No stock photos, no surprises at check-in.",
  },
  {
    icon: BadgeCheck,
    label: "One honest price",
    body: "The nightly rate is the rate. Taxes, the cleaning charge, the resort fee that is not really a fee -- all folded in and shown before you commit a cent.",
  },
  {
    icon: Route,
    label: "The whole thread",
    body: "Rooms, trains, the guide who knows the back roads. We book the journey end to end so the day you land is a day you enjoy, not a day you spend fixing.",
  },
];

const SPOTLIGHT = {
  kicker: "Guided journey",
  title: "The Nakasendo, on foot",
  lede: "Six days along the old post road through the Kiso Valley -- cedar forest, wooden inns, and the slower Japan the bullet trains forgot.",
  price: 2480,
  duration: "6 days",
  group: "Max 8 walkers",
  season: "May to November",
  days: [
    { day: "Day 01", title: "Arrive Magome", body: "Meet at dusk in the stone-paved hill town. A kaiseki dinner at the inn and an early night before the trail begins." },
    { day: "Day 02", title: "Magome to Tsumago", body: "The classic pass through cedar and waterfalls -- eight kilometres on the old cobbled road, ringing the bear bells as you climb." },
    { day: "Day 03", title: "Tsumago to Nojiri", body: "A quieter trail between tea houses and rice terraces, ending at a family-run minshuku with a deep cypress bath." },
    { day: "Day 04", title: "Kiso-Fukushima", body: "The old barrier town and its onsen. An afternoon free to wander the sake cellars and the steep riverside lanes." },
    { day: "Day 05", title: "Narai-juku", body: "The longest of the post towns, a full kilometre of dark timber. Lacquerware workshops and lantern-lit evenings." },
    { day: "Day 06", title: "On to Matsumoto", body: "A local line down to the black crow castle and a farewell lunch of cold soba before the group parts ways." },
  ],
};

const TESTIMONIALS = [
  {
    quote:
      "I have booked a lot of trips. This is the first time the itinerary read like it was written by a friend who actually lived there -- and every single reservation simply worked.",
    name: "Marisol Vantieghem",
    trip: "Amalfi Coast, in May",
  },
  {
    quote:
      "They put us in inns I could never have found, with hosts who waited up past midnight. The walking notes were precise down to the turn at the broken torii.",
    name: "Theo Okonkwo",
    trip: "Kiso Valley, last autumn",
  },
  {
    quote:
      "An aurora forecast by text at eleven at night, a car already warm outside the door. Wayfare thinks about the parts of a trip you forget until they go wrong.",
    name: "Greta Lindholm",
    trip: "Reykjavik, in winter",
  },
];

const NEWSLETTER_DONE = "You are on the list. The first dispatch lands in your inbox within the week.";

const MONTHS = ["Any month", "March", "April", "May", "June", "September", "October"];

const FOOTER_COLS = [
  { title: "Destinations", links: ["Japan", "Italy", "Iceland", "Morocco", "India", "Canada"] },
  { title: "Journeys", links: ["Walking", "By rail", "Culinary", "Off-season", "Family"] },
  { title: "Company", links: ["Our editors", "How we book", "Careers", "Press"] },
  { title: "Support", links: ["Help desk", "Manage booking", "Cancellation", "Contact"] },
];

const TAB_CTA: Record<"hotels" | "flights" | "journeys", { label: string; icon: typeof Search }> = {
  hotels: { label: "Search stays", icon: Search },
  flights: { label: "Find flights", icon: Plane },
  journeys: { label: "Browse journeys", icon: Compass },
};

/* ------------------------------------------------------------------ */
/* Destination scenes — pure CSS + SVG flat illustration              */
/* ------------------------------------------------------------------ */

function DestinationScene({ kind }: { kind: SceneKind }) {
  switch (kind) {
    case "kyoto":
      return (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#f7cabf 0%,#ef9fa8 32%,#b56176 60%,#6e3b52 100%)" }} />
          <div className="wf-float absolute left-[62%] top-[24%] h-16 w-16 rounded-full" style={{ background: "radial-gradient(circle at 40% 40%,#ffeede,#ffd6bf 70%)", boxShadow: "0 0 44px 8px rgba(255,214,191,0.55)" }} />
          <svg viewBox="0 0 400 260" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0,150 C60,132 130,142 190,128 C258,113 332,132 400,120 L400,260 L0,260 Z" fill="#8a5266" />
            <path d="M0,182 C80,162 152,180 232,166 C300,154 362,174 400,164 L400,260 L0,260 Z" fill="#5e3450" />
            <g fill="#33203a">
              <path d="M128,198 q72,-16 144,0 l0,10 q-72,-14 -144,0 Z" />
              <path d="M150,206 h12 v54 h-12 Z" />
              <path d="M238,206 h12 v54 h-12 Z" />
              <path d="M144,222 h112 v7 h-112 Z" />
            </g>
            <path d="M0,246 L400,246 L400,260 L0,260 Z" fill="#2a1a30" />
          </svg>
        </>
      );
    case "sahara":
      return (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#fdedc6 0%,#f6bd72 34%,#e08a3e 62%,#a9531f 100%)" }} />
          <div className="wf-float absolute left-1/2 top-[38%] h-20 w-20 -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle at 50% 45%,#fff7e2,#ffe4a8 72%)", boxShadow: "0 0 60px 12px rgba(255,220,150,0.5)" }} />
          <svg viewBox="0 0 400 260" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0,168 C120,138 202,176 300,150 C350,137 380,150 400,146 L400,260 L0,260 Z" fill="#cb7a31" />
            <path d="M0,200 C90,174 162,206 252,186 C322,170 372,192 400,184 L400,260 L0,260 Z" fill="#b06026" />
            <path d="M0,238 C110,214 192,240 292,222 C342,213 382,228 400,224 L400,260 L0,260 Z" fill="#8a451b" />
          </svg>
        </>
      );
    case "reykjavik":
      return (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#0c2536 0%,#123a4d 55%,#1c556a 100%)" }} />
          <div className="wf-drift absolute -left-6 top-[18%] h-24 w-[70%] rotate-[-8deg] rounded-full opacity-70 blur-2xl mix-blend-screen" style={{ background: "linear-gradient(90deg,transparent,#79e6c2,transparent)" }} />
          <div className="wf-drift-slow absolute left-[20%] top-[30%] h-20 w-[70%] rotate-[6deg] rounded-full opacity-60 blur-2xl mix-blend-screen" style={{ background: "linear-gradient(90deg,transparent,#63c7e6,transparent)" }} />
          <div className="absolute right-[20%] top-[16%] h-7 w-7 rounded-full" style={{ background: "radial-gradient(circle at 45% 40%,#f4fbff,#cfe6ef 75%)", boxShadow: "0 0 24px 4px rgba(210,235,245,0.45)" }} />
          <svg viewBox="0 0 400 260" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <g className="wf-twinkle" fill="#eaf6fb">
              <circle cx="60" cy="52" r="1.4" />
              <circle cx="140" cy="34" r="1.1" />
              <circle cx="250" cy="60" r="1.3" />
              <circle cx="330" cy="44" r="1" />
              <circle cx="200" cy="30" r="1.2" />
            </g>
            <path d="M0,192 L60,150 L112,186 L172,140 L232,182 L302,150 L360,186 L400,168 L400,260 L0,260 Z" fill="#6f97a3" />
            <path d="M0,216 L70,182 L122,212 L192,174 L252,208 L322,180 L400,212 L400,260 L0,260 Z" fill="#e9f2f4" />
          </svg>
        </>
      );
    case "amalfi":
      return (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#c6e9f4 0%,#83c6e2 46%,#4595bb 74%)" }} />
          <div className="wf-float absolute right-[26%] top-[20%] h-14 w-14 rounded-full" style={{ background: "radial-gradient(circle at 45% 42%,#fff4dc,#ffe6b8 72%)", boxShadow: "0 0 34px 6px rgba(255,235,190,0.55)" }} />
          <div className="absolute inset-x-0 bottom-0 h-[40%]" style={{ background: "linear-gradient(180deg,#2f8ab4 0%,#12547a 100%)" }} />
          <div className="absolute bottom-0 right-[26%] h-[40%] w-10 -translate-x-1/2 opacity-60 blur-[2px]" style={{ background: "linear-gradient(180deg,#ffeecb,transparent)" }} />
          <svg viewBox="0 0 400 260" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0,150 L34,150 L34,260 L0,260 Z" fill="none" />
            <g>
              <path d="M0,116 L58,108 L96,150 L128,214 L0,238 Z" fill="#b3541f" />
              <rect x="14" y="150" width="18" height="16" fill="#f0e2c8" />
              <rect x="40" y="140" width="16" height="15" fill="#efd8b6" />
              <rect x="20" y="176" width="16" height="15" fill="#e9d2ac" />
              <rect x="19" y="153" width="4" height="5" fill="#7c3d17" />
              <rect x="45" y="143" width="4" height="5" fill="#7c3d17" />
            </g>
            <g stroke="#7fc0dc" strokeWidth="2" opacity="0.55">
              <line x1="120" y1="196" x2="200" y2="196" />
              <line x1="240" y1="210" x2="330" y2="210" />
              <line x1="170" y1="224" x2="280" y2="224" />
            </g>
          </svg>
        </>
      );
    case "jaipur":
      return (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#fcdcac 0%,#f0a279 38%,#cf6470 66%,#8f3a5a 100%)" }} />
          <div className="wf-float absolute left-[30%] top-[26%] h-16 w-16 rounded-full" style={{ background: "radial-gradient(circle at 45% 42%,#fff0d6,#ffd7ac 74%)", boxShadow: "0 0 40px 8px rgba(255,210,170,0.5)" }} />
          <svg viewBox="0 0 400 260" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <g fill="#6e2c46">
              <path d="M0,206 L400,206 L400,260 L0,260 Z" />
              <path d="M172,206 C172,172 184,156 200,146 C216,156 228,172 228,206 Z" />
              <rect x="198" y="132" width="4" height="16" />
              <path d="M92,206 C92,186 100,175 110,169 C120,175 128,186 128,206 Z" />
              <rect x="108" y="160" width="3" height="10" />
              <path d="M272,206 C272,186 280,175 290,169 C300,175 308,186 308,206 Z" />
              <rect x="288" y="160" width="3" height="10" />
              <path d="M28,206 L28,190 L40,190 L40,206 Z M360,206 L360,190 L372,190 L372,206 Z" />
            </g>
            <g fill="#8f3a5a">
              <path d="M150,206 q10,-22 20,0 Z" />
              <path d="M230,206 q10,-22 20,0 Z" />
            </g>
          </svg>
        </>
      );
    case "banff":
      return (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#dcefe6 0%,#a3d0bd 42%,#4f9d86 84%)" }} />
          <div className="absolute left-[22%] top-[16%] h-12 w-12 rounded-full opacity-90" style={{ background: "radial-gradient(circle at 45% 42%,#fbfdee,#e7f2d8 76%)", boxShadow: "0 0 30px 6px rgba(240,248,220,0.5)" }} />
          <svg viewBox="0 0 400 260" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0,152 L84,96 L152,152 L224,90 L302,152 L400,110 L400,210 L0,210 Z" fill="#3f6f63" />
            <g fill="#eef6f2">
              <path d="M224,90 L206,110 L242,110 Z" />
              <path d="M84,96 L70,114 L100,114 Z" />
              <path d="M400,110 L384,126 L400,126 Z" />
            </g>
            <g fill="#234b3b">
              <path d="M40,196 L52,168 L64,196 Z" />
              <path d="M78,198 L92,164 L106,198 Z" />
              <path d="M120,196 L132,170 L144,196 Z" />
              <path d="M262,198 L276,166 L290,198 Z" />
              <path d="M306,196 L318,170 L330,196 Z" />
              <path d="M348,198 L362,164 L376,198 Z" />
            </g>
            <path d="M0,196 L400,196 L400,260 L0,260 Z" fill="#2f7d69" />
            <g stroke="#5aa992" strokeWidth="2" opacity="0.5">
              <line x1="30" y1="222" x2="150" y2="222" />
              <line x1="220" y1="234" x2="360" y2="234" />
            </g>
          </svg>
        </>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function TravelBookingTemplate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"hotels" | "flights" | "journeys">("hotels");
  const [where, setWhere] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [checkIn, setCheckIn] = useState("2026-05-14");
  const [checkOut, setCheckOut] = useState("2026-05-21");
  const [guests, setGuests] = useState(2);
  const [month, setMonth] = useState("May");
  const [saved, setSaved] = useState<number[]>([]);
  const [activeDay, setActiveDay] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const cta = TAB_CTA[activeTab];
  const CtaIcon = cta.icon;

  const toggleSave = (i: number) =>
    setSaved((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const fieldBox =
    "flex items-center gap-2.5 rounded-none border border-[#2A2018]/15 bg-[#FBF8F1] px-3.5 py-3 transition-colors focus-within:border-[#C2571B]";
  const fieldInput = "w-full bg-transparent text-sm text-[#2A2018] outline-none placeholder:text-[#A89A85]";

  return (
    <div className={`${sans.className} min-h-screen bg-[#F6F1E7] text-[#2A2018] antialiased selection:bg-[#C2571B] selection:text-[#F6F1E7]`}>
      <TemplateBackButton variant="warm" />

      <style>{`
        @keyframes wf-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        @keyframes wf-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes wf-float-x { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, -6px); } }
        @keyframes wf-drift { 0%, 100% { transform: translateX(0) rotate(-8deg); } 50% { transform: translateX(24px) rotate(-8deg); } }
        @keyframes wf-drift-slow { 0%, 100% { transform: translateX(0) rotate(6deg); } 50% { transform: translateX(-20px) rotate(6deg); } }
        @keyframes wf-twinkle { 0%, 100% { opacity: 0.9; } 50% { opacity: 0.2; } }
        @keyframes wf-flow { to { stroke-dashoffset: -240; } }
        @keyframes wf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .wf-rise { opacity: 0; animation: wf-rise 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .wf-float { animation: wf-float 7s ease-in-out infinite; }
        .wf-drift { animation: wf-drift 12s ease-in-out infinite; }
        .wf-drift-slow { animation: wf-drift-slow 16s ease-in-out infinite; }
        .wf-twinkle circle { animation: wf-twinkle 4s ease-in-out infinite; }
        .wf-twinkle circle:nth-child(2) { animation-delay: 0.8s; }
        .wf-twinkle circle:nth-child(3) { animation-delay: 1.6s; }
        .wf-twinkle circle:nth-child(4) { animation-delay: 2.4s; }
        .wf-twinkle circle:nth-child(5) { animation-delay: 3.2s; }
        .wf-flow { stroke-dasharray: 4 8; animation: wf-flow 6s linear infinite; }
        .wf-marquee { animation: wf-marquee 32s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .wf-rise, .wf-float, .wf-drift, .wf-drift-slow, .wf-marquee { animation: none; opacity: 1; transform: none; }
          .wf-twinkle circle, .wf-flow { animation: none; }
        }
      `}</style>

      {/* Paper atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(42,32,24,0.05) 1px, transparent 1px), radial-gradient(ellipse 80% 50% at 50% 0%, rgba(194,87,27,0.06), transparent 70%)",
          backgroundSize: "26px 26px, 100% 100%",
        }}
      />

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#2A2018]/10 bg-[#F6F1E7]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-[#C2571B] text-[#C2571B]">
              <Compass className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <span className={`${display.className} text-xl tracking-tight`}>Wayfare</span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="text-sm text-[#6F6151] transition-colors hover:text-[#2A2018]">
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a href="#" className="text-sm text-[#6F6151] transition-colors hover:text-[#2A2018]">
              Sign in
            </a>
            <a
              href="#stays"
              className="group inline-flex items-center gap-1.5 bg-[#C2571B] px-4 py-2 text-sm font-medium text-[#F6F1E7] transition-colors hover:bg-[#9E4413]"
            >
              Plan a trip
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="md:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-[#2A2018]/10 px-5 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="block py-2.5 text-sm text-[#6F6151]">
                {link}
              </a>
            ))}
            <a href="#stays" className="mt-3 block bg-[#C2571B] px-4 py-2.5 text-center text-sm font-medium text-[#F6F1E7]">
              Plan a trip
            </a>
          </nav>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-14 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pb-24 md:pt-20">
          <div>
            <p className={`${mono.className} wf-rise mb-6 flex items-center gap-2.5 text-[11px] tracking-[0.2em] text-[#C2571B]`}>
              <span className="inline-block h-px w-8 bg-[#C2571B]" />
              THE JOURNAL OF ELSEWHERE · ISSUE 14
            </p>
            <h1 className={`${display.className} wf-rise text-[3rem] leading-[0.98] md:text-[4.6rem]`} style={{ animationDelay: "80ms" }}>
              Go far. Stay a while.
              <br />
              <em className="text-[#C2571B]">Come back changed.</em>
            </h1>
            <p className="wf-rise mt-7 max-w-md text-base leading-relaxed text-[#6F6151] md:text-lg" style={{ animationDelay: "160ms" }}>
              {HERO_BODY}
            </p>
            <div className="wf-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2" style={{ animationDelay: "240ms" }}>
              {HERO_TRUST.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 text-sm text-[#6F6151]">
                  <Check className="h-4 w-4 text-[#C2571B]" strokeWidth={2.5} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Hero postcard — CSS scenery */}
          <div className="wf-rise relative" style={{ animationDelay: "200ms" }}>
            <div aria-hidden className="absolute -inset-4 bg-[#C2571B]/10 blur-3xl" />
            <figure className="relative border border-[#2A2018]/15 bg-[#FBF8F1] p-3 shadow-[0_36px_70px_-40px_rgba(42,32,24,0.5)]">
              <div className="relative h-64 overflow-hidden md:h-80">
                <DestinationScene kind="amalfi" />
                <span className={`${mono.className} absolute left-3 top-3 bg-[#2A2018]/70 px-2 py-1 text-[10px] tracking-[0.14em] text-[#F6F1E7]`}>
                  40.63 N / 14.60 E
                </span>
              </div>
              <figcaption className="flex items-end justify-between px-1 pb-1 pt-3">
                <div>
                  <p className={`${display.className} text-xl`}>Amalfi Coast</p>
                  <p className="text-xs text-[#8A7A64]">Villa Lucia · Italy</p>
                </div>
                <div className="text-right">
                  <p className={`${mono.className} text-lg text-[#C2571B]`}>$395</p>
                  <p className="text-[10px] uppercase tracking-wide text-[#A89A85]">per night</p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Search panel */}
        <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
          <div id="stays" className="wf-rise border border-[#2A2018]/15 bg-[#F1E8D6] p-4 shadow-[0_24px_48px_-32px_rgba(42,32,24,0.45)] md:p-5" style={{ animationDelay: "300ms" }}>
            <div className="mb-4 flex flex-wrap gap-1">
              {(["hotels", "flights", "journeys"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`${mono.className} px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    activeTab === tab ? "bg-[#2A2018] text-[#F6F1E7]" : "text-[#6F6151] hover:text-[#2A2018]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
              {activeTab === "hotels" && (
                <>
                  <label className={`${fieldBox} flex-[1.4]`} aria-label="Destination">
                    <MapPin className="h-4 w-4 shrink-0 text-[#C2571B]" />
                    <input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="Where are you going?" className={fieldInput} />
                  </label>
                  <label className={`${fieldBox} flex-1`} aria-label="Check in">
                    <Calendar className="h-4 w-4 shrink-0 text-[#C2571B]" />
                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={fieldInput} />
                  </label>
                  <label className={`${fieldBox} flex-1`} aria-label="Check out">
                    <Calendar className="h-4 w-4 shrink-0 text-[#C2571B]" />
                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={fieldInput} />
                  </label>
                  <label className={`${fieldBox} w-full lg:w-40`} aria-label="Guests">
                    <Users className="h-4 w-4 shrink-0 text-[#C2571B]" />
                    <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={fieldInput}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} guest{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              {activeTab === "flights" && (
                <>
                  <label className={`${fieldBox} flex-1`} aria-label="From">
                    <Plane className="h-4 w-4 shrink-0 -rotate-45 text-[#C2571B]" />
                    <input value={fromCity} onChange={(e) => setFromCity(e.target.value)} placeholder="From" className={fieldInput} />
                  </label>
                  <label className={`${fieldBox} flex-1`} aria-label="To">
                    <MapPin className="h-4 w-4 shrink-0 text-[#C2571B]" />
                    <input value={toCity} onChange={(e) => setToCity(e.target.value)} placeholder="To" className={fieldInput} />
                  </label>
                  <label className={`${fieldBox} flex-1`} aria-label="Depart">
                    <Calendar className="h-4 w-4 shrink-0 text-[#C2571B]" />
                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={fieldInput} />
                  </label>
                  <label className={`${fieldBox} flex-1`} aria-label="Return">
                    <Calendar className="h-4 w-4 shrink-0 text-[#C2571B]" />
                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={fieldInput} />
                  </label>
                  <label className={`${fieldBox} w-full lg:w-44`} aria-label="Passengers">
                    <Users className="h-4 w-4 shrink-0 text-[#C2571B]" />
                    <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={fieldInput}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} passenger{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              {activeTab === "journeys" && (
                <>
                  <label className={`${fieldBox} flex-[1.6]`} aria-label="Journey theme">
                    <Compass className="h-4 w-4 shrink-0 text-[#C2571B]" />
                    <input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="A place or an idea -- walking, wine, the north" className={fieldInput} />
                  </label>
                  <label className={`${fieldBox} w-full lg:w-48`} aria-label="Month">
                    <Calendar className="h-4 w-4 shrink-0 text-[#C2571B]" />
                    <select value={month} onChange={(e) => setMonth(e.target.value)} className={fieldInput}>
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={`${fieldBox} w-full lg:w-44`} aria-label="Travellers">
                    <Users className="h-4 w-4 shrink-0 text-[#C2571B]" />
                    <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={fieldInput}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} traveller{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              <button
                type="button"
                className="group inline-flex items-center justify-center gap-2 bg-[#C2571B] px-6 py-3 text-sm font-semibold text-[#F6F1E7] transition-colors hover:bg-[#9E4413]"
              >
                <CtaIcon className="h-4 w-4" />
                {cta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker ──────────────────────────────────────────────── */}
      <section className="relative z-10 mt-16 overflow-hidden border-y border-[#2A2018]/10 py-4">
        <div className="wf-marquee flex w-max items-center gap-10 pr-10">
          {[...TICKER, ...TICKER].map((place, i) => (
            <span key={i} className={`${display.className} flex items-center gap-10 whitespace-nowrap text-lg italic text-[#2A2018]/35`}>
              {place}
              <span className="text-[#C2571B]/50">/</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Featured stays ──────────────────────────────────────── */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${mono.className} mb-4 text-[11px] tracking-[0.2em] text-[#C2571B]`}>01 / WHERE WE ARE SENDING PEOPLE</p>
              <h2 className={`${display.className} max-w-xl text-4xl leading-[1.02] md:text-5xl`}>
                Six places worth the <em className="text-[#C2571B]">airfare.</em>
              </h2>
            </div>
            <a href="#" className={`${mono.className} inline-flex items-center gap-1.5 border-b border-[#2A2018]/30 pb-1 text-xs uppercase tracking-[0.14em] text-[#6F6151] transition-colors hover:border-[#C2571B] hover:text-[#2A2018]`}>
              All destinations
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((dest, i) => {
              const isSaved = saved.includes(i);
              return (
                <article
                  key={dest.place}
                  className="wf-rise group flex flex-col border border-[#2A2018]/12 bg-[#FBF8F1] transition-all hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(42,32,24,0.45)]"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <DestinationScene kind={dest.scene} />
                    <button
                      type="button"
                      onClick={() => toggleSave(i)}
                      aria-label={isSaved ? `Remove ${dest.place} from saved` : `Save ${dest.place}`}
                      aria-pressed={isSaved}
                      className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#F6F1E7]/85 text-[#2A2018] backdrop-blur-sm transition-colors hover:bg-[#F6F1E7]"
                    >
                      <Heart className={`h-4 w-4 ${isSaved ? "fill-[#C2571B] text-[#C2571B]" : ""}`} />
                    </button>
                    <span className={`${mono.className} absolute bottom-3 left-3 bg-[#2A2018]/65 px-2 py-1 text-[10px] tracking-[0.12em] text-[#F6F1E7]`}>
                      {dest.coords}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <div>
                        <h3 className={`${display.className} text-2xl leading-none`}>{dest.place}</h3>
                        <p className="mt-1 text-xs uppercase tracking-wide text-[#A89A85]">{dest.country}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2A2018]">
                        <Star className="h-3.5 w-3.5 fill-[#C2571B] text-[#C2571B]" />
                        {dest.rating}
                      </span>
                    </div>

                    <p className="mb-4 mt-2 text-sm leading-relaxed text-[#6F6151]">{dest.blurb}</p>

                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {dest.tags.map((tag) => (
                        <span key={tag} className="border border-[#2A2018]/12 px-2 py-0.5 text-[11px] text-[#6F6151]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-end justify-between border-t border-[#2A2018]/10 pt-4">
                      <div>
                        <span className={`${mono.className} text-xl text-[#2A2018]`}>${dest.price}</span>
                        <span className="text-sm text-[#8A7A64]"> / night</span>
                        <p className="text-[11px] text-[#A89A85]">{dest.stay} · {dest.reviews} field notes</p>
                      </div>
                      <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-[#C2571B] transition-colors hover:text-[#9E4413]">
                        View
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Routes panel ────────────────────────────────────────── */}
      <section className="relative z-10 border-y border-[#2A2018]/10 bg-[#EFE7D6]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-8 md:py-28">
          <div>
            <p className={`${mono.className} mb-4 text-[11px] tracking-[0.2em] text-[#C2571B]`}>02 / THE NETWORK</p>
            <h2 className={`${display.className} text-4xl leading-[1.02] md:text-5xl`}>
              Every thread runs <em className="text-[#C2571B]">through us.</em>
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-[#6F6151]">
              We hold rates with hundreds of small hotels and every major carrier, then stitch the connections into a single booking. One reference number, from your front door to the far one.
            </p>
            <div className="mt-8 flex gap-8">
              <div>
                <p className={`${mono.className} text-3xl text-[#2A2018]`}>72</p>
                <p className="text-xs text-[#8A7A64]">countries mapped</p>
              </div>
              <div>
                <p className={`${mono.className} text-3xl text-[#2A2018]`}>1,900+</p>
                <p className="text-xs text-[#8A7A64]">stays slept in</p>
              </div>
              <div>
                <p className={`${mono.className} text-3xl text-[#2A2018]`}>1</p>
                <p className="text-xs text-[#8A7A64]">reference number</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden border border-[#2A2018]/15 bg-[#2A2018] p-4">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(246,241,231,0.14) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <span className={`${mono.className} text-[10px] tracking-[0.18em] text-[#F6F1E7]/50`}>LIVE ROUTE MAP</span>
                <span className={`${mono.className} flex items-center gap-1.5 text-[10px] text-[#E08B4C]`}>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E08B4C]" />
                  6 ROUTES OPEN
                </span>
              </div>
              <svg viewBox="0 0 800 340" className="h-full w-full">
                <circle cx={HUB.x} cy={HUB.y} r="70" fill="none" stroke="#F6F1E7" strokeOpacity="0.1" />
                <circle cx={HUB.x} cy={HUB.y} r="120" fill="none" stroke="#F6F1E7" strokeOpacity="0.06" />
                <line x1="40" y1="150" x2="760" y2="150" stroke="#F6F1E7" strokeOpacity="0.08" strokeDasharray="2 8" />
                {ROUTE_CITIES.map((c) => (
                  <path key={c.name} d={c.arc} fill="none" stroke="#E08B4C" strokeWidth="1.5" className="wf-flow" strokeOpacity="0.85" />
                ))}
                {ROUTE_CITIES.map((c) => (
                  <g key={`node-${c.name}`}>
                    <circle cx={c.x} cy={c.y} r="8" fill="#C2571B" fillOpacity="0.2" />
                    <circle cx={c.x} cy={c.y} r="3.5" fill="#E08B4C" />
                    <text x={c.x + 10} y={c.y + 4} className={mono.className} fill="#F6F1E7" fillOpacity="0.7" fontSize="12">
                      {c.name}
                    </text>
                  </g>
                ))}
                <circle cx={HUB.x} cy={HUB.y} r="5" fill="#F6F1E7" />
                <circle cx={HUB.x} cy={HUB.y} r="10" fill="none" stroke="#F6F1E7" strokeOpacity="0.4" />
                <text x={HUB.x + 12} y={HUB.y + 4} className={mono.className} fill="#F6F1E7" fontSize="13">
                  {HUB.name}
                </text>
              </svg>
              <div className="pointer-events-none absolute left-[64%] top-[26%] text-[#F6F1E7]">
                <Plane className="h-5 w-5 rotate-[28deg]" strokeWidth={1.6} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Wayfare ─────────────────────────────────────────── */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className={`${mono.className} mb-4 text-[11px] tracking-[0.2em] text-[#C2571B]`}>03 / WHY WAYFARE</p>
          <h2 className={`${display.className} mb-14 max-w-2xl text-4xl leading-[1.05] md:text-5xl`}>
            A booking house that behaves like a <em className="text-[#C2571B]">friend with a passport.</em>
          </h2>
          <div className="grid gap-px bg-[#2A2018]/10 md:grid-cols-3">
            {WHY.map((item) => (
              <article key={item.label} className="bg-[#F6F1E7] p-8">
                <span className="mb-6 grid h-11 w-11 place-items-center rounded-full border border-[#C2571B]/40 text-[#C2571B]">
                  <item.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className={`${display.className} mb-3 text-2xl`}>{item.label}</h3>
                <p className="text-sm leading-relaxed text-[#6F6151]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey spotlight ───────────────────────────────────── */}
      <section className="relative z-10 border-y border-[#2A2018]/10 bg-[#EFE7D6]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div className="relative">
            <div className="relative h-72 overflow-hidden border border-[#2A2018]/15 md:h-full md:min-h-[26rem]">
              <DestinationScene kind="kyoto" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2A2018]/80 to-transparent p-6">
                <p className={`${mono.className} mb-2 text-[10px] tracking-[0.18em] text-[#F6F1E7]/70`}>{SPOTLIGHT.kicker.toUpperCase()}</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[#F6F1E7]">
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <Clock className="h-4 w-4 text-[#E08B4C]" />
                    {SPOTLIGHT.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <Users className="h-4 w-4 text-[#E08B4C]" />
                    {SPOTLIGHT.group}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <Calendar className="h-4 w-4 text-[#E08B4C]" />
                    {SPOTLIGHT.season}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className={`${display.className} text-4xl leading-[1.03] md:text-5xl`}>{SPOTLIGHT.title}</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#6F6151]">{SPOTLIGHT.lede}</p>

            <div className="mt-8 border-t border-[#2A2018]/12">
              {SPOTLIGHT.days.map((d, i) => {
                const open = activeDay === i;
                return (
                  <div key={d.day} className="border-b border-[#2A2018]/12">
                    <button
                      type="button"
                      onClick={() => setActiveDay(i)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-4 py-4 text-left"
                    >
                      <span className={`${mono.className} w-14 shrink-0 text-xs ${open ? "text-[#C2571B]" : "text-[#A89A85]"}`}>{d.day}</span>
                      <span className={`flex-1 text-base ${open ? "font-semibold text-[#2A2018]" : "text-[#6F6151]"}`}>{d.title}</span>
                      <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-90 text-[#C2571B]" : "text-[#A89A85]"}`} />
                    </button>
                    {open && <p className="pb-5 pl-[4.5rem] pr-4 text-sm leading-relaxed text-[#6F6151]">{d.body}</p>}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#" className="group inline-flex items-center gap-2 bg-[#C2571B] px-6 py-3.5 text-sm font-semibold text-[#F6F1E7] transition-colors hover:bg-[#9E4413]">
                Reserve this journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <p className="text-sm text-[#6F6151]">
                from <span className={`${mono.className} text-lg text-[#2A2018]`}>${SPOTLIGHT.price.toLocaleString()}</span> per person
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className={`${mono.className} mb-12 text-[11px] tracking-[0.2em] text-[#C2571B]`}>04 / FIELD NOTES</p>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex flex-col justify-between border-t-2 border-[#C2571B] pt-6">
                <div>
                  <Quote className="h-6 w-6 text-[#C2571B]/40" />
                  <blockquote className={`${display.className} mt-4 text-xl leading-[1.4] text-[#2A2018]`}>{t.quote}</blockquote>
                </div>
                <figcaption className="mt-7">
                  <p className="text-sm font-semibold text-[#2A2018]">{t.name}</p>
                  <p className={`${mono.className} mt-1 text-[11px] tracking-wide text-[#8A7A64]`}>{t.trip}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────────── */}
      <section className="relative z-10 overflow-hidden border-t border-[#2A2018]/10 bg-[#C2571B] text-[#F6F1E7]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, rgba(246,241,231,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_0.9fr] md:items-center md:px-8 md:py-24">
          <div>
            <p className={`${mono.className} mb-4 flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#F6F1E7]/80`}>
              <Mail className="h-3.5 w-3.5" />
              THE DISPATCH
            </p>
            <h2 className={`${display.className} text-4xl leading-[1.05] md:text-5xl`}>
              One letter a month. One place <em>worth the airfare.</em>
            </h2>
            <p className="mt-4 max-w-md text-[#F6F1E7]/80">
              No listicles, no affiliate noise. A single destination our editors have just returned from, and exactly how to do it well.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div className="flex items-center gap-3 border border-[#F6F1E7]/40 bg-[#F6F1E7]/10 px-5 py-6">
                <BadgeCheck className="h-6 w-6 shrink-0" />
                <p className="text-sm leading-relaxed">{NEWSLETTER_DONE}</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubscribed(true);
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <label className="flex flex-1 items-center gap-2.5 border border-[#F6F1E7]/40 bg-[#F6F1E7]/10 px-4 py-3.5" aria-label="Email address">
                  <Mail className="h-4 w-4 shrink-0 text-[#F6F1E7]/70" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-sm text-[#F6F1E7] outline-none placeholder:text-[#F6F1E7]/50"
                  />
                </label>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 bg-[#2A2018] px-6 py-3.5 text-sm font-semibold text-[#F6F1E7] transition-colors hover:bg-[#1c150e]"
                >
                  Subscribe
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
            <p className="mt-3 text-[11px] text-[#F6F1E7]/60">Around 40,000 travellers read it. Unsubscribe in one click.</p>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="relative z-10 bg-[#2A2018] text-[#F6F1E7]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(4,0.7fr)]">
            <div>
              <a href="#" className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[#E08B4C] text-[#E08B4C]">
                  <Compass className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className={`${display.className} text-xl`}>Wayfare</span>
              </a>
              <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-[#F6F1E7]/50">
                The journal of elsewhere. A booking house run by travel editors, printed on the web since 2019.
              </p>
              <p className={`${mono.className} mt-5 text-[11px] tracking-wide text-[#F6F1E7]/35`}>51.51 N / 0.13 W · LONDON</p>
            </div>
            {FOOTER_COLS.map((col) => (
              <nav key={col.title}>
                <p className={`${mono.className} mb-4 text-[11px] tracking-[0.18em] text-[#F6F1E7]/40`}>{col.title.toUpperCase()}</p>
                {col.links.map((link) => (
                  <a key={link} href="#" className="block py-1.5 text-sm text-[#F6F1E7]/60 transition-colors hover:text-[#F6F1E7]">
                    {link}
                  </a>
                ))}
              </nav>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#F6F1E7]/10 pt-6">
            <p className={`${mono.className} text-[11px] text-[#F6F1E7]/40`}>© 2026 WAYFARE TRAVEL CO. · ISSUE 14</p>
            <p className="text-[11px] text-[#F6F1E7]/40">
              Part of{" "}
              <a href="https://www.stylekit.top/templates" className="text-[#E08B4C] underline-offset-4 transition-colors hover:text-[#F6F1E7] hover:underline">
                StyleKit Templates
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
