"use client";

export const dynamic = "force-static";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bath,
  Bed,
  Bookmark,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ruler,
  Search,
  X,
} from "lucide-react";
import { Archivo, IBM_Plex_Mono, Libre_Caslon_Text } from "next/font/google";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const serif = Libre_Caslon_Text({ subsets: ["latin"], weight: ["400", "700"] });
const serifItalic = Libre_Caslon_Text({ subsets: ["latin"], weight: "400", style: "italic" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type FacadeVariant = "villa" | "gable" | "warehouse" | "courtyard" | "shed" | "colonnade";
type PaletteName = "dawn" | "dusk" | "sand" | "slate" | "clay" | "sage";

interface Palette {
  sky: string;
  wall: string;
  wallShade: string;
  window: string;
  ink: string;
  glow: string;
  ground: string;
}

interface Property {
  name: string;
  region: string;
  neighborhood: string;
  address: string;
  kind: string;
  era: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  caption: string;
  facade: FacadeVariant;
  palette: PaletteName;
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = ["Listings", "Neighborhoods", "Selling", "The Firm"];

const LOCATIONS = ["All areas", "Marin County", "Hudson Valley", "Providence", "East Hampton", "Bend", "Savannah"];
const KINDS = ["All types", "Modernist", "New Build", "Conversion", "Coastal", "Historic"];
const PRICES = ["Any price", "Under $1M", "$1M - $2M", "$2M - $3M", "$3M+"];

const PALETTES: Record<PaletteName, Palette> = {
  dawn: { sky: "#EBE4DB", wall: "#DBD3C6", wallShade: "#C9C0B0", window: "#A7ADAE", ink: "#4A4438", glow: "#C9754E", ground: "#D7CFC1" },
  dusk: { sky: "#CBD3DA", wall: "#AEB7C1", wallShade: "#99A4B0", window: "#5F6E7C", ink: "#2C333C", glow: "#C9754E", ground: "#B4BCC4" },
  sand: { sky: "#EEE4D2", wall: "#E1D3BA", wallShade: "#D0C0A2", window: "#AD9C7E", ink: "#574A34", glow: "#B4552D", ground: "#DDCFB4" },
  slate: { sky: "#DEDED9", wall: "#C6C6C0", wallShade: "#B0B0A9", window: "#83837C", ink: "#3B3B35", glow: "#C9754E", ground: "#CBCBC4" },
  clay: { sky: "#ECE0D5", wall: "#DEC8B6", wallShade: "#CAB29B", window: "#9C8875", ink: "#4E3A2B", glow: "#B4552D", ground: "#DBC7B6" },
  sage: { sky: "#E0E4DA", wall: "#C8CFBE", wallShade: "#B4BCA9", window: "#7E8874", ink: "#3A4133", glow: "#C9754E", ground: "#CFD4C6" },
};

const HERO: Palette = { sky: "#F1EADF", wall: "#DDD3C4", wallShade: "#CFC4B2", window: "#8E9AA1", ink: "#2C2A24", glow: "#C9754E", ground: "#E6D6C1" };

const PROPERTIES: Property[] = [
  {
    name: "The Ridgeline House",
    region: "Marin County",
    neighborhood: "Sausalito Hills",
    address: "44 Overlook Path, Sausalito, CA",
    kind: "Modernist",
    era: "Built 1971 · Restored 2023",
    price: 2150000,
    beds: 4,
    baths: 3,
    sqft: 3120,
    caption: "A hillside modernist brought back to its bones — clerestory light, terrazzo underfoot, and a living room that cantilevers over the eucalyptus.",
    facade: "villa",
    palette: "dusk",
  },
  {
    name: "Slatewood Residence",
    region: "Hudson Valley",
    neighborhood: "Rhinebeck",
    address: "1207 Kingfisher Lane, Rhinebeck, NY",
    kind: "New Build",
    era: "Completed 2022",
    price: 1395000,
    beds: 3,
    baths: 2,
    sqft: 2480,
    caption: "Black-stained cedar under a steep gable, sited to catch the morning field. A wood-burning core, radiant concrete, and glass that opens the whole south wall.",
    facade: "gable",
    palette: "dawn",
  },
  {
    name: "The Foundry Loft",
    region: "Providence",
    neighborhood: "Jewelry District",
    address: "88 Carver Street, Unit 4, Providence, RI",
    kind: "Conversion",
    era: "Brass works, 1908 · Converted 2016",
    price: 845000,
    beds: 2,
    baths: 2,
    sqft: 1760,
    caption: "A former brass-works floor turned open loft. Steel-sash windows, exposed trusses, and twelve-foot ceilings that keep their old factory hush.",
    facade: "warehouse",
    palette: "slate",
  },
  {
    name: "Dune Court",
    region: "East Hampton",
    neighborhood: "Amagansett",
    address: "3 Marram Way, Amagansett, NY",
    kind: "Coastal",
    era: "Completed 2019",
    price: 3480000,
    beds: 5,
    baths: 4,
    sqft: 4050,
    caption: "Two cedar volumes turned inward around a sheltered court, braced against the Atlantic wind. Ipe decks, an outdoor hearth, and dune grass to the sand.",
    facade: "courtyard",
    palette: "sand",
  },
  {
    name: "The Shed House",
    region: "Bend",
    neighborhood: "Old Mill",
    address: "512 Alder Grade, Bend, OR",
    kind: "New Build",
    era: "Completed 2021",
    price: 720000,
    beds: 3,
    baths: 2,
    sqft: 1940,
    caption: "One sweeping mono-pitch roof over an open plan, glazed to the ponderosa. Built for snow load and warmed by a river-rock flue that anchors the room.",
    facade: "shed",
    palette: "sage",
  },
  {
    name: "Colonnade Twelve",
    region: "Savannah",
    neighborhood: "Historic District",
    address: "12 Ashby Row, Savannah, GA",
    kind: "Historic",
    era: "Greek Revival, 1854 · Restored 2020",
    price: 1180000,
    beds: 4,
    baths: 3,
    sqft: 2900,
    caption: "A restored Revival townhouse on a live-oak square. Heart-pine floors, a double parlor, and a columned porch that has watched the district for a century.",
    facade: "colonnade",
    palette: "clay",
  },
];

const NEIGHBORHOODS = [
  { name: "Sausalito Hills", place: "Marin County, CA", count: 18, note: "Hillside modernism above the bay." },
  { name: "Rhinebeck", place: "Hudson Valley, NY", count: 11, note: "Field houses and barn conversions." },
  { name: "Jewelry District", place: "Providence, RI", count: 24, note: "Loft floors in the old brass works." },
  { name: "Old Mill", place: "Bend, OR", count: 9, note: "Timber-frame along the river bend." },
  { name: "Historic District", place: "Savannah, GA", count: 15, note: "Revival townhouses on the squares." },
];

const STEPS = [
  { no: "01", title: "Brief", body: "Tell us how you actually live. We translate light, rooms, and commute into a working shortlist — usually inside a week." },
  { no: "02", title: "Tour", body: "Walk the shortlist with an agent who reads the drawings, not just the listing sheet. We note the bones and the honest compromises." },
  { no: "03", title: "Offer", body: "We price against the block, structure the terms, and go in with the survey already in hand. No guessing, no theatre." },
  { no: "04", title: "Keys", body: "Inspection, closing, and handover are coordinated end to end — so the only thing you carry across the threshold is a box." },
];

const AGENTS = [
  { name: "Marguerite Vance", role: "Principal Broker", area: "West Coast", note: "Two decades placing modernist and mid-century houses across Northern California." },
  { name: "Theo Okonkwo", role: "Partner, Northeast", area: "Northeast", note: "Loft conversions and new-build timber from Providence to the Hudson Valley." },
  { name: "Camille Aldous", role: "Partner, Southeast", area: "Southeast", note: "Historic restorations and coastal courtyards from Savannah to the barrier islands." },
];

const STATS = [
  { value: "$1.2B", label: "in homes placed since the firm opened its doors in 2011" },
  { value: "31", label: "median days from first tour to an accepted offer" },
  { value: "98%", label: "of list price achieved across last year's closings" },
  { value: "4.9", label: "average client rating, out of five, over 600 sales" },
];

const PULL_QUOTE = {
  quote:
    "We came in with a vague idea of something with light and left with a house we cannot picture leaving. HAUS read the plans better than we could, and never once showed us a place that was not right.",
  name: "The Merriweathers",
  detail: "Buyers · The Ridgeline House, Marin County",
};

const FOOTER_COLS = [
  { title: "Buy", links: ["Listings", "Neighborhoods", "New developments", "Private sales"] },
  { title: "Sell", links: ["List with HAUS", "Valuation", "Marketing", "Our process"] },
  { title: "Firm", links: ["About", "Agents", "Careers", "Journal"] },
  { title: "Visit", links: ["Sausalito studio", "By appointment", "Contact", "Press"] },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

function priceMatch(price: number, bracket: string): boolean {
  switch (bracket) {
    case "Under $1M":
      return price < 1000000;
    case "$1M - $2M":
      return price >= 1000000 && price < 2000000;
    case "$2M - $3M":
      return price >= 2000000 && price < 3000000;
    case "$3M+":
      return price >= 3000000;
    default:
      return true;
  }
}

/* ------------------------------------------------------------------ */
/* Architectural elevations — pure inline SVG                          */
/* ------------------------------------------------------------------ */

function WindowGrid({
  x,
  y,
  w,
  h,
  cols,
  rows,
  palette,
  lit,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  cols: number;
  rows: number;
  palette: Palette;
  lit?: string[];
}) {
  const gap = Math.min(6, w / (cols * 3));
  const cw = (w - gap * (cols - 1)) / cols;
  const ch = (h - gap * (rows - 1)) / rows;
  return (
    <g>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const isLit = lit?.includes(`${r}-${c}`) ?? false;
          return (
            <rect
              key={`${r}-${c}`}
              x={x + c * (cw + gap)}
              y={y + r * (ch + gap)}
              width={cw}
              height={ch}
              fill={isLit ? palette.glow : palette.window}
              className={isLit ? "haus-lit" : undefined}
              stroke={palette.ink}
              strokeOpacity={0.22}
              strokeWidth={1}
            />
          );
        }),
      )}
    </g>
  );
}

