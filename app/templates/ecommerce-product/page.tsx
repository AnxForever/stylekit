"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  RefreshCw,
  Shield,
} from "lucide-react";

const product = {
  name: "Premium Wireless Headphones",
  nameCn: "旗舰无线降噪耳机",
  price: 2999,
  originalPrice: 3599,
  rating: 4.8,
  reviews: 1247,
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
  features: [
    "40 小时续航",
    "主动降噪 (ANC)",
    "Hi-Res Audio 认证",
    "多点连接",
    "触控操作",
  ],
};

const relatedProducts = [
  { name: "无线充电盒", price: 399, color: "bg-amber-50" },
  { name: "替换耳罩", price: 199, color: "bg-blue-50" },
  { name: "收纳包", price: 149, color: "bg-emerald-50" },
  { name: "音频线", price: 99, color: "bg-rose-50" },
];

const reviews = [
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

export default function EcommerceProductTemplate() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link
            href="/templates/ecommerce-product"
            className="text-xl font-bold"
          >
            STORE
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              New Arrivals
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Best Sellers
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Collections
            </a>
          </div>
          <button className="relative p-2" aria-label="Shopping bag">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full">
              0
            </span>
          </button>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <nav className="text-sm text-gray-400" aria-label="Breadcrumb">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Audio</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Headphones</span>
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
                <span className="text-white/30 text-6xl font-bold">H</span>
              </div>
            </div>
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
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {product.nameCn}
            </h1>
            <p className="text-gray-500 mb-6">{product.name}</p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold">
                ¥{product.price.toLocaleString()}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ¥{product.originalPrice.toLocaleString()}
              </span>
              <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded">
                -
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                %
              </span>
            </div>

            {/* Color Selection */}
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
              <button className="flex-1 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
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
                <Heart
                  className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`}
                />
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
            {reviews.map((review) => (
              <div
                key={review.author}
                className="p-6 border border-gray-100 rounded-xl"
              >
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4">{review.text}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-medium text-gray-700">
                    {review.author}
                  </span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="border-t border-gray-100 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <a
                key={item.name}
                href="#"
                className="group"
              >
                <div
                  className={`aspect-square ${item.color} rounded-xl mb-3 flex items-center justify-center group-hover:scale-[1.02] transition-transform`}
                >
                  <span className="text-4xl text-gray-300 font-bold">
                    {item.name[0]}
                  </span>
                </div>
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">¥{item.price}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-4 md:px-8">
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

      {/* Back to Templates */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href="/templates"
          className="px-4 py-2.5 bg-black text-white text-sm font-medium rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
        >
          ← 返回模板
        </Link>
      </div>
    </div>
  );
}
