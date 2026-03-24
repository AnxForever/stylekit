"use client";

export const dynamic = "force-static";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Filter,
  Globe,
  MapPin,
  Plane,
  Search,
  Star,
  Users,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
const destinations = [
  {
    name: "Tokyo, Japan",
    hotel: "The Ritz-Carlton Tokyo",
    price: 328,
    originalPrice: 420,
    rating: 4.9,
    reviews: 1284,
    gradient: "bg-gradient-to-br from-pink-400 to-rose-600",
    amenities: ["Wifi", "Pool", "Spa"],
  },
  {
    name: "Paris, France",
    hotel: "Le Bristol Paris",
    price: 445,
    originalPrice: 560,
    rating: 4.8,
    reviews: 976,
    gradient: "bg-gradient-to-br from-indigo-400 to-blue-600",
    amenities: ["Wifi", "Restaurant", "Gym"],
  },
  {
    name: "Bali, Indonesia",
    hotel: "Four Seasons Jimbaran",
    price: 275,
    originalPrice: 350,
    rating: 4.7,
    reviews: 852,
    gradient: "bg-gradient-to-br from-emerald-400 to-teal-600",
    amenities: ["Wifi", "Pool", "Beach"],
  },
  {
    name: "New York, USA",
    hotel: "The Plaza Hotel",
    price: 389,
    originalPrice: 480,
    rating: 4.6,
    reviews: 2103,
    gradient: "bg-gradient-to-br from-gray-600 to-gray-800",
    amenities: ["Wifi", "Restaurant", "Spa"],
  },
  {
    name: "Santorini, Greece",
    hotel: "Canaves Oia Suites",
    price: 520,
    originalPrice: 650,
    rating: 4.9,
    reviews: 634,
    gradient: "bg-gradient-to-br from-sky-400 to-blue-500",
    amenities: ["Wifi", "Pool", "View"],
  },
  {
    name: "Dubai, UAE",
    hotel: "Burj Al Arab Jumeirah",
    price: 680,
    originalPrice: 850,
    rating: 4.8,
    reviews: 1456,
    gradient: "bg-gradient-to-br from-amber-400 to-orange-600",
    amenities: ["Wifi", "Pool", "Spa"],
  },
];

const flights = [
  { airline: "Japan Airlines", departure: "08:30", arrival: "14:45", duration: "6h 15m", price: 856, stops: "Direct" },
  { airline: "Singapore Airlines", departure: "11:20", arrival: "18:05", duration: "6h 45m", price: 742, stops: "Direct" },
  { airline: "Cathay Pacific", departure: "15:00", arrival: "22:30", duration: "7h 30m", price: 618, stops: "1 stop" },
];

const priceRanges = ["Any", "$0 - $300", "$300 - $500", "$500+"];
const ratings = ["Any", "4.5+", "4.0+", "3.5+"];
const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Rating"];