function Ground({ palette: p }: { palette: Palette }) {
  return (
    <g>
      <rect x="0" y="258" width="400" height="42" fill={p.ground} />
      <line x1="0" y1="258" x2="400" y2="258" stroke={p.ink} strokeOpacity={0.2} strokeWidth={1} />
    </g>
  );
}

function VillaFacade({ palette: p }: { palette: Palette }) {
  return (
    <g>
      <Ground palette={p} />
      <rect x="40" y="150" width="322" height="108" fill={p.wall} />
      <rect x="356" y="154" width="5" height="104" fill={p.wallShade} />
      <rect x="372" y="154" width="5" height="104" fill={p.wallShade} />
      <rect x="150" y="98" width="235" height="56" fill={p.wallShade} />
      <rect x="144" y="92" width="247" height="7" fill={p.ink} opacity={0.85} />
      <WindowGrid x={60} y={172} w={188} h={34} cols={6} rows={1} palette={p} lit={["0-1", "0-2"]} />
      <rect x="286" y="196" width="34" height="62" fill={p.ink} opacity={0.8} />
      <line x1="313" y1="220" x2="313" y2="238" stroke={p.wall} strokeWidth={1.5} />
      <WindowGrid x={168} y={110} w={200} h={32} cols={6} rows={1} palette={p} lit={["0-3", "0-4"]} />
      <line x1="40" y1="150" x2="362" y2="150" stroke={p.ink} strokeOpacity={0.18} strokeWidth={1} />
    </g>
  );
}

