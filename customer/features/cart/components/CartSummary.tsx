"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartSummary() {
  const { items, subtotal } = useCartStore();
  const convenience = 10;
  const total = subtotal() + convenience;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-slate-800">Order Summary</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal ({items.length} items)</span>
          <span>₹{subtotal()}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Convenience fee</span>
          <span>₹{convenience}</span>
        </div>
        <div className="my-2 h-px bg-slate-100" />
        <div className="flex justify-between font-bold text-slate-900">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-xs text-green-700">
        <Clock size={14} />
        <span>Estimated pickup: <strong>15–20 mins</strong> after order</span>
      </div>

      <Link
        href="/checkout"
        className="flex h-12 w-full items-center justify-center rounded-xl bg-green-600 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        Proceed to Checkout · ₹{total}
      </Link>

      <Link href="/products" className="block text-center text-xs font-medium text-slate-400 hover:text-green-600">
        Continue Shopping
      </Link>
    </div>
  );
}
