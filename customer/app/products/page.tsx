"use client";

import { useState } from "react";
import Navbar from "@/features/home/components/Navbar";
import BottomNavigation from "@/features/home/components/BottomNavigation";
import ProductGrid from "@/features/products/components/ProductGrid";
import ViewCartBar from "@/features/cart/components/ViewCartBar";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery", "Grains", "Beverages", "Snacks", "Essentials"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6 space-y-5">

        <div>
          <h1 className="text-xl font-bold text-slate-900">All Products</h1>
          <p className="text-sm text-slate-500">Order now, pick up in minutes</p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-green-500"
            />
          </div>
          <button className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-green-500 hover:text-green-600">
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition",
                activeCategory === cat
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-green-500 hover:text-green-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <ProductGrid
          category={activeCategory === "All" ? undefined : activeCategory}
          search={search || undefined}
        />
      </div>
      <ViewCartBar />
      <BottomNavigation />
    </main>
  );
}