function GableFacade({ palette: p }: { palette: Palette }) {
  return (
    <g>
      <Ground palette={p} />
      <rect x="112" y="150" width="176" height="108" fill={p.wall} />
      <polygon points="200,72 100,152 300,152" fill={p.wallShade} />
      <polygon points="200,72 100,152 300,152" fill="none" stroke={p.ink} strokeOpacity={0.28} strokeWidth={1.5} />
      <polygon points="200,72 200,152 300,152" fill={p.ink} opacity={0.06} />
      <rect x="246" y="86" width="16" height="42" fill={p.wallShade} />
      <rect x="243" y="82" width="22" height="6" fill={p.ink} opacity={0.7} />
      <circle cx="200" cy="118" r="11" fill={p.window} stroke={p.ink} strokeOpacity={0.3} strokeWidth={1} />
      <line x1="200" y1="107" x2="200" y2="129" stroke={p.ink} strokeOpacity={0.25} strokeWidth={1} />
      <line x1="189" y1="118" x2="211" y2="118" stroke={p.ink} strokeOpacity={0.25} strokeWidth={1} />
      <WindowGrid x={132} y={166} w={136} h={30} cols={2} rows={1} palette={p} lit={["0-1"]} />
      <WindowGrid x={132} y={206} w={46} h={46} cols={1} rows={1} palette={p} />
      <WindowGrid x={222} y={206} w={46} h={46} cols={1} rows={1} palette={p} lit={["0-0"]} />
      <rect x="186" y="210" width="28" height="48" fill={p.ink} opacity={0.82} />
      <line x1="208" y1="230" x2="208" y2="240" stroke={p.wall} strokeWidth={1.5} />
    </g>
  );
}

function WarehouseFacade({ palette: p }: { palette: Palette }) {
  return (
    <g>
      <Ground palette={p} />
      <rect x="48" y="108" width="304" height="150" fill={p.wall} />
      <rect x="42" y="102" width="316" height="8" fill={p.wallShade} />
      <line x1="48" y1="150" x2="352" y2="150" stroke={p.ink} strokeOpacity={0.14} strokeWidth={1} />
      <WindowGrid x={66} y={122} w={80} h={92} cols={3} rows={5} palette={p} lit={["1-1", "3-2"]} />
      <WindowGrid x={160} y={122} w={80} h={92} cols={3} rows={5} palette={p} lit={["0-0", "2-1"]} />
      <WindowGrid x={254} y={122} w={80} h={92} cols={3} rows={5} palette={p} lit={["4-2"]} />
      <rect x="150" y="214" width="100" height="44" fill={p.wallShade} />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={162 + i * 13} y1="216" x2={162 + i * 13} y2="256" stroke={p.ink} strokeOpacity={0.18} strokeWidth={1} />
      ))}
      <rect x="150" y="214" width="100" height="44" fill="none" stroke={p.ink} strokeOpacity={0.3} strokeWidth={1.5} />
    </g>
  );
}

function CourtyardFacade({ palette: p }: { palette: Palette }) {
  return (
    <g>
      <Ground palette={p} />
      <rect x="40" y="146" width="128" height="112" fill={p.wall} />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1="40" y1={156 + i * 9} x2="168" y2={156 + i * 9} stroke={p.ink} strokeOpacity={0.08} strokeWidth={1} />
      ))}
      <rect x="36" y="140" width="136" height="7" fill={p.wallShade} />
      <rect x="250" y="120" width="120" height="138" fill={p.wallShade} />
      <rect x="246" y="114" width="128" height="7" fill={p.ink} opacity={0.8} />
      <rect x="168" y="196" width="82" height="62" fill={p.wall} />
      <rect x="196" y="212" width="26" height="46" fill={p.ink} opacity={0.8} />
      <line x1="150" y1="196" x2="150" y2="150" stroke={p.ink} strokeOpacity={0.4} strokeWidth={2} />
      <circle cx="150" cy="142" r="15" fill={p.wallShade} opacity={0.7} />
      <WindowGrid x={58} y={162} w={92} h={30} cols={3} rows={1} palette={p} lit={["0-1"]} />
      <WindowGrid x={58} y={206} w={40} h={44} cols={1} rows={1} palette={p} />
      <WindowGrid x={268} y={138} w={84} h={96} cols={2} rows={3} palette={p} lit={["0-1", "2-0"]} />
    </g>
  );
}

