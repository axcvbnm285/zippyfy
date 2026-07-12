"use client";

import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

export default function CartList() {
  const { items, updateQty, removeItem } = useCartStore();

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-3 lg:col-span-2">
        <p className="text-sm font-semibold text-slate-500">{items.length} item{items.length > 1 ? "s" : ""} in cart</p>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQtyChange={updateQty}
            onRemove={removeItem}
          />
        ))}
      </div>
      <CartSummary />
    </div>
  );
}
