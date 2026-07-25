"use client";

export const dynamic = "force-static";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  Leaf,
  Mail,
  Menu,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  X,
} from "lucide-react";
import { Familjen_Grotesk, Space_Mono } from "next/font/google";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const display = Familjen_Grotesk({ subsets: ["latin"] });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"] });

/* ------------------------------------------------------------------ */
/* Palette                                                             */
/* ------------------------------------------------------------------ */

const SAFFRON = "#E8A317";
const INK = "#1B1712";
const SHADOW = "#241f16";

/* ------------------------------------------------------------------ */
/* Types + Content                                                     */
/* ------------------------------------------------------------------ */

type ProductKind =
  | "arcLamp"
  | "tableLamp"
  | "loungeChair"
  | "barStool"
  | "speaker"
  | "turntable"
  | "watch"
  | "carafe";

type Category = "Lighting" | "Seating" | "Audio" | "Objects";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: Category;
  kind: ProductKind;
  price: number;
  material: string;
  rating: number;
  reviews: number;
  color: string;
  badge?: string;
}

const FILTERS: ("All" | Category)[] = ["All", "Lighting", "Seating", "Audio", "Objects"];

const PRODUCTS: Product[] = [
  {
    id: "halo-arc",
    name: "Halo Arc Lamp",
    sku: "MG-L01",
    category: "Lighting",
    kind: "arcLamp",
    price: 340,
    material: "Powder-coated steel, linen shade",
    rating: 4.8,
    reviews: 214,
    color: "#9B8A52",
    badge: "Signature",
  },
  {
    id: "ridge-table",
    name: "Ridge Table Lamp",
    sku: "MG-L04",
    category: "Lighting",
    kind: "tableLamp",
    price: 190,
    material: "Turned ash, cotton shade",
    rating: 4.6,
    reviews: 132,
    color: "#BC7B54",
  },
  {
    id: "perch-lounge",
    name: "Perch Lounge Chair",
    sku: "MG-S02",
    category: "Seating",
    kind: "loungeChair",
    price: 890,
    material: "Solid oak, full-grain leather",
    rating: 4.9,
    reviews: 96,
    color: "#B0674A",
    badge: "Best seller",
  },
  {
    id: "tuck-stool",
    name: "Tuck Bar Stool",
    sku: "MG-S07",
    category: "Seating",
    kind: "barStool",
    price: 240,
    material: "Solid oak, woven cord seat",
    rating: 4.5,
    reviews: 178,
    color: "#7D8B66",
  },
  {
    id: "monolith-speaker",
    name: "Monolith Bookshelf Speaker",
    sku: "MG-A03",
    category: "Audio",
    kind: "speaker",
    price: 520,
    material: "Walnut cabinet, silk dome",
    rating: 4.7,
    reviews: 88,
    color: "#4C4C55",
  },
  {
    id: "revox-turntable",
    name: "Revox Turntable",
    sku: "MG-A08",
    category: "Audio",
    kind: "turntable",
    price: 460,
    material: "Aluminium platter, MDF plinth",
    rating: 4.6,
    reviews: 74,
    color: "#5E7688",
    badge: "New",
  },
  {
    id: "meridian-watch",
    name: "Meridian Field Watch",
    sku: "MG-O05",
    category: "Objects",
    kind: "watch",
    price: 280,
    material: "Brushed steel, calf leather",
    rating: 4.8,
    reviews: 203,
    color: "#414C3C",
  },
  {
    id: "vessel-carafe",
    name: "Vessel Glass Carafe",
    sku: "MG-O11",
    category: "Objects",
    kind: "carafe",
    price: 68,
    material: "Mouth-blown borosilicate",
    rating: 4.4,
    reviews: 156,
    color: "#B98C4A",
    badge: "Last few",
  },
];

const HERO = PRODUCTS[0];
const FEATURED = PRODUCTS[2];

const MATERIALS_MARQUEE = [
  "Solid oak",
  "Mouth-blown glass",
  "Powder-coated steel",
  "Full-grain leather",
  "Turned ash",
  "Brushed steel",
  "Woven cord",
  "Silk-dome drivers",
];

const FEATURED_SPECS: { label: string; value: string }[] = [
  { label: "Dimensions", value: "72 × 78 × 84 cm" },
  { label: "Seat height", value: "38 cm" },
  { label: "Frame", value: "Solid white oak" },
  { label: "Upholstery", value: "Aniline leather" },
  { label: "Weight", value: "14 kg" },
  { label: "Warranty", value: "10 years" },
];

const FEATURED_MATERIALS = ["White oak", "Aniline leather", "Brass fixings", "Wool webbing"];