function ShedFacade({ palette: p }: { palette: Palette }) {
  return (
    <g>
      <Ground palette={p} />
      <polygon points="70,258 70,150 330,104 330,258" fill={p.wall} />
      <polygon points="66,150 334,104 338,113 70,159" fill={p.ink} opacity={0.82} />
      <WindowGrid x={90} y={168} w={150} h={72} cols={3} rows={2} palette={p} lit={["1-0", "0-2"]} />
      <WindowGrid x={274} y={130} w={44} h={104} cols={1} rows={4} palette={p} lit={["1-0"]} />
      <line x1="256" y1="120" x2="256" y2="258" stroke={p.ink} strokeOpacity={0.15} strokeWidth={1} />
      <rect x="240" y="212" width="16" height="46" fill={p.ink} opacity={0.7} />
    </g>
  );
}

function ColonnadeFacade({ palette: p }: { palette: Palette }) {
  const columns = [78, 128, 178, 228, 278];
  return (
    <g>
      <Ground palette={p} />
      <rect x="70" y="150" width="260" height="100" fill={p.window} opacity={0.55} />
      <rect x="70" y="140" width="260" height="10" fill={p.wallShade} />
      <rect x="184" y="196" width="32" height="54" fill={p.ink} opacity={0.8} />
      {columns.map((cx) => (
        <g key={cx}>
          <rect x={cx} y="150" width="14" height="100" fill={p.wall} />
          <rect x={cx - 2} y="148" width="18" height="5" fill={p.wallShade} />
          <rect x={cx - 2} y="250" width="18" height="5" fill={p.wallShade} />
          <line x1={cx + 7} y1="153" x2={cx + 7} y2="248" stroke={p.ink} strokeOpacity={0.12} strokeWidth={1} />
        </g>
      ))}
      <rect x="58" y="132" width="284" height="12" fill={p.wallShade} />
      <line x1="58" y1="132" x2="342" y2="132" stroke={p.ink} strokeOpacity={0.25} strokeWidth={1} />
      <polygon points="52,132 200,90 348,132" fill={p.wall} />
      <polygon points="52,132 200,90 348,132" fill="none" stroke={p.ink} strokeOpacity={0.25} strokeWidth={1.5} />
      <rect x="66" y="250" width="268" height="5" fill={p.wallShade} />
      <rect x="74" y="255" width="252" height="5" fill={p.ink} opacity={0.12} />
    </g>
  );
}

function Facade({ variant, palette }: { variant: FacadeVariant; palette: Palette }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Architectural elevation drawing"
    >
      <rect x="0" y="0" width="400" height="300" fill={palette.sky} />
      {variant === "villa" && <VillaFacade palette={palette} />}
      {variant === "gable" && <GableFacade palette={palette} />}
      {variant === "warehouse" && <WarehouseFacade palette={palette} />}
      {variant === "courtyard" && <CourtyardFacade palette={palette} />}
      {variant === "shed" && <ShedFacade palette={palette} />}
      {variant === "colonnade" && <ColonnadeFacade palette={palette} />}
    </svg>
  );
}

