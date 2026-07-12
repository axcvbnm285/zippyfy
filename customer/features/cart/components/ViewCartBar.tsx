"use client";

import Link from "next/link";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function ViewCartBar() {
  const { items, totalItems, subtotal } = useCartStore();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2 md:bottom-4">
      <Link
        href="/cart"
        className="mx-auto flex max-w-lg items-center justify-between rounded-2xl bg-green-600 px-5 py-3.5 shadow-xl shadow-green-900/20 transition hover:bg-green-700 active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-xl bg-green-500">
            <ShoppingCart size={16} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-green-100">{totalItems()} item{totalItems() > 1 ? "s" : ""} added</p>
            <p className="text-sm font-bold text-white">View Cart</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-sm font-bold text-white">₹{subtotal()}</p>
          <ChevronRight size={18} className="text-green-200" />
        </div>
      </Link>
    </div>
  );
}