const STANDARDS: { icon: typeof ShieldCheck; title: string; body: string }[] = [
  {
    icon: ShieldCheck,
    title: "Ten-year warranty",
    body: "Every joint, finish, and driver is covered for a decade. We ship spare parts and repair kits before we ever suggest a replacement.",
  },
  {
    icon: Leaf,
    title: "Honest materials",
    body: "Solid wood, real metal, mouth-blown glass. No veneer, no plastic pretending to be brass. What you see is the whole object.",
  },
  {
    icon: Truck,
    title: "Considered delivery",
    body: "Flat-packed with care, carbon-offset on every route, and complimentary over $150. We collect your old pieces for recycling too.",
  },
];

const TESTIMONIALS: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "The arc lamp is the first thing guests notice and the last thing they forget. Six months in, it still feels like a small daily luxury.",
    name: "Nora Whitfield",
    role: "Interior stylist, London",
  },
  {
    quote:
      "I have bought a lot of so-called design furniture that fell apart in a year. The Perch chair is the one my back and my landlord both approve of.",
    name: "Daniel Osei",
    role: "Architect, Accra",
  },
  {
    quote:
      "Ordered the carafe on a whim and ended up furnishing half my kitchen. This catalog is dangerous in the most well-made way.",
    name: "Maya Lindqvist",
    role: "Home cook, Malmö",
  },
];