function HeroIllustration() {
  const p = HERO;
  return (
    <svg
      viewBox="0 0 600 470"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A modernist house at dusk, drawn as an architectural elevation"
    >
      <defs>
        <linearGradient id="hausSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3ECE1" />
          <stop offset="0.68" stopColor="#EFE1CF" />
          <stop offset="1" stopColor="#E9D4BC" />
        </linearGradient>
        <filter id="hausGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <rect x="0" y="0" width="600" height="470" fill="url(#hausSky)" />
      <circle cx="452" cy="250" r="70" fill="#C9754E" opacity={0.28} filter="url(#hausGlow)" />
      <circle cx="452" cy="250" r="46" fill="#C9754E" className="haus-sun" />
      <rect x="70" y="92" width="150" height="14" rx="7" fill="#FBF3E7" opacity={0.7} className="haus-drift" />
      <rect x="122" y="120" width="90" height="10" rx="5" fill="#FBF3E7" opacity={0.5} className="haus-drift" />
      <rect x="20" y="300" width="90" height="60" fill={p.wallShade} opacity={0.4} />
      <polygon points="20,300 65,276 110,300" fill={p.wallShade} opacity={0.4} />
      <rect x="0" y="360" width="600" height="110" fill={p.ground} />
      <line x1="0" y1="360" x2="600" y2="360" stroke={p.ink} strokeOpacity={0.18} strokeWidth={1} />
      <ellipse cx="300" cy="368" rx="230" ry="10" fill={p.ink} opacity={0.08} />
      <rect x="70" y="250" width="360" height="110" fill={p.wall} />
      <rect x="200" y="196" width="300" height="56" fill={p.wallShade} />
      <rect x="192" y="189" width="316" height="8" fill={p.ink} opacity={0.85} />
      <rect x="470" y="252" width="6" height="108" fill={p.wallShade} />
      <rect x="486" y="252" width="6" height="108" fill={p.wallShade} />
      <WindowGrid x={92} y={270} w={150} h={74} cols={4} rows={2} palette={p} lit={["0-0", "1-1", "0-3"]} />
      <rect x="300" y="300" width="36" height="60" fill={p.ink} opacity={0.8} />
      <line x1="330" y1="326" x2="330" y2="344" stroke={p.wall} strokeWidth={2} />
      <WindowGrid x={220} y={208} w={262} h={32} cols={9} rows={1} palette={p} lit={["0-2", "0-5", "0-6"]} />
      <line x1="70" y1="250" x2="430" y2="250" stroke={p.ink} strokeOpacity={0.15} strokeWidth={1} />
      <line x1="524" y1="360" x2="524" y2="300" stroke={p.ink} strokeOpacity={0.5} strokeWidth={2} />
      <ellipse cx="524" cy="292" rx="18" ry="24" fill="#9BA487" opacity={0.7} />
      <line x1="556" y1="360" x2="556" y2="316" stroke={p.ink} strokeOpacity={0.45} strokeWidth={2} />
      <ellipse cx="556" cy="310" rx="13" ry="18" fill="#9BA487" opacity={0.6} />
      {Array.from({ length: 7 }).map((_, i) => (
        <path key={i} d={`M ${40 + i * 12} 400 q 4 -18 -2 -34`} fill="none" stroke="#9BA487" strokeOpacity={0.6} strokeWidth={1.5} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Small UI                                                            */
/* ------------------------------------------------------------------ */

function Wordmark({ tone = "ink" }: { tone?: "ink" | "light" }) {
  return (
    <span className={`${archivo.className} text-xl font-extrabold tracking-tight ${tone === "light" ? "text-[#F7F6F3]" : "text-[#1A1712]"}`}>
      HAUS<span className="text-[#B4552D]">.</span>
    </span>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block cursor-pointer">
      <span className={`${mono.className} mb-1.5 block text-[10px] tracking-[0.22em] text-[#1A1712]/45`}>{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent pr-6 text-[15px] font-medium text-[#1A1712] outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1A1712]/40" />
      </div>
    </label>
  );
}

function PropertyCard({
  property,
  index,
  saved,
  onToggle,
}: {
  property: Property;
  index: number;
  saved: boolean;
  onToggle: () => void;
}) {
  const pal = PALETTES[property.palette];
  return (
    <article
      className="haus-rise group flex flex-col border border-[#1A1712]/12 bg-[#FBFAF7] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1A1712]/35"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative overflow-hidden" style={{ backgroundColor: pal.sky }}>
        <div className="aspect-[4/3] w-full">
          <Facade variant={property.facade} palette={pal} />
        </div>
        <span className={`${mono.className} absolute left-3 top-3 text-[10px] tracking-[0.18em]`} style={{ color: pal.ink }}>
          {property.kind.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-label={saved ? "Remove from saved homes" : "Save this home"}
          aria-pressed={saved}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border transition-colors"
          style={{
            borderColor: saved ? "#B4552D" : `${pal.ink}44`,
            backgroundColor: saved ? "#B4552D" : "rgba(247,246,243,0.65)",
          }}
        >
          <Bookmark className="h-4 w-4" style={{ color: saved ? "#F7F6F3" : pal.ink }} fill={saved ? "#F7F6F3" : "none"} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[17px] font-semibold leading-snug text-[#1A1712]">{property.name}</h3>
          <span className={`${mono.className} shrink-0 text-[15px] text-[#B4552D]`}>{usd(property.price)}</span>
        </div>
        <p className={`${mono.className} mt-1.5 flex items-center gap-1.5 text-[11px] text-[#1A1712]/50`}>
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{property.address}</span>
        </p>
        <p className={`${serifItalic.className} mt-4 text-[15px] leading-relaxed text-[#1A1712]/70`}>{property.caption}</p>
        <div className="mt-auto pt-5">
          <div className={`${mono.className} flex items-center gap-4 border-t border-[#1A1712]/12 pt-4 text-[12px] text-[#1A1712]/70`}>
            <span className="flex items-center gap-1.5">
              <Bed className="h-3.5 w-3.5" />
              {property.beds} bd
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-3.5 w-3.5" />
              {property.baths} ba
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="h-3.5 w-3.5" />
              {property.sqft.toLocaleString("en-US")} sqft
            </span>
          </div>
          <p className={`${mono.className} mt-3 text-[10px] tracking-[0.14em] text-[#1A1712]/40`}>{property.era.toUpperCase()}</p>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function RealEstateTemplate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("All areas");
  const [homeType, setHomeType] = useState("All types");
  const [price, setPrice] = useState("Any price");
  const [saved, setSaved] = useState<string[]>(["The Ridgeline House"]);

  const toggleSave = (name: string) =>
    setSaved((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  const filtered = PROPERTIES.filter(
    (p) =>
      (location === "All areas" || p.region === location) &&
      (homeType === "All types" || p.kind === homeType) &&
      priceMatch(p.price, price),
  );

  const activeFilters: { label: string; clear: () => void }[] = [];
  if (location !== "All areas") activeFilters.push({ label: location, clear: () => setLocation("All areas") });
  if (homeType !== "All types") activeFilters.push({ label: homeType, clear: () => setHomeType("All types") });
  if (price !== "Any price") activeFilters.push({ label: price, clear: () => setPrice("Any price") });

  const clearAll = () => {
    setLocation("All areas");
    setHomeType("All types");
    setPrice("Any price");
  };

  return (
    <div
      className={`${archivo.className} min-h-screen bg-[#F7F6F3] text-[#1A1712] antialiased selection:bg-[#B4552D] selection:text-[#F7F6F3]`}
    >
      <TemplateBackButton variant="minimalist" />
      <style>{`
        @keyframes haus-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes haus-lit { 0%, 100% { opacity: 1; } 50% { opacity: 0.72; } }
        @keyframes haus-sun { 0%, 100% { opacity: 1; } 50% { opacity: 0.72; } }
        @keyframes haus-drift { from { transform: translateX(-8px); } to { transform: translateX(8px); } }
        .haus-rise { opacity: 0; animation: haus-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .haus-lit { animation: haus-lit 4s ease-in-out infinite; }
        .haus-sun { animation: haus-sun 6s ease-in-out infinite; }
        .haus-drift { animation: haus-drift 14s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .haus-rise, .haus-lit, .haus-sun, .haus-drift { animation: none; opacity: 1; }
        }
      `}</style>

      {/* Drafting-paper grid atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(#1A1712 1px, transparent 1px), linear-gradient(90deg, #1A1712 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          opacity: 0.03,
          maskImage: "radial-gradient(ellipse 100% 70% at 50% 0%, black 40%, transparent 82%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 70% at 50% 0%, black 40%, transparent 82%)",
        }}
      />

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#1A1712]/12 bg-[#F7F6F3]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#" className="flex items-center">
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className={`${archivo.className} text-[11px] uppercase tracking-[0.18em] text-[#1A1712]/60 transition-colors hover:text-[#1A1712]`}
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a href="#" className={`${mono.className} text-[13px] text-[#1A1712]/70 transition-colors hover:text-[#1A1712]`}>
              (415) 555-0170
            </a>
            <a
              href="#listings"
              className="bg-[#B4552D] px-4 py-2 text-sm font-semibold text-[#F7F6F3] transition-colors hover:bg-[#9C4423]"
            >
              Book a tour
            </a>
          </div>

          <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="md:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-[#1A1712]/12 px-5 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className={`${archivo.className} block py-2.5 text-[13px] uppercase tracking-[0.16em] text-[#1A1712]/70`}>
                {link}
              </a>
            ))}
            <a
              href="#listings"
              onClick={() => setMenuOpen(false)}
              className="mt-3 block bg-[#B4552D] px-4 py-2.5 text-center text-sm font-semibold text-[#F7F6F3]"
            >
              Book a tour
            </a>
          </nav>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.02fr_0.98fr] md:items-center md:gap-16 md:px-8 md:pb-24 md:pt-20">
          <div>
            <p className={`${mono.className} haus-rise mb-6 flex items-center gap-2.5 text-[11px] tracking-[0.24em] text-[#B4552D]`}>
              <span className="inline-block h-2 w-2 bg-[#B4552D]" />
              ARCHITECTURAL BROKERAGE — SINCE 2011
            </p>
            <h1
              className={`${archivo.className} haus-rise text-[2.7rem] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-[#1A1712] md:text-[4.1rem]`}
              style={{ animationDelay: "80ms" }}
            >
              Houses with
              <br />
              <span className={`${serifItalic.className} font-normal normal-case text-[#B4552D]`}>good bones,</span>
              <br />
              sold plainly.
            </h1>
            <p
              className="haus-rise mt-7 max-w-md text-base leading-relaxed text-[#1A1712]/65 md:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              HAUS is an architectural brokerage for modern homes — modernist landmarks, warehouse conversions, and
              newly drawn houses. We only list places worth the walk-through.
            </p>

            <div
              className="haus-rise mt-9 border border-[#1A1712]/15 bg-[#FBFAF7]"
              style={{ animationDelay: "240ms" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto]">
                <div className="px-4 py-3">
                  <SelectField label="LOCATION" value={location} options={LOCATIONS} onChange={setLocation} />
                </div>
                <div className="border-t border-[#1A1712]/12 px-4 py-3 sm:border-l sm:border-t-0">
                  <SelectField label="TYPE" value={homeType} options={KINDS} onChange={setHomeType} />
                </div>
                <div className="border-t border-[#1A1712]/12 px-4 py-3 sm:border-l sm:border-t-0">
                  <SelectField label="PRICE" value={price} options={PRICES} onChange={setPrice} />
                </div>
                <a
                  href="#listings"
                  className="flex items-center justify-center gap-2 bg-[#B4552D] px-6 py-4 text-sm font-semibold text-[#F7F6F3] transition-colors hover:bg-[#9C4423]"
                >
                  <Search className="h-4 w-4" />
                  Search homes
                </a>
              </div>
            </div>

            <p className={`${mono.className} haus-rise mt-7 text-[11px] tracking-[0.16em] text-[#1A1712]/40`} style={{ animationDelay: "320ms" }}>
              410 HOMES PLACED · MARIN TO SAVANNAH · BY APPOINTMENT
            </p>
          </div>

          {/* Hero architectural illustration */}
          <div className="haus-rise" style={{ animationDelay: "200ms" }}>
            <div className="border border-[#1A1712]/12 bg-[#F1EADF]">
              <div className="w-full" style={{ aspectRatio: "600 / 470" }}>
                <HeroIllustration />
              </div>
              <div className="flex items-center justify-between border-t border-[#1A1712]/12 px-4 py-3">
                <span className={`${mono.className} text-[10px] tracking-[0.24em] text-[#1A1712]/45`}>HAUS NO. 01</span>
                <span className={`${serifItalic.className} text-sm text-[#1A1712]/70`}>The Ridgeline House, Marin County</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Listings ────────────────────────────────────────────── */}
      <section id="listings" className="relative z-10 border-t border-[#1A1712]/12">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${mono.className} mb-4 text-[11px] tracking-[0.24em] text-[#B4552D]`}>SELECTED LISTINGS</p>
              <h2 className={`${archivo.className} text-3xl font-semibold leading-[1.05] tracking-[-0.01em] md:text-[2.6rem]`}>
                Currently on the <span className={`${serifItalic.className} font-normal text-[#B4552D]`}>market</span>.
              </h2>
            </div>
            <p className={`${mono.className} text-[13px] text-[#1A1712]/50`}>
              {filtered.length} of {PROPERTIES.length} homes
            </p>
          </div>

          {activeFilters.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <span className={`${mono.className} mr-1 text-[10px] tracking-[0.22em] text-[#1A1712]/40`}>FILTERED BY</span>
              {activeFilters.map((filter) => (
                <button
                  key={filter.label}
                  type="button"
                  onClick={filter.clear}
                  className="flex items-center gap-1.5 border border-[#1A1712]/20 px-3 py-1 text-sm text-[#1A1712]/80 transition-colors hover:border-[#B4552D] hover:text-[#B4552D]"
                >
                  {filter.label}
                  <X className="h-3 w-3" />
                </button>
              ))}
              <button type="button" onClick={clearAll} className={`${mono.className} ml-1 text-[11px] tracking-[0.14em] text-[#B4552D] underline-offset-4 hover:underline`}>
                CLEAR ALL
              </button>
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property, i) => (
                <PropertyCard
                  key={property.name}
                  property={property}
                  index={i}
                  saved={saved.includes(property.name)}
                  onToggle={() => toggleSave(property.name)}
                />
              ))}
            </div>
          ) : (
            <div className="border border-[#1A1712]/15 bg-[#FBFAF7] px-6 py-20 text-center">
              <p className={`${serifItalic.className} text-2xl text-[#1A1712]/70`}>No homes match this search just yet.</p>
              <p className={`${mono.className} mx-auto mt-3 max-w-sm text-[12px] leading-relaxed text-[#1A1712]/45`}>
                Try widening the price or area — new listings post to the studio every Thursday.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-7 inline-flex items-center gap-2 bg-[#B4552D] px-5 py-2.5 text-sm font-semibold text-[#F7F6F3] transition-colors hover:bg-[#9C4423]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Neighborhoods ───────────────────────────────────────── */}
      <section className="relative z-10 border-t border-[#1A1712]/12 bg-[#F2EFE8]">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${mono.className} mb-4 text-[11px] tracking-[0.24em] text-[#B4552D]`}>WHERE WE WORK</p>
              <h2 className={`${archivo.className} text-3xl font-semibold leading-[1.05] tracking-[-0.01em] md:text-[2.6rem]`}>
                Browse by <span className={`${serifItalic.className} font-normal text-[#B4552D]`}>neighborhood</span>.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#1A1712]/55">
              Six markets, one bench of agents who live in them. Every listing is walked before it is written up.
            </p>
          </div>

          <div className="grid gap-px border border-[#1A1712]/12 bg-[#1A1712]/12 sm:grid-cols-2 lg:grid-cols-5">
            {NEIGHBORHOODS.map((n) => (
              <a key={n.name} href="#listings" className="group flex flex-col bg-[#F2EFE8] p-6 transition-colors hover:bg-[#F7F6F3]">
                <div className="flex items-start justify-between">
                  <p className={`${mono.className} text-3xl text-[#1A1712]`}>
                    {n.count}
                    <span className="text-base text-[#1A1712]/40"> homes</span>
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-[#1A1712]/30 transition-colors group-hover:text-[#B4552D]" />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{n.name}</h3>
                <p className={`${mono.className} mt-1 text-[11px] tracking-[0.12em] text-[#1A1712]/45`}>{n.place}</p>
                <p className={`${serifItalic.className} mt-4 text-[15px] leading-relaxed text-[#1A1712]/65`}>{n.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-[#1A1712]/12">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-8 md:py-28">
          <div>
            <p className={`${mono.className} mb-4 text-[11px] tracking-[0.24em] text-[#B4552D]`}>THE PROCESS</p>
            <h2 className={`${archivo.className} text-3xl font-semibold leading-[1.05] tracking-[-0.01em] md:text-[2.6rem]`}>
              How a HAUS <span className={`${serifItalic.className} font-normal text-[#B4552D]`}>purchase</span> goes.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-[#1A1712]/65">
              From first brief to keys in hand, four steps and a single point of contact. No handoffs, no surprises at
              the closing table.
            </p>
            <a href="#listings" className={`${mono.className} mt-8 inline-flex items-center gap-2 border-b border-[#1A1712]/30 pb-1 text-[13px] tracking-[0.12em] text-[#1A1712]/70 transition-colors hover:border-[#B4552D] hover:text-[#B4552D]`}>
              START WITH THE LISTINGS
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="divide-y divide-[#1A1712]/12 border-y border-[#1A1712]/12">
            {STEPS.map((step) => (
              <div key={step.no} className="flex gap-6 py-7">
                <span className={`${mono.className} shrink-0 text-2xl text-[#B4552D]`}>{step.no}</span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#1A1712]/60">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats band ──────────────────────────────────────────── */}
      <section className="relative z-10 bg-[#1A1712] text-[#F7F6F3]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className={`${mono.className} mb-10 text-[11px] tracking-[0.24em] text-[#C9754E]`}>BY THE NUMBERS</p>
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.value} className="border-l border-[#F7F6F3]/15 pl-5 pr-4">
                <p className={`${mono.className} text-4xl tracking-tight text-[#C9754E] md:text-5xl`}>{stat.value}</p>
                <p className="mt-3 text-[13px] leading-snug text-[#F7F6F3]/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agents ──────────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-[#1A1712]/12">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${mono.className} mb-4 text-[11px] tracking-[0.24em] text-[#B4552D]`}>THE AGENTS</p>
              <h2 className={`${archivo.className} text-3xl font-semibold leading-[1.05] tracking-[-0.01em] md:text-[2.6rem]`}>
                People who read the <span className={`${serifItalic.className} font-normal text-[#B4552D]`}>drawings</span>.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#1A1712]/55">
              Small by design. Three partners, each anchored in one region, each with a decade of closings behind them.
            </p>
          </div>

          <div className="grid gap-px border border-[#1A1712]/12 bg-[#1A1712]/12 md:grid-cols-3">
            {AGENTS.map((agent) => (
              <div key={agent.name} className="flex flex-col bg-[#F7F6F3] p-7">
                <div className="flex items-center gap-4">
                  <span className={`${archivo.className} grid h-14 w-14 place-items-center border border-[#1A1712]/20 text-lg font-semibold tracking-tight text-[#1A1712]`}>
                    {initials(agent.name)}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">{agent.name}</h3>
                    <p className={`${mono.className} mt-1 text-[11px] tracking-[0.12em] text-[#1A1712]/50`}>{agent.role}</p>
                  </div>
                </div>
                <p className={`${serifItalic.className} mt-5 text-[15px] leading-relaxed text-[#1A1712]/70`}>{agent.note}</p>
                <div className="mt-auto flex items-center gap-4 pt-6">
                  <span className={`${mono.className} text-[10px] tracking-[0.2em] text-[#1A1712]/40`}>{agent.area.toUpperCase()}</span>
                  <a href="#" aria-label={`Call ${agent.name}`} className="ml-auto text-[#1A1712]/50 transition-colors hover:text-[#B4552D]">
                    <Phone className="h-4 w-4" />
                  </a>
                  <a href="#" aria-label={`Email ${agent.name}`} className="text-[#1A1712]/50 transition-colors hover:text-[#B4552D]">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-[#1A1712]/12 bg-[#F2EFE8]">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center md:px-8 md:py-32">
          <p className={`${serif.className} mb-4 text-5xl leading-none text-[#B4552D]`}>&ldquo;</p>
          <blockquote className={`${serif.className} text-2xl leading-[1.4] text-[#1A1712]/90 md:text-[2rem]`}>
            {PULL_QUOTE.quote}
          </blockquote>
          <figcaption className="mt-8">
            <p className="text-sm font-semibold">{PULL_QUOTE.name}</p>
            <p className={`${mono.className} mt-1.5 text-[11px] tracking-[0.14em] text-[#1A1712]/45`}>{PULL_QUOTE.detail}</p>
          </figcaption>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="relative z-10 bg-[#B4552D] text-[#F7F6F3]">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center md:px-8 md:py-28">
          <p className={`${mono.className} mb-6 text-[11px] tracking-[0.24em] text-[#F7F6F3]/70`}>START THE SEARCH</p>
          <h2 className={`${archivo.className} mx-auto max-w-3xl text-4xl font-extrabold uppercase leading-[0.98] tracking-[-0.02em] md:text-6xl`}>
            Find the house
            <br />
            <span className={`${serifItalic.className} font-normal normal-case`}>that was drawn</span>
            <br />
            for you.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#listings"
              className="group inline-flex items-center gap-2 bg-[#F7F6F3] px-7 py-4 text-sm font-semibold text-[#1A1712] transition-transform hover:-translate-y-0.5"
            >
              Book a private tour
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <span className={`${mono.className} text-[13px] tracking-[0.12em] text-[#F7F6F3]/80`}>(415) 555-0170</span>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="relative z-10 bg-[#17150F] text-[#F7F6F3]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(4,0.7fr)]">
            <div>
              <Wordmark tone="light" />
              <p className="mt-5 max-w-[17rem] text-sm leading-relaxed text-[#F7F6F3]/45">
                An architectural brokerage for modern homes. Modernist, converted, and newly drawn — from Marin County
                to Savannah.
              </p>
            </div>
            {FOOTER_COLS.map((col) => (
              <nav key={col.title}>
                <p className={`${mono.className} mb-4 text-[11px] tracking-[0.2em] text-[#F7F6F3]/35`}>{col.title.toUpperCase()}</p>
                {col.links.map((link) => (
                  <a key={link} href="#" className="block py-1.5 text-sm text-[#F7F6F3]/55 transition-colors hover:text-[#F7F6F3]">
                    {link}
                  </a>
                ))}
              </nav>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#F7F6F3]/10 pt-6">
            <p className={`${mono.className} text-[11px] text-[#F7F6F3]/35`}>&copy; 2026 HAUS PROPERTY, LLC.</p>
            <p className={`${mono.className} text-[11px] tracking-[0.16em] text-[#F7F6F3]/35`}>BY APPOINTMENT · CA DRE #01998271</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
