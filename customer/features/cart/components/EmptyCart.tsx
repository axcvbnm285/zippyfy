"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-slate-100">
        <ShoppingCart size={36} className="text-slate-300" />
      </div>
      <p className="mt-4 text-lg font-bold text-slate-800">Your cart is empty</p>
      <p className="mt-1 text-sm text-slate-400">Add items to get started</p>
      <Link
        href="/products"
        className="mt-6 flex h-11 items-center rounded-xl bg-green-600 px-6 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        Browse Products
      </Link>
    </div>
  );
}
