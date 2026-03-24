"use client";

export const dynamic = "force-static";

import { useState } from "react";
import Link from "next/link";
import {
  Bath,
  Bed,
  Building2,
  Heart,
  Home,
  Mail,
  MapPin,
  Maximize2,
  Phone,
  Search,
  Square,
  Star,
  X,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
const properties = [
  {
    title: "Modern Lakefront Villa",
    address: "1234 Lakeshore Drive, Austin, TX",
    price: 875000,
    beds: 4,
    baths: 3,
    sqft: 2850,
    type: "House",
    rating: 4.8,
    gradient: "bg-gradient-to-br from-sky-400 to-blue-600",
    features: ["Pool", "Garage", "Lake View"],
    description: "Stunning lakefront property with panoramic water views. Open-concept living, chef's kitchen with quartz countertops, and a private dock. Master suite with spa-like bathroom.",
    agent: { name: "Sarah Mitchell", phone: "(512) 555-0142" },
  },
  {
    title: "Downtown Luxury Condo",
    address: "456 Main Street, Unit 2201, Seattle, WA",
    price: 625000,
    beds: 2,
    baths: 2,
    sqft: 1450,
    type: "Condo",
    rating: 4.6,
    gradient: "bg-gradient-to-br from-gray-600 to-gray-800",
    features: ["Doorman", "Gym", "City View"],
    description: "Sleek, contemporary condo in the heart of downtown. Floor-to-ceiling windows, hardwood floors, and premium finishes throughout. Walking distance to restaurants and transit.",
    agent: { name: "James Park", phone: "(206) 555-0198" },
  },
  {
    title: "Charming Suburban Colonial",
    address: "789 Oak Lane, Naperville, IL",
    price: 520000,
    beds: 5,
    baths: 3,
    sqft: 3200,
    type: "House",
    rating: 4.7,
    gradient: "bg-gradient-to-br from-emerald-400 to-green-600",
    features: ["Yard", "Garage", "Basement"],
    description: "Beautiful colonial home on a tree-lined street. Renovated kitchen, hardwood floors, finished basement, and a spacious backyard perfect for entertaining.",
    agent: { name: "Linda Chen", phone: "(630) 555-0175" },
  },
  {
    title: "Beachfront Studio Apartment",
    address: "321 Ocean Blvd, Santa Monica, CA",
    price: 450000,
    beds: 1,
    baths: 1,
    sqft: 680,
    type: "Apartment",
    rating: 4.5,
    gradient: "bg-gradient-to-br from-amber-400 to-orange-500",
    features: ["Beach Access", "Balcony", "Parking"],
    description: "Bright and airy beachfront studio with stunning ocean views. Recently renovated with modern appliances, in-unit laundry, and private balcony. Steps from the sand.",
    agent: { name: "Maria Rodriguez", phone: "(310) 555-0163" },
  },
  {
    title: "Mountain View Townhouse",
    address: "567 Alpine Way, Boulder, CO",
    price: 695000,
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: "Townhouse",
    rating: 4.9,
    gradient: "bg-gradient-to-br from-violet-400 to-purple-600",
    features: ["Mountain View", "Fireplace", "Patio"],
    description: "Gorgeous townhouse with breathtaking mountain views. Vaulted ceilings, stone fireplace, gourmet kitchen, and a private patio with hot tub. Minutes from hiking trails.",
    agent: { name: "David Kim", phone: "(303) 555-0187" },
  },
  {
    title: "Historic Brownstone",
    address: "892 Park Slope Ave, Brooklyn, NY",
    price: 1250000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "House",
    rating: 4.8,
    gradient: "bg-gradient-to-br from-red-700 to-rose-900",
    features: ["Garden", "Original Details", "Roof Deck"],
    description: "Meticulously restored 1890s brownstone retaining original woodwork and stained glass. Modern kitchen, garden-level apartment, and private roof deck with city views.",
    agent: { name: "Rachel Green", phone: "(718) 555-0134" },
  },
];

const propertyTypes = ["All", "House", "Condo", "Apartment", "Townhouse"];
const priceRanges = ["Any Price", "Under $500K", "$500K - $750K", "$750K - $1M", "Over $1M"];
const bedOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Sq Ft"];

type ViewMode = "browse" | "favorites" | "map";

function PropertyCard({
  property: prop,
  index: i,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: {
  property: typeof properties[number];
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${prop.title}, ${prop.address}, $${prop.price.toLocaleString()}`}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className={`aspect-[4/3] ${prop.gradient} flex items-center justify-center relative`}>
        <Building2 className="w-12 h-12 text-white/20" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
          aria-label="Toggle favorite"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-white"}`} />
        </button>
        <span className="absolute top-3 left-3 px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs font-medium">
          {prop.type}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xl font-bold text-emerald-700">
            ${prop.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {prop.rating}
          </div>
        </div>
        <h3 className="font-semibold mb-1 group-hover:text-emerald-600 transition-colors">
          {prop.title}
        </h3>
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{prop.address}</span>
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            {prop.beds} bd
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {prop.baths} ba
          </span>
          <span className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            {prop.sqft.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RealEstateTemplate() {
  const [viewMode, setViewMode] = useState<ViewMode>("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("Any Price");
  const [bedFilter, setBedFilter] = useState("Any");
  const [sortBy, setSortBy] = useState("Newest");
  const [favorites, setFavorites] = useState<string[]>(["Modern Lakefront Villa"]);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [showContact, setShowContact] = useState(false);

  const toggleFavorite = (title: string) => {
    setFavorites((prev) =>
      prev.includes(title) ? prev.filter((f) => f !== title) : [...prev, title]
    );
  };

  const detail = selectedProperty !== null ? properties[selectedProperty] : null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">NestFinder</span>
          </div>
          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {([
              { key: "browse" as ViewMode, label: "Browse" },
              { key: "favorites" as ViewMode, label: `Favorites${favorites.length > 0 ? ` (${favorites.length})` : ""}` },
              { key: "map" as ViewMode, label: "Map View" },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setViewMode(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  viewMode === tab.key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg" aria-label="Favorites">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>
            <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
              List Property
            </button>
          </div>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2.5">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by city, neighborhood, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm outline-none w-full"
              />
            </div>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {priceRanges.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {propertyTypes.map((t) => (
                <option key={t} value={t}>Type: {t}</option>
              ))}
            </select>
            <select
              value={bedFilter}
              onChange={(e) => setBedFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {bedOptions.map((b) => (
                <option key={b} value={b}>Beds: {b}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {sortOptions.map((s) => (
                <option key={s} value={s}>Sort: {s}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {viewMode === "browse" && (
          <>
            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-xl h-48 md:h-64 flex items-center justify-center mb-8">
              <div className="text-center text-gray-400">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Map View</p>
                <p className="text-xs">{properties.length} properties in this area</p>
              </div>
            </div>

            {/* Results */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{properties.length} Properties Found</h2>
            </div>

            {/* Property Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {properties.map((prop, i) => (
                <PropertyCard
                  key={prop.title}
                  property={prop}
                  index={i}
                  isFavorite={favorites.includes(prop.title)}
                  onToggleFavorite={() => toggleFavorite(prop.title)}
                  onSelect={() => setSelectedProperty(i)}
                />
              ))}
            </div>
          </>
        )}

        {viewMode === "favorites" && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Saved Properties</h2>
              <p className="text-sm text-gray-500">
                {favorites.length === 0
                  ? "No saved properties yet. Browse listings and click the heart icon to save."
                  : `${favorites.length} propert${favorites.length === 1 ? "y" : "ies"} saved`}
              </p>
            </div>
            {favorites.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
                <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Your favorites list is empty</p>
                <button
                  onClick={() => setViewMode("browse")}
                  className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Browse Properties
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {properties
                  .filter((p) => favorites.includes(p.title))
                  .map((prop) => {
                    const origIdx = properties.indexOf(prop);
                    return (
                      <PropertyCard
                        key={prop.title}
                        property={prop}
                        index={origIdx}
                        isFavorite={true}
                        onToggleFavorite={() => toggleFavorite(prop.title)}
                        onSelect={() => setSelectedProperty(origIdx)}
                      />
                    );
                  })}
              </div>
            )}
          </>
        )}

        {viewMode === "map" && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold">Map View</h2>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-xl h-[60vh] flex items-center justify-center relative border border-gray-200 mb-8">
              <div className="absolute inset-0 p-8">
                {/* Simulated map pins */}
                {properties.map((prop, i) => {
                  const positions = [
                    { top: "15%", left: "20%" },
                    { top: "30%", left: "65%" },
                    { top: "55%", left: "35%" },
                    { top: "25%", left: "80%" },
                    { top: "70%", left: "55%" },
                    { top: "45%", left: "15%" },
                  ];
                  const pos = positions[i % positions.length];
                  return (
                    <button
                      key={prop.title}
                      onClick={() => setSelectedProperty(i)}
                      className="absolute group"
                      style={{ top: pos.top, left: pos.left }}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Home className="w-4 h-4 text-white" />
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <p className="text-xs font-semibold">{prop.title}</p>
                          <p className="text-xs text-emerald-600 font-bold">${prop.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="text-center text-gray-400 z-0">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p className="text-sm">Interactive Map</p>
                <p className="text-xs">Hover over pins to see property details</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Property Detail Modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`h-56 md:h-72 ${detail.gradient} flex items-center justify-center relative`}>
              <Building2 className="w-16 h-16 text-white/20" />
              <button
                onClick={() => {
                  setSelectedProperty(null);
                  setShowContact(false);
                }}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{detail.title}</h2>
                  <p className="text-gray-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {detail.address}
                  </p>
                </div>
                <span className="text-3xl font-bold text-emerald-700">
                  ${detail.price.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4" />
                  {detail.beds} Bedrooms
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4" />
                  {detail.baths} Bathrooms
                </span>
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4" />
                  {detail.sqft.toLocaleString()} sqft
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {detail.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {detail.features.map((f) => (
                  <span key={f} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
                    {f}
                  </span>
                ))}
              </div>

              {/* Contact Agent */}
              {!showContact ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowContact(true)}
                    className="flex-1 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Contact Agent
                  </button>
                  <button
                    onClick={() => toggleFavorite(detail.title)}
                    className={`px-4 py-3 border rounded-lg transition-colors ${
                      favorites.includes(detail.title)
                        ? "border-red-200 bg-red-50 text-red-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-label="Toggle favorite"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(detail.title) ? "fill-red-500" : ""}`} />
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Contact Agent</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-700 font-bold">
                        {detail.agent.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{detail.agent.name}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {detail.agent.phone}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 bg-white rounded-lg text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-200"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-4 py-2.5 bg-white rounded-lg text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-200"
                    />
                    <textarea
                      placeholder="I'm interested in this property..."
                      rows={3}
                      className="w-full px-4 py-2.5 bg-white rounded-lg text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-200 resize-none"
                    />
                    <button className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            Copyright 2025 NestFinder. Part of{" "}
            <Link href="/templates" className="text-gray-600 hover:text-black transition-colors">
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">About</a>
            <a href="#" className="hover:text-gray-600">Agents</a>
            <a href="#" className="hover:text-gray-600">Terms</a>
          </div>
        </div>
      </footer>
      <TemplateBackButton variant="modern" />
    </div>
  );
}
