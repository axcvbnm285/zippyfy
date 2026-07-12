"use client";

import { useCartStore } from "@/store/cartStore";

export default function OrderSummary() {
  const { items, subtotal } = useCartStore();
  const convenience = 10;
  const total = subtotal() + convenience;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-3 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800">Order Summary</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm text-slate-600">
            <span>{item.name} <span className="text-slate-400">× {item.qty}</span></span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <div className="my-1 h-px bg-slate-100" />
        <div className="flex justify-between text-sm text-slate-500">
          <span>Convenience fee</span>
          <span>₹{convenience}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-slate-900">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
}
