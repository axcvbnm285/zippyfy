"use client";

import Link from "next/link";
import { Plus, Minus, ShoppingBasket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }: { product: any }) {
  const { items, addItem, updateQty } = useCartStore();
  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.qty ?? 0;
  const inStock = product.stock > 0;
  const price = product.sellingPrice ?? product.price ?? 0;
  const categoryName = product.category?.name ?? product.category ?? "";

  return (
    <div className={cn("group relative flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md", !inStock && "opacity-60")}>
      <Link href={`/products/${product.slug ?? product.id}`}>
        <div className="flex h-36 items-center justify-center rounded-t-2xl bg-slate-50">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-full rounded-t-2xl object-cover" />
          ) : (
            <ShoppingBasket size={40} className="text-slate-200" />
          )}
        </div>
      </Link>

      {!inStock && (
        <span className="absolute left-3 top-3 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-500">Out of Stock</span>
      )}

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">{categoryName}</p>
        <Link href={`/products/${product.slug ?? product.id}`}>
          <p className="line-clamp-2 text-sm font-semibold text-slate-800 hover:text-green-600">{product.name}</p>
        </Link>
        <p className="text-xs text-slate-400">per {product.unit}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-base font-bold text-slate-900">₹{price}</p>

          {inStock && (
            qty === 0 ? (
              <button
                onClick={() => addItem({ id: product.id, name: product.name, price, unit: product.unit })}
                className="flex size-8 items-center justify-center rounded-xl bg-green-600 text-white transition hover:bg-green-700 active:scale-90"
              >
                <Plus size={16} />
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button onClick={() => updateQty(product.id, qty - 1)} className="flex size-7 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100">
                  <Minus size={13} />
                </button>
                <span className="w-5 text-center text-sm font-bold text-slate-800">{qty}</span>
                <button onClick={() => updateQty(product.id, qty + 1)} className="flex size-7 items-center justify-center rounded-lg bg-green-600 text-white transition hover:bg-green-700">
                  <Plus size={13} />
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
