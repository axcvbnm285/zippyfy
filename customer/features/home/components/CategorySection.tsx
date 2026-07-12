"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/services/category.service";

export default function CategorySection() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  if (categories.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800">Shop by Category</h3>
        <Link href="/products" className="text-xs font-semibold text-green-600 hover:underline">See all</Link>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md"
          >
            <span className="text-2xl">🛒</span>
            <span className="text-[11px] font-semibold text-slate-600">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
