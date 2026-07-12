"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/product.service";
import ProductCard from "./ProductCard";

interface Props {
  category?: string;
  search?: string;
}

export default function ProductGrid({ category, search }: Props) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data)).finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = category ? p.category?.slug?.toLowerCase() === category.toLowerCase() : true;
    const matchSearch = search ? p.name.toLowerCase().includes(search.toLowerCase()) : true;
    return matchCat && matchSearch;
  });

  if (loading) return <div className="py-20 text-center text-sm text-slate-400">Loading products...</div>;

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-4xl">🔍</p>
        <p className="mt-3 text-base font-semibold text-slate-700">No products found</p>
        <p className="text-sm text-slate-400">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
