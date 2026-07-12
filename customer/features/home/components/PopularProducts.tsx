"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/services/product.service";
import ProductCard from "@/features/products/components/ProductCard";

export default function PopularProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data.slice(0, 6)));
  }, []);

  if (products.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800">Popular Products</h3>
        <Link href="/products" className="text-xs font-semibold text-green-600 hover:underline">See all</Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