const FOOTER_COLS: { title: string; links: string[] }[] = [
  { title: "Shop", links: ["Lighting", "Seating", "Audio", "Objects", "Gift cards"] },
  { title: "Studio", links: ["Our story", "Materials", "Makers", "Journal"] },
  { title: "Support", links: ["Shipping", "Returns", "Care guide", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Warranty"] },
];

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Catalog", href: "#catalog" },
  { label: "Lighting", href: "#catalog" },
  { label: "Seating", href: "#catalog" },
  { label: "Standards", href: "#standards" },
];

function money(value: number): string {
  return "$" + value.toLocaleString("en-US");
}

/* ------------------------------------------------------------------ */
/* Product silhouettes — deliberate CSS/SVG catalog illustrations      */
/* ------------------------------------------------------------------ */

function ProductArt({ kind, color, className = "" }: { kind: ProductKind; color: string; className?: string }) {
  const svg = (children: ReactNode) => (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {children}
    </svg>
  );

  switch (kind) {
    case "arcLamp":
      return svg(
        <>
          <ellipse cx="66" cy="182" rx="30" ry="6" fill={SHADOW} opacity="0.06" />
          <ellipse cx="66" cy="183" rx="20" ry="4" fill={SHADOW} opacity="0.10" />
          <rect x="44" y="166" width="44" height="14" rx="6" fill={color} />
          <rect x="44" y="166" width="44" height="5" rx="4" fill="#ffffff" opacity="0.16" />
          <rect x="60" y="150" width="9" height="18" rx="3" fill={color} />
          <path d="M64 154 C 62 70, 104 40, 152 50" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
          <rect x="147" y="43" width="10" height="9" rx="2" fill={color} />
          <path d="M133 50 a19 15 0 0 0 38 0 z" fill={color} />
          <path d="M133 50 a19 15 0 0 0 38 0" fill="none" stroke="#000000" strokeWidth="1.5" opacity="0.12" />
          <path d="M139 52 a13 11 0 0 0 12 8" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.22" />
        </>,
      );
    case "tableLamp":
      return svg(
        <>
          <ellipse cx="100" cy="182" rx="30" ry="6" fill={SHADOW} opacity="0.06" />
          <ellipse cx="100" cy="183" rx="20" ry="4" fill={SHADOW} opacity="0.10" />
          <ellipse cx="100" cy="176" rx="24" ry="6" fill={color} />
          <ellipse cx="100" cy="174" rx="24" ry="6" fill="#ffffff" opacity="0.12" />
          <rect x="96" y="110" width="8" height="66" rx="3" fill={color} />
          <rect x="100" y="110" width="4" height="66" fill="#000000" opacity="0.12" />
          <path d="M72 110 L128 110 L118 66 Q100 60 82 66 Z" fill={color} />
          <path d="M72 110 L128 110 L124 103 L76 103 Z" fill="#000000" opacity="0.14" />
          <path d="M84 106 L90 70" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.16" />
          <circle cx="100" cy="60" r="4" fill={color} />
        </>,
      );
    case "loungeChair":
      return svg(
        <>
          <ellipse cx="102" cy="182" rx="54" ry="8" fill={SHADOW} opacity="0.07" />
          <ellipse cx="102" cy="183" rx="40" ry="5" fill={SHADOW} opacity="0.10" />
          <line x1="74" y1="128" x2="62" y2="176" stroke={color} strokeWidth="6" strokeLinecap="round" />
          <line x1="132" y1="128" x2="144" y2="176" stroke={color} strokeWidth="6" strokeLinecap="round" />
          <line x1="96" y1="126" x2="88" y2="174" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
          <line x1="126" y1="124" x2="132" y2="172" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
          <rect x="60" y="110" width="84" height="22" rx="10" fill={color} />
          <rect x="60" y="110" width="84" height="9" rx="9" fill="#ffffff" opacity="0.16" />
          <rect x="60" y="126" width="84" height="6" rx="3" fill="#000000" opacity="0.12" />
          <rect x="120" y="54" width="22" height="68" rx="10" fill={color} transform="rotate(13 131 90)" />
          <rect x="120" y="54" width="9" height="68" rx="9" fill="#ffffff" opacity="0.14" transform="rotate(13 131 90)" />
        </>,
      );
    case "barStool":
      return svg(
        <>
          <ellipse cx="100" cy="182" rx="44" ry="7" fill={SHADOW} opacity="0.07" />
          <ellipse cx="100" cy="183" rx="30" ry="4" fill={SHADOW} opacity="0.10" />
          <line x1="86" y1="98" x2="70" y2="176" stroke={color} strokeWidth="6" strokeLinecap="round" />
          <line x1="114" y1="98" x2="130" y2="176" stroke={color} strokeWidth="6" strokeLinecap="round" />
          <line x1="94" y1="96" x2="88" y2="172" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.78" />
          <line x1="108" y1="96" x2="116" y2="172" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.78" />
          <ellipse cx="100" cy="140" rx="30" ry="7" fill="none" stroke={color} strokeWidth="4" opacity="0.85" />
          <ellipse cx="100" cy="99" rx="34" ry="10" fill="#000000" opacity="0.14" />
          <ellipse cx="100" cy="92" rx="34" ry="10" fill={color} />
          <ellipse cx="100" cy="90" rx="34" ry="9" fill="#ffffff" opacity="0.14" />
        </>,
      );
    case "speaker":
      return svg(
        <>
          <ellipse cx="100" cy="182" rx="42" ry="7" fill={SHADOW} opacity="0.07" />
          <ellipse cx="100" cy="183" rx="30" ry="4" fill={SHADOW} opacity="0.10" />
          <rect x="64" y="40" width="72" height="140" rx="8" fill={color} />
          <rect x="64" y="40" width="16" height="140" rx="8" fill="#ffffff" opacity="0.06" />
          <rect x="120" y="40" width="16" height="140" rx="8" fill="#000000" opacity="0.10" />
          <circle cx="100" cy="70" r="10" fill="#000000" opacity="0.18" />
          <circle cx="100" cy="70" r="6" fill={color} />
          <circle cx="100" cy="68" r="6" fill="#ffffff" opacity="0.12" />
          <circle cx="100" cy="132" r="26" fill="#000000" opacity="0.16" />
          <circle cx="100" cy="132" r="20" fill={color} />
          <circle cx="100" cy="132" r="20" fill="#000000" opacity="0.12" />
          <circle cx="100" cy="130" r="6" fill="#000000" opacity="0.28" />
        </>,
      );
    case "turntable":
      return svg(
        <>
          <ellipse cx="100" cy="176" rx="58" ry="8" fill={SHADOW} opacity="0.07" />
          <ellipse cx="100" cy="177" rx="44" ry="5" fill={SHADOW} opacity="0.10" />
          <rect x="42" y="120" width="116" height="40" rx="8" fill={color} />
          <rect x="42" y="120" width="116" height="10" rx="8" fill="#ffffff" opacity="0.10" />
          <rect x="42" y="150" width="116" height="10" rx="8" fill="#000000" opacity="0.12" />
          <rect x="52" y="160" width="12" height="6" rx="2" fill="#000000" opacity="0.30" />
          <rect x="136" y="160" width="12" height="6" rx="2" fill="#000000" opacity="0.30" />
          <ellipse cx="88" cy="118" rx="40" ry="13" fill="#000000" opacity="0.18" />
          <ellipse cx="88" cy="114" rx="40" ry="13" fill={color} />
          <ellipse cx="88" cy="114" rx="40" ry="13" fill="#000000" opacity="0.16" />
          <ellipse cx="88" cy="114" rx="26" ry="8" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.14" />
          <ellipse cx="88" cy="114" rx="9" ry="3" fill={SAFFRON} />
          <circle cx="140" cy="112" r="5" fill="#000000" opacity="0.32" />
          <line x1="140" y1="112" x2="104" y2="112" stroke="#000000" strokeWidth="3" strokeLinecap="round" opacity="0.42" />
          <rect x="99" y="109" width="8" height="7" rx="2" fill="#000000" opacity="0.45" transform="rotate(20 103 113)" />
        </>,
      );
    case "watch":
      return svg(
        <>
          <ellipse cx="100" cy="180" rx="30" ry="6" fill={SHADOW} opacity="0.07" />
          <path d="M86 66 L114 66 L110 26 Q100 22 90 26 Z" fill={color} />
          <path d="M86 134 L114 134 L110 176 Q100 180 90 176 Z" fill={color} />
          <line x1="92" y1="34" x2="92" y2="60" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" opacity="0.28" />
          <line x1="108" y1="34" x2="108" y2="60" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" opacity="0.28" />
          <line x1="92" y1="142" x2="92" y2="168" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" opacity="0.28" />
          <line x1="108" y1="142" x2="108" y2="168" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" opacity="0.28" />
          <circle cx="100" cy="100" r="36" fill="#000000" opacity="0.14" />
          <rect x="133" y="94" width="9" height="12" rx="2" fill={color} />
          <circle cx="100" cy="100" r="34" fill={color} />
          <circle cx="100" cy="100" r="27" fill="#F4EFE3" />
          <circle cx="100" cy="100" r="27" fill="none" stroke="#000000" strokeWidth="1" opacity="0.12" />
          <rect x="99" y="76" width="2" height="6" rx="1" fill="#2A261E" opacity="0.55" />
          <rect x="99" y="118" width="2" height="6" rx="1" fill="#2A261E" opacity="0.55" />
          <rect x="76" y="99" width="6" height="2" rx="1" fill="#2A261E" opacity="0.55" />
          <rect x="118" y="99" width="6" height="2" rx="1" fill="#2A261E" opacity="0.55" />
          <line x1="100" y1="100" x2="100" y2="84" stroke="#2A261E" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="100" x2="115" y2="106" stroke="#2A261E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="100" y1="100" x2="89" y2="111" stroke={SAFFRON} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="100" cy="100" r="3" fill="#2A261E" />
        </>,
      );
    case "carafe":
      return svg(
        <>
          <ellipse cx="100" cy="180" rx="30" ry="6" fill={SHADOW} opacity="0.07" />
          <path
            d="M78 92 C 74 108, 68 120, 68 140 C 68 164, 82 176, 100 176 C 118 176, 132 164, 132 140 C 132 120, 126 108, 122 92 Z"
            fill={color}
            fillOpacity="0.34"
            stroke={color}
            strokeOpacity="0.55"
            strokeWidth="2"
          />
          <path
            d="M70 140 C 70 164, 83 174, 100 174 C 117 174, 130 164, 130 140 C 130 148, 118 152, 100 152 C 82 152, 70 148, 70 140 Z"
            fill={color}
            fillOpacity="0.58"
          />
          <rect x="90" y="60" width="20" height="34" fill={color} fillOpacity="0.30" stroke={color} strokeOpacity="0.55" strokeWidth="2" />
          <ellipse cx="100" cy="58" rx="15" ry="4" fill={color} fillOpacity="0.30" stroke={color} strokeOpacity="0.55" strokeWidth="1.5" />
          <path d="M84 104 C 80 120, 78 140, 84 158" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
          <path d="M93 100 C 91 118, 91 140, 94 156" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
        </>,
      );
    default:
      return null;
  }
}

function ProductStage({
  kind,
  color,
  className = "",
  artClassName = "w-[74%] max-w-[260px]",
}: {
  kind: ProductKind;
  color: string;
  className?: string;
  artClassName?: string;
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(58% 48% at 50% 46%, rgba(232,163,23,0.20), rgba(232,163,23,0) 66%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] left-1/2 h-px w-3/5 -translate-x-1/2"
        style={{ background: "linear-gradient(90deg, transparent, rgba(27,23,18,0.18), transparent)" }}
      />
      <ProductArt kind={kind} color={color} className={`relative z-10 ${artClassName}`} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const active = i < Math.round(rating);
        return (
          <Star
            key={i}
            className="h-3.5 w-3.5"
            strokeWidth={1.5}
            style={{ fill: active ? SAFFRON : "transparent", color: active ? SAFFRON : "#C9C0AC" }}
          />
        );
      })}
    </span>
  );
}

