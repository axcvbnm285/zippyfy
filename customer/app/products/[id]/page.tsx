"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingBasket, Plus, Minus, ShoppingCart, Star } from "lucide-react";
import { products } from "@/mock/products";
import Navbar from "@/features/home/components/Navbar";
import BottomNavigation from "@/features/home/components/BottomNavigation";
import ProductCard from "@/features/products/components/ProductCard";
import { useCartStore } from "@/store/cartStore";
import ViewCartBar from "@/features/cart/components/ViewCartBar";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id) ?? products[0];
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const [qty, setQty] = useState(1);

  const { addItem, items, updateQty } = useCartStore();
  const cartItem = items.find((i) => i.id === product.id);
  const cartQty = cartItem?.qty ?? 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, unit: product.unit });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">

        <Link href="/products" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-green-600">
          <ChevronLeft size={16} /> Back to Products
        </Link>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex h-72 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm lg:h-96">
            <ShoppingBasket size={80} className="text-slate-200" />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-600">{product.category}</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">{product.name}</h1>
              <p className="mt-1 text-sm text-slate-500">per {product.unit}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-xs text-slate-500">{product.rating} · {product.reviews} reviews</span>
            </div>

            <p className="text-3xl font-bold text-slate-900">₹{product.price}</p>

            <div className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${product.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              <span className={`size-1.5 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {product.inStock && (
              <>
                {cartQty === 0 ? (
                  <>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-slate-700">Quantity</p>
                      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5">
                        <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-slate-500 hover:text-slate-800">
                          <Minus size={15} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{qty}</span>
                        <button onClick={() => setQty((q) => q + 1)} className="text-slate-500 hover:text-slate-800">
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart · ₹{product.price * qty}
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                    <p className="text-sm font-semibold text-green-700">In your cart</p>
                    <div className="ml-auto flex items-center gap-3">
                      <button onClick={() => updateQty(product.id, cartQty - 1)} className="flex size-8 items-center justify-center rounded-lg border border-green-200 bg-white text-slate-600 hover:bg-slate-50">
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center text-sm font-bold text-slate-800">{cartQty}</span>
                      <button onClick={() => updateQty(product.id, cartQty + 1)} className="flex size-8 items-center justify-center rounded-lg bg-green-600 text-white hover:bg-green-700">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
              🏪 Order now and pick up from <span className="font-semibold">Bhatbhateni Supermarket</span> in <span className="font-semibold">15–20 mins</span>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section>
            <h3 className="mb-3 text-base font-bold text-slate-800">Related Products</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
      <ViewCartBar />
      <BottomNavigation />
    </main>
  );
}
