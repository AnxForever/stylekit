"use client";

export const dynamic = "force-static";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Trash2,
  Truck,
  RefreshCw,
  Shield,
  X,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ViewName = "shop" | "product" | "cart";

interface ProductColor {
  name: string;
  hex: string;
}

interface Product {
  id: string;
  name: string;
  nameCn: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  category: string;
  colors: ProductColor[];
  images: string[];
  features: string[];
  badge?: string;
}

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface CartItem {
  productId: string;
  colorIndex: number;
  quantity: number;
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const CATEGORIES = ["All", "Audio", "Wearable", "Accessories", "Smart Home"] as const;

const PRODUCTS: Product[] = [
  {
    id: "headphones-pro",
    name: "Premium Wireless Headphones",
    nameCn: "旗舰无线降噪耳机",
    price: 2999,
    originalPrice: 3599,
    rating: 4.8,
    reviewCount: 1247,
    category: "Audio",
    colors: [
      { name: "Midnight Black", hex: "#1a1a1a" },
      { name: "Cloud White", hex: "#f5f5f0" },
      { name: "Ocean Blue", hex: "#2563eb" },
    ],
    images: [
      "bg-gradient-to-br from-gray-800 to-gray-900",
      "bg-gradient-to-br from-gray-700 to-gray-800",
      "bg-gradient-to-br from-gray-600 to-gray-700",
    ],
    features: ["40 小时续航", "主动降噪 (ANC)", "Hi-Res Audio 认证", "多点连接", "触控操作"],
    badge: "Best Seller",
  },
  {
    id: "earbuds-lite",
    name: "Compact Wireless Earbuds",
    nameCn: "轻巧真无线耳塞",
    price: 799,
    originalPrice: 999,
    rating: 4.5,
    reviewCount: 832,
    category: "Audio",
    colors: [
      { name: "White", hex: "#f5f5f0" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    images: ["bg-gradient-to-br from-sky-100 to-sky-200"],
    features: ["24 小时续航", "IPX5 防水", "通话降噪", "蓝牙 5.3"],
  },
  {
    id: "smartwatch-x",
    name: "Smart Watch X Series",
    nameCn: "智能手表 X 系列",
    price: 1999,
    originalPrice: 2499,
    rating: 4.6,
    reviewCount: 654,
    category: "Wearable",
    colors: [
      { name: "Silver", hex: "#c0c0c0" },
      { name: "Gold", hex: "#d4a857" },
      { name: "Space Gray", hex: "#4a4a4a" },
    ],
    images: ["bg-gradient-to-br from-slate-200 to-slate-300"],
    features: ["健康监测", "GPS 定位", "NFC 支付", "7 天续航"],
    badge: "New",
  },
  {
    id: "speaker-mini",
    name: "Portable Bluetooth Speaker",
    nameCn: "便携蓝牙音箱",
    price: 499,
    originalPrice: 599,
    rating: 4.4,
    reviewCount: 1893,
    category: "Audio",
    colors: [
      { name: "Forest Green", hex: "#2d5a27" },
      { name: "Coral", hex: "#ff6b6b" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    images: ["bg-gradient-to-br from-emerald-100 to-emerald-200"],
    features: ["IPX7 防水", "12 小时续航", "TWS 串联", "免提通话"],
  },
  {
    id: "fitness-band",
    name: "Fitness Tracker Band",
    nameCn: "运动健康手环",
    price: 399,
    originalPrice: 499,
    rating: 4.3,
    reviewCount: 2156,
    category: "Wearable",
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Mint", hex: "#98d8c8" },
    ],
    images: ["bg-gradient-to-br from-violet-100 to-violet-200"],
    features: ["心率监测", "睡眠追踪", "14 天续航", "50m 防水"],
  },
  {
    id: "charging-pad",
    name: "Wireless Charging Pad",
    nameCn: "无线充电板",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviewCount: 943,
    category: "Accessories",
    colors: [
      { name: "White", hex: "#f5f5f0" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    images: ["bg-gradient-to-br from-amber-50 to-amber-100"],
    features: ["15W 快充", "Qi 兼容", "LED 指示灯", "超薄设计"],
  },
  {
    id: "smart-plug",
    name: "Wi-Fi Smart Plug",
    nameCn: "智能 Wi-Fi 插座",
    price: 129,
    originalPrice: 169,
    rating: 4.2,
    reviewCount: 3421,
    category: "Smart Home",
    colors: [{ name: "White", hex: "#f5f5f0" }],
    images: ["bg-gradient-to-br from-blue-50 to-blue-100"],
    features: ["语音控制", "定时开关", "用电统计", "远程控制"],
  },
  {
    id: "usb-hub",
    name: "USB-C Hub 7-in-1",
    nameCn: "七合一 USB-C 拓展坞",
    price: 349,
    originalPrice: 429,
    rating: 4.5,
    reviewCount: 578,
    category: "Accessories",
    colors: [
      { name: "Space Gray", hex: "#4a4a4a" },
      { name: "Silver", hex: "#c0c0c0" },
    ],
    images: ["bg-gradient-to-br from-gray-100 to-gray-200"],
    features: ["4K HDMI", "100W PD 充电", "SD 读卡器", "千兆网口"],
    badge: "Hot",
  },
  {
    id: "desk-lamp",
    name: "Smart LED Desk Lamp",
    nameCn: "智能 LED 台灯",
    price: 599,
    originalPrice: 699,
    rating: 4.6,
    reviewCount: 412,
    category: "Smart Home",
    colors: [
      { name: "White", hex: "#f5f5f0" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    images: ["bg-gradient-to-br from-yellow-50 to-orange-50"],
    features: ["色温调节", "亮度调节", "护眼模式", "手势控制"],
  },
];

const REVIEWS: Review[] = [
  {
    author: "音频发烧友",
    rating: 5,
    text: "音质非常出色，降噪效果一流。佩戴舒适，长时间使用也不累。",
    date: "2025-01-15",
  },
  {
    author: "通勤党",
    rating: 4,
    text: "地铁上降噪效果很好，续航也够用。唯一不足是有点重。",
    date: "2025-01-10",
  },
  {
    author: "设计师",
    rating: 5,
    text: "颜值很高，做工精细。蓝牙连接稳定，延迟很低。",
    date: "2024-12-28",
  },
];

type SortOption = "default" | "price-asc" | "price-desc";

// ---------------------------------------------------------------------------
// Helper Components
// ---------------------------------------------------------------------------

function StarRating({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function DiscountBadge({ price, originalPrice }: { price: number; originalPrice: number }) {
  const pct = Math.round(((originalPrice - price) / originalPrice) * 100);
  return (
    <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded">
      -{pct}%
    </span>
  );
}

// ---------------------------------------------------------------------------
// Navigation Bar
// ---------------------------------------------------------------------------

function NavBar({
  view,
  cartCount,
  onNavigate,
}: {
  view: ViewName;
  cartCount: number;
  onNavigate: (v: ViewName) => void;
}) {
  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate("shop")}
          className="text-xl font-bold hover:opacity-70 transition-opacity"
        >
          STORE
        </button>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <button
            onClick={() => onNavigate("shop")}
            className={`transition-colors ${
              view === "shop" ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => onNavigate("cart")}
            className={`transition-colors ${
              view === "cart" ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Cart
          </button>
        </div>
        <button
          className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Shopping cart"
          onClick={() => onNavigate("cart")}
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Shop View
// ---------------------------------------------------------------------------

function ShopView({
  onSelectProduct,
  onAddToCart,
}: {
  onSelectProduct: (id: string) => void;
  onAddToCart: (productId: string) => void;
}) {
  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    let result = PRODUCTS;

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameCn.includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [category, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover</h1>
        <p className="text-gray-500">Find your next favorite gadget</p>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              category === cat
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">No products found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="group">
              <button
                onClick={() => onSelectProduct(product.id)}
                className="w-full text-left"
              >
                <div
                  className={`aspect-square ${product.images[0]} rounded-xl mb-3 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform`}
                >
                  <span className="text-5xl font-bold text-white/20">
                    {product.nameCn[0]}
                  </span>
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-black text-white text-[10px] font-semibold rounded-full uppercase tracking-wide">
                      {product.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium mb-1 group-hover:underline">
                  {product.nameCn}
                </h3>
                <p className="text-xs text-gray-400 mb-2">{product.name}</p>
              </button>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold">
                    ¥{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-gray-400 line-through">
                      ¥{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onAddToCart(product.id)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label={`Add ${product.nameCn} to cart`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <StarRating rating={product.rating} size="w-3 h-3" />
                <span className="text-xs text-gray-400">({product.reviewCount})</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Product Detail View
// ---------------------------------------------------------------------------

function ProductDetailView({
  productId,
  onBack,
  onAddToCart,
}: {
  productId: string;
  onBack: () => void;
  onAddToCart: (productId: string, colorIndex: number, quantity: number) => void;
}) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center text-gray-400">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product.id, selectedColor, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-400" aria-label="Breadcrumb">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Shop
          </button>
          <span className="mx-1">/</span>
          <span>{product.category}</span>
          <span className="mx-1">/</span>
          <span className="text-gray-900">{product.nameCn}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div>
            <div
              className={`aspect-square rounded-2xl ${product.images[selectedImage]} flex items-center justify-center mb-4`}
            >
              <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-white/30 text-6xl font-bold">
                  {product.nameCn[0]}
                </span>
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg ${img} transition-all ${
                      selectedImage === i
                        ? "ring-2 ring-black ring-offset-2"
                        : "opacity-60 hover:opacity-80"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.nameCn}</h1>
            <p className="text-gray-500 mb-6">{product.name}</p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold">
                ¥{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ¥{product.originalPrice.toLocaleString()}
                  </span>
                  <DiscountBadge price={product.price} originalPrice={product.originalPrice} />
                </>
              )}
            </div>

            {/* Color Selection */}
            {product.colors.length > 1 && (
              <div className="mb-8">
                <p className="text-sm font-medium mb-3">
                  Color: {product.colors[selectedColor].name}
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color, i) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(i)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        selectedColor === i
                          ? "ring-2 ring-black ring-offset-2"
                          : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-sm font-medium mb-3">Quantity</p>
              <div className="inline-flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  addedFeedback
                    ? "bg-emerald-600 text-white"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {addedFeedback ? "Added!" : "Add to Cart"}
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`p-4 border rounded-lg transition-colors ${
                  liked
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {product.features.map((feat) => (
                <div key={feat} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  </div>
                  {feat}
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                <p className="text-xs text-gray-500">Free Shipping</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                <p className="text-xs text-gray-500">30-Day Return</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                <p className="text-xs text-gray-500">2-Year Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-gray-100 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.author} className="p-6 border border-gray-100 rounded-xl">
                <div className="flex mb-3">
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-gray-600 mb-4">{review.text}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-medium text-gray-700">{review.author}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-100 py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedColor(0);
                    setSelectedImage(0);
                    setQuantity(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group text-left"
                >
                  <div
                    className={`aspect-square ${item.images[0]} rounded-xl mb-3 flex items-center justify-center group-hover:scale-[1.02] transition-transform`}
                  >
                    <span className="text-4xl text-white/20 font-bold">
                      {item.nameCn[0]}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium">{item.nameCn}</h3>
                  <p className="text-sm text-gray-500">
                    ¥{item.price.toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Cart View
// ---------------------------------------------------------------------------

function CartView({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
}: {
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onNavigate: (view: ViewName, productId?: string) => void;
}) {
  const resolvedItems = items.map((item) => ({
    ...item,
    product: PRODUCTS.find((p) => p.id === item.productId),
  }));

  const subtotal = resolvedItems.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-20 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-gray-200" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">
          Looks like you have not added anything to your cart yet.
        </p>
        <button
          onClick={() => onNavigate("shop")}
          className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Shopping Cart</h1>
      <p className="text-gray-500 mb-8">
        {totalItems} {totalItems === 1 ? "item" : "items"}
      </p>

      {/* Cart Items */}
      <div className="space-y-6 mb-10">
        {resolvedItems.map((item, index) => {
          if (!item.product) return null;
          const color = item.product.colors[item.colorIndex] ?? item.product.colors[0];
          return (
            <div
              key={`${item.productId}-${item.colorIndex}-${index}`}
              className="flex gap-4 p-4 border border-gray-100 rounded-xl"
            >
              {/* Thumbnail */}
              <button
                onClick={() => onNavigate("product", item.productId)}
                className={`w-24 h-24 shrink-0 rounded-lg ${item.product.images[0]} flex items-center justify-center`}
              >
                <span className="text-2xl font-bold text-white/20">
                  {item.product.nameCn[0]}
                </span>
              </button>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onNavigate("product", item.productId)}
                  className="text-sm font-medium hover:underline text-left"
                >
                  {item.product.nameCn}
                </button>
                <p className="text-xs text-gray-400 mt-0.5">{color.name}</p>
                <p className="text-sm font-bold mt-2">
                  ¥{item.product.price.toLocaleString()}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="inline-flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                      className="p-1.5 hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="p-1.5 hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Line Total */}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold">
                  ¥{(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="border-t border-gray-100 pt-6 space-y-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span>¥{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Shipping</span>
          <span className="text-emerald-600">Free</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-100">
          <span>Total</span>
          <span>¥{subtotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-3">
        <button className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
          Checkout
        </button>
        <button
          onClick={() => onNavigate("shop")}
          className="w-full py-4 border border-gray-200 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function EcommerceProductTemplate() {
  const [view, setView] = useState<ViewName>("shop");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const handleNavigate = useCallback((v: ViewName, productId?: string) => {
    setView(v);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectProduct = useCallback(
    (id: string) => {
      setSelectedProductId(id);
      handleNavigate("product", id);
    },
    [handleNavigate]
  );

  const handleAddToCartQuick = useCallback((productId: string) => {
    setCart((prev) => {
      const existing = prev.findIndex(
        (item) => item.productId === productId && item.colorIndex === 0
      );
      if (existing >= 0) {
        return prev.map((item, i) =>
          i === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, colorIndex: 0, quantity: 1 }];
    });
  }, []);

  const handleAddToCartDetailed = useCallback(
    (productId: string, colorIndex: number, quantity: number) => {
      setCart((prev) => {
        const existing = prev.findIndex(
          (item) => item.productId === productId && item.colorIndex === colorIndex
        );
        if (existing >= 0) {
          return prev.map((item, i) =>
            i === existing ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prev, { productId, colorIndex, quantity }];
      });
    },
    []
  );

  const handleUpdateQuantity = useCallback((index: number, quantity: number) => {
    setCart((prev) => prev.map((item, i) => (i === index ? { ...item, quantity } : item)));
  }, []);

  const handleRemoveItem = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar view={view} cartCount={cartCount} onNavigate={handleNavigate} />

      {view === "shop" && (
        <ShopView onSelectProduct={handleSelectProduct} onAddToCart={handleAddToCartQuick} />
      )}

      {view === "product" && (
        <ProductDetailView
          productId={selectedProductId}
          onBack={() => handleNavigate("shop")}
          onAddToCart={handleAddToCartDetailed}
        />
      )}

      {view === "cart" && (
        <CartView
          items={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onNavigate={handleNavigate}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-4 md:px-8 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            Copyright 2025 STORE. Part of{" "}
            <Link
              href="/templates"
              className="text-gray-600 hover:text-black transition-colors"
            >
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-600">
              Terms
            </a>
            <a href="#" className="hover:text-gray-600">
              Support
            </a>
          </div>
        </div>
      </footer>
      <TemplateBackButton variant="modern" />
    </div>
  );
}