function Wordmark() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-[7px] bg-[#E8A317]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <circle cx="12" cy="9" r="4.6" fill={INK} />
          <rect x="4" y="16" width="16" height="2.4" rx="1.2" fill={INK} />
        </svg>
      </span>
      <span className={`${mono.className} text-[15px] font-bold tracking-[0.24em] text-[#1B1712]`}>MONO GOODS</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function EcommerceProductTemplate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<"All" | Category>("All");
  const [cart, setCart] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const visible = category === "All" ? PRODUCTS : PRODUCTS.filter((product) => product.category === category);

  const addToCart = (id: string, amount = 1) => {
    setCart((count) => count + amount);
    setAddedId(id);
    window.setTimeout(() => setAddedId((current) => (current === id ? null : current)), 1300);
  };

  const subscribe = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div
      id="top"
      className={`${display.className} min-h-screen bg-[#F5F1E6] text-[#1B1712] antialiased selection:bg-[#E8A317] selection:text-[#1B1712]`}
    >
      <TemplateBackButton variant="minimalist" />

      <style>{`
        @keyframes mg-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes mg-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes mg-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .mg-rise { opacity: 0; animation: mg-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .mg-float { animation: mg-float 6s ease-in-out infinite; }
        .mg-marquee { animation: mg-marquee 34s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .mg-rise { animation: none; opacity: 1; }
          .mg-float { animation: none; }
          .mg-marquee { animation: none; }
        }
      `}</style>

      {/* ── Announcement bar ────────────────────────────────────── */}
      <div className="bg-[#1B1712] text-[#F5F1E6]">
        <div className={`${mono.className} mx-auto flex max-w-6xl items-center justify-center gap-2.5 px-5 py-2 text-center text-[11px] tracking-[0.16em] md:px-8`}>
          <Truck className="h-3.5 w-3.5 text-[#E8A317]" strokeWidth={2} />
          COMPLIMENTARY CARBON-NEUTRAL SHIPPING ON ORDERS OVER $150
        </div>
      </div>

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#E6DFCE] bg-[#F5F1E6]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <Wordmark />

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#6E6656] transition-colors hover:text-[#1B1712]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Search the catalog"
              className="grid h-9 w-9 place-items-center rounded-full text-[#6E6656] transition-colors hover:bg-[#EAE3D2] hover:text-[#1B1712]"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>
            <a
              href="#catalog"
              aria-label={`Cart, ${cart} item${cart === 1 ? "" : "s"}`}
              className="relative grid h-9 w-9 place-items-center rounded-full text-[#1B1712] transition-colors hover:bg-[#EAE3D2]"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {cart > 0 && (
                <span className={`${mono.className} absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#E8A317] px-1 text-[10px] font-bold text-[#1B1712]`}>
                  {cart > 99 ? "99" : cart}
                </span>
              )}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="grid h-9 w-9 place-items-center rounded-full text-[#1B1712] transition-colors hover:bg-[#EAE3D2] md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-[#E6DFCE] px-5 py-3 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm text-[#4A4438]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative border-b border-[#E6DFCE]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:px-8 md:pb-24 md:pt-20">
          <div>
            <p className={`${mono.className} mg-rise mb-6 flex items-center gap-2.5 text-[11px] tracking-[0.22em] text-[#6E6656]`}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E8A317]" />
              MONO GOODS — DESIGN OBJECTS SINCE 2016
            </p>
            <h1 className="mg-rise text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.02em] md:text-[4.1rem]" style={{ animationDelay: "80ms" }}>
              A short catalog of
              <br />
              things <span className="text-[#E8A317]">worth keeping</span>.
            </h1>
            <p className="mg-rise mt-6 max-w-md text-base leading-relaxed text-[#5A5346] md:text-lg" style={{ animationDelay: "160ms" }}>
              Lighting, seating, and tabletop pieces made from honest materials and built to be
              repaired, not replaced. Photographed plainly, priced fairly, shipped anywhere.
            </p>
            <div className="mg-rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "240ms" }}>
              <a
                href="#catalog"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1B1712] px-6 py-3.5 text-sm font-semibold text-[#F5F1E6] transition-transform hover:-translate-y-0.5"
              >
                Browse the catalog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#standards"
                className="inline-flex items-center gap-1.5 border-b border-[#C9C0AC] pb-1 text-sm text-[#5A5346] transition-colors hover:border-[#E8A317] hover:text-[#1B1712]"
              >
                Read our standards
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <p className={`${mono.className} mg-rise mt-8 text-[11px] tracking-[0.14em] text-[#98907E]`} style={{ animationDelay: "320ms" }}>
              FREE SHIPPING OVER $150 · 10-YEAR WARRANTY · 60-DAY RETURNS
            </p>
          </div>

          {/* Hero product staged large */}
          <div className="mg-rise relative" style={{ animationDelay: "180ms" }}>
            <div className="relative mx-auto aspect-square w-full max-w-md rounded-[28px] border border-[#E6DFCE] bg-[#FBF8F0] shadow-[0_40px_80px_-48px_rgba(27,23,18,0.5)]">
              <div className="mg-float h-full w-full">
                <ProductStage kind={HERO.kind} color={HERO.color} className="h-full w-full" artClassName="w-[68%] max-w-[300px]" />
              </div>

              {/* Price tag */}
              <div className="absolute right-5 top-6 rotate-3">
                <div className="rounded-lg border border-[#E6DFCE] bg-[#F5F1E6] px-3.5 py-2 shadow-sm">
                  <p className={`${mono.className} text-[10px] tracking-[0.14em] text-[#98907E]`}>{HERO.sku}</p>
                  <p className={`${mono.className} text-lg font-bold text-[#1B1712]`}>{money(HERO.price)}</p>
                </div>
              </div>

              {/* Spec pill */}
              <div className={`${mono.className} absolute bottom-6 left-6 rounded-full border border-[#E6DFCE] bg-[#F5F1E6]/90 px-3 py-1.5 text-[10px] tracking-[0.12em] text-[#5A5346] backdrop-blur-sm`}>
                DIMMABLE · 3000K · E27
              </div>
            </div>

            {/* Hero add action */}
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-[#E6DFCE] bg-[#FBF8F0] px-5 py-4">
              <div>
                <p className="text-sm font-semibold">{HERO.name}</p>
                <p className="text-xs text-[#7A7266]">{HERO.material}</p>
              </div>
              <button
                type="button"
                onClick={() => addToCart(HERO.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  addedId === HERO.id ? "bg-[#3F6B3A] text-white" : "bg-[#E8A317] text-[#1B1712] hover:bg-[#d0910f]"
                }`}
              >
                {addedId === HERO.id ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {addedId === HERO.id ? "Added" : "Add to bag"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Materials marquee ───────────────────────────────────── */}
      <section className="overflow-hidden border-b border-[#E6DFCE] bg-[#EFE9DA] py-4">
        <div className="mg-marquee flex w-max items-center gap-10 pr-10">
          {[...MATERIALS_MARQUEE, ...MATERIALS_MARQUEE].map((material, i) => (
            <span key={i} className={`${mono.className} flex items-center gap-10 whitespace-nowrap text-xs tracking-[0.18em] text-[#8A8270]`}>
              {material.toUpperCase()}
              <span className="h-1 w-1 rounded-full bg-[#E8A317]" />
            </span>
          ))}
        </div>
      </section>

      {/* ── Catalog: filters + grid ─────────────────────────────── */}
      <section id="catalog" className="border-b border-[#E6DFCE]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${mono.className} mb-4 text-[11px] tracking-[0.22em] text-[#E8A317]`}>THE CATALOG</p>
              <h2 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.01em] md:text-5xl">
                Eight objects, chosen slowly.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#6E6656]">
              We add a piece only when it earns its place. Filter by room, or take the whole
              collection — everything is designed to sit together.
            </p>
          </div>

          {/* Filter chips */}
          <div className="mb-10 flex flex-wrap gap-2.5">
            {FILTERS.map((filter) => {
              const active = category === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setCategory(filter)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-[#1B1712] bg-[#1B1712] text-[#F5F1E6]"
                      : "border-[#E0D9C6] bg-transparent text-[#5A5346] hover:border-[#1B1712]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E6DFCE] bg-[#FBF8F0] transition-shadow hover:shadow-[0_28px_50px_-32px_rgba(27,23,18,0.45)]"
              >
                <div className="relative">
                  <ProductStage
                    kind={product.kind}
                    color={product.color}
                    className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {product.badge && (
                    <span className={`${mono.className} absolute left-4 top-4 rounded-full bg-[#1B1712] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#F5F1E6]`}>
                      {product.badge}
                    </span>
                  )}
                  <span className={`${mono.className} absolute right-4 top-4 text-[10px] tracking-[0.14em] text-[#A79E89]`}>
                    {product.sku}
                  </span>
                </div>

                <div className="flex flex-1 flex-col border-t border-[#EEE7D6] p-5">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="text-[15px] font-semibold leading-tight">{product.name}</h3>
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-[#7A7266]">{product.material}</p>
                  <div className="mb-4 flex items-center gap-2">
                    <Stars rating={product.rating} />
                    <span className={`${mono.className} text-[11px] text-[#98907E]`}>
                      {product.rating} · {product.reviews}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3">
                    <span className={`${mono.className} text-lg font-bold text-[#1B1712]`}>{money(product.price)}</span>
                    <button
                      type="button"
                      onClick={() => addToCart(product.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                        addedId === product.id
                          ? "bg-[#3F6B3A] text-white"
                          : "bg-[#1B1712] text-[#F5F1E6] hover:bg-[#E8A317] hover:text-[#1B1712]"
                      }`}
                      aria-label={`Add ${product.name} to bag`}
                    >
                      {addedId === product.id ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      {addedId === product.id ? "Added" : "Add"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured deep-dive ──────────────────────────────────── */}
      <section id="featured" className="border-b border-[#E6DFCE] bg-[#FBF8F0]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
          {/* Staged product */}
          <div className="relative order-1 aspect-square w-full rounded-[28px] border border-[#E6DFCE] bg-[#F5F1E6]">
            <ProductStage kind={FEATURED.kind} color={FEATURED.color} className="h-full w-full" artClassName="w-[80%] max-w-[380px]" />
            <div className="absolute left-6 top-6">
              <p className={`${mono.className} text-[10px] tracking-[0.18em] text-[#98907E]`}>{FEATURED.sku}</p>
              <p className={`${mono.className} text-[11px] tracking-[0.12em] text-[#5A5346]`}>MADE TO ORDER</p>
            </div>
          </div>

          {/* Detail */}
          <div className="order-2">
            <p className={`${mono.className} mb-4 text-[11px] tracking-[0.22em] text-[#E8A317]`}>FEATURED · SEATING</p>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.01em] md:text-[3.2rem]">{FEATURED.name}</h2>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className={`${mono.className} text-2xl font-bold text-[#1B1712]`}>{money(FEATURED.price)}</span>
              <span className="text-sm text-[#7A7266]">or $75/mo for 12 months</span>
              <span className="flex items-center gap-2">
                <Stars rating={FEATURED.rating} />
                <span className={`${mono.className} text-[11px] text-[#98907E]`}>{FEATURED.reviews} reviews</span>
              </span>
            </div>

            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#5A5346]">
              A low, leaning lounge chair built around a solid oak frame and a single panel of
              full-grain leather that only softens with the years. Every part is designed to be
              re-strung and re-oiled — so it ages into the room instead of out of it.
            </p>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#EAE3D2] pt-6 sm:grid-cols-3">
              {FEATURED_SPECS.map((spec) => (
                <div key={spec.label}>
                  <p className={`${mono.className} text-[10px] uppercase tracking-[0.14em] text-[#98907E]`}>{spec.label}</p>
                  <p className="mt-1 text-sm font-medium text-[#1B1712]">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Materials */}
            <div className="mt-7">
              <p className={`${mono.className} mb-3 text-[10px] uppercase tracking-[0.16em] text-[#98907E]`}>Materials</p>
              <div className="flex flex-wrap gap-2">
                {FEATURED_MATERIALS.map((material) => (
                  <span key={material} className="rounded-full border border-[#E0D9C6] px-3 py-1.5 text-xs text-[#5A5346]">
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {/* Buy row */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-[#E0D9C6] bg-[#F5F1E6]">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="grid h-11 w-11 place-items-center rounded-full text-[#5A5346] transition-colors hover:text-[#1B1712]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className={`${mono.className} w-8 text-center text-sm font-bold`}>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="grid h-11 w-11 place-items-center rounded-full text-[#5A5346] transition-colors hover:text-[#1B1712]"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(FEATURED.id, qty)}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors sm:flex-none ${
                  addedId === FEATURED.id ? "bg-[#3F6B3A] text-white" : "bg-[#1B1712] text-[#F5F1E6] hover:bg-[#E8A317] hover:text-[#1B1712]"
                }`}
              >
                {addedId === FEATURED.id ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                {addedId === FEATURED.id ? "Added to bag" : `Add to bag — ${money(FEATURED.price * qty)}`}
              </button>

              <button
                type="button"
                onClick={() => setLiked(!liked)}
                aria-pressed={liked}
                aria-label="Save to wishlist"
                className={`grid h-12 w-12 place-items-center rounded-full border transition-colors ${
                  liked ? "border-[#E8A317] bg-[#FBEFCF] text-[#C98C10]" : "border-[#E0D9C6] text-[#5A5346] hover:border-[#1B1712]"
                }`}
              >
                <Heart className="h-5 w-5" style={{ fill: liked ? "#E8A317" : "transparent" }} />
              </button>
            </div>

            <p className={`${mono.className} mt-5 text-[11px] tracking-[0.1em] text-[#98907E]`}>
              MADE TO ORDER · SHIPS IN 3–4 WEEKS · FREE WHITE-GLOVE DELIVERY
            </p>
          </div>
        </div>
      </section>

      {/* ── Our standards ───────────────────────────────────────── */}
      <section id="standards" className="bg-[#1B1712] text-[#F5F1E6]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-lg text-4xl font-semibold leading-[1.05] tracking-[-0.01em] md:text-5xl">
              The standards behind every object.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[#B8B0A0]">
              We would rather make fewer things properly. These three promises apply to every piece
              in the catalog, from the $68 carafe to the $890 chair.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl bg-[#3A342A] sm:grid-cols-3">
            {STANDARDS.map((standard) => (
              <div key={standard.title} className="bg-[#1B1712] p-8">
                <span className="mb-6 inline-grid h-11 w-11 place-items-center rounded-full bg-[#E8A317]">
                  <standard.icon className="h-5 w-5 text-[#1B1712]" strokeWidth={2} />
                </span>
                <h3 className="mb-2.5 text-xl font-semibold">{standard.title}</h3>
                <p className="text-sm leading-relaxed text-[#B8B0A0]">{standard.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <section className="border-b border-[#E6DFCE]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className={`${mono.className} mb-12 text-[11px] tracking-[0.22em] text-[#E8A317]`}>FROM THE OWNERS</p>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <figure key={testimonial.name} className="flex flex-col justify-between">
                <div>
                  <Stars rating={5} className="mb-5" />
                  <blockquote className="text-lg leading-[1.4] text-[#2E2A22]">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                </div>
                <figcaption className="mt-7 border-t border-[#E6DFCE] pt-4">
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className={`${mono.className} mt-1 text-[11px] tracking-wide text-[#98907E]`}>{testimonial.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#E6DFCE] bg-[#FBF8F0]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 55% 70% at 50% 120%, rgba(232,163,23,0.16), transparent 62%)" }}
        />
        <div className="relative mx-auto max-w-2xl px-5 py-20 text-center md:px-8 md:py-28">
          <p className={`${mono.className} mb-5 text-[11px] tracking-[0.22em] text-[#E8A317]`}>THE STUDIO LIST</p>
          <h2 className="mx-auto max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.01em] md:text-5xl">
            First look at new objects.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[#5A5346]">
            Restocks, workshop notes, and the occasional half-finished idea. Join and take ten
            percent off your first order — no daily emails, we promise.
          </p>

          {subscribed ? (
            <div className="mx-auto mt-9 flex max-w-md items-center justify-center gap-3 rounded-full border border-[#CDE0C7] bg-[#EBF3E7] px-6 py-4 text-sm font-medium text-[#3F6B3A]">
              <Check className="h-4 w-4" />
              You&apos;re on the list — check your inbox for the code.
            </div>
          ) : (
            <form onSubmit={subscribe} className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98907E]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@studio.com"
                  aria-label="Email address"
                  className="w-full rounded-full border border-[#E0D9C6] bg-[#F5F1E6] py-3.5 pl-11 pr-4 text-sm text-[#1B1712] outline-none transition-colors placeholder:text-[#A79E89] focus:border-[#E8A317]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1B1712] px-6 py-3.5 text-sm font-semibold text-[#F5F1E6] transition-colors hover:bg-[#E8A317] hover:text-[#1B1712]"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
          <p className={`${mono.className} mt-5 text-[10px] tracking-[0.12em] text-[#A79E89]`}>NO SPAM · UNSUBSCRIBE ANYTIME</p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-[#F5F1E6]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,0.7fr)]">
            <div>
              <Wordmark />
              <p className="mt-5 max-w-[17rem] text-sm leading-relaxed text-[#6E6656]">
                A small studio making design objects from honest materials — built to be repaired,
                kept, and handed on.
              </p>
              <p className={`${mono.className} mt-5 text-[11px] tracking-[0.14em] text-[#98907E]`}>COPENHAGEN · SINCE 2016</p>
            </div>
            {FOOTER_COLS.map((col) => (
              <nav key={col.title}>
                <p className={`${mono.className} mb-4 text-[10px] tracking-[0.2em] text-[#98907E]`}>{col.title.toUpperCase()}</p>
                {col.links.map((link) => (
                  <a key={link} href="#" className="block py-1.5 text-sm text-[#5A5346] transition-colors hover:text-[#1B1712]">
                    {link}
                  </a>
                ))}
              </nav>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#E6DFCE] pt-6">
            <p className={`${mono.className} text-[11px] tracking-[0.08em] text-[#98907E]`}>&copy; 2026 MONO GOODS STUDIO</p>
            <div className="flex flex-wrap items-center gap-5">
              <a href="#" className={`${mono.className} text-[11px] tracking-[0.12em] text-[#98907E] transition-colors hover:text-[#1B1712]`}>
                INSTAGRAM
              </a>
              <a href="#" className={`${mono.className} text-[11px] tracking-[0.12em] text-[#98907E] transition-colors hover:text-[#1B1712]`}>
                PINTEREST
              </a>
              <a href="#" className={`${mono.className} text-[11px] tracking-[0.12em] text-[#98907E] transition-colors hover:text-[#1B1712]`}>
                JOURNAL
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