export default function TravelBookingTemplate() {
  const [searchDest, setSearchDest] = useState("");
  const [checkIn, setCheckIn] = useState("2025-03-15");
  const [checkOut, setCheckOut] = useState("2025-03-20");
  const [guests, setGuests] = useState(2);
  const [activeTab, setActiveTab] = useState<"hotels" | "flights">("hotels");
  const [priceFilter, setPriceFilter] = useState("Any");
  const [ratingFilter, setRatingFilter] = useState("Any");
  const [sortBy, setSortBy] = useState("Recommended");
  const [selectedDest, setSelectedDest] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const nights = 5;
  const selected = selectedDest !== null ? destinations[selectedDest] : null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">Voyager</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <button className={`pb-1 font-medium transition-colors ${activeTab === "hotels" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("hotels")}>Hotels</button>
            <button className={`pb-1 font-medium transition-colors ${activeTab === "flights" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("flights")}>Flights</button>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg text-sm font-medium">Sign In</button>
        </div>
      </header>

      {/* Search Bar */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-3">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Where are you going?"
                value={searchDest}
                onChange={(e) => setSearchDest(e.target.value)}
                className="bg-transparent text-sm outline-none w-full"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-3">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-sm outline-none"
              />
              <span className="text-gray-300">-</span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-sm outline-none"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-3 w-full md:w-32">
              <Users className="w-4 h-4 text-gray-400 shrink-0" />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-transparent text-sm outline-none w-full"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                {priceRanges.map((r) => (
                  <option key={r} value={r}>Price: {r}</option>
                ))}
              </select>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                {ratings.map((r) => (
                  <option key={r} value={r}>Rating: {r}</option>
                ))}
              </select>
              <div className="ml-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                >
                  {sortOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {showFilters && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 grid sm:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3">Amenities</h4>
                  {["Wifi", "Pool", "Spa", "Restaurant", "Gym", "Parking"].map((a) => (
                    <label key={a} className="flex items-center gap-2 text-sm text-gray-600 mb-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      {a}
                    </label>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-3">Property Type</h4>
                  {["Hotel", "Resort", "Villa", "Apartment", "Hostel"].map((t) => (
                    <label key={t} className="flex items-center gap-2 text-sm text-gray-600 mb-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      {t}
                    </label>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-3">Distance</h4>
                  {["City Center", "Beach", "Airport", "Train Station"].map((d) => (
                    <label key={d} className="flex items-center gap-2 text-sm text-gray-600 mb-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      {d}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Hotels */}
            {activeTab === "hotels" && (
              <>
                {/* Map Placeholder */}
                <div className="bg-gray-200 rounded-xl h-48 md:h-56 flex items-center justify-center mb-8">
                  <div className="text-center text-gray-400">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Interactive Map</p>
                    <p className="text-xs">Showing {destinations.length} properties</p>
                  </div>
                </div>

                {/* Hotel Cards */}
                <div className="space-y-4">
                  {destinations.map((dest, i) => (
                    <div
                      key={dest.name}
                      role="button"
                      tabIndex={0}
                      aria-label={`${dest.hotel} in ${dest.name}, $${dest.price} per night`}
                      onClick={() => setSelectedDest(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedDest(i);
                        }
                      }}
                      className={`flex flex-col sm:flex-row bg-white rounded-xl border overflow-hidden cursor-pointer transition-all ${
                        selectedDest === i ? "border-blue-400 shadow-md" : "border-gray-100 hover:shadow-md"
                      }`}
                    >
                      <div className={`sm:w-56 h-40 sm:h-auto ${dest.gradient} flex items-center justify-center shrink-0`}>
                        <MapPin className="w-10 h-10 text-white/20" />
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-semibold text-lg">{dest.hotel}</h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {dest.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-semibold">
                            <Star className="w-3.5 h-3.5 fill-blue-700" />
                            {dest.rating}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">{dest.reviews} reviews</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {dest.amenities.map((a) => (
                            <span key={a} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {a}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="text-2xl font-bold">${dest.price}</span>
                            <span className="text-sm text-gray-500"> / night</span>
                            <span className="ml-2 text-sm text-gray-400 line-through">${dest.originalPrice}</span>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Tab: Flights */}
            {activeTab === "flights" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Available Flights</h2>
                {flights.map((flight) => (
                  <div key={flight.airline + flight.departure} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Plane className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-semibold">{flight.airline}</p>
                          <p className="text-xs text-gray-400">{flight.stops}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 text-center">
                        <div>
                          <p className="text-lg font-bold">{flight.departure}</p>
                          <p className="text-xs text-gray-400">Departure</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          <p>{flight.duration}</p>
                          <div className="w-20 h-px bg-gray-300 mt-1" />
                        </div>
                        <div>
                          <p className="text-lg font-bold">{flight.arrival}</p>
                          <p className="text-xs text-gray-400">Arrival</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${flight.price}</p>
                        <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* Booking Summary Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Booking Summary</h3>
              {selected ? (
                <>
                  <div className={`rounded-lg ${selected.gradient} h-32 flex items-center justify-center mb-4`}>
                    <MapPin className="w-8 h-8 text-white/20" />
                  </div>
                  <h4 className="font-semibold mb-1">{selected.hotel}</h4>
                  <p className="text-sm text-gray-500 mb-4">{selected.name}</p>
                  <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Check-in</span>
                      <span className="font-medium">{checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Check-out</span>
                      <span className="font-medium">{checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Guests</span>
                      <span className="font-medium">{guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{nights} nights x ${selected.price}</span>
                      <span className="font-medium">${selected.price * nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Taxes & fees</span>
                      <span className="font-medium">${Math.round(selected.price * nights * 0.12)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-3 text-base">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">${Math.round(selected.price * nights * 1.12)}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Complete Booking
                  </button>
                </>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Globe className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Select a destination to see booking details</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 px-4 md:px-8 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            Copyright 2025 Voyager. Part of{" "}
            <Link href="/templates" className="text-gray-600 hover:text-black transition-colors">
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">About</a>
            <a href="#" className="hover:text-gray-600">Help</a>
            <a href="#" className="hover:text-gray-600">Terms</a>
          </div>
        </div>
      </footer>
      <TemplateBackButton variant="modern" />
    </div>
  );
}
